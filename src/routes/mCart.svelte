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

    import {onMount, afterUpdate} from "svelte";
    import MiniButton from '../mobileComponents/MiniButton.svelte';
    import MiniProductCart from '../mobileComponents/MiniProductCart.svelte';
    import Slider from "../mobileComponents/Slider.svelte";
    import ProductCart from '../mobileComponents/ProductCart.svelte';
    import Button from '../mobileComponents/Button.svelte';
    import {orderStore} from "../stores/order.js";
    import Popup from '../mobileComponents/Popup.svelte'
    import Coupon from '../mobileComponents/CouponCart.svelte';
    import Calendar from '../mobileComponents/Calendar.svelte';
    import DatePicker from '../mobileComponents/DatePicker.svelte';
    import ConfirmModal from "../mobileComponents/ConfirmModal.svelte";
    import ChangeProduct from "../mobileComponents/ChangeProduct.svelte";
    import ModalDeliveryTime from "../mobileComponents/ModalDeliveryTime.svelte";


    function deleteOrderListItem({detail}) {
        orderStore.deleteFromOrderList(detail.flower);
    }

    export let orderList;
    export let cityMeta;


    let y;
    let myStorage;
    onMount(() => {
        myStorage = window.localStorage.path;
        document.body.style.overflow = 'scroll'
        const images = document.querySelectorAll("img[data-src]");
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2
        };

        function callback(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.dataset.src;
                    observer.unobserve(entry.target);
                }
            });
        }

        const observer = new IntersectionObserver(callback, options);

        Array.from(images).forEach(image => observer.observe(image));

        return () => {
            images.forEach(image => observer.unobserve(image));
            observer.disconnect();
        };
    })
    export const recomendationProducts = [
        {
            name: 'Шикарный букет разноцветных роз',
            extra: '%',
            share: 'Новинка',
            rating: '5',
            price: 3500,
            photo: '/recommendation.png',
            size: {
                height: 25,
                width: 25
            },
        },
        {
            name: 'Шикарный букет разноцветных роз',
            rating: '5',
            price: 3500,
            photo: 'recommendation.png',
            size: {
                height: 25,
                width: 25
            },
        },
        {
            name: 'Шикарный букет разноцветных роз',
            rating: '5',
            price: 3500,
            chip: 3800,
            photo: './recommendation.png',
            size: {
                height: 25,
                width: 25
            },
        },
        {
            name: 'Шикарный букет разноцветных роз',
            rating: '5',
            price: 3500,
            photo: '/recommendation.png',
            size: {
                height: 25,
                width: 25
            },
        },
        {
            name: 'Шикарный букет разноцветных роз',
            rating: '5',
            price: 3500,
            chip: 3800,
            photo: './recommendation.png',
            size: {
                height: 25,
                width: 25
            },
        },
        {
            name: 'Шикарный букет разноцветных роз',
            rating: '5',
            price: 3500,
            photo: '/recommendation.png',
            size: {
                height: 25,
                width: 25
            },
        },
        {
            name: 'Духи GUERLAIN 250 мл ',
            rating: '5',
            price: 3500,
            chip: 3800,
            photo: './recommendation.png',
            size: {
                height: 25,
                width: 25
            },
        },
        {
            name: 'Духи GUERLAIN 250 мл ',
            rating: '5',
            price: 3500,
            photo: '/recommendation.png',
            size: {
                height: 25,
                width: 25
            },
        }
    ]
    export let postCart = {
        cost: 55,
        count: 2
    }
    export let delivery = {
        cost: 55,
        address: 'Pushkina, d kolotushkina',
        date: '22 августа 2020, в течение 120 мин'
    }

    export let coupons = [
        {
            text: 'Купон нового пользователя',
            color: '#FFDC00',
            promo: 'CVETI200',
            price: 555
        },
        {
            text: 'Купон на первый заказ',
            color: '#FFDCCC',
            promo: 'CVETI400',
            price: 250
        },
    ]
    export let order = {
        delivery: true
    }
    let couponCount = 2
    let promoCode;
    let summOrder = 123567;
    let couponVis = false;
    let deliveryDateVis = false;
    let deliveryTimeVis = false;
    let pickUpDateVis = false;
    let pickUpTimeVis = false;

    function openCoupons() {
        couponVis = !couponVis
    }

    function changeMethod() {
        order.delivery = !order.delivery
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

    function checkData() {
        if (order.delivery) {
            if (Timedelivery == '' && selectedDateDelivery == '') {
                errorText = 'Выберите дату и время доставки, чтобы перейти к оформлению заказа'
                dateError = true
            } else if (Timedelivery != '' && selectedDateDelivery == '') {
                errorText = 'Выберите дату доставки, чтобы перейти к оформлению заказа'
                dateError = true
            } else if (Timedelivery == '' && selectedDateDelivery != '') {
                errorText = 'Выберите время доставки, чтобы перейти к оформлению заказа'
                dateError = true
            } else if (Timedelivery != '' && selectedDateDelivery != '') {
                dateError = false
            }
        } else {
            if (TimePickup == '' && selectedDatePickup == '') {
                errorText = 'Выберите дату и время самовывоза, чтобы перейти к оформлению заказа'
                dateError = true
            } else if (TimePickup != '' && selectedDatePickup == '') {
                errorText = 'Выберите дату самовывоза, чтобы перейти к оформлению заказа'
                dateError = true
            } else if (TimePickup == '' && selectedDatePickup != '') {
                errorText = 'Выберите время самовывоза, чтобы перейти к оформлению заказа'
                dateError = true
            } else if (TimePickup != '' && selectedDatePickup != '') {
                dateError = false
            }
        }
        if (dateError == false) {
            document.location.href = "/mOrdering"
        }
    }

    $: if (dateError == true) {
        setTimeout(() => {
            dateError = false
        }, 2500)
    }
let changedProduct;
    let pressPromo = false;

  $:if(promoCode) {
      if(promoCode.toString().length == 4) {
          pressPromo = true
      } else {
          pressPromo = false
      }
  }
</script>

<style>

    .padding {
        padding-left: 16px;
        padding-right: 16px;
    }
    h3 {
        font-weight: 600;
        font-size: 16px;
        color: var(--color-main);
        margin-bottom: 16px;
        margin-top: 30px;
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
    .product {
        padding-bottom: 18px;
    }
    .product__line {
        border-bottom: 1px solid var(--gray-300);
        margin: 0 16px;
        margin-bottom: 18px;
    }
    .product:last-child {
        margin-bottom: 0;
    }
    .gift {
        margin-right: 9px;
        min-width: 134px;
        max-width:134px;
    }
    .gift:last-child {
        margin-right: 0;
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
    .coupons {
        padding-top: 30px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--gray-300);
        border-top: 1px solid var(--gray-300);
        margin: 0 16px;
    }
    .coupons__button {
        min-width: 110px;
        height: 33px;
        background: var(--gray-300);
        border-radius: 16px;
    }
    .promo input {
        width: 100%;
        margin-top: 18px;
        border-bottom: 1px solid var(--gray-300);
        padding-bottom: 11px;
    }
  .promo  input:hover {
        outline: 0;
        outline-offset: 0;
      border-bottom: 1px solid var(--color-info );
    }

   .promo input::-webkit-input-placeholder {
       color: var(--gray-700);
       font-size: 15px;
       line-height: 135%;
    }
   .promo input::-moz-placeholder {
        color: var(--gray-700);
       font-size: 15px;
       line-height: 135%;
    }
   .promo__button{
       background: var(--color-info);
       border-radius: 16px;
       padding: 6px;
       color:white;
       right: 0;
       top: 10px;
       font-size: 14px;
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
    .delivery {
        margin-bottom: 27px;
    }
    .delivery__miniButton {
           min-width: 22px;
        height: 22px;
        background: var(--gray-300);
        border-radius: 50%;
    }
    .footer {
        position: sticky;
        bottom:0;
        height: 76px;
        background: #FFFFFF;
        border-top: 1px solid var(--gray-300);
        box-shadow: 4px 0 4px 4px rgba(0, 0, 0, .05);
        font-weight: 600;
        font-size: 16px;
        color: var(--color-main);
    }
    .footer__popup {
        background: #FFFFFF;
        border-top: 1px solid var(--gray-300);
        padding: 12px 16px;
        box-shadow: 4px 0 4px 4px rgba(0, 0, 0, .05);
        position: sticky;
        margin: 0 -16px -16px -16px;
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
    .copyed {
        display: flex;
        background: rgba(51, 0, 51, 0.8);
        border-radius: 16px;
        font-size: 13px;
        line-height: 140%;
        text-align: center;
        color: var(--color-light);
        position: absolute;
        left:16px;
        width: calc(100% - 32px);
        z-index: 99999;
        animation: copyed 2500ms cubic-bezier(0.8, 0, 0.33, 1);
        padding: 16px;
    }
    .emptyCart {
        text-align: center;
    }

    @keyframes copyed {
        from {
            background: rgba(51, 0, 51, 0.8);
            opacity: 1;
        }
        to {
            background: rgba(51, 0, 51, 0);
            opacity: 0;
        }
    }
</style>
<svelte:window bind:scrollY={y}/>
<div class="cart">
    <div class="headers__buttons flex justify-between padding items-center {y > 150 ? 'headers__buttons_scrolled' : ''}">
        <div>
            <a href="{myStorage}">
                <MiniButton type="back"/>
            </a>
        </div>
        {#if y > 150}
            <h2 >
                Мой заказ
            </h2>
        {/if}
        <div>
            {#if orderList}
            <div on:click={openDeleteModal}>
                <MiniButton type="basket"/>
            </div>
            {/if}
        </div>
    </div>
    <div class="cart__body ">
        <h2 class="page__name mb-24 padding whitespace-nowrap">Мой заказ</h2>
        {#if orderList}
            {#each orderList as item}
                <div class="product">
                    <MiniProductCart on:delete-item={deleteOrderListItem} flower={item.flower}/>
                </div>
                <div class="product__line padding"></div>
            {/each}
            <div class="flex justify-between items-center padding infoText">
                <div>Открытка</div>
                <div>{postCart.count}</div>
                <div>{postCart.cost}  ₽</div>
            </div>
            <div class="flex justify-between items-center padding infoText mt-14 pb-18">
                <div>Доставка</div>
                <div>{delivery.cost}  ₽</div>
            </div>
            <div class="coupons  flex justify-between items-center infoText">
                <div>Купоны</div>
                <div class="coupons__button  flex items-center justify-center" on:click={openCoupons}>
                    {#if coupons}
                        Доступно: {couponCount}
                    {:else}
                        Получить
                    {/if}
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none" class="ml-8">
                        <path d="M1 9.50024L5 5.50024L1 1.50024" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div class="padding">
                <div class="promo relative">
                    <input type="number" bind:value={promoCode} placeholder="Промокод" onkeypress="this.value=this.value.substring(0,3);">
                    {#if pressPromo}
                        <div class="absolute promo__button">Применить</div>
                    {/if}

                </div>
            </div>
            <h3 class="padding">Добавьте подарок к заказу</h3>
            <Slider>
                {#each recomendationProducts as  product}
                    <div class="gift">
                        <ProductCart product={product}/>
                    </div>
                {/each}
            </Slider>
            <h3 class="padding">Получение заказа</h3>
            <div class="delivery padding">
                <div class="delyvery__buttons flex items-center">
                    <div class="delyvery__button flex justify-center {order.delivery == false ? 'activeButton' : ''} ml-2" on:click={changeMethod}>Самовывоз</div>
                    <div class="delyvery__button flex justify-center {order.delivery == true ? 'activeButton' : ''} mr-2" on:click={changeMethod}>Доставка</div>
                </div>
                {#if order.delivery == true}
                    <div class="mt-24">
                        <span class="subText">Ближайшая дата доставки:</span><span class="infoText ml-2">{delivery.date}</span>
                    </div>
                    <div class="mt-8">
                        <span class="subText">Местное время:</span> <span class="infoText ml-2">18:00, 04.08.2020</span>
                    </div>
                    <div class="flex justify-between mb-18 mt-24" on:click={opendeliveryDateVis}>
                        <div class="flex items-center infoText">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none" class="mr-8">
                                <path d="M15 15.4433C15 16.3011 14.1823 17 13.1695 17H2.83038C1.82178 17 1 16.3047 1 15.4433V3.8367C1 2.97892 1.81763 2.28001 2.83038 2.28001H13.1695C14.1823 2.28001 15 2.97892 15 3.8367V15.4433Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11.5 1.00006L11.5 3.56007" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4.5 1.00006L4.5 3.56007" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M1 6.36898H15" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            {#if selectedDateDelivery}
                                {formatDate(selectedDateDelivery)}
                            {:else}
                                Дата доставки
                            {/if}

                        </div>
                        <div class="delivery__miniButton flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none" >
                                <path d="M1 9.50024L5 5.50024L1 1.50024" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="flex justify-between" on:click={opendeliveryTimeVis}>
                        <div class="flex items-center infoText">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="mr-8">
                                <path d="M17 8.99994C17 13.4148 13.4148 17.0001 9 17.0001C4.58517 17.0001 1 13.4148 1 8.99994C1 4.58511 4.58517 1.00006 9 1.00006C13.4148 1.00006 17 4.58511 17 8.99994Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9.00013 3.90359V9.9284L6.38281 8.14068" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            {#if Timedelivery}
                                {Timedelivery}
                            {:else}
                                Время доставки
                            {/if}
                        </div>
                        <div class="delivery__miniButton flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none" >
                                <path d="M1 9.50024L5 5.50024L1 1.50024" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                {:else}
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
                    <div class="mt-18">
                        <span class="subText">Ближайшая дата самовывоза:</span><span class="infoText ml-2">{delivery.date}</span>
                    </div>
                    <div class="mt-8">
                        <span class="subText">Местное время:</span> <span class="infoText ml-2">18:00, 04.08.2020</span>
                    </div>
                    <div class="flex justify-between mb-18 mt-24" on:click={openpickUpDateVis}>
                        <div class="flex items-center infoText">
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
                    <div class="flex justify-between" on:click={openpickUpTimeVis}>
                        <div class="flex items-center infoText">
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
                {/if}
            </div>

            <div class="footer flex padding justify-between items-center">
                <div>{summOrder} ₽</div>
                <div>
                    <Button status='active-main' size="lg" on:click={checkData}>Далее</Button>
                </div>
            </div>
        {:else}
        <div class="emptyCart h-full padding">
            <div class="flex justify-center mb-34 mt-34">
                <img src="emptyCartAnimal.png" alt="sad fox">
            </div>
            <h3>Ничего нет</h3>
            <p class="subText">Выберите букет и добавьте его к заказу</p>
                <Button size="full" className="mt-34"><a href="/mobileCatalog">Перейти в каталог</a></Button>
        </div>
        {/if}
</div>

</div>
{#if couponVis}
    <Popup title="Купоны" bind:visible={couponVis} size="height: auto; width:100%; z-index:9999;">
        {#each coupons as coupon}
        <div class="mb-18">
            <Coupon price={coupon.price} text={coupon.text}/>
        </div>
        {/each}
        <Button size="full" className="mt-34">Применить</Button>
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
        <ModalDeliveryTime bind:visible={deliveryTimeVis} bind:selectedTimedelivery={selectedTimedelivery} bind:Timedelivery={Timedelivery}/>
       <!-- <div class="pickupHours">
           {#each deliveryHours as item}deliveryHours
               <div class="pickupHour flex justify-center items-center {selectedTimedelivery == item ? 'selectedPickupHour' : ''}"
                    on:click={()=>{selectedTimedelivery = item}}>
                   {item}
               </div>
           {/each}
       </div>
       -->
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
{#if deleteModalVis}
<ConfirmModal text="Очистить корзину?" confirm="Ок" cancel="Отмена" bind:visible={deleteModalVis} on:functionConfirm={deleteAllOrder}/>
{/if}

<div class="hidden flex justify-center items-center"
     style="top: calc(50vh + {y - 25}px);" class:copyed={dateError}>{errorText}</div>
