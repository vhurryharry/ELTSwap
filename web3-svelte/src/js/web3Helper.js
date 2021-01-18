const swapABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "burnPercent", "type": "uint256" }], "name": "getAmountToBurn", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "burnPercent", "type": "uint256" }], "name": "getBurnReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "getELTBurned", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getELTInContract", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getHODLInContract", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "getHODLReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "getMinimumTokenSwap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "burnPercent", "type": "uint256" }], "name": "getTotalHODLReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "burnPercent", "type": "uint256" }], "name": "swap", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
const swapContract = "0x77189634909a4ad77b7e60c89b5ed5af5ce37d5e";

const eltABI = [{ "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_subtractedValue", "type": "uint256" }], "name": "decreaseApproval", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_addedValue", "type": "uint256" }], "name": "increaseApproval", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "makePresaleReady", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [], "name": "PreSaleReady", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "INITIAL_SUPPLY", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isPreSaleReady", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];
const eltContract = "0xa84a0b15d7c62684b71fecb5ea8efe0e5af1d11b";

const hodlDecimals = 8;
const eltDecimals = 8;

export let getTokenBalance = async (web3, address, tokenContract, decimals = 8) => {
  let amount = 0;

  let tokenAddr = (address).substring(2);
  let contractData = "0x70a08231000000000000000000000000" + tokenAddr;

  await web3.eth.call({
    to: tokenContract,
    data: contractData,
  }, function (err, result) {
    if (result) {
      let tokens = web3.utils.toBN(result).toString();
      amount = atomicToDecimal(tokens, decimals);
    } else {
      console.log(err);
    }
  });

  return amount;
}

export let getETHBalance = async (web3, address) => {
  let amount = 0;
  if (address === null) return;
  amount = await web3.eth.getBalance(address);
  return atomicToDecimal(amount, 18);
}

export let getTotalHodlReward = async (web3, amount, burnPercent, decimals = 8) => {
  let atomicAmount = decimalToAtomic(amount, decimals);
  let contract = new web3.eth.Contract(swapABI, swapContract);
  let result = contract.methods.getTotalHODLReward(atomicAmount, burnPercent).call().then(function (res) {
    return atomicToDecimal(res, decimals);
  });
  return result;
}

export let getHODLInContract = async (web3) => {
  let contract = new web3.eth.Contract(swapABI, swapContract);
  let result = contract.methods.getHODLInContract().call().then(function (res) {
    return atomicToDecimal(res, hodlDecimals);
  });
  return result;
}

export let getELTInContract = async (web3) => {
  let contract = new web3.eth.Contract(swapABI, swapContract);
  let result = contract.methods.getELTInContract().call().then(function (res) {
    return atomicToDecimal(res, eltDecimals);
  });
  return result;
}

export let getELTBurned = async (web3) => {
  let contract = new web3.eth.Contract(swapABI, swapContract);
  let result = contract.methods.getELTBurned().call().then(function (res) {
    return atomicToDecimal(res, eltDecimals);
  });
  return result;
}

export let getAllowance = async (web3, ownerAddress, spenderAddress) => {
  let contract = new web3.eth.Contract(eltABI, eltContract);
  let result = contract.methods.allowance(ownerAddress, spenderAddress).call().then(function (res) {
    return atomicToDecimal(res, eltDecimals);
  });

  return result;
}

export let approveELT = async (web3, amount, fromAddress, toAddress) => {
  let contract = new web3.eth.Contract(eltABI, eltContract, { from: fromAddress });

  let gasEstimate = await contract.methods.approve(toAddress, decimalToAtomic(amount)).estimateGas().then(function (res) {
    return res;
  });

  return new Promise((resolve, reject) => {
    contract.methods.approve(toAddress, decimalToAtomic(amount)).send({ to: eltContract, from: fromAddress, gasLimit: gasEstimate })
      .on('confirmation', (confirmationNumber) => {
        if (confirmationNumber === 1) {
          resolve(true)
        }
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}

export let swap = async (web3, amount, burnPercent = 0, fromAddress) => {
  let contract = new web3.eth.Contract(swapABI, swapContract, { from: fromAddress });

  let gasEstimate = await contract.methods.swap(decimalToAtomic(amount), burnPercent).estimateGas().then(function (res) {
    return res;
  });

  return new Promise((resolve, reject) => {
    contract.methods.swap(decimalToAtomic(amount), burnPercent).send({ to: swapContract, from: fromAddress, gasLimit: gasEstimate })
      .on('confirmation', (confirmationNumber) => {
        if (confirmationNumber === 1) {
          resolve(true)
        }
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}

/*
 * Convert from atomic (1000000000000) to decimal (10000)
 */
let atomicToDecimal = (value, decimals = 8) => {
  return value / Math.pow(10, decimals);
}

/*
 * Convert from decimal (10000) to atomic (1000000000000)
 */
let decimalToAtomic = (value, decimals = 8) => {
  return value * Math.pow(10, decimals);
}