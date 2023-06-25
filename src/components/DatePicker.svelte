<script>
  import { onMount, createEventDispatcher } from "svelte"
  import {
    getDaysInMonth,
    startOfMonth,
    endOfMonth,
    format,
    sub,
    add,
    setDate,
    setYear,
    isAfter,
    isBefore,
    isEqual
  } from "date-fns"
  import ru from "date-fns/locale/ru/index"
  import IconButton from "./IconButton.svelte"
  import ArrowLeftSmall from "./icons/ArrowLeftSmall.svelte"
  import ArrowRightSmall from "./icons/ArrowRightSmall.svelte"

  import startCase from "lodash-es/startCase"

  export let initDate = new Date()
  export let currDate = new Date(initDate)

  const today = new Date(initDate)
  today.setHours(0, 0, 0, 0)

  let prevButtonStatus = "disabled"

  if (initDate.getMonth() - today.getMonth() > 0) {
    prevButtonStatus = "enabled"
  }

  const dispatch = createEventDispatcher()

  let dropdownHidden = true
  let dropdown
  let dropdownButton

  let datePickerElement
  const dayOfWeekList = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

  let currCalendarDate = new Date(initDate)

  const currentMonth = new Date().getMonth()
  const currentDay = new Date().getDay()

  const start = startOfMonth(new Date())
  const end = endOfMonth(new Date())

  let prevEnd
  let nextStart

  let dayCount = 0

  $: prevEnd = endOfMonth(
    new Date(currCalendarDate.getFullYear(), currCalendarDate.getMonth() - 1)
  )
  $: nextStart = startOfMonth(
    new Date(currCalendarDate.getFullYear(), currCalendarDate.getMonth() + 1)
  )

  function createFirstRange(first, last) {
    const range = []
    for (let i = first; i <= last; i++) {
      const tmpDate = new Date(prevEnd.getTime())
      tmpDate.setDate(i)
      range.push(tmpDate)
    }
    dayCount += range.length
    return range
  }

  function createRange(first, last) {
    const range = []
    for (let i = first; i <= last; i++) {
      const tmpDate = new Date(currCalendarDate.getTime())
      tmpDate.setDate(i)
      range.push(tmpDate)
    }
    dayCount += range.length
    return range
  }

  function createLastRange(first, last) {
    const range = []
    for (let i = first; i <= last; i++) {
      const tmpDate = new Date(nextStart.getTime())
      tmpDate.setDate(i)
      range.push(tmpDate)
    }
    return range
  }

  function prevMonth() {
    if (prevButtonStatus === "disabled") {
      return
    }
    if (
      isAfter(today, sub(currCalendarDate, { months: 1 })) ||
      isEqual(today, sub(currCalendarDate, { months: 1 }))
    ) {
      prevButtonStatus = "disabled"
      today.setHours(0, 0, 0, 0)
      currCalendarDate = new Date(today.getTime())
      dayCount = 0
      return
    }
    currCalendarDate = sub(currCalendarDate, { months: 1 })
    dayCount = 0
    if (
      isAfter(today, sub(currCalendarDate, { months: 1 })) ||
      isEqual(today, currCalendarDate)
    ) {
      prevButtonStatus = "disabled"
    }
  }

  function nextMonth() {
    dayCount = 0
    currCalendarDate = add(currCalendarDate, { months: 1 })
    if (isAfter(currCalendarDate, today)) {
      prevButtonStatus = "enabled"
    }
  }

  function selectDay(e) {
    today.setHours(0, 0, 0, 0)
    if (
      today.getTime() > setDate(currCalendarDate, parseInt(e.target.innerText)).getTime()
    ) {
      return
    }
    currDate = setDate(currCalendarDate, parseInt(e.target.innerText))
    dayCount = 0
    currCalendarDate = new Date(currDate.getTime())
    dispatch("select", {
      currDate
    })
  }
  function selectPrevMonthDay(e) {
    today.setHours(0, 0, 0, 0)
    if (
      setDate(
        sub(currCalendarDate, { months: 1 }),
        parseInt(e.target.innerText)
      ).getTime() < today.getTime()
    ) {
      console.log("selectPrevMonthDay")
      return
    }
    currDate = setDate(sub(currCalendarDate, { months: 1 }), parseInt(e.target.innerText))
    dayCount = 0
    currCalendarDate = new Date(currDate.getTime())
    dispatch("select", {
      currDate
    })
  }
  function selectNextMonthDay(e) {
    dayCount = 0
    currDate = setDate(add(currCalendarDate, { months: 1 }), parseInt(e.target.innerText))
    currCalendarDate = new Date(currDate.getTime())
    if (isAfter(currCalendarDate, today)) {
      prevButtonStatus = "enabled"
    }
    dispatch("select", {
      currDate
    })
  }

  function getYearRange() {
    const range = []
    const currYear = new Date().getFullYear()
    for (let i = currYear; i < currYear + 4; i++) {
      range.push(i)
    }
    return range
  }
  function toggleYearSelect() {
    dropdownHidden = !dropdownHidden
  }
  function closeDropdown(e) {
    if (dropdownButton.contains(e.target)) {
      return
    }
    if (dropdown.contains(e.target)) {
      return
    }
    dropdownHidden = true
  }
  function selectYear() {
    currCalendarDate = setYear(currCalendarDate, parseInt(this.textContent))
    if (isBefore(currCalendarDate, today)) {
      console.log("helloo00")
      prevButtonStatus = "disabled"
      today.setHours(0, 0, 0, 0)
      currDate = new Date(today.getTime())
      currCalendarDate = new Date(today.getTime())
    } else if (
      currCalendarDate.getFullYear() === today.getFullYear() &&
      sub(currCalendarDate, { months: 1 }).getTime() < today.getTime()
    ) {
      prevButtonStatus = "disabled"
    } else {
      prevButtonStatus = "enabled"
    }
    dropdownHidden = true
    dayCount = 0
  }

  function getDayNumberStyle(currDate, day) {
    today.setHours(0, 0, 0, 0)
    if (currDate.getTime() === day.getTime()) {
      return "active text-white bg-info"
    } else if (today.getTime() > day.getTime()) {
      return "text-gray-700 cursor-default passed"
    } else {
      return "bg-white hover:bg-gray-200 text-main next"
    }
  }
