<script>
  import {onMount} from "svelte";
  import {currPaymentStore} from "../stores/cart.js";
  import { orderStore } from '../stores/order.js';
  import PaymentCheckBox from "./PaymentCheckBox.svelte";
  import PaymentKindBankCard from "./PaymentKindBankCard.svelte";
  import PaymentKindCashLegal from "./PaymentKindCashLegal.svelte";
  import CouponCheckbox from "./CouponCheckbox.svelte";
  import ActionInput from "./ActionInput.svelte";
  import CustomRadioButton from "./CustomRadioButton.svelte";
  import ActionTelInput from "./ActionTelInput.svelte";
  import TextInput from "./TextInput.svelte";
  import debounce from "lodash-es/debounce";
  import {createEventDispatcher} from "svelte";


  import {cartFormStore} from "../stores/cart.js";
  import Button from "./Button.svelte";

  export let paymentTypes = [];
  export let selectedMethod = 'cart';
  export let couponTypeList = [
    {type: "newuser", check: false},
    {type: "firsttime", check: false},
    {type: "friend", check: false},
  ];

  const DEAL_BUTTON_STATE = {
    DISABLED: "disabled",
    ACTIVE: "active",
    LOADING: "loading",
    DONE: "done",
  };

  let dealCodeValue = "";
  let dropdown = false;
  let showPayments = false;
  let promoCode;
  let innerWidth;

  let isNewUserCouponSelected = false;
  let isFirstTimeCouponSelected = false;
  let isFriendCouponSelected = false;

  let paymentList = [];

  let telInputStatus = "disabled";
  let smsValue = "";
  let signInPhoneButtonStatus = "disabled-main";
  let phoneValue = "";
  const ACTION_STATE = {
    DISABLED: "disabled",
    ACTIVE: "active",
    LOADING: "loading",
    TIMER: "timer"
  };

  function getSmsCode() {
    if (telInputStatus === ACTION_STATE.DISABLED) {
      return;
    }
    telInputStatus = ACTION_STATE.LOADING;
    setTimeout(() => {
      telInputStatus = ACTION_STATE.TIMER;
    }, 1000);
  }

  function handleFocus() {
    focused = true;
  }

  function telInputCompleted() {
    console.log("telIputCompleted");
    telInputStatus = ACTION_STATE.ACTIVE;
  }

  function telInputAccepted() {
    telInputStatus = ACTION_STATE.DISABLED;
  }

  function validateFormInput(e) {
    const elem = document.querySelector(
            `#sign-in-modal .validation .${e.target.name}`
    );
    if (!e.target.validity.valid) {
      e.target.classList.add("error");
      elem.classList.remove("invisible");
      emailInputStatus = "disabled";
    } else {
      e.target.classList.remove("error");
      elem.classList.add("invisible");
      emailInputStatus = "active";
    }
  }

  function handleInvalid(e) {
    e.preventDefault();
    validateFormInput(e);
  }

  const dispatch = createEventDispatcher();

  function showAllPayments() {
    showPayments = !showPayments;
  }

  function selectPayment(e) {
    paymentTypes = paymentTypes.map((type) => {
      if (e.target.dataset.kind === type.kind) {
        type.check = true;
        return type;
      }
      type.check = false;
      return type;
    });
    $currPaymentStore = e.target.dataset.kind;
    paymentList = getPaymentCardList(innerWidth, showPayments);
  }

  function selectCoupon(e) {
    couponTypeList = couponTypeList.map((type) => {
      if (e.target.dataset.type === type.type) {
        if (type) return type;
      }
      type.check = false;
      return type;
    });
    console.log(paymentTypes);
  }

  function getPaymentCardList(innerWidth, showPayments) {
    if (showPayments) {
      return paymentTypes;
    }
    if (innerWidth > 1480) {
      return paymentTypes.slice(0, 3);
    } else if (innerWidth <= 1480 && innerWidth > 1140) {
      return paymentTypes.slice(0, 2);
    } else if (innerWidth < 1140) {
      return paymentTypes.slice(0, 3);
    }
    return paymentTypes;
  }

  function submitDealCode() {
    dealButtonState = DEAL_BUTTON_STATE.LOADING;
    setTimeout(() => {
      dealButtonState = DEAL_BUTTON_STATE.DONE;
    }, 2000);
  }

  onMount(() => {
    innerWidth = window.innerWidth;
  });

  $: paymentList = getPaymentCardList(innerWidth, showPayments);
  $: dealButtonState =
          dealCodeValue && dealCodeValue.length > 0
                  ? DEAL_BUTTON_STATE.ACTIVE
                  : DEAL_BUTTON_STATE.DISABLED;

  $: signInPhoneButtonStatus =
          telInputStatus === "timer" && smsValue.length > 0
                  ? "active-main"
                  : "disabled-main";
