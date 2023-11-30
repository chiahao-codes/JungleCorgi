const yahooFinance = require("yahoo-finance2"); 

let yf2 = async (stockTicker)=> {
    let response = await yahooFinance.quote(stockTicker).then((data) => {
        return data
    }).catch((e) => { console.log(e) });

    return response
}

module.exports = yf2