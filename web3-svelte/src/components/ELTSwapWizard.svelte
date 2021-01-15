<script>
  import {
    ethStore,
    web3,
    selectedAccount,
    connected,
    chainName,
  } from "svelte-web3";

  import * as service from "../utility/services";
  import * as global from "../utility/globals";
  import * as store from "../utility/stores";

  import {
    getETHBalance,
    getELTBurned,
    getHODLInContract,
    getTokenBalance,
    getTotalHodlReward,
    approveELT,
    swap,
    getAllowance,
  } from "../js/web3Helper";

  // TODO: fix imports to omit `/index.svelte`
  import SwapProgressBar from "./SwapProgressBar/index.svelte";
  import LiveReceipt from "./LiveReceipt/index.svelte";
  import BurnSlider from "./BurnSlider/index.svelte";

  // TODO: move to utils
  // $: approveAddr = "0x77189634909a4ad77b7e60c89b5ed5af5ce37d5e";

  $: checkAccount =
    $selectedAccount || "0x0000000000000000000000000000000000000000";

  $: ethBalance = $connected
    ? getETHBalance($web3, $selectedAccount)
    : Number(0.0);

  $: fixedDecimals = (number, precision) => {
    if (typeof number !== "number") return;
    return number.toFixed(typeof precision == "number" ? precision : 4);
  };

  $: eltBalance = $connected
    ? getTokenBalance(
        $web3,
        checkAccount,
        "0xa84a0b15d7c62684b71fecb5ea8efe0e5af1d11b"
      )
    : "";
  $: hodlBalance = $connected
    ? getTokenBalance(
        $web3,
        checkAccount,
        "0x5c85a93991671dc5886203e0048777a4fd219983"
      )
    : "";
  $: totalHodlReward = $connected
    ? getTotalHodlReward($web3, store.swapAmountELT, 25)
    : "";

  $: $chainName, checkChain();

  function checkChain() {
    if ($chainName !== undefined) {
      console.log($chainName);
    }
  }

  // TODO: move this to headerValuePill component
  const fromatAddr = (str) => {
    if (!str) return;
    return str.substr(0, 5) + "..." + str.substr(str.length - 5, str.length);
  };

  // TODO: move this to inputWrapper component
  const sanitizeNumberInput = (evt, isGtZeroAbs = true) => {
    evt.preventDefault();
    let cleanNumber = (evt.target.value = evt.target.value.replace(
      /[^0-9\.,]/g,
      ""
    ));

    if (isGtZeroAbs) {
      cleanNumber = Math.abs(cleanNumber);
    }

    return (valHandler) => {
      valHandler(cleanNumber);
    };
  };
</script>

<style lang="scss" global>
  @import "../styles/main.scss";
</style>

