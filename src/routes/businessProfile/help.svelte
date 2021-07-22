<script context="module">
    export async function preload(page, session) {
        try {
            const res = await this.fetch(
                    `index.json?city=${page.host.split('.')[0]}&path=${page.path}`
            );
            const json = await res.json();
            return {
                cityMeta: json.cityMeta,
                recommendations: json.recommendations,
            };
        } catch (e) {
            console.log(e);
        }
    }
</script>
<script>
    import debounce from "lodash/debounce";
    import AsideNavigation from "../../components/AsideNavigation.svelte";
    import Button from "../../components/Button.svelte";
    import Tabbar from "../../components/Tabbar.svelte";
    import HelpQuestion from "../../components/HelpQuestion.svelte";
    import HelpCategory from "../../components/HelpCategory.svelte";
    import HelpSearchInput from "../../components/HelpSearchInput.svelte";
    import HelpSearchResult from "../../components/HelpSearchResult.svelte";



    import { onMount } from "svelte";
    import { stores } from "@sapper/app";
    import ScrollSpy from "../../utils/scrollSpy.js";
    import { mainStore } from "../../stores/global.js";
    const { page } = stores();

    export let cityMeta;
    export let recommendations;
    let containerElement;
    let AboutServiceHeader;
    let OrderCheckoutHeader;
    let PaymentHeader;
    let DeliveryHeader;
    let ReceivementHeader;
    let ProtectionHeader;
    const navlist = [
        {name: "Заказы", link: "businessProfile", active: false},
        {name: "Данные", link: "businessProfile/data", active: false},
        {name: "Витрина", link: "businessProfile/showcase", active: false},
        {name: "Финансы", link: "businessProfile/finance", active: false},
        {name: "Помощь", link: "businessProfile/help", active: true}
    ];

    const menulist = [
        {name: 'О сервисе', index: 0},
        {name: 'Оформление заказа', index: 1},
        {name: 'Оплата', index: 2},
        {name: 'Доставка', index: 3},
        {name: 'Получение заказа', index: 4},
        {name: 'Защита покупателя', index: 5}
    ];
    let currentMenuIndex = 0;

    let timeoutid;
    let showClearSearchButton = true;
    let hasResultsChanged = function(hasResults) {
        showClearSearchButton = !hasResults;
    };

    let aboutServiceQA = [
        {question:'Как можно с вами связаться?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Зачем регистрироваться на сайте?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб. '},
        {question:'Как войти в личный кабинет?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Что делать, если забыл пароль?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'}
    ];
    let orderCheckoutQA = [
        {question:'Можно ли изменить заказ после оформления?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Как узнать статус заказа?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Как отменить заказ?', answer:'Чтобы отменить заказ, нажмите на кнопку «Отменить» в соответствующем заказе в личном кабинете (ссылка приходит при оформлении заказа в смс и на электронную почту)'},
        {question:'Можно ли увидеть готовый заказ до доставки?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Как будет выглядеть открытка?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Как будет выглядеть открытка?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'}
    ];
    let paymentQA = [
        {question:'Какие доступны способы оплаты на сайте?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Как применить купон при оплате заказа?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Можно ли оплатить заказ при получении?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Как оплатить безналичным расчетом для юридических лиц или ИП?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Как осуществляется возврат денежных средств?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Как осуществляется возврат денежных средств?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'}
    ];
    let deliveryQA = [
        {question:'Как связаться с курьером?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Есть ли самовывоз?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'От чего зависит стоимость доставки?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Можно доставить заказ к точному времени?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Как я узнаю о доставке заказа?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Как я узнаю о доставке заказа?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'}
    ];
    let receivementQA = [
        {question:'Что делать, если курьер опаздывает?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Что делать, если полученный заказ не устраивает?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Если время или место получения заказа нужно согласовать с получателем, то когда ему позвонят?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'}
    ];
    let protectionQA = [
        {question:'Что такое защита покупателя?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Безопасно ли оплачивать заказ на сайте?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Получу ли я полный возврат, если отменю заказ?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Могу ли я заказать букет анонимно?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Какие гарантии того, что цветы будут свежими?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Какие гарантии того, что цветы будут свежими?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'}
    ];

    let qaList = [
        {
            header: menulist[0].name,
            qa: aboutServiceQA
        },
        {
            header: menulist[1].name,
            qa: orderCheckoutQA
        },
        {
            header: menulist[2].name,
            qa: paymentQA
        },
        {
            header: menulist[3].name,
            qa: deliveryQA
        },
        {
            header: menulist[4].name,
            qa: receivementQA
        },
        {
            header: menulist[5].name,
            qa: protectionQA
        }
    ];

    function goToHeader(e) {
        if (searchTerm) {
            clearSearch();
            setTimeout(function() {
                scrollSpy.refresh();
                scrollToHeader(e);
            }, 300);
        } else {
            scrollToHeader(e);
        }
    }
    function scrollToHeader(e) {
        setTimeout(() => {
            const index = parseInt(e.detail.header);
            if (timeoutid) {
                clearTimeout(timeoutid);
            }
            scrollSpy.unblock();
            scrollSpy.block();
            window.scroll({
                top: scrollSpy._offsets[index] - 20,
                left: 0,
                behavior: "smooth"
            });
            timeoutid = setTimeout(() => {
                scrollSpy.unblock();
            }, 1000);
        });
    }

    let headers;

    let scrollSpy;

    let searching = false;
    let searchTerm = '';
    function onSearch(term) {
        searchTerm = term;
        searching = true;
    }
    function onSearchCanceled() {
        clearSearch();
    }
    function clearSearch() {
        searchTerm = '';
        searching = false;
        showClearSearchButton = false;
    }
    function onQuestionOpenChanged() {
        setTimeout(function() {
            scrollSpy.refresh();
        }, 300);
    }

    onMount(() => {
        headers = [AboutServiceHeader, OrderCheckoutHeader, PaymentHeader, DeliveryHeader, ReceivementHeader, ProtectionHeader];

        scrollSpy = new ScrollSpy(window, headers);
        const setIndex = e => {
            console.log("set index");
            currentMenuIndex = e.detail.index;
        };
        window.addEventListener("scrollspy-activate", setIndex);

        $mainStore.address.city = cityMeta;
    });
</script>
<style>
    .page {
        flex-basis: calc(100vw - 310px);
        min-width: 0;
        display: flex;
        flex-direction: column;
    }
    .with-background {
        background: linear-gradient(180deg, var(--color-light) 0%, rgba(255, 255, 255, 0) 100%), #F2F2F2;
        margin-bottom: 10px;
        flex-basis: 100%;
    }
    .page-content {
        border: 1px solid var(--gray-300);
        border-top: none;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        padding: 24px 80px 68px;
        min-height: calc(100% - 65px);
    }
    .no-results .page-content {
        min-height: calc(100% - 5.5rem - 70px - 52px);
    }
    #clear-search-button :global(button) {
        padding: 12px;
        width: 100%;
        margin-top: -4px;
        margin-bottom: 10px;
        font-size: 16px;
    }
    .page .page-content :global(.answer-wrapper) {
        max-width: 850px;
    }
    .search {
        margin: auto;
        position: relative;
        z-index: 3;
    }
    .page-content .search + :global(div:not(.search-results):not(.searching)) {
        margin-top: -38px;
    }
    .aside-nav-container {
        top: calc(5rem + 10px);
        flex: 0 0 310px;
        margin-left: 10px;
        margin-bottom: 10px;
        bottom: 10px;
        @apply sticky h-full;
    }
    .page-content .search-n-button + :global(div:not(.search-results):not(.searching)) {
        margin-top: -38px;
    }
    .page-content > div:last-child :global(.questions-category) {
        padding-bottom: 0;
    }

    @media screen and (max-width: 1300px) {
        .page-content {
            padding-bottom: 68px;
            padding-left: 44px;
            padding-right: 44px;
        }
        .page .page-content :global(.answer-wrapper) {
            max-width: 650px;
        }
    }
    @media screen and (max-width: 1300px) {
        .page-content {
            padding-top: 18px
        }
        #clear-search-button :global(button) {
            font-size: 15px;
        }
    }
    @media screen and (max-width: 940px) {
        .page {
            flex-basis: calc(100%);
        }
    }
