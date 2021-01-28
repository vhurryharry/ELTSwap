<script>
  import { web3 } from "svelte-web3";

  import { getELTInContract, getHODLInContract } from "../../js/web3Helper";
  import { isRPCEnabled } from "../../utils/stores";

  let hodlBonusAtBurnRate = 0; // find this in contracts

  $: tickers = [
    { label: "ELT burned", value: $isRPCEnabled ? getELTInContract($web3) : 0 },
    {
      label: "ELT staked",
      value: $isRPCEnabled ? getHODLInContract($web3) : 0,
    },
    { label: "HODL issued", value: $isRPCEnabled ? "TBD" : 0 },
    { label: "ELT market cap", value: $isRPCEnabled ? "TBD" : 0 },
    // { label: "ELT price", value: $isRPCEnabled ? "TBD" : 0 },
  ];
</script>

<style lang="scss">
  //   .ticker-belt-wrapper {
  //  }
</style>

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
