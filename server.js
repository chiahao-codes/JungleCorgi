import express from "express";
import cors from "cors";
import "dotenv/config";
import { Chart } from "chart.js";

let PORT = process.env.PORT || 3000;
const API_KEY = process.env.KEY;
const RAPID = process.env.RAPID;
const CURR_DOMAIN = process.env.DOMAIN;

const chartJS = Chart;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

const apiOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": RAPID,
    "content-type": "application/json",
  },
};

let runQuery = async () => {
  let result;
  let url =
    "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=%5EGSPC%2C%20%5EIXIC%2C%5EDJI%2C%5EN225%2C%5EHSI%2C%5EFTSE%2C%20BTC-USD%2C%20%5EVVIX%2C%20GC%3DF%2C%20CL%3DF%2C%20NG%3DF%2C%5ETNX%2C%20JPY%3DX%2C%20EURUSD%3DX%2C%20%5ERUT";

  try {
    const response = await fetch(url, apiOptions);
    if (response.status === 200) {
      result = await response.json();
    } else {
      result = response.status;
    }
  } catch (error) {
    console.error(error);
  }

  return result;
};

app.get("/", async (req, res, next) => {
  let prices = await runQuery();
  console.log("prices:", prices);
  if (!prices) {
    console.log(prices);
    res.render("error");
  }
  res.render("home", { prices, API_KEY, RAPID });
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
  "DOGE COIN": "DOGE",
  "THE DOGE COIN": "DOGE",
  DOGEFATHER: "DOGE",
  "THE DOGE FATHER": "DOGE",
  DOGECOIN: "DOGE",
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
  "THE WALT DISNEY COMPANY": "DIS",
};

app.get("/:symbol", async (req, res) => {
  let symbol = req.params.symbol,
    quote,
    quoteType,
    quoteSymbol,
    shortName,
    longName,
    yahuAutoComplete,
    autoCompResp,
    breakStatement;

  symbol = symbol.toUpperCase();
  //verify search/symbol exists;
  //if so, render ejs and look up pricing info via yahu stock quote;
  let firstChar = symbol.charAt(0);
  if (firstChar === ".") symbol = symbol.replace(".", "^");
  if (cache[symbol]) symbol = cache[symbol];
  const yahuAutoCompURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?region=US&q=${symbol}`;
  //const yahuSearchURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${symbol}`;
  //const realTimeUrl = `https://real-time-finance-data.p.rapidapi.com/search?query=${symbol}&language=en`;

  try {
    yahuAutoComplete = await fetch(yahuAutoCompURL, apiOptions);
    autoCompResp = await yahuAutoComplete.json();
    console.log(autoCompResp);
  } catch (error) {
    console.log(error);
    return res.render("error");
  }

  //iterate over quotes
  let quotesArr = autoCompResp.quotes;
  let newsArr = autoCompResp.news;
  if (quotesArr.length === 0) return res.render("404");

  if (quotesArr.length > 0) {
    for (let i = 0; i < quotesArr.length; i++) {
      if (breakStatement) break;
      quote = quotesArr[i];
      let quoteShortname = quote.shortname.toUpperCase();
      if (quote.symbol === symbol || quoteShortname.includes(symbol)) {
        quoteType = quote.quoteType;
        shortName = quote.shortname;
        longName = quote.longname;
        quoteSymbol = quote.symbol;

        breakStatement = true;
        break;
      }
    }
  }

  if (
    quoteType === "ECNQUOTE" ||
    quoteType === "MUTUALFUND" ||
    quoteType === "NONE" ||
    quoteType === "mutual_fund"
  ) {
    return res.render("404");
  }

  let newsTitle, newsPublisher, newsLink, newsTime, breakNews;
  if (newsArr.length > 0) {
    for (let ele of newsArr) {
      if (breakNews) break;
      newsTitle = ele.title;
      newsPublisher = ele.publisher;
      newsLink = ele.link;
      newsTime = ele.providerPublishTime;
      breakNews = true;
      break;
    }
  }
  return res.render("ticker", {
    autoCompResp,
    quoteType,
    shortName,
    longName,
    newsTitle,
    newsPublisher,
    newsLink,
    newsTime,
    CURR_DOMAIN,
    API_KEY,
    RAPID,
    chartJS,
    symbol,
    quoteSymbol,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const yahuQuoteSearch = fetch(yahuSearchURL, apiOptions);
// realTimeSearch = fetch(realTimeUrl, realTimeOptions);

/**
   *  compName,
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
    realElemStock,
   *  let autoCompResp = ;
     *   = await Promise.all([yahuQuoteSearch, realTimeSearch])
    .then((res) => {
      return Promise.all(res.map((r) => r.json()));
    })
    .then((jsonsArr) => {
      return jsonsArr;
    })
    .catch((e) => console.log(e));
     */
/**
 *  if (yahuQuoteResp.length > 0) {
    for (let ele of yahuQuoteResp) {
      if (breakStatement) break;
      if (symbol === ele.symbol) {
        quote = ele;
        console.log("yahu");
        console.log(ele);
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
    console.log("realtime");
    let currSymbol;
    for (let prop in realTimeResp) {
      if (realTimeResp[prop].length > 0) {
        if (breakStatement) break;
        for (let i = 0; i < realTimeResp[prop].length; i++) {
          //check name;
          let curr = realTimeResp[prop][i];
          compName = curr.name;
          if (!compName) {
            if (curr.type) {
              if (curr.type === "currency") {
                compName = curr.from_currency_name;
                currSymbol = curr.from_symbol;
              }
            } else {
              return res.render("404");
            }
          }

          compName = compName.toUpperCase();

          //prep symbol;
          if (!currSymbol) {
            currSymbol = curr.symbol;
          }

          indexLast = currSymbol.indexOf(":");

          if (indexLast > -1) {
            slicedSymbol = currSymbol.slice(0, indexLast);
            currSymbol = slicedSymbol;
          }

          //check for a match;
          if (compName.includes(symbol) || symbol === currSymbol) {
            longName = compName;
            quoteType = curr.type;
            symbol = currSymbol;
            if (quoteType === "index") {
              let firstChar = symbol.charAt(0);
              if (firstChar !== "^" || firstChar !== ".") {
                symbol = `^${symbol}`;
              }
            }
            realElemStock = curr;
            breakStatement = true;
            break;
          }
        }
      }
    }
  }
  
   let yahuQuoteResp = autoCompResp[0].quoteResponse.result;
  let realTimeResp = autoCompResp[1].data;
  let breakStatement;
 */

/**
   * 
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
   */
