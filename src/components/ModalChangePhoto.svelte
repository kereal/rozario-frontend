<script>
    import { fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import Portal from "./Portal.svelte";
    import IconButton from "./IconButton.svelte";
    import ModalSelecteMiniPhoto from './ModalSelecteMiniPhoto.svelte'
    import ModalLoadDoPhoto from './ModalLoadDoPhoto.svelte'
    import Button from "./Button.svelte";
    import {onMount} from "svelte";
    import Croppie from "croppie";

    let modalElement;
    export let visible;
    export let selected;
    export let fullImage;
    export let miniBlob;
    export let modalSelecteMiniPhoto;
    export let photos = [
        './miniPhoto1.png',
        './miniPhoto1.png',
        './miniPhoto1.png',
        './miniPhoto1.png',
        './miniPhoto1.png',
        './miniPhoto1.png',
        './miniPhoto1.png',
        './miniPhoto1.png',
        './miniPhoto1.png',
        './miniPhoto1.png',
        './miniPhoto1.png',
        './miniPhoto1.png'
    ];

    let selectedReason = 'Не планирую больше совершать покупки';
    let selectedItem ='Текущее';
    let modalErrorLoad = false;
    let modalMaxPhoto = false;
    let changePhoto__menu_selectedItem = false;
    let el
    let vanilla
    let newPhoto;
    let photoFile;
    let zoom;
    const dispatch = createEventDispatcher();

    function closeViaOverlay(e) {
        if (modalElement && !modalElement.contains(e.target)) dispatch("close");
    }
    function closeModal() {
        dispatch("close");
        visible = !visible;
    }
    function croppied() {
        vanilla.result('blob').then(
                function(blob) {
                    var URLObj = window.URL || window.webkitURL;
                    var source = URLObj.createObjectURL(blob);
                    newPhoto = source
                    selected = newPhoto
                    visible = false;
                });
    }

    function activateCroppie(url) {
        el = document.getElementById('CroppieContainer__croppieFirst');
        vanilla = new Croppie(el,
                {
                    viewport: { width: 350, height: 350, type:'circle' },
                    boundary: { width: 350, height: 350 },
                    enableExif: true
                });
        vanilla.bind({
            url: url,
            points: miniBlob.points
        });
    }
    function minus() {
        zoom = vanilla.get().zoom
        zoom = zoom - 0.1
        vanilla.bind({
            url: fullImage,
            zoom: zoom
        })
    }
    function plus() {
        zoom = vanilla.get().zoom
        zoom = zoom + 0.1
        vanilla.bind({
            url: fullImage,
            zoom: zoom
        })
    };
    onMount(async() => {
        if(selected != 'initials' && selected != './miniPhoto1.png') {
            activateCroppie(fullImage)
        } else if(selected == './miniPhoto1.png')
            el = document.getElementById('CroppieContainer__croppieFirst');
            vanilla = new Croppie(el,
                    {
                        viewport: { width: 350, height: 350, type:'circle' },
                        boundary: { width: 350, height: 350 },
                        enableExif: true
                    });
            vanilla.bind({
                url: './miniPhoto1.png',
            });
        })
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
        width: 608px;
        height: 482px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        @apply rounded;
        background: #FFFFFF;
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        border-radius: 4px;
        z-index: 999999;
        font-size: 15px;
        line-height: 135%;
        color: var(--color-main);
        overflow: hidden;
    }
    .close-button {
        top: 14px;
        right: 14px;
        @apply absolute;
        z-index:11;
    }
    .minus {
        position: absolute;
        color: var(--gray-200);
        font-size: 33px;
        top: 342px;
        left: 332px;
        z-index:1000;
    }
    .plus {
        position: absolute;
        color: var(--gray-200);
        top: 344px;
        left: 448px;
        font-size: 25px;
        z-index:1000;
    }
    h2 {
        font-weight: 600;
        font-size: 18px;
        color: var(--color-main);
    }
    .changePhoto {

    }
    .changePhoto__menu {
        width: 30.2%;
        height: 482px;
        background-color: var(--gray-200);
        padding-top: 25px;
    }
    .changePhoto__menu_item {
        width: 184px;
        height: 40px;
        padding-top: 8px;
        padding-left: 24px;
        transition: all 0.2s ease-out;
    }

    .changePhoto__menu_item:hover {
        background: var(--gray-1000);
    }
    .changePhoto__content {
        width: 69.8%;
        padding-left: 34px;

    }
    .text {
        font-size: 14px;
        color: var(--gray-600);
        margin-top: 12px;
    }
    .photos {
        display: flex;
        flex-wrap:wrap;
        justify-content:space-between;
        height: 392px;
        overflow-y: scroll;
        padding-right: 24px;
    }

    .miniPhoto {
        width: 104px;
        height: 104px;
        background: #CBF2FF;
        clip-path: circle(50% at center center);
        display: flex;
        justify-content:center;
        align-items:center;
        border-radius:50%;
        border: 3px solid  #CBF2FF;
        font-weight: 600;
        font-size: 48px;
        line-height: 115%;
        letter-spacing: -0.03em;
        color: var(--color-main);
        transition: all 0.2s ease-out;
    }
    .miniPhoto:nth-child(-n+3) {
        margin-top: 40px;
    }
    .miniPhoto:last-child {
        margin-bottom: 24px;
    }
    .miniPhotoSelected {
        border: 3px solid  var(--color-info-light);
    }
    .gradient-shadow {
        -webkit-box-shadow: inset 0px -25px 14px -5px rgb(255, 255, 255);
        -moz-box-shadow: inset 0px -25px 14px -5px rgb(255, 255, 255);
        box-shadow: inset 0px -50px 29px -9px rgb(255, 255, 255);
        height: 55px;
        width: calc(424px - 10px);
        position: absolute;
        left: 184px;
        bottom: 73px;
        transition: all 0.5s ease-out;
        opacity: 1;
    }
    .gradient-shadow_top {
        -webkit-box-shadow: inset 0px 25px 14px 5px rgb(255, 255, 255);
        -moz-box-shadow: inset 0px 25px 14px 5px rgb(255, 255, 255);
        box-shadow: inset 0px 40px 25px -14px rgb(255, 255, 255);
        height: 40px;
        width: calc(424px - 10px);
        position: absolute;
        left: 184px;
        top: 0px;
        transition: all 0.5s ease-out;
        opacity: 1;
        z-index:2;
    }
    .miniPhoto:hover {
        border: 3px solid  var(--color-info);
    }
    .letters{
        font-size: 155px;
    }
    .thisPhoto{
        width: 350px;
        height: 350px;
        background: #CBF2FF;
        clip-path: circle(50% at center center);
        display: flex;
        justify-content:center;
        align-items:center;
        border-radius:50%;
        border: 3px solid  #CBF2FF;
        font-weight: 600;
        font-size: 48px;
        line-height: 115%;
        letter-spacing: -0.03em;
        color: var(--color-main);
        transition: all 0.2s ease-out;
    }
    .thisPhoto img{
        width: 350px;
        height: 350px;
    }

    input[type="radio"] {
        display: none;
    }

    input:checked + label {
        font-weight: 600;
        font-size: 15px;
        background: var(--color-accent);
    }
    input[type="radio"] label {
        width: 184px;
        height: 40px;
        font-weight: normal;
        font-size: 15px;
        line-height: 135%;
        color: var(--color-main);
        padding-left: 24px;
    }
    .CroppieContainer {
        overflow:hidden;
        padding-left: -10px !important;
    }
    .CroppieContainer__controller {
        display: flex;
    }

    .CroppieContainer__controller button {

    }
    :global(.cr-slider-wrap) {
        z-index:999 !important;
        margin: -47px 0 0 115px !important;
        position: absolute;
        width: 153px !important;
        height: 26px;
        background: rgba(51, 0, 51, 0.8);
        border-radius: 30px;
    }
    :global(.cr-slider) {
        width: 90px !important;
        padding-bottom: 1px  !important;
    }
    :global(input[type=range]::-webkit-slider-runnable-track) {
        width: 300px;
        height: 5px;
        background: var(--gray-700);
        border-radius: 3px;
    }

    :global(input[type=range]::-webkit-slider-thumb) {
        -webkit-appearance: none;
        border: none;
        height: 16px;
        width: 16px;
        background: white;
    }
    :global(.cr-viewport) {
        border:none !important;
        box-shadow: 0 0 2000px 2000px rgba(51, 0, 51, 0.4) !important;
    }
    :global(.croppie-container) {
        margin-left: -15px !important;
    }
