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
  import { onMount, afterUpdate, setContext } from "svelte"
  import Tabbar from "../../components/Tabbar.svelte"
  import AsideNavigation from "../../components/AsideNavigation.svelte"
  import ScrollSpy from "../../utils/scrollSpy.js"
  import throttle from "lodash/throttle"
  import debounce from "lodash/debounce"
  import FavoriteCard from "../../components/FavoriteCard.svelte"
  import DeleteFavoriteModal from "../../components/DeleteFavoriteModal.svelte"

  import { page } from "$app/stores"

  export let activeOrders
  export let deliveryAddresses
  export let orderStories
  export let cityMeta
  export let recommendations

  export let favoriteBouquets = [
    {
      img: "favorite-card",
      title: "Настоящая Любовь",
      time: 'Доставим в течение <span class="text-main">120</span> мин',
      price: { sale: 3456, full: 3456 },
      rating: "4,5",
      size: { text: "Размеры", width: 50, height: 50 },
      description: "Описание состава",
      like: true
    },
    {
      img: "favorite-card",
      title: "Настоящая Любовь",
      time: 'Доставим в течение <span class="text-main">120</span> мин',
      price: { sale: 3456, full: 3456 },
      rating: "4,5",
      size: { text: "Размеры", width: 50, height: 50 },
      description: "Описание состава",
      like: true
    },
    {
      img: "favorite-card",
      title: "Настоящая Любовь",
      time: 'Доставим в течение <span class="text-main">120</span> мин',
      price: { sale: 3456, full: 3456 },
      rating: "4,5",
      size: { text: "Размеры", width: 50, height: 50 },
      description: "Описание состава",
      like: true
    },
    {
      img: "favorite-card",
      title: "Настоящая Любовь",
      time: 'Доставим в течение <span class="text-main">120</span> мин',
      price: { sale: 3456, full: 3456 },
      rating: "4,5",
      size: { text: "Размеры", width: 50, height: 50 },
      description: "Описание состава",
      like: true
    },
    {
      img: "favorite-card",
      title: "Настоящая Любовь",
      time: 'Доставим в течение <span class="text-main">120</span> мин',
      price: { sale: 3456, full: 3456 },
      rating: "4,5",
      size: { text: "Размеры", width: 50, height: 50 },
      description: "Описание состава",
      like: true
    }
  ]

  export let favoriteGifts = [
    {
      img: "favorite-card",
      title: "Настоящая Любовь",
      time: 'Доставим в течение <span class="text-main">120</span> мин',
      price: { sale: 3456, full: 3456 },
      rating: "4,5",
      size: { text: "Размеры", width: 50, height: 50 },
      description: "Описание состава",
      like: true
    },
    {
      img: "favorite-card",
      title: "Настоящая Любовь",
      time: 'Доставим в течение <span class="text-main">120</span> мин',
      price: { sale: 3456, full: 3456 },
      rating: "4,5",
      size: { text: "Размеры", width: 50, height: 50 },
      description: "Описание состава",
      like: true
    },
    {
      img: "favorite-card",
      title: "Настоящая Любовь",
      time: 'Доставим в течение <span class="text-main">120</span> мин',
      price: { sale: 3456, full: 3456 },
      rating: "4,5",
      size: { text: "Размеры", width: 50, height: 50 },
      description: "Описание состава",
      like: true
    }
  ]

  export let recentlyViewed = [
    {
      img: "favorite-card",
      title: "Настоящая Любовь",
      time: 'Доставим в течение <span class="text-main">120</span> мин',
      price: { sale: 3456, full: 3456 },
      rating: "4,5",
      size: { text: "Размеры", width: 50, height: 50 },
      description: "Описание состава",
      like: false
    },
    {
      img: "favorite-card",
      title: "Настоящая Любовь",
      time: 'Доставим в течение <span class="text-main">120</span> мин',
      price: { sale: 3456, full: 3456 },
      rating: "4,5",
      size: { text: "Размеры", width: 50, height: 50 },
      description: "Описание состава",
      like: false
    },
    {
      img: "favorite-card",
      title: "Настоящая Любовь",
      time: 'Доставим в течение <span class="text-main">120</span> мин',
      price: { sale: 3456, full: 3456 },
      rating: "4,5",
      size: { text: "Размеры", width: 50, height: 50 },
      description: "Описание состава",
      like: true
    },
    {
      img: "favorite-card",
      title: "Настоящая Любовь",
      time: 'Доставим в течение <span class="text-main">120</span> мин',
      price: { sale: 3456, full: 3456 },
      rating: "4,5",
      size: { text: "Размеры", width: 50, height: 50 },
      description: "Описание состава",
      like: true
    },
    {
      img: "favorite-card",
      title: "Настоящая Любовь",
      time: 'Доставим в течение <span class="text-main">120</span> мин',
      price: { sale: 3456, full: 3456 },
      rating: "4,5",
      size: { text: "Размеры", width: 50, height: 50 },
      description: "Описание состава",
      like: false
    },
    {
      img: "favorite-card",
      title: "Настоящая Любовь",
      time: 'Доставим в течение <span class="text-main">120</span> мин',
      price: { sale: 3456, full: 3456 },
      rating: "4,5",
      size: { text: "Размеры", width: 50, height: 50 },
      description: "Описание состава",
      like: false
    }
  ]

  setContext("profile/favorites", {})

  let addAddressVisible = false
  let currentMenuIndex = 0
  let FavoriteBouquetsHeader
  let FavoriteGiftsHeader
  let containerElement
  const menulist = [
    { name: "Избранные букеты", index: 0 },
    { name: "Избранные подарки", index: 1 }
  ]
  const navlist = [
    { name: "Мои заказы", link: "profile", active: false },
    { name: "Избранное", link: "profile/favorites", active: true },
    { name: "Мои купоны", link: "profile/coupons", active: false },
    { name: "Мои события", link: "profile/events", active: false },
    { name: "Помощь", link: "profile/help", active: false },
    { name: "Настройки", link: "profile/settings", active: false },
    { name: "Игры", link: "profile/games", active: false }
  ]
  let timeoutid
  let showBouquetDeleteModal = false
  let showGiftDeleteModal = false
  let cardToDeleteIndex = null
  let cardDeleted = false

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
    headers = [FavoriteBouquetsHeader, FavoriteGiftsHeader]
    scrollSpy = new ScrollSpy(window, headers)
    const setIndex = (e) => {
      currentMenuIndex = e.detail.index
    }
    window.addEventListener("scrollspy-activate", setIndex)

    const images = document.querySelectorAll("img[data-src]")
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2
    }

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
    }
  })

  afterUpdate(() => {
    const setIndex = (e) => {
      currentMenuIndex = e.detail.index
    }
    scrollSpy.destroy()
    window.removeEventListener("scrollspy-activate", setIndex)
    clearTimeout(timeoutid)

    headers = [FavoriteBouquetsHeader, FavoriteGiftsHeader]
    scrollSpy = new ScrollSpy(window, headers)
    window.addEventListener("scrollspy-activate", setIndex)
  })

  const toggleBouquetDeleteModal = (value, index) => {
    if (value) {
      cardDeleted = false
    }
    showBouquetDeleteModal = value
    cardToDeleteIndex = index
  }

  const toggleGiftDeleteModal = (value, index) => {
    if (value) {
      cardDeleted = false
    }
    showGiftDeleteModal = value
    cardToDeleteIndex = index
  }

  const toggleRecentlyViewedHeart = (index) => {
    let copyArray = [...recentlyViewed]
    copyArray[index].like = !copyArray[index].like
    recentlyViewed = copyArray
  }

  const deleteBouquet = () => {
    let copyArray = [...favoriteBouquets]
    copyArray.splice(cardToDeleteIndex, 1)
    favoriteBouquets = copyArray
    cardDeleted = true
  }

  const deleteGift = () => {
    let copyArray = [...favoriteGifts]
    copyArray.splice(cardToDeleteIndex, 1)
    favoriteGifts = copyArray
    cardDeleted = true
  }
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
        class="favorites wrapper box-content flex flex-col border-b border-r border-l border-gray-300"
      >
        <h2
          data-scrollspy
          bind:this={FavoriteBouquetsHeader}
          class="favorites__heading font-bold text-main flex items-center"
        >
          Избранные букеты {#if favoriteBouquets.length > 0}<span
              class="block text-gray-700 text-lg font-normal"
              >({favoriteBouquets.length})</span
            >{/if}
        </h2>
        {#if favoriteBouquets.length > 0}
          <section class="favorites__items flex flex-wrap">
            {#each favoriteBouquets as bouquet, i}
              <FavoriteCard
                recommendation={bouquet}
                onHeartClick={(value) => toggleBouquetDeleteModal(value, i)}
              />
            {/each}
          </section>
        {:else}
          <section class="favorites__empty">
            <p class="favorites__text">
              Понравился букет? Добавь его в избранное, чтобы вернуться к нему в любой
              момент
            </p>
            <a href="/" class="favorites__button">Перейти в каталог</a>
          </section>
        {/if}
        <h2
          data-scrollspy
          bind:this={FavoriteGiftsHeader}
          class="favorites__heading favorites__heading--2 font-bold text-main flex items-center"
        >
          Избранные подарки {#if favoriteGifts.length > 0}<span
              class="block text-gray-700 text-lg font-normal ml-12"
              >({favoriteGifts.length})</span
            >{/if}
        </h2>
        {#if favoriteGifts.length > 0}
          <section class="favorites__items flex flex-wrap">
            {#each favoriteGifts as bouquet, i}
              <FavoriteCard
                recommendation={bouquet}
                onHeartClick={(value) => toggleGiftDeleteModal(value, i)}
              />
            {/each}
          </section>
        {:else}
          <section class="favorites__empty">
            <p class="favorites__text">
              Понравился подарок? Добавь его в избранное, чтобы вернуться к нему в любой
              момент
            </p>
            <a href="/" class="favorites__button">Перейти в каталог</a>
          </section>
        {/if}
        <h2
          class="favorites__heading favorites__heading--2 font-bold text-main flex items-center"
        >
          Недавно просмотренные
        </h2>
        <section class="favorites__items flex flex-wrap">
          {#each recentlyViewed as bouquet, i}
            <FavoriteCard
              recommendation={bouquet}
              onHeartClick={() => toggleRecentlyViewedHeart(i)}
            />
          {/each}
        </section>
      </div>
    </div>
    <div class="aside-nav-container">
      <AsideNavigation {recommendations} {navlist} />
    </div>
  </div>
</div>
<DeleteFavoriteModal
  showModal={showBouquetDeleteModal}
  {cardDeleted}
  toggleModal={toggleBouquetDeleteModal}
  deleteCard={deleteBouquet}
/>
<DeleteFavoriteModal
  showModal={showGiftDeleteModal}
  {cardDeleted}
  toggleModal={toggleGiftDeleteModal}
  deleteCard={deleteGift}
/>

<style lang="postcss">
  .favorites {
    margin-bottom: 10px;
    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%), #f2f2f2;
    border-radius: 0 0 4px 4px;
    @apply px-80;
    @apply pt-48;
    @apply pb-64;
    min-height: calc(100vh - 286px);
  }

  .favorites__heading {
    font-size: 22px;
    line-height: 30px;
    margin-bottom: 14px;
  }

  .favorites__heading--2 {
    margin-top: 32px;
  }

  .favorites__heading span {
    font-size: 19px;
    line-height: 22px;
    margin-left: 12px;
    margin-top: 2px;
  }

  .favorites__items {
    margin-top: 4px;
  }

  .favorites__empty {
    margin-top: -4px;
  }

  .favorites__text {
    font-size: 15px;
    line-height: 20px;
  }

  .favorites__button {
    margin-top: 18px;
    margin-bottom: 16px;
    width: 200px;
    height: 44px;
    box-sizing: border-box;
    border-radius: 4px;
    @apply bg-accent;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    line-height: 20px;
    @apply text-main;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .favorites__button:hover {
    @apply bg-info;
    @apply text-light;
  }

  @media (min-width: 1001px) {
    .favorites__heading {
      font-size: 24px;
      line-height: 32px;
      margin-bottom: 18px;
    }

    .favorites__heading--2 {
      margin-top: 52px;
    }

    .favorites__items {
      margin-top: 6px;
    }

    .favorites__button {
      margin-top: 24px;
    }
  }

  @media (max-width: 1300px) {
    .favorites {
      @apply pt-34;
      @apply px-44;
      padding-bottom: 62px;
    }

    .favorites__heading--2 {
      margin-top: 34px;
    }

    .favorites__text {
      font-size: 16px;
      line-height: 21px;
    }

    .favorites__button {
      margin-top: 24px;
      margin-bottom: 34px;
      width: 220px;
      height: 46px;
      font-size: 16px;
    }
  }
  @media (max-width: 1000px) {
    .favorites {
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
