<script>
  import { fade } from "svelte/transition"
  import { createEventDispatcher } from "svelte"
  import Portal from "./Portal.svelte"
  import IconButton from "./IconButton.svelte"
  import MiniProductCart from "./MiniProductCart.svelte"
  import ModalSurface from "./ModalSurface.svelte"
  import { onMount } from "svelte"
  import Button from "./Button.svelte"

  let modalElement
  export let visible
  export let reasons = [
    "Не планирую больше совершать покупки",
    "Не устраивает обслуживание",
    "Не могу найти нужный товар",
    "Другая причина"
  ]
  let selectedReason = "Другая причина"
  let visibleInput = false
  const dispatch = createEventDispatcher()

  function closeViaOverlay(e) {
    if (modalElement && !modalElement.contains(e.target)) dispatch("close")
  }
  function closeModal() {
    dispatch("close")
    visible = !visible
  }

  $: if (selectedReason) {
    console.log(selectedReason)
    if (selectedReason == "Другая причина") {
      visibleInput = true
      console.log(visibleInput)
    } else {
      visibleInput = false
    }
  }
</script>

<ModalSurface css="width: 400px; height: 440px;" on:close={closeModal}>
  <div transition:fade on:click={closeViaOverlay} class="overlay">
    <div bind:this={modalElement} class="modal relative bg-white h-full rounded">
      <div class="close-button">
        <IconButton on:click={closeModal} status="close" />
      </div>
      <div>
        <h2>Удаление аккаунта</h2>
      </div>
      <div class="flex mt-16 items-center">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="57"
            height="51"
            viewBox="0 0 57 51"
            fill="none"
            class="mr-12"
          >
            <path
              d="M56.4559 44.6947L31.9751 2.29267C31.2498 1.03633 29.9507 0.286316 28.5 0.286316C27.0493 0.286316 25.7502 1.03633 25.0249 2.29267L0.544061 44.6947C-0.181353 45.951 -0.181353 47.4512 0.544061 48.7074C1.26936 49.9637 2.56845 50.7137 4.01917 50.7137H52.9808C54.4315 50.7137 55.7306 49.9637 56.4559 48.7074C57.1814 47.4512 57.1814 45.951 56.4559 44.6947ZM53.5601 47.0355C53.488 47.1604 53.3167 47.3699 52.9809 47.3699H4.01917C3.68318 47.3699 3.51196 47.1605 3.44004 47.0355C3.36801 46.9107 3.27204 46.6576 3.44004 46.3667L27.9208 3.9646C28.0888 3.6737 28.3557 3.63017 28.4999 3.63017C28.6442 3.63017 28.9111 3.67359 29.079 3.9646L53.56 46.3667C53.7281 46.6576 53.6321 46.9107 53.5601 47.0355Z"
              fill="#E71F75"
            />
            <path d="M30.1726 15.4911H26.8286V33.3255H30.1726V15.4911Z" fill="#E71F75" />
            <path
              d="M28.5006 41.1282C29.7318 41.1282 30.7299 40.1301 30.7299 38.8988C30.7299 37.6676 29.7318 36.6695 28.5006 36.6695C27.2694 36.6695 26.2712 37.6676 26.2712 38.8988C26.2712 40.1301 27.2694 41.1282 28.5006 41.1282Z"
              fill="#E71F75"
            />
          </svg>
        </div>
        <div>
          Внимание! Вся информация в личном кабинете будет удалена, аккаунт нельзя будет
          восстановить.
        </div>
      </div>
      <div class="mt-24">
        <p>Пожалуйста, укажите причину удаления аккаунта:</p>
        {#each reasons as reason, i}
          {#if reason != "Другая причина"}
            <div class="flex mt-16 items-center inputDelete">
              <input
                type="radio"
                id={"reason" + i}
                bind:group={selectedReason}
                value={reason}
              />
              <label class="labelIcon" for={"reason" + i} />
              <label class="labelText" for={"reason" + i}>
                <p>
                  {reason}
                </p>
              </label>
            </div>
          {:else}
            <div class="flex mt-16 items-center inputDelete">
              <input
                type="radio"
                id={"reason" + i}
                bind:group={selectedReason}
                value={reason}
              />
              <label class="labelIcon" for={"reason" + i} />
              <label class="labelText" for={"reason" + i}>
                <p>
                  {reason}
                </p>
              </label>
              <input type="text inputOtherReason" class:visibleInput />
            </div>
          {/if}
        {/each}
      </div>
      <div class="buttons mt-40 flex items-center">
        <Button size="md" on:click={closeModal}>
          <span class=" text-base font-semibold">Не удалять аккаунт</span>
        </Button>
        <div class="confirmDelete ml-34 ">
          <a href="/">Удалить</a>
        </div>
      </div>
    </div>
  </div>
</ModalSurface>

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
    height: 440px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @apply rounded;
    background: #ffffff;
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    z-index: 999999;
    font-size: 15px;
    line-height: 135%;
    color: var(--color-main);
    padding: 24px;
  }
  .close-button {
    top: 14px;
    right: 14px;
    @apply absolute;
    z-index: 11;
  }
  .visibleInput {
    display: block;
    background: #ffffff;
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    color: var(--color-main);
    font-size: 15px;
    height: 35px;
    padding: 0 12px;
    width: 190px;
    margin-left: 12px;
  }
  .visibleInput:focus {
    background: #ffffff;
    border: 1px solid var(--color-info);
  }
  input[type="radio"] {
    display: none;
  }
  .labelIcon {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    border: 1px solid var(--gray-500);
    margin-right: 12px;
  }

  .labelText {
    margin-top: -3px;
    color: var(--color-main);
    font-weight: normal;
    font-size: 14px;
  }
  .inputDelete {
    display: flex;
  }

  .inputDelete:hover .labelIcon {
    background-color: var(--gray-700);
    border: 6px solid var(--gray-300);
    transition: all 0.1s ease-out;
  }

  input[type="radio"]:checked + .labelIcon {
    width: 20px;
    height: 20px;
    background-color: #330033;
    border: 6px solid var(--color-accent);
    font-weight: 600;
    font-size: 16px;
    line-height: 130%;
    color: var(--color-main);
    transition: all 0.1s ease-out;
  }

  .confirmDelete {
    font-size: 16px;
    color: var(--gray-700);
    cursor: pointer;
  }
  .confirmDelete:hover {
    color: var(--color-info);
  }
  h2 {
    font-weight: 600;
    font-size: 18px;
  }
  .buttons {
    left: 24px;
    bottom: 24px;
    position: absolute;
  }
  .inputOtherReason {
    display: none;
  }
</style>
