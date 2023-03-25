<script>
  import { fade } from "svelte/transition"
  import { createEventDispatcher } from "svelte"
  import Portal from "./Portal.svelte"
  import IconButton from "./IconButton.svelte"
  import Button from "../components/Button.svelte"
  import { onMount } from "svelte"

  let element
  let once = true
  let focused = false

  onMount(() => {
    if (once) {
      checkChange()
      once = false
      element.focus()
    }
  })
  export let value
  export let texts
  export let selectedCongratulation

  let modalElement
  let maximum = false
  let changeMoove = false
  let changeBack = false
  const dispatch = createEventDispatcher()

  function closeViaOverlay(e) {
    if (modalElement && !modalElement.contains(e.target)) dispatch("close")
  }

  function closeModal() {
    dispatch("close")
  }
  function checkChange() {
    if (value == "") {
      changeMoove = true
      if (texts.storage.length > 1) {
        changeBack = true
      }
    }
    if (value == texts.text) {
      if (texts.storage.length > 1) {
        changeBack = true
      }
    }
    console.log(texts.storage)
    if (value != texts.text) {
      changeMoove = true
    } else {
      changeMoove = false
    }

    if (value.length > 250) {
      maximum = true
    } else {
      maximum = false
    }
  }

  function saveText() {
    if (!maximum) {
      texts.storage[0] = texts.text
      texts.UserText = value
      if (value != "" && value != texts.text && texts.storage.indexOf(value) == -1) {
        texts.storage.push(value)
      }
      texts.count = texts.storage.length - 1
      closeModal()
    }
  }
  function clearText() {
    texts.storage[0] = texts.text
    if (value != "" && value != texts.text && texts.storage.indexOf(value) == -1) {
      texts.storage.push(value)
      changeBack = true
    }
    changeMoove = true
    value = ""
  }
  function goToUserText() {
    if (changeBack) {
      if (value != "" && value != texts.text && texts.storage.indexOf(value) == -1) {
        texts.storage.push(value)
      }
      if (texts.count != texts.storage.length - 1) {
        texts.count = texts.count + 1
        value = texts.storage[texts.count]
        if (texts.count == texts.storage.length - 1) {
          changeBack = false
        }
      } else {
        changeBack = false
        value = texts.storage[texts.count]
      }
    }
  }
  function goToText() {
    if (changeMoove) {
      texts.storage[0] = texts.text
      if (value != "" && value != texts.text && texts.storage.indexOf(value) == -1) {
        texts.storage.push(value)
        changeBack = true
      }
      if (texts.storage.length > 1 && texts.count == 0) {
        changeBack = true
      }
      value = texts.text
      texts.count = 0
    }
  }

  $: if (value && !once) {
    checkChange()
  }
</script>

