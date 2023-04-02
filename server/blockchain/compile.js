import fs from 'fs'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

const contractPath = path.resolve(__dirname, "contracts", "WarrantyWallet.sol")
const contractSourceCode = fs.readFileSync(contractPath, 'utf8');

// Define the source code for the contract
const input = {
    language: 'Solidity',
    sources: {
        'WarrantyWallet.sol': {
            content: contractSourceCode,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

import solc from 'solc'

// Compile the source code using solc and save it to a JSON file
const compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));
const contractName = Object.keys(compiledCode.contracts['WarrantyWallet.sol'])[0];
const compiledContract = compiledCode.contracts['WarrantyWallet.sol'][contractName];
const outputDir = path.resolve(__dirname, 'compiled');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}
const outputFile = path.join(outputDir, `${contractName}.json`);
fs.writeFileSync(outputFile, JSON.stringify(compiledContract));
