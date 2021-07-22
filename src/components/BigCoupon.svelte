<script>
    export let coupon;
    export let toggleModal;

    const toggleModalOnLink = (e) => {
        e.preventDefault();
        toggleModal(true);
    }
</script>

<style>
    .coupon-card{
        margin-right: 24px;
    }
    .coupon-card:last-child{
        margin-right: 0;
    }

</style>


<div class="coupon-card {coupon.modifier}">
    {#if coupon.text}
        {#if coupon.modal}
            <div on:click={toggleModalOnLink} class="coupon-card__text">{@html coupon.text}</div>
        {:else}
            <div class="coupon-card__text">{@html coupon.text}</div>
        {/if}
    {/if}
    {#if coupon.price}
        <div class="coupon-card__price">{coupon.price} &#8381;</div>
    {/if}
    {#if coupon.percent}
        <div class="coupon-card__percent">{coupon.percent} %</div>
    {/if}
    {#if coupon.name}
        <div class="coupon-card__name-text">{@html coupon.name}</div>
    {/if}
    <div class="coupon-card__footer"><div class="coupon-card__descr-text">{@html coupon.smallDescription}</div></div>
</div>