<script>
    import calendarize from 'calendarize';
    import ArrowMonth from './icons/ArrowEventMonth.svelte';
    import ArrowWeeks from './icons/ArrowEventWeeks.svelte';
    import {createEventDispatcher, onMount, afterUpdate} from "svelte";

    export let year = 2020;
    export let month = 0; // Jan
    export let offset = 0; // Sun
    export let today = new Date(); // Date
    export let selected;

    export let labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    export let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
        'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    const dispatch = createEventDispatcher();

    $: today_month = today && today.getMonth();
    $: today_year = today && today.getFullYear();
    $: today_day = today && today.getDate();

    let prev = calendarize(new Date(year, month-1), offset);
    let current = calendarize(new Date(year, month), offset);
    let next = calendarize(new Date(year, month+1), offset);
    let selectedWeekIndex = 0;
    let currentDayIndex = 0;
    let currentWeekIndex = 0;
    let currentWeek = current[currentWeekIndex];

    function toPrev() {
        [current, next] = [prev, current];
        currentWeek = current[currentWeekIndex];


        if (--month < 0) {
            month = 11;
            year--;
        }

        prev = calendarize(new Date(year, month-1), offset);
    }
    function toPrevWeek() {
        currentWeekIndex--;
        currentWeek = current[currentWeekIndex];
    }

    function toNext() {
        [prev, current] = [current, next];
        currentWeek = current[currentWeekIndex];

        if (++month > 11) {
            month = 0;
            year++;
        }

        next = calendarize(new Date(year, month+1), offset);
    }

    function toNextWeek() {
        currentWeekIndex++;
        currentWeek = current[currentWeekIndex];

    }

    function isToday(day) {
        return today && today_year === year && today_month === month && today_day === day;
    }

    function selectDate(date) {
        dispatch('select', {
            date
        })
    }

    function initDates() {
        selectedWeekIndex = current.findIndex(week => week.includes(selected.getDate()))
        currentWeekIndex = selectedWeekIndex;
        currentWeek = current[currentWeekIndex];
        currentDayIndex = currentWeek.findIndex(day => day === selected.getDate())
    }

    onMount(() => {
        selectedWeekIndex = current.findIndex(week => week.includes(selected.getDate()))
        currentWeekIndex = selectedWeekIndex;
        currentWeek = current[currentWeekIndex];
        currentDayIndex = currentWeek.findIndex(day => day === selected.getDate())
    })
    afterUpdate(() =>  {
        currentDayIndex = currentWeek.findIndex(day => day === selected.getDate())
    })
</script>
        <header>
            <ArrowMonth left on:click={toPrev} />
            <h4>{months[month]} <h4 class="year-h4">&nbsp{year}</h4> </h4>
            <ArrowMonth on:click={toNext} />
        </header>
        <div class="calendar-event-content">
            <div class="calendar-event">
                <div class="month">
                    {#each labels as txt, idx (txt)}
                        <span class="label {currentWeekIndex === selectedWeekIndex && currentDayIndex === idx ? 'selected' : ''}">{ labels[(idx + offset) % 7] }</span>
                    {/each}
                    {#each { length:7 } as d,idxd (idxd)}
                        {#if currentWeek[idxd] !== 0}
                            <span class="date {selected.getDate() === currentWeek[idxd] ? 'selected' : ''}" class:today={isToday(currentWeek[idxd])} on:click={() => selectDate(new Date(year, month, currentWeek[idxd]))}>
                                { currentWeek[idxd] }
                            </span>
                            {:else if (currentWeekIndex < 1)}
                                <span class="date other">{ prev[prev.length - 1][idxd] }</span>
                            {:else}
                                <span class="date other">{ next[0][idxd] }</span>
                        {/if}
                    {/each}
                </div>
            </div>
            <div class="flex flex-col justify-around m-6 arrow-weeks">
                <ArrowWeeks disabled={currentWeekIndex === currentWeek.length - 2} on:click={toNextWeek} />
                <ArrowWeeks disabled={currentWeekIndex === 0} left on:click={toPrevWeek} />
            </div>
        </div>

<style>
    h3 {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 22px;
        line-height: 115%;
        color: #330033;
    }

    .calendar-event-content {
        display: flex;
        flex-direction: row;
    }

    header {
        display: flex;
        margin-bottom: 35px;
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
    .calendar-event {
        flex: 1;
        width: 90%;
    }
    .arrow-weeks {
        width: 10%;
    }

    .year-h4 {
        border-bottom: 1px dashed #CC6699;
        color: #CC6699;
    }

    .month {
        display: grid;
        grid-template-columns: repeat(7, 0fr);
        text-align: center;
    }

    .label {
        width: 44px;
        height: 33px;
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 130%;
        color: #C4C4C4;
        border: 1px solid #CCCCCC;
    }

    .label.selected {
        color: #CC6699;
    }

    .date {
        width: 44px;
        height: 33px;
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 130%;
        color: #330033;
        border: 1px solid #CCCCCC;
        cursor: pointer;
    }

    .date.selected {
        color: #FFFFFF;
        background: #CC6699;
    }

    .date.other {
        opacity: 0.2;
    }

    .arrow-weeks {
        margin-left: 12px;
    }
</style>