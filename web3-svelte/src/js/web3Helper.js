const swapABI = [{ "inputs": [], "name": "drainELT", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "drainHODL", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "phase1Swap", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "burnPercent", "type": "uint256" }], "name": "phase2Swap", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "phase3Swap", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "setELTPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "setHODLPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "setPhase2Requirement", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "setPhase3Requirement", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "setSwapPhase", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "burnAddr", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "eltContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "eltPhase2Requirement", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "eltPhase3Requirement", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "eltPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "burnPercent", "type": "uint256" }], "name": "getAmountToBurn", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "burnPercent", "type": "uint256" }], "name": "getBurnReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "getELTBurned", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getELTInContract", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getHODLInContract", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "getHODLReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "getMinimumTokenSwap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "getPhase1Bonus", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "getSwapPhase", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getTotalELTSwapped", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "burnPercent", "type": "uint256" }], "name": "getTotalHODLReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "hodlContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "hodlPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "swapPhase", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }];
const swapContract = "0xfD440Ff3Bf3158F5CAf52E45269442938E9B8DeA";

const eltABI = [{ "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_subtractedValue", "type": "uint256" }], "name": "decreaseApproval", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_addedValue", "type": "uint256" }], "name": "increaseApproval", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "makePresaleReady", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [], "name": "PreSaleReady", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "INITIAL_SUPPLY", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isPreSaleReady", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];
const eltContract = "0xa84a0b15d7c62684b71fecb5ea8efe0e5af1d11b";

const hodlDecimals = 8;
const eltDecimals = 8;

/** TODO: Add try{}catch{} */

export let getTokenBalance = async (web3, address, tokenContract, decimals = 8) => {
  if (!web3 || !web3.eth) return 0;

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
  if (!web3 || !web3.eth) return 0;

  let amount = 0;
  if (address === null) return;
  amount = await web3.eth.getBalance(address);
  return atomicToDecimal(amount, 18);
}

export let getTotalHodlReward = async (web3, amount, burnPercent, decimals = 8) => {
  if (!web3 || !web3.eth) return 0;

  let atomicAmount = decimalToAtomic(amount, decimals);
  let contract = new web3.eth.Contract(swapABI, swapContract);
  let result = contract.methods.getTotalHODLReward(atomicAmount, burnPercent).call().then(function (res) {
    return atomicToDecimal(res, decimals);
  });
  return result;
}

export let getHODLInContract = async (web3) => {
  if (!web3 || !web3.eth) return;

  let contract = new web3.eth.Contract(swapABI, swapContract);
  let result = contract.methods.getHODLInContract().call().then(function (res) {
    return atomicToDecimal(res, hodlDecimals);
  });
  return result;
}

export let getELTInContract = async (web3) => {
  if (!web3 || !web3.eth) return;

  let contract = new web3.eth.Contract(swapABI, swapContract);
  let result = contract.methods.getELTInContract().call().then(function (res) {
    return atomicToDecimal(res, eltDecimals);
  });
  return result;
}

export let getSwapPhase = async (web3) => {
  let contract = new web3.eth.Contract(swapABI, swapContract);
  let result = contract.methods.getSwapPhase().call().then(function (res) {
    return res;
  });
  return result;
}

export let getTotalELTSwapped = async (web3) => {
  if (!web3 || !web3.eth) return;

  let contract = new web3.eth.Contract(swapABI, swapContract);
  let result = contract.methods.getTotalELTSwapped().call().then(function (res) {
    return atomicToDecimal(res, eltDecimals);
  });
  console.log(" ???????????? ", result);

  return result;
}

export let getPhase1Bonus = async (web3, amount) => {
  if (!web3 || !web3.eth) return;

  let contract = new web3.eth.Contract(swapABI, swapContract);
  let result = contract.methods.getPhase1Bonus(amount).call().then(function (res) {
    return atomicToDecimal(res, eltDecimals);
  });
  return result;
}

export let getELTBurned = async (web3) => {
  if (!web3 || !web3.eth) return;

  let contract = new web3.eth.Contract(swapABI, swapContract);
  let result = contract.methods.getELTBurned().call().then(function (res) {
    return atomicToDecimal(res, eltDecimals);
  });
  return result;
}

