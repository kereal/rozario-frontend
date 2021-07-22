<script>
  import { onDestroy, onMount } from "svelte";
  import Loader from "./icons/Loader.svelte";
  import Button from "./Button.svelte";

  export let id = "";
  export let ref = "";
  export let value = "";
  export let required = undefined;
  export let minLength = undefined;
  export let maxLength = undefined;
  export let name = "";
  export let pattern = undefined;
  export let className = "";
  export let state = "disabled";
  export let placeholder = "";
  export let getFocus = false;
  export let newButtontext = '';

  onMount(async() => {
    if(getFocus) {
      let selected = document.getElementById(id)
      setTimeout(()=>{selected.focus();}, 10)
    }
  })
  let buttonStyle;
  let buttonText;
  let buttonLoader = false;
  let intervalId = undefined;

  const STATE = {
    DISABLED: "disabled",
    ACTIVE: "active",
    LOADING: "loading",
    TIMER: "timer"
  };

  $: if (state) {
    if (intervalId) {
      clearInterval(intervalId);
    }
    if (state === STATE.DISABLED) {
      buttonStyle = "text-gray-700 bg-gray-300";
      buttonText = "Получить код";
      buttonLoader = false;
    } else if (state === STATE.ACTIVE) {
      buttonStyle = "text-main bg-accent";
      buttonText = "Получить код";
      buttonLoader = false;
    } else if (state === STATE.LOADING) {
      buttonStyle = "text-white bg-info";
      buttonText = "";
      buttonLoader = true;
    } else if (state === STATE.TIMER) {
      buttonStyle = "text-white bg-info";

      const minuteCountdown = new Date();
      minuteCountdown.setMinutes(new Date().getMinutes() + 1);
      const countDownDate = minuteCountdown.getTime();

      const now = new Date().getTime();
      const distance = countDownDate - now;
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      buttonText = minutes + ":" + seconds;

      intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        buttonText = minutes + ":" + seconds;
        if (distance < 0) {
          clearInterval(intervalId);
          buttonText = "00:00";
          state = STATE.DISABLED;
        }
      }, 1000);

      buttonLoader = false;
    }
  }

  onDestroy(() => {
    clearInterval(intervalId);
  });
</script>

<style lang="postcss">
  div {
    height: 44px;
  }
  button {
    width: 160px;
    font-weight: 600;
  }
  .focusElement:focus {
    border-color: var(--color-info-light);
  }
  button :global(svg.spin) {
    animation-name: spin;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  input:required {
    @apply border-gray-500 outline-none shadow-none;
  }
  input:invalid {
    @apply border-gray-500 outline-none shadow-none;
  }
  input:disabled {
    @apply border-none bg-transparent;
  }
  input.error {
    @apply border-error outline-none shadow-none;
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

<div class="{className} flex items-center rounded">
  <input
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
    {value}
    bind:this={ref}
    class="{className} border-gray-500 placeholder-input border-t border-b border-l leading-mid bg-white h-full text-main flex-1 text-one-five rounded-l px-12 focusElement"
    type="email"/>

    {#if  newButtontext == ''}
    <button
            type="button"
            on:click
            class="{buttonStyle}
    {state === STATE.DISABLED ? 'cursor-default' : 'cursor-pointer'} rounded-r
    h-full"
            style="{newButtontext == ''? '':'width:auto; padding: 0 25px;'}">
      {#if buttonText}
        {buttonText}
      {:else if buttonLoader}
        <Loader
                width="29"
                height="29"
                classNames="fill-current mx-auto text-white spin" />
      {/if}
    </button>
    {:else}
    <Button status="{state === STATE.DISABLED ? 'disabled-main' : 'active-main'}"  size = 'md'>
      <span class="whitespace-no-wrap">{newButtontext}</span>
    </Button>
    {/if}
</div>
