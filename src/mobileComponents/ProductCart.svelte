<script>
    export let product;
    import Button from './Button.svelte'
</script>

<style>
    .product {
        border: 1px solid #E9E9E9;
        box-sizing: border-box;
        box-shadow: 0px 2.2961px 8.61039px rgba(51, 0, 51, 0.1);
        border-radius: 16px;
        padding: 6px 6px 14px 6px;
        position: relative;
        background-color: white;
    }
    .photo {
        width: calc(100% + 12px);
        margin-bottom: 6px;
        margin-left: -6px;
        margin-right: -6px;
        background-image: url("../../static/loading-bg-image.svg");
        border-radius: 20px 20px 0 0;
        overflow: hidden;
        min-height: 148px;
        max-height: 148px;
    }
    @media (max-width: 375px) {
        .photo {
            min-height: 148px;
            max-height: 148px;
        }
    }
    @media (max-width: 320px) {
        .photo {
            min-height: 123px;
            max-height: 123px;
        }
    }
    .product__name {
        font-size: 13px;
        line-height: 120%;
        text-align: center;
        color: var(--color-main);
        margin-bottom: 5px;
        margin-top: 10px;
        min-height: 30px;
    }
    .product__size {
        font-size: 12px;
        line-height: 135%;
        color: var(--gray-700);
        text-align: center;
        margin-bottom: 6px;
    }
    .product__price {
        font-weight: 600;
        font-size: 14px;
        line-height: 135%;
        color: var(--color-main);

    }
    .product__priceChip {
        font-size: 10px;
        line-height: 120%;
        color: var(--gray-600);
        text-decoration: line-through;
    }
     .rating {
         width: 37px;
         height: 20px;
         position: absolute;
         font-size: 11px;
         line-height: 13px;
         color: #000000;
         right: 6px;
         bottom: 0px;
         border: 0.574026px solid var(--gray-300);
         box-sizing: border-box;
         border-radius: 10px;
     }
    .share {
        position: absolute;
        height: 20px;
        background: #EE0000;
        border-radius: 8px;
        font-weight: 800;
        font-size: 11px;
        left: 6px;
        bottom: 0px;
        text-transform: uppercase;
        color: var(--color-light);
        padding: 2px 6px;
    }
    .extra {
        position: absolute;
        padding: 2px 10px;
        height: 20px;
        left: 6px;
        top:6px;
        background: #83EABC;
        border-radius: 18px;
        font-size: 11px;
        color: #000000;
    }
</style>
<a href="product/cardMobile">
<div class="product">
    <div class="photo relative">
        <picture >
            <source
                    data-srcset="https://api.rozarioflowers.ru/resources/images/thumbs/150_150_{product.image}" />
            <img    data-srcset="https://api.rozarioflowers.ru/resources/images/thumbs/150_150_{product.image}"
                    data-src="https://api.rozarioflowers.ru/resources/images/thumbs/150_150_{product.image}"
                    alt="{product.name}"
                    class="w-full h-full"/>
        </picture>
        <noscript>
            <img class="w-full h-full" srcset="https://api.rozarioflowers.ru/resources/images/thumbs/150_150_{product.image} 2x" src="https://api.rozarioflowers.ru/resources/images/thumbs/150_150_{product.image}" alt="recomendation product photo">
        </noscript>
        {#if product.share}
            <div class="share">
                {product.share}
            </div>
        {/if}
        {#if product.extra}
            <div class="extra">
                {product.extra}
            </div>
        {/if}
        <div class="rating flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none" class="mr-2">
                <path d="M3.50961 0.6893C3.95315 -0.067247 5.04685 -0.067247 5.49039 0.6893L6.03062 1.61076C6.19249 1.88685 6.46225 2.08284 6.77484 2.15147L7.81814 2.38051C8.67472 2.56856 9.0127 3.60873 8.43024 4.26435L7.72082 5.06288C7.50826 5.30214 7.40522 5.61926 7.43655 5.93777L7.54112 7.00078C7.62697 7.87355 6.74215 8.51641 5.93863 8.16506L4.95995 7.73712C4.66672 7.6089 4.33328 7.6089 4.04005 7.73712L3.06137 8.16506C2.25785 8.51641 1.37303 7.87355 1.45888 7.00078L1.56345 5.93777C1.59478 5.61926 1.49174 5.30214 1.27918 5.06288L0.56976 4.26435C-0.0126957 3.60873 0.325276 2.56856 1.18186 2.38051L2.22516 2.15147C2.53775 2.08284 2.80751 1.88685 2.96938 1.61076L3.50961 0.6893Z" fill="#FFE033"/>
            </svg>
            <!-- ZAGLUSGKA -->
            5
        </div>
    </div>
    <div class="product__name">
        {product.name}
    </div>
    <div class="product__size flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="ml-12 mr-4" width="13" height="8" viewBox="0 0 15 9" fill="none">
            <path d="M4.28537 7.99995L1 4.50046L4.28537 1.00098" stroke="var(--gray-700)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.7158 1L14.0002 4.49949L10.7158 7.99897" stroke="var(--gray-700)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.33984 4.50049H13.6137" stroke="var(--gray-700)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg> {product.width} см
        <svg xmlns="http://www.w3.org/2000/svg" class="ml-12 mr-4" width="8" height="13" viewBox="0 0 9 15" fill="none">
            <path d="M7.99995 10.7146L4.50046 14L1.00098 10.7146" stroke="var(--gray-700)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 4.28418L4.49949 0.999802L7.99897 4.28418" stroke="var(--gray-700)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.50098 13.6597L4.50098 1.38579" stroke="var(--gray-700)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>{product.height} см
    </div>
    <Button status="active-secondary" size="md">
        <div class="product__price">{product.price} ₽</div>
        {#if product.chip !== undefined}
            <div class="product__priceChip">
                {product.chip } ₽
            </div>
        {/if}
    </Button>
</div>
</a>