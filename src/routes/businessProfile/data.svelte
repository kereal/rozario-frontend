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
                recommendations: json.recommendations
            };
        } catch (e) {
            console.log(e);
        }
    }
</script>

<script>
    import ScrollSpy from "../../utils/scrollSpy.js";
    import {onMount, setContext} from "svelte";
    import {mainStore} from "../../stores/global.js";
    import Tabbar from "../../components/Tabbar.svelte";
    import AsideNavigation from "../../components/AsideNavigation.svelte";
    import TextInput from "../../components/TextInput.svelte";
    import CustomCheckbox from "../../components/CustomCheckbox.svelte";
    import TelInput from "../../components/TelInput.svelte";
    import Button from "../../components/Button.svelte";
    import SelectLabel from "../../components/SelectLabel.svelte"
    import BusinessRequisitesData from "../../components/BusinessRequisitesData.svelte";
    import BusinessListWorkersData from "../../components/BusinessListWorkersData.svelte";
    import WorkingHoursComp from "../../components/WorkingHours.svelte";
    import debounce from "lodash-es/debounce";
    import AddWayCommunication from "../../components/AddWayCommunication.svelte";


    export let cityMeta;
    let headers;
    let scrollSpy;
    let timeoutid;
    let Name;
    let Address;
    let WorkingHours;
    let Contacts;
    let Delivery;
    let Staff;
    let Requisites;
    let selectedStoreView = 'shop'
    let minTimeList = [];
    let priceList = []
    let priceOneKm = []
    let pricePicking = []
    let deliveryRadius = []
    let exactTime = []

    for(let i = 30; i <= 120; i = i + 10) {
        minTimeList.push(i);
    }
    for(let i = 0; i<=1000; i = i +50) {
        priceList.push(i + ' ₽')
    }
    for(let i = 10; i<=30; i = i +5) {
        priceOneKm.push(i + ' ₽')
    }
    for(let i = 0; i<=200; i = i +50) {
        pricePicking.push(i + ' ₽')
    }
    for(let i = 10; i<=30; i = i +5) {
        deliveryRadius.push(i + ' км')
    }
    for(let i = 50; i<=1000; i = i +50) {
        exactTime.push(i + ' ₽')
    }
    const navlist = [
        {name: "Заказы", link: "businessProfile", active: false},
        {name: "Данные", link: "businessProfile/data", active: true},
        {name: "Витрина", link: "businessProfile/showcase", active: false},
        {name: "Финансы", link: "businessProfile/finance", active: false},
        {name: "Помощь", link: "businessProfile/help", active: false}
    ];
    let currentMenuIndex = 0;

    const menulist = [
        {name: "Название", index: 0},
        {name: "Адрес", index: 1},
        {name: "Режим работы", index: 2},
        {name: "Контакты", index: 3},
        {name: "Доставка", index: 4},
        {name: "Сотрудники", index: 5},
        {name: "Реквизиты", index: 6}
    ];

    export let dataShop = {
        name:'Название',
        sity:'Мурманск',
        address:'ул. Пушкина, дом Колотушкина',
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
        contacts:[
            {name:'Телефон', placeholder:'', type: 'phone', value:'+7', id:'phone'},
            {name:'E-mail (для информирования)', placeholder:'E-mail (для информирования)', type: 'text', value:'www.rozario@info.ru', id:'email'},
            {name:'Вконтакте',placeholder:'Логин или ссылка на страницу', type:'text', value:'', id:'vk'},
            {name:'Facebook',placeholder:'Логин или ссылка на страницу', type:'text', value:'', id:'Facebook'},
            {name:'Instagram',placeholder:'Логин или ссылка на страницу', type:'text', value:'', id:'Instagram'},
            {name:'Одноклассники',placeholder:'Логин или ссылка на страницу', type:'text', value:'', id:'odnoklassniki'},
            {name:'Твиттер',placeholder:'Логин или ссылка на страницу', type:'text', value:'', id:'twitter'},
            {name:'Whatsapp',placeholder:'', type:'phone', value:'', id:'Whatsapp'},
            {name:'Viber',placeholder:'', type:'phone', value:'', id:'Viber'},
            {name:'Telegram',placeholder:'Логин или ссылка на профиль',type:'text', value:'', id:'Telegram'},
            {name:'Youtube',placeholder:'Ссылка на канал',type:'text', value:'', id:'Youtube'},
            {name:'Веб-сайт',placeholder:'Ссылка на сайт',type:'text', value:'', id:'web'}
        ],
        deliveryTime:{
            min: 'Выберите количество минут',
            periods: [
                {name:'Доставка к точному времени с 21:00 до 09:00', price: 0, selected: true},
                {name:'Доставка интервал 2 часа с 21:00 до 09:00', price: 0, selected: true},
                {name:'Доставка к точному времени  с 09:00 до 21:00', price: 'Выберите стоимость доставки', selected: true},
                {name:'Доставка интервал 2 часа с 09:00 до 21:00', price: 0, selected: false},
                {name:'Самовывоз', price: 0, selected: false},
    ],
            options: [
                {name:'Доставка к точному времени с 21:00 до 09:00',  selected: true},
                {name:'Доставка интервал 2 часа с 21:00 до 09:00',  selected: true},
                {name:'Доставка к точному времени  с 09:00 до 21:00', selected: true},
                {name:'Доставка интервал 2 часа с 09:00 до 21:00',  selected: false},
            ],
            pricePicking:'Выберите стоимость',
            priceOneKm:'Выберите стоимость',
            deliveryRadius:'Выберите радиус',
            exactTime:'Выберите стоимость'
        }
    }

    export let listEmployees = [
        {
            group: 'Директора',
            groupDiscription:'Доступны все разделы. Управляют всеми сотрудниками',
            listWorkers: [{
                name:'Джон Эдгар',
                phone:'+7 921 225-53-71',
                selected: false,
                authorized: true
            }
            ]
        },
        {
            group: 'Менеджеры',
            groupDiscription:'Доступны все разделы, кроме финансов. Управляют флористами и курьерами',
            listWorkers: [{
                name:'Джордан Белфорт',
                phone:'+7 921 225-53-71',
                selected: false,
                authorized: true
            },
                {
                    name:'Джон Генри Паттерсон',
                    phone:'+7 921 225-53-71',
                    selected: false,
                    authorized: true
                },
                {
                    name:'Эрика Фейднер',
                    phone:'+7 921 225-53-71',
                    selected: false,
                    authorized: false
                }
            ]
        },
        {
            group: 'Флористы',
            groupDiscription:'Доступны все разделы, кроме финансов. Управляют флористами и курьерами',
            listWorkers: [{
                name:'Стив Джобс',
                phone:'+7 921 225-53-71',
                selected: false,
                authorized: true
            },
                {
                    name:'Николай Шустов',
                    phone:'+7 921 225-53-71',
                    selected: false,
                    authorized: true
                },
                {
                    name:'Альберт Ласкер',
                    phone:'+7 921 225-53-71',
                    selected: false,
                    authorized: false
                }
            ]
        },
        {
            group: 'Курьеры',
            groupDiscription:'Получают назначенные на них заказы только через приложение Розарио.Курьер',
            listWorkers: [{
                name:'Ехидна Наклз',
                phone:'+7 921 225-53-71',
                selected: false,
                authorized: false
            }
            ]
        }
    ];

    onMount(() => {
        headers = [Name,  Address, WorkingHours, Contacts, Delivery, Staff, Requisites];
        scrollSpy = new ScrollSpy(window, headers);
        const setIndex = e => {
            console.log("set index");
            currentMenuIndex = e.detail.index;
        };
        window.addEventListener("scrollspy-activate", setIndex);

        $mainStore.address.city = cityMeta;
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2
        };

        const images = document.querySelectorAll("img[data-src]");

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
            scrollSpy.destroy();
            window.removeEventListener("scrollspy-activate", setIndex);
            clearTimeout(timeoutid);
            images.forEach(image => observer.unobserve(image));
            observer.disconnect();
        };
    });

    function goToHeader(e) {
        const index = parseInt(e.detail.header);
        if (timeoutid) {
            clearTimeout(timeoutid);
        }
        scrollSpy.unblock();
        scrollSpy.block();
        scrollSpy.refresh();
        window.scroll({
            top: scrollSpy._offsets[index] - 20,
            left: 0,
            behavior: "smooth"
        });
        timeoutid = setTimeout(() => {
            scrollSpy.unblock();
        }, 1000);
    }

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
let addContactVisible = false;
    function toggleaddContact(){
        addContactVisible = !addContactVisible
    }

