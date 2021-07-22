<script>
  import IconButton from "./IconButton.svelte";
  import Button from "./Button.svelte";
  import StarRating from "./StarRating.svelte";
  import AddComplimentModal from "./AddComplimentModal.svelte";
  import ConfirmationModal from "./ConfirmationModal.svelte";
  import ThanksForTestimonial from "./ThanksForTestimonial.svelte";
  import TextArea from "./TextArea.svelte";

  import Plus from "./icons/Plus.svelte";
  import ArrowLeftBig from "./icons/ArrowLeftBig.svelte";
  import ArrowRightBig from "./icons/ArrowRightBig.svelte";

  export let compliments;

  let confirmationModalVisible = false;
  let addComplimentVisible = false;
  let thanksForTestimonialVisible = false;

  let flowerFreshnessRating = 0;
  let courierRating = 0;
  let serviceRating = 0;
  let bonusPercentage = 0;

  const otherCompliment = {
    text: "Другой комплимент",
    icon: Plus,
    color: "transparent",
  };

  const bonus = {
    compliment: {
      points: 15,
      enabled: false,
    },
    starsFreshness: {
      points: 10,
      enabled: false,
    },
    starsCourierWork: {
      points: 10,
      enabled: false,
    },
    starsService: {
      points: 10,
      enabled: false,
    },
    comment: {
      points: 55,
      enabled: false,
    },
  };

  let testimonial = "";

  let currentSlide = 0;
  let prevButtonStatus = "disabled";
  let nextButtonStatus = "enabled";

  function handlePrev() {
    if (prevButtonStatus === "disabled") {
      return;
    }
    if (currentSlide > 0) {
      currentSlide--;
    }
    if (currentSlide === 0) {
      prevButtonStatus = "disabled";
    }
    if (currentSlide < compliments.length - 1) {
      nextButtonStatus = "enabled";
    }
  }
  function handleNext() {
    if (nextButtonStatus === "disabled") {
      return;
    }
    if (currentSlide < compliments.length - 1) {
      currentSlide++;
    }
    if (currentSlide > 0) {
      prevButtonStatus = "enabled";
    }
    if (currentSlide * compliments.length >= compliments.length - 1) {
      nextButtonStatus = "disabled";
    }
  }

  function toggleThanksForTestimonial() {
    thanksForTestimonialVisible = !thanksForTestimonialVisible;
  }

  function showAddCompliment() {
    if (otherCompliment.active) {
      toggleConfirmationModal();
    } else {
      addComplimentVisible = true;
    }
  }

  function cancelAddCompliment() {
    addComplimentVisible = false;
  }

  function handleAddCompliment() {
    if (!bonus.compliment.enabled) {
      otherCompliment.active = true;
      bonusPercentage += bonus.compliment.points;
      bonus.compliment.enabled = true;
      addComplimentVisible = false;
    }
  }

  function removeCompliment() {
    if (bonus.compliment.enabled) {
      bonusPercentage -= bonus.compliment.points;
      bonus.compliment.enabled = false;
      otherCompliment.active = false;
    }
  }

  function handleCompliment(e) {
    const index = e.target.closest("button").dataset.index;
    compliments[index].active = !compliments[index].active;

    const hasActive = compliments.find((item) => item.active);
    if (!bonus.compliment.enabled) {
      bonusPercentage += bonus.compliment.points;
      bonus.compliment.enabled = true;
    } else if (!hasActive) {
      bonusPercentage -= bonus.compliment.points;
      bonus.compliment.enabled = false;
    }
  }

  function addBonusStars(starsType) {
    const stars = bonus[starsType];
    if (!stars.enabled) {
      bonusPercentage += stars.points;
      bonus[starsType].enabled = true;
    } else if (bonusPercentage >= stars.points) {
      bonusPercentage -= stars.points;
      bonus[starsType].enabled = false;
    }
  }

  function addBonusFromFreshnessStars() {
    addBonusStars("starsFreshness");
  }
  function addBonusFromCourierStars() {
    addBonusStars("starsCourierWork");
  }
  function addBonusFromServiceStars() {
    addBonusStars("starsService");
  }

  function addBonusForTestimonial(testimonial) {
    if (!bonus.comment.enabled && testimonial.trim().length > 0) {
      bonus.comment.enabled = true;
      return 55;
    } else if (bonus.comment.enabled && testimonial.trim().length === 0) {
      bonus.comment.enabled = false;
      if (bonusPercentage >= 55) {
        return -55;
      }
      return 0;
    }
    return 0;
  }

  function toggleConfirmationModal() {
    confirmationModalVisible = !confirmationModalVisible;
  }

  $: bonusPercentage += addBonusForTestimonial(testimonial);
