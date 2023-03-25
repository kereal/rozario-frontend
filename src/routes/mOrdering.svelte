<script context="module">
    export async function preload(page, session) {
        try {
            const res = await this.fetch(
                    `index.json?city=${page.host[0]}&path=${page.path}`
            );
            const json = await res.json();
            return {
                slug: page.slug,
                path: page.path,
                categories: json.catalog,
                cityMeta: json.cityMeta,
                activeOrders: json.activeOrders,
                deliveryAddresses: json.deliveryAddresses,
                orderStories: json.orderStories,
                recommendations: json.recommendations,
                orderList: json.orderList,
                cityMeta: json.cityMeta
            };
        } catch (e) {
            console.log(e);
        }
    }
</script>

<script>
    import MiniButton from '../mobileComponents/MiniButton.svelte';
    import Button from '../mobileComponents/Button.svelte'
    import Popup from '../mobileComponents/Popup.svelte'
    import CustomCheckbox from '../mobileComponents/CustomCheckbox.svelte'
    import DatePicker from '../mobileComponents/DatePicker.svelte';
    import CustomRadioButton from '../mobileComponents/CustomRadioButton.svelte';
    import { currPaymentStore } from "../stores/cart.js";
    import {countryCodes} from "../data/countryCodes.js";
    import {imask} from 'svelte-imask';
    import WaysOfPayment from "../mobileComponents/WaysOfPayment.svelte";


    let selectedCountry = countryCodes.find(country => country.code === "RU");
    let y;
    let openChooseCode = false;
    let summOrder = 123567;
    const phoneNumberOptions = {
        mask: "000 000 00 00 00"
    }

    export let cityMeta;
    export let selectedWayPayment = 'BankCard';
    export let yourself = true
    export let client = {
        name: '',
        phone: '',
        comment: '',
        photo: false,
        postCart: false,
        photoClient: false,
        recipient: '',
        recipientPhone: '',
        deliveryAddress: 'по адресу'
    }

    let deliveryAddress = 'по адресу'

    function changeMethod() {
        yourself = !yourself
    }

    function chooseCountry() {
        openChooseCode = !openChooseCode
    }

    let deliveryDateVis = false;
    let deliveryTimeVis = false;
    let pickUpDateVis = false;
    let pickUpTimeVis = false;
    let payVis = false;

    function openPay() {
        payVis = !payVis
    }

    function opendeliveryDateVis() {
        deliveryDateVis = !deliveryDateVis
    }

    function opendeliveryTimeVis() {
        deliveryTimeVis = !deliveryTimeVis
    }

    function openpickUpDateVis() {
        pickUpDateVis = !pickUpDateVis
    }

    function openpickUpTimeVis() {
        pickUpTimeVis = !pickUpTimeVis
    }

    function savePickupHour() {
        TimePickup = selectedTimePickup
        openpickUpTimeVis()
        document.body.style.overflow = 'scroll'
    }

    function saveDeliveryHour() {
        Timedelivery = selectedTimedelivery
        opendeliveryTimeVis()
        document.body.style.overflow = 'scroll'
    }

    function saveDatePickup() {
        selectedDatePickup = currDate
        openpickUpDateVis()
        document.body.style.overflow = 'scroll'
    }

    function saveDateDelivery() {
        selectedDateDelivery = currDate
        opendeliveryDateVis()
        document.body.style.overflow = 'scroll'
    }

    function openDeleteModal() {
        deleteModalVis = !deleteModalVis
    }

    function deleteAllOrder() {
        orderList = ''
        openDeleteModal()
    }

    let deleteModalVis = false
    export let currDate;

    function handleDateSelect({detail}) {
        console.log('currDate', detail.currDate)
        currDate = detail.currDate
    }

    export let selectedDatePickup = '';
    export let selectedDateDelivery = '';




    export let pickupHours = [
        '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'
    ]
    let TimePickup = '';
    let selectedTimePickup = '';
    export let deliveryHours = [
        '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'
    ]
    let Timedelivery = '';
    let selectedTimedelivery = '';
    let dateError = false;
    let errorText = '';


    function formatDate(date) {
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;
        return dd + '.' + mm + '.' + yy;
    }

    let paymentName = {
        text:'Банковская карта'
    }