</script>

<style>
    .label-text {
        @apply text-gray-600 inline-block;
        margin-bottom: 8px;
        font-size: 13px;
    }
    .data {
        height: calc(100% - 10px);
    }
    .content {
        background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #F2F2F2;
        border: 1px solid var(--gray-300);
        border-top: none;
        box-sizing: border-box;
        border-radius: 4px;
        @apply px-80;
        @apply py-48;
        height: auto;
        width: 100%;
    }
    .aside-nav-container {
        top: calc(5rem + 10px);
        flex: 0 0 310px;
        margin-bottom: 10px;
        bottom: 10px;
        @apply sticky h-full;
    }
    section {
        margin-top: 68px;
    }
    .date__Name {
        margin-top: 0;
    }
    .sectionName {
        font-weight: bold;
        font-size: 24px;
        color: var(--color-main);
    }
    .sectionBody {
        margin-top: 18px;
    }
    .subSectionName {
        font-weight: 600;
        font-size: 18px;
        color: var(--color-main);
        margin-bottom: 12px;
    }
    .date__subscribeText {
        font-size: 16px;
        color: var(--gray-600);
    }
    .inputs {
        width: 498px;
    }
    .checkBoxes {
        display: flex;
        margin-top: 30px;
    }
    .checkBoxes div{
        margin-right: 24px;
    }
    .checkBoxes:last-child{
        margin-right: 0;
    }
    .footnote {
        font-size: 14px;
        color: var(--gray-600);
    }
    @media (max-width: 1300px) {
        .content {
            @apply px-44;
            @apply py-34;
            padding-bottom: 48px;
        }
    }
    @media (max-width: 1048px) {
        .content {
            @apply py-24;
            padding-bottom: 48px;
        }
        section {
        margin-top: 68px;
        }
        .date__Name {
            margin-top: 0;
        }
        .checkBoxes {
            display: block;
        }
        .checkBoxes div{
            margin-bottom: 16px;
        }
        .checkBoxes:last-child{
            margin-bottom: 0;
        }
    }
