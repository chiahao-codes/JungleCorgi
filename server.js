import express from 'express';
import yf2 from './src/yahoo2.js';
import path from 'path';
import cors from 'cors';
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

app.get("/tickrpro/:symbol", (req, res) => {
    res.sendStatus(res.statusCode);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
