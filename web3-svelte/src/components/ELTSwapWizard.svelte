<script>
  import { web3, connected } from "svelte-web3";

  import * as global from "../utils/globals";

  /** TODO: figure out how to properly import these */
  // import * as store from "../utils/stores";

  import { currentWizardScreen } from "../utils/stores";

  import ScreenOverlay from "./ScreenOverlay/index.svelte";

  import DAOScreenOfDoom from "./screens/DAOScreenOfDoom/index.svelte";
  import ELTSwapScreen from "./screens/ELTSwapScreen/index.svelte";
  import EpilogueScreen from "./screens/EpilogueScreen/index.svelte";
  import ETHPurchaseScreen from "./screens/ETHPurchaseScreen/index.svelte";
  import PendingScreen from "./screens/PendingScreen/index.svelte";
  import PrologueScreen from "./screens/PrologueScreen/index.svelte";

  const btnHandler = (slug) => {
    console.log(" --- ", slug);
    currentWizardScreen.set(slug);
  };
</script>

<style lang="scss" global>
  @import "../styles/main.scss";
</style>

{#await $currentWizardScreen then currScreen}
  <div
    class="column is-flex-wrap-wrap my-5 is-12 is-flex is-justify-content-center">
    <button
      class="button is-ghost"
      class:isPrimary={currScreen === 'prologue-screen'}
      on:click={(evt) => {
        btnHandler('prologue-screen');
      }}>PrologueScreen</button>

    <button
      class="button is-ghost"
      class:is-primary={currScreen === ''}
      on:click={(evt) => {
        btnHandler('elt-swap-screen');
      }}>ELTSwapScreen</button>
    <button
      class="button is-ghost"
      on:click={(evt) => {
        btnHandler('eth-purchase-screen');
      }}>ETHPurchaseScreen</button>
    <button
      class="button is-ghost"
      on:click={(evt) => {
        btnHandler('epilogue-screen');
      }}>EpilogueScreen</button>
    <button
      class="button is-ghost"
      on:click={(evt) => {
        btnHandler('pending-screen');
      }}>PendingScreen</button>
    <button
      class="button is-ghost"
      on:click={(evt) => {
        btnHandler('dao-screen-of-doom');
      }}>DAOScreenOfDoom</button>
  </div>
{/await}

<div class="elt-swap-wizard mt-5 mb-5 p-5" class:not-connected={!$connected}>
  {#await $currentWizardScreen then currScreen}
    <DAOScreenOfDoom {currScreen} />
    <ELTSwapScreen {currScreen} />
    <EpilogueScreen {currScreen} />
    <ETHPurchaseScreen {currScreen} />
    <PendingScreen {currScreen} />
    <PrologueScreen {currScreen} />
  {/await}

  <ScreenOverlay />
</div>
