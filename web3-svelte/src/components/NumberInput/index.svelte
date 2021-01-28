<script>
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

<style>
</style>

<div class="numper-input-wrapper is-flex block is-12">
  <input
    class={config.inputClasses || 'number-bubble input has-text-centered-mobile'}
    type="number"
    placeholder={config.placeholder}
    onwheel="this.blur()"
    disabled={config.isDisabled}
    bind:value={config.bindTo}
    on:input={(evt) => {
      return sanitizeNumberInput(evt)(config.sanitizeClbk);
    }}
    on:keydown={(evt) => {
      // prevent editing value by arrowKeys
      if (evt.key == 'ArrowDown' || evt.key == 'ArrowUp') {
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
    }} />
</div>
