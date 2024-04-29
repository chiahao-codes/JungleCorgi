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
    result;
  console.log("symbol", symbol);

  let checkSymbol;

  const url =
    "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=5m&symbol=goog&range=1d&region=US&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "626350d676msh4d1dc66afe62e86p1adf8ejsndc3d7f1bb723",
      "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    result = await response.text();
    console.log("result:", result);
  } catch (error) {
    console.error(error);
  }

  /**
   * 
   *  = await yahooFinance
    .quoteSummary(symbol, {
      modules: [
        "price",
        "summaryDetail",
        "assetProfile",
        "summaryProfile",
        "defaultKeyStatistics",
        "financialData",
      ],
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((e) => {
      console.log(e);
    });
   *   let fiveMin = result;
   *  //5min = 1 day;
  let p1 = setPeriod1("5m");
  let query5min = { return: "object", period1: p1, interval: "5m" };
  let chart5m = await yahooFinance
    .chart(symbol, query5min)
    .then((data) => {
      return data;
    })
    .catch((e) => console.log(e));
  console.log("chart5m:", chart5m);
  let queryIncomeStatement = {
    period1: "2021-12-31",
    type: "annual",
    module: "financials",
  };

  let annualIncomeStatement = await yahooFinance
    .fundamentalsTimeSeries(symbol, queryIncomeStatement)
    .then((data) => {
      return data;
    })
    .catch((e) => console.log(e));

  let queryIncomeStatementTTM = {
    period1: "2021-12-31",
    type: "trailing",
    module: "financials",
  };

  let ttmIncomeStatement = await yahooFinance.fundamentalsTimeSeries(
    symbol,
    queryIncomeStatementTTM
  );

  let queryBalanceSheet = {
    period1: "2021-12-31",
    type: "annual",
    module: "balance-sheet",
  };

  let annualBalanceSheet = await yahooFinance.fundamentalsTimeSeries(
    symbol,
    queryBalanceSheet
  );

  let queryCashFlow = {
    period1: "2021-12-31",
    type: "annual",
    module: "cash-flow",
  };

  let annualCashFlow = await yahooFinance.fundamentalsTimeSeries(
    symbol,
    queryCashFlow
  );

  let queryCashFlowTtm = {
    period1: "2023-01-31",
    type: "trailing",
    module: "cash-flow",
  };

  let ttmCashFlow = await yahooFinance.fundamentalsTimeSeries(
    symbol,
    queryCashFlowTtm
  );
   */

  /**Financial History */

  if (
    !checkSymbol ||
    checkSymbol.price.quoteType === "ECNQUOTE" ||
    checkSymbol.price.quoteType === "MUTUALFUND"
  ) {
    res.render("404");
  }
  if (checkSymbol) {
    res.render("ticker", {
      checkSymbol,
      API_KEY,
      YFCHARTURL,
      RAPID,
      fiveMin,
      annualIncomeStatement,
      ttmIncomeStatement,
      ttmIncomeStatement,
      annualBalanceSheet,
      annualCashFlow,
      ttmCashFlow,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/**
 *  console.log("income:", annualIncomeStatement);
  console.log("ttm income:", ttmIncomeStatement);
  console.log("balance sheet:", annualBalanceSheet);
  console.log("cash flow:", annualCashFlow);
  console.log("ttm cash flow:", ttmCashFlow);
 */