</script>

<style>
  .method__tittle {
    font-weight: 600;
    font-size: 16px;
    line-height: 130%;
    color: var(--color-main);
  }
  .method__radios {

  }
  .method__odd {
    font-size: 14px;
    line-height: 135%;
    color: var(--gray-600);
  }
  .method__input {
    background: #FFFFFF;
    border: 1px solid var(--gray-500);
    box-sizing: border-box;
    border-radius: 4px;
    width: 92px;
    height: 27px;
    font-size: 15px;
    line-height: 135%;
    color: var(--color-main);
  }
  .method__input:focus {
    border: 1px solid var(--color-info);
  }

   input::-webkit-outer-spin-button,
   input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  .method__checkTel {
    width: 445px;
  }
  .form-payment-card :global(.payment-size) {
    height: 64px;
    min-width: 194px;
  }
  .payment-checkbox-wrapper {
    flex: 0 0 calc(100% / 2);
  }
  .paymentlist {
    height: auto;
  }
  @media (min-width: 1140px) {
    .payment-checkbox-wrapper {
      flex: 0 0 calc(100% / 3);
    }
    .paymentlist {
      height: 64px;
    }
  }
  @media (min-width: 1480px) {
    .payment-checkbox-wrapper {
      flex: 0 0 calc(100% / 4);
    }
    .paymentlist {
      height: 64px;
    }
  }
</style>

<svelte:window
  on:resize={debounce(() => {
    innerWidth = window.innerWidth;
  }, 100)} />

