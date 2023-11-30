import express from "express";
import homeRouter from "./home_router.js";
import tickerRouter from "./ticker_router.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/", homeRouter);
app.use("/ticker/:symbol", tickerRouter);

app.listen(PORT, () => {
  console.log("Proxy listening on port:", PORT);
});


/**
 * 

 */