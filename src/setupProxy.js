const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // SSE Server
  app.use(
    '/api/block-stream',
    createProxyMiddleware({
      target: 'http://localhost:9010',
      pathRewrite: {
        '^/api/block-stream': '/push/0', // remove base path
      },
    }),
  );

  // API Server
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:9009',
      changeOrigin: true,
    }),
  );
};
