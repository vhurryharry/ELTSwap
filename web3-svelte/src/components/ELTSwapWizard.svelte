<script>
  import { web3, connected } from "svelte-web3";

  import * as global from "../utils/globals";

  /** TODO: figure out how to properly import these */
  // import * as store from "../utils/stores";

  import { currentWizardScreen } from "../utils/stores";

  import ScreenOverlay from "./ScreenOverlay/index.svelte";

  import ELTSwapScreen from "./screens/ELTSwapScreen/index.svelte";
  import TransactionHistoryScreen from "./screens/TransactionHistoryScreen/index.svelte";
</script>

<style lang="scss" global>
  @import "../styles/main.scss";
</style>

<div class="elt-swap-wizard mt-5 mb-5 p-5" class:not-connected={!$connected}>
  {#await $currentWizardScreen then currScreen}
    <ELTSwapScreen {currScreen} />
    <TransactionHistoryScreen {currScreen} />
  {/await}

  <ScreenOverlay />
</div>
