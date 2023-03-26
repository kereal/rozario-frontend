<script context="module">
  export async function preload(page, session) {
    const blogRes = await this.fetch(`blog.json`)
    const blogJson = await blogRes.json()

    try {
      const res = await this.fetch(
        `index.json?city=${page.host.split(".")[0]}&path=${page.path}`
      )
      const json = await res.json()
      return {
        posts: blogJson[0],
        cityMeta: json.cityMeta
      }
    } catch (e) {
      console.log(e)
    }
  }
</script>

<script>
  import { setContext } from "svelte"
  import debounce from "lodash/debounce"
  import BlogPost from "../../components/BlogPost.svelte"
  import Button from "../../components/Button.svelte"
  import Tabbar from "../../components/Tabbar.svelte"
  import Header from "../../components/Header.svelte"
  import BlogAsideNavigation from "../../components/BlogAsideNavigation.svelte"
  import BlogPromocodeForm from "../../components/BlogPromocodeForm.svelte"
  import BlogPopupSubscribeSuccess from "../../components/BlogPopupSubscribeSuccess.svelte"
  import BlogPopupEmailSubscribedError from "../../components/BlogPopupEmailSubscribedError.svelte"
  import BlogPopupChangeEmail from "../../components/BlogPopupChangeEmail.svelte"
  import Envelope from "../../components/icons/Envelope.svelte"

  let showBlogPopupSubscribeSuccess = false
  let showBlogPopupEmailSubscribedError = false
  let showBlogPopupChangeEmail = false

  const openChangeEmailModal = function () {
    showBlogPopupChangeEmail = true
  }
  const toggleBlogPopupSubscribeSuccess = function () {
    showBlogPopupSubscribeSuccess = !showBlogPopupSubscribeSuccess
  }
  const toggleBlogPopupEmailSubscribedError = function () {
    showBlogPopupEmailSubscribedError = !showBlogPopupEmailSubscribedError
  }
  const toggleBlogPopupChangeEmail = function () {
    showBlogPopupChangeEmail = !showBlogPopupChangeEmail
  }

  import { onMount } from "svelte"
  import ScrollSpy from "../../utils/scrollSpy.js"
  import { mainStore } from "../../stores/global.js"
  import { page } from "$app/stores"

  export let posts
  export let cityMeta

  const city_name = cityMeta.name
  let scrollSpy
  const menulist = [
    { name: "Последние записи", index: 0 },
    { name: "Подарки", index: 1 },
    { name: "Свадьба", index: 2 },
    { name: "Свидание", index: 3 },
    { name: "Партнёрам", index: 4 },
    { name: "Декор", index: 5 }
  ]
  let timeoutid
  let currentMenuIndex = 0

  let LastPostsHeader
  let PresentsHeader
  let WeddingHeader
  let DateHeader
  let PartnersHeader
  let DecorHeader

  let headers
  const pathlist = [
    {
      name: "Доставка цветов",
      href: "/"
    },
    {
      name: city_name,
      href: "#"
    },
    {
      name: "Блог",
      href: "#"
    }
  ]

  const photo = ""
  const photo1_5 = ""
  const photo2 = ""
  const photo3 = ""
  const h1 = "Блог Розарио.Цветы"
  const text =
    "Здесь собраны все отзывы, оставленные покупателями и счастливыми получателями после доставки."

  let containerElement

  function goToHeader(e) {
    setTimeout(() => {
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
    })
  }

  const navlist = [
    {
      active: false,
      name: "Новости",
      link: "/"
    },
    {
      active: true,
      name: "Блог",
      link: "/blog"
    },
    {
      active: false,
      name: "Энциклопедия цветов",
      link: "/"
    }
  ]

  onMount(() => {
    headers = [
      LastPostsHeader,
      PresentsHeader,
      WeddingHeader,
      DateHeader,
      PartnersHeader,
      DecorHeader
    ]
    scrollSpy = new ScrollSpy(window, headers)
    const setIndex = (e) => {
      currentMenuIndex = e.detail.index
    }
    window.addEventListener("scrollspy-activate", setIndex)

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

    $mainStore.address.city = cityMeta

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
  <title>Блог</title>
  <meta name="description" content="CONTACTS_DESCRIPTION" />

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

<div id="blog-page" class="page flex justify-between">
  <div class="blog-main w-full">
    <div class="header">
      <Header {pathlist} {h1} {text} {photo} {photo1_5} {photo2} {photo3} />
    </div>
    <div class="blog-body">
      <Tabbar
        pos="top: 5rem;"
        className="sticky"
        on:change={goToHeader}
        {currentMenuIndex}
        {menulist}
      />
      <div class="page-content" bind:this={containerElement}>
        <h2 data-scrollspy bind:this={LastPostsHeader}>Последние записи</h2>
        <div class="posts">
          {#each posts["last-posts"] as blogpost, i}
            <BlogPost group={"last-posts"} {blogpost} />
          {/each}
        </div>

        <h2 data-scrollspy bind:this={PresentsHeader}>Подарки</h2>
        <div class="posts">
          {#each posts["presents"] as blogpost, i}
            <BlogPost group={"presents"} {blogpost} />
          {/each}
        </div>

        <h2 data-scrollspy bind:this={WeddingHeader}>Свадьба</h2>
        <div class="posts">
          {#each posts["wedding"] as blogpost, i}
            <BlogPost group={"wedding"} {blogpost} />
          {/each}
        </div>

        <h2 data-scrollspy bind:this={DateHeader}>Свидание</h2>
        <div class="posts">
          {#each posts["date"] as blogpost, i}
            <BlogPost group={"date"} {blogpost} />
          {/each}
        </div>

        <h2 data-scrollspy bind:this={PartnersHeader}>Партнёрам</h2>
        <div class="posts">
          {#each posts["partners"] as blogpost, i}
            <BlogPost group={"partners"} {blogpost} />
          {/each}
        </div>

        <h2 data-scrollspy bind:this={DecorHeader}>Декор</h2>
        <div class="posts">
          {#each posts["decor"] as blogpost, i}
            <BlogPost group={"decor"} {blogpost} />
          {/each}
        </div>

        <hr />

        <BlogPromocodeForm
          onSuccess={toggleBlogPopupSubscribeSuccess}
          onError={toggleBlogPopupEmailSubscribedError}
          className={"main-block"}
        >
          <Envelope />
        </BlogPromocodeForm>
      </div>
    </div>
  </div>
  <div class="aside-nav-container">
    <BlogAsideNavigation {navlist}>
      <BlogPromocodeForm
        onSuccess={toggleBlogPopupSubscribeSuccess}
        onError={toggleBlogPopupEmailSubscribedError}
        className={"in-aside"}
      />
    </BlogAsideNavigation>
  </div>
</div>

{#if showBlogPopupSubscribeSuccess}
  <BlogPopupSubscribeSuccess
    on:close={toggleBlogPopupSubscribeSuccess}
    onChangeEmail={openChangeEmailModal}
  />
{/if}
{#if showBlogPopupEmailSubscribedError}
  <BlogPopupEmailSubscribedError
    on:close={toggleBlogPopupEmailSubscribedError}
    onChangeEmail={openChangeEmailModal}
  />
{/if}
{#if showBlogPopupChangeEmail}
  <BlogPopupChangeEmail on:close={toggleBlogPopupChangeEmail} />
{/if}

<style lang="postcss">
  .aside-nav-container {
    top: calc(5rem + 10px);
    flex: 0 0 310px;
    margin-left: 10px;
    margin-bottom: 10px;
    bottom: 10px;
    min-height: 692px;
    @apply sticky h-full;
  }
  .aside-nav-container :global(aside) {
    min-height: 692px;
  }
  #blog-page .header :global(p) {
    margin-bottom: 65px;
    padding-top: 18px;
  }
  .blog-main {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .blog-body {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .page-content {
    height: 100%;
    margin-bottom: 10px;
    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%), #f2f2f2;
    border: 1px solid #e9e9e9;
    border-top: none;
    padding: 4px 80px 44px;
    border-radius: 0 0 4px 4px;
  }
  h2 {
    padding: 44px 0 0;
    margin: 0;
    font-weight: bold;
    font-size: 24px;
    line-height: 135%;
    color: var(--color-main);
  }
  .posts {
    display: flex;
    flex-wrap: wrap;
  }
  .w-full :global(nav) {
    flex-shrink: 0;
  }
  .page-content :global(.promocode-svg) {
    flex-shrink: 0;
    margin-left: 28px;
  }
  hr {
    margin: 44px -80px 30px;
    border-top-color: var(--gray-1000);
  }
  @media screen and (max-width: 1300px) {
    .page-content :global(.promocode-svg) {
      flex-shrink: unset;
    }
    .page-content {
      padding: 0 44px 44px;
    }
    hr {
      margin: 44px -44px 30px;
      border-top-color: var(--gray-1000);
    }
    h2:first-child {
      padding-top: 34px;
    }
    .posts {
      padding-bottom: 18px;
    }
  }
  @media screen and (max-width: 1200px) and (min-width: 1171px) {
    .posts :global(a .info) {
      padding: 18px 12px;
    }
    .posts :global(a) {
      margin-right: 24px;
      width: calc(100% / 3 - 24px * 2 / 3);
      max-width: calc(100% / 3 - 24px * 2 / 3);
    }
    .posts :global(a:nth-child(3n + 3)) {
      margin-right: 0;
    }
  }
  @media screen and (max-width: 1170px) {
    .posts :global(a) {
      margin-right: 0;
      flex-grow: 1;
      width: calc(100% / 2 - 34px * 1 / 2);
      max-width: calc(100% / 2 - 34px * 1 / 2);
    }
    .posts :global(a:nth-child(2n + 1)) {
      margin-right: 34px;
    }
  }
  @media screen and (max-width: 1000px) {
    .posts {
      padding-bottom: 0;
    }
    .page-content {
      padding: 0 44px 30px;
    }
    #blog-page .header :global(h1) {
      font-size: 50px;
    }
    #blog-page .header :global(p) {
      margin-bottom: 46px;
    }
    .page-content :global(.promocode-svg) {
      max-width: 150px;
    }
    h2 {
      padding: 36px 0 0;
    }
    h2:first-child {
      padding: 24px 0 0;
    }
  }
</style>
