<script>
  import { circOut } from "svelte/easing";
  import * as global from "../../utils/globals";

  import {
    swapAmountHODL,
    swapAmountELT,
    burnPercentage,
    currentWizardScreen,
  } from "../../utils/stores";

  function slideDown(node, { duration = 500 }) {
    let height = +getComputedStyle(node.firstChild)["height"].match(
      /(\d+)px/
    )[1];

    return {
      delay: 0,
      duration,
      css: (t) => {
        return `min-height: ${circOut(t) * height}px;`;
      },
    };
  }

  $: isVisible = () => {
    if ($currentWizardScreen != "elt-swap-screen") return false;

    return $$props.isVisible;
  };

  $: ELTBurnBonus = Number(($swapAmountHODL / 100) * $burnPercentage);
</script>

{#await isVisible() then value}
  {#if value === true}
    <div in:slideDown class="burn-slider-wrapper ">
      <div class="columns p-3">
        <div class="column is-hidden-mobile is-4-tablet is-3-desktop p-0">
          <h3>ELT Burn &#128293;</h3>
          <span
            class="elt-burn-percent"
            class:disabled={$swapAmountELT < global.minELTToSwap
              ? "disabled"
              : ""}
          >
            {$burnPercentage}%
          </span>
        </div>

        <div
          id="swapHodlBurnRatio"
          class="column is-12-mobile is-4-tablet is-6-desktop pb-0"
        >
          <input
            type="range"
            id="burnRatioSlider"
            min="0"
            max="100"
            class:disabled={$swapAmountELT < global.minELTToSwap}
            disabled={$swapAmountELT < global.minELTToSwap ? "disabled" : ""}
            bind:value={$burnPercentage}
          />
        </div>

        <div class="column is-flex is-4-tablet is-3-desktop p-0">
          <div
            class="column is-hidden-tablet is-hidden-desktop is-6-mobile is-2-tablet is-2-desktop"
          >
            <h3>ELT Burn &#128293;</h3>
            <span
              class="elt-burn-percent"
              class:disabled={$swapAmountELT < global.minELTToSwap
                ? "disabled"
                : ""}
            >
              {$burnPercentage}%
            </span>
          </div>

          <div class="column is-6-mobile has-text-right p-0">
            <h3><span class="is-hidden-mobile">HODL</span> Burn Bonus</h3>
            <span class="hodl-burn-bonus" class:disabled={!ELTBurnBonus}>
              {ELTBurnBonus.toFixed(4)}
              HODL
            </span>
          </div>
        </div>
      </div>
    </div>
  {/if}
{/await}

<style>
</style>
