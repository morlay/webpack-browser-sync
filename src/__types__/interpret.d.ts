declare module "interpret" {
  interface IInterpret {
    module: string;
    register: (module: any) => void;
  }

  type TModuleDescriptor = null | string | string[] | IInterpret;

  interface IInterpretMap {
    extensions: { [key: string]: TModuleDescriptor };
  }

  const interpret: IInterpretMap;

  export = interpret;
}
