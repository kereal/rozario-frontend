<script>
  import { getContext } from "svelte"
  import Button from "./Button.svelte"
  import InfoPopup from "./InfoPopup.svelte"

  import Like from "./icons/Like.svelte"
  import Dislike from "./icons/Dislike.svelte"

  export let photo

  const { toggleEditModal, toggleOrderCancelationWarning } = getContext("activeorder")

  let likePopupVisible = false
  let dislikePopupVisible = false

  function toggleLikePopup() {
    likePopupVisible = !likePopupVisible
  }

  function toggleDislikePopup() {
    dislikePopupVisible = !dislikePopupVisible
  }

  function handleThumbUp() {
    toggleLikePopup()
  }
  function handleThumbDown() {
    toggleDislikePopup()
  }
</script>

<div class="content flex flex-col h-full justify-between w-full">
  <h3 class="title">Оцените фото заказа до доставки</h3>
  <div class="text-gray-600 block lg:hidden text-one-five leading-snug mb-24">
    Оцените фото заказа до этапа доставки, если вам не понравится, мы все переделаем, и
    сделаем это бесплатно.
  </div>
  <div class="flex flex-col h-full lg:flex-row">
    <div class="content-left h-full flex-1">
      <div class="relative image-box">
        <img class="w-full h-full rounded absolute inset-0" src={photo} alt="photo" />
        <div class="absolute thumbs flex items-center justify-center w-full">
          <div class="relative mr-16">
            <button
              on:click={handleThumbUp}
              class="action-bubble action-bubble-left rounded-full flex
              items-center justify-center"
            >
              <Like iconSize="20" classNames="fill-current text-main" />
            </button>
            <div class="bubble-positive">Все отлично</div>
          </div>
          <div class="relative">
            <button
              on:click={handleThumbDown}
              class="action-bubble action-bubble-right rounded-full flex
              items-center justify-center"
            >
              <Dislike iconSize="20" classNames="fill-current mt-2 text-main" />
            </button>
            <div class="bubble-negative">Есть претензии</div>
          </div>
        </div>
      </div>
    </div>
    <div class="lg:flex-1 lg:h-full mt-24 lg:mt-0">
      <div class="text-gray-600 hidden lg:block text-one-five leading-snug mb-24">
        Оцените фото заказа до этапа доставки, если вам не понравится, мы все переделаем,
        и сделаем это бесплатно.
      </div>
      <div class="flex flex-row lg:flex-col">
        <div class="mr-18 lg:mr-0">
          <Button
            on:click={toggleEditModal}
            status="active-secondary"
            textClass="button-text"
            size="lg"
            className="button lg:mb-18"
          >
            Редактировать данные
          </Button>
        </div>
        <div>
          <Button
            on:click={toggleOrderCancelationWarning}
            status="active-transparent"
            size="lg"
            textClass="button-text"
          >
            Отменить заказ
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>
{#if likePopupVisible}
  <InfoPopup
    on:close={toggleLikePopup}
    title="Спасибо за оценку!"
    text="Ваш заказ передан в доставку."
  />
{/if}
{#if dislikePopupVisible}
  <InfoPopup
    on:close={toggleDislikePopup}
    title="Спасибо за оценку!"
    text="Ваш заказ будет переделан, ожидайте новое фото."
  />
{/if}

<style lang="postcss">
  .thumbs {
    bottom: 1rem;
  }
  .content-left {
    margin-right: 0;
  }
  @media (min-width: 1280px) {
    .content-left {
      margin-right: 34px;
    }
  }
  .image-box {
    padding-top: 62%;
    width: 62%;
  }
  .bubble-positive {
    background: url("/bubble-left.svg") no-repeat;
    width: 67px;
    height: 45px;
    padding: 9px 6px 6px 6px;
    @apply justify-center items-center hidden absolute text-xs leading-tight text-info;
  }
  .bubble-negative {
    background: url("/bubble-right.svg") no-repeat;
    width: 77px;
    height: 45px;
    padding: 9px 6px 6px 6px;
    @apply justify-center items-center hidden absolute text-xs leading-tight text-main;
  }
  .action-bubble {
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.75);
  }
  .action-bubble-left:hover {
    @apply border border-info;
  }
  .action-bubble-right:hover {
    @apply border border-main;
  }
  :global(.action-bubble-left:hover > svg) {
    @apply text-info;
  }
  :global(.action-bubble-right:hover > svg) {
    @apply text-main;
  }
  .action-bubble:hover + .bubble-positive {
    top: 30px;
    left: -44px;
    @apply flex;
  }
  .action-bubble:hover + .bubble-negative {
    top: 30px;
    right: -54px;
    @apply flex;
  }
  @media (min-width: 1280px) {
    .image-box {
      width: 75%;
      padding-top: 75%;
    }
  }
</style>
