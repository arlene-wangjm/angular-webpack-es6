'use strict';

var srcpath = "./src/public/";
var dist = "./dist/";

var fs = require('fs');
var packageJSON = JSON.parse(fs.readFileSync('./package.json'));
var version = packageJSON.version;

var gulp = require('gulp');

//for js module manage. refer to task:js
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
////////////////////////////for SASS to CSS///////////////////////
//sass compile to css
var sass = require('gulp-sass');
//generate source maps for the Sass to CSS
var sourcemaps = require('gulp-sourcemaps');
//css autoprefixer
var autoprefixer = require('gulp-autoprefixer');

///////////////////////////sprite images, support retina///////////////////////////////////////
var spritesmith = require('gulp.spritesmith');
var buffer = require('vinyl-buffer');
//minimize css file
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');

///////////////////////////replace version/////////////////////////////////
var replace = require('gulp-replace-task');

/////////////////////////////////////////////////////////
var concat = require('gulp-concat');
var runSequence = require('run-sequence');


var debug = require('gulp-debug');
var clean = require('gulp-clean');

var eslint = require('gulp-eslint');
var sasslint = require('gulp-sass-lint');
///////////////////////////////////////////////////////////////

var nodemon = require('gulp-nodemon');

////////////////////////////////////////////////////
var karmaServer = require('karma').Server;



gulp.task('lint:js', function(){
	return gulp.src(srcpath+'**/*.js')
	.pipe(debug())
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError());
});

gulp.task('lint:sass', function(){
	return gulp.src(srcpath + 'sass/**/*.scss')
	//.pipe(debug())
	.pipe(sasslint({
		options:{
			//configFile: './.sass-lint.yml',
		    severity: 'warning'
		}
	}))
	//.pipe(sasslint.format())
	.pipe(sasslint.failOnError())
});

//depended on replaceVersion:js
gulp.task('webpack', ['replaceVersion:js'], function(callback){
	return webpack(webpackConfig, function(err, stats){
		if(err) throw new gutil.PluginError('webpack', err);
		gutil.log('[webpack]', stats.toString({
			colors: true
		}));
		callback();
	});
});

//compile scss to css, have soucemap not compress
gulp.task('sass', function () {
 return gulp.src('./src/public/sass/foundation-flex.scss')
  .pipe(debug())
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
        browsers: ['last 2 versions', '> 1%', 'ie >= 9', 'ff>20', 'last 3 iOS versions']
   }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./src/public/css'));
});

//images sprite
//TODO change sprite image name random, prevent cacheing
gulp.task('sprite', function(){
	var spriteData = gulp.src(srcpath+'images/*.png').pipe(
		spritesmith({
			imgName: 'sprite.png',
			cssName: 'sprite.css',
			//cssFormat: 'scss',
			retinaSrcFilter: [srcpath+'images/*@2x.png'],
			retinaImgName: 'sprite@2x.png',
			padding: 5,
			imgPath: '../sprite/sprite.png',
			retinaImgPath: '../sprite/sprite@2x.png'

		})
	);
	var imgStream = spriteData.img
	.pipe(buffer())
	.pipe(imagemin())
	.pipe(gulp.dest(dist + 'sprite/'));

	var cssStream = spriteData.css
	.pipe(gulp.dest(srcpath + 'css/'));

	return merge(imgStream, cssStream);
});

//dependent on sass, sprite
gulp.task('concat:css', ['sass', 'sprite'], function(){
	return gulp.src(srcpath+'css/*.css')
	.pipe(debug())
	.pipe(concat('style.css'))
	.pipe(csso())
	.pipe(gulp.dest(dist+'css/'));
});

//version
gulp.task('replaceVersion:html', function(){
	return gulp.src(srcpath + 'index.html')
	.pipe(replace({
		patterns: [
           {
           	match: 'version',
           	replacement: version
           }
		]
	}))
	.pipe(gulp.dest(dist))
});
gulp.task('replaceVersion:js', function(){
	return gulp.src('./src/global.js')
	.pipe(debug())
	.pipe(replace({
		patterns: [
           {
           	match: 'version',
           	replacement: version
           }
		]
	}))
	.pipe(gulp.dest(srcpath))
});

gulp.task('clean', function(){
	return gulp.src([
		dist, 
		srcpath+'global.js',
		srcpath+'css',
		srcpath+'sprite'
		], {read: false})
	.pipe(clean());
});

gulp.task('clean:coverage', function(){
	return gulp.src('./coverage', {read: false})
	.pipe(clean());
});

gulp.task('watch', function(){
	gulp.watch(srcpath + 'index.html', ['replaceVersion:html']);
	gulp.watch(srcpath + '**/*.js', ['webpack']);
	gulp.watch(srcpath + 'sass/**/*.scss', ['concat:css']);
});

gulp.task('server', function(){
	nodemon({script: './src/express-app.js'})
	.on('start', ['watch'])
	.on('change', ['watch'])
	.on('restart', function(){
		console.log('restart.............')
	})
});

gulp.task('default', function(callback){
	runSequence(
		'clean', 
		['lint:js'],
		['concat:css', 'webpack', 'replaceVersion:html'],
		callback)
});


gulp.task("test:unit", ['clean:coverage'], function(done){
	karmaServer.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, function(){
		done();
	})
});

gulp.task("dev", function(callback){
	runSequence('default', 'server');
});



