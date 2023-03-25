<script>
  import { createEventDispatcher } from "svelte";
  import ScrollableModalSurface from "./ScrollableModalSurface.svelte";
  import TelInputSmall from "./TelInputSmall.svelte";
  import TextInput from "./TextInput.svelte";
  import Select from "./Select.svelte";
  import CustomCheckbox from "./CustomCheckbox.svelte";
  //import { nanoid } from 'nanoid'
  import { addressStore } from "../stores/order.js";
  import debounce from "lodash/debounce";

  const dispatch = createEventDispatcher();

  let editBlock;
  let submitAddressForm;
  let telInput;

  const address = {
    country: "",
    state: "",
    city: "",
    street: "",
    house: "",
    apartment: ""
  };

  let name = "";
  let phone = "";
  let title = "";
  let isMain = false;

  let isPhoneValid;

  function closeModal() {
    dispatch("close");
  }

  let focused = false;

  function onFocus() {
    console.log("focus", focused);

    focused = true;
  }

  function scrollDown(e) {
    e.preventDefault();
    const editBlockBCR = editBlock.getBoundingClientRect();
    const selectBCR = e.detail.ref
      .closest(".custom-select")
      .getBoundingClientRect();
    if (selectBCR.top + 140 > editBlockBCR.bottom) {
      let i = 0;
      const prevTop = editBlock.scrollTop;
      const intervalId = setInterval(() => {
        editBlock.scrollTop += i;
        i += 3;
        if (prevTop + 140 <= editBlock.scrollTop) {
          clearInterval(intervalId);
        }
      }, 16);
    }
  }

  let validationSet = new Set();

  function validateFormInput(e) {
    const elem = document.querySelector(
      `#add-address-modal .block .validation .${e.target.name}`
    );
    console.log("e target", e.target.validity);
    if (!e.target.validity.valid) {
      if (e.target.classList.contains('tel-phone-sm')) {
        e.target.closest('div').classList.add("error");
      } else {
        e.target.classList.add("error");
      }
      elem.classList.remove("invisible");
      validationSet.delete(e.target.name);
      validationSet = validationSet;
    } else {
      if (e.target.classList.contains('tel-phone-sm')) {
        e.target.closest('div').classList.remove("error");
      } else {
        e.target.classList.remove("error");
      }
      elem.classList.add("invisible");
      validationSet.add(e.target.name);
      validationSet = validationSet;
    }
  }

  function checkValidity(validationSet) {
    if (validationSet.size === 8) {
      return true;
    }
    return false;
  }

  function handleAddAddress() {}

  function handleInvalid(e) {
    e.preventDefault();
    validateFormInput(e);
  }

  function onSubmit() {
    console.log("submit SUBMIT");
    if (isValid) {
      dispatch("add", {
        id: $addressStore.length + 1,
        address,
        name,
        phone,
        title,
        isMain
      });
    }
  }

  $: console.log("isPhoneValid", isPhoneValid, telInput);

  $: isValid = checkValidity(validationSet, isPhoneValid);
</script>

<style lang="postcss">
  .label-text {
    @apply text-gray-600 text-xs leading-tight;
  }
  .block {
    @apply mb-24 text-one-five;
  }
  .validation {
    @apply flex justify-between text-xs leading-tight mb-6;
  }
  .error-text {
    @apply text-error;
  }
</style>

