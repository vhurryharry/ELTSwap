<script>
  import {
    ethStore,
    web3,
    selectedAccount,
    connected
  } from "svelte-web3";
  import {
    getELTBurned,
    getELTInContract,
    getHODLInContract,
    getTokenBalance,
    getTotalHodlReward,
    approveELT,
    swap,
  } from "./js/web3Helper";

  import ELTSwapWizard from "./components/ELTSwapWizard.svelte";

  // Creates a connection to own infura node.
  const enable = async () => {
    ethStore.setProvider(
      "https://ropsten.infura.io/v3/952d8bd0e20b4bbfac856dc18285b6ca"
    );
  }


  const enableBrowser = async () => {
    modalOpen = false;
    await ethStore.setBrowserProvider();

    web3.version.getNetwork((err, netId) => {
      switch (netId) {
        case "1":
          console.log('This is mainnet')
          break
        case "2":
          console.log('This is the deprecated Morden test network.')
          break
        case "3":
          console.log('This is the ropsten test network.')
          break
        default:
          console.log('This is an unknown network.')
      }
    })
  }
  $: modalOpen = true;
  $: modalLoading = false;
  $: checkAccount =
    $selectedAccount || "0x0000000000000000000000000000000000000000";
  $: balance = $connected ? $web3.eth.getBalance(checkAccount) : "";

  $: eltBalance = $connected ?
    getTokenBalance(
      $web3,
      checkAccount,
      "0xa84a0b15d7c62684b71fecb5ea8efe0e5af1d11b"
    ) :
    "";
  $: hodlBalance = $connected ?
    getTokenBalance(
      $web3,
      checkAccount,
      "0x5c85a93991671dc5886203e0048777a4fd219983"
    ) :
    "";
  $: totalHodlReward = $connected ? getTotalHodlReward($web3, 10000, 25) : "";
  $: hodlInContract = $connected ? getHODLInContract($web3) : "";
  $: eltInContract = $connected ? getELTInContract($web3) : "";
  $: eltBurned = $connected ? getELTBurned($web3) : "";

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
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    background-color: #fff;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css">
  <script defer src="https://use.fontawesome.com/releases/v5.14.0/js/all.js"></script>
  <div class="modal" class:is-active="{modalOpen === true}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Connect Wallet to Continue</p>
      </header>
      <section class="modal-card-body is-justify-content-center">
        <button on:click={ ()=> {enableBrowser()}}>Connect To Wallet</button>
      </section>
      <footer class="modal-card-foot">
        <strong>A HODL-DAO VENTURE</strong>
      </footer>
    </div>
  </div>
  <ELTSwapWizard />
</main>