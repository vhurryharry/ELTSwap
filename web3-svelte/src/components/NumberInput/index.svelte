<script>
  import * as store from "../../utility/stores";

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
      valHandler(cleanNumber);
    };
  };
</script>

<style>
</style>

<div class="numper-input-wrapper is-flex block is-12">
  <input
    class={$$props.inputClasses || 'number-bubble input has-text-centered-mobile'}
    type="number"
    placeholder={$$props.placeholder || '0'}
    onwheel="this.blur()"
    bind:value={$$props.bindTo}
    on:input={(evt) => {
      return sanitizeNumberInput(evt)($$props.sanitizeClbk);
    }}
    on:keydown={(evt) => {
      // prevent editing value by arrowKeys
      if (evt.key == 'ArrowDown' || evt.key == 'ArrowUp') {
        evt.preventDefault();
      }
    }}
    on:keyup={(evt) => {
      // prevent pasting negative vals
      if (typeof $$props.bondTo == 'function') {
        // assumes we've passed a store value with a .set()
        $$props.bindTo(Math.abs(store.swapAmountELT) || null);
      } else {
        $$props.bindTo = Math.abs(store.swapAmountELT) || null;
      }
    }} />
</div>
