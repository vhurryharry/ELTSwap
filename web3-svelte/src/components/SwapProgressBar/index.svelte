<script>
  import { web3, connected } from "svelte-web3";
  import TickerBelt from "../TickerBelt/index.svelte";
  // import * as service from "../../utility/services";
  // import { getELTInContract } from "../../js/web3Helper";
</script>

<style>
</style>

<div class="columns is-flex-wrap-wrap">
  <div class="column is-12">
    <h3>
      <span class="">
        Eltswap Progress:
        <span
          class="eltswap-progress-success">{$$props.getSwapProgress()}%</span><sup
          class="ref-asterix">*</sup>
      </span>
    </h3>
  </div>

  <div class="column is-12">
    <TickerBelt />
  </div>

  <div class="column is-12 elt-swap-progress-wrapper">
    <div id="swapProgress" class="is-flex is-12">
      <span
        id="swapProgressGradient"
        style="--progress-bar-width: {$$props.getSwapProgress()}%;" />
      <span id="minSwapMark" />
      <span
        id="currentSwapMark"
        style="--curr-mark-left: {$$props.getSwapProgress()}%;">{$$props.getSwapProgress() > 10 ? $$props.eltInContract + ' ELT' : ''}</span>
    </div>

    <span class="">0 ELT</span>

    <span class="is-pulled-right">40M ELT</span>
  </div>

  <div class="column is-flex">
    <sup class="ref-asterix">*</sup>
    <h6 class="ref-entry">of 15 million ELT softcap</h6>
  </div>
</div>
