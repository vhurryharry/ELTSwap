import { writable } from 'svelte/store';

// TODO: clean these up

export let approvedELTAmount = writable(null);
export let burnPercentage = writable(0);
export let currentWizardScreen = writable('elt-swap-screen');
export let swapAmountHODL = writable(null);
export let swapAmountELT = writable(null);
export let selectedAccount = writable(null);

export let isBurnSliderVisible = writable(false);
export let isSwapTokenDropDownActive = writable(false);

export let currentSwapPhase = writable(0);
export let currentSwapToken = writable('ELT');
export let currentSwapProgress = writable(0);
export let currentHODLBonus = writable(0);
export let currentHODLInContract = writable(0);
export let currentELTInContract = writable(0);
export let currentELTBurned = writable(0);
export let currentTotalHODLReward = writable(0);
export let currentGasPriceEstimate = writable(0);

/** TODO: Refactor to properly use nested states */
export let swapValues = writable({
  swapAmountELT: swapAmountELT,
});

export let isOverlayScreenActive = writable(false);

// set to true when user logs into Metamask (accounts.length > 0)
export let isRPCEnabled = writable(false);
// note latest account
export let latestAccount = writable(null);
// set to true while async; if reload, can help guide the user
export let isAppPending = writable(false);

const createWritableStore = (key, startValue) => {
  const { subscribe, set } = writable(startValue);

  return {
    subscribe,
    set,
    useLocalStorage: () => {
      const json = localStorage.getItem(key);
      if (json) {
        set(JSON.parse(json));
      }

      subscribe(current => {
        localStorage.setItem(key, JSON.stringify(current));
      });
    }
  };
}

// set to true if fatal error
export let isAppBroken = createWritableStore('isAppBroken', false);
// keep track of transaction history
export let transactionHistory = createWritableStore('transactionHistory', []);
