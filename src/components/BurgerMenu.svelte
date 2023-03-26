<script>
  import { onMount, createEventDispatcher } from "svelte"
  import { mainStore } from "../stores/global.js"
  import Portal from "./Portal.svelte"
  import CustomDropdown from "./CustomDropdown.svelte"
  import InnerDropdown from "./InnerDropdown.svelte"
  import CountryDropdown from "./CountryDropdown.svelte"
  import Search from "./Search.svelte"
  import SignInModal from "./SignInModal.svelte"
  import { linear, cubicInOut, expoInOut } from "svelte/easing"

  export let buttonRef

  const dispatch = createEventDispatcher()

  let countries = [
    { name: "Английский", flag: "united-states-of-america", currency: "$" },
    { name: "Русский", flag: "russia", currency: "₽" }
  ]

  let currencyList = [
    { currency: "$", text: "dollar" },
    { currency: "₽", text: "rouble" },
    { currency: "€", text: "euro" }
  ]

  let searchVisible = false
  let signInModalVisible = false

  let menuElement
  let countriesDropdownElement
  let countriesDropdownButton
  let searchButton

  function nextCurrency(e) {
    let next = currencyList.shift()
    currencyList.push(next)
    currencyList = currencyList
    $mainStore.currentCurrency = currencyList[1]
  }
  function prevCurrency(e) {
    let prev = currencyList.pop()
    currencyList.unshift(prev)
    currencyList = currencyList
    $mainStore.currentCurrency = currencyList[1]
  }

  function nextCountry(e) {
    let next = countries.shift()
    countries.push(next)
    countries = countries
    $mainStore.currentCountry = countries[1]
  }
  function prevCountry(e) {
    let prev = countries.pop()
    countries.unshift(prev)
    countries = countries
    $mainStore.currentCountry = countries[1]
  }

  function selectCurrency(e) {
    if (e.target.dataset.index > 1) {
      nextCurrency()
    } else {
      prevCurrency()
    }
  }

  function slidetoleft(node, { duration = 400, delay = 0, easing = linear }) {
    return {
      delay,
      duration,
      easing,
      css: (t) => {
        return `
                right: ${-100 * (1 - t)}%;
              `
      }
    }
  }
  function closeMenu(e) {
    e.preventDefault()
    e.stopPropagation()
    if (buttonRef && buttonRef.contains(e.target)) {
      return
    }
    if (menuElement && !menuElement.contains(e.target)) {
      dispatch("close")
    }
  }
  let countriesDropdownVisible = false

  function toggleCountriesDropdown() {
    countriesDropdownVisible = !countriesDropdownVisible
  }
  function toggleSignInModal() {
    signInModalVisible = !signInModalVisible
  }
  function toggleSearch() {
    searchVisible = !searchVisible
  }
  function gotoFavorites() {
    if (!$mainStore.user.auth) {
      toggleSignInModal()
    }
  }
</script>

<svelte:body on:click={closeMenu} on:resize={closeMenu} />

