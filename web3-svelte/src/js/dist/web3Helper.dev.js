"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swap = exports.approveELT = exports.getAllowance = exports.getELTBurned = exports.getELTInContract = exports.getHODLInContract = exports.getTotalHodlReward = exports.getETHBalance = exports.getTokenBalance = void 0;
var swapABI = [{
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "burnPercent",
    "type": "uint256"
  }],
  "name": "getAmountToBurn",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "pure",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "burnPercent",
    "type": "uint256"
  }],
  "name": "getBurnReward",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "pure",
  "type": "function"
}, {
  "inputs": [],
  "name": "getELTBurned",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "getELTInContract",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "getHODLInContract",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "getHODLReward",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "pure",
  "type": "function"
}, {
  "inputs": [],
  "name": "getMinimumTokenSwap",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "burnPercent",
    "type": "uint256"
  }],
  "name": "getTotalHODLReward",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "pure",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "burnPercent",
    "type": "uint256"
  }],
  "name": "swap",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}];
var swapContract = "0x77189634909a4ad77b7e60c89b5ed5af5ce37d5e";
var eltABI = [{
  "constant": false,
  "inputs": [{
    "name": "_spender",
    "type": "address"
  }, {
    "name": "_value",
    "type": "uint256"
  }],
  "name": "approve",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_spender",
    "type": "address"
  }, {
    "name": "_subtractedValue",
    "type": "uint256"
  }],
  "name": "decreaseApproval",
  "outputs": [{
    "name": "success",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_spender",
    "type": "address"
  }, {
    "name": "_addedValue",
    "type": "uint256"
  }],
  "name": "increaseApproval",
  "outputs": [{
    "name": "success",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "makePresaleReady",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_to",
    "type": "address"
  }, {
    "name": "_value",
    "type": "uint256"
  }],
  "name": "transfer",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_from",
    "type": "address"
  }, {
    "name": "_to",
    "type": "address"
  }, {
    "name": "_value",
    "type": "uint256"
  }],
  "name": "transferFrom",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "newOwner",
    "type": "address"
  }],
  "name": "transferOwnership",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [],
  "name": "PreSaleReady",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "previousOwner",
    "type": "address"
  }, {
    "indexed": true,
    "name": "newOwner",
    "type": "address"
  }],
  "name": "OwnershipTransferred",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "owner",
    "type": "address"
  }, {
    "indexed": true,
    "name": "spender",
    "type": "address"
  }, {
    "indexed": false,
    "name": "value",
    "type": "uint256"
  }],
  "name": "Approval",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "from",
    "type": "address"
  }, {
    "indexed": true,
    "name": "to",
    "type": "address"
  }, {
    "indexed": false,
    "name": "value",
    "type": "uint256"
  }],
  "name": "Transfer",
  "type": "event"
}, {
  "constant": true,
  "inputs": [{
    "name": "_owner",
    "type": "address"
  }, {
    "name": "_spender",
    "type": "address"
  }],
  "name": "allowance",
  "outputs": [{
    "name": "remaining",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_owner",
    "type": "address"
  }],
  "name": "balanceOf",
  "outputs": [{
    "name": "balance",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "decimals",
  "outputs": [{
    "name": "",
    "type": "uint8"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "INITIAL_SUPPLY",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "isPreSaleReady",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "name",
  "outputs": [{
    "name": "",
    "type": "string"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "owner",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "symbol",
  "outputs": [{
    "name": "",
    "type": "string"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "totalSupply",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}];
var eltContract = "0xa84a0b15d7c62684b71fecb5ea8efe0e5af1d11b";
var hodlDecimals = 8;
var eltDecimals = 8;

var getTokenBalance = function getTokenBalance(web3, address, tokenContract) {
  var decimals,
      amount,
      tokenAddr,
      contractData,
      _args = arguments;
  return regeneratorRuntime.async(function getTokenBalance$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          decimals = _args.length > 3 && _args[3] !== undefined ? _args[3] : 8;

          if (!(!web3 || !web3.eth)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", 0);

        case 3:
          amount = 0;
          tokenAddr = address.substring(2);
          contractData = "0x70a08231000000000000000000000000" + tokenAddr;
          _context.next = 8;
          return regeneratorRuntime.awrap(web3.eth.call({
            to: tokenContract,
            data: contractData
          }, function (err, result) {
            if (result) {
              var tokens = web3.utils.toBN(result).toString();
              amount = atomicToDecimal(tokens, decimals);
            } else {
              console.log(err);
            }
          }));

        case 8:
          return _context.abrupt("return", amount);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getTokenBalance = getTokenBalance;

var getETHBalance = function getETHBalance(web3, address) {
  var amount;
  return regeneratorRuntime.async(function getETHBalance$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          amount = 0;

          if (!(address === null)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return");

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(web3.eth.getBalance(address));

        case 5:
          amount = _context2.sent;
          return _context2.abrupt("return", atomicToDecimal(amount, 18));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getETHBalance = getETHBalance;

var getTotalHodlReward = function getTotalHodlReward(web3, amount, burnPercent) {
  var decimals,
      atomicAmount,
      contract,
      result,
      _args3 = arguments;
  return regeneratorRuntime.async(function getTotalHodlReward$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          decimals = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : 8;

          if (!(!web3 || !web3.eth)) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return");

        case 3:
          atomicAmount = decimalToAtomic(amount, decimals);
          contract = new web3.eth.Contract(swapABI, swapContract);
          result = contract.methods.getTotalHODLReward(atomicAmount, burnPercent).call().then(function (res) {
            return atomicToDecimal(res, decimals);
          });
          return _context3.abrupt("return", result);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getTotalHodlReward = getTotalHodlReward;

var getHODLInContract = function getHODLInContract(web3) {
  var contract, result;
  return regeneratorRuntime.async(function getHODLInContract$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!(!web3 || !web3.eth)) {
            _context4.next = 2;
            break;
          }

          return _context4.abrupt("return");

        case 2:
          contract = new web3.eth.Contract(swapABI, swapContract);
          result = contract.methods.getHODLInContract().call().then(function (res) {
            return atomicToDecimal(res, hodlDecimals);
          });
          return _context4.abrupt("return", result);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.getHODLInContract = getHODLInContract;

var getELTInContract = function getELTInContract(web3) {
  var contract, result;
  return regeneratorRuntime.async(function getELTInContract$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!(!web3 || !web3.eth)) {
            _context5.next = 2;
            break;
          }

          return _context5.abrupt("return");

        case 2:
          contract = new web3.eth.Contract(swapABI, swapContract);
          result = contract.methods.getELTInContract().call().then(function (res) {
            return atomicToDecimal(res, eltDecimals);
          });
          return _context5.abrupt("return", result);

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.getELTInContract = getELTInContract;

var getELTBurned = function getELTBurned(web3) {
  var contract, result;
  return regeneratorRuntime.async(function getELTBurned$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!(!web3 || !web3.eth)) {
            _context6.next = 2;
            break;
          }

          return _context6.abrupt("return");

        case 2:
          contract = new web3.eth.Contract(swapABI, swapContract);
          result = contract.methods.getELTBurned().call().then(function (res) {
            return atomicToDecimal(res, eltDecimals);
          });
          return _context6.abrupt("return", result);

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.getELTBurned = getELTBurned;

var getAllowance = function getAllowance(web3, ownerAddress, spenderAddress) {
  var contract, result;
  return regeneratorRuntime.async(function getAllowance$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (!(!web3 || !web3.eth)) {
            _context7.next = 2;
            break;
          }

          return _context7.abrupt("return");

        case 2:
          contract = new web3.eth.Contract(eltABI, eltContract);
          result = contract.methods.allowance(ownerAddress, spenderAddress).call().then(function (res) {
            return atomicToDecimal(res, eltDecimals);
          });
          return _context7.abrupt("return", result);

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.getAllowance = getAllowance;

var approveELT = function approveELT(web3, amount, fromAddress, toAddress) {
  var contract, gasEstimate;
  return regeneratorRuntime.async(function approveELT$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          contract = new web3.eth.Contract(eltABI, eltContract, {
            from: fromAddress
          });
          _context8.next = 3;
          return regeneratorRuntime.awrap(contract.methods.approve(toAddress, decimalToAtomic(amount)).estimateGas().then(function (res) {
            return res;
          }));

        case 3:
          gasEstimate = _context8.sent;
          return _context8.abrupt("return", new Promise(function (resolve, reject) {
            try {
              contract.methods.approve(toAddress, decimalToAtomic(amount)).send({
                to: eltContract,
                from: fromAddress,
                gasLimit: gasEstimate
              }).on('confirmation', function (confirmationNumber) {
                if (confirmationNumber === 1) {
                  resolve(true);
                }
              }).on('error', function (error) {
                reject(error);
              });
            } catch (err) {
              console.log(' approveELT catch err ', err);
              onRejectHandler(err, function (err) {
                console.log(' approveELT callback err ', err);
              });
            }
          }));

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  });
};

exports.approveELT = approveELT;

var swap = function swap(web3, amount) {
  var burnPercent,
      fromAddress,
      contract,
      gasEstimate,
      _args9 = arguments;
  return regeneratorRuntime.async(function swap$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          burnPercent = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : 0;
          fromAddress = _args9.length > 3 ? _args9[3] : undefined;
          contract = new web3.eth.Contract(swapABI, swapContract, {
            from: fromAddress
          });
          _context9.next = 5;
          return regeneratorRuntime.awrap(contract.methods.swap(decimalToAtomic(amount), burnPercent).estimateGas().then(function (res) {
            return res;
          }));

        case 5:
          gasEstimate = _context9.sent;
          _context9.prev = 6;
          return _context9.abrupt("return", new Promise(function (resolve, reject) {
            contract.methods.swap(decimalToAtomic(amount), burnPercent).send({
              to: swapContract,
              from: fromAddress,
              gasLimit: gasEstimate
            }).on('confirmation', function (confirmationNumber) {
              if (confirmationNumber === 1) {
                resolve(true);
              }
            }).on('error', function (error) {
              reject(error);
            });
          }));

        case 10:
          _context9.prev = 10;
          _context9.t0 = _context9["catch"](6);
          console.log(' swap catch err ', _context9.t0);
          onRejectHandler(_context9.t0, function (err) {
            console.log(' swap callback err ', err);
          });

        case 14:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[6, 10]]);
};
/*
 * Convert from atomic (1000000000000) to decimal (10000)
 */


exports.swap = swap;

var atomicToDecimal = function atomicToDecimal(value) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
  return value / Math.pow(10, decimals);
};
/*
 * Convert from decimal (10000) to atomic (1000000000000)
 */


var decimalToAtomic = function decimalToAtomic(value) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
  return value * Math.pow(10, decimals);
};