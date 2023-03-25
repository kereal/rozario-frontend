<script>
  import Portal from "./Portal.svelte";
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import Button from "./Button.svelte";
  import IconButton from "./IconButton.svelte";

  const dispatch = createEventDispatcher();

  let modalElement;
  let svgSize = 24;

  function closeViaOverlay(e) {
    if (modalElement && !modalElement.contains(e.target)) dispatch("close");
  }

  function closeModal() {
    dispatch("close");
  }

  function deleteItems() {
    dispatch("delete");
  }
</script>

<style>
  .overlay {
    z-index: 1000;
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
  .delete-modal {
    width: 40%;
    transform: translate(-50%, -50%);
  }

  .close-button {
    right: 1rem;
    top: 1rem;
  }
</style>

<Portal>
  <div
    transition:fade={{ duration: 100 }}
    class="overlay"
    on:click={closeViaOverlay}>
    <div
      bind:this={modalElement}
      class="delete-modal px-16 py-20 relative rounded-lg top-1/2 left-1/2
      bg-white">
      <div class="mb-34 font-bold text-main text-2xl leading-none">
        Вы действительно хотите очистить корзину?
      </div>
      <div class="flex">
        <Button size="sm" className="mr-24" status="active-main" on:click={closeModal}>
          Нет
        </Button>
        <Button size="sm" on:click={deleteItems} status="active-secondary">
          Да
        </Button>        
      </div>
    </div>
    <div class="absolute close-button">
      <IconButton status="close" on:click={closeModal} />
    </div>
  </div>
</Portal>
