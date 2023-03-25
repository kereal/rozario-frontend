<script context="module" xmlns="http://www.w3.org/1999/html">
    export async function preload(page, session) {
        try {
            const res = await this.fetch(
                    `index.json?city=${page.host.split('.')[0]}&path=${page.path}`
            );
            const json = await res.json();
            return {
                cityMeta: json.cityMeta,
                testimonials: json.testimonials,
            };
        } catch (e) {
            console.log(e);
        }
    }
</script>
<script>
    import Button from "../components/Button.svelte";
    import TextInput from "../components/TextInput.svelte";
    import CustomCheckbox from "../components/CustomCheckbox.svelte";
    import OutlineRadio from "../components/OutlineRadio.svelte";
    import SelectLabel from "../components/SelectLabel.svelte";
    import TelInput from "../components/TelInput.svelte";
    import RegistrationRequisitesData from "../components/RegistrationRequisitesData.svelte";

    import debounce from "lodash-es/debounce";

    import {stores} from "@sapper/app";
    import {onMount, afterUpdate} from "svelte";
    import HeaderBusinessRegistration from "../components/HeaderBusinessRegistration.svelte";
    import WorkingHours from "../components/WorkingHours.svelte";


    export let cityMeta;
    let mapMarkers = []
    const city_name = cityMeta.name;
    export let markers = [[69.043322, 33.052232], [69.023322, 33.082232], [69.023322, 33.062232]]
    export let status = 'name';

    let minTimeList = [];
    let priceList = []
    let priceOneKm = []
    let pricePicking = []
    let deliveryRadius = []
    let exactTime = []

    for (let i = 30; i <= 120; i = i + 10) {
        minTimeList.push(i);
    }
    for (let i = 0; i <= 1000; i = i + 50) {
        priceList.push(i + ' ₽')
    }
    for (let i = 10; i <= 30; i = i + 5) {
        priceOneKm.push(i + ' ₽')
    }
    for (let i = 0; i <= 200; i = i + 50) {
        pricePicking.push(i + ' ₽')
    }
    for (let i = 10; i <= 30; i = i + 5) {
        deliveryRadius.push(i + ' км')
    }
    for (let i = 50; i <= 1000; i = i + 50) {
        exactTime.push(i + ' ₽')
    }
    export let shop = {
        name: '',
        sity: '',
        address: '',
        storeView: 'Магазин с отдельным входом',
        time:{
            usual: [
                {
                    name:'weekdays',
                    select: false,
                    text:'Будни',
                    value:'Пн-Пт 9:00–21:00'
                },
                {
                    name:'weekend',
                    select: false,
                    text:'Выходные',
                    value:'Сб-Вс 10:00-20:00'
                },
                {
                    name:'breaking',
                    select: false,
                    text:'Перерыв',
                    value:'Перерыв 13:00-14:00'
                },
                {
                    name:'daily',
                    select: false,
                    text:'Ежедневно',
                    value:'Ежедневно 9:00–21:00'
                },
                {
                    name:'round',
                    select: false,
                    text:'24/7',
                    value:'Круглосуточно'
                }
            ],
            dates:[]
        },
        contacts: {
            phone: '',
            email: 'needmoney@gmail.com',
            Incontact: '',
            Facebook: '',
            Instagram: '',
            Classmates: '',
            Twitter: '',
            Whatsapp: '',
            Viber: '',
            Telegram: '',
            Youtube: '',
            WebSite: ''
        },
        deliveryTime: {
            min: 'Выберите количество минут',
            periods: [
                {name: 'Доставка к точному времени с 21:00 до 09:00', price: 0, selected: true},
                {name: 'Доставка интервал 2 часа с 21:00 до 09:00', price: 0, selected: true},
                {
                    name: 'Доставка к точному времени  с 09:00 до 21:00',
                    price: 'Выберите стоимость доставки',
                    selected: true
                },
                {name: 'Доставка интервал 2 часа с 09:00 до 21:00', price: 0, selected: false},
                {name: 'Самовывоз', price: 0, selected: false},
            ],
            options: [
                {name: 'Доставка к точному времени с 21:00 до 09:00', selected: true},
                {name: 'Доставка интервал 2 часа с 21:00 до 09:00', selected: true},
                {name: 'Доставка к точному времени  с 09:00 до 21:00', selected: true},
                {name: 'Доставка интервал 2 часа с 09:00 до 21:00', selected: false},
            ],
            pricePicking: 'Выберите стоимость',
            priceOneKm: 'Выберите стоимость',
            deliveryRadius: 'Выберите радиус',
            exactTime: 'Выберите стоимость'
        }
    }
    let selectedStoreView = ''

    let myMap;
    let forScroll;

    function toScroll() {
        window.scroll({
            top: forScroll + 10,
            left: 0,
            behavior: "smooth"
        });
    }

    onMount(() => {
        forScroll = document.getElementById('businessHeader')
    })

    function handleInvalid(e) {
        e.preventDefault();
        validateFormInput(e);
    }

    function validateFormInput(e) {
        const elem = document.querySelector(
                `#form-user-data .validation .${e.target.name}`
        );
        console.log("elem", elem, e.target.name, e.target.validity);
        console.log('target', e.target)
        if (e.target.validity.valueMissing) {
            e.target.classList.add("error");
            elem.classList.remove("invisible");
            elem.textContent = errorText[e.target.name].valueMissing;
        } else if (e.target.validity.typeMismatch) {
            e.target.classList.add("error");
            elem.classList.remove("invisible");
            elem.textContent = errorText[e.target.name].typeMismatch;
        } else {
            e.target.classList.remove("error");
            elem.classList.add("invisible");
        }
    }

    let once = false;
    $: if (status) {
        if (status == 'address') {
            if (once == false) {
                once = true;

                function init() {
                    myMap = new ymaps.Map("shopOnMap", {
                        center: cityMeta.shop.address.coordinates,
                        zoom: 5
                    });
                    markers.forEach((element) => {
                        let placemark = new ymaps.Placemark(element, {
                            hintContent: 'Собственный значок метки',
                            balloonContent: 'Это красивая метка'
                        }, {
                            // Опции.
                            // Необходимо указать данный тип макета.
                            iconLayout: 'default#image',
                            // Своё изображение иконки метки.
                            iconImageHref: 'mapMarker.png',
                            // Размеры метки.
                            iconImageSize: [32, 32],
                            // Смещение левого верхнего угла иконки относительно
                            // её "ножки" (точки привязки).
                            iconImageOffset: [-5, -38]
                        })
                        mapMarkers.push(placemark)
                    });
                    mapMarkers.forEach((element) => {
                        myMap.geoObjects.add(element);
                    })
                }

                ymaps.ready(init);
            }
        }
    }
