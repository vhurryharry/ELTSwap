<script>
  import { web3, selectedAccount, ethStore } from "svelte-web3";
  import SvelteTooltip from "svelte-tooltip";

  import * as global from "../../../utils/globals";

  /** TODO: figure out how to properly import these */
  // import * as store from "../utils/stores";
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
  } from "../../../utils/stores";
  // initialize from localStorage
  isAppBroken.useLocalStorage();
  transactionHistory.useLocalStorage();

  import { formatAddr } from "../../../utils/services.js";

  import {
    approveELT,
    getAllowance,
    getELTInContract,
    getETHBalance,
    getTokenBalance,
    getTotalHodlReward,
  } from "../../../js/web3Helper";

  // TODO: fix imports to omit `/index.svelte`
  import SwapProgressBar from "../../SwapProgressBar/index.svelte";
  import LiveReceipt from "../../LiveReceipt/index.svelte";
  import BurnSlider from "../../BurnSlider/index.svelte";
  import NumberInput from "../../NumberInput/index.svelte";

  // TODO: move to utils
  // $: approveAddr = "0x77189634909a4ad77b7e60c89b5ed5af5ce37d5e";
  $: checkAccount = $selectedAccount || global.nilAccount;

  $: eltInContract = $isRPCEnabled ? getELTInContract($web3) : 0;

  $: ethBalance = $isRPCEnabled
    ? getETHBalance($web3, $selectedAccount)
    : Number(0.0);

  $: fixedDecimals = (number, precision) => {
    if (typeof number !== "number") return;
    return number.toFixed(typeof precision == "number" ? precision : 4);
  };

  $: eltBalance = $isRPCEnabled
    ? getTokenBalance(
        $web3,
        checkAccount,
        "0xa84a0b15d7c62684b71fecb5ea8efe0e5af1d11b"
      )
    : "";

  $: hodlBalance = $isRPCEnabled
    ? getTokenBalance(
        $web3,
        checkAccount,
        "0x5c85a93991671dc5886203e0048777a4fd219983"
      )
    : "";

  window.ethereum.on("chainChanged", (_chainId) => {
    // We recommend reloading the page, unless you must do otherwise
    window.location.reload();
  });

  window.onbeforeunload = () => {
    // cleanup before leaving
    isRPCEnabled.set(false);
    isAppPending.set(false);
    latestAccount.set(null);
    isAppBroken.set(false); // just in case...
  };

  window.ethereum.on("accountsChanged", (accounts) => {
    console.dir(" accounts ", accounts);
    if (accounts[0] !== $latestAccount) {
      isRPCEnabled.set(accounts.length ? true : false);
      isAppPending.set(false);
      latestAccount.set(accounts[0]);
      isAppBroken.set(false); // just in case...
    }
  });

  // Creates a connection to own infura node.
  const enable = () => {
    ethStore
      .setProvider(
        "https://ropsten.infura.io/v3/952d8bd0e20b4bbfac856dc18285b6ca"
      )
      .then(() => {
        ethStore.setBrowserProvider().then(
          () => {
            isAppPending.set(false);
          },
          (error) => {
            console.dir(error);
            // set state to "pending"
            isAppPending.set(true);

            // handle codes
            switch (error.code) {
              case 4001:
                // EIP-1193 userRejectedRequest error
                console.log("Permissions needed to continue.");
                // tooltip
                break;
              case -32002:
                // there's a pending request for permissions
                console.log("Please check Metamask for pending requests.");
                // tooltip
                break;
              default:
                // impossible to recover;
                isAppBroken.set(true);
            }
          }
        );
      });
  };

  $: enableBrowser = async () => {
    isAppPending.set(true);
    await enable();
  };

  /** */
  $: getSwapProgress = () => {
    return 0;
    parseInt(
      ($isRPCEnabled ? getELTInContract($web3) : 0 * 100) / global.absMaxELT
    ) || 0;
  };

  /** */
  $: totalHodlReward = $isRPCEnabled
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
    if ($isRPCEnabled) {
      isAppPending.set(true);

      swap($web3, $swapAmountELT, $burnPercentage, $selectedAccount).then(
        async function (resolve, reject) {
          if (resolve) {
            console.log("Swap transaction confirmed!");

            // Check the allowance again to change the button back to Approve
            let eltAllowance = await getApprovedAmount();
            approvedELTAmount.set(eltAllowance);
            console.log("Allowance: " + eltAllowance);
            isAppPending.set(false);
          }
        }
      );
    }
  }

  async function approveELTTransfer() {
    isAppPending.set(true);

    if ($isRPCEnabled) {
      approveELT(
        $web3,
        $swapAmountELT,
        $selectedAccount,
        global.swapContractAddress
      ).then(async function (resolve, reject) {
        if (resolve) {
          let eltAllowance = await getApprovedAmount();
          console.log("Approval transaction confirmed!", eltAllowance);
          approvedELTAmount.set(eltAllowance);

          console.log("Allowance: " + eltAllowance);

          isAppPending.set(false);
        }
      });
    }
  }

  function getApprovedAmount() {
    if ($isRPCEnabled) {
      isAppPending.set(true);
      return getAllowance($web3, checkAccount, global.swapContractAddress).then(
        (result) => {
          console.log(" approvedAmount ", result);
          isAppPending.set(false);
        },
        (error) => {
          console.log(" getApprovedAmount err ", error);
        }
      );
    }
  }

  $: contractStatusIndicator = () => {
    let statusStr = $isRPCEnabled ? "connected" : "disconnected";

    if ($isAppPending) {
      let pendingAction = "";
      // TODO revise this
      if (appPhase === 0) {
        statusStr = "swap pending";
      }
      if (appPhase === 1) {
        statusStr = `${$swapAmountELT}ELT deposited`;
      }
    }

    return statusStr;
  };
