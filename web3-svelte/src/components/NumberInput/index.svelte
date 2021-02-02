<script>
  import { bind } from "svelte/internal";
  import { isRPCEnabled } from "../../utils/stores";

  export let bindTo, placeholder, isDisabled, sanitizeClbk, inputClasses;

  const sanitizeNumberInput = (evt, isGtZeroAbs = true) => {
    evt.preventDefault();
    let cleanNumber = (evt.target.value = evt.target.value.replace(
      /[^0-9\.,]/g,
      ""
    ));

    if (isGtZeroAbs) {
      cleanNumber = Math.abs(cleanNumber);
    }

    return (valHandler) => {
      if (typeof valHandler === "function") {
        valHandler(Number(cleanNumber));
      }
    };
  };

  let config = $$props;
</script>

<div class="numper-input-wrapper is-flex is-12">
  {#if $isRPCEnabled}
    <input
      class={inputClasses ||
        "number-bubble input has-text-centered-mobile"}
      type="number"
      placeholder={placeholder}
      onwheel="this.blur()"
      bind:value={bindTo}
      on:input={(evt) => {
        return sanitizeNumberInput(evt)(sanitizeClbk);
      }}
      on:keydown={(evt) => {
        // prevent editing value by arrowKeys
        if (evt.key == "ArrowDown" || evt.key == "ArrowUp") {
          evt.preventDefault();
        }
        // NB: excluding `-` here would work but not for copy-paste
      }}
      on:blur={(evt) => {
        // NB: this will abs th value but will not replace the
        // value in the input
        // TODO: make sure negative values are rewritten
        ///////// past variations:
        // if (typeof swapValues[config.storeKey].set === 'function') {
        //   swapValues[config.storeKey].set(Math.abs(swapValues[config.storeKey]) || 0);
        // }
        // prevent pasting negative vals
        // NB: this causes rerendering; reconsider
        // console.log(' ??????? ', config.bindTo).set;
        // if (config.bindTo && typeof config.bindTo.set === 'function') {
        //   config.bindTo = Number(Math.abs(config.storeKey)) || 0;
        // }
      }}
    />
  {:else}
    <input
      class={inputClasses ||
        "number-bubble input has-text-centered-mobile"}
      type="number"
      placeholder={placeholder}
      onwheel="this.blur()"
      disabled="disabled"
    />
  {/if}
</div>

<style lang="scss">
  .number-bubble {
    height: 3rem;
  }
</style>
