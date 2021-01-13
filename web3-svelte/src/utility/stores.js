import { writable } from 'svelte/store';

export let approvedELTAmount = writable(0);

export let currentWizardScreen = writable('prologue-screen');
