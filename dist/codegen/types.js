"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codegenInputComplexTypesAsObject = exports.codegenInputComplexTypeAsArray = exports.codegenOutputComplexTypesAsObject = exports.codegenOutputComplexTypeAsArray = exports.codegenInputComplexType = exports.codegenOutputComplexType = exports.codegenObjectTypeLiteral = exports.codegenArrayOrTupleType = exports.codegenOutputType = exports.codegenInputType = exports.codegenOutputTypes = exports.codegenInputTypes = void 0;
const lodash_1 = require("lodash");
const common_1 = require("../common");
function codegenInputTypes(options, input) {
    if (input.length === 0) {
        return '';
    }
    return (input.map((input, index) => `${input.name || `arg${index}`}: ${codegenInputType(options, input.type)}`).join(', ') +
        ', ');
}
exports.codegenInputTypes = codegenInputTypes;
function codegenOutputTypes(options, outputs) {
    if (!options.returnResultObject && outputs.length === 1) {
        return codegenOutputType(options, outputs[0].type);
    }
    else {
        return codegenOutputComplexType(outputs, options);
    }
}
exports.codegenOutputTypes = codegenOutputTypes;
function codegenInputType(options, evmType) {
    switch (evmType.type) {
        case 'integer':
        case 'uinteger':
            return 'number | string | BN';
        case 'address':
            return 'string';
        case 'bytes':
        case 'dynamic-bytes':
            return 'string | number[]';
        case 'array':
            return codegenArrayOrTupleType(codegenInputType(options, evmType.itemType), evmType.size);
        case 'boolean':
            return 'boolean';
        case 'string':
            return 'string';
        case 'tuple':
            if (evmType.structName && options.useStructs) {
                return evmType.structName.toString() + common_1.STRUCT_INPUT_POSTFIX;
            }
            return codegenInputComplexType(evmType.components, { ...options, useStructs: true });
        case 'unknown':
            return 'any';
    }
}
exports.codegenInputType = codegenInputType;
function codegenOutputType(options, evmType) {
    switch (evmType.type) {
        case 'integer':
            return 'string';
        case 'uinteger':
            return 'string';
        case 'address':
            return 'string';
        case 'void':
            return 'void';
        case 'bytes':
        case 'dynamic-bytes':
            return 'string';
        case 'array':
            return codegenArrayOrTupleType(codegenOutputType(options, evmType.itemType), evmType.size);
        case 'boolean':
            return 'boolean';
        case 'string':
            return 'string';
        case 'tuple':
            if (evmType.structName && options.useStructs) {
                return evmType.structName.toString() + common_1.STRUCT_OUTPUT_POSTFIX;
            }
            return codegenOutputComplexType(evmType.components, { ...options, useStructs: true });
        case 'unknown':
            return 'any';
    }
}
exports.codegenOutputType = codegenOutputType;
function codegenArrayOrTupleType(item, length) {
    if (length !== undefined && length < 6) {
        return `[${Array(length).fill(item).join(', ')}]`;
    }
    else {
        if (item.includes('|')) {
            item = `(${item})`;
        }
        return `${item}[]`;
    }
}
exports.codegenArrayOrTupleType = codegenArrayOrTupleType;
function codegenObjectTypeLiteral(tuple, generator) {
    return '{' + tuple.components.map((component) => `${component.name}: ${generator(component.type)}`).join(', ') + '}';
}
exports.codegenObjectTypeLiteral = codegenObjectTypeLiteral;
/**
 * Always return an array type; if there are named outputs, merge them to that type
 * this generates slightly better typings fixing: https://github.com/ethereum-ts/TypeChain/issues/232
 **/
function codegenOutputComplexType(components, options) {
    const existingOutputComponents = (0, lodash_1.compact)([
        codegenOutputComplexTypeAsArray(components, options),
        codegenOutputComplexTypesAsObject(components, options),
    ]);
    return existingOutputComponents.join(' & ');
}
exports.codegenOutputComplexType = codegenOutputComplexType;
function codegenInputComplexType(components, options) {
    const existingOutputComponents = (0, lodash_1.compact)([
        codegenInputComplexTypeAsArray(components, options),
        codegenInputComplexTypesAsObject(components, options),
    ]);
    return existingOutputComponents.join(' | ');
}
exports.codegenInputComplexType = codegenInputComplexType;
function codegenOutputComplexTypeAsArray(components, options) {
    return `[${components.map((t) => codegenOutputType(options, t.type)).join(', ')}]`;
}
exports.codegenOutputComplexTypeAsArray = codegenOutputComplexTypeAsArray;
function codegenOutputComplexTypesAsObject(components, options) {
    let namedElementsCode;
    const namedElements = components.filter((e) => !!e.name);
    if (namedElements.length > 0) {
        namedElementsCode =
            '{' + namedElements.map((t) => `${t.name}: ${codegenOutputType(options, t.type)}`).join(', ') + ' }';
    }
    return namedElementsCode;
}
exports.codegenOutputComplexTypesAsObject = codegenOutputComplexTypesAsObject;
function codegenInputComplexTypeAsArray(components, options) {
    return `[${components.map((t) => codegenInputType(options, t.type)).join(', ')}]`;
}
exports.codegenInputComplexTypeAsArray = codegenInputComplexTypeAsArray;
function codegenInputComplexTypesAsObject(components, options) {
    let namedElementsCode;
    const namedElements = components.filter((e) => !!e.name);
    if (namedElements.length > 0) {
        namedElementsCode =
            '{' + namedElements.map((t) => `${t.name}: ${codegenInputType(options, t.type)}`).join(', ') + ' }';
    }
    return namedElementsCode;
}
exports.codegenInputComplexTypesAsObject = codegenInputComplexTypesAsObject;
//# sourceMappingURL=types.js.map