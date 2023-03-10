"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStructTypes = void 0;
const lodash_1 = require("lodash");
const common_1 = require("../common");
const types_1 = require("./types");
function generateStructTypes(structs) {
    const namedStructs = structs.filter((s) => !!s.structName);
    const namespaces = (0, lodash_1.groupBy)(namedStructs, (s) => s.structName.namespace);
    const exports = [];
    if ('undefined' in namespaces) {
        exports.push(namespaces['undefined'].map((s) => generateExports(s)).join('\n'));
        delete namespaces['undefined'];
    }
    for (const namespace of Object.keys(namespaces)) {
        exports.push(`\nexport declare namespace ${namespace} {
      ${namespaces[namespace].map((s) => generateExports(s)).join('\n')}
    }`);
    }
    return exports.join('\n');
}
exports.generateStructTypes = generateStructTypes;
function generateExports(struct) {
    const { identifier } = struct.structName;
    const inputName = `${identifier}${common_1.STRUCT_INPUT_POSTFIX}`;
    const outputName = `${identifier}${common_1.STRUCT_OUTPUT_POSTFIX}`;
    const outputNameArray = `${outputName}Array`;
    const outputNameObject = `${outputName}Struct`;
    const inputType = (0, types_1.codegenInputType)({ useStructs: false }, struct);
    const outputType = (0, types_1.codegenOutputType)({ useStructs: false }, struct);
    const [outputTypeArray, outputTypeObject] = outputType.split('&');
    return `
    export type ${inputName} = ${inputType}

    export type ${outputNameArray} = ${outputTypeArray}
    export type ${outputNameObject} = ${outputTypeObject}
    export type ${outputName} = ${outputNameArray} & ${outputNameObject}
  `;
}
//# sourceMappingURL=structs.js.map