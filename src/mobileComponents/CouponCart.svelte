<script>

    import Notification from './Notification.svelte';

    export let type = "new";
    export let text;
    export let price;
    export let couponPrice;
    let newCoupon = false;
    let dealCoupon = false;
    let Used = true;
    let infoModalVisible = false;

    function toggleInfoModal() {
        infoModalVisible = !infoModalVisible;
    }

    function getCoupon(){
        Used = !Used
        if(type == "new") {
            newCoupon = true;
        } else {
            dealCoupon = true;
        }
    }



</script>

<style>
    .coupon {
        width: 100%;
        height: 55px;
        position: relative;
    }
    img {
        height: 45px;
    }
    .price {
        font-weight: 600;
        font-size: 16px;
    }
    .cart-coupon__text {
        font-size: 13px;
        line-height: 120%;
    }
    .left {
        padding: 0px 0 0px 0;
        width: 66%;
        height: 54.3px;
        margin-left: -1px;
        margin-right: -2px;
    }
    .right {
        text-align: center;
        width: calc(34% - 25px);
        height: 54.3px;
        margin-left: -2px;
        margin-right: -5px;
    }
    button {
        color: var(--color-main);
        width: 76px;
        height: 25px;
        text-align: center;
        font-size: 12px;
        line-height: 120%;
    }
    .unused:hover {
        color: var(--color-info);
        font-weight: 600;
    }
    .deal button {
        height: 25px;
        @apply bg-gray-200 ;
    }
    .new button {
        height: 25px;
        @apply bg-gray-200 ;
    }
    .used {
        color: var(--gray-700);
    }
    .coupon__color {
        position: absolute;
    }
svg {
    -moz-box-sizing: border-box; /* в Firefox нужен префикс */
    box-sizing: border-box;
}
</style>

<div class="{type} coupon text-white flex">
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="54" viewBox="0 0 15 57" fill="none" style="min-width:15px;">
        <path d="M7.5 0.000116118C3.35787 0.000116118 0 3.40274 0 7.6001V8.86677C2.69152 8.86677 4.87342 11.1352 4.87342 13.9334C4.87342 16.7317 2.69152 19.0001 0 19.0001V24.0667C2.69152 24.0667 4.87342 26.3352 4.87342 29.1334C4.87342 31.9316 2.69152 34.2 0 34.2V38C2.69152 38 4.87342 40.2685 4.87342 43.0667C4.87342 45.8649 2.69152 48.1334 0 48.1334V49.4C0 53.5974 3.35786 57 7.5 57C11.6421 57 15 57 15 57V0C15 0 11.6422 0.000116118 7.5 0.000116118Z" fill="{type == 'new' ? '#C555E4' : '#3ECF8E'}"/>
    </svg>
        <div class="flex items-center left" style=" background: {type == 'new' ? '#C555E4' : '#3ECF8E'};">
        <div class="leading-mid flex items-center ">
            <div class=" text-right mr-8 leading-mid price">
                {price}&nbsp;руб.
            </div>
            <div class="cart-coupon__text items-baseline leading-mid">{text}</div>
        </div>
            </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="55" viewBox="0 0 31 58" fill="none" style="min-width:31px;">
        <path d="M22.9353 0.147089C18.7932 0.147089 15.4353 3.54972 15.4353 7.74707V9.01374C18.1268 9.01374 20.3087 11.2822 20.3087 14.0804C20.3087 16.8786 18.1268 19.147 15.4353 19.147V24.2137C18.1268 24.2137 20.3087 26.4821 20.3087 29.2804C20.3087 32.0786 18.1268 34.347 15.4353 34.347V38.147C18.1268 38.147 20.3087 40.4154 20.3087 43.2137C20.3087 46.0119 18.1268 48.2803 15.4353 48.2803V49.547C15.4353 53.7443 18.7932 57.147 22.9353 57.147C27.0774 57.147 30.4353 57.147 30.4353 57.147V0.146973C30.4353 0.146973 27.0775 0.147089 22.9353 0.147089Z" fill="{type == 'new' ? '#C555E4' : '#3ECF8E'}"/>
        <path d="M7.9353 0.147089C12.0774 0.147089 15.4353 3.54972 15.4353 7.74707V9.01374C12.7438 9.01374 10.5619 11.2822 10.5619 14.0804C10.5619 16.8786 12.7438 19.147 15.4353 19.147V24.2137C12.7438 24.2137 10.5619 26.4821 10.5619 29.2804C10.5619 32.0786 12.7438 34.347 15.4353 34.347V38.147C12.7438 38.147 10.5619 40.4154 10.5619 43.2137C10.5619 46.0119 12.7438 48.2803 15.4353 48.2803V49.547C15.4353 53.7443 12.0774 57.147 7.93531 57.147C3.79317 57.147 0.435303 57.147 0.435303 57.147V0.146973C0.435303 0.146973 3.79314 0.147089 7.9353 0.147089Z" fill="{type == 'new' ? '#C555E4' : '#3ECF8E'}"/>
    </svg>
        <div class="right flex justify-around items-center " style=" background: {type == 'new' ? '#C555E4' : '#3ECF8E'};">
            {#if Used}
                <button class="w-full rounded  text-sm leading-mid unused" on:click={toggleInfoModal}
                        on:click={getCoupon}>
                    <span class="flex w-full h-full items-center justify-center mb-2">получить</span>
                </button>
            {:else}
                <button class="w-full rounded text-sm leading-mid used">
                    <span class="flex w-full h-full items-center justify-center mb-2">получен</span>
                </button>
            {/if}
        </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="55" viewBox="0 0 16 58" fill="none" style="min-width:25px;">
        <path d="M7.50292 0.147089C11.6451 0.147089 15.0029 3.54972 15.0029 7.74707V9.01374C12.3114 9.01374 10.1295 11.2822 10.1295 14.0804C10.1295 16.8786 12.3114 19.147 15.0029 19.147V24.2137C12.3114 24.2137 10.1295 26.4821 10.1295 29.2804C10.1295 32.0786 12.3114 34.347 15.0029 34.347V38.147C12.3114 38.147 10.1295 40.4154 10.1295 43.2137C10.1295 46.0119 12.3114 48.2803 15.0029 48.2803V49.547C15.0029 53.7443 11.6451 57.147 7.50293 57.147C3.3608 57.147 0.00292969 57.147 0.00292969 57.147V0.146973C0.00292969 0.146973 3.36077 0.147089 7.50292 0.147089Z" fill="{type == 'new' ? '#C555E4' : '#3ECF8E'}"/>
    </svg>
</div>

{#if newCoupon}
    <Notification
            text="Купон будет добавлен в раздел «Мои купоны». Вы можете его использовать для оплаты следующего заказа."
            title="Купон получен!" bind:visible={newCoupon}/>
{/if}
{#if dealCoupon}
    <Notification
            text="Вы сможете использовать его для оплаты при оформлении заказа."
            title="Купон получен!" bind:visible={dealCoupon}/>
{/if}