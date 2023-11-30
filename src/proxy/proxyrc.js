
/**
 * import { createProxyMiddleware } from "http-proxy-middleware";
import connect from 'connect';
const PORT = process.env.PORT || 3000;
const app = connect();
 * app.use("/", (req, res, next) => {
    res.sendFile(path.join("C:/Desktop/Ticqer2", "/dist/home.html"));
    next();
});


app.use("/ticker/:symbol", (req, res, next) => {
  res.sendFile(path.join("C:/Desktop/Ticqer2", "/dist/ticker.html"));
  next();
});
app.use(
  createProxyMiddleware("/ticker/:symbol", {
    target: "http://localhost:3000",
    pathRewrite: {
      "^/ticker": "/ticker/:symbol",
    },
  })
);
app.listen(PORT, () => {
    console.log(`Now listening on Port:${PORT}`);
})
 */

