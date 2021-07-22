<script>
    import CustomCheckbox from "./CustomCheckbox.svelte";
    import ModalChangeShowcaseComplitation from "./ModalChangeShowcaseComplitation.svelte";

    export let product;
    export let onePrice = false;
    let ChangeShowcaseComplitation = false;
    let openElement = false;

    $: if (product.selected == false) {
        openElement = false
    }
</script>

<style>
    .element {
        margin: 0 -24px 0 -24px;
        @apply px-24;
        background: #F9F9F9;
        border-radius: 4px;
        transition: transform 0.2s linear;
    }

    .element__header {
        height: 59px;
        font-weight: 600;
        font-size: 18px;
        color: var(--color-main);
    }
    .MyBorder {
        border-bottom: 1px solid var(--gray-500);
    }
    .element:last-child .MyBorder {
        border-bottom: none;
    }

.pencil:hover path {
    fill:var(--color-info);
}
    @keyframes openingElement {
        from {
            max-height:0;
            overflow:hidden;
        }
        to {
            max-height:650px;
        }
    }
    .element__body {
        background: var(--color-light);
        margin: 0 -24px 0 -24px;
        @apply px-24;
        animation-name: openingElement;
        animation-duration: 1s;
        animation-timing-function: ease;
        border-bottom: 1px solid var(--gray-500);
    }
    .element__item {
        padding-top: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--gray-500);
    }
    .element__colorCube {
        width: 20px;
        height: 20px;
        margin-right: 12px;
        border: 1px solid var(--gray-300);
        border-radius: 4px;
    }
    .element__item:last-child {
        border-bottom: none;
        border-radius: 4px;
    }
    svg {
        transition: transform 0.2s linear;
    }
    .rotated {
        transform: rotate(180deg);
        transform-origin: center;
    }
    .element__name-color {
        margin-right: 80px;
        min-width: 116px;
        margin-left: 42px;
    }
    .element_price {
        margin-right: 40px;
        min-width:70px;
        margin-top: 0;
    }
    .element_price:last-child {
        margin-right: 0;
    }
    .elent-text {
        font-size: 15px;
        color: var(--color-main);
    }
    .elent-subtext {
        font-size: 13px;
        color: var(--gray-600);
    }

    @media (max-width: 1300px) {
        .element__name-color {
            margin-right: 68px;
        }
    }
    @media (max-width: 1174px) {
        .element_price:nth-child(n+4) {
            margin-top: 24px;
        }
    }

    @media (max-width: 1102px) {
        .element_price:nth-child(n+3) {
            margin-top: 24px;
        }
        section {
            margin-top: 68px;
        }
    }
</style>

<div class="element" style="{product.selected? '':'background:white;'}">
    <div class="element__header flex items-center justify-between {openElement==false ? 'MyBorder' : ''}">
        <div class="flex items-center">
            <div class="mr-24">
                <CustomCheckbox  id={product.name}
                                 label=""
                                 bind:check={product.selected}/>
            </div>
            <div class="flex items-center cursor-pointer" on:click={()=>{
            openElement = !openElement}}>
                <div class="mr-12" >{product.name}</div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none" class="mt-2"  class:rotated={openElement} on:click={()=>{
                    openElement = !openElement}}>
                        <path d="M13 1L6.99465 7L1 1" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
        <div on:click={()=>{ChangeShowcaseComplitation=!ChangeShowcaseComplitation}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none" class='cursor-pointer pencil'>
                <path d="M14.0284 1.48385C12.7372 0.189302 10.6374 0.189302 9.3462 1.48385L0.761638 10.0662C0.694522 10.1334 0.652973 10.2197 0.640189 10.3124L0.00417687 15.0239C-0.0149994 15.1581 0.0329412 15.2924 0.125626 15.3851C0.205527 15.465 0.317389 15.5129 0.42925 15.5129C0.448426 15.5129 0.467603 15.5129 0.486779 15.5097L3.32486 15.1262C3.56137 15.0942 3.72756 14.8769 3.6956 14.6403C3.66364 14.4038 3.44631 14.2376 3.20981 14.2695L0.934225 14.5764L1.37847 11.2905L4.83659 14.749C4.91649 14.8289 5.02835 14.8769 5.14021 14.8769C5.25208 14.8769 5.36394 14.8321 5.44384 14.749L14.0284 6.16661C14.6548 5.54011 15 4.70904 15 3.82363C15 2.93822 14.6548 2.10715 14.0284 1.48385ZM9.5124 2.53867L10.9538 3.98026L3.12032 11.8147L1.6789 10.3731L9.5124 2.53867ZM5.14341 13.8348L3.73396 12.4252L11.5675 4.59077L12.9769 6.00039L5.14341 13.8348ZM13.5778 5.38348L10.1292 1.93455C10.5671 1.57335 11.1136 1.37517 11.6889 1.37517C12.3441 1.37517 12.9577 1.63089 13.4212 2.09117C13.8846 2.55146 14.1371 3.16837 14.1371 3.82363C14.1371 4.40218 13.9389 4.94558 13.5778 5.38348Z" fill="#330033"/>
            </svg>
        </div>
    </div>
    {#if openElement}
        <div class="element__body openElement">
            {#each product.colors as color}
            {#if color.checked == true}
                <div class="element__item flex justify-beetween">
                    <div class="element__name-color flex elent-text">
                        {#if color.style != undefined}
                            <div class="element__colorCube"
                                 style="background:{color.style}"></div>
                        {/if}
                        <div class="mb-2">{color.color}</div>
                    </div>
                    <div class="flex flex-wrap">
                        {#if onePrice == true}
                            <div class="element_price">
                                <div class="elent-text">{color.price} ₽</div>
                            </div>
                        {/if}
                        {#if onePrice == false}
                            {#each color.prices as price}
                                <div class="element_price">
                                    <div class="elent-text">{price.price} ₽</div>
                                    <div class="elent-subtext">{price.count}</div>
                                </div>
                            {/each}
                        {/if}
                    </div>
                </div>
            {/if}
            {/each}
        </div>
    {/if}
</div>

{#if ChangeShowcaseComplitation}
    <ModalChangeShowcaseComplitation bind:visible={ChangeShowcaseComplitation} bind:product={product} onePrice={onePrice}/>
{/if}