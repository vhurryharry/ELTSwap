<div
  class="screen prologue-screen"
  class:active={currScreen == 'prologue-screen'}>
  <div class="screen-header py-5">
    <button
      class="button is-flat"
      class:pending={$isSwapBtnPending}
      on:click={enableBrowser}>
      X
    </button>
  </div>

  <div class="screen-body p-5">
    <p>
      In ancient Greek drama, the prologos (a word that means basically
      "speaking before") was the opening portion of the play, before the entry
      of the all-important chorus. It might be spoken by a single actor, maybe
      playing a god, who would "set the scene" for the audience. Playwrights
      today instead often provide the same kind of "scene-setting" information
      through dialogue near the play's beginning; in movies, it may appear (as
      in the "Star Wars" series) in the form of actual written text. In a
      nonfiction book, the lead-in is now usually called a preface or
      introduction; novels rarely provide any introduction at all. Still,
      prologue remains a useful word for nonliterary purposes. The saying "The
      past is prologue" tells us that, in real life, almost everything can be a
      prologue to what follows it.
    </p>
  </div>

  <div class="screen-footer is-justify-content-center">
    <button
      class="button is-rounded"
      class:pending={$isSwapBtnPending}
      on:click={enableBrowser}>
      Continue
    </button>
  </div>
</div>
