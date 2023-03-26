<script context="module">
  export async function preload(page, session) {
    try {
      const res = await this.fetch(`index.json?city=${page.host[0]}&path=${page.path}`)
      const json = await res.json()
      return {
        flowersList: json.flowersList,
        slug: page.slug,
        path: page.path,
        categories: json.catalog,
        cityMeta: json.cityMeta,
        activeOrders: json.activeOrders,
        deliveryAddresses: json.deliveryAddresses,
        orderStories: json.orderStories,
        smiles: json.smiles,
        testimonials: json.testimonials,
        recommendations: json.recommendations,
        product: json.product
      }
    } catch (e) {
      console.log(e)
    }
  }
</script>

<script>
  import { fly, fade } from "svelte/transition"
  import ImageViewer from "./ImageViewer.svelte"
  import HeartCounter from "./HeartCounter.svelte"
  import InfoButton from "./InfoButton.svelte"
  import AnimateNumber from "./AnimateNumber.svelte"
  import PlusMinusButton from "./PlusMinusButton.svelte"
  import Button from "./Button.svelte"

  let DeliveryDrop = false
  export let garantText = String(
    "100% гарантия свежести." +
      " Счастливый получатель. " +
      " Замена букета. " +
      " Пунктуальная доставка."
  )
  let imagelist = [
    {
      src: "https://i.ibb.co/RgCcQcg/screenshot-russia-rozarioflowers-ru-2020-03-5.jpg",
      alt: "фото букета"
    },
    {
      src: "https://i.ibb.co/vwh8Cx2/photo-small-4.jpg",
      alt: "фото букета"
    },
    {
      src: "https://i.ibb.co/kHYGFvq/screenshot-russia-rozarioflowers-ru-2020-03-3.jpg",
      alt: "фото букета"
    },
    {
      src: "https://i.ibb.co/sCy9DVZ/screenshot-russia-rozarioflowers-ru-2020-03-4.jpg",
      alt: "фото букета"
    },
    {
      src: "https://i.ibb.co/mFWtSzn/screenshot-russia-rozarioflowers-ru-2020-03-2.jpg",
      alt: "фото букета"
    }
  ]

  let product = {
    descriptions:
      "Розовый цвет очень любим многими женщинами и девушками. С этим букетом вы прекрасно сможете продемонстрировать всю красоту данного оттенка." +
      "Помимо замечательных роз с розовым оттенком, данный букет хорошо дополняют синий лимониум, белые хризантемы и листья эвкалипта с фетром.",
    check:
      "Розовый цвет очень любим многими женщинами и девушками. С этим букетом вы прекрасно сможете продемонстрировать всю красоту данного оттенка." +
      "Помимо замечательных роз с розовым оттенком, данный букет хорошо дополняют синий лимониум, белые хризантемы и листья эвкалипта с фетром.",
    name: "Во имя любви",
    sizes: [
      {
        id: "small",
        text: "маленький",
        width: "25",
        height: "25",
        price: 1777,
        available: true,
        composition: [
          { name: "Роза малиновая", amount: 3 },
          { name: "Роза кустовая розовая", amount: 3 },
          { name: "Хризантема кустовая белая", amount: 3 },
          { name: "Лимониум синий", amount: 2 }
        ]
      },
      {
        id: "midlle",
        text: "средний",
        width: "50",
        height: "50",
        price: 2000,
        available: true,
        composition: [
          { name: "Роза малиновая", amount: 3 },
          { name: "Роза кустовая розовая", amount: 3 },
          { name: "Хризантема кустовая белая", amount: 3 },
          { name: "Лимониум синий", amount: 24 }
        ]
      },
      {
        id: "big",
        text: "большой",
        width: "75",
        height: "75",
        price: 3999,
        available: true,
        composition: [
          { name: "Роза малиновая", amount: 3 },
          { name: "Роза кустовая розовая", amount: 6 },
          { name: "Лимониум синий", amount: 2 }
        ]
      },
      {
        id: "verybig",
        text: "огромный",
        width: "100",
        height: "100",
        price: 5999,
        available: false,
        composition: [
          { name: "Роза малиновая", amount: 23 },
          { name: "Роза кустовая розовая", amount: 23 },
          { name: "Хризантема кустовая белая", amount: 23 },
          { name: "Лимониум синий", amount: 22 }
        ]
      }
    ],

    chip: 30
  }
  let deliveryOptions = [
    { text: "доставка к точному времени с 21:00 до 08:00", price: "549" },
    { text: "доставка интервал 2 часа с 21:00 до 08:00", price: "349" },
    { text: "доставка к точному времени с 08:00 до 21:00", price: "249" },
    { text: "доставка интервал 2 часа с 08:00 до 21-00", price: "0" }
  ]
  let width
  let numberSize = product.sizes[2]
</script>

<svelte:body
  on:click={(e) => {
    if (buttonElementHoliday.contains(e.target)) {
      return
    } else {
      visibleHoliday = false
    }
  }}
/>
<svelte:window bind:innerWidth={width} />

