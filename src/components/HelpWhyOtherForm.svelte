<script>
    import Button from "./Button.svelte";
    export let sentNoResponse = function() {};
    let showError = false;
    let why = '';
    function sendClicked(event) {
        event.stopPropagation();
        if (!why.trim().length) {
            showError = true;
        } else {
            showError = false;
            sentNoResponse();
        }
    }
    function stopPropagation(event) {
        event.stopPropagation();
    }
</script>
<style>
    .wrapper {
        background: #fff;
        padding: 24px;
        display: flex;
        flex-direction: column;
        align-items: baseline;
    }
    h3 {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 130%;
        margin-bottom: 16px;
        color: var(--color-main);
    }
    textarea {
        background: var(--color-light);
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        border-radius: 4px;
        margin-bottom: 14px;
        padding: 7px 12px;
        height: 88px;
        width: 100%;
        resize: none;
    }
    textarea.error {
        border-color: var(--color-error);
    }
    .error-message {
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 120%;
        text-align: right;
        color: var(--color-error);
        position: absolute;
        top: 0;
        right: 0;
        margin-top: -2px;
    }
    .error-message-wrapper {
        position:relative;
        width: 100%;
    }
</style>
<div class="wrapper" on:click="{stopPropagation}">
    <h3><label for="why-textarea">Расскажите, что вам не понравилось:</label></h3>
    <textarea id="why-textarea" bind:value="{why}" class:error="{showError}"></textarea>
    {#if showError}
    <div class="error-message-wrapper">
        <p class="error-message">Заполните это поле</p>
    </div>
    {/if}
    <Button
            textClass="text-base"
            status="active-main"
            size="lg"
            on:click="{sendClicked}">
        Отправить
    </Button>
</div>
