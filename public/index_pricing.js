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
      
          /*
         const getRapidPrices = async (api, symbol) => {
              const url = `${mboumQuotes}${symbol}`;
              const options = {
                  method: "GET",
                  headers: {
                      "X-RapidAPI-Key": api,
                      "X-RapidAPI-Host": rapidURL,
                  },
              };
  
              const response = await fetch(url, options).then((data) => { return data; }).catch((e) => console.log(e));
              const result = await response.json();
              const marketState = result.body[0].marketState;
              const regMarketTime = result.body[0].regularMarketTime;
              const preMarketTime = result.body[0].preMarketTime;
              const postMarketTime = result.body[0].postMarketTime;
  
  
              let regMktState = "Last Closed:", regMktPrice, regMktChange, regMktChangePercent,
                  mktStatePrice, mktStateChange, mktStateChangePct, extendedMkTime, mktState;
  
              regMktPrice = result.body[0].regularMarketPrice;
              regMktChange = result.body[0].regularMarketChange;
              regMktChangePercent = result.body[0].regularMarketChangePercent;
              currMktState = marketState // update global variable for chartjs
  
              if (marketState === "REGULAR") regMktState = "Current Session:";
              //reg hours
              priceTimeContainer.children[0].children[0].children[0].innerText = regMktPrice;
              priceTimeContainer.children[0].children[0].children[1].children[0].innerText = regMktChange;
              priceTimeContainer.children[0].children[0].children[1].children[1].innerText = regMktChangePercent;
              if (regMarketTime) {
                  atCloseContainer.children[0].innerText = regMktState;
                  atCloseContainer.children[1].innerText = setMarketTime(regMarketTime);
              }
  
              if (result.body[0].postMarketPrice) {
                  mktState = "After Hours:";
                  mktStatePrice = result.body[0].postMarketPrice;
                  mktStateChange = result.body[0].postMarketChange;
                  mktStateChangePct = result.body[0].postMarketChangePercent;
                  extendedMkTime = postMarketTime;
              }
  
              if (result.body[0].preMarketPrice) {
                  mktState = "Pre-Market Hours:";
                  mktStatePrice = result.body[0].preMarketPrice;
                  mktStateChange = result.body[0].preMarketChange;
                  mktStateChangePct = result.body[0].preMarketChangePercent;
                  extendedMkTime = preMarketTime;
              }
  
              //extended hours
              priceTimeContainer.children[1].children[0].children[0].innerText = mktStatePrice;
              priceTimeContainer.children[1].children[0].children[1].children[0].innerText = mktStateChange;
              priceTimeContainer.children[1].children[0].children[1].children[1].innerText = mktStateChangePct;
              afterHoursTimeContainer.children[0].innerText = mktState;
              afterHoursTimeContainer.children[1].innerText = setMarketTime(extendedMkTime);
  
              return;
          };


             const incomeStatement = () => {
            //format years for all:
            let endingYears = document.querySelectorAll(".slide-boxes > .slide-years");

            for (let i = 0; i < endingYears.length; i++) {
                let curr = endingYears[i].children;

                for (let yr of curr) {

                    if (yr.classList.contains("endingyr1") || yr.classList.contains("endingyr2") ||
                        yr.classList.contains("endingyr3")) {

                        if (yr.innerText !== "--") {
                            let format = new Date(yr.innerText);
                            if (format) {
                                format = new Intl.DateTimeFormat("en-US", { dateStyle: "short", timeZone: "UTC" }).format(format);
                                yr.innerText = format;
                            }
                        }

                    }
                }
            }

            const incomeSlideData = document.querySelectorAll("#income-statement > .slide-boxes > .slide-data-wrapper");

            for (let i = 0; i < incomeSlideData.length; i++) {
                let curr = incomeSlideData[i];
                if (!curr.classList.contains("income-slide-years") && !curr.classList.contains("basic-eps")) {

                    let numbers = curr.children;

                    formatYhooDomData(numbers);
                }
            }
        }
        const formatYhooDomData = (dataArray) => {
            for (let i = 0; i < dataArray.length; i++) {
                let curr = dataArray[i].innerText;

                curr = new Intl.NumberFormat("en-US").format(curr);

                if (curr !== "NaN") {

                    //convert commas to decimals
                    curr = curr.replaceAll(",", ".")

                    //check for how many decimals
                    let regExp = /[.]/g;
                    let decimals = curr.match(regExp), startIndex = 0, endIndex, formattedCurr;

                    //locate the 2nd decimal's index
                    let firstSearch = ".";
                    let firstIndexofDecimal = curr.indexOf(firstSearch);
                    let secondIndexofDecimal = curr.indexOf(firstSearch, firstIndexofDecimal + 1);
                    endIndex = secondIndexofDecimal; //2nd decimal
                    //slice up to the 2nd decimal, excluding it.
                    curr = curr.slice(startIndex, endIndex)

                    //format curr
                    curr = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 4, minimumSignificantDigits: 3 }).format(
                        curr
                    );

                    let denomination = "";
                    if (decimals.length === 4) {
                        denomination = "T"
                    } if (decimals.length === 3) {
                        denomination = "B"
                    }
                    if (decimals.length === 2) {
                        denomination = "M"
                    }

                    curr = `${curr}${denomination}`;
                    dataArray[i].innerText = curr;

                }
            }
        }
        const balanceSheet = () => {
            //format numbers
            const balanceSlideData = document.querySelectorAll("#balance-sheet > .slide-boxes > .slide-data-wrapper");

            for (let i = 0; i < balanceSlideData.length; i++) {
                let curr = balanceSlideData[i];
                if (!curr.classList.contains("balance-slide-years")) {

                    let numbers = curr.children;

                    formatYhooDomData(numbers);
                }
            }
        }
        const cashFlow = () => {
            const cashflowDivs = document.querySelectorAll("#cash-flow > .slide-boxes > .slide-data-wrapper");

            for (let i = 0; i < cashflowDivs.length; i++) {
                let curr = cashflowDivs[i];
                if (!curr.classList.contains("cash-flow-slide-years")) {

                    let numbers = curr.children;

                    formatYhooDomData(numbers);
                }
            }


        }
        const populateSlides = () => {
            //const slideContainer = document.querySelector("#slide-container");
            incomeStatement();
            balanceSheet();
            cashFlow()
        }
        

           <% let arrLastEle %>
                    <% let ccy="--" %>

                       <% if(incomeResult){%>
                                            <%if(incomeResult.summaryDetail){%>
                                                <%if(incomeResult.summaryDetail.currency){%>
                                                    <%ccy=incomeResult.summaryDetail.currency%>
                                                        <% }}} %>
                                                            (<%=ccy%>)

                                                               <% let annYr={"one":"--", "two" :"--"}%>
                                            <% if(incomeResult){%>
                                                <% if(incomeResult.timeSeries){%>
                                                    <% if(incomeResult.timeSeries.timestamp){ %>
                                                        <% let arrTimeStp=incomeResult.timeSeries.timestamp %>
                                                            <% let arrLastEle=arrTimeStp.length-1 %>
                                                                <% annYr["one"]=arrTimeStp[arrLastEle] %>
                                                                    <% annYr["two"]=arrTimeStp[arrLastEle - 1] %>
                                                                        <% }}} %>
                                                                            <%=annYr["one"] %>
                                                                                <%=annYr["two"] %>

                                                                                                           <%let ttmRev%>
                                            <% let ttmValue="--" %>
                                                <% if(incomeResult){%>
                                                    <% if(incomeResult.timeSeries){ %>
                                                        <% if(incomeResult.timeSeries.trailingTotalRevenue){ %>
                                                            <% ttmRev=incomeResult.timeSeries.trailingTotalRevenue %>
                                                                <% if(ttmRev.length>0){ %>
                                                                    <% arrLastEle=ttmRev.length-1 %>
                                                                        <%
                                                                            ttmValue=ttmRev[arrLastEle].reportedValue.fmt%>
                                                                            <% }%>
                                                                                <% }}} %>
                                                                                    <%=ttmValue %>

                                                                                         <% let ttmGP%>
                                        <% let grossProfitVal="--" %>
                                            <div class="slide-data ttm">
                                                <% if(incomeResult){%>
                                                    <% if(incomeResult.timeSeries){ %>
                                                        <% if(incomeResult.timeSeries.trailingGrossProfit){ %>
                                                            <% ttmGP=incomeResult.timeSeries.trailingGrossProfit %>
                                                                <% if(ttmGP.length>0){ %>
                                                                    <% arrLastEle=ttmGP.length-1 %>
                                                                        <%
                                                                            grossProfitVal=ttmGP[arrLastEle].reportedValue.fmt%>
                                                                            <% }%>
                                                                                <% }}}%>

                                                                                   <%=grossProfitVal%>

                                                                                                               <% let ttmOpExp="--" %>
                                        <% let opExpArr %>
                                            <% if(incomeResult){%>
                                                <% if(incomeResult.timeSeries){ %>
                                                    <% if(incomeResult.timeSeries.trailingGrossProfit){ %>
                                                        <% opExpArr=incomeResult.timeSeries.trailingGrossProfit%>
                                                            <% if(opExpArr.length>0){ %>
                                                                <% arrLastEle=opExpArr.length-1%>
                                                                    <% ttmOpExp=opExpArr[arrLastEle].reportedValue.fmt%>
                                                                        <% }%>
                                                                            <% }}} %>

                                                                               <%=ttmOpExp %>

                                                                                     <% let ttmOpInc="--" %>
                                        <% let opIncArr %>
                                            <% if(incomeResult){%>
                                                <% if(incomeResult.timeSeries){ %>
                                                    <% if(incomeResult.timeSeries.trailingOperatingIncome){ %>
                                                        <% opIncArr=incomeResult.timeSeries.trailingOperatingIncome%>
                                                            <% if(opIncArr.length>0){ %>
                                                                <% arrLastEle=opIncArr.length-1%>
                                                                    <% ttmOpInc=opIncArr[arrLastEle].reportedValue.fmt%>
                                                                        <% }%>
                                                                            <% }}} %>

                                                                                <%=ttmOpInc %>

                                                                                       <% let ttmPreTaxInc="--" %>
                            <% let preTaxArr %>
                                <% if(incomeResult){%>
                                    <% if(incomeResult.timeSeries){ %>
                                        <% if(incomeResult.timeSeries.trailingPretaxIncome){ %>
                                            <% preTaxArr=incomeResult.timeSeries.trailingPretaxIncome%>
                                                <% if(preTaxArr.length>0){ %>
                                                    <% arrLastEle=preTaxArr.length-1 %>
                                                        <% ttmPreTaxInc=preTaxArr[arrLastEle].reportedValue.fmt%>
                                                            <% }%>
                                                                <% }}} %>

                                                                      <%=ttmPreTaxInc %>

                                                                                            <% let ttmOthIncExp="--" %>
                            <% let otInArr %>
                                <% if(incomeResult){%>
                                    <% if(incomeResult.timeSeries){ %>
                                        <% if(incomeResult.timeSeries.trailingOtherIncomeExpense){ %>
                                            <% otInArr=incomeResult.timeSeries.trailingOtherIncomeExpense%>
                                                <% if(otInArr.length>0){ %>
                                                    <% arrLastEle=otInArr.length-1 %>
                                                        <% ttmOthIncExp=otInArr[arrLastEle].reportedValue.fmt%>
                                                            <% }%>
                                                                <% }}} %>

                                                                         <%=ttmOthIncExp %>

                                                                                                <% let ttmBasicEps="--" %>
                            <% let basicEpArr %>
                                <% if(incomeResult){%>
                                    <% if(incomeResult.timeSeries){ %>
                                        <% if(incomeResult.timeSeries.trailingBasicEPS){ %>
                                            <% basicEpArr=incomeResult.timeSeries.trailingBasicEPS%>
                                                <% if(opExpArr.length>0){ %>
                                                    <% arrLastEle=opExpArr.length-1%>
                                                        <% ttmBasicEps=basicEpArr[arrLastEle].reportedValue.fmt%>
                                                            <% }%>
                                                                <% }}} %>
                                                                  <%=ttmBasicEps %>

                                                                                   <% let netIncArr %>
                            <% let ttmNetInc="--" %>
                                <% if(incomeResult){%>
                                    <% if(incomeResult.timeSeries){ %>
                                        <% if(incomeResult.timeSeries.trailingNetIncome){ %>
                                            <% netIncArr=incomeResult.timeSeries.trailingNetIncome%>
                                                <% if(netIncArr.length>0){ %>
                                                    <% arrLastEle=netIncArr.length-1%>
                                                        <% ttmNetInc=netIncArr[arrLastEle].reportedValue.fmt%>
                                                            <% }%>
                                                                <% }}} %>
                                                                    <%=ttmNetInc%>


                                                                                        <% let balanceYear={"zero":"--","one":"--", "two" :"--"}%>
                            <% if(balanceResult){%>
                                <%if(balanceResult.summaryDetail){%>
                                    <%if(balanceResult.summaryDetail.currency){%>
                                        <%ccy=balanceResult.summaryDetail.currency%>
                                            <% }%>
                                                <% if(balanceResult.timeSeries.timestamp){ %>
                                                    <% let balanceTimestamp%>
                                                        <%balanceTimestamp=balanceResult.timeSeries.timestamp%>
                                                            <%balanceYear["zero"]=balanceTimestamp[0]%>
                                                                <%balanceYear["one"]=balanceTimestamp[1]%>
                                                                    <%balanceYear["two"]=balanceTimestamp[2]%>
                                                                        <% }}} %>

                                                                            (<%=ccy%>)
                                                                               <%=balanceYear["two"] %>
                                                                                   <%=balanceYear["one"] %>
                                                                                             <%=balanceYear["zero"] %>

                                                                                                                    <% let totalAssets={0:"--", 1:"--", 2:"--"} %>
                            <% if(balanceResult){ %>
                                <% if(balanceResult.timeSeries){ %>
                                    <% let annTotalAss %>
                                        <%annTotalAss=balanceResult.timeSeries.annualTotalAssets%>

                                            <% for(let i=0; i<annTotalAss.length; i++){ %>
                                                <% let curr=annTotalAss[i] %>
                                                    <% if(curr){ %>
                                                        <% if(curr.reportedValue){ %>
                                                            <% if(totalAssets[i]){ %>
                                                                <% totalAssets[i]=curr.reportedValue.fmt %>
                                                                    <% }}}} %>
                                                                        <% }} %>
  const grabIncomeStmt = () => {
            const incomeStmtURL =
                `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials?symbol=${stockTicker}&region=US`
            //`${incomeURL}${stockTicker}${endURL}`
            let getIncomeStmt = fetch(incomeStmtURL, apiOptions);
            return getIncomeStmt
        }
        const grabBalanceSht = () => {
            const balanceShtURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-balance-sheet?symbol=${stockTicker}&region=US`
            // `${balanceURL}${stockTicker}${endURL}`
            let getBalanceSht = fetch(balanceShtURL, apiOptions);
            return getBalanceSht
        }
        const grabCashFlowSt = () => {
            const cashFlowStURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-cash-flow?symbol=${stockTicker}&region=US`
            //`${cashflowURL}${stockTicker}${endURL}`
            let getCashFlowSt = fetch(cashFlowStURL, apiOptions);
            return getCashFlowSt
        }
        const grabSlides = async () => {
            if (quoteType) {
                if (quoteType === "EQUITY") {
                    let fetchResultsArr = await Promise.all([
                        grabIncomeStmt(),
                        grabBalanceSht(),
                        grabCashFlowSt(),
                    ])
                        .then((resArr) => { return Promise.all(resArr.map(resp => resp.json())) })
                        .then((jsonDataArray) => {

                            let jsonIncome = jsonDataArray[0];
                            let jsonBalance = jsonDataArray[1];
                            let jsonCashflow = jsonDataArray[2];
                            return [jsonIncome, jsonBalance, jsonCashflow];
                        })
                        .catch((e) => console.log(e));

                    console.log("fetched:", fetchResultsArr)
                    return fetchResultsArr
                }
            }
        }
        const populateIncomeSt = () => {
        }
        const populateBalanceSht = () => { };
        const populateCashflowSt = () => { };

        */
