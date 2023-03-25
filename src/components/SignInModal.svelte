<script>
  import ActionInput from "./ActionInput.svelte"
  import ModalSurface from "./ModalSurface.svelte"
  import { createEventDispatcher } from "svelte"
  import ActionTelInput from "./ActionTelInput.svelte"
  import ActionEmail from "./ActionEmail.svelte"
  import TelInput from "./TelInput.svelte"
  import TextInput from "./TextInput.svelte"
  import Button from "./Button.svelte"
  import debounce from "lodash/debounce"

  export let session

  const svgSize = 24

  let modalElement
  let focused = false
  let phoneValue = ""
  let emailValue = ""
  let emailCodeValue = ""
  let smsValue = ""
  let isValid
  let signInEmailButtonStatus = "disabled-main"
  let signInPhoneButtonStatus = "disabled-main"
  let telInputStatus = "disabled"
  let emailInputStatus = "disabled"

  const STATE = {
    PHONE: "phone",
    EMAIL: "email"
  }

  const ACTION_STATE = {
    DISABLED: "disabled",
    ACTIVE: "active",
    LOADING: "loading",
    TIMER: "timer"
  }

  const dispatch = createEventDispatcher()

  let currentState = STATE.PHONE

  function closeViaOverlay(e) {
    if (modalElement && !modalElement.contains(e.target)) dispatch("close")
  }

  function closeModal() {
    dispatch("close")
  }

  const socials = ["Vk", "Facebook", "Ok", "Google"]

  function getSmsCode() {
    if (telInputStatus === ACTION_STATE.DISABLED) {
      return
    }
    telInputStatus = ACTION_STATE.LOADING
    setTimeout(() => {
      telInputStatus = ACTION_STATE.TIMER
    }, 1000)
  }

  async function getEmailCode() {
    if (emailInputStatus === ACTION_STATE.DISABLED) {
      return
    }
    emailInputStatus = ACTION_STATE.LOADING
    setTimeout(() => {
      emailInputStatus = ACTION_STATE.TIMER
    }, 1000)
    // console.log("emailValue", emailValue);
    // try {
    //   const response = await fetch("http://localhost:8000/getcode", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email: emailValue }),
    //   });
    //   const json = await response.json();
    //   console.log("json", json);
    //   if (json.message === "ok" && json.code) {
    //     window.localStorage.setItem("emailForSignIn", emailValue);
    //     // TODO show message
    //     console.log("json code =", json.code);
    //   }
    // } catch (e) {
    //   console.log("error", e);
    // }
  }

  function handleFocus() {
    focused = true
  }

  async function handleEmailSubmit() {
    try {
      const response = await fetch("login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: emailValue, code: emailCodeValue })
      })
      const user = await response.json()
      console.log("user", user)
      if (user.loggedin) {
        $session.loggedin = user.loggedin
        $session.user = user.user
        localStorage.setItem("refresh_token", user.refresh_token)
        localStorage.removeItem("emailForSignIn")
      } else {
        $session.loggedin = false
        $session.user = ""
        localStorage.removeItem("emailForSignIn")
      }
      closeModal()
    } catch (e) {}
  }

  function changeAuthType() {
    if (currentState === STATE.PHONE) {
      currentState = STATE.EMAIL
    } else {
      currentState = STATE.PHONE
    }
  }

  function telInputCompleted() {
    console.log("telIputCompleted")
    telInputStatus = ACTION_STATE.ACTIVE
  }

  function telInputAccepted() {
    telInputStatus = ACTION_STATE.DISABLED
  }

  function validateFormInput(e) {
    const elem = document.querySelector(`#sign-in-modal .validation .${e.target.name}`)
    console.log("e target", e.target.validity)
    if (!e.target.validity.valid) {
      e.target.classList.add("error")
      elem.classList.remove("invisible")
      emailInputStatus = "disabled"
    } else {
      e.target.classList.remove("error")
      elem.classList.add("invisible")
      emailInputStatus = "active"
    }
  }

  function handleInvalid(e) {
    e.preventDefault()
    validateFormInput(e)
  }

  $: signInEmailButtonStatus =
    emailInputStatus === "timer" && emailCodeValue.length > 0
      ? "active-main"
      : "disabled-main"

  $: signInPhoneButtonStatus =
    telInputStatus === "timer" && smsValue.length > 0 ? "active-main" : "disabled-main"
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
    {#if currentState === "phone"}
      <!-- <div class="mb-16 flex">

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
      <div class="mb-16 w-full">
        <TextInput
          size="lg"
          on:focus={handleFocus}
          bind:value={smsValue}
          className="w-full"
          placeholder="Код из смс"
          type="text"
          name="sms" />
      </div> -->
      <div>
        <button on:click|stopPropagation={changeAuthType} class="w-full">
          <p class="changeMethod_text">войти с помощью эл. почты</p>
        </button>
      </div>
      <Button size="lg" status={signInPhoneButtonStatus} className="w-full">Войти</Button>
    {:else if currentState === "email"}
      <form on:submit|preventDefault={handleEmailSubmit}>
        <div class="mb-16 w-full">
          <div class="validation">
            <span class="error-text invisible email">Некорректный e-mail</span>
          </div>
          <ActionEmail
            state={emailInputStatus}
            id="SignInEmail"
            getFocus={true}
            required={true}
            on:click={getEmailCode}
            on:focus={handleFocus}
            on:invalid={handleInvalid}
            on:input={debounce(validateFormInput, 400)}
            bind:value={emailValue}
            className="w-full"
            name="email"
            placeholder="Введите e-mail"
          />
        </div>
        <div class="mb-16 w-full">
          <TextInput
            size="lg"
            on:focus={handleFocus}
            className="w-full"
            bind:value={emailCodeValue}
            placeholder="Код из письма"
            type="text"
            name="sms"
          />
        </div>
        <div class="text-main mb-24">
          Или
          <button
            on:click|stopPropagation={changeAuthType}
            class="hover:text-info hover:border-info border-b border-main border-dashed"
          >
            войти с помощью телефона
          </button>
        </div>
        <Button size="lg" status={signInEmailButtonStatus} className="w-full">
          Войти
        </Button>
      </form>
    {/if}
    <div class="text-gray-700 leading-tight mb-30 mt-12 text-ssm">
      <div>Нажимая кнопку «Войти», вы принимаете условия</div>
      <a href="useragreement" class="hover:text-gray-600 underline">
        Пользовательского соглашения
      </a>
    </div>
    {#if currentState === "phone"}{:else}{/if}
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
</style>
