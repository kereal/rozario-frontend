<script>
  import { createEventDispatcher } from "svelte";
  import {
    add,
    format,
    formatDistance,
    formatRelative,
    subDays
  } from "date-fns";
  import { ru } from "date-fns/locale";

  const dispatch = createEventDispatcher();

  let yearVisible = false;

  function createYearList() {
    const currYear = new Date().getFullYear();
    const yearlist = [];
    for (let i = currYear; i < currYear + 5; i++) {
      yearlist.push(i);
    }
    return yearlist;
  }

  //   function createTimeList() {
  //   }

  const yearlist = createYearList();

  const times = [
    { from: "08:00", to: "10:00" },
    { from: "09:00", to: "11:00" },
    { from: "10:00", to: "12:00" },
    { from: "11:00", to: "13:00" },
    { from: "12:00", to: "14:00" },
    { from: "13:00", to: "15:00" },
    { from: "14:00", to: "16:00" },
    { from: "15:00", to: "17:00" },
    { from: "16:00", to: "18:00" },
    { from: "17:00", to: "19:00" },
    { from: "18:00", to: "20:00" },
    { from: "19:00", to: "21:00" },
    { from: "20:00", to: "22:00" },
    { from: "21:00", to: "23:00" }
  ];
  let currentDate = format(new Date(), "dd MMMM yyyy", { locale: ru }).split(
    " "
  );
  let daysCounter = 0;

  function nextDate() {
    daysCounter++;
    currentDate = format(
      add(new Date(), { days: daysCounter }),
      "dd MMMM yyyy",
      {
        locale: ru
      }
    ).split(" ");
  }
  function prevDate() {
    daysCounter--;
    currentDate = format(
      add(new Date(), { days: daysCounter }),
      "dd MMMM yyyy",
      {
        locale: ru
      }
    ).split(" ");
  }

  function timeClarify() {
    dispatch("clarify");
  }
  function timeAsap() {
    dispatch("asap");
  }
  function selectYear(e) {
    e.stopPropagation();
    currentDate[2] = e.target.dataset.year;
    yearVisible = false;
  }
  function selectTime(e) {
    dispatch("time", {
      time: {
        first: currentDate,
        second: e.target.dataset.time
      }
    });
  }
  function yearPicker(e) {
    yearVisible = !yearVisible;
  }
</script>

<style>
  .image-box {
    width: 16px;
    height: 16px;
  }
</style>

<div
  style="max-height: 340px"
  class="flex flex-col items-center rounded bg-white px-34 py-32 overflow-y-auto">
  <div
    class="mb-16 pb-8 w-full border-b border-gray-500 flex flex-col items-center">
    <div class="mb-8 flex items-center justify-around">
      <button class="text-main" on:click={prevDate}>
        <div class="image-box">
          <img src="prev.svg" alt="prev" />
        </div>
      </button>
      <span class="text-main px-8 font-semibold">
        {currentDate[0] + ' ' + currentDate[1]}
      </span>
      <button class="text-main" on:click={nextDate}>
        <div class="image-box">
          <img src="next.svg" alt="prev" />
        </div>
      </button>
    </div>
    <button on:click={yearPicker} class="text-main font-semibold">
      {currentDate[2]}
    </button>
  </div>
  <button
    on:click={timeClarify}
    class="text-main mx-auto text-center mb-8 font-semibold">
    Уточнить у получателя
  </button>
  <button
    on:click={timeAsap}
    class="text-main mx-auto text-center mb-8 font-semibold">
    Как можно быстрее
  </button>
  <ul class="text-center">
    {#if yearVisible}
      {#each yearlist as year}
        <li class="hover:bg-faded mb-8 last:mb-0 text-main">
          <button on:click={selectYear} data-year={year}>{year}</button>
        </li>
      {/each}
    {:else}
      {#each times as time, i}
        <li class="hover:bg-faded mb-8 last:mb-0 text-main">
          <button data-time={time.from + '-' + time.to} on:click={selectTime}>
            с {time.from} до {time.to}
          </button>
        </li>
      {/each}
    {/if}
  </ul>
</div>
