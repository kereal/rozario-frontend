<script context="module">
  export async function preload(page, session) {
    try {
      let navigator = window.navigator
      return {
        useragent: navigator.userAgent,
      };
    } catch (e) {
      console.log(e);
    }
  }
</script>

<script>
  import { createEventDispatcher } from "svelte";
  import { mainStore } from "../stores/global.js";
  import { orderStore } from '../stores/order.js';
  import CardLabel from "./CardLabel.svelte";
  import CustomDropdown from "./CustomDropdown.svelte";
  import DealLabel from "./DealLabel.svelte";
  import { onMount } from "svelte";
  export let flower;
  export let className = "";
  export let selectable = false;
  export let useragent;
  let desktop = false;
  const dispatch = createEventDispatcher();
  let selected = false;
  let labelNewPopupVisible = false;
  let labelHitPopupVisible = false;
  let dealsaleVisible = false;
  let dealgiftVisible = false;
  let dealcouponVisible = false;
  let likeVisible = false;
  let likeAddedVisible = false;
  let dealsaleElement;
  let dealcouponElement;
  let dealgiftElement;
  let likeElement;
  let labelHitElement;
  let labelNewElement;
  let heartElement;

  // FIXME refactor this
  function showLabelNewPopup() {
    if (!labelNewPopupVisible) {
      labelNewPopupVisible = true;
    }
  }
  function closeLabelNewPopup() {
    if (labelNewPopupVisible) {
      labelNewPopupVisible = false;
    }
  }
  function showDealGiftPopup() {
    if (!dealgiftVisible) {
      dealgiftVisible = true;
    }
  }
  function closeDealGiftPopup() {
    if (dealgiftVisible) {
      dealgiftVisible = false;
    }
  }
  function showLabelHitPopup() {
    if (!labelHitPopupVisible) {
      labelHitPopupVisible = true;
    }
  }
  function closeLabelHitPopup() {
    if (labelHitPopupVisible) {
      labelHitPopupVisible = false;
    }
  }
  function showDealSalePopup() {
    if (!dealsaleVisible) {
      dealsaleVisible = true;
    }
  }
  function closeDealSalePopup() {
    if (dealsaleVisible) {
      dealsaleVisible = false;
    }
  }
  function showDealCouponPopup() {
    if (!dealcouponVisible) {
      dealcouponVisible = true;
    }
  }
  function closeDealCouponPopup() {
    if (dealcouponVisible) {
      dealcouponVisible = false;
    }
  }
  function showLikePopup() {
    if (!likeVisible) {
      likeVisible = true;
    }
  }
  function closeLikePopup() {
    if (likeVisible) {
      likeVisible = false;
    }
  }

  function addToFavorites() {
    const item = $mainStore.favorites.find(item => item.id === flower.id);
    if (item) {
      mainStore.removeFromFavorites(item);
      heartElement.classList.remove("heart-selected");
    } else {
      likeAddedVisible = true;
      setTimeout(() => {
        likeAddedVisible = false;
      }, 2000);
      mainStore.addToFavorites(flower);
      heartElement.classList.add("heart-selected");
    }
  }

  function selectFlower() {
    if (!selectable) {
      return;
    }
    const index = $orderStore.orderList.findIndex(
      item => item.flower.id === flower.id
    );
    if (index !== -1) {
      orderStore.deleteFromOrderList(flower);
      selected = false;
    } else {
      orderStore.addToOrderList(flower);
      selected = true;
    }
  }

  $: selected =
    $orderStore.orderList.findIndex(item => item.flower.id === flower.id) !== -1
      ? true
      : false;
</script>

