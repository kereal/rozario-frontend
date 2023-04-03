<script>
  import IconButton from "./IconButton.svelte"
  import Button from "./Button.svelte"
  import { getContext } from "svelte"
  import ArrowLeftBig from "./icons/ArrowLeftBig.svelte"
  import ArrowRightBig from "./icons/ArrowRightBig.svelte"

  export let compliments = []
  export let testimonials = []

  const { toggleEditModal, toggleOrderCancel } = getContext("activeorder")

  let currentSlide = 0
  let prevButtonStatus = "disabled"
  let nextButtonStatus = "enabled"

  function handlePrev() {
    if (prevButtonStatus === "disabled") {
      return
    }
    if (currentSlide > 0) {
      currentSlide--
    }
    if (currentSlide === 0) {
      prevButtonStatus = "disabled"
    }
    if (currentSlide === testimonials.length - 2) {
      nextButtonStatus = "enabled"
    }
  }
  function handleNext() {
    if (nextButtonStatus === "disabled") {
      return
    }
    if (currentSlide < testimonials.length - 1) {
      currentSlide++
    }
    if (currentSlide > 0) {
      prevButtonStatus = "enabled"
    }
    if (currentSlide === testimonials.length - 1) {
      nextButtonStatus = "disabled"
    }
  }
</script>

<div class="w-full h-full content flex flex-col justify-between">
  <div class="flex flex-col justify-between">
    <h3 class="title">Ваш заказ скоро будет готов</h3>
    <div class="flex flex-col-reverse lg:flex-row">
      <div class="content-left">
        <div class="text-gray-600 text-one-five leading-mid font-semibold mb-18">
          Комплименты от наших клиентов:
        </div>
        <div class="compliments-container flex mb-24">
          {#each compliments as compliment}
            <div class="compliment">
              <div class="flex relative icon-box mb-8">
                <img class="w-full h-full" src="/{compliment.icon}.svg" alt="icon" />
                <div
                  class="text-sm absolute bg-white flex items-center
                  justify-center compliment-rating rounded-full border
                  border-gray-1100"
                >
                  <span
                    class="text-xs text-gray-600 leading-tight"
                    style="margin-left: 1px;"
                  >
                    {compliment.rating}
                  </span>
                </div>
              </div>
              <div class="text-gray-600 text-xs text-center leading-tight">
                {compliment.text}
              </div>
            </div>
          {/each}
        </div>
        <div class="flex">
          <div class="relative overflow-hidden mr-24">
            <div
              style={`transform: translateX(calc(-100% * ${currentSlide}))`}
              class="slider flex w-full"
            >
              {#each testimonials as testimonial}
                <div
                  style="flex: 1 0 100%"
                  class="text-one-five leading-mid text-gray-600"
                >
                  {testimonial}
                </div>
              {/each}
            </div>
          </div>
          <div class="flex flex-col">
            <IconButton
              icon={ArrowRightBig}
              iconSize="35"
              iconStyle="fill-current"
              className="mb-8 lg:mb-16 {nextButtonStatus === 'enabled'
                ? 'arrow-button-enabled'
                : 'arrow-button-disabled'}"
              on:click={handleNext}
              status="only-icon"
              size="sm"
            />
            <IconButton
              className={prevButtonStatus === "enabled"
                ? "arrow-button-enabled"
                : "arrow-button-disabled"}
              icon={ArrowLeftBig}
              iconStyle="fill-current"
              iconSize="35"
              on:click={handlePrev}
              status="only-icon"
              size="sm"
            />
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="info-text">
          В магазине получили данные по вашему заказу и начали его оформление, как только
          он будет готов, мы вышлем вам его фотографию.
        </div>
      </div>
    </div>
  </div>
  <div class="flex">
    <Button
      on:click={toggleEditModal}
      status="active-secondary"
      textClass="button-text"
      className="button mr-18"
    >
      Редактировать данные
    </Button>
    <Button
      on:click={toggleOrderCancel}
      status="active-transparent"
      textClass="button-text"
      className="button"
    >
      Отменить заказ
    </Button>
  </div>
</div>

<style lang="postcss">
  .content-left {
    margin-right: 0;
  }
  @media (min-width: 1280px) {
    .content-left {
      margin-right: 60px;
      flex: 1 1 60%;
    }
    .content-right {
      flex: 1 1 40%;
    }
  }
  @media (min-width: 1420px) {
    .content-left {
      margin-right: 100px;
      flex: 1 1 50%;
    }
    .content-right {
      flex: 1 1 50%;
    }
  }
  .compliment {
    @apply flex flex-col flex-1 items-center mr-8;
  }
  .compliment:last-of-type {
    @apply mr-0;
  }
  .compliment-rating {
    width: 22px;
    height: 22px;
    bottom: -4px;
    right: -6px;
  }
  :global(.arrow-button-enabled > svg) {
    @apply text-infolight;
  }
  :global(.arrow-button-enabled:hover > svg) {
    @apply text-info;
  }
  :global(.arrow-button-disabled > svg) {
    @apply text-gray-1100;
  }
  .icon-box {
    width: 50px;
    height: 50px;
  }
  .compliments-container {
    max-width: 370px;
  }
</style>
