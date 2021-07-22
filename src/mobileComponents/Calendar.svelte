<script>
    import calendarize from 'calendarize';

    import Arrow from './icons/ArrowCalendar.svelte';
    export let labels = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    export let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
        'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    export let year = 2021;
    export let month = 0;
    export let offset = 1;
    export let events = [];
    export let allEvents = [];
    export let today = new Date();


    let prev = calendarize(new Date(year, month - 1), offset);
    let current = calendarize(new Date(year, month), offset);
    let next = calendarize(new Date(year, month + 1), offset);
    function toPrev() {
        [current, next] = [prev, current];

        if (--month < 0) {
            month = 11;
            year--;
        }

        prev = calendarize(new Date(year, month - 1), offset);
    }

    function toNext() {
        [prev, current] = [current, next];

        if (++month > 11) {
            month = 0;
            year++;
        }

        next = calendarize(new Date(year, month + 1), offset);
    }
</script>

<style>
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
        color: #CC6699;
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
        background: #E71F75;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .left-block {
        height: 285px;
    }

</style>


<div>
    <div class="left-block">
        <header>
            <Arrow left on:click={toPrev}/>
            <h4>{months[month]} {year}</h4>
            <Arrow on:click={toNext}/>
        </header>
        <div class="month">
            {#each labels as txt, idx (txt)}
                <span class="label">{ labels[(idx + offset) % 7] }</span>
            {/each}

            {#each {length: 6} as w,idxw (idxw)}
                {#if current[idxw]}
                    {#each {length: 7} as d,idxd (idxd)}
                        {#if current[idxw][idxd] !== 0}
                            <span class="date">
                                    { current[idxw][idxd] }
                                </span>
                        {:else if (idxw < 1)}
                            <span class="date other">{ prev[prev.length - 1][idxd] }</span>
                        {:else}
                            <span class="date other">{ next[0][idxd] }</span>
                        {/if}
                    {/each}
                {/if}
            {/each}
        </div>
    </div>
</div>