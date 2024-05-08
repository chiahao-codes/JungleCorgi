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

app.get("/tickrpro/:symbol", async (req, res) => {
  let symbol = req.params.symbol,
    quoteCheck,
    defaultStats,
    chartResult5m,
    chartResult5d,
    chartResult1mo,
    chartResultYTD,
    chartResult2y,
    incomeResult,
    balanceResult,
    cashFlowResult;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "626350d676msh4d1dc66afe62e86p1adf8ejsndc3d7f1bb723",
      "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  };

  //get stock price data:
  const quoteUrl = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${symbol}`;

  //charts data;
  //Same day chart;
  //int:5m, range:1d
  //int:60m, range:5d
  const fiveMinUrl = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=5m&symbol=${symbol}&range=1d&region=US&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit`;
  const fiveDaysUrl = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=60m&symbol=${symbol}&range=5d&region=US&includePrePost=false&useYfid=false&includeAdjustedClose=true`;
  const oneMonthUrl = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=1d&symbol=${symbol}&range=1mo&region=US`;
  const ytdUrl = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=1d&symbol=${symbol}&range=ytd&region=US`;
  const twoYearUrl = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=1d&symbol=${symbol}&range=2y&region=US`;

  const incomeStmtURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials?symbol=${symbol}&region=US'`;
  const cashFlowURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-cash-flow?symbol=${symbol}&region=US`;
  const balanceShtURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-balance-sheet?symbol=${symbol}&region=US`;
  const defaultKeyStatsURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-statistics?symbol=${symbol}&region=US`;

  const quoteResponse = fetch(quoteUrl, options).then((resp) => {
    return resp.json();
  });

  const defaultKeyStatResponse = fetch(defaultKeyStatsURL, options).then(
    (resp) => {
      return resp.json();
    }
  );

  const chartDataFiveMin = fetch(fiveMinUrl, options).then((resp) => {
    return resp.json();
  });

  const chartDataFiveDays = fetch(fiveDaysUrl, options).then((resp) => {
    return resp.json();
  });

  const chartDataOneMonth = fetch(oneMonthUrl, options).then((resp) => {
    return resp.json();
  });

  const chartDataYTD = fetch(ytdUrl, options).then((resp) => {
    return resp.json();
  });

  const chartDataTwoYear = fetch(twoYearUrl, options).then((resp) => {
    return resp.json();
  });

  //Income, Balance, Cash Flow data;
  //use rapidapi endpoints:
  //Income: getFinancials;
  const getIncomeStmt = fetch(incomeStmtURL, options).then((resp) => {
    return resp.json();
  });

  //Balance: getBalanceSheet;
  const getBalanceSht = fetch(balanceShtURL, options).then((resp) => {
    return resp.json();
  });

  //CashFlow: getCashFlow
  const getCashFlow = fetch(cashFlowURL, options).then((resp) => {
    return resp.json();
  });

  let results = await Promise.all([
    quoteResponse,
    chartDataFiveMin,
    chartDataFiveDays,
    chartDataOneMonth,
    chartDataYTD,
    chartDataTwoYear,
    getIncomeStmt,
    getBalanceSht,
    getCashFlow,
    defaultKeyStatResponse,
  ]).catch((e) => console.log(e));

  //assign respective ejs variables;
  quoteCheck = results[0];
  chartResult5m = results[1];
  chartResult5d = results[2];
  chartResult1mo = results[3];
  chartResultYTD = results[4];
  chartResult2y = results[5];
  incomeResult = results[6];
  balanceResult = results[7];
  cashFlowResult = results[8];
  defaultStats = results[9];

  console.log(incomeResult);

  /**
   * if (
    !quoteCheck ||
    quoteCheck.quoteResponse.result[0].quoteType === "ECNQUOTE" ||
    quoteCheck.quoteResponse.result[0].quoteType === "MUTUALFUND"
  ) {
    res.render("404");
  }
   */

  res.render("ticker", {
    quoteCheck,
    defaultStats,
    cashFlowResult,
    balanceResult,
    incomeResult,
    chartResult5m,
    chartResult5d,
    chartResultYTD,
    chartResult1mo,
    chartResult2y,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
