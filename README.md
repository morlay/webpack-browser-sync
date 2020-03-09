## Webpack Browser-sync

A webpack@1&2 dev server with browser-sync

[![NPM](https://img.shields.io/npm/v/@morlay/webpack-browser-sync.svg?style=flat-square)](https://npmjs.org/package/webpack-browser-sync)
[![License](https://img.shields.io/npm/l/@morlay/webpack-browser-sync.svg?style=flat-square)](https://npmjs.org/package/webpack-browser-sync)
[![Build Status](https://img.shields.io/travis/morlay/webpack-browser-sync.svg?style=flat-square)](https://travis-ci.org/morlay/webpack-browser-sync)

```
Usage: webpack-browser-sync [options]

Options:
  --config, -c          path to webpack.config
                                     [required] [default: "./webpack.config.js"]
  --webpack             enable webpack
                                                       [boolean] [default: true]
  --index               index.html relative path from webpackConfig.output.path
                                                  [string] [default: index.html]
  --hot                 enable hot module replacement [need webpack enabled]
                                                                       [boolean]
  --proxy               use proxy for remote debug                      [string]
  --compress            enable gzip                                    [boolean]
  --historyApiFallback  enable history api fallback                    [boolean]
```

Notice

- only support node >= 12
- `output.publicPath` should not use remote url for development
