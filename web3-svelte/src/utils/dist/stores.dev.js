"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transactionHistory = exports.isAppBroken = exports.isAppPending = exports.latestAccount = exports.isRPCEnabled = exports.isOverlayScreenActive = exports.swapValues = exports.currentSwapToken = exports.swapAmountELT = exports.swapAmountHODL = exports.currentWizardScreen = exports.burnPercentage = exports.approvedELTAmount = void 0;

var _store = require("svelte/store");

// TODO: clean these up
var approvedELTAmount = (0, _store.writable)(null);
exports.approvedELTAmount = approvedELTAmount;
var burnPercentage = (0, _store.writable)(0);
exports.burnPercentage = burnPercentage;
var currentWizardScreen = (0, _store.writable)('elt-swap-screen');
exports.currentWizardScreen = currentWizardScreen;
var swapAmountHODL = (0, _store.writable)(null);
exports.swapAmountHODL = swapAmountHODL;
var swapAmountELT = (0, _store.writable)(null);
exports.swapAmountELT = swapAmountELT;
var currentSwapToken = (0, _store.writable)(null);
exports.currentSwapToken = currentSwapToken;
var swapValues = (0, _store.writable)({
  swapAmountELT: swapAmountELT
});
exports.swapValues = swapValues;
var isOverlayScreenActive = (0, _store.writable)(false); // set to true when user logs into Metamask (accounts.length > 0)

exports.isOverlayScreenActive = isOverlayScreenActive;
var isRPCEnabled = (0, _store.writable)(false); // note latest account

exports.isRPCEnabled = isRPCEnabled;
var latestAccount = (0, _store.writable)(null); // set to true while async; if reload, can help guide the user

exports.latestAccount = latestAccount;
var isAppPending = (0, _store.writable)(false);
exports.isAppPending = isAppPending;

var createWritableStore = function createWritableStore(key, startValue) {
  var _writable = (0, _store.writable)(startValue),
      subscribe = _writable.subscribe,
      set = _writable.set;

  return {
    subscribe: subscribe,
    set: set,
    useLocalStorage: function useLocalStorage() {
      var json = localStorage.getItem(key);

      if (json) {
        set(JSON.parse(json));
      }

      subscribe(function (current) {
        localStorage.setItem(key, JSON.stringify(current));
      });
    }
  };
}; // set to true if fatal error


var isAppBroken = createWritableStore('isAppBroken', false); // keep track of transaction history

exports.isAppBroken = isAppBroken;
var transactionHistory = createWritableStore('transactionHistory', []);
exports.transactionHistory = transactionHistory;