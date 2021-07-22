<script>
  import { mainStore } from "../stores/global.js";
  import OrderItem from "./OrderItem.svelte";
  import DeliveryTimeDropdown from "./DeliveryTimeDropdown.svelte";
  import CustomDropdown from "./CustomDropdown.svelte";
  import HeroTime from "./HeroTime.svelte";
  import DeleteModal from "./DeleteModal.svelte";

  let timeDropdownVisible = false;
  let timeDropdownIcon;
  let timeDropdownButton;

  let deleteModalVisible = false;

  function removeOrder() {
    if ($mainStore.flowerList.length) {
      deleteModalVisible = true;
    }
  }
  function calculatePrice() {
    const price = $mainStore.flowerList
      .map(flower => parseInt(flower.flower.price) * flower.count)
      .reduce((acc, val) => acc + val);
    console.log("price", price);
    return price;
  }

  function closeDeleteModal() {
    deleteModalVisible = false;
  }

  function selectTime(e) {
    $mainStore.time = e.detail.time;
    toggleTimeDropdown();
  }

  function toggleTimeDropdown() {
    timeDropdownVisible = !timeDropdownVisible;
  }

  function deleteOrderList() {
    $mainStore.flowerList = [];
    deleteModalVisible = false;
  }

  $: $mainStore.totalPrice =
    $mainStore.flowerList.length > 0 ? calculatePrice() : 0;
</script>

<style>
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
  .my-order {
    bottom: 1rem;
    top: 88px;
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
  .no-items-text {
    transform: translate(-50%, -50%);
  }
</style>

<div style="flex: 1 1 auto;" class="flex flex-col">
  <div class="content h-0 bg-gray-100 rounded w-full flex flex-col">
    <div class="custom-scrollbar flex-1 overflow-auto">
      <div class="px-6 py-5 h-full">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-main text-xl font-semibold">Мой заказ</h2>
          {#if $mainStore.flowerList.length}
          <button class="cursor-pointer" on:click={removeOrder}>
            <img src="trash.svg" alt="Корзина" />
          </button>
          {/if}
        </div>
        {#if $mainStore.flowerList.length}
          <ul class="overflow-y-auto mb-4">
            {#each $mainStore.flowerList as order (order.flower.id)}
              <li class="border-b border-gray-300 pb-3 pt-2 mb-2">
                <OrderItem item={order.flower} />
              </li>
            {/each}
          </ul>
        {:else}
          <div
            class="no-items-text text-center relative top-1/2 left-1/2
            text-gray-700 text-sm m-auto">
            Выберите букет и добавте его к заказу
          </div>
        {/if}
        {#if $mainStore.flowerList.length}
          <div class="mb-4">
            <div class="text-main flex justify-between">
              <div>Доставка</div>
              <div class="text-sm">500&nbsp;₽</div>
            </div>
            <div class="text-main flex justify-between">
              <div>Фото в момент вручения</div>
              <div class="text-sm">0&nbsp;₽</div>
            </div>
            <div class="text-main flex justify-between">
              <div>Открытка</div>
              <div class="text-sm">0&nbsp;₽</div>
            </div>
          </div>
        {/if}
      </div>
    </div>
    <div class="border-t border-b border-gray-300 footer flex items-center justify-between">
      <div class="px-4 py-2">
        <p class="mb-2 text-gray-700 text-sm">Время и дата доставки</p>
        <div class="text-main text-lg flex items-center">
          <span class="mr-2">
            {#if $mainStore.time.first && $mainStore.time.second}
              {$mainStore.time.first}
              <br />
              {$mainStore.time.second}
            {:else}Нет времени{/if}
          </span>
          <button bind:this={timeDropdownButton} on:click={toggleTimeDropdown}>
            <svg
              bind:this={timeDropdownIcon}
              class="fill-current text-main w-3 h-3 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path
                d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3
                2.3-4-4z" />
            </svg>
          </button>
          {#if timeDropdownVisible}
            <CustomDropdown
              bind:dropdownVisible={timeDropdownVisible}
              relativeElement={timeDropdownIcon}
              buttonRef={timeDropdownIcon}
              css="width:320px; max-height:400px;"
              position="CENTER">
              <HeroTime on:time={selectTime} />
            </CustomDropdown>
          {/if}
        </div>
      </div>
      <div class="px-4 py-2">
        <div class="mb-2 text-gray-700 text-sm text-right">Итого</div>
        <div class="text-main text-lg text-right">
          {$mainStore.totalPrice} ₽
        </div>
      </div>
    </div>
  </div>
  <button
    style="margin-top: 10px;"
    class="flex-shrink-0 h-10 rounded w-full px-4 py-2 bg-accent {$mainStore.flowerList.length ? 'text-main' : 'disabled'}
    font-semibold">
    Оформить заказ
  </button>
  {#if deleteModalVisible}
    <DeleteModal on:delete={deleteOrderList} on:close={closeDeleteModal} />
  {/if}
</div>
