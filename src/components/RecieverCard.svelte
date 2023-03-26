<script>
  import { cartFormStore } from "@/stores/cart"
  import debounce from "lodash-es/debounce"
  import TelInput from "@/components/TelInput.svelte"
  import TextInput from "@/components/TextInput.svelte"
  import HelpButton from "@/components/HelpButton.svelte"

  function validateFormInput(e) {
    const elem = document.querySelector(
      `#form-recipient-data .validation .${e.target.name}`
    )
    console.log("elem", elem, e.target.name, e.target.validity)
    console.log("target", e.target)
    if (e.target.validity.valueMissing) {
      e.target.classList.add("error")
      elem.classList.remove("invisible")
      elem.textContent = errorText[e.target.name].valueMissing
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

<div id="form-recipient-data" class="bg-cardbg pt-34 rounded form-recipient-data">
  <h2 class="text-main font-semibold mb-24 text-xl leading-tight">Получатель</h2>
  <div class="w-full">
    <div class="mb-24">
      <div class="validation">
        <label class="label" for="cart-form-reciever-name">Имя и фамилия</label>
        <span class="error-text invisible name">Введите имя</span>
      </div>
      <div class="w-full">
        <TextInput
          required={true}
          on:invalid={handleInvalid}
          id="cart-form-reciever-name"
          className="w-full"
          name="name"
          on:input={debounce(validateFormInput, 400)}
          bind:value={$cartFormStore.customer.name.value}
          type="text"
        />
      </div>
    </div>
    <div>
      <div class="validation">
        <label class="label flex" for="cart-form-reciever-phone">
          <div class="flex">
            <p class="mr-8">Номер телефона получателя</p>
            <HelpButton
              position="CENTER"
              css="width: 300px;"
              text="Не переживайте, это будет сюрприз. Получатель узнает от&nbsp;кого цветы только если Вы&nbsp;укажете имя в открытке."
            />
          </div>
        </label>
        <span class="error-text invisible phone">Введите номер телефона</span>
      </div>
      <TelInput
        on:invalid={handleInvalid}
        name="phone"
        id="cart-form-reciever-phone"
        className="w-full"
        required={true}
        on:input={debounce(validateFormInput, 400)}
        bind:value={$cartFormStore.customer.phonenumber.value}
      />
    </div>
  </div>
</div>

<style lang="postcss">
  .form-recipient-data {
    width: 440px;
  }
  .label {
    @apply text-ssm leading-tight text-gray-600 block;
  }
  .validation {
    @apply flex justify-between text-xs leading-tight mb-8;
  }
  .error-text {
    @apply text-error;
  }
</style>
