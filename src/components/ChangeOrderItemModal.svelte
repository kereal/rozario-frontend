<script>
import { fade } from "svelte/transition";
import { createEventDispatcher } from "svelte";
import Portal from "./Portal.svelte";
import IconButton from "./IconButton.svelte";
import MiniProductCart from "./MiniProductCart.svelte";
import ModalSurface from "./ModalSurface.svelte";
import { onMount } from "svelte";

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
        width: 800px;
        height: 589px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        @apply rounded;
        background: #FFFFFF;
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        border-radius: 4px;

        z-index: 999999;
    }
    .close-button {
        top: 14px;
        right: 14px;
        @apply absolute;
        z-index:11;
    }
</style>

<ModalSurface css="width: 800px; height: 485px;" on:close={closeModal}>
    <div transition:fade on:click={closeViaOverlay} class="overlay">
        <div
                bind:this={modalElement}
                class="modal relative bg-white h-full rounded ">
            <div class="close-button">
                <IconButton on:click={closeModal} status="close" />
            </div>
            <MiniProductCart/>
        </div>
    </div>
</ModalSurface>