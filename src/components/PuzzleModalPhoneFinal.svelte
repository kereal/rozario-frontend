<script>
    import { createEventDispatcher } from "svelte";
    import ModalSurface from "./ModalSurface.svelte";
    import LinkButton from "./LinkButton.svelte";

    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch("close");
    }
</script>

<style>
    .data-wrapper {
        display: flex;
        height: 100%;
    }
    .data {
        max-width: 202px;
        margin: auto;
        text-align: center;
    }
    h3 {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 18px;
    }
    h3 svg {
        margin-right: 12px;
    }
    .text-main {
        font-size: 14px;
        line-height: 135%;
        margin: 31px auto 24px;

        color: var(--color-main);
    }
    .data :global(a) {
        font-size: 15px;
        width: 202px;
        height: 44px;
        line-height: 135%;
        padding: 12px;
    }
</style>

<ModalSurface css="height:270px; width: 527px;" on:close={closeModal}>
    <div class="data-wrapper">
        <div class="data">
            <h3>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="26" height="26" rx="13" fill="#FFDC00"/>
                    <path d="M19 11L12.8462 17L9 13.25" stroke="#330033" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <rect x="1" y="1" width="26" height="26" rx="13" stroke="#FFDC00" stroke-width="2"/>
                </svg>
                Купон получен
            </h3>
            <div class="text-main">Вы сможете использовать его при оформлении заказа.</div>

            <LinkButton
                    on:click={closeModal}
                    href="/catalog"
                    size="lg"
                    status="active-main">Перейти в каталог</LinkButton>
        </div>
    </div>
</ModalSurface>
