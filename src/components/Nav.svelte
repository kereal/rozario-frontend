<script>
  import { onMount, afterUpdate, beforeUpdate } from "svelte"
  import { goto } from "$app/navigation"
  import { mainStore } from "@/stores/global"
  import AutoComplete from "@/components/AutoComplete.svelte"
  import CustomDropdown from "@/components/CustomDropdown.svelte"
  import MapModal from "@/components/MapModal.svelte"
  import SignInModalNew from "@/components/SignInModalNew.svelte"
  import Search from "@/components/Search.svelte"
  import CountryDropdown from "@/components/CountryDropdown.svelte"
  import BurgerMenu from "@/components/BurgerMenu.svelte"
  import HelpDrawer from "@/components/HelpDrawer.svelte"
  import ShoppingCart from "@/components/icons/ShoppingCart.svelte"

  export let session = {}
  export let countries = []
  export let cityList = []
  export let orderStore = {}

  const navItems = [{ name: "Доставка", addr: "delivery" }]
  let screen = ""
  let header
  let cityInput
  let cityDropdown
  let burgerButton
  let searchButton
  let helpDrawerButton
  let citySelectionButton
  let burgerDropdownVisible = false
  let cityDropdownVisible = false
  let mapModalVisible = false
  let signInModalVisible = false
  let searchVisible = false
  let helpDrawerVisible = false
  let burgerIcon
  export let className = ""

  async function selectCity(e) {
    mainStore.setAddressByName(e.detail.inputValue)
    localStorage.setItem("selected_city", e.detail.inputValue)
    cityInput = ""
    $mainStore.address.street = ""
    cityDropdownVisible = false
    if (citySelectionButton)
      citySelectionButton.classList.remove("city-dropdown-button-active")
    // TODO: редирект на поддомен
    // const url = new URL(window.location.href)
    // let host = url.hostname.split(".")
    // if (host.length > 1) {
    //   host = r.subdomain + "." + host[host.length - 1]
    // } else {
    //   host = r.subdomain + "." + url.hostname
    // }
    // url.host = host
    // goto(url.href)
  }

  function showCityDropdown() {
    if (citySelectionButton) {
      if (!cityDropdownVisible) {
        citySelectionButton.classList.add("city-dropdown-button-active")
        cityList = cityList.slice()
        cityDropdownVisible = true
      } else {
        citySelectionButton.classList.remove("city-dropdown-button-active")
        cityList = cityList.slice()
        cityDropdownVisible = false
      }
    }
  }

  function openMapModal() {
    mapModalVisible = true
  }
  function closeMapModal() {
    mapModalVisible = false
  }
  function openSignInModal() {
    signInModalVisible = true
  }
  function closeSignInModal() {
    signInModalVisible = false
  }

  function openSearch() {
    searchVisible = true
  }
  function closeSearch() {
    searchVisible = false
  }

  function toggleSearch() {
    searchVisible = !searchVisible
  }

  function toggleHelpDrawer() {
    helpDrawerVisible = !helpDrawerVisible
    if (document.getElementById("search-page")) {
      helpDrawerVisible = false
    }
  }
  function toggleBurgerDropdown() {
    burgerDropdownVisible = !burgerDropdownVisible
  }

  function gotoFavorites() {
    if (!$mainStore.user.auth) {
      openSignInModal()
    }
  }

  function handleResize() {
    if (window) {
      if (window.innerWidth > 1280) {
        screen = "desktop"
      } else {
        screen = "mobile"
      }
    }
  }

  function closeBurger() {
    burgerDropdownVisible = false
  }

  beforeUpdate(() => {
    if (window.innerWidth > 1280) {
      screen = "desktop"
    } else {
      screen = "mobile"
    }
  })

  onMount(async () => {
    // const aCollections = document.getElementById("collections")
    // goToCollections = () => {
    //   // aCollections.scrollIntoView({alignToTop: true, behavior: 'smooth'})
    //   scrollToSmoothly(aCollections.offsetTop - 140, 10)
    // }
  })

  afterUpdate(() => {
    if (cityDropdownVisible === false && citySelectionButton) {
      citySelectionButton.classList.remove("city-dropdown-button-active")
    }
  })
</script>

<svelte:window on:resize={handleResize} />

<header
  bind:this={header}
  id="header"
  class="{className} sticky-header mx-auto w-full border-b border-pale"
