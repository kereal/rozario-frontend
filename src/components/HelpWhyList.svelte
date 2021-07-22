<script>
    export let sentNoResponse = function() {};
    export let selectedOtherNo = function() {};
    function otherSelected(event) {
        event.stopPropagation();
        selectedOtherNo();
    }
    function sendResult(event) {
        event.stopPropagation();
        sentNoResponse();
    }
</script>
<style>
    div {
        background: #fff;
        padding: 24px;
    }
    h3 {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 130%;

        color: var(--color-main);
        margin-bottom: 4px;
    }
    button {
        margin-top: 12px;
        background: transparent;
        border: none;
        cursor: pointer;
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 135%;
        color: var(--gray-600);
        width: 100%;
        text-align: left;
    }
    button:hover {
        color: var(--color-main);
    }
    button:active {
        color: var(--gray-600);
    }
</style>
<div>
    <h3>Уточните,почему:</h3>
    <button on:click="{sendResult}">Текст трудно понять</button>
    <button on:click="{sendResult}">Содержание ответа не соответствует заголовку</button>
    <button on:click="{sendResult}">Рекомендации не помогли</button>
    <button on:click="{sendResult}">Нет ответа на мой вопрос</button>
    <button on:click="{otherSelected}">Другая причина</button>
</div>
