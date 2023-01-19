"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codegen = void 0;
const lodash_1 = require("lodash");
const events_1 = require("./events");
const functions_1 = require("./functions");
const structs_1 = require("./structs");
function codegen(contract, codegenConfig) {
    const typesPath = contract.path.length ? `${new Array(contract.path.length).fill('..').join('/')}/types` : './types';
    const template = `
  import type BN from "bn.js";
  import type { ContractOptions } from "web3-eth-contract";
  import type { EventLog } from "web3-core";
  import type { EventEmitter } from "events";
  import type { Callback, PayableTransactionObject, NonPayableTransactionObject, BlockType, ContractEventLog, BaseContract } from "${typesPath}";

  export interface EventOptions {
    filter?: object;
    fromBlock?: BlockType;
    topics?: string[];
  }

  ${(0, structs_1.generateStructTypes)((0, lodash_1.values)(contract.structs).map((v) => v[0]))}

  ${(0, events_1.codegenForEventsDeclarations)(contract.events)}

  export interface ${contract.name} extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): ${contract.name};
    clone(): ${contract.name};
    methods: {
      ${(0, functions_1.codegenForFunctions)(contract.functions, { codegenConfig })}
    };
    events: {
      ${(0, events_1.codegenForEvents)(contract.events)}
      allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
    };
    ${(0, events_1.codegenForEventsOnceFns)(contract.events)}
  }
  `;
    return template;
}
exports.codegen = codegen;
//# sourceMappingURL=index.js.map