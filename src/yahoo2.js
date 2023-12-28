import yahooFinance from "yahoo-finance2"; 

let yf2 = async (stockTicker) => {
  let response = await yahooFinance
    .quote(stockTicker)
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });

  return response;
};

export default yf2