</script>


<style>
    .padding {
        padding-left: 16px;
        padding-right: 16px;
    }
    .headers__buttons {
        position: sticky;
        top:0;
        z-index:3;
        height: 62px;
    }
    .headers__buttons_scrolled {
        background: #fff;
    }
    .page__name {
        font-weight: 600;
        font-size: 24px;
        color: var(--color-main);
    }
    .phone__name {
        font-size: 13px;
        line-height: 120%;
        color: var(--gray-600);
    }
    .chooseCode {
        min-width: 94px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--gray-1000);
        border-radius:0;
        -webkit-border-radius:0;
        -moz-border-radius:0;
    }
    .delyvery__buttons {
        height: 36px;
        background: var(--gray-300);
        border-radius: 8px;
        min-width: 100px;
        margin-bottom: 24px;
    }
    .delyvery__button {
        width: 50%;
        font-size: 14px;
        display: flex;
        align-items: center;
        text-align: center;
        color: var(--gray-600);
    }
    .activeButton {
        background: var(--color-light );
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        color: var(--color-main);
        height: calc(100% - 3px);
    }
    h3 {
        font-weight: 600;
        font-size: 16px;
        line-height: 130%;
        color: var(--color-main );
    }
    .infoText {
        font-size: 14px;
        line-height: 135%;
        color: var(--color-main);
    }
    .subText {
        font-size: 13px;
        line-height: 120%;
        color: var(--gray-600);
    }
    .delivery__miniButton {
        width: 22px;
        height: 22px;
        background: var(--gray-300);
        border-radius: 50%;
    }
    .footer {
        position: sticky;
        bottom:0;
        height: 136px;
        background: #FFFFFF;
        border-top: 1px solid var(--gray-300);
        box-shadow: 4px 0 4px 4px rgba(0, 0, 0, .05);
        font-weight: 600;
        font-size: 16px;
        color: var(--color-main);
    }
    input[type=text] {
        padding-bottom: 11px;
        border-bottom: 1px solid var(--gray-300);
        width: 100%;
    }
    input[type=text]:hover {
        border-bottom: 1px solid var(--color-info );
    }
    input[type=tel] {
        border-bottom: 1px solid var(--gray-300);
        width: 100%;
    }
    input[type=tel]:hover {
        border-bottom: 1px solid var(--color-info );
    }
    .bordered {
        border-bottom: 1px solid var(--gray-300);
    }
    .custom-radio input {
        display: none;
    }
    .descript {
        font-size: 12px;
        line-height: 140%;
        color: var(--gray-600);
    }
</style>


