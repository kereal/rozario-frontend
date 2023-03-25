<script>
  import { createEventDispatcher } from "svelte"
  import { fade } from "svelte/transition"
  import Portal from "./Portal.svelte"
  import Select from "./Select.svelte"
  import Button from "./Button.svelte"

  const dispatch = createEventDispatcher()

  let modalElement
  let foxInit
  let foxStart
  let foxCry
  let selected

  let orderCancelInfoVisible = true

  let title = "Выберите причину:"
  let items = [
    "Нет нужных цветов",
    "Не устраивает время доставки",
    "Передумал(а)",
    "Оформил(а) новый заказ"
  ]

  function closeViaOverlay(e) {
    if (modalElement && !modalElement.contains(e.target)) dispatch("close")
  }
  let timeoutid
  function handleMouseenter() {
    foxInit.style.opacity = 0
    setTimeout(() => {
      foxStart.style.opacity = 0
    }, 450)
  }
  function handleMouseleave() {
    if (selected) {
      return
    }
    foxInit.style.opacity = 1
    foxStart.style.opacity = 1
    if (timeoutid) {
      clearTimeout(timeoutid)
    }
  }
  function closeModal() {
    dispatch("close")
  }
  function cancelOrder() {
    dispatch("cancel")
  }

  $: if (selected) {
    foxInit.style.opacity = 0
    foxStart.style.opacity = 0
  }
</script>

<Portal>
  <div transition:fade on:click={closeViaOverlay} class="overlay">
    <div bind:this={modalElement} class="modal relative bg-white relative pl-48 pt-48">
      <div class="z-10 relative">
        <h3 class="font-semibold text-2xl leading-snug text-main">
          Для отмены заказа укажите, пожалуйста, причину:
        </h3>
        <Select
          bind:selected
          on:mouseenter={handleMouseenter}
          on:mouseleave={handleMouseleave}
          {items}
          {title}
        />
        <div class="flex items-center w-full mt-24">
          <Button
            on:click={cancelOrder}
            size="lg"
            className="mr-24"
            status={selected ? "active-secondary" : "disabled-main"}
          >
            Отменить заказ
          </Button>
          <Button on:click={closeModal} size="lg" status="active-main">Не отменять</Button
          >
        </div>
      </div>
      <div class="fox">
        <img
          bind:this={foxInit}
          style="z-index: 4"
          class="absolute"
          src="fox-init.jpg"
          alt="static"
        />
        <img
          bind:this={foxStart}
          style="z-index: 3"
          class="absolute"
          src="fox-start.gif"
          alt="animated"
        />
        <img bind:this={foxCry} style="z-index: 2" src="fox-cry.gif" alt="animated" />
      </div>
      <button on:click={closeModal} class="close-button absolute">
        <svg
          class="close-icon"
          width="16"
          height="16"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L17 17M17 1L1 17"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
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
    width: 800px;
    height: 380px;
    transform: translate(-50%, -50%);
    padding-bottom: 7.25rem;
    padding-right: 19.875rem;
    @apply rounded absolute top-1/2 left-1/2;
  }
  h3 {
    margin-bottom: 34px;
  }
  .fox {
    position: absolute;
    right: 1rem;
    top: 79px;
    height: 223px;
    width: 357px;
  }
  .close-button {
    right: 1.125rem;
    top: 1.125rem;
  }
  .close-icon path {
    stroke: var(--gray-1100);
  }
  .close-icon:hover path {
    stroke: var(--gray-700);
  }
</style>
