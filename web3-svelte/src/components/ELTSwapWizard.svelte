<script>
</script>

<style>
</style>

<div class="elt-swap-wizard is-10 mt-5 mb-5 p-5">
  <div class="level align-items-end is-justify-content-end">
    <div id="hodlPill" class="info-pill block is-flex p-0 m-0 mr-5">
      <pre>0 HODL</pre>
    </div>

    <div id="eltPill" class="info-pill block is-flex p-0 m-0 mr-5">
      <pre>0 ELT</pre>
    </div>

    <div id="ethPill" class="info-pill block is-flex p-0 m-0">
      <pre>
        0 ETH
      </pre>

      <div id="balancePill" class="info-pill is-flex">
        <pre>Not Connected</pre>
        <pre class="connectionIndicator px-0">&#11044;</pre>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="level px-2 py-5 is-align-items-end">
      <div class="column py-0 ">
        <h3>ELT</h3>
        <input
          class="number-bubble input"
          type="text"
          placeholder="Text input" />
      </div>

      <button
        class="button is-danger is-rounded"
        on:click={(evt) => {
          console.log(evt);
        }}>
        Connect Wallet
      </button>

      <div class="column has-text-right py-0">
        <h3>HODL</h3>
        <pre class="number-bubble py-2">0.0833</pre>
      </div>
    </div>

    <div class="sliderWrapper level">
      <div class="block mb-0 px-5 py-0">
        <h3>ELT Burn &#128293;</h3>
        <pre>66%</pre>
      </div>

      <div id="swapHodlBurnRatio" class="is-flex is-12">
        <meter max="1" min=".1" value=".666" high=".66" low=".33" optimum="1" />
      </div>

      <div class="block has-text-right px-5 py-0">
        <h3>HODL Bonus</h3>
        <pre>0.033%</pre>
      </div>
    </div>
  </div>

  <div class="column is-flex-wrap-wrap is-flex">
    <div class="column is-full">
      <h3>Eltswap Progress: <span class="has-text-success">133%</span></h3>
    </div>

    <div class="column is-full">
      <span class="is-centered test-color">30,000,000 ELT</span>

      <progress class="progress is-info" max="100" value="66">87%</progress>

      <span class="">0 ELT</span>

      <span class="is-pulled-right">40M ELT</span>
    </div>
  </div>
</div>
