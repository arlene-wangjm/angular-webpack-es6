// webpack.config.js
var webpack = require("webpack");

module.exports = {
  entry: {
    app: "./src/public/app.js",
    vendor: [
             "angular", 
             "angular-ui-router",
             'angular-sanitize'
            ],
  },

  output: {
    path: './dist/script/',
    filename: 'bundle.js'       
  },

  module: {
    loaders: [
      { 
        test: /\.js$/, 
        loader: 'babel', 
        exclude:/node_modules/, 
        query: {presets: ['es2015']}
      },
      { test: /\.html$/, loader: 'raw' }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.json', '.css', '.html'] 
  },

  devtool: 'source-map',

  plugins: [ //
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */
        "vendor",
        "vendor.bundle.js", Infinity),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev')
        //     }
        // }),
        new webpack.optimize.UglifyJsPlugin({minimize: true, compress: true}),
        new webpack.optimize.DedupePlugin()
    ]
};