const { createProxyMiddleware } = require('http-proxy-middleware');

const target = 'http://localhost:9009';

function relayRequestHeaders(proxyReq, req) {
    Object.keys(req.headers).forEach(function (key) {
        proxyReq.setHeader(key, req.headers[key]);
        console.log(`header: ${key}: val: ${req.headers[key]}`);
    });

    console.log(proxyReq);
}

function relayResponseHeaders(proxyRes, req, res) {
    console.log('here');
}

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target,
            changeOrigin: true,
            onProxyReq: relayRequestHeaders,
            onProxyRes: relayResponseHeaders,
        }),
    );
};
