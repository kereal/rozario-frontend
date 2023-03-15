<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch(
      `index.json?city=${page.host[0]}&path=${page.path}`
    );
    const json = await res.json();    

    const res1 = await this.fetch(`http://127.0.0.1:3003/rozmain`)
    const solData = await res1.json()

    return {
      //flowersList: json.flowersList,
      flowersList: solData.products,
      collections: json.collections,
      //categories: json.catalog,
      categories: solData.taxons,
      recommendations: json.recommendations,
      user: session.user,
      cityMeta: json.cityMeta,
      blogposts: json.blogposts,
      //testimonials: json.testimonials,
      testimonials: solData.reviews,
      smiles: json.smiles,
      orderList: json.orderList,
    };
  }

</script>

<script>
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  import Hero from "../components/Hero.svelte";
  import BigFlowerCard from "../components/BigFlowerCard.svelte";
  import CollectionsCard from "../components/CollectionsCard.svelte";
  import Testimonial from "../components/Testimonial.svelte";
  import BlogPostCard from "../components/BlogPostCard.svelte";
  import Smile from "../components/Smile.svelte";
  import SpecialCard from "../components/SpecialCard.svelte";
  import RozarioGameCard from "../components/RozarioGameCard.svelte";
  import FavoriteCard from "../components/FavoriteCard.svelte";
  import CatalogNavbar from "../components/CatalogNavbar.svelte";
  import Carousel from "../components/Carousel.svelte";
  import SectionContainer from "../components/SectionContainer.svelte";
  import Slider from "../components/Slider.svelte";
  import { mainStore } from "../stores/global.js";
  import { orderStore } from "../stores/order.js";
  import Swiper, { Navigation } from "swiper";
  import "swiper/swiper-bundle.css";
  const { page } = stores();
  export let flowersList;
  export let collections;
  export let categories;
  export let recommendations;
  export let cityMeta;
  export let customers;
  export let blogposts;
  export let smiles;
  export let testimonials;
  export let orderList = [];

  const currDealCategory = "Лето";
  const flowerCarouselGap = 40;
  const testimonialCarouselGap = 40;
  const promoBlock = false;
  const smilesInRow = 5;

  let customersCarouselContainer;
  let blogpostsCarouselContainer;
  let smilesCarouselContainer;


  onMount(async () => {
   // let navigator = window.navigator.userAgent
   // if ( navigator.indexOf("Android") == -1 && navigator.indexOf("webOS") == -1 &&
   //         navigator.indexOf("iPhone") == -1 && navigator.indexOf("iPad") == -1 &&
   //         navigator.indexOf("iPod") == -1 && navigator.indexOf("BlackBerry") == -1 &&
   //         navigator.indexOf("IEMobile") == -1 && navigator.indexOf("Opera Mini") == -1) {
   //   console.log('ssssssss')
  //  } else {
  //    window.location = '/mobile'
  //  }

    $orderStore.orderList = orderList;
    $orderStore.totalPrice = orderList.reduce((acc, val) => {
      return acc + val.flower.price * val.flower.quantity;
    }, 0);
    $mainStore.address.city = cityMeta;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2
    };

    const images = document.querySelectorAll("img[data-src]");
    const sources = document.querySelectorAll("source[data-srcset]");

    function callback(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.tagName === "IMG") {
            entry.target.src = entry.target.dataset.src;
            entry.target.srcset = entry.target.dataset.srcset;
            entry.target.removeAttribute("data-src");
            entry.target.removeAttribute("data-srcset");
          } else if (entry.target.tagName === "SOURCE") {
            entry.target.srcset = entry.target.dataset.srcset;
            entry.target.removeAttribute("data-srcset");
          }
          observer.unobserve(entry.target);
        }
      });
    }

    const observer = new IntersectionObserver(callback, options);
    Array.from(images).forEach(image => observer.observe(image));
    Array.from(sources).forEach(source => observer.observe(source));

    return () => {
      images.forEach(image => observer.unobserve(image));
      sources.forEach(source => observer.unobserve(source));
      observer.disconnect();
    };
  });
  const buttonColor = "bg-accentlight";
  const iconColor = "text-main";
  const moreDeals = [];

</script>