</style>

<svelte:window
        on:resize={debounce(() => {
        scrollSpy.refresh();
        }, 100)} />

<svelte:head>
    <title>Помощь</title>
    <meta
            name="description"
            content="CONTACTS_DESCRIPTION" />

    <link rel="canonical" href="{$page.host + $page.path}" />

    <link rel="alternate" href="{$page.host + $page.path}" type="text/html" hreflang="ru" title="Русский">
    <link rel="alternate" href="{$page.host + $page.path}" type="text/html" hreflang="en" title="English">

    <meta
            name="keywords"
            content="Доставка цветов в Мурманске, Цветы с доставкой в Мурманске,
    Заказать цветы с доставкой в Мурманске, " />

    <meta name="geo.region" content="" />
    <meta name="geo.position" content="" />
    <meta name="geo.placename" content="" />
    <meta name="ICBM" content="" />
    <meta name="referrer" content="always" />

    <meta
            property="og:title"
            content="Надежная доставка цветов в Мурманске — Розарио.Цветы" />
    <meta
            property="og:description"
            content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в
    Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или
    банковской картой." />
    <meta property="og:image" content="ruka3.jpg" />
    <meta property="og:url" content="url" />
    <meta property="og:site_name" content="Розарио.Цветы" />
    <meta property="og:type" content="website" />

    <meta
            name="twitter:title"
            content="Надежная доставка цветов в Мурманске — Розарио.Цветы" />
    <meta
            name="twitter:description"
            content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в
    Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или
    банковской картой." />
    <meta name="twitter:image" content="ruka3.jpg" />
    <meta name="twitter:image:alt" content="Розарио.Цветы" />
    <meta name="twitter:card" content="summary" />

