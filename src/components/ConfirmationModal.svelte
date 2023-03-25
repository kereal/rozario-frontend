<script>
  import { createEventDispatcher } from "svelte";
  import ModalSurface from "./ModalSurface.svelte";
  import Button from "./Button.svelte";

  export let text = "";
  export let title = "";
  export let cancelText = "";
  export let confirmText = "";
  export let normalButton = false;

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch("close");
  }

  function handleConfirmation() {
    dispatch("confirm");
  }
</script>

<style>
span {
  font-size:16px;
  white-space: pre;
}

</style>

<ModalSurface css="max-width: 400px; height: auto;" on:close={closeModal}>
  {#if title}
    <h3 class="text-main text-lg mb-18 mr-24 leading-snug font-semibold">
      {title}
    </h3>
    <div class="mb-18 text-one-five leading-mid text-main">{text}</div>
  {:else}
    <h3 class="text-main text-one-five mb-24 mr-24">{text}</h3>
  {/if}
  <div class="flex">
    <Button
      className={title ? 'mr-34' : 'mr-24'}
      on:click={closeModal}
      size="lg"
      status="active-main">
      <span class="textStyle">{cancelText}</span>
    </Button>
    {#if title && !normalButton}
      <button
        on:click={handleConfirmation}
        class="text-gray-700 hover:text-info leading-snug textStyle">
        {confirmText}
      </button>
    {:else}
      <Button on:click={handleConfirmation} size="lg" status="active-secondary">
        <span class="textStyle">{confirmText}</span>
      </Button>
    {/if}
  </div>
</ModalSurface>
