<script>
    import IconButton from '../components/IconButton.svelte';
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";

    export let visible;
    export let size;
    export let header = true;
    export let title;
    export let disScroll = false;

    let modalElement;

    function closeViaOverlay(e) {
        if (modalElement && !modalElement.contains(e.target)) {
            closeModal()
        }
    }

  //  function preventDefault(e){
  //      e.preventDefault();
  //  }

  //  function disableScroll(){
  //      document.body.addEventListener('touchmove', preventDefault, { passive: false });
   // }
   // function enableScroll(){
   //     document.body.removeEventListener('touchmove', preventDefault, { passive: false });
   // }
    onMount(() => {
        stopScrolling()
    })
    function stopScrolling() {
        document.body.style.overflow = 'hidden'
    }

    function closeModal() {
        if (!disScroll) {
            document.body.style.overflow = 'scroll'
        }
        visible = false
    }

</script>

<style>

    .overlay {
        z-index: 999;
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        opacity:1;
    }

    .modal {
        background: var(--color-light);
        border-radius: 16px 16px 0px 0px;
        position: absolute;
        bottom:0;
        left: 0px;
        overflow: scroll;
        z-index:1000;
        overscroll-behavior: contain;
        -webkit-transform: translateZ(0px);
        -webkit-transform: translate3d(0,0,0);
        -webkit-perspective: 1000;
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
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
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


<div class="popup" id="popup">
    <div transition:fade on:touchstart={closeViaOverlay} class="overlay">
        <div
                bind:this={modalElement}
                class="modal"
                style="{size}"
                on:touchstart={stopScrolling}>
            {#if header}
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
            {:else}
                <div class="close-button flex items-center justify-center" on:click={closeModal} style="        position: absolute;
        top: 13px;
        right: 16px;
z-index:9999;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1L13 13M13 1L1 13" stroke="#330033" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            {/if}
            <div class="body"    style="{header === true ? 'max-height: calc(95vh - 73px); ': 'max-height: 100vh; border-radius: 16px 16px 0px 0px;'}">
                <slot></slot>
            </div>
        </div>
    </div>
</div>