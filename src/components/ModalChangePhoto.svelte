<script>
  import { createEventDispatcher } from "svelte"
  import { fade } from "svelte/transition"
  import IconButton from "@/components/IconButton.svelte"
  import ModalSelecteMiniPhoto from "@/components/ModalSelecteMiniPhoto.svelte"
  import Button from "@/components/Button.svelte"

  export let visible
  export let selected

  let modalElement
  let selectedItem = "Текущее"
  let vanilla
  let newPhoto
  const dispatch = createEventDispatcher()

  function closeViaOverlay(e) {
    if (modalElement && !modalElement.contains(e.target)) dispatch("close")
  }
  function closeModal() {
    dispatch("close")
    visible = !visible
  }
  function croppied() {
    vanilla.result("blob").then(function (blob) {
      var URLObj = window.URL || window.webkitURL
      var source = URLObj.createObjectURL(blob)
      newPhoto = source
      selected = newPhoto
      visible = false
    })
  }
</script>

<div transition:fade on:click={closeViaOverlay} class="overlay">
  <div bind:this={modalElement} class="modal relative bg-white h-full rounded">
    <div class="close-button">
      <IconButton on:click={closeModal} status="close" />
    </div>
    <div class="changePhoto flex">
      <div class="changePhoto__menu">
        <ul>
          <input type="radio" id="avatar" bind:group={selectedItem} value="Текущее" />
          <label for="avatar" class="flex items-center">
            <li class="changePhoto__menu_item">Текущее</li>
          </label>
          <input
            type="radio"
            id="changePhoto_loadPhoto"
            bind:group={selectedItem}
            value="Загрузить фото"
          />
          <label for="changePhoto_loadPhoto" class="flex items-center">
            <li class="changePhoto__menu_item">Загрузить фото</li>
          </label>
        </ul>
      </div>
      <div class="changePhoto__content">
        {#if selectedItem == "Текущее"}
          <div class="m-40 ml-0">
            <div class="thisPhoto">
              <img src={selected} alt="avatar" class="w-full h-full" />
            </div>
            <div class="flex mt-24">
              <Button textClass="text-base" size="md" on:click={false}>
                <span class="text-base font-semibold">Удалить</span>
              </Button>
              <Button
                textClass="text-base"
                size="md"
                status="active-secondary"
                className="ml-24"
                on:click={closeModal}
              >
                <span>Отменить</span>
              </Button>
            </div>
          </div>
        {/if}
        {#if selectedItem == "Загрузить фото"}
          <ModalSelecteMiniPhoto bind:selected bind:visible />
        {/if}
      </div>
    </div>
  </div>
</div>

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
    width: 608px;
    height: 482px;
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
    overflow: hidden;
  }
  .close-button {
    top: 14px;
    right: 14px;
    @apply absolute;
    z-index: 11;
  }
  .minus {
    position: absolute;
    color: var(--gray-200);
    font-size: 33px;
    top: 342px;
    left: 332px;
    z-index: 1000;
  }
  .plus {
    position: absolute;
    color: var(--gray-200);
    top: 344px;
    left: 448px;
    font-size: 25px;
    z-index: 1000;
  }
  h2 {
    font-weight: 600;
    font-size: 18px;
    color: var(--color-main);
  }
  .changePhoto {
  }
  .changePhoto__menu {
    width: 30.2%;
    height: 482px;
    background-color: var(--gray-200);
    padding-top: 25px;
  }
  .changePhoto__menu_item {
    width: 184px;
    height: 40px;
    padding-top: 8px;
    padding-left: 24px;
    transition: all 0.2s ease-out;
  }

  .changePhoto__menu_item:hover {
    background: var(--gray-1000);
  }
  .changePhoto__content {
    width: 69.8%;
    padding-left: 34px;
  }
  .text {
    font-size: 14px;
    color: var(--gray-600);
    margin-top: 12px;
  }
  .miniPhoto {
    width: 104px;
    height: 104px;
    background: #cbf2ff;
    clip-path: circle(50% at center center);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 3px solid #cbf2ff;
    font-weight: 600;
    font-size: 48px;
    line-height: 115%;
    letter-spacing: -0.03em;
    color: var(--color-main);
    transition: all 0.2s ease-out;
  }
  .miniPhoto:nth-child(-n + 3) {
    margin-top: 40px;
  }
  .miniPhoto:last-child {
    margin-bottom: 24px;
  }
  .miniPhotoSelected {
    border: 3px solid var(--color-info-light);
  }
  .miniPhoto:hover {
    border: 3px solid var(--color-info);
  }
  .letters {
    font-size: 155px;
  }
  .thisPhoto {
    width: 350px;
    height: 350px;
    background: #cbf2ff;
    clip-path: circle(50% at center center);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-out;
  }
  .thisPhoto img {
    width: 350px;
    height: 350px;
  }
  input[type="radio"] {
    display: none;
  }
  input:checked + label {
    font-weight: 600;
    font-size: 15px;
    background: var(--color-accent);
  }
  input[type="radio"] + label {
    cursor: pointer;
  }
  .CroppieContainer {
    overflow: hidden;
    padding-left: -10px !important;
  }
  .CroppieContainer__controller {
    display: flex;
  }
  .CroppieContainer__controller button {
  }
  :global(.cr-slider-wrap) {
    z-index: 999 !important;
    margin: -47px 0 0 115px !important;
    position: absolute;
    width: 153px !important;
    height: 26px;
    background: rgba(51, 0, 51, 0.8);
    border-radius: 30px;
  }
  :global(.cr-slider) {
    width: 90px !important;
    padding-bottom: 1px !important;
  }
  :global(input[type="range"]::-webkit-slider-runnable-track) {
    width: 300px;
    height: 5px;
    background: var(--gray-700);
    border-radius: 3px;
  }
  :global(input[type="range"]::-webkit-slider-thumb) {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    background: white;
  }
  :global(.cr-viewport) {
    border: none !important;
    box-shadow: 0 0 2000px 2000px rgba(51, 0, 51, 0.4) !important;
  }
  :global(.croppie-container) {
    margin-left: -15px !important;
  }
</style>
