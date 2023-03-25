<script context="module" xmlns="http://www.w3.org/1999/html">
    export async function preload(page, session) {
        try {
            const res = await this.fetch(
                    `index.json?city=${page.host.split('.')[0]}&path=${page.path}`
            );
            const json = await res.json();
            return {
                cityMeta: json.cityMeta,
            };
        } catch (e) {
            console.log(e);
        }
    }
</script>
<script>
    import Breadcrumbs from "../components/Breadcrumbs.svelte";
    import Tabbar from "../components/Tabbar.svelte";
    import Button from "../components/Button.svelte";
    import DeliveryCardModal from "../components/DeliveryCardModal.svelte";
    import HelpCategory from "../components/HelpCategory.svelte";
    import { onMount, afterUpdate } from "svelte";
    import { stores } from "@sapper/app";
    import ScrollSpy from "../utils/scrollSpy.js";

    const { page } = stores();


    export let cityMeta;
    const city_name = cityMeta.name;
    const photo_name = cityMeta.shop.delivery_image;

    const photo = photo_name + '.png';
    const photo1_5 = photo_name + '@1.5x.png';
    const photo2 = photo_name + '@2x.png';
    const photo3 = photo_name + '@3x.png';
    const pathlist = [
        {
            'name': 'Доставка цветов',
            'href': '/'
        },
        {
            'name': city_name,
            'href': '#'
        }
    ];
    export let route = '';
    export let long = 45;
    let headers;
    let currentMenuIndex = 0;
    let methods;
    let stages;
    let FAQ;
    let timeoutid;
    const menulist = [
        { name: "Способы доставки", index: 0 },
        { name: "Этапы доставки", index: 1 },
        { name: "Частые вопросы", index: 2 }
    ]

    let deliveryQA = [
        {question:'Как связаться с курьером?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Есть ли самовывоз?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'От чего зависит стоимость доставки?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Можно доставить заказ к точному времени?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Как я узнаю о доставке заказа?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
    ];

    let DeliveryCardModalVisible = false;
    let scrollSpy;
    function goToHeader(e) {
        const index = parseInt(e.detail.header);
        if (timeoutid) {
            clearTimeout(timeoutid);
        }
        scrollSpy.unblock();
        scrollSpy.block();
        window.scroll({
            top: scrollSpy._offsets[index] - 33,
            left: 0,
            behavior: "smooth"
        });
        timeoutid = setTimeout(() => {
            scrollSpy.unblock();
        }, 1000);
        console.log(scrollSpy._offsets[0])
    }


    let countMethods = 0;
    let myMap;
    onMount(() => {

        headers = [methods, stages, FAQ];
        scrollSpy = new ScrollSpy(window, headers);
        const setIndex = e => {
            currentMenuIndex = e.detail.index;
        };
        window.addEventListener("scrollspy-activate", setIndex);

        ymaps.ready(init);
        for (var key in cityMeta.delivery_methods) {
            if(cityMeta.delivery_methods[key] === true) {
                countMethods++;
            }
        }

        const images = document.querySelectorAll("img[data-src]");
        const sources = document.querySelectorAll("source[data-srcset]");
        function callback(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.tagName === "IMG") {
                        entry.target.src = entry.target.dataset.src;
                        entry.target.srcset = entry.target.dataset.srcset;
                        entry.target.removeAttribute("data-src");
                        entry.target.removeAttribute("data-srcset");
                    } else if (entry.target.tagName === "SOURCE") {
                        entry.target.srcset = entry.target.dataset.srcset;
                        entry.target.removeAttribute("data-srcset");
                    }
                    observer.unobserve(entry.target);
                }
            });
        }
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2
        };
        const observer = new IntersectionObserver(callback, options);

        Array.from(images).forEach(image => observer.observe(image));
        Array.from(sources).forEach(source => observer.observe(source));


        return () => {
            images.forEach(image => observer.unobserve(image));
            sources.forEach(source => observer.unobserve(source));
            observer.disconnect();
            scrollSpy.destroy();
            window.removeEventListener("scrollspy-activate", setIndex);
            clearTimeout(timeoutid);
        };
    });

        let myGeoObject;
    function init(){
        myMap = new ymaps.Map("map", {
            center: cityMeta.shop.address.coordinates,
            zoom : 14,
            controls:[],
        });
        let placemark = new ymaps.Placemark(cityMeta.shop.address.coordinates)
        myMap.geoObjects.add(placemark);
    }
    function onQuestionOpenChanged() {
        setTimeout(function() {
            scrollSpy.refresh();
        }, 300);
    }

    afterUpdate(() => {
        const setIndex = e => {
            currentMenuIndex = e.detail.index;
        };
        scrollSpy.destroy();
        window.removeEventListener("scrollspy-activate", setIndex);
        clearTimeout(timeoutid);

        headers = [methods, stages, FAQ];
        scrollSpy = new ScrollSpy(window, headers);
        window.addEventListener("scrollspy-activate", setIndex);
    });

