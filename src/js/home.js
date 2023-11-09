import cnbcMarket from "cnbc-market";
import yahooFinance from "yahoo-finance2";


let runCnbc = async () => {
    let response = await cnbcMarket().then((data) => { return data }).catch((e) => { console.log(e) });
    return response
}

console.log(runCnbc());