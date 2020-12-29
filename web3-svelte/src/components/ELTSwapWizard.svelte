<script>
  import RangeSlider from "svelte-range-slider-pips";
</script>

<style>
  .elt-swap-wizard {
    border-radius: 0.5rem;
    background-color: #2f2f2f;
    color: #fff;
  }
  .elt-swap-wizard .card {
    border-radius: 1rem;
    background-color: #383838;
  }

  .connectionIndicator {
    color: red;
  }

  .info-pill {
    border-radius: 1rem;
  }

  .number-bubble {
    background-color: #565656;
    border-radius: 1rem;
  }

  pre {
    color: #fff;

    background-color: transparent;
  }
</style>

<div class="elt-swap-wizard is-10 mt-5 mb-5 p-5">
  <div class="level align-items-end is-justify-content-end">
    <div class="info-pill block is-flex p-0 m-0 mr-5">
      <pre>0 HODL</pre>
    </div>

    <div id="hodlPill" class="info-pill block is-flex p-0 m-0 mr-5">
      <pre>0 ELT</pre>
    </div>

    <div id="eltPill" class="info-pill block is-flex p-0 m-0">
      <pre>
        0 ETH
      </pre>

      <div
        id="balancePill"
        class="info-pill is-flex p-0 m-0"
        style={{ background: 'red' }}>
        <pre>Not Connected</pre>
        <pre class="connectionIndicator px-0">&#11044;</pre>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="level ">
      <div class="column">
        <h3>ELT</h3>
        <pre class="number-bubble py-2">100,000</pre>
      </div>

      <button
        class="button is-danger is-rounded"
        on:click={(evt) => {
          console.log(evt);
        }}>
        Connect Wallet
      </button>

      <div class="column has-text-right">
        <h3>HODL</h3>
        <pre class="number-bubble py-2">0.0833</pre>
      </div>
    </div>

    <div class="sliderWrapper level">
      <div class="column">
        <h3>ELT Burn &#128293;</h3>
        <pre>66%</pre>
      </div>

      <div class="sliderWrapper level is-4">
        <progress class="progress is-info" max="100" value="66">87%</progress>
      </div>

      <div class="column has-text-right">
        <h3>HODL Bonus;</h3>
        <pre>0.033%</pre>
      </div>
    </div>
  </div>

  <div class="column is-flex-wrap-wrap is-flex">
    <div class="column is-full">
      <h3>Eltswap Progress: <span class="has-text-success">133%</span></h3>
    </div>

    <div class="column is-full">
      <span class="is-centered">30,000,000 ELT</span>

      <progress class="progress is-info" max="100" value="66">87%</progress>

      <span class="">0 ELT</span>

      <span class="is-pulled-right">40M ELT</span>
    </div>
  </div>
</div>
