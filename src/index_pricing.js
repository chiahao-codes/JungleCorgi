const cnbcMarket = require("cnbc-market");

//update prices of index;
let updateIndexData = async (
  iterable,
  prop,
  imgUp,
  imgDown,
  runcnbc = cnbcMarket
) => {
  //get prices from cnbc;
  let marketData = await cnbcMarket()
    .then((data) => {
      return data;
    })
    .catch((e) => {
      return e.message;
    });

  if (!marketData) {
    console.log("Error: CnbcMarket Api error");
    return;
  }

  let cnbc = {
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

  for (let i = 0; i < iterable.length; i++) {
    let attr = iterable[i].classList[0];

    if (cnbc[attr]) {
      if (prop === "value" && cnbc[attr].value) {
        let value = parseFloat(cnbc[attr].value);
        let formatCcy = new Intl.NumberFormat("en-US");
        let cnbcValue = formatCcy.format(value);
        iterable[i].innerText = cnbcValue;
      }

      if (prop === "change" && cnbc[attr].change) {
        iterable[i].innerText = cnbc[attr].change;
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
};

module.exports = updateIndexData;
