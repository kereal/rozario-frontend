<script>
    import {fade} from "svelte/transition";
    import {createEventDispatcher} from "svelte";
    import Portal from "./Portal.svelte";
    import IconButton from "./IconButton.svelte";
    import {onMount} from "svelte";
    import CustomDropdown from "./CustomDropdown.svelte";
    import TextInput from "./TextInput.svelte";
    import {format, add} from "date-fns";
    import DateCard from "./DateCard.svelte";
    import CustomRadioButton from "./CustomRadioButton.svelte";
    import Info from "./icons/Info.svelte";
    import HelpButton from "./HelpButton.svelte";
    import Button from "./Button.svelte";
    import CompactDatePicker from "./CompactDatePicker.svelte";
    import SelectLabel from"./SelectLabel.svelte";


    export let close;
    export let value;
    export let texts;
    let selectedPeriod = 'period0'
    const dispatch = createEventDispatcher();
    let city = "Мурманск"
    let dealVisibleForDelivery = false;
    let modalElementForDelivery;
    let modalElement;
    let dealVisible = false;
    let dealElement;
    let dealElementForDelivery;
    let position = 'RIGHT'
    let once = true;
    let tab = 'other';

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


    let calDate;

    function closeViaOverlay(e) {
        if (modalElement && !modalElement.contains(e.target)) dispatch("close");
    }

    function closeModal() {
        dispatch("close");
    }


</script>

<style>
    .PeriodOne {
        display:none;
    }
    .overlay {
        z-index: 1000;
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
    }
    .modal {
        width: 700px;
        height: 637px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        @apply rounded;
        background: #FFFFFF;
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        border-radius: 4px;
        padding:30px 34px;
    }
    .close-button {
        top: 14px;
        right: 14px;
        @apply absolute;
        z-index:11;
    }
    .deliverycard__name {
        font-weight: 600;
        font-size: 22px;
        line-height: 115%;
        margin-bottom: 18px;
        color: var(--color-main);
    }
    .deliverycard__descript {
        font-weight: normal;
        font-size: 15px;
        color: var(--gray-600);
        margin-bottom: 8px;
    }

    .info-button:hover{
        background-color: var(--color-info-light);
        border-color: var(--color-info-light);
        fill: white;
    }
    .DatePicker {
        margin-top: 28px;
        margin-bottom: 34px;
    }

    .dropDown {
        width: 264px;
        padding: 18px;
        font-size: 14px;
        line-height: 135%;
        color:var(--gray-600);
    }
.save-button {
    position: absolute;
    bottom: 30px;
    left: 34px;
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
</style>



<Portal>
    <div transition:fade on:click={closeViaOverlay} class="overlay">
        <div bind:this={modalElement}
             class="modal relative">
            <div class="close-button" on:click={()=> {
            close = !close}}>
                <IconButton on:click={closeModal} status="close" />
            </div>
                <div class="postcard">
                    <h2 class="deliverycard__name flex items-center">Выберите дату и время доставки
                        <HelpButton
                                position="CENTER"
                                className="ml-16"
                                css="width: 300px; z-index:11111;"
                                text="Вы всегда сможете изменить их позже" />
                        </h2>
                    <h3 class="deliverycard__descript">Ближайшая дата доставки в {city}: <span class="text-main">22 августа 2020, в течение 120 мин</span></h3>
                    <h3 class="deliverycard__descript">Местное время: <span class="text-main">18:00, 04.08.2020</span></h3>
                    <div class="DatePicker">
                        <CompactDatePicker/>
                    </div>
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
                                    <CustomRadioButton
                                            className="leading-mid"
                                            labelClass="text-one-five"
                                            id="editmodal-no-time"
                                            weight=""
                                            label={'Уточнить время у получателя'}
                                            bind:group={selectedPeriod}
                                            value='noTime' />
                                </div>
                                <div class="pt-2">
                                    <HelpButton
                                            position="CENTER"
                                            css="width: 300px; z-index:11111;"
                                            text="Мы сами заранее позвоним получателю и уточним, где и в какое время ему будет удобно получить подарок.
                                             Стоимость доставки может измениться после согласования времени." />
                                </div>
                            </div>
                            <div class="{selectedPeriod == 'noTime' ? 'SelectPrice' : 'noneSelectPrice'}">0 ₽</div>
                        </div>
                    </fieldset>
                    <div class="save-button flex">
                        <div>
                            <Button size="lg">
                                <span class=" text-base font-semibold">Сохранить</span>
                            </Button>
                        </div>
                        <div class="ml-30" on:click={closeModal} status="close">
                            <Button status='active-secondary' size="lg" >
                                <span >Отменить</span>
                            </Button>
                        </div>
                </div>
                </div>
            </div>
    </div>
</Portal>