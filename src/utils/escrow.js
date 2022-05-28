/* global BigInt */

import Web3 from "web3";

import abi from '../data/escrow_abi.json'

export const getEscAcc = async () => {
  const web3 = new Web3(process.env.REACT_APP_RPC_URL)
  const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)

  try {
    const acc = await contract.methods.escAcc().call()
    return acc
  } catch (error) {
    console.log(error)   
  }
  return ''
}

export const getEscAvailBal = async () => {
  const web3 = new Web3(process.env.REACT_APP_RPC_URL)
  const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)

  try {
    let escAvailBal = await contract.methods.escAvailBal().call()
    escAvailBal = BigInt(escAvailBal) / BigInt(Math.pow(10, 15) + '')
    escAvailBal = parseInt(escAvailBal.toString()) / 1000
    
    return escAvailBal
  } catch (error) {
    console.log(error)
    return ''
  }
}

export const getEscBal = async () => {
  const web3 = new Web3(process.env.REACT_APP_RPC_URL)
  const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)

  try {
    let escBal = await contract.methods.escBal().call()
    escBal = BigInt(escBal) / BigInt(Math.pow(10, 15) + '')
    escBal = parseInt(escBal.toString()) / 1000
    return escBal
  } catch (error) {
    console.log(error)
    return ''
  }
}

export const getEscFee = async () => {
  const web3 = new Web3(process.env.REACT_APP_RPC_URL)
  const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)

  try {
    let escFee = await contract.methods.escFee().call()
    escFee = parseInt(escFee)
    return escFee
  } catch (error) {
    console.log(error)
    return ''
  }
}

export const getTotalConfirmed = async () => {
  const web3 = new Web3(process.env.REACT_APP_RPC_URL)
  const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)

  try {
    let totalConfirmed = await contract.methods.totalConfirmed().call()
    totalConfirmed = parseInt(totalConfirmed)
    return totalConfirmed
  } catch (error) {
    console.log(error)
    return ''
  }
}

export const getTotalDisputed = async () => {
  const web3 = new Web3(process.env.REACT_APP_RPC_URL)
  const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)

  try {
    let totalDisputed = await contract.methods.totalDisputed().call()
    totalDisputed = parseInt(totalDisputed)
    return totalDisputed
  } catch (error) {
    console.log(error)
    return ''
  }
}

export const getTotalItems = async () => {
  const web3 = new Web3(process.env.REACT_APP_RPC_URL)
  const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)

  try {
    let totalItems = await contract.methods.totalItems().call()
    totalItems = parseInt(totalItems)
    return totalItems
  } catch (error) {
    console.log(error)
    return ''
  }
}