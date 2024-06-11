import express from "express";
import cors from "cors";
import "dotenv/config";
import { Chart } from "chart.js";

let PORT = process.env.PORT || 3000;
const API_KEY = process.env.KEY;
const RAPID = process.env.RAPID;
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

let runQuery = async (symbol = "") => {
  let url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${symbol}`;
  if (!symbol) {
    url =
      "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=%5EGSPC%2C%20%5EIXIC%2C%5EDJI%2C%5EN225%2C%5EHSI%2C%5EFTSE%2C%20BTC-USD%2C%20%5EVIX%2C%20GC%3DF%2C%20CL%3DF%2C%20NG%3DF%2C%5ETNX%2C%20JPY%3DX%2C%20EURUSD%3DX%2C%20%5ERUT";
  }

  const apiOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "626350d676msh4d1dc66afe62e86p1adf8ejsndc3d7f1bb723",
      "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, apiOptions);
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

app.get("/tickrpro/:symbol", async (req, res) => {
  let symbol = req.params.symbol,
    getSumm,
    chartData1d,
    chartRes1d,
    incomeResult,
    balanceResult,
    cashFlowRes;

  const oneDayUrl = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=5m&symbol=${symbol}&range=1d&region=US&includePrePost=false&useYfid=true&includeAdjustedClose=true`;
  const incomeStmtURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials?symbol=${symbol}&region=US'`;
  const cashFlowURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-cash-flow?symbol=${symbol}&region=US`;
  const balanceShtURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-balance-sheet?symbol=${symbol}&region=US`;
  const getSummURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?region=US&symbol=${symbol}`;

  //check quote type:
  getSumm = await fetch(getSummURL, apiOptions)
    .then((res) => res.json())
    .catch((e) => console.log(e));

  console.log("getSumm:", getSumm.quoteType.quoteType);

  if (
    getSumm.quoteType.quoteType === "ECNQUOTE" ||
    getSumm.quoteType.quoteType === "MUTUALFUND"
  ) {
    return res.render("404");
  }

  chartData1d = await fetch(oneDayUrl, apiOptions)
    .then((res) => res.json())
    .catch((e) => console.log(e));

  chartRes1d = chartData1d.chart.result[0];
  console.log("chartRes1d", chartRes1d);

  if (getSumm.quoteType.quoteType === "EQUITY") {
    let getIncomeStmt = await fetch(incomeStmtURL, apiOptions)
      .then((resp) => resp.json())
      .catch((e) => console.log(e));

    incomeResult = getIncomeStmt;
    //console.log("income timeSeries:", incomeResult.timeSeries);
    let getBalanceSht = await fetch(balanceShtURL, apiOptions)
      .then((resp) => resp.json())
      .catch((e) => console.log(e));

    balanceResult = getBalanceSht;
    //console.log("balance sheet:", balanceResult);

    let getCashFlow = await fetch(cashFlowURL, apiOptions)
      .then((resp) => resp.json())
      .catch((e) => console.log(e));

    cashFlowRes = getCashFlow;
    //console.log("cash flow:", cashFlowRes);
  }

  res.render("ticker", {
    chartJS,
    getSumm,
    chartRes1d,
    incomeResult,
    balanceResult,
    cashFlowRes,
    API_KEY,
    RAPID,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
