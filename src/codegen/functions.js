"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codegenForFunctions = void 0;
const lodash_1 = require("lodash");
const typechain_1 = require("typechain");
const types_1 = require("./types");
function codegenForFunctions(fns, options) {
    return (0, lodash_1.values)(fns)
        .map((fns) => {
        if (fns.length === 1) {
            return codegenForSingleFunction(fns[0], options);
        }
        else {
            return codegenForOverloadedFunctions(fns, options);
        }
    })
        .join('\n');
}
exports.codegenForFunctions = codegenForFunctions;
function codegenForOverloadedFunctions(fns, options) {
    return fns.map((f) => codegenForSingleFunction(f, options, `"${(0, typechain_1.getSignatureForFn)(f)}"`)).join('\n');
}
function codegenForSingleFunction(fn, options, overloadedName) {
    return `
  ${generateFunctionDocumentation(fn.documentation)}
  ${overloadedName !== null && overloadedName !== void 0 ? overloadedName : fn.name}(${(0, types_1.codegenInputTypes)({ useStructs: true }, fn.inputs)}): ${getTransactionObject(fn)}<${(0, types_1.codegenOutputTypes)({ returnResultObject: !!options.returnResultObject, useStructs: true }, fn.outputs)}>;
`;
}
function getTransactionObject(fn) {
    return fn.stateMutability === 'payable' ? 'PayableTransactionObject' : 'NonPayableTransactionObject';
}
function generateFunctionDocumentation(doc) {
    if (!doc)
        return '';
    let docString = '/**';
    if (doc.details)
        docString += `\n * ${doc.details}`;
    if (doc.notice)
        docString += `\n * ${doc.notice}`;
    const params = Object.entries(doc.params || {});
    if (params.length) {
        params.forEach(([key, value]) => {
            docString += `\n * @param ${key} ${value}`;
        });
    }
    if (doc.return)
        docString += `\n * @returns ${doc.return}`;
    docString += '\n */';
    return docString;
}
//# sourceMappingURL=functions.js.map