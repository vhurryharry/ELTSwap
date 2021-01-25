import { derived, writable } from 'svelte/store';


// TODO: clean these up

export let approvedELTAmount = writable(null);
export let burnPercentage = writable(0);
export let currentWizardScreen = writable('elt-swap-screen');
export let swapAmountHODL = writable(0);
export let swapAmountELT = writable(0);

export let swapValues = writable({
  swapAmountELT: swapAmountELT,
});

export let isOverlayScreenActive = writable(false);

// set to true when user logs into Metamask (accounts.length > 0)
export const isRPCEnabled = writable(false);
// note latest account
export const latestAccount = writable(null);
// set to true while async; if reload, can help guide the user
export const isAppPending = writable(false);

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
export const isAppBroken = createWritableStore('isAppBroken', false);
// keep track of transaction history
export const transactionHistory = createWritableStore('transactionHistory', []);