</svelte:head>
<div id="search-page">
    <div class="flex justify-between">
        <div class="w-full page"
             itemscope
             itemtype="https://schema.org/FAQPage">
            <div class="with-background">
                <Tabbar
                        pos="top: 5rem;"
                        className="sticky"
                        on:change={goToHeader}
                        {currentMenuIndex}
                        {menulist} />
                <div class="page-content"
                     bind:this={containerElement}>
                    <div class="search">
                        <HelpSearchInput {searching} {searchTerm} {onSearchCanceled} {onSearch} />
                    </div>

                    <div bind:this={AboutServiceHeader} class:searching="{searching}">
                        <div class:hidden="{searching}">
                            <HelpCategory header={qaList[0].header} qaList={qaList[0].qa} {onQuestionOpenChanged}></HelpCategory>
                        </div>
                    </div>
                    <div bind:this={OrderCheckoutHeader}>
                        <div class:hidden="{searching}">
                            <HelpCategory header={qaList[1].header} qaList={qaList[1].qa} {onQuestionOpenChanged}></HelpCategory>
                        </div>
                    </div>
                    <div bind:this={PaymentHeader}>
                        <div class:hidden="{searching}">
                            <HelpCategory header={qaList[2].header} qaList={qaList[2].qa} {onQuestionOpenChanged}></HelpCategory>
                        </div>
                    </div>
                    <div bind:this={DeliveryHeader}>
                        <div class:hidden="{searching}">
                            <HelpCategory header={qaList[3].header} qaList={qaList[3].qa} {onQuestionOpenChanged}></HelpCategory>
                        </div>
                    </div>
                    <div bind:this={ReceivementHeader}>
                        <div class:hidden="{searching}">
                            <HelpCategory header={qaList[4].header} qaList={qaList[4].qa} {onQuestionOpenChanged}></HelpCategory>
                        </div>
                    </div>
                    <div bind:this={ProtectionHeader}>
                        <div class:hidden="{searching}">
                            <HelpCategory header={qaList[5].header} qaList={qaList[5].qa} {onQuestionOpenChanged}></HelpCategory>
                        </div>
                    </div>
                    {#if searching}
                        <div class="search-results">
                            <HelpSearchResult {hasResultsChanged} {searching} {searchTerm} {qaList} />
                        </div>
                    {/if}
                </div>
            </div>
            {#if searching}
                {#if showClearSearchButton}
                    <div id="clear-search-button">
                        <Button on:click="{clearSearch}">Вернуться к списку вопросов</Button>
                    </div>
                {/if}
            {/if}
        </div>
        <div class="aside-nav-container">
            <AsideNavigation {recommendations} {navlist} />
        </div>
    </div>
</div>