<script>
  import { web3 } from "svelte-web3";
  import * as global from "../../utils/globals";

  import { getELTInContract } from "../../js/web3Helper";

  import { isRPCEnabled } from "../../utils/stores";

  import TickerBelt from "../TickerBelt/index.svelte";

  /** */
  $: getSwapProgress = () => {
    return (
      parseInt(
        ($isRPCEnabled ? getELTInContract($web3) : 0 * 100) / global.absMaxELT
      ) || 0
    );
  };

  $: eltInContract = $isRPCEnabled ? getELTInContract($web3) : 0;
</script>

<style>
</style>

<div class="column is-10 is-flex-wrap-wrap">
  <div class="column is-12 pb-0">
    <h3>
      <span class="">
        Eltswap Progress:
        <span class="eltswap-progress-success">{getSwapProgress()}%</span><sup
          class="ref-asterix">*</sup>
      </span>
    </h3>
  </div>

  <div class="column is-12 pt-0">
    <TickerBelt />
  </div>

  <div class="column is-12 elt-swap-progress-wrapper">
    <div id="swapProgress" class="is-flex is-12">
      <span id="swapProgressGradient" />
      <span id="minSwapMark" />
      <span
        id="currentSwapMark"
        style="--curr-mark-left: {getSwapProgress()}%;">{getSwapProgress() > 10 ? eltInContract + ' ELT' : ''}</span>
      <div
        id="coverProgressGradient"
        style="--cover-progress-gradient-width: {99}%;" />
    </div>
  </div>
</div>