<style lang="postcss">
  .main-page :global(.carousel) {
    margin-right: -20px;
  }
  @media (min-width: 1420px) {
    .main-page :global(.carousel) {
      margin-right: -30px;
    }
  }
  .main-page :global(.carousel-lg) {
    margin-right: -30px;
  }
  @media (min-width: 1420px) {
    .main-page :global(.carousel-lg) {
      margin-right: -40px;
    }
  }
  .carousel-item {
    transition: opacity 0.8s ease;
    flex: 1 0 auto;
    @apply inline-block pointer-events-none opacity-0;
  }
  .main-page :global(.bigflowercard-carousel-item) {
    padding-right: 30px;
  }
  @media (min-width: 1420px) {
    .main-page :global(.bigflowercard-carousel-item) {
      padding-right: 40px;
    }
  }
  .main-page :global(.customers-carousel-item) {
    padding-right: 30px;
  }
  @media (min-width: 1420px) {
    .main-page :global(.customers-carousel-item) {
      padding-right: 40px;
    }
  }
  .main-page :global(.blog-post-carousel-item) {
    padding-right: 30px;
  }
  @media (min-width: 1420px) {
    .main-page :global(.blog-post-carousel-item) {
      padding-right: 40px;
    }
  }
  .main-page :global(.smiles-carousel-item) {
    padding-right: 30px;
  }
  @media (min-width: 1420px) {
    .main-page :global(.smiles-carousel-item) {
      padding-right: 40px;
    }
  }
  .special-card-wrapper {
    flex-basis: calc(100% / 4 - 35px);
    margin-right: 24px;
    margin-bottom: 24px;
  }
  .special-card-wrapper:nth-child(4n) {
    margin-right: 0;
  }
  @media (max-width: 1250px) {
    .special-card-wrapper {
      flex-basis: calc(100% / 3 - 35px);
    }
    .special-card-wrapper:nth-child(4n){
      display: none;
    }
  }
</style>

