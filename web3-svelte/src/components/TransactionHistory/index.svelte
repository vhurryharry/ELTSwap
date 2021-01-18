<script>
  import { web3, connected } from "svelte-web3";
  import { Datatable, rows } from "svelte-simple-datatables";
  import { formatAddr } from "../../utility/services.js";

  $: transactionHistory = [
    {
      address: "0x1000000000000000000000000000000000000000",
      action: "swap",
      timestamp: Date.now(),
      status: "pending",
    },
    {
      address: "0x2000000000000000000000000000000000000000",
      action: "swap",
      timestamp: Date.now(),
      status: "success",
    },
    {
      address: "0x3000000000000000000000000000000000000000",
      action: "deposit",
      timestamp: Date.now(),
      status: "failed",
    },
    {
      address: "0x4000000000000000000000000000000000000000",
      action: "swap",
      timestamp: Date.now(),
      status: "success",
    },
    {
      address: "0x5000000000000000000000000000000000000000",
      action: "deposit",
      timestamp: Date.now(),
      status: "success",
    },
  ];

  /** available options https://github.com/vincjo/svelte-simple-datatables */
  let tableConfig = {
    // sortable: true,
    pagination: false,
    // rowPerPage: 15,
    columnFilter: false,
    // labels: {
    //   search: "Search...", // search input placeholer
    //   filter: "Filter", // filter inputs placeholder
    //   noRows: "No entries to found",
    //   info: "Showing {start} to {end} of {rows} entries",
    //   previous: "Previous",
    //   next: "Next",
    // },
    blocks: {
      searchInput: false,
      // paginationButtons: false,
      // paginationRowCount: false,
    },
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "failed":
        return "❌";
      case "success":
        return "✅";
      case "pending":
        return "⏳";
      default:
        return "?";
    }
  };
</script>

<style>
</style>

<div class="transaction-history-wrapper is-flex is-12">
  <Datatable settings={tableConfig} data={transactionHistory}>
    <thead>
      <th data-key="address">address</th>
      <th data-key="action">action</th>
      <th data-key="timestamp">timestamp</th>
      <th data-key="status">status</th>
      <th />
    </thead>
    <tbody class="history-body">
      {#each $rows as row}
        <tr>
          <td>
            <a
              href={'https://etherscan.io/tx/' + row.address}
              target="_blank">{formatAddr(row.address)}</a>
          </td>
          <td>{row.action}</td>
          <td>{row.timestamp}</td>
          <td>{row.status}</td>
          <td class="has-text-right">{getStatusLabel(row.status)}</td>
        </tr>
      {/each}
    </tbody>
  </Datatable>
</div>
