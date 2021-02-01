<script>
  import {
    swapAmountELT,
    swapAmountHODL,
    currentHODLBonus,
    currentSwapPhase,
    currentGasPriceEstimate,
    currentSwapToken,
    isRPCEnabled,
  } from "../../utils/stores";

  // TODO: Check all calculations here

  // $: getReceiptTotal = $swapAmountELT ? getHODLInContract($web3) : 0; // is this so?
</script>

{#await $isRPCEnabled then value}
  {#if value}
    <div
      class="live-receipt-wrapper columns is-flex-direction-column is-12 p-4 col-right"
    >
      {#if $currentSwapPhase == 1}
        <div class="column key-val-row receipt-content">
          <div class="is-flex is-12 key-val-row">
            <div class="column col-left py-0">ELTCOIN</div>
            {#await $swapAmountELT}
              <div class="column col-right has-text-right py-0">0</div>
            {:then value}
              {#if value}
                <div class="column col-right has-text-right py-0">
                  {value} ELT
                </div>
              {:else}
                <div class="column col-right has-text-right py-0">0</div>
              {/if}
            {/await}
          </div>
        </div>
      {/if}

      {#if $currentSwapPhase == 1}
        <div class="column key-val-row receipt-content">
          <div class="is-flex is-12 key-val-row">
            <div class="column col-left py-0">HODL</div>
            {#await $swapAmountHODL}
              <div class="column col-right has-text-right py-0">0</div>
            {:then value}
              {#if value}
                <div class="column col-right has-text-right py-0">
                  {value} HODL
                </div>
              {:else}
                <div class="column col-right has-text-right py-0">0</div>
              {/if}
            {/await}
          </div>
        </div>
      {/if}

      {#if $currentSwapPhase == 1 || $currentSwapPhase == 2}
        <div class="column key-val-row receipt-content">
          <div class="is-flex is-12 key-val-row">
            <div class="column col-left py-0">HODL BONUS</div>
            {#await $currentHODLBonus}
              <div class="column col-right has-text-right py-0">0</div>
            {:then value}
              {#if value}
                <div class="column col-right has-text-right py-0">
                  {value} HODL
                </div>
              {:else}
                <div class="column col-right has-text-right py-0">0</div>
              {/if}
            {/await}
          </div>
        </div>
      {/if}

      {#if $currentSwapPhase == 3 || ($currentSwapPhase == 2 && $currentSwapToken === "ETH")}
        <div class="column key-val-row receipt-content">
          <div class="is-flex is-12 key-val-row">
            <div class="column col-left py-0">GAS ESTIMATE</div>
            {#await $currentGasPriceEstimate}
              <div class="column col-right has-text-right py-0">0</div>
            {:then value}
              <div class="column col-right has-text-right py-0">
                {value} ETH
              </div>
            {/await}
          </div>
        </div>
      {/if}
    </div>
  {/if}
{/await}

<style>
</style>
