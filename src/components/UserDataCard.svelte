<script>
  import TelInput from "./TelInput.svelte";
  import CustomCheckbox from "./CustomCheckbox.svelte";
  import CongratulationsButton from "./CongratulationsButton.svelte";
  import CustomRadioButton from "./CustomRadioButton.svelte";
  import TextInput from "./TextInput.svelte";
  import HelpButton from "./HelpButton.svelte";
  import debounce from "lodash-es/debounce";

  import { currTabStore, cartFormStore } from "../stores/cart.js";
  import { onDestroy } from "svelte";

  export let tab;

  let emailInput;
  let smsInput;
  let subscribeToEmail = true;

  function validateEmail(e) {
    $cartFormStore.customer.email.isValid = emailInput.checkValidity();
    // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(e.target.value).toLowerCase());
  }
  function validateSMS(e) {
    $cartFormStore.customer.sms.isValid = smsInput.checkValidity();
  }

  let currTab;
  let dropdown = false;

  const errorText = {
    name: {
      valueMissing: "Введите имя",
    },
    phone: {
      valueMissing: "Введите номер телефона",
    },
    email: {
      typeMismatch: "Неверный формат е-mail",
    },
  };

  function validateFormInput(e) {
    const elem = document.querySelector(
      `#form-user-data .validation .${e.target.name}`
    );
    console.log("elem", elem, e.target.name, e.target.validity);
    console.log('target', e.target)
    if (e.target.validity.valueMissing) {
      e.target.classList.add("error");
      elem.classList.remove("invisible");
      elem.textContent = errorText[e.target.name].valueMissing;
    } else if (e.target.validity.typeMismatch) {
      e.target.classList.add("error");
      elem.classList.remove("invisible");
      elem.textContent = errorText[e.target.name].typeMismatch;
    } else {
      e.target.classList.remove("error");
      elem.classList.add("invisible");
    }
  }
  function handleInvalid(e) {
    e.preventDefault();
    validateFormInput(e);
  }

  $: console.log('subscribeToEmail', subscribeToEmail)
</script>

<style lang="postcss">
  .form-user-data {
    width: 440px;
  }
  .label {
    @apply text-ssm leading-tight text-gray-600 block;
  }
  .gap {
    @apply mb-24;
  }
  .validation {
    @apply flex justify-between text-xs leading-tight mb-8;
  }
  .error-text {
    @apply text-error;
  }
  .warranty-image {
    min-width: 17px;
    min-height: 24px;
  }
</style>

<div id="form-user-data" class="bg-cardbg {tab === 'me' ? 'pt-34' : ''} rounded form-user-data">
  <h2 class="text-main font-semibold mb-24 text-xl leading-tight">
    Ваши данные
  </h2>
  <div class="w-full">
    <div class="gap">
      <div class="validation">
        <label class="label" for="cart-form-name">Имя и фамилия</label>
        <span class="error-text invisible name">Введите имя</span>
      </div>
      <div class="w-full">
        <TextInput
          required={true}
          on:invalid={handleInvalid}
          id="cart-form-name"
          className="w-full"
          name="name"
          on:input={debounce(validateFormInput, 400)}
          bind:value={$cartFormStore.customer.name.value}
          type="text" />
      </div>
    </div>
    <div class="gap">
      <div class="flex validation">
        <div class="flex">
          <label class="label" for="cart-form-phone">Ваш номер телефона</label>
          <div class="ml-8 h-full pt-1">
            <HelpButton
                    position="CENTER"
              css="width: 300px;"
              text="Отправим СМС-уведомления о статусе заказа." />
          </div>
        </div>
        <span class="error-text invisible phone">Введите номер телефона</span>
      </div>
      <TelInput
        on:invalid={handleInvalid}
        name="phone"
        id="cart-form-phone"
        className="w-full"
        required={true}
        on:input={debounce(validateFormInput, 400)}
        bind:value={$cartFormStore.customer.phonenumber.value} />
    </div>
    <div class="mb-18">
      <div class="validation">
        <div class="flex">
          <label class="label" for="cart-form-email">E-mail</label>
          <div class="ml-8 pb-1 h-full">
          <HelpButton
                  position="CENTER"
            css="width: 300px;"
            text="Отправим кассовый чек об оплате и фотографию заказа до доставки. Увидеть фото вы также сможете в личном кабинете." />
          </div>
        </div>
        <span class="error-text invisible email">Неверный формат e-mail</span>
      </div>
      <TextInput
        on:invalid={handleInvalid}
        name="email"
        id="cart-form-email"
        type="email"
        className="w-full"
        on:input={debounce(validateFormInput, 400)}
        bind:value={$cartFormStore.customer.email.value} />
    </div>
    <CustomCheckbox
      value="subscribe"
      id="cart-subscribe-to-email"
      bind:check={subscribeToEmail}
      labelClass="text-sm leading-mid text-gray-600"
      label="Подписаться на рассылку о продуктах и услугах компании" />
    <div class="mt-30 flex">
      <span>
      <img class="inline-block warranty-image" width="17" height="24" src="warranty.svg" alt="icon" />
      </span>
      <span class="ml-12 text-sm leading-mid text-gray-600">
        Мы не передаем личные данные покупателей другим компаниям
      </span>
    </div>
  </div>
</div>
