<script>
  import { currentUser } from "@/stores/global"
  import { APIFetch } from "@/utils/APIFetch"
  import { onMount, createEventDispatcher, tick } from "svelte"
  import ModalSurface from "@/components/ModalSurface.svelte"
  import TelInput from "@/components/TelInput.svelte"
  import Button from "@/components/Button.svelte"

  let modalElement
  let focused = false
  let selectedType = "phone"
  let seconds = 60
  let inputCode = ""
  let phoneValue
  let emailValue
  let incorrectCode = false
  let error = false
  let letter = true
  let status = "active-main"
  let phoneValueError = false
  let EmailValueError = false
  let phoneForm
  let perishable_token
  let loading = false

  const dispatch = createEventDispatcher()

  function closeModal() {
    dispatch("close")
  }
  function handleFocus() {
    focused = true
  }

  function changeAuthType() {
    letter = true
    if (selectedType == "phone") {
      selectedType = "email"
      setTimeout(() => {
        status = "active-main"
        document.getElementById("signformEmail").focus()
      }, 100)
    } else if (selectedType == "email") {
      selectedType = "phone"
      setTimeout(() => {
        status = "active-main"
        document.getElementById("signformphone").focus()
      }, 100)
    }
  }

  function validateEmail(email) {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  // отправляем номер или почту
  const requestAuth = async (authData) => {
    try {
      const response = await APIFetch("/api/users/request_auth", {
        method: "POST",
        body: JSON.stringify({
          user: {
            ...authData
          }
        })
      })
      if (response.status === 200) {
        const data = await response.json()
        perishable_token = data.perishable_token
        return
      }
      if (response.status === 422) {
        // console.log(422)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // отправляем код и токен
  const auth = async (code, perishable_token) => {
    loading = true
    try {
      const response = await APIFetch("/api/users/auth", {
        method: "POST",
        body: JSON.stringify({
          user: {
            confirmation_token: code,
            perishable_token: perishable_token
          }
        })
      })
      if (response.status === 200) {
        const data = await response.json()
        currentUser.update((k) => (k = data))
        return true
      }
    } catch (error) {
      console.log(error)
    }
    loading = false
    await tick()
    document.getElementById("inputCodeSMS").focus()
    return false
  }

  function startTimer() {
    phoneForm = document.getElementById("signformphone")
    if (selectedType == "phone") {
      if (phoneValue.length > 15) {
        requestAuth({ phone: phoneValue.replaceAll(" ", "") })
        letter = false
        setTimeout(() => {
          status = "disabled-main"
          document.getElementById("inputCodeSMS").focus()
        }, 100)
        let inetvalId = setInterval(() => {
          if (seconds != 0) {
            seconds = seconds - 1
          } else {
            clearInterval(inetvalId)
            status = "active-secondary"
          }
        }, 1000)
      } else {
        phoneValueError = true
        phoneForm.classList.add("incorrectCode")
      }
    } else if (selectedType == "email") {
      if (validateEmail(emailValue)) {
        requestAuth({ email: emailValue.replaceAll(" ", "") })
        letter = false
        EmailValueError = false
        setTimeout(() => {
          status = "disabled-main"
          document.getElementById("inputCodeEmail").focus()
        }, 100)
        let inetvalId = setInterval(() => {
          if (seconds != 0) {
            seconds = seconds - 1
          } else {
            clearInterval(inetvalId)
            status = "active-secondary"
          }
        }, 1000)
      } else {
        EmailValueError = true
      }
    }
  }

  onMount(async () => {
    setTimeout(() => {
      document.getElementById("signformphone").focus()
    }, 100)
  })

  $: if (inputCode && inputCode.length === 4) {
    ;(async () => {
      const auth_result = await auth(inputCode, perishable_token)
      if (auth_result) {
        closeModal()
      } else {
        incorrectCode = false
        error = true
      }
    })()
  } else {
    incorrectCode = error = false
  }

  $: if (phoneValue) {
    if (phoneValue.length > 15) {
      phoneForm = document.getElementById("signformphone")
      phoneForm.classList.remove("incorrectCode")
      phoneValueError = false
    }
  }
</script>

<ModalSurface
  size="xl"
  bind:focused
  on:close-overlay={closeModal}
  on:close={closeModal}
  css="width: 400px;height: 387px;padding:30px 24px;"
>
  <div
    id="sign-in-modal"
    bind:this={modalElement}
    class="bg-white h-full rounded-lg signin-modal"
  >
    <h2 class="headerText">Войти в аккаунт</h2>
    {#if selectedType == "phone"}
      <TelInput
        name="phone"
        id="signformphone"
        className="w-full"
        required={true}
        placeholder="Номер телефона"
        bind:value={phoneValue}
        height="44"
      />
      <div class="forError ml-64 pl-64">
        <span class="hidden" class:error={phoneValueError}>Введите номер телефона</span>
      </div>
      {#if !letter}
        <input
          type="text"
          class="mt-18"
          placeholder="Код из SMS"
          onkeypress="this.value = this.value.replace(/[^\d]/g,'');"
          onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
          onkeydown="this.value = this.value.replace(/[^\d]/g,'');"
          bind:value={inputCode}
          id="inputCodeSMS"
          maxlength="4"
          class:incorrectCode
          disabled={loading}
        />
        <div class="forError">
          <span class="hidden" class:error>Неверный код подтверждения</span>
        </div>
      {/if}
    {/if}

    {#if selectedType == "email"}
      <input
        type="email"
        id="signformEmail"
        placeholder="Введите адрес эл.почты"
        bind:value={emailValue}
        class:incorrectCode={EmailValueError}
      />
      <div class="forError">
        <span class="hidden" class:error={EmailValueError}
          >Некорректный адрес эл.почты</span
        >
      </div>
      {#if !letter}
        <input
          type="text"
          class="mt-18"
          placeholder="Код из письма"
          onkeypress="this.value = this.value.replace(/[^\d]/g,'');"
          onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
          onkeydown="this.value = this.value.replace(/[^\d]/g,'');"
          bind:value={inputCode}
          id="inputCodeEmail"
          maxlength="4"
          class:incorrectCode
          disabled={loading}
        />
        <div class="forError">
          <span class="hidden" class:error>Неверный код подтверждения</span>
        </div>
      {/if}
    {/if}
    <button on:click={changeAuthType} class="w-full">
      <p class="changeMethod_text">
        войти с помощью {selectedType == "phone" ? "эл. почты" : "телефона"}
      </p>
    </button>
    <div class="footer">
      {#if letter}
        <div class="footer__text">
          <div>Нажимая кнопку «Далее», вы принимаете условия</div>
          <a href="useragreement" class="useragreement hover:text-gray-600">
            Пользовательского соглашения
          </a>
        </div>
      {/if}
      <div class="w-full">
        <Button size="full" {status} on:click={() => startTimer()}>
          <div class="effect">
            {#if letter}Далее{/if}
            {#if !letter}
              {#if seconds == 0}
                Получить код ещё раз
              {:else}
                <div class="a">
                  Получить код ещё раз через 0:{seconds < 10 ? "0" : ""}{seconds}
                </div>
              {/if}
            {/if}
          </div>
        </Button>
      </div>
    </div>
  </div>
</ModalSurface>

<style lang="postcss">
  .headerText {
    font-weight: 600;
    font-size: 22px;
    color: var(--color-main);
    margin-bottom: 34px;
  }
  .changeMethod_text {
    font-size: 16px;
    line-height: 130%;
    color: #1039c9;
    width: 100%;
    text-align: center;
    margin-top: 34px;
  }
  .footer {
    position: absolute;
    bottom: 24px;
    width: calc(100% - 48px);
  }
  .signin-modal :global(.phone-input input) {
    width: 180px;
    max-width: 180px;
  }
  .validation {
    @apply text-ssm leading-tight mb-6;
  }
  .error-text {
    @apply text-error;
  }
  input {
    background: #ffffff;
    border: 1px solid var(--gray-500);
    box-sizing: border-box;
    border-radius: 4px;
    color: var(--color-main);
    font-size: 15px;
    height: 44px;
    padding: 0 12px;
    width: 100%;
  }
  input:focus {
    background: #ffffff;
    border: 1px solid var(--color-info);
  }
  .error {
    display: block;
    color: red;
    font-weight: normal;
    font-size: 13px;
  }
  .incorrectCode {
    border-color: red !important;
  }
  .incorrectCode:focus {
    border: 1px solid red;
  }
  .forError {
    margin-top: 6px;
    height: 10px;
    margin-bottom: -16px;
  }
  .footer__text {
    font-weight: normal;
    font-size: 13px;
    line-height: 140%;
    color: var(--gray-700);
    margin-bottom: 16px;
  }
  .useragreement:hover {
    border-bottom: 1px solid var(--gray-600);
  }

  @keyframes anim {
    0% {
      opacity: 0;
      filter: blur(38px);
    }
    10% {
      opacity: 0;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
  .a {
    animation: anim 0.2s alternate;
    animation-iteration-count: 1;
  }
</style>
