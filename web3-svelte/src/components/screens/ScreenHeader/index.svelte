<script>
  import { web3 } from "svelte-web3";
  import { afterUpdate } from "svelte";

  import * as global from "../../../utils/globals";

  import Icon from "svelte-awesome";
  import { clockO, questionCircle } from "svelte-awesome/icons";

  import {
    getETHBalance,
    getTokenBalance,
    getELTInContract,
    getHODLInContract,
    getELTBurned,
    getTotalHodlReward,
    getPhase1Bonus,
    getGasPriceEstimate,
    getSwapPhase,
  } from "../../../js/web3Helper";

  import {
    currentHODLBonus,
    currentSwapPhase,
    isRPCEnabled,
    latestAccount,
    isOverlayScreenActive,
    currentWizardScreen,
    selectedAccount,
    currentHODLInContract,
    currentELTBurned,
    currentELTInContract,
    currentTotalHODLReward,
    currentGasPriceEstimate,
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

  $: updateHODLInContract = () => {
    let hodlInContract = getHODLInContract($web3);

    if (typeof hodlInContract.then !== "function") {
      currentHODLInContract.set(0);
    } else {
      hodlInContract.then(
        (result) => {
          currentHODLInContract.set(result);
        },
        (err) => {
          currentHODLInContract.set(null);
          console.dir(err);
        }
      );
    }
  };

  $: updateELTInContract = () => {
    let eltInContract = getELTInContract($web3);

    if (typeof eltInContract.then !== "function") {
      currentELTInContract.set(0);
    } else {
      eltInContract.then(
        (result) => {
          currentELTInContract.set(result);
        },
        (err) => {
          currentELTInContract.set(null);
          console.dir(err);
        }
      );
    }
  };

  $: updateELTBurned = () => {
    let eltBurned = getELTBurned($web3);

    if (typeof eltBurned.then !== "function") {
      currentELTBurned.set(0);
    } else {
      eltBurned.then(
        (result) => {
          currentELTBurned.set(result);
        },
        (err) => {
          currentELTBurned.set(null);
          console.dir(err);
        }
      );
    }
  };

  $: updateTotalHODLReward = () => {
    let hodlReward = getTotalHodlReward(web3);

    if (typeof hodlReward.then !== "function") {
      currentTotalHODLReward.set(0);
    } else {
      hodlReward.then(
        (result) => {
          currentTotalHODLReward.set(result);
        },
        (err) => {
          currentTotalHODLReward.set(null);
          console.dir(err);
        }
      );
    }
  };

  $: updatePhase1Bonus = () => {
    if ($currentSwapPhase !== 1) return 0;

    let hodlBonus = getPhase1Bonus($web3);

    if (typeof hodlBonus.then !== "function") {
      currentHODLBonus.set(0);
    } else {
      hodlBonus.then(
        (result) => {
          currentHODLBonus.set(result);
        },
        (err) => {
          currentHODLBonus.set(null);
          console.dir(err);
        }
      );
    }
  };

  $: updateGasPriceEstimate = () => {
    let gasEst = getGasPriceEstimate(`phase${$currentSwapPhase}Swap`);

    if (typeof gasEst.then !== "function") {
      currentGasPriceEstimate.set(0);
    } else {
      gasEst.then(
        (result) => {
          currentGasPriceEstimate.set(result);
        },
        (err) => {
          currentGasPriceEstimate.set(null);
          console.dir(err);
        }
      );
    }
  };

  $: updateSwapPhase = () => {
    let swapPhase = getSwapPhase($web3);

    if (typeof swapPhase.then !== "function") {
      currentSwapPhase.set(null);
    } else {
      swapPhase.then(
        (result) => {
          currentSwapPhase.set(result);
        },
        (err) => {
          currentSwapPhase.set(null);
          console.dir(err);
        }
      );
    }
  };

  afterUpdate(() => {
    if ($isRPCEnabled) {
      updateSwapPhase();
      updateELTInContract();
      updateELTBurned();
      updateHODLInContract();
      updateTotalHODLReward();
      updatePhase1Bonus();
      updateGasPriceEstimate();
      return;
    }
  });
</script>

<div
  class="screen-header columns is-flex is-2 level is-multiline is-flex-wrap-wrap
        is-flex-flow-row py-0 mb-0"
>
  <div class="column is-flex flex-grow col-left is-2 pl-0 pt-0">
    <span
      class="px-2 py-0"
      on:click={(evt) => {
        currentWizardScreen.set("prologue-screen");
      }}
    >
      <Icon data={questionCircle} class="close-knob" />
    </span>
    <span
      on:click={(evt) => {
        isOverlayScreenActive.set(true);
      }}
    >
      <Icon data={clockO} class="close-knob" />
    </span>
  </div>
  <div class="column is-flex flow-grow col-right is-10 pr-0 pt-0">
    <div
      class="column is-flex-wrap-nowrap is-12-mobile is-6-tablet is-6-desktop"
    >
      <div class="columns is-2 is-flex is-12-mobile">
        <div id="hodlPill" class="column is-6-mobile">
          {#await hodlBalance}
            <pre class="px-1"> 0 HODL </pre>
          {:then value}
            <pre class="px-1">{value.toLocaleString('en-US')} HODL</pre>
          {/await}
        </div>

        <div id="eltPill" class="column is-6-mobile">
          {#await eltBalance}
            <pre class="px-1"> 0 ELT </pre>
          {:then value}
            <pre class="px-1">{value.toLocaleString('en-US')} ELT</pre>
          {/await}
        </div>
      </div>
    </div>

    <div
      class="column is-12-mobile is-6-tablet is-6-desktop is-justify-content-center pr-0"
    >
      <div id="ethPill" class=" is-justify-content-center">
        {#await ethBalance}
          <span class="px-1">0 ETH</span>
        {:then value}
          <span class="px-1">{fixedDecimals(value)} ETH</span>
        {/await}

        <div id="balancePill" class="">
          {#if !$latestAccount}
            <span class="px-1">Disconnected</span>
          {:else}<span class="px-1">{formatAddr($latestAccount)}</span>{/if}
          <span id="connectionIndicator" class:connected={$isRPCEnabled}
            >&#11044;</span
          >
        </div>
      </div>
    </div>
  </div>
</div>

<style>
</style>
