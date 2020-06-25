const fs = require("fs");
const webpack = require("webpack");
const chokidar = require("chokidar");
const clientConfig = require("./webpack.client.config");

module.exports = function setupDevServer(app) {
  let ready;
  const readyPromise = new Promise((r) => {
    ready = r;
  });

  // modify client config to work with hot middleware
  clientConfig.entry.app = [
    "webpack-hot-middleware/client",
    clientConfig.entry.app,
  ];
  clientConfig.output.filename = "[name].js";
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );

  // dev middleware
  const clientCompiler = webpack(clientConfig);
  clientCompiler.hooks.done.tap("wow", (stats) => {
    stats = stats.toJson();
    stats.errors.forEach((err) => console.error(err));
    stats.warnings.forEach((err) => console.warn(err));
    if (stats.errors.length) return;
    // clientManifest = JSON.parse(
    //   readFile(devMiddleware.fileSystem, "vue-ssr-client-manifest.json")
    // );
    ready(clientCompiler);
  });
  const devMiddleware = require("webpack-dev-middleware")(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true,
  });
  app.use(devMiddleware);
  // hot middleware
  app.use(
    require("webpack-hot-middleware")(clientCompiler, { heartbeat: 5000 })
  );

  return readyPromise;
};
