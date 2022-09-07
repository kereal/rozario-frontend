<script>
  import CustomDropdown from "./CustomDropdown.svelte";
  import DealLabel from "./DealLabel.svelte";
  export let collection;
  export let variant;
  export let className = "";

  let onePlusOneVisible = false;
  let dealgiftVisible = false;

  let onePlusOneElement;
  let dealgiftElement;

  function showOnePlusOnePopup() {
    onePlusOneVisible = true;
  }
  function hideOnePlusOnePopup() {
    onePlusOneVisible = false;
  }
  function showDealGiftPopup() {
    dealgiftVisible = true;
  }
  function closeDealGiftPopup() {
    dealgiftVisible = false;
  }
</script>

<style>
  .collections-card {
    flex: 1 0 30%;
    max-width: 33.33333%;
  }
  .collections-card :global(.deal) {
    top: 0rem;
  }
  .image-placeholder {
    background-image: url("../../static/loading-bg-image.svg");
    padding-top: 100%;
  }
  .sh {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  }
  .sh:hover {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  }
</style>

<div class="relative rounded-lg h-full collections-card {className}">
  <a href={collection.permalink} class="sh rounded-lg h-full">
    <div
      class="image-placeholder w-full rounded-t-lg overflow-hidden relative
      object-cover">
      <picture>
        <!-- <source
          data-srcset="{collection.src}.webp, {collection.src}-2x.webp 2x" />
        <img
          class="rounded-t-lg w-full h-full absolute inset-0"
          data-srcset="{collection.src}-2x.png 2x"
          data-src="{collection.src}.png"
          alt={collection.name} /> -->
        <source
          data-srcset="{collection.image}" />
        <img
          style="height:auto"
          class="rounded-t-lg w-full h-full absolute inset-0"
          data-srcset="{collection.image}"
          data-src="{collection.image}"
          alt={collection.name} />
      </picture>
      <noscript>
        <!-- <img srcset="{collection.src}-2x.png 2x" src="{collection.src}.png" alt="{collection.name}"> -->
        <img srcset="{collection.image}" src="{collection.image}" alt="{collection.name}">
      </noscript>
      {#if collection.oneplusone}
        <DealLabel
          on:mouseenter={showOnePlusOnePopup}
          on:mouseleave={hideOnePlusOnePopup}
          className="deal absolute"
          bind:element={onePlusOneElement}>
          <span class="text-lg text-white">1+1</span>
        </DealLabel>
        {#if onePlusOneVisible}
          <CustomDropdown
            css="width: 256px; max-height: 300px;"
            bind:visible={onePlusOneVisible}
            relativeElement={onePlusOneElement}
            position="LEFT">
            <section class="bg-white px-32 py-20 rounded-lg">
              <h3
                class="text-main font-semibold text-lg pb-16 border-b
                border-gray-300 mb-16">
                Один плюс один
              </h3>
              <p class="text-gray-700 text-sm">2</p>
            </section>
          </CustomDropdown>
        {/if}
      {:else if collection.dealgift}
        <DealLabel
          on:mouseenter={showDealGiftPopup}
          on:mouseleave={closeDealGiftPopup}
          bind:element={dealgiftElement}
          className="deal absolute">
          <img class="icon" src="gift.svg" alt="gift" />
        </DealLabel>
        {#if dealgiftVisible}
          <CustomDropdown
            css="width: 300px; max-height: 300px;"
            bind:visible={dealgiftVisible}
            relativeElement={dealgiftElement}
            position="LEFT">
            <section class="bg-white px-32 py-24 rounded-lg">
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
      {/if}
    </div>
    <div class="flex flex-col rounded-b-lg px-20 pb-20 py-16">
      <h2 class="text-xl text-main font-bold mb-16 leading-tight truncate">{collection.name}</h2>
      <div class="flex mb-8 items-center flex-wrap">
        <img class="w-16 h-16 mr-16" src="delivery-sm-p.svg" alt="delivery" />
        <img class="w-16 h-16 mr-16" src="gift-sm-p.svg" alt="gift" />
        <img class="w-16 h-16 mr-16" src="sun-sm-p.svg" alt="sun" />
        <img class="w-16 h-16 mr-16" src="shopper-sm-p.svg" alt="shopper" />
        <img class="w-16 h-16 mr-34" src="star-sm-p.svg" alt="star" />
      </div>
      <!-- <div class="text-gray-700 text-sm font-semibold">
        <a href="/">Розы</a>
        <span>&#8226;</span>
        <a href="/">Шикарные</a>
      </div> -->
    </div>
  </a>
</div>
