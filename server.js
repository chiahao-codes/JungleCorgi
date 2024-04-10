import express from "express";
import cors from "cors";
import yahooFinance from "yahoo-finance2";
import "dotenv/config";

let PORT = process.env.PORT || 80;

const API_KEY = process.env.KEY;
const MBOUMQUOTES = process.env.MBQ;
const MBQHOME = process.env.MBQHOME;
const RAPID = process.env.RAPID;
const MBQHIST = process.env.MBQHIST;
const YHOOURL = process.env.YHOOSLIDEURL;
const YHURLTAIL = process.env.YHURLTAIL;
const YHOOHOST = process.env.YHOOHOST;

const YHOOURL2 = process.env.YHOOTIMESERIESURL;
const YHOOPERIOD2 = process.env.YHOOPERIOD2;
const YHOOPERIOD1 = process.env.YHOOPERIOD1;
const YHOOTYPE = process.env.YHOOTYPEURL;
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

let runQuery = async (symbols) => {
  let indexPrices = {
    snp: {},
    nasdaq: {},
    dji: {},
    nikkei: {},
    hang: {},
    ftse: {},
    bitcoin: {},
    vix: {},
    gold: {},
    crudeoil: {},
    natgas: {},
    ustenyr: {},
    jpyusd: {},
    eurusd: {},
    russell: {},
  };

  let queryOptions5m = { modules: ["price"] };
  for (let i = 0; i < symbols.length; i++) {
    let curr = symbols[i];
    let result = await yahooFinance.quoteSummary(curr, queryOptions5m);
    let indexKeys = Object.keys(indexPrices);
    indexPrices[indexKeys[i]] = result;
  }
  return indexPrices;
};

app.get("/", async (req, res, next) => {
  let prices = await runQuery(symbols);
  res.render("home", { prices, API_KEY, MBQHOME, RAPID });
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

/** Charts Info
 * 
 * let setPeriod1 = (int) => {
  let period1;
  let utcMonth, utcDate, utcYr, utcHours, utcMins, utcSecs;
  let date = new Date();
  utcMonth = date.getUTCMonth();
  utcDate = date.getUTCDate();
  utcYr = date.getUTCFullYear();
  if (int === "5m") {
    period1 = new Date(utcYr, utcMonth, utcDate, 0, 0, 0);
    // let formatted = new Intl.DateTimeFormat("en-US", {})
  }

  return period1;
};
 * 
 */

app.get("/tickrpro/:symbol", async (req, res) => {
  let symbol = req.params.symbol;
  console.log("symbol", symbol);

  let checkSymbol = await yahooFinance
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

  //5min = 1 day;
  /**
   *  let p1 = setPeriod1("5m");
  console.log("p1:", p1);
  let query5min = { return: "object", period1: p1, interval: "5m" };
  let chart5m = await yahooFinance.chart(symbol, query5min);
  console.log("chart5m:", chart5m);
   */

  /**Financial History */
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
      MBOUMQUOTES,
      MBQHIST,
      RAPID,
      YHOOHOST,
      YHOOURL,
      YHURLTAIL,
      YHOOURL2,
      YHOOPERIOD2,
      YHOOPERIOD1,
      YHOOTYPE,
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
