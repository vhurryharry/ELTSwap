import { derived, writable } from 'svelte/store';

export let approvedELTAmount = writable(null);
export let burnPercentage = writable(0);
export let currentWizardScreen = writable('prologue-screen');
export let swapAmountHODL = writable(0);
export let swapAmountELT = writable(0);

export let swapValues = writable({
  swapAmountELT: swapAmountELT,
});

// export let isRPCPending = writable(false);
export let isSwapBtnPending = writable(false);
export let isSwapBtnDisabled = writable(false);
export let isOverlayScreenActive = writable(false);

export let transactionHistory = writable(false);



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

export const isRPCPending = createWritableStore('isRPCPending', false);
