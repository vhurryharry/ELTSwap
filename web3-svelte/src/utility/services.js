// TODO: find a better place for "services"

import {
  ethStore,
  web3,
  selectedAccount,
  connected,
  chainName,
} from "svelte-web3";
import { getELTInContract, getHODLInContract } from "../../js/web3Helper";

import * as global from "./utility/globals";
import * as store from "./utility/stores";


// Creates a connection to own infura node.
const enable = () => {
  ethStore
    .setProvider(
      "https://ropsten.infura.io/v3/952d8bd0e20b4bbfac856dc18285b6ca"
    )
    .then((res) => {
      service.isSwapBtnPending.set(false);
    });
};
export const enableBrowser = async () => {
  store.isSwapBtnPending.set(true);
  await enable();
  ethStore.setBrowserProvider();
};

export const getSwapProgress = () => parseInt(($connected ? getELTInContract($web3) : 0 * 100) / global.absMaxELT) || 0;
