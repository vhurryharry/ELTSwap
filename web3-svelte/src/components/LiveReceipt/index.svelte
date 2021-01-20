<script>
  import { web3, connected } from "svelte-web3";

  import { getELTInContract, getHODLInContract } from "../../js/web3Helper";

  let hodlBonusAtBurnRate = 0; // find this in contracts

  $: receiptItems = [
    { label: "ELTCOIN", value: $connected ? getELTInContract($web3) : 1000000 },
    { label: "HODL", value: $connected ? getHODLInContract($web3) : 0.5 },
    { label: "HODL BONUS", value: $connected ? "TBD" : 0.033 },
    { label: "GAS ESTIMATE", value: $connected ? "~?~ ETH" : 0.01 + " ETH" },
  ];

  $: getReceiptTotal = $connected ? getHODLInContract($web3) : 0.533; // is this so?
</script>

<style>
</style>

<div
  class="live-receipt-wrapper columns is-flex-direction-column is-12 p-4 col-right">
  <div class="column key-val-row receipt-content">
    {#each receiptItems as item}
      <div class="is-flex is-12 key-val-row">
        <div class="column col-left py-0">{item.label}</div>
        {#await item.value}
          <div class="column col-right has-text-right py-0">0</div>
        {:then value}
          <div class="column col-right has-text-right py-0">{value}</div>
        {/await}
      </div>
    {/each}
  </div>
  <div class="column is-flex is-12 key-val-row receipt-footer">
    <div class="column col-left py-0">HODL TOTAL</div>
    {#await getReceiptTotal}
      <div class="column col-right has-text-right py-0">0</div>
    {:then value}
      <div class="column col-right has-text-right py-0">
        <span class="hodl-total">{value}</span>
      </div>
    {/await}
  </div>
</div>
