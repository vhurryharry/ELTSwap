<script>
  import RangeSlider from "svelte-range-slider-pips";
  // import { log } from "svelte-web3";

  export const ELTSwapWizard = {};
</script>

<style>
</style>

<div class="ELTSwapWizard">
  <div class="header">
    <div class="unitEnclave">
      <pre>0 HODL</pre>
    </div>

    <div class="unitEnclave">
      <pre>0 ELT</pre>
    </div>

    <div class="unitEnclave">
      <pre>0 ETH</pre>

      <div class="unitEnclave">
        <pre>Not Connected</pre>
        <pre class="connectionIndicator">&#11044;</pre>
      </div>
    </div>
  </div>

  <div class="content">
    <h3>ELT</h3>
    <pre class="balance">100,000</pre>

    <div class="sliderWrapper">
      <RangeSlider />

      <div class="colLeft">
        <pre>ELT Burn &#128293;</pre>
        <pre>66%</pre>
      </div>

      <div class="colRight">
        <pre>HODL Bonus;</pre>
        <pre>0.033%</pre>
      </div>
    </div>

    <h3>HODL</h3>
    <pre class="balance">0.0833</pre>

    <button
      on:click={(evt) => {
        console.log(evt);
      }}>
      Connect Wallet
    </button>
  </div>

  <div class="footer">
    <div class="colLeft">
      <pre>Eltswap Progress</pre>
    </div>

    <div class="colRight">
      <pre>30.1M ELT</pre>
      <pre>133%</pre>
    </div>
  </div>

  <div class="sliderWrapper">
    <div class="absStatusIndicator">
      <RangeSlider />
    </div>

    <div class="colLeft">
      <pre>0 ELT</pre>
    </div>

    <div class="colRight">
      <pre>40M ELT</pre>
    </div>
  </div>
</div>
