<script>
    import { createEventDispatcher } from "svelte";
    import ModalSurface from "./ModalSurface.svelte";
    import LinkButton from "./LinkButton.svelte";

    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch("close");
    }

    // FIXME get from store
    export let deal = 0;
</script>

<style>
    .coupon {
        background: url("/404/coupon-404.png") no-repeat;
        width: 126px;
        height: 165px;
        padding-top: 32px;
        margin-right: 36px;
        margin-top: -4px;
    }
    .deal {
        font-size: 41px;
    }
    .coupon-text {
        font-size: 21px;
        padding-top: 40px;
    }

    .left-col {
        margin-right: 30px;
    }
    .left-col :global(a) {
        font-size: 15px;
        padding: 12px 30px;
        line-height: 135%;
    }
    .left-col .text-main {
        padding-top: 19px;
    }
</style>

<ModalSurface css="height:270px; width: 527px;" on:close={closeModal}>
    <div>
        <h3 class="text-main font-semibold text-1xl leading-small">
            Ваш приз — купон на 100 ₽
        </h3>
        <div class="mt-24 mb-18 flex justify-between">
            <div class="left-col">
                <div class="mb-14 text-sm leading-mid mt-8 text-main">
                    Вы сможете использовать купон при оформлении заказа.
                </div>
                <LinkButton
                        on:click={closeModal}
                        href="/catalog"
                        size="lg"
                        status="active-main">
                    Перейти в каталог
                </LinkButton>
            </div>
            <div class="">
                <div class="coupon text-white">
                    <div class="deal text-center font-semibold leading-snug">
                       100 &#8381;
                    </div>
                    <div
                            class="coupon-text leading-none px-4 font-semibold text-sm flex
            justify-center pt-2">
                        купон
                    </div>
                </div>
            </div>
        </div>
    </div>
</ModalSurface>
