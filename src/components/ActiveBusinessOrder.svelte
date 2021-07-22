<script>
    import Button from "./Button.svelte";
    import CustomCheckbox from "./CustomCheckbox.svelte";
    import CustomRadioButton from "./CustomRadioButton.svelte";
    import {onMount, setContext} from "svelte";
    import TextInput from "./TextInput.svelte";
    import Select from "./Select.svelte";
    import CustomDropdown from "./CustomDropdown.svelte";
    import { fade } from 'svelte/transition';
    import SelectLabel from "./SelectLabel.svelte";
    import ModalCancellBussinessOrder from "./ModalCancellBussinessOrder.svelte";
    import ModalAppointmentWorkers from "./ModalAppointmentWorkers.svelte";
    import BusinessActiveProductWC from "./BusinessActiveProductWC.svelte";
    import BusinessOrderNotDelivery  from "./BusinessOrderNotDelivery.svelte";
    import ModalOrderNotPhoto  from "./ModalOrderNotPhoto.svelte";
    import ModalChangeCompositionBussinesOrder from "./ModalChangeCompositionBussinesOrder.svelte";
    import RoundTimer from "./RoundTimer.svelte";

    export let order;
    export let fullImage;
    let loadFile = true;
    let newPhoto;
    let selectedPhotoAfterOrder = false;
    let orderOpen = false;


    export let florists = ['Александра','Арнольд Калинин','Виолета Романовна']

    export let floristPhones = {
        'Александра': 89021477171,
        'Арнольд Калинин': 89021477172,
        'Виолета Романовна': 89021477173
    }
    export let couriers = ['Константин Константинович','Валентин Михалыч','Такси']
    export let courierPhones = {
        'Константин Константинович': 89021477171,
         'Валентин Михалыч': 89021477172,
         'Такси': 89021477173
    }

    let selectedStage = "Принятый"
    let openedComposition = false;

    let status = order.status
    let houseInput;
    let apartmentInput;
    let buildingInput;
    let intercomInput;
    let streetSelect;
    let selectedPeriod = 'period0'
    let orderСancellation = false;
    let appointment = false;
    let changeComposition = false;
    let onceAppointment = true;
    let orderNotDelivery = false;
    let orderNotPhoto = false;
    let newPhotoClient;
    let openOrder = false;


    onMount(() => {
        if (status != 'newOrder') {
            openOrder = true;
        } else {
            openOrder = false;
        }
    })

    let newOerderStatus = 'newOrder'


    function formatDate(date) {
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        let yy = date.getFullYear();
        if (yy < 10) yy = '0' + yy;
        return dd + '.' + mm + '.' + yy;
    }
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
    $: if(newPhoto) {
        let input = document.getElementById("fileCheck");
        let fReader = new FileReader();
        fReader.readAsDataURL(input.files[0]);
        fReader.onloadend = function(event){
            fullImage = event.target.result;
            loadFile = false;
        }
        if(fullImage!=undefined) {
            status = 'photo'
        }
    }
    let fullImageClient;
    let orderFinal = false;
    $: if(newPhotoClient) {
        let inputTwo = document.getElementById("loadClientsPhoto");
        let fReaderTwo = new FileReader();
        fReaderTwo.readAsDataURL(inputTwo.files[0]);
        fReaderTwo.onloadend = function(event){
            fullImageClient = event.target.result;
         }
        if(fullImageClient!=undefined) {
            orderFinal = true;
        }
    }
    let counterStatus;
    function scrollToTop() {
        let block = document.getElementById('activeBusinessOrderContent')
        block.scrollTop = 0;
    }

    $: if(status){
        if(status == 'newOrder') {
            counterStatus = 0

        } else if (status == 'coordination') {
            counterStatus = 1

        } else if (status == 'creating'){
            counterStatus = 2

        } else if (status == 'photo'){
            counterStatus = 3

        } else if (status == 'delivery'){
            counterStatus = 4

        } else if (status == 'done'){
            counterStatus = 5

        }
    }
let width;
</script>
<svelte:window bind:innerWidth={width}/>

