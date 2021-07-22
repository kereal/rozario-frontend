<script>
    import GiftPopup from './GiftPopup.svelte'
    let infoModalVisible = false;


    function toggleInfoModal() {
        infoModalVisible = !infoModalVisible;
    }

</script>

<style>

    .gift {
        width: 209px;
        height: 306px;
        background: #FFFFFF;
        border-radius: 4px;
        box-shadow: 0px 4px 15px rgba(51, 0, 51, 0.1);
        cursor: pointer;
        transition: all 0.2s ease;
    }
    .gift:hover {
        box-shadow: 0 4px 15px rgba(51, 0, 51, 0.4);
    }
    .gift img {
        width: 209px;
        height: 215px;
        border-radius: 4px 4px 0px 0px;
    }
    .gift__photo {
        width: 209px;
        height: 215px;
        border-radius: 4px 4px 0px 0px;
        background-image: url("../../static/loading-bg-image.svg");
    }
    .gift__name {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 135%;
        color: #330033;
        margin-bottom: 27px;
        margin-top: 12px;
        margin-left: 14px;
    }
    .gift__price {
        margin-left: 14px;
        display: flex;
    }
    .gift__price_main {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 130%;
        color: #330033;
        mix-blend-mode: normal;
        margin-right: 8px;
    }
    .gift__price_withDiscount {
        font-weight: normal;
        font-size: 12px;
        line-height: 205%;
        color: #C4C4C4;
    }
    .gift__rating {
        font-weight: normal;
        font-size: 14px;
        color: #330033;
        text-align: center;
        margin-right: 14px;
        line-height: 120%;
        margin-top: 3px;
    }
    .gift__rating img {
        display: inline;
        height: 15px;
        width: 15px;
    }
</style>


<div class="gift" on:click={toggleInfoModal}>
    <div class="gift__photo">
        <picture >
            <source data-srcset="https://i.ibb.co/xftRLg2/photo.jpg.webp, https://i.ibb.co/xftRLg2/photo.jpg-2x.webp 2x" />
            <img

                    data-srcset="https://i.ibb.co/xftRLg2/photo.jpg-2x.jpg 2x"
                    data-src="https://i.ibb.co/xftRLg2/photo.jpg.jpg"
                    alt='gift' />
        </picture>
    </div>

    <h2 class="gift__name">Духи GUERLAIN 250 мл </h2>
    <div class="gift__price flex justify-between">
        <div class="flex ">
            <span class="gift__price_main">3 456 Р</span>
            <span class="gift__price_withDiscount">3 456 Р</span>
        </div>
        <div><span class="gift__rating flex"><img class="mr-8" src="star.svg" alt="star" />4,5</span></div>
    </div>
</div>

{#if infoModalVisible}
    <GiftPopup on:close={toggleInfoModal}/>
{/if}