<script>
  import { web3, connected } from "svelte-web3";

  let transactionHistory = {
    columnNames: ["transaction", "action", "time", "status"],
    rows: [
      {
        transaction: "0x0000000000000000000000000000000000000000",
        action: "swap",
        timestamp: new Date.now(),
        status: "pending",
      },
      {
        transaction: "0x0000000000000000000000000000000000000000",
        action: "swap",
        timestamp: new Date.now(),
        status: "success",
      },
      {
        transaction: "0x0000000000000000000000000000000000000000",
        action: "deposit",
        timestamp: new Date.now(),
        status: "failed",
      },
      {
        transaction: "0x0000000000000000000000000000000000000000",
        action: "swap",
        timestamp: new Date.now(),
        status: "success",
      },
      {
        transaction: "0x0000000000000000000000000000000000000000",
        action: "deposit",
        timestamp: new Date.now(),
        status: "success",
      },
    ],
  };
</script>

<style>
</style>

<div class="transaction-history-wrapper is-flex block is-12">
  <div class="is-mobile-hidden">
    {#each tickers as ticker}
      <div class="is-flex is-3 key-val-row">
        <div class="column col-left py-0">{ticker.label}</div>
        {#await ticker.value}
          <div class="column col-right has-text-right py-0">0</div>
        {:then value}
          <div class="column col-right has-text-right py-0">{value}</div>
        {/await}
      </div>
    {/each}
  </div>

  <div class="flex-data-table transactions-history">
    <!-- tablet, desktop -->
    <div class="data-table-header columns">
      <div class="table-cell" />
    </div>

    <div class="table-body">
      <div claas="table-row">
        <div claas="table-cell" />
      </div>
    </div>
    <div claas="table-footer">
      <div claas="table-cell" />
    </div>
  </div>
</div>
