<script>
  import { createEventDispatcher } from "svelte"
  import { startOfMonth, endOfMonth, format, sub, add, isEqual, isAfter } from "date-fns"
  import { ru } from "date-fns/locale"
  import IconButton from "./IconButton.svelte"

  import ArrowLeft from "./icons/ArrowLeft.svelte"
  import ArrowRight from "./icons/ArrowRight.svelte"

  export let initDate = new Date()
  export let today = new Date()

  const dispatch = createEventDispatcher()

  let currCalendarDate = new Date(initDate)
  let currDate = new Date(initDate)

  if (typeof initDate === "string") {
    initDate = new Date(initDate)
  }

  const daysVisible = 7

  const dayOfWeekList = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]

  let prevMonthButtonStyle = "text-gray-1100"

  if (initDate.getMonth() - today.getMonth() > 0) {
    prevMonthButtonStyle = "text-main"
  }

  let prevButtonStatus = "disabled"
  const nextButtonStatus = "enabled"

  function prevMonth() {
    if (
      isAfter(today, sub(startOfMonth(currCalendarDate), { months: 1 })) ||
      isEqual(today, sub(startOfMonth(currCalendarDate), { months: 1 }))
    ) {
      prevButtonStatus = "disabled"
      prevMonthButtonStyle = "text-gray-1100"
      currCalendarDate = new Date(today.getTime())
      console.log(currCalendarDate)
      return
    }
    console.log(currCalendarDate, startOfMonth(currCalendarDate))
    currCalendarDate = sub(startOfMonth(currCalendarDate), { months: 1 })
    if (
      isAfter(today, sub(startOfMonth(currCalendarDate), { months: 1 })) ||
      isEqual(today, currCalendarDate)
    ) {
      prevButtonStatus = "disabled"
      prevMonthButtonStyle = "text-gray-1100"
    }
  }

  function nextMonth() {
    console.log(currCalendarDate, startOfMonth(currCalendarDate))
    currCalendarDate = add(startOfMonth(currCalendarDate), { months: 1 })
    if (isAfter(currCalendarDate, today)) {
      prevMonthButtonStyle = "text-main"
      prevButtonStatus = "enabled"
    }
  }

  function selectDay(e) {
    if (
      isAfter(
        today,
        dateList[parseInt(e.target.closest(".day-block").dataset.index)].date
      )
    ) {
      return
    }
    currDate = dateList[parseInt(e.target.closest(".day-block").dataset.index)].date
    dispatch("change", {
      value: currDate
    })
  }

  function prevDay() {
    currCalendarDate = sub(currCalendarDate, { days: daysVisible })
    if (
      isEqual(today, sub(currCalendarDate, { day: daysVisible })) ||
      isAfter(today, sub(currCalendarDate, { day: daysVisible }))
    ) {
      prevMonthButtonStyle = "text-gray-1100"
      prevButtonStatus = "disabled"
    }
  }

  function nextDay() {
    currCalendarDate = add(currCalendarDate, { days: daysVisible })
    if (isAfter(currCalendarDate, today)) {
      prevMonthButtonStyle = "text-main"
      prevButtonStatus = "enabled"
    }
  }

  function getDateListFullWeek(currCalendarDate) {
    const dateList = []
    let currDay = currCalendarDate.getDay()
    if (currDay === 0) {
      currDay = 7
    }
    let j = 1
    for (let i = currDay - 1; i > 0; i--) {
      const prevDate = sub(currCalendarDate, { days: j })
      dateList.unshift({ day: dayOfWeekList[i], date: prevDate })
      j++
    }
    j = 0
    for (let i = currDay; i <= 7; i++) {
      const nextDate = add(currCalendarDate, { days: j })
      if (i === 7) {
        dateList.push({ day: dayOfWeekList[0], date: nextDate })
      } else {
        dateList.push({ day: dayOfWeekList[i], date: nextDate })
      }
      j++
    }
    return dateList
  }

  function getDateListFiveDays(currCalendarDate) {
    const dateList = []
    const currDay = currCalendarDate.getDay()
    dateList.push({ day: dayOfWeekList[currDay], date: currCalendarDate })
    for (let i = 1; i < 3; i++) {
      const nextDate = add(currCalendarDate, { days: i })
      const prevDate = sub(currCalendarDate, { days: i })

      if (currDay + i > dayOfWeekList.length) {
        dateList.push({ day: dayOfWeekList[i - 1], date: nextDate })
      } else if (currDay + i === dayOfWeekList.length) {
        dateList.push({ day: dayOfWeekList[0], date: nextDate })
      } else {
        dateList.push({ day: dayOfWeekList[currDay + i], date: nextDate })
      }

      if (currDay === 0) {
        dateList.unshift({
          day: dayOfWeekList[dayOfWeekList.length - i],
          date: prevDate
        })
      } else if (currDay - i < 0) {
        dateList.unshift({
          day: dayOfWeekList[dayOfWeekList.length - 1],
          date: prevDate
        })
      } else {
        dateList.unshift({ day: dayOfWeekList[currDay - i], date: prevDate })
      }
    }
    return dateList
  }

  function getDayOfWeekStyle(currDate, day) {
    today.setHours(0, 0, 0, 0)
    if (currDate.getTime() === day.date.getTime()) {
      return "active text-infolight font-semibold"
    } else if (today.getTime() > day.date.getTime()) {
      return "text-gray-1100 passed"
    } else {
      return "text-gray-700 next"
    }
  }

  function getDayNumberStyle(currDate, day) {
    today.setHours(0, 0, 0, 0)
    if (currDate.getTime() === day.date.getTime()) {
      return "active bg-infolight text-white font-semibold"
    } else if (today.getTime() > day.date.getTime()) {
      return "text-gray-700 passed"
    } else {
      return "bg-white text-main next"
    }
  }

  $: dateList = getDateListFullWeek(currCalendarDate)
