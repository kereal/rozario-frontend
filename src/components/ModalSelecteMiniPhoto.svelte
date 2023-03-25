<script>
    import { fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";
    import Button from "./Button.svelte";
    import CroppieContainer from './CroppieContainer.svelte'


    let modalElement;
    export let visible;
    export let selected;
    export let fullImage;
    export let miniBlob;
    let loadFile = true;
    let crouppieActive = false;
    const dispatch = createEventDispatcher();


    function closeViaOverlay(e) {
        if (modalElement && !modalElement.contains(e.target)) dispatch("close");
    }
    function closeModal() {
        dispatch("close");
        visible = !visible
    }

    let newPhoto;
    let photoFile;
    let img;
    let photo;

    $: if(newPhoto) {
        let input = document.getElementById("fileCheck");
        let fReader = new FileReader();
        fReader.readAsDataURL(input.files[0]);
        fReader.onloadend = function(event){
            fullImage = event.target.result;
            loadFile = false;
            crouppieActive = true;
        }
    }
</script>

<style>
    h2 {
        font-weight: 600;
        font-size: 18px;
        color:var(--color-main);
    }
    .selectedPhoto  {
        padding-top: 40px;
    }
    .selectedPhoto p {
        font-size: 14px;
    }

    .loadWindow{
        width: 350px;
        height: 350px;
        border-radius: 4px;
        border: 2px dashed var(--gray-700);
        background-image: url("../../static/loading-bg-image.svg");
        align-items:center;
        justify-content:center;
        font-weight: normal;
        font-size: 14px;
        display: flex;
        cursor: pointer;
    }
    input[type="file"] {
        display: none;
    }
</style>

<div class="selectedPhoto">
    {#if loadFile}
        <input type="file" id="fileCheck" accept="image/*,image/jpeg,image/jpg,image/png" bind:value={newPhoto} >
        <label for="fileCheck">
            <div class="loadWindow">
                <span>Пожалуйста, добавьте фотографию.  </span>
            </div>
        </label>
        <div class="mt-24">
            <Button textClass="text-base" size="md" id="blob" class="mt-24">
                <label for="fileCheck">
                    <span class="text-base font-semibold">Загрузить фото</span>
                </label>
            </Button>
        </div>
    {/if}
    {#if crouppieActive}
        <div class="ImageCropper">
            <div class="ImageCropper__croppie">
                <CroppieContainer bind:selected={selected} bind:visible={visible} bind:fullImage={fullImage} bind:miniBlob={miniBlob}/>
            </div>
        </div>
    {/if}
</div>

