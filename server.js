import express from "express";
import cors from "cors";
import "dotenv/config";
import { Chart } from "chart.js";

let PORT = process.env.PORT || 3000;
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
  let url =
    // "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=%5EGSPC%2C%20%5EIXIC%2C%20%5EDJI%2C%5EN225%2C%5EHSI%2C%5EFTSE%2CBTC-USD%2C%5EVIX%2CGC%3DF%2CCL%3DF%2CNG%3DF%2C%5ETNX%2CJPY%3DX%2CEURUSD%3DX%2C%5ERUT";
    "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=%5EGSPC%2C%20%5EIXIC%2C%5EDJI%2C%5EN225%2C%5EHSI%2C%5EFTSE%2C%20BTC-USD%2C%20%5EVVIX%2C%20GC%3DF%2C%20CL%3DF%2C%20NG%3DF%2C%5ETNX%2C%20JPY%3DX%2C%20EURUSD%3DX%2C%20%5ERUT";

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
  FACEBOOK: "META",
  MICROSOFT: "MSFT",
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
    quoteSummErrorCode;

  symbol = symbol.toUpperCase();
  console.log("symbol:", symbol);
  let firstChar = symbol.charAt(0);
  if (firstChar === ".") symbol = symbol.replace(".", "^");
  if (cache[symbol]) symbol = cache[symbol];
  const yahuSearchURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${symbol}`;
  const realTimeUrl = `https://real-time-finance-data.p.rapidapi.com/search?query=${symbol}&language=en`;

  realTimeSearch = fetch(realTimeUrl, realTimeOptions);
  yahuQuoteSearch = fetch(yahuSearchURL, apiOptions);
  let results = await Promise.all([yahuQuoteSearch, realTimeSearch])
    .then((res) => {
      return Promise.all(res.map((r) => r.json()));
    })
    .then((jsonsArr) => {
      return jsonsArr;
    })
    .catch((e) => console.log(e));

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

/*
    analysisMktState,
  profile,
    analysis,
    quotes,
    preMarketTime,
    preMarketPrice,
    preMarketChange,
    preMarketChangePercent,
    postMarketTime,
    postMarketPrice,
    postMarketChange,
    postMarketChangePercent,
    income,
    balance,
    cash,
    incomeYr1,
    incomeYr2,
    ttmRev,
    annualRev1,
    annualRev2,
    ttmGrossProfit,
    annualGrossProfit1,
    annualGrossProfit2,
    ttmOpExp,
    annualOpExp1,
    annualOpExp2,
    ttmOpIncome,
    annualOpIncome1,
    annualOpIncome2,
    ttmPreTaxInc,
    annualPreTaxInc1,
    annualPreTaxInc2,
    ttmOtherIncExp,
    annualOtherIncExp1,
    annualOtherIncExp2,
    ttmBasicEps,
    annualBasicEps1,
    annualBasicEps2,
    ttmNetIncome,
    annualNetIncome1,
    annualNetIncome2,
    balYr1,
    balYr2,
    balYr3,
    totalAssets1,
    totalAssets2,
    totalAssets3,
    totalLiab1,
    totalLiab2,
    totalLiab3,
    totalEqu1,
    totalEqu2,
    totalEqu3,
    currentDebt1,
    currentDebt2,
    currentDebt3,
    longTermDebt1,
    longTermDebt2,
    longTermDebt3,
    acctsRecv1,
    acctsRecv2,
    acctsRecv3,
    acctsPay1,
    acctsPay2,
    acctsPay3,
    retEarn1,
    retEarn2,
    retEarn3,
    currencyCode,


     let stockInfo = await Promise.all([
      analysisFetch,
      profileFetch,
      getIncomeStmtFetch,
      getBalanceShtFetch,
    ])
      .then((resp) => {
        return Promise.all(resp.map((r) => r.json()));
      })
      .then((arr) => {
        let analysisResp = arr[0];
        let profileResp = arr[1];
        let incomeResp = arr[2];
        let balanceResp = arr[3];

        return [analysisResp, profileResp, incomeResp, balanceResp];
      })
      .catch((e) => console.log(e));

    if (stockInfo) {
      if (stockInfo[0]) {
        analysis = stockInfo[0];
        // console.log("analysis", analysis);
        if (analysis.price) {
          analysisMktState = analysis.price.marketState;
          preMarketTime = analysis.price.preMarketTime;
          preMarketPrice = analysis.price.preMarketPrice;
          preMarketChange = analysis.price.preMarketChange;
          preMarketChangePercent = analysis.price.preMarketChangePercent;

          postMarketTime = analysis.price.postMarketTime;
          postMarketPrice = analysis.price.postMarketPrice;
          postMarketChange = analysis.price.postMarketChange;
          postMarketChangePercent = analysis.price.postMarketChangePercent;
        }
      }

      if (stockInfo[1].quoteSummary) {
        if (stockInfo[1].quoteSummary.result[0]) {
          profile = stockInfo[1].quoteSummary.result[0];
        }
      }

      if (stockInfo[2]) {
        income = stockInfo[2].timeSeries;
        console.log("income:", income);
      }

      if (stockInfo[3]) {
        balance = stockInfo[3].timeSeries;
        //  console.log("balance:", balance);
     
      }
    }
    */

