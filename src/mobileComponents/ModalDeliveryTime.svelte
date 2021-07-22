<script>

    import Button from './Button.svelte'
    import CustomRadioButton from './CustomRadioButton.svelte';
    import Popup from './Popup.svelte';

    export let deliveryTimeVis = false;
    export let selectedTimedelivery;
    export let Timedelivery;
    let deliveryAddress = '';
    export  let visible;

    export let periods = [
        {
            period:'к точному времени с 21:00 до 08:00',
            extraText:'Закажите ещё на 400 ₽ для бесплатной доставки',
            price: '1 545'
        },
        {
            period:'в интервале 2 часа с 21:00 до 08:00',
            extraText:'Закажите ещё на 400 ₽ для бесплатной доставки',
            price: '333'
        },
        {
            period:'к точному времени с 08:00 до 21:00',
            price:'444'
        },
        {
            period:'уточнить время у получателя',
            price:'444'
        },
    ]
    let timeVis = false
    function openTime() {
        timeVis = !timeVis
    }
    function saveTime() {
        Timedelivery = selectedTimedelivery
        timeVis = !timeVis
    }
    export let deliveryHours = [
        '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'
    ]
</script>
<style>


    .footer__popup {
        background: #FFFFFF;
        border-top: 1px solid var(--gray-300);
        padding: 12px 16px;
        box-shadow: 4px 0 4px 4px rgba(0, 0, 0, .05);
        position: sticky;
        margin: 0 -16px -16px -16px;
    }
    .period {
        font-size: 14px;
        line-height: 135%;
        color: var(--color-main);
        min-width:192px;
        max-width:192px;
    }
    .subText {
        font-size: 12px;
        line-height: 120%;
        color: var(--color-info-light);
    }
    .price {
        font-size: 14px;
        line-height: 135%;
        color: var(--gray-700);
    }
    .pickupHour {
        height: 38px;
        color: var(--color-main);
    }
    .pickupHours {
        height: 180px;
        overflow-y:scroll;
        margin-right: -16px;
        margin-left: -16px;
    }
    .selectedPickupHour {
        background: var(--gray-200);
    }
</style>


    <div>
        {#each periods as item, i}
        <div class="mb-18">
            <CustomRadioButton  value='{item.period}' bind:group={deliveryAddress} label="periods{i}">
            <div class="flex justify-between w-full items-center mr-18">
                <div>
                    <div class="period">{item.period}</div>
                </div>
                <div class="price">
                    {item.price} ₽
                </div>
            </div>
        </CustomRadioButton>
            {#if item.extraText}
                <div class="subText mt-4">
                    {item.extraText}
                </div>
            {/if}
            </div>
        {/each}
    </div>
{#if deliveryAddress}
    <div class="footer__popup">
        {#if deliveryAddress == 'уточнить время у получателя' || Timedelivery != ''}
            <Button size="full" on:click={()=>{visible = !visible}}>Сохранить</Button>
        {:else}
            <Button size="full" on:click={openTime}>Выбрать время точнее</Button>
        {/if}
    </div>
{/if}

{#if timeVis}
    <Popup title="Время доставки" bind:visible={timeVis} size="height: auto; width:100%; z-index:9999;">
         <div class="pickupHours">
            {#each deliveryHours as item}
                <div class="pickupHour flex justify-center items-center {selectedTimedelivery == item ? 'selectedPickupHour' : ''}"
                     on:click={()=>{selectedTimedelivery = item}}>
                    {item}
                </div>
            {/each}
        </div>
        <Button size="full" on:click={saveTime}>Сохранить</Button>
    </Popup>
{/if}
