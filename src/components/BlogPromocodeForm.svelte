<script>
    import Button from './Button.svelte';
    import Checkbox from './Checkbox.svelte';
    import Loader from './icons/Loader2.svelte';

    const ACTION_STATE = {
        ACTIVE: "active",
        LOADING: "loading"
    };

    let inputStatus = ACTION_STATE.ACTIVE;
    let formDisabled = false;

    export let className;
    export let onSuccess = () => {};
    export let onError = () => {};
    const isResultSuccessful = (email) => email !== 'email@taken.ru';
    const onFormSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid(e)) {
            return;
        }
        const email = e.target.elements['email'].value;

        inputStatus = ACTION_STATE.LOADING;
        formDisabled = true;
        setTimeout(() => {
            inputStatus = ACTION_STATE.ACTIVE;
            formDisabled = false;

            if (isResultSuccessful(email)) {
                onSuccess();
            } else {
                onError();
            }
        }, 3000);
    };
    const isEmailValid = email => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    const isFormValid = e => {
        const email = e.target.elements['email'].value;
        const accepted = e.target.elements['accepted'].checked;
        if (!email || !email.trim()) {
            error = error_email_required;
        } else if (email.indexOf('@') === -1) {
            error = error_no_at;
        } else if (!isEmailValid(email)) {
            error = error_email_incorrect;
        } else if (!accepted) {
            error = error_checkbox_required;
            shakeCheckbox(e.target.elements['accepted'].parentNode.parentNode);
        } else {
            error = '';
            return true;
        }
        return false;
    };

    const shakeCheckbox = el => {
        el.classList.add('shake');
        setTimeout(() => el.classList.remove('shake'), 1500);
    };

    const error_no_at = 'Адрес эл. почты должен содержать один знак @';
    const error_email_required = 'Пожалуйста, введите адрес электронной почты';
    const error_email_incorrect = 'Пожалуйста, введите корректный адрес эл. почты';
    const error_checkbox_required = 'Пожалуйста, отметьте согласие получать рассылку';

    let error = '';

    const checkboxToggled = () => error = '';
    const emailKeyUp = (e) => {
        const email = e.target.value;
        if (email.trim().length > 0) {
            error = '';
        }
    };
