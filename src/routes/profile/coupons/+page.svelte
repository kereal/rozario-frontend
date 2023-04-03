<script>
  import { onMount, setContext } from "svelte"
  import { page } from "$app/stores"
  import debounce from "lodash/debounce"
  import ScrollSpy from "@/utils/scrollSpy"
  import Tabbar from "@/components/Tabbar.svelte"
  import AsideNavigation from "@/components/AsideNavigation.svelte"
  import ActvieCoupons from "@/components/ActvieCoupons.svelte"
  import NonActvieCoupons from "@/components/NonActvieCoupons.svelte"
  import CouponRules from "@/components/CouponRules.svelte"
  import CouponTypes from "@/components/CouponTypes.svelte"
  import ShareLinkModal from "@/components/ShareLinkModal.svelte"

  export let data

  const activeOrders = data.activeOrders
  const deliveryAddresses = data.deliveryAddresses
  const orderStories = data.orderStories
  const cityMeta = data.cityMeta
  const recommendations = data.recommendations

  setContext("profile/coupons", {})

  let addAddressVisible = false
  let currentMenuIndex = 0
  let ActiveCouponsHeader
  let NonActiveCouponsHeader
  let CouponRulesHeader
  let CouponTypesHeader
  let containerElement
  let showShareLinkModal = false
  const menulist = [
    { name: "Активные купоны", index: 0 },
    { name: "Неактивные купоны", index: 1 },
    { name: "Как применить купон", index: 2 },
    { name: "Виды купонов", index: 3 }
  ]
  const navlist = [
    { name: "Мои заказы", link: "/profile", active: false },
    { name: "Избранное", link: "/profile/favorites", active: false },
    { name: "Мои купоны", link: "/profile/coupons", active: true },
    { name: "Мои события", link: "/profile/events", active: false },
    { name: "Помощь", link: "/profile/help", active: false },
    { name: "Настройки", link: "/profile/settings", active: false },
    { name: "Игры", link: "/profile/games", active: false }
  ]
  let timeoutid

  const toggleShareLinkModal = (value) => {
    showShareLinkModal = value
  }

  function goToHeader(e) {
    const index = parseInt(e.detail.header)
    if (timeoutid) {
      clearTimeout(timeoutid)
    }
    scrollSpy.unblock()
    scrollSpy.block()
    window.scroll({
      top: scrollSpy._offsets[index] - scrollSpy._offsets[0],
      left: 0,
      behavior: "smooth"
    })
    timeoutid = setTimeout(() => {
      scrollSpy.unblock()
    }, 1000)
  }

  let headers

  let scrollSpy

  onMount(() => {
    headers = [
      ActiveCouponsHeader,
      NonActiveCouponsHeader,
      CouponRulesHeader,
      CouponTypesHeader
    ]
    scrollSpy = new ScrollSpy(window, headers)
    const setIndex = (e) => {
      currentMenuIndex = e.detail.index
    }
    window.addEventListener("scrollspy-activate", setIndex)
    return () => {
      scrollSpy.destroy()
      window.removeEventListener("scrollspy-activate", setIndex)
      clearTimeout(timeoutid)
    }
  })
</script>

<svelte:window
  on:resize={debounce(() => {
    scrollSpy.refresh()
  }, 100)}
/>

<svelte:head>
  <title>Профиль - Купоны</title>
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
    content="Доставка цветов в Мурманске, Цветы с доставкой в Мурманске, Заказать цветы с доставкой в Мурманске, "
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
    content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или банковской картой."
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
    content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или банковской картой."
  />
  <meta name="twitter:image" content="ruka3.jpg" />
  <meta name="twitter:image:alt" content="Розарио.Цветы" />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<div>
  <div class="flex justify-between">
    <div class="coupons-wrapper">
      <Tabbar
        pos="top: 5rem;"
        className="sticky"
        on:change={goToHeader}
        {currentMenuIndex}
        {menulist}
      />
      <div
        bind:this={containerElement}
        class="wrapper box-content py-24 lg:py-34 flex flex-col border-b border-r border-l border-gray-300"
      >
        <section class="coupon__active-coupons">
          <div data-scrollspy bind:this={ActiveCouponsHeader} />
          <ActvieCoupons />
        </section>
        <section class="coupon__non-active-coupons">
          <h2 data-scrollspy bind:this={NonActiveCouponsHeader} class="coupon__heading">
            Неактивные купоны
          </h2>
          <p class="coupon__text">Получите больше купонов!</p>
          <NonActvieCoupons toggleModal={toggleShareLinkModal} />
        </section>
        <h2
          data-scrollspy
          bind:this={CouponRulesHeader}
          class="coupon__heading coupon__heading--rules"
        >
          Правила использования купонов
        </h2>
        <CouponRules />
        <h2 data-scrollspy bind:this={CouponTypesHeader} class="coupon__heading">
          Виды купонов
        </h2>
        <CouponTypes />
      </div>
    </div>
    <div class="aside-nav-container">
      <AsideNavigation {recommendations} {navlist} />
    </div>
  </div>
</div>

<ShareLinkModal showModal={showShareLinkModal} toggleModal={toggleShareLinkModal} />

<style lang="postcss">
  .wrapper {
    margin-bottom: 10px;
    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%), #f2f2f2;
    padding-right: 80px;
    padding-left: 80px;
    border-radius: 0 0 4px 4px;
  }

  @media (max-width: 1300px) {
    .wrapper {
      @apply px-44;
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