</script>

<style lang="postcss">
  .content {
    padding: 24px;
    padding-bottom: 34px;
  }
  .content-left {
    margin-right: 0;
  }
  .content :global(.textarea) {
    height: 102px;
  }
  .carousel {
    max-width: 378px;
  }
  @media (min-width: 1280px) {
    .content :global(.textarea) {
      height: 161px;
    }
    .content {
      padding: 34px;
    }
    .carousel {
      max-width: 350px;
    }
    .content-left {
      flex: 1 1 55%;
      margin-right: 16px;
    }
    .content-right {
      flex: 1 1 45%;
    }
  }
  @media (min-width: 1420px) {
    .carousel {
      min-width: 378px;
    }
    .content-left {
      flex: 1 1 50%;
      margin-right: 42px;
    }
    .content-right {
      flex: 1 1 50%;
    }
  }
  .compliment-item {
    flex: 1 0 calc(100% / 4);
    @apply flex flex-col items-center;
  }
  .compliment-item button {
    width: 44px;
    height: 44px;
  }
  .compliment-item:hover button {
    @apply bg-info;
  }
  .compliment-item:hover span {
    @apply text-main;
  }
  :global(.compliment-item:hover button > svg) {
    @apply text-white;
  }
  :global(.other-compliment-color) {
    color: #cc6699 !important;
  }
</style>