export let getAllowance = async (web3, ownerAddress, spenderAddress) => {
  if (!web3 || !web3.eth) return;

  let contract = new web3.eth.Contract(eltABI, eltContract);
  let result = contract.methods.allowance(ownerAddress, spenderAddress).call().then(function (res) {
    return atomicToDecimal(res, eltDecimals);
  });

  return result;
}

export let approveELT = async (web3, amount, fromAddress, toAddress) => {
  if (!web3 || !web3.eth) return;

  let contract = new web3.eth.Contract(eltABI, eltContract, { from: fromAddress });

  let gasEstimate = await contract.methods.approve(toAddress, decimalToAtomic(amount)).estimateGas().then(function (res) {
    return res;
  });

  return new Promise((resolve, reject) => {
    try {
      contract.methods.approve(toAddress, decimalToAtomic(amount)).send({ to: eltContract, from: fromAddress, gasLimit: gasEstimate })
        .on('confirmation', (confirmationNumber) => {
          if (confirmationNumber === 1) {
            resolve(true)
          }
        })
        .on('error', (error) => {
          reject(error)
        })
    } catch (err) {
      console.log(' approveELT catch err ', err)
      onRejectHandler(err, (err) => {
        console.log(' approveELT callback err ', err);
      })
    }
  });

}

export let phase1Swap = async (web3, amount, fromAddress) => {
  if (!web3 || !web3.eth) return;

  let contract = new web3.eth.Contract(swapABI, swapContract, { from: fromAddress });

  let gasEstimate = await contract.methods.phase1Swap(decimalToAtomic(amount)).estimateGas().then(function (res) {
    return res;
  });

  try {
    return new Promise((resolve, reject) => {
      contract.methods.phase1Swap(decimalToAtomic(amount)).send({ to: swapContract, from: fromAddress, gasLimit: gasEstimate })
        .on('confirmation', (confirmationNumber) => {
          if (confirmationNumber === 1) {
            resolve(true)
          }
        })
        .on('error', (error) => {
          reject(error)
        })
    });
  } catch (err) {
    console.log(' swap catch err ', err)
    onRejectHandler(err, (err) => {
      console.log(' swap callback err ', err);
    })
  }
}

export let phase2Swap = async (web3, amount, burnPercent = 0, fromAddress) => {
  if (!web3 || !web3.eth) return;

  let contract = new web3.eth.Contract(swapABI, swapContract, { from: fromAddress });

  let gasEstimate = await contract.methods.phase2Swap(burnPercent).estimateGas().then(function (res) {
    return res;
  });

  try {
    return new Promise((resolve, reject) => {
      contract.methods.phase2Swap(burnPercent).send({ to: swapContract, from: fromAddress, value: web3.toWei(amount, "ether"), gasLimit: gasEstimate })
        .on('confirmation', (confirmationNumber) => {
          if (confirmationNumber === 1) {
            resolve(true)
          }
        })
        .on('error', (error) => {
          reject(error)
        })
    });
  } catch (err) {
    console.log(' swap catch err ', err)
    onRejectHandler(err, (err) => {
      console.log(' swap callback err ', err);
    })
  }
}

export let phase3Swap = async (web3, amount, fromAddress) => {
  if (!web3 || !web3.eth) return;

  let contract = new web3.eth.Contract(swapABI, swapContract, { from: fromAddress });

  let gasEstimate = await contract.methods.phase3Swap().estimateGas().then(function (res) {
    return res;
  });

  try {
    return new Promise((resolve, reject) => {
      contract.methods.phase3Swap().send({ to: swapContract, from: fromAddress, value: web3.toWei(amount, "ether"), gasLimit: gasEstimate })
        .on('confirmation', (confirmationNumber) => {
          if (confirmationNumber === 1) {
            resolve(true)
          }
        })
        .on('error', (error) => {
          reject(error)
        })
    });
  } catch (err) {
    console.log(' swap catch err ', err)
    onRejectHandler(err, (err) => {
      console.log(' swap callback err ', err);
    })
  }
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

export const getConnectedAccounts = () => {
  if (!window.ethereum) return;
  return window.ethereum["_state"]["accounts"] || [];
};

export const hasConnectedAccounts = () => {
  if (getConnectedAccounts().length > 0) {
    return true;
  }
  return false;
};