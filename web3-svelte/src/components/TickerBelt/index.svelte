<script>
  import { web3 } from "svelte-web3";
  import { afterUpdate } from "svelte";

  import {
    getELTInContract,
    getHODLInContract,
    getELTBurned,
  } from "../../js/web3Helper";
  import {
    isRPCEnabled,
    currentHODLInContract,
    currentELTBurned,
    currentELTInContract,
  } from "../../utils/stores";

  $: updateHODLInContract = () => {
    let hodlInContract = getHODLInContract($web3);

    if (typeof hodlInContract.then !== "function") {
      currentHODLInContract.set(0);
    } else {
      hodlInContract.then(
        (result) => {
          currentHODLInContract.set(result);
        },
        (err) => {
          currentHODLInContract.set(null);
          console.dir(err);
        }
      );
    }
  };

  $: updateELTInContract = () => {
    let eltInContract = getELTInContract($web3);

    if (typeof eltInContract.then !== "function") {
      currentELTInContract.set(0);
    } else {
      eltInContract.then(
        (result) => {
          currentELTInContract.set(result);
        },
        (err) => {
          currentELTInContract.set(null);
          console.dir(err);
        }
      );
    }
  };

  $: updateELTBurned = () => {
    let eltBurned = getELTBurned($web3);

    if (typeof eltBurned.then !== "function") {
      currentELTBurned.set(0);
    } else {
      eltBurned.then(
        (result) => {
          currentELTBurned.set(result);
        },
        (err) => {
          currentELTBurned.set(null);
          console.dir(err);
        }
      );
    }
  };

  afterUpdate(() => {
    if ($isRPCEnabled) {
      updateELTInContract();
      updateELTBurned();
      updateHODLInContract();

      return;
    }
  });

  $: tickers = [
    {
      label: "ELT burned:",
      value: $currentELTBurned,
    },
    // {
    //   label: "ELT staked",
    //   value: $isRPCEnabled ? getHODLInContract($web3) : 0,
    // },
    { label: "HODL issued:", value: $currentHODLInContract },
    // { label: "ELT market cap", value: $isRPCEnabled ? "TBD" : 0 },
    // { label: "ELT price", value: $isRPCEnabled ? "TBD" : 0 },
  ];
</script>

<div class="ticker-belt-wrapper is-flex block is-12">
  {#each tickers as ticker}
    <div class="is-flex is-3 key-val-row">
      <div class="column col-left py-0">{ticker.label}</div>
      {#await ticker.value}
        <div class="column col-right has-text-right py-0">0</div>
      {:then value}
        <div class="column col-right has-text-right py-0">{value}</div>
      {/await}
    </div>
  {/each}
</div>

<style lang="scss">
  //   .ticker-belt-wrapper {
  //  }
</style>
