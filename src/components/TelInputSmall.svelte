<script>
  import { createEventDispatcher, onMount } from "svelte"
  import { imask } from "svelte-imask"
  import { countryCodes } from "../data/countryCodes.js"

  import ArrowLeft from "./icons/ArrowLeft.svelte"

  export let id = ""
  export let ref = ""
  export let value = ""
  export let required = undefined
  export let minLength = undefined
  export let maxLength = undefined
  export let name = ""
  export let pattern = undefined
  export let className = ""

  let countryList
  let countrySelectButton
  let isInputFocused = false

  const dispatch = createEventDispatcher()

  let selectedCountry = countryCodes.find((country) => country.code === "RU")

  let visible = false

  function listKeyDown(e) {
    switch (e.key) {
      case "Enter":
        e.target.click()
        break
      case "Escape":
        visible = false
        break
      case "Tab":
        visible = false
        break
      case "ArrowDown":
        if (selectedCountry.element.nextElementSibling) {
          selectedCountry.element.tabIndex = -1
          selectedCountry.element = selectedCountry.element.nextElementSibling
          setTimeout(() => selectedCountry.element.focus(), 0)
          selectedCountry.element.tabIndex = 0
        } else if (countryList.firstChild) {
          selectedCountry.element.tabIndex = -1
          selectedCountry.element = countryList.firstChild
          setTimeout(() => selectedCountry.element.focus(), 0)
          selectedCountry.element.tabIndex = 0
        }
        break
      case "ArrowUp":
        if (selectedCountry.element.previousElementSibling) {
          selectedCountry.element.tabIndex = -1
          selectedCountry.element = selectedCountry.element.previousElementSibling
          setTimeout(() => selectedCountry.element.focus(), 0)
          selectedCountry.element.tabIndex = 0
        } else if (countryList.lastChild) {
          selectedCountry.element.tabIndex = -1
          selectedCountry.element = countryList.lastChild
          setTimeout(() => selectedCountry.element.focus(), 0)
          selectedCountry.element.tabIndex = 0
        }
    }
  }

  const phoneNumberOptions = {
    mask: "000 000 00 00 00"
  }

  function handleFocus() {
    isInputFocused = true
    if (visible) {
      visible = false
    }
  }
  function handleBlur() {
    isInputFocused = false
  }

  function onAccept({ detail: imask }) {
    value = selectedCountry.dial + " " + imask.value
  }

  function handleFocusIn() {
    dispatch("focus")
  }

  onMount(() => {
    if (value === "") {
      value = `${selectedCountry.dial}`
    }
    selectedCountry.element = document.querySelector('.tel-input ul li[tabindex="0"]')
  })
</script>

<svelte:window
  on:click={(e) => {
    if (
      (countryList && countryList.contains(e.target)) ||
      countrySelectButton.contains(e.target)
    ) {
      return
    }
    visible = false
  }}
/>

<div
  on:focusin={handleFocusIn}
  class="tel-input flex relative items-center rounded {className}"
>
  <button
    type="button"
    bind:this={countrySelectButton}
    class="flex justify-between bg-white rounded border border-gray-500 h-full
    pl-12 pr-12 mr-8 cursor-pointer items-center"
    on:click={() => {
      visible = !visible
      setTimeout(() => selectedCountry.element.focus(), 0)
    }}
  >
    <span class="mr-8">
      <i class="align-baseline mr-4 fflag ff-md fflag-{selectedCountry.code}" />
    </span>
    <ArrowLeft
      width="10"
      height="10"
      classNames="arrow fill-current {visible ? 'text-main' : 'text-gray-700'}"
    />
  </button>
  <div
    class="input-wrapper {isInputFocused
      ? 'focus'
      : ''} bg-white flex w-full border h-full
    border-gray-500 rounded"
  >
    <span class="flex items-center pl-12 mr-4 text-main h-full text-one-five">
      {selectedCountry.dial}
    </span>
    <input
      use:imask={phoneNumberOptions}
      on:accept={onAccept}
      {id}
      {pattern}
      {name}
      {required}
      on:invalid
      {minLength}
      {maxLength}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:input
      value
      bind:this={ref}
      class="placeholder-input bg-transparent tel-phone-sm flex-1 rounded h-full border border-transparent text-main text-one-five pr-12"
      type="tel"
    />
  </div>
  <ul
    bind:this={countryList}
    class:visible
    class="custom-scrollbar border border-gray-300 rounded z-10 bg-white w-full
    overflow-auto absolute hidden"
  >
    {#each countryCodes as country (country.code)}
      <li
        on:keydown={listKeyDown}
        class="hover:bg-gray-200 py-8 flex items-start px-12 cursor-pointer"
        tabindex={selectedCountry.code === country.code ? 0 : -1}
        on:click={(e) => {
          selectedCountry = countryCodes.find((cc) => cc.code === country.code)
          selectedCountry.element = e.target.closest("li")
          value = `${selectedCountry.dial}`
          visible = !visible
          value = ""
          ref.focus()
        }}
      >
        <i class="mt-4 fflag ff-md fflag-{country.code} mr-8" />
        <span class="text-one-five text-main leading-mid mr-10">
          {country.nameRus}
        </span>
        <span class="text-one-five text-gray-600 leading-mid">
          {country.dial}
        </span>
      </li>
    {/each}
  </ul>
</div>

<style lang="postcss">
  button {
    min-width: 68px;
  }
  .tel-input {
    height: 35px;
  }
  .visible {
    display: block;
    top: 2.2rem;
    left: 0;
  }
  .not-allowed {
    color: rgba(51, 0, 51, 0.3);
  }
  ul {
    height: 142px;
  }
  li {
    min-height: 35px;
    @apply outline-none;
  }
  li:focus {
    @apply bg-gray-200;
  }
  .tel-input :global(.arrow) {
    transform: rotate(270deg);
    transform-origin: center center;
  }
  input {
    min-width: 0;
  }
  input:invalid {
    @apply shadow-none outline-none;
  }
  .input-wrapper.focus {
    @apply border-infolight;
  }
  .input-wrapper.error {
    @apply border-error;
  }
  .tel-input :global(input.error) {
    @apply border-error;
  }
  input:focus {
    @apply outline-none;
  }
</style>
