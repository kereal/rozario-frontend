<script>
    import Popup from './Popup.svelte'
    export let visible;
    export let terms = [
        {
            name:'к точному времени с 21:00 до 08:00',
            price:444
        },
        {
            name:'в интервале 2 часа с 21:00 до 08:00',
            price:444
        },
        {
            name:'к точному времени с 08:00 до 21:00',
            subText:'Бесплатно при заказе от 1500 ₽',
            price:444
        },
        {
            name:'в интервале 2 часа с 08:00 до 21:00',
            price:444
        },
        {
            name:'самовывоз с 9:00 до 21:00 ',
            price:0
        },
    ]


</script>
<style>
    .term {
        border-bottom: 1px solid var(--gray-300);
        width: 100%;
        padding: 16px 0;
    }
    .term:first-child {
        padding-top: 0;
    }
    .subText {
        font-size: 12px;
        line-height: 120%;
        color: var(--color-info-light);
    }
    .text {
        font-size: 14px;
        line-height: 140%;
        color: var(--color-main);
    }
    .price {
        font-size: 14px;
        line-height: 135%;
        color: var(--color-main);
    }
    .footer {
        margin-top: 25px;
        font-size: 14px;
        line-height: 135%;
        color: var(--gray-700);
        margin-bottom: 12px;
    }


</style>

    <Popup title="Условия доставки" bind:visible={visible} size="max-height:80%; width:100%;">
        {#each terms as item}
        <div class="term">
            <div class=" flex items-center justify-between">
                <div class="text">{item.name}</div>
                <div class="price whitespace-nowrap">{item.price} ₽</div>
            </div>
            {#if item.subText != undefined}
                <div class="subText mt-4">
                    {item.subText}
                </div>
            {/if}
        </div>

        {/each}
        <div class="footer">
            Доставку выполняют курьеры Розарио.Цветы
        </div>
    </Popup>
