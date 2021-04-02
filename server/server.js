const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
var fs = require("fs");
const app = express();
const path = require("path");
const config = require("../webpack.config.js");
const { pathToFileURL } = require("url");
const compiler = webpack(config);
const puppeteer = require("puppeteer");

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
// app.use(
//   webpackDevMiddleware(compiler, {
//     publicPath: config.output.publicPath,
//   })
// );

// app.use(
//   express.static(path.join(__dirname, "../dist"))
// ); /* this line tells Express to use the public folder as our static folder from which we can serve static files*/

// Serve the files on port 3000.

app.listen(3000, function (url) {
  console.log("Example app listening on port 3000!\n");
});
// app.use();
app.use((req, res, next) => {
  console.log(req.url, "123");
    res.append("Cache-Control", "123123123123");

  next();
});

const RENDER_CACHE = new Map();

async function ssr(url) {
  const start = Date.now();
  if (RENDER_CACHE.has(url)) {
    return RENDER_CACHE.get(url);
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  //   await page.setRequestInterception(true);
  //   page.on("request", (req) => {
  //     const url = req.url();
  //     if (url.endsWith(".png")) {
  //       return req.respond({
  //         status: 200,
  //       });
  //     }
  //     req.continue();
  //   });

  await page.goto(url);

  const html = await page.content(); // serialized HTML of page DOM.

  await browser.close();

  const ttRenderMs = Date.now() - start;
  RENDER_CACHE.set(url, html);

  return html;
}

app.use(express.static(path.join(__dirname, "public")));
app.get("/", async (req, res) => {
  const test = await ssr(`${req.protocol}://${req.get("host")}/index.html`);
  res.send(test);
});
