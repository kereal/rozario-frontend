<script>
  import Icon from "./Icon.svelte";
  import ActiveOrderEdit from "./ActiveOrderEdit.svelte";
  import ActiveOrderShop from "./ActiveOrderShop.svelte";
  import ActiveOrderPhoto from "./ActiveOrderPhoto.svelte";
  import ActiveOrderDelivery from "./ActiveOrderDelivery.svelte";
  import ActiveOrderDone from "./ActiveOrderDone.svelte";
  import OrderCancelModal from "./OrderCancelModal.svelte";
  import EditModal from "./EditModal.svelte";
  import InfoPopup from "./InfoPopup.svelte";
  import CancelationWarningModal from "./CancelationWarningModal.svelte";
  import OrderCancelMessage from "./OrderCancelMessage.svelte";
  import { setContext } from "svelte";

  import DeliveryIcon from "./icons/Delivery.svelte";
  import InTheShop from "./icons/InTheShop.svelte";
  import Photo from "./icons/Photo.svelte";
  import EditOrder from "./icons/EditOrder.svelte";
  import Done from "./icons/Done.svelte";

  import Claps from "./icons/Claps.svelte";
  import Diamond from "./icons/Diamond.svelte";
  import DeliveryFast from "./icons/DeliveryFast.svelte";
  import Clock from "./icons/Clock.svelte";
  import Tablet from "./icons/Tablet.svelte";
  import Cap from "./icons/Cap.svelte";
  import Florist from "./icons/Florist.svelte";

  export let order;
  export let currentSection = 1;
  export let testimonials = [];
  export let photo;

  let orderCancelVisible = false;
  let editModalVisible = false;
  let orderCancelationWarningVisible = false;
  let orderCancelInfoVisible = false;

  function toggleOrderCancel() {
    orderCancelVisible = !orderCancelVisible;
  }
  function toggleEditModal() {
    editModalVisible = !editModalVisible;
  }

  function toggleOrderCancelationWarning() {
    orderCancelationWarningVisible = !orderCancelationWarningVisible;
  }

  setContext("activeorder", {
    toggleOrderCancel,
    toggleEditModal,
    toggleOrderCancelationWarning
  });

  const sections = [
    { id: 1, name: "Редактировать данные", active: true, image: EditOrder },
    { id: 2, name: "Магазин", image: InTheShop },
    { id: 3, name: "Фотография", image: Photo },
    { id: 4, name: "Доставка", image: DeliveryIcon },
    { id: 5, name: "Выполнен", image: Done }
  ];

  const compliments = [
    { text: "Замечательное обслуживание ", icon: Claps, color: "#EB5D73" },
    { text: "Идеальное соотвествие", icon: Diamond, color: "#64B769" },
    { text: "Быстрая доставка", icon: DeliveryFast, color: "#22A1DB" },
    { text: "Точно ко времени", icon: Clock, color: "#EB5F9E" },
    { text: "Индивидуальный подход", icon: Tablet, color: "#F28F00" },
    { text: "Вежливый курьер", icon: Cap, color: "#988EC4" },
    { text: "Супер-флорист", icon: Florist, color: "#EB5D46" }
  ];

  const compliments2 = [
    { text: "Замечательное обслуживание ", icon: "rating-claps", rating: 21 },
    { text: "Идеальное соотвествие", icon: "rating-diamond", rating: 22 },
    { text: "Быстрая доставка", icon: "rating-delivery", rating: 23 },
    { text: "Точно ко времени", icon: "rating-time", rating: 28 }
  ];

  function handleKeydown(e) {
    if (e.key === "Enter") {
      e.target.click();
    }
  }

  function saveOrderData(e) {
    console.log("hello", e.detail);
    toggleEditModal();

    order.date = e.detail.date;
    order.recipient = e.detail.recipient;
    order.clientName = e.detail.clientName;
    order.recipientPhone = e.detail.recipientPhone;
    order.clientPhone = e.detail.clientPhone;
    order.destination = e.detail.destination;
    order.postcard = e.detail.postcard;
    order.comment = e.detail.comment;
    console.log("asdfasdf");
  }

  function selectSection(e) {
    currentSection = parseInt(e.target.closest(".section").dataset.id);
  }
</script>