</script>

<style>
    .page {
        min-height: calc(100vh - 5.5rem);
    }
    .header {
        min-height: 332px;
        padding: 118px 80px 0;
    }
    h1 {
        font-size: 48px;
        line-height: 135%;
        margin-top: 8px;
    }
    .header img {
        z-index: -2;
    }
    .header::before {
        content: '';
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 14.82%, var(--color-dark) 100%);
        opacity: 0.7;
        position: absolute;
        z-index: -1;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .header,
    .header :global(a),
    .header :global(li+li::before) {
        color: var(--color-light);
    }
    .breadcrumbs :global(li) {
        font-size: 16px;
    }
    .breadcrumbs :global(li a) {
        opacity: .8;
    }
    .breadcrumbs :global(li a:hover) {
        opacity: 1;
    }
    .delivery__body {
        background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #F2F2F2;
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        border-radius: 4px;
        padding: 48px 80px;
        padding-bottom: 79px;
        border-top: none;
    }

    h2{
        font-weight: bold;
        font-size: 24px;
        color: var(--color-main);
        margin-bottom: 24px;
    }
    h3 {
        font-weight: bold;
        font-size: 18px;
        color: var(--color-main);
        margin-bottom: 12px;
    }
    .delivery__minTime {
        font-weight: normal;
        font-size: 16px;
        color: var(--gray-600);
        margin-bottom: 24px;
    }
    .delivery__Methods_Time {

    }
    .delivery__Method {
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        padding: 24px 30px;
        padding-right: 28px;
    }
    .delivery__Method_free {
        background: #FFFFFF;
    }
    .delivery__Method_interval {
        background: var(--gray-1000);
    }
    .delivery__Method_exact {
        background: var(--gray-200);
    }
    .delivery__Method_icon {
        margin-right: 18px;
    }
    .delivery__Method_text h4 {
        font-size: 16px;
        color: var(--gray-600);
        margin-bottom: 4px;
    }
    .delivery__Method_text p {
        font-weight: 600;
        font-size: 16px;
        color: var(--color-main);
    }
    .delivery__Method_time {
        font-weight: normal;
        font-size: 16px;
        color: var(--color-main);
    }
    .delivery__Method_price {
        font-weight: semibold;
        font-size: 16px;
        color: var(--color-main);
    }
    .route {
        margin-top: 24px;
        font-size: 16px;
        color: var(--gray-600);
    }
    .route span{
        color: var(--color-main);
        font-size: 16px;
    }
    .button {
        margin-top: 34px;
        margin-bottom: 68px;
    }
    .delivery__pickup-text {
        font-weight: normal;
        font-size: 16px;
        line-height: 135%;
        color: var(--color-main);
    }
    .map {
        width: 100%;
        height: 520px;
        margin-top: 30px;
        margin-bottom: 68px;
    }
    .delivery_stage {
        background: var(--color-light);
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        border-radius: 4px;
        margin-right: 24px;
        padding: 18px;
    }
    .delivery_stage:last-child {
        margin-right: 0;
    }
    .delivery_stage-icon {
        margin-right: 18px;
    }
    .delivery_stage-text {
        font-size: 14px;
        line-height: 135%;
        color: var(--color-main);
    }
    .delivery_stage-text a{
        color: var(--color-info);
        border-bottom: 1px dashed var(--color-info);
    }
    .delivery_stage-miniIcon {
        position: absolute;
        right:12px;
        bottom:12px;
    }
    .delivery_stages {
        margin-bottom: 68px;
    }
    .deliveri_FAQ_qs {
        margin-top: -17px;
    }
    .delivery-button {
        font-size:16px
    }
    @media (max-width: 1300px) {
        .delivery__Method {
            padding: 30px 16px;

        }
        .delivery__minTime {
            font-size: 15px;
        }
        .route {
            margin-top: 18px;
            font-size: 15px;
        }
        .route span{
            font-size: 15px;
        }
        .button {
            margin-top: 30px;
        }
        .delivery__Method_text h4 {
            font-size: 15px;
        }
        .delivery__Method_text p {
            font-size: 15px;
        }
        .delivery_stage {
            margin-right: 18px;
        }
        .delivery_stage:last-child {
            margin-right: 0;
        }
        .delivery__Method_time {
            font-size: 15px;
        }
        .delivery__Method_price {
            font-size: 15px;
        }
        .delivery__pickup-text {
            font-size: 15px;
        }
        .delivery-button {
            font-size:15px
        }
    }
    @media (max-width: 1000px) {
        .delivery__body {
            padding: 40px 80px;
            padding-bottom: 63px;
        }

        .route {
            margin-top: 16px;
        }
        .button {
            margin-bottom: 48px;
        }
        .map {
            margin-bottom: 48px;
        }
        .delivery_stage {
            margin-right: 16px;
            padding: 16px;
        }
        .delivery_stage:last-child {
            margin-right: 0;
        }
        .delivery_stage-icon {
            margin-right: 16px;
        }
        .delivery_stages {
            margin-bottom: 48px;
        }
        h2{
            font-size: 22px;
        }
    }
