<script>
    export let showModal;
    export let toggleModal;
    export let deleteCard;
    export let cardDeleted;

    const doDeleteToggle = () => {
        deleteCard();
    }

    const toggleModalWrap = (value) => {
        toggleModal(value);
    }
</script>

<style lang="postcss">

    .delete-modal-wrap {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.4);
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s ease-in-out;
    }

    .delete-modal-wrap--show {
        opacity: 1;
        visibility: visible;
    }

    .delete-modal {
        width: 400px;
        padding: 24px;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 4px;
        position: relative;
        visibility: hidden;
        opacity: 0;
        transition: all 0.2s ease-in-out;
    }

    .delete-modal--show {
        visibility: visible;
        opacity: 1;
    }

    .delete-modal__cross {
        position: absolute;
        top: 16px;
        right: 16px;
        cursor: pointer;
    }

    .delete-modal__cross:hover svg path {
        stroke: var(--gray-700);
    }

    .delete-modal__heading {
        font-size: 15px;
        line-height: 20px;
        max-width: 80%;
    }

    .delete-modal__buttons {
        margin-top: 18px;
        display: flex;
        align-items: center;
    }

    .delete-modal__button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 46px;
        width: auto;
        border-radius: 4px;
        padding: 10px 34px;
        @apply text-main;
        @apply bg-accent;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        margin-right: 24px;
    }

    .delete-modal__button--gray {
        @apply bg-gray-300;
    }

    .delete-modal__button:hover {
        @apply bg-info;
        @apply text-light;
    }

</style>

<section class="delete-modal-wrap {showModal ? 'delete-modal-wrap--show' : ''}" on:click={() => toggleModalWrap(false)}>
    <div class="delete-modal {showModal ? 'delete-modal--show' : ''}" on:click={e => e.stopPropagation()}>
        <div class="delete-modal__cross" on:click={() => toggleModalWrap(false)}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L17 17M17 1L1 17" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        {#if cardDeleted}
            <h3 class="delete-modal__heading text-main">Товар удалён из избранного.</h3>
        {:else}
            <h3 class="delete-modal__heading text-main">Вы действительно хотите удалить этот товар из избранного?</h3>
            <div class="delete-modal__buttons">
                <button class="delete-modal__button" on:click={(e) => {e.stopPropagation(); toggleModalWrap(false);}}>Нет</button>
                <button class="delete-modal__button delete-modal__button--gray" on:click={e => {e.stopPropagation(); doDeleteToggle();}}>Да</button>
            </div>
        {/if}
    </div>
</section>