<script>
  import DownloadAppCard from "./DownloadAppCard.svelte";
  import Button from "./Button.svelte";
  import CustomDropdown from "./CustomDropdown.svelte";
  import OrderDetails from "./OrderDetails.svelte";
  import { format as fnsFormat } from "date-fns";
  import { ru } from "date-fns/locale";
  import { getContext } from "svelte";

  const { toggleEditModal, toggleOrderCancel } = getContext("activeorder");

  export let order;

  console.log("order order edit", order);

  let orderDetailsButton;
  let orderDetailsVisible = false;

  function toggleOrderDetails() {
    orderDetailsVisible = !orderDetailsVisible;
  }

  function getDestination(destination) {
    console.log("destination", destination);
    if (destination.status === "address") {
      return destination.value;
    } else if (destination.status === "noAddress") {
      return destination.noAddress;
    } else if (destination.status === "selfPickup") {
      return destination.selfPickup;
    }
    throw new Error("wrong destination status");
  }
  function formatDate(date) {
    if (!date) {
      return "";
    }
    console.log("data format", date);
    switch (date.status) {
      case "range":
        return (
          fnsFormat(new Date(order.date.value), "EEEEEE, d MMMM", {
            locale: ru
          }) +
          `, с ${order.date.time.range.from} до ${order.date.time.range.to}`
        );
      case "exact":
        return fnsFormat(
          new Date(order.date.value),
          "EEEEEE, d MMMM, в HH:mm",
          {
            locale: ru
          }
        );
      case "notime":
        return date.notime;
    }
  }
</script>

<style lang="postcss">
  .content-left {
    margin-right: 0;
  }
  @media (min-width: 1280px) {
    .content-left {
      margin-right: 20px;
      flex: 1 1 56%;
    }
    .content-right {
      flex: 1 1 44%;
    }
  }
  @media (min-width: 1420px) {
    .content-left {
      margin-right: 37px;
      flex: 1 1 55%;
    }
    .content-right {
      flex: 1 1 45%;
    }
  }
  .order-info-text {
    @apply mb-8 leading-mid;
  }
</style>

<div class="content flex flex-col h-full w-full">
  <h3 class="title">Заказ оформлен, спасибо!</h3>
  <div class="text-gray-600 block text-one-five lg:hidden leading-tight mb-18">
    Мы получили данные и оформляем ваш букет, служба доставки и другая полезная
    информация о данном этапе.
  </div>
  <div class="flex flex-col lg:flex-row h-full">
    <div class="text-one-five flex flex-col justify-between content-left">
      <div>
        <div class="order-info-text">
          <span class="text-gray-600">Когда:&nbsp;</span>
          <span class="text-main">{formatDate(order.date)}</span>
        </div>
        <div class="order-info-text">
          <span class="text-gray-600">Получатель:&nbsp;</span>
          <span class="text-main">{order.recipient || 'Получу Сам(а)'}</span>
        </div>
        <div class="order-info-text">
          <span class="text-gray-600">Телефон получателя:&nbsp;</span>
          <span class="text-main">{order.recipientPhone}</span>
        </div>
        <div class="order-info-text">
          <span class="text-gray-600">Куда:&nbsp;</span>
          <span class="text-main">{getDestination(order.destination)}</span>
        </div>
        <div class="order-info-text">
          <span class="text-gray-600">Открытка:&nbsp;</span>
          <span class="text-main">{order.postcard}</span>
        </div>
        <div class="mb-24 leading-mid">
          <span class="text-gray-600">Комментарий:&nbsp;</span>
          <span class="text-main">{order.comment}</span>
        </div>
        <div class="flex">
          <div class="mr-48 leading-mid">
            <div class="text-gray-600 leading-mid mb-2">{order.number}</div>
            <button
              data-testid="order-details-button"
              on:click={toggleOrderDetails}
              bind:this={orderDetailsButton}
              class="text-info leading-mid border-b border-dashed border-info">
              Детали заказа
            </button>
            {#if orderDetailsVisible}
              <CustomDropdown
                relativeElement={orderDetailsButton}
                buttonRef={orderDetailsButton}
                bind:dropdownVisible={orderDetailsVisible}
                css="width: 424px;"
                position="LEFT">
                <OrderDetails
                  on:toggle={toggleOrderDetails}
                  list={order.list}
                  total={order.total} />
              </CustomDropdown>
            {/if}
          </div>
          <div>
            <div class="text-main text-right leading-mid">
              <span class="leading-mid mb-2">Сумма заказа:</span>
              <span class="font-semibold leading-mid">
                {order.totalPrice}&nbsp;₽
              </span>
            </div>
            <div class="text-gray-600 text-sm text-right">
              {order.paymentType}
            </div>
          </div>
        </div>
      </div>
      <div class="hidden lg:flex">
        <Button
          testid="editmodal-button"
          on:click={toggleEditModal}
          status="active-secondary"
          textClass="button-text"
          className="button mr-18">
          Редактировать данные
        </Button>
        <Button
          on:click={toggleOrderCancel}
          status="active-transparent"
          textClass="button-text"
          className="button">
          Отменить заказ
        </Button>
      </div>
    </div>
    <div
      class="content-right flex flex-col h-full justify-between lg:justify-start">
      <div class="text-gray-600 hidden lg:block text-one-five leading-snug">
        Здесь вы сможете увидеть все этапы выполнения заказа.
      </div>
      <DownloadAppCard className="mt-24 lg:mt-18" />
      <div class="flex lg:hidden mt-24">
        <Button
          testid="editmodal-button"
          on:click={toggleEditModal}
          status="active-secondary"
          textClass="button-text"
          className="button mr-18">
          Редактировать данные
        </Button>
        <Button
          on:click={toggleOrderCancel}
          status="active-transparent"
          textClass="button-text"
          className="button">
          Отменить заказ
        </Button>
      </div>
    </div>
  </div>
</div>
