const express = require("express");
const homeRouter = require("./home_router.js");
const tickerRouter = require("./ticker_router.js");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname + "/public")));
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