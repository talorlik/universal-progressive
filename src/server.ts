import "reflect-metadata";
import "zone.js/dist/zone-node";
import { renderModuleFactory } from "@angular/platform-server";
import { enableProdMode } from "@angular/core";
import * as express from "express";
import { join } from "path";
import { readFileSync } from "fs";
import * as https from "https";

enableProdMode();

const PORT = process.env.PORT || 4500;
const DIST_FOLDER = join(process.cwd(), "dist");

const app = express();

const template = readFileSync(
  join(DIST_FOLDER, "browser", "index.html")
).toString();
const { AppServerModuleNgFactory } = require("main.server");

app.engine("html", (_, options, callback) => {
  const opts = { document: template, url: options.req.url };

  renderModuleFactory(AppServerModuleNgFactory, opts).then(html =>
    callback(null, html)
  );
});

app.set("view engine", "html");
app.set("views", "src");

// Server static files from /browser
app.get("*.*", express.static(join(DIST_FOLDER, "browser")));

// All regular routes use the Universal engine
app.get("*", (req, res) => {
  res.render(join(DIST_FOLDER, "browser", "index.html"), { req });
});

// HTTPS support
const options = {
  key: readFileSync("./ssl/key.pem"),
  cert: readFileSync("./ssl/cert.pem")
};

// Start up the Node server
https.createServer(options, app).listen(PORT, () => {
  console.log(`listening on https://localhost:${PORT}!`);
});
