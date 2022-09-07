<script context="module">
  export async function preload(page, session) {
    try { const regex = /(.jpg|.webp|.png|.jpeg|.gif|.svg)/;
      if (
        page.params.slug.find((el) =>
          el.substring(el.lastIndexOf(".")).match(regex)
        )
      ) {
        return {};
      }
      const res = await this.fetch(
        `index.json?city=${page.host[0]}&path=${page.path}`
      );
      const json = await res.json();
      return {
        slug: page.slug,
        path: page.path,
        flowersList: json.flowersList,
        categories: json.catalog,
        catalogSubCategories: json.catalogSubCategories,
        cityMeta: json.cityMeta,
        breadcrumbs: json.breadcrumbs,
        filters: json.filters,
        orderList: json.orderList,
      };
    } catch (e) {
      console.log(e);
    }
  }
</script>

<script>
  import { onMount } from "svelte";
  import { mainStore, breadcrumbsStore } from "../../stores/global.js";
  import { orderStore } from "../../stores/order.js";
  import CatalogHero from "../../components/CatalogHero.svelte";
  import BigFlowerCard from "../../components/BigFlowerCard.svelte";
  import OrderContainer from "../../components/OrderContainer.svelte";
  import CatalogNavbar from "../../components/CatalogNavbar.svelte";
  import CatalogFilter from "../../components/CatalogFilter.svelte";
  import PresentCard from "../../components/PresentCard.svelte";
  import cloneDeep from "lodash-es/cloneDeep";
  import { stores } from "@sapper/app";
  const { page } = stores();
  export let slug;
  export let path;
  export let cityMeta;
  export let breadcrumbs;
  export let flowersList;
  export let filters;
  export let catalogSubCategories;
  export let orderList;
  export let categories;
  let currentFlowerList = flowersList;
  let currentSubCategory = catalogSubCategories[0].name;
  let filtersData = [
    {
      name: "price",
      list: filters.priceRangeList,
      text: "Цена",
      current: null,
    },
    {
      name: "composition",
      list: filters.compositionList,
      text: "Состав",
      current: null,
    },
    { name: "color", list: filters.colorList, text: "Цвет", current: null },
    {
      name: "occasion",
      list: filters.occasionList,
      text: "Повод",
      current: null,
    },
    {
      name: "recipient",
      list: filters.recipientList,
      text: "Кому",
      current: null,
    },
  ];

  let sortingOrder;

  function filterData(filtersData) {
    let sortedFiltersData = cloneDeep(filtersData);
    sortedFiltersData.sort((a, b) => {
      if (a.current === null && b.current !== null) {
        return -1;
      }
      if (a.current !== null && b.current === null) {
        return 1;
      }
      return 0;
    });
    if (sortedFiltersData.find((filter) => !filter.current)) {
      currentFlowerList = flowersList;
    }

    for (let filter of sortedFiltersData) {
      if (filter.current && filter.name !== "price") {
        currentFlowerList = currentFlowerList.filter((flower) =>
          flower.categories.find((category) => category === filter.current.text)
        );
      } else if (filter.current && filter.name === "price") {
        currentFlowerList = currentFlowerList.filter((flower) => {
          if (
            filter.current.from <= flower.price &&
            filter.current.to >= flower.price
          ) {
            return true;
          }
          return false;
        });
      }
    }
    return currentFlowerList;
  }

  function sortData(sortingOrder) {
    if (sortingOrder) {
      switch (sortingOrder.name) {
        case "popularity":
          return currentFlowerList.sort((a, b) => a.popularity - b.popularity);
          break;
        case "priceAscending":
          return currentFlowerList.sort((a, b) => a.price - b.price);
        case "priceDescending":
          return currentFlowerList.sort((a, b) => b.price - a.price);
        default:
          throw new Error("no such sorting order option");
      }
    }
    return currentFlowerList;
  }

  onMount(() => {
    console.log()
    $orderStore.orderList = orderList;
    $orderStore.totalPrice = orderList.reduce((acc, val) => {
      return acc + val.flower.price * val.flower.quantity;
    }, 0);
    $mainStore.address.city = cityMeta;

    breadcrumbsStore.pushPath(path);

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const images = document.querySelectorAll("img[data-src]");
    const sources = document.querySelectorAll("source[data-srcset]");

    function callback(entries, observer) {
      entries.forEach((entry) => {
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

    Array.from(images).forEach((image) => observer.observe(image));
    Array.from(sources).forEach((source) => observer.observe(source));

    return () => {
      images.forEach((image) => observer.unobserve(image));
      sources.forEach((source) => observer.unobserve(source));
      observer.disconnect();
    };
  });

  $: currentFlowerList = filterData(filtersData);
  $: currentFlowerList = sortData(sortingOrder);
</script>

<style>
  .bigflowercard-item {
    max-width: calc(100% / 2);
    flex: 1 1 auto;
    padding-right: 40px;
    padding-bottom: 40px;
  }
  @media (min-width: 1160px) {
    .bigflowercard-item {
      max-width: calc(100% / 3);
    }
  }
  .bigflowercard-item.has-aside {
    max-width: 80%;
    flex: 1 1 auto;
    padding-right: 40px;
    padding-bottom: 40px;
  }
  @media (min-width: 1160px) {
    .bigflowercard-item.has-aside {
      max-width: calc(100% / 2);
    }
  }
  .item-list {
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 1) 0%,
      var(--gray-100) 20%
    );
  }
  .order-aside {
    display: block;

    height: calc(100vh - 6.4rem);
    bottom: 1rem;
    top: 88px;
    width: 310px;
  }
  .catalog-content {
    width: 100%;
  }
  .catalog-content.has-aside {
    width: calc(100% - 320px);
    margin-right: 10px;
    flex: 1 1 100%;
  }
  .present-wrapper {
    min-width: 373px;
  }
</style>

<!-- <svelte:window on:resize={throttledResize} /> -->
<svelte:head>
  <title>{breadcrumbs[breadcrumbs.length - 1].name || 'каталог'}</title>
  <meta name="description" content="Цветы" />

  <link rel="canonical" href="https://{$page.host + $page.path}" />

  <meta
    name="keywords"
    content="Доставка цветов в Мурманске, Цветы с доставкой в Мурманске,
    Заказать цветы с доставкой в Мурманске, " />

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

  <meta name="geo.region" content="" />
  <meta name="ICBM" content="" />
  <meta name="referrer" content="always" />

  <meta property="og:title" content="Your Awesome Open Graph Title" />
  <meta property="og:description" content="Your Awesome Open Graph Title" />
  <meta property="og:image" content="image" />
  <meta property="og:url" content="url" />
  <meta property="og:site_name" content="Розарио.Цветы" />
  <meta property="og:type" content="website" />

  <meta name="twitter:title" content="European Travel Destinations " />
  <meta
    name="twitter:description"
    content=" Offering tour packages for individuals or groups." />
  <meta
    name="twitter:image"
    content=" http://euro-travel-example.com/thumbnail.jpg" />
  <meta name="twitter:image:alt" content="Alt text for image" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="flex mb-16 w-full catalog-page">
  <div
    class="h-full catalog-content rounded {$orderStore.orderList.length ? 'has-aside' : ''}">

    {#if breadcrumbs}
      <CatalogHero
        {cityMeta}
        {breadcrumbs}
        title={breadcrumbs[breadcrumbs.length - 1]} />
    {:else}
      <CatalogHero {cityMeta} />
    {/if}
    <CatalogNavbar
      bind:currentSubCategory
      initCategories={catalogSubCategories}
      page="catalog" />

    <div>
      <CatalogFilter bind:sortingOrder bind:filtersData />
    </div>
    <div class="item-list rounded-b pb-8">
      <div
        class="px-44 lg:px-34 xl:px-80 pt-34 border-gray-300 border-r border-l">
        <div class="-mr-18 -mb-16 flex flex-wrap">
          <div class="present-wrapper pr-18 flex-1 mb-16">
            <PresentCard type="present" />
          </div>
          <div class="present-wrapper pr-18 mb-16 flex-1">
            <PresentCard type="deal" />
          </div>
        </div>
      </div>
      <div
        class="pt-48 px-44 lg:px-34 xl:px-80 border-gray-300 border-r border-l">
        <div class="mb-24">
          <span class="text-2xl leading-mid text-main font-bold">
            {currentSubCategory}
          </span>
          <span class="leading-mid text-gray-700 text-2xl ml-12">
            {currentFlowerList.length}
          </span>
        </div>
        <div class="-mr-40 flex flex-row flex-wrap">
          {#each currentFlowerList as flower, i}
            <div
              class="bigflowercard-item {$orderStore.orderList.length ? 'has-aside' : ''}">
              <BigFlowerCard on:click selectable={true} {flower} />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
  {#if $orderStore.orderList.length > 0}
    <aside class="order-aside flex sticky">
      <OrderContainer />
    </aside>
  {/if}
</div>
