<script>
  import { fade } from "svelte/transition"
  import { createEventDispatcher } from "svelte"
  import Portal from "./Portal.svelte"
  import IconButton from "./IconButton.svelte"
  import CustomRadioButton from "./CustomRadioButton.svelte"

  let modalElement
  const dispatch = createEventDispatcher()

  function closeViaOverlay(e) {
    if (modalElement && !modalElement.contains(e.target)) dispatch("close")
  }

  function closeModal() {
    dispatch("close")
  }

  const gift = {
    name: "Медведь плюшевый",
    description:
      "Корзина, декоративная лента, ананас (1 шт.), яблоко (4 шт.), банан (10 шт.), виноград чёрный (1 шт.), виноград белый (1 шт.), мандарин (3 шт.), апельсин (4 шт.)",
    photo: "https://i.ibb.co/xftRLg2/photo.jpg",
    price: 0,
    size: {
      маленький: { sm: "34×56 см", price: 199 },
      средний: { sm: "34×56 см", price: 299 },
      большой: { sm: "34×56 см", price: 399 },
      огромный: { sm: "34×56 см", price: 499 }
    }
  }
  let giftSizes = [
    { size: "маленький", sm: "34×56 см", price: 199 },
    { size: "средний", sm: "44×56 см", price: 299 },
    { size: "большой", sm: "54×56 см", price: 399 },
    { size: "огромный", sm: "64×56 см", price: 499 }
  ]
  let giftSize = "огромный"
</script>

<Portal>
  <div transition:fade on:click={closeViaOverlay} class="overlay">
    <div bind:this={modalElement} class="modal relative">
      <div class="close-button">
        <IconButton on:click={closeModal} status="close" />
      </div>
      <div class="gift__main custom-scrollbar">
        <div class="gift__photo">
          <picture>
            <img src={gift.photo} alt="gift" />
          </picture>
        </div>
        {#if gift.description}
          <div class="gift__description">
            <p>{gift.description}</p>
          </div>
        {/if}
        {#if gift.size}
          <div class="gift__sizes">
            <h2>Выберите размер:</h2>
            {#each giftSizes as gift}
              <div class="flex gift__size justify-between">
                <div class="flex">
                  <CustomRadioButton
                    className="leading-mid"
                    weight=""
                    label={gift.sm}
                    labelClass="text-one-five "
                    bind:group={giftSize}
                    value={gift.size}
                  />
                  <p class="gift__size_text">({gift.size})</p>
                </div>
                <div class="flex gift__size_price">
                  {gift.price} ₽
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
      <div class="gift__footer">
        <div class="gift__group flex justify-between">
          <div class="gift__name">{gift.name}</div>
          <div class="gift__price">{gift.price + gift.size[giftSize].price} ₽</div>
        </div>
        <div>
          <button class="gift__add" on:click={closeViaOverlay}>
            Добавить в корзину</button
          >
        </div>
      </div>
    </div>
  </div>
</Portal>

<style lang="postcss">
  .overlay {
    z-index: 1000;
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
  .modal {
    width: 440px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @apply rounded;
    background: #ffffff;
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    padding: 24px;
  }
  .close-button {
    top: 14px;
    right: 14px;
    @apply absolute;
    z-index: 11;
  }

  .gift__photo {
    width: 185px;
    height: 185px;
    margin: 0 auto;
  }
  .gift__photo img {
    border-radius: 100px;
    margin-left: -12px;
  }

  .gift__description {
    font-size: 14px;
    line-height: 19px;
    color: var(--gray-700);
    margin-top: 18px;
    margin-bottom: 6px;
  }
  .gift__sizes h2 {
    margin-top: 24px;
    font-weight: 600;
    font-size: 14px;
    color: var(--color-main);
  }

  .gift__size_text {
    font-size: 15px;
    color: var(--gray-700);
    margin-left: 3px;
  }
  .gift__size_price {
    font-size: 15px;
    color: var(--gray-700);
    cursor: default;
  }

  .gift__group {
    color: var(--color-main);
    font-weight: 600;
    line-height: 130%;
    margin-bottom: 24px;
    margin-top: 24px;
  }
  .gift__name {
    font-size: 18px;
  }
  .gift__price {
    font-size: 16px;
  }
  .gift__add {
    width: 232px;
    height: 46px;
    background: #ffdc00;
    border-radius: 4px;
    color: var(--color-main);
    font-weight: 600;
    font-size: 16px;
    line-height: 130%;
  }
  .gift__add:hover {
    background: #e71f75;
    color: #fff;
  }
  .gift__size {
    margin-top: 18px;
  }

  .gift__footer {
    border-top: 1px solid var(--gray-300);
    margin-top: 35px;
  }
</style>
