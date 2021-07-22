<script>
  import CustomDropdown from "./CustomDropdown.svelte";
  export let recommendation;
  let infoVisible = false;
  let dealVisible = false;
  let infoElement;
  let dealElement;

  function toggleDeal() {
    dealVisible = !dealVisible;
  }
</script>

<style lang="postcss">
  .wrapper {
    box-shadow: 0px 4px 15px rgba(51, 0, 51, 0.1);
    width: 100%;
    height: auto;
  }
  .wrapper:hover {
    box-shadow: 0px 4px 15px rgba(51, 0, 51, 0.4);
  }
  .image-placeholder {
    background: white;
    max-height: 16rem;
    height: auto;
    padding-top: 106.3%;

  }
  .meta {
    padding-right: 16px;
    padding-left: 16px;
    padding-bottom: 25px;
    @apply pt-8;
  }

  .meta h2{
    font-size: 16px;
  }
  .main-image {
    color: rgba(0, 0, 0, 0) !important;
    background-image: url("../../static/loading-bg-image.svg");
  }
  .line-height-20 {
    line-height: 20px;
  }
  .info-box {
    top: 1rem;
    right: 1rem;
    width: 24px;
    height: 24px;
    @apply absolute ;
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
  }

</style>

<div class="wrapper flex flex-col rounded-lg">
  <div class="image-placeholder rounded-t-lg bg-white relative">
    <picture>
      <source
              data-srcset="{recommendation.img}.webp, {recommendation.img}-2x.webp 2x" />
      <img
              class="main-image rounded-t-lg object-contain absolute inset-0 h-full
        w-full"
              data-srcset="{recommendation.img}-2x.png"
              data-src="{recommendation.img}.png"
              alt={recommendation.title} />
    </picture>
    <noscript>
      <img srcset="{recommendation.img}-2x.png" src="{recommendation.img}.png" alt="{recommendation.title}">
    </noscript>
    <noscript>
      <img srcset="{recommendation.img}-2x.png" src="{recommendation.img}.png" alt="{recommendation.title}">
    </noscript>

    <div
            on:mouseenter={toggleDeal}
            on:mouseleave={toggleDeal}
            bind:this={dealElement}
            class="deal-box">
      <div class="text-black">%</div>
    </div>
    {#if dealVisible}
      <CustomDropdown
              css="width: 300px; max-height: 300px;"
              bind:dropdownVisible={dealVisible}
              relativeElement={dealElement}
              position="LEFT">
        <section class="bg-white px-32 py-24 rounded-lg">
          <h3
                  class="text-main font-semibold text-lg pb-16 border-b
            border-gray-300 mb-16">
            Избранное
          </h3>
          <p class="text-gray-700 text-sm truncate">Добавлено в избранное</p>
        </section>
      </CustomDropdown>
    {/if}
    <div
            on:mouseenter={() => {
            infoVisible = true;
            }}
            on:mouseleave={() => {
            infoVisible = false;
            }}
                    bind:this={infoElement}
                    class="info-box">
      <svg
              class="w-full h-full"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="36.643px"
              height="36.644px"
              viewBox="0 0 36.643 36.644">
        <g>
          <g>
            <polyline
                    fill="none"
                    stroke="#333333"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                    points=" 16.596,14.711 18.459,14.711 15.161,27.212 17.947,27.212 " />
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
              position="RIGHT">
        <section class="bg-white px-32 py-24 rounded-lg">
          <h3 class="text-main font-semibold text-lg pb-8 mb-8">
            {recommendation.title}
          </h3>
          <div class="text-main font-semibold text-sm">
            {recommendation.size.text}
          </div>
          <div
                  class="text-gray-700 mb-8 font-semibold text-sm inline-flex
            items-center">
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
  <div class="meta bg-white rounded-b-lg">
    <div class="overflow-hidden w-full mb-20">
      <h2 class="text-main text-sm leading-snug">{recommendation.title}</h2>
      <div class="text-gray-500 text-sm leading-snug">
        {@html recommendation.time}
      </div>
    </div>
    <div class="text-main flex justify-between items-center">
      {#if recommendation.price.sale}
        <div>
          <span
                  class="font-semibold mr-8 line-height-20 text-main text-lg
            whitespace-no-wrap">
            {recommendation.price.sale} ₽
          </span>
          <span
                  class="font-semibold line-through text-sm line-height-20
            text-gray-500 whitespace-no-wrap">
            {recommendation.price.full} ₽
          </span>
        </div>
      {:else}
        <span
                class="font-semibold line-height-20 text-main text-lg
          whitespace-no-wrap">
          {recommendation.price.full} ₽
        </span>
      {/if}
      <div class="flex items-center line-height-20">
        <svg xmlns="http://www.w3.org/2000/svg" class="mr-6" width="13" height="14" viewBox="0 0 13 14" fill="none">
          <path d="M4.77178 1.8069C5.54325 0.482364 7.45675 0.482364 8.22822 1.8069L8.80432 2.796C9.08693 3.2812 9.56048 3.62526 10.1093 3.74409L11.228 3.98635C12.7261 4.31076 13.3174 6.13061 12.2961 7.27362L11.5334 8.12717C11.1593 8.54588 10.9784 9.10258 11.035 9.66123L11.1503 10.8C11.3047 12.3251 9.75663 13.4498 8.35395 12.8317L7.3065 12.3701C6.79267 12.1437 6.20733 12.1437 5.6935 12.3701L4.64605 12.8317C3.24337 13.4498 1.69532 12.3251 1.84973 10.8L1.96503 9.66123C2.02159 9.10258 1.84071 8.54588 1.46659 8.12717L0.703922 7.27362C-0.317388 6.13061 0.273918 4.31076 1.77202 3.98635L2.89074 3.74409C3.43952 3.62526 3.91307 3.2812 4.19568 2.796L4.77178 1.8069Z" fill="#FFE033"/>
        </svg>
        <span class="text-lg line-height-20">{recommendation.rating}</span>
      </div>
    </div>
  </div>
</div>



