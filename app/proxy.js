var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({ target: 'http://crowdtv.test.hyve.net', changeOrigin: true});

proxy.listen(8020);

proxy.on('error', function (err, req, res) {
  console.log('proxy error', err);
});
