import * as browserSync from "browser-sync"
import * as _ from "lodash"
import * as MemoryFS from "memory-fs"
import * as path from "path"
import * as webpack from "webpack"
import * as webpackDevMiddleware from "webpack-dev-middleware"
import * as webpackHotMiddleware from "webpack-hot-middleware"

export const HMR_ENTRY = "webpack-hot-middleware/client"

export interface IPlugin extends webpack.Plugin {
  new (): IPlugin;
}

export const getHmrPluginsByVersion = (): IPlugin[] => {
  const version = require("webpack/package.json").version
  const majarVersion = String(version).split(".")[0]

  switch (majarVersion) {
    case "1":
      throw new Error("not support webpack@1")
    case "2":
    default:
      return [
        webpack.HotModuleReplacementPlugin,
      ] as IPlugin[]
  }
}

const concatHMREntry = (entry: string): string[] => [HMR_ENTRY].concat(entry)

const isOneOfPlugins = (PluginList: IPlugin[], plugin: webpack.Plugin) =>
  _.reduce(PluginList, (result, Plugin) => (result || (plugin instanceof Plugin)), false)

export const patchEntryWithHMR = (entry: string | { [k: string]: string }): string[] | { [k: string]: string[] } => {
  if (_.isObject(entry)) {
    return _.mapValues(entry as { [k: string]: string }, concatHMREntry)
  }
  return concatHMREntry(entry as string)
}

export const patchPlugins = (plugins: IPlugin[]) => {
  const hmrPlugins = getHmrPluginsByVersion()
  const cleanedPlugins = _.dropWhile(plugins, (plugin) => isOneOfPlugins(hmrPlugins, plugin))
  return _.concat(cleanedPlugins, _.map(hmrPlugins, (Plugin: IPlugin) => new Plugin()))
}

export const patchWebConfigWithHMR = (webpackConfig: webpack.Configuration): webpack.Configuration => ({
  ...webpackConfig,
  entry: patchEntryWithHMR(webpackConfig.entry as string),
  plugins: patchPlugins(webpackConfig.plugins as IPlugin[]),
})

export const createMiddlewaresForWebpack = (
  webpackConfig: webpack.Configuration,
  index: string,
  hot: boolean = false,
) => {

  const patchedWebpackConfig = hot
    ? patchWebConfigWithHMR(webpackConfig)
    : webpackConfig

  const bundler = webpack(patchedWebpackConfig)

  const fs = new MemoryFS()

  bundler.outputFileSystem = fs

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
    },
  })

  const devServerMiddlewares = [
    devMiddleware,
    ((req, res, next) => {
      devMiddleware.waitUntilValid(() => {
        if (req.method === "GET" && req.url === "/") {
          const indexFile = path.join(webpackConfig.output.path, index)
          res.write(fs.readFileSync(indexFile))
          return res.end()
        }
        return next()
      })
    }) as browserSync.MiddlewareHandler,
  ]

  if (hot) {
    return [
      webpackHotMiddleware(bundler),
      ...devServerMiddlewares,
    ]
  }

  return devServerMiddlewares
}
