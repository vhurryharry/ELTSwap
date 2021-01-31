<script>
  import {
    isRPCEnabled,
    currentSwapToken,
    isSwapTokenDropDownActive,
  } from "../../utils/stores";
  import Icon from "svelte-awesome";
  import { angleDown, angleUp } from "svelte-awesome/icons";

  $: isActive = (event, setTo) => {
    console.log(" .... ", $isSwapTokenDropDownActive);

    if (setTo) {
      isSwapTokenDropDownActive.set(setTo);
      return;
    }
    isSwapTokenDropDownActive.set(!$isSwapTokenDropDownActive);
    return $isSwapTokenDropDownActive;
  };

  function setCurrentSwapToken(label) {
    currentSwapToken.set(label);
  }
</script>

<style>
</style>

<div
  class={'dropdown ' + ($isSwapTokenDropDownActive ? 'is-active' : '')}
  class:disabled={$isRPCEnabled}>
  <div class="dropdown-trigger">
    <button
      class="button"
      aria-haspopup="true"
      aria-controls="dropdown-menu"
      on:click={isActive}>
      <span class="icon is-small">
        <Icon
          data={angleUp}
          style={`transform:rotate(${$isSwapTokenDropDownActive ? 0 : -180}deg)`} />
      </span>

      <span>Dropdown button</span>
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
