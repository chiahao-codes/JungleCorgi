import express from "express";
import cors from "cors";
import "dotenv/config";
import { Chart } from "chart.js";

let PORT = process.env.PORT || 3000;
const API_KEY = process.env.KEY;
const RAPID = process.env.RAPID;
const CURR_DOMAIN = process.env.DOMAIN;

const BALANCE_URL = process.env.BALANCEURL;
const CASHFLOW_URL = process.env.CASHFLOWURL;
const URL_END = process.env.URLEND;

const chartJS = Chart;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.json());
app.use(cors());

const apiOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": RAPID,
  },
};

let runQuery = async () => {
  let url =
    "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=%5EGSPC%2C%20%5EIXIC%2C%5EDJI%2C%5EN225%2C%5EHSI%2C%5EFTSE%2C%20BTC-USD%2C%20%5EVIX%2C%20GC%3DF%2C%20CL%3DF%2C%20NG%3DF%2C%5ETNX%2C%20JPY%3DX%2C%20EURUSD%3DX%2C%20%5ERUT";

  try {
    const response = await fetch(url, apiOptions);
    let result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

app.get("/", async (req, res, next) => {
  let prices = await runQuery()
    .then((data) => {
      return data;
    })
    .catch((e) => console.log(e));

  if (prices) {
    res.render("home", { prices });
  }
});

app.get("/disclaimer", async (req, res, next) => {
  res.render("disclaimer");
});

app.get("/privacy", async (req, res, next) => {
  res.render("privacy");
});

app.get("/termsofservice", async (req, res, next) => {
  res.render("terms");
});

app.get("/contact", async (req, res, next) => {
  res.render("contact");
});

app.get("/disclaimer", async (req, res, next) => {
  res.render("disclaimer");
});

app.get("/termsofservice", async (req, res, next) => {
  res.render("terms");
});

app.get("/privacy", async (req, res, next) => {
  res.render("privacy");
});

app.get("/contact", async (req, res, next) => {
  res.render("contact");
});

app.get("/:symbol", async (req, res) => {
  let symbol = req.params.symbol,
    financials,
    insights,
    previousClose;
  //no more financialsary;
  // const financialsURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?region=US&symbol=${symbol}`;
  //use following:
  const insightsURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-insights?symbol=${symbol}`;
  const financialsURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials?symbol=${symbol}&region=US`;
  const statsURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v4/get-statistics?symbol=${symbol}&region=US&lang=en-US`;
  const profileURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-profile?symbol=${symbol}&region=US&lang=en-US`;
  //check quote type:
  financials = await fetch(financialsURL, apiOptions)
    .then((res) => res.json())
    .catch((e) => console.log(e));

  console.log("financials:", financials);
  let quoteType = financials.quoteType.quoteType;
  if (
    !financials ||
    financials.quoteType.quoteType === "ECNQUOTE" ||
    financials.quoteType.quoteType === "MUTUALFUND"
  ) {
    return res.render("404");
  }
  if (financials.price) {
    if (financials.price.regularMarketPreviousClose) {
      previousClose = financials.price.regularMarketPreviousClose.raw;
    }
  }

  res.render("ticker", {
    chartJS,
    financials,
    previousClose,
    API_KEY,
    RAPID,
    CURR_DOMAIN,
    BALANCE_URL,
    CASHFLOW_URL,
    URL_END,
    quoteType,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
