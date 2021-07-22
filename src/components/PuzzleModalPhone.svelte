<script>
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";
    import ModalSurface from "./ModalSurface.svelte";
    import Button from "./Button.svelte";
    import ActionTelInput from "./ActionTelInput.svelte";

    const ACTION_STATE = {
        DISABLED: "disabled",
        ACTIVE: "active",
        LOADING: "loading",
        TIMER: "timer"
    };

    export let onRes = () => {};

    let height = 270;

    let focused = true;
    let callsCount = 0;

    let telInputStatus = "disabled";
    let phoneValue = '';
    let callsLimit = 2;
    let tooManyCalls = false;
    let wrongCode = false;
    let smsFormDisabled = true;
    let smsFormEmpty = true;

    let onCheckSmsError = () => {
        callsCount ++;
        if (callsCount < callsLimit) {
            wrongCode = true;
        } else {
            wrongCode = false;
            tooManyCalls = true;
        }
        height = 280;
    };

    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch("close");
    }
    const smsFormSubmit = (e) => {
        e.preventDefault();
        if (telInputStatus !== ACTION_STATE.TIMER
            ||
                smsFormEmpty
            ||
                tooManyCalls) {
            return;
        }

        const code = document.querySelector('.sms-form input').value;

        checkCode(code, () => onRes(), () => onCheckSmsError());
    };

    const checkCode = (code, onSuccess, onError) => {
        if (code === "1234") {
            console.log('success!');
            onSuccess();
        } else {
            onError();
        }
    };
    const smsInputChange = e => {
        console.log(e);
        smsFormEmpty = e.target.value.length === 0;
    };

    const getSmsCode = () => {
        if (telInputStatus === ACTION_STATE.DISABLED) {
            return;
        }
        telInputStatus = ACTION_STATE.LOADING;
        setTimeout(() => {
            telInputStatus = ACTION_STATE.TIMER;
            smsFormDisabled = false;
        }, 1000);
    };
    const telInputAccepted = () => {
        telInputStatus = ACTION_STATE.DISABLED;
    };
    const telInputCompleted = () => {
        console.log("telInputCompleted");
        telInputStatus = ACTION_STATE.ACTIVE;
    };
    const handleFocus = () => {
        focused = true;
    };

    onMount(() => {
        setTimeout(() => {
            document.querySelector('.phone-form input').focus();
            document.querySelector('.sms-form input').addEventListener('keyup', e => smsInputChange(e));
        }, 0);
    });
</script>

<style>
    .coupon {
        background: url("/404/coupon-404.png") no-repeat;
        width: 126px;
        height: 165px;
        padding-top: 32px;
        margin-right: 6px;
        margin-top: 2px;
    }
    .deal {
        font-size: 41px;
    }
    .coupon-text {
        font-size: 21px;
        padding-top: 40px;
    }

    .left-col {
        margin-right: 28px;
    }
    .left-col :global(button) {
        font-size: 15px;
        width: 160px;
        height: 44px;
        line-height: 135%;
    }
    .left-col .text-main {
        font-size: 15px;
        line-height: 135%;

        color: var(--color-main);
    }
    form {
        display: flex;
    }
    .phone-form {
        margin-bottom: 24px;
        margin-top: 18px;
    }
    .phone-form :global(input) {
        --gray-500: var(--gray-300);
        margin-left: -33px;
    }
    .sms-form input:focus {
        border-color: var(--color-info-light);
    }
    input {
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        padding: 12px;
        height: 44px;
        width: 160px;
        max-width: 160px;
        border-right: none;
    }
    input[disabled] {
        background: transparent;
    }
    .phone-form :global(input) {
        width: 160px;
        max-width: 160px;
    }
    form :global(button) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    form :global(button span) {
        font-weight: 400;
    }
    .sms-form.error input {
        border-color: var(--color-error);
    }
    .error-message {
        display: block;
        font-size: 13px;
        line-height: 120%;
        margin-top: 8px;
        color: var(--color-error);
    }
    .sms-form input::placeholder {
        color: var(--gray-700);
    }
    .sms-form.empty :global(button) {
        color: var(--gray-700);
        background-color: var(--gray-300);
    }
</style>

<ModalSurface css="height:{height}px; width: 527px;" on:close={closeModal}>
    <div>
        <h3 class="text-main font-semibold text-1xl leading-small">
            Ваш приз — купон на 100 ₽
        </h3>
        <div class="mt-24 mb-18 flex justify-between">
            <div class="left-col">
                <div class="text-main">
                    Для получения приза, пожалуйста, укажите свой телефон
                </div>

                <div class="phone-form">
                    <ActionTelInput
                            className="w-full"
                            on:click={getSmsCode}
                            state={telInputStatus}
                            on:accept={telInputAccepted}
                            on:completed={telInputCompleted}
                            on:focus={handleFocus}
                            bind:value={phoneValue} />
                </div>
                <form class="sms-form"  class:error="{wrongCode || tooManyCalls}" on:submit="{smsFormSubmit}" class:empty="{smsFormEmpty}">
                    <input disabled="{smsFormDisabled}" type="text" placeholder="Код из смс">
                    <Button>Подтвердить</Button>
                </form>
                {#if wrongCode}
                    <div class="error-message">Неверный код подтверждения</div>
                {/if}
                {#if tooManyCalls}
                    <div class="error-message">Превышено количество попыток</div>
                {/if}
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
