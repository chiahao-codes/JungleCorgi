import express from "express";
import cors from "cors";
import "dotenv/config";
import { Chart } from "chart.js";
import pkg from "@date/holidays-us";
import cookieParser from "cookie-parser";

const holidays = pkg;
//console.log(holidays);

let PORT = process.env.PORT || 3000;
const API_KEY = process.env.KEY;
const RAPID = process.env.RAPID;
const CURR_DOMAIN = process.env.DOMAIN;
const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

const chartJS = Chart;
const app = express();
const cache = {
  "DOGE COIN": "DOGE",
  "THE DOGE COIN": "DOGE",
  DOGEFATHER: "DOGE",
  "THE DOGE FATHER": "DOGE",
  DOGECOIN: "DOGE",
  GOOGLE: "GOOG",
  SNAPCHAT: "SNAP",
  "PAY PAL": "PYPL",
  VISA: "V",
  FACEBOOK: "META",
  MICROSOFT: "MSFT",
  DOMINOS: "DPZ",
  "DOMINOS PIZZA": "DPZ",
  HILTON: "HLT",
  "THE HILTON": "HLT",
  MARRIOTT: "MAR",
  "THE MARRIOT": "MAR",
  TSMC: "TSM",
  "WALT DISNEY": "DIS",
  DISNEY: "DIS",
  "THE WALT DISNEY COMPANY": "DIS",
};

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://junglecorgi.com",
      "http://localhost:3000",
      "https://www.junglecorgi.com",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const apiOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": RAPID,
    "content-type": "application/json",
  },
};

let runQuery = async () => {
  let url =
    "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=%5EGSPC%2C%20%5EIXIC%2C%5EDJI%2C%5EN225%2C%5EHSI%2C%5EFTSE%2C%20BTC-USD%2C%20%5EVVIX%2C%20GC%3DF%2C%20CL%3DF%2C%20NG%3DF%2C%5ETNX%2C%20JPY%3DX%2C%20EURUSD%3DX%2C%20%5ERUT";

  const response = await fetch(url, apiOptions);
  if (!response.ok) {
    // throw here, instead of returning a number
    const text = await response.text();
    throw new Error(`api ${response.status}: ${text}`);
  }
  return response.json(); // always an object
};

// Verify human via cookie middleware (optional)
function requireHuman(req, res, next) {
  if (req.cookies.isHuman !== "1") {
    return res.redirect("/"); // or render a 403 page
  }
  next();
}

app.get("/", async (req, res, next) => {
  /**
   *  res.render("home", {
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    actionName: "homepage",
  });
   */

  res.render("error");
});

// Render the ticker page for a given symbol
app.get("/ticker/:symbol", requireHuman, async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  let autoCompResp;
  let firstChar = symbol.charAt(0);
  if (firstChar === ".") symbol = symbol.replace(".", "^");
  if (cache[symbol]) symbol = cache[symbol];
  // Disable any HTTP caching
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );

  // 1) Auto-complete lookup
  try {
    const acRes = await fetch(
      `https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?region=US&q=${symbol}`,
      apiOptions
    );
    autoCompResp = await acRes.json();
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: "Autocomplete lookup failed" });
  }

  const quotesArr = autoCompResp.quotes || [];
  if (quotesArr.length === 0) {
    return res.status(404).render("404"); // no matches
  }

  // 2) pick the first matching quote
  let match = null;
  for (const q of quotesArr) {
    const shortUp = (q.shortname || "").toUpperCase();
    if (q.symbol === symbol || shortUp.includes(symbol)) {
      match = q;
      break;
    }
  }
  if (!match) {
    return res.status(404).render("404");
  }

  // 3) reject unsupported quote types
  const badTypes = ["ECNQUOTE", "MUTUALFUND", "NONE", "mutual_fund"];
  if (badTypes.includes(match.quoteType)) {
    return res.status(404).render("404");
  }

  res.render("ticker", {
    RECAPTCHA_SITE_KEY: RECAPTCHA_SITE_KEY,
    actionName: "tickerpage",
    CURR_DOMAIN,
    symbol: match.symbol,
    shortName: match.shortname,
    longName: match.longname,
  });
});

