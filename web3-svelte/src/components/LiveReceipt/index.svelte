<script>
  import { web3, connected } from "svelte-web3";

  import { getELTInContract, getHODLInContract } from "../../js/web3Helper";

  let hodlBonusAtBurnRate = 0; // find this in contracts

  $: receiptItems = [
    { label: "ELTCOIN", value: $connected ? getELTInContract($web3) : 0 },
    { label: "HODL", value: $connected ? getHODLInContract($web3) : 0 },
    { label: "HODL BONUS @ x% ELT BURN", value: $connected ? "TBD" : 0 },
    { label: "GAS PRICE", value: $connected ? "TBD" : 0 },
  ];

  $: getReceiptTotal = $connected ? getHODLInContract($web3) : 0; // is this so?
</script>

<style>
</style>

<div class="live-receipt-wrapper column is-6 col-right">
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
  <div class="is-flex is-12 key-val-row receipt-footer">
    <div class="column col-left py-0">HODL TOTAL</div>
    {#await getReceiptTotal}
      <div class="column col-right has-text-right py-0">0</div>
    {:then value}
      <div class="column col-right has-text-right py-0">{value}</div>
    {/await}
  </div>
</div>
