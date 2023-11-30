const express = require("express") ;
const homeRouter = express.Router();

homeRouter.get("/", (req, res, next) => {
  return res.sendFile(__dirname + "/home.html");
});

module.exports = homeRouter;
