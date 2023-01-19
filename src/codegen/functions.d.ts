import { Dictionary } from 'ts-essentials';
import { CodegenConfig, FunctionDeclaration } from 'typechain';
interface GenerateFunctionOptions {
    returnResultObject?: boolean;
    isStaticCall?: boolean;
    overrideOutput?: string;
    codegenConfig: CodegenConfig;
}
export declare function codegenForFunctions(fns: Dictionary<FunctionDeclaration[]>, options: GenerateFunctionOptions): string;
export {};
