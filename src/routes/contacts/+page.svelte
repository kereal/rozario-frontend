<script>
  import { onMount } from "svelte"
  import { mainStore } from "@/stores/global.js"
  import { page } from "$app/stores"
  import Breadcrumbs from "@/components/Breadcrumbs.svelte"
  import SocialIcon from "@/components/SocialIcon.svelte"
  import Button from "@/components/Button.svelte"

  export let data
  const cityMeta = data.cityMeta
  const city_name = cityMeta.name
  const shop_name = cityMeta.shop.name
  const photo_name = cityMeta.shop.contacts_image
  const photo = photo_name + ".png"
  const photo1_5 = photo_name + "@1.5x.png"
  const photo2 = photo_name + "@2x.png"
  const photo3 = photo_name + "@3x.png"
  const city_locativus = cityMeta.locativus
  const shop_address_street = cityMeta.shop.address.street
  const shop_address_opening_hours_days = cityMeta.shop.address.openingHours.days
  const shop_address_opening_hours_hours = cityMeta.shop.address.openingHours.hours
  const schedule = `${shop_address_opening_hours_days}, ${shop_address_opening_hours_hours}`
  const phone_local = cityMeta.shop.phone
  const city_lat_lng = cityMeta.shop.address.lat_lng || cityMeta.shop.address.coordinates
  const phone_global = cityMeta.shop.phone_world

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
  const socials = [
    { icon: "Instagram" },
    { icon: "WhatsApp" },
    { icon: "Facebook" },
    { icon: "Telegram" },
    { icon: "Vk" },
    { icon: "Viber" },
    { icon: "Email" }
  ]

  onMount(() => {
    $mainStore.address.city = cityMeta
    if (ymaps) {
      function loadMap(coords) {
        ymaps.ready(init)
        function init() {
          var map = new ymaps.Map("map", {
            center: coords,
            zoom: 7
          })
          var marker = new ymaps.GeoObject({
            geometry: {
              type: "Point",
              coordinates: coords
            }
          })
          map.geoObjects.add(marker)
        }
      }

      loadMap(city_lat_lng)

      var resizeTimer
      window.addEventListener("resize", function () {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(function () {
          console.log("resized")
          document.getElementById("map").innerHTML = ""
          loadMap(city_lat_lng)
        }, 250)
      })
    }

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

  let openChat = () => console.log("open chat")
</script>

<svelte:head>
  <title>Контакты</title>
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

<div class="page" itemscope itemtype="http://schema.org/Florist">
  <div class="header image-box relative">
    <!-- <img
      class="w-full h-full rounded absolute object-cover inset-0"
      data-src={photo}
      data-srcset="{photo},
                {photo1_5} 1.5x,
                {photo2} 2x,
                {photo3} 3x"
      itemprop="image"
      alt="photo"
    /> -->
    <img
      class="w-full h-full rounded absolute object-cover inset-0"
      src="/{photo}"
      itemprop="image"
      alt="photo"
    />
    <Breadcrumbs {pathlist} />
    <h1 class="font-bold">Контакты</h1>
  </div>

  <div class="flex contacts-body">
    <div class="left flex-grow">
      <h2 class="font-bold">Наш магазин {city_locativus}</h2>
      <div class="shop-name" itemprop="name">{shop_name}</div>
      <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
        Адрес:
        <span itemprop="addressLocality">г. {city_name}</span>,
        <span itemprop="streetAddress">&nbsp;{shop_address_street}</span>
      </div>
      <div>Мы работаем: {schedule}</div>
      <div>Доставка круглосуточно!</div>

      <h2 class="font-bold">Свяжитесь с нами</h2>
      <div class="contacts-text">
        Если у Вас есть вопросы по Вашему заказу, позвоните нам:
      </div>
      <div class="phones">
        <div class="local-phone">
          <a
            itemprop="telephone"
            content={phone_local}
            class="text-main"
            href="tel:{phone_local}"
            >{phone_local}
          </a>
          <span class="text-gray-600">(бесплатно по России)</span>
        </div>
        <div class="global-phone">
          <a
            itemprop="telephone"
            content={phone_global}
            class="text-main"
            href="tel:{phone_global}">{phone_global}</a
          >
          <span class="text-gray-600">(по миру)</span>
        </div>
      </div>

      <div class="socials">
        <h3>Напишите нам:</h3>
        <div class="flex flex-wrap">
          {#each socials as social}
            <div class="mr-12">
              <SocialIcon icon={social.icon} />
            </div>
          {/each}
        </div>
      </div>
      <div class="w-full">
        <Button textClass="text-base" status="active-main" size="lg" on:click={openChat}>
          Чат с консультантом
        </Button>
      </div>
    </div>
    <div class="right max-w-full min-h-full flex-grow">
      <div id="map" class="w-full h-full" />
    </div>
  </div>
</div>

<style>
  .shop-name {
    visibility: collapse;
    height: 0;
    overflow: hidden;
  }
  .header {
    min-height: 332px;
    padding: 118px 80px;
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
  .contacts-body {
    background: linear-gradient(
        180deg,
        var(--color-light) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      var(--gray-100);
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    padding: 48px 80px 80px;
    color: var(--color-main);
    margin-bottom: 10px;
  }
  h2 {
    font-size: 24px;
    line-height: 135%;
    margin-bottom: 24px;
    min-width: 400px;
    max-width: 100%;
  }
  h2:not(:first-child) {
    margin-top: 48px;
  }
  h3 {
    margin-top: 30px;
    margin-bottom: 18px;
  }
  .contacts-text {
    min-width: 462px;
  }
  .phones {
    margin-top: 6px;
  }
  .phones span:nth-child(2) {
    color: var(--gray-600);
    font-size: 14px;
  }
  .socials {
    margin-bottom: 30px;
  }
  .left {
    padding-right: 93px;
  }
  .right {
    width: 703px;
    max-width: 703px;
    padding-top: 9px;
    overflow: hidden;
  }

  .page {
    min-height: calc(100vh - 5.5rem);
  }
  @media (max-width: 1300px) {
    h2 {
      margin-bottom: 18px;
    }
    .header,
    .contacts-body,
    .contacts-body :global(button .text-base) {
      font-size: 15px;
    }
    .contacts-body :global(.button--lg) {
      padding: 12px 30px;
      height: auto;
      font-size: 15px;
      line-height: 135%;
    }
    .contacts-text {
      min-width: 433px;
    }
    .left {
      padding-right: 40px;
    }
    .right {
      width: 703px;
      max-width: 703px;
    }
  }
  @media (max-width: 1000px) {
    h2 {
      font-size: 22px;
    }
    h2:not(:first-child) {
      margin-top: 40px;
    }
    h3 {
      margin-bottom: 16px;
    }
    .socials {
      margin-bottom: 24px;
    }
    .right {
      width: 511px;
      max-width: 511px;
      min-width: 311px;
    }
    .contacts-body {
      padding-top: 40px;
      padding-bottom: 68px;
    }
  }
</style>
