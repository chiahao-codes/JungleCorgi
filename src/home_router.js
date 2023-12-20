import express from 'express'
const homeRouter = express.Router();
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

homeRouter.get("/", (req, res, next) => {
  const options = {
    root: __dirname
  };
  const fileName = "/home.html"
  return res.sendFile(fileName, options);
});

export default homeRouter
