<script context="module">
  export async function preload(page, session) {
    try {
      const res = await this.fetch(
        `index.json?city=${page.host.split(".")[0]}&path=${page.path}`
      )
      const json = await res.json()
      const res1 = await this.fetch(`http://127.0.0.1:3003/rozmain`)
      const solData = await res1.json()
      return {
        reviews: solData.reviews,
        cityMeta: json.cityMeta
      }
    } catch (e) {
      console.log(e)
    }
  }
</script>

<script>
  import debounce from "lodash/debounce"
  import Button from "../components/Button.svelte"
  import Review from "../components/Review.svelte"
  import Breadcrumbs from "../components/Breadcrumbs.svelte"
  import { onMount } from "svelte"
  import { mainStore } from "../stores/global.js"
  import { page } from "$app/stores"
  export let reviews
  export let cityMeta
  const city_name = cityMeta.name
  const photo_name = cityMeta.shop.reviews_image
  const photo = photo_name + ".png"
  const photo1_5 = photo_name + "@1.5x.png"
  const photo2 = photo_name + "@2x.png"
  const photo3 = photo_name + "@3x.png"
  const pathlist = [
    {
      name: "Доставка цветов",
      href: "/"
    },
    {
      name: city_name,
      href: "#"
    }
  ]
  let hasMoreReviews = true
  let loading = false

  let loadMoreReviews = function () {
    loading = true
    let reviewsToLoad = reviews.slice(startIndex, startIndex + step)
    startIndex = startIndex + reviewsToLoad.length
    addReviewsToColumns(reviewsToLoad)
    if (startIndex >= reviews.length) {
      hasMoreReviews = false
    }
  }
  let isLeftColumnHigher = function () {
    return (
      document.getElementById("leftColumnReviews").offsetHeight >
      document.getElementById("rightColumnReviews").offsetHeight
    )
  }
  let addReviewsToColumns = function (reviews) {
    if (reviews.length) {
      console.log(isLeftColumnHigher())
      if (isLeftColumnHigher()) {
        rightColumnReviews.push(reviews[0])
        rightColumnReviews = rightColumnReviews
      } else {
        leftColumnReviews.push(reviews[0])
        leftColumnReviews = leftColumnReviews
      }
      setTimeout(() => addReviewsToColumns(reviews.slice(1)), 1)
    } else {
      loading = false
    }
  }

  let leftColumnReviews = []
  let rightColumnReviews = []
  let startIndex = 0
  let step = 8

  onMount(() => {
    $mainStore.address.city = cityMeta
    loadMoreReviews()
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2
    }
    const images = document.querySelectorAll("img[data-src]")
    const sources = document.querySelectorAll("source[data-srcset]")
    function callback(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.tagName === "IMG") {
            entry.target.src = entry.target.dataset.src
            entry.target.srcset = entry.target.dataset.srcset
            entry.target.removeAttribute("data-src")
            entry.target.removeAttribute("data-srcset")
          } else if (entry.target.tagName === "SOURCE") {
            entry.target.srcset = entry.target.dataset.srcset
            entry.target.removeAttribute("data-srcset")
          }
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(callback, options)

    Array.from(images).forEach((image) => observer.observe(image))
    Array.from(sources).forEach((source) => observer.observe(source))

    return () => {
      images.forEach((image) => observer.unobserve(image))
      sources.forEach((source) => observer.unobserve(source))
      observer.disconnect()
    }
  })
</script>

