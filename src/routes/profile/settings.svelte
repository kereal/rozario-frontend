<script context="module">
  export async function preload(page, session) {
    try {
      const res = await this.fetch(`index.json?city=${page.host[0]}&path=${page.path}`)
      const json = await res.json()
      return {
        slug: page.slug,
        path: page.path,
        cityMeta: json.cityMeta,
        recommendations: json.recommendations
      }
    } catch (e) {
      console.log(e)
    }
  }
</script>

<script>
  import ScrollSpy from "../../utils/scrollSpy.js"
  import { onMount, afterUpdate, setContext } from "svelte"
  import { mainStore } from "../../stores/global.js"
  import { orderStore, addressStore } from "../../stores/order.js"
  import Tabbar from "../../components/Tabbar.svelte"
  import AsideNavigation from "../../components/AsideNavigation.svelte"
  import Button from "../../components/Button.svelte"
  import CustomCheckbox from "../../components/CustomCheckbox.svelte"
  import CustomDropdown from "../../components/CustomDropdown.svelte"
  import ModalDeleteAcc from "../../components/ModalDeleteAcc.svelte"
  import ModalChangePhoto from "../../components/ModalChangePhoto.svelte"
  import TelInput from "../../components/TelInput.svelte"
  import ConfirmationModal from "../../components/ConfirmationModal.svelte"
  import debounce from "lodash-es/debounce"
  import cloneDeep from "lodash/cloneDeep"
  import { currTabStore, cartFormStore } from "../../stores/cart.js"
  export let miniBlob

  onMount(async () => {
    headers = [MyDetails, Alerts]
    scrollSpy = new ScrollSpy(window, headers)
    const setIndex = (e) => {
      currentMenuIndex = e.detail.index
    }
    window.addEventListener("scrollspy-activate", setIndex)
    let dynamicMask = IMask(document.getElementById("email-mask-settings"), {
      mask: /^\S*@?\S*$/
    })
    let dateMask = IMask(document.getElementById("date_mask_settings"), {
      mask: Date,
      lazy: false
    })
  })

  export let path
  afterUpdate(() => {
    const setIndex = (e) => {
      currentMenuIndex = e.detail.index
    }
    scrollSpy.destroy()
    window.removeEventListener("scrollspy-activate", setIndex)
    clearTimeout(timeoutid)

    headers = [MyDetails, Alerts]
    scrollSpy = new ScrollSpy(window, headers)
    window.addEventListener("scrollspy-activate", setIndex)
  })
  import { page } from "$app/stores"

  export let userData = {
    name: "Rozario Shop",
    email: "example@rambler.ru",
    BirthDay: "18.10.1999",
    tel: "9021377173",
    selectedPhoto: "initials",
    push: " ",
    sms: "",
    email: ""
  }

  let values = cloneDeep(userData)
  let moreDropdownVisible = false
  let moreDropdownElement
  let moreDropdownButton
  let showModalDeleteButton = false
  let ModalPhoto = false
  let ModalChangeData = false
  let currentMenuIndex = 0
  let MyDetails
  let Alerts
  let timeoutid
  let headers
  let scrollSpy
  let changed = false
  export let fullImage
  const errorText = {
    name: {
      valueMissing: "Введите имя"
    },
    phone: {
      valueMissing: "Введите номер телефона"
    },
    email: {
      typeMismatch: "Неверный формат е-mail"
    }
  }

  function validateFormInput(e) {
    const elem = document.querySelector(`#form-user-data .validation .${e.target.name}`)
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
  export let recommendations
  const navlist = [
    { name: "Мои заказы", link: "profile", active: false },
    { name: "Избранное", link: "profile/favorites", active: false },
    { name: "Мои купоны", link: "profile/coupons", active: false },
    { name: "Мои события", link: "profile/events", active: false },
    { name: "Помощь", link: "profile/help", active: false },
    { name: "Настройки", link: "profile/settings", active: true },
    { name: "Игры", link: "profile/games", active: false }
  ]
  const menulist = [{ name: "Мои данные", index: 0 }]

  function showDelete() {
    moreDropdownVisible = !moreDropdownVisible
  }
  function showModalDelete() {
    showModalDeleteButton = !showModalDeleteButton
  }
  function showModalPhoto() {
    ModalPhoto = !ModalPhoto
  }
  function goToHeader(e) {
    const index = parseInt(e.detail.header)
    if (timeoutid) {
      clearTimeout(timeoutid)
    }
    scrollSpy.unblock()
    scrollSpy.block()
    window.scroll({
      top: scrollSpy._offsets[index] - scrollSpy._offsets[0],
      left: 0,
      behavior: "smooth"
    })
    timeoutid = setTimeout(() => {
      scrollSpy.unblock()
    }, 1000)
  }
  function animate() {
    if (document.getElementById("settings__photo_animate").style.display == "block") {
      document.getElementById("settings__photo_animate").style.display = "none"
    } else {
      document.getElementById("settings__photo_animate").style.display = "block"
    }
  }

  function confirmChange() {
    userData = values
    ModalChangeData = false
    changed = false
  }
  function closeDeleteModal() {
    ModalChangeData = false
  }

  $: if (values) {
    if (
      values.name != userData.name ||
      values.tel != userData.tel ||
      values.email != userData.email ||
      values.BirthDay != userData.BirthDay ||
      values.selectedPhoto != userData.selectedPhoto ||
      values.sms != userData.sms ||
      values.push != userData.push ||
      values.email != userData.email
    ) {
      changed = true
    }
  }

  function beforeUnload(e) {
    if (
      values.name != userData.name ||
      values.tel != userData.tel ||
      values.email != userData.email ||
      values.BirthDay != userData.BirthDay ||
      values.selectedPhoto != userData.selectedPhoto ||
      values.sms != userData.sms ||
      values.push != userData.push ||
      values.email != userData.email
    ) {
      var e = e || window.event
      var myMessage = "Вы действительно хотите покинуть страницу, не сохранив данные?"
      // Для Internet Explorer и Firefox
      if (e) {
        e.returnValue = myMessage
      }
      console.log(e, "event")
      return myMessage
    }
  }
</script>

<svelte:window on:beforeunload={beforeUnload} />
<svelte:head>
  <title>Настройки профиля</title>
  <meta name="description" content="PROFILE_DESCRIPTION" />

  <link rel="canonical" href={$page.host + $page.path} />

  <link
    rel="alternate"
    href={$page.host + $page.path}
    type="text/html"
    hreflang="ru"
    title="Русский"
  />
  <link
    rel="alternate"
    href={$page.host + $page.path}
    type="text/html"
    hreflang="en"
    title="English"
  />

  <meta
    name="keywords"
    content="Доставка цветов в Мурманске, Цветы с доставкой в Мурманске, Заказать цветы с доставкой в Мурманске, "
  />

  <meta name="geo.region" content="" />
  <meta name="geo.position" content="" />
  <meta name="geo.placename" content="" />
  <meta name="ICBM" content="" />
  <meta name="referrer" content="always" />

  <meta
    property="og:title"
    content="Надежная доставка цветов в Мурманске — Розарио.Цветы"
  />
  <meta
    property="og:description"
    content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в
    Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или
    банковской картой."
  />
  <meta property="og:image" content="ruka3.jpg" />
  <meta property="og:url" content="url" />
  <meta property="og:site_name" content="Розарио.Цветы" />
  <meta property="og:type" content="website" />

  <meta
    name="twitter:title"
    content="Надежная доставка цветов в Мурманске — Розарио.Цветы"
  />
  <meta
    name="twitter:description"
    content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в
    Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или
    банковской картой."
  />
  <meta name="twitter:image" content="ruka3.jpg" />
  <meta name="twitter:image:alt" content="Розарио.Цветы" />
  <meta name="twitter:card" content="summary" />
</svelte:head>
<div class="flex setiings">
  <div class="w-full">
    <Tabbar
      pos="top: 5rem;"
      className="sticky"
      on:change={goToHeader}
      {currentMenuIndex}
      {menulist}
    />
    <div class="settings__content">
      <div>
        <h2 data-scrollspy bind:this={MyDetails}>Мои данные</h2>
        <div class="settings__card relative">
          <div class="flex">
            <button
              class="absolute settings__button"
              bind:this={moreDropdownButton}
              on:mouseover={showDelete}
            >
              <span>...</span>
              {#if moreDropdownVisible}
                <CustomDropdown
                  bind:dropdownVisible={moreDropdownVisible}
                  buttonRef={moreDropdownButton}
                  relativeElement={moreDropdownButton}
                  position="CENTER"
                >
                  <div
                    class="bg-white rounded pl-24 pr-24 items-center dropDownDelete flex"
                    on:click={showModalDelete}
                    on:mouseleave={showDelete}
                  >
                    <svg
                      class="mr-8"
                      width="16px"
                      height="17px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                    >
                      <path
                        class=""
                        d="M29.1 5.6h-6.3C22.5 2.4 20.7 0 18.4 0h-4.8c-2.3 0-4.1 2.4-4.4 5.6H2.9c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1h1.4v20.5C4.3 30.3 6 32 8 32h16c2 0 3.7-1.7 3.7-3.7V7.8h1.4c.6 0 1.1-.5 1.1-1.1s-.4-1.1-1.1-1.1zM13.6 2.3h4.8c.9 0 1.9 1.4 2.1 3.3h-9.1c.3-1.9 1.3-3.3 2.2-3.3zm11.8 26c0 .7-.7 1.4-1.4 1.4H8c-.7 0-1.4-.7-1.4-1.4V7.8h18.9v20.5z"
                      />
                      <path
                        class=""
                        d="M13 24c.6 0 1.1-.5 1.1-1.1v-9.2c0-.6-.5-1.1-1.1-1.1s-1.1.5-1.1 1.1v9.2c-.1.6.5 1.1 1.1 1.1zM19 24c.6 0 1.1-.5 1.1-1.1v-9.2c0-.6-.5-1.1-1.1-1.1-.6 0-1.1.5-1.1 1.1v9.2c0 .6.5 1.1 1.1 1.1z"
                      />
                    </svg>
                    <span>Удалить аккаунт</span>
                  </div>
                </CustomDropdown>
              {/if}
            </button>

            <div on:mouseover={animate} on:mouseout={animate} class="relative">
              <div class="settings__photo flex">
                {#if values.selectedPhoto == "initials"}
                  <div class="miniPhoto initials w-full h-full">
                    <div>
                      <span>RF</span>
                    </div>
                  </div>
                {:else}
                  <div class="miniPhoto  w-full h-full">
                    <div class="w-full h-full">
                      <img
                        src={values.selectedPhoto}
                        alt="avatar"
                        class="w-full h-full"
                      />
                    </div>
                  </div>
                {/if}
                <div
                  class="settings__photo_change flex w-full absolute content__perspective"
                  id="settings__photo_animate"
                  on:click={showModalPhoto}
                >
                  <div class="settings__photo_text ">
                    <span>Изменить</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="settings__inputs">
              <div class="settings__inputsContain">
                <div class="settings__input">
                  <span>Имя</span>
                  <input type="name" bind:value={values.name} />
                </div>
                <div class="settings__input">
                  <span>Дата рождения</span>
                  <input
                    type="text"
                    id="date_mask_settings"
                    bind:value={values.BirthDay}
                  />
                </div>
                <div class="settings__input">
                  <span class="mb-8">Номер телефона</span>
                  <TelInput
                    on:invalid={handleInvalid}
                    name="phone"
                    id="cart-form-phone"
                    className="w-full"
                    required={true}
                    on:input={debounce(validateFormInput, 400)}
                    bind:value={values.tel}
                  />
                </div>
                <div class="settings__input">
                  <span>E-mail</span>
                  <input
                    type="email"
                    id="email-mask-settings"
                    bind:value={values.email}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 class="actions__title">Оповещения об акциях и предложениях</h3>
            <p class="actions__text">
              Подпипишитесь на уведомления и получите промокод на скидку.<br />Еженедельно
              получайте полезные статьи, а также информацию о скидках и акциях
            </p>
            <ul>
              <li class="mb-16">
                <CustomCheckbox
                  style="font-size: 14px;"
                  value="Push"
                  className="text-main"
                  id="Push"
                  label="Push-уведомления"
                  bind:check={values.push}
                />
              </li>
              <li class="mb-16">
                <CustomCheckbox
                  style="font-size: 14px;"
                  value="sms"
                  className="text-main"
                  id="sms"
                  label="SMS"
                  bind:check={values.sms}
                />
              </li>
              <li>
                <CustomCheckbox
                  style="font-size: 14px;"
                  value="email"
                  className="text-main"
                  id="email"
                  label="Электронная почта"
                  bind:check={values.email}
                />
              </li>
            </ul>
          </div>
          <div class="buttons flex ml-100">
            <Button
              textClass="text-base"
              size="md"
              status={changed == false ? "disabled-main" : "active-main"}
              on:click={() => {
                changed = false
                userData = values
                values = cloneDeep(values)
              }}
            >
              <span class="text-base font-semibold"> Сохранить </span>
            </Button>
            {#if changed == true}
              <Button
                textClass="text-base"
                size="md"
                status="active-secondary"
                className="ml-24"
                on:click={() => {
                  values = cloneDeep(userData)
                  changed = false
                }}
              >
                <span>Отменить</span>
              </Button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="aside-nav-container ml-10">
    <AsideNavigation {recommendations} {navlist} />
  </div>
</div>
{#if showModalDeleteButton}
  <ModalDeleteAcc bind:visible={showModalDeleteButton} />
{/if}
{#if ModalPhoto}
  <ModalChangePhoto
    bind:visible={ModalPhoto}
    bind:selected={values.selectedPhoto}
    bind:fullImage
    bind:miniBlob
  />
{/if}
{#if ModalChangeData}
  <ConfirmationModal
    text="Данные были изменены. Вы уверены, что хотите покинуть страницу без сохранения изменений?"
    confirmText="Отмена"
    cancelText="Уйти со страницы"
    on:confirm={closeDeleteModal}
    on:close={confirmChange}
  />
{/if}

<style lang="postcss">
  .setiings {
    min-height: calc(100vh - 5rem - 20px);
  }
  .settings__content {
    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
      linear-gradient(0deg, #f2f2f2, #f2f2f2);
    width: 100%;
    min-height: calc(100vh - 5rem - 86px);
    border: 1px solid var(--gray-300);
    padding: 48px 80px;
    padding-bottom: 68px;
    margin-bottom: 10px;
    border-radius: 0 0 4px 4px;
  }
  .settings__card {
    margin-top: 24px;
    padding-left: 5.1%;
    padding-right: 5.1%;
    padding-top: 34px;
    padding-bottom: 24px;
    background-color: #fff;
    width: 100%;
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    box-shadow: 0px 4px 15px rgba(51, 0, 51, 0.1);
    border-radius: 4px;
    justify-content: space-between;
    min-width: 542px;
  }

  .settings__photo {
    clip-path: circle(50% at center center);
    text-align: center;
    align-items: center;
    background-image: url("../../static/loading-bg-image.svg");
    width: 132px;
    height: 132px;
    overflow: hidden;
  }
  .miniPhoto {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 48px;
    line-height: 115%;
    color: var(--color-main);
    background: #cbf2ff;
  }
  .settings__photo_change {
    height: 87px;
    background: rgba(0, 0, 0, 0.5);
    top: 87px;
    width: 100%;
    display: none;
    cursor: pointer;
  }
  .settings__photo_text {
    display: flex;
    color: white;
    opacity: 1;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    margin-left: 30px;
    margin-top: 7px;
    z-index: 1111;
  }
  .settings__button {
    font-size: 32px;
    top: -12px;
    right: 16px;
    color: var(--gray-1100);
    padding-bottom: -10px;
  }
  .settings__inputsContain {
    display: flex;
    flex-wrap: wrap;
  }
  .settings__input {
    margin-bottom: 18px;
    width: 300px;
  }
  .settings__input:last-child {
    margin-bottom: 0px;
  }
  .settings__inputs {
    margin-left: 5.1%;
  }

  .settings__input input {
    background: #ffffff;
    border: 1px solid var(--gray-500);
    box-sizing: border-box;
    border-radius: 4px;
    color: var(--color-main);
    font-size: 15px;
    margin-top: 8px;
    height: 35px;
    padding: 0 12px;
    width: 100%;
  }

  .settings__input:nth-child(odd) {
    margin-right: 5.1%;
  }

  .settings__input input:focus {
    background: #ffffff;
    border: 1px solid var(--color-info);
  }
  .settings__input span {
    display: block;
    font-size: 13px;
    color: var(--gray-600);
  }
  .dropDownDelete {
    font-size: 15px;
    color: var(--gray-700);
    stroke: var(--gray-700);
    height: 56px;
    fill: var(--gray-700);
  }
  .dropDownDelete:hover {
    color: var(--color-info);
    cursor: pointer;
    stroke: var(--color-info);
    fill: var(--color-info);
  }
  .actions__title {
    font-weight: 600;
    font-size: 18px;
    line-height: 130%;
    color: var(--color-main);
    margin-bottom: 8px;
    margin-top: 30px;
  }
  .actions__text {
    font-size: 16px;
    line-height: 145%;
    color: var(--gray-600);
    margin-bottom: 24px;
  }
  .aside-nav-container {
    top: calc(5rem + 10px);
    flex: 0 0 310px;
    margin-bottom: 10px;
    bottom: 10px;
    @apply sticky h-full;
  }
  .buttons {
    margin-top: 44px;
  }
  .buttons span {
    font-size: 15px;
  }
  h2 {
    font-weight: bold;
    font-size: 24px;
    color: var(--color-main);
  }
  h3 {
    font-weight: 600;
    font-size: 16px;
    color: var(--color-main);
    margin-top: 18px;
  }
  @keyframes animate {
    from {
      top: 132px;
      background: rgba(0, 0, 0, 0);
    }
    to {
      top: 87px;
      background: rgba(0, 0, 0, 0.5);
    }
  }
  .content__perspective {
    animation-name: animate;
    animation-duration: 0.3s;
    animation-timing-function: ease-out;
  }
  .initials {
    left: 35px;
  }
  @media (max-width: 1482px) {
    .settings__input {
      width: 275px;
    }
  }
  @media (max-width: 1418px) {
    .settings__content {
      padding-bottom: 48px;
    }
    .settings__input:nth-child(odd) {
      margin-right: 3.1%;
    }
    .settings__inputs {
      margin-left: 2.5%;
    }
    .settings__card {
      padding-left: 3.1%;
      padding-right: 3.1%;
    }
    .settings__input {
      width: 300px;
    }
  }

  @media (max-width: 1312px) {
    .settings__input {
      width: 275px;
    }
  }
  @media (max-width: 1300px) {
    .settings__content {
      padding: 44px;
      padding-bottom: 68px;
    }
    .actions__title {
      margin-top: 26px;
    }
    .actions__text {
      font-size: 15px;
    }
    .buttons {
      margin-top: 40px;
    }
  }

  @media (max-width: 1255px) {
    .settings__content {
      padding: 24px 44px;
      padding-bottom: 68px;
    }
    .settings__input {
      width: 300px;
    }
    .settings__inputs {
      margin-left: 40px;
    }
    .settings__card {
      padding-bottom: 24px;
      padding-left: 34px;
      padding-top: 30px;
    }
  }

  @media (max-width: 1000px) {
    .actions__title {
      margin-top: 12px;
    }
    .settings__content {
      padding-bottom: 48px;
    }
  }
  @media (max-width: 1033px) {
    .settings__input {
      width: 275px;
    }
    .settings__card {
      margin-top: 18px;
    }
    h2 {
      font-size: 22px;
    }
  }
</style>
