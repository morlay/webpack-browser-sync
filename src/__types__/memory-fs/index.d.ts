declare module "memory-fs" {
  interface MemoryFileSystem {
    data: any;

    new(data?: any): MemoryFileSystem;

    meta(pathString: string): any;

    existsSync(pathString: string): boolean;

    statSync(
      pathString: string
    ): {
      isFile: () => boolean;
      isDirectory: () => boolean;
      isBlockDevice: () => boolean;
      isCharacterDevice: () => boolean;
      isSymbolicLink: () => boolean;
      isFIFO: () => boolean;
      isSocket: () => boolean;
    };

    readFileSync(pathString: string, encoding?: string): any;

    readdirSync(pathString: string): string[];

    mkdirpSync(pathString: string): void;

    mkdirSync(pathString: string): void;

    _remove(pathString: string, name: string, testFn: (part: string) => boolean): void;

    rmdirSync(pathString: string): void;

    unlinkSync(pathString: string): void;

    readlinkSync(pathString: string): void;

    writeFileSync(pathString: string, content: string | Buffer, encoding?: string): void;

    createReadStream(
      path: string,
      options: {
        start: number;
        end: number;
      }
    ): any;

    createWriteStream(path: string, options: any): any;

    exists(path: string, callback: (isExist: boolean) => any): any;

    writeFile(path: string, content: string | Buffer, callback: (err?: Error) => any): any;

    writeFile(path: string, content: string | Buffer, encoding: string, callback: (err?: Error) => any): any;

    join(path: string, request: string): string;

    pathToArray(path: string): string[];

    normalize(path: string): string;

    stat(path: string, callback: (err?: Error, result?: any) => any): void;

    readdir(path: string, callback: (err?: Error, result?: any) => any): void;

    mkdirp(path: string, callback: (err?: Error, result?: any) => any): void;

    rmdir(path: string, callback: (err?: Error, result?: any) => any): void;

    unlink(path: string, callback: (err?: Error, result?: any) => any): void;

    readlink(path: string, callback: (err?: Error, result?: any) => any): void;

    mkdir(path: string, optArg: {}, callback: (err?: Error, result?: any) => any): void;

    readFile(path: string, optArg: {}, callback: (err?: Error, result?: any) => any): void;
  }

  const mfs: MemoryFileSystem;
  export = mfs;
}