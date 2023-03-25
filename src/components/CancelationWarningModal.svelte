<script>
  import { createEventDispatcher } from "svelte";
  import ModalSurface from "./ModalSurface.svelte";
  import Button from "./Button.svelte";

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch("close");
  }

  function cancelOrder() {
    dispatch("cancel");
  }
</script>

<style>

</style>

<ModalSurface css="width:400px; height: 152px;" on:close={closeModal}>
  <h3 class="text-main text-one-five mb-18 leading-mid">
    При отмене заказа на этом этапе оплата за заказ не возвращается.
  </h3>
  <div class="flex">
    <Button
      className="mr-34"
      on:click={closeModal}
      size="lg"
      status="active-main">
      Не отменять
    </Button>
    <button
      on:click={cancelOrder}
      class="text-gray-700 hover:text-info leading-snug">
      Отменить заказ
    </button>
  </div>
</ModalSurface>
