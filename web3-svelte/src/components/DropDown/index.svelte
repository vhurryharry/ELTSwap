<script>
  import { nilAccount } from "./../../utils/globals.js";
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

  let tokens = [
    {
      name: "Ethereum",
      label: "ETH",
      iconName: "ether",
      tooltip: "ETH --> ELT --> HODL",
    },
    {
      name: "EltCoin",
      label: "ELT",
      iconName: "eltcoin",
      tooltip: "ELT --> HODL",
    },
  ];
</script>

<style lang="scss">
  .dropdown {
    background-color: none;

    .icon {
      margin-top: auto;
      margin-bottom: auto;
    }
  }

  #dropdown-menu {
    background-color: red;
  }
</style>

<div
  class={'dropdown ' + ($isSwapTokenDropDownActive ? 'is-active' : '')}
  class:disabled={$isRPCEnabled}>
  <span class="icon is-medium p-3">
    <Icon
      data={angleUp}
      style={`transform:rotate(${$isSwapTokenDropDownActive ? 0 : -180}deg)`} />
  </span>

  <div class="dropdown-trigger">
    <button
      class="button "
      aria-haspopup="true"
      aria-controls="dropdown-menu"
      on:click={isActive}>
      <Icon
        data={angleUp}
        style={`transform:rotate(${$isSwapTokenDropDownActive ? 0 : -180}deg)`} />
      <span>{$currentSwapToken}</span>
    </button>
  </div>

  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      {#each tokens as token}
        {#if token.label !== $currentSwapToken}
          <button
            class="dropdown-item button"
            on:click={(evt) => {
              setCurrentSwapToken(token.label);
              isActive(false);
            }}
            class:isActive={true}>
            {token.label}
          </button>
        {/if}
      {/each}
    </div>
  </div>
</div>
