<script>
  import calendarize from "calendarize"
  import Arrow from "./icons/ArrowCalendar.svelte"
  import EventCard from "./EventCard.svelte"

  export let year = 2020
  export let month = 0
  export let offset = 1
  export let events = []
  export let allEvents = []
  export let today = new Date()
  export let labels = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
  export let months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
  ]

  $: today_month = today && today.getMonth()
  $: today_year = today && today.getFullYear()
  $: today_day = today && today.getDate()

  let prev = calendarize(new Date(year, month - 1), offset)
  let current = calendarize(new Date(year, month), offset)
  let next = calendarize(new Date(year, month + 1), offset)
  let scroll = null
  let listScrollTop = 0
  let listScrollTopMax = 100

  function toPrev() {
    ;[current, next] = [prev, current]
    if (--month < 0) {
      month = 11
      year--
    }
    prev = calendarize(new Date(year, month - 1), offset)
  }

  function toNext() {
    ;[prev, current] = [current, next]
    if (++month > 11) {
      month = 0
      year++
    }
    next = calendarize(new Date(year, month + 1), offset)
  }

  function isToday(day) {
    return today && today_year === year && today_month === month && today_day === day
  }

  $: isSelected = (day) => {
    return allEvents.some((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getFullYear() === year &&
        eventDate.getMonth() === month &&
        eventDate.getDate() === day
      )
    })
  }
  // Define the ref
  // let listRef;
  //
  // onMount(() => {
  //
  // listRef.addEventListener('scroll', function(e) {
  //     console.log(e.target)
  //     // Active list item is top-most fully-visible item
  //     // Array.indexOf() will give us the first one in list, so the current active item
  // });
  // })

  function onScroll(e) {
    listScrollTop = e.target.scrollTop
    listScrollTopMax = e.target.scrollHeight - e.target.clientHeight
  }
</script>

<div class="calendar-wrap border border-gray-300 border-container ">
  <div class="left-block">
    <header>
      <Arrow left on:click={toPrev} />
      <h4>{months[month]} {year}</h4>
      <Arrow on:click={toNext} />
    </header>

    <div class="month">
      {#each labels as txt, idx (txt)}
        <span class="label">{labels[(idx + offset) % 7]}</span>
      {/each}

      {#each { length: 6 } as w, idxw (idxw)}
        {#if current[idxw]}
          {#each { length: 7 } as d, idxd (idxd)}
            {#if current[idxw][idxd] !== 0}
              <span class="date" class:select={isSelected(current[idxw][idxd])}>
                {current[idxw][idxd]}
              </span>
            {:else if idxw < 1}
              <span class="date other">{prev[prev.length - 1][idxd]}</span>
            {:else}
              <span class="date other">{next[0][idxd]}</span>
            {/if}
          {/each}
        {/if}
      {/each}
    </div>
  </div>
  <div class="upcoming-events flex flex-col">
    <h3 class="mr-24">Ближайшие события</h3>
    {#if events.length > 0}
      <div
        on:scroll={onScroll}
        class="mt-24 flex h-full custom-scrollbar overflow-auto border-top-clr border-t"
      >
        <ul class="flex flex-row flex-wrap mr-20">
          {#each events as event, i}
            <li class="w-full lg:w-1">
              <EventCard id={event.id} index={i} {event} isComing={true} />
            </li>
          {/each}
        </ul>
      </div>
    {:else}
      <p class="flex mt-18 pt-18 border-top-clr border-t font-p mr-18">
        У вас пока не запланировано никаких событий. Добавьте в календарь важную дату, и
        мы заранее напомним о поздравлении!
      </p>
    {/if}
    <div
      class="flex gradient-shadow {listScrollTopMax - listScrollTop > 30
        ? ''
        : 'animate'}"
    />
  </div>
</div>

<style>
  .border-container {
    border-radius: 4px;
  }
  .gradient-shadow {
    -webkit-box-shadow: inset 0px -25px 14px -5px rgb(255, 255, 255);
    -moz-box-shadow: inset 0px -25px 14px -5px rgb(255, 255, 255);
    box-shadow: inset 0px -65px 29px -9px rgb(255, 255, 255);
    height: 70px;
    width: 100%;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    transition: all 0.5s ease-out;
    opacity: 1;
  }
  .gradient-shadow.animate {
    opacity: 0;
    height: 0;
  }
  .calendar-wrap {
    padding: 30px 0 0 34px;
    width: 100%;
    height: 339px;
    box-sizing: border-box;
    box-shadow: 0px 4px 15px rgba(51, 0, 51, 0.1);
    display: flex;
    flex-direction: row;
    border-radius: 4px;
    background: white;
  }
  .custom-scrollbar {
    overflow-x: hidden;
    --thumb-color: #dddfe7;
    --scroll-track: #f2f2f2;
    scrollbar-color: var(--thumb-color) var(--scroll-track);
    scrollbar-width: thin;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 5px;
    -webkit-appearance: none;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background-color: var(--scroll-track);
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #dddfe7;
  }
  h3 {
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 115%;
    color: #330033;
  }
  .left-block {
    width: 40%;
    min-width: 230px;
    height: 339px;
  }
  .upcoming-events {
    position: relative;
    width: 60%;
    padding: 0 0 3px 80px;
    flex: 1;
  }
  header {
    display: flex;
    margin-bottom: 18px;
    align-items: center;
    justify-content: space-between;
    user-select: none;
  }

  h4 {
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 130%;
    display: flex;
    align-items: center;
    text-align: center;
    color: #330033;
  }
  .month {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: right;
    grid-column-gap: 2%;
  }
  .label {
    width: 30px;
    height: 30px;
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 130%;
    color: #cc6699;
  }
  .date {
    width: 33px;
    height: 33px;
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 33px;
    padding: 0 6px;
    color: #330033;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .date.select {
    width: 33px;
    height: 33px;
    color: white;
    border-radius: 50px;
    background: #e71f75;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .date.other {
    opacity: 0.2;
  }
  .font-p {
    font-size: 16px;
  }

  @media (max-width: 1300px) {
    .label {
      font-size: 15px;
    }
    .date {
      font-size: 15px;
    }
    .calendar-wrap {
      padding: 24px 0 0px 24px;
    }
    .font-p {
      font-size: 15px;
    }
    .left-block {
      width: 40%;
      min-width: 230px;
    }
    .month {
      grid-column-gap: 0;
    }
    h3 {
      font-size: 20px;
    }
    .upcoming-events {
      padding: 0 0 3px 68px;
    }
  }
  @media (max-width: 1000px) {
    .calendar-wrap {
      padding: 24px 0 0 24px;
      height: 285px;
    }
    .date {
      width: 25px;
      height: 25px;
    }
    .date.select {
      width: 25px;
      height: 25px;
    }
    .month {
      grid-column-gap: 0;
    }
    .left-block {
      width: 45%;
      min-width: 230px;
      height: 258px;
    }
    header {
      margin-bottom: 18px;
      font-size: 20px;
    }
    .upcoming-events {
      padding: 0 0 0 30px;
      height: 259px;
    }
    h3 {
      font-size: 18px;
      margin-top: 6px;
    }
  }
</style>
