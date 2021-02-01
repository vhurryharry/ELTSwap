<script>
  import { web3 } from "svelte-web3";

  import { getELTInContract, getHODLInContract } from "../../js/web3Helper";

  import { isRPCEnabled } from "../../utils/stores";
  let hodlBonusAtBurnRate = 0; // find this in contracts

  $: receiptItems = [
    {
      label: "ELTCOIN",
      value: $isRPCEnabled ? getELTInContract($web3) : 0,
    },
    { label: "HODL", value: $isRPCEnabled ? getHODLInContract($web3) : 0 },
    { label: "HODL BONUS", value: $isRPCEnabled ? "TBD" : 0 },
    { label: "GAS ESTIMATE", value: $isRPCEnabled ? "ETH" : 0 + " ETH" },
  ];

  $: getReceiptTotal = $isRPCEnabled ? getHODLInContract($web3) : 0.533; // is this so?
</script>

<div
  class="live-receipt-wrapper columns is-flex-direction-column is-12 p-4 col-right"
>
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

<style>
</style>