<ScrollableModalSurface
  id="add-address-modal"
  title="Добавить адрес"
  bind:focused
  bind:editBlock
  on:close-overlay={closeModal}
  on:close={closeModal}
  on:save={handleAddAddress}
  button={{ id: 'add-address-modal-form', type: 'submit', status: isValid ? 'active' : 'disabled', text: 'Сохранить' }}>
  <form
    id="add-address-modal-form"
    bind:this={submitAddressForm}
    on:submit|preventDefault={onSubmit}>
    <div class="block">
      <div class="validation">
        <label for="title" class="label-text">Название</label>
        <span class="error-text invisible title">Введите название</span>
      </div>
      <TextInput
        id="title"
        on:invalid={handleInvalid}
        placeholder="Например, «Дом» или «Работа»"
        required={true}
        on:focus={onFocus}
        bind:value={title}
        on:input={debounce(validateFormInput, 400)}
        className="w-full text-one-five"
        name="title" />
    </div>
    <div class="block">
      <div class="validation">
        <label for="name" class="label-text">Имя получателя</label>
        <span class="error-text invisible name">Введите имя получателя</span>
      </div>
      <TextInput
        id="name"
        on:invalid={handleInvalid}
        required={true}
        on:focus={onFocus}
        bind:value={name}
        on:input={debounce(validateFormInput, 400)}
        className="w-full text-one-five"
        name="name" />
    </div>
    <div class="block">
      <div class="validation">
        <label for="recipient-phone" class="label-text">
          Номер телефона получателя
        </label>
        <span class="error-text invisible phone">Введите номер телефона</span>
      </div>
      <TelInputSmall
        className="w-full"
        id="recipient-phone"
        on:focus={onFocus}
        on:input={debounce(validateFormInput, 400)}
        bind:ref={telInput}
        required={true}
        name="phone"
        on:invalid={handleInvalid}
        bind:value={phone} />
    </div>
    <div class="block">
      <div class="validation">
        <label for="country" class="label-text">Страна</label>
        <span class="error-text invisible country">Выберите страну</span>
      </div>
      <Select
        id="country"
        on:select={validateFormInput}
        required={true}
        on:invalid={handleInvalid}
        name="country"
        on:click={scrollDown}
        on:focus={onFocus}
        size="sm"
        bind:title={address.country}
        items={['Россия', 'Белоруссия', 'Украина', 'Польша', 'Армения', 'Финляндия', 'Норвегия']} />
    </div>
    <div class="block">
      <div class="validation">
        <label for="country" class="label-text">Регион</label>
        <span class="error-text invisible state">Выберите регион</span>
      </div>
      <Select
        id="country"
        on:select={validateFormInput}
        required={true}
        on:invalid={handleInvalid}
        name="state"
        on:click={scrollDown}
        on:focus={onFocus}
        size="sm"
        bind:title={address.state}
        items={['Амурская область', 'Архангельская область', 'Астраханская область', 'Белгородская область', 'Брянская область', 'Владимирская область', 'Волгоградская область', 'Вологодская область', 'Воронежская область', 'Ивановская область', 'Иркутская область', 'Калининградская область', 'Калужская область', 'Кемеровская область', 'Кировская область', 'Костромская область', 'Курганская область', 'Курская область', 'Ленинградская область']} />
    </div>
    <div class="block">
      <div class="validation">
        <label for="city" class="label-text">Населенный пункт</label>
        <span class="error-text invisible city">Выберите населенный пункт</span>
      </div>
      <Select
        id="city"
        on:select={validateFormInput}
        required={true}
        on:invalid={handleInvalid}
        name="city"
        on:click={scrollDown}
        on:focus={onFocus}
        size="sm"
        bind:title={address.city}
        items={['Благовещенск', 'Архангельск', 'Астрахань', 'Белгород', 'Брянск', 'Владимир', 'Волгоград', 'Вологда', 'Воронеж', 'Иваново', 'Иркутск', 'Калининград', 'Калуга', 'Кемерово', 'Киров', 'Кострома', 'Курган', 'Курск', 'Санкт-Петербург']} />
    </div>
    <div class="block">
      <div class="validation">
        <label for="street" class="label-text">Улица</label>
        <span class="error-text invisible street">Выберите улицу</span>
      </div>
      <Select
        id="street"
        on:select={validateFormInput}
        required={true}
        on:invalid={handleInvalid}
        name="street"
        on:click={scrollDown}
        on:focus={onFocus}
        size="sm"
        bind:title={address.street}
        items={['Автогородок 16 улица', 'Автопарковый проезд', 'Адмирала флота Лобова улица', 'Академика Книповича улица', 'Академика Павлова улица', 'Александра Невского улица', 'Александра Торцева улица', 'Александрова улица', 'Алексея Генералова улица', 'Алексея Позднякова улица', 'Алексея Хлобыстова улица', 'Анатолия Бредова улица', 'АНГРЭ улица', 'Арктический переулок', 'Архангельский РКС улица', 'Аскольдовцев улица', 'Баумана улица', 'ББГЛ улица', 'Беломорский Рыбак улица', 'Береговая улица', 'Беринга улица', 'Большая ручьевая улица', 'Бондарная улица', 'Боровая улица', 'Бочкова улица', 'Брянский проезд', 'Верхне-Ростинское шоссе', 'Виктора Миронова улица', 'Вице-адмирала Николаева улица', 'Владимира Капустина проезд', 'Владимирская улица', 'Водопроводный переулок', 'Воровского улица', 'Восточно-Объездная автодорога дорога', 'Гарнизонная улица', 'Гвардейская улица', 'Генерала Журбы улица', 'Генерала Фролова улица', 'Генерала Щербакова улица', 'Георгия Седова улица', 'Героев Рыбачьего улица', 'Героев-североморцев проспект', 'Гоголя улица', 'Гончарова улица', 'Дальний переулок']} />
    </div>
    <div class="block">
      <div class="validation">
        <label for="house" class="label-text">Дом/строение</label>
        <span class="error-text invisible house">Введите номер дома</span>
      </div>
      <TextInput
        id="house"
        on:invalid={handleInvalid}
        on:input={debounce(validateFormInput, 400)}
        required={true}
        name="house"
        on:focus={onFocus}
        bind:value={address.house}
        className="w-full" />
    </div>
    <div class="block">
      <label for="apartment" class="label-text">Квартира/офис</label>
      <TextInput
        id="apartment"
        on:invalid={handleInvalid}
        on:focus={onFocus}
        bind:value={address.apartment}
        className="w-full text-one-five" />
    </div>
    <div class="block text-main">
      <CustomCheckbox
        textSize="sm"
        id="is-main-address"
        bind:check={isMain}
        label="Основной адрес"
        className="mr-12 leading-mid" />
    </div>
  </form>
</ScrollableModalSurface>
