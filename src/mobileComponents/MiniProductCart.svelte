<script>
    import ChangeProduct from "./ChangeProduct.svelte";

    export let flower;


    let changeProduct = false;

    import {createEventDispatcher} from "svelte";


    const dispatch = createEventDispatcher();


    let wannaDelete = false

    function minus() {
        if (flower.quantity > 1) {
            flower.quantity--
        }
    }


        function plus() {
            flower.quantity++
    }

    function startDeleteItem() {
        wannaDelete = true
        setTimeout(deleteItem, 5000)
    }

    function stopDelete() {
        wannaDelete = false
    }

    function deleteItem() {
        setTimeout(() => {
            dispatch("delete-item", {
                flower
            });
        }, 200);
    }
    function openChange() {
        changeProduct = !changeProduct
    }

</script>

<style>
    .container {
        overflow: hidden;
    }
    .miniProduct {
        min-width: calc(100vw - 32px);
        max-width: calc(100vw - 32px);
        margin-right: 16px;
    }
    .photo {
        min-width: 66px;
        max-width: 66px;
    }
    .product__name {
        font-size: 13px;
        line-height: 140%;
        color: var(--color-main);
    }
    .product__description {
        font-size: 11px;
        line-height: 140%;
        color: var(--gray-600);
    }
    .quantity__button {
        width: 32px;
        height: 32px;
        background: var(--gray-1000);
        border-radius: 16px;
    }
    .product__button {
        min-width: 66px;
    }
    .product__button div{
        font-size: 11px;
        line-height: 140%;
        text-align: center;
    }
    .product__button div svg{
        margin: 0 auto;
    }


    .wrapper {
        width: 200px;
        height: 70px;
        background-color: black;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        color: #fff;
    }

    .comeBack {
        min-width: 32px;
        height: 33px;
        background: var(--gray-1000);
        border-radius: 16px;
        position: relative;
        box-sizing: border-box;
        transition: all 500ms ease;
        animation: comeBack 5000ms cubic-bezier(0.8, 0, 0.33, 1);
        overflow:hidden;
    }
    .inner {
        width: 0;
        height: 33px;
        background-color: var(--gray-500);
        position: absolute;
        top: 0;
        animation: inner 5000ms cubic-bezier(0.8, 0, 0.33, 1);
        border-radius: 16px;
    }
    .comeBace__text {
        width: 100%;
        height: 100%;
        background-color: transparent;
        position: absolute;
        text-align:center;
        line-height:2;
        font-size: 14px;
        color: var(--color-main);
    }
    @keyframes inner {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }
    .block{
        position: relative;
    }
    ::-webkit-scrollbar {
        display: none;
    }
</style>
<div class="container">
    <div  class="pl-16 flex" style="        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
       ">
    <div class="miniProduct flex justify-between">
        <div class="flex">
            <div class="photo mr-12">
                <picture >
                    <source
                            data-srcset="{flower.src}" />
                    <img    data-srcset="{flower.src}"
                            data-src="{flower.src}"
                            alt="recomendation product photo"
                            class="w-full h-auto"/>
                </picture>
                <noscript>
                    <img class="w-full h-full" srcset="{flower.src}.png-2x.png 2x" src="{flower.src}.png" alt="recomendation product photo">
                </noscript>
            </div>
            <div class="product__body mr-12">
                <div class="product__name">{flower.title}</div>
                <div class="product__description mt-4">Размер {flower.size.name}, {flower.size.width.num}x{flower.size.height.num} {flower.size.width.measureUnit}</div>
                {#if !wannaDelete}
                    <div class="product__quantity flex items-center mt-12">
                        <div class="quantity__button flex justify-center items-center" on:click={minus}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="2" viewBox="0 0 12 2" fill="none">
                                <path d="M0 1.5V0H12V1.5H0Z" fill="#330033"/>
                            </svg>
                        </div>
                        <div class="mr-10 ml-10">{flower.quantity}</div>
                        <div class="quantity__button flex justify-center items-center" on:click={plus}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M0.352539 6.5V5H11.6467V6.5H0.352539Z" fill="#330033"/>
                                <path d="M5.52866 -6.55671e-08L6.94043 0L6.94043 12L5.52866 12L5.52866 -6.55671e-08Z" fill="#330033"/>
                            </svg>
                        </div>
                    </div>
                {:else}
                    <div class="comeBack mt-12" on:click={stopDelete}>
                        <div class="inner">
                        </div>
                        <div class="comeBace__text flex items-center justify-center">Вернуть</div>
                    </div>
                {/if}
            </div>
        </div>
        <div class="product__name whitespace-no-wrap">
            {flower.price * flower.quantity} ₽
        </div>
    </div>
{#if !wannaDelete}
    <div class="product__button flex items-center justify-center" style="background: var(--gray-1000);" on:click={openChange}>
        <div class="text-main">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14.5291 1.47091C13.2377 0.176362 11.1377 0.176362 9.84634 1.47091L1.26075 10.0533C1.19363 10.1204 1.15207 10.2067 1.13929 10.2994L0.503201 15.0109C0.484022 15.1452 0.531969 15.2794 0.624665 15.3721C0.704575 15.4521 0.81645 15.5 0.928325 15.5C0.947503 15.5 0.966682 15.5 0.98586 15.4968L3.82428 15.1132C4.06082 15.0813 4.22703 14.8639 4.19507 14.6274C4.1631 14.3908 3.94575 14.2246 3.70921 14.2566L1.43336 14.5634L1.87766 11.2775L5.33619 14.7361C5.4161 14.816 5.52797 14.8639 5.63985 14.8639C5.75172 14.8639 5.8636 14.8192 5.94351 14.7361L14.5291 6.15367C15.1556 5.52717 15.5008 4.6961 15.5008 3.81069C15.5008 2.92528 15.1556 2.09421 14.5291 1.47091ZM10.0126 2.52573L11.4541 3.96732L3.61971 11.8017L2.17812 10.3602L10.0126 2.52573ZM5.64304 13.8219L4.23342 12.4123L12.0678 4.57783L13.4775 5.98745L5.64304 13.8219ZM14.0784 5.37054L10.6295 1.92161C11.0674 1.56041 11.614 1.36223 12.1893 1.36223C12.8446 1.36223 13.4583 1.61795 13.9218 2.07823C14.3853 2.53852 14.6378 3.15543 14.6378 3.81069C14.6378 4.38924 14.4396 4.93264 14.0784 5.37054Z" fill="#330033"/>
            </svg>
            Изменить
        </div>
    </div>
    <div class="product__button flex items-center justify-center" style="background: var(--color-error);" on:click={startDeleteItem}>
        <div class="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1.47461 3.3877H14.5246" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.25 3.3877V14.1127C13.25 14.7877 12.65 15.3877 11.975 15.3877H4.025C3.35 15.3877 2.75 14.7877 2.75 14.1127V3.3877" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.15039 3.2373C5.15039 1.8123 5.90039 0.612305 6.80039 0.612305H9.20039C10.1004 0.612305 10.8504 1.8123 10.8504 3.2373" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.5 6.8374V11.4124" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.5 6.8374V11.4124" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Удалить
        </div>
    </div>
{/if}
    </div>
</div>
{#if changeProduct}
    <ChangeProduct  bind:visible={changeProduct}/>
{/if}