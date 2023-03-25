<script>
  import Portal from "./Portal.svelte"
  import IconButton from "./IconButton.svelte"
  import SelectLabel from "./SelectLabel.svelte"
  import Button from "./Button.svelte"
  import { fly, fade } from "svelte/transition"
  import cloneDeep from "lodash/cloneDeep"
  import CompositionProductElement from "./CompositionProductElement.svelte"

  export let visible
  export let order
  export let deliveryPrice = "50 ₽"
  let changeOrder
  let modalElement
  let openChangePostcard = false
  let changePricePostcard
  let changed = false

  changeOrder = cloneDeep(order)
  function closeViaOverlay(e) {
    if (modalElement && !modalElement.contains(e.target)) visible = !visible
  }

  function closeModal() {
    visible = !visible
  }
  export let prices = ["0 ₽", "50 ₽", "150 ₽", "250 ₽", "350 ₽"]

  $: if (order) {
    if (order != changeOrder) {
      changed = true
    } else {
      changed = false
    }
  }
</script>

<Portal>
  <div transition:fade on:click={closeViaOverlay} class="rounded modal-overlay">
    <div
      bind:this={modalElement}
      class="bg-white h-full rounded modal relative wrapper custom-scrollbar"
    >
      <div class="close-button">
        <IconButton on:click={closeModal} status="close" />
      </div>
      <div class=" ">
        <h2>Изменить состав/стоимость</h2>
        <p class="whitespace-nowrap mainText">
          Укажите корректные цены на составляющие. Для отстутствующих составляющих
          предложите замену.
        </p>
        <div class="products">
          {#each order.products as product}
            <div class="product">
              <div class="product__photo">
                {#if product.photo != ""}
                  <picture>
                    <source
                      data-srcset="{product.photo}.webp, {product.photo}-2x.webp 2x"
                    />
                    <img
                      class="main-image rounded-t-lg object-contain absolute inset-0 h-full w-full"
                      data-srcset="{product.photo}-2x.png"
                      data-src="{product.photo}.png"
                      alt={product.photo}
                    />
                  </picture>
                  <noscript>
                    <img
                      srcset="{product.photo}-2x.png"
                      src="{product.photo}.png"
                      alt={product.photo}
                    />
                  </noscript>
                  <noscript>
                    <img
                      srcset="product.photo}-2x.png"
                      src="{product.photo}.png"
                      alt={product.photo}
                    />
                  </noscript>
                {/if}
              </div>
              <div class="product__body">
                <div class="product__name flex items-center justify-between">
                  <div>{product.name}</div>
                  <div>{product.price} ₽</div>
                </div>
                {#each product.composition as composition}
                  <CompositionProductElement bind:composition />
                {/each}
              </div>
            </div>
          {/each}
          <div class="postcard flex items-center product__name">
            <div>Открытка —</div>
            <div class="ml-6 mr-12">
              {#if !openChangePostcard}
                {order.postcardPrice} ₽
              {:else}
                <input
                  class="changePrice"
                  bind:this={changePricePostcard}
                  bind:value={order.postcardPrice}
                  type="text"
                /> ₽
              {/if}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              class={openChangePostcard ? "hidden" : ""}
              fill="none"
              on:click={() => {
                openChangePostcard = true
                setTimeout(() => {
                  changePricePostcard.focus()
                }, 100)
              }}
            >
              <path
                d="M14.0284 0.971035C12.7372 -0.323515 10.6374 -0.323515 9.3462 0.971035L0.761638 9.55342C0.694522 9.62055 0.652973 9.70685 0.640189 9.79955L0.00417687 14.5111C-0.0149994 14.6453 0.0329412 14.7796 0.125626 14.8723C0.205527 14.9522 0.317389 15.0001 0.42925 15.0001C0.448426 15.0001 0.467603 15.0001 0.486779 14.9969L3.32486 14.6134C3.56137 14.5814 3.72756 14.364 3.6956 14.1275C3.66364 13.891 3.44631 13.7248 3.20981 13.7567L0.934225 14.0636L1.37847 10.7777L4.83659 14.2362C4.91649 14.3161 5.02835 14.364 5.14021 14.364C5.25208 14.364 5.36394 14.3193 5.44384 14.2362L14.0284 5.65379C14.6548 5.02729 15 4.19622 15 3.31081C15 2.42541 14.6548 1.59434 14.0284 0.971035ZM9.5124 2.02585L10.9538 3.46744L3.12032 11.3019L1.6789 9.86028L9.5124 2.02585ZM5.14341 13.322L3.73396 11.9124L11.5675 4.07795L12.9769 5.48758L5.14341 13.322ZM13.5778 4.87067L10.1292 1.42173C10.5671 1.06053 11.1136 0.862356 11.6889 0.862356C12.3441 0.862356 12.9577 1.11807 13.4212 1.57835C13.8846 2.03864 14.1371 2.65555 14.1371 3.31081C14.1371 3.88937 13.9389 4.43276 13.5778 4.87067Z"
                fill="#330033"
              />
            </svg>
          </div>
          <div class="delivery">
            <div class="flex product__name">
              <div>Доставка —</div>
              <div class="ml-8">{order.deliveriPrice} ₽</div>
            </div>
            <p class="-mt-4 mb-8 miniText">Доставка: {order.delivery}</p>
            <SelectLabel size="full" list={prices} select={deliveryPrice} />
          </div>
        </div>
        <div class="footer flex justify-between items-center">
          <div class="buttons flex">
            <Button
              size="lg"
              status={changed == true ? "active-main" : "disabled-main"}
              className="mr-24"
              on:click={() => {
                visible = false
              }}>Сохранить изменения</Button
            >
            <Button
              size="lg"
              status="active-secondary"
              on:click={() => {
                order = cloneDeep(changeOrder)
              }}>Отменить</Button
            >
          </div>
          <div class="price">
            <span class="mr-8">Итого: </span>
            <span class="font-semibold text-xl">
              {order.summ} ₽
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</Portal>

<style lang="postcss">
  .modal-overlay {
    z-index: 1000;
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
  .modal {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @apply p-24;
  }
  .close-button {
    top: 14px;
    right: 14px;
    @apply absolute;
    z-index: 11;
  }
  h2 {
    font-weight: 600;
    font-size: 18px;
    color: var(--color-main);
    margin-bottom: 8px;
  }

  h3 {
    font-size: 13px;
    color: var(--gray-600);
    margin-bottom: 8px;
    margin-top: 18px;
  }
  p {
    font-size: 15px;
    color: var(--gray-600);
  }
  .wrapper {
    overflow-y: scroll;
    overflow-x: hidden;
    width: 800px;
    height: 555px;
  }
  .products {
    margin-bottom: 24px;
  }
  .product {
    display: flex;
    margin-bottom: 24px;
  }
  .product:last-child {
    margin-bottom: 0;
  }
  .product__photo {
    min-width: 138px;
    max-width: 138px;
    height: 138px;
    background-image: url("../../static/loading-bg-image.svg");
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    margin-right: 34px;
  }
  .product__body {
    padding-bottom: 4px;
    border-bottom: 1px solid var(--gray-300);
    width: 100%;
  }
  .postcard {
    border-bottom: 1px solid var(--gray-300);
    padding: 0 0 24px 0;
    margin-left: 170px;
  }
  .delivery {
    border-bottom: 1px solid var(--gray-300);
    padding: 0 0 24px 0;
    margin-left: 170px;
    margin-bottom: 30px;
    margin-top: 16px;
  }
  .product__name {
    font-weight: 600;
    font-size: 15px;
    color: var(--color-main);
    margin-bottom: 16px;
  }

  svg:hover path {
    fill: var(--color-info);
  }
  .price {
    font-size: 15px;
    color: var(--color-main);
  }
  .footer {
    width: 799px;
    height: 93px;
    background: var(--gray-100);
    position: sticky;
    bottom: -24px;
    left: -24px;
    margin-left: -24px;
    margin-bottom: -24px;
    padding: 24px;
  }
  .changePrice {
    width: 49px;
    height: 34px;
    background: var(--color-light);
    border: 1px solid var(--color-info-light);
    box-sizing: border-box;
    border-radius: 4px;
    padding: 11px 8px;
    padding-right: 0;
    font-size: 14px;
    color: var(--color-main);
    margin-right: 6px;
  }
  .mainText {
    margin-bottom: 30px;
  }
  .miniText {
    font-size: 14px;
  }
  .close-button {
    top: 16px;
    right: 16px;
    @apply absolute;
  }
</style>
