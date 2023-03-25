<script>
    import Popup from './Popup.svelte'
    import CustomRadioButton from './CustomRadioButton.svelte'
    import Button from './Button.svelte'

    export let visible;
    export let selectedWayPayment = ''
    export let paymentName;


    export let waysPaymant = [
        {
            buttonText: "Перейти к оплате",
            text: "Банковская карта",
            src: "bankcard.svg",
            kind: "BankCard",
            check: true
        },
        {
            buttonText: "Оформить заказ",
            text: "Оплата при получении",
            src: "cash.svg",
            kind: "Cash",
            check: false
        },
        {
            buttonText: "",
            text: "",
            src: "gpay.svg",
            kind: "GooglePay",
            width: "72",
            height: "29",
            opacity: '85',
            check: false
        },
        {
            buttonText: "Выставить счёт",
            text: "Безнал для юр. лиц",
            src: "legal.svg",
            kind: "CashLegal",
            check: false
        },
        {
            buttonText: "Перейти к оплате",
            text: "",
            src: "PayPal.svg",
            kind: "PayPal",
            width: "120",
            height: "32",
            opacity: "80",
            check: false
        },
        {
            buttonText: "Перейти к оплате",
            text: "",
            src: "Yandex_Money.svg",
            kind: "YandexMoney",
            width: "134",
            height: "26",
            opacity: '70',
            check: false
        },
        {
            buttonText: "Оплатить с",
            text: "",
            src: "apple-pay.svg",
            kind: "ApplePay",
            width: "73",
            height: "32",
            opacity: '60',
            check: false
        },
        {
            buttonText: "Перейти к оплате",
            text: "",
            src: "Beeline.svg",
            kind: "Beeline",
            width: "109",
            height: "32",
            opacity: '70',
            check: false
        },
        {
            buttonText: "Перейти к оплате",
            text: "",
            src: "WebMoney_logo.svg",
            kind: "WebMoney",
            width: "133",
            height: "30",
            opacity: "85",
            check: false
        },
        {
            buttonText: "Перейти к оплате",
            text: "",
            src: "qiwi_logo.svg",
            kind: "Qiwi",
            width: "88",
            height: "32",
            opacity: "75",
            check: false
        },
        {
            buttonText: "Перейти к оплате",
            text: "",
            src: "Svyaznoy.svg",
            kind: "Svyaznoy",
            width: "104",
            height: "18",
            opacity: "80",
            check: false
        },
        {
            buttonText: "Перейти к оплате",
            text: "",
            src: "mts.svg",
            kind: "Mts",
            width: "88",
            height: "22",
            opacity: "75",
            check: false
        }
    ];
</script>

<style>
    .ways {
        margin-bottom: 80px;
        overflow:scroll;
    }
    .way {
        padding-bottom: 18px;
        margin-bottom: 18px;
        border-bottom: 1px solid var(--gray-300);
    }
    img {
        height: 22px;
    }


</style>

<Popup  bind:visible title="Способ оплаты" size="max-height: 80%; width:100%; z-index:9999; overflow:hidden;">
    <div class="ways">
        {#each waysPaymant as way}
            <div class="way" on:click={()=>{paymentName = way}}>
                <CustomRadioButton  value='{way.kind}' bind:group={selectedWayPayment} label="{way.kind}">
                    <div class="flex w-full items-center ">
                        <img src="{way.src}" alt="way" style="height:{way.height}px;">
                        {#if way.text}
                            <div class="text whitespace-nowrap ml-12">{way.text}</div>
                        {/if}
                    </div>
                </CustomRadioButton>
            </div>
        {/each}
    </div>

</Popup>