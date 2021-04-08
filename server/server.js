const express = require("express");
const app = express();
const path = require("path");

const puppeteer = require("puppeteer");

app.listen(3000, function () {});

app.use((req, res, next) => {
  res.append("Cache-Control", "123123123123");

  next();
});

const RENDER_CACHE = new Map();

async function ssr(url) {
  if (RENDER_CACHE.has(url)) {
    return RENDER_CACHE.get(url);
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);

  const html = await page.content();

  await browser.close();

  RENDER_CACHE.set(url, html);

  return html;
}

app.use(express.static(path.join(__dirname, "../dist")));
app.get("/", async (req, res) => {
  const test = await ssr(`${req.protocol}://${req.get("host")}/index.html`);
  res.send(test);
});