</script>

<div class="calendar-grid">
  <div class="grid-month h-32 w-full flex justify-between items-center">
    <IconButton
      testid="prev-month-btn"
      on:click={prevMonth}
      className="arrow-left-button {prevMonthButtonStyle === 'text-main' ? 'active' : ''}"
      iconStyle="fill-current {prevMonthButtonStyle}"
      iconSize="12"
      icon={ArrowLeft}
      status="only-icon"
      size="xs"
    />
    <div class="text-main text-one-five font-semibold leading-mid capitalize">
      {format(currCalendarDate, "LLLL yyyy", { locale: ru })}
    </div>
    <IconButton
      testid="next-month-btn"
      on:click={nextMonth}
      className="arrow-right-button"
      iconStyle="fill-current text-main"
      iconSize="12"
      icon={ArrowRight}
      status="only-icon"
      size="xs"
    />
  </div>
  <div class="grid-days flex">
    {#each dateList as day, i}
      <button
        data-index={i}
        class="cursor-pointer day-block first:rounded-tl first:rounded-bl
        last:rounded-tr last:rounded-br"
        on:click={selectDay}
      >
        <span
          data-testid="dayofweek"
          class="{getDayOfWeekStyle(currDate, day)} dayofweek border-l border-t
          border-b border-gray-300 text-one-five leading-mid"
        >
          {day.day}
        </span>
        <span
          data-testid="daynumber"
          class="{getDayNumberStyle(currDate, day)} leading-mid text-one-five
          day border-b border-l border-gray-300"
        >
          {day.date.getDate()}
        </span>
      </button>
    {/each}
  </div>
  <div class="grid-buttons flex flex-col justify-center items-center">
    <div style="margin-bottom: 10px">
      <IconButton
        testid="prev-day-btn"
        on:click={prevDay}
        className="text-main fill-current"
        iconSize="8"
        icon={ArrowLeft}
        status={prevButtonStatus}
        size="xs"
      />
    </div>
    <IconButton
      testid="next-day-btn"
      on:click={nextDay}
      className="text-main fill-current"
      iconSize="8"
      icon={ArrowRight}
      status={nextButtonStatus}
      size="xs"
    />
  </div>
</div>

<style lang="postcss">
  .day {
    flex: 0 0 calc(308px / 7);
    width: calc(308px / 7);
    height: 33px;
    @apply cursor-pointer inline-flex items-center justify-center;
  }
  .day-block:first-of-type .day {
    @apply rounded-bl;
  }
  .day-block:last-of-type .day {
    @apply rounded-br border-r;
  }
  .dayofweek {
    flex: 0 0 calc(308px / 7);
    width: calc(308px / 7);
    height: 33px;
    @apply inline-flex items-center justify-center;
  }
  .day-block:first-of-type .dayofweek {
    @apply rounded-tl;
  }
  .day-block:last-of-type .dayofweek {
    @apply rounded-tr border-r;
  }
  .day-block:hover .day.next {
    @apply text-info font-semibold;
  }
  .day-block:hover .dayofweek.next {
    @apply text-main;
  }
  .calendar-grid {
    @apply grid;
    grid-template-columns: 308px 20px;
    grid-template-rows: 36px auto;
    column-gap: 12px;
    grid-template-areas:
      "month pad"
      "days buttons";
  }
  .grid-month {
    grid-area: month;
  }
  .grid-pad {
    grid-area: pad;
  }
  .grid-days {
    grid-area: days;
  }
  .grid-buttons {
    grid-area: buttons;
  }
  .calendar-grid :global(.arrow-left-button.active:hover > svg) {
    @apply text-info;
  }
  .calendar-grid :global(.arrow-right-button:hover > svg) {
    @apply text-info;
  }
</style>
