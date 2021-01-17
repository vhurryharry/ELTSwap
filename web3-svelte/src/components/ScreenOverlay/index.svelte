<script>
  import Icon from "svelte-awesome";
  import { times } from "svelte-awesome/icons";

  const closeOverlay = (evt) => {
    console.log(" /????? ", evt);
  };
</script>

<style>
</style>

<div class="screen-overlay active is-flex is-12 has-text-center">
  <div
    class="screen-overlay-wrapper columns is-flex-direction-column is-justify-content-center p-5">
    <div class="overlay-header column has-text-left">
      <Icon data={times} class="close-knob" on:click={closeOverlay} />
    </div>
    <div class="overlay-content column">
      <div class="block px-5 mb-5">
        <p><code>Congratulations,</code> HODLER</p>
        <p><code>Swap transaction:</code> SUCCESS ✅</p>
      </div>

      <div class="block px-5 mb-5">
        <button class="button is-primary">
          <span class="is-hidden-mobile"> Join the</span>
          Telegram Community</button>
      </div>
      <div class="block px-5 mb-5">
        <button class="button is-static" disabled>
          Staking rewards dApp
        </button>
      </div>
    </div>
    <div class="overlay-footer " />
  </div>
</div>
