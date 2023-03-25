<script>
  import DeliveryTimeDropdown from "./DeliveryTimeDropdown.svelte";
  import IconButton from "./IconButton.svelte";
  import LinkButton from "./LinkButton.svelte";
  import { orderStore } from '../stores/order.js';

  import Edit from "./icons/Edit.svelte";

  import { format } from "date-fns";
  import { ru } from "date-fns/locale";

  //export let time = "время уточнить по телефону";

  export let tab;
  export let date = {
    value: "",
    default: "",
    time: {
      exact: "",
      range: {
        from: "",
        to: "",
      },
    },
    notime: tab === "other" ? "Уточнить у получателя" : "Уточнить по телефону",
    status: "range",
  };

  let deliveryDate = "29 сентября";
  let sum = "3459";

  let time = "";
  let days = "";
  $: console.log("payment res", date);
  $: if (date) {
    if (date.value) {
      let selectedDate = date.value.split("/");
      let d = selectedDate[0];
      let m = selectedDate[1] - 1;
      let y = selectedDate[2];
      days = format(new Date(y, m, d), "d MMMM, EEEE", { locale: ru });
      if (date.status === "exact") {
        if (date.time.exact) {
          if(date.TimeValueSelect != 'Выберите время' ) {time = date.TimeValueSelect;} else {  time = ''}
        } else {
          time = `время ${date.notime.toLowerCase()}`;
        }
      } else if (date.status === "range") {
    //    if (date.time.range.from && date.time.range.to) {
       //   time = `с ${date.time.range.from} до ${date.time.range.to}`;
        if(date.TimeValueRange != 'Выберите время') {time = 'с' + date.TimeValueRange;} else { time = ''}
    //    } else {
    //      time = `время ${date.notime.toLowerCase()}`;
     //   }
      } else if (date.status === "notime") {
        time = `время ${date.notime.toLowerCase()}`;
      }
    } else {
      time = 'в течение 60-80 минут'
    }
  }
  $: date.default = new Date().getTime();
</script>

<style>

</style>

<div
  class="rounded-b border-r border-gray-300 border-l border-b -mr-32 px-44
  sm:px-34 xl:px-80 pt-24 sm:pt-34 bg-cardbg w-full flex flex-wrap
  justify-between">
  <div class="mr-32 mb-34">
    <h5 class="text-gray-600 text-sm mb-8 leading-mid">Дата и время доставки</h5>
    {#if date.value}
      <div class="text-main font-semibold text-lg leading-snug">{days}</div>
      <div class="leading-snug flex">
        <span class="text-main font-semibold text-lg leading-snug">{time}</span>
      </div>
    {:else}
      <div class="text-main font-semibold text-lg leading-snug">
        {format(new Date(date.default), 'd MMMM, EEEE', { locale: ru })}
      </div>
      <div class="leading-snug flex">
        <span class="text-main font-semibold text-lg leading-snug">{time}</span>
      </div>
    {/if}
  </div>
  <div class="mr-32 mb-34">
    <h5 class="text-gray-600 leading-mid text-sm">Итого</h5>
    <p class="text-main font-semibold text-2xl">{$orderStore.totalPrice} P</p>
  </div>
  <LinkButton
    href="/catalog/bouquets"
    className="self-center mb-30"
    size="lg"
    status="active-secondary">
    Вернуться в каталог
  </LinkButton>
</div>
