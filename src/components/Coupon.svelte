<script>
  export let type = "new"
  export let text
  export let price
  export let couponPrice
  import CouponNewPopup from "./CouponNewPopup.svelte"
  import CouponDealPopup from "./CouponDealPopup.svelte"

  let Used = true
  let infoModalVisible = false
  function toggleInfoModal() {
    infoModalVisible = !infoModalVisible
  }
  function getCoupon() {
    Used = !Used
    couponPrice = price
  }
</script>

<div class="{type} coupon text-white flex items-center justify-between">
  <div class="leading-mid flex items-center left">
    <div class=" text-right mr-8 text-xl font-semibold leading-mid price">
      {price}&nbsp;руб.
    </div>
    <div class="cart-coupon__text text-sm items-baseline leading-mid">{text}</div>
  </div>
  <div class="right">
    {#if Used}
      <button
        class="w-full rounded  text-sm leading-mid unused"
        on:click={toggleInfoModal}
        on:click={getCoupon}
      >
        <span class="flex w-full h-full items-center justify-center mb-2">получить</span>
      </button>
    {:else}
      <button class="w-full rounded text-sm leading-mid used">
        <span class="flex w-full h-full items-center justify-center mb-2">получен</span>
      </button>
    {/if}
  </div>
</div>

{#if type === "deal"}
  {#if infoModalVisible}
    <CouponNewPopup on:close={toggleInfoModal} />
  {/if}
{/if}

{#if type === "new"}
  {#if infoModalVisible}
    <CouponDealPopup on:close={toggleInfoModal} />
  {/if}
{/if}

<style lang="postcss">
  .coupon {
    width: 100%;
    height: 45px;
  }
  .new {
    background: url("/couponProductdesktop.svg");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .deal {
    background: url("/coupon-green.svg");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .left {
    padding-left: 22px;
    padding-right: 22px;
    width: 67%;
  }
  .right {
    text-align: center;
    width: 33%;
  }
  button {
    color: var(--color-main);
    width: 84px;
    text-align: center;
  }
  .unused:hover {
    color: var(--color-info);
    font-weight: 600;
  }
  .deal button {
    height: 25px;
    @apply bg-gray-200;
  }

  .new button {
    height: 25px;
    @apply bg-gray-200;
  }

  .used {
    color: var(--gray-700);
  }
  @media (max-width: 1351px) {
    .new {
      background: url("/couponProduct1000.svg");
      background-size: cover;
      background-repeat: no-repeat;
    }
    .deal {
      background: url("/couponNew1000.svg");
      background-size: cover;
      background-repeat: no-repeat;
    }
  }

  @media (max-width: 1000px) {
    .left {
      padding-left: 12px;
      padding-right: 12px;
    }
    button {
      font-size: 12px;
      width: 74px;
    }
    .coupon__text {
      font-size: 12px;
      margin-left: 10px;
    }
    .price {
      padding-left: 12px;
      font-size: 16px;
    }
  }
</style>
