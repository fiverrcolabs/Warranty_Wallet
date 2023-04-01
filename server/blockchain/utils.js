import Web3 from 'web3'
const axios = require('axios');
import importedContract from './compiled/WarrantyWallet.json' assert { type: "json" };

// TODO: use env
const createContract = () => {
    // Import the compiled contract from the JSON file
    const contractBytecode = importedContract.evm.bytecode.object
    const contractAbi = importedContract.abi

    // Set up a web3 provider and contract instance
    const provider = new Web3.providers.HttpProvider('https://rpc.ankr.com/eth_goerli', {
        fetch: axios,
    }); // Update with your provider URL
    const web3 = new Web3(provider);

    // Set up an account to deploy the contract from
    const accountAddress = '0x8016a9B7F468467A769379d9DA4A1695aabe208C'; // Update with your account address
    const privateKey = '0x3a1f0834b73a1dddb06667af36bd6c406530d4169ff4e832339ae430743e5e3e'; // Update with your account's private key
    const account = web3.eth.accounts.wallet.add(privateKey);

    // Deploy the contract to the network
    const contract = new web3.eth.Contract(contractAbi);
    // console.log(contract, account);
    contract.deploy({ data: contractBytecode, arguments: ['0xb1269720499f141bc0dd3bcde61b33aa9a08209dba13362afbd0c6260e8e1b80'] })
        .send({ from: accountAddress, gas: 608000 })
        .on('receipt', function (receipt) {
            console.log('Contract deployed at address:', receipt.contractAddress);
            console.log('Transaction receipt:', receipt);
        })
        .on('error', function (error) {
            console.error('Error deploying contract:', error);
        })
}

const useContract = () => {
    // Import the compiled contract from the JSON file
    const contractBytecode = importedContract.evm.bytecode.object
    const contractAbi = importedContract.abi

    // Set up a web3 provider and contract instance
    const provider = new Web3.providers.HttpProvider('https://rpc.ankr.com/eth_goerli', {
        fetch: axios,
    }); // Update with your provider URL
    const web3 = new Web3(provider);

    const contractAddress = '0xAFD6dad83E183c9967821E3bd168818F99910d59';
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);

    // Call a function of the contract
    myContract.methods.verifyHash('0xb1269720499f141bc0dd3bcde61b33aa9a08209dba13362afbd0c6260e8e1b80').call({ from: '0x8016a9B7F468467A769379d9DA4A1695aabe208C' })
        .then((result) => {
            console.log(result);
        });
}

export { createContract, useContract }
