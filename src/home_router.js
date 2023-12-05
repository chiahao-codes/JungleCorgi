import express from 'express'
const homeRouter = express.Router();

homeRouter.get("/", (req, res, next) => {
  return res.sendFile(__dirname + "/home.html");
});

export default homeRouter
