<script type="ts">
  import { onMount } from "svelte";
  import { web3 } from "svelte-web3";

  import { getSwapPhase, hasConnectedAccounts } from "../js/web3Helper.js";

  import ScreenOverlay from "./ScreenOverlay/index.svelte";
  import {
    approvedELTAmount,
    burnPercentage,
    isAppBroken,
    isAppPending,
    isRPCEnabled,
    latestAccount,
    swapAmountELT,
    swapAmountHODL,
    transactionHistory,
    isBurnSliderVisible,
    currentSwapToken,
    currentSwapPhase,
    isOverlayScreenActive,
    currentWizardScreen,
    selectedAccount,
  } from "../utils/stores";

  import DAOScreenOfDoom from "./screens/DAOScreenOfDoom/index.svelte";
  import ELTSwapScreen from "./screens/ELTSwapScreen/index.svelte";
  import EpilogueScreen from "./screens/EpilogueScreen/index.svelte";
  import ETHPurchaseScreen from "./screens/ETHPurchaseScreen/index.svelte";
  import PrologueScreen from "./screens/PrologueScreen/index.svelte";

  /**
   * TODO: Handle this and then maybe persist it.
   * isAppBroken.useLocalStorage();
   */
  if ($isAppBroken) {
    currentWizardScreen.set("dao-screen-of-doom");
  }

  const setCurrentWizardScreen = (slug: string) => {
    currentWizardScreen.set(slug);
    // update stuff here...
  };

  onMount(() => {
    console.log(" ELTSwapWizard onMount ");
    approvedELTAmount.set(null);
    burnPercentage.set(50);
    swapAmountELT.set(null);
    swapAmountHODL.set(null);
    isBurnSliderVisible.set(false);
    isOverlayScreenActive.set(false);
    isRPCEnabled.set(hasConnectedAccounts());

    // TODO: load these from localStorage
    transactionHistory.set([]);
    latestAccount.set($selectedAccount);

    switch ($currentSwapPhase) {
      case 1:
        currentSwapToken.set("ELT");
        setCurrentWizardScreen("elt-swap-screen");
        break;
      case 2:
        currentSwapToken.set("ETH");
        setCurrentWizardScreen("eth-purchase-screen");
        break;
      case 3:
        currentSwapToken.set("ETH");
        setCurrentWizardScreen("epilogue-screen");
        break;
      default:
      // console.log(" switch(getSwapPhase(web3) ", getSwapPhase(web3));
    }
  });
</script>

{#await $currentWizardScreen then currScreen}
  <div
    class="column is-flex-wrap-wrap my-5 is-12 is-flex is-justify-content-center"
  >
    <button
      class="button is-ghost"
      class:isPrimary={currScreen === "prologue-screen"}
      on:click={(evt) => {
        setCurrentWizardScreen("prologue-screen");
      }}>PrologueScreen</button
    >

    <button
      class="button is-ghost"
      class:isPrimary={currScreen === ""}
      on:click={(evt) => {
        setCurrentWizardScreen("elt-swap-screen");
      }}>ELTSwapScreen</button
    >
    <button
      class="button is-ghost"
      on:click={(evt) => {
        setCurrentWizardScreen("eth-purchase-screen");
      }}>ETHPurchaseScreen</button
    >
    <button
      class="button is-ghost"
      on:click={(evt) => {
        setCurrentWizardScreen("epilogue-screen");
      }}>EpilogueScreen</button
    >
    <button
      class="button is-ghost"
      on:click={(evt) => {
        setCurrentWizardScreen("dao-screen-of-doom");
      }}>DAOScreenOfDoom</button
    >
  </div>
{/await}

<div class="elt-swap-wizard mt-5 mb-5 p-5">
  {#await $currentWizardScreen then currScreen}
    <DAOScreenOfDoom {currScreen} />
    <ELTSwapScreen {currScreen} />
    <EpilogueScreen {currScreen} />
    <ETHPurchaseScreen {currScreen} />
    <PrologueScreen {currScreen} />
  {/await}

  <ScreenOverlay />
</div>

<style lang="scss" global>
  @import "../styles/main.scss";
</style>
