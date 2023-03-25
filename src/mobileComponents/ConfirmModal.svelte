<script>
    import Button from "./Button.svelte";
    import { createEventDispatcher } from "svelte";

    export let text = ''
    export let confirm = 'ok'
    export let cancel = 'not ok'
    export let visible = false;
    const dispatch = createEventDispatcher();
    function handleConfirmation() {
        dispatch("functionConfirm");

    }
    function close() {
        visible = !visible
    }
    let modalElement;

    function closeViaOverlay(e) {
        if (modalElement && !modalElement.contains(e.target)) {
            closeModal()
        }
    }
</script>

<style>
    .overflow {
        z-index: 1000;
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
    }
    .modal {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        background: #FFFFFF;
        border-radius: 16px;
        width: calc(100% - 32px);
        padding: 24px 16px;
    }
    h2 {
        font-weight: 600;
        font-size: 15px;
        line-height: 135%;
        color: var(--color-main);
    }
</style>

<div class="overflow" on:touchstart={closeViaOverlay} >
    <div class="modal"
         bind:this={modalElement}>
        <h2>{text}</h2>
        <div class="buttons flex mt-16">
            <Button size="full" status="active-transparent" className="mr-8" on:click={handleConfirmation}>{confirm}</Button>
            <Button size="full" status="active-main" on:click={close}>{cancel}</Button>
        </div>
    </div>
</div>