<style lang="postcss">
  .section {
    height: 59px;
  }
  .stripe {
    transform: translateY(-50%);
    height: 2px;
    width: 21px;
  }
  .text {
    display: none;
  }
  .text.current-section {
    display: block;
  }
  .active-order {
    height: 691px;
    max-height: 691px;
    min-height: 691px;
    max-width: 942px;
    min-width: 544px;
  }

  .active-order :global(.content) {
    @apply p-24 bg-white;
  }

  .active-order :global(.title) {
    @apply text-main text-xl font-semibold mb-16 leading-small;
  }
  .active-order :global(.info-text) {
    @apply text-gray-600 text-one-five leading-snug mb-34;
  }
  .active-order :global(.button) {
    height: 2.75rem;
    padding: 0 30px;
  }
  .active-order :global(.button-text) {
    @apply text-base whitespace-nowrap;
  }

  .active-order .menu-section:hover span.text {
    @apply text-white;
  }
  .active-order .menu-section:hover > :global(div > svg) {
    @apply text-white;
  }
  .active-order .menu-section:hover > .stripe {
    @apply bg-white;
  }

  @media (min-width: 1280px) {
    .section {
      height: 71px;
    }
    .active-order {
      height: 506px;
      max-height: 506px;
      min-height: 506px;
    }
    .active-order :global(.title) {
      @apply mb-24 text-1xl;
    }
    .active-order :global(.content) {
      @apply px-24 py-34;
    }
    .active-order :global(.info-text) {
      @apply block;
    }
    .active-order :global(.button) {
      height: 2.75rem;
      padding: 0 30px;
    }
    .active-order :global(.button-text) {
      @apply text-sm whitespace-nowrap;
    }
  }
  @media (min-width: 1420px) {
    .text {
      display: block;
    }
    .active-order :global(.content) {
      @apply p-34;
    }
    .active-order :global(.button) {
      height: 2.875rem;
      padding: 0 34px;
    }
    .active-order :global(.button-text) {
      @apply text-base whitespace-nowrap;
    }
  }
</style>

<div
  class="w-full box-content active-order flex flex-col shadow-light rounded
  border border-gray-300">
  <div class="flex items-center w-full bg-gray-200">
    {#each sections as section}
      <div
        on:click={selectSection}
        on:keydown={handleKeydown}
        tabindex="0"
        role="button"
        aria-pressed={section.active ? 'true' : 'false'}
        data-id={section.id}
        class="{section.active ? 'bg-accent' : 'bg-gray-200'} hover:bg-info
        menu-section flex-1 justify-center section cursor-pointer flex
        items-center px-30 relative">
        {#if section.id != 1}
          <div
            class="{section.active ? 'bg-main' : 'bg-gray-700'} stripe absolute
            left-0 top-1/2 inline-block" />
        {/if}
        <div class="flex items-center">
          <Icon
            name={section.image}
            classNames="fill-current {section.active ? 'text-main' : 'text-gray-700'}"
            iconSize="19" />
          <span
            class="{section.active ? 'text-main' : 'text-gray-700'} text {currentSection === section.id ? 'current-section' : ''}
            text-sm font-semibold ml-6 whitespace-nowrap">
            {section.name}
          </span>
        </div>
        {#if section.id != 5}
          <div
            class="{section.active ? 'bg-main' : 'bg-gray-700'} stripe absolute
            right-0 top-1/2 inline-block" />
        {/if}
      </div>
    {/each}
  </div>
  {#if currentSection == 1}
    <ActiveOrderEdit
      on:show-order-edit={toggleEditModal}
      on:show-order-cancel={toggleOrderCancel}
      {order} />
  {:else if currentSection == 2}
    <ActiveOrderShop compliments={compliments2} {testimonials} />
  {:else if currentSection == 3}
    <ActiveOrderPhoto {photo} />
  {:else if currentSection == 4}
    <ActiveOrderDelivery {order} />
  {:else if currentSection == 5}
    <ActiveOrderDone {compliments} />
  {/if}
</div>

{#if orderCancelVisible}
  <OrderCancelModal
    on:cancel={() => {
      toggleOrderCancel();
      orderCancelInfoVisible = true;
    }}
    on:close={toggleOrderCancel} />
{/if}
{#if editModalVisible}
  <EditModal on:save={saveOrderData} on:close={toggleEditModal} {order} />
{/if}
{#if orderCancelationWarningVisible}
  <CancelationWarningModal
    on:close={toggleOrderCancelationWarning}
    on:cancel={() => {
      toggleOrderCancelationWarning();
      toggleOrderCancel();
    }} />
{/if}

{#if currentSection >= 3}
  {#if orderCancelInfoVisible}
    <OrderCancelMessage on:close={() => (orderCancelInfoVisible = false)} />
  {/if}
{/if}

{#if currentSection < 3}
  {#if orderCancelInfoVisible}
    <InfoPopup
      size="sm"
      title="Ваш заказ отменен"
      text="В случае оплаты заказа, ожидайте возврата денег в течение 30 дней"
      on:close={() => (orderCancelInfoVisible = false)} />
  {/if}
{/if}
