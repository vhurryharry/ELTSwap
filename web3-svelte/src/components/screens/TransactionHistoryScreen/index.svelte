<script>
  import TransactionHistory from "../../TransactionHistory/index.svelte";
</script>

<div
  class="screen transaction-history-screen"
  class:active={$$props.currScreen == 'transaction-history-screen'}>
  <div class="screen-header">
    <h3>Transaction History:</h3>
  </div>

  <div class="screen-body">
    <TransactionHistory />
  </div>

  <div class="screen-footer" />
</div>
