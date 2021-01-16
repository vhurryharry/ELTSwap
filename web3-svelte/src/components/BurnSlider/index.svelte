<script>
  import * as global from "../../utility/globals";
  import * as store from "../../utility/stores";
  import NumberInput from "../NumberInput/index.svelte";

  $: ELTBurnBonus = Number((store.swapAmountHODL / 100) * store.burnPercentage);
</script>

<style>
  /**
  * For some reason, styles defined here are not
  * applyed.
  * TODO: Figure out why so.
  */
</style>

<div class="burn-slider-wrapper column is-12 ">
  <div class="columns level is-flex-wrap-wrap">
    <div class="column is-hidden-mobile is-3-tablet is-3-desktop">
      <h3>ELT Burn &#128293;</h3>
      <span
        class="elt-burn-percent"
        class:disabled={store.swapAmountELT < global.minELTToSwap ? 'disabled' : ''}>
        {store.burnPercentage}%
      </span>
    </div>

    <div
      id="swapHodlBurnRatio"
      class="column is-12-mobile is-4-tablet is-6-desktop pb-0">
      <input
        type="range"
        id="burnRatioSlider"
        min="0"
        max="100"
        class:disabled={store.swapAmountELT < global.minELTToSwap}
        disabled={store.swapAmountELT < global.minELTToSwap ? 'disabled' : ''}
        bind:value={store.burnPercentage.set} />
    </div>

    <div class="column is-flex is-3-tablet is-3-desktop p-0">
      <div
        class="column is-hidden-tablet is-hidden-desktop is-6-mobile is-2-tablet is-2-desktop">
        <h3>ELT Burn &#128293;</h3>
        <span
          class="elt-burn-percent"
          class:disabled={store.swapAmountELT < global.minELTToSwap ? 'disabled' : ''}>
          {store.burnPercentage}%
        </span>
      </div>

      <div class="column is-6-mobile is-pull-right has-text-right">
        <h3><span class="is-hidden-mobile">HODL</span> Burn Bonus</h3>
        <span class="hodl-burn-bonus" class:disabled={!ELTBurnBonus}>
          {ELTBurnBonus.toFixed(4)}
          HODL
        </span>
      </div>
    </div>

    <div
      class="column is-hidden-tablet is-hidden-desktop if-full-mobile is-5-dektop has-text-centered">
      <h3 class="">HODL</h3>

      <NumberInput
        bindTo={store.swapAmountHODL.set}
        placeholder="0"
        sanitizeClbk={(cleanVal) => {
          console.log(' sanitizeNumberInput cleanVal ', cleanVal);
          return cleanVal > 0 ? store.swapAmountELT.set(cleanVal / 0.0000005) : store.swapAmountELT.set(null);
        }}
        inputClasses="number-bubble input has-text-centered-mobile" />
    </div>
  </div>
</div>
