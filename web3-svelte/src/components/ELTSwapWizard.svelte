<script>
  import RangeSlider from "svelte-range-slider-pips";

  import { Progress } from "svelma";
  // import { log } from "svelte-web3";
</script>

<style>
  .unit-enclave {
    height: 30;
    border-radius: 15;
    background-color: "blue";
  }
</style>

<div class="card">
  <div class="card-header level">
    <div class="unit-enclave column">
      <pre>0 HODL</pre>
    </div>

    <div class="unit-enclave column">
      <pre>0 ELT</pre>
    </div>

    <div class="unit-enclave column ">
      <pre class="is-flex">0 ETH</pre>

      <div class="unitEnclave ">
        <pre>Not Connected</pre>
        <pre class="connectionIndicator">&#11044;</pre>
      </div>
    </div>
  </div>

  <div class="card-content">
    <div class="level ">
      <div class="column">
        <h3>ELT</h3>
        <pre class="balance">100,000</pre>
      </div>

      <button
        on:click={(evt) => {
          console.log(evt);
        }}>
        Connect Wallet
      </button>

      <div class="column has-text-right">
        <h3>HODL</h3>
        <pre class="balance">0.0833</pre>
      </div>
    </div>

    <div class="sliderWrapper level">
      <div class="column">
        <pre>ELT Burn &#128293;</pre>
        <pre>66%</pre>
      </div>

      <div class="sliderWrapper level">
        <RangeSlider />
      </div>

      <div class="column has-text-right">
        <pre>HODL Bonus;</pre>
        <pre>0.033%</pre>
      </div>
    </div>
  </div>

  <div class="card-footer">
    <div class="level">
      <pre>Eltswap Progress: 133%</pre>
    </div>

    <div class="colRight">
      <pre>30,000,000 ELT</pre>
    </div>
  </div>

  <div class="sliderWrapper level">
    <Progress />

    <div class="column">
      <pre>0 ELT</pre>
    </div>

    <div class="column">
      <pre>40M ELT</pre>
    </div>
  </div>
</div>