</style>
    <div transition:fade on:click={closeViaOverlay} class="overlay">
        <div
                bind:this={modalElement}
                class="modal relative bg-white h-full rounded ">
            <div class="close-button">
                <IconButton on:click={closeModal} status="close" />
            </div>
            <div class="changePhoto flex">
                <div class="changePhoto__menu">
                    <ul>
                        <input type="radio" id="avatar" bind:group={selectedItem} value="Текущее">
                        <label for="avatar" class="flex items-center">
                            <li class="changePhoto__menu_item">Текущее</li>
                        </label>
                        <input type="radio" id="changePhoto_avatar" bind:group={selectedItem} value="Выбрать аватар">
                        <label for="changePhoto_avatar" class="flex items-center">
                            <li class="changePhoto__menu_item">Выбрать аватар</li>
                        </label>
                        <input type="radio" id="changePhoto_loadPhoto" bind:group={selectedItem} value="Загрузить фото">
                        <label for="changePhoto_loadPhoto" class="flex items-center">
                            <li class="changePhoto__menu_item" >Загрузить фото</li>
                        </label>
                        <input type="radio" id="changePhoto_doPhoto" bind:group={selectedItem} value="Сделать фото">
                        <label for="changePhoto_doPhoto" class="flex items-center">
                            <li class="changePhoto__menu_item">Сделать фото</li>
                        </label>
                    </ul>
                </div>
                <div class="changePhoto__content">
                    {#if selectedItem == "Текущее"}
                        <div class="mt-40">
                            {#if selected == 'initials'}
                                <div class="thisPhoto">
                                    <div >
                                        <span class="letters">RF</span>
                                    </div>
                                </div>
                                {:else}
                                <div class="CroppieContainer">
                                    <div class="CroppieContainer__croppie" id="CroppieContainer__croppieFirst">
                                    <div class="CroppieContainer__controller">
                                        <span class="minus" on:click={minus}>-</span><span class="plus" on:click={plus}>+</span>
                                    </div>
                                    </div>
                                </div>
                                <div class="flex mt-24">
                                    <Button textClass="text-base" size="md" id="blob" on:click={croppied}>
                                            <span class="text-base font-semibold">
                                            Сохранить
                                            </span>
                                    </Button>
                                    <Button textClass="text-base" size="md" status="active-secondary" className="ml-24" on:click={closeModal}>
                                        <span>Отменить</span>
                                    </Button>
                                </div>
                            {/if}
                        </div>
                    {/if}
                    {#if selectedItem == "Выбрать аватар"}
                        <div class="flex gradient-shadow_top "/>
                        <div class="photos custom-scrollbar">
                            <div class="miniPhoto mb-20 {selected == 'initials' ? 'miniPhotoSelected':''}"
                                 on:click={()=>{
                                     selected = 'initials'}}>
                                <div>
                                    <div>
                                        RF
                                    </div>
                                </div>
                            </div>
                            {#each photos as photo, i}
                                <div class="miniPhoto mb-20 {i == photos.length - 1 ? 'mb-24' : ''} {selected == photo ? 'miniPhotoSelected':''}"
                                     on:click={
                                             ()=>{
                                         selected = photo;
                                         }
                                             }>
                                    <div>
                                        <div>
                                            <img src='{photo}' alt='{photo}'>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                        <div class="mt-24">
                            <Button size="md" textClass="text-base" on:click={closeModal}>
                                    <span class="text-base font-semibold">
                                    Сохранить
                                    </span>
                            </Button>
                        </div>
                        <div class="flex gradient-shadow "/>
                    {/if}
                    {#if selectedItem == 'Загрузить фото'}
                            <ModalSelecteMiniPhoto bind:selected={selected} bind:visible={visible} bind:fullImage={fullImage} bind:miniBlob={miniBlob}/>
                    {/if}
                    {#if selectedItem == 'Сделать фото'}
                            <ModalLoadDoPhoto/>
                    {/if}
                </div>
            </div>
        </div>
    </div>

