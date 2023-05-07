import Web3 from 'web3'
import axios from 'axios'
import importedContract from './compiled/WarrantyWallet.json' assert { type: 'json' }

import dotenv from 'dotenv'
dotenv.config()

const createContract = (purchaseDate, warrantyPeriod) => {
  try {
    // Import the compiled contract from the JSON file
    const contractBytecode = importedContract.evm.bytecode.object
    const contractAbi = importedContract.abi

    // Set up a web3 provider and contract instance
    const provider = new Web3.providers.HttpProvider(
      process.env.RPC_SERVER_ADDRESS,
      {
        fetch: axios,
      }
    ) // Update with your provider URL
    const web3 = new Web3(provider)

    // Set up an account to deploy the contract from
    const accountAddress = process.env.METAMASK_ADDRESS // Update with your account address
    const privateKey = process.env.METAMASK_PRIVATE_KEY // Update with your account's private key
    const account = web3.eth.accounts.wallet.add(privateKey)

    // Get hash of input
    const hash = web3.utils.sha3(purchaseDate)

    // Deploy the contract to the network
    const contract = new web3.eth.Contract(contractAbi)

    return contract
      .deploy({ data: contractBytecode, arguments: [hash, warrantyPeriod] })
      .send({ from: accountAddress, gas: 600000 })
  } catch (error) {
    console.error('Error deploying contract:', error)
    return error
  }
}

const useContract = async (contractAddress, purchaseDate, warrantyPeriod) => {
  try {
    // Import the compiled contract from the JSON file
    const contractAbi = importedContract.abi

    // Set up a web3 provider and contract instance
    const provider = new Web3.providers.HttpProvider(
      process.env.RPC_SERVER_ADDRESS,
      {
        fetch: axios,
      }
    ) // Update with your provider URL
    const web3 = new Web3(provider)

    const myContract = new web3.eth.Contract(contractAbi, contractAddress)

    const hash = web3.utils.sha3(purchaseDate)
    const isHashValid = await myContract.methods
      .verifyHash(hash)
      .call({ from: process.env.METAMASK_ADDRESS })
    const isWarrantyPeriodValid = await myContract.methods
      .verifyWarrantyPeriod(warrantyPeriod)
      .call({ from: process.env.METAMASK_ADDRESS })
    const result = isHashValid && isWarrantyPeriodValid
    
    return result
  } catch (error) {
    console.log('Error using contract method:', error)
  }
}

const balanceAndEstimate = (purchaseDate, warrantyPeriod) => {
  // Import the compiled contract from the JSON file
  const contractBytecode = importedContract.evm.bytecode.object
  const contractAbi = importedContract.abi

  // Set up a web3 provider and contract instance
  const provider = new Web3.providers.HttpProvider(
    process.env.RPC_SERVER_ADDRESS,
    {
      fetch: axios,
    }
  ) // Update with your provider URL
  const web3 = new Web3(provider)

  // Set up an account to deploy the contract from
  const accountAddress = process.env.METAMASK_ADDRESS // Update with your account address
  const privateKey = process.env.METAMASK_PRIVATE_KEY // Update with your account's private key
  const account = web3.eth.accounts.wallet.add(privateKey)

  // Get hash of input
  const hash = web3.utils.sha3(purchaseDate)

  // Deploy the contract to the network
  const contract = new web3.eth.Contract(contractAbi)

  // Check wallet balance
  web3.eth.getBalance(process.env.METAMASK_ADDRESS, (err, balance) => {
    if (err) {
      console.error('Error getting balance:', err)
    } else {
      console.log(
        'Wallet balance:',
        web3.utils.fromWei(balance, 'ether'),
        'Ether'
      )
    }
  })

  contract
    .deploy({ data: contractBytecode, arguments: [hash, warrantyPeriod] })
    .estimateGas({ from: accountAddress })
    .then((estimatedGas) => {
      console.log('Estimated gas for deployment:', estimatedGas)

      // Fetch the current gas price
      return web3.eth.getGasPrice().then((gasPrice) => {
        // Calculate the cost of deployment in Ether
        const deploymentCost = web3.utils
          .toBN(gasPrice)
          .mul(web3.utils.toBN(estimatedGas))
        console.log(
          'Deployment cost:',
          web3.utils.fromWei(deploymentCost, 'ether'),
          'Ether'
        )
      })
    })
    .catch((error) => {
      console.error('Error estimating gas for deployment:', error)
    })
}

export { createContract, useContract, balanceAndEstimate }