<style lang="postcss">
  :global(.bfc-sale-dropdown) {
    max-height: 360px;
    width: 272px;
  }
  .bigflowercard :global(.icon) {
    position: static;
  }

  .bigflowercard-image {
    background-image: url("../../static/loading-bg-image.svg");
    padding-top: 100%;
    @apply w-full relative;
  }
  .bigflowercard-image:before {
    content: "";
    background-color: rgba(0, 0, 0, 0);
    display: block;
    position: absolute;
    width: 100%;
    z-index: 2;
  }
  .card-image {
    color: rgba(0, 0, 0, 0) !important;
    @apply w-full h-full inset-0 absolute object-cover;
  }

  .bigflowercard :global(.deal) {
    bottom: 68px;
    @apply absolute;
  }
  .dealcoupon {
    width: 72px;
    height: 48px;
    background-image: url("../../static/coupon-in-card.svg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    bottom: 68px;
    @apply absolute;
  }
  @media (min-width: 1280px) {
    .dealcoupon {
      bottom: 3rem;
    }
    .bigflowercard :global(.deal) {
      bottom: 3rem;
    }
  }
  .like {
    bottom: 34px;
    right: 1.5rem;
    @apply absolute;
  }
  .label {
    top: 0;
    @apply absolute;
  }
  .size-height {
    right: 1.2rem;
    top: 0;
  }
  .size-width {
    left: 0.2rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .heart {
    @apply text-gray-500;
  }
  .heart:hover {
    animation-name: heartbeat;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    @apply text-info;
  }
  .bigflowercard :global(.heart-selected) {
    @apply text-info;
  }
  .bigflowercard[class~="selected"]:after {
    display: block;
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 4px;
    background-color: var(--color-accent);
  }

  .title {
    max-height: 2.9rem;
    overflow: hidden;
  }

  .price {
    top: 0;
    right: 0;
  }

  .top-block {
    height: 10rem;
  }

  @media (min-width: 1420px) {
    .top-block {
      height: 8.7rem;
    }
  }

  @keyframes heartbeat {
    0% {
      transform: scale(1.2);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.2);
    }
  }
</style>

<a href="{desktop ? '/product/cardMobile' + flower.id : '/product/' + flower.id}" class="rounded">
<div
  on:click={selectFlower}
  class:selected
  class="{className} h-full cursor-pointer bg-white hover:shadow-carddark
  bigflowercard relative flex-col flex justify-between shadow-card rounded">
  <div
    class="top-block flex justify-between flex-col text-main xxl:text-lg
    font-regular px-24 pt-24 pb-24">
    <div class="mb-12 flex relative">
      <div class="w-full flex flex-wrap">
        <h3
          class="overflow-y-hidden inline-block mb-4 mr-4 pr-24 leading-tight title">
          {flower.title}
        </h3>
        <div
          class="text-gray-700 font-semibold text-sm inline-flex items-center">
          <div class="image-box mr-8">
            <img src="size-width.svg" alt="width" />
          </div>
          {flower.size.width.num}
          <div class="image-box mx-8">
            <img src="size-height.svg" alt="width" />
          </div>
          {flower.size.width.num}
        </div>
      </div>
      <span class="price leading-tight font-semibold whitespace-no-wrap">
        {flower.price}&nbsp;₽
      </span>
    </div>
    <div class="text-gray-600 text-ssm leading-tight">
      {flower.description}
    </div>
  </div>
  <div class="bigflowercard-image rounded-b">
    <picture>
      <source data-srcset="{flower.image}, {flower.image} 2x" />
      <img
        class="card-image"
        src="loading-bg-image.svg"
        data-srcset="{flower.image}-2x"
        data-src="{flower.image}"
        alt={flower.title} />
    </picture>
    <noscript>
      <img srcset="{flower.image}-2x" src="{flower.image}" alt="{flower.title}">
    </noscript>
    <div class="like rounded">
      <div class="flex flex-col items-center rounded">
        <button aria-label="heart" on:click|stopPropagation={addToFavorites} class="mb-12">
          <svg
            bind:this={heartElement}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 67.764 53.149"
            enable-background="new 0 0 67.764 53.149"
            xml:space="preserve"
            class="heart fill-current w-32 h-24">
            <path
              d="M55.712,1.563C48.001-1.7,39.395,0.324,33.882,5.977C28.37,0.324,19.763-1.7,12.052,1.563
              C2.011,5.815-2.685,17.402,1.567,27.444c6.734,15.907,31.8,25.505,32.301,25.695c0,0.001,0.004,0.009,0.004,0.009
              s0.009-0.003,0.01-0.004c0.001,0,0.01,0.004,0.01,0.004s0.004-0.008,0.004-0.009c0.501-0.19,25.566-9.788,32.301-25.695
              C70.448,17.402,65.753,5.815,55.712,1.563z" />
          </svg>
        </button>
        {#if likeAddedVisible}
          <CustomDropdown
            css="width: 300px; max-height: 300px;"
            bind:visible={likeAddedVisible}
            relativeElement={heartElement}
            position="RIGHT">
            <section class="bg-white px-32 py-24 rounded-lg">
              <h3
                class="text-main font-semibold text-lg pb-16 border-b
                border-gray-300 mb-16">
                Избранное
              </h3>
              <p class="text-gray-700 text-sm truncate">
                Добавлено в избранное
              </p>
            </section>
          </CustomDropdown>
        {/if}
        <div
          on:mouseenter={showLikePopup}
          on:mouseleave={closeLikePopup}
          bind:this={likeElement}
          class="border border-gray-300 rounded px-4">
          <div
            class="text-info font-semibold border-b border-gray-300 text-sm
            pt-4 pb-4 text-center">
            4,5
          </div>
          <div class="text-gray-700 pt-4 pb-4 text-sm text-center">343</div>
        </div>
        {#if likeVisible}
          <CustomDropdown
            css="width: 300px; max-height: 300px;"
            bind:visible={likeVisible}
            relativeElement={likeElement}
            position="RIGHT">
            <section class="bg-white px-34 py-24 rounded">
              <h3
                class="text-main font-semibold text-lg pb-16 border-b
                border-gray-300 mb-16">
                Очень хорошо (4.5)
              </h3>
              <ul class="text-main-700 text-sm">
                <li class="w-full text-main flex items-center justify-between">
                  <span>Свежесть цветов</span>
                  <span>4.8</span>
                </li>
                <li class="w-full text-main flex items-center justify-between">
                  <span>Сервис обслуживания</span>
                  <span>4.9</span>
                </li>
                <li class="w-full text-main flex items-center justify-between">
                  <span>Работа курьера</span>
                  <span>4.9</span>
                </li>
              </ul>
            </section>
          </CustomDropdown>
        {/if}
      </div>
    </div>
    {#if flower.newItem}
      <CardLabel
        on:mouseenter={showLabelNewPopup}
        on:mouseleave={closeLabelNewPopup}
        bind:element={labelNewElement}
        type="NEW" />
      {#if labelNewPopupVisible}
        <CustomDropdown
          css="width: 256px; max-height: 300px;"
          bind:visible={labelNewPopupVisible}
          relativeElement={labelNewElement}
          position="LEFT">
          <section class="bg-white px-32 py-24 rounded">
            <h3
              class="text-main font-semibold text-lg pb-16 border-b
              border-gray-300 mb-16">
              Новинка
            </h3>
            <p class="text-gray-700 text-sm">
              Данный товар был недавно добавлен в каталог и уже готов к доставке
            </p>
          </section>
        </CustomDropdown>
      {/if}
    {:else if flower.hitItem}
      <CardLabel
        on:mouseenter={showLabelHitPopup}
        on:mouseleave={closeLabelHitPopup}
        bind:element={labelHitElement}
        type="HIT" />
      {#if labelHitPopupVisible}
        <CustomDropdown
          css="width: 256px; max-height: 300px;"
          bind:visible={labelHitPopupVisible}
          relativeElement={labelHitElement}
          position="LEFT">
          <section class="bg-white px-34 py-20 rounded">
            <h3
              class="text-main font-semibold text-lg pb-16 border-b
              border-gray-300 mb-16">
              Хит продаж
            </h3>
            <p class="text-gray-700 text-sm">
              За последние время данный товар купили 130 разв в г. Мурманске
            </p>
          </section>
        </CustomDropdown>
      {/if}
    {/if}
    {#if flower.dealsale}
      <DealLabel
        on:mouseenter={showDealSalePopup}
        on:mouseleave={closeDealSalePopup}
        bind:element={dealsaleElement}
        className="deal">
        <span class="text-lg">-25%</span>
      </DealLabel>
      {#if dealsaleVisible}
        <CustomDropdown
          css="width: 224px; max-height: 300px;"
          bind:visible={dealsaleVisible}
          relativeElement={dealsaleElement}
          position="LEFT">
          <section class="bg-white px-32 py-24 rounded">
            <h3
              class="text-main font-semibold text-lg pb-16 border-b
              border-gray-300 mb-16">
              Скидка 25%
            </h3>
            <p class="text-gray-700 text-sm">На товар</p>
          </section>
        </CustomDropdown>
      {/if}
    {:else if flower.dealgift}
      <DealLabel
        on:mouseenter={showDealGiftPopup}
        on:mouseleave={closeDealGiftPopup}
        bind:element={dealgiftElement}
        className="deal">
        <img class="icon" src="gift.svg" alt="gift" />
      </DealLabel>
      {#if dealgiftVisible}
        <CustomDropdown
          css="width: 300px; max-height: 300px;"
          bind:visible={dealgiftVisible}
          relativeElement={dealgiftElement}
          position="LEFT">
          <section class="bg-white px-32 py-24 rounded">
            <h3
              class="text-main font-semibold text-lg pb-16 border-b
              border-gray-300 mb-16">
              Шары в подарок
            </h3>
            <p class="text-gray-700 text-sm">
              При заказе букета дарим 5 гелевых шаров в подарок
            </p>
          </section>
        </CustomDropdown>
      {/if}
    {:else if flower.dealcoupon}
      <div
        on:mouseenter={showDealCouponPopup}
        on:mouseleave={closeDealCouponPopup}
        bind:this={dealcouponElement}
        class="dealcoupon rounded-r-lg flex flex-col items-center justify-center
        tracking-wider text-white font-semibold">
        <div class="leading-none text-lg font-light">245 ₽</div>
        <div class="leading-none text-sm font-light">купон</div>
      </div>
      {#if dealcouponVisible}
        <CustomDropdown
          css="width: 300px; max-height: 300px;"
          bind:visible={dealcouponVisible}
          className="bfc-dealcoupon-dropdown"
          relativeElement={dealcouponElement}
          position="LEFT">
          <section class="bg-white px-32 py-24 rounded-lg">
            <h3
              class="text-main font-semibold text-lg pb-16 border-b
              border-gray-300 mb-16">
              Купон 256 руб за товар
            </h3>
            <p class="text-gray-700 text-sm">
              Собирайте купоны и делайте следующие покупки со скидкой. Вы можете
              потратить их сразу или накопить. Что бы посмотреть сколько купонов
              на вашем счете, перейдите в раздел «Мои купоны»
            </p>
          </section>
        </CustomDropdown>
      {/if}
    {/if}
  </div>
</div>
</a>