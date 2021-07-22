<script>
    import { createEventDispatcher } from "svelte";
    import ModalSurface from "./ModalSurface.svelte";
    import LinkButton from "./LinkButton.svelte";
    import Envelope from "./icons/Envelope.svelte";

    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch("close");
    }

    // FIXME get from store
    export let deal = 0;
</script>

<style>
    .columns {
        display: flex;
        padding: 24px 10px 0;
    }
    .columns > div:first-child {
        max-width: 465px;
        margin-right: auto;
    }
    h2 {
        margin-bottom: 12px;
        font-weight: bold;
        font-size: 22px;
        line-height: 135%;
        color: var(--color-main);
    }
    p {
        margin-bottom: 8px;
    }
    a {
        color: #1039C9;
    }
    a:hover {
        color: var(--color-info);
    }
    .buttons :global(a),
    .buttons :global(button) {
        padding: 12px 34px;
        margin-right: 24px;
        font-size: 16px;
        line-height: 130%;
        height: auto;
    }
    .buttons {
        margin-top: 51px;
        display: flex;
    }
    .buttons :global(.change-email) {
        font-weight: 400;
    }
    .buttons :global(.change-email:not(:hover)) {
        background: var(--gray-1000);
        color: var(--color-main);
    }
</style>

<ModalSurface css="height:335px; width: 800px;" on:close={closeModal}>
    <div class="columns">
        <div>
            <h2>Изменить e-mail</h2>
            <p>Мы отправили ссылку для изменения e-mail вам на почту.</p>
            <p>Если вы нажали кнопку по ошибке, просто проигнорируйте письмо.</p>
            <p>Будут вопросы — пишите на <a href="mailto:sima@rozarioflowers.ru">sima@rozarioflowers.ru</a>.</p>
            <div class="buttons">
                <LinkButton href="/blog" on:click="{closeModal}">Перейти в блог</LinkButton>
            </div>
        </div>
        <Envelope />
    </div>
</ModalSurface>