</script>

<svelte:body on:click={closeDropdown} />

<div class="wrapper h-full">
  <div class="h-32 w-full flex justify-between items-center mb-4">
    <IconButton
      on:click={prevMonth}
      className="fill-current {prevButtonStatus === 'disabled'
        ? 'text-gray-1100'
        : 'text-infolight hover:text-info'}"
      iconSize="33"
      icon={ArrowLeftSmall}
      status="only-icon"
    />
    <div class="text-main font-semibold leading-snug">
      <span>{startCase(format(currCalendarDate, "LLLL", { locale: ru }))}</span>
      <div class="relative inline-block">
        <button
          bind:this={dropdownButton}
          on:click={toggleYearSelect}
          class="text-one-five text-infolight border-b border-dashed
          border-infolight font-semibold"
        >
          {currCalendarDate.getFullYear()}
        </button>
        <div
          bind:this={dropdown}
          class:hidden={dropdownHidden}
          class="rounded p-2 dropdown absolute"
        >
          <div class="shadow-popup overflow-y-auto w-full rounded">
            <div class="arrow arrow-top block" />
            <div class="rounded relative z-10">
              <ul class="yearlist">
                {#each getYearRange() as year}
                  <li>
                    <button
                      on:click={selectYear}
                      data-fullyear={`${year}:${currCalendarDate.getFullYear()}:${
                        currCalendarDate.getFullYear() === year
                      }`}
                      class="{currCalendarDate.getFullYear() === year
                        ? 'selected font-semibold'
                        : ''}
                      year bg-white text-one-five leading-mid w-full text-main
                      hover:bg-gray-200"
                      type="button"
                    >
                      {year}
                    </button>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <IconButton
      on:click={nextMonth}
      className="fill-current text-infolight hover:text-info"
      iconSize="33"
      icon={ArrowRightSmall}
      status="only-icon"
    />
  </div>
  <div class="flex flex-wrap" bind:this={datePickerElement}>
    {#each dayOfWeekList as day}
      <span class="dayofweek font-semibold text-infolight">{day}</span>
    {/each}
    {#if prevEnd.getDay() > 0}
      {#each createFirstRange(prevEnd.getDate() - prevEnd.getDay() + 1, prevEnd.getDate()) as day}
        <button
          on:click={selectPrevMonthDay}
          class="{setDate(
            sub(currCalendarDate, { months: 1 }),
            parseInt(day.getDate())
          ).getTime() < today.getTime()
            ? 'cursor-default'
            : ''} day text-gray-700"
        >
          {day.getDate()}
        </button>
      {/each}
    {/if}
    {#each createRange(1, getDaysInMonth(currCalendarDate)) as day}
      <button on:click={selectDay} class="{getDayNumberStyle(currDate, day)} day">
        {day.getDate()}
      </button>
    {/each}
    {#if nextStart.getDay() === 0}
      <button on:click={selectNextMonthDay} class="day hover:bg-gray-200 text-gray-700">
        1
      </button>
    {:else}
      {#each createRange(1, 7 - nextStart.getDay() + 1) as day}
        <button on:click={selectNextMonthDay} class="day hover:bg-gray-200 text-gray-700">
          {day.getDate()}
        </button>
      {/each}
    {/if}
    {#if dayCount < 36}
      {#each createLastRange(7 - nextStart.getDay() + 2, 7 - nextStart.getDay() + 2 + 6) as day}
        <button on:click={selectNextMonthDay} class="day hover:bg-gray-200 text-gray-700">
          {day.getDate()}
        </button>
      {/each}
    {/if}
  </div>
</div>

<style lang="postcss">
  .day {
    flex: 0 0 calc(100% / 7);
    width: 33px;
    height: 33px;
    @apply inline-flex items-center justify-center rounded-full text-one-five leading-mid;
  }
  .dayofweek {
    flex: 0 0 calc(100% / 7);
    width: 33px;
    height: 33px;
    @apply inline-flex items-center justify-center;
  }
  .wrapper {
    max-width: 231px;
  }
  .arrow {
    width: 14px;
    height: 14px;
    position: absolute;
    overflow: hidden;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
  .arrow-top {
    top: -10px;
  }
  .arrow-top:after {
    content: "";
    bottom: -8px;
    display: block;
    box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.15);
    position: absolute;
    width: 14px;
    height: 14px;
    transform: rotate(45deg);
    background-color: white;
  }
  .visible {
    display: block;
  }
  .year {
    height: 35px;
  }
  .yearlist li button.selected {
    @apply text-info text-one-five leading-mid;
  }
  .dropdown {
    min-width: 60px;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