<svelte:head>
  <title>Надежная доставка цветов в Мурманске — Розарио.Цветы</title>
  <meta
    name="description"
    content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в
    Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или
    банковской картой." />
  <link rel="canonical" href="https://{$page.host + $page.path}" />
  <link
    rel="alternate"
    href="https://{$page.host + $page.path}"
    type="text/html"
    hreflang="ru"
    title="Русский" />
  <link
    rel="alternate"
    href="https://{$page.host + $page.path}"
    type="text/html"
    hreflang="en"
    title="English" />
  <meta
    name="keywords"
    content="Доставка цветов в Мурманске, Цветы с доставкой в Мурманске,
    Заказать цветы с доставкой в Мурманске, " />
  <meta name="geo.region" content="" />
  <meta name="geo.position" content="" />
  <meta name="geo.placename" content="" />
  <meta name="ICBM" content="" />
  <meta name="referrer" content="always" />
  <meta
    property="og:title"
    content="Надежная доставка цветов в Мурманске — Розарио.Цветы" />
  <meta
    property="og:description"
    content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в
    Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или
    банковской картой." />
  <meta property="og:image" content="ruka3.jpg" />
  <meta property="og:url" content="url" />
  <meta property="og:site_name" content="Розарио.Цветы" />
  <meta property="og:type" content="website" />
  <meta
    name="twitter:title"
    content="Надежная доставка цветов в Мурманске — Розарио.Цветы" />
  <meta
    name="twitter:description"
    content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в
    Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или
    банковской картой." />
  <meta name="twitter:image" content="ruka3.jpg" />
  <meta name="twitter:image:alt" content="Розарио.Цветы" />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<div class="w-full bg-gray-800 main-page mb-10 border-b border-gray-300">
  <Hero name={cityMeta.name} locativus={cityMeta.locativus} />
  {#if promoBlock}
    <div class="border-r border-l border-gray-300 px-20 bg-white">
      <RozarioGameCard />
    </div>
  {/if}
  <CatalogNavbar initCategories={categories} page="index" />
  <SectionContainer>
    <div class="my-slider-wrapper flex flex-col mx-auto">
      <h2 class="font-bold text-main text-2xl text mb-18 leading-tight">
        Акции и новинки
      </h2>
      {#if flowersList}
        <Carousel
          carouselClass="carousel-lg"
          itemClass=".bigflowercard-carousel-item"
          itemsInRow={3}>
          {#each flowersList as flower, i}
            <div
              style={`width: calc(100% / ${3});`}
              class="bigflowercard-carousel-item {i < 3 ? 'carousel-item-active' : ''}
              carousel-item">
              <BigFlowerCard selectable={false} {flower} />
            </div>
          {/each}
        </Carousel>
        <a id="mainCollection"></a>
      {:else}
        <a id="mainCollection"></a>
        <div>flowers undefined</div>
      {/if}
    </div>
  </SectionContainer>

  <div
    id="collections"
    class="block"
    style="width:0; height:0; margin:0; padding:0;" />

  <SectionContainer>
    <h2 class="text-main text-2xl font-bold mb-18 leading-tight" >Коллекции</h2>
    <div class="justify-between flex items-stretch flex-wrap -mb-40 -mr-40">
      {#if categories}
        {#each categories as collection}
          <CollectionsCard className="pr-40 pb-40" {collection} />
        {/each}
      {/if}
    </div>
  </SectionContainer>

  <SectionContainer>
    <h2 class="text-main font-bold text-2xl mb-24 leading-tight">Ваши отзывы</h2>
    <p class="text-gray-700 mb-48 text-lg">
      Вы помогаете сделать лучший выбор таким же покупателям, как и Вы
    </p>
    <div data-value="CUSTOMERSCONTAINER" bind:this={customersCarouselContainer}>
      {#if testimonials}
        <Carousel
          carouselClass="carousel-lg"
          iconColor="text-infolight"
          buttonColor="bg-circlebtn"
          itemsInRow={4}
          itemClass=".customers-carousel-item"
          totalitems={testimonials.length}>
          {#each testimonials as testimonial, i}
            <div
              style={`width: calc(100% / ${4});`}
              class="customers-carousel-item carousel-item {i < 4 ? 'carousel-item-active' : ''}">
              <Testimonial {testimonial}/>
            </div>
          {/each}
        </Carousel>
      {/if}
    </div>
  </SectionContainer>

  <SectionContainer>
    <h2 class="text-main font-bold text-2xl mb-24 leading-tight">Наш блог</h2>
    <p class="text-gray-700 mb-48 text-lg">Самые последние новости</p>
    <div data-value="BLOGPOSTSCONTAINER" bind:this={blogpostsCarouselContainer}>
      {#if blogposts}
        <Carousel
          carouselClass="carousel-lg"
          iconColor="text-infolight"
          buttonColor="bg-circlebtn"
          itemsInRow={3}
          itemClass=".blog-post-carousel-item"
          totalitems={blogposts.length}>
          {#each blogposts as blogpost, i}
            <div
              style={`width: calc(100% / ${3});`}
              class="blog-post-carousel-item carousel-item {i < 3 ? 'carousel-item-active' : ''}">
              <BlogPostCard {blogpost} />
            </div>
          {/each}
        </Carousel>
      {/if}
    </div>
  </SectionContainer>

  <SectionContainer>
    <h2 class="text-main font-bold text-2xl mb-24 leading-tight">Улыбки наших получателей</h2>
    <p class="text-gray-700 mb-48 text-lg">
      Очаровательные улыбки запечатленные нашей службой доставки
    </p>
    <div
      class="relative"
      data-value="SMILESCONTAINER"
      >
      {#if smiles}
        <!-- <Carousel
          carouselClass="carousel-lg"
          iconColor="text-infolight"
          buttonColor="bg-circlebtn"
          bind:itemsInRow={smilesInRow}
          itemClass=".smiles-carousel-item"
          gap={flowerCarouselGap}
          totalitems={smiles.length}>
          {#each smiles as smile, i}
            <div
              style={`width: calc(100% / ${smilesInRow});`}
              class="smiles-carousel-item carousel-item {i < smilesInRow ? 'carousel-item-active' : ''}">
              <Smile {smile} />
            </div>
          {/each}
        </Carousel> -->
        <div class="-ml-68 -mr-68">
          <Slider sliderName="smile" forDesktop="5" middle="4" small="3" middleSpaceBreakpoint="1200" height="255">
            {#each smiles as smile}
              <div class="swiper-slide" >
                <Smile {smile} version="2"/>
              </div>
            {/each}
          </Slider>
        </div>
      {/if}
    </div>
  </SectionContainer>

  <SectionContainer last={true}>
    <h2 class="font-bold text-main text-2xl mb-40 leading-tight">Специально для вас</h2>
    <div class="mx-auto flex flex-start -mb-24 -mr-64 flex-wrap">
      {#each recommendations as recommendation}
        <div class="special-card-wrapper">
          <SpecialCard recommendation={recommendation} />
        </div>
      {/each}
    </div>
  </SectionContainer>

</div>
