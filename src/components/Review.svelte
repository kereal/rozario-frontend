<script>
    import Button from './Button.svelte';
    import StarRating from './StarRating.svelte';
    export let review;
    export let review_i;

    let showPhoto = review.client && review.client.photoUrl;

    import { writable, readable } from 'svelte/store';

    let visibleText = function() {
        const { subscribe, set } = writable(0);

        return {
            subscribe,
            setText: (newText) => set(newText),
            reset: () => set('')
        };
    }();


    const maxLength = 250;
    let shouldShowReadMore = false;
    let hiddenText = '';
    $: shouldShowReadMore;
    if (review.message) {
        shouldShowReadMore = review.message.length > maxLength;
        visibleText.setText(review.message.substr(0, maxLength));
    }
    let readMore = function() {
        visibleText.setText(review.message);
        shouldShowReadMore = false;
    };
    let productLink = '/product/card';

</script>
<style>
    .review-wrapper {
        background: var(--color-light);
        border: 1px solid var(--gray-300);
        border-radius: 16px 0 16px 16px;
        margin-bottom: 34px;
        padding: 23px;
    }
    .client-photo {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
        background-image: url(/loading-bg-image.svg);
    }
    .bouquet-photo {
        width: 194px;
        height: 194px;
        object-fit: cover;
        object-position: center;
        margin-bottom: 24px;
        border-radius: 4px;

        background-image: url(/loading-bg-image.svg);
    }
    .client-photo[src='/loading-bg-image.svg'],
    .bouquet-photo[src='/loading-bg-image.svg'] {
        object-fit: none;
        object-position: top;
    }
    .read-more {
        color: var(--gray-600);
        cursor: pointer;
    }
    .read-more:hover {
        color: var(--color-info);
    }
    .read-more:active {
        color: var(--gray-600);
    }
    .right-column {
        flex-shrink: 0;
        max-width: 194px;
        float: right;
        margin-left: 30px;
    }
    .product-data-n-response {
        display: flex;
        align-items: flex-start;
    }
    .product-data {
        display: none;
        flex-shrink: 0;
        max-width: 194px;
        margin-right: 18px;
        margin-top: 24px;
    }
    .review-wrapper :global(button) {
        font-size: 15px;
        padding: 11px 22px;
        width: 100%;
        line-height: 135%;
        background: var(--gray-1000);
        color: var(--color-main);
    }
    .review-wrapper :global(button:hover) {
        background: var(--color-info);
        color: var(--color-light);
    }
    .review-wrapper :global(button:active) {
        background: var(--gray-1000);
        color: var(--color-main);
    }
    .photo-n-order-info {
        display: flex;
        align-items: center;
        font-size: 13px;
        line-height: 140%;
    }
    .client-photo {
        margin-right: 18px;
    }
    .photo-n-order-info strong {
        display: block;
        font-size: 14px;
        font-weight: 600;
        line-height: 120%;
        padding-bottom: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .photo-n-order-info .order-id {
        color: var(--color-info-light);
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .photo-n-order-info .order-date {
        color: var(--gray-700);
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .review-text {
        font-size: 14px;
        line-height: 135%;
        padding-top: 18px;
    }
    .order-info {
        flex-grow: 1;
        min-width: 0;
    }
    .response {
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        border-radius: 4px;
        padding: 16px;
        font-size: 14px;
        line-height: 135%;
        position: relative;
        margin-top: 24px;
    }
    .response strong {
        display: block;
        font-size: 16px;
        font-weight: 600;
        line-height: 130%;
        padding-bottom: 8px;
    }
    .response div {
        color: var(--gray-600);
    }
    .response::before {
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 8px 8.5px 8px;
        border-color: transparent transparent #e9e9e9 transparent;
        position: absolute;
        top: -8.5px;
        left: 14px;
    }
    .response::after {
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 8px 8.5px 8px;
        border-color: transparent transparent #fff transparent;
        position: absolute;
        top: -7px;
        left: 14px;

    }
    .ratings {
        padding-top: 24px;
    }
    .ratings :global(.rating-non-changable svg) {
        color: var(--gray-300);
    }
    .ratings :global(label:not(:first-of-type)) {
        margin-right: 6px;
    }
    .ratings > div {
        padding-bottom: 6px;
        display: flex;
        align-items: center;
        color: var(--gray-700);
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .ratings .name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 120%;
        margin-top: 2px;
    }
    .ratings .stars {
        display: inline-flex;
        align-items: center;
        margin-right: 12px;
    }
    .ratings .stars > :global(div) {
        margin-right: 0;
    }

    @media screen and (max-width: 1300px) {
        .client-photo {
            margin-right: 12px;
        }
        .client-photo {
            width: 63px;
            height: 63px;
        }
        .right-column {
            margin-left: 24px;
        }
        .ratings .stars {
            margin-right: 10px;
        }
        .bouquet-photo {
            margin-bottom: 18px;
        }
    }
    @media screen and (max-width: 1290px) {
        .right-column {
            margin-left: 15px;
        }
    }
    @media screen and (max-width: 1280px) {
        .right-column {
            display: none;
        }
        .product-data {
            display: block;
        }
        .response {
            margin-top: 31px;
        }
    }
    @media screen and (max-width: 1124px) {

        .review-wrapper {
            margin-bottom: 24px;
        }
        .review-n-order-data {
            display: flex;
            flex-direction: column;
        }
        .ratings {
            padding-top: 18px;
        }
        .left-column {
            order: 1;
        }
        .right-column {
            display: block;
            float: none;
            order: 2;
            margin-left: 0;
            margin-top: 24px;
        }
        .product-data {
            display: none;
        }
        .response {
            margin-top: 24px;
        }
    }
</style>
<div class="review-wrapper" itemscope itemtype="http://schema.org/Review" class:with-product-info="{review.bouquet}">
    <span class="hidden" itemprop="itemReviewed" itemscope itemtype="http://schema.org/Organization">
        <span itemprop="name">Розарио Цветы</span>
    </span>

    <div class="content">
        <div class="review-n-order-data clearfix">
            {#if review.bouquet}
                <div class="right-column">
                    <img alt="" class="bouquet-photo" src="{review.bouquet.photoUrl}" onerror="this.src = '/loading-bg-image.svg'">
                    <a href="{productLink}">
                        <Button>Заказать такой же</Button>
                    </a>
                </div>
            {/if}
            <div class="left-column">
                <div class="photo-n-order-info">
                    {#if showPhoto}
                        <img alt="" class="client-photo" src="{review.client.photoUrl}" onerror="this.src = '/loading-bg-image.svg'" />
                    {/if}
                    {#if !showPhoto}
                        <img alt="" class="client-photo" src="{'reviews/' + review.emotion + '.svg'}" onerror="this.src = '/loading-bg-image.svg'" />
                    {/if}
                    <div class="order-info" itemprop="author" itemscope itemtype="http://schema.org/Person">
                        <strong class="client-name" itemprop="name" title="{review.client.name}">{review.client.name}</strong>
                        <div class="order-id" title="Заказ №{review.orderId}">Заказ №{review.orderId}</div>
                        <div class="order-date" title="{review.date}">{review.date}</div>
                    </div>
                </div>
                <div>
                    {#if review.message}
                        <div class="review-text" itemprop="reviewBody">{$visibleText}
                            {#if shouldShowReadMore}
                                <span on:click="{readMore}" class="read-more"> ... читать далее</span>
                            {/if}
                        </div>
                    {/if}
                    {#if review.ratings.length}
                        <div class="ratings">
                            {#each review.ratings as rating, i}
                                <div itemprop="reviewRating" itemscope itemtype="http://schema.org/Rating" title="{rating.title}">
                                    <span class="hidden" itemprop="ratingValue">{rating.rate}</span>
                                    <div class="stars">
                                        <StarRating
                                                className=""
                                                name="{'rating-' + review_i + '-' + i}"
                                                kind="static"
                                                val={rating.rate} />
                                    </div>
                                    <div class="name" itemprop="name">{rating.title}</div>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
    <div class="product-data-n-response">
        {#if review.bouquet}
            <div class="product-data">
                <img alt="" class="bouquet-photo" src="{review.bouquet.photoUrl}" onerror="this.src = '/loading-bg-image.svg'">
                <a href="{productLink}">
                    <Button>Заказать такой же</Button>
                </a>
            </div>
        {/if}
        {#if review.companyResponse}
        <div class="response">
            <strong>Ответ Розарио.Цветы</strong>
            <div>{review.companyResponse.text}</div>
        </div>
        {/if}
    </div>
</div>