<style>
    .label-text {
        @apply text-gray-600 text-xs inline-block;
        margin-bottom: 8px;
        margin-top: 18px;
    }
    .wrapper {
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        box-shadow: 0px 4px 15px rgba(51, 0, 51, 0.1);
        border-radius: 4px;
        height: 504px;
        transition: all 0.2s ease-out;
    }
   .content {
       background: white;
       padding-top: 34px;
       @apply px-34;
       overflow-y: scroll;
       height: 362px;
   }
   .header {
       height: 70px;
       background: var(--gray-200);
   }
   .header div {
       width: 100%;
   }
    .header div:first-child {
        border-radius: 4px 0 0 0;
        padding-left: 34px;
        width: 50%;
    }
    .header div:last-child {
        border-radius: 0 4px 0 0;
        padding-right: 24px;
        width: 60%;
    }

   .header h2 {
       margin-left: 10px;
       font-weight: 600;
       font-size: 14px;
       color: var(--color-main);
   }
   .header__active {
       background: var(--color-accent);
   }
    .header__active svg path{
        stroke: var(--color-main);
    }
    .header__active .forFill path{
        fill: var(--color-main);
    }
    .openOrder .headerLine {
        width: 9px;
    }
   .order__number {
       font-weight: 600;
       font-size: 20px;
       line-height: 115%;
       color: var(--color-main);
   }
   .order__left {
       font-weight: normal;
       font-size: 13px;
       line-height: 120%;
       color: var(--gray-600);
       min-width: 150px;
       margin-right: 24px;
   }
   .order__right {
       font-size: 15px;
       line-height: 135%;
       color: var(--color-main);
   }

    .order__productInfo_subText {
        font-size: 14px;
        line-height: 135%;
        color: var(--gray-600);
    }
    .order__productInfo_text {
        font-size: 15px;
        line-height: 135%;
        color: var(--color-main);
    }
    .order__delivery {
        padding-left: 170px;
        border-bottom: 1px solid var(--gray-300);
        padding-bottom: 18px;
        margin-bottom: 20px;
    }
    .order__changeButton {
        font-size: 15px;
        line-height: 135%;
        color: var(--color-info);
        margin-right: 35px;
        border-bottom: 1px dashed var(--color-info);
        cursor: pointer;
        transition: all 0.2s ease-out;
    }
    .order__changeButton:hover {
        border-bottom: 1px solid var(--color-main);
        color: var(--color-main);
    }

    .doneStage {

    }
    .footer {
        height: 115px;
        position:absolute;
        width: 100%;
        @apply px-34;
        padding-top: 46px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 18.23%, #FFFFFF 41.15%, rgba(255, 255, 255, 0.994792) 99.99%);
        bottom: 0;
        left: 0;
        border-radius: 4px;
    }
    .emptyBlock {
        height: 46px;
    }
    .bigEmptyBlock {
        height: 46px;
    }
    .notice {
        border: 1px solid var(--color-info);
        border-radius: 4px;
        padding: 0 14px;
        max-width: 501px;
        height: 46px;
        font-size: 13px;
        color: var(--color-main);
    }
    .noticeAgree {
        border: 1px solid #1DC556;
    }
    .coordination__sectionName {
        font-weight: 600;
        font-size: 16px;
        color: var(--color-main);
    }
    .coordinationFooter {
        display: flex;
    }
    .coordination__adress {
        max-width: 501px;
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

    .order__productComposition {
        display: flex;
    }
    .coordination__recipient {
        margin-bottom: 22px;
    }
    .coordination__recipient:last-child {
        margin-bottom: 0;
    }
    .coordination__recipient_left {
        width: 145px;
        margin-right: 37px;
    }
    .orderWorkers {
        margin-bottom: 40px;
    }
    .orderWorkers h2 {
        font-weight: 600;
        font-size: 16px;
        color: var(--color-main);
        margin: 24px 0 12px 0;
    }
    .orderWorker {
        display: block;
        min-width: 87px;
        margin-right: 16px;
    }
    .clientsPhoto {
        width: 170px;
        height: 170px;
        margin-right: 34px;
    }
    .clientsPhoto:first-child {
        background-image: url("../../static/loading-bg-image.svg");
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        border-radius: 4px;
    }
    .stickers {
        width: 100%;
        height: 100px;
        margin-top: 50px;
        background-image: url("/desktopBisinesOrderFinal.png");
        background-repeat: no-repeat;
        background-position:center;
        background-size: contain;
    }
    .photosAfterOrder {
        width: 170px;
        margin-right: 18px;
        margin-bottom: 16px;
    }

    .photoAfterOrder {
        min-width: 170px;
        max-width:170px;
        height: 170px;
        box-sizing: border-box;
        border-radius: 4px;
        background-image: url("../../static/loading-bg-image.svg");
        margin-bottom: 18px;
    }
    .timer {
        margin-left: 34px;

    }
    .changePhotoButton {
        width: 100%;
        height: 4px;
        background-color: var(--gray-1000);
        cursor:pointer;

    }
    .openOrderButton {
        color:var(--color-info);
        cursor:pointer;
        font-size: 14px;
    }
    .openOrder {
        flex-basis: calc(100% / 2 - 35px);
        max-height: 289px;
        transition: transform 0.2s linear;
    }
    .openOrder .content{
        @apply px-24;
        height: 217px;
        overflow: hidden;
    }

    .openOrderButton svg{
        transition: transform 0.2s linear;
    }
    .photoText {
        font-size: 15px;
        line-height: 135%;
        color: var(--gray-600);
        margin-left: 18px;
    }
    .miniInfoBlock {
        position: absolute;
        bottom: 24px;
        left: 24px;
        margin-right: 24px;
    }
    .activeButton {
        width: 100%;
        background-color: var(--gray-600);
    }
    .rotated {
        transform: rotate(-180deg);
        transform-origin: center;
    }

    @media (max-width: 1300px) {
        .openOrder {
            max-height: 283px;
        }
        .content {
            padding-top: 30px;
            @apply px-30;
        }
        .openOrder .content{
            height: 211px;
            @apply px-18;
        }
        .footer {
            @apply px-30;
        }
        .header div:first-child {
                padding-left: 30px;
            }
        .header div:last-child {
                padding-right: 30px;
            }
        .openOrder .header div:first-child {
            padding-left: 18px;
        }
        .openOrder .header div:last-child {
            padding-right: 18px;
        }
        .bigEmptyBlock {
            height: 116px;
        }
        .stickers {
            background-image: url("/1300BisinesOrderFinal.png");
        }
    }
    @media (max-width: 1250px) {
        .coordinationFooter {
            display: block;
        }
        .notice {
            margin-top: 18px;
            width: auto;
        }

        .wrapper {
            height: 490px;
        }
        .bigFooter {
            height: 184px;
        }
    }
    @media (max-width: 1150px) {
        .order__productComposition {
            display: block;
        }
        .coordinationFooter {
            display: block;
        }
        .openOrder {
            min-width: 100%;
            max-height: 283px;
        }
    }
    @media (max-width: 1024px) {
        .content {
            padding-top: 24px;
            @apply px-24;

        }
        .openOrder .content{
            @apply px-24;
            height: 211px;
        }
        .footer {
            @apply px-24;
        }
        .header div:first-child {
            padding-left: 24px;
        }
        .header div:last-child {
            padding-right: 24px;
        }
        .openOrder .header div:first-child {
            padding-left: 24px;
        }
        .openOrder .header div:last-child {
            padding-right: 24px;
        }
        .stickers {
            background-image: url("/1000BisinesOrderFinal.png");
        }
        .openOrder .headerLine {
            width: 20px;
        }
    }
    input[type="file"] {
        display: none;
    }
</style>

<div class="wrapper relative w-full" class:openOrder>
    <div class="header flex justify-stretch ">
        <div class="flex items-center justify-between header__active">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="25" viewBox="0 0 21 25" fill="none">
                <path d="M19.5 21.5677C19.5 22.908 18.4486 24 17.1465 24H3.85335C2.55658 24 1.5 22.9135 1.5 21.5677V3.43233C1.5 2.09204 2.55124 1 3.85335 1H17.1465C18.4486 1 19.5 2.09204 19.5 3.43233V21.5677Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.33594 3.91235H12.6692" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.78516 9.87476H15.2148" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.78516 13.9341H15.2148" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.78516 17.9937H15.2148" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {#if status == 'newOrder'}
            {#if width > 1024}
            {#if !openOrder}
                <h2 class="whitespace-no-wrap mr-12">
                    {#if newOerderStatus == 'newOrder'}
                        Новый заказ
                    {:else if newOerderStatus == 'coordination'}
                        Согласование заказа
                    {:else if newOerderStatus == 'agreed'}
                        Заказ согласован
                    {/if}
                </h2>
            {/if}
            {/if}
            {/if}
            <svg xmlns="http://www.w3.org/2000/svg"  width="21" height="2" viewBox="0 0 21 2" fill="none" class="ml-10 headerLine">
                <path d="M1 0C0.447715 4.82823e-08 -4.82823e-08 0.447715 0 1C4.82823e-08 1.55228 0.447715 2 1 2L1 0ZM1 2L21 2L21 -1.74846e-06L1 0L1 2Z" fill="#330033"/>
            </svg>
        </div>
        <div class="flex items-center {counterStatus > 0 ? 'header__active':''} justify-between">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="2" viewBox="0 0 21 2" fill="none" class="forFill mr-10 headerLine">
                <path d="M1 0C0.447715 4.82823e-08 -4.82823e-08 0.447715 0 1C4.82823e-08 1.55228 0.447715 2 1 2L1 0ZM1 2L21 2L21 -1.74846e-06L1 0L1 2Z" fill="#999999"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" class="doneStage">
                <path d="M24 12.4998C24 18.8461 18.8463 24 12.5 24C6.15368 24 1 18.8461 1 12.4998C1 6.15351 6.15368 1 12.5 1C18.8463 1 24 6.15351 24 12.4998Z" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.8464 5.17383V13.8345L9.08398 11.2646" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21.1886 12.4995H19.6836" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.31584 12.4995H3.8252" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.5 19.6836V21.1886" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {#if status == 'coordination'}
            {#if !openOrder}
                {#if width > 1024}
                    <h2>
                        Согласование
                    </h2>
                {/if}
            {/if}
            {/if}
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="2" viewBox="0 0 21 2" fill="none" class="forFill ml-10 headerLine">
                <path d="M1 0C0.447715 4.82823e-08 -4.82823e-08 0.447715 0 1C4.82823e-08 1.55228 0.447715 2 1 2L1 0ZM1 2L21 2L21 -1.74846e-06L1 0L1 2Z" fill="#999999"/>
            </svg>
        </div>
        <div class="flex items-center {counterStatus > 1 ? 'header__active':''} justify-between">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="2" viewBox="0 0 21 2" fill="none" class="forFill mr-10 headerLine">
                <path d="M1 0C0.447715 4.82823e-08 -4.82823e-08 0.447715 0 1C4.82823e-08 1.55228 0.447715 2 1 2L1 0ZM1 2L21 2L21 -1.74846e-06L1 0L1 2Z" fill="#999999"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="25" viewBox="0 0 23 25" fill="none" class="doneStage">
                <path d="M13.9 19.8404L21.5 5.16748C21.5 5.16748 17.5 6.65019 11.5 6.65019C5.5 6.65019 1.5 5.16748 1.5 5.16748L8.4 19.8404C8.4 19.8404 10 20.3604 11.5 20.3604C12.5 20.3604 13.9 19.8404 13.9 19.8404Z" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.5 19.8408L8 24.0003H14.5L14 19.8408" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.11523 3.11841C8.38225 2.28435 5.95117 1 5.95117 1C5.95117 1 1.95117 2.62946 1.95117 4.6395C1.95117 4.88877 1.97871 5.13218 2.03118 5.36735" stroke="#999999" stroke-width="1.5"/>
                <path d="M7.75659 6.65237C7.59075 6.25271 7.5 5.81952 7.5 5.36704C7.75659 2.3275 11.5 1.72754 11.5 1.72754C11.5 1.72754 14.5 3.357 14.5 5.36704C14.5 5.81952 14.4092 6.25271 14.2434 6.65237" stroke="#999999" stroke-width="1.5"/>
                <path d="M21.1401 5.5814C21.1401 3.57136 17.1401 1.94189 17.1401 1.94189C17.1401 1.94189 14.8 3.11893 14.1152 3.61841" stroke="#999999" stroke-width="1.5"/>
            </svg>
            {#if status == 'creating'}
            {#if width > 1024}
                {#if !openOrder}
                    <h2>
                        Изготовление
                    </h2>
                {/if}
            {/if}
            {/if}
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="2" viewBox="0 0 21 2" fill="none" class="forFill ml-10 headerLine">
                <path d="M1 0C0.447715 4.82823e-08 -4.82823e-08 0.447715 0 1C4.82823e-08 1.55228 0.447715 2 1 2L1 0ZM1 2L21 2L21 -1.74846e-06L1 0L1 2Z" fill="#999999"/>
            </svg>
        </div>
        <div class="flex items-center {counterStatus > 2 ? 'header__active':''} justify-between">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="2" viewBox="0 0 21 2" fill="none" class="forFill headerLine mr-10">
                <path d="M1 0C0.447715 4.82823e-08 -4.82823e-08 0.447715 0 1C4.82823e-08 1.55228 0.447715 2 1 2L1 0ZM1 2L21 2L21 -1.74846e-06L1 0L1 2Z" fill="#999999"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="25" viewBox="0 0 21 25" fill="none" class="doneStage">
                <path d="M19.5 10.5451C19.5 11.889 18.4488 12.9839 17.1467 12.9839H3.85335C2.55658 12.9839 1.5 11.8945 1.5 10.5451V3.43877C1.5 2.09493 2.55124 1 3.85335 1H17.1467C18.4488 1 19.5 2.09493 19.5 3.43877V10.5451Z" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.79061 4.55029H4.22705" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1.5376 23.9614L10.2947 13.8633" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19.2602 23.9614L10.5083 13.8633" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.5083 24.0002V13.8633" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.7282 7.39847C12.7282 8.6483 11.7516 9.66024 10.5508 9.66024C9.34479 9.66024 8.36816 8.6483 8.36816 7.39847C8.36816 6.15418 9.34479 5.14211 10.5508 5.14211C11.7516 5.13658 12.7282 6.14865 12.7282 7.39847Z" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {#if status == 'photo'}
            {#if width > 1024}
                {#if !openOrder}
                    <h2>
                        Фотография
                    </h2>
                {/if}
            {/if}
            {/if}
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="2" viewBox="0 0 21 2" fill="none" class="forFill ml-10 headerLine">
                <path d="M1 0C0.447715 4.82823e-08 -4.82823e-08 0.447715 0 1C4.82823e-08 1.55228 0.447715 2 1 2L1 0ZM1 2L21 2L21 -1.74846e-06L1 0L1 2Z" fill="#999999"/>
            </svg>
        </div>
        <div class="flex items-center {counterStatus > 3 ? 'header__active':''} justify-between">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="2" viewBox="0 0 21 2" fill="none" class="forFill mr-10 headerLine">
                <path d="M1 0C0.447715 4.82823e-08 -4.82823e-08 0.447715 0 1C4.82823e-08 1.55228 0.447715 2 1 2L1 0ZM1 2L21 2L21 -1.74846e-06L1 0L1 2Z" fill="#999999"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="23" viewBox="0 0 19 23" fill="none" class="forFill ">
                <path d="M15.6056 4.72306H14.5638V3.03079C14.5638 1.35899 13.2617 0 11.6597 0H3.40413C1.80217 0 0.5 1.35899 0.5 3.03079V17.5692C0.5 18.8257 1.23705 19.9077 2.28865 20.3641C2.56383 21.8615 3.83163 23 5.34514 23C6.78003 23 7.98893 21.9795 8.34765 20.5949H9.95454C10.3133 21.9795 11.522 23 12.9569 23C14.3967 23 15.6056 21.9744 15.9594 20.5898C17.3894 20.4 18.4999 19.1282 18.4999 17.5898V13.4051V7.82052V7.75385C18.5098 6.08205 17.2027 4.72306 15.6056 4.72306ZM15.9939 19.0154C15.6745 17.5743 14.4361 16.4975 12.9619 16.4975C12.554 16.4975 12.1609 16.5846 11.8071 16.7333V7.82052C11.8071 7.08718 12.3181 6.47693 12.9864 6.35386V11.0308C12.9864 13.3846 14.2101 14.2205 15.3501 14.2205C15.4828 14.2205 15.5908 14.2102 15.6646 14.2C16.1609 14.2 16.2592 14.1949 16.3723 14.1898C16.4656 14.1846 16.5786 14.1795 17.0307 14.1744V17.5898C17.0356 18.2667 16.5934 18.8359 15.9939 19.0154ZM12.9619 21.4615C12.0577 21.4615 11.3207 20.6923 11.3207 19.7487C11.3207 18.8051 12.0577 18.0359 12.9619 18.0359C13.866 18.0359 14.6032 18.8051 14.6032 19.7487C14.6032 20.6923 13.866 21.4615 12.9619 21.4615ZM15.6056 12.6615C15.5614 12.6615 15.5073 12.6667 15.4631 12.6769C15.4484 12.682 15.4091 12.6872 15.3501 12.6872C14.7604 12.6872 14.4606 12.1333 14.4606 11.0359V6.26665H15.6056C16.3919 6.26665 17.0356 6.93334 17.0356 7.75898V7.82565V12.641C16.5344 12.6462 16.4115 12.6513 16.2985 12.6564C16.1953 12.6564 16.102 12.6615 15.6056 12.6615ZM1.9742 3.03079C1.9742 2.21028 2.61298 1.53846 3.40413 1.53846H11.6597C12.4459 1.53846 13.0896 2.20515 13.0896 3.03079V4.79999C11.5565 4.88205 10.3329 6.20513 10.3329 7.82052V17.5898C10.3329 17.718 10.3428 17.8462 10.3575 17.9744C10.1511 18.3026 10.0036 18.6667 9.92011 19.0616H8.387C8.08233 17.6 6.83409 16.5026 5.34514 16.5026C3.9987 16.5026 2.85377 17.4 2.42133 18.6462C2.14615 18.3744 1.9742 17.9949 1.9742 17.5692V3.03079ZM6.98646 19.7487C6.98646 20.6923 6.24932 21.4615 5.34514 21.4615C4.44097 21.4615 3.70394 20.6923 3.70394 19.7487C3.70394 18.8051 4.44097 18.0359 5.34514 18.0359C6.24932 18.0359 6.98646 18.8051 6.98646 19.7487Z" fill="#999999"/>
            </svg>
            {#if status == 'delivery'}
            {#if width > 1024}
                {#if !openOrder}
                    <h2>
                        Доставка
                    </h2>
                {/if}
            {/if}
            {/if}
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="2" viewBox="0 0 21 2" fill="none" class="forFill ml-10 headerLine">
                <path d="M1 0C0.447715 4.82823e-08 -4.82823e-08 0.447715 0 1C4.82823e-08 1.55228 0.447715 2 1 2L1 0ZM1 2L21 2L21 -1.74846e-06L1 0L1 2Z" fill="#999999"/>
            </svg>
        </div>
        <div class="flex items-center {counterStatus > 4 ? 'header__active':''} justify-between">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="2" viewBox="0 0 21 2" fill="none" class="forFill mr-10 headerLine">
                <path d="M1 0C0.447715 4.82823e-08 -4.82823e-08 0.447715 0 1C4.82823e-08 1.55228 0.447715 2 1 2L1 0ZM1 2L21 2L21 -1.74846e-06L1 0L1 2Z" fill="#999999"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="25" viewBox="0 0 21 25" fill="none" class="doneStage">
                <path d="M19.4998 21.5746C19.4998 22.9111 18.4485 24 17.1464 24H3.85332C2.55657 24 1.5 22.9166 1.5 21.5746V7.34633C1.5 7.09334 1.56408 6.29036 2.3432 5.70738C2.78078 5.37738 7.94113 2.20948 9.30192 1.478C10.3265 0.928009 10.8121 0.839951 11.5539 1.27994C13.1121 2.19842 18.3898 5.51495 18.8701 5.91644C19.5318 6.47193 19.4998 7.15383 19.4998 7.34083V21.5746Z" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.0215 13.9355H7.97314V23.8959H13.0215V13.9355Z" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {#if status == 'done'}
            {#if width > 1024}
                {#if !openOrder}
                    <h2>
                        Выполнен
                    </h2>
                {/if}
            {/if}
            {/if}
        </div>
    </div>

    <div class="content custom-scrollbar" id="activeBusinessOrderContent">
    <div class="flex justify-between">
        <div>
            <h2 class="order__number flex items-center pb-20">Заказ № {order.number}
                <a class="ml-14" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect width="20" height="20" fill="white"/>
                        <path d="M1.5 2.06754C1.5 1.20181 2.20181 0.5 3.06754 0.5H8.44175C8.83957 0.5 9.22111 0.658035 9.50241 0.93934L13.4997 4.93663C13.781 5.21793 13.939 5.59946 13.939 5.99729V14.4728C13.939 15.3385 13.2372 16.0404 12.3715 16.0404H3.06754C2.20181 16.0404 1.5 15.3385 1.5 14.4728V2.06754Z" stroke="#CC6699"/>
                        <path d="M12.3171 5.65862H9.48776C7.60156 5.65862 7.60156 4.24397 7.60156 3.77242V0.943115" stroke="#CC6699"/>
                        <circle cx="12.5096" cy="13.9319" r="3.88457" fill="white" stroke="#CC6699"/>
                        <path d="M17.3793 19.5086C17.5746 19.7038 17.8912 19.7038 18.0864 19.5086C18.2817 19.3133 18.2817 18.9967 18.0864 18.8015L17.3793 19.5086ZM14.7646 16.8938L17.3793 19.5086L18.0864 18.8015L15.4717 16.1867L14.7646 16.8938Z" fill="#CC6699"/>
                    </svg>
                </a>
            </h2>
        </div>
        {#if status != 'newOrder'}
        <div>
            <div class="flex openOrderButton items-center mt-4" on:click={()=>{openOrder=!openOrder}}>
                {#if openOrder == false}
                    Свернуть
                {:else}
                    Развернуть
                {/if}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none" class="ml-8" class:rotated={openOrder}>
                    <path d="M11 6L5.99554 1L1 6" stroke="#CC6699" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
        {/if}
    </div>
        {#if openOrder}
            <div>
                <div class="flex items-center order__productInfo_text mb-12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" class="mr-8">
                        <path d="M4 0.500977V4.1543" stroke="#CC6699" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1 6.49304L13 6.49304" stroke="#CC6699" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 0.500977V4.15431" stroke="#CC6699" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <rect x="0.5" y="2.1311" width="13" height="11.3689" rx="1.5" stroke="#CC6699"/>
                    </svg>
                    {formatDate(order.date)}
                </div>
                <div class="flex items-center order__productInfo_text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none" class="mr-8">
                        <path d="M15.8615 7.31669L8.80264 1.14229C8.7903 1.13022 8.77796 1.12116 8.76253 1.11211C8.60827 0.967256 8.36146 0.96122 8.19794 1.10306L1.13907 7.27746C0.966297 7.42835 0.953956 7.68487 1.10513 7.85386C1.18843 7.9444 1.30258 7.98966 1.41673 7.98966C1.51546 7.98966 1.61418 7.95647 1.6944 7.88706L2.96549 6.77349V6.99077V10.2138V13.9739C2.96549 14.5383 3.43444 15 4.01445 15C4.0237 15 4.02987 15 4.03913 15C4.04839 15 4.05456 15 4.06381 15H6.24194C6.78493 15 7.22611 14.5685 7.22611 14.0373V10.3767C7.22611 10.2953 7.29399 10.2289 7.37729 10.2289H9.62638C9.70968 10.2289 9.77755 10.2953 9.77755 10.3767V14.0373C9.77755 14.5685 10.2187 15 10.7617 15H12.9892C13.5754 15 14.0382 14.4357 14.0382 13.7144V10.3586V9.33258V6.81272L15.3093 7.92629C15.3895 7.9957 15.4882 8.02889 15.5869 8.02889C15.7011 8.02889 15.8152 7.98363 15.8985 7.89309C16.0466 7.7241 16.0312 7.46758 15.8615 7.31669ZM13.2021 9.32956V10.3556V13.7084C13.2021 14.0011 13.054 14.1792 12.9861 14.1792H10.7586C10.6753 14.1792 10.6075 14.1128 10.6075 14.0313V10.3767C10.6075 9.84561 10.1663 9.41406 9.62329 9.41406H7.3742C6.83121 9.41406 6.39003 9.84561 6.39003 10.3767V14.0373C6.39003 14.1188 6.32216 14.1852 6.23886 14.1852H4.06073C4.05147 14.1852 4.0453 14.1852 4.03604 14.1852C4.02679 14.1852 4.02062 14.1852 4.01136 14.1852C3.89413 14.1852 3.7954 14.0916 3.7954 13.9739V10.2108V6.98776V6.04319L8.47869 1.95106L13.2021 6.08242V9.32956Z" fill="#CC6699" stroke="#CC6699" stroke-width="0.2"/>
                    </svg>
                    {order.address.value}, {order.address.street}
                </div>

            </div>
        {/if}
    {#if status == 'newOrder'}
    {#if !openOrder}
            <div class="flex items-center mb-8">
                <div class="order__left">Дата и время доставки:</div>
                <div class="order__right">{formatDate(order.date)}</div>
            </div>
            <div class="flex items-center mb-8">
                <div class="order__left">Адрес доставки:</div>
                <div class="order__right">{order.address.value}, {order.address.street}</div>
            </div>
            <div class="flex items-center mb-8">
                <div class="order__left">Опция доставки:</div>
                <div class="order__right">{order.option}</div>
            </div>
            <div class="flex items-center mb-8">
                <div class="order__left">Доп. услуга:</div>
                <div class="order__right">{order.service}</div>
            </div>
            <div class="flex items-center mb-8">
                <div class="order__left">Комментарий</div>
                <div class="order__right">{order.comment}</div>
            </div>
            <div class="flex items-center mb-8">
                <div class="order__left">Способ оплаты:</div>
                <div class="order__right">{order.way}</div>
            </div>
            <div class="flex items-center mb-30">
                <div class="order__left">Сумма заказа:</div>
                <div class="order__right font-semibold">{order.summ} ₽</div>
            </div>
              <div class="order__products {newOerderStatus != 'newOrder' ? 'mb-30' : ''}">
                {#each order.products as product}
                <BusinessActiveProductWC product={product} postcardPrice={order.postcardPrice}/>
                {/each}
                  <div class="order__delivery flex justify-between">
                      <div class="order__productInfo_text">{order.delivery}</div>
                      <div class="order__productInfo_text">{order.deliveriPrice} ₽</div>
                  </div>
                  <div class="order__totalPrice flex justify-end items-center">
                      <div class="order__changeButton" on:click={()=>{changeComposition = true}}>
                          Изменить состав/стоимость
                      </div>
                      <div class="order__productInfo_text mr-8">Итого:</div>
                      <div class="order__productInfo_text font-semibold text-xl" >{order.summ} ₽</div>
                  </div>
            </div>
        <div class="{newOerderStatus != 'newOrder' ? 'bigEmptyBlock' : 'emptyBlock'}"></div>
    <div class="footer {newOerderStatus != 'newOrder' ? 'bigFooter' : ''}">
        <div class="buttons flex">
            {#if newOerderStatus == 'newOrder'}
                <Button className="mr-30" size="lg" on:click={()=>{
                newOerderStatus = 'coordination'
                setTimeout(()=>{newOerderStatus = 'agreed'}, 5000)

                }}>Принять</Button>
                <Button status="active-secondary" size="lg" on:click={()=>{orderСancellation=true}}>Отклонить</Button>
            {:else if newOerderStatus == 'coordination'}
            <div class="coordinationFooter">
                <Button className="mr-30" size="lg" status="disabled-main"}>Принять</Button>
                <div class="notice flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="31" viewBox="0 0 33 31" fill="none" class="mr-16">
                        <path d="M32.685 26.6127L18.5119 2.06416C18.092 1.33681 17.3399 0.902588 16.5 0.902588C15.6601 0.902588 14.908 1.33681 14.4881 2.06416L0.314982 26.6127C-0.104994 27.34 -0.104994 28.2085 0.314982 28.9358C0.734895 29.6632 1.487 30.0974 2.32689 30.0974H30.6731C31.513 30.0974 32.2651 29.6632 32.685 28.9358C33.105 28.2085 33.105 27.34 32.685 26.6127ZM31.0085 27.9679C30.9668 28.0402 30.8676 28.1615 30.6732 28.1615H2.32689C2.13237 28.1615 2.03324 28.0403 1.9916 27.9679C1.9499 27.8956 1.89434 27.7491 1.9916 27.5807L16.1646 3.03212C16.2619 2.8637 16.4165 2.8385 16.4999 2.8385C16.5835 2.8385 16.738 2.86364 16.8352 3.03212L31.0084 27.5807C31.1057 27.7491 31.0502 27.8956 31.0085 27.9679Z" fill="#E71F75"/>
                        <path d="M17.4682 9.70532H15.5322V20.0305H17.4682V9.70532Z" fill="#E71F75"/>
                        <path d="M16.5006 24.5479C17.2135 24.5479 17.7913 23.97 17.7913 23.2572C17.7913 22.5444 17.2135 21.9666 16.5006 21.9666C15.7878 21.9666 15.21 22.5444 15.21 23.2572C15.21 23.97 15.7878 24.5479 16.5006 24.5479Z" fill="#E71F75"/>
                    </svg>
                    Данные о составе/стоимости заказа на согласовании. Дождитесь согласования, чтобы принять заказ.
                </div>
            </div>
            {:else if newOerderStatus == 'agreed'}
                <div class="coordinationFooter">
                    <Button className="mr-30" size="lg" on:click={()=>{
                    status = 'coordination'
                    scrollToTop()}}>Принять</Button>
                    <div class="notice noticeAgree flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none" class="mr-16">
                            <circle cx="14.5" cy="14.5" r="13.5" stroke="#1DC556" stroke-width="2"/>
                            <path d="M21 12L13 19L8 14.625" stroke="#1DC556" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Данные о составе/стоимости заказа согласованы. Вы можете принять заказ.
                    </div>
                </div>
            {/if}
        </div>
    </div>
    {:else}
        {#if newOerderStatus == 'coordination'}
            <div>
                <div class="notice flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="31" viewBox="0 0 33 31" fill="none" class="mr-16">
                        <path d="M32.685 26.6127L18.5119 2.06416C18.092 1.33681 17.3399 0.902588 16.5 0.902588C15.6601 0.902588 14.908 1.33681 14.4881 2.06416L0.314982 26.6127C-0.104994 27.34 -0.104994 28.2085 0.314982 28.9358C0.734895 29.6632 1.487 30.0974 2.32689 30.0974H30.6731C31.513 30.0974 32.2651 29.6632 32.685 28.9358C33.105 28.2085 33.105 27.34 32.685 26.6127ZM31.0085 27.9679C30.9668 28.0402 30.8676 28.1615 30.6732 28.1615H2.32689C2.13237 28.1615 2.03324 28.0403 1.9916 27.9679C1.9499 27.8956 1.89434 27.7491 1.9916 27.5807L16.1646 3.03212C16.2619 2.8637 16.4165 2.8385 16.4999 2.8385C16.5835 2.8385 16.738 2.86364 16.8352 3.03212L31.0084 27.5807C31.1057 27.7491 31.0502 27.8956 31.0085 27.9679Z" fill="#E71F75"/>
                        <path d="M17.4682 9.70532H15.5322V20.0305H17.4682V9.70532Z" fill="#E71F75"/>
                        <path d="M16.5006 24.5479C17.2135 24.5479 17.7913 23.97 17.7913 23.2572C17.7913 22.5444 17.2135 21.9666 16.5006 21.9666C15.7878 21.9666 15.21 22.5444 15.21 23.2572C15.21 23.97 15.7878 24.5479 16.5006 24.5479Z" fill="#E71F75"/>
                    </svg>
                    Данные о составе/стоимости заказа на согласовании. Дождитесь согласования, чтобы принять заказ.
                </div>
            </div>
        {:else if newOerderStatus == 'agreed'}
            <div class="coordinationFooter">
                <div class="notice noticeAgree flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none" class="mr-16">
                        <circle cx="14.5" cy="14.5" r="13.5" stroke="#1DC556" stroke-width="2"/>
                        <path d="M21 12L13 19L8 14.625" stroke="#1DC556" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Данные о составе/стоимости заказа согласованы. Вы можете принять заказ.
                </div>
            </div>
        {/if}
    {/if}
    {:else if status == 'coordination'}
    {#if !openOrder}
            <div class="coordination__recipients">
                {#each order.products as product}
                <div class="coordination__recipient">
                    <div class="mb-22">
                        <div class="flex items-center mb-6">
                            <div class="order__productInfo_subText coordination__recipient_left">Получатель:</div>
                            <div class="order__productInfo_text">{product.receiver}</div>
                        </div>
                        <div class="flex items-center ">
                            <div class="order__productInfo_subText coordination__recipient_left">Телефон получателя:</div>
                            <div class="order__productInfo_text">{product.phone}</div>
                        </div>
                    </div>
                </div>
                {/each}
            </div>
            <div class="coordination__adress mt-40">
                <h2 class="coordination__sectionName ">Согласованный адрес доставки</h2>
                <div class="w-full">
                    <label for="cart-address-sity" class="label-text">
                        Населённый пункт
                    </label>
                    <div class="text-value">
                        <TextInput
                                required={true}
                                name="house"
                                id="cart-address-sity"
                                bind:value={order.address.value}
                                className="w-full"
                        />
                    </div>
                </div>
                <div class="w-full">
                    <label for="cart-address-street" class="label-text">
                        Улица
                    </label>
                    <div class="text-value">
                        <TextInput
                                required={true}
                                name="house"
                                id="cart-address-street"
                                bind:value={order.address.street}
                                className="w-full"
                        />
                    </div>
                </div>
                <div>
                    <div class="flex w-full justify-between">
                        <div class="w-1/3">
                            <label for="cart-address-house" class="label-text">
                                Дом
                            </label>
                            <div class="text-value">
                                <TextInput
                                        required={true}
                                        name="house"
                                        id="cart-address-house"
                                        bind:value={order.address.house}
                                        className="w-full"
                                />
                            </div>
                        </div>
                        <div class="w-1/3 ml-24">
                            <label for="cart-address-building" class="label-text">Корпус/строение</label>
                            <div class="text-value">
                                <TextInput
                                        id="cart-building-porch"
                                        bind:ref={buildingInput}
                                        bind:value={order.address.building}
                                        className="w-full" />
                            </div>
                        </div>
                        <div class="w-1/3 ml-24">
                            <label for="cart-address-porch" class="label-text">Подъезд</label>
                            <div class="text-value">
                                <TextInput
                                        id="cart-address-porch"
                                        bind:ref={apartmentInput}
                                        bind:value={order.address.porch}
                                        className="w-full" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-30 flex w-full justify-between">
                    <div class="w-1/3">
                        <label for="cart-address-apartment" class="label-text">
                            Квартира/офис
                        </label>
                        <div class="text-value">
                            <TextInput
                                    id="cart-address-apartment"
                                    bind:ref={apartmentInput}
                                    bind:value={order.address.apartment}
                                    className="w-full" />
                        </div>
                    </div>
                    <div class="w-1/3 ml-24">
                        <label for="cart-address-intercom" class="label-text">
                            Домофон
                        </label>
                        <div class="text-value">
                            <TextInput
                                    required={true}
                                    name="house"
                                    id="cart-address-intercom"
                                    bind:value={order.address.intercom}
                                    className="w-full"
                            />
                        </div>
                    </div>
                    <div class="w-1/3 ml-24">
                        <label for="cart-address-floor" class="label-text">Этаж</label>
                        <div class="text-value">
                            <TextInput
                                    id="cart-address-floor"
                                    bind:ref={apartmentInput}
                                    bind:value={order.address.floor}
                                    className="w-full" />
                        </div>
                    </div>
                </div>
                <div>
                    <CustomCheckbox  style="font-size: 15px;"
                                     value="neighbors"
                                     className="text-main"
                                     id="neighbors"
                                     label="Можно оставить букет соседям/родственникам"
                                     bind:check = {order.address.neighbors}/>
                </div>
            </div>
            <div class="coordination__time coordination__adress mt-48">
                <h2 class="coordination__sectionName mb-24">Согласованное время доставки</h2>
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
            </div>
            <div class="bigEmptyBlock"></div>
        <div class="footer bigFooter">
            <div class="buttons flex">
            <div class="coordinationFooter">
                <Button className="mr-30" size="lg" on:click={()=>{
                status = 'creating'
                appointment = true
                onceAppointment = !onceAppointment
                scrollToTop()
                }}>
                    Сохранить
                </Button>
                <div class="notice noticeAgree flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none" class="mr-16">
                        <circle cx="14.5" cy="14.5" r="13.5" stroke="#1DC556" stroke-width="2"/>
                        <path d="M21 12L13 19L8 14.625" stroke="#1DC556" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Сохраните согласованные с получателем адрес и время доставки
                </div>
            </div>
            </div>
        </div>
        {:else}
        <div class="notice noticeAgree flex items-center miniInfoBlock">
            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none" class="mr-16">
                <circle cx="14.5" cy="14.5" r="13.5" stroke="#1DC556" stroke-width="2"/>
                <path d="M21 12L13 19L8 14.625" stroke="#1DC556" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Сохраните согласованные с получателем адрес и время доставки
        </div>
    {/if}
        {:else if status == 'creating'}
        {#if !openOrder}
            <div class="flex items-center mb-8">
                <div class="order__left">Дата и время доставки:</div>
                <div class="order__right">{formatDate(order.date)}</div>
            </div>
            <div class="flex items-center mb-8">
                <div class="order__left">Адрес доставки:</div>
                <div class="order__right">{order.address.value}, {order.address.street}</div>
            </div>
            <div class="flex items-center mb-8">
                <div class="order__left">Опция доставки:</div>
                <div class="order__right">{order.option}</div>
            </div>
            <div class="flex items-center mb-8">
                <div class="order__left">Доп. услуга:</div>
                <div class="order__right">{order.service}</div>
            </div>
            <div class="flex items-center mb-8">
                <div class="order__left">Комментарий</div>
                <div class="order__right">{order.comment}</div>
            </div>
            <div class="flex items-center mb-8">
                <div class="order__left">Способ оплаты:</div>
                <div class="order__right">{order.way}</div>
            </div>
            <div class="flex items-center mb-30">
                <div class="order__left">Сумма заказа:</div>
                <div class="order__right font-semibold">{order.summ} ₽</div>
            </div>
            <div class="orderWorkers">
                <h2>Сотрудники:</h2>
                <p class="flex">
                    <span class="orderWorker order__productInfo_subText">Флорист:</span>
                    <span class="order__productInfo_text">
                        <div class="order__productInfo_text flex items-center mb-10">
                            {order.florist}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none" class="ml-8" on:click={()=>{
                            appointment=true
                            onceAppointment = false
                            }}>
                            <path d="M14.0301 0.970913C12.7387 -0.323637 10.6387 -0.323637 9.34732 0.970913L0.761729 9.5533C0.694604 9.62043 0.653051 9.70673 0.640265 9.79942L0.00417736 14.5109C-0.0150012 14.6452 0.0329452 14.7794 0.125641 14.8721C0.205552 14.9521 0.317427 15 0.429301 15C0.44848 15 0.467658 15 0.486837 14.9968L3.32526 14.6132C3.56179 14.5813 3.72801 14.3639 3.69604 14.1274C3.66408 13.8908 3.44672 13.7246 3.21019 13.7566L0.934336 14.0634L1.37864 10.7775L4.83717 14.2361C4.91708 14.316 5.02895 14.3639 5.14083 14.3639C5.2527 14.3639 5.36458 14.3192 5.44449 14.2361L14.0301 5.65367C14.6566 5.02717 15.0018 4.1961 15.0018 3.31069C15.0018 2.42528 14.6566 1.59421 14.0301 0.970913ZM9.51353 2.02573L10.9551 3.46732L3.12069 11.3017L1.6791 9.86016L9.51353 2.02573ZM5.14402 13.3219L3.7344 11.9123L11.5688 4.07783L12.9785 5.48745L5.14402 13.3219ZM13.5794 4.87054L10.1304 1.42161C10.5683 1.06041 11.1149 0.862234 11.6903 0.862234C12.3456 0.862234 12.9593 1.11795 13.4228 1.57823C13.8862 2.03852 14.1388 2.65543 14.1388 3.31069C14.1388 3.88924 13.9406 4.43264 13.5794 4.87054Z" fill="#330033"/>
                            </svg>
                        </div>
                        {#if floristPhones[order.florist] != undefined}
                            <div class="order__productInfo_subText mt-10">
                            {floristPhones[order.florist]}
                        </div>
                        {/if}
                    </span>
                </p>
                <p class="flex"><span class="orderWorker order__productInfo_subText">Курьер:</span><span class="order__productInfo_text">
                    <div class="order__productInfo_text flex items-center">
                        {order.courier}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none" class="ml-8" on:click={()=>{
                        appointment=true
                        onceAppointment = false
                        }}>
                        <path d="M14.0301 0.970913C12.7387 -0.323637 10.6387 -0.323637 9.34732 0.970913L0.761729 9.5533C0.694604 9.62043 0.653051 9.70673 0.640265 9.79942L0.00417736 14.5109C-0.0150012 14.6452 0.0329452 14.7794 0.125641 14.8721C0.205552 14.9521 0.317427 15 0.429301 15C0.44848 15 0.467658 15 0.486837 14.9968L3.32526 14.6132C3.56179 14.5813 3.72801 14.3639 3.69604 14.1274C3.66408 13.8908 3.44672 13.7246 3.21019 13.7566L0.934336 14.0634L1.37864 10.7775L4.83717 14.2361C4.91708 14.316 5.02895 14.3639 5.14083 14.3639C5.2527 14.3639 5.36458 14.3192 5.44449 14.2361L14.0301 5.65367C14.6566 5.02717 15.0018 4.1961 15.0018 3.31069C15.0018 2.42528 14.6566 1.59421 14.0301 0.970913ZM9.51353 2.02573L10.9551 3.46732L3.12069 11.3017L1.6791 9.86016L9.51353 2.02573ZM5.14402 13.3219L3.7344 11.9123L11.5688 4.07783L12.9785 5.48745L5.14402 13.3219ZM13.5794 4.87054L10.1304 1.42161C10.5683 1.06041 11.1149 0.862234 11.6903 0.862234C12.3456 0.862234 12.9593 1.11795 13.4228 1.57823C13.8862 2.03852 14.1388 2.65543 14.1388 3.31069C14.1388 3.88924 13.9406 4.43264 13.5794 4.87054Z" fill="#330033"/>
                        </svg>
                    </div>
                    {#if courierPhones[order.courier] != undefined}
                     <div class="order__productInfo_subText mt-10">
                        {courierPhones[order.courier]}
                    </div>
                    {/if}
                </span></p>
            </div>
            {#each order.products as product}
                <BusinessActiveProductWC product={product} postcardPrice={order.postcardPrice}/>
            {/each}
            <div class="order__delivery flex justify-between">
                <div class="order__productInfo_text">{order.delivery}</div>
                <div class="order__productInfo_text">{order.deliveriPrice} ₽</div>
            </div>
            <div class="order__totalPrice flex justify-end items-center">
                <div class="order__productInfo_text mr-8">Итого:</div>
                <div class="order__productInfo_text font-semibold text-xl" >{order.summ} ₽</div>
            </div>
            <div class="bigEmptyBlock"></div>
            <div class="footer bigFooter">
                <div class="buttons flex">
                    <input type="file" id="fileCheck" accept="image/*,image/jpeg,image/jpg,image/png" bind:value={newPhoto} >
                    <label for="fileCheck">
                    <div class="coordinationFooter">
                        <Button className="mr-30 whitespace-no-wrap" size="lg" on:click={ scrollToTop}>
                            <label for="fileCheck">
                                <span class="text-base font-semibold">Загрузить фото заказа</span>
                            </label>
                        </Button>
                        <div class="notice flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="31" viewBox="0 0 33 31" fill="none" class="mr-16">
                                <path d="M32.685 26.6127L18.5119 2.06416C18.092 1.33681 17.3399 0.902588 16.5 0.902588C15.6601 0.902588 14.908 1.33681 14.4881 2.06416L0.314982 26.6127C-0.104994 27.34 -0.104994 28.2085 0.314982 28.9358C0.734895 29.6632 1.487 30.0974 2.32689 30.0974H30.6731C31.513 30.0974 32.2651 29.6632 32.685 28.9358C33.105 28.2085 33.105 27.34 32.685 26.6127ZM31.0085 27.9679C30.9668 28.0402 30.8676 28.1615 30.6732 28.1615H2.32689C2.13237 28.1615 2.03324 28.0403 1.9916 27.9679C1.9499 27.8956 1.89434 27.7491 1.9916 27.5807L16.1646 3.03212C16.2619 2.8637 16.4165 2.8385 16.4999 2.8385C16.5835 2.8385 16.738 2.86364 16.8352 3.03212L31.0084 27.5807C31.1057 27.7491 31.0502 27.8956 31.0085 27.9679Z" fill="#E71F75"/>
                                <path d="M17.4682 9.70532H15.5322V20.0305H17.4682V9.70532Z" fill="#E71F75"/>
                                <path d="M16.5006 24.5479C17.2135 24.5479 17.7913 23.97 17.7913 23.2572C17.7913 22.5444 17.2135 21.9666 16.5006 21.9666C15.7878 21.9666 15.21 22.5444 15.21 23.2572C15.21 23.97 15.7878 24.5479 16.5006 24.5479Z" fill="#E71F75"/>
                            </svg>
                            Когда заказ собран, загрузите фото для оценки менеджером и покупателем
                        </div>
                    </div>
                </div>
            </div>
            {:else}
                <div class="notice flex items-center miniInfoBlock">
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="31" viewBox="0 0 33 31" fill="none" class="mr-16">
                        <path d="M32.685 26.6127L18.5119 2.06416C18.092 1.33681 17.3399 0.902588 16.5 0.902588C15.6601 0.902588 14.908 1.33681 14.4881 2.06416L0.314982 26.6127C-0.104994 27.34 -0.104994 28.2085 0.314982 28.9358C0.734895 29.6632 1.487 30.0974 2.32689 30.0974H30.6731C31.513 30.0974 32.2651 29.6632 32.685 28.9358C33.105 28.2085 33.105 27.34 32.685 26.6127ZM31.0085 27.9679C30.9668 28.0402 30.8676 28.1615 30.6732 28.1615H2.32689C2.13237 28.1615 2.03324 28.0403 1.9916 27.9679C1.9499 27.8956 1.89434 27.7491 1.9916 27.5807L16.1646 3.03212C16.2619 2.8637 16.4165 2.8385 16.4999 2.8385C16.5835 2.8385 16.738 2.86364 16.8352 3.03212L31.0084 27.5807C31.1057 27.7491 31.0502 27.8956 31.0085 27.9679Z" fill="#E71F75"/>
                        <path d="M17.4682 9.70532H15.5322V20.0305H17.4682V9.70532Z" fill="#E71F75"/>
                        <path d="M16.5006 24.5479C17.2135 24.5479 17.7913 23.97 17.7913 23.2572C17.7913 22.5444 17.2135 21.9666 16.5006 21.9666C15.7878 21.9666 15.21 22.5444 15.21 23.2572C15.21 23.97 15.7878 24.5479 16.5006 24.5479Z" fill="#E71F75"/>
                    </svg>
                    Когда заказ собран, загрузите фото для оценки клиентом
                </div>
        {/if}
        {:else if status == 'photo'}
        {#if !openOrder}
        <div class="flex items-center">
            <div class="photosAfterOrder">
                <div class="photoAfterOrder mr-34">
                    <picture>
                        <source
                                data-srcset="{order.photoAfterOrder[selectedPhotoAfterOrder]}.webp, {order.photoAfterOrder[selectedPhotoAfterOrder]}-2x.webp 2x" />
                        <img
                                class=""
                                data-srcset="{order.photoAfterOrder[selectedPhotoAfterOrder]}-2x.png"
                                data-src="{order.photoAfterOrder[selectedPhotoAfterOrder]}.png"
                                alt={order.photoAfterOrder[selectedPhotoAfterOrder]} />
                    </picture>
                    <noscript>
                        <img srcset="{order.photoAfterOrder[selectedPhotoAfterOrder]}-2x.png" src="{order.photoAfterOrder[selectedPhotoAfterOrder]}.png" alt="{order.photoAfterOrder[selectedPhotoAfterOrder]}">
                    </noscript>
                    <noscript>
                        <img srcset="product.photo}-2x.png" src="{order.photoAfterOrder[selectedPhotoAfterOrder]}.png" alt="{order.photoAfterOrder[selectedPhotoAfterOrder]}">
                    </noscript>
                </div>
                <div class="mb-12 flex">
                    <div class="changePhotoButton {selectedPhotoAfterOrder == 0 ? 'activeButton' : ''}" on:click={()=>{selectedPhotoAfterOrder = 0}}></div>
                    <div class="changePhotoButton {selectedPhotoAfterOrder == 1 ? 'activeButton' : ''}" on:click={()=>{selectedPhotoAfterOrder = 1}}></div>
                </div>
                <div class="text-center order__productInfo_subText">
                    Фото до доставки
                </div>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="88" height="11" viewBox="0 0 88 11" fill="none">
                    <path d="M82 10L87 5.49599L82 1" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="72.75" y1="5.25" x2="79.25" y2="5.25" stroke="#999999" stroke-width="1.5" stroke-linecap="round"/>
                    <line x1="60.75" y1="5.25" x2="67.25" y2="5.25" stroke="#999999" stroke-width="1.5" stroke-linecap="round"/>
                    <line x1="48.75" y1="5.25" x2="55.25" y2="5.25" stroke="#999999" stroke-width="1.5" stroke-linecap="round"/>
                    <line x1="36.75" y1="5.25" x2="43.25" y2="5.25" stroke="#999999" stroke-width="1.5" stroke-linecap="round"/>
                    <line x1="24.75" y1="5.25" x2="31.25" y2="5.25" stroke="#999999" stroke-width="1.5" stroke-linecap="round"/>
                    <line x1="12.75" y1="5.25" x2="19.25" y2="5.25" stroke="#999999" stroke-width="1.5" stroke-linecap="round"/>
                    <line x1="0.75" y1="5.25" x2="7.25" y2="5.25" stroke="#999999" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
            </div>
            <div class="timer">
                <RoundTimer/>
            </div>
            <p class="photoText">Ожидайте оценки фото от клиента</p>
        </div>
        <div class="orderWorkers">
            <h2>Сотрудники:</h2>
            <p class="flex mb-8">
                <span class="orderWorker order__productInfo_subText">Флорист:</span>
                <span class="order__productInfo_text">
                        <div class="order__productInfo_text flex items-center mb-10">
                            {order.florist}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none" class="ml-8" on:click={()=>{
                            appointment=true
                            onceAppointment = false
                            }}>
                            <path d="M14.0301 0.970913C12.7387 -0.323637 10.6387 -0.323637 9.34732 0.970913L0.761729 9.5533C0.694604 9.62043 0.653051 9.70673 0.640265 9.79942L0.00417736 14.5109C-0.0150012 14.6452 0.0329452 14.7794 0.125641 14.8721C0.205552 14.9521 0.317427 15 0.429301 15C0.44848 15 0.467658 15 0.486837 14.9968L3.32526 14.6132C3.56179 14.5813 3.72801 14.3639 3.69604 14.1274C3.66408 13.8908 3.44672 13.7246 3.21019 13.7566L0.934336 14.0634L1.37864 10.7775L4.83717 14.2361C4.91708 14.316 5.02895 14.3639 5.14083 14.3639C5.2527 14.3639 5.36458 14.3192 5.44449 14.2361L14.0301 5.65367C14.6566 5.02717 15.0018 4.1961 15.0018 3.31069C15.0018 2.42528 14.6566 1.59421 14.0301 0.970913ZM9.51353 2.02573L10.9551 3.46732L3.12069 11.3017L1.6791 9.86016L9.51353 2.02573ZM5.14402 13.3219L3.7344 11.9123L11.5688 4.07783L12.9785 5.48745L5.14402 13.3219ZM13.5794 4.87054L10.1304 1.42161C10.5683 1.06041 11.1149 0.862234 11.6903 0.862234C12.3456 0.862234 12.9593 1.11795 13.4228 1.57823C13.8862 2.03852 14.1388 2.65543 14.1388 3.31069C14.1388 3.88924 13.9406 4.43264 13.5794 4.87054Z" fill="#330033"/>
                            </svg>
                        </div>
                    {#if floristPhones[order.florist] != undefined}
                        <div class="order__productInfo_subText mt-6">
                            {floristPhones[order.florist]}
                        </div>
                    {/if}
                    </span>
            </p>
            <p class="flex"><span class="orderWorker order__productInfo_subText">Курьер:</span><span class="order__productInfo_text">

                    <div class="order__productInfo_text flex items-center">
                        {order.courier}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none" class="ml-8" on:click={()=>{
                        appointment=true
                        onceAppointment = false
                        }}>
                        <path d="M14.0301 0.970913C12.7387 -0.323637 10.6387 -0.323637 9.34732 0.970913L0.761729 9.5533C0.694604 9.62043 0.653051 9.70673 0.640265 9.79942L0.00417736 14.5109C-0.0150012 14.6452 0.0329452 14.7794 0.125641 14.8721C0.205552 14.9521 0.317427 15 0.429301 15C0.44848 15 0.467658 15 0.486837 14.9968L3.32526 14.6132C3.56179 14.5813 3.72801 14.3639 3.69604 14.1274C3.66408 13.8908 3.44672 13.7246 3.21019 13.7566L0.934336 14.0634L1.37864 10.7775L4.83717 14.2361C4.91708 14.316 5.02895 14.3639 5.14083 14.3639C5.2527 14.3639 5.36458 14.3192 5.44449 14.2361L14.0301 5.65367C14.6566 5.02717 15.0018 4.1961 15.0018 3.31069C15.0018 2.42528 14.6566 1.59421 14.0301 0.970913ZM9.51353 2.02573L10.9551 3.46732L3.12069 11.3017L1.6791 9.86016L9.51353 2.02573ZM5.14402 13.3219L3.7344 11.9123L11.5688 4.07783L12.9785 5.48745L5.14402 13.3219ZM13.5794 4.87054L10.1304 1.42161C10.5683 1.06041 11.1149 0.862234 11.6903 0.862234C12.3456 0.862234 12.9593 1.11795 13.4228 1.57823C13.8862 2.03852 14.1388 2.65543 14.1388 3.31069C14.1388 3.88924 13.9406 4.43264 13.5794 4.87054Z" fill="#330033"/>
                        </svg>
                    </div>
                {#if courierPhones[order.courier] != undefined}
                    <div class="order__productInfo_subText mt-10">
                        {courierPhones[order.courier]}
                    </div>
                {/if}
                </span></p>
        </div>
        <div class="bigEmptyBlock"></div>
        <div class="footer bigFooter">
            <div class="buttons flex">
                    <div class="coordinationFooter">
                        <Button className="mr-30 whitespace-no-wrap" size="lg" on:click={()=>{status='delivery'
                        scrollToTop()}}>
                            Начать доставку
                        </Button>
                        <div class="notice flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="31" viewBox="0 0 33 31" fill="none" class="mr-16">
                                <path d="M32.685 26.6127L18.5119 2.06416C18.092 1.33681 17.3399 0.902588 16.5 0.902588C15.6601 0.902588 14.908 1.33681 14.4881 2.06416L0.314982 26.6127C-0.104994 27.34 -0.104994 28.2085 0.314982 28.9358C0.734895 29.6632 1.487 30.0974 2.32689 30.0974H30.6731C31.513 30.0974 32.2651 29.6632 32.685 28.9358C33.105 28.2085 33.105 27.34 32.685 26.6127ZM31.0085 27.9679C30.9668 28.0402 30.8676 28.1615 30.6732 28.1615H2.32689C2.13237 28.1615 2.03324 28.0403 1.9916 27.9679C1.9499 27.8956 1.89434 27.7491 1.9916 27.5807L16.1646 3.03212C16.2619 2.8637 16.4165 2.8385 16.4999 2.8385C16.5835 2.8385 16.738 2.86364 16.8352 3.03212L31.0084 27.5807C31.1057 27.7491 31.0502 27.8956 31.0085 27.9679Z" fill="#E71F75"/>
                                <path d="M17.4682 9.70532H15.5322V20.0305H17.4682V9.70532Z" fill="#E71F75"/>
                                <path d="M16.5006 24.5479C17.2135 24.5479 17.7913 23.97 17.7913 23.2572C17.7913 22.5444 17.2135 21.9666 16.5006 21.9666C15.7878 21.9666 15.21 22.5444 15.21 23.2572C15.21 23.97 15.7878 24.5479 16.5006 24.5479Z" fill="#E71F75"/>
                            </svg>
                            Когда заказ собран, загрузите фото для оценки клиентом
                        </div>
                    </div>
            </div>
        </div>
            {:else}
            <div class="notice flex items-center miniInfoBlock">
                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="31" viewBox="0 0 33 31" fill="none" class="mr-16">
                    <path d="M32.685 26.6127L18.5119 2.06416C18.092 1.33681 17.3399 0.902588 16.5 0.902588C15.6601 0.902588 14.908 1.33681 14.4881 2.06416L0.314982 26.6127C-0.104994 27.34 -0.104994 28.2085 0.314982 28.9358C0.734895 29.6632 1.487 30.0974 2.32689 30.0974H30.6731C31.513 30.0974 32.2651 29.6632 32.685 28.9358C33.105 28.2085 33.105 27.34 32.685 26.6127ZM31.0085 27.9679C30.9668 28.0402 30.8676 28.1615 30.6732 28.1615H2.32689C2.13237 28.1615 2.03324 28.0403 1.9916 27.9679C1.9499 27.8956 1.89434 27.7491 1.9916 27.5807L16.1646 3.03212C16.2619 2.8637 16.4165 2.8385 16.4999 2.8385C16.5835 2.8385 16.738 2.86364 16.8352 3.03212L31.0084 27.5807C31.1057 27.7491 31.0502 27.8956 31.0085 27.9679Z" fill="#E71F75"/>
                    <path d="M17.4682 9.70532H15.5322V20.0305H17.4682V9.70532Z" fill="#E71F75"/>
                    <path d="M16.5006 24.5479C17.2135 24.5479 17.7913 23.97 17.7913 23.2572C17.7913 22.5444 17.2135 21.9666 16.5006 21.9666C15.7878 21.9666 15.21 22.5444 15.21 23.2572C15.21 23.97 15.7878 24.5479 16.5006 24.5479Z" fill="#E71F75"/>
                </svg>
                Заказ не готов к доставке. Необходимо получить положительную оценку от клиента.
            </div>
        {/if}
        {:else if status=='delivery'}
        {#if !openOrder}
            <div class="flex items-center mb-8">
                <div class="order__left">Дата и время доставки:</div>
                <div class="order__right">{formatDate(order.date)}</div>
            </div>
            <div class="flex items-center mb-8">
                <div class="order__left">Адрес доставки:</div>
                <div class="order__right">{order.address.value}, {order.address.street}</div>
            </div>
            <div class="flex items-center mb-8">
                <div class="order__left">Опция доставки:</div>
                <div class="order__right">{order.option}</div>
            </div>
            <div class="flex items-center mb-8">
                <div class="order__left">Доп. услуга:</div>
                <div class="order__right">{order.service}</div>
            </div>
            <div class="flex items-center mb-8">
                <div class="order__left">Комментарий</div>
                <div class="order__right">{order.comment}</div>
            </div>
            <div class="flex items-center mb-8">
                <div class="order__left">Способ оплаты:</div>
                <div class="order__right">{order.way}</div>
            </div>
            <div class="flex items-center mb-8">
                <div class="order__left">Сумма заказа:</div>
                <div class="order__right font-semibold">{order.summ} ₽</div>
            </div>
            <div class="flex items-center mb-8">
                <div class="order__left">Нужна сдача с:</div>
                <div class="order__right">{order.cashBack} ₽</div>
            </div>
            <div class="flex mb-40">
                <div class="order__left">Курьер</div>
                <div class="order__right">
                    <div>{order.courier}</div>
                    {#if courierPhones[order.courier] != undefined}
                        <div class="order__productInfo_subText mt-10">
                            {courierPhones[order.courier]}
                        </div>
                    {/if}
                </div>
            </div>
            {#each order.products as product}
                <BusinessActiveProductWC product={product} postcardPrice={order.postcardPrice}/>
            {/each}
            <div class="order__delivery flex justify-between">
                <div class="order__productInfo_text">{order.delivery}</div>
                <div class="order__productInfo_text">{order.deliveriPrice} ₽</div>
            </div>
            <div class="order__totalPrice flex justify-end items-center">
                <div class="order__productInfo_text mr-8">Итого:</div>
                <div class="order__productInfo_text font-semibold text-xl" >{order.summ} ₽</div>
            </div>
        <div class="bigEmptyBlock"></div>
            <div class="footer ">
                <div class="buttons flex">
                    <div class="flex">
                        <Button className="mr-30 whitespace-no-wrap" size="lg" on:click={()=>{status='done'}}>
                            Заказ доставлен
                        </Button>
                        <Button className="mr-30 whitespace-no-wrap" status="active-secondary" size="lg" on:click={()=>{orderNotDelivery=true}}>
                            Заказ не доставлен
                        </Button>
                    </div>
                </div>
            </div>
            {:else}
            <div class="notice noticeAgree flex items-center miniInfoBlock">
                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none" class="mr-16">
                    <circle cx="14.5" cy="14.5" r="13.5" stroke="#1DC556" stroke-width="2"/>
                    <path d="M21 12L13 19L8 14.625" stroke="#1DC556" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Началась доставка заказа.
            </div>
        {/if}
        {:else if status == 'done'}
        {#if !openOrder}
            {#if orderFinal}
                <div class="w-full text-center order__productInfo_text">
                    Заказ выполнен, спасибо за работу!
                </div>
                <div class="stickers"></div>
                {:else}
                <div class="flex items-center">
                    <div class="clientsPhoto">
                        <div class="clientsPhoto">
                        </div>
                        <div class="order__productInfo_subText mt-8 text-center">
                            Фото с получателем
                        </div>
                    </div>
                    <div class="order__productInfo_text">Загрузите фото заказа с получателем в момент вручения.</div>
                </div>
            {/if}
            <div class="footer">
                {#if orderFinal}
                <div class="buttons flex">
                    <div class="flex">
                        <Button className="mr-30 whitespace-no-wrap" size="lg">
                            Завершить выполнение заказа
                        </Button>
                    </div>
                </div>
                {:else}
                    <div class="buttons flex">
                        <input type="file" id="loadClientsPhoto" accept="image/*,image/jpeg,image/jpg,image/png" bind:value={newPhotoClient} >
                        <label for="loadClientsPhoto">
                            <div class="flex">
                                <Button className="mr-30 whitespace-no-wrap" size="lg" on:click={()=>{status='done'}}>
                                    <label for="loadClientsPhoto">
                                        <span class="text-base font-semibold">Загрузить фото</span>
                                    </label>
                                </Button>
                                <Button className="mr-30 whitespace-no-wrap" status="active-secondary" size="lg" on:click={()=>{orderNotPhoto=true}}>
                                    Фото не сделано
                                </Button>
                            </div>
                    </div>
                {/if}
            </div>
            {:else}
            <div class="notice noticeAgree flex items-center miniInfoBlock">
                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none" class="mr-16">
                    <circle cx="14.5" cy="14.5" r="13.5" stroke="#1DC556" stroke-width="2"/>
                    <path d="M21 12L13 19L8 14.625" stroke="#1DC556" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Загрузите фото заказа с получателем.
            </div>
        {/if}
        {/if}
</div>
</div>

{#if orderСancellation}
<ModalCancellBussinessOrder bind:visible={orderСancellation}/>
{/if}
{#if changeComposition}
<ModalChangeCompositionBussinesOrder bind:visible={changeComposition} bind:order={order}/>
{/if}
{#if appointment }
    <ModalAppointmentWorkers florists={florists} couriers={couriers} bind:sectedFlorist={order.florist} bind:sectedCourier={order.courier} bind:visible={appointment} once={onceAppointment}/>
{/if}
{#if orderNotDelivery}
    <BusinessOrderNotDelivery bind:visible={orderNotDelivery}/>
{/if}
{#if orderNotPhoto}
    <ModalOrderNotPhoto bind:visible={orderNotPhoto}/>
{/if}