// analysisFetch = await fetch(analysisURL, apiOptions);
// analysisResp = await analysisFetch.json();
// profileFetch = await fetch(profileURL, apiOptions);
// profileResp = await profileFetch.json();
// getIncomeStmtFetch = await fetch(incomeStmtURL, apiOptions);
// incomeResp = await getIncomeStmtFetch.json();
// getBalanceShtFetch = await fetch(balanceShtURL, apiOptions);
// balanceResp = await getBalanceShtFetch.json();
//equity analysis values;
/** 
    analysis = analysisResp;
    preMarketPrice = analysis.price.preMarketPrice;
    preMarketChange = analysis.price.preMarketChange;
    preMarketChangePercent = analysis.price.preMarketChangePercent;
    postMarketPrice = analysis.price.postMarketPrice;
    postMarketChange = analysis.price.postMarketChange;
    postMarketChangePercent = analysis.price.postMarketChangePercent;

    //stock profile info;
    profile = profileResp.quoteSummary.result[0];
*/
//income statement:
/**
    income = incomeResp.timeSeries;
    let length = income.timestamp.length;
    incomeYr1 = income.timestamp[length - 1];
    incomeYr2 = income.timestamp[length - 2];
    incomeYr1 = new Date(incomeYr1 * 1000);
    incomeYr2 = new Date(incomeYr2 * 1000);

    incomeYr1 = Intl.DateTimeFormat("en-US", { dateStyle: "short" }).format(
      incomeYr1
    );
    incomeYr2 = Intl.DateTimeFormat("en-US", { dateStyle: "short" }).format(
      incomeYr2
    );

    ttmRev = checkStmtProp(income.trailingTotalRevenue[0]);
    currencyCode = income.trailingTotalRevenue[0].currencyCode;
    annualRev1 = checkStmtProp(income.annualTotalRevenue[length - 1]);
    annualRev2 = checkStmtProp(income.annualTotalRevenue[length - 2]);

    ttmGrossProfit = checkStmtProp(income.trailingGrossProfit[0]);
    annualGrossProfit1 = checkStmtProp(income.annualGrossProfit[length - 1]);
    annualGrossProfit2 = checkStmtProp(income.annualGrossProfit[length - 2]);

    ttmOpExp = checkStmtProp(income.trailingOperatingExpense[0]);
    annualOpExp1 = checkStmtProp(income.annualOperatingExpense[length - 1]);
    annualOpExp2 = checkStmtProp(income.annualOperatingExpense[length - 2]);

    ttmOpIncome = checkStmtProp(income.trailingOperatingIncome[0]);
    annualOpIncome1 = checkStmtProp(income.annualOperatingIncome[length - 1]);
    annualOpIncome2 = checkStmtProp(income.annualOperatingIncome[length - 2]);

    ttmPreTaxInc = checkStmtProp(income.trailingPretaxIncome[0]);
    annualPreTaxInc1 = checkStmtProp(income.annualPretaxIncome[length - 1]);
    annualPreTaxInc2 = checkStmtProp(income.annualPretaxIncome[length - 2]);

    ttmOtherIncExp = checkStmtProp(income.trailingOtherIncomeExpense[0]);
    annualOtherIncExp1 = checkStmtProp(
      income.annualOtherIncomeExpense[length - 1]
    );
    annualOtherIncExp2 = checkStmtProp(
      income.annualOtherIncomeExpense[length - 2]
    );

    ttmBasicEps = checkStmtProp(income.trailingBasicEPS[0]);
    annualBasicEps1 = checkStmtProp(income.annualBasicEPS[length - 1]);
    annualBasicEps2 = checkStmtProp(income.annualBasicEPS[length - 2]);

    ttmNetIncome = checkStmtProp(income.trailingNetIncome[0]);
    annualNetIncome1 = checkStmtProp(income.annualNetIncome[length - 1]);
    annualNetIncome2 = checkStmtProp(income.annualNetIncome[length - 2]);

    //balance sheet values;
    balance = balanceResp.timeSeries;
    let balLength = balance.timestamp.length;
    balYr1 = balance.timestamp[balLength - 1];
    balYr2 = balance.timestamp[balLength - 2];
    balYr3 = balance.timestamp[balLength - 3];

    balYr1 = new Date(balYr1 * 1000);
    balYr2 = new Date(balYr2 * 1000);
    balYr3 = new Date(balYr3 * 1000);

    balYr1 = Intl.DateTimeFormat("en-US", { dateStyle: "short" }).format(
      balYr1
    );
    balYr2 = Intl.DateTimeFormat("en-US", { dateStyle: "short" }).format(
      balYr2
    );
    balYr3 = Intl.DateTimeFormat("en-US", { dateStyle: "short" }).format(
      balYr3
    );

    totalAssets1 = checkStmtProp(balance.annualTotalAssets[balLength - 1]);
    totalAssets2 = checkStmtProp(balance.annualTotalAssets[balLength - 2]);
    totalAssets3 = checkStmtProp(balance.annualTotalAssets[balLength - 3]);

    totalLiab1 = checkStmtProp(
      balance.annualTotalLiabilitiesNetMinorityInterest[balLength - 1]
    );
    totalLiab2 = checkStmtProp(
      balance.annualTotalLiabilitiesNetMinorityInterest[balLength - 2]
    );
    totalLiab3 = checkStmtProp(
      balance.annualTotalLiabilitiesNetMinorityInterest[balLength - 3]
    );

    totalEqu1 = checkStmtProp(balance.annualStockholdersEquity[balLength - 1]);
    totalEqu2 = checkStmtProp(balance.annualStockholdersEquity[balLength - 2]);
    totalEqu3 = checkStmtProp(balance.annualStockholdersEquity[balLength - 3]);

    currentDebt1 = checkStmtProp(balance.annualCurrentDebt[balLength - 1]);
    currentDebt2 = checkStmtProp(balance.annualCurrentDebt[balLength - 2]);
    currentDebt3 = checkStmtProp(balance.annualCurrentDebt[balLength - 3]);

    longTermDebt1 = checkStmtProp(balance.annualLongTermDebt[balLength - 1]);
    longTermDebt2 = checkStmtProp(balance.annualLongTermDebt[balLength - 2]);
    longTermDebt3 = checkStmtProp(balance.annualLongTermDebt[balLength - 3]);

    acctsRecv1 = checkStmtProp(balance.annualAccountsReceivable[balLength - 1]);
    acctsRecv2 = checkStmtProp(balance.annualAccountsReceivable[balLength - 2]);
    acctsRecv3 = checkStmtProp(balance.annualAccountsReceivable[balLength - 3]);

    acctsPay1 = checkStmtProp(balance.annualAccountsPayable[balLength - 1]);
    acctsPay2 = checkStmtProp(balance.annualAccountsPayable[balLength - 2]);
    acctsPay3 = checkStmtProp(balance.annualAccountsPayable[balLength - 3]);

    retEarn1 = checkStmtProp(balance.annualRetainedEarnings[balLength - 1]);
    retEarn2 = checkStmtProp(balance.annualRetainedEarnings[balLength - 2]);
    retEarn3 = checkStmtProp(balance.annualRetainedEarnings[balLength - 3]);


    let checkStmtProp = (property) => {
  return property && property.reportedValue.fmt
    ? property.reportedValue.fmt
    : "n/a";
};
     */
