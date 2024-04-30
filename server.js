import express from "express";
import cors from "cors";
import "dotenv/config";

let PORT = process.env.PORT || 3000;
const API_KEY = process.env.KEY;
const RAPID = process.env.RAPID;
const YFCHARTURL = process.env.YFCHARTURL;
const YFINDEXPRICES = process.env.YFINDEXPRICES;

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.json());
app.use(cors());

let symbols = [
  "^GSPC",
  "^IXIC",
  "^DJI",
  "^N225",
  "^HSI",
  "^FTSE",
  "BTC-USD",
  "^VIX",
  "GC=F",
  "CL=F",
  "NG=F",
  "^TNX",
  "JPY=X",
  "EURUSD=X",
  "^RUT",
];

let runQuery = async (symbol = "") => {
  let url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${symbol}`;
  if (!symbol) {
    url =
      "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=%5EGSPC%2C%20%5EIXIC%2C%5EDJI%2C%5EN225%2C%5EHSI%2C%5EFTSE%2C%20BTC-USD%2C%20%5EVIX%2C%20GC%3DF%2C%20CL%3DF%2C%20NG%3DF%2C%5ETNX%2C%20JPY%3DX%2C%20EURUSD%3DX%2C%20%5ERUT";
  }

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "626350d676msh4d1dc66afe62e86p1adf8ejsndc3d7f1bb723",
      "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    let result = await response.json();
    console.log("result:", result);
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

app.get("/tickrpro/disclaimer", async (req, res, next) => {
  res.render("disclaimer");
});

app.get("/tickrpro/termsofservice", async (req, res, next) => {
  res.render("terms");
});

app.get("/tickrpro/privacy", async (req, res, next) => {
  res.render("privacy");
});

app.get("/tickrpro/contact", async (req, res, next) => {
  res.render("contact");
});

let setPeriod1 = (int) => {
  let period1;
  let nonUtcMonth, nonUtcDate, nonUtcYr;
  let date = new Date();
  nonUtcMonth = date.getMonth();
  nonUtcDate = date.getDate();
  nonUtcYr = date.getFullYear();
  if (int === "5m") {
    period1 = new Date(nonUtcYr, nonUtcMonth, nonUtcDate, 0, 0, 0);

    // let formatted = new Intl.DateTimeFormat("en-US", {})
  }
  console.log("period1:", period1);
  return period1;
};

app.get("/tickrpro/:symbol", async (req, res) => {
  let symbol = req.params.symbol,
    checkSymbol,
    chartsResult;

  let options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "626350d676msh4d1dc66afe62e86p1adf8ejsndc3d7f1bb723",
      "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  };

  //get stock price data:
  let url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${symbol}`;

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    checkSymbol = result;
  } catch (error) {
    console.error(error);
  }

  //charts data;
  url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=5m&symbol=${symbol}&range=1d&region=US&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit`;

  try {
    const chartData = await fetch(url, options);
    let chartJSON = await chartData.json();
    chartsResult = chartJSON;
  } catch (error) {
    console.error(error);
  }

  //Income, Balance, Cash Flow data;
  //use rapidapi endpoints:
  //Income: getFinancials;
  //Balance: getBalanceSheet;
  //CashFlow: getCashFlow

  if (
    !checkSymbol ||
    checkSymbol.price.quoteType === "ECNQUOTE" ||
    checkSymbol.price.quoteType === "MUTUALFUND"
  ) {
    res.render("404");
  }
  if (checkSymbol) {
    res.render("ticker", {});
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
