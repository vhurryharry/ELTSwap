<script>

  import { ethStore, web3, selectedAccount, connected, chainName } from "svelte-web3";

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
  const enable = () => ethStore.setProvider("https://ropsten.infura.io/v3/952d8bd0e20b4bbfac856dc18285b6ca");
	$: enableBrowser = () => ethStore.setBrowserProvider();


  $: swapAmountELT = Number(10000);
  $: swapAmountHodl = Number(swapAmountELT*0.0000005);
  $: burnPercentage = 66;
  $: ELTBurnBonus = Number((swapAmountHodl/100)*burnPercentage);
  $: ethBalance = 0;
  $: checkAccount =
    $selectedAccount || "0x0000000000000000000000000000000000000000";
  

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

  const fromatAddr = (str) => {
    return str.substr(0, 5) + "..." + str.substr(str.length - 5, str.length);
  };
  const weiToETH = (wei) => {
    return ((wei)/(10**18))
  }
</script>

<style lang="scss" global>
  @import "bulma/bulma";
  @import "../styles/main.scss";
</style>

<div class="elt-swap-wizard mt-5 mb-5 p-5" class:not-connected={!isConnected}>
  <div
    class="columns is-flex is-2 level is-multiline is-flex-wrap-wrap is-justify-content-end">
    <div
      class="column is-flex-wrap-nowrap is-12-mobile is-6-tablet is-4-desktop">
      <div class="columns is-2 is-flex is-12-mobile">
        <div id="hodlPill" class="column is-6-mobile">
          {#await hodlBalance}
            <pre class="px-1"> ? HODL </pre>
          {:then value}
            <pre class="px-1">{value} HODL </pre>
          {/await}
        </div>
        <div id="eltPill" class="column is-6-mobile">
          {#await eltBalance}
            <pre class="px-1"> ? ELT </pre>
          {:then value}
            <pre class="px-1">{(value)/(10**18)} ELT</pre>
          {/await}
        </div>
      </div>
    </div>

    <div
      class="column is-12-mobile is-6-tablet is-3-desktop is-justify-content-center">
      <div id="ethPill" class=" is-justify-content-center">
        {#await ethBalance}
          <span class="px-1"> ? ETH </span>
        {:then value}
          <span class="px-1">{(value/(10**18))} ETH </span>
        {/await}

        <div id="balancePill" class="">
          {#if isConnected === false}
            <span class="px-1">Not Connected</span>
          {:else}<span class="px-1">{fromatAddr($selectedAccount)}</span>{/if}

          <span
            class="connectionIndicator"
            class:conneced={isConnected}>&#11044;</span>
        </div>
      </div>
    </div>
  </div>

  <div id="wizardContent" class="columns my-5 is-flex-direction-column">
    <div class="column ">
      <div class="columns is-flex-wrap-wrap ">
        <div
          class="column is-12-mobile is-4-tablet is-5-desktop has-text-centered-mobile">
          <h3 class="">ELT</h3>
          <input
            class="number-bubble input has-text-centered-mobile"
            type="number"
            bind:value={swapAmountELT}
            />
        </div>

        <div
          class="column is-flex is-hidden-mobile is-flex-direction-column is-4-tablet is-2-desktop is-justify-content-end ">
          {#if isConnected === false}
            <button
              class="button connect-wallet is-danger is-rounded"
              on:click={enableBrowser}>
              Connect Wallet
            </button>
          {:else}
            <button
              class="button is-success is-rounded"
              on:click={console.log('hit')}>
              Swap
            </button>
          {/if}
        </div>

        <div
          class="column is-hidden-mobile is-4-tablet is-5-desktop has-text-centered-mobile has-text-right">
          <h3 class="">HODL</h3>
          <input
            class="number-bubble input has-text-right"
            type="number"
            bind:value="{swapAmountHodl}"
            on:keyup={()=>{swapAmountELT = (swapAmountHodl / 0.0000005)}}
          />
        </div>
      </div>
    </div>

    <div class="column">
      <div class="columns level is-flex-wrap-wrap">
        <div class="column is-hidden-mobile is-3-tablet is-2-desktop">
          <h3>ELT Burn &#128293;</h3>
          <span class="has-text-danger">{burnPercentage}%</span>
        </div>

        <div
          id="swapHodlBurnRatio"
          class="column is-12-mobile is-4-tablet is-8-desktop pb-0">
          <input
            type="range"
            id="burnRatioSlider"
            min="0"
            max="100"
            bind:value={burnPercentage}/>
        </div>

        <div class="column is-flex is-3-tablet is-2-desktop p-0">
          <div
            class="column is-hidden-tablet is-hidden-desktop is-6-mobile is-2-tablet is-2-desktop">
            <h3>ELT Burn &#128293;</h3>
            <span class="has-text-danger">{burnPercentage}%</span>
          </div>

          <div class="column is-6-mobile is-pull-right has-text-right">
            <h3>ELT Burn Bonus</h3>
            <span class="has-text-success">{ELTBurnBonus.toFixed(4)} HODL</span>
          </div>
        </div>

        <div
          class="column is-hidden-tablet is-hidden-desktop if-full-mobile is-5-dektop has-text-centered">
          <h3 class="">HODL</h3>
          <input
            class="number-bubble input has-text-centered-mobile"
            type="number"
            bind:value="{swapAmountHodl}"
            on:keyup={swapAmountELT = (swapAmountHodl / 0.0000005)}/> 
        </div>

        <div
          class="column is-flex is-hidden-tablet is-hidden-desktop i is-flex-direction-column is-12-mobile is-justify-content-end ">
          {#if isConnected === false}
            <button
              class="button connect-wallet is-danger is-rounded"
              on:click={enableBrowser}>
              Connect Wallet
            </button>
          {:else}
            <button
              class="button is-success is-rounded"
              on:click={console.log('hit')}>
              Swap
            </button>
          {/if}
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
          value="66%"
          disabled="disabled" />
        <span id="minSwapMark" />
        <span id="currentSwapMark" />
      </div>

      <span class="">0 ELT</span>

      <span class="is-pulled-right">40M ELT</span>
    </div>
  </div>
</div>
