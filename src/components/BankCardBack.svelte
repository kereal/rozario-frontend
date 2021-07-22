<script>
  import { onMount } from "svelte";
  import TextInput from './TextInput.svelte';
  import { cartFormStore } from "../stores/cart.js";
  import debounce from 'lodash-es/debounce';

  const maskOptions = {
    mask: "000",
  };

 function validateFormInput(e) {
    const elem = document.querySelector(
      `#cart-bank-card-back .validation .${e.target.name}`
    );
    console.log("e target", e.target.validity);
    if (!e.target.validity.valid) {
      e.target.classList.add("error");
      elem.classList.remove("invisible");
    } else {
      e.target.classList.remove("error");
      elem.classList.add("invisible");
    }
  }

  function handleInvalid(e) {
    e.preventDefault();
    validateFormInput(e);
  }
</script>

<style>
  .bankcard {
    width: 353px;
    height: 216px;
    border-radius: 15px;
  }
  .line {
    height: 47px;
  }
  .error-text {
    @apply text-error inline-block leading-tight text-ssm;
  }
</style>

<div id="cart-bank-card-back" class="bankcard shadow-light z-0 border border-gray-500 py-34 bg-white right-0">
  <div
      class="line bg-gray-300 w-full mb-12" />
  <div class="validation ml-auto flex w-1/6 flex-col mr-24">
    <label class="text-ssm leading-tight inline-block mb-8" for="card-cvv">CVV</label>
    <TextInput
      required={true}
      kind="mask"
      on:invalid={handleInvalid}
      on:input={debounce(validateFormInput, 400)}
      options={maskOptions}
      minlength={3}
      placeholder="000"
      name="cvv"
      id="card-cvv"
      type="text" />
      <span class="error-text mt-4 invisible cvv">Введите CVC</span>
  </div>
</div>
