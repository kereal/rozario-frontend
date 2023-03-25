<script>
  import { createEventDispatcher } from "svelte";
  import ModalSurface from "./ModalSurface.svelte";
  import LinkButton from './LinkButton.svelte';

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch("close");
  }
</script>

<style> 
</style>

<ModalSurface css="width: 265px; height: 232px;" on:close-overlay={closeModal} on:close={closeModal} >
  <h3 class="mb-12 text-lg text-main font-semibold">Ваш заказ отменён,</h3>
  <div class="mb-16 text-main text-one-five leading-mid">Но это не повод прощаться!<br />Уверены, вы найдёте что-то интересное среди наших товаров.</div>
  <div>
  <LinkButton on:click={closeModal} href="/catalog" kind="active-main">В каталог</LinkButton>
  </div>
</ModalSurface>
