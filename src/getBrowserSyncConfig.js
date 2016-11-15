import webpack from 'webpack';
import path from 'path';

import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import compress from 'compression';
import connectHistoryApiFallback from 'connect-history-api-fallback';

import getBaseDir from './getBaseDir';
import patchWebConfigWithHMR from './patchWebConfigWithHMR';

const getBrowserSyncConfig = (argv) => {
  const webpackConfigFile = path.join(process.cwd(), argv.config);
  /* eslint global-require: 0 */
  /* eslint import/no-dynamic-require: 0 */
  const webpackConfig = require(webpackConfigFile);
  const webpackVersion = require('webpack/package.json').version;

  const patchedWebpackConfig = argv.hot
    ? patchWebConfigWithHMR(webpackConfig, webpackVersion)
    : webpackConfig;

  const middleware = [];

  if (argv.historyApiFallback) {
    middleware.push(connectHistoryApiFallback({
      index: '/',
    }));
  }

  if (argv.webpack) {
    const bundler = webpack(patchedWebpackConfig);

    if (argv.hot) {
      middleware.push(
        webpackHotMiddleware(bundler),
      );
    }

    const devMiddleware = webpackDevMiddleware(bundler, {
      publicPath: patchedWebpackConfig.output.publicPath,
      stats: patchedWebpackConfig.stats || {
        colors: true,
        reasons: true,
        hash: false,
        version: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        cached: false,
        cachedAssets: false,
      },
    });

    middleware.push(devMiddleware);

    middleware.push((req, res, next) => {
      if (req.method === 'GET' && req.url === '/') {
        const indexFile = path.join(patchedWebpackConfig.output.path, argv.index);
        devMiddleware.fileSystem.readFile(indexFile, (err, result) => {
          if (err) {
            throw err;
          }
          res.write(result);
          res.end();
        });
      } else {
        next();
      }
    });
  }

  if (argv.compress) {
    middleware.push(compress({
      level: 6,
    }));
  }

  if (argv.proxy) {
    return {
      proxy: {
        target: argv.proxy,
        middleware,
      },
    };
  }

  return {
    server: {
      notify: false,
      baseDir: getBaseDir(patchedWebpackConfig.output),
      index: path.join(patchedWebpackConfig.output.publicPath || '/', argv.index),
      middleware,
    },
  };
};

export default getBrowserSyncConfig;
