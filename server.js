import express from "express";
import cors from "cors";
import "dotenv/config";
import { Chart } from "chart.js";

let PORT = process.env.PORT || 80;
const API_KEY = process.env.KEY;
const RAPID = process.env.RAPID;
const RAPID2 = process.env.RAPID2;
const CURR_DOMAIN = process.env.DOMAIN;
const NEWS = process.env.NEWSHOST;

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

const realTimeOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": RAPID2,
  },
};

let runQuery = async () => {
  let url = `https://real-time-finance-data.p.rapidapi.com/stock-quote?symbol=.dji%2C%20.ixic&language=en`;
  // "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=%5EGSPC%2C%20%5EIXIC%2C%20%5EDJI%2C%5EN225%2C%5EHSI%2C%5EFTSE%2CBTC-USD%2C%5EVIX%2CGC%3DF%2CCL%3DF%2CNG%3DF%2C%5ETNX%2CJPY%3DX%2CEURUSD%3DX%2C%5ERUT";
  // "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=%5EGSPC%2C%20%5EIXIC%2C%5EDJI%2C%5EN225%2C%5EHSI%2C%5EFTSE%2C%20BTC-USD%2C%20%5EVVIX%2C%20GC%3DF%2C%20CL%3DF%2C%20NG%3DF%2C%5ETNX%2C%20JPY%3DX%2C%20EURUSD%3DX%2C%20%5ERUT";

  try {
    let result;
    const response = await fetch(url, realTimeOptions);
    console.log(response);
    if (response.status === 200) {
      result = await response.json();
    }

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

  if (!prices) {
    console.log(prices);
    res.render("error");
  }
  console.log(prices);
  res.render("404");
  /***
   *  

  if (prices) {
    res.render("home", { prices, API_KEY, RAPID });
  }

   */

  //server error page;
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

app.get("/404", async (req, res, next) => {
  res.render("404");
});

app.get("/contact", async (req, res, next) => {
  res.render("contact");
});

let cache = {
  GOOGLE: "GOOG",
  SNAPCHAT: "SNAP",
  "PAY PAL": "PYPL",
  VISA: "V",
  FACEBOOK: "META",
  MICROSOFT: "MSFT",
  DOMINOS: "DPZ",
  "DOMINOS PIZZA": "DPZ",
  HILTON: "HLT",
  "THE HILTON": "HLT",
  MARRIOTT: "MAR",
  "THE MARRIOT": "MAR",
  TSMC: "TSM",
  "WALT DISNEY": "DIS",
  DISNEY: "DIS",
  "WALT DISNEY COMPANY": "DIS",
};

app.get("/:symbol", async (req, res) => {
  let symbol = req.params.symbol,
    yahuQuoteSearch,
    quote,
    quoteType,
    shortName,
    longName,
    compName,
    indexLast,
    slicedSymbol,
    realTimeSearch,
    previousClose,
    preMarketPrice,
    preMarketChange,
    preMarketChangePercent,
    preMarketTime,
    postMarketPrice,
    postMarketChange,
    postMarketChangePercent,
    postMarketTime,
    regularMarketTime,
    marketState,
    regularMarketChange,
    regularMarketChangePercent,
    regularMarketPrice,
    quoteSummErrorCode,
    realElemStock;

  symbol = symbol.toUpperCase();

  let firstChar = symbol.charAt(0);
  if (firstChar === ".") symbol = symbol.replace(".", "^");
  if (cache[symbol]) symbol = cache[symbol];
  const yahuSearchURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${symbol}`;
  const realTimeUrl = `https://real-time-finance-data.p.rapidapi.com/search?query=${symbol}&language=en`;

  yahuQuoteSearch = fetch(yahuSearchURL, apiOptions);
  realTimeSearch = fetch(realTimeUrl, realTimeOptions);

  let results = await Promise.all([yahuQuoteSearch, realTimeSearch])
    .then((res) => {
      return Promise.all(res.map((r) => r.json()));
    })
    .then((jsonsArr) => {
      return jsonsArr;
    })
    .catch((e) => console.log(e));
  console.log(yahuQuoteResp);
  let yahuQuoteResp = results[0].quoteResponse.result;
  let realTimeResp = results[1].data;
  let breakStatement;
  if (yahuQuoteResp.length > 0) {
    for (let ele of yahuQuoteResp) {
      if (breakStatement) break;
      if (symbol === ele.symbol) {
        quote = ele;
        console.log("quote ele:", quote);
        shortName = ele.shortName;
        longName = ele.longName;
        quoteType = ele.quoteType;

        if (ele.quoteSummary) {
          if (ele.quoteSummary.errorResult) {
            if (ele.quoteSummary.errorResult.code) {
              quoteSummErrorCode = ele.quoteSummary.errorResult.code;
              breakStatement = true;
              break;
            }
          }
        }

        previousClose = ele.regularMarketPreviousClose;
        marketState = ele.marketState;
        regularMarketPrice = ele.regularMarketPrice;
        regularMarketChange = ele.regularMarketChange;
        regularMarketChangePercent = ele.regularMarketChangePercent;
        regularMarketTime = ele.regularMarketTime;
        if (quoteType === "EQUITY") {
          if (ele.preMarketPrice) {
            preMarketPrice = ele.preMarketPrice;
            preMarketChange = ele.preMarketChange;
            preMarketChangePercent = ele.preMarketChangePecent;
            preMarketTime = ele.preMarketTime;
          }
          if (ele.postMarketPrice) {
            postMarketPrice = ele.postMarketPrice;
            postMarketChange = ele.postMarketChange;
            postMarketChangePercent = ele.postMarketChangePercent;
            postMarketTime = ele.postMarketTime;
          }
        }
        breakStatement = true;
        break;
      }
    }
  } else {
    for (let prop in realTimeResp) {
      if (realTimeResp[prop].length > 0) {
        if (breakStatement) break;
        for (let i = 0; i < realTimeResp[prop].length; i++) {
          //check name;
          let curr = realTimeResp[prop][i];
          compName = curr.name;
          compName = compName.toUpperCase();

          //prep symbol;
          let currSymbol = curr.symbol;
          indexLast = currSymbol.indexOf(":");
          if (indexLast) {
            slicedSymbol = currSymbol.slice(0, indexLast);
            currSymbol = slicedSymbol;
          }
          //check for a match;
          if (compName.includes(symbol) || symbol === currSymbol) {
            longName = curr.name;
            shortName = curr.name;
            quoteType = curr.type;
            symbol = currSymbol;
            if (quoteType === "index") {
              let firstChar = symbol.charAt(0);
              if (firstChar !== "^" || firstChar !== ".") {
                symbol = `^${symbol}`;
              }
            }
            realElemStock = curr;
            console.log("compName:", compName);
            console.log("quoteType:", quoteType);
            console.log("real time search elem:", curr);
            breakStatement = true;
            break;
          }
        }
      }
    }
  }

  if (
    !quoteType ||
    quoteType === "ECNQUOTE" ||
    quoteType === "MUTUALFUND" ||
    quoteType === "NONE" ||
    quoteType === "mutual_fund"
  ) {
    return res.render("404");
  }
  if (quoteType === "stock") quoteType = "EQUITY";

  res.render("ticker", {
    chartJS,
    quoteSummErrorCode,
    API_KEY,
    RAPID,
    CURR_DOMAIN,
    quoteType,
    NEWS,
    symbol,
    longName,
    shortName,
    quote,
    realElemStock,
    previousClose,
    preMarketPrice,
    preMarketChange,
    preMarketChangePercent,
    preMarketTime,
    postMarketPrice,
    postMarketChange,
    postMarketChangePercent,
    postMarketTime,
    regularMarketTime,
    marketState,
    regularMarketChange,
    regularMarketChangePercent,
    regularMarketPrice,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
