var path = require("path");
module.exports = function (config) {

  var configuration = {
    // base path used to resolve all patterns
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files/patterns to load in the browser
    files: [{ pattern: './spec.bundle.js', watched: false }],
    //// preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: { './spec.bundle.js': ['webpack'] },

    // files to exclude
    exclude: [],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        preLoaders: [
          {
            test: /\.js$/,
            loader: 'isparta-loader',
            include: path.resolve('./src/public'),
            exclude: [/\.spec\.js$/, /\.e2e\.js$/]
          }
        ],
        loaders: [
          { 
            test: /\.js$/, 
            loader: 'babel', 
            exclude:/node_modules/, 
            query: {presets: ['es2015']}
          },
          { test: /\.html$/, loader: 'raw' }
        ],
      },
    },

    webpackServer: {
      noInfo: true // prevent console spamming when running in Karma!
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],

    coverageReporter: {
        dir: path.resolve('coverage/'),
        reporters: [
            { type: 'html' }
        ]
    },


    // web server port
    port: 9876,

    // enable colors in the output
    colors: true,

    // level of logging
    logLevel: config.LOG_INFO,

    // toggle whether to watch files and rerun tests upon incurring changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS', 'PhantomJS_custom'],
    customLaunchers: {
      'PhantomJS_custom': {
        base: 'PhantomJS',
        options: {
          windowName: 'my-window',
          settings: {
            webSecurityEnabled: false
          },
        },
        flags: ['--load-images=true'],
        debug: true
      }
    },
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom) 
      exitOnResourceError: true
    },

    // if true, Karma runs tests once and exits
    singleRun: true
  };

  if(process.env.TRAVIS){
    configuration.browsers = ['Chrome_travis_ci'];
    // configuration.reporters = configuration.reporters.concat(['coverage', 'coveralls']);
    // configuration.coverageReporter = {
    //   type : 'lcovonly',
    //   dir : 'coverage/'
    // };
  }

  config.set(configuration);

};
