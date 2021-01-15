<script>
  import { web3, connected } from "svelte-web3";

  import { getELTInContract, getHODLInContract } from "../../js/web3Helper";

  let hodlBonusAtBurnRate = 0; // find this in contracts

  $: tickers = [
    { label: "ELT burned", value: $connected ? getELTInContract($web3) : 0 },
    { label: "ELT staked", value: $connected ? getHODLInContract($web3) : 0 },
    { label: "HODL issued", value: $connected ? "TBD" : 0 },
    { label: "ELT market cap", value: $connected ? "TBD" : 0 },
    { label: "ELT price", value: $connected ? "TBD" : 0 },
  ];
</script>

<style>
</style>

<div class="ticker-belt-wrapper block is-12">
  {#each tickers as ticker}
    <div class="is-flex is-12 key-val-row">
      <div class="column col-left py-0">{ticker.label}</div>
      {#await ticker.value}
        <div class="column col-right has-text-right py-0">0</div>
      {:then value}
        <div class="column col-right has-text-right py-0">{value}</div>
      {/await}
    </div>
  {/each}
</div>
