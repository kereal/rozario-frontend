<script>

    import TextInput from "./TextInput.svelte";
    import OutlineRadio from "./OutlineRadio.svelte";
    import DateInput from "./DateInput.svelte";
    import Button from "./Button.svelte"
    import SelectLabel from "./SelectLabel.svelte"
    import {slide} from 'svelte/transition';

    export let buttons = [
        {name: 'Будни', id: 'Weekdays', value: 'Пн–Пт 9:00–21:00', group: 'normal'},
        {name: 'Выходные', id: 'Weekend', value: 'Сб-Вс 10:00-20:00', group: 'normal'},
        {name: '24/7', id: '24/7', value: 'круглосуточно', group: 'round-the-clock'},
        {name: 'Ежедневно', id: 'Daily', value: 'ежедневно 9:00–21:00', group: 'daily'},
        {name: 'Перерыв', id: 'Break', value: 'перерыв 13:00-14:00', group: 'break'},
    ]

    export let time;
    export let extended = false;
    export let error = false;
    let openAddBlock = false;
    let WeekdaysText = 'Пн–Пт';
    let Weekdays = ''
    let Weekend = ''
    let round = ''
    let Daily = ''
    let Break = ''
    let customResult = ''
    let workTime = '';
    let timeList = []

    for(let i=0; i<24; i++) {
        timeList.push(i+':00')
        timeList.push(i+':30')
    }

    function addTime() {
        workTime = ''
        time.usual.forEach((item)=>{
            if(item.select == true) {
                if(workTime == '') {
                    workTime = item.value
                } else {
                    workTime = workTime + ', '  + item.value
                }

            }
        })
    }

    function selectWeekdays() {
            time.usual[3].select = false
            time.usual[4].select = false

    }
    function selectWeekend() {
            time.usual[3].select = false
            time.usual[4].select = false

    }
    function selectDaily() {
        time.usual[0].select = false
        time.usual[1].select = false
        time.usual[4].select = false

    }
    function selectBreaking() {
        time.usual[4].select = false

    }
    function selectRound() {
        time.usual[0].select = false
        time.usual[1].select = false
        time.usual[3].select = false
        time.usual[2].select = false
    }

    let emptyDate = []
    function addDate() {
        time.dates.push({
            customDate:'',
            customTime:'',
            weekend: false,
            around:false,
            customTimefrom:'00:00',
            customTimeBefore:'00:00',
            breaks:[{
                customBreakTimefrom:'00:00',
                customBreakTimeBefore:'00:00'
            }]
        })
        time.dates = time.dates;
         openAddBlock = true
    }
    function deleteElem(elem, array) {
        const index = array.indexOf(elem);
        if (index > -1) {
            array.splice(index, 1);
        }
        time = time
    }

    $: if(time.usual[0].select) {
      addTime()
    }
    $: if(time.usual[1].select) {
        addTime()
    }
    $: if(time.usual[2].select) {
        addTime()
    }
    $: if(time.usual[3].select) {
        addTime()
    }
    $: if(time.usual[4].select) {
        addTime()
    }
    $: if(workTime) {
        if(workTime != '' ) {
            if(workTime.indexOf('Пн-Пт', 0) != -1 ||  workTime.indexOf('Сб-Вс', 0) != -1 || workTime.indexOf('Круглосуточно', 0) != -1 || workTime.indexOf('Ежедневно', 0) != -1 ) {
                    error = false
            } else {
                error = true
            }
    }
    }
</script>
<style>
    .dateInput{
        width: 194px;
    }
    .SelectLabel{
        width: 85px;
    }
.selectPeriod__text {
    font-size: 13px;
    margin-bottom: 8px;
    color: var(--gray-600);
}

    .error {
        display:block;
        color:red;
        margin-bottom: 8px;
        font-size: 12px;
    }

</style>


<div class="label-text hidden" class:error  transition:slide|local>
    Введите в формате «Пн–Пт 9:00–21:00»
</div>
<TextInput
        required={true}
        name="Shop_name"
        id="Shop_name"
        bind:value={workTime}
        className="w-full {error? 'error':''}"
        placeholder="Введите в формате «Пн–Пт 9:00–21:00»"
