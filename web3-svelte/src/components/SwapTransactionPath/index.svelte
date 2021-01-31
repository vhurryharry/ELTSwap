<script>
  import { isRPCEnabled, currentSwapToken } from "../../utils/stores";
  import Icon from "svelte-awesome";
  import { angleRight } from "svelte-awesome/icons";
</script>

<div
  id="swapTransactionPath"
  class="column is-flex is-flex-flow-row is-justify-content-center is-12 mb-5 py-0"
>
  <h3 class="is-flex ">
    <pre class="disabeld">ETH</pre>
    <pre><Icon data={angleRight} /></pre>

    <pre>ELT</pre>
    <pre><Icon data={angleRight} /></pre>

    <pre>HODL</pre>
  </h3>
</div>

<style lang="scss">
  @import "../../styles/variables";
  @import "../../styles/typography";

  #swapTransactionPath {
    background-color: $themeSurfaceDarkest;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    pre {
      @extend .disabled;
    }
  }
</style>
