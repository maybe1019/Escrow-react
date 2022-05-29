import Web3 from "web3";

import abi from '../data/escrow_abi.json'
import { toEther } from './utils';

const gas = 1500000
const gasPrice = '2000000000'


//----------------------------------  Read Data From Escrow ------------------------------------

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
    escAvailBal = toEther(escAvailBal)
    
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
    escBal = toEther(escBal)
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

export const getRequested = async (provider, id) => {
  const web3 = new Web3(process.env.REACT_APP_RPC_URL)
  const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)

  try {
    let requested = await contract.methods.requested(provider, id).call()
    return requested
  } catch (error) {
    console.log(error)
    return ''
  }
}

export const getItems = async () => {
  const web3 = new Web3(process.env.REACT_APP_RPC_URL)
  const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)
  try {
    return await contract.methods.getItems().call()
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getItem = async (itemId) => {
  const web3 = new Web3(process.env.REACT_APP_RPC_URL)
  const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)
  try {
    return await contract.methods.getItem(itemId).call()
  } catch (error) {
    console.log(error)
    return []
  }
}

//---------------------------  Read Data From Escrow with account -------- ----------------------

export const getMyItems = async account => {
  const web3 = new Web3(process.env.REACT_APP_RPC_URL)
  const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)

  try {
    let myItems = await contract.methods.myItems().call({from: account})
    return myItems
  } catch (error) {
    console.log(error)
    return []
  }
}
//----------------------------------  Write Data From Escrow ------------------------------------
export const createItem = async (provider, account, purpose, value) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)
  value = Web3.utils.toWei(value + "")
  try {
    const res = await contract.methods.createItem(purpose).send({
      value: value,
      from: account,
      gas: gas,
      gasPrice: gasPrice
    })
    if(res) return 'Success'
    else return 'Failed'
  } catch (error) {
    console.log(error)
    return 'Failed'
  }
}

export const requestItem = async (provider, account, itemId) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)
  try {
    const res = await contract.methods.requestItem(itemId).send({
      from: account,
      gas: gas,
      gasPrice: gasPrice
    })
    return res ? 'Success' : 'Failed'
  } catch (error) {
    console.log(error)
    return error
  }
}

export const approveRequest = async (provider, account, itemId, receiver) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)
  try {
    const res = await contract.methods.approveRequest(itemId, receiver).send({
      from: account,
      gas: gas,
      gasPrice: gasPrice
    })
    return res ? 'Success' : 'Failed'
  } catch (error) {
    console.log(error)
    return error
  }
}

export const performDelivery = async (provider, account, itemId) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)
  try {
    const res = await contract.methods.performDelievery(itemId).send({
      from: account,
      gas: gas,
      gasPrice: gasPrice
    })
    return res ? 'Success' : 'Failed'
  } catch (error) {
    console.log(error)
    return error
  }
}

export const confirmDelivery = async (provider, account, itemId, flag) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)
  try {
    const res = await contract.methods.confirmDelivery(itemId, flag).send({
      from: account,
      gas: gas,
      gasPrice: gasPrice
    })
    return res ? 'Success' : 'Failed'
  } catch (error) {
    console.log(error)
    return error
  }
}


//----------------------------------  Owner Functions ------------------------------------

export const refundItem = async (provider, account, itemId) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)
  try {
    const res = await contract.methods.refundItem(itemId).send({
      from: account,
      gas: gas,
      gasPrice: gasPrice
    })
    return res ? 'Success' : 'Failed'
  } catch (error) {
    console.log(error);
    return error
  }
}

export const withdrawFund = async (provider, account, to, amount) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)
  try {
    const res = await contract.methods.withdrawFund(to, Web3.utils.toWei(amount)).send({
      from: account,
      gas: gas,
      gasPrice: gasPrice
    })
    return res ? 'Success' : 'Failed'
  } catch (error) {
    console.log(error);
    return error
  }
}