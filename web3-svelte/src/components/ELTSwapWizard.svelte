<script>
  import RangeSlider from "svelte-range-slider-pips";
</script>

<style>
</style>

<div class="card is-10 mt-5 mb-5">
  <div class="card-header level align-items-end is-justify-content-end">
    <div class="block is-flex p-0 m-0 mr-5">
      <pre>0 HODL</pre>
    </div>

    <div class="block is-flex p-0 m-0 mr-5">
      <pre>0 ELT</pre>
    </div>

    <div class="block is-flex p-0 m-0">
      <pre class="">
        0 ETH
      </pre>

      <div class="is-flex p-0 m-0">
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

      <div class="sliderWrapper level is-4">
        <progress class="progress is-info" max="100" value="66">87%</progress>
      </div>

      <div class="column has-text-right">
        <pre>HODL Bonus;</pre>
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
