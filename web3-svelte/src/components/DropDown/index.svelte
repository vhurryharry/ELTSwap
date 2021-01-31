<script>
  import {
    isRPCEnabled,
    currentSwapToken,
    isSwapTokenDropDownActive,
  } from "../../utils/stores";
  import Icon from "svelte-awesome";
  import { angleDown, angleUp } from "svelte-awesome/icons";

  $: isActive = (setTo) => {
    if (setTo) {
      isSwapTokenDropDownActive.set(setTo);
      return;
    }
    isSwapTokenDropDownActive.set(!isSwapTokenDropDownActive);
    return $isSwapTokenDropDownActive;
  };

  function setCurrentSwapToken(label) {
    currentSwapToken.set(label);
  }
</script>

<style>
</style>

<div
  class="dropdown is-active"
  class:isActive={$isSwapTokenDropDownActive}
  class:disabled={$isRPCEnabled}>
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>Dropdown button</span>
      <span class="icon is-small">
        <Icon
          data={$isSwapTokenDropDownActive ? angleUp : angleDown}
          class="close-knob" />
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      <button
        class="dropdown-item button is-active is-link"
        on:click={(evt) => {
          setCurrentSwapToken('ELT');
          console.dir(evt);
          isActive(false);
        }}
        class:isActive={true}>
        ELT
      </button>

      <button
        class="dropdown-item is-active"
        on:click={(evt) => {
          setCurrentSwapToken('ETH');
          isActive(false);
        }}
        class:isActive={true}>
        ETH
      </button>
    </div>
  </div>
</div>
