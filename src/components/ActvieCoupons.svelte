<script>
    import BigCoupon from './BigCoupon.svelte'
    export let activeCoupons = [
        // {type: ['green'], price: 86, percent: null, name: 'купон нового пользователя', smallDescription: 'Добро пожаловать!'},
        // {type: ['orange'], price: 350, percent: null, name: 'купон на первый заказ', smallDescription: 'Спасибо за регистрацию!'},
        // {type: ['blue'], price: 300, percent: null, name: 'купон<br>друга', smallDescription: 'Приглашай друзей и получай скидки'},

        // {type: ['purple'], price: 100, percent: null, name: 'купон<br>на товар', smallDescription: 'Оставляй отзывы и получай купоны'},
         {type: ['purple'], price: 100, percent: null, name: 'купон<br>на товар', smallDescription: 'Оставляй отзывы и получай купоны'},
         {type: ['blue'], price: 300, percent: null, name: 'купон<br>друга', smallDescription: 'Приглашай друзей и получай скидки'},
         {type: ['pink'], price: 200, percent: null, name: 'купон<br>выходного дня', smallDescription: 'Покупать в выходные выгодно!'},
         //{type: ['beige', 'beige-3'], price: null, percent: 7, name: 'уровневый купон', smallDescription: 'Бронзовый уровень'},
        // {type: ['light-green'], price: 300, percent: null, name: 'купон<br>на годовщину', smallDescription: 'Мы рады, что вы с нами уже целый год!'},
        // {type: ['red'], price: 300, percent: null, name: 'купон на день рождения', smallDescription: 'С праздником!'},
    ];
    export let activeCouponsPrice = 189;

    activeCoupons = activeCoupons.map(coupon => {
        let modifier = '';
        coupon.type.forEach(type => modifier += (' coupon-card--' + type));
        coupon.modifier = modifier;
        return coupon;
    });
</script>

<h2 class="coupon__heading">Активные купоны</h2>
{#if (activeCoupons && activeCoupons.length > 0) }
    <p class="coupon__text">Всего на сумму: {activeCouponsPrice} ₽</p>
{/if}
{#if (activeCoupons && activeCoupons.length > 0) }
    <div class="coupon__coupons-list">
        {#each activeCoupons as coupon}
            <BigCoupon coupon = {coupon}/>
        {/each}
    </div>
{:else}
    <p class="coupon__text">У вас пока нет активных купонов.</p>
    <button type="button" class="coupon-btn">В каталог</button>
{/if}