<script>
  import { web3, connected } from "svelte-web3";

  import * as global from "../utility/globals";

  /** TODO: figure out how to properly import these */
  // import * as store from "../utility/stores";

  import { currentWizardScreen } from "../utility/stores";

  import ScreenOverlay from "./ScreenOverlay/index.svelte";

  import ELTSwapScreen from "./screens/ELTSwapScreen/index.svelte";
</script>

<style lang="scss" global>
  @import "../styles/main.scss";
</style>

<div class="elt-swap-wizard mt-5 mb-5 p-5" class:not-connected={!$connected}>
  {#await $currentWizardScreen then currScreen}
    {currScreen}
    <ELTSwapScreen {currScreen} />
  {/await}

  <ScreenOverlay />
</div>
