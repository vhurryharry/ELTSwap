<script>
  import { web3 } from "svelte-web3";
  import { afterUpdate } from "svelte";

  import * as global from "../../utils/globals";

  // TODO:  Add use of getHODLInContract()
  import {
    getELTInContract,
    getHODLInContract,
    getTotalELTSwapped,
  } from "../../js/web3Helper";

  import { RPCErrorHandler, castToPrecision } from "../../utils/services";

  import {
    isRPCEnabled,
    currentSwapProgress,
    currentSwapPhase,
  } from "../../utils/stores";

  import TickerBelt from "../TickerBelt/index.svelte";

  /**
   * TODO: movethis to services
   *
   * Assuming these distinctions are true for currentSwapPhase...
   * TODO: Either use this switch or remove it
   */
  $: getSwapProgress = (callee) => {
    console.log(callee);
    console.log($isRPCEnabled);
    console.log(!web3 || !web3.eth);
    if (!$isRPCEnabled) return 0;
    if (!$web3 || !$web3.eth) return 0;

    try {
      return getTotalELTSwapped($web3).then(
        (result) => {
          return result;
        },
        (err) => {
          console.log(" getTotalELTSwapped ", err);
          RPCErrorHandler(err);
        }
      );
    } catch (error) {
      console.log(" getTotalELTSwapped ", error);
      RPCErrorHandler(error);
    }
  };

  afterUpdate(() => {
    if ($web3 && $isRPCEnabled) {
      let perc = getSwapProgressPercentile();

      if (typeof perc.then === "function") {
        perc.then((res) => {
          if ($currentSwapProgress !== res) {
            currentSwapProgress.set(res);
            console.log(" getTotalELTSwapped ", $currentSwapProgress);
          }
        });
      } else {
        console.log(" This should not be! ", perc);
        currentSwapProgress.set(0);
      }
    }
  });

  $: getSwapProgressPercentile = () => {
    let swapProg = getSwapProgress("callee: getCurrentSwapProgress");

    if (swapProg === 0) {
      currentSwapProgress.set(0);
      return 0;
    }

    if (typeof swapProg.then === "function") {
      return swapProg.then((result) => {
        return ((castToPrecision(result, 0) * 100) / global.absMaxELT) * 100;
      });
    }
  };

  $: eltInContract = $isRPCEnabled ? getELTInContract($web3) : 0;
</script>

<div class="column is-10 is-flex-wrap-wrap">
  <div class="column is-12 pb-0">
    <h3>
      <span class="">
        Eltswap Progress:
        <span class="eltswap-progress-success">{$currentSwapProgress}%</span>
      </span>
    </h3>
  </div>

  <div class="column is-12 pt-0">
    <TickerBelt />
  </div>

  <div class="column is-12 elt-swap-progress-wrapper">
    <div id="swapProgress" class="is-flex is-12">
      <span id="swapProgressGradient" />
      <span id="minSwapMark" />
      <div
        id="coverProgressGradient"
        style="--cover-progress-gradient-width: {100 - $currentSwapProgress}%;"
      />
    </div>
  </div>
</div>

<style>
</style>
