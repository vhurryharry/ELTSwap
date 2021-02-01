<script>
  import {
    currentHODLInContract,
    currentELTBurned,
    currentELTInContract,
  } from "../../utils/stores";
</script>

<div class="ticker-belt-wrapper is-flex block is-12 is-size-7">
  <div class="is-flex is-3 key-val-row">
    <div class="column col-left py-0">ELT burned:</div>
    <div class="column col-right has-text-right py-0">0</div>
    {#await $currentELTBurned}
      <div class="column col-right has-text-right py-0">0</div>
    {:then value}
      <div class="column col-right has-text-right py-0">{value}</div>
    {/await}
  </div>

  <div class="is-flex is-3 key-val-row">
    <div class="column col-left py-0">ELT staked:</div>
    <div class="column col-right has-text-right py-0">0</div>
    {#await $currentELTInContract}
      <div class="column col-right has-text-right py-0">0</div>
    {:then value}
      <div class="column col-right has-text-right py-0">{value}</div>
    {/await}
  </div>

  <div class="is-flex is-3 key-val-row">
    <div class="column col-left py-0">ELT burned:</div>
    <div class="column col-right has-text-right py-0">0</div>
    {#await $currentHODLInContract}
      <div class="column col-right has-text-right py-0">0</div>
    {:then value}
      <div class="column col-right has-text-right py-0">{value}</div>
    {/await}
  </div>
</div>

<style lang="scss">
  @import "../../styles/variables";

  .ticker-belt-wrapper {
    .key-val-row {
      padding: 0% 15px 0px 0;
      color: $themeSurfaceLight;
    }
  }
</style>