</style>

<div class="page">
    <div class="header image-box relative">
        <img
                class="w-full h-full rounded absolute object-cover inset-0"
                data-src="{photo}"
                data-srcset="{photo},
                {photo1_5} 1.5x,
                {photo2} 2x,
                {photo3} 3x"
                itemprop="image"
                alt="photo" />
        <div class="breadcrumbs">
            <Breadcrumbs {pathlist} />
        </div>
        <h1 class="font-bold">Доставляем цветы по всей России </h1>
    </div>
    <div class="h-full">
        <Tabbar
                pos="top: 5rem;"
                className="sticky"
                bigPadding = true;
                on:change={goToHeader}
                {currentMenuIndex}
                {menulist} />
        <div class="delivery__body">
        <div bind:this={methods} class="delivery__methods">
            <h2 >Способы доставки</h2>
            <h3>Доставка цветов {cityMeta.locativus}, {cityMeta.region}</h3>
            <p class="delivery__minTime">Минимальное время доставки — 60–80 мин</p>
            <div class="delivery__Methods_Time flex">
                {#if cityMeta.delivery_methods.free}
                    <div class="flex delivery__Method delivery__Method_free {countMethods == 2 ? 'w-full' : 'w-auto'}">
                        <div class="delivery__Method_icon flex ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 46 46" fill="none">
                                <path d="M35.3532 23.0004C35.3532 29.9062 29.8409 35.4308 22.9506 35.4308C16.0602 35.4308 10.5479 29.9062 10.5479 23.0004C10.5479 16.0945 16.0602 10.5698 22.9506 10.5698C29.8409 10.5698 35.3532 16.0945 35.3532 23.0004Z" stroke="#330033" stroke-width="2" stroke-miterlimit="10"/>
                                <path d="M7.49658 7.4126L10.4496 10.3722" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M35.5503 35.6279L38.5033 38.5876" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M44.9997 23H40.7671" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5.23271 23H1" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22.9507 1V5.14345" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22.9507 40.8564V45" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M39.1001 7.5L36.1001 10.5" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10.6001 36.1001L7.6001 39.1001" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="delivery__Method_text">
                            <h4><span class="whitespace-nowrap">с 08:00 до 21:00</span>, <span class="whitespace-nowrap"> интервал 2 часа</span></h4>
                            <p>Бесплатная доставка</p>
                        </div>
                    </div>
                {/if}
                {#if cityMeta.delivery_methods.interval}
                    <div class="flex delivery__Method delivery__Method_interval {countMethods == 2 ? 'w-full' : 'w-auto'}">
                        <div class="delivery__Method_icon flex ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="39" viewBox="0 0 46 39" fill="none">
                                <path d="M26.2118 1C23.2915 1 20.5659 1.66749 18.1323 2.81182C24.4596 5.76801 28.8401 12.1572 28.8401 19.5C28.8401 26.8428 24.4596 33.2319 18.1323 36.1881C20.5659 37.3325 23.2915 38 26.2118 38C36.6275 38 44.999 29.7036 44.999 19.5954C45.0963 9.20103 36.6275 1 26.2118 1Z" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8.30074 11.8711L10.5396 16.3531L15.6015 17.1159L11.9024 20.549L12.7786 25.5077L8.30074 23.1237L3.82297 25.5077L4.69903 20.549L1 17.1159L6.06185 16.3531L8.30074 11.8711Z" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="delivery__Method_text">
                            <h4><span class="whitespace-nowrap">с 21:00 до 08:00</span>, <span class="whitespace-nowrap"> интервал 2 часа</span></h4>
                            <p>Стоимость доставки — <span class="whitespace-nowrap">349 ₽</span></p>
                        </div>
                    </div>
                {/if}
                {#if cityMeta.delivery_methods.exact}
                    <div class="flex delivery__Method delivery__Method_exact {countMethods == 2 ? 'w-full' : 'w-auto'}">
                        <div class="delivery__Method_icon flex ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
                                <path d="M45 22.9997C45 35.1404 35.1408 45 23 45C10.8592 45 1 35.1404 1 22.9997C1 10.8589 10.8592 1 23 1C35.1408 1 45 10.8589 45 22.9997Z" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22.9994 8.98535V25.5536L15.8018 20.6373" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M39.6214 23H36.7422" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9.25596 23H6.4043" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22.999 36.7432V39.6223" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="delivery__Method_text">
                            <h4>Доставка к точному времени</h4>
                            <p><span class="delivery__Method_time whitespace-nowrap">с 08:00 до 21:00</span><span class="delivery__Method_price whitespace-nowrap">— 250 ₽</span>,
                                <span class="delivery__Method_time whitespace-nowrap">с 21:00 до 08:00 </span><span class="delivery__Method_price whitespace-nowrap">— 549 ₽</span></p>
                        </div>
                    </div>
                {/if}
            </div>
            {#if route}
                <p class="route">Длина маршрута <span> {cityMeta.shop.name} {cityMeta.shop.address.street} – {route} = {long} км.</span> <br/> Доставка рассчитана из тарифа <span>1 км = 25 ₽</span></p>
            {/if}
            <div class="button">
            <Button textClass="text-base" size="lg" on:click={
            ()=>{DeliveryCardModalVisible = !DeliveryCardModalVisible}}>
                <span class="delivery-button">Рассчитать доставку в другой пункт</span>
            </Button>
            </div>
            <div>
                <h3>Самовывоз</h3>
                <p class="delivery__pickup-text">Возможен самовывоз из нашего магазина по адресу: {cityMeta.name}, {cityMeta.shop.address.street}.</p>
                <p class="delivery__pickup-text mt-8" >Режим работы: ежедневно, {cityMeta.shop.address.openingHours.hours}.</p>
                <div id="map" class="map"></div>
            </div>
        </div>
        <div  bind:this={stages} class="delivery_stages">
            <h2 >Этапы доставки</h2>
            <div class="flex">
                <div class="delivery_stage relative flex">
                    <div class="delivery_stage-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
                            <path d="M46.5909 28.0418C42.0242 28.0418 44.3777 28.103 41.649 28.103C41.649 28.103 37.3555 29.0086 37.3555 22.9474C37.3555 19.0647 37.3555 20.6948 37.3555 16.4219H41.649C44.3752 16.4219 46.5909 18.5979 46.5909 21.2765V28.0418Z" stroke="#E71F75" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18.2374 47.0004C21.2346 47.0004 23.6643 44.6134 23.6643 41.6688C23.6643 38.7242 21.2346 36.3372 18.2374 36.3372C15.2402 36.3372 12.8105 38.7242 12.8105 41.6688C12.8105 44.6134 15.2402 47.0004 18.2374 47.0004Z" stroke="#E71F75" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M35.6163 47.0004C38.6135 47.0004 41.0432 44.6134 41.0432 41.6688C41.0432 38.7242 38.6135 36.3372 35.6163 36.3372C32.6191 36.3372 30.1895 38.7242 30.1895 41.6688C30.1895 44.6134 32.6191 47.0004 35.6163 47.0004Z" stroke="#E71F75" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M31.4562 38.2506L30.4893 38.506C30.5844 38.8659 30.8716 39.1433 31.2346 39.2258C31.5977 39.3083 31.9765 39.1822 32.2178 38.8986L31.4562 38.2506ZM41.0394 41.8784L40.0401 41.8391C40.0295 42.1109 40.13 42.3753 40.3185 42.5714C40.507 42.7675 40.7673 42.8784 41.0394 42.8784V41.8784ZM45.589 37.034C45.589 39.1389 43.8427 40.8784 41.6472 40.8784V42.8784C44.9092 42.8784 47.589 40.2811 47.589 37.034H45.589ZM45.589 21.4192V37.034H47.589V21.4192H45.589ZM41.6472 17.5723C43.8394 17.5723 45.589 19.3162 45.589 21.4192H47.589C47.589 18.1753 44.9073 15.5723 41.6472 15.5723V17.5723ZM36.2356 17.5723H41.6472V15.5723H36.2356V17.5723ZM32.2988 21.4192C32.2988 19.3148 34.0447 17.5723 36.2356 17.5723V15.5723C32.9741 15.5723 30.2988 18.1766 30.2988 21.4192H32.2988ZM32.2988 37.034V21.4192H30.2988V37.034H32.2988ZM32.423 37.9953C32.3421 37.6889 32.2988 37.367 32.2988 37.034H30.2988C30.2988 37.5412 30.3649 38.0347 30.4893 38.506L32.423 37.9953ZM35.6191 35.3372C33.6447 35.3372 31.8737 36.2167 30.6945 37.6026L32.2178 38.8986C33.0287 37.9456 34.2489 37.3372 35.6191 37.3372V35.3372ZM42.0435 41.6689C42.0435 38.1558 39.1509 35.3372 35.6191 35.3372V37.3372C38.079 37.3372 40.0435 39.2928 40.0435 41.6689H42.0435ZM42.0386 41.9177C42.0418 41.8351 42.0435 41.7521 42.0435 41.6689H40.0435C40.0435 41.7259 40.0424 41.7827 40.0401 41.8391L42.0386 41.9177ZM41.6472 40.8784H41.0394V42.8784H41.6472V40.8784Z" fill="#E71F75"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M31.1895 41.6698C31.1895 39.2941 33.1547 37.3381 35.6163 37.3381C38.078 37.3381 40.0432 39.2941 40.0432 41.6698C40.0432 44.0454 38.078 46.0014 35.6163 46.0014C33.1547 46.0014 31.1895 44.0454 31.1895 41.6698ZM35.6163 35.3381C32.0836 35.3381 29.1895 38.1563 29.1895 41.6698C29.1895 45.1832 32.0836 48.0014 35.6163 48.0014C39.149 48.0014 42.0432 45.1832 42.0432 41.6698C42.0432 38.1563 39.149 35.3381 35.6163 35.3381Z" fill="#E71F75"/>
                            <path d="M18.3408 11.2532H0.959961" stroke="#E71F75" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.72571 17.585H0.959961" stroke="#E71F75" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M30.377 21.4191C30.377 18.2217 33.0155 15.6506 36.2359 15.6506H41.6474C44.8666 15.6506 47.5115 18.2205 47.5115 21.4191V37.0339C47.5115 40.2357 44.8685 42.7999 41.6474 42.7999H41.0396C40.7887 42.7999 40.5487 42.6978 40.3749 42.5171C40.201 42.3364 40.1083 42.0927 40.1181 41.8422C40.1204 41.7848 40.1215 41.727 40.1215 41.669C40.1215 39.2478 38.1203 37.259 35.6194 37.259C34.2259 37.259 32.9843 37.8777 32.159 38.8476C31.9365 39.1091 31.5871 39.2253 31.2523 39.1493C30.9174 39.0733 30.6525 38.8177 30.5649 38.4859C30.4421 38.0211 30.377 37.5343 30.377 37.0339V21.4191ZM36.2359 17.4938C34.0039 17.4938 32.2213 19.2696 32.2213 21.4191V36.3869C33.2044 35.7717 34.3706 35.4158 35.6194 35.4158C38.8643 35.4158 41.5607 37.8228 41.9242 40.9476C44.0292 40.8086 45.6672 39.0947 45.6672 37.0339V21.4191C45.6672 19.2708 43.8807 17.4938 41.6474 17.4938H36.2359Z" fill="#E71F75"/>
                            <path d="M9.65975 5.77362C9.65975 3.61928 11.4446 1.84316 13.6795 1.84316H32.5127C34.7485 1.84316 36.5375 3.62275 36.5375 5.77362V15.6506H38.3819V5.77362C38.3819 2.57245 35.7344 0 32.5127 0H13.6795C10.4568 0 7.81543 2.57082 7.81543 5.77362C7.81543 6.28259 8.2283 6.6952 8.73759 6.6952C9.24689 6.6952 9.65975 6.28259 9.65975 5.77362Z" fill="#E71F75"/>
                            <path d="M29.849 41.7409C29.849 41.4841 29.7697 41.1591 29.8001 40.9107H24.4136C24.444 41.1591 24.4597 41.4122 24.4597 41.669C24.4597 42.0392 24.4271 42.4017 24.3647 42.7538H29.849C29.7866 42.4017 29.849 42.1112 29.849 41.7409Z" fill="#E71F75"/>
                            <path d="M7.81543 36.9879C7.81543 39.5369 9.65944 41.7403 11.9743 42.5066C11.9417 42.2496 11.9743 41.9967 11.9743 41.7307C11.9743 41.3285 11.9929 40.9066 12.0663 40.526C10.7485 39.877 9.65975 38.5085 9.65975 36.9879V22.817C9.65975 22.308 9.24689 21.8954 8.73759 21.8954C8.2283 21.8954 7.81543 22.308 7.81543 22.817V36.9879Z" fill="#E71F75"/>
                        </svg >
                    </div>
                        <p class="delivery_stage-text">Как только заказ передан в доставку, мы пришлём вам уведомления по e-mail и СМС</p>
                        <svg class="delivery_stage-miniIcon" xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12" fill="none">
                            <path d="M1 6H21M21 6L15.8718 1M21 6L15.8718 11" stroke="#330033" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                 </div>
                    <div class="delivery_stage relative flex">
                        <div class="delivery_stage-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <g clip-path="url(#clip0)">
                                    <path d="M21.3654 3.86445L19.3634 2.25869C19.3634 2.25869 17.8407 7.17252 17.8408 10.4386C17.8409 11.2448 17.9089 12.0444 18.0576 12.8052C18.2213 13.6434 18.4829 14.4345 18.8592 15.1354M21.3654 3.86445L23.9384 1.02466L26.6307 3.86445M21.3654 3.86445L23.9384 6.47572M18.8592 15.1354C19.7812 16.8531 21.3918 18.0291 23.9384 18.0291C28.3127 18.0291 29.9254 14.5856 30.0588 10.7765C30.1785 7.35968 28.5802 2.25869 28.5802 2.25869C26.3215 4.12205 22.1243 8.07757 19.9099 10.7765C18.0229 13.0765 18.8592 15.1354 18.8592 15.1354Z" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M21.54 30.3938C21.54 29.0391 22.6458 27.9333 24.0005 27.9333C25.3551 27.9333 26.4609 29.0391 26.4609 30.3938C26.4609 31.7484 25.3551 32.8542 24.0005 32.8542C22.6458 32.8542 21.54 31.7484 21.54 30.3938Z" stroke="#E71F75" stroke-width="2"/>
                                    <path d="M24.001 46.9834C26.9824 42.9719 31.9315 36.8226 32.1885 31.5169C32.4578 25.9553 28.899 22.8311 24.001 22.8311" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M24.001 46.9834C21.0196 42.9719 16.0704 36.8226 15.8135 31.5169C15.5441 25.9553 19.103 22.8311 24.001 22.8311" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M19.4427 20.389C15.9119 19.3094 12.5646 19.0837 11.1494 19.1582C11.1494 19.1582 11.2882 22.3692 12.9383 26.7667" stroke="#E71F75" stroke-width="2" stroke-linecap="round"/>
                                    <path d="M28.5749 20.389C32.1056 19.3094 35.453 19.0837 36.8682 19.1582C36.8682 19.1582 36.7293 22.3692 35.0793 26.7667" stroke="#E71F75" stroke-width="2" stroke-linecap="round"/>
                                    <path d="M31.1406 44.8671C40.3533 41.8892 46.9993 33.4194 46.9993 23.4358C46.9993 14.362 41.5094 6.53863 33.5922 2.95239" stroke="#E71F75" stroke-width="2" stroke-linecap="round"/>
                                    <path d="M16.8877 44.8671C7.67497 41.8892 1.02904 33.4194 1.02904 23.4358C1.02904 14.362 6.51888 6.53863 14.4361 2.95239" stroke="#E71F75" stroke-width="2" stroke-linecap="round"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0">
                                        <rect width="48" height="48" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <p class="delivery_stage-text">
                            Во время доставки вы сможете отследить курьера на карте <a href="/profile">в личном кабинете</a>
                        </p>
                        <svg class="delivery_stage-miniIcon" xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12" fill="none">
                            <path d="M1 6H21M21 6L15.8718 1M21 6L15.8718 11" stroke="#330033" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                        <div class="delivery_stage relative flex">
                            <div class="delivery_stage-icon">
                                <svg  xmlns="http://www.w3.org/2000/svg" width="28" height="48" viewBox="0 0 28 48" fill="none">
                                    <path d="M1 41L27 41" stroke="#E71F75" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M11 4.51929L17 4.51928" stroke="#E71F75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M1 8L27 8" stroke="#E71F75" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <rect x="1" y="1" width="26" height="46" rx="3" stroke="#E71F75" stroke-width="2"/>
                                    <path d="M12.3757 29H16.5C17.4293 29 17.894 29 18.2804 28.9231C19.8671 28.6075 21.1075 27.3671 21.4231 25.7804C21.5 25.394 21.5 24.9293 21.5 24C21.5 23.0707 21.5 22.606 21.4231 22.2196C21.1075 20.6329 19.8671 19.3925 18.2804 19.0769C17.894 19 17.4293 19 16.5 19H11.5C10.5707 19 10.106 19 9.71964 19.0769C8.13288 19.3925 6.89249 20.6329 6.57686 22.2196C6.5 22.606 6.5 23.0707 6.5 24C6.5 24.9293 6.5 25.394 6.57686 25.7804C6.84292 27.118 7.76613 28.2094 9 28.7083" stroke="#E71F75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M12.2578 29.2765C10.967 31.4233 7.96132 31.5655 7.96132 31.5655C8.90629 30.308 8.98946 28.8504 8.98946 28.8504" stroke="#E71F75" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <p class="delivery_stage-text">
                                После вручения заказа вы также получите уведомление о доставке и фото получателя
                            </p>
                            <svg class="delivery_stage-miniIcon" xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10" fill="none">
                                <path d="M14 1L6 9L1 4" stroke="#330033" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
            </div>
        </div>
        <div class="deliveri_FAQ" bind:this={FAQ}>
            <h2  class="">Частые вопросы</h2>
            <div class="deliveri_FAQ_qs">
                <HelpCategory className="questions-category_withoutMargin" qaList={deliveryQA} {onQuestionOpenChanged}></HelpCategory>
            </div>
        </div>
    </div>
    </div>
</div>
{#if DeliveryCardModalVisible}
    <DeliveryCardModal city={city_name} shop_name={cityMeta.shop.name} shop_address={cityMeta.shop.address.street} bind:visible={DeliveryCardModalVisible} bind:route={route}/>
{/if}