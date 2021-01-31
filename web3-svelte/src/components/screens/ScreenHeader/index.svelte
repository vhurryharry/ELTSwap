<script>
  import { web3, selectedAccount } from "svelte-web3";
  import * as global from "../../../utils/globals";

  import Icon from "svelte-awesome";
  import { clockO, questionCircle } from "svelte-awesome/icons";

  import { getETHBalance, getTokenBalance } from "../../../js/web3Helper";

  import {
    isRPCEnabled,
    latestAccount,
    isOverlayScreenActive,
    currentWizardScreen,
  } from "../../../utils/stores";

  import { formatAddr, fixedDecimals } from "../../../utils/services.js";

  $: checkAccount = $selectedAccount || global.nilAccount;

  $: hodlBalance = $isRPCEnabled
    ? getTokenBalance($web3, checkAccount, global.HODLTokenContractAddr)
    : "";

  $: eltBalance = $isRPCEnabled
    ? getTokenBalance($web3, checkAccount, global.ELTTokenContractAddr)
    : "";

  $: ethBalance = $isRPCEnabled
    ? getETHBalance($web3, $selectedAccount)
    : Number(0.0);
</script>

<style>
</style>

<div
  class="screen-header columns is-flex is-2 level is-multiline is-flex-wrap-wrap
        is-flex-flow-row py-0 mb-0">
  <div class="column is-flex flex-grow col-left is-2 pl-0 pt-0">
    <span
      class="px-2 py-0"
      on:click={(evt) => {
        currentWizardScreen.set('prologue-screen');
      }}>
      <Icon data={questionCircle} class="close-knob" />
    </span>
    <span
      on:click={(evt) => {
        isOverlayScreenActive.set(true);
      }}>
      <Icon data={clockO} class="close-knob" />
    </span>
  </div>
  <div class="column is-flex flow-grow col-right is-10 pr-0 pt-0">
    <div
      class="column is-flex-wrap-nowrap is-12-mobile is-6-tablet is-6-desktop">
      <div class="columns is-2 is-flex is-12-mobile">
        <div id="hodlPill" class="column is-6-mobile">
          {#await hodlBalance}
            <pre class="px-1"> ? HODL </pre>
          {:then value}
            <pre class="px-1">{value.toLocaleString('en-US')} HODL</pre>
          {/await}
        </div>

        <div id="eltPill" class="column is-6-mobile">
          {#await eltBalance}
            <pre class="px-1"> ? ELT </pre>
          {:then value}
            <pre class="px-1">{value.toLocaleString('en-US')} ELT</pre>
          {/await}
        </div>
      </div>
    </div>

    <div
      class="column is-12-mobile is-6-tablet is-6-desktop is-justify-content-center pr-0">
      <div id="ethPill" class=" is-justify-content-center">
        {#await ethBalance}
          <span class="px-1"> ETH </span>
        {:then value}
          <span class="px-1">{fixedDecimals(value)} ETH </span>
        {/await}
        <div id="balancePill" class="">
          {#if !$latestAccount}
            <span class="px-1">Disconnected</span>
          {:else}<span class="px-1">{formatAddr($latestAccount)}</span>{/if}
          <span
            id="connectionIndicator"
            class:connected={$isRPCEnabled}>&#11044;</span>
        </div>
      </div>
    </div>
  </div>
</div>
