/**
 * const proxy = createProxyMiddleware("/", {
  target: "http://localhost:8000",
  changeOrigin: false,
  selfHandleResponse: true,
  on: {
    proxyRes: responseInterceptor(
      async (responseBuffer, proxyRes, req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
      }
    ),
  },
});
 */

/**
 * const grabSlidesDataIncomeStatement = async (sheet) => {
            let results, url, period2, period1;

            url = `${yahooURL}${stockTicker}${yahooURLTail}`;

            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': `${apiKey}`,
                    'X-RapidAPI-Host': `${yahooHost}`
                }
            };

            try {
                const response = await fetch(url, options);
                results = await response.json();

            } catch (error) {
                console.error(error);
            }

            return results
        }


        const fillInCache = (category, iterableData, ttm = "--") => {
            let count = 1, year = "year", data;

            for (let i = 0; i < iterableData.length; i++) {
                year = `${year}${count}`;
                if (category === "endingYear") {

                    if (iterableData[i]) {
                        if (iterableData[i].endDate) {
                            let asOfDate = iterableData[i].endDate.fmt;
                            //fill in formatted dates of statement;
                            asOfDate = new Date(asOfDate);
                            data = asOfDate;
                        }
                    }

                    if (data !== undefined) {
                        dataCache[year] = new Intl.DateTimeFormat("en-US", {
                            dateStyle: 'short',
                            timeZone: 'UTC',
                        }).format(data)
                    }
                }

                if (category === "annualTotalRevenue" || category === "annualGrossProfit" || category === "operatingExpense" || category === "operatingIncome"
                    || category === "preTaxIncome" || category === "otherIncomeExpense" || category === "basic-eps"
                ) {

                    let fmtData = "--";
                    let currency = "--";

                    let endObj = iterableData.length - 1;
                    let endIndex = endObj - i;

                    if (endIndex >= 0) {
                        if (iterableData[endIndex] !== null) {
                            fmtData = iterableData[endIndex].reportedValue.fmt;

                            if (!dataCache["currency-code"]) {
                                currency = iterableData[endIndex].currencyCode;
                                dataCache["currency-code"] = currency;
                            }
                        };
                    }

                    dataCache[year] = fmtData;
                }

                if (ttm !== undefined) {
                    dataCache["ttm"] = ttm;
                }

                count += 1;
                year = "year";
                dataCache[`${year}${count}`] = "";
            }

        }
        const fillInDataDOM = (wrapper, category) => {
            for (let j = 0; j < wrapper.length; j++) {
                let currChild = wrapper[j];

                let ccy = dataCache["currency-code"];
                let allCcyDivs = document.querySelectorAll(".slide-data-wrapper > .currency");

                for (let div of allCcyDivs) {
                    div.innerText = `(${ccy})`
                }

                if (currChild.classList.contains("ttm")) {
                    currChild.innerText = dataCache["ttm"];
                }

                if (category === "fillInYearsForAll") {
                    let allSlideDataDivs = document.querySelectorAll(".slide-data-wrapper > .slide-data");
                    for (let slides of allSlideDataDivs) {
                        if (slides.classList.contains("endingyr1")) slides.innerText = dataCache["year1"]
                        if (slides.classList.contains("endingyr2")) slides.innerText = dataCache["year2"]
                        if (slides.classList.contains("endingyr3")) slides.innerText = dataCache["year3"]
                    }
                } else {

                    if (currChild.classList.contains("year1")) {
                        if (!dataCache["year1"]) currChild.innerText = "--";

                        currChild.innerText = dataCache["year1"];
                    }
                    if (currChild.classList.contains("year2")) {
                        if (!dataCache["year2"]) currChild.innerText = "--";
                        currChild.innerText = dataCache["year2"];
                    }
                    if (currChild.classList.contains("year3")) {
                        if (!dataCache["year3"]) currChild.innerText = "--";
                        currChild.innerText = dataCache["year3"];
                    }

                }
            }
        }
       
 * 
 * 
 * //get financials;
  //income statement
  let queryOptionsIS = {
    period1: "2023-12-31",
    type: "annual",
    module: "financials",
  };

  let queryOptionsISTrailing = {
    period1: "2023-01-01",
    type: "trailing",
    module: "financials",
  };

  let trailingIncomeStatement = await yahooFinance
    .fundamentalsTimeSeries(symbol, queryOptionsISTrailing)
    .then((data) => {
      return data;
    })
    .catch((e) => console.log(e));
  console.log("income statement trailing:", trailingIncomeStatement);

  let incomeStatementFinancials = await yahooFinance
    .fundamentalsTimeSeries(symbol, queryOptionsIS)
    .then((data) => {
      return data;
    })
    .catch((e) => console.log(e));
  console.log("income statement annual:", incomeStatementFinancials);
   *
  let per2 = Date.now() / 1000;
  let per1 = new Date("03/15/2020");
  //convert to epoch seconds;
  per1 = per1.getTime() / 1000;

  let result = await yahooFinance
    .fundamentalsTimeSeries(symbol, {
      period1: per1,
      period2: per2,
      type: "annual",
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((e) => console.log(e));
  console.log(result);



   /**
   * let insights = await yahooFinance
    .insights(symbol, { lang: "en-US", region: "US" })
    .then((data) => {
      return data;
    })
    .catch((e) => console.log(e));

  console.log(insights);


     <!--     <div id="technical-opinion-container">
                    <h5>Analyst Recommendation</h5>
                    <div id="tech-opinion-wrapper">
                        <div id="rating-wrapper" class="tech-wrappers">
                            <h6>Rating:</h6>
                            <h6 id="rating"></h6>
                        </div>
                        <div id="target-price-wrapper" class="tech-wrappers">
                            <h6>Target Price:</h6>
                            <h6 id="target-price"></h6>
                        </div>
                        <div id="source-wrapper" class="tech-wrappers">
                            <h6>Provided by:</h6>
                            <a href="https://www.argusresearch.com/" target="_blank">Argus Research</a>
                        </div>
                    </div>

                </div>-->
   * 
   */
