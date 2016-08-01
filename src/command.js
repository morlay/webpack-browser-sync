import browserSync from 'browser-sync';
import yargs from 'yargs';

import getBrowserSyncConfig from './getBrowserSyncConfig';

const argv = yargs

  .usage('Usage: $0 [options]')

  .example('webpack-browser-sync')

  .options({
    config: {
      description: 'path to webpack.config',
      alias: 'c',
      default: './webpack.config.js',
      required: true,
    },
    webpack: {
      description: 'enable webpack',
      type: 'boolean',
      default: true,
    },
    hot: {
      description: 'enable hot module replacement [need enabled webpack]',
      type: 'boolean',
    },
    proxy: {
      description: 'use proxy for remote debug',
      type: 'string',
    },
    compress: {
      description: 'enable gzip',
      type: 'boolean',
    },
    historyApiFallback: {
      description: 'enable history api fallback',
      type: 'boolean',
    },
  })
  .help('help')
  .alias('help', 'h')
  .showHelpOnFail(false, 'whoops, something went wrong! run with --help')
  .argv;

browserSync(getBrowserSyncConfig(argv));
