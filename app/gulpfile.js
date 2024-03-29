var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var httpProxy = require('http-proxy');

var addr = '0.0.0.0';
var port = 8000;

function devProxies() {
  var proxyPort = 8001;
  httpProxy.createProxyServer( {
    target: 'http://crowdtv.test.hyve.net',
    changeOrigin: true
  }).listen(proxyPort);
  console.log('server proxy listening on port %s', proxyPort);
}

gulp.task('webpack-dev-server', function(callback) {
  
  //devProxies();

  // Fetch config
  var config = Object.assign({}, webpackConfig);
  config.devtool = 'eval'; // cheap source maps
  config.debug = true; // switch loaders to debug mode

  new webpackDevServer(webpack(config), {
    // webpack-dev-server options
    contentBase: './src/',
    hot: true,
    historyApiFallback: true,
    // webpack-dev-middleware options
    publicPath: config.output.publicPath,
    stats: {
      colors: false
    }
  }).listen(port, addr, function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);

    gutil.log('[webpack-dev-server]', 'http://'+addr+':'+port+'/webpack-dev-server/index.html');

    // keep the server alive or continue?
    // callback();
  });

});

gulp.task('default', ['webpack-dev-server']);
