## Webpack Browser-sync

A webpack dev server with browser-sync

[![Build Status](https://img.shields.io/travis/morlay/webpack-browser-sync.svg?style=flat-square)](https://travis-ci.org/morlay/webpack-browser-sync)
[![NPM](https://img.shields.io/npm/v/webpack-browser-sync.svg?style=flat-square)](https://npmjs.org/package/webpack-browser-sync)
[![Dependencies](https://img.shields.io/david/morlay/webpack-browser-sync.svg?style=flat-square)](https://david-dm.org/morlay/webpack-browser-sync)
[![License](https://img.shields.io/npm/l/webpack-browser-sync.svg?style=flat-square)](https://npmjs.org/package/webpack-browser-sync)


```
Usage: webpack-browser-sync [options]

Options:
  --config, -c          path to webpack.config
                                     [required] [default: "./webpack.config.js"]
  --webpack             template path for generating file from graphs
                                                       [boolean] [default: true]
  --hot                 enable hot module replacement                  [boolean]
  --proxy               use proxy for remote debug                      [string]
  --compress            enable gzip                                    [boolean]
  --historyApiFallback  enable history api fallback                    [boolean]
```

Notice

* only support node >= 6
* `output.publicPath` should not use remote url for development
