<script>
    import HelpQuestion from "./HelpQuestion.svelte";
    export let header = '';
    export let className = 'questions-category';
    export let qaList;
    export let onQuestionOpenChanged = () => {};
    let allQuestionsOpened = false;
    let hasQuestionOpened = false;
    let openedQuestion;
    let showAllQuestionsButton = qaList && qaList.length > 5;
    let firstFive = [];
    let hiddenQuestions = [];
    if (qaList) {
        showAllQuestionsButton = qaList.length > 5;
        firstFive = qaList.slice(0, 5);
        hiddenQuestions = qaList.slice(5);
    }
    let questionOpened = function(qa) {
        openedQuestion = qa;
        hasQuestionOpened = true;
        onQuestionOpenChanged();
    };
    let questionClosed = function() {
        openedQuestion = null;
        hasQuestionOpened = false;
        onQuestionOpenChanged();
    };
    let openAllQuestions = function() {
        showAllQuestionsButton = false;
    };
</script>
<style>
    h2 {
        padding: 4px 0 2px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 135%;
        color: var(--color-main);
        padding-top: 38px;
    }
    .questions-category  {
        max-width: 1028px;
        padding-bottom: 10px;
        margin: auto;
    }
    .questions-category_withoutMargin {
        width: 100%;

    }
    .show-all-questions {
        background: none;
        border: none;
        cursor: pointer;
        font-family: Open Sans, sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 135%;
        color: var(--color-info);
        margin-top: 24px;
    }
    .show-all-questions:hover {
        color: var(--color-main);
    }
    .show-all-questions:hover path {
        stroke: var(--color-main);
    }
    .show-all-questions:active {
        color: var(--color-info);
    }
    .show-all-questions:active path {
        stroke: var(--color-info);
    }
    .show-all-questions svg {
        display: inline-block;
        vertical-align: top;
        margin-top: 7px;
        margin-left: 4px;
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
    ul {
        padding-top: 7px;
    }
    @media (max-width: 1300px) {
        ul {
            padding-top: 0;
        }
        h2  {
            padding-top: 38px;
        }
    }
    @media (max-width: 1000px) {
        h2 {
            font-size: 22px;
            padding-bottom: 0;
            padding-top: 27px;
        }
        ul {
            padding-top: 1px;
        }
        .show-all-questions {
            margin-top: 19px;
        }
    }
</style>
<div
    class:with-opened-question="{hasQuestionOpened}"
    class="{className}"
    data-scrollspy>

    {#if header}
        <h2>{header}</h2>
    {/if}
     <ul>
        {#each firstFive as qa}
            <li>
                <HelpQuestion {questionOpened} {questionClosed} {qa} {openedQuestion} />
            </li>
        {/each}
        {#if !showAllQuestionsButton}
            {#each hiddenQuestions as qa}
                <li>
                    <HelpQuestion {questionOpened} {questionClosed} {qa} {openedQuestion} />
                </li>
            {/each}
        {/if}
    </ul>
    {#if showAllQuestionsButton}
    <button class="show-all-questions" on:click="{openAllQuestions}">Все вопросы
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1L4.99643 5L1 1" stroke="#E71F75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
    {/if}
</div>
