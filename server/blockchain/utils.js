import Web3 from 'web3'
import axios from 'axios'
import importedContract from './compiled/WarrantyWallet.json' assert { type: "json" };

import dotenv from 'dotenv'
dotenv.config()

// TODO: use env
const createContract = (purchaseDate) => {
    try {
        // Import the compiled contract from the JSON file
        const contractBytecode = importedContract.evm.bytecode.object
        const contractAbi = importedContract.abi

        // Set up a web3 provider and contract instance
        const provider = new Web3.providers.HttpProvider(process.env.RPC_SERVER_ADDRESS, {
            fetch: axios,
        }); // Update with your provider URL
        const web3 = new Web3(provider);

        // Set up an account to deploy the contract from
        const accountAddress = process.env.METAMASK_ADDRESS; // Update with your account address
        const privateKey = process.env.METAMASK_PRIVATE_KEY; // Update with your account's private key
        const account = web3.eth.accounts.wallet.add(privateKey);

        // Get hash of input
        const hash = web3.utils.sha3(purchaseDate)

        // Deploy the contract to the network
        const contract = new web3.eth.Contract(contractAbi);

        return contract.deploy({ data: contractBytecode, arguments: [hash] })
            .send({ from: accountAddress, gas: 608000 })
    } catch (error) {
        console.error('Error deploying contract:', error);
        return error
    }
}

const useContract = (contractAddress, purchaseDate) => {
    try {
        // Import the compiled contract from the JSON file
        const contractAbi = importedContract.abi

        // Set up a web3 provider and contract instance
        const provider = new Web3.providers.HttpProvider(process.env.RPC_SERVER_ADDRESS, {
            fetch: axios,
        }); // Update with your provider URL
        const web3 = new Web3(provider);

        const myContract = new web3.eth.Contract(contractAbi, contractAddress);

        const hash = web3.utils.sha3(purchaseDate)
        return myContract.methods.verifyHash(hash).call({ from: process.env.METAMASK_ADDRESS })
    } catch (error) {
        console.log('Error using contract method:', error)
    }
}

export { createContract, useContract }
