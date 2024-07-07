import express from "express";
import cors from "cors";
import "dotenv/config";
import { Chart } from "chart.js";

let PORT = process.env.PORT || 3000;
const API_KEY = process.env.KEY;
const RAPID = process.env.RAPID;
const CURR_DOMAIN = process.env.DOMAIN;

const INCOME_URL = process.env.INCOMEURL;
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
    quotes,
    analysisFetch,
    insightsFetch,
    profileFetch,
    previousClose,
    profile,
    insights,
    analysis,
    quoteType;

  const quotesURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${symbol}`;
  const insightsURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-insights?symbol=${symbol}`;
  const profileURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-profile?symbol=${symbol}&region=US&lang=en-US`;
  const analysisURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis?symbol=${symbol}&region=US`;
  //check quote type:
  quotes = await fetch(quotesURL, apiOptions)
    .then((res) => res.json())
    .catch((e) => console.log(e));

  if (quotes) {
    quotes = quotes.quoteResponse.result[0];
    if (quotes.quoteType) quoteType = quotes.quoteType;
  }

  if (!quoteType || quoteType === "ECNQUOTE" || quoteType === "MUTUALFUND") {
    return res.render("404");
  }

  if (quotes.regularMarketPreviousClose)
    previousClose = quotes.regularMarketPreviousClose;

  if (quoteType === "EQUITY") {
    analysisFetch = fetch(analysisURL, apiOptions);
    profileFetch = fetch(profileURL, apiOptions);
    insightsFetch = fetch(insightsURL, apiOptions);

    let stockInfo = await Promise.all([
      analysisFetch,
      profileFetch,
      insightsFetch,
    ])
      .then((resp) => {
        return Promise.all(resp.map((r) => r.json()));
      })
      .then((arr) => {
        let analysisResp = arr[0];
        let profileResp = arr[1];
        let insightsResp = arr[2];

        return [analysisResp, profileResp, insightsResp];
      })
      .catch((e) => console.log(e));

    if (stockInfo) {
      if (stockInfo[0]) {
        analysis = stockInfo[0];
      }

      if (stockInfo[1].quoteSummary) {
        if (stockInfo[1].quoteSummary.result[0]) {
          profile = stockInfo[1].quoteSummary.result[0];
          // console.log("profile:", profile);
        }
      }

      if (stockInfo[2]) {
        if (stockInfo[2].finance) {
          insights = stockInfo[2].finance.result;
          // console.log("insights:", insights);
        }
      }
    }
  }

  res.render("ticker", {
    chartJS,
    previousClose,
    API_KEY,
    RAPID,
    CURR_DOMAIN,
    INCOME_URL,
    BALANCE_URL,
    CASHFLOW_URL,
    URL_END,
    quoteType,
    profile,
    insights,
    analysis,
    quotes,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
