const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// ✅ Proxy for web
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    const { createProxyMiddleware } = require("http-proxy-middleware");

    return (req, res, next) => {
      if (req.url.startsWith("/api")) {
        return createProxyMiddleware({
          target: "https://genai-images-4ea9c0ca90c8.herokuapp.com",
          changeOrigin: true,
          pathRewrite: { "^/api": "" },
        })(req, res, next);
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