<div class="elt-swap-wizard mt-5 mb-5 p-5" class:not-connected={!$connected}>
  {#await store.currentWizardScreen}
    <div
      class="screen wizard-pending-screen"
      class:active={store.currentWizardScreen == 'wizard-pending-screen'}>
      <div class="screen-header">
        <p>pending...</p>
      </div>

      <div class="screen-body">
        <p>
          <img
            src="/src/static/images/HODL_DAO_Logo_icon.svg"
            alt="http://www.hodldao.xyz" />
        </p>
      </div>

      <div class="screen-footer">
        <p>loading indicator?</p>
      </div>
    </div>
  {:then currScreen}
    {currScreen}
    <div
      class="screen prologue-screen"
      class:active={currScreen == 'prologue-screen'}>
      <div class="screen-header py-5">
        <button
          class="button is-flat"
          class:pending={isSwapBtnPending}
          on:click={util.enableBrowser}>
          X
        </button>
      </div>

      <div class="screen-body p-5">
        <p>
          In ancient Greek drama, the prologos (a word that means basically
          "speaking before") was the opening portion of the play, before the
          entry of the all-important chorus. It might be spoken by a single
          actor, maybe playing a god, who would "set the scene" for the
          audience. Playwrights today instead often provide the same kind of
          "scene-setting" information through dialogue near the play's
          beginning; in movies, it may appear (as in the "Star Wars" series) in
          the form of actual written text. In a nonfiction book, the lead-in is
          now usually called a preface or introduction; novels rarely provide
          any introduction at all. Still, prologue remains a useful word for
          nonliterary purposes. The saying "The past is prologue" tells us that,
          in real life, almost everything can be a prologue to what follows it.
        </p>
      </div>

      <div class="screen-footer is-justify-content-center">
        <button
          class="button is-rounded"
          class:pending={isSwapBtnPending}
          on:click={util.enableBrowser}>
          Continue
        </button>
      </div>
    </div>

    <div
      class="screen elt-swap-wizard-screen"
      class:active={currScreen == 'elt-swap-wizard-screen'}>
      <div
        class="screen-header columns is-flex is-2 level is-multiline is-flex-wrap-wrap
        is-justify-content-end">
        <div
          class="column is-flex-wrap-nowrap is-12-mobile is-6-tablet is-6-desktop">
          <div class="columns is-2 is-flex is-12-mobile">
            <div id="hodlPill" class="column is-6-mobile">
              {#await hodlBalance}
                <pre class="px-1"> ? HODL </pre>
              {:then value}
                <pre class="px-1">{value.toLocaleString('en-US')} HODL</pre>
              {/await}
            </div>

            <div id="eltPill" class="column is-6-mobile">
              {#await eltBalance}
                <pre class="px-1"> ? ELT </pre>
              {:then value}
                <pre class="px-1">{value.toLocaleString('en-US')} ELT</pre>
              {/await}
            </div>
          </div>
        </div>

        <div
          class="column is-12-mobile is-6-tablet is-6-desktop is-justify-content-center">
          <div id="ethPill" class=" is-justify-content-center">
            {#await ethBalance}
              <span class="px-1"> ETH </span>
            {:then value}
              <span class="px-1">{fixedDecimals(value)} ETH </span>
            {/await}
            <div id="balancePill" class="">
              {#if $connected === false}
                <span class="px-1">Not Connected</span>
              {:else}
                <span class="px-1">{fromatAddr($selectedAccount)}</span>
              {/if}
              <span
                id="connectionIndicator"
                class:connected={$connected}>&#11044;</span>
            </div>
          </div>
        </div>
      </div>

      <div
        id="wizardContent"
        class="screen-body columns my-5 is-flex-direction-column">
        <div class="column ">
          <div class="columns is-flex-wrap-wrap ">
            <div
              class="column is-12-mobile is-4-tablet is-4-desktop has-text-centered-mobile">
              <h3 class="">ELT</h3>
              <input
                class="number-bubble input has-text-centered-mobile"
                type="number"
                placeholder="0"
                onwheel="this.blur()"
                bind:value={store.swapAmountELT.set}
                on:input={(evt) => {
                  return sanitizeNumberInput(evt)((cleanVal) => {
                    console.log(' sanitizeNumberInput swapAmountELT ', cleanVal);
                    return cleanVal > 0 ? cleanVal : null;
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
                  store.swapAmountELT.set(Math.abs(store.swapAmountELT) || null);
                }} />
            </div>

            <div
              class="column is-flex is-hidden-mobile is-flex-direction-column is-4-tablet is-4-desktop is-justify-content-end ">
              {#await store.approvedELTAmount}
                <h6>Loading approved</h6>
              {:then value}
                <h6>Approved: {value}</h6>
              {/await}
              {#if $connected === false}
                <button
                  class="button connect-wallet is-rounded"
                  class:pending={store.isSwapBtnPending}
                  on:click={util.enableBrowser}>
                  Connect Wallet
                </button>
              {:else}
                {#await store.approvedELTAmount}
                  <button
                    class="button connect-wallet connected is-rounded"
                    class:pending={store.isSwapBtnPending}
                    on:click={approveELTTransfer}>
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

            <div
              class="column is-hidden-mobile is-4-tablet is-4-desktop has-text-centered-mobile has-text-right">
              <h3 class="">HODL</h3>
              <input
                class="number-bubble input has-text-right"
                type="number"
                placeholder="0"
                onwheel="this.blur()"
                bind:value={store.swapAmountHODL.set}
                on:input={(evt) => {
                  return sanitizeNumberInput(evt)((cleanVal) => {
                    console.log(' sanitizeNumberInput store.swapAmountHODL ', cleanVal);
                    return cleanVal > 0 ? cleanVal : null;
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
                  store.swapAmountELT.set(Math.abs(store.swapAmountELT) || null);
                }} />
            </div>
          </div>
        </div>

        <BurnSlider />
      </div>

      <div class="column is-flex is-12">
        <div class="column is-6 col-left" />
        <LiveReceipt />
      </div>

      <div class="screen-footer">
        <SwapProgressBar />
      </div>
    </div>

    <div
      class="screen eth-purchase-screen"
      class:active={currScreen == 'eth-purchase-screen'}>
      <div class="screen-header">
        <p>screen header</p>
      </div>

      <div class="screen-body">
        <p>
          TBA: same as elt-swap-wizard but now one has to purchase DAO with ETH
        </p>
      </div>

      <div class="screen-footer">
        <p>screen footer</p>
      </div>
    </div>

    <div
      class="screen epilogue-screen"
      class:active={currScreen == 'epilogue-screen'}>
      <div class="screen-header">
        <p>screen header</p>
      </div>

      <div class="screen-body">
        <p>Too late; it's gone now.</p>
        <a href="http://www.hodldao.xyz">Catch the next wave here, maybe.</a>
      </div>

      <div class="screen-footer">
        <p>screen footer</p>
      </div>
    </div>

    <div
      class="screen dao-screen-of-doom"
      class:active={currScreen == 'dao-screen-of-doom'}>
      <p>Error state</p>
    </div>
  {/await}
</div>
