<script>
    import { fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import Portal from "./Portal.svelte";
    import IconButton from "./IconButton.svelte";
    export let size = 'sm';

    let modalElement;

    const dispatch = createEventDispatcher();

    function closeViaOverlay(e) {
        if (modalElement && !modalElement.contains(e.target)) dispatch("close");
    }

    function closeModal() {
        dispatch("close");
    }
</script>

<style>
    .overlay {
        z-index: 1000;
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
    }
    .modal {
        width: 400px;
        height: 147px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        @apply rounded;
    }
    .modal p {
        margin-right:40px
    }
    .close-button {
        top: 14px;
        right: 14px;
        @apply absolute;
    }

    h3 {
        font-weight: 600;
        font-size: 18px;
        line-height: 130%;
        color: var(--color-main);
    }
    p {
        border-top: 1px solid var(--gray-300);
        color: var(--gray-600);
        font-weight: normal;
        font-size: 15px;
        line-height: 135%;
        padding-top: 18px;
        margin-top: 18px;
    }
</style>

<Portal>
    <div transition:fade on:click={closeViaOverlay} class="overlay">
           <div
                bind:this={modalElement}
                class="bg-white h-full rounded-lg modal relative px-24 {size === 'sm' ? 'py-24' : 'py-34'}">
               <h3>
                   Купон получен!
               </h3>
            <p>Вы сможете использовать его для оплаты при оформлении заказа.</p>
            <div class="close-button">
                <IconButton on:click={closeModal} status="close" />
            </div>
        </div>
    </div>
</Portal>