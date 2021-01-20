// TODO: find a better place for "services"

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

export const formatAddr = (str) => {
  if (!str) return;
  return str.substr(0, 5) + "..." + str.substr(str.length - 5, str.length);
};
