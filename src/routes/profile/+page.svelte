<script>
  import { onMount, setContext } from "svelte"
  import { mainStore } from "@/stores/global"
  import { orderStore, addressStore } from "@/stores/order"
  import { page } from "$app/stores"
  import ScrollSpy from "@/utils/scrollSpy"
  import debounce from "lodash/debounce"
  import Tabbar from "@/components/Tabbar.svelte"
  import ActiveOrder from "@/components/ActiveOrder.svelte"
  import AsideNavigation from "@/components/AsideNavigation.svelte"
  import OrderStoryCard from "@/components/OrderStoryCard.svelte"
  import DeliveryAddressCard from "@/components/DeliveryAddressCard.svelte"
  import AddAddress from "@/components/AddAddress.svelte"
  import Button from "@/components/Button.svelte"

  export let data

  const activeOrders = data.activeOrders
  const deliveryAddresses = data.deliveryAddresses
  const orderStories = data.orderStories
  const cityMeta = data.cityMeta
  const recommendations = data.recommendations

  function removeAddress(id) {
    addressStore.removeAddress(id)
  }

  setContext("profile", {
    removeAddress
  })

  let addAddressVisible = false
  let currentMenuIndex = 0
  let ActiveOrderHeader
  let OrderHistoryHeader
  let DeliveryAddressesHeader
  let containerElement

  const photo = "flower-photo.png"

  const menulist = [
    { name: "Активные заказы", index: 0 },
    { name: "История заказов", index: 1 },
    { name: "Адреса доставок", index: 2 }
  ]

  const navlist = [
    { name: "Мои заказы", link: "/profile", active: true },
    { name: "Избранное", link: "/profile/favorites", active: false },
    { name: "Мои купоны", link: "/profile/coupons", active: false },
    { name: "Мои события", link: "/profile/events", active: false },
    { name: "Помощь", link: "/profile/help", active: false },
    { name: "Настройки", link: "/profile/settings", active: false },
    { name: "Бизнес-заказы", link: "/profile/business", active: false },
    { name: "Магазин", link: "/businessProfile", active: false },
    { name: "Игры", link: "/profile/games", active: false }
  ]

  let timeoutid

  function goToHeader(e) {
    const index = parseInt(e.detail.header)
    if (timeoutid) {
      clearTimeout(timeoutid)
    }
    scrollSpy.unblock()
    scrollSpy.block()
    window.scroll({
      top: scrollSpy._offsets[index] + 10,
      left: 0,
      behavior: "smooth"
    })
    timeoutid = setTimeout(() => {
      scrollSpy.unblock()
    }, 1000)
  }

  function toggleAddAddress() {
    addAddressVisible = !addAddressVisible
  }

  function addAddress(e) {
    toggleAddAddress()
    addressStore.addAddress({
      id: e.detail.id,
      recipient: {
        address: e.detail.address,
        name: e.detail.name,
        phone: e.detail.phone
      },
      isMain: e.detail.isMain,
      title: e.detail.title
    })
  }

  let headers

  let scrollSpy

  onMount(() => {
    headers = [ActiveOrderHeader, OrderHistoryHeader, DeliveryAddressesHeader]

    $mainStore.address.city = cityMeta
    $orderStore.activeOrderList = activeOrders
    $addressStore = deliveryAddresses

    scrollSpy = new ScrollSpy(window, headers)
    const setIndex = (e) => {
      console.log("set index")
      currentMenuIndex = e.detail.index
    }
    window.addEventListener("scrollspy-activate", setIndex)

    $mainStore.address.city = cityMeta
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2
    }

    const images = document.querySelectorAll("img[data-src]")

    function callback(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(callback, options)

    Array.from(images).forEach((image) => observer.observe(image))

    return () => {
      scrollSpy.destroy()
      window.removeEventListener("scrollspy-activate", setIndex)
      clearTimeout(timeoutid)
      images.forEach((image) => observer.unobserve(image))
      observer.disconnect()
    }
  })
</script>

<svelte:window
  on:resize={debounce(() => {
    scrollSpy.refresh()
  }, 100)}
/>

