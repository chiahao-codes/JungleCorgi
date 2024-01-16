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
