declare module "webpack-hot-middleware" {
  import * as browserSync from "browser-sync"
  import * as webpack from "webpack"

  interface IHotOptions {
    log?: () => void
    path?: string
    heartbeat?: number
  }

  function webpackHotMiddleware(compiler: webpack.Compiler, opts?: IHotOptions): browserSync.MiddlewareHandler

  namespace webpackHotMiddleware {
  }

  export = webpackHotMiddleware
}
