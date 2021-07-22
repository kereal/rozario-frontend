<script>
  import CustomRadioButton from "./CustomRadioButton.svelte";
  import { fade } from 'svelte/transition';
  import Info from "./icons/Info.svelte";
  import DateInput from "./DateInput.svelte";
  import CustomDropdown from "./CustomDropdown.svelte";
  import TextInput from "./TextInput.svelte";
  import HelpButton from "./HelpButton.svelte";
  import debounce from "lodash-es/debounce";
  import { format, add } from "date-fns";
  import SelectLabel from"./SelectLabel.svelte";
  import LetterI from "./icons/LetterI.svelte";

  export let tab;
  export let exactPrice = '200-400'
  export let rangePrice = '0 - 200'

  export let deliveryPeriods = [
    {
      name:'', selectedTime:'Выберите время', since: 21, until: 7 , step:1, price: 450, list: []
    },
    {
      name:'', selectedTime:'Выберите время', since:21, until:8, step:2, price: 250, list: []
    },
    {
      name:'', selectedTime:'Выберите время', since: 8 , until:21, step:1, price: 200, list: []
    },
    {
      name:'', selectedTime:'Выберите время', since:8, until:21, step:2, price:0, list: []
    }
  ];
let countPeriods = 0;

    deliveryPeriods.forEach((item) =>{
      item.name = 'period' + countPeriods
     countPeriods++
      // если к точному времени
      if(item.step == 1) {
        for(let i = item.since; i != item.until; i++) {
          if(i == 24) {i = 0;}
          item.list.push(i + ':00', i + ':30')
        }
      }
      // если есть интервал
      else {
        for(let i = item.since; i + item.step != item.until; i++) {
          if(i == 24) {i = 0;}
          if(i + item.step >= 24) {
            let differense =  i + item.step - 24
            item.list.push(i + ':00 - ' + differense + ':00', i + ':30 - ' + differense + ':30')
          } else {
            let step = i + item.step;
             item.list.push(i + ':00 - ' + step + ':00', i + ':30 - ' + step + ':30')
          }
        }
      }
    }
    )



  export let address;
  export let date = {
    value: "",
    default: "",
    time: {
      exact: "",
      range: {
        from: "",
        to: ""
      }
    },
    notime: tab === "other" ? "Уточнить у получателя" : "Уточнить по телефону",
    status: "range",
    TimeValueRange: 'Выберите время',
    TimeValueSelect: 'Выберите время'
  };

  let calDate;

  const TIME_GROUP = {
    EXACT: "exact",
    RANGE: "range",
    NO_TIME: "notime"
  };
  const DATE_GROUP = {
    TODAY: "today",
    OTHER: "other"
  };

  let exactTimeHelpVisible = false;
  let noTimeHelpVisible = false;

  let menuInfoButton;
  let timeInputExact;
  let timeInputFrom;
  let infoButtonNoTime;
  let exactTimeValues = [];
  let rangeTimeValues = [];
  doPeriodsExact(exactTimeValues);
  doPeriodsRange(rangeTimeValues, 2);
  let timeGroup = date.status;
  let dateGroup = DATE_GROUP.TODAY;

  function doPeriodsExact(array) {
      for(let i=0; i < 24; i++) {
        array.push( i+':00', i+':30' );
      }
  }
  function doPeriodsRange(array, range, exact) {
    let a;
    let b;
    for(let i = 0; i < 24 - range; i++) {
      a = i;
      b = i + range;
      array.push(a +':00 - ' + b + ':00');
      array.push(a +':30 - ' + b + ':30');
    }
  }
  const timeMaskOptions = {
    mask: "HH{:}ml",
    blocks: {
      HH: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 23,
        maxLength: 2
      },
      m: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 5,
        maxLength: 1
      },
      l: {
        mask: "{\\0}"
      }
    },
    autofix: true
  };

  function toggleExactTimeHelp() {
    exactTimeHelpVisible = !exactTimeHelpVisible;
  }
  function toggleNoTimeHelp() {
    noTimeHelpVisible = !noTimeHelpVisible;
  }
  function handleTimeExactComplete({ detail: mask }) {
    if (mask.value.length < 5) {
      return new Date();
    }
    date.time.exact = mask.value;
  }

  function handleTimeRangeFromComplete({ detail: mask }) {
    if (date.time.exact) {
      date.time.range = { to: "", from: "" };
    }
    date.time.range.from = mask.value;
    const splittedHours = mask.value.split(":");
    const from = new Date();
    from.setHours(parseInt(splittedHours[0]));
    from.setMinutes(parseInt(splittedHours[1]));
    date.time.range.to = format(add(from, { hours: 2 }), "HH:mm");
  }

  function validateFormInput(e) {
    const elem = document.querySelector(
      `#cart-delivery-date .validation .${e.target.name}`
    );
    console.log("e target", e.target.validity);
    if (!e.target.validity.valid) {
      e.target.closest("div").classList.add("error");
      elem.classList.remove("invisible");
    } else {
      e.target.closest("div").classList.remove("error");
      elem.classList.add("invisible");
    }
  }

  function handleInvalid(e) {
    e.preventDefault();
    validateFormInput(e);
  }
  let selectedPeriod = 'noTime'

  $: date.value = calDate ? calDate : "";
  $: date.status = timeGroup;
  $: date.default = new Date().getTime();
  $: console.log("date datecard", date);
