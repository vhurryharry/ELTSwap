<script>
  import TickerBelt from "../TickerBelt/index.svelte";
</script>

<style>
</style>

<div class="column is-10 is-flex-wrap-wrap">
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
      <span id="swapProgressGradient" />
      <span id="minSwapMark" />
      <span
        id="currentSwapMark"
        style="--curr-mark-left: {$$props.getSwapProgress()}%;">{$$props.getSwapProgress() > 10 ? $$props.eltInContract + ' ELT' : ''}</span>
      <div
        id="coverProgressGradient"
        style="--cover-progress-gradient-width: {99}%;" />
    </div>
  </div>
</div>
