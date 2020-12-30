<script>
  import RangeSlider from "svelte-range-slider-pips";
  
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
const enable = async () => {
    ethStore.setProvider(
      "https://ropsten.infura.io/v3/952d8bd0e20b4bbfac856dc18285b6ca"
    );
  };

  $: balance = 0;
  $: checkAccount =
    $selectedAccount || "0x0000000000000000000000000000000000000000";

  const enableBrowser = async () => {
    let connectedNetId = $chainName
    console.log(connectedNetId)
    let networkId = 3; //NOTE: change for mainnet 


    if (connectedNetId !== networkId) console.log('Connected to Ropstien')
    else {
      alert('Please connect to the Ropstien Testnet to continue')
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
  $: isConnected = $connected ? true:false;


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
</script>

<style>
  .button.is-danger {
    background-color: #BD4242;
  }
  .elt-swap-wizard {
    border-radius: 0.5rem;
    background-color: #2f2f2f;
    color: #fff;
  }
  .not-connected {
    cursor: not-allowed;
    pointer-events: none;
  }
  .elt-swap-wizard .card {
    border-radius: 1rem;
    background-color: #383838;
  }

  .connectionIndicator {
    color: red;
  }

  .info-pill {
    border-radius: 1rem;
  }

  .number-bubble {
    background-color: #565656;
    border-radius: 1rem;
  }

  h3 {
    color: #fff;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  pre {
    color: #fff;

    background-color: transparent;
  }
</style>

<div class="elt-swap-wizard is-10 mt-5 mb-5 p-5" 	class:not-connected="{! isConnected}">
  <pre></pre>
  <div class="level align-items-end is-justify-content-end">
    <div class="info-pill block is-flex p-0 m-0 mr-5">
      <pre>0 HODL</pre>
    </div>

    <div id="hodlPill" class="info-pill block is-flex p-0 m-0 mr-5">
      <pre>0 ELT</pre>
    </div>

    <div id="ethPill" class="info-pill block is-flex p-0 m-0">
      <pre>
        {balance} ETH
      </pre>

      <div
        id="balancePill"
        class="info-pill is-flex p-0 m-0"
        style={{ background: 'red' }}>
        <pre>Not Connected</pre>
        <pre class="connectionIndicator px-0">&#11044;</pre>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="level px-2 py-5 is-align-items-end">
      <div class="column py-0 ">
        <h3>ELT</h3>
        <pre class="number-bubble py-2">100,000</pre>
      </div>

      {#if isConnected === false}
      <button        
      class="button connect-wallet is-danger is-rounded"
      on:click={enableBrowser()}>
      Connect Wallet
      </button>
      {:else }
      <button        
      class="button is-success is-rounded"
      on:click={enableBrowser()}>
      Swap
      </button>
      {/if}



      <div class="column has-text-right py-0">
        <h3>HODL</h3>
        <pre class="number-bubble py-2">0.0833</pre>
      </div>
    </div>

    <div class="sliderWrapper level">
      <div class="block mb-0 px-5 py-0">
        <h3>ELT Burn &#128293;</h3>
        <pre>66%</pre>
      </div>

      <div class="sliderWrapper level is-4">
        <progress class="progress is-info" max="100" value="66">87%</progress>
      </div>

      <div class="block has-text-right px-5 py-0">
        <h3>HODL Bonus</h3>
        <pre>0.033%</pre>
      </div>
    </div>
  </div>

  <div class="column is-flex-wrap-wrap is-flex">
    <div class="column is-full">
      <h3>Eltswap Progress: <span class="has-text-success">133%</span></h3>
    </div>

    <div class="column is-full">
      <span class="is-centered test-color">30,000,000 ELT</span>

      <progress class="progress is-info" max="100" value="66">87%</progress>

      <span class="">0 ELT</span>

      <span class="is-pulled-right">40M ELT</span>
    </div>
  </div>
</div>
