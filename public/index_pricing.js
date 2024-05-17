import cnbcMarket from "cnbc-market";
import yf2 from "./yahoo2.js";
//update prices of index;
let updateIndexData = async () => {
  //get prices from cnbc;
  let marketData = await cnbcMarket()
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });

  //get dow jones;  dowjones: dji,
  //let dji = await yf2("^DJI");
  return {
    snp: marketData[0],
    nasdaq: marketData[1],
    ftse: marketData[2],
    nikkei: marketData[3],
    hang: marketData[4],
    shanghai: marketData[5],
    vix: marketData[6],
    wti: marketData[15],
    natgas: marketData[16],
    gold: marketData[17],
    silver: marketData[18],
    ustenyr: marketData[8],
    dollar: marketData[22],
    eurusd: marketData[25],
    russell: marketData[28],
  };
};

export default updateIndexData;

/**
 *  for (let i = 0; i < iterable.length; i++) {
    let attr = iterable[i].classList[0];
    if (cnbc[attr]) {
      if (prop === "value") {
        let value;
        if (cnbc[attr].value !== undefined) {
          value = parseFloat(cnbc[attr].value);
        }
        if (cnbc[attr].regularMarketPrice !== undefined) {
          value = cnbc[attr].regularMarketPrice;
        }
        value = value.toFixed(2);
        let cnbcValue = value;
        iterable[i].innerText = cnbcValue;
      }

      if (prop === "change") {
        let pctChange;
        if (cnbc[attr].change !== undefined) {
          pctChange = cnbc[attr].change;
        }

        if (cnbc[attr].regularMarketChangePercent !== undefined) {
          pctChange = cnbc[attr].regularMarketChangePercent;
        }
        iterable[i].innerText = pctChange;
      }
    }

    if (!cnbc[attr] && prop === "arrow") {
      let regExp = new RegExp("-");
      let dir = "";
      let pctChangeTxt = iterable[i].innerText;
      let children = iterable[i].children;

      if (regExp.test(pctChangeTxt)) {
        children[1].style.color = "red";
        dir = imgDown;
      } else {
        children[1].style.color = "#00e813";
        dir = imgUp;
      }
      children[0].src = dir;
    }
  }
 */

/**
 * const YHOOURL = process.env.YHOOSLIDEURL;
const YHURLTAIL = process.env.YHURLTAIL;
const YHOOHOST = process.env.YHOOHOST;

const YHOOURL2 = process.env.YHOOTIMESERIESURL;
const YHOOPERIOD2 = process.env.YHOOPERIOD2;
const YHOOPERIOD1 = process.env.YHOOPERIOD1;
const YHOOTYPE = process.env.YHOOTYPEURL;


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

  let queryOptions5m = { modules: ["price"] };
  for (let i = 0; i < symbols.length; i++) {
    let curr = symbols[i];
    let result = await yahooFinance
      .quoteSummary(curr, queryOptions5m)
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((e) => {
        console.log(e);
      });
    let indexKeys = Object.keys(indexPrices);
    indexPrices[indexKeys[i]] = result;
  }
  return indexPrices;
};
 * 
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


  const quoteResponse = fetch(quoteUrl, options).then((resp) => {
  return resp.json();
});

 //const getStatsURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-statistics?symbol=${symbol}&region=US`;
  //const getQuotesURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${symbol}`;

   */
