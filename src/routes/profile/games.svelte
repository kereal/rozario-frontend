<script context="module">
  export async function preload(page, session) {
    try {
      const res = await this.fetch(`index.json?city=${page.host[0]}&path=${page.path}`)
      const json = await res.json()
      return {
        slug: page.slug,
        path: page.path,
        categories: json.catalog,
        cityMeta: json.cityMeta,
        activeOrders: json.activeOrders,
        deliveryAddresses: json.deliveryAddresses,
        orderStories: json.orderStories,
        recommendations: json.recommendations
      }
    } catch (e) {
      console.log(e)
    }
  }
</script>

<script>
  import { onMount, setContext } from "svelte"
  import { mainStore } from "../../stores/global.js"
  import { orderStore, addressStore } from "../../stores/order.js"
  import AsideNavigation from "../../components/AsideNavigation.svelte"
  import Tabbar from "../../components/Tabbar.svelte"
  import ScrollSpy from "../../utils/scrollSpy.js"

  import { page } from "$app/stores"

  export let activeOrders
  export let deliveryAddresses
  export let orderStories
  export let cityMeta
  let timeoutid
  let headers
  let scrollSpy
  let roulette
  let puzzle
  function removeAddress(id) {
    addressStore.removeAddress(id)
  }
  let currentMenuIndex = 0

  const menulist = [
    { name: "Рулетка", index: 0 },
    { name: "Пазл", index: 1 }
  ]

  function goToHeader(e) {
    const index = parseInt(e.detail.header)
    if (timeoutid) {
      clearTimeout(timeoutid)
    }
    scrollSpy.unblock()
    scrollSpy.block()
    window.scroll({
      top: scrollSpy._offsets[index],
      left: 0,
      behavior: "smooth"
    })
    timeoutid = setTimeout(() => {
      scrollSpy.unblock()
    }, 1000)
  }

  setContext("profile", {
    removeAddress
  })

  const navlist = [
    { name: "Мои заказы", link: "profile", active: false },
    { name: "Избранное", link: "profile/favorites", active: false },
    { name: "Мои купоны", link: "profile/coupons", active: false },
    { name: "Мои события", link: "profile/events", active: false },
    { name: "Помощь", link: "profile/help", active: false },
    { name: "Настройки", link: "profile/settings", active: false },
    { name: "Игры", link: "profile/games", active: true }
  ]

  onMount(async () => {
    headers = [roulette, puzzle]
    scrollSpy = new ScrollSpy(window, headers)
    const setIndex = (e) => {
      currentMenuIndex = e.detail.index
    }
  })
</script>

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

<div class="flex justify-between">
  <div class="wrapper w-full">
    <Tabbar
      pos="top: 5rem;"
      className="sticky"
      on:change={goToHeader}
      {currentMenuIndex}
      {menulist}
    />

    <div class="content">
      <div data-scrollspy bind:this={roulette}>
        <h2>Рулетка</h2>
        <a href="/roulette"> Рулетка</a>
      </div>
      <div data-scrollspy bind:this={puzzle}>
        <h2>Пазл</h2>
        <a href="/404"> Пазл</a>
      </div>
    </div>
  </div>
  <div>
    <div class="aside-nav-container">
      <AsideNavigation {navlist} />
    </div>
  </div>
</div>

<style lang="postcss">
  .wrapper {
    margin-bottom: 10px;
    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%), #f2f2f2;
    @apply rounded;
  }
  .content {
    padding-right: 80px;
    padding-left: 80px;
    padding-top: 48px;
    border: 1px solid var(--gray-300);
    border-top: none;
  }
  .aside-nav-container {
    top: calc(5rem + 10px);
    flex: 0 0 310px;
    margin-left: 10px;
    margin-bottom: 10px;
    bottom: 10px;
    @apply sticky h-full;
  }
  h2 {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 18px;
    margin-top: 34px;
  }
</style>
