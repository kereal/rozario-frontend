<script>
  // TODO refactor all models to wrap ModalSurface
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import Portal from "./Portal.svelte";
  import IconButton from "./IconButton.svelte";

  export let css;
  export let size = "md";
  export let focused;

  const dispatch = createEventDispatcher();

  let modalElement;

  function closeViaOverlay(e) {
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
    if (modalElement && !modalElement.contains(e.target))
    {
      closeModal()
      dispatch("close-overlay");
    }
  }

  function handleModalClick(e) {
    if (
      e.target.tagName === "INPUT" ||
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
</script>

<style>
  .modal-overlay {
    z-index: 1000;
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
  .modal {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .modal--md {
    @apply p-24;
  }
  .modal--lg {
    @apply px-24 py-34;
  }
  .modal--xl {
    @apply px-30 py-48;
  }
  .close-button {
    top: 16px;
    right: 16px;
    @apply absolute;
  }
</style>

<Portal>
  <div transition:fade on:click={closeViaOverlay} class="rounded modal-overlay">
    <div
      style={css}
      on:click={handleModalClick}
      bind:this={modalElement}
      class="bg-white h-full rounded modal relative modal--{size}">
      <slot />
      <div class="close-button">
        <IconButton on:click={closeModal} status="close" />
      </div>
    </div>
  </div>
</Portal>
