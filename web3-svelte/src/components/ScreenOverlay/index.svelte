<script>
  const closeOverlay = (evt) => {
    console.log(" /????? ", evt);
  };
</script>

<style>
</style>

<div class="screen-overlay-wrapper is-flex is-12">
  <div class="overlay-header">
    <button class="button is-ghost" on:click={closeOverlay}>
      <span class="icon is-small"> <i class="fas fa-times" /> </span>
    </button>
  </div>
  <div class="overlay-content">
    <p>Congratulations, HODLER</p>

    <p>Swap transaction: SUCCESS ✅</p>

    <button class="button is-primary"> Join the Telegram community </button>

    <button class="button is-static" disabled> Staking rewards dApp </button>
  </div>
  <div class="overlay-footer" />
</div>