<div transition:fade on:click={closeViaOverlay} class="overlay">
  <div bind:this={modalElement} class="modal relative">
    <div class="close-button">
      <IconButton on:click={closeModal} status="close" />
    </div>
    <div class="postcard">
      <h2 class="postcard__name">Добавьте текст открытки</h2>
      <h3 class="postcard__descript">
        Вы можете использовать готовое поздравление или написать своё
      </h3>
      <p
        contenteditable="true"
        bind:innerHTML={value}
        bind:this={element}
        class="{maximum ? 'errorBorder' : ''} textarea"
      />
      <div class="{maximum ? 'errorText' : 'errorFalse'} flex">
        <img src="errorText.svg" class="errImg" alt="errorText" />Слишком длинный текст
      </div>
      <div class="postcard__buttons">
        <button class="textArea__button_moove" on:click={goToText}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
          >
            <path
              d="M5.22168 7.85693L1.00084 4.42535L5.22168 0.999885"
              class="textArea__button"
              class:changeMoove
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <line
              x1="0.5"
              y1="-0.5"
              x2="8.71487"
              y2="-0.5"
              transform="matrix(-1 0 0 1 10.2148 4.76953)"
              class="textArea__button"
              class:changeMoove
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <line
              x1="0.5"
              y1="-0.5"
              x2="8.71487"
              y2="-0.5"
              transform="matrix(-1 0 0 1 10.2148 13)"
              class="textArea__button"
              class:changeMoove
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.7793 12.5385C12.1104 12.5385 14.0001 10.6965 14.0001 8.42429C14.0001 6.15206 12.1104 4.31006 9.7793 4.31006"
              class="textArea__button"
              class:changeMoove
            />
          </svg>
        </button>
        <button class="textArea__button_back" on:click={goToUserText}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="14"
            viewBox="0 0 15 14"
            class="textArea__button"
            class:changeBack
          >
            <path
              d="M9.77832 7.85693L13.9992 4.42535L9.77832 0.999885"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <line
              x1="5.28516"
              y1="4.26953"
              x2="13.5"
              y2="4.26953"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <line
              x1="5.28516"
              y1="12.5"
              x2="13.5"
              y2="12.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.2207 12.5385C2.8896 12.5385 0.999863 10.6965 0.999863 8.42429C0.999863 6.15206 2.8896 4.31006 5.2207 4.31006"
              class="textArea__button"
              class:changeBack
            />
          </svg>
        </button>
        <button class="textArea__button_exit" on:click={clearText}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 18 18"
            fill="none"
            class="deleeteText"
          >
            <circle cx="9" cy="9" r="9" fill="none" />
            <path
              d="M12.6006 5.3999L5.40059 12.5999M5.40059 5.3999L12.6006 12.5999"
              stroke="#999999"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div class="flex footerButton">
        <Button size="lg" on:click={saveText} className="mr-30">Сохранить</Button>
        <Button size="lg" status="active-secondary" on:click={closeModal}>Отменить</Button
        >
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
    width: 600px;
    height: 410px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @apply rounded;
    background: #ffffff;
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    padding: 24px;
  }
  .close-button {
    top: 14px;
    right: 14px;
    @apply absolute;
    z-index: 11;
  }
  img {
    margin-left: 7px;
  }

  .postcard__name {
    font-weight: bold;
    font-size: 18px;
    line-height: 130%;
    color: var(--color-main);
  }
  .errImg {
    margin-right: 7px;
  }
  .postcard__descript {
    font-size: 14px;
    line-height: 135%;
    color: var(--gray-600);
    margin-top: 8px;
    margin-bottom: 24px;
  }
  .textarea {
    width: 552px;
    height: 193px;
    background: var(--color-light);
    border: 1px solid var(--gray-500);
    box-sizing: border-box;
    border-radius: 4px;
    padding: 12px 16px;
    font-size: 15px;
    line-height: 135%;
    color: var(--color-main);
    resize: none;
    overflow-y: auto;
  }
  .textarea:focus {
    border: 1px solid var(--color-info-light);
  }
  .postcard__save {
    width: 155px;
    height: 46px;
    background: var(--color-accent);
    border-radius: 4px;
    margin-right: 24px;
    font-weight: 600;
    font-size: 16px;
    line-height: 130%;
    color: var(--color-main);
  }
  .postcard__back {
    width: 146px;
    height: 46px;
    background: var(--gray-200);
    border-radius: 4px;
  }
  .postcard__save:hover {
    background: var(--color-info);
    color: #fff;
  }
  .postcard__back:hover {
    background: var(--color-info);
    color: #fff;
  }
  .postcard__buttons {
    margin-top: 30px;
    font-size: 16px;
    line-height: 130%;
    color: var(--color-main);
  }
  .errorFalse {
    display: none;
  }

  .errorText {
    font-size: 14px;
    line-height: 135%;
    color: #e81717;
    margin-top: 8px;
  }
  .errorBorder {
    border: 1px solid #e81717;
  }
  .textArea__button_moove {
    position: absolute;
    top: 265px;
    right: 90px;
  }
  .textArea__button_moove:hover .changeMoove {
    stroke: var(--color-info);
  }

  .textArea__button_back {
    position: absolute;
    top: 265px;
    right: 65px;
  }
  .textArea__button_back:hover .changeBack {
    stroke: var(--color-info);
  }

  .textArea__button_exit {
    position: absolute;
    top: 260px;
    right: 33px;
  }
  .textArea__button {
    stroke: var(--gray-1000);
    fill: none;
  }
  .changeMoove {
    stroke: var(--gray-600);
  }
  .changeBack {
    stroke: var(--gray-600);
  }

  .deleeteText:hover circle {
    fill: var(--gray-200);
  }
  .footerButton {
    display: flex;
    position: absolute;
    bottom: 24px;
    left: 24px;
  }
</style>
