import express from "express";
import path from "path";
const routerHome = express.Router();

routerHome.get("/", (req, res, next) => {
  return res.sendFile(path.join("C:/Desktop/Ticqer2", "/dist/home.html"));
});

export default routerHome;
