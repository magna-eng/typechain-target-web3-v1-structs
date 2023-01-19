import { AbiOutputParameter, AbiParameter, EvmOutputType, EvmType, TupleType } from 'typechain';
interface GenerateTypeOptions {
    returnResultObject?: boolean;
    useStructs?: boolean;
}
export declare function codegenInputTypes(options: GenerateTypeOptions, input: Array<AbiParameter>): string;
export declare function codegenOutputTypes(options: GenerateTypeOptions, outputs: Array<AbiOutputParameter>): string;
export declare function codegenInputType(options: GenerateTypeOptions, evmType: EvmType): string;
export declare function codegenOutputType(options: GenerateTypeOptions, evmType: EvmOutputType): string;
export declare function codegenArrayOrTupleType(item: string, length?: number): string;
export declare function codegenObjectTypeLiteral(tuple: TupleType, generator: (evmType: EvmType) => string): string;
/**
 * Always return an array type; if there are named outputs, merge them to that type
 * this generates slightly better typings fixing: https://github.com/ethereum-ts/TypeChain/issues/232
 **/
export declare function codegenOutputComplexType(components: AbiOutputParameter[], options: GenerateTypeOptions): string;
export declare function codegenInputComplexType(components: AbiParameter[], options: GenerateTypeOptions): string;
export declare function codegenOutputComplexTypeAsArray(components: AbiOutputParameter[], options: GenerateTypeOptions): string;
export declare function codegenOutputComplexTypesAsObject(components: AbiOutputParameter[], options: GenerateTypeOptions): string | undefined;
export declare function codegenInputComplexTypeAsArray(components: AbiParameter[], options: GenerateTypeOptions): string;
export declare function codegenInputComplexTypesAsObject(components: AbiParameter[], options: GenerateTypeOptions): string | undefined;
export {};
