<script>
  import CustomDropdown from "./CustomDropdown.svelte"

  export let recommendation
  export let onHeartClick
  export let like

  let infoVisible = false
  let dealVisible = false
  let infoElement
  let dealElement

  function toggleDeal() {
    dealVisible = !dealVisible
  }
</script>

<div class="fav-card wrapper flex flex-col rounded-lg">
  <div class="fav-card__image-placeholder rounded-t-lg bg-white relative">
    <picture>
      <!--            <source srcset="{recommendation.img}.webp, {recommendation.img}-2x.webp 2x"/>-->
      <img
        class="main-image rounded-t-lg object-contain absolute inset-0 h-full w-full"
        data-src="{recommendation.img}.png"
        alt={recommendation.title}
      />
    </picture>
    <div
      on:mouseenter={toggleDeal}
      on:mouseleave={toggleDeal}
      bind:this={dealElement}
      class="deal-box"
    >
      <div class="text-black">%</div>
    </div>
    {#if dealVisible}
      <CustomDropdown
        css="width: 300px; max-height: 300px;"
        bind:dropdownVisible={dealVisible}
        relativeElement={dealElement}
        position="LEFT"
      >
        <section class="bg-white px-32 py-24 rounded-lg">
          <h3
            class="text-main font-semibold text-lg pb-16 border-b border-gray-300 mb-16"
          >
            Избранное
          </h3>
          <p class="text-gray-700 text-sm truncate">Добавлено в избранное</p>
        </section>
      </CustomDropdown>
    {/if}
    <div
      on:mouseenter={() => {
        infoVisible = true
      }}
      on:mouseleave={() => {
        infoVisible = false
      }}
      bind:this={infoElement}
      class="info-box"
    >
      <svg
        class="w-full h-full"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="36.643px"
        height="36.644px"
        viewBox="0 0 36.643 36.644"
      >
        <g>
          <g>
            <polyline
              fill="none"
              stroke="#333333"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
              points=" 16.596,14.711 18.459,14.711 15.161,27.212 17.947,27.212 "
            />
            <circle fill="#333333" cx="19.571" cy="9.2" r="1.672" />
          </g>
          <circle fill="none" stroke="#333333" cx="18" cy="18" r="17" />
        </g>
      </svg>
    </div>
    {#if infoVisible}
      <CustomDropdown
        css="width: 300px; max-height: 300px;"
        bind:dropdownVisible={infoVisible}
        relativeElement={infoElement}
        position="RIGHT"
      >
        <section class="bg-white px-32 py-24 rounded-lg">
          <h3 class="text-main font-semibold text-lg pb-8 mb-8">
            {recommendation.title}
          </h3>
          <div class="text-main font-semibold text-sm">
            {recommendation.size.text}
          </div>
          <div class="text-gray-700 mb-8 font-semibold text-sm inline-flex items-center">
            <div class="image-box mr-8">
              <img src="size-width.svg" alt="width" />
            </div>
            {recommendation.size.width}
            <div class="image-box mx-8">
              <img src="size-height.svg" alt="height" />
            </div>
            {recommendation.size.height}
          </div>
          <div class="text-main font-semibold text-sm">Состав</div>
          <div class="text-gray-700 text-sm">{recommendation.description}</div>
        </section>
      </CustomDropdown>
    {/if}
  </div>
  <div class="fav-card__meta bg-white rounded-b-lg">
    <div class="fav-card__meta-first overflow-hidden w-full">
      <h2 class="text-main">{recommendation.title}</h2>
      <div class="flex justify-between items-center h-24">
        <div class="fav-card__time text-gray-500">{@html recommendation.time}</div>
        {#if recommendation.like}
          <div on:click={() => onHeartClick(true)} class="fav-card__heart-wrap flex">
            <svg
              class="fav-card__heart cursor-pointer"
              width="24"
              height="21"
              viewBox="0 0 24 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21C12.0247 20.9887 24 15.5319 24 7.97984C24 -0.534669 15.662 -1.89944 11.9888 2.2927C8.30435 -1.8611 0 -0.487152 0 7.99487C0 15.4363 12 21 12 21Z"
                fill="#E71F75"
              />
            </svg>
          </div>
        {:else}
          <div on:click={() => onHeartClick(false)} class="fav-card__heart-wrap flex">
            <svg
              class="fav-card__heart cursor-pointer"
              width="24"
              height="21"
              viewBox="0 0 24 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21C12.0247 20.9887 24 15.5319 24 7.97984C24 -0.534669 15.662 -1.89944 11.9888 2.2927C8.30435 -1.8611 0 -0.487152 0 7.99487C0 15.4363 12 21 12 21Z"
                fill="#E5E5E5"
              />
            </svg>
          </div>
        {/if}
      </div>
    </div>
    <div class="fav-card__meta-second text-main flex justify-between items-center">
      {#if recommendation.price.sale}
        <div>
          <span class="fav-card__price-new font-bold mr-12 text-main whitespace-nowrap">
            {recommendation.price.sale} ₽
          </span>
          <span
            class="fav-card__price-old font-normal line-through text-gray-500 whitespace-nowrap"
          >
            {recommendation.price.full} ₽
          </span>
        </div>
      {:else}
        <span class="fav-card__price-new font-semibold text-main whitespace-nowrap">
          {recommendation.price.full} ₽
        </span>
      {/if}
      <div class="flex items-center">
        <svg
          class="star"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.77178 1.96718C6.54325 0.642644 8.45675 0.642642 9.22822 1.96718L10.1276 3.51132C10.4102 3.99652 10.8838 4.34058 11.4325 4.45941L13.179 4.83761C14.6771 5.16202 15.2684 6.98187 14.2471 8.12489L13.0565 9.45741C12.6824 9.87612 12.5015 10.4328 12.5581 10.9915L12.7381 12.7693C12.8925 14.2944 11.3444 15.4191 9.94174 14.801L8.3065 14.0804C7.79267 13.854 7.20733 13.854 6.6935 14.0804L5.05827 14.801C3.65559 15.4191 2.10753 14.2944 2.26194 12.7693L2.44195 10.9915C2.49851 10.4328 2.31763 9.87612 1.94351 9.45741L0.752867 8.12489C-0.268443 6.98187 0.322862 5.16202 1.82097 4.83761L3.56745 4.45941C4.11624 4.34058 4.58979 3.99652 4.8724 3.51132L5.77178 1.96718Z"
            fill="#FFE033"
          />
        </svg>
        <span class="fav-card__rate">{recommendation.rating}</span>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .fav-card {
    box-shadow: 0px 4px 15px rgba(51, 0, 51, 0.1);
    width: 261px;
    height: 381px;
    margin-right: calc(100% - 261px * 2);
    margin-bottom: 16px;
  }

  .fav-card:nth-child(2n) {
    margin-right: 0;
  }

  .fav-card:hover {
    box-shadow: 0 4px 15px rgba(51, 0, 51, 0.4);
  }

  .fav-card__image-placeholder {
    background: white;
    max-height: 16rem;
    height: auto;
    padding-top: 100%;
  }

  .fav-card__meta {
    padding: 12px 16px 27px;
  }

  .fav-card__meta h2 {
    font-size: 16px;
    line-height: 22px;
  }

  .fav-card__time {
    font-size: 14px;
    line-height: 19px;
  }

  .fav-card__time strong {
    @apply text-main;
    font-size: 14px;
    line-height: 19px;
  }

  .fav-card__meta-first {
    margin-bottom: 15px;
  }

  .fav-card__meta-second {
    height: 20px;
  }

  .fav-card__heart-wrap {
    width: 29px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fav-card__heart:hover {
    animation: pulse 1s linear infinite;
    animation-delay: 0s;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    33% {
      transform: scale(1.2);
    }
    66% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }

  .fav-card__price-new {
    font-size: 18px;
    line-height: 20px;
  }

  .fav-card__price-old {
    font-size: 14px;
    line-height: 20px;
  }

  .main-image {
    color: rgba(0, 0, 0, 0) !important;
  }

  .fav-card__rate {
    @apply text-main;
    font-size: 18px;
    line-height: 20px;
  }

  .info-box {
    top: 1rem;
    right: 1rem;
    width: 24px;
    height: 24px;
    @apply absolute;
  }

  .deal-box {
    top: 1rem;
    left: 1rem;
    width: 54px;
    height: 30px;
    display: flex;
    @apply absolute flex items-center justify-center rounded-full bg-deal;
  }

  .star {
    margin-right: 7px;
    flex-shrink: 0;
    display: flex;
  }

  @media (min-width: 1001px) {
    .fav-card {
      width: calc(100% / 3 - 18px * 2 / 3);
      margin-right: 18px;
      height: auto;
    }

    .fav-card:nth-child(2n) {
      margin-right: 18px;
    }

    .fav-card:nth-child(3n) {
      margin-right: 0;
    }

    .fav-card__meta {
      padding: 6px 16px 22px;
    }

    .fav-card__meta-second {
      height: auto;
      @apply items-end;
    }

    .fav-card__time {
      margin-right: 5px;
    }

    .fav-card__meta-first > div {
      height: auto;
      margin-top: 2px;
      @apply items-end;
    }
  }

  @media (min-width: 1301px) {
    .fav-card {
      width: calc(100% / 3 - 18px * 2 / 3);
      margin-right: 18px;
      height: auto;
      margin-bottom: 34px;
    }

    .fav-card:nth-child(2n) {
      margin-right: 18px;
    }

    .fav-card__meta {
      padding: 20px 16px 27px;
    }

    .fav-card__meta-first {
      margin-bottom: 21px;
    }

    .fav-card__meta-second {
      height: 20px;
      @apply items-center;
    }

    .fav-card__time {
      margin-right: 5px;
    }

    .fav-card__meta-first > div {
      /*@apply h-24;*/
      /*margin-top: 0;*/
      /*@apply items-center;*/
    }
  }

  @media (min-width: 1470px) {
    .fav-card {
      width: 290px;
      height: 424px;
      margin-bottom: 34px;
      margin-right: calc((100% - 290px * 3) / 2);
    }

    .fav-card:nth-child(2n) {
      margin-right: calc((100% - 290px * 3) / 2);
    }

    .fav-card:nth-child(3n) {
      margin-right: 0;
    }

    .fav-card__time {
      width: 100%;
    }

    .fav-card__meta-first > div {
      @apply h-24;
      margin-top: 0;
      @apply items-center;
    }
  }
</style>
