<script>
  import { currentWizardScreen } from "../../../utils/stores";
</script>

<style>
</style>

<div
  class="screen pending-screen"
  class:active={$currentWizardScreen === 'pending-screen'}>
  <div class="screen-header">
    <p>pending...</p>
  </div>

  <div class="screen-body">
    <p>
      <img
        src="/src/static/images/HODL_DAO_Logo_icon.svg"
        alt="http://www.hodldao.xyz" />
    </p>
  </div>

  <div class="screen-footer">
    <p>loading indicator?</p>
  </div>
</div>