</script>

<style>
    .wrapper{
        margin-bottom: 10px;
        min-width: 100%;
        min-height: calc(100vh - 100px);
        background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #F2F2F2;
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        padding: 68px 80px 80px 80px;
    }
    .content {
        width: 100%;
        min-height: 542px;
        background: var(--color-light);
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        border-radius: 4px;
        position:relative;
        padding-bottom: 122px;
    }
    .content__header {
        background: var(--gray-200);
        height: 71px;
    }
    .content__body {
        padding: 40px 44px 34px 44px;
    }
    h2 {
        font-weight: bold;
        font-size: 24px;
        color: var(--color-main);
        margin-bottom: 12px;
    }
    h3 {
        font-weight: 600;
        font-size: 18px;
        color: var(--color-main);
        margin-bottom: 12px;
    }
    .descriptText {
        font-size: 16px;
        line-height: 130%;
        color: var(--gray-600);
    }
    .input {
        width: 498px;
    }
    .label-text {
        @apply text-gray-600 inline-block;
        margin-bottom: 8px;
        font-size: 13px;
    }
    .buttons {
        position:absolute;
        bottom: 34px;
        left:44px
    }
    .map {
        width: 40%;
        height: 287px;
        margin-left: 24px;
    }
    .footnote {
        font-size: 14px;
        color: var(--gray-600);
    }
    .AddButton {
        font-size: 14px;
        color: var(--color-info-light);
    }
    .phoneImg {
        min-width: 296px;
        max-width: 296px;
        margin-bottom: -100px;
        margin-left: 24px;
    }
    .mini-text {
        font-size: 14px;
        color: var(--gray-600);
    }
    .miniImg {
        min-width: 153px;
        max-height: 46px;
    }
    .addressCheckBoxes {
        display: flex;
    }
    @media (max-width: 1400px) {
        .addressCheckBoxes {
            display: block;
        }
        .addressCheckBoxes div{
            margin-top: 12px;
        }
    }
    @media (max-width: 1300px) {
        .content__body {
            padding: 30px 44px 34px 44px;
        }
    }
    @media (max-width: 1100px) {
        .phoneImg {
            display: none;
        }
    }
    @media (max-width: 1048px) {
        .content__body {
            padding: 30px 34px 34px 34px;
        }
        .buttons {
            position:absolute;
            bottom: 34px;
            left:34px
        }
        .addressCheckBoxes {
            display: flex;
        }
        .map {
            display: none;
        }
        .phoneImg {
            display: none;
        }
    }
