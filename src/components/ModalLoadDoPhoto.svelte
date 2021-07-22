<script>
    import { fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import Portal from "./Portal.svelte";
    import IconButton from "./IconButton.svelte";
    import MiniProductCart from "./MiniProductCart.svelte";
    import ModalSurface from "./ModalSurface.svelte";
    import { onMount } from "svelte";
    import Button from "./Button.svelte";
    import Croppie from "croppie";
    import CroppieContainer from './CroppieContainer.svelte'
    import { Navigation } from "swiper";

    let modalElement;
    export let visible;
    export let selected;
    let doPhoto = true;
    let donePhoto = false;
    const dispatch = createEventDispatcher();


    function closeViaOverlay(e) {
        if (modalElement && !modalElement.contains(e.target)) dispatch("close");
    }
    function closeModal() {
        dispatch("close");
        visible = !visible
    }

</script>

<style>

    .selectedPhoto  {
        padding-top: 40px;
    }
    h2 {
        font-weight: 600;
        font-size: 18px;
        color:var(--color-main);
    }
    .selectedPhoto p {
        font-size: 14px;
    }
.doPhoto{
    width: 350px;
    height: 350px;
    border: 2px dashed var(--gray-700);
    align-items:center;
    justify-content:center;
    font-weight: normal;
    font-size: 14px;
    display: flex;
    cursor: pointer;
}

</style>
        <div class="selectedPhoto">
            {#if doPhoto}
                <div class="doPhoto mb-24">
                </div>
            <div>
                <Button size="md" textClass="text-base" id="blob">
                   <span id="capture" class="text-base font-semibold">Сделать фото</span>
                </Button>
            </div>
            {/if}
        </div>
