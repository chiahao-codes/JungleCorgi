import express from 'express'
const tickerRouter = express.Router();
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

tickerRouter.get("/", (req, res, next) => {
  const options = {
    root: __dirname,
  };
  const fileName = "/ticker.html";
  return res.sendFile(fileName, options);
});

export default tickerRouter;