</style>

<div class="wrapper">
<div class="content">
    <div class="content__header" id="businessHeader">
                <HeaderBusinessRegistration bind:status={status}/>
    </div>
    <div class="content__body">
        {#if status == 'name'}
            <h2>Название</h2>
            <p class="descriptText">
                Укажите название магазина.
            </p>
        <div class="input mt-30">
            <label for="Shop_name" class="label-text">
                Название магазина
            </label>
            <div class="inputs">
                <TextInput
                        required={true}
                        name="Shop_name"
                        id="Shop_name"
                        bind:value={shop.name}
                        className="w-full"
                />
            </div>
        </div>
        <div class="buttons">
            <Button size="lg" on:click={()=>{
        status = 'address'
        toScroll()
        }}>Далее</Button>
        </div>
        {/if}
        {#if status == 'address'}
        <div class="flex justify-between">
            <div>
                <h2>Адрес</h2>
                <p class="descriptText">
                    Укажите адрес и тип магазина.
                </p>
                <div class="input mt-30">
                    <label for="Shop_sity" class="label-text">
                        Населённый пункт
                    </label>
                    <div class="inputs">
                        <TextInput
                                required={true}
                                name="Shop_sity"
                                id="Shop_sity"
                                bind:value={shop.sity}
                                className="w-full"
                        />
                    </div>
                    <label for="Shop_adress" class="label-text mt-24">
                        Адрес магазина
                    </label>
                    <div class="inputs">
                        <TextInput
                                required={true}
                                name="Shop_adress"
                                id="Shop_adress"
                                bind:value={shop.address}
                                className="w-full"
                        />
                    </div>
                </div>
                <div class="addressCheckBoxes mt-30">
                    <div class="mr-14">
                                <CustomCheckbox  style="font-size: 15px;"
                                                 value="Торговый павильон"
                                                 className="text-main"
                                                 id="tradePavilion"
                                                 label="tradePavilion"
                                                 text="Торговый павильон"
                                                 bind:group={shop.storeView}
                                                 radio = {true}
                                />
                    </div>
                    <div class="mr-14">
                                <CustomCheckbox  style="font-size: 15px;"
                                                 value="Отдел в ТЦ"
                                                 className="text-main"
                                                 id="Department "
                                                 label="Department"
                                                 text="Отдел в ТЦ"
                                                 bind:group={shop.storeView}
                                                 radio = {true}
                                                 />
                    </div>
                    <div>
                                <CustomCheckbox  style="font-size: 15px;"
                                                 value="Магазин с отдельным входом"
                                                 className="text-main"
                                                 id="Shop"
                                                 label="Shop"
                                                 text="Магазин с отдельным входом"
                                                 bind:group={shop.storeView}
                                                 radio = {true}
                                                 />
                    </div>
                </div>
            </div>
                <div class="map" id="shopOnMap"></div>
        </div>

            <div class="buttons flex">
                <Button size="lg" status="active-transparent" className="mr-24"
                        on:click={()=>{
                        status = 'name'
                        toScroll()
                        }}>Вернуться назад</Button>
                <Button size="lg"
                        on:click={()=>{
                        status = 'time'
                        toScroll()
                        }}>Далее</Button>

            </div>
        {/if}
        {#if status == 'time'}
        <h2>Режим работы</h2>
            <p class="descriptText">
                Укажите режим работы магазина.
            </p>
            <div class="input mt-30">
                <WorkingHours bind:time={shop.time}/>
            </div>
            <div class="buttons flex">
                <Button size="lg" status="active-transparent" className="mr-24"
                        on:click={()=>{
                        status = 'address'
                        toScroll()
                        }}>Вернуться назад</Button>
                <Button size="lg"
                        on:click={()=>{
                        status = 'contacts'
                        toScroll()
                        }}>Далее</Button>

            </div>
        {/if}
        {#if status == 'contacts'}
            <h2>Контакты</h2>
            <p class="descriptText">
                Укажите способы связи с магазином.
            </p>
            <div class="input mt-30">
                    <div class="validation inputs">
                        <label for="dataShop_phone" class="label-text">
                            Телефон
                        </label>
                        <TelInput
                                name="phone"
                                id="shop_phone"
                                className="w-full"
                                required={true}
                                on:input={debounce(validateFormInput, 400)}
                                bind:value={shop.contacts.phone} />
                    </div>
                    <label for="dataShop_email" class="label-text mt-24">
                        E-mail (для информирования)
                    </label>
                        <TextInput
                                required={true}
                                name="dataShop_email"
                                id="dataShop_email"
                                bind:value={shop.contacts.email}
                                className="w-full"/>
                <label for="dataShop_Incontact" class="label-text mt-24">
                    Вконтакте
                </label>
                <TextInput
                        name="dataShop_Incontact"
                        id="dataShop_Incontact"
                        bind:value={shop.contacts.Incontact}
                        className="w-full"
                        placeholder="Логин или ссылка на страницу"
                />
                                <label for="dataShop_Facebook" class="label-text mt-24">
                                    Facebook
                </label>
                <TextInput
                        required={true}
                        name="dataShop_Facebook"
                        id="dataShop_Facebook"
                        bind:value={shop.contacts.Facebook}
                        className="w-full"
                        placeholder="Логин или ссылка на страницу"
                />
                                <label for="dataShop_Instagram" class="label-text mt-24">
                                    Instagram
                </label>
                <TextInput
                        required={true}
                        name="dataShop_Instagram"
                        id="dataShop_Instagram"
                        bind:value={shop.contacts.Instagram}
                        className="w-full"
                        placeholder="Логин или ссылка на страницу"
                />
                                <label for="dataShop_Classmates" class="label-text mt-24">
                                    Одноклассники
                </label>
                <TextInput
                        required={true}
                        name="dataShop_Classmates"
                        id="dataShop_Classmates"
                        bind:value={shop.contacts.Classmates}
                        className="w-full"
                        placeholder="Логин или ссылка на страницу"
                />
                                <label for="dataShop_Twitter" class="label-text mt-24">
                                    Твиттер
                </label>
                <TextInput
                        required={true}
                        name="dataShop_Twitter"
                        id="dataShop_Twitter"
                        bind:value={shop.contacts.Twitter}
                        className="w-full"
                        placeholder="Логин или ссылка на страницу"
                />
                <div class="validation inputs">
                    <label for="dataShop_Whatsapp" class="label-text  mt-24">
                        Whatsapp
                    </label>
                    <TelInput
                            name="Whatsapp"
                            id="shop_Whatsapp"
                            className="w-full"
                            required={true}
                            on:input={debounce(validateFormInput, 400)}
                            bind:value={shop.contacts.Whatsapp} />
                </div>
                <div class="validation inputs">
                    <label for="dataShop_Viber" class="label-text  mt-24">
                        Viber
                    </label>
                    <TelInput
                            name="Viber"
                            id="shop_Viber"
                            className="w-full"
                            required={true}
                            on:input={debounce(validateFormInput, 400)}
                            bind:value={shop.contacts.Viber} />
                </div>
                                                <label for="dataShop_Telegram" class="label-text mt-24">
                                                    Telegram
                </label>
                <TextInput
                        name="dataShop_Telegram"
                        id="dataShop_Telegram"
                        bind:value={shop.contacts.Telegram}
                        className="w-full"
                        placeholder="Логин или ссылка на профиль"
                />
                                                <label for="dataShop_Youtube" class="label-text mt-24">
                                                    Youtube
                </label>
                <TextInput
                        name="dataShop_Youtube"
                        id="dataShop_Youtube"
                        bind:value={shop.contacts.Youtube}
                        className="w-full"
                        placeholder="Ссылка на канал"
                />
                                                <label for="dataShop_WebSite" class="label-text mt-24">
                                                    Веб-сайт
                </label>
                <TextInput
                        name="dataShop_WebSite"
                        id="dataShop_WebSite"
                        bind:value={shop.contacts.WebSite}
                        className="w-full"
                        placeholder="Ссылка на сайт"
                />
                <div class="mt-24 flex items-center AddButton cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none" class="mr-8">
                        <path d="M11.9495 2.5505C10.6267 1.22769 8.87079 0.5 7 0.5C5.12921 0.5 3.37332 1.22769 2.0505 2.5505C0.727693 3.87332 0 5.62921 0 7.5C0 9.37079 0.727693 11.1267 2.0505 12.4495C3.37332 13.7723 5.12921 14.5 7 14.5C8.87079 14.5 10.6267 13.7723 11.9495 12.4495C13.2723 11.1267 14 9.37079 14 7.5C14 5.62921 13.2723 3.87332 11.9495 2.5505ZM11.3868 11.8868C10.2142 13.0593 8.65572 13.7045 7 13.7045C5.34428 13.7045 3.78577 13.0593 2.61322 11.8868C0.194444 9.46801 0.194444 5.53199 2.61322 3.11322C3.78577 1.94066 5.34428 1.29545 7 1.29545C8.65572 1.29545 10.2142 1.94066 11.3868 3.11322C13.8056 5.53199 13.8056 9.46801 11.3868 11.8868Z" fill="#CC6699"/>
                        <path d="M6.99957 3.13794C6.77875 3.13794 6.60168 3.31501 6.60168 3.53583L6.60168 7.10232L3.03519 7.10232C2.81437 7.10232 2.6373 7.27939 2.6373 7.50021C2.6373 7.72104 2.81437 7.89811 3.03519 7.89811L6.60168 7.89811L6.60168 11.4646C6.60168 11.6854 6.77875 11.8625 6.99957 11.8625C7.1079 11.8625 7.20998 11.8187 7.28081 11.7479C7.35164 11.6771 7.39747 11.5771 7.39539 11.4667L7.39539 7.90019L10.9619 7.90019C11.0702 7.90019 11.1723 7.85645 11.2431 7.78562C11.316 7.7127 11.3598 7.61479 11.3577 7.50438C11.3577 7.28356 11.1806 7.10648 10.9598 7.10648L7.39747 7.10232L7.39747 3.53583C7.39747 3.31501 7.2204 3.13794 6.99957 3.13794Z" fill="#CC6699"/>
                    </svg>
                    Добавить способ связи
                </div>
                </div>
            <div class="buttons flex">
                <Button size="lg"
                        on:click={()=>{
                        status = 'delivery'
                        toScroll()
                        }}>Далее</Button>
                <Button size="lg" status="active-transparent" className="ml-24"
                        on:click={()=>{
                        status = 'address'
                        toScroll()
                        }}>Вернуться назад</Button>
            </div>
        {/if}
        {#if status == 'delivery'}
            <h2>Доставка</h2>
            <h3>Время доставки по городу</h3>
            <p class="descriptText">
                Укажите минимальное количество времени в минутах, необходимое для того, чтобы собрать заказ и доставить его получателю (не в период праздников)
            </p>
            <div class="input mt-24 mb-34">
                <SelectLabel list={minTimeList} bind:select={shop.deliveryTime.min} size="full"/>
            </div>

            <h3>Стоимость доставки по городу</h3>
            <p class="descriptText">
                Укажите стоимость доставки по городу
            </p>
        <div class="input">
            {#each shop.deliveryTime.periods as period}
                {#if period.name == 'Самовывоз'}
                    <div class="period  mt-16">
                        <CustomCheckbox  style="font-size: 15px;"
                                         value={period.name}
                                         className="text-main"
                                         id={period.name}
                                         label='{period.name} — 0 ₽'
                                         bind:check = {period.selected}/>
                    </div>
                {:else}
                    <div class="period  mt-16">
                        <CustomCheckbox  style="font-size: 15px;"
                                         value={period.name}
                                         className="text-main"
                                         id={period.name}
                                         label={period.name}
                                         bind:check = {period.selected}/>
                        <div class="inputs pl-24 mt-14">
                            <SelectLabel list={priceList} bind:select={period.price} size="full"/>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
            <h3 class="mt-48">Удалённая доставка</h3>
            <p class="descriptText">
                Стоимость удалённой доставки считается по формуле: <span class="font-semibold text-main mt-24 whitespace-nowrap">стоимость забора заказа + стоимость 1 км × кол-во км</span>
            </p>
            <p class="label-text mt-24">
                Стоимость забора заказа
            </p>
            <div class="input mb-24">
                <SelectLabel list={pricePicking} bind:select={shop.deliveryTime.pricePicking} size="full"/>
            </div>
            <p class="label-text">
                Стоимость 1 км
            </p>
            <div class="input mb-24">
                <SelectLabel list={priceOneKm} bind:select={shop.deliveryTime.priceOneKm} size="full"/>
            </div>
            <p class="label-text">
                Радиус доставки
            </p>
            <div class="input mb-24">
                <SelectLabel list={deliveryRadius} bind:select={shop.deliveryTime.deliveryRadius} size="full"/>
            </div>
            <p class="label-text">
                Стоимость доставки к точному времени
            </p>
            <div class="input mb-12">
                <SelectLabel list={exactTime} bind:select={shop.deliveryTime.exactTime} size="full"/>
            </div>
            <p class="footnote">*будет прибавлена к обычной стоимости доставки</p>
            <h3 class="mt-34">Выберите опции удалённой доставки:</h3>
            {#each shop.deliveryTime.options as option}
                <div class="option mb-18">
                    <CustomCheckbox  style="font-size: 15px;"
                                     value={option.name}
                                     className="text-main"
                                     id={option.name}
                                     label={option.name}
                                     bind:check = {option.selected}/>
                </div>
            {/each}
            <div class="buttons flex">
                <Button size="lg" status="active-transparent" className="mr-24"
                        on:click={()=>{
                        status = 'contacts'
                        toScroll()
                        }}>Вернуться назад</Button>
                <Button size="lg"
                        on:click={()=>{
                        status = 'requisites'
                        toScroll()
                        }}>Далее</Button>

            </div>
        {/if}
        {#if status=='requisites'}
            <h2>Реквизиты</h2>
            <div class="descriptText">Для заключения договора и получения выплат.</div>
            <div class="descriptText mb-30"> Работает автоподстановка — начните вводить название юр. лица или ИП.</div>
            <RegistrationRequisitesData/>
            <div class="buttons flex">
                <Button size="lg" status="active-transparent" className="mr-24"
                        on:click={()=>{
                        status = 'delivery'
                        toScroll()
                        }}>Вернуться назад</Button>
                <Button size="lg"
                        on:click={()=>{
                        status = 'finish'
                        toScroll()
                        }}>Далее</Button>
            </div>
        {/if}
        {#if status=='finish'}
            <div class="flex">
                <div>
                    <div class="mb-40">
                        <h2>Спасибо за регистрацию в Розарио.<span class="font-light">Цветы</span></h2>
                        <div class="descriptText">Данные отправлены на модерацию, наш сотрудник свяжется с вами в течение двух рабочих дней.</div>
                        <div class="descriptText">Аккаунт станет активен после успешного прохождения модерации.</div>
                        <div class="descriptText"> Пока вы можете установить приложение для работы и указать цены на цветы и другие составляющие.</div>
                    </div>
                    <div class="flex justify-between items-end">
                        <div class="mr-24">
                            <h3 class="mb-8">Розарио.<span class="font-light">Цветы</span></h3>
                            <p class="mini-text">
                                Вам пришло смс с ссылкой на приложение. Авторизуйтесь, чтобы оперативно получать уведомления о новых заказах.
                            </p>
                        </div>
                        <div class="mr-24 miniImg">
                            <img class="h-full w-full" src="play-market.svg" alt="Play Market" />
                        </div>
                        <div class="miniImg">
                            <img src="apple-store.svg" class="h-full w-full" alt="Apple Store" />
                        </div>
                    </div>
                </div>
                <div class="phoneImg">
                    <img src="phoneLogo.png" alt="icon"/>
                </div>
            </div>
            <div class="buttons flex">
                <a href="businessProfile/showcase">
                    <Button size="lg"
                            on:click={()=>{
                            status = 'finish'
                            }}>Перейти к ценам на составляющие</Button>
                </a>
            </div>
        {/if}
    </div>
</div>
</div>