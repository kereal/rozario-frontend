<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Portal from "./Portal.svelte";
  import IconButton from "./IconButton.svelte";
  import Button from "./Button.svelte";

  export let title;
  export let button;
  export let focused;
  export let editBlock;
  export let id;

  const dispatch = createEventDispatcher();

  export let modalElement;

  function closeViaOverlay(e) {
    if (!e.target.classList.contains("overlay")) {
      return;
    }
    if (
      e.target.tagName === "INPUT" ||
      e.target.closest(".custom-select") ||
      e.target.closest(".tel-input")
    ) {
      return;
    }
    if (focused) {
      focused = false;
      return;
    }
    if (modalElement && !modalElement.contains(e.target)) {
      console.log("closeviaoverlay", e.target);
      dispatch("close-overlay");
    }
  }

  function handleModalClick(e) {
    if (
      e.target.tagName === "INPUT" ||
      e.target.closest(".pen-icon") ||
      e.target.closest(".custom-select") ||
      e.target.closest(".tel-input")
    ) {
      return;
    }
    console.log("handle modal click", focused);
    if (focused) {
      focused = false;
    }
  }

  function closeModal() {
    dispatch("close");
  }

  function save({ target }) {
    dispatch("save", {
      target
    });
  }
</script>

<style lang="postcss">
  .overlay {
    z-index: 1000;
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
  .modal {
    width: 400px;
    height: 100%;
    max-height: 555px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
  .close-button {
    top: 1rem;
    right: 1rem;
  }
  .edit-block {
    height: calc(100% - 115px);
    top: -1.5rem;
    @apply relative;
  }
  .gradient-top {
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 18.23%,
      #ffffff 41.15%,
      rgba(255, 255, 255, 0.994792) 99.99%
    );
  }
  .gradient-bot {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 18.23%,
      #ffffff 41.15%,
      rgba(255, 255, 255, 0.994792) 99.99%
    );
  }
  .bottom-block {
    @apply pointer-events-none fixed bottom-0 left-0 pb-24 pr-24 pl-24 pt-24 w-full;
  }
</style>

<Portal>
  <div transition:fade on:click={closeViaOverlay} class="overlay">
    <div
      data-testid="editmodal-modal"
      on:click={handleModalClick}
      bind:this={modalElement}
      class="modal rounded border overflow-hidden border-gray-300 bg-white
      relative">
      <div class="top relative z-10 gradient-top p-24">
        <h3 class="text-main font-semibold leading-snug">{title}</h3>
      </div>
      <div
        {id}
        bind:this={editBlock}
        class="edit-block custom-scrollbar p-24 overflow-auto">
        <slot />
      </div>
      <div class="bottom-block gradient-bot">
        {#if button.status === 'active'}
          <Button
            form={button.id}
            type={button.type}
            className="pointer-events-auto"
            testid="save-button"
            on:click={save}
            size="lg"
            status="active-main">
            {button.text}
          </Button>
        {:else if button.status === 'disabled'}
          <Button
            form={button.id}
            type={button.type}
            className="pointer-events-auto"
            testid="save-button"
            on:click={save}
            size="lg"
            status="active-secondary">
            {button.text}
          </Button>
        {/if}
      </div>
      <div class="close-button z-20 absolute">
        <IconButton
          testid="close-button"
          on:click={closeModal}
          status="close"
          class="" />
      </div>
    </div>
  </div>
</Portal>
