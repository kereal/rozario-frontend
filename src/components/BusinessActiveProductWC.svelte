<script>
    export let product;
    export let postcardPrice;

    let open = false;
</script>

<style>
    .order__productPhoto {
        min-width: 138px;
        height: 138px;
        background-image: url("../../static/loading-bg-image.svg");
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        border-radius: 4px;
        margin-right: 34px;
    }

    .order__product {
        border-bottom: 1px solid var(--gray-300);
        padding-bottom: 18px;
        margin-bottom: 18px;
    }
    .order__product:last-child {
        margin-bottom: 0;
    }

    .order__productInfo h2 {
        font-weight: 600;
        font-size: 16px;
        line-height: 130%;
        color: var(--color-main);
        margin-bottom: 4px;
    }
    .order__productInfo h3 {
        font-weight: 600;
        font-size: 14px;
        line-height: 120%;
        color: var(--color-main);
        margin-top: 8px;
    }
    .order__productInfo_subText {
        font-size: 14px;
        line-height: 135%;
        color: var(--gray-600);
    }
    .order__productInfo_text {
        font-size: 15px;
        line-height: 135%;
        color: var(--color-main);
    }
    .order__productCompositionName {
        min-width: 205px;
        margin-right: 18px;
    }
    svg {
        transition: transform 0.2s linear;
    }

    .rotated {
        transform: rotate(-180deg);
        transform-origin: center;
    }
    .order__productRight {
        display: flex;
        justify-content: space-between;
        min-width: 102px;
        font-size: 15px;
        color: var(--color-main);
        margin-left: 25px;
    }
</style>

<div class="order__product flex">
    <div class="order__productPhoto">
        {#if product.photo != ''}
            <picture>
                <source
                        data-srcset="{product.photo}.webp, {product.photo}-2x.webp 2x" />
                <img
                        class="main-image rounded-t-lg object-contain absolute inset-0 h-full w-full"
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
            <div>
                <h2>{product.name}</h2>
            </div>
            <div class="order__productRight">
                <div>{product.count}</div>
                <div>{product.price} ₽</div>
            </div>
        </div>
        <p class="order__productInfo_subText">({product.size})</p>
        <h3 class="flex items-center cursor-pointer" on:click={()=> {open = !open}}>
            Состав
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none" class="ml-8" class:rotated="{open}">
                <path d="M11 1L5.99554 6L1 1" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </h3>
        {#if open}
            <div class="order__productCompositions">
                {#each product.composition as composition}
                    <div class="order__productInfo_subText order__productComposition flex items-center mt-4">
                        <div class="order__productCompositionName">
                            {composition.name}
                        </div>
                        <div class="order__productCompositionName">
                            {composition.count} × {composition.price} ₽ = {composition.count * composition.price} ₽
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
        {#if product.postcard}
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="mt-18">Открытка</h2>
                </div>
                <div class="order__productRight">
                    <div>{product.postcardCount}</div>
                    <div>{postcardPrice} ₽</div>
                </div>
            </div>
            <p class="mb-24">
                <span class="order__productInfo_text">Текст:</span> <span class="order__productInfo_subText">{product.postcard}</span>
            </p>
        {/if}
        <p class="mb-8">
            <span class="order__productInfo_subText">Получатель:</span>
            <span class="order__productInfo_text">{product.receiver}</span>
        </p>
        <p>
            <span class="order__productInfo_subText">Телефон получателя:</span>
            <span class="order__productInfo_text">{product.phone}</span>
        </p>
    </div>
</div>