<Portal>
  <div
    bind:this={menuElement}
    transition:slidetoleft={{ duration: 400, easing: expoInOut }}
    class="z-20 flex flex-col items-stretch rounded bg-white wrapper fixed px-24
    py-20 bg-white"
  >
    {#if $mainStore.favorites.length > 0}
      <button
        on:click={gotoFavorites}
        class="mb-16 flex items-center justify-center items-center"
      >
        <svg
          width={20}
          height={20}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 67.764 53.149"
          enable-background="new 0 0 67.764 53.149"
          xml:space="preserve"
          class="text-info fill-current mr-8"
        >
          <path
            d="M55.712,1.563C48.001-1.7,39.395,0.324,33.882,5.977C28.37,0.324,19.763-1.7,12.052,1.563
            C2.011,5.815-2.685,17.402,1.567,27.444c6.734,15.907,31.8,25.505,32.301,25.695c0,0.001,0.004,0.009,0.004,0.009
            s0.009-0.003,0.01-0.004c0.001,0,0.01,0.004,0.01,0.004s0.004-0.008,0.004-0.009c0.501-0.19,25.566-9.788,32.301-25.695
            C70.448,17.402,65.753,5.815,55.712,1.563z"
          />
        </svg>
        <span class="text-info">{$mainStore.favorites.length}</span>
      </button>
    {/if}

    <button
      bind:this={searchButton}
      class="mb-16 h-32 flex items-center border border-gray-500 rounded-full
      px-24 py-4 flex-shrink-0 justify-center"
      on:click={toggleSearch}
    >
      <div class="w-16 h-16">
        <img class="" src="/search.svg" alt="search" />
      </div>
    </button>

    <div class="relative mb-16" bind:this={countriesDropdownElement}>
      <button
        bind:this={countriesDropdownButton}
        on:click={() => (countriesDropdownVisible = !countriesDropdownVisible)}
        class="bg-white h-32 py-4 w-full relative flex-shrink-0 flex
        justify-center items-center border-gray-500 border rounded-full px-16"
      >
        <img
          class="mr-16 border border-gray-500"
          style="width: 1.5rem; height:1rem;"
          src="/{$mainStore.currentCountry.flag}-flag-icon-32.png"
          alt=""
        />
        <span class="text-main font-semibold">
          {$mainStore.currentCurrency.currency}
        </span>
      </button>
      {#if countriesDropdownVisible}
        <InnerDropdown
          bind:dropdownVisible={countriesDropdownVisible}
          on:close={toggleCountriesDropdown}
          css="width: 320px; max-height:400px;"
          buttonRef={countriesDropdownButton}
          relativeElement={countriesDropdownElement}
          position="LEFT"
        >
          <div class="px-32 py-24 bg-white">
            <div
              class="flex justify-between items-center w-full pb-16 border-b
              border-gray-300 mb-16"
            >
              <button on:click={prevCountry} class="w-24 h-24">
                <img src="/prev.svg" alt="<" />
              </button>
              <div class="flex mx-8 items-center">
                <img
                  width="24"
                  class="mr-8 border border-gray-500"
                  src="/{$mainStore.currentCountry.flag}-flag-icon-32.png"
                  alt=""
                />
                <span class="text-main font-bold">
                  {$mainStore.currentCountry.name}
                </span>
              </div>
              <button on:click={nextCountry} class="w-24 h-24">
                <img src="/next.svg" alt=">" />
              </button>
            </div>
            <ul class="flex w-full px-16 items-center justify-around">
              {#each currencyList as currency, i}
                <li class="mr-8 last:mb-0">
                  <div class="text-lg flex justify-between items-center">
                    {#if i === 1}
                      <span
                        class="inline-block text-main px-8 py-4 border
                        border-gray-700 rounded"
                      >
                        {currency.currency}
                      </span>
                    {:else}
                      <button
                        data-index={i}
                        on:click={selectCurrency}
                        class="inline-block text-gray-700 px-8 py-4"
                      >
                        {currency.currency}
                      </button>
                    {/if}
                  </div>
                </li>
              {/each}
            </ul>
          </div>
        </InnerDropdown>
      {/if}
    </div>
    <button
      on:click={toggleSignInModal}
      class="h-32 text-almostRegular border border-gray-500 text-main
      rounded-full px-16 py-4"
    >
      Войти
    </button>
  </div>
  {#if searchVisible}
    <Search buttonRef={searchButton} on:close={toggleSearch} />
  {/if}
  {#if signInModalVisible}
    <SignInModal on:close={toggleSignInModal} />
  {/if}
</Portal>

<style>
  .wrapper {
    width: 200px;
    top: 5rem;
    height: calc(100vh - 5rem);
    box-shadow: -20px 18px 20px 0px rgba(0, 0, 0, 0.25);
    right: 0;
  }
</style>
