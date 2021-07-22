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
    import AutoWidthButtons from "../../components/AutoWidthButtons.svelte";
    import Button from "../../components/Button.svelte";
    import DateInput from "../../components/DateInput.svelte";
    import {slide} from 'svelte/transition';
    import debounce from "lodash-es/debounce";
    import TransactionHistory from "../../components/TransactionHistory.svelte";
    import RemoveMoneyWindow from "../../components/RemoveMoneyWindow.svelte";

    export let cityMeta;
    export let balance = 12750;
    export let frozen = 12750;
    export let freeMoney = 12750;

    export let history = [
        {
            date: new Date(2013, 5, 1),
            transactionNumber: true,
            transaction: 66889009,
            coming: '',
            consumption: -12950,
            commission: 0,
            status: 'Отправлено'
        },
        {
            date: new Date(2013, 5, 1),
            transactionNumber: false,
            transaction: 'Вывод на расчётный счёт',
            coming: 12950,
            consumption: '',
            commission: 3459,
            status: 'Отправлено'
        },
        {
            date: new Date(2013, 5, 1),
            transactionNumber: true,
            transaction: 66889009,
            coming: 12950,
            consumption: '',
            commission: 0,
            status: ''
        },
    ]
    export let listOrder = [
        {number: 17875461, summ: 555, ckeck: false},
        {number: 17872261, summ: 1555, ckeck: false},
        {number: 178711, summ: 2555, ckeck: false},
        {number: 1787361, summ: 3555, ckeck: false},
        {number: 145461, summ: 4555, ckeck: false}
    ]
    let headers;
    let scrollSpy;
    let timeoutid;
    let Personalaccount;
    let History;
    let Agentreport;
    let FromDate;
    let BeforeDate;
    let FromDateReport;
    let BeforeDateReport;
    let openTable = false;
    let removeMoney = false;
    const navlist = [
        {name: "Заказы", link: "businessProfile", active: false},
        {name: "Данные", link: "businessProfile/data", active: false},
        {name: "Витрина", link: "businessProfile/showcase", active: false},
        {name: "Финансы", link: "businessProfile/finance", active: true},
        {name: "Помощь", link: "businessProfile/help", active: false}
    ];
    let currentMenuIndex = 0;

    const menulist = [
        {name: "Личный счёт", index: 0},
        {name: "История", index: 1},
        {name: "Отчёт агента", index: 2},
    ];
    let yesterday = new Date(Date.now() - 86400000)
    let beforeYesterday = new Date(Date.now() - 172800000);

    function formatDate(date) {
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        let yy = date.getFullYear();
        if (yy < 10) yy = '0' + yy;
        return dd + '.' + mm + '.' + yy;
    }

    let selectedHistory = 'Выбрать период';

    let historyButtons = [
        {name: formatDate(yesterday), id: 'some date'},
        {name: formatDate(beforeYesterday), id: 'some date2'},
        {name: 'За неделю', id: 'During the week'},
        {name: 'За месяц', id: 'Per month'},
        {name: 'Выбрать период', id: 'Select period'}];
    onMount(() => {
        headers = [Personalaccount, History, Agentreport];
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

</script>

<style>
    .label-text {
        @apply text-gray-600 text-xs inline-block;
        margin-bottom: 8px;
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
    .content:first-child {
        margin-top: 0;
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
    .section__flower {
        margin-top: 0;
    }
    .sectionName {
        font-weight: bold;
        font-size: 24px;
        margin-bottom: 18px;
        color: var(--color-main);
    }
    .sectionBody {
        margin-top: 24px;
    }
    .subSectionName {
        font-weight: 600;
        font-size: 16px;
        color: var(--color-main);
        margin-bottom: 14px;
        margin-top: 30px;
    }
    .date__subscribeText {
        font-size: 16px;
        color: var(--gray-600);
    }
    .mainText {
        font-size: 16px;
        color: var(--color-main);
    }
    .leftBalance {
        min-width:130px;
        margin-right: 16px;
    }
    .selectPeriod {
        width: 160px;
    }
    .selectPeriod__text {
        display: block;
        font-size: 13px;
        margin-bottom: 8px;
        color: var(--gray-600);
    }
    @media (max-width: 1300px) {
        .content {
            @apply px-44;
            @apply py-34;
        }
        .section__flower {
            margin-top: 0;
        }
    }
    @media (max-width: 1048px) {
        .content {
            @apply py-24;
        }
        section {
            margin-top: 68px;
        }
        .section__flower {
            margin-top: 0;
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
                <section class="section__flower"                          data-scrollspy
                         bind:this={Personalaccount}>
                    <h2 class="sectionName">Личный счёт</h2>
                    <p class="date__subscribeText">
                        Оплата по заказу поступает только после его выполнения.
                        В течение 72 часов деньги находятся на заблокированном счёте, затем попадают на ваш основной счёт, и становятся доступны для вывода.
                    </p>
                    <p class="date__subscribeText mt-12">Срок поступления денежных средств на ваш расчётный счёт может составлять до 7 рабочих дней.</p>
                    <div class="sectionBody mainText mb-30 mt-34">
                        <div class="flex items-center mb-16">
                            <div class="leftBalance">На вашем счёте:</div>
                            <div class="font-semibold">{balance} ₽</div>
                        </div>
                        <div class="flex items-center mb-16">
                            <div class="leftBalance">Заморожены:</div>
                            <div class="font-semibold">{frozen} ₽</div>
                        </div>
                        <div class="flex items-center">
                            <div class="leftBalance">Можно вывести:</div>
                            <div class="font-semibold">{freeMoney} ₽</div>
                        </div>
                    </div>
                    <Button size="lg" on:click={()=>{removeMoney=!removeMoney}}>Вывести деньги</Button>
                </section>
                <section                          data-scrollspy
                                                  bind:this={History}>
                    <h2 class="sectionName">История</h2>
                    <p class="date__subscribeText">История транзакций</p>
                    <div class="sectionBody">
                        <div class="historyButtons">
                            <AutoWidthButtons value={selectedHistory} bind:group={selectedHistory} selectedText="Еще" list={historyButtons} buttonElement=""/>
                        </div>
                        {#if selectedHistory == 'Выбрать период'}
                        <div transition:slide|local>
                            <h3 class="subSectionName">Выберите период </h3>
                            <div class="flex">
                                <div class="selectPeriod mr-24">
                                    <span class="selectPeriod__text">От</span>
                                    <div>
                                        <DateInput
                                                required={true}
                                                name="date"
                                                className="w-full text-main placeholder-input"
                                                bind:value={FromDate}
                                                min = {new Date(2011, 0, 1)}
                                                max = {new Date()}
                                                id="cart-date-input"
                                        />
                                    </div>
                                </div>
                                <div class="selectPeriod">
                                    <span class="selectPeriod__text">До</span>
                                    <div>
                                        <DateInput
                                                required={true}
                                                name="date"
                                                className="w-full text-main placeholder-input"
                                                bind:value={BeforeDate}
                                                id="cart-date-input" />
                                    </div>
                                </div>
                            </div>
                            </div>
                        {/if}
                        <div class="buttonCalc mt-24">
                            <Button size="lg" on:click={()=>{
                            openTable = !openTable
                            }}>
                                Вывести
                            </Button>
                        </div>
                        {#if openTable}
                            <div class="mt-24" transition:slide|local>
                                <TransactionHistory history={history}/>
                            </div>
                        {/if}
                    </div>
                </section>
                <section                          data-scrollspy
                                                  bind:this={Agentreport}>
                    <h2 class="sectionName">Отчёт агента</h2>
                    <p class="date__subscribeText">Генерация отчёта</p>
                    <div class="sectionBody">
                        <h3 class="subSectionName">Выберите период </h3>
                        <div class="flex">
                            <div class="selectPeriod mr-24">
                                <span class="selectPeriod__text">От</span>
                                <div>
                                    <DateInput
                                            required={true}
                                            name="date"
                                            className="w-full text-main placeholder-input"
                                            bind:value={FromDateReport}
                                            min = {new Date(2011, 0, 1)}
                                            max = {new Date()}
                                            id="cart-date-input" />
                                </div>
                            </div>
                            <div class="selectPeriod">
                                <span class="selectPeriod__text">До</span>
                                <div>
                                    <DateInput
                                            required={true}
                                            name="date"
                                            className="w-full text-main placeholder-input"
                                            bind:value={BeforeDateReport}
                                            id="cart-date-input" />
                                </div>
                            </div>
                        </div>
                        <Button size='lg' className="mt-24">Создать отчёт</Button>
                    </div>

                </section>
            </div>
        </div>
        <div class="aside-nav-container">
            <AsideNavigation {navlist} />
        </div>
    </div>
</div>

{#if removeMoney}
<RemoveMoneyWindow listOrder={listOrder} bind:visible={removeMoney}/>
{/if}