<svelte:head>
  <title>Профиль</title>
  <meta name="description" content="PROFILE_DESCRIPTION" />
  <link rel="canonical" href={$page.url.hostname + $page.url.pathname} />
  <link
    rel="alternate"
    href={$page.url.hostname + $page.url.pathname}
    type="text/html"
    hreflang="ru"
    title="Русский"
  />
  <link
    rel="alternate"
    href={$page.url.hostname + $page.url.pathname}
    type="text/html"
    hreflang="en"
    title="English"
  />
  <meta
    name="keywords"
    content="Доставка цветов в Мурманске, Цветы с доставкой в Мурманске,
    Заказать цветы с доставкой в Мурманске, "
  />
  <meta name="geo.region" content="" />
  <meta name="geo.position" content="" />
  <meta name="geo.placename" content="" />
  <meta name="ICBM" content="" />
  <meta name="referrer" content="always" />
  <meta
    property="og:title"
    content="Надежная доставка цветов в Мурманске — Розарио.Цветы"
  />
  <meta
    property="og:description"
    content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в
    Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или
    банковской картой."
  />
  <meta property="og:image" content="ruka3.jpg" />
  <meta property="og:url" content="url" />
  <meta property="og:site_name" content="Розарио.Цветы" />
  <meta property="og:type" content="website" />
  <meta
    name="twitter:title"
    content="Надежная доставка цветов в Мурманске — Розарио.Цветы"
  />
  <meta
    name="twitter:description"
    content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в
    Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или
    банковской картой."
  />
  <meta name="twitter:image" content="ruka3.jpg" />
  <meta name="twitter:image:alt" content="Розарио.Цветы" />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<div>
  <div class="flex justify-between">
    <div class="w-full">
      <Tabbar
        pos="top: 5rem;"
        className="sticky"
        on:change={goToHeader}
        {currentMenuIndex}
        {menulist}
      />
      <div
        bind:this={containerElement}
        class="wrapper box-content py-24 lg:py-34 flex flex-col border-b
        border-r border-l border-gray-300"
      >
        <h2
          data-scrollspy
          bind:this={ActiveOrderHeader}
          class="text-2xl font-bold text-main mb-24"
        >
          Активные заказы
        </h2>
        <ul>
          {#each activeOrders as order}
            <li>
              <ActiveOrder {photo} {...order} />
            </li>
          {/each}
        </ul>
        <h2
          data-scrollspy
          bind:this={OrderHistoryHeader}
          class="text-2xl font-bold text-main mb-24 mt-48"
        >
          История заказов
        </h2>
        <ul>
          {#each orderStories as order}
            <li>
              <OrderStoryCard {...order} />
            </li>
          {/each}
        </ul>
        <div class="flex justify-between items-center mb-24 mt-48">
          <h2
            data-scrollspy
            bind:this={DeliveryAddressesHeader}
            class="text-2xl font-bold text-main"
          >
            Адреса доставок
          </h2>
          <!-- <button
            on:click={toggleAddAddress}
            class="add-address-button flex items-center">
            <Icon
              name={Add}
              iconSize="14"
              classNames="fill-current text-main" />
            <span class="ml-8 text-main text-sm leading-mid">
              Добавить адрес
            </span>
          </button> -->
        </div>
        <ul class="-mr-40 flex flex-col lg:flex-row flex-wrap">
          {#each $addressStore as address, i}
            <li class="w-full lg:w-1/2 pr-40 pb-40">
              <DeliveryAddressCard
                index={i}
                title={address.title}
                isMainAddress={address.isMain}
                id={address.id}
                recipient={address.recipient}
              />
            </li>
          {/each}
        </ul>

        <Button
          className="-mt-6"
          size="full"
          textClass="text-base"
          on:click={toggleAddAddress}
        >
          Добавить адрес доставки
        </Button>
      </div>
    </div>
    <div class="aside-nav-container">
      <AsideNavigation {recommendations} {navlist} />
    </div>
  </div>
</div>

{#if addAddressVisible}
  <AddAddress on:add={addAddress} on:close={toggleAddAddress} />
{/if}

<style lang="postcss">
  .wrapper {
    margin-bottom: 10px;
    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%), #f2f2f2;
    padding-right: 44px;
    padding-left: 44px;
    padding-top: 48px;
    @apply rounded;
  }
  @media (max-width: 1300px) {
    .wrapper {
      padding-bottom: 34px;
      padding-top: 34px;
    }
  }
  @media (min-width: 1420px) {
    .wrapper {
      @apply px-80;
    }
  }
  @media (max-width: 1000px) {
    .wrapper {
      padding-top: 24px;
    }
  }
  .aside-nav-container {
    top: calc(5rem + 10px);
    flex: 0 0 310px;
    margin-left: 10px;
    margin-bottom: 10px;
    bottom: 10px;
    @apply sticky h-full;
  }
  .add-address-button:hover span {
    @apply text-info;
  }
  .add-address-button:hover > :global(svg) {
    @apply text-info;
  }
</style>
