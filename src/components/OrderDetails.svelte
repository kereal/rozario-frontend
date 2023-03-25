<script>
  import { createEventDispatcher } from "svelte"
  import IconButton from "./IconButton.svelte"
  const dispatch = createEventDispatcher()

  export let list
  export let total = "14 500"
  export let status

  function toggleOrderDetails() {
    dispatch("toggle")
  }
</script>

<div data-testid="order-details" class="relative bg-white p-24">
  <div class="close-button">
    <IconButton on:click={toggleOrderDetails} status="close" />
  </div>
  <h3 class="leading-snug text-lg font-bold text-main mb-16">Детали заказа</h3>
  {#each list as item}
    <div class="flex items-end order-item leading-snug text-one-five mb-8 last:mb-0">
      <span class="text-info font-semibold">{item.name}</span>
      <span class="text-main">{item.quantity}</span>
      <span class="text-main">{item.price} &#8381;</span>
    </div>
  {/each}
  <div class="flex items-end order-item leading-snug text-one-five mb-8 last:mb-0">
    <span class="text-main font-semibold">Доставка</span>
    <span class="text-main" />
    <span class="text-main">0 &#8381;</span>
  </div>
  <div class="flex items-end order-item leading-snug text-one-five mb-8 last:mb-0">
    <span class="text-main font-semibold">Открытка</span>
    <span class="text-main" />
    <span class="text-main">0 &#8381;</span>
  </div>
  <div class="flex items-end order-item leading-snug text-one-five mb-16 last:mb-0">
    <span class="text-main font-semibold">Фото в момент вручения</span>
    <span class="text-main" />
    <span class="text-main">0 &#8381;</span>
  </div>
  <div class="text-right leading-snug text-one-five">
    <span class="text-main">
      Итого:
      <span class="font-semibold">{total} &#8381;</span>
    </span>
  </div>
  {#if status}
    <div class="mt-4 text-right text-one-five leading-snug">
      <span class="text-main"
        >Статус заказа: <span class="font-semibold">{status}</span></span
      >
    </div>
  {/if}
</div>

<style lang="postcss">
  .close-button {
    top: 1rem;
    right: 1rem;
    @apply absolute;
  }
  .order-item span:nth-child(1) {
    flex: 1 0 63%;
  }
  .order-item span:nth-child(2) {
    flex: 1 1 17%;
    text-align: center;
  }
  .order-item span:nth-child(3) {
    flex: 1 1 20%;
    text-align: right;
  }
</style>
