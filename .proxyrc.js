import { createProxyMiddleware, responseInterceptor } from "http-proxy-middleware";

/**
 * const proxy = createProxyMiddleware("/", {
  target: "http://localhost:8000",
  changeOrigin: false,
  selfHandleResponse: true,
  on: {
    proxyRes: responseInterceptor(
      async (responseBuffer, proxyRes, req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
      }
    ),
  },
});
 */




