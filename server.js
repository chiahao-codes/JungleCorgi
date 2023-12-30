import express from 'express';
import path from 'path';
import cors from 'cors';
import yf2 from './src/yahoo2.js';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

app.get("/", (req, res, next) => {
    const __filename = fileURLToPath(import.meta.url);
    res.sendFile('./dist/home.html', { root:path.dirname(__filename)});
});

app.get("/tickrpro/:symbol", async (req, res) => {
    let symbol = req.params.symbol;
    symbol = symbol.toUpperCase();
    let result = await yf2(symbol);
    const __filename2 = fileURLToPath(import.meta.url);
    if (result !== undefined) {
        res.sendFile("./dist/ticker.html", { root: path.dirname(__filename2)});
    } else {
        res.sendStatus(404);
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
