<script>
  import CustomCheckbox from "./CustomCheckbox.svelte";
  import CustomRadioButton from "./CustomRadioButton.svelte";
  import Info from "./icons/Info.svelte";
  import TextInput from "./TextInput.svelte";
  import Select from "./Select.svelte";
  import IconButton from "./IconButton.svelte";
  import Edit from "./icons/Edit.svelte";
  import HelpButton from "./HelpButton.svelte";
  import OutlineRadio from "./OutlineRadio.svelte";
  import debounce from "lodash-es/debounce";
  import ConfirmationModal from "./ConfirmationModal.svelte";
  import { ADDRESS_GROUP } from "../data/constants.js";

  import { currTabStore } from "../stores/cart.js";
  import { cartFormStore } from "../stores/cart.js";

  export let tab;
  export let address;

  $: console.log("addresscard tab", tab);

  let streetSelect;
  let houseInput;
  let apartmentInput;
  let buildingInput;
  let intercomInput;
  let infoButtonAddress;

  let editCityVisible = false;
  const dropdown = false;
  let addressHelpVisible = false;
  let changeCityModalVisible = false;

  function validateFormInput(e) {
    const elem = document.querySelector(
      `#form-address-card .validation .${e.target.name}`
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

  function toggleAddressHelp() {
    addressHelpVisible = !addressHelpVisible;
  }

  function editCity() {
    changeCityModalVisible = true;
  }
  function cancelChangeCity() {
    changeCityModalVisible = false;
  }
  function confirmChangeCity() {
    editCityVisible = true;
    changeCityModalVisible = false;
  }

</script>

<style lang="postcss">
  .noSay {
    margin-top: 17px;
    margin-left: 25px;

  }
  .form-address-card {
    width: 468px;
  }
  .label-text {
    @apply text-gray-600 text-xs inline-block;
  }
  .text-value {
    @apply text-main text-one-five leading-mid flex items-end;
  }
  .margin-28 {
    margin-left: 28px;
  }
  .validation {
    @apply flex justify-between text-xs leading-tight;
  }
  .error-text {
    @apply text-error;
  }
  :global(.pen-icon) {
    @apply ml-12 fill-current text-main;
  }
  :global(.pen-icon:hover) {
    @apply text-info;
  }
</style>

<div id="form-address-card" class="bg-cardbg rounded form-address-card">
  <h2 class="text-main font-semibold pb-24 text-xl leading-tight">
    Адрес доставки
  </h2>
  <div class="text-one-five">
    <div class="mb-16">
      <CustomRadioButton
        labelClass="text-one-five"
        name="address-selfpickup-radio"
        value='selfPickup'
        bind:group={address.noAddress}
        label="Самовывоз" />
      {#if address.noAddress === 'selfPickup'}
        <div class="margin-28 text-sm text-gray-600 leading-mid font-sm mb-2">
          ул. Промышленная, 19, офис 310
        </div>
        <div class="margin-28 text-sm text-gray-600 leading-mid font-sm">
          ежедневно с 09:00 до 21:00a
        </div>
      {/if}
    </div>
    <div class="mb-16">
      <CustomRadioButton
        id="cart-address-address-radio"
        labelClass="text-one-five"
        name="address-radio"
        value='address'
        bind:group={address.noAddress}
        label="По адресу" />
      {#if address.noAddress === 'address'}
        <div class="mt-16 margin-28">
          <div class="mb-24">
            {#if !editCityVisible}
              <div class="validation {editCityVisible ? 'mb-8' : 'mb-6'}">
                <span class="label-text">Населённый пункт</span>
                <span class="error-text invisible city">
                  Выберите населенный пункт
                </span>
              </div>
              <div class="flex">
                <span class="mr-12 text-one-five leading-mid text-main">
                  {address.value}
                </span>
                <IconButton
                  iconSize="15"
                  size="xs"
                  status="only-icon"
                  icon={Edit}
                  on:click={editCity}
                  className="pen-icon" />
              </div>
            {:else}
              <div class="mb-24">
                <div class="validation mb-8">
                  <label for="country" class="label-text">Страна</label>
                  <span class="error-text invisible country">
                    Выберите страну
                  </span>
                </div>
                <Select
                  id="country"
                  on:select={validateFormInput}
                  required={true}
                  on:invalid={handleInvalid}
                  name="country"
                  size="sm"
                  bind:title={address.country}
                  items={['Россия', 'Белоруссия', 'Украина', 'Польша', 'Армения', 'Финляндия', 'Норвегия']} />
              </div>
              <div class="mb-24">
                <div class="validation mb-8">
                  <label for="country" class="label-text">Регион</label>
                  <span class="error-text invisible state">
                    Выберите регион
                  </span>
                </div>
                <Select
                  id="country"
                  on:select={validateFormInput}
                  required={true}
                  on:invalid={handleInvalid}
                  name="state"
                  size="sm"
                  bind:title={address.state}
                  items={['Амурская область', 'Архангельская область', 'Астраханская область', 'Белгородская область', 'Брянская область', 'Владимирская область', 'Волгоградская область', 'Вологодская область', 'Воронежская область', 'Ивановская область', 'Иркутская область', 'Калининградская область', 'Калужская область', 'Кемеровская область', 'Кировская область', 'Костромская область', 'Курганская область', 'Курская область', 'Ленинградская область']} />
              </div>
              <div class="mb-24">
                <div class="validation mb-8">
                  <label for="city" class="label-text">Населенный пункт</label>
                  <span class="error-text invisible city">
                    Выберите населенный пункт
                  </span>
                </div>
                <Select
                  id="city"
                  name="city"
                  on:select={validateFormInput}
                  required={true}
                  on:invalid={handleInvalid}
                  size="sm"
                  bind:title={address.city}
                  items={['Благовещенск', 'Архангельск', 'Астрахань', 'Белгород', 'Брянск', 'Владимир', 'Волгоград', 'Вологда', 'Воронеж', 'Иваново', 'Иркутск', 'Калининград', 'Калуга', 'Кемерово', 'Киров', 'Кострома', 'Курган', 'Курск', 'Санкт-Петербург']} />
              </div>
            {/if}
          </div>
          <div class="">
            <div class="validation mb-8">
              <label for="cart-address-street" class="label-text">Улица</label>
              <span class="error-text invisible street">Выберите улицу</span>
            </div>
            <div class="text-value">
              <Select
                id="cart-address-street"
                name="street"
                on:select={validateFormInput}
                required={true}
                on:invalid={handleInvalid}
                bind:ref={streetSelect}
                size="sm"
                className="w-full"
                bind:title={address.street}
                items={['Автогородок 16 улица', 'Автопарковый проезд', 'Адмирала флота Лобова улица', 'Академика Книповича улица', 'Академика Павлова улица', 'Александра Невского улица', 'Александра Торцева улица', 'Александрова улица', 'Алексея Генералова улица', 'Алексея Позднякова улица', 'Алексея Хлобыстова улица', 'Анатолия Бредова улица', 'АНГРЭ улица', 'Арктический переулок', 'Архангельский РКС улица', 'Аскольдовцев улица', 'Баумана улица', 'ББГЛ улица', 'Беломорский Рыбак улица', 'Береговая улица', 'Беринга улица', 'Большая ручьевая улица', 'Бондарная улица', 'Боровая улица', 'Бочкова улица', 'Брянский проезд', 'Верхне-Ростинское шоссе', 'Виктора Миронова улица', 'Вице-адмирала Николаева улица', 'Владимира Капустина проезд', 'Владимирская улица', 'Водопроводный переулок', 'Воровского улица', 'Восточно-Объездная автодорога дорога', 'Гарнизонная улица', 'Гвардейская улица', 'Генерала Журбы улица', 'Генерала Фролова улица', 'Генерала Щербакова улица', 'Георгия Седова улица', 'Героев Рыбачьего улица', 'Героев-североморцев проспект', 'Гоголя улица', 'Гончарова улица', 'Дальний переулок']} />
            </div>
          </div>
          <div class="mb-20">
            <div class="validation mb-8">
              <span class="error-text invisible house">Введите номер дома</span>
            </div>
            <div class="flex w-full justify-between">
              <div class="w-1/3">
                <label for="cart-address-house" class="label-text">
                  Дом
                </label>
                <div class="text-value">
                <TextInput
                        required={true}
                        name="house"
                        id="cart-address-house"
                        on:invalid={handleInvalid}
                        on:input={debounce(validateFormInput, 400)}
                        bind:value={address.house}
                        className="w-full"
                />
                </div>
              </div>
              <div class="w-1/3 ml-24">
                <label for="cart-address-building" class="label-text">Корпус/строение</label>
                <div class="text-value">
                  <TextInput
                          id="cart-building-porch"
                          bind:ref={buildingInput}
                          bind:value={address.building}
                          className="w-full" />
                </div>
              </div>
              <div class="w-1/3 ml-24">
                <label for="cart-address-porch" class="label-text">Подъезд</label>
                <div class="text-value">
                  <TextInput
                          id="cart-address-porch"
                          bind:ref={apartmentInput}
                          bind:value={address.porch}
                          className="w-full" />
                </div>
              </div>
            </div>
          </div>
          <div class="mb-30 flex w-full justify-between">
            <div class="w-1/3">
              <label for="cart-address-apartment" class="label-text">
                Квартира/офис
              </label>
              <div class="text-value">
                <TextInput
                  id="cart-address-apartment"
                  bind:ref={apartmentInput}
                  bind:value={address.apartment}
                  className="w-full" />
              </div>
            </div>
            <div class="w-1/3 ml-24">
              <label for="cart-address-intercom" class="label-text">
                Домофон
              </label>
              <div class="text-value">
                <TextInput
                        required={true}
                        name="house"
                        id="cart-address-intercom"
                        on:invalid={handleInvalid}
                        on:input={debounce(validateFormInput, 400)}
                        bind:value={address.intercom}
                        className="w-full"
                />
              </div>
            </div>
            <div class="w-1/3 ml-24">
              <label for="cart-address-floor" class="label-text">Этаж</label>
              <div class="text-value">
                <TextInput
                  id="cart-address-floor"
                  bind:ref={apartmentInput}
                  bind:value={address.floor}
                  className="w-full" />
              </div>
            </div>
          </div>
          <div class="mb-30">
          <CustomCheckbox  style="font-size: 15px;"
                           value="neighbors"
                           className="text-main"
                           id="neighbors"
                           label="Можно оставить букет соседям/родственникам"
                           bind:check = {address.neighbors}/>
        </div>
        </div>
      {/if}
    </div>
    <div class="flex items-center">
      {#if tab === 'me'}
        <CustomRadioButton
          value='noAddress'
          labelClass="text-one-five"
          name="noaddress-radio"
          bind:group={address.noAddress}
          label="Позвоните мне, не знаю, где буду" />
        <div class="ml-12 h-full pt-2">
          <HelpButton
            css="width: 300px;"
            position="CENTER"
            text="Мы заранее позвоним вам и уточним, где и в какое время вам
            будет удобно получить заказ" />
        </div>
      {:else if tab === 'other'}
        <CustomRadioButton
                value='noAddress'
                labelClass="text-one-five"
                name="noaddress-radio"
                bind:group={address.noAddress}
                label="Уточнить адрес и время доставки у получателя"/>
        <div class="ml-12 h-full pt-2">
          <HelpButton
                  position="CENTER"
            css="width: 300px;"
            text="Мы сами заранее позвоним получателю и уточним, где и в какое
            время ему будет удобно получить подарок"/>
        </div>
      {/if}
    </div>
    {#if address.noAddress == 'noAddress'}
    <div class="noSay">
      <CustomCheckbox  style="font-size: 14px; color: var(--gray-600);"
                       value="noSay"
                       className="text-main"
                       id="Nosay"
                       label="Не говорить по телефону, что это цветы"
                       bind:check = {address.noSay}/>
    </div>
    {/if}
  </div>
</div>

{#if changeCityModalVisible}
  <ConfirmationModal
    text="Стоимость товаров и доставки может меняться в зависимости от города."
    title="Хотите доставить в другой город?"
    cancelText="Не менять город"
    confirmText="Поменять"
    on:confirm={confirmChangeCity}
    on:close={cancelChangeCity} />
{/if}
