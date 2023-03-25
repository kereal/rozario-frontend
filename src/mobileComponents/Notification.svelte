<script>
    import IconButton from '../components/IconButton.svelte';
    import { fade } from "svelte/transition";
    export let text;
    export let title;
    export let visible;
    let modalElement;

    import { onMount } from "svelte";

    function closeViaOverlay(e) {
        if (modalElement && !modalElement.contains(e.target)) {
            closeModal()
        }
    }
    function stopScrolling() {
        document.body.style.overflow = 'hidden'
    }
    function closeModal() {
        document.body.style.overflow = 'scroll'
        visible = false
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
        width: 100%;
        height: 170px;
        left: 0px;
        background: var(--color-light);
        border-radius: 16px 16px 0px 0px;
        position: absolute;
        bottom:0;
    }
    h3 {
        font-weight: 600;
        font-size: 20px;
        line-height: 125%;
        color: var(--color-main);
    }
    p {
        font-size: 14px;
        line-height: 135%;
        color: var(--gray-600);
    }
    .header {
        height: 73px;
        border-bottom: 1px solid var(--gray-300);
        padding: 16px;
    }
    .body {
        padding: 16px;
    }
    .close-button {
        width: 30px;
        height: 30px;
        background: #FFFFFF;
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        box-shadow: 0px 4px 15px rgba(51, 0, 51, 0.1);
        border-radius: 50%;
    }
</style>


<div class="notification">
    <div transition:fade on:click={closeViaOverlay} class="overlay">
        <div
                bind:this={modalElement}
                class="modal"         on:touchstart={stopScrolling()}>
            <div class="header flex items-center justify-between">
                <h3>
                    {title}
                </h3>
                <div class="close-button flex items-center justify-center" on:click={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1L13 13M13 1L1 13" stroke="#330033" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div class="body">
                <p>{text}</p>
            </div>
        </div>
    </div>
</div>