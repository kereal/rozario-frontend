<script>
  import { createEventDispatcher } from "svelte"
  import ModalSurface from "./ModalSurface.svelte"
  import LinkButton from "./LinkButton.svelte"

  import Calendar from "./icons/Calendar.svelte"
  import Arrow from "./icons/Arrow.svelte"

  export let bonusPercentage

  const dispatch = createEventDispatcher()

  function closeModal() {
    dispatch("close")
  }

  // FIXME get from store
  export let deal = 0
</script>

<ModalSurface css="height:291px; width: 400px;" on:close={closeModal}>
  <div>
    <h3 class="text-main font-semibold text-1xl leading-small">Спасибо за ваш отзыв!</h3>
    <div class="mt-24 mb-18 flex justify-between">
      <div class="mr-80">
        <div class="mb-14 text-sm leading-mid mt-8 text-main">
          Накоплено купонов
          <br />
          на сумму:
          <span class="font-semibold">
            25 Р
            <span />
          </span>
        </div>
        <LinkButton on:click={closeModal} href="/catalog" size="lg" status="active-main">
          В каталог
        </LinkButton>
      </div>
      <div class="">
        <div class="coupon text-white">
          <div class="deal text-center font-semibold leading-snug">
            {bonusPercentage} &#8381;
          </div>
          <div
            class="coupon-text text-center font-weight text-1xl leading-none
            mb-24"
          >
            купон
          </div>
          <div
            class="chip leading-none px-4 font-semibold text-sm flex
            justify-center pt-2"
          >
            получен
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="flex items-end">
        <div>
          <img src="calendar.svg" class="w-32 h-32" alt="icon" />
        </div>
        <div class="text-main ml-12">
          <div class="text-sm mb-2 leading-mid">Добавьте в календарь важную дату,</div>
          <div class="text-xs leading-tight flex">
            <span class="mr-12 leading-tight">
              а мы заранее напомним о поздравлении
            </span>
          </div>
        </div>
        <div class="-mb-4">
          <Arrow iconSize="18" classNames="fill-current text-main" />
        </div>
      </div>
    </div>
  </div>
</ModalSurface>

<style lang="postcss">
  .coupon {
    background: url("/big-coupon.svg") no-repeat;
    width: 120px;
    height: 141px;
    padding-top: 11px;
  }
  .deal {
    font-size: 41px;
  }
  .coupon-text {
    font-size: 21px;
  }
  .chip {
    width: 68px;
    height: 21px;
    @apply bg-white text-info mx-auto rounded;
  }
</style>
