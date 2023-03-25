<script>
  import { fade } from "svelte/transition"
  import { createEventDispatcher } from "svelte"
  import Portal from "./Portal.svelte"
  import IconButton from "./IconButton.svelte"

  export let title = ""
  export let text = ""
  export let size = "sm"

  let modalElement

  const dispatch = createEventDispatcher()

  function closeViaOverlay(e) {
    if (modalElement && !modalElement.contains(e.target)) dispatch("close")
  }

  function closeModal() {
    dispatch("close")
  }
</script>

<Portal>
  <div transition:fade on:click={closeViaOverlay} class="overlay">
    <div
      bind:this={modalElement}
      class="bg-white h-full rounded-lg modal relative px-24 {size === 'sm'
        ? 'py-24'
        : 'py-34'}"
    >
      <div class="text-main text-one-five leading-mid text-popup">{text}</div>
      <div class="close-button">
        <IconButton on:click={closeModal} status="close" />
      </div>
    </div>
  </div>
</Portal>

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
    height: 68px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @apply rounded;
  }
  .close-button {
    top: 14px;
    right: 14px;
    @apply absolute;
  }
  .text-popup {
  }
</style>
