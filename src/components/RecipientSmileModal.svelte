<script>
    import { onMount } from "svelte";
    import Button from "../components/Button.svelte";
    import Swiper, { Navigation } from "swiper";
    import "swiper/swiper-bundle.css";
    export let smiles;
    export let smile_i;
    export let closeModal = () => {};
    function closeModalClicked() {
        shown = false;
        setTimeout(() => closeModal(), 600);
    }
    let shown = false;

    let smile = smiles[smile_i];

    function stopPropagation(event) {
        event.stopPropagation();
    }

    onMount(() => {
        Swiper.use([Navigation]);
        const swiper = new Swiper('.recipient-smile-slider', {
            navigation: {
                nextEl: '.next button',
                prevEl: '.prev button',
                initialSlide: smile_i
            },
            on: {
                slideChangeTransitionStart: function (data) {
                    smile_i = data.activeIndex;
                    smile = smiles[smile_i];
                },
                slideChangeTransitionEnd: function (data) {
                    smile_i = data.activeIndex;
                    smile = smiles[smile_i];
                },
            }
        });
        swiper.slideTo(smile_i, 0);
        setTimeout(() => (shown = true), 1);
    });
</script>
<style>
    #recipient-smile-modal-wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 30;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 600ms;
    }
    #recipient-smile-modal-wrapper.shown {
        opacity: 1;
    }
    .recipient-smile-modal {
        width: 800px;
        height: 550px;
        background: var(--color-light);
        border-radius: 4px;
        display: flex;
        align-items: stretch;
        overflow: hidden;
        position: relative;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        z-index: 2;
    }
    .recipient-smile-modal .prev,
    .recipient-smile-modal .next {
        width: 82px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 2;
    }
    .recipient-smile-modal .next {
        right: 0;
    }
    .recipient-smile-modal .prev {
        left: 0;
    }
    .recipient-smile-modal .prev :global(button),
    .recipient-smile-modal .next :global(button) {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        transition: opacity .5s;
        background-color: var(--color-accent);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .recipient-smile-modal :global(button.swiper-button-disabled) {
        visibility: hidden;
        opacity: 0;
    }
    .recipient-smile-modal .recipient-smile-slider {
        width: 550px;
        flex-shrink: 0;
        position: relative;
        overflow: hidden;
    }
    .recipient-smile-modal .recipient-smile-slider img {
        z-index: -1;
    }
    .recipient-smile-modal .bouquets {
        width: 250px;
        flex-shrink: 0;
    }
    .bouquets {
        display: flex;
        flex-direction: column;
    }
    .date-n-cross {
        height: 57px;
        padding-top: 24px;
        padding-left: 24px;
        position: relative;
        flex-shrink: 0;
    }
    .bouquets-list {
        flex-grow: 1;
        padding: 4px 0 0 24px;
        overflow: auto;
    }
    .bouquets-list::-webkit-scrollbar-thumb {
        background: var(--gray-400);
    }
    .bouquets-list::-webkit-scrollbar {
        background: var(--color-light);
        width: 4px;
    }
    .bouquet {
        padding-top: 7px;
        padding-bottom: 34px;
        max-width: 202px;
    }
    .bouquet :global(button) {
        padding: 11px 0;
        width: 100%;
        font-weight: 600;
        font-size: 15px;
        line-height: 135%;
        margin-top: 18px;
    }
    .bouquet img {
        min-height: 201px;
        object-fit: cover;
    }
    .bouquet-data {
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        border-radius: 4px;
    }
    .bouquet-data .title {
        font-size: 15px;
        line-height: 20px;
        display: flex;
        align-items: flex-end;
        color: var(--color-main);
        padding: 6px 16px 8px;
    }
    .bouquet-data .sub-title {
        font-size: 12px;
        line-height: 16px;
        color: var(--gray-700);
        padding: 0 16px;
    }
    .bouquet-data .price {
        font-weight: bold;
        font-size: 18px;
        line-height: 20px;

        color: #330033;
    }
    .bouquet-data .discount {
        font-size: 13px;
        line-height: 20px;
        text-decoration-line: line-through;

        color: #C4C4C4;
    }
    .bouquet-data .rate {
        font-size: 16px;
        line-height: 130%;
        color: #330033;
    }
    .date-n-cross .cross {
        position: absolute;
        top: 16px;
        right: 16px;
        cursor: pointer;
    }
    .date-n-cross .cross:hover path {
        stroke: var(--gray-700);
    }
    .date-n-cross .date {
        font-size: 14px;
        line-height: 135%;
        color: var(--color-info-light);
    }
    .swiper-slide img {
        width: 550px;
        height: 550px;
        object-fit: cover;
        background-image: url(/loading-bg-image.svg);
    }
    .sizes {
        display: flex;
        align-items: center;
    }
    .sizes span {
        font-weight: 600;
        font-size: 12px;
        line-height: 140%;
        color: var(--color-main);
        margin: 0 11px 0 6px;
    }
    .sizes svg:first-child {
        margin-left: 2px;
    }
    .price-n-rate,
    .rate {
        display: flex;
        align-items: baseline;
    }
    .rate {
        margin-left: auto;
    }
    .rate svg {
        margin-right: 4px;
    }
    .discount {
        margin-left: 6px;
    }
    .sizes {
        padding: 6px 16px 18px;
    }
    .price-n-rate {
        padding: 0 16px 21px;
    }
</style>
<div id="recipient-smile-modal-wrapper" on:click="{closeModalClicked}" class:shown="{shown}">
    <div class="recipient-smile-modal" on:click="{stopPropagation}">
        <div class="recipient-smile-slider">
            <span class="prev">
                <button>
                    <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.28516 1.77148L1.39938 9.00653L9.28516 16.2287" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </span>

            <div class="swiper-wrapper">
                {#each smiles as s, index}
                <div class="swiper-slide">
                    <img src="{s.recipientPhotoBig}" alt="" onerror="this.src = '/loading-bg-image.svg'">
                </div>
                {/each}
            </div>
            <span class="next">
                <button>
                    <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.71484 1.77148L9.60062 9.00653L1.71484 16.2287" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </span>
        </div>
        <div class="bouquets">
            <div class="date-n-cross">
                <div class="date">{smile.date}</div>
                <div class="cross" on:click="{closeModalClicked}">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L17 17M17 1L1 17" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div class="bouquets-list">
                {#each smile.bouquets as bouquet}
                    <div class="bouquet">
                        <div class="bouquet-data">
                            <img src="{bouquet.photoUrl}" alt="" onerror="this.src = '/loading-bg-image.svg'">
                            <div class="title">{bouquet.title}</div>
                            <div class="sub-title">{bouquet.sizes.title}</div>
                            <div class="sizes">
                                <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.28537 7.99995L1 4.50046L4.28537 1.00098" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M10.7156 1L14 4.49949L10.7156 7.99897" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M1.34033 4.50049H13.6142" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>{bouquet.sizes.width}</span>
                                <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.99995 10.7146L4.50046 14L1.00098 10.7146" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M1 4.28442L4.49949 1.00005L7.99897 4.28442" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4.50049 13.6597L4.50049 1.38579" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>{bouquet.sizes.height}</span>
                            </div>
                            <div class="price-n-rate">
                                <span class="price">{bouquet.price}</span>
                                <span class="discount">{bouquet.discountPrice}</span>
                                <span class="rate">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.77178 1.96718C6.54325 0.642644 8.45675 0.642642 9.22822 1.96718L10.1276 3.51132C10.4102 3.99652 10.8838 4.34058 11.4325 4.45941L13.179 4.83761C14.6771 5.16202 15.2684 6.98187 14.2471 8.12489L13.0565 9.45741C12.6824 9.87612 12.5015 10.4328 12.5581 10.9915L12.7381 12.7693C12.8925 14.2944 11.3444 15.4191 9.94174 14.801L8.3065 14.0804C7.79267 13.854 7.20733 13.854 6.6935 14.0804L5.05827 14.801C3.65559 15.4191 2.10753 14.2944 2.26194 12.7693L2.44195 10.9915C2.49851 10.4328 2.31763 9.87612 1.94351 9.45741L0.752867 8.12489C-0.268443 6.98187 0.322862 5.16202 1.82097 4.83761L3.56745 4.45941C4.11624 4.34058 4.58979 3.99652 4.8724 3.51132L5.77178 1.96718Z" fill="#FFE033"/>
                                    </svg>
                                    {bouquet.rate}
                                </span>
                            </div>
                        </div>
                        <a href="{bouquet.productLink}">
                            <Button>Заказать такой же</Button>
                        </a>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
