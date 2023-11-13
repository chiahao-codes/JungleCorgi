import express from "express";
import parcel from "parcel";
import routerHome from "../js/home_router";
import tickerRouter from "../js/ticker_router";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(parcel())
app.use(express.static("dist"));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/", routerHome);
app.use("/ticker", tickerRouter);

app.listen(PORT, () => {
  console.log("Proxy listening on port:", PORT);
});
