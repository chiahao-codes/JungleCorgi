import express from 'express'
const tickerRouter = express.Router();

tickerRouter.get("/", (req, res, next) => {
  return res.sendFile(path.join(__dirname, "/ticker.html"));
});

export default tickerRouter;
