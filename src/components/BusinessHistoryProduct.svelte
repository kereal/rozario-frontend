<script>
    import CustomDropdown from "./CustomDropdown.svelte"

    export let product;
    export let postCardPrice;
    let infoVisible = false;
    let modalElement;
</script>
<style>
    .order__product {
        border-bottom: 1px solid var(--gray-300);
        padding-bottom: 18px;
        margin-bottom: 18px;
    }
    .order__product:last-child {
        margin-bottom: 0;
    }

    .order__productPhoto {
        min-width: 170px;
        height: 170px;
        background-image: url("../../static/loading-bg-image.svg");
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        border-radius: 4px;
        margin-right: 34px;
        transition: transform 0.2s linear;
    }
    .order__productRight {
        display: flex;
        justify-content: space-between;
        min-width: 102px;
        font-size: 15px;
        color: var(--color-main);
        margin-left: 25px;
    }
    .pretensionText {
        font-size: 15px;
        line-height: 130%;
        color: var(--color-main);
        font-weight: normal;
    }
    .pretensionSubText {
        font-size: 14px;
        color: var(--gray-600);
    }
    .svgInfo {
        min-width:15px;
        margin-left: 8px;
        margin-top: 3px;
    }
    @media (max-width: 1300px) {

        .order__productPhoto {
            min-width: 120px;
            height: 120px;
        }
    }
    @media (max-width: 1024px) {

        .order__productPhoto {
            min-width: 80px;
            height: 80px;
            margin-right: 24px;
        }
    }
</style>
<div class="order__product flex">
    <div class="order__productPhoto">
        {#if product.photo != ''}
            <picture>
                <source
                        data-srcset="{product.photo}.webp, {product.photo}-2x.webp 2x" />
                <img
                        class=""
                        data-srcset="{product.photo}-2x.png"
                        data-src="{product.photo}.png"
                        alt={product.photo} />
            </picture>
            <noscript>
                <img srcset="{product.photo}-2x.png" src="{product.photo}.png" alt="{product.photo}">
            </noscript>
            <noscript>
                <img srcset="product.photo}-2x.png" src="{product.photo}.png" alt="{product.photo}">
            </noscript>
        {/if}
    </div>
    <div class="order__productInfo  w-full">
        <div class="flex items-center justify-between w-full">
            <div class="flex">
                <h2 class="pretensionText mr-8">{product.name}</h2>

            </div>
            <div class="order__productRight">
                <div class="pretensionText">{product.count}</div>
                <div class="pretensionText">{product.price} ₽</div>
            </div>
        </div>
        <p class="pretensionSubText flex">({product.size})
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class="svgInfo"
                 on:mouseenter={() => {infoVisible = true;}} on:mouseleave={() => {infoVisible = false;}}
                    bind:this={modalElement} >
                <path d="M8.00528 15.2098C11.9842 15.2098 15.2098 11.9842 15.2098 8.00528C15.2098 4.02635 11.9842 0.800781 8.00528 0.800781C4.02635 0.800781 0.800781 4.02635 0.800781 8.00528C0.800781 11.9842 4.02635 15.2098 8.00528 15.2098Z" stroke="#CC6699" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.06381 5.778C9.55479 5.778 9.95281 5.37998 9.95281 4.889C9.95281 4.39802 9.55479 4 9.06381 4C8.57282 4 8.1748 4.39802 8.1748 4.889C8.1748 5.37998 8.57282 5.778 9.06381 5.778Z" fill="#CC6699"/>
                <path d="M8.27141 7.06055C8.27141 7.06055 7.28741 9.57255 7.02891 10.263C6.91159 10.576 7.16882 10.9039 7.48536 11.169" stroke="#CC6699" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {#if infoVisible}
                <CustomDropdown css="width: 300px; max-height: 300px;" bind:dropdownVisible={infoVisible} relativeElement={modalElement} position="RIGHT">
                    <section class="bg-white px-32 py-24 rounded-lg">
                        <div class="text-main font-semibold text-sm">Состав</div>
                        <div class="text-gray-700 text-sm">
                            {#each product.composition as composition}
                                <div>{composition.name}, ({composition.count} шт.)</div>
                            {/each}
                        </div>
                    </section>
                </CustomDropdown>
            {/if}</p>
        {#if product.postcard}
            <div class="mt-8 flex items-center justify-between mb-4">
                <div>
                    <h2 class="pretensionText">Открытка</h2>
                </div>
                <div class="order__productRight">
                    <div>{product.postcardCount}</div>
                    <div>{postCardPrice} ₽</div>
                </div>
            </div>
            <p class="mb-24 pretensionSubText">
                <span >Текст:</span> <span>{product.postcard}</span>
            </p>
        {/if}
        <p class="mb-8">
            <span class="pretensionText">Получатель:</span>
            <span class="pretensionSubText">{product.receiver}</span>
        </p>
        <p>
            <span class="pretensionText">Телефон получателя:</span>
            <span class="pretensionSubText">{product.phone}</span>
        </p>
    </div>
</div>