<section class="product-description custom-scrollbar flex">
  <div class="product__fixedButtons flex">
    <div class="product__fixedButton_right flex">
      {#if product.descriptions}
        <div class="product__price flex">
          <span class="product__price_main flex"
            ><AnimateNumber number="3800" />&nbsp;₽</span
          >
          <span class="product__price_withDiscount">3800 ₽</span>
        </div>
      {:else}
        <div class="product__price flex">
          <span class="product__price_main flex"
            ><AnimateNumber number="3800" />&nbsp;₽</span
          >
          <span class="product__price_withDiscount">3800 ₽</span>
        </div>
      {/if}
      <div>
        <Button size="lg">Сохранить изменения</Button>
      </div>
    </div>
  </div>
  <div class="product__photo">
    <div class="product__photo_item">
      <ImageViewer {imagelist} />
    </div>
  </div>
  <div class="product__configurations">
    <h1 class="product__name">{product.name}</h1>
    <div class="flex product__rating">
      <div class="stars__img flex">
        <div class="star"><img class="mr-8" src="/star.svg" alt="star" /></div>
        <div class="star"><img class="mr-8" src="/star.svg" alt="star" /></div>
        <div class="star"><img class="mr-8" src="/star.svg" alt="star" /></div>
        <div class="star"><img class="mr-8" src="/star.svg" alt="star" /></div>
        <div class="star"><img class="mr-8" src="/star.svg" alt="star" /></div>
      </div>
      <span class="product__rating-numeral">4,5</span>
      <span class="stars">|</span><span class="sales">36 продано</span>
    </div>
    {#if product.descriptions}
      <div class="product__size" />
    {/if}
    {#if !product.descriptions}
      <div class="params__container" />
    {/if}
    <div class="product__conditions" />
  </div>
</section>

<style>
  .product-description {
    height: 485px;
    overflow-y: scroll;
    padding: 24px;
  }
  .product__conditions {
    margin-bottom: 37px;
  }
  .product__photo {
    width: 350px;
    height: auto;
    position: absolute;
    top: 24px;
  }

  .product__configurations {
    margin-left: 375px;
    width: 366px;
  }
  .product__name {
    font-weight: bold;
    font-size: 24px;
    line-height: 135%;
    color: var(--color-main);
  }
  .product__text {
    margin-top: 12px;
    margin-bottom: 12px;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 130%;
    color: var(--gray-700);
  }
  .product__rating {
    font-weight: 600;
    font-size: 14px;
    margin-top: 8px;
    color: var(--color-main);
  }
  .stars {
    color: #c4c4c4;
    line-height: 190%;
    margin-right: 14px;
    margin-left: 14px;
  }
  .stars__img {
    padding-top: 6px;
  }
  .star {
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }
  .product__rating-numeral {
    margin-left: 12px;
    line-height: 200%;
  }
  .sales {
    font-weight: normal;
    font-size: 12px;
    line-height: 247%;
    color: #330033;
  }
  .product__size {
    margin-top: 34px;
  }
  .pink-size {
    font-size: 14px;
    color: var(--color-info);
    line-height: 100%;
    margin-left: 14px;
  }
  .pink-size_img {
    width: 13px;
    height: 7px;
  }
  .pink-size_img_width {
    margin-top: 4px;
    margin-right: 5px;
  }
  .product__fixedButtons {
    width: 100%;
    height: 105px;
    position: absolute;
    left: 0px;
    bottom: 0px;
    background: var(--gray-200);
    z-index: 11;
    border-top: 1px solid var(--gray-300);
    padding: 24px;
  }
  .product__fixedButton_right {
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }
  .product__price_main {
    font-weight: 600;
    font-size: 24px;
    color: var(--color-main);
    margin-right: 16px;
  }
  .product__price_withDiscount {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    text-decoration-line: line-through;
    color: #b0b0b0;
    margin-right: 34px;
    margin-top: 8px;
  }
  .garant img {
    margin-right: 6px;
  }
  .garant span {
    margin-right: 8px;
  }
  .garant {
    margin-bottom: 34px;
  }
  .garant .conditition-name {
    cursor: default;
  }
  .delivery {
    margin-bottom: 37px;
    -webkit-margin-bottom: 37px;
  }
  .delivery img {
    margin-right: 6px;
  }
  .delivery span {
    margin-right: 8px;
  }
  .delivery .conditition-text {
    margin-bottom: 4px;
  }
  .conditition-name {
    font-weight: 600;
    font-size: 14px;
    color: var(--color-main);
    margin-bottom: 4px;
    cursor: pointer;
  }
  .conditition-text {
    font-size: 14px;
    line-height: 135%;
    color: var(--gray-600);
  }
  .arrow {
    width: 10px;
    height: 5px;
    margin-top: 10px;
  }
  .option {
    font-size: 14px;
    line-height: 135%;
    color: var(--color-main);
  }
  .option div {
    width: 50px;
  }
  li:last-child {
    padding-bottom: 0;
  }
</style>