/>


<div class="selectTime w-full justify-between flex mt-18">
    {#each time.usual as timeElem, index}
        <div on:click={(e)=>{
        if(e.toElement.id === 'weekdays0') {
            selectWeekdays()
        } else if(e.toElement.id === 'weekend1') {
            selectWeekend()
        } else if (e.toElement.id === 'breaking2'){
        selectBreaking()
        } else if (e.toElement.id === 'daily3'){
        selectDaily()
        } else if (e.toElement.id === 'round4'){
            selectRound()
        }
}}>
            <OutlineRadio text={timeElem.text} label={timeElem.name + index}
                          id={timeElem.name + index} bind:value={timeElem.value} checkBox={true}
                           bind:check={timeElem.select}  />
        </div>
    {/each}
</div>
{#if extended == true}
    {#if openAddBlock}
        <div class="extended mt-34" transition:slide|local>
    {#each time.dates as date, j}
        <div class="extended mt-34" transition:slide|local>
            <div class="flex items-end">
                <div>
                    <div class="selectPeriod__text">Дата</div>
                    <div class="dateInput">
                        <DateInput
                                required={true}
                                name="date"
                                className="w-full text-main placeholder-input"
                                bind:value={date.customDate}
                                min = {new Date(2011, 0, 1)}
                                max = {new Date()}
                                id="WorkingHours-date-input" />
                    </div>
                </div>
                <div class="ml-16" >
                    <OutlineRadio text='24/7' id="around{j}" label='around{j}' checkBox={true} unused={date.weekend == true ? false : true}  bind:check={date.around} />
                </div>
                <div class="flex justify-between items-center ml-16">
                    <div class="SelectLabel">
                        <SelectLabel bind:select={date.customTimefrom} unused={date.weekend == true ? false : true} className='border-gray-500' list={timeList} size="full"/>
                    </div>
                    <div class="ml-2 mr-2"> — </div>
                    <div class="SelectLabel">
                        <SelectLabel bind:select={date.customTimeBefore} unused={date.weekend == true ? false : true} className='border-gray-500' list={timeList} size="full"/>
                    </div>
                    <div class="cursor-pointer ml-12" on:click={()=>{
                    deleteElem(date, time.dates)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" >
                            <path d="M1 1L13 13M13 1L1 13" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="flex justify-between mt-16">
                <div>
                    <OutlineRadio text='Выходной' id="weekend{j}" label='weekend{j}' checkBox={true}  bind:check={date.weekend}/>
                </div>
                <div >
                    {#each date.breaks as item, i}
                    <div class="flex  justify-between items-center -mr-4 {i!=0? 'mt-16':''}"  transition:slide|local>
                        <div class="text-sm mr-16 text-gray-600">Перерыв</div>
                        <div class="SelectLabel">
                            <SelectLabel bind:select={item.customBreakTimefrom} unused={date.weekend == true ? false : true} className='border-gray-500' list={timeList} size="full"/>
                        </div>
                        <div class="ml-2 mr-2"> — </div>
                        <div class="SelectLabel">
                            <SelectLabel bind:select={item.customBreakTimeBefore} unused={date.weekend == true ? false : true} className='border-gray-500' list={timeList} size="full"/>
                        </div>
                            {#if i == 0}
                            <div class="cursor-pointer ml-12" on:click={()=>{
                            date.breaks.push({
                            customBreakTimefrom:'00:00',
                            customBreakTimeBefore:'00:00'
                            })
                            time = time
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M1 8H8M8 8H15M8 8V1M8 8V15" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            {:else}
                                <div class="cursor-pointer ml-12"  on:click={()=>{
                                deleteElem(item, date.breaks)
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" >
                                        <path d="M1 1L13 13M13 1L1 13" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            {/if}
                    </div>
                    {/each}
                </div>
            </div>
        </div>
    {/each}
        </div>
    {/if}
    <Button size="lg" status="active-secondary" className="mt-34" on:click={addDate}>Добавить режим работы на дату</Button>
{/if}