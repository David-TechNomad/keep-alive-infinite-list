const fs = require("fs");
const path = require("path");
const express = require("express");
const setUpDevServer = require("./build/setup-dev-server");
const isProd = process.env.NODE_ENV === "production";

const HTML_FILE = path.join(__dirname, "./dist/index.html");

const app = express();

const resolve = (file) => path.resolve(__dirname, file);
const serve = (path, cache) =>
  express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0,
  });

app.use("/dist", serve("./dist", true));
app.use("/public", serve("./public", true));
const serverReady = setUpDevServer(app);

app.get("*", (req, res) => {
  serverReady.then((clientCompiler) => {
    clientCompiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set("content-type", "text/html");
      res.send(result);
      res.end();
    });
  });
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
