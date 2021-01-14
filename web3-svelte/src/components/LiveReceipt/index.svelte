<script>
  import { web3, connected } from "svelte-web3";

  import { getELTInContract, getHODLInContract } from "../../js/web3Helper";

  let hodlBonusAtBurnRate = 0; // find this in contracts

  $: receiptItems = [
    { lable: "ELTCOIN", value: 0 },
    { lable: "HODL", value: 0 },
    { lable: "HODL BONUS @ x% ELT BURN", value: 0 },
    { lable: "GAS PRICE", value: 0 },
  ];

  $: getReceiptTotal = async () => {
    return await getHODLInContract(web3); // is this so?
  };
</script>

<style>
</style>

<div class="live-receipt-wrapper">
  {#each receiptItems as item}
    <div class="is-flex is-12 key-val-row">
      <div class="column col-left">{item.lable}</div>

      <div class="column col-right has-text-right">{item.value}</div>
    </div>
  {/each}
  <div class="is-flex is-12 key-val-row">
    <div class="column col-left">HODL TOTAL</div>

    <div class="column col-right">{getReceiptTotal()}</div>
  </div>
</div>
