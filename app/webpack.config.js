var webpack = require('webpack');
var path = require('path');

var addr = '0.0.0.0';
//var addr = '10.110.1.63';
//var addr = '10.131.0.154';
var port = 8000;

module.exports = {
  //cache: true,
  entry: [
   'webpack-dev-server/client?http://'+addr+':'+port,
   'webpack/hot/only-dev-server',
   './src/main.js'
  ], 
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'http://'+addr+':'+port+'/dist/', //set absolute path due to style-loader!css?soureMaps
    filename: '[name].js'
  },
  module: {
    preLoaders:[
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint'
    }
    ],
    loaders: [
      // js
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'react-hot!babel-loader'
      },
      // styles
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style!css?sourceMap!sass?config=sassLoaderConfig'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style!css?sourceMap'
      },
      // images
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'url?limit=8192',
      },
      // fonts
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=8192&minetype=application/font-woff"
      }, 
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=8192&minetype=application/font-woff2"
      }, 
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=8192&minetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, 
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=8192&minetype=image/svg+xml"
      }
    ]
  },
  sassLoaderConfig: {
    sourceMap: true
  },
  eslint: {
    configFile: '.eslintrc'
    //failOnError: true
  },
  //resolve: {
  //  alias: {},
  //  extensions: {}
  //},
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
    
