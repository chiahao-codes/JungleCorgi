import express from "express";
import cors from "cors";
import yahooFinance from "yahoo-finance2";
import "dotenv/config";
import Swiper from "swiper";

const PORT = process.env.PORT;
const API_KEY = process.env.KEY;
const MBOUMQUOTES = process.env.MBQ;
const MBQHOME = process.env.MBQHOME;
const RAPID = process.env.RAPID;
const swiper = new Swiper();
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.json());
app.use(cors());

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

  let queryOptions = { modules: ["price"] };
  for (let i = 0; i < symbols.length; i++) {
    let curr = symbols[i];
    let result = await yahooFinance.quoteSummary(curr, queryOptions);
    let indexKeys = Object.keys(indexPrices);
    indexPrices[indexKeys[i]] = result;
  }
  return indexPrices;
};

app.get("/", async (req, res, next) => {
  let prices = await runQuery(symbols);
  //console.log(prices);
  res.render("home", { prices, API_KEY, MBQHOME, RAPID });
});

app.get("/tickrpro/:symbol", async (req, res) => {
  let symbol = req.params.symbol;
  let checkSymbol = await yahooFinance
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

  if (
    !checkSymbol ||
    checkSymbol.price.quoteType === "ECNQUOTE" ||
    checkSymbol.price.quoteType === "MUTUALFUND"
  ) {
    res.render("404");
  }
  if (checkSymbol) {
    res.render("ticker", {
      checkSymbol,
      API_KEY,
      swiper,
      MBOUMQUOTES,
      RAPID,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
