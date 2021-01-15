<script>
  import { web3, connected, selectedAccount } from "svelte-web3";

  import * as service from "../utility/services";
  import * as global from "../utility/globals";
  import * as store from "../utility/stores";

  $: ELTBurnBonus = Number((store.swapAmountHODL / 100) * store.burnPercentage);

  function castToPrecision(float, maxDecLen = 8) {
    let decimals = (float + "").split(".")[1] || [];
    return decimals.length > maxDecLen ? float.toFixed(maxDecLen) : float;
  }

  function castValidAmountOfELT(elt) {
    if (elt >= minELTToSwap) {
      if (elt > maxELTToSwap) {
        return false; // maxELTToSwap;
      }
      return elt;
    }
    return null;
  }

  function eltToHodl(elt) {
    return castValidAmountOfELT(elt)
      ? castToPrecision(Number(elt * 0.0000005), 8)
      : null;
  }

  function hodlToElt(hodl) {
    let transmuted =
      0 < Number(hodl) <= maxELTToSwap ? Number(hodl * 2 * 10 ** 6) : null;
    return castValidAmountOfELT(transmuted)
      ? castToPrecision(transmuted, 0)
      : null;
  }

  function sendSwap() {
    if ($connected) {
      store.isSwapBtnDisabled = true;
      store.isSwapBtnPending.set(true);

      swap(
        $web3,
        store.swapAmountELT,
        store.burnPercentage,
        $selectedAccount
      ).then(async function (resolve, reject) {
        if (resolve) {
          console.log("Swap transaction confirmed!");

          // Check the allowance again to change the button back to Approve
          let eltAllowance = await getApprovedAmount();
          store.approvedELTAmount.set(eltAllowance);
          console.log("Allowance: " + eltAllowance);
          store.isSwapBtnDisabled.set(false);
          store.isSwapBtnPending.set(false);
        }
      });
    }
  }

  async function approveELTTransfer() {
    if ($connected) {
      store.isSwapBtnDisabled.set(true);
      store.isSwapBtnPending.set(true);

      approveELT(
        $web3,
        store.swapAmountELT,
        $selectedAccount,
        swapContractAddress
      ).then(async function (resolve, reject) {
        if (resolve) {
          console.log("Approval transaction confirmed!");
          let eltAllowance = await getApprovedAmount();
          store.approvedELTAmount.set(eltAllowance);
          console.log("Allowance: " + eltAllowance);
          store.isSwapBtnDisabled.set(false);
          store.isSwapBtnPending.set(false);
        }
      });
    }
  }

  function getApprovedAmount() {
    if ($connected) {
      let allowance = getAllowance($web3, checkAccount, swapContractAddress);
      console.log(allowance);
      return allowance;
    }
  }
</script>

<style>
  /**
  * For some reason, styles defined here are not
  * applyed.
  * TODO: Figure out why so.
  */
</style>

<div class="burn-slider-wrapper column is-12 ">
  <div class="columns level is-flex-wrap-wrap">
    <div class="column is-hidden-mobile is-3-tablet is-3-desktop">
      <h3>ELT Burn &#128293;</h3>
      <span
        class="elt-burn-percent"
        class:disabled={store.swapAmountELT < global.minELTToSwap ? 'disabled' : ''}>
        {store.burnPercentage}%
      </span>
    </div>

    <div
      id="swapHodlBurnRatio"
      class="column is-12-mobile is-4-tablet is-6-desktop pb-0">
      <input
        type="range"
        id="burnRatioSlider"
        min="0"
        max="100"
        class:disabled={store.swapAmountELT < minELTToSwap}
        disabled={store.swapAmountELT < minELTToSwap ? 'disabled' : ''}
        bind:value={store.burnPercentage.set} />
    </div>

    <div class="column is-flex is-3-tablet is-3-desktop p-0">
      <div
        class="column is-hidden-tablet is-hidden-desktop is-6-mobile is-2-tablet is-2-desktop">
        <h3>ELT Burn &#128293;</h3>
        <span
          class="elt-burn-percent"
          class:disabled={store.swapAmountELT < minELTToSwap ? 'disabled' : ''}>
          {store.burnPercentage}%
        </span>
      </div>

      <div class="column is-6-mobile is-pull-right has-text-right">
        <h3><span class="is-hidden-mobile">HODL</span> Burn Bonus</h3>
        <span class="hodl-burn-bonus" class:disabled={!ELTBurnBonus}>
          {ELTBurnBonus.toFixed(4)}
          HODL
        </span>
      </div>
    </div>

    <div
      class="column is-hidden-tablet is-hidden-desktop if-full-mobile is-5-dektop has-text-centered">
      <h3 class="">HODL</h3>
      <input
        class="number-bubble input has-text-centered-mobile"
        type="number"
        placeholder="0"
        onwheel="this.blur()"
        bind:value={store.swapAmountHODL.set}
        on:input={(evt) => {
          // console.dir(' .... ', sanitizeNumberInput(evt));
          return sanitizeNumberInput(evt)((cleanVal) => {
            console.log(' sanitizeNumberInput cleanVal ', cleanVal);
            return cleanVal > 0 ? store.swapAmountELT.set(cleanVal / 0.0000005) : store.swapAmountELT.set(null);
          });
        }}
        on:keydown={(evt) => {
          // prevent editing value by arrowKeys
          if (evt.key == 'ArrowDown' || evt.key == 'ArrowUp') {
            evt.preventDefault();
          }
        }}
        on:keyup={(evt) => {
          // prevent pasting negative vals
          store.swapAmountELT(Math.abs(store.swapAmountELT) || null);
        }} />
    </div>

    <div
      class="column is-flex is-hidden-tablet is-hidden-desktop is-flex-direction-column is-12-mobile is-justify-content-end ">
      {#await store.approvedELTAmount}
        <h6>Loading approved</h6>
      {:then value}
        <h6>Approved: {value}</h6>
      {/await}
      {#if $connected === false}
        <button
          class="button connect-wallet is-rounded"
          class:pending={store.isSwapBtnPending}
          on:click={enableBrowser}>
          Connect Wallet
        </button>
      {:else}
        {#await store.approvedELTAmount}
          <button
            class="button connect-wallet connected is-rounded"
            class:pending={store.isSwapBtnPending}
            on:click={store.approveELTTransfer.set}>
            Approve
          </button>
        {:then value}
          {#if value >= minELTToSwap}
            <button
              class="button connect-wallet connected is-rounded"
              class:pending={store.isSwapBtnPending}
              class:disabled={store.isSwapBtnDisabled}
              on:click={sendSwap}>
              Swap
            </button>
          {:else}
            <button
              class="button connect-wallet connected is-rounded"
              class:pending={store.isSwapBtnPending}
              on:click={approveELTTransfer}>
              Approve
            </button>
          {/if}
        {/await}
      {/if}
    </div>
  </div>
</div>