</script>
<style>
    .main-block h2 {
        font-weight: bold;
        font-size: 22px;
        line-height: 135%;
        margin-bottom: 12px;
        color: var(--color-main);
    }
    .main-block p {
        font-weight: normal;
        font-size: 16px;
        line-height: 130%;
        color: var(--color-main);
        margin-bottom: 30px;
    }
    .main-block .input {
        max-width: 440px;
        display: flex;
        flex-direction: row;
        margin-bottom: 18px;
        order: 2;
    }

    .main-block.wrapper {
        display: flex;
        flex-direction: row;
        text-align: left;
    }
    .main-block .promocode-body {
        flex-grow: 1;
        min-width: 380px;
    }
    .main-block .promocode-body form {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .main-block h2 {
        font-weight: bold;
        font-size: 22px;
        line-height: 135%;
        margin-top: 10px;
    }
    .main-block p {
        font-weight: normal;
        font-size: 16px;
        line-height: 130%;
        color: var(--color-main);
        margin: 12px 0 30px;
    }
    .main-block input {
        height: 44px;
        padding: 12px;

        background: var(--color-light);
        border: 1px solid var(--gray-500);
        border-radius: 4px;

        font-size: 15px;
        line-height: 135%;
        width: 100%;
        margin-right: -4px;
        color: var(--color-main);
    }
    .main-block input::placeholder {
        color: var(--gray-700);
    }
    .main-block .checkbox {
        order: 3;
        max-width: 440px;
    }
    .main-block .checkbox label {
        display: flex;
        cursor: pointer;
    }
    .main-block .checkbox span {
        margin-left: 12px;
        font-weight: normal;
        font-size: 14px;
        line-height: 135%;
        color: var(--gray-600);
    }
    .main-block form :global(button) {
        width: 159px;
        height: 44px;
        flex-shrink: 0;
        padding: 12px;
        position: relative;
        z-index: 2;
        font-weight: 600;
        font-size: 15px;
        line-height: 135%;
        text-align: center;
        border-radius: 0px 4px 4px 0px;
    }
    .main-block .input.loading :global(button) {
        color: var(--color-light);
        background-color: var(--color-info);
        padding: 0;
    }
    .main-block .error {
        order: 1;
        margin-bottom: 6px;
        margin-top: -21px;
        font-weight: normal;
        font-size: 13px;
        line-height: 120%;
        color: var(--color-error);
    }
    .main-block .error div {
        font-weight: normal;
        font-size: 13px;
        line-height: 120%;
        color: var(--color-error);
    }
    .main-block .error svg {
        display: none;
    }


    .in-aside.wrapper {
        margin: 30px 18px;
        background: #E71F75;
        border-radius: 4px;
        color: var(--color-light);
        padding: 24px 18px;
        height: 466px;
        display: flex;
        flex-direction: column;
    }
    .in-aside .promocode-body {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .in-aside .promocode-body form {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .in-aside h2 {
        font-weight: bold;
        font-size: 22px;
        line-height: 135%;
        text-align: center;
    }
    .in-aside p {
        font-size: 16px;
        line-height: 130%;
        text-align: center;
        color: var(--color-light);
        margin: 16px 0 30px;
    }
    .in-aside .input.loading :global(button) {
        padding: 0;
    }
    .in-aside input {
        background: var(--color-light);
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        border-radius: 4px;
        font-size: 15px;
        padding: 12px;
        line-height: 135%;
        width: 100%;
        margin-bottom: 12px;
        color: var(--color-main);
    }
    .in-aside input::placeholder {
        color: var(--gray-700);
    }
    .in-aside .checkbox label {
        display: flex;
        cursor: pointer;
    }
    .in-aside .checkbox {
        margin-top: auto;
    }
    .in-aside .checkbox span {
        margin-left: 12px;
        font-weight: normal;
        font-size: 14px;
        line-height: 135%;
        color: var(--color-light);
    }
    .in-aside form :global(button) {
        width: 100%;
        height: 44px;
        padding: 12px;
        position: relative;
        z-index: 2;
        font-weight: 600;
        font-size: 15px;
        line-height: 135%;
        text-align: center;
        color: var(--color-main);
    }
    .in-aside form :global(button:hover) {
        background: var(--color-accent);
        color: var(--color-main);
    }
    .in-aside .error {
        display: flex;
        align-items: flex-start;
        margin-top: -3px;
        background: var(--color-light);
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        border-radius: 0 0 4px 4px;
        padding: 11px 11px 8px 12px;
    }
    .in-aside .error div {
        font-weight: normal;
        font-size: 13px;
        line-height: 140%;
        color: var(--color-main);
    }
    .in-aside .error svg {
        flex-shrink: 0;
        margin-right: 12px;
    }
    .checkbox.shake {
        animation-name: shakeX;

        animation-duration: 1s;
        animation-fill-mode: both;
    }

    @keyframes shakeX {
        0%, 100% {
            transform: translateZ(0);
        }
        25%, 50%, 70%, 90% {
            transform: translate3d(-10px,0,0);
        }
        20%, 40%, 60%, 80% {
            transform: translate3d(10px,0,0);
        }
    }

    .input :global(.spin) {
        animation-name: spin;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
    @keyframes spin {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    input:focus {
        border: 1px solid var(--color-info-light);
    }
    input.invalid {
        color: var(--color-error);
    }
</style>
<div class="wrapper {className}">
    <div class="promocode-body">
        <h2>Получите промокод на скидку  </h2>
        <p>Подпишитесь на нашу еженедельную рассылку без спама.</p>
        <form on:submit="{onFormSubmit}">
            <div class="input" class:loading="{inputStatus === ACTION_STATE.LOADING}">
                <input on:keyup="{emailKeyUp}" name="email" type="text" placeholder="Адрес электронной почты">
                <Button>
                    {#if inputStatus !== ACTION_STATE.LOADING}
                        <span>Подписаться</span>
                    {:else}
                        <Loader />
                    {/if}
                </Button>
            </div>
            {#if error}
                <div class="error">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.8091 15.7347L11.2193 0.856817C10.9648 0.415996 10.509 0.152832 10 0.152832C9.49098 0.152832 9.03516 0.415996 8.78066 0.856817L0.190898 15.7347C-0.0636328 16.1755 -0.0636328 16.7019 0.190898 17.1427C0.445391 17.5835 0.901211 17.8467 1.41023 17.8467H18.5898C19.0988 17.8467 19.5546 17.5835 19.8091 17.1427C20.0636 16.7019 20.0636 16.1755 19.8091 15.7347Z" fill="#E81717"/>
                        <path d="M10.5874 5.16699H9.41406V11.4247H10.5874V5.16699Z" fill="white" stroke="white" stroke-width="0.3"/>
                        <path d="M10.001 15.1196C10.433 15.1196 10.7832 14.7694 10.7832 14.3374C10.7832 13.9054 10.433 13.5552 10.001 13.5552C9.56897 13.5552 9.21875 13.9054 9.21875 14.3374C9.21875 14.7694 9.56897 15.1196 10.001 15.1196Z" fill="white" stroke="white" stroke-width="0.5"/>
                    </svg>
                    <div>{error}</div>
                </div>
            {/if}

            <div class="checkbox">
                <label><Checkbox onchange="{checkboxToggled}" name="{'accepted'}" /> <span>Я согласен получать рассылку от Розарио.Цветы (отписаться можно в любой момент)</span></label>
            </div>
        </form>
    </div>
    <slot/>
</div>
