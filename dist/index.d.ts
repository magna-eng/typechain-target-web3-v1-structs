import { Config, FileDescription, TypeChainTarget } from 'typechain';
export interface IWeb3Cfg {
    outDir?: string;
}
export default class Web3V1 extends TypeChainTarget {
    name: string;
    private readonly outDirAbs;
    constructor(config: Config);
    transformFile(file: FileDescription): FileDescription | void;
    afterRun(): FileDescription[];
}
