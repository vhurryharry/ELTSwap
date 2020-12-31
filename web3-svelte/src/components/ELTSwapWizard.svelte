<script>
  import {
    ethStore,
    web3,
    selectedAccount,
    connected,
    chainName,
  } from "svelte-web3";
  import {
    getELTBurned,
    getELTInContract,
    getHODLInContract,
    getTokenBalance,
    getTotalHodlReward,
    approveELT,
    swap,
  } from "../js/web3Helper";

  // Creates a connection to own infura node.
  const enable = async () => {
    ethStore.setProvider(
      "https://ropsten.infura.io/v3/952d8bd0e20b4bbfac856dc18285b6ca"
    );
  };

  $: balance = 0;
  $: checkAccount =
    $selectedAccount || "0x0000000000000000000000000000000000000000";

  const enableBrowser = async () => {
    return;

    let connectedNetId = $chainName;
    console.log(connectedNetId);
    let networkId = 3; //NOTE: change for mainnet

    if (connectedNetId !== networkId) console.log("Connected to Ropstien");
    else {
      alert("Please connect to the Ropstien Testnet to continue");
      return;
    }

    balance = $connected ? $web3.eth.getBalance(checkAccount) : "";
    await ethStore.setBrowserProvider();
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
  $: totalHodlReward = $connected ? getTotalHodlReward($web3, 10000, 25) : "";
  $: hodlInContract = $connected ? getHODLInContract($web3) : "";
  $: eltInContract = $connected ? getELTInContract($web3) : "";
  $: eltBurned = $connected ? getELTBurned($web3) : "";
  $: isConnected = $connected ? true : false;

  function approveELTTransfer() {
    if ($connected) {
      approveELT(
        $web3,
        10000,
        $selectedAccount,
        "0x77189634909a4ad77b7e60c89b5ed5af5ce37d5e"
      );
    }
  }

  function sendSwap() {
    if ($connected) {
      swap($web3, 10000, 25, $selectedAccount);
    }
  }

  let swapMinThreshold = (15 * 100) / 40;

  // TODO: set {
  //   right: $currSwapAmountPrc;
  //   content: $currSwapAmount;
  // } on #currentSwapMark:before
</script>

<style lang="scss" global>
  @import "bulma/bulma";
  @import "../styles/main.scss";
</style>

<div class="elt-swap-wizard mt-5 mb-5 p-5" class:not-connected={!isConnected}>
  <div
    class="columns level is-multiline is-flex-wrap-wrap is-justify-content-end">
    <div id="hodlPill" class="column is-6-mobile is-2-tablet is-2-desktop">
      <pre>0 HODL</pre>
    </div>
    <div id="eltPill" class="column is-6-mobile is-2-tablet is-2-desktop">
      <pre>0 ELT</pre>
    </div>

    <div class="column is-12-mobile is-4-tablet is-4-desktop px-0">
      <div id="ethPill" class="column">
        <pre>
        {balance} ETH
      </pre>

        <div id="balancePill" class="info-pill is-flex">
          <pre>Not Connected</pre>
          <pre class="connectionIndicator px-1">&#11044;</pre>
        </div>
      </div>
    </div>
  </div>

  <div id="wizardContent" class="columns my-5 is-flex-direction-column">
    <div class="column ">
      <div class="columns is-flex-wrap-wrap ">
        <div class="column is-12-mobile is-4-tablet is-5-desktop  ">
          <h3 class="">ELT</h3>
          <input
            class="number-bubble input"
            type="number"
            value="100000"
            placeholder="100,000" />
        </div>

        <div
          class="column is-flex is-flex-direction-column is-12-mobile is-4-tablet is-2-desktop is-justify-content-end ">
          {#if isConnected === false}
            <button
              class="button connect-wallet is-danger is-rounded"
              on:click={enableBrowser()}>
              Connect Wallet
            </button>
          {:else}
            <button
              class="button is-success is-rounded"
              on:click={enableBrowser()}>
              Swap
            </button>
          {/if}
        </div>

        <div
          class="column if-full-mobile is-4-tablet is-5-dektop has-text-right">
          <h3 class="">HODL</h3>
          <input
            class="number-bubble input has-text-right"
            type="text"
            value="0.0833" />
        </div>
      </div>
    </div>

    <div class="column">
      <div class="columns level is-flex-wrap-wrap">
        <div class="column is-hidden-mobile is-3-tablet is-2-desktop">
          <h3>ELT Burn &#128293;</h3>
          <span class="has-text-danger">66%</span>
        </div>

        <div
          id="swapHodlBurnRatio"
          class="column is-12-mobile is-4-tablet is-8-desktop">
          <input
            type="range"
            id="burnRatioSlider"
            min="0"
            max="100"
            value="66" />
        </div>

        <div class="level is-4-tablet is-2-desktop">
          <div
            class="column is-hidden-tablet is-hidden-desktop is-6-mobile is-2-tablet is-2-desktop m-0 p-0">
            <h3>ELT Burn &#128293;</h3>
            <span class="has-text-danger">66%</span>
          </div>

          <div class="column is-6-mobile is-pull-right has-text-right">
            <h3>HODL Bonus</h3>
            <span class="has-text-success">33.3%</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="columns is-flex-wrap-wrap">
    <div class="column is-12">
      <h3>
        <span class="is-underline">
          Eltswap Progress:
          <span class="has-text-success">133%</span>
        </span>
      </h3>
    </div>

    <div class="column is-12">
      <div id="swapProgress" class="is-flex is-12">
        <input
          type="range"
          id="swapProgressSlider"
          min="0"
          max="100"
          value="66"
          disabled="disabled" />
        <span id="minSwapMark" />
        <span id="currentSwapMark" />
      </div>

      <span class="">0 ELT</span>

      <span class="is-pulled-right">40M ELT</span>
    </div>
  </div>
</div>
