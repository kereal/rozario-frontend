<script>
  import { cartFormStore } from "../stores/cart.js"
  import TextInput from "./TextInput.svelte"
  import debounce from "lodash-es/debounce"

  let customValidityText = "Введите название компании"
  let companyName
  let submitButton
  let name

  export let legalEntity = {
    name: "",
    inn: "",
    kpp: "",
    legalAddress: "",
    bankName: "",
    email: ""
  }

  const innMaskOptions = {
    mask: "0000000000"
  }

  const kppMaskOptions = {
    mask: "000000000"
  }

  const errorText = {
    name: {
      valueMissing: "Введите название юр. лица"
    },
    inn: {
      valueMissing: "Введите ИНН",
      tooShort: "ИНН содержит 10 цифр"
    },
    kpp: {
      valueMissing: "Введите КПП",
      tooShort: "КПП содержит 9 цифр"
    },
    legalAddress: {
      valueMissing: "Введите юридический адрес"
    },
    bankName: {
      valueMissing: "Введите название банка"
    },
    email: {
      valueMissing: "Введите е-mail",
      typeMismatch: "Неверный формат е-mail"
    }
  }

  function validateFormInput(e) {
    const elem = document.querySelector(
      `#payment-cash-legal .validation .${e.target.name}`
    )
    console.log("elem", elem, e.target.name, e.target.validity)
    if (e.target.validity.valueMissing) {
      e.target.classList.add("error")
      elem.classList.remove("invisible")
      elem.textContent = errorText[e.target.name].valueMissing
    } else if (e.target.validity.tooShort) {
      e.target.classList.add("error")
      elem.classList.remove("invisible")
      elem.textContent = errorText[e.target.name].tooShort
    } else if (e.target.validity.typeMismatch) {
      e.target.classList.add("error")
      elem.classList.remove("invisible")
      elem.textContent = errorText[e.target.name].typeMismatch
    } else {
      e.target.classList.remove("error")
      elem.classList.add("invisible")
    }
  }

  function handleInvalid(e) {
    e.preventDefault()
    validateFormInput(e)
  }
</script>

<div id="payment-cash-legal" class="mt-20 payment-cash-legal">
  <h4 class="mb-4 text-main font-semibold">Введите реквизиты для выставления счета</h4>
  <div class="mb-18 text-gray-600 leading-snug text-ssm whitespace-nowrap">
    Работает автоподстановка - начните вводить название юр. лица или ИП
  </div>
  <div class="w-full">
    <div class="mb-24">
      <div class="validation">
        <label class="label-text" for="form-company-name"> Название юр. лица </label>
        <span class="error-text invisible name">Введите название юр. лица</span>
      </div>
      <TextInput
        on:invalid={handleInvalid}
        required={true}
        bind:value={legalEntity.name}
        on:input={debounce(validateFormInput, 400)}
        className="w-full text-one-five"
        id="form-company-name"
        name="name"
      />
    </div>
    <div class="mb-24">
      <div class="validation">
        <label class="label-text" for="form-inn">ИНН</label>
        <span class="error-text invisible inn">Введите ИНН</span>
      </div>
      <TextInput
        kind="mask"
        options={innMaskOptions}
        on:invalid={handleInvalid}
        minlength={10}
        required={true}
        on:input={debounce(validateFormInput, 400)}
        bind:value={legalEntity.inn}
        className="w-full text-one-five"
        name="inn"
        id="form-inn"
      />
    </div>
    <div class="mb-24">
      <div class="validation">
        <label class="label-text" for="form-kpp">КПП</label>
        <span class="error-text invisible kpp">Введите КПП</span>
      </div>
      <TextInput
        kind="mask"
        options={kppMaskOptions}
        on:invalid={handleInvalid}
        minlength={9}
        required={true}
        bind:value={legalEntity.kpp}
        on:input={debounce(validateFormInput, 400)}
        className="w-full text-one-five"
        name="kpp"
        id="form-kpp"
      />
    </div>
    <div class="mb-24">
      <div class="validation">
        <label class="label-text" for="form-legal-address"> Юридический адрес </label>
        <span class="error-text invisible legalAddress"> Введите юридический адрес </span>
      </div>
      <TextInput
        on:invalid={handleInvalid}
        required={true}
        bind:value={legalEntity.legalAddress}
        on:input={debounce(validateFormInput, 400)}
        className="w-full text-one-five"
        name="legalAddress"
        id="form-legal-address"
      />
    </div>
    <div class="mb-24">
      <div class="validation">
        <label class="label-text" for="form-bank-name">Название банка</label>
        <span class="error-text invisible bankName"> Введите название банка </span>
      </div>
      <TextInput
        on:invalid={handleInvalid}
        required={true}
        bind:value={legalEntity.bankName}
        on:input={debounce(validateFormInput, 400)}
        className="w-full text-one-five"
        name="bankName"
        id="form-bank-name"
      />
    </div>
    <div class="">
      <div class="validation">
        <label class="label-text" for="form-your-email">
          E-mail для отправки счёта
        </label>
        <span class="error-text invisible email">Введите е-mail</span>
      </div>
      <TextInput
        on:invalid={handleInvalid}
        type="email"
        required={true}
        bind:value={legalEntity.email}
        on:input={debounce(validateFormInput, 400)}
        className="w-full text-one-five"
        name="email"
        id="form-your-email"
      />
    </div>
  </div>
</div>

<style lang="postcss">
  .payment-cash-legal {
    width: 440px;
  }
  .label-text {
    @apply text-gray-600 text-xs leading-tight;
  }
  .validation {
    @apply flex justify-between text-xs leading-tight mb-6;
  }
  .error-text {
    @apply text-error;
  }
</style>
