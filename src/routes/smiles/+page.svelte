<script>
  import { onMount } from "svelte"
  import { mainStore } from "@/stores/global"
  import { page } from "$app/stores"
  import Button from "@/components/Button.svelte"
  import RecipientSmile from "@/components/RecipientSmile.svelte"
  import RecipientSmileModal from "@/components/RecipientSmileModal.svelte"
  import Breadcrumbs from "@/components/Breadcrumbs.svelte"

  export let data

  const cityMeta = data.cityMeta
  const city_name = cityMeta.name
  const photo_name = cityMeta.shop.smiles_image

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

  let hasMoreSmiles = true
  let loading = false
  let loadMoreSmiles = function () {
    loading = true
    let smilesToLoad = cityMeta.smiles.slice(startIndex, startIndex + step)
    startIndex = startIndex + smilesToLoad.length
    addSmilesToColumns(smilesToLoad)
    if (startIndex >= cityMeta.smiles.length) {
      hasMoreSmiles = false
    }
  }
  let addSmilesToColumns = function (smiles) {
    if (smiles.length) {
      shownSmiles.push(smiles[0])
      shownSmiles = shownSmiles
      setTimeout(() => addSmilesToColumns(smiles.slice(1)), 10)
    } else {
      loading = false
    }
  }

  let shownSmiles = []
  let smiles = []
  let startIndex = 0
  let step = 9
  let smilesModalOpened = false
  let smile_i = 0

  function openSmileModal(i) {
    smile_i = i
    smilesModalOpened = true
  }
  function closeSmileModal() {
    smilesModalOpened = false
  }

  onMount(() => {
    $mainStore.address.city = cityMeta
    smiles = cityMeta.smiles
    smiles.forEach((smile, index) => (smile.index = index))
    loadMoreSmiles()

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
  <title>Улыбки получателей</title>
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

<div id="smiles-page" class="page">
  <div class="header image-box relative">
    <img
      class="w-full h-full rounded absolute object-cover inset-0"
      data-src={photo}
      data-srcset="{photo},
                {photo1_5} 1.5x,
                {photo2} 2x,
                {photo3} 3x"
      itemprop="image"
      alt="photo"
    />
    <div class="breadcrumbs">
      <Breadcrumbs {pathlist} />
    </div>
    <h1 class="font-bold">Улыбки получателей</h1>
    <p>Очаровательные улыбки, запечатлённые нашей службой доставки</p>
  </div>
  <div class="smiles-body">
    {#if cityMeta}
      {#each shownSmiles as smile, i}
        <RecipientSmile {smile} smile_i={"smile" + i} {openSmileModal} />
      {/each}
    {/if}
  </div>
  {#if hasMoreSmiles}
    {#if !loading}
      <div class="load-more-smiles">
        <Button on:click={loadMoreSmiles}>Загрузить больше улыбок</Button>
      </div>
    {/if}
  {/if}
  {#if smilesModalOpened}
    <RecipientSmileModal {smiles} {smile_i} closeModal={closeSmileModal} />
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
  .smiles-body {
    background: linear-gradient(
        180deg,
        var(--color-light) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      var(--gray-100);
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    padding: 48px 80px 0;
    color: var(--color-main);
    margin-bottom: 6px;
    flex-grow: 1;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .smiles-body > div {
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
  .load-more-smiles :global(button) {
    font-size: 16px;
    padding: 12px 12px 11px;
    width: 100%;
    line-height: 135%;
  }
  @media (max-width: 1300px) {
    .header,
    .smiles-body,
    .smiles-body :global(button .text-base) {
      font-size: 15px;
    }
    .smiles-body :global(.button--lg) {
      padding: 12px 30px;
      height: auto;
      font-size: 15px;
      line-height: 135%;
    }
    .load-more-smiles :global(button) {
      font-size: 15px;
      padding: 11px;
    }
    .smiles-body {
      padding: 40px 80px 0;
    }
  }
  @media (max-width: 1000px) {
    .smiles-body {
      padding: 26px 80px 0;
    }
  }
</style>