<div class="bg-cardbg rounded form-payment-card">
  <h3 class="text-main font-semibold mb-24 text-xl">Оплата</h3>
  <div class="mb-34">
    <h4 class="text-main font-semibold mb-14">Применить купон</h4>
    {#each couponTypeList as coupon}
      <div class="last:mb-0 mb-18">
        <CouponCheckbox
          id={`form-coupon-${coupon.type}`}
          on:click={selectCoupon}
          check={coupon.check}
          type={coupon.type} />
      </div>
    {/each}
  </div>
  <div class="">
    <h4 class="text-main font-semibold mb-16">Промокод (если есть)</h4>
    <ActionInput
      on:click={submitDealCode}
      bind:value={dealCodeValue}
      state={dealButtonState} />
  </div>
  <div class="w-full mt-68">
    <div
      class="flex -mr-16 {!innerWidth || (innerWidth > 1140 && !showPayments) ? 'overflow-hidden paymentlist' : '-mb-16 '}
      flex-wrap ">
      {#each paymentList as ptype (ptype.kind)}
        <div class="pr-16 mb-16 payment-checkbox-wrapper">
          <PaymentCheckBox
            on:click={selectPayment}
            iconWidth={ptype.width}
            iconHeight={ptype.height}
            opacity={ptype.opacity}
            check={ptype.check}
            id={ptype.kind}
            kind={ptype.kind}
            className="h-full payment-size"
            text={ptype.text}
            src={ptype.src} />
        </div>
      {/each}
      <div class="{showPayments ? 'hidden' : ''} pr-16 mb-16 payment-checkbox-wrapper">
        <button
          type="button"
          on:click={showAllPayments}
          class="hover:bg-info w-full h-full hover:text-white
          hover:font-semibold payment-size text-main rounded border
          border-gray-300 bg-gray-300 flex justify-center mr-16 mb-16
          items-center ">
          <p class="text-one-five text-center">
            Другие способы
            <br />
            оплаты
          </p>
        </button>
      </div>
    </div>
  </div>

  <div class="">
    {#if 'BankCard' === $currPaymentStore}
      <PaymentKindBankCard />
    {:else if 'CashLegal' === $currPaymentStore}
      <PaymentKindCashLegal />
      {:else if 'Cash' === $currPaymentStore}
      <div class="mt-48">
        <h2 class="method__tittle mb-16">Способ оплаты</h2>
        <div class="method__radios">
          <CustomRadioButton bind:group={selectedMethod} value="cart" label="Банковской картой" name={selectedMethod} className="mb-16" labelClass="text-custom"/>
          <CustomRadioButton bind:group={selectedMethod} value="cash" label="Наличными" name={selectedMethod} labelClass="text-custom"/>
          {#if selectedMethod =='cash'}
            <div class="ml-30 flex items-center mt-10">
              <span class="method__odd">Требуется сдача с</span> <input class="method__input ml-6 mr-6 pl-12 pr-12" type="number" min={$orderStore.totalPrice} max="{$orderStore.totalPrice + 5000}"> <span class="method__odd">₽</span>
            </div>
          {/if}
          <div class="method__checkTel">
            <div class="text-main leading-snug mb-30 mt-40 font-semibold">
              <span>Введите код из СМС, отправленный на ваш номер телефона</span>
            </div>
            <div class="mb-16 flex">
              <ActionTelInput
                      className="w-full"
                      id="SignInTelephone"
                      getFocus={true}
                      on:click={getSmsCode}
                      state={telInputStatus}
                      on:accept={telInputAccepted}
                      on:completed={telInputCompleted}
                      on:focus={handleFocus}
                      bind:value={phoneValue}
                      placeholder="номер телефона"/>
            </div>
            <div class="w-full flex">
              <TextInput
                      size="lg"
                      on:focus={handleFocus}
                      bind:value={smsValue}
                      className="w-full"
                      placeholder="Код из смс"
                      type="text"
                      name="sms"
                      style="border-right: none; width: 287px; border-radius:4px 0 0 4px;"/>
              <Button status={signInPhoneButtonStatus} size="custom" >
                <span>Подтвердить</span>
              </Button>
            </div>
          </div>
      </div>
    </div>
    {:else if 'GooglePay' === $currPaymentStore}
      <div class="text-one-five text-main leading-mid mt-24">
        Мы зарезервируем 3 459 ₽ на вашей карте и спишем после доставки заказа.
      </div>
    {:else if 'PayPal' === $currPaymentStore}
      <div class="text-one-five text-main leading-mid mt-24">
        Вы будете перенаправлены на сайт PayPal для завершения покупки.
        <br />
        Мы зарезервируем 3 459 ₽ на вашей карте и спишем после доставки заказа.
      </div>
    {:else if 'ApplePay' === $currPaymentStore}
      <div class="text-one-five text-main leading-mid mt-24">
        Вы будете перенаправлены на сайт apple для завершения покупки.
        <br />
        Мы зарезервируем 3 459 ₽ на вашей карте и спишем после доставки заказа.
      </div>
    {:else if 'Beeline' === $currPaymentStore}
      <div class="text-one-five text-main leading-mid mt-24">
        Вы будете перенаправлены на сайт beeline для завершения покупки.
        <br />
        Мы зарезервируем 3 459 ₽ на вашей карте и спишем после доставки заказа.
      </div>
    {:else if 'WebMoney' === $currPaymentStore}
      <div class="text-one-five text-main leading-mid mt-24">
        Вы будете перенаправлены на сайт webmoney для завершения покупки.
        <br />
        Мы зарезервируем 3 459 ₽ на вашей карте и спишем после доставки заказа.
      </div>
    {:else if 'Qiwi' === $currPaymentStore}
      <div class="text-one-five text-main leading-mid mt-24">
        Вы будете перенаправлены на сайт qiwi для завершения покупки.
        <br />
        Мы зарезервируем 3 459 ₽ на вашей карте и спишем после доставки заказа.
      </div>
    {:else if 'Svyaznoy' === $currPaymentStore}
      <div class="text-one-five text-main leading-mid mt-24">
        Вы будете перенаправлены на сайт связной для завершения покупки.
        <br />
        Мы зарезервируем 3 459 ₽ на вашей карте и спишем после доставки заказа.
      </div>
    {:else if 'Mts' === $currPaymentStore}
      <div class="text-one-five text-main leading-mid mt-24">
        Вы будете перенаправлены на сайт мтс для завершения покупки.
        <br />
        Мы зарезервируем 3 459 ₽ на вашей карте и спишем после доставки заказа.
      </div>
    {/if}
  </div>
</div>