</script>

<style lang="scss">
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
          {#if !$latestAccount}
            <span class="px-1">Disconnected</span>
          {:else}<span class="px-1">{formatAddr($latestAccount)}</span>{/if}
          <span
            id="connectionIndicator"
            class:connected={$isRPCEnabled}>&#11044;</span>
        </div>
      </div>
    </div>
  </div>

  <SvelteTooltip tip="view on github" bottom>
    <p class="has-text-right">contract status: {contractStatusIndicator()}</p>
  </SvelteTooltip>

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
            <h6>Pending...</h6>
          {:then value}
            <h6
              class="has-tooltip-arrow"
              data-tooltip="type valid amount of ELT">
              Approved:
              {value || 0}
            </h6>
          {/await}

          {#if $isRPCEnabled === false}
            <button
              class="button connect-wallet is-rounded has-tooltip-arrow"
              class:pending={$isAppPending}
              class:disabled={$isAppPending}
              on:click={enableBrowser}
              data-tooltip="type valid amount of ELT">
              Connect Wallet
            </button>
          {:else}
            {#await $approvedELTAmount}
              <button
                class="button connect-wallet connected is-rounded"
                class:pending={$isAppPending}
                class:disabled={$isAppPending}
                on:click={approveELTTransfer}>
                Approve
              </button>
            {:then value}
              {#if value >= global.minELTToSwap}
                <button
                  class="button connect-wallet connected is-rounded"
                  class:pending={$isAppPending}
                  class:disabled={$isAppPending}
                  on:click={sendSwap}>
                  Swap
                </button>
              {:else}
                <button
                  class="button connect-wallet connected is-rounded"
                  class:pending={$isAppPending}
                  class:disabled={$isAppPending}
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

    {#await $isRPCEnabled}
      <div />
    {:then value}
      <BurnSlider isVisible={value} />
    {/await}

    <div
      class="column is-flex is-hidden-tablet is-hidden-desktop is-flex-direction-column is-12-mobile is-justify-content-end ">
      {#await $approvedELTAmount}
        <h6>Loading approved</h6>
      {:then value}
        <h6>Approved: {value}</h6>
      {/await}
      {#if $isRPCEnabled === false}
        <button
          class="button connect-wallet is-rounded"
          class:pending={$isAppPending}
          class:disabled={$isAppPending}
          on:click={enableBrowser}>
          Connect Wallet
        </button>
      {:else}
        {#await $approvedELTAmount}
          <button
            class="button connect-wallet connected is-rounded"
            class:pending={$isAppPending}
            class:disabled={$isAppPending}
            on:click={approveELTTransfer.set}>
            Approve
          </button>
        {:then value}
          {#if value >= global.minELTToSwap}
            <button
              class="button connect-wallet connected is-rounded"
              class:pending={$isAppPending}
              class:disabled={$isAppPending}
              on:click={sendSwap}>
              Swap
            </button>
          {:else}
            <button
              class="button connect-wallet connected is-rounded"
              class:pending={$isAppPending}
              class:disabled={$isAppPending}
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