</script>

<style lang="postcss">
  .cart-delivery-date {
    width: 440px;
  }
  .margin {
    margin-left: 28px;
  }
  .selectTime {
    width: 164px;
    margin-top: -10px;
    margin-bottom: 16px;
    margin-left: 28px;
  }
  .noneSelectPrice {
    font-size: 14px;
    color: var(--gray-600);
  }
  .SelectPrice {
    font-weight: 600;
    font-size: 14px;
    color: var(--color-main);
  }
  .info :global(.info-button) {
    @apply w-16 h-16 border rounded-full bg-transparent border-infolight flex items-center justify-center;
  }
  .info :global(.info-button:hover) {
    @apply bg-infolight border-infolight;
  }
  .info :global(.info-button:hover svg) {
    @apply text-white;
  }
  .validation {
    @apply flex justify-between text-xs leading-tight mb-8;
  }
  .error-text {
    @apply text-error;
  }

</style>

<div id="cart-delivery-date" class="bg-cardbg rounded cart-delivery-date">
  <h2 class="text-main font-semibold pb-24 text-xl leading-tight">
    Дата и время доставки
  </h2>
  {#if address.noAddress != 'noAddress'}
  <div class="text-one-five">
    <div>
        <div class="margin mt-16">
       <div class="validation">
            <label class="inline-block text-ssm leading-tight text-gray-600">
                Дата доставки
              </label>
              <span class="error-text invisible date">Укажите дату доставки</span>
            </div>
           <DateInput
              required={true}
              name="date"
              on:invalid={handleInvalid}
              on:input={({ detail }) => validateFormInput(detail)}
              className="w-full text-main placeholder-input"
              bind:value={calDate}
              id="cart-date-input" />

       </div>
        <div class="margin mt-24">
          <label
            class="inline-block text-ssm leading-tight text-gray-600 mb-16">
            Время доставки
          </label>
          <fieldset class="info w-full flex flex-col">
            {#each deliveryPeriods as period}
              <div class="flex justify-between">
                <div class="mb-24 flex items-center mr-12">
                  <CustomRadioButton
                          className="leading-mid"
                          id="editmodal-exact-time"
                          weight=""
                          label="{period.step == 1 ?
                           'Доставка к точному времени с ' + period.since + ':00 до ' + period.until + ':00':
                            'Доставка интервал ' + period.step + ' часа с ' + period.since + ':00 до ' + period.until + ':00'}"
                          labelClass="text-one-five "
                          bind:group={selectedPeriod}
                          value={period.name} />
                </div>
                <div class="{selectedPeriod === period.name ? 'SelectPrice' : 'noneSelectPrice'}">{period.price} ₽</div>
              </div>
              {#if selectedPeriod === period.name}
              <div class="selectTime" in:fade>
                 <SelectLabel list={period.list} bind:select={period.selectedTime} />
               </div>
              {/if}
             {/each}
             <div class="flex justify-between">
             <div class="flex items-center">
               <div class="mr-16">
                 {#if tab === 'me'}
                   <CustomRadioButton
                           className="leading-mid"
                           labelClass="text-one-five"
                           id="editmodal-no-time"
                           weight=""
                           label={'Уточнить по телефону'}
                           bind:group={selectedPeriod}
                           value={'noTime'} />
                   {:else}
                   <CustomRadioButton
                           className="leading-mid"
                           labelClass="text-one-five"
                           id="editmodal-no-time"
                           weight=""
                           label={'Уточнить время у получателя'}
                           bind:group={selectedPeriod}
                           value={'noTime'} />
                 {/if}

               </div>
               <div class="pt-2">
                 {#if tab == 'me'}
                   <HelpButton
                           position="CENTER"
                           css="width: 300px;"
                           text="Мы заранее позвоним вам и уточним, где и в какое время вам будет удобно получить заказ" />
                   {:else}
                   <HelpButton
                           position="CENTER"
                           css="width: 300px;"
                           text="Мы заранее позвоним получателю и уточним, где и в какое время вам будет удобно получить заказ" />
                 {/if}
               </div>
             </div>
             <div class="{selectedPeriod == 'no_time' ? 'SelectPrice' : 'noneSelectPrice'}">от 0 ₽</div>
             </div>
           </fieldset>
         </div>
     </div>
   </div>
   {/if}
   {#if address.noAddress == 'noAddress'}
 <div class="">
   <div class="validation">
     <label class="inline-block text-ssm leading-tight text-gray-600">
       Дата доставки
     </label>
     <span class="error-text invisible date">Укажите дату доставки</span>
   </div>
         <DateInput
         required={true}
         name="date"
         on:invalid={handleInvalid}
         on:input={({ detail }) => validateFormInput(detail)}
         className="w-full text-main placeholder-input"
         bind:value={calDate}
         id="cart-date-input" />
 </div>
 {/if}
 </div>
