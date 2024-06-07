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

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "626350d676msh4d1dc66afe62e86p1adf8ejsndc3d7f1bb723",
    "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
  },
};

const grabChartData = async (symbol, range) => {
  let url;
  switch (range) {
    case "5d":
      url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=60m&region=US&symbol=${symbol}&range=5d&includePrePost=false&useYfid=true&includeAdjustedClose=true`;
      break;
    case "1mo":
      url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=1d&region=US&symbol=${symbol}&range=1mo&includePrePost=false&useYfid=true&includeAdjustedClose=true`;
      break;
    case "YTD":
      url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=1wk&region=US&symbol=${symbol}&range=ytd&includePrePost=false&useYfid=true&includeAdjustedClose=true`;
      break;
    case "2y":
      url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=1mo&region=US&symbol=${symbol}&range=2y&includePrePost=false&useYfid=true&includeAdjustedClose=true`;
      break;
    default:
      console.log("Range not found");
  }
  /**
   *  const fiveDayUrl = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=60m&region=US&symbol=${symbol}&range=5d&includePrePost=false&useYfid=true&includeAdjustedClose=true`;
  const oneMoUrl = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=1d&region=US&symbol=${symbol}&range=1mo&includePrePost=false&useYfid=true&includeAdjustedClose=true`;
  const ytdUrl = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=1wk&region=US&symbol=${symbol}&range=ytd&includePrePost=false&useYfid=true&includeAdjustedClose=true`;
  const twoYrUrl = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=1mo&region=US&symbol=${symbol}&range=2y&includePrePost=false&useYfid=true&includeAdjustedClose=true`;
   */

  let response = await fetch(url, options)
    .then((resp) => resp.json())
    .catch((e) => console.log(e));

  console.log(response);
  return response;
};

const fillChartData = async (responseData) => {
  let chartResp, chartTimes, closeQuote, openQuote;

  //5m:1day, 1h:5days;
  //1d:months, 1mo:years;
  let chartData = {
    datasets: [
      {
        label: "",
        data: [],
        borderColor: dataLineColor,
        backgroundColor: dataLineColor,
        color: dataLineColor,
        tension: 0.1,
        pointBorderWidth: 0.5,
      },
    ],
    labels: [],
  };

  chartResp = responseData.chart.result[0];
  chartTimes = responseData.chart.result[0].timestamp;
  openQuote = responseData.chart.result[0].indicators.quote[0].open;
  closeQuote = responseData.chart.result[0].indicators.quote[0].close;
  //Iterate over timestamp array, start from the last one, go backwards;
  let timestampEnd = chartTimes.length - 1;

  //return chartdata object;
  //start from the last one and go backwards;
  for (let i = timestampEnd; i >= 0; i--) {
    let currTimestamp = chartTimes[i];
    //setMarketTime(currTimestamp);
    let date, formatted;
    date = new Date(currTimestamp * 1000);
    formatted = new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "long",
      timeZone: "UTC",
    }).format(date);

    let labelDate = formatted;

    let mktPrice = closeQuote[i]; //closing price;

    //get UTC Date to determine mkt price Open vs. Closed
    currTimestamp *= 1000;
    let dateCreate = new Date(currTimestamp);

    //find curr utc timestamp vs. market open of stock symbol
    let utcHours = dateCreate.getUTCHours();
    let utcMin = dateCreate.getUTCMinutes();

    let marketOpen = chartResp.meta.currentTradingPeriod.regular.start;
    let mktOpenDate = new Date(marketOpen * 1000);
    let utcHourOpen = mktOpenDate.getUTCHours();
    let utcMinsOpen = mktOpenDate.getUTCMinutes();

    if (utcHourOpen === utcHours && utcMinsOpen === utcMin) {
      mktPrice = openQuote[i];
    }

    chartData.datasets[0].data.unshift(mktPrice);
    chartData.labels.unshift(labelDate);
  }

  return chartData;
};

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
  getSumm = await fetch(getSummURL, options)
    .then((res) => res.json())
    .catch((e) => console.log(e));

  if (getSumm.quoteType === "ECNQUOTE" || getSumm.quoteType === "MUTUALFUND") {
    return res.render("404");
  }

  chartData1d = await fetch(oneDayUrl, options)
    .then((res) => res.json())
    .catch((e) => console.log(e));

  chartRes1d = chartData1d.chart.result[0];
  console.log("chartRes1d", chartRes1d);

  let getIncomeStmt = await fetch(incomeStmtURL, options)
    .then((resp) => resp.json())
    .catch((e) => console.log(e));

  incomeResult = getIncomeStmt;

  let getBalanceSht = await fetch(balanceShtURL, options)
    .then((resp) => resp.json())
    .catch((e) => console.log(e));

  balanceResult = getBalanceSht;

  let getCashFlow = await fetch(cashFlowURL, options)
    .then((resp) => resp.json())
    .catch((e) => console.log(e));

  cashFlowRes = getCashFlow;

  res.render("ticker", {
    getSumm,
    chartRes1d,
    incomeResult,
    balanceResult,
    cashFlowRes,
    grabChartData,
    fillChartData,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
