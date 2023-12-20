import express from "express";
import homeRouter from "./home_router.js";
import tickerRouter from "./ticker_router.js";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", homeRouter);
app.get("/ticker/:symbol", tickerRouter);

app.listen(PORT, () => {
  console.log("Proxy listening on port:", PORT);
});
