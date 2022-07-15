import bodyParser from "body-parser";
import express from "express";
const cors = require("cors");

import { iterateObj } from "./utils";

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

app.post("/translate/:lang", async (req, res) => {
  console.log(req.body);
  console.log(req.params.lang);

  const source = req.body;
  const translatedSource = JSON.parse(JSON.stringify(source));
  const targetLang = req.params.lang;

  await iterateObj(translatedSource, targetLang);

  res.json(translatedSource);
});

app.get("/", async (req, res) => {
  res.json({ Hello: "World" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