</style>

<div class="data">
    <div class="flex w-full justify-between">
        <div class="w-full mr-10 mb-10">
            <Tabbar
                    pos="top: 5rem;"
                    className="sticky"
                    on:change={goToHeader}
                    {currentMenuIndex}
                    {menulist} />
            <div class="content">
                <section class="date__Name"
                         data-scrollspy
                         bind:this={Name}>
                    <h2 class="sectionName">Название</h2>
                    <div class="sectionBody">
                        <label for="dataShop_name" class="label-text">
                            Название магазина
                        </label>
                        <div class="inputs">
                            <TextInput
                                    required={true}
                                    name="dataShop_name"
                                    id="dataShop_name"
                                    bind:value={dataShop.name}
                                    className="w-full"
                            />
                        </div>
                    </div>
                </section>
                <section class="date__Address"
                         data-scrollspy
                         bind:this={Address}>
                    <h2 class="sectionName">Адрес</h2>
                    <div class="sectionBody">
                        <label for="dataShop_name" class="label-text">
                            Населённый пункт
                        </label>
                        <div class="inputs">
                            <TextInput
                                    required={true}
                                    name="dataShop_sity"
                                    id="dataShop_sity"
                                    bind:value={dataShop.sity}
                                    className="w-full"
                            />
                        </div>
                        <label for="dataShop_name" class="label-text mt-24">
                            Адрес магазина
                        </label>
                        <div class="inputs">
                            <TextInput
                                    required={true}
                                    name="dataShop_adress"
                                    id="dataShop_adress"
                                    bind:value={dataShop.address}
                                    className="w-full"
                            />
                        </div>
                        <div class="checkBoxes">
                            <div>
                                <CustomCheckbox  style="font-size: 15px;"
                                                 value="Торговый павильон"
                                                 className="text-main"
                                                 id="tradePavilion"
                                                 label="tradePavilion"
                                                 text="Торговый павильон"
                                                 bind:group={dataShop.storeView}
                                                 radio = {true}
                                />
                            </div>
                            <div>
                                <CustomCheckbox  style="font-size: 15px;"
                                                 value="Отдел в ТЦ"
                                                 className="text-main"
                                                 id="Department "
                                                 label="Department"
                                                 text="Отдел в ТЦ"
                                                 bind:group={dataShop.storeView}
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
                                                 bind:group={dataShop.storeView}
                                                 radio = {true}
                                                 />
                            </div>
                        </div>
                    </div>
                </section>
                <section class="date__workingHours"
                         data-scrollspy
                         bind:this={WorkingHours}>
                    <h2 class="sectionName">Режим работы</h2>
                    <div class="sectionBody inputs">
                        <WorkingHoursComp bind:time={dataShop.time} extended={true}/>
                    </div>
                </section>
                <section class="date__Contacts"
                         data-scrollspy
                         bind:this={Contacts}>
                    <h2 class="sectionName">Контакты</h2>
                    <div class="sectionBody" id="formdata">
                        <div class="validation inputs">
                        {#each dataShop.contacts as contact}
                        {#if contact.value != ''}
                            {#if contact.type == 'text'}
                                <label for="dataShop_email" class="label-text mt-24">
                                    {contact.name}
                                </label>
                                <div class="inputs">
                                    <TextInput
                                            required={true}
                                            name="{contact.id}"
                                            id="{contact.id}"
                                            bind:value={contact.value}
                                            className="w-full"
                                    />
                                </div>
                            {/if}
                            {#if contact.type == 'phone'}
                                <label for="dataShop_phone" class="label-text mt-24 first:mt-0">
                                    {contact.name}
                                </label>
                                <TelInput
                                        on:invalid={handleInvalid}
                                        name="{contact.id}"
                                        id="{contact.id}"
                                        className="w-full "
                                        required={true}
                                        on:input={debounce(validateFormInput, 400)}
                                        bind:value={contact.value} />
                            {/if}
                        {/if}
                        {/each}
                        </div>
                    <Button status="active-secondary" size="lg" className="mt-34" on:click={toggleaddContact}>
                        Добавить способ связи
                    </Button>
                </section>
                <section class="date__Delivery"
                         data-scrollspy
                         bind:this={Delivery}>
                    <h2 class="sectionName">Доставка</h2>
                    <div class="sectionBody">
                        <h3 class="subSectionName">Время доставки по городу</h3>
                        <p class="date__subscribeText">
                            Укажите минимальное количество времени в минутах, необходимое для того, чтобы собрать заказ и доставить его получателю (не в период праздников)
                        </p>
                        <div class="inputs mt-24 mb-34">
                            <SelectLabel list={minTimeList} bind:select={dataShop.deliveryTime.min} size="full"/>
                        </div>
                        <h3 class="subSectionName">Стоимость доставки по городу</h3>
                        <p class="date__subscribeText mb-30">
                            Укажите стоимость доставки по городу
                        </p>
                        {#each dataShop.deliveryTime.periods as period}
                        {#if period.name == 'Самовывоз'}
                            <div class="period  mt-24">
                                <CustomCheckbox  style="font-size: 15px;"
                                                 value={period.name}
                                                 className="text-main"
                                                 id={period.name}
                                                 label='{period.name} — 0 ₽'
                                                 bind:check = {period.selected}/>
                            </div>
                            {:else}
                            <div class="period  mt-24">
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
                        <h3 class="subSectionName mt-96">Удалённая доставка</h3>
                        <p class="date__subscribeText mb-18">
                            Стоимость удалённой доставки считается по формуле: <span class="text-main font-semibold whitespace-no-wrap">стоимость забора заказа + стоимость 1 км × кол-во км</span>
                        </p>
                        <p class="label-text">
                            Стоимость забора заказа
                        </p>
                        <div class="inputs mb-20">
                            <SelectLabel list={pricePicking} bind:select={dataShop.deliveryTime.pricePicking} size="full"/>
                        </div>
                        <p class="label-text">
                            Стоимость 1 км
                        </p>
                        <div class="inputs mb-20">
                            <SelectLabel list={priceOneKm} bind:select={dataShop.deliveryTime.priceOneKm} size="full"/>
                        </div>
                        <p class="label-text">
                            Радиус доставки
                        </p>
                        <div class="inputs mb-20">
                            <SelectLabel list={deliveryRadius} bind:select={dataShop.deliveryTime.deliveryRadius} size="full"/>
                        </div>
                        <p class="label-text">
                            Стоимость доставки к точному времени
                        </p>
                        <div class="inputs mb-12">
                            <SelectLabel list={exactTime} bind:select={dataShop.deliveryTime.exactTime} size="full"/>
                        </div>
                        <p class="footnote">*будет прибавлена к обычной стоимости доставки</p>
                        <h3 class="subSectionName mt-34">Выберите опции удалённой доставки:</h3>
                        {#each dataShop.deliveryTime.options as option}
                            <div class="option mb-24">
                                <CustomCheckbox  style="font-size: 15px;"
                                                 value={option.name}
                                                 className="text-main"
                                                 id={option.name}
                                                 label={option.name}
                                                 bind:check = {option.selected}/>
                            </div>
                        {/each}
                    </div>
                </section>
                <section class="date__Staff"
                         data-scrollspy
                         bind:this={Staff}>
                    <h2 class="sectionName">Сотрудники</h2>
                    <div class="sectionBody">
                        <p class="date__subscribeText mb-34">
                            Добавляйте сотрудников, чтобы они могли принимать и обрабатывать заказы, управлять аккаунтом.
                        </p>
                        <BusinessListWorkersData bind:listEmployees={listEmployees}/>
                    </div>
                </section>
                <section class="date__Staff"
                         data-scrollspy
                         bind:this={Requisites}>
                    <h2 class="sectionName">Реквизиты</h2>
                    <div class="sectionBody">
                        <p class="date__subscribeText">
                            Для заключения договора и получения выплат.
                        </p>
                        <p class="date__subscribeText">
                            Работает автоподстановка — начните вводить название юр. лица или ИП.
                        </p>
                        <div class="businessRequisites mt-34">
                            <BusinessRequisitesData/>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <div class="aside-nav-container">
            <AsideNavigation {navlist} />
        </div>
    </div>
</div>
{#if addContactVisible}
    <AddWayCommunication bind:contacts={dataShop.contacts}  on:close={toggleaddContact}/>
{/if}