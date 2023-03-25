<script>
    import BigCoupon from './BigCoupon.svelte'
    export let toggleModal;

    export let nonActiveCoupons = [
        {type: ['blue', 'non-active'], modal: true, text: 'Отправь другу <a href="/">ссылку на приложение</a> и получи купон на', price: 300, percent: null, name: null, smallDescription: '*после регистрации друга в приложении'},
        {type: ['beige', 'non-active'], price: null, percent: 3, name: 'уровневый купон', smallDescription: 'До получения осталось <strong>20 000 ₽</strong>'}
    ];
    export let nonActiveCouponsPrice = 189;

    nonActiveCoupons = nonActiveCoupons.map(coupon => {
        let modifier = '';
        coupon.type.forEach(type => modifier += (' coupon-card--' + type));
        coupon.modifier = modifier;
        return coupon;
    });


</script>

{#if (nonActiveCoupons && nonActiveCoupons.length > 0) }
    <div class="coupon__coupons-list">
        {#each nonActiveCoupons as coupon}
            <BigCoupon coupon = {coupon} toggleModal={toggleModal}/>
        {/each}
    </div>
{/if}