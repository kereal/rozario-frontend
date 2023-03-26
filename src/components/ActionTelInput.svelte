<script>
  import { createEventDispatcher, onMount, onDestroy } from "svelte"
  import { imask } from "svelte-imask"
  import Loader from "./icons/Loader.svelte"

  export let id = ""
  export let ref = ""
  export let value = ""
  export let required = undefined
  export let minLength = undefined
  export let maxLength = undefined
  export let name = ""
  export let pattern = undefined
  export let className = ""
  export let state = "disabled"
  export let placeholder = ""
  export let getFocus = false

  onMount(async () => {
    if (getFocus == true) {
      let selected = document.getElementById(id)
      setTimeout(() => {
        selected.focus()
      }, 10)
    }
  })
  const dispatch = createEventDispatcher()

  const phoneNumberOptions = {
    mask: " 000 000-00-00"
  }
  function onComplete({ detail: imask }) {
    value = imask.value
    dispatch("completed")
  }
  function onAccept({ detail: imask }) {
    value = imask.value
    dispatch("accept")
  }
  let buttonStyle
  let buttonText
  let buttonLoader = false
  let intervalId = undefined
  let focusElement = false
  const STATE = {
    DISABLED: "disabled",
    ACTIVE: "active",
    LOADING: "loading",
    TIMER: "timer"
  }

  $: if (state) {
    if (intervalId) {
      clearInterval(intervalId)
    }
    if (state === STATE.DISABLED) {
      buttonStyle = "text-gray-700 bg-gray-1000"
      buttonText = "Получить код"
      buttonLoader = false
    } else if (state === STATE.ACTIVE) {
      buttonStyle = "text-main bg-accent active"
      buttonText = "Получить код"
      buttonLoader = false
    } else if (state === STATE.LOADING) {
      buttonStyle = "text-white bg-info"
      buttonText = ""
      buttonLoader = true
    } else if (state === STATE.TIMER) {
      buttonStyle = "text-white bg-info"

      const minuteCountdown = new Date()
      minuteCountdown.setMinutes(new Date().getMinutes() + 1)
      const countDownDate = minuteCountdown.getTime()

      const now = new Date().getTime()
      const distance = countDownDate - now
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      let seconds = Math.floor((distance % (1000 * 60)) / 1000)
      if (minutes < 10) {
        minutes = "0" + minutes
      }
      if (seconds < 10) {
        seconds = "0" + seconds
      }
      buttonText = minutes + ":" + seconds

      intervalId = setInterval(() => {
        const now = new Date().getTime()
        const distance = countDownDate - now
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        let seconds = Math.floor((distance % (1000 * 60)) / 1000)
        if (minutes < 10) {
          minutes = "0" + minutes
        }
        if (seconds < 10) {
          seconds = "0" + seconds
        }
        buttonText = minutes + ":" + seconds
        if (distance < 0) {
          clearInterval(intervalId)
          buttonText = "00:00"
          state = STATE.ACTIVE
          dispatch("timer-ended")
        }
      }, 1000)

      buttonLoader = false
    }
  }

  onDestroy(() => {
    clearInterval(intervalId)
  })
</script>

<div class="{className} flex items-center rounded wrapper">
  <div class="text-main flex items-center rounded-l pr-4 pl-12 text-one-five conteiner">
    +7
  </div>
  <input
    use:imask={phoneNumberOptions}
    on:complete={onComplete}
    on:accept={onAccept}
    {id}
    {pattern}
    {name}
    {required}
    {placeholder}
    on:invalid
    {minLength}
    {maxLength}
    on:focus
    on:input
    value
    bind:this={ref}
    class="{className} placeholder-input
    leading-mid bg-white h-full text-main flex-1 text-one-five inputContain flex items-center"
    class:focusElement
    type="tel"
    on:focus={() => {
      focusElement = true
    }}
    on:blur={() => {
      focusElement = false
    }}
  />
  <button on:click class="{buttonStyle} rounded-r h-full">
    {#if buttonText}
      {buttonText}
    {:else if buttonLoader}
      <Loader width="29" height="29" classNames="fill-current mx-auto text-white spin" />
    {/if}
  </button>
</div>

<style>
  .active {
    font-weight: 600;
  }
  .wrapper {
    height: 44px;
  }
  .conteiner {
    z-index: 2;
    border: none;
  }
  .inputContain {
    border: 1px solid var(--gray-500);
    margin-left: -35px;
    padding-left: 37px;
    border-right: none;
    border-radius: 4px 0 0 4px;
  }
  .inputContain:active,
  .inputContain:focus {
    border: 1px solid var(--color-info-light);
    border-right: none;
  }
  button {
    width: 160px;
    font-size: 15px;
  }
  .focusElement {
    border-color: var(--color-info-light);
  }

  button :global(svg.spin) {
    animation-name: spin;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