/*
            //statement ending years:
            let years = slidedata.incomeStatementHistory.incomeStatementHistory;
            //cache data;
            fillInCache("endingYear", years, "TTM");
            //fill in the DOM;
            const incomeSlideYears = document.querySelector(".slide-boxes>.income-slide-years").children;
            fillInDataDOM(incomeSlideYears, "fillInYearsForAll");

            //revenue:
            let ttmRevenue = slidedata.timeSeries.trailingTotalRevenue[0].reportedValue.fmt;
            let annualRev = slidedata.timeSeries.annualTotalRevenue;

            fillInCache("annualTotalRevenue", annualRev, ttmRevenue);
            const revenueWrapper = document.querySelector(".slide-boxes>.revenue").children;
            fillInDataDOM(revenueWrapper);

            //gross profit
            let ttmGrossProfit = slidedata.timeSeries.trailingGrossProfit[0].reportedValue.fmt;
            let annualGrossProfit = slidedata.timeSeries.annualGrossProfit;
            fillInCache("annualGrossProfit", annualGrossProfit, ttmGrossProfit);
            const grossProfitWrapper = document.querySelector(".slide-boxes > .gross-profit").children;
            fillInDataDOM(grossProfitWrapper);

            //operating expense
            let ttmOperatingExpense = slidedata.timeSeries.trailingOperatingExpense[0].reportedValue.fmt;
            let annualOperatingExpense = slidedata.timeSeries.annualOperatingExpense;
            fillInCache("operatingExpense", annualOperatingExpense, ttmOperatingExpense);
            const operatingExpenseWrapper = document.querySelector(".slide-boxes > .operating-expense").children;
            fillInDataDOM(operatingExpenseWrapper);

            //operating income
            let ttmOperatingIncome = slidedata.timeSeries.trailingOperatingIncome[0].reportedValue.fmt;
            let annualOperatingIncome = slidedata.timeSeries.annualOperatingIncome;
            fillInCache("operatingIncome", annualOperatingIncome, ttmOperatingIncome);
            const operatingIncomeWrapper = document.querySelector(".slide-boxes > .operating-income").children;
            fillInDataDOM(operatingIncomeWrapper);

            //pre-tax income
            let ttmPreTaxIncome = slidedata.timeSeries.trailingPretaxIncome[0].reportedValue.fmt;
            let annualPreTaxIncome = slidedata.timeSeries.annualPretaxIncome;
            fillInCache("preTaxIncome", annualPreTaxIncome, ttmPreTaxIncome);
            const preTaxIncomeWrapper = document.querySelector(".slide-boxes > .pre-tax-income").children;
            fillInDataDOM(preTaxIncomeWrapper);

            //other income expense
            let ttmOtherIncomeExpense = "--";
            if (slidedata.timeSeries.trailingOtherIncomeExpense[0]) {
                ttmOtherIncomeExpense = slidedata.timeSeries.trailingOtherIncomeExpense[0].reportedValue.fmt;
            }

            let annualOtherIncomeExpense = slidedata.timeSeries.annualOtherIncomeExpense;
            fillInCache("otherIncomeExpense", annualPreTaxIncome, ttmOtherIncomeExpense);
            const otherIncomeExpenseWrapper = document.querySelector(".slide-boxes > .other-income-expense").children;
            fillInDataDOM(otherIncomeExpenseWrapper);

            //basic eps
            let ttmBasicEPS = slidedata.timeSeries.trailingBasicEPS[0].reportedValue.fmt;
            let annualBasicEps = slidedata.timeSeries.annualBasicEPS;
            fillInCache("basic-eps", annualBasicEps, ttmBasicEPS);
            const basicEpsWrapper = document.querySelector(".slide-boxes > .basic-eps").children;
            fillInDataDOM(basicEpsWrapper);
            */

/*
if (int === "5m") {
                formatted = new Intl.DateTimeFormat('en-US', {
                    timeStyle: 'long',
                    timeZone: 'UTC',
                }).format(date)
            }
            */
//populate date headings
//  let incomeSlideData = await grabSlidesDataIncomeStatement("income");
// let keys = Object.keys(incomeSlideData);
