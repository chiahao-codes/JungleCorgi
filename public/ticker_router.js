const express = require("express") ;

const tickerRouter = express.Router();

tickerRouter.get("/", (req, res, next) => {
  return res.sendFile(path.join(__dirname, "/ticker.html"));
});

module.exports = tickerRouter;
