<script>
  import {
    web3,
    selectedAccount,
    connected,
    chainName,
    ethStore,
  } from "svelte-web3";

  import * as global from "../../../utils/globals";

  /** TODO: figure out how to properly import these */
  // import * as store from "../utils/stores";
  import {
    approvedELTAmount,
    burnPercentage,
    swapAmountHODL,
    swapAmountELT,
    isSwapBtnPending,
    isSwapBtnDisabled,
  } from "../../../utils/stores";

  import {
    getETHBalance,
    getTokenBalance,
    getELTInContract,
    getTotalHodlReward,
  } from "../../../js/web3Helper";

  // TODO: fix imports to omit `/index.svelte`
  import SwapProgressBar from "../../SwapProgressBar/index.svelte";
  import LiveReceipt from "../../LiveReceipt/index.svelte";
  import BurnSlider from "../../BurnSlider/index.svelte";
  import NumberInput from "../../NumberInput/index.svelte";

  // TODO: move to utils
  // $: approveAddr = "0x77189634909a4ad77b7e60c89b5ed5af5ce37d5e";

  $: checkAccount =
    $selectedAccount || "0x0000000000000000000000000000000000000000";

  $: eltInContract = $connected ? getELTInContract($web3) : 0;

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

  /** */
  function checkChain() {
    if ($chainName !== undefined) {
      console.log($chainName);
    }
  }
  $: $chainName, checkChain();

  $: checkAccount =
    $selectedAccount || "0x0000000000000000000000000000000000000000";

  // Creates a connection to own infura node.
  const enable = () => {
    // console.dir(ethStore);
    ethStore
      .setProvider(
        "https://ropsten.infura.io/v3/952d8bd0e20b4bbfac856dc18285b6ca"
      )
      .then((res) => {
        console.dir(res);
        // isSwapBtnPending.set(false);
      });
  };

  $: enableBrowser = async () => {
    isSwapBtnPending.set(true);
    await enable();
    ethStore.setBrowserProvider();
  };

  /** */
  $: getSwapProgress = () =>
    parseInt(
      ($connected ? getELTInContract($web3) : 0 * 100) / global.absMaxELT
    ) || 0;

  /** */
  $: totalHodlReward = $connected
    ? getTotalHodlReward($web3, $swapAmountELT, 25)
    : "";

  function castToPrecision(floatNum, maxDecLen = 8) {
    let decimals = (floatNum + "").split(".")[1] || [];
    return decimals.length > maxDecLen ? floatNum.toFixed(maxDecLen) : floatNum;
  }

  function castValidAmountOfELT(elt) {
    if (elt >= global.minELTToSwap) {
      if (elt > global.maxELTToSwap) {
        return false;
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
      0 < Number(hodl) <= global.maxELTToSwap
        ? Number(hodl * 2 * 10 ** 6)
        : null;
    return castValidAmountOfELT(transmuted)
      ? castToPrecision(transmuted, 0)
      : null;
  }

  function sendSwap() {
    if ($connected) {
      console.log("0 --- : " + $isSwapBtnDisabled);
      isSwapBtnDisabled.set(true);
      isSwapBtnPending.set(true);

      swap($web3, $swapAmountELT, $burnPercentage, $selectedAccount).then(
        async function (resolve, reject) {
          if (resolve) {
            console.log("Swap transaction confirmed!");

            // Check the allowance again to change the button back to Approve
            let eltAllowance = await getApprovedAmount();
            approvedELTAmount.set(eltAllowance);
            console.log("Allowance: " + eltAllowance);
            console.log("1 --- : " + $isSwapBtnDisabled);
            isSwapBtnDisabled.set(false);
            isSwapBtnPending.set(false);
          }
        }
      );
    }
  }

  async function approveELTTransfer() {
    console.log("2 --- : " + $isSwapBtnDisabled);
    isSwapBtnDisabled.set(true);
    isSwapBtnPending.set(true);

    if ($connected) {
      approveELT(
        $web3,
        $swapAmountELT,
        $selectedAccount,
        swapContractAddress
      ).then(async function (resolve, reject) {
        if (resolve) {
          let eltAllowance = await getApprovedAmount();
          console.log("Approval transaction confirmed!", eltAllowance);
          approvedELTAmount.set(eltAllowance);
          isSwapBtnDisabled.set(false);
          isSwapBtnPending.set(false);
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

  import { formatAddr } from "../../../utils/services.js";
</script>

<style>
</style>

<div
  class="screen elt-swap-screen"
  class:active={$$props.currScreen == 'elt-swap-screen'}>
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
          {:else}<span class="px-1">{formatAddr($selectedAccount)}</span>{/if}
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
          <h3 class="">ELT {$swapAmountELT}</h3>
          <NumberInput
            bindTo={$swapAmountELT}
            placeholder="0"
            sanitizeClbk={(cleanVal) => {
              if (cleanVal <= global.maxELTToSwap) {
                console.log(' sanitizeNumberInput swapAmountELT ', $swapAmountELT);
                swapAmountELT.set(cleanVal);
              } else {
                swapAmountELT.set(global.maxELTToSwap);
              }
              swapAmountHODL.set(eltToHodl($swapAmountELT));
            }}
            inputClasses="number-bubble input has-text-centered-mobile" />
        </div>

        <div
          class="column is-flex is-hidden-mobile is-flex-direction-column is-4-tablet is-4-desktop is-justify-content-end ">
          {#await $approvedELTAmount}
            <h6>Loading...</h6>
          {:then value}
            <h6>Approved: {value}</h6>
          {/await}
          {#if $connected === false}
            <button
              class="button connect-wallet is-rounded"
              class:pending={$isSwapBtnPending}
              on:click={enableBrowser}>
              Connect Wallet
            </button>
          {:else}
            {#await $approvedELTAmount}
              <button
                class="button connect-wallet connected is-rounded"
                class:pending={$isSwapBtnPending}
                on:click={approveELTTransfer}>
                Approve
              </button>
            {:then value}
              {#if value >= global.minELTToSwap}
                <button
                  class="button connect-wallet connected is-rounded"
                  class:pending={$isSwapBtnPending}
                  class:disabled={$isSwapBtnDisabled}
                  on:click={sendSwap}>
                  Swap
                </button>
              {:else}
                <button
                  class="button connect-wallet connected is-rounded"
                  class:pending={$isSwapBtnPending}
                  on:click={approveELTTransfer}>
                  Approve
                </button>
              {/if}
            {/await}
          {/if}
        </div>

        <div
          class="column is-hidden-mobile is-4-tablet is-4-desktop has-text-centered-mobile has-text-right">
          <h3 class="">{$swapAmountHODL} HODL</h3>
          <NumberInput
            bindTo={$swapAmountHODL}
            placeholder="0"
            sanitizeClbk={(cleanVal) => {
              if (cleanVal <= 50) {
                swapAmountELT.set(hodlToElt(cleanVal));
                swapAmountHODL.set(cleanVal);

                console.log(' sanitizeNumberInput swapAmountHodl ', cleanVal);
                // return cleanVal > 0 ? cleanVal : null;
              } else {
                swapAmountHODL.set(50);
                swapAmountELT.set(hodlToElt(global.maxELTToSwap));
              }
            }}
            inputClasses="number-bubble input has-text-right" />
        </div>
      </div>
    </div>

    {#await $connected}
      <div />
    {:then}
      <BurnSlider isVisible={() => ($connected ? true : false)} />
    {/await}

    <div
      class="column is-flex is-hidden-tablet is-hidden-desktop is-flex-direction-column is-12-mobile is-justify-content-end ">
      {#await $approvedELTAmount}
        <h6>Loading approved</h6>
      {:then value}
        <h6>Approved: {value}</h6>
      {/await}
      {#if $connected === false}
        <button
          class="button connect-wallet is-rounded"
          class:pending={$isSwapBtnPending}
          on:click={enableBrowser}>
          Connect Wallet
        </button>
      {:else}
        {#await $approvedELTAmount}
          <button
            class="button connect-wallet connected is-rounded"
            class:pending={$isSwapBtnPending}
            on:click={approveELTTransfer.set}>
            Approve
          </button>
        {:then value}
          {#if value >= global.minELTToSwap}
            <button
              class="button connect-wallet connected is-rounded"
              class:pending={$isSwapBtnPending}
              class:disabled={$isSwapBtnDisabled}
              on:click={sendSwap}>
              Swap
            </button>
          {:else}
            <button
              class="button connect-wallet connected is-rounded"
              class:pending={$isSwapBtnPending}
              on:click={approveELTTransfer.set}>
              Approve
            </button>
          {/if}
        {/await}
      {/if}
    </div>
  </div>

  <div class="columns is-flex is-12">
    <div class="column is-6 col-left" />
    <div class="column is-6 col-right">
      <LiveReceipt />
    </div>
  </div>

  <div class="screen-footer">
    <SwapProgressBar {getELTInContract} {getSwapProgress} {eltInContract} />
  </div>
</div>
