<script>
  import { beforeUpdate } from "svelte";
  import Popup from "../components/Popup.svelte";

  export let position;

  let popupVisible = false;
  let relativeElement;

  function showPopup() {
    if (!popupVisible) {
      popupVisible = true;
    }
  }
  function closePopup() {
    if (popupVisible) {
      popupVisible = false;
    }
  }
</script>

<style>
  .wrapper {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .rect {
    width: 50px;
    height: 50px;
    background-color: orchid;
  }
</style>

<div class="wrapper">
  <div
    on:mouseenter={showPopup}
    on:mouseleave={closePopup}
    bind:this={relativeElement}
    class="rect" />
  {#if popupVisible}
    <Popup
      css="width: 300px; max-height: 300px;"
      bind:visible={popupVisible}
      {relativeElement}
      {position}>
      <section class="bg-white px-8 py-6 rounded-lg">
        <h3
          class="text-main font-semibold text-lg pb-4 border-b border-gray-300
          mb-4">
          Избранное
        </h3>
        <p class="text-gray-700 text-sm truncate">Добавлено в избранное</p>
      </section>
    </Popup>
  {/if}
</div>
