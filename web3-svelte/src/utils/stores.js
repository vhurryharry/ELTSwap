import { writable } from 'svelte/store';

export let approvedELTAmount = writable(null);
export let burnPercentage = writable(0);
export let currentWizardScreen = writable('prologue-screen');
export let swapAmountHODL = writable(0);
export let swapAmountELT = writable(0);

export let swapValues = writable({
  swapAmountELT: swapAmountELT,
});

export let isSwapBtnPending = writable(false);
export let isSwapBtnDisabled = writable(false);
export let isOverlayScreenActive = writable(false);

export let transactionHistory = writable(false);

export let web3Handlers = writable({

})