>
  <div
    class="header-wrapper h-full mx-auto px-40 w-full flex justify-between
    items-center"
  >
    <a
      href="/"
      style="width:211px;height:28px;"
      class="flex-shrink-0 font-bold text-main text-xl mr-16 xl:mr-32"
    >
      <img class="w-full h-full" src="/logo.svg" alt="Розарио Цветы" />
    </a>
    <nav class="flex-1 flex justify-center">
      <ul class="flex items-center">
        <li class="cursor-pointer hover:text-gray-700 text-main mr-16 xl:mr-32 last:mr-0">
          <span><a href="/#mainCollection">Коллекции</a></span>
        </li>
        {#each navItems as item}
          <li class="text-main hover:text-gray-700 mr-16 xl:mr-32 last:mr-0">
            <a href={item.addr}>{item.name}</a>
          </li>
        {/each}
        <li
          bind:this={helpDrawerButton}
          on:click={toggleHelpDrawer}
          class="cursor-pointer hover:text-gray-700 text-main mr-16 xl:mr-32 last:mr-0"
        >
          <span>Помощь</span>
        </li>
        <li class="cursor-pointer hover:text-gray-700 text-main mr-16 xl:mr-32 last:mr-0">
          <span><a href="/profile">Профиль</a></span>
        </li>
      </ul>
    </nav>

    <div class="flex items-center ml-32">
      {#if $mainStore.favorites.length > 0}
        <button
          aria-label="favorites"
          on:click={gotoFavorites}
          class="hidden mr-16 lg:flex flex-shrink-0 items-center"
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
        aria-label="search"
        bind:this={searchButton}
        class="hidden w-24 h-24 lg:flex items-center flex-shrink-0
        justify-center mr-16"
        on:click={toggleSearch}
      >
        <img width="16" height="16" src="/search.svg" alt="search" />
      </button>

      <div class="hidden lg:block">
        <CountryDropdown position="CENTER" css="width: 320px;max-height:400px;" />
      </div>

      <div class="bg-accent rounded-full h-32 text-main flex items-center mr-16">
        <div
          class="leading-none flex border border-gray-500 bg-white flex-1
          h-32 {$orderStore.orderList.length ? 'rounded-l-full' : 'rounded-full'}
          py-4 px-16"
        >
          <button class="flex items-center" on:click={openMapModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-8"
              width="24"
              height="24"
              viewBox="0 0 32 32"
              xml:space="preserve"
            >
              <polygon
                fill="#666666"
                points="5.329,15.44 26.672,5.268 16.621,26.732 15.379,16.806 "
              />
            </svg>
            {#if $mainStore.address.street}
              <span class="text-main text-sm leading-none truncate">
                {$mainStore.address.street}
              </span>
            {:else}
              <span class="text-gray-700 text-sm leading-none truncate">
                Укажите адрес доставки...
              </span>
            {/if}
          </button>
        </div>
        <a
          href="/cart"
          class="{$orderStore.orderList.length ? 'block' : 'hidden'}
          flex items-center rounded-full pl-8 pr-16 py-4"
        >
          <ShoppingCart classNames="fill-current text-main" iconSize="16" />
          <span class="ml-6 text-sm">{$orderStore.totalPrice}</span>
        </a>
      </div>

      <div bind:this={cityDropdown} class="outline-none relative mr-16">
        <button
          aria-label="city"
          data-cy="city-select-button"
          bind:this={citySelectionButton}
          on:click={showCityDropdown}
          class="leading-none text-sm text-main outline-none border
          border-gray-500 bg-white flex-1 h-32 rounded-full py-4 px-16"
        >
          <span>{$mainStore.address.city.name}</span>
        </button>
        {#if cityDropdownVisible}
          <CustomDropdown
            bind:dropdownVisible={cityDropdownVisible}
            buttonRef={citySelectionButton}
            css="width: 320px;max-height:360px"
            relativeElement={citySelectionButton}
            position="RIGHT"
          >
            <AutoComplete
              on:finish={selectCity}
              bind:inputValue={cityInput}
              className="rounded flex-1 py-12 pr-12 pl-34"
              data={cityList}
            />
          </CustomDropdown>
        {/if}
      </div>
      {#if session}
        {#if !session.loggedin}
          <button
            on:click={openSignInModal}
            class="hidden leading-none lg:inline-block h-32 text-sm
            border border-gray-500 text-main rounded-full px-16 py-4"
          >
            Войти
          </button>
        {:else}
          <a
            href={`/profile?user=${session.user.email}`}
            class="hidden leading-none lg:inline-block h-32 text-sm
            border border-gray-500 text-main rounded-full px-16 py-4"
          >
            Профиль
          </a>
        {/if}
      {/if}
    </div>
    <button
      aria-label="burger-menu"
      on:click={toggleBurgerDropdown}
      bind:this={burgerButton}
      class="lg:hidden w-24 h-24"
    >
      <svg
        bind:this={burgerIcon}
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg>
    </button>
    {#if burgerDropdownVisible}
      <BurgerMenu
        on:openSearch={openSearch}
        on:openModal={openSignInModal}
        buttonRef={burgerButton}
        on:close={closeBurger}
      />
    {/if}
    {#if helpDrawerVisible}
      <HelpDrawer buttonRef={helpDrawerButton} on:close={toggleHelpDrawer} />
    {/if}
  </div>
  {#if mapModalVisible}
    <MapModal {session} on:close={closeMapModal} />
  {/if}
  {#if signInModalVisible}
    <SignInModalNew {session} on:close={closeSignInModal} />
  {/if}
  {#if searchVisible}
    <Search buttonRef={searchButton} on:close={closeSearch} />
  {/if}
</header>

<style lang="postcss">
  header {
    flex: 0 0 5rem;
    height: 5rem;
  }
  .header-wrapper {
    max-width: var(--max-content-width);
  }
  .sticky-header {
    @apply bg-white z-30 w-full top-0 fixed;
  }
  .city-dropdown {
    width: 320px;
    @apply flex flex-col flex-nowrap;
  }
  .image-box {
    @apply w-24 h-24;
  }
  header :global(.city-dropdown-button-active) {
    background-color: var(--gray-200);
  }
</style>
