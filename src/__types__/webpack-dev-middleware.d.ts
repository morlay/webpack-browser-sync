declare module "webpack-dev-middleware" {
  import { NextHandleFunction } from "connect";
  import * as loglevel from "loglevel";
  import * as MemoryFileSystem from "memory-fs";
  import * as webpack from "webpack";

  export = WebpackDevMiddleware;

  function WebpackDevMiddleware(
    compiler: webpack.ICompiler,
    options?: WebpackDevMiddleware.Options,
  ): WebpackDevMiddleware.WebpackDevMiddleware & NextHandleFunction;

  namespace WebpackDevMiddleware {
    interface Options {
      logLevel?: string;
      lazy?: boolean;
      watchOptions?: webpack.Options.WatchOptions;
      publicPath: string;
      index?: string;
      headers?: {
        [name: string]: string;
      };
      stats?: webpack.Options.Stats;
      reporter?: Reporter | null;
      serverSideRender?: boolean;
      logger?: Logger;
      filename?: string;
    }

    interface ReporterOptions {
      state: boolean;
      stats?: webpack.Stats;
      log: Logger;
    }

    type Logger = loglevel.Logger;
    type Reporter = (middlewareOptions: Options, reporterOptions: ReporterOptions) => void;

    interface WebpackDevMiddleware {
      close(callback?: () => void): void;

      invalidate(callback?: (stats: webpack.Stats) => void): void;

      waitUntilValid(callback?: (stats: webpack.Stats) => void): void;

      getFilenameFromUrl: (url: string) => string | false;
      fileSystem: typeof MemoryFileSystem;
    }
  }
}