<div class="content w-full h-full flex flex-col justify-between">
  <h3 class="title">Ваш заказ доставлен!</h3>
  <div class="text-main text-one-five mb-24 text block lg:hidden leading-mid">
    Оставьте отзыв о заказе и получите
    <span class="text-info">купон</span>
    на следующую покупку. Чем полнее отзыв, тем больше бонусов!
  </div>
  <div class="flex flex-col lg:flex-row">
    <div class="content-left flex flex-col justify-between">
      <div>
        <div class="text-gray-600 mb-16 leading-mid text-one-five">
          Оцените качество оказанных услуг
        </div>
        <div class="flex items-center mb-8 leading-mid">
          <StarRating
            on:checked={addBonusFromFreshnessStars}
            name="flower-freshness"
            bind:rating={flowerFreshnessRating} />
          <span class="ml-24 text-main text-sm">Свежесть цветов</span>
        </div>
        <div class="flex items-center mb-8 leading-mid">
          <StarRating
            on:checked={addBonusFromCourierStars}
            name="courier"
            bind:rating={courierRating} />
          <span class="ml-24 text-main text-sm">Работа курьера</span>
        </div>
        <div class="flex items-center leading-mid">
          <StarRating
            on:checked={addBonusFromServiceStars}
            name="service"
            bind:rating={serviceRating} />
          <span class="ml-24 text-main text-sm">Обслуживание</span>
        </div>
        <div
          class="text-gray-600 mt-18 lg:mt-24 mb-16 text-one-five leading-mid">
          Добавим комплимент?
        </div>
        <div class="flex items-center">
          <IconButton
            icon={ArrowLeftBig}
            iconSize="35"
            iconStyle="fill-current"
            className="flex-shrink-0 {prevButtonStatus === 'enabled' ? 'arrow-button-enabled' : 'arrow-button-disabled'}"
            on:click={handlePrev}
            status="only-icon"
            size="sm" />
          <div class="carousel relative overflow-hidden mx-16">
            <div
              style={`transform: translateX(calc(-100% * ${currentSlide}))`}
              class="slider flex transition-transform duration-200 ease-in">
              {#each compliments as compliment, i}
                <div class="compliment-item">
                  <button
                    data-index={i}
                    on:click={handleCompliment}
                    style="background-color: {compliment.active ? compliment.color : ''};"
                    class="rounded-full flex items-center justify-center
                    bg-gray-300">
                    <svelte:component
                      this={compliment.icon}
                      iconSize="24"
                      classNames="fill-current {compliment.active ? 'text-white' : 'text-main'}" />
                  </button>
                  <span
                    class="{compliment.active ? 'text-main' : 'text-gray-600'}
                    mt-4 leading-tight text-center text-xs leading-two">
                    {compliment.text}
                  </span>
                </div>
              {/each}
              <div class="compliment-item">
                <button
                  on:click={showAddCompliment}
                  style="background-color: {otherCompliment.active ? otherCompliment.color : ''};border-color:{otherCompliment.active ? '#CC6699' : ''}"
                  class="rounded-full flex items-center justify-center
                  bg-gray-300 {otherCompliment.active ? 'border' : ''}">
                  <svelte:component
                    this={otherCompliment.icon}
                    iconSize="24"
                    classNames="fill-current {otherCompliment.active ? 'other-compliment-color' : 'text-main'}" />
                </button>
                <span
                  class="{otherCompliment.active ? 'text-main' : 'text-gray-600'}
                  mt-4 leading-tight text-center text-xs leading-two">
                  {otherCompliment.text}
                </span>
              </div>
            </div>
          </div>
          <IconButton
            icon={ArrowRightBig}
            iconSize="35"
            iconStyle="fill-current"
            className="flex-shrink-0 {nextButtonStatus === 'enabled' ? 'arrow-button-enabled' : 'arrow-button-disabled'}"
            on:click={handleNext}
            status="only-icon"
            size="sm" />
        </div>
      </div>
      <div class="mt-20 hidden lg:block">
        <div class="text-gray-600 text-sm mb-6 leading-tight">
          Отзыв заполнен на {bonusPercentage}% —
          <span class="font-semibold">купон на {bonusPercentage} ₽</span>
        </div>
        <div class="progress-bar w-full h-8 bg-gray-200">
          <div style="width: {bonusPercentage}%;" class="h-full bg-accent" />
        </div>
      </div>
    </div>
    <div class="content-right flex flex-col justify-between mt-24 lg:mt-0">
      <div
        class="text-main text-one-five mb-24 text hidden lg:block leading-mid">
        Оставьте отзыв о заказе и получите
        <span class="text-info">купон</span>
        на следующую покупку. Чем полнее отзыв, тем больше сумма купона!
      </div>
      <TextArea bind:value={testimonial} className="textarea mb-18 lg:mb-24" />
      <div>
        <Button
          on:click={toggleThanksForTestimonial}
          status={bonus.comment.enabled || bonus.compliment.enabled || bonus.starsFreshness.enabled || bonus.starsCourierWork.enabled || bonus.starsService.enabled ? 'active-main' : 'disabled-main'}
          textClass="button-text"
          className="button">
          Оставить отзыв
        </Button>
      </div>
    </div>
  </div>
  <div class="mt-24 block lg:hidden">
    <div class="text-gray-600 text-sm mb-24 leading-tight">
      Отзыв заполнен на {bonusPercentage}% —
      <span class="font-semibold">купон на {bonusPercentage} ₽</span>
    </div>
    <div class="progress-bar w-full h-8 bg-gray-200">
      <div style="width: {bonusPercentage}%;" class="h-full bg-accent" />
    </div>
  </div>
</div>

{#if confirmationModalVisible}
  <ConfirmationModal
    cancelText="Нет"
    confirmText="Да"
    text="Удалить комплимент?"
    on:confirm={removeCompliment}
    on:close={toggleConfirmationModal} />
{/if}

{#if addComplimentVisible}
  <AddComplimentModal
    on:add={handleAddCompliment}
    on:cancel={cancelAddCompliment} />
{/if}

{#if thanksForTestimonialVisible}
  <ThanksForTestimonial
    {bonusPercentage}
    on:close={toggleThanksForTestimonial} />
{/if}
