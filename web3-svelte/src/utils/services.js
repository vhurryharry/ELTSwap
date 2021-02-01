// TODO: Fix: Cannot import .svelte stuff into .js file. 
// How can we write services that use web3Helper? 
// Is it valid to just have a .svelte with no markup?

// import {
//   ethStore,
//   web3,
//   connected,
//   chainName,
// } from "svelte-web3"; // cannot use svelte-web3 in .js file; need workaround

// import { getELTInContract, getTotalHodlReward } from "../js/web3Helper";

// import * as global from "./globals";
// import * as store from "./stores";

// console.log(';;;;;;;;;;;;; ', new web3())

/**
 * TODO: find a way of exporting methods based on web3
 */

import * as stores from "./stores";

export const formatAddr = (str) => {
  if (!str) return;
  return str.substr(0, 5) + "..." + str.substr(str.length - 5, str.length);
};

export const fixedDecimals = (number, precision) => {
  if (typeof number !== "number") return;
  return number.toFixed(typeof precision == "number" ? precision : 4);
};

export const castToPrecision = (floatNum, maxDecLen = 8) => {
  // console.log(" ---- ", floatNum);
  let decimals = (floatNum + "").split(".")[1] || [];
  return decimals.length > maxDecLen ? floatNum.toFixed(maxDecLen) : floatNum;
}

export const RPCErrorHandler = (error) => {
  console.dir(error);
  // set state to "pending"
  stores.isAppPending.set(true);

  // handle codes
  switch (error.code) {
    case 4001:
      // EIP-1193 userRejectedRequest error
      console.log("Permissions needed to continue.");
      stores.isAppPending.set(false);
      // tooltip
      break;
    case -32002:
    case -32602:
      // there's a pending request for permissions
      console.log("Please check Metamask for pending requests.");
      stores.isAppPending.set(false);
      // tooltip
      break;
    default:
      // impossible to recover;
      console.dir(error)
      stores.isAppBroken.set(true);
  }
};
