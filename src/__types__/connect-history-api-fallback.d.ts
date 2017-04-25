declare module "connect-history-api-fallback" {
  import * as browserSync from "browser-sync"

  interface IOptions {
    index: string;
  }

  function connectHistoryApiFallback(opts?: IOptions): browserSync.MiddlewareHandler;

  namespace connectHistoryApiFallback {
  }

  export = connectHistoryApiFallback
}