<svelte:window bind:scrollY={y}/>
<div class="ordering">
    <div class="headers__buttons flex justify-between padding items-center {y > 150 ? 'headers__buttons_scrolled' : ''}">
        <div>
            <a href="/mCart">
                <MiniButton type="back"/>
            </a>
        </div>
        {#if y > 150}
            <h2 >
                Оформление заказа
            </h2>
        {/if}
    </div>
    <h2 class="page__name mb-24 padding whitespace-nowrap">Оформление заказа</h2>
    <div class="padding">
        <div class="delyvery__buttons flex items-center">
            <div class="delyvery__button flex justify-center {yourself == true ? 'activeButton' : ''} ml-2" on:click={changeMethod}>Получу сам(а)</div>
            <div class="delyvery__button flex justify-center {yourself == false ? 'activeButton' : ''} mr-2" on:click={changeMethod}>Другой человек</div>
        </div>
        {#if yourself}
            <h3 class="mb-18">Ваши данные</h3>
            <input type="text" value={client.name} placeholder="Имя и фамилия" class="mb-24">
            <div class="phone__name">Ваш номер телефона</div>
            <div class="flex mt-12 mb-30">
                <button type="button"
                        class="flex justify-between bg-white rounded h-full mr-12 cursor-pointer items-center chooseCode" on:click={chooseCountry}>
                <span class="mr-6">
                  <i class="align-baseline mr-4 fflag ff-md fflag-{selectedCountry.code}" />
                  <span class="align-baseline text-one-five leading-mid">{selectedCountry.dial}</span>
                </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                        <path d="M13 1L6.99465 7L1 1" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <input type="tel" bind:value={client.phone} maxlength="13"
                       use:imask={phoneNumberOptions}>
            </div>
        <div class="pb-18 bordered">
            <CustomCheckbox  style="font-size: 15px;"
                             value="photoClients"
                             className="text-main"
                             id="photoClients"
                             label="Получить фото букета на эл. почту"
                             bind:check = {client.photo}/>
        </div>
            <h3 class="mt-40 mb-18">Адрес самовывоза</h3>
            <div>
                <div class="infoText mb-2">
                    {cityMeta.name}, {cityMeta.shop.address.street}
                </div>
                <div class="infoText">
                        <span class="subText">
                            Режим работы:
                        </span>
                    <span class="infoText">
                            {cityMeta.shop.address.openingHours.days}, {cityMeta.shop.address.openingHours.hours}
                        </span>
                </div>
            </div>
            <h3 class="mt-40 ">Дата и время самовывоза</h3>
            <div class="flex justify-between pb-18 mt-24 bordered">
                <div class="flex items-center infoText " on:click={openpickUpDateVis}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none" class="mr-8">
                        <path d="M15 15.4433C15 16.3011 14.1823 17 13.1695 17H2.83038C1.82178 17 1 16.3047 1 15.4433V3.8367C1 2.97892 1.81763 2.28001 2.83038 2.28001H13.1695C14.1823 2.28001 15 2.97892 15 3.8367V15.4433Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.5 1.00006L11.5 3.56007" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4.5 1.00006L4.5 3.56007" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1 6.36898H15" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                            {#if selectedDatePickup}
                                {formatDate(selectedDatePickup)}
                            {:else}
                                Дата самовывоза
                            {/if}
                </div>
                <div class="delivery__miniButton flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none" >
                        <path d="M1 9.50024L5 5.50024L1 1.50024" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div class="flex justify-between bordered pb-18 mt-16">
                <div class="flex items-center infoText"  on:click={openpickUpTimeVis}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="mr-8">
                        <path d="M17 8.99994C17 13.4148 13.4148 17.0001 9 17.0001C4.58517 17.0001 1 13.4148 1 8.99994C1 4.58511 4.58517 1.00006 9 1.00006C13.4148 1.00006 17 4.58511 17 8.99994Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.00013 3.90359V9.9284L6.38281 8.14068" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                            {#if TimePickup}
                                {TimePickup}
                            {:else}
                                Время самовывоза
                            {/if}
                </div>
                <div class="delivery__miniButton flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none" >
                        <path d="M1 9.50024L5 5.50024L1 1.50024" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <h3 class="mt-40 mb-18">Дополнительно</h3>
            <div class="pb-18  bordered">
                <CustomCheckbox  style="font-size: 15px;"
                                 value="freePostcart"
                                 className="text-main"
                                 id="freePostcart"
                                 label="Добавить открытку бесплатно"
                                 bind:check = {client.postCart}/>
            </div>
            <div class="pb-18  mt-18 bordered">
                <CustomCheckbox  style="font-size: 15px;"
                                 value="photoClientsMoment"
                                 className="text-main"
                                 id="photoClientsMoment"
                                 label="Сделать фото в момент вручения"
                                 bind:check = {client.photoClient}/>
            </div>
            <input type="text" value={client.comment} placeholder="Комментарий к заказу" class="mb-24 mt-18">

        {:else}
            <h3 class="mb-18">Данные получателя</h3>
            <input type="text" value={client.recipient} placeholder="Имя получателя" class="mb-24">
            <div class="phone__name">Номер телефона получателя</div>
            <div class="flex mt-12 mb-30">
                <button type="button"
                        class="flex justify-between bg-white rounded h-full mr-12 cursor-pointer items-center chooseCode" on:click={chooseCountry}>
                <span class="mr-6">
                  <i class="align-baseline mr-4 fflag ff-md fflag-{selectedCountry.code}" />
                  <span class="align-baseline text-one-five leading-mid">{selectedCountry.dial}</span>
                </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                        <path d="M13 1L6.99465 7L1 1" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <input type="tel" bind:value={client.recipientPhone} maxlength="13"
                       use:imask={phoneNumberOptions}>
            </div>
            <h3 class="mb-18">Адрес доставки</h3>
            <div class="bordered pb-18">
                <CustomRadioButton label="По адресу" id="" value='по адресу' bind:group={deliveryAddress} className="bordered">
                    <div>По адресу</div>
                </CustomRadioButton>
            </div>
            <div class="bordered pb-18 mt-16">
                <CustomRadioButton label="Уточнить адрес у получателя" id="" value="Уточнить адрес у получателя" bind:group={deliveryAddress} className="bordered">
                    <div>Уточнить адрес у получателя</div>
                </CustomRadioButton>
            </div>
            <h3 class="mb-18 mt-16">Ваши данные</h3>
            <input type="text" value={client.name} placeholder="Имя и фамилия" class="mb-24">
            <div class="phone__name">Ваш номер телефона</div>
            <div class="flex mt-12 mb-30">
                <button type="button"
                        class="flex justify-between bg-white rounded h-full mr-12 cursor-pointer items-center chooseCode" on:click={chooseCountry}>
                <span class="mr-6">
                  <i class="align-baseline mr-4 fflag ff-md fflag-{selectedCountry.code}" />
                  <span class="align-baseline text-one-five leading-mid">{selectedCountry.dial}</span>
                </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                        <path d="M13 1L6.99465 7L1 1" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <input type="tel" bind:value={client.phone} maxlength="13"
                       use:imask={phoneNumberOptions}>
            </div>
            <div class="pb-18 bordered">
                <CustomCheckbox  style="font-size: 15px;"
                                 value="photoClients"
                                 className="text-main"
                                 id="photoClients"
                                 label="Получить фото букета на эл. почту"
                                 bind:check = {client.photo}/>
            </div>

            <h3 class="mt-40 mb-18">Дополнительно</h3>
            <div class="pb-18  bordered">
                <CustomCheckbox  style="font-size: 15px;"
                                 value="freePostcart"
                                 className="text-main"
                                 id="freePostcart"
                                 label="Добавить открытку бесплатно"
                                 bind:check = {client.postCart}/>
            </div>
            <div class="pb-18  mt-18 bordered">
                <CustomCheckbox  style="font-size: 15px;"
                                 value="photoClientsMoment"
                                 className="text-main"
                                 id="photoClientsMoment"
                                 label="Сделать фото в момент вручения"
                                 bind:check = {client.photoClient}/>
            </div>
            <input type="text" value={client.comment} placeholder="Комментарий к заказу" class="mb-24 mt-18">
        {/if}
        <h3 class="mt-40 mb-18">Способ оплаты</h3>
        <div class="flex justify-between" on:click={openPay}>
            <div class="flex items-center infoText">
                {#if paymentName.text}
                    {paymentName.text}
                {:else}
                    <img src="{paymentName.src}" alt="" style="height:{paymentName.height}px">
                {/if}
            </div>
            <div class="delivery__miniButton flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none" >
                    <path d="M1 9.50024L5 5.50024L1 1.50024" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
        <div class="descript mb-30 mt-10">
            Мы зарезервируем{summOrder} ₽ на вашей карте и спишем после доставки заказа.
        </div>
    </div>
    <div class="footer padding ">
        <div class="flex justify-between mt-16 mb-18">
            <div>{summOrder} ₽</div>
            <div class="subText">
                <div>Дата</div>
                <div>Время</div>
            </div>
        </div>

        <div>
                <Button status='active-main' size="full" >Перейти к оплате</Button>
        </div>
    </div>
</div>

{#if payVis}
<WaysOfPayment bind:visible={payVis} bind:selectedWayPayment={selectedWayPayment} bind:paymentName/>
{/if}
{#if openChooseCode}
    <Popup title="Выбрать страну" bind:visible={openChooseCode} size="height:295px; width:100%; z-index:9999;">
        {#each countryCodes as item}
            <div class="custom-radio" >
                <input
                        bind:group={selectedCountry}
                        type="radio"
                        value= {item}
                        id={item.code + item.deal}
                        name='country'
                />
                <label for="{item.code + item.deal}" class="flex items-center justify-between" on:click={()=>{
                openChooseCode = false
                }}>
                    <div>
                        <i class="align-baseline mr-4 fflag ff-md fflag-{item.code}" />
                        <span class="align-baseline text-one-five leading-mid">{item.dial}</span>
                        <span class="align-baseline text-one-five leading-mid">{item.nameRus}</span>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none" class="{selectedCountry == item ? '' : 'hidden'}">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.68581 16.125C8.02229 16.125 8.28259 15.9873 8.4667 15.718L14.4345 6.55225C14.5679 6.34564 14.625 6.17034 14.625 6.0013C14.625 5.55678 14.3076 5.25 13.8505 5.25C13.5394 5.25 13.3489 5.36269 13.1584 5.65695L7.65406 14.2655L4.82887 10.6906C4.6384 10.4465 4.44159 10.3463 4.16225 10.3463C3.70514 10.3463 3.375 10.6656 3.375 11.1038C3.375 11.2979 3.44484 11.4858 3.6099 11.6798L6.89856 15.7243C7.12077 15.9998 7.35567 16.125 7.68581 16.125Z" fill="#330033"/>
                        </svg>
                    </div>
                </label>
            </div>
        {/each}
    </Popup>
{/if}

{#if deliveryDateVis}
    <Popup title="Дата доставки" bind:visible={deliveryDateVis} size="height: auto; width:100%; z-index:9999;">
        <DatePicker
                on:select={handleDateSelect}
                bind:currDate={currDate}
        />
        <Button size="full" status="active-transparent" className="mb-10 mt-34" on:click={opendeliveryDateVis}>Отменить</Button>
        <Button size="full" on:click={saveDateDelivery}>Сохранить</Button>
    </Popup>
{/if}
{#if deliveryTimeVis}
    <Popup title="Время доставки" bind:visible={deliveryTimeVis} size="height: auto; width:100%; z-index:9999;">
        <div class="pickupHours">
            {#each deliveryHours as item}
                <div class="pickupHour flex justify-center items-center {selectedTimedelivery == item ? 'selectedPickupHour' : ''}"
                     on:click={()=>{selectedTimedelivery = item}}>
                    {item}
                </div>
            {/each}
        </div>
        <div class="footer__popup">
            <Button size="full" on:click={saveDeliveryHour}>Сохранить</Button>
        </div>
    </Popup>
{/if}
{#if pickUpDateVis}
    <Popup title="Дата самовывоза" bind:visible={pickUpDateVis} size="height: auto; width:100%; z-index:9999;">
        <DatePicker
                on:select={handleDateSelect}
                bind:currDate={currDate}
        />
        <Button size="full" status="active-transparent" className="mb-10 mt-34" on:click={openpickUpDateVis}>Отменить</Button>
        <Button size="full" on:click={saveDatePickup}>Сохранить</Button>
    </Popup>
{/if}
{#if pickUpTimeVis}
    <Popup title="Время самовывоза" bind:visible={pickUpTimeVis} size="height: 355px; width:100%; z-index:9999;">
        <div class="pickupHours">
            {#each pickupHours as item}
                <div class="pickupHour flex justify-center items-center {selectedTimePickup == item ? 'selectedPickupHour' : ''}"
                     on:click={()=>{selectedTimePickup = item}}>
                    {item}
                </div>
            {/each}
        </div>
        <div class="footer__popup">
            <Button size="full" on:click={savePickupHour}>Сохранить</Button>
        </div>
    </Popup>
{/if}

