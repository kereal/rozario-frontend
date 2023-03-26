<script>
  import { createEventDispatcher } from "svelte"
  import OrderItem from "./OrderItem.svelte"
  import DeliveryTimeDropdown from "./DeliveryTimeDropdown.svelte"
  import CustomDropdown from "./CustomDropdown.svelte"
  import HeroTime from "./HeroTime.svelte"
  import ChangeOrderItemModal from "./ChangeOrderItemModal.svelte"
  import ConfirmationModal from "./ConfirmationModal.svelte"
  import IconButton from "./IconButton.svelte"
  import TrashBin from "./icons/TrashBin.svelte"
  import DeliveryTimeModal from "./DeliveryTimeModal.svelte"

  export let orderList = []
  export let postcard = 2

  export let price = 0
  export let selectedDate = ""
  import { page } from "$app/stores"
  const dispatch = createEventDispatcher()

  let deleteModalVisible = false
  let timeModalVisible = false
  function toggletimeModalVisible() {
    timeModalVisible = !timeModalVisible
  }

  function removeOrder() {
    if (orderList.length) {
      deleteModalVisible = true
    }
  }

  function closeDeleteModal() {
    deleteModalVisible = false
  }

  function deleteOrderList() {
    deleteModalVisible = false
    setTimeout(() => {
      dispatch("delete-list")
    }, 600)
  }

  function deleteFlower({ detail }) {
    dispatch("delete-flower", {
      flower: detail.flower
    })
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

<div class="h-full flex flex-col">
  <div class="content h-0 bg-gray-100 rounded w-full flex flex-col">
    <div class="custom-scrollbar flex-1 overflow-auto">
      <div class="px-18 py-20 h-full flex flex-col">
        <div class="flex items-center justify-between">
          <h2 class="text-main text-lg font-bold">Мой заказ</h2>
          {#if orderList.length}
            <div class="delete-button" on:click={removeOrder}>
              <svg
                class=""
                width="20px"
                height="20px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  class=""
                  d="M29.1 5.6h-6.3C22.5 2.4 20.7 0 18.4 0h-4.8c-2.3 0-4.1 2.4-4.4 5.6H2.9c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1h1.4v20.5C4.3 30.3 6 32 8 32h16c2 0 3.7-1.7 3.7-3.7V7.8h1.4c.6 0 1.1-.5 1.1-1.1s-.4-1.1-1.1-1.1zM13.6 2.3h4.8c.9 0 1.9 1.4 2.1 3.3h-9.1c.3-1.9 1.3-3.3 2.2-3.3zm11.8 26c0 .7-.7 1.4-1.4 1.4H8c-.7 0-1.4-.7-1.4-1.4V7.8h18.9v20.5z"
                />
                <path
                  class=""
                  d="M13 24c.6 0 1.1-.5 1.1-1.1v-9.2c0-.6-.5-1.1-1.1-1.1s-1.1.5-1.1 1.1v9.2c-.1.6.5 1.1 1.1 1.1zM19 24c.6 0 1.1-.5 1.1-1.1v-9.2c0-.6-.5-1.1-1.1-1.1-.6 0-1.1.5-1.1 1.1v9.2c0 .6.5 1.1 1.1 1.1z"
                />
              </svg>
            </div>
          {/if}
        </div>
        {#if orderList.length}
          <ul class="mb-16">
            {#each orderList as order (order.flower.id)}
              <li class="last:mb-0 mb-24">
                <OrderItem
                  on:add
                  on:delete-item
                  on:delete-list
                  on:dec-item
                  on:inc-item
                  on:remove
                  bind:count={order.count}
                  flower={order.flower}
                />
              </li>
            {/each}
          </ul>
        {:else}
          <div
            class="no-items-text text-center relative text-gray-700 text-sm
            m-auto"
          >
            Выберите букет и добавьте его к заказу
          </div>
        {/if}
        {#if orderList.length}
          <div class="mb-16 pt-14 border-t border-gray-1000">
            {#if postcard != 0}
              <div class="text-main flex justify-between mb-12">
                <div class="text-one-five leading-mid">Открытка</div>
                <div
                  style={$page.url.pathname == "/cart"
                    ? "margin-left: 120px;"
                    : "margin-left: 77px;"}
                  class="countPostCard"
                >
                  {postcard}
                </div>
                <div class="text-sm">0&nbsp;₽</div>
              </div>
            {/if}
            <div class="text-main flex justify-between mb-12">
              <div class="text-one-five leading-mid">Доставка</div>
              <div class="text-sm">500&nbsp;₽</div>
            </div>
            <div class="text-main flex justify-between mb-12">
              {#if $page.url.pathname == "/cart"}
                <div class="text-one-five leading-mid">Фото в момент вручения</div>
                <div class="text-sm">0&nbsp;₽</div>
              {/if}
            </div>
          </div>
        {/if}
      </div>
    </div>

    {#if $page.url.pathname == "/cart"}
      <div
        class="rounded-b border-t border-b border-gray-300 p-24 pl-18 footer flex
      items-center justify-between"
      >
        <div class="text-gray-600 text-one-five leading-mid text-right">Итого</div>
        <div class="text-main text-xl leading-small font-semibold text-right">
          {formatPrice(price)} ₽
        </div>
      </div>
    {:else}
      <div
        class="rounded-b border-t border-b border-gray-300 p-24 pt-18 pl-18 footer flex justify-between"
      >
        <div>
          <div class="text-gray-700  order__footer-name">Дата и время доставки</div>
          <div
            class="flex"
            on:click={() => {
              toggletimeModalVisible()
            }}
          >
            <div class="order__footer-text">
              {#if selectedDate == ""}
                выбрать дату и время доставки
              {:else}
                25 июля
              {/if}
            </div>
            <div class="pen-icon">
              <svg
                fill="var(--color-main)"
                width="15"
                height="15"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                ><path
                  d="M29.6 2.3c-2.7-2.7-7.1-2.7-9.8 0L1.7 20.1c-.2.2-.2.2-.4.6L0 30.7c0 .2.2.6.4.8.4 0 .6.2.8.2h.2l6.1-.8c.6-.2 1-.6.8-1-.2-.4-.6-.8-1-.8l-4.9.6 1-6.9 7.3 7.3c.2.2.4.2.6.2.2 0 .6-.2.6-.2L30 12.2c1.4-1.4 2.2-3.1 2.2-4.9s-1.2-3.6-2.6-5zm-9.4 2.3l3.1 2.9L6.8 24.1 3.7 21 20.2 4.6zm-9.1 23.6l-2.9-2.9L24.7 8.8l2.9 2.9-16.5 16.5zm17.7-17.7l-7.3-7.3c1-.8 2.2-1.2 3.3-1.2 1.4 0 2.7.6 3.7 1.6.8 1 1.2 2.2 1.2 3.5.3 1.5-.3 2.6-.9 3.4z"
                /></svg
              >
            </div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-gray-700 order__footer-name">Итого</div>
          <div class="order__footer-text">{formatPrice(price)} ₽</div>
        </div>
      </div>
    {/if}
  </div>
  {#if $page.url.pathname !== "/cart"}
    <a
      href="/cart"
      class="checkout-button font-semibold mt-6 flex-shrink-0 text-center rounded w-full px-16 py-8 {orderList.length
        ? 'active'
        : 'disabled'}"
    >
      Оформить заказ
    </a>
  {/if}
  {#if deleteModalVisible}
    <ConfirmationModal
      text="Вы действительно хотите очистить корзину?"
      confirmText="Да"
      cancelText="Нет"
      on:confirm={deleteOrderList}
      on:close={closeDeleteModal}
    />
  {/if}

  {#if timeModalVisible}
    <DeliveryTimeModal on:close={toggletimeModalVisible} />
  {/if}
</div>

<style lang="postcss">
  .custom-scrollbar {
    --thumb-color: #dddfe7;
    --scroll-track: #f2f2f2;
    scrollbar-color: var(--thumb-color) var(--scroll-track);
    scrollbar-width: thin;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 5px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background-color: var(--scroll-track);
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #dddfe7;
  }
  .disabled {
    color: #b29c23;
  }
  .content {
    flex: 1 0 auto;
  }
  .footer {
    flex-shrink: 0;
  }
  .checkout-button {
    line-height: 30px;
    height: 46px;
  }
  .checkout-button.active {
    @apply bg-accent text-main;
  }
  .checkout-button.disabled {
    @apply bg-gray-300 text-gray-700;
  }
  ul {
    padding-top: 28px;
  }
  .delete-button svg {
    fill: var(--gray-600);
  }
  .delete-button:hover :global(svg) {
    @apply text-main;
    fill: var(--color-main);
  }
  .order__footer-name {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    margin-bottom: 8px;
  }
  .order__footer-text {
    font-size: 16px;
    width: 125px;
    cursor: pointer;
  }
  .countPostCard {
    font-size: 15px;
    color: var(--gray-600);
  }
  .pen-icon {
    margin-left: 12px;
    margin-top: 21px;
    cursor: pointer;
  }
  .pen-icon svg:hover {
    fill: var(--color-info);
  }
</style>
