// import { approvedELTAmount, currentWizardScreen } from "./stores";
// import { absMaxELT, minELTToSwap, maxELTToSwap } from "./constants";

// TODO: find a better place for "services"

import {
  ethStore,
  web3,
  selectedAccount,
  connected,
  chainName,
} from "svelte-web3";



// Creates a connection to own infura node.
const enable = () => {
  ethStore
    .setProvider(
      "https://ropsten.infura.io/v3/952d8bd0e20b4bbfac856dc18285b6ca"
    )
    .then((res) => {
      isSwapBtnPending.set(false);
    });
};
let enableBrowser = async () => {
  isSwapBtnPending.set(true);
  await enable();
  ethStore.setBrowserProvider();
};

const getSwapProgress = () => parseInt((eltInContract * 100) / absMaxELT) || 0;

export default {
  enableBrowser,
  getSwapProgress,
}