<svelte:head>
  <title>Отзывы</title>
  <meta name="description" content="CONTACTS_DESCRIPTION" />
  <link rel="canonical" href={$page.host + $page.path} />
  <link
    rel="alternate"
    href={$page.host + $page.path}
    type="text/html"
    hreflang="ru"
    title="Русский"
  />
  <link
    rel="alternate"
    href={$page.host + $page.path}
    type="text/html"
    hreflang="en"
    title="English"
  />
  <meta
    name="keywords"
    content="Доставка цветов в Мурманске, Цветы с доставкой в Мурманске, Заказать цветы с
    доставкой в Мурманске, "
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
    content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в Мурманске.
    Оформить доставку цветов можно на сайте. Оплатить — наличными или банковской картой."
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
    content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в Мурманске.
    Оформить доставку цветов можно на сайте. Оплатить — наличными или банковской картой."
  />
  <meta name="twitter:image" content="ruka3.jpg" />
  <meta name="twitter:image:alt" content="Розарио.Цветы" />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<div id="reviews-page" class="page" itemscope itemtype="http://schema.org/Florist">
  <div class="header image-box relative">
    <img
      class="w-full h-full rounded absolute object-cover inset-0"
      data-src={photo}
      data-srcset="{photo}, {photo1_5} 1.5x, {photo2} 2x, {photo3} 3x"
      itemprop="image"
      alt="photo"
    />
    <div class="breadcrumbs">
      <Breadcrumbs {pathlist} />
    </div>
    <h1 class="font-bold">Отзывы</h1>
    <p>
      Здесь собраны все отзывы, оставленные покупателями и счастливыми получателями после
      доставки.
    </p>
  </div>
  <div class="reviews-body">
    {#if reviews.length}
      <div id="leftColumnReviews">
        {#each leftColumnReviews as review, i}
          <Review {review} review_i={"left" + i} />
        {/each}
      </div>
      <div id="rightColumnReviews">
        {#each rightColumnReviews as review, i}
          <Review {review} review_i={"right" + i} />
        {/each}
      </div>
    {/if}
  </div>
  {#if hasMoreReviews}
    {#if !loading}
      <div class="load-more-reviews">
        <Button on:click={loadMoreReviews}>Загрузить больше отзывов</Button>
      </div>
    {/if}
  {/if}
</div>

<style>
  .header {
    min-height: 332px;
    padding: 118px 80px 0;
  }
  h1 {
    font-size: 48px;
    line-height: 135%;
    margin-top: 8px;
  }
  .header img {
    z-index: -2;
  }
  .header::before {
    content: "";
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 14.82%, var(--color-dark) 100%);
    opacity: 0.7;
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .header,
  .header :global(a),
  .header :global(li + li::before) {
    color: var(--color-light);
  }
  .reviews-body {
    background: linear-gradient(
        180deg,
        var(--color-light) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      var(--gray-100);
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    padding: 48px 80px 6px;
    color: var(--color-main);
    margin-bottom: 6px;
    flex-grow: 1;
    display: flex;
    align-items: flex-start;
  }
  #leftColumnReviews {
    margin-right: 34px;
  }
  .reviews-body > div {
    flex-basis: 50%;
    flex-grow: 1;
    min-width: 0;
  }
  .page {
    min-height: calc(100vh - 5.5rem - 10px);
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  .header p {
    font-size: 14px;
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
  .breadcrumbs :global(li) {
    font-size: 16px;
  }
  .breadcrumbs :global(li a) {
    opacity: 0.8;
  }
  .breadcrumbs :global(li a:hover) {
    opacity: 1;
  }
  .load-more-reviews :global(button) {
    font-size: 16px;
    padding: 12px 12px 11px;
    width: 100%;
    line-height: 135%;
  }
  @media (max-width: 1300px) {
    .header,
    .reviews-body,
    .reviews-body :global(button .text-base) {
      font-size: 15px;
    }
    .reviews-body :global(.button--lg) {
      padding: 12px 30px;
      height: auto;
      font-size: 15px;
      line-height: 135%;
    }
    .load-more-reviews :global(button) {
      font-size: 15px;
      padding: 11px;
    }
  }
  @media (max-width: 1000px) {
    .reviews-body {
      padding: 40px 80px 10px;
    }
    #leftColumnReviews {
      margin-right: 24px;
    }
  }
</style>
