<script>
  import { onMount } from "svelte";
  import TextInput from "./TextInput.svelte";
  import { cartFormStore } from "../stores/cart.js";
  import debounce from "lodash-es/debounce";

  let cardNumberInput;
  let cardNumberValue;
  let handleCardNumber;
  let cardExpirationDateValue;
  let cardExpirationDateInput;

  const cardNumberOptions = {
    mask: "0000 0000 0000 0000",
  };
  const dateMaskOptions = {
    mask: Date,
    pattern: "m/Y",
    blocks: {
      mm: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2,
      },
      Y: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 99,
        maxLength: 2,
      },
    },
    min: new Date(),
    max: new Date(2099, 0, 1),
    // define date -> str convertion
    format: function(date) {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      if (day < 10) day = "0" + day;
      if (month < 10) month = "0" + month;

      return [month, year].join("/");
    },
    // define str -> date convertion
    parse: function(str) {
      const [month, year] = str.split("/");
      return new Date(year, month - 1, day);
    },
  };

  function validateFormInput(e) {
    const elem = document.querySelector(
      `#cart-bank-card .validation .${e.target.name}`
    );
    console.log("e target", e.target.validity);
    if (e.target.validity.valueMissing) {
      e.target.classList.add("error");
      elem.classList.remove("invisible");
    } else if(e.target.validity.tooShort){
      e.target.classList.add("error");
      elem.classList.remove("invisible");
    } else if(e.target.validity.patternMismatch){
      e.target.classList.add("error");
      elem.classList.remove("invisible");
    } else {
      e.target.classList.remove("error");
      elem.classList.add("invisible")
    }
  }
  function handleInvalid(e) {
    e.preventDefault();
    validateFormInput(e);
  }

  function completeDate() {

  }
</script>

<style lang="postcss">
  .bankcard {
    width: 353px;
    height: 216px;
    border-radius: 15px;
  }
  label {
    @apply inline-block text-main leading-tight text-ssm;
  }
  .error-text {
    @apply text-error inline-block leading-tight text-ssm;
  }
</style>

<div
  id="cart-bank-card"
  class="shadow-light z-10 bankcard border border-gray-500 pt-34 pb-40 bg-white
  px-24">
  <div>
    <div class="validation flex justify-between  mb-8">
      <label for="card-number">Номер карты</label>
      <span class="error-text invisible cardNumber">Введите номер карты</span>
    </div>
    <TextInput
      required={true}
      on:invalid={handleInvalid}
      options={cardNumberOptions}
      className="w-full"
      name="cardNumber"
      id="card-number"
      minlength="16"
      on:input={debounce(validateFormInput, 400)}
      placeholder="0000 0000 0000 0000"
      kind="mask"
      type="text" />
  </div>
  <div class="flex mt-24">
    <div class="validation flex w-3/5 flex-col mr-18">
      <label class="mb-8" for="card-holder">Держатель карты</label>
      <TextInput
        required={true}
        on:invalid={handleInvalid}
        bind:value={$cartFormStore.bankCard.cardHolder.value}
        on:input={debounce(validateFormInput, 400)}
        className="w-full"
        placeholder="Имя и фамилия"
        id="card-holder"
        name="cardHolder"
        type="text" />
      <span class="error-text mt-4 invisible cardHolder">Введите имя</span>
    </div>
    <div class="validation flex w-2/5 flex-col">
      <label class="mb-8" for="card-expiration-date">Срок действия</label>
      <TextInput
        required={true}
        on:complete={completeDate}
        options={dateMaskOptions}
        on:input={debounce(validateFormInput, 400)}
        on:invalid={handleInvalid}
        pattern="\d{2}/\d{2}"
        className="w-full"
        placeholder="ММ/ГГ"
        name="expirationDate"
        id="card-expiration-date"
        kind="mask"
        type="text" />
      <span class="error-text mt-4 invisible expirationDate">Введите дату</span>
    </div>
  </div>
</div>
