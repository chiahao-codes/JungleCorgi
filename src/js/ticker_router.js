import express from "express";
import path from "path";
const tickerRouter = express.Router();

tickerRouter.get("", (req, res) => {
  return res.sendFile(path.join("C:/Desktop/Ticqer2", "/dist/ticker.html"));
});

export default tickerRouter;
