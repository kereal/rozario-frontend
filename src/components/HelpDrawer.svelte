<script>
    import { createEventDispatcher } from "svelte";
    import {onMount} from "svelte";
    import Portal from "./Portal.svelte";
    import { linear, cubicInOut, expoInOut } from "svelte/easing";
    import HelpQuestion from './HelpQuestion.svelte';
    import HelpSearchInput from './HelpSearchInput.svelte';
    import HelpSearchResult from './HelpSearchResult.svelte';
    import Button from './Button.svelte';
    export let buttonRef;
    let menuElement;
    let search;
    let opened = false;
    let closed = false;
    let link;
    let openedQuestion;
    const dispatch = createEventDispatcher();

    function closeMenu(e) {
        if (link && link.contains(e.target)) {
            close();
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (buttonRef && buttonRef.contains(e.target)) {
            return;
        }
        if (menuElement && !menuElement.contains(e.target)) {
            close();
        }
    }
    function forceCloseMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        close();
    }
    function close() {
        opened = false;
        closed = true;
        setTimeout(() => {
            dispatch("close");
        }, 1000);
    }

    let qaList = [
        {
            header: 'Частые вопросы:',
            qa: [
                {question:'Как связаться с курьером?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
                {question:'Как отменить заказ?', answer:'Чтобы отменить заказ, нажмите на кнопку «Отменить» в соответствующем заказе в личном кабинете (ссылка приходит при оформлении заказа в смс и на электронную почту)'},
                {question:'От чего зависит стоимость доставки?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
                {question:'Можно доставить заказ к точному времени?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
                {question:'Как я узнаю о доставке заказа?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
                {question:'Как я узнаю о доставке заказа?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'}
            ]
        }
    ];
    let searching = false;
    let searchTerm = '';
    function onSearch(term) {
        searchTerm = term;
        searching = true;
    }
    function onSearchCanceled() {
        searchTerm = '';
        searching = false;
    }


    let hasQuestionOpened = false;
    let questionOpened = function(qa) {
        hasQuestionOpened = true;
        openedQuestion = qa;
    };
    let questionClosed = function() {
        hasQuestionOpened = false;
        openedQuestion = null;
    };
    let openHelpPage = function() {
        console.log('open help page');
    };
    setTimeout(() => opened = true, 10);
</script>
<style>
    div.wrapper {
        position: fixed;
        top: 0;
        z-index: 30;
        bottom: 0;
        background: var(--color-light);
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        box-shadow: 0px 4px 15px rgba(51, 0, 51, 0.1);
        border-radius: 4px;
        width: 500px;
        padding: 24px 34px 34px;

        right: -500px;
        opacity: 0;
        transition: right .6s, opacity .6s;
    }
    div.wrapper.opened {
        right: 0;
        opacity: 1;
    }
    .close {
        position: absolute;
        top: 16px;
        right: 16px;
        cursor: pointer;
    }
    h2 {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 115%;
        color: var(--color-main);
        margin-bottom: 24px;
    }
    h2 span {
        font-weight: 300;
    }
    h3 {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 115%;
        color: var(--color-main);
        padding-top: 40px;
    }

    .with-opened-question :global(.question-wrapper:not(.opened):not(:hover) .question) {
        color: var(--gray-700);
    }
    .with-opened-question :global(.question-wrapper:not(.opened):not(:hover) path) {
        fill: var(--gray-700);
    }
    .with-opened-question :global(.question-wrapper:not(.opened)) {
        border-color: var(--gray-300);
    }
    .with-opened-question .show-all-questions {
        color: var(--color-info-light);
    }
    .with-opened-question .show-all-questions path {
        stroke: var(--color-info-light);
    }
    .wrapper :global(ul) {
        list-style: none;
        position: absolute;
        top: 209px;
        right: 17px;
        padding-right: 17px;
        left: 34px;
        bottom: 120px;
        overflow-y: auto;
    }
    .wrapper :global(.answer-wrapper) {
        max-width: 405px;
    }
    .search > :global(div) {
        width: 100%;
    }
    .bottom-button :global(button) {
        padding: 12px 34px;
        font-size: 16px;
    }
    .bottom-button {
        padding: 34px;
        background: var(--color-light);
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .bottom-button a {
        display: inline-block;
    }

    .search :global(input) {
        height: 45px;
        padding-top: 7px;
        padding-left: 37px;
        font-size: 15px;
    }
    .search :global(i) {
        top: 16px;
    }
    .search :global(svg) {
        width: 14px;
        height: 14px;
    }
    .wrapper.searching :global(ul) {
        top: 150px;
    }
    .wrapper.searching :global(ul.with-opened-question) {
        top: 150px;
    }
    .wrapper :global(p) {
        padding-top: 15px;
    }
    .wrapper :global(.questions-category li:first-child .question-wrapper .toggler),
    .wrapper :global(.custom-scrollbar li:first-child .question-wrapper .toggler) {
        padding-top: 0;
    }
    div.wrapper :global(.answer-wrapper) {
        margin-right: 24px;
    }

    @media screen and (max-width:1300px) {
        div.wrapper {
            width: 35%;
            padding: 24px 29px 34px;

            right: -450px;
            transition: right .5s, opacity .5s;
        }
        .bottom-button {
            padding: 34px 34px 24px;
        }
        .wrapper :global(p) {
            padding-top: 11px;
        }
        div.wrapper :global(.answer-wrapper) {
            max-width: 365px;
        }
        div.wrapper :global(ul) {
            padding-right: 8px;
            top: 196px;
            left: 28px;
            bottom: 106px;
        }
        .wrapper.searching :global(ul) {
            top: 139px;
        }
        .wrapper :global(h3) {
            font-size: 18px;
            padding-top: 36px;
        }
        .wrapper :global(button) {
            font-size: 15px;
        }
    }
    @media screen and (max-width:1100px) {
        .wrapper :global(button) {
            padding: 10px 16px;
        }
    }
    @media screen and (max-width:1000px) {
        div.wrapper {
            width: 350px;
            padding: 24px 24px 34px;
            right: -350px;
            transition: right .3s, opacity .3s;
        }
        div.wrapper :global(h2) {
            font-size: 22px;
            margin-bottom: 16px;
        }
        div.wrapper :global(h3) {
            padding-top: 26px;
        }
        div.wrapper :global(.answer-wrapper) {
            max-width: 280px;
            padding-bottom: 16px;
        }
        div.wrapper :global(ul) {
            padding-right: 8px;
            top: 173px;
            left: 25px;
            right: 13px;
            bottom: 90px;
        }
        .wrapper.searching :global(ul) {
            top: 127px;
        }
        div.wrapper :global(.have-found-answer button) {
            margin-top: 9px;
        }
        .bottom-button {
            padding: 22px;
        }
        .wrapper :global(p) {
            padding-top: 18px;
        }
        .bottom-button :global(button) {
            padding: 10px 24px;
        }
    }
</style>
<svelte:body on:click={closeMenu} on:resize={closeMenu} />

<div class="wrapper"
     class:searching="{searching}"
     class:opened="{opened}"
     bind:this={menuElement}>
    <div class="close" on:click="{forceCloseMenu}">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L17 17M17 1L1 17" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
    <h2>Розарио <span>Справка</span></h2>
    <div class="search">
        <HelpSearchInput bind:this="{search}" {onSearchCanceled} {onSearch} />
    </div>
    {#if !searching}
        <h3>Часто задаваемые вопросы:</h3>
        <ul
            class:with-opened-question="{hasQuestionOpened}"
            class="questions-category custom-scrollbar">
            {#each qaList[0].qa as qa}
                <li>
                    <HelpQuestion {questionOpened} {questionClosed} {qa} {openedQuestion} />
                </li>
            {/each}
        </ul>
    {:else}
        <HelpSearchResult {searching} {searchTerm} {qaList} />
    {/if}
    <div class="bottom-button">
        <a href="help"
           bind:this={link}>
            <Button>
                Перейти на страницу помощи
            </Button>
        </a>
    </div>
</div>