app.get("/index-prices", async (req, res) => {
  console.log("🔥 /index-prices was called");
  // Disable any HTTP caching
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");

  // 1) Check the “isHuman” cookie
  if (req.cookies.isHuman !== "1") {
    return res.status(403).json({ error: "Forbidden" });
  }

  // 2) Fetch live prices from RapidAPI
  try {
    const prices = await runQuery();
    console.log("Prices:", prices);
    return res.json(prices);
  } catch (err) {
    console.error("Pricing lookup error:", err);
    return res.status(502).json({ error: "Pricing lookup failed" });
  }
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

app.get("/old", async (req, res) => {
  /**
   *  let symbol = req.params.symbol,
    quote,
    quoteType,
    quoteSymbol,
    shortName,
    longName,
    autoCompResp,
    breakStatement;
   */

  if (req.cookies.isHuman !== "1") {
    return res.status(403).json({ error: "Forbidden" });
  }

  let symbol = req.params.symbol.toUpperCase();

  //verify search/symbol exists;
  //if so, look up pricing info via yahu stock quote;
  let firstChar = symbol.charAt(0);
  if (firstChar === ".") symbol = symbol.replace(".", "^");
  if (cache[symbol]) symbol = cache[symbol];

  /**
   * const yahuAutoCompURL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?region=US&q=${symbol}`;

  try {
    yahuAutoComplete = await fetch(yahuAutoCompURL, apiOptions);
    autoCompResp = await yahuAutoComplete.json();
  } catch (error) {
    console.log(error);
    return res.render("error");
  }
   //iterate over quotes
  let quotesArr = autoCompResp.quotes;
  let newsArr = autoCompResp.news;
  if (quotesArr.length === 0) return res.render("404");

  if (quotesArr.length > 0) {
    for (let i = 0; i < quotesArr.length; i++) {
      if (breakStatement) break;
      quote = quotesArr[i];
      let quoteShortname = quote.shortname.toUpperCase();
      if (quote.symbol === symbol || quoteShortname.includes(symbol)) {
        quoteType = quote.quoteType;
        shortName = quote.shortname;
        longName = quote.longname;
        quoteSymbol = quote.symbol;

        breakStatement = true;
        break;
      }
    }
  }

  if (
    quoteType === "ECNQUOTE" ||
    quoteType === "MUTUALFUND" ||
    quoteType === "NONE" ||
    quoteType === "mutual_fund"
  ) {
    return res.render("404");
  }

  let newsTitle, newsPublisher, newsLink, newsTime, breakNews;
  if (newsArr.length > 0) {
    for (let ele of newsArr) {
      if (breakNews) break;
      newsTitle = ele.title;
      newsPublisher = ele.publisher;
      newsLink = ele.link;
      newsTime = ele.providerPublishTime;
      breakNews = true;
      break;
    }
  }
  
   return res.json({
    autoCompResp,
    quoteType,
    shortName,
    longName,
    newsTitle,
    newsPublisher,
    newsLink,
    newsTime,
    chartJS,
    quoteSymbol,
  });
   */

  let autoCompResp;
  // Disable any HTTP caching
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );

  // 1) Auto-complete lookup
  try {
    const acRes = await fetch(
      `https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?region=US&q=${symbol}`,
      apiOptions
    );
    autoCompResp = await acRes.json();
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: "Autocomplete lookup failed" });
  }

  const quotesArr = autoCompResp.quotes || [];
  if (quotesArr.length === 0) {
    return res.status(404).render("404"); // no matches
  }

  // 2) pick the first matching quote
  let match = null;
  for (const q of quotesArr) {
    const shortUp = (q.shortname || "").toUpperCase();
    if (q.symbol === symbol || shortUp.includes(symbol)) {
      match = q;
      break;
    }
  }
  if (!match) {
    return res.status(404).render("404");
  }

  // 3) reject unsupported quote types
  const badTypes = ["ECNQUOTE", "MUTUALFUND", "NONE", "mutual_fund"];
  if (badTypes.includes(match.quoteType)) {
    return res.status(404).render("404");
  }
  res.json({ quote: match });
});

app.get("/api/quote/:symbol", async (req, res) => {
  return res.redirect("/error"); // TODO: remove this line when done testing
  console.log("🔥 /api/quote/:symbol was called");
  /**
   * 

  // 0) Human check
  if (req.cookies.isHuman !== "1") {
    return res.status(403).json({ error: "Forbidden" });
  }

  // 1) Normalize
  let symbol = req.params.symbol.trim().toUpperCase();
  if (symbol.startsWith(".")) symbol = `^${symbol.slice(1)}`;
  if (cache[symbol]) symbol = cache[symbol];

  // 2) Disable HTTP caching
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );

  // 3) Auto-complete lookup
  let autoCompResp;
  try {
    const acRes = await fetch(
      `https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?region=US&q=${encodeURIComponent(
        symbol
      )}`,
      apiOptions
    );
    autoCompResp = await acRes.json();
  } catch (err) {
    console.error("Autocomplete lookup failed", err);
    return res.status(502).json({ error: "Autocomplete lookup failed" });
  }

  // 4) No match → JSON 404
  const quotesArr = autoCompResp.quotes || [];
  if (!quotesArr.length) {
    return res.status(404).json({ error: `No such symbol: ${symbol}` });
  }

  // 5) Pick first close match
  const match = quotesArr.find((q) => {
    const name = (q.shortname || "").toUpperCase();
    return q.symbol === symbol || name.includes(symbol);
  });
  if (!match) {
    return res.status(404).json({ error: `No match for symbol: ${symbol}` });
  }

  // 6) Reject unsupported types
  const badTypes = ["ECNQUOTE", "MUTUALFUND", "NONE", "mutual_fund"];
  if (badTypes.includes(match.quoteType)) {
    return res
      .status(404)
      .json({ error: `Unsupported quote type: ${match.quoteType}` });
  }

  // 7) Success
  return res.json({ quote: match });
     */
});

// Verify the token Google gave you
app.post("/verify-captcha", async (req, res) => {
  const { token, actionName } = req.body;
  // console.log("▶️  /verify-captcha hit:", { token, actionName });
  if (!token || !actionName) {
    return res.status(400).json({ success: false, error: "Bad request" });
  }

  // 1) Verify with Google
  const params = new URLSearchParams({
    secret: RECAPTCHA_SECRET_KEY,
    response: token,
  });
  let payload;
  try {
    const googleRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      { method: "POST", body: params }
    );
    payload = await googleRes.json();
    console.log("Google reCAPTCHA response:", payload);
  } catch (err) {
    console.error("reCAPTCHA verify error:", err);
    return res.status(500).json({ success: false });
  }

  const human =
    payload.success && payload.action === actionName && payload.score >= 0.8; // tweak threshold to taste

  if (!human) {
    return res.status(403).json({ success: false, error: "Bot check failed" });
  }

  // 2) Mark this client as “human” in a cookie (5-minute TTL)
  res.cookie("isHuman", "1", {
    maxAge: 5 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
  });
  return res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
