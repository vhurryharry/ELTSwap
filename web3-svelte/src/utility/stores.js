import { writable } from 'svelte/store';

export let approvedELTAmount = writable(null);
export let burnPercentage = writable(0);
export let currentWizardScreen = writable('elt-swap-wizard-screen');
export let swapAmountHODL = writable(0);
export let swapAmountELT = writable(0);

export let isSwapBtnPending = writable(false);
export let isSwapBtnDisabled = writable(false);

