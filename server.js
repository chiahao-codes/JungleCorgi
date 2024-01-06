import express from 'express';
import cors from 'cors';
import yf2 from './public/yahoo2.js';
import cnbcMarket from 'cnbc-market';

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.json());
app.use(cors());

//arrows
const up17 = "/up17.png";
const down17 = "/down17.png";
let arrow = down17;

app.get("/", (req, res, next) => {
    res.render("home", {arrow});
});

app.get("/tickrpro/:symbol", async (req, res) => {
   // let symbol = req.params.symbol;
   // symbol = symbol.toUpperCase();
   // let result = await yf2(symbol);
  //  const __filename2 = fileURLToPath(import.meta.url);
   // if (result !== undefined) {
  //      res.sendFile("./dist/ticker.html", { root: path.dirname(__filename2)});
  //  } else {
   //     res.sendStatus(404);
    //  }
    res.render("ticker");
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


/**
 * let todaysDate = () => {
    let date = setTodaysDate();
    let index = 0;
    setInterval(() => {
        date = setTodaysDate();
    
    }, 980);
   
    return date
}

let mktStatus = () => {
    let status = marketStatusCheck();
    setInterval(() => {
        status = marketStatusCheck(); 
        console.log(status);
    }, 930);
    return status
}
 */