<script>
  import { createEventDispatcher } from "svelte"
  import CalendarSimple from "./icons/CalendarSimple.svelte"
  import { imask } from "svelte-imask"
  import CustomDropdown from "./CustomDropdown.svelte"
  import DatePicker from "./DatePicker.svelte"
  import { format, parse } from "date-fns"

  export let value = undefined
  export let className = ""
  export let name = ""

  export let pattern = undefined
  export let required = undefined
  export let min = undefined
  export let max = undefined
  export let minlength = undefined
  export let maxlength = undefined
  export let novalidate = undefined

  const dispatch = createEventDispatcher()

  let calendarDate
  let currDate

  let buttonRef
  let calendarVisible

  let wrapper
  let ref

  const options = {
    mask: Date,
    // other options are optional
    pattern: "dd/`mm/`yyyy", // Pattern mask with defined blocks, default is 'd{.}`m{.}`Y'
    // you can provide your own blocks definitions, default blocks for date mask are:
    blocks: {
      dd: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31,
        maxLength: 2
      },
      mm: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2
      },
      yyyy: {
        mask: IMask.MaskedRange,
        from: 2010,
        to: 9999
      }
    },
    // define date -> str convertion
    format: function (date) {
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      if (day < 10) day = "0" + day
      if (month < 10) month = "0" + month

      return [day, month, year].join("/")
    },
    // define str -> date convertion
    parse: function (str) {
      const [day, month, year] = str.split("/")
      console.log(day, month, year)
      return new Date(year, month - 1, day)
    }
  }

  function onComplete({ detail: imask }) {
    const date = imask.value
    console.log("date", date)
  }
  function handleDateSelect({ detail }) {
    console.log("currDate", detail.currDate)
    currDate = detail.currDate
    calendarVisible = false
  }

  function toggleCalendar() {
    calendarVisible = !calendarVisible
  }
  function getDate({ detail }) {
    date = detail.currDate ? format(detail.currDate, "dd/MM/yyyy") : ""
  }
  $: if (currDate) {
    console.log("change", wrapper)
    value = currDate ? format(currDate, "dd/MM/yyyy") : ""
    setTimeout(
      () =>
        dispatch("input", {
          target: ref,
          name
        }),
      0
    )
  }
</script>

<div
  on:click={toggleCalendar}
  bind:this={wrapper}
  tabindex="0"
  class="cursor-pointer rounded border border-gray-500 bg-white flex {className}"
>
  <button
    class="bg-white pl-12 rounded-l pointer-events-none"
    type="button"
    bind:this={buttonRef}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
    >
      <path
        d="M17 17.2487C17 18.2137 16.0654 19 14.908 19H3.09187C1.93918 19 1 18.2177 1 17.2487V4.19122C1 3.22621 1.93444 2.43994 3.09187 2.43994H14.908C16.0654 2.43994 17 3.22621 17 4.19122V17.2487Z"
        stroke="#330033"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13 1L13 3.88"
        stroke="#330033"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5 1L5 3.88"
        stroke="#330033"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1 7.04004H17"
        stroke="#330033"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
  <input
    bind:this={ref}
    class="placeholder-input pointer-events-none pl-12 text-main leading-mid w-full text-one-five rounded"
    on:complete={onComplete}
    use:imask={options}
    {value}
    on:invalid
    on:focus
    placeholder="дд/мм/гггг"
    {name}
    {pattern}
    {required}
    {min}
    {max}
    {minlength}
    {maxlength}
    {novalidate}
    type="text"
  />
</div>

{#if calendarVisible}
  <CustomDropdown
    bind:dropdownVisible={calendarVisible}
    relativeElement={buttonRef}
    bind:buttonRef={wrapper}
    css="height: 320px;"
    position="LEFT"
  >
    <section class="bg-white p-24 h-full">
      <DatePicker
        on:select={handleDateSelect}
        initDate={value ? parse(value, "dd/MM/yyyy", new Date()) : undefined}
      />
    </section>
  </CustomDropdown>
{/if}

<style lang="postcss">
  div {
    @apply outline-none;
  }
  div.error {
    @apply border-error;
  }
  div:focus {
    @apply border-infolight;
  }
  div {
    height: 35px;
  }
  input:required {
    @apply border-transparent;
  }
  input:invalid {
    @apply border-transparent outline-none shadow-none;
  }
  input:disabled {
    @apply border-none bg-transparent;
  }
</style>
