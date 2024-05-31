import express from "express";
import cors from "cors";
import "dotenv/config";

let PORT = process.env.PORT || 3000;
const API_KEY = process.env.KEY;
const RAPID = process.env.RAPID;

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
    getSumm,
    chartDataFiveMin,
    results,
    chartResult5m,
    incomeResult,
    balanceResult,
    cashFlowRes;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "626350d676msh4d1dc66afe62e86p1adf8ejsndc3d7f1bb723",
      "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  };

  //charts data;
  //Same day chart;
  //int:5m, range:1d
  //int:60m, range:5d
  const fiveMinUrl = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=5m&symbol=${symbol}&range=1d&region=US&includePrePost=false&useYfid=true&includeAdjustedClose=true`;
  const incomeStmtURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials?symbol=${symbol}&region=US'`;
  const cashFlowURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-cash-flow?symbol=${symbol}&region=US`;
  const balanceShtURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-balance-sheet?symbol=${symbol}&region=US`;
  const getSummURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?region=US&symbol=${symbol}`;

  //check quote type:
  getSumm = await fetch(getSummURL, options)
    .then((response) => {
      return response.json();
    })
    .catch((e) => console.log(e));
  //getSumm = await getSumm.json();
  console.log("getSumm:", getSumm);

  if (getSumm.quoteType === "ECNQUOTE" || getSumm.quoteType === "MUTUALFUND") {
    return res.render("404");
  }
  chartDataFiveMin = await fetch(fiveMinUrl, options).then((resp) => {
    return resp.json();
  });

  const getIncomeStmt = fetch(incomeStmtURL, options).then((resp) => {
    return resp.json();
  });

  const getBalanceSht = fetch(balanceShtURL, options).then((resp) => {
    return resp.json();
  });

  const getCashFlow = fetch(cashFlowURL, options).then((resp) => {
    return resp.json();
  });

  results = await Promise.all([
    chartDataFiveMin,
    getIncomeStmt,
    getBalanceSht,
    getCashFlow,
  ]).catch((e) => console.log(e));

  chartResult5m = results[0];
  incomeResult = results[1];
  balanceResult = results[2];
  cashFlowRes = results[3];

  console.log("chartResult5m", chartResult5m.chart.result[0].meta);
  return res.render("ticker", {
    API_KEY,
    RAPID,
    getSumm,
    cashFlowRes,
    balanceResult,
    incomeResult,
    chartResult5m,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
