<script>
  import { web3, selectedAccount, ethStore } from "svelte-web3";
  import tippy from "sveltejs-tippy";
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
  import { getTokenBalance } from "../../../js/web3Helper";

  import { approveELT, getAllowance } from "../../../js/web3Helper";

  // TODO: fix imports to omit `/index.svelte`
  import SwapProgressBar from "../../SwapProgressBar/index.svelte";
  import LiveReceipt from "../../LiveReceipt/index.svelte";
  import BurnSlider from "../../BurnSlider/index.svelte";
  import NumberInput from "../../NumberInput/index.svelte";
  import ScreenHeader from "../ScreenHeader/index.svelte";
  import { afterUpdate } from "svelte";

  console.dir(ScreenHeader);
  // TODO: move to utils
  // $: approveAddr = "0x77189634909a4ad77b7e60c89b5ed5af5ce37d5e";

  window.ethereum.on("chainChanged", (_chainId) => {
    // We recommend reloading the page, unless you must do otherwise
    window.location.reload();
  });

  afterUpdate(() => {
    let accounts = window.ethereum["_state"]["accounts"];
    if (accounts && accounts[0] !== $latestAccount) {
      isRPCEnabled.set(accounts.length ? true : false);
      latestAccount.set(accounts[0]);
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
          (res) => {
            isAppPending.set(false);
          },
          (error) => {
            console.dir(error);
            // set state to "pending"
            // isAppPending.set(true);

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

  $: checkAccount = $selectedAccount || global.nilAccount;

  $: enableBrowser = async () => {
    isAppPending.set(true);
    await enable();
  };

  function castToPrecision(floatNum, maxDecLen = 8) {
    // console.log(" ---- ", floatNum);
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
    console.log("approveELTTransfer: ELT: " + $swapAmountELT);
    if ($isRPCEnabled && !$isAppPending) {
      isAppPending.set(true);

      approveELT(
        $web3,
        $swapAmountELT,
        $selectedAccount,
        global.swapContractAddress
      ).then(async function (resolve, reject) {
        if (resolve) {
          try {
            let eltAllowance = await getApprovedAmount();
            console.log("Approval transaction confirmed!", eltAllowance);
          } catch (err) {
            console.log("Err: approveELT failed.", err);
            return reject(err);
          }
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
          approvedELTAmount.set(Number(result));

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
    let appPhase = "";

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

  $: eltBalance = $isRPCEnabled
    ? getTokenBalance($web3, checkAccount, global.ELTTokenContractAddr)
    : "";

  const tooltips = {
    connStatus: {
      content: "please (re)connect",
      placement: "left",
    },
  };
</script>

<style lang="scss">
  :global(.tooltip) {
    // font-size: 1.2rem;
    background-color: #fff;
    text-transform: uppercase;
  }
</style>

<div
  class="screen elt-swap-screen"
  class:active={$$props.currScreen == 'elt-swap-screen'}>
  <ScreenHeader />

  <p class="is-12 has-text-right is-size-7" class:disabled={$isRPCEnabled}>
    contract status:

    <span use:tippy={tooltips.connStatus}> {contractStatusIndicator()} </span>
  </p>

  <div
    id="wizardContent"
    class="screen-body columns my-5 is-flex-direction-column">
    <div class="">
      <div class="columns is-flex-wrap-wrap ">
        <div
          class="column is-flex is-position-relative is-12-mobile is-4-tablet is-4-desktop has-text-centered-mobile is-flex-direction-column is-justify-content-end">
          <h3 class="">ELT {$swapAmountELT}</h3>
          <NumberInput
            bindTo={$swapAmountELT}
            placeholder={!$isRPCEnabled ? '' : 0}
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

          {#await eltBalance}
            <span />
          {:then}
            {#if eltBalance > 0}
              <button
                id="setMaxELT"
                disabled={$isAppPending}
                on:click={() => {
                  swapAmountELT.set(eltBalance);
                }}
                class="button is-info is-size-7 px-1 py-0">
                max
              </button>
            {/if}
          {/await}
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
              <span />
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
                  class:disabled={!$swapAmountELT || $swapAmountELT < global.minELTToSwap}
                  on:click={approveELTTransfer}>
                  Approve
                </button>
              {/if}
            {/await}
          {/if}
        </div>

        <div
          class="column is-hidden-mobile is-4-tablet is-4-desktop has-text-centered-mobile has-text-right is-justify-content-end">
          <h3 class="">
            <img
              src="/static/images/HODL_DAO_Logo_icon.svg"
              alt="HODL-DAO"
              class="logo-knob" />
            HODL
          </h3>
          <NumberInput
            bindTo={$swapAmountHODL}
            placeholder={!$isRPCEnabled ? '' : 0}
            isDisabled={!$isRPCEnabled}
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
      class="column px-0 is-flex is-hidden-tablet is-hidden-desktop is-flex-direction-column is-12-mobile is-justify-content-end ">
      <div
        class="column px-0 is-12-mobile is-hidden-tablet is-hidden-desktop has-text-centered-mobile has-text-center is-justify-content-end">
        <h3 class="">
          <img
            src="/static/images/HODL_DAO_Logo_icon.svg"
            alt="HODL-DAO"
            class="logo-knob" />
          HODL
        </h3>
        <NumberInput
          bindTo={$swapAmountHODL}
          placeholder={!$isRPCEnabled ? '' : 0}
          isDisabled={!$isRPCEnabled}
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
            class:disabled={$swapAmountELT >= global.minELTToSwap || $isAppPending}
            on:click={approveELTTransfer}>
            Approve
          </button>
        {:then value}
          {#if value >= global.minELTToSwap}
            <button
              class="button connect-wallet connected is-rounded"
              class:pending={$isAppPending}
              class:disabled={!$swapAmountELT || $swapAmountELT < global.minELTToSwap}
              on:click={sendSwap}>
              Swap
            </button>
          {:else}
            <button
              class="button connect-wallet connected is-rounded"
              class:pending={$isAppPending}
              class:disabled={!$swapAmountELT || $swapAmountELT < global.minELTToSwap}
              on:click={approveELTTransfer}>
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

  <div
    class="is-flex is-12 pb-5 is-justify-content-center is-flex-flow-row screen-footer">
    <SwapProgressBar />
  </div>
</div>
