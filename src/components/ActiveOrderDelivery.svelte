<script>
  import IconButton from "./IconButton.svelte";
  import Button from "./Button.svelte";
  import { getContext } from "svelte";

  import Chat from "./icons/Chat.svelte";

  const {
    toggleEditModal,
    toggleOrderCancel,
    toggleOrderCancelationWarning
  } = getContext("activeorder");

  export let order;
</script>

<style>
  .content-left {
    margin-right: 0;
  }
  .map-placeholder {
    width: 100%;
    padding-top: 56%;
  }
  @media (min-width: 1280px) {
    .content-left {
      margin-right: 48px;
      flex: 1 1 56.3%;
    }
    .content-right {
      flex: 1 1 43.8%;
    }
    .map-placeholder {
      max-width: 500px;
      max-height: 500px;
      width: 97%;
      padding-top: 68.3%;
    }
  }
</style>

<div class="flex flex-col justify-between w-full h-full content">
  <div>
    <h3 class="title">Курьер в пути</h3>
    <div class="flex flex-col-reverse lg:flex-row">
      <div class="content-left">
        <div class="map-placeholder relative">
          <img
            class="w-full h-full absolute inset-0"
            data-src="map-placeholder.png"
            alt="map" />
        </div>
      </div>
      <div class="content-right text-one-five">
        <div class="text w-full mb-6 leading-mid">
          <span class="text-gray-600">Телефон курьера:</span>
          <a href="tel:+7 911 250-64-7" class="text-main font-semibold">
            +7 911 250-64-7
          </a>
        </div>
        <div class="mb-24 lg:mb-34 leading-mid">
          <span class="text-gray-600">Оплата наличными:</span>
          <span class="text-main font-semibold">{order.totalPrice}&nbsp;₽</span>
        </div>
        <div class="hidden lg:block">
          <Button
            on:click={toggleOrderCancelationWarning}
            textClass="button-text"
            className="button"
            status="active-transparent">
            Отменить заказ
          </Button>
        </div>
      </div>
    </div>
  </div>
  <div class="flex lg:hidden mt-24">
    <Button
      on:click={toggleOrderCancelationWarning}
      status="disabled-secondary"
      textClass="button-text"
      className="button">
      Отменить заказ
    </Button>
  </div>
</div>
