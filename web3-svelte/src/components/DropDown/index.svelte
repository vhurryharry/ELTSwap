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
  @import "../../styles/variables";

  .dropdown {
    background-color: $themeSurfaceMid;
    position: relative;

    .icon {
      margin-top: auto;
      margin-bottom: auto;
      width: 33%;
    }
  }

  // TODO: Fix !important
  #dropdown-menu {
    background-color: $themeSurfaceDark;
    min-width: auto;
    right: 4px;
    left: 33%;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    font-size: 1rem;
  }

  .dropdown-trigger button,
  button.dropdown-button {
    color: #fff;
    width: 100%;
    text-align: center;
    background-color: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: $themeSurfaceMid;
    }

    &:active {
      box-shadow: 0 0 3px $themeSurfaceLight inset;
    }
  }

  .dropdown-trigger button.button {
    &.is-active {
      border-bottom-left-radius: none;
      border-bottom-right-radius: none;
    }
    &.is-active,
    &:hover {
      background-color: $themeSurfaceDark;
    }

    &:active {
      box-shadow: 0 0 3px $themeSurfaceLight inset;
    }
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
      class={'button ' + ($isSwapTokenDropDownActive ? 'is-active' : '')}
      aria-haspopup="true"
      aria-controls="dropdown-menu"
      on:click={isActive}>
      <!-- TODO: Add token icon here -->
      <span>{$currentSwapToken}</span>
    </button>
  </div>

  <div class="dropdown-menu py-1" id="dropdown-menu" role="menu">
    <div class="is-flex is-flex-direction-row is-justify-content-flex-end">
      {#each tokens as token}
        {#if token.label !== $currentSwapToken}
          <button
            class=" mx-1 dropdown-button"
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
