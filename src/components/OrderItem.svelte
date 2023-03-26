<script>
  import { onMount, createEventDispatcher } from "svelte"
  import ConfirmationModal from "./ConfirmationModal.svelte"
  import ChangeOrderItemModal from "./ChangeOrderItemModal.svelte"

  export let flower

  import { page } from "$app/stores"

  const dispatch = createEventDispatcher()

  function toggleChangeVisible() {
    changeModalVisible = !changeModalVisible
  }

  let confirmDeletionModalVisible = false
  let changeModalVisible = false
  let ChangeOrderItemModalVisible = false

  function lessItems() {
    if (flower.quantity > 1) {
      dispatch("dec-item", {
        flower
      })
    } else {
      confirmDeletionModalVisible = true
    }
  }

  function moreItems() {
    dispatch("inc-item", {
      flower
    })
  }

  function deleteItem() {
    confirmDeletionModalVisible = false
    setTimeout(() => {
      dispatch("delete-item", {
        flower
      })
    }, 600)
  }

  function closeModal() {
    confirmDeletionModalVisible = false
  }

  function formatPrice(price) {
    if (price > 9999) {
      const stringPrice = price.toString()
      const formattedPrice = stringPrice.slice(0, 2) + " " + stringPrice.slice(2)
      return formattedPrice
    }
    return price
  }
</script>

<div class="flex -ml-8">
  {#if flower}
    <div
      class="item flex"
      on:click={() => {
        changeModalVisible = !changeModalVisible
      }}
    >
      {#if $page.url.pathname === "/cart"}
        <div class="image-box mr-12">
          <img
            class="hide-text w-full h-full absolute inset-0"
            src={flower.src}
            alt={flower.title}
          />
        </div>
      {/if}
      <div class="order-meta mr-8 ">
        <h2 class="text-main leading-mid text-one-five">{flower.title}</h2>
        <div class="mt-2 text-gray-600 text-xs leading-tight">
          <div class="size">
            <div>
              {flower.size.name ? "размер" : ""}
              {flower.size.name},
            </div>
            <div>
              {flower.size.width.num}x{flower.size.height.num}
              {flower.size.width.measureUnit}
            </div>
          </div>
        </div>
        <div class="order__button-change">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path
              d="M14.0284 0.970913C12.7372 -0.323637 10.6374 -0.323637 9.3462 0.970913L0.761638 9.5533C0.694522 9.62043 0.652973 9.70673 0.640189 9.79942L0.00417687 14.5109C-0.0149994 14.6452 0.0329412 14.7794 0.125626 14.8721C0.205527 14.9521 0.317389 15 0.42925 15C0.448426 15 0.467603 15 0.486779 14.9968L3.32486 14.6132C3.56137 14.5813 3.72756 14.3639 3.6956 14.1274C3.66364 13.8908 3.44631 13.7246 3.20981 13.7566L0.934225 14.0634L1.37847 10.7775L4.83659 14.2361C4.91649 14.316 5.02835 14.3639 5.14021 14.3639C5.25208 14.3639 5.36394 14.3192 5.44384 14.2361L14.0284 5.65367C14.6548 5.02717 15 4.1961 15 3.31069C15 2.42528 14.6548 1.59421 14.0284 0.970913ZM9.5124 2.02573L10.9538 3.46732L3.12032 11.3017L1.6789 9.86016L9.5124 2.02573ZM5.14341 13.3219L3.73396 11.9123L11.5675 4.07783L12.9769 5.48745L5.14341 13.3219ZM13.5778 4.87054L10.1292 1.42161C10.5671 1.06041 11.1136 0.862234 11.6889 0.862234C12.3441 0.862234 12.9577 1.11795 13.4212 1.57823C13.8846 2.03852 14.1371 2.65543 14.1371 3.31069C14.1371 3.88924 13.9389 4.43264 13.5778 4.87054Z"
              fill="#330033"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="counter-wrapper relative">
      <div class="counter rounded text-gray-700 flex flex-col items-center">
        <button
          type="button"
          on:click={moreItems}
          class="w-full more-btn invisible flex justify-center items-center"
        >
          <svg
            class="fill-current text-gray-700 w-24 h-24"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </button>
        <div class="total text-gray-600 text-one-five align-baseline">
          {flower.quantity}
        </div>
        {#if flower.quantity === 1}
          <button
            type="button"
            on:click={lessItems}
            class="w-full less-btn invisible flex justify-center items-center"
          >
            <svg
              class="fill-current text-gray-700 w-24 h-24"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41
              19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </button>
        {:else}
          <button
            type="button"
            on:click={lessItems}
            class="w-full less-btn invisible flex justify-center items-center"
          >
            <svg
              class="fill-current text-gray-700 w-24 h-24"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M19 13H5v-2h14v2z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </button>
        {/if}
      </div>
    </div>
    <div class="order-price text-main text-one-five leading-mid ml-8">
      {formatPrice(flower.price)}&nbsp;₽
    </div>
  {/if}
</div>

{#if confirmDeletionModalVisible}
  <ConfirmationModal
    cancelText="Нет"
    confirmText="Да"
    text="Вы действительно хотите удалить этот товар из корзины?"
    on:confirm={deleteItem}
    on:close={closeModal}
  />
{/if}
{#if changeModalVisible}
  <ChangeOrderItemModal on:close={toggleChangeVisible} />
{/if}

<style lang="postcss">
  .image-box {
    min-width: 48px;
    max-width: 48px;
    min-height: 48px;
    max-height: 48px;

    @apply relative rounded border border-gray-300 bg-white;
  }
  .hide-text {
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
  }
  img:before {
    color: transparent;
  }
  .counter {
    left: 0;
    top: -31px;
    position: absolute;
    min-width: 35px;
    max-width: 35px;
    height: 83px;
  }
  .counter:hover .more-btn {
    @apply visible;
  }
  .counter:hover .less-btn {
    @apply visible;
  }
  .counter:hover {
    @apply bg-white border border-gray-300;
  }
  .counter:hover .total {
    @apply text-main font-semibold;
  }
  button:hover svg {
    @apply text-info;
  }
  .more-btn {
    height: calc(100% / 3);
  }
  .less-btn {
    height: calc(100% / 3);
  }
  .total {
    height: calc(100% / 3);
    line-height: 27px;
  }
  .item {
    padding: 8px 12px;
    position: relative;
    margin-top: -12px;
    width: 100%;
  }
  .item:hover {
    background-color: #fff;
    cursor: pointer;
    border-radius: 4px;
  }
  .order-meta {
    flex: 1 1 auto;
  }
  .item svg {
    display: none;
    position: absolute;
    right: 8px;
    bottom: 12px;
  }
  .item:hover svg {
    display: block;
  }
  .order-meta h2 {
    margin-bottom: 4px;
  }
  .counter-wrapper {
    min-width: 35px;
    max-width: 35px;
  }

  .size {
    margin-bottom: 2px;
    line-height: 140%;
  }
</style>
