<script>
    import HelpQuestion from "./HelpQuestion.svelte";
    export let searching;
    export let searchTerm;
    export let hasResultsChanged = function(val) {};
    export let qaList = [];
    export let hasResults = false;
    $: hasResultsChanged(hasResults);
    let filteredQuestions = [];
    let hasQuestionOpened = false;
    let openedQuestion;
    let questionOpened = function(qa) {
        openedQuestion = qa;
        hasQuestionOpened = true;
    };
    let questionClosed = function() {
        openedQuestion = null;
        hasQuestionOpened = false;
    };
    let qaBlock;
    let allQuestions = [];

    for (let i = 0; i < qaList.length; i++) {
        qaBlock = qaList[i];
        allQuestions = allQuestions.concat(qaBlock.qa);
    }

    $: filteredQuestions = allQuestions.filter(function (qa) {
        return qa.question.indexOf(searchTerm) !== -1;
    });
    $: hasResults = filteredQuestions.length > 0;
</script>
<style>
    ul {
        transition: top .3s;
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
    div svg {
        margin: 64px auto 0;
    }
    p {
        padding-top: 18px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 130%;
        color: var(--color-main);
    }

    @media screen and (max-width: 1300px) {
        p {
            font-size: 15px;
            line-height: 135%;
        }

        div svg {
            margin: 66px auto 0;
        }
    }
</style>
<div>
{#if hasResults}
    <ul class="custom-scrollbar" class:with-opened-question="{hasQuestionOpened}">
    {#each filteredQuestions as qa}
        <li>
            <HelpQuestion {searching} {searchTerm} {questionOpened} {questionClosed} {qa} {openedQuestion} />
        </li>
    {/each}
    </ul>
{:else}
    <p>По вашему запросу ничего не найдено. Попробуйте изменить запрос.</p>
    <div>
        <svg width="103" height="103" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M71.0413 71.8438L100 100M82.551 42.7605C82.551 64.7196 64.7429 82.521 42.7755 82.521C20.8081 82.521 3 64.7196 3 42.7605C3 20.8014 20.8081 3 42.7755 3C64.7429 3 82.551 20.8014 82.551 42.7605Z" stroke="#C4C4C4" stroke-width="6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="30.3077" cy="38.3077" r="5.30769" fill="#C4C4C4"/>
            <circle cx="55.0767" cy="38.3077" r="5.30769" fill="#C4C4C4"/>
            <path d="M51.5383 58.9998C51.5383 55.0913 47.9738 51.9229 43.5768 51.9229C39.1797 51.9229 35.6152 55.0913 35.6152 58.9998" stroke="#C4C4C4" stroke-width="4" stroke-linecap="round"/>
        </svg>
    </div>
{/if}
</div>
