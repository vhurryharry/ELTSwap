<script>
  import {
    ethStore,
    web3,
    selectedAccount,
    connected,
    chainName,
  } from "svelte-web3";

  import { approvedELTAmount, currentWizardScreen } from "../utility/stores";

  import {
    getETHBalance,
    getELTBurned,
    getELTInContract,
    getHODLInContract,
    getTokenBalance,
    getTotalHodlReward,
    approveELT,
    swap,
    getAllowance,
  } from "../js/web3Helper";

  let isSwapBtnDisabled = false;
  let isSwapBtnPending = false;

  const minELTToSwap = 10000;
  const absMaxELT = 40 * 10 ** 6;
  const getSwapProgress = () => {
    return parseInt((eltInContract * 100) / absMaxELT);
  };

  // TODO: move to utils
  // $: approveAddr = "0x77189634909a4ad77b7e60c89b5ed5af5ce37d5e";

  // Creates a connection to own infura node.
  const enable = () => {
    ethStore
      .setProvider(
        "https://ropsten.infura.io/v3/952d8bd0e20b4bbfac856dc18285b6ca"
      )
      .then((res) => {
        isSwapBtnPending = false;
      });
  };
  $: enableBrowser = async () => {
    isSwapBtnPending = true;
    await enable();
    ethStore.setBrowserProvider();
  };

  $: swapAmountELT = null; //Number();
  $: swapAmountHodl = swapAmountELT ? Number(swapAmountELT * 0.0000005) : null;
  $: burnPercentage = Number(0);
  $: ELTBurnBonus = Number((swapAmountHodl / 100) * burnPercentage);
  $: checkAccount =
    $selectedAccount || "0x0000000000000000000000000000000000000000";

  $: ethBalance = $connected
    ? getETHBalance($web3, $selectedAccount)
    : Number(0.0);

  $: fixedDecimals = (number) => {
    if (typeof number !== "number") return;
    return number.toFixed(4);
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
    ? getTotalHodlReward($web3, minELTToSwap, 25)
    : "";
  $: hodlInContract = $connected ? getHODLInContract($web3) : "";
  $: eltInContract = $connected ? getELTInContract($web3) : 66;
  $: eltBurned = $connected ? getELTBurned($web3) : "";
  $: isConnected = $connected ? true : false;

  $: approvedValue = $connected
    ? getAllowance(
        $web3,
        checkAccount,
        "0x77189634909a4ad77b7e60c89b5ed5af5ce37d5e"
      )
    : 0;

  async function approveELTTransfer() {
    if ($connected) {
      isSwapBtnDisabled = true;
      isSwapBtnPending = true;
      approveELT(
        $web3,
        minELTToSwap,
        $selectedAccount,
        "0x77189634909a4ad77b7e60c89b5ed5af5ce37d5e"
      ).then(async function (resolve, reject) {
        if (resolve) {
          console.log("Approval transaction confirmed!");
          let eltAllowance = await getApprovedAmount();
          approvedELTAmount.set(eltAllowance);
          console.log("Allowance: " + eltAllowance);
          isSwapBtnDisabled = false;
          isSwapBtnPending = false;
        }
      });
    }
  }

  $: $chainName, checkChain();

  function getApprovedAmount() {
    if ($connected) {
      let allowance = getAllowance(
        $web3,
        checkAccount,
        "0x77189634909a4ad77b7e60c89b5ed5af5ce37d5e"
      );
      console.log(allowance);
      return allowance;
    }
  }

  function checkChain() {
    if ($chainName !== undefined) {
      console.log($chainName);
    }
  }

  function sendSwap() {
    if ($connected) {
      isSwapBtnDisabled = true;
      isSwapBtnPending = true;

      swap($web3, minELTToSwap, 25, $selectedAccount).then(async function (
        resolve,
        reject
      ) {
        if (resolve) {
          console.log("Swap transaction confirmed!");

          // Check the allowance again to change the button back to Approve
          let eltAllowance = await getApprovedAmount();
          approvedELTAmount.set(eltAllowance);
          console.log("Allowance: " + eltAllowance);
          isSwapBtnDisabled = false;
          isSwapBtnPending = false;
        }
      });
    }
  }

  let swapMinThreshold = (15 * 100) / 40;

  // TODO: set {
  //   right: $currSwapAmountPrc;
  //   content: $currSwapAmount;
  // } on #currentSwapMark:before

  const fromatAddr = (str) => {
    if (!str) return;
    return str.substr(0, 5) + "..." + str.substr(str.length - 5, str.length);
  };

  const sanitizeNumber = (evt, isGtZeroPositive = true) => {
    evt.preventDefault();
    let cleanNumber = (evt.target.value = evt.target.value.replace(
      /[^0-9.,]/g,
      ""
    )).to;

    // console.log(" isGtZeroPositive ", isGtZeroPositive);
    // console.log(" cleanNumber isGtZeroPositive ", Math.abs(cleanNumber));

    if (isGtZeroPositive) {
      cleanNumber = Math.abs(cleanNumber);
    }

    // console.log(" cleanNumber ", cleanNumber);
    return (valHandler) => {
      valHandler(cleanNumber);
    };
  };

  // TODO: move this to utils
  /**
   * Prevent changing value onScroll for input:number
   */
  // document.addEventListener("wheel", function (event) {
  //   if (document.activeElement.type === "number") {
  //     event.preventDefault();
  //     document.activeElement.blur();
  //   }
  // });
  // can use ` onwheel="this.blur()" ` instead
  // from https://stackoverflow.com/questions/9712295/disable-scrolling-on-input-type-number
  // but only handles the wheel, not the arrow keys, as well
</script>

<style lang="scss" global>
  @import "bulma/bulma";
  @import "../styles/main.scss";
</style>

<div class="elt-swap-wizard mt-5 mb-5 p-5" class:not-connected={!isConnected}>
  {#await $currentWizardScreen}
    <div
      class="screen wizard-pending-screen"
      class:active={currScreen == 'wizard-pending-screen'}>
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
    <div
      class="screen prologue-screen"
      class:active={currScreen == 'prologue-screen'}>
      <div class="screen-header py-5">
        <button
          class="button is-flat"
          class:pending={isSwapBtnPending}
          on:click={enableBrowser}>
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
          on:click={enableBrowser}>
          Continue
        </button>
      </div>
    </div>

    <div
      class="screen elt-swap-wizad-screen"
      class:active={currScreen == 'elt-swap-wizad-screen'}>
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
              {#if isConnected === false}
                <span class="px-1">Not Connected</span>
              {:else}
                <span class="px-1">{fromatAddr($selectedAccount)}</span>
              {/if}
              <span
                id="connectionIndicator"
                class:connected={isConnected}>&#11044;</span>
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
                bind:value={swapAmountELT}
                on:input={(evt) => {
                  return sanitizeNumber(evt)((cleanVal) => {
                    console.log(' sanitizeNumber swapAmountELT ', cleanVal);
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
                  swapAmountELT = Math.abs(swapAmountELT) || null;
                }} />
            </div>

            <div
              class="column is-flex is-hidden-mobile is-flex-direction-column is-4-tablet is-4-desktop is-justify-content-end ">
              {#await $approvedELTAmount}
                <h6>Loading approved</h6>
              {:then value}
                <h6>Approved: {value}</h6>
              {/await}
              {#if isConnected === false}
                <button
                  class="button connect-wallet is-rounded"
                  class:pending={isSwapBtnPending}
                  on:click={enableBrowser}>
                  Connect Wallet
                </button>
              {:else}
                {#await $approvedELTAmount}
                  <button
                    class="button connect-wallet connected is-rounded"
                    class:pending={isSwapBtnPending}
                    on:click={approveELTTransfer}>
                    Approve
                  </button>
                {:then value}
                  {#if value >= minELTToSwap}
                    <button
                      class="button connect-wallet connected is-rounded"
                      class:pending={isSwapBtnPending}
                      class:disabled={isSwapBtnDisabled}
                      on:click={sendSwap}>
                      Swap
                    </button>
                  {:else}
                    <button
                      class="button connect-wallet connected is-rounded"
                      class:pending={isSwapBtnPending}
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
                bind:value={swapAmountHodl}
                on:input={(evt) => {
                  return sanitizeNumber(evt)((cleanVal) => {
                    console.log(' sanitizeNumber swapAmountHodl ', cleanVal);
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
                  swapAmountELT = Math.abs(swapAmountELT) || null;
                }} />
            </div>
          </div>
        </div>

        <div class="column">
          <div class="columns level is-flex-wrap-wrap">
            <div class="column is-hidden-mobile is-3-tablet is-3-desktop">
              <h3>ELT Burn &#128293;</h3>
              <span
                class="elt-burn-percent"
                class:disabled={swapAmountELT < minELTToSwap ? 'disabled' : ''}>
                {burnPercentage}%
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
                class:disabled={swapAmountELT < minELTToSwap}
                disabled={swapAmountELT < minELTToSwap ? 'disabled' : ''}
                bind:value={burnPercentage} />
            </div>

            <div class="column is-flex is-3-tablet is-3-desktop p-0">
              <div
                class="column is-hidden-tablet is-hidden-desktop is-6-mobile is-2-tablet is-2-desktop">
                <h3>ELT Burn &#128293;</h3>
                <span
                  class="elt-burn-percent"
                  class:disabled={swapAmountELT < minELTToSwap ? 'disabled' : ''}>
                  {burnPercentage}%
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
                bind:value={swapAmountHodl}
                on:input={(evt) => {
                  // console.dir(' .... ', sanitizeNumber(evt));
                  return sanitizeNumber(evt)((cleanVal) => {
                    console.log(' sanitizeNumber cleanVal ', cleanVal);
                    // swapAmountHodl = cleanVal;
                    return cleanVal > 0 ? (swapAmountELT = cleanVal / 0.0000005) : null;
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
                  swapAmountELT = Math.abs(swapAmountELT) || null;
                }} />
            </div>

            <div
              class="column is-flex is-hidden-tablet is-hidden-desktop is-flex-direction-column is-12-mobile is-justify-content-end ">
              {#await $approvedELTAmount}
                <h6>Loading approved</h6>
              {:then value}
                <h6>Approved: {value}</h6>
              {/await}
              {#if isConnected === false}
                <button
                  class="button connect-wallet is-rounded"
                  class:pending={isSwapBtnPending}
                  on:click={enableBrowser}>
                  Connect Wallet
                </button>
              {:else}
                {#await $approvedELTAmount}
                  <button
                    class="button connect-wallet connected is-rounded"
                    class:pending={isSwapBtnPending}
                    on:click={approveELTTransfer}>
                    Approve
                  </button>
                {:then value}
                  {#if value >= minELTToSwap}
                    <button
                      class="button connect-wallet connected is-rounded"
                      class:pending={isSwapBtnPending}
                      class:disabled={isSwapBtnDisabled}
                      on:click={sendSwap}>
                      Swap
                    </button>
                  {:else}
                    <button
                      class="button connect-wallet connected is-rounded"
                      class:pending={isSwapBtnPending}
                      on:click={approveELTTransfer}>
                      Approve
                    </button>
                  {/if}
                {/await}
              {/if}
            </div>
          </div>
        </div>
      </div>

      <div class="screen-footer columns is-flex-wrap-wrap">
        <div class="column is-12">
          <h3>
            <span class="">
              Eltswap Progress:
              <span
                class="eltswap-progress-success">{getSwapProgress()}%</span><sup
                class="ref-asterix">*</sup>
            </span>
          </h3>
        </div>

        <div class="column is-12 elt-swap-progress-wrapper">
          <div id="swapProgress" class="is-flex is-12">
            <span
              id="swapProgressGradient"
              style="--progress-bar-width: {getSwapProgress()}%;" />
            <span id="minSwapMark" />
            <span
              id="currentSwapMark"
              style="--curr-mark-left: {getSwapProgress()}%;">{getSwapProgress() > 10 ? eltInContract + ' ELT' : ''}</span>
          </div>

          <span class="">0 ELT</span>

          <span class="is-pulled-right">40M ELT</span>
        </div>

        <div class="column is-flex">
          <sup class="ref-asterix">*</sup>
          <h6 class="ref-entry">of 15 million ELT softcap</h6>
        </div>
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
