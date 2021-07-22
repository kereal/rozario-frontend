<script>
  import Button from "./Button.svelte";
  import StarRating from "./StarRating.svelte";
  import CustomDropdown from "./CustomDropdown.svelte";
  import OrderDetails from "./OrderDetails.svelte";
  import { format } from "date-fns";
  import { ru } from "date-fns/locale";

  export let order;
  export let flowerFreshnessRating = 4;
  export let serviceRating = 3;
  export let courierWorkRating = 2;

  let orderDetailsButton;
  let orderDetailsVisible = false;

  let orderDetailsButton2;
  let orderDetailsVisible2 = false;

  const ratingList = [
    { score: 5, text: "Отлично" },
    { score: 4, text: "Хорошо" },
    { score: 3, text: "Нормально" },
    { score: 2, text: "Так себе" },
    { score: 1, text: "плохо" }
  ];

  function toggleOrderDetails() {
    orderDetailsVisible = !orderDetailsVisible;
  }
  function toggleOrderDetails2() {
    orderDetailsVisible2 = !orderDetailsVisible2;
  }
</script>

<style>
  .order-item span:nth-child(1) {
    flex: 1 0 60%;
  }
  .order-item span:nth-child(2) {
    flex: 1 1 20%;
    text-align: center;
  }
  .order-item span:nth-child(3) {
    flex: 1 1 20%;
    text-align: right;
  }
  .order-story-card {
    max-width: 940px;
    min-width: 542px;
  }
  .content-left {
    margin-right: 0;
  }
  .content-right {
    margin-top: 0px;
  }
  .order-story-card {
    height: 552px;
  }
  .image-box {
    width: 30%;
    padding-top: 30%;
  }
  @media (min-width: 1280px) {
    .order-story-card {
      height: 506px;
    }
    .content-right {
      margin-top: 38px;
      flex: 1 1 51%;
    }
    .content-left {
      flex: 1 1 49%;
      margin-right: 34px;
    }
    .image-box {
      width: 100%;
      padding-top: 100%;
    }
  }
  @media (min-width: 1420px) {
    .content-left {
      margin-right: 34px;
      flex: 1 1 47.5%;
    }
    .content-right {
      margin-top: 38px;
      flex: 1 1 52.5%;
    }
  }
</style>

<div
  class="order-story-card bg-gray-200 border border-gray-300 rounded
  shadow-light p-24 lg:p-34">
  <div class="mb-18 block lg:hidden text-one-five leading-mid">
    <span class="text-main mr-24">№ {order.number}</span>
    <span class="text-gray-600 mr-48 mr-24">
      {format(new Date(order.date.value), 'dd MMMM yyyy', { locale: ru })}
    </span>
    <button
      on:click={toggleOrderDetails2}
      bind:this={orderDetailsButton2}
      class="text-info leading-mid border-b border-dashed border-info">
      Детали заказа
    </button>
    {#if orderDetailsVisible2}
      <CustomDropdown
        relativeElement={orderDetailsButton2}
        buttonRef={orderDetailsButton2}
        bind:dropdownVisible={orderDetailsVisible2}
        css="width: 424px;"
        position="LEFT">
        <OrderDetails
          on:toggle={toggleOrderDetails2}
          list={order.list}
          total={order.total} />
      </CustomDropdown>
    {/if}
  </div>
  <div
    style="height: calc(100% - 40px);"
    class="flex flex-col justify-between lg:flex-row">
    <div class="content-left">
      <div
        class="mb-18 hidden lg:flex justify-between text-one-five leading-mid">
        <span class="text-main">№ {order.number}</span>
        <span class="text-gray-600">
          {format(new Date(order.date.value), 'dd MMMM yyyy', { locale: ru })}
        </span>
        <button
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
              status="отменён"
              on:toggle={toggleOrderDetails}
              list={order.list}
              total={order.total} />
          </CustomDropdown>
        {/if}
      </div>
      <div class="flex lg:block mb-18 lg:mb-0">
        <div class="image-box relative lg:flex-1">
          <img
            class="w-full h-full rounded absolute inset-0"
            data-src="flower-photo.png"
            alt="photo" />
        </div>
        <div class="text-one-five flex-1 ml-24 block lg:hidden">
          <div class="leading-mid mb-8">
            <span class="text-main font-bold">Куда:&nbsp;</span>
            <span class="text-main">{order.destination}</span>
          </div>
          <div class="leading-mid mb-8">
            <span class="text-main font-bold">Кому:&nbsp;</span>
            <span class="text-main">{order.recipient}</span>
          </div>
          <div class="leading-mid mb-8">
            <span class="text-main font-bold">Открытка:&nbsp;</span>
            <span class="text-main">{order.postcard}</span>
          </div>
          <div class="mb-24 leading-mid">
            <span class="text-main font-bold">Комментарий:&nbsp;</span>
            <span class="text-main">{order.comment}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content-right">
      <div class="flex flex-col justify-between">
        <div class="text-one-five hidden lg:block">
          <div class="leading-mid mb-8">
            <span class="text-main font-bold">Куда:&nbsp;</span>
            <span class="text-main">{order.destination}</span>
          </div>
          <div class="leading-mid mb-8">
            <span class="text-main font-bold">Кому:&nbsp;</span>
            <span class="text-main">{order.recipient}</span>
          </div>
          <div class="leading-mid mb-8">
            <span class="text-main font-bold">Открытка:&nbsp;</span>
            <span class="text-main">{order.postcard}</span>
          </div>
          <div class="mb-24 leading-mid">
            <span class="text-main font-bold">Комментарий:&nbsp;</span>
            <span class="text-main">{order.comment}</span>
          </div>
        </div>
        <div class="mb-18">
          <div class="text-main text-one-five font-bold leading-mid mb-16">
            Ваш отзыв
          </div>
          <div class="flex flex-wrap lg:block">
            <div
              class="mb-8 inline-block mr-24 lg:mr-0 lg:flex items-center
              leading-mid">
              <StarRating
                className="mr-12 lg:mr-24"
                name="flowerFreshness"
                kind="static"
                val={flowerFreshnessRating} />
              <span class="text-gray-600 text-sm">Свежесть цветов</span>
            </div>
            <div
              class="mb-8 inline-block mr-24 lg:mr-0 lg:flex items-center
              leading-mid">
              <StarRating
                className="mr-12 lg:mr-24"
                name="courierWork"
                kind="static"
                val={courierWorkRating} />
              <span class="text-gray-600 text-sm">Работа курьера</span>
            </div>
            <div
              class="mb-0 lg:mb-8 inline-block mr-24 lg:mr-0 lg:flex
              items-center leading-mid">
              <StarRating
                className="mr-12 lg:mr-24"
                name="serviceRating"
                kind="static"
                val={serviceRating} />
              <span class="text-gray-600 text-sm">Обслуживание</span>
            </div>
          </div>
        </div>
        <div class="mb-24">
          <div class="text-main font-bold text-sm leading-tight mb-6">
            Хорошо
          </div>
          <div class="text-main text-one-five leading-mid">
            «Удовольствие в чистом виде, супер курьер, осталась довольна»
          </div>
        </div>
      </div>
      <div class="w-full">
        <Button
          className="ml-auto"
          textClass="text-base"
          status="active-main"
          size="lg">
          Повторить заказ
        </Button>
      </div>
    </div>
  </div>
</div>
