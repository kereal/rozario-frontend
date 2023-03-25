<script>
  import { createEventDispatcher } from "svelte"

  import ScrollableModalSurface from "./ScrollableModalSurface.svelte"
  import IconButton from "./IconButton.svelte"
  import TextInput from "./TextInput.svelte"
  import CustomCheckbox from "./CustomCheckbox.svelte"
  import Select from "./Select.svelte"
  import Imask from "imask"
  import TelInputSmall from "./TelInputSmall.svelte"

  import Edit from "./icons/Edit.svelte"

  export let id
  export let address
  export let name
  export let phone
  export let title
  export let isMainAddress

  let editBlock

  const dispatch = createEventDispatcher()

  const section = {
    TITLE: "title",
    NAME: "name",
    PHONE: "phone",
    COUNTRY: "country",
    STATE: "state",
    CITY: "city",
    STREET: "street",
    HOUSE: "house",
    APARTMENT: "apartment"
  }

  let modalElement

  let titleInput
  let nameInput
  let phoneInput
  let houseInput
  let apartmentInput

  let countrySelect
  let stateSelect
  let citySelect
  let streetSelect

  let currentEditSection = ""

  const datePickerVisible = false
  const recipientEditVisible = false

  const recipientValue = ""
  const timeValue = ""

  function closeModal() {
    dispatch("close")
  }

  function openEditSection(e) {
    currentEditSection = e.target.closest("button").dataset.section
  }

  const phoneMaskOptions = {
    mask: "+{0} 000 000-00-00"
  }

  function scrollDown(e) {
    currentEditSection = ""
    const editBlockBCR = editBlock.getBoundingClientRect()
    const selectBCR = e.detail.ref.getBoundingClientRect()
    if (selectBCR.top + 140 > editBlockBCR.bottom) {
      let i = 0
      const prevTop = editBlock.scrollTop
      const intervalId = setInterval(() => {
        editBlock.scrollTop += i
        i += 3
        if (prevTop + 140 <= editBlock.scrollTop) {
          clearInterval(intervalId)
        }
      }, 16)
    }
  }

  let focused = false

  function onFocus() {
    console.log("focus", focused)
    focused = true
  }

  function save() {
    dispatch("save", {
      address,
      phone,
      title,
      isMainAddress,
      name
    })
  }

  $: if (titleInput) {
    titleInput.focus()
  } else if (nameInput) {
    nameInput.focus()
  } else if (phoneInput) {
    phoneInput.focus()
  } else if (houseInput) {
    houseInput.focus()
  } else if (apartmentInput) {
    apartmentInput.focus()
  }
</script>

<ScrollableModalSurface
  bind:focused
  on:close={closeModal}
  on:save={save}
  on:close-overlay={closeModal}
  bind:editBlock
  buttonType="active"
  button={{ text: "Сохранить изменения", status: "active", type: "button" }}
  title="Редактировать адрес"
>
  <div class={currentEditSection === section.TITLE ? "mb-24" : "mb-16"}>
    <label fof="title" class="title">Название</label>
    <div class="text-value">
      {#if currentEditSection !== section.TITLE}
        <span>{title}</span>
        <IconButton
          data-section={section.TITLE}
          iconSize="15"
          size="xs"
          status="only-icon"
          icon={Edit}
          on:click={openEditSection}
          className="pen-icon"
        />
      {/if}
    </div>
    {#if currentEditSection === section.TITLE}
      <TextInput
        id="title"
        on:focus={onFocus}
        bind:ref={titleInput}
        bind:value={title}
        className="w-full text-one-five"
        name="title"
      />
    {/if}
  </div>
  <div class={currentEditSection === section.NAME ? "mb-24" : "mb-16"}>
    <label for={section.NAME} class="title">Имя получателя</label>
    <div class="text-value">
      {#if currentEditSection !== section.NAME}
        <span class="inline">{name}</span>
        <IconButton
          data-section={section.NAME}
          iconSize="15"
          size="xs"
          status="only-icon"
          icon={Edit}
          on:click={openEditSection}
          className="pen-icon"
        />
      {/if}
      {#if currentEditSection === section.NAME}
        <TextInput
          id={section.NAME}
          on:focus={onFocus}
          bind:ref={nameInput}
          bind:value={name}
          className="block w-full"
        />
      {/if}
    </div>
  </div>
  <div class={currentEditSection === section.PHONE ? "mb-24" : "mb-16"}>
    <label for={section.PHONE} class="title">Номер телефона получателя</label>
    <div class="text-value">
      {#if currentEditSection !== section.PHONE}
        <span>{phone}</span>
        <IconButton
          data-section={section.PHONE}
          iconSize="15"
          size="xs"
          status="only-icon"
          icon={Edit}
          on:click={openEditSection}
          className="pen-icon"
          class="ml-12"
        />
      {/if}
      {#if currentEditSection === section.PHONE}
        <TelInputSmall
          id={section.PHONE}
          on:focus={onFocus}
          bind:ref={phoneInput}
          bind:value={phone}
          className="block w-full"
        />
      {/if}
    </div>
  </div>
  <div class="mb-18">
    <label for={section.COUNTRY} class="title">Страна</label>
    <div class="text-value">
      <Select
        id={section.COUNTRY}
        on:focus={onFocus}
        bind:ref={countrySelect}
        on:click={scrollDown}
        className="w-full"
        size="sm"
        bind:title={address.country}
        items={[
          "Россия",
          "Белоруссия",
          "Украина",
          "Польша",
          "Армения",
          "Финляндия",
          "Норвегия"
        ]}
      />
    </div>
  </div>
  <div class="mb-18">
    <label for={section.STATE} class="title">Регион</label>
    <div class="text-value">
      <Select
        id={section.STATE}
        on:focus={onFocus}
        on:click={scrollDown}
        bind:ref={stateSelect}
        className="w-full"
        size="sm"
        bind:title={address.state}
        items={[
          "Амурская область",
          "Архангельская область",
          "Астраханская область",
          "Белгородская область",
          "Брянская область",
          "Владимирская область",
          "Волгоградская область",
          "Вологодская область",
          "Воронежская область",
          "Ивановская область",
          "Иркутская область",
          "Калининградская область",
          "Калужская область",
          "Кемеровская область",
          "Кировская область",
          "Костромская область",
          "Курганская область",
          "Курская область",
          "Ленинградская область"
        ]}
      />
    </div>
  </div>
  <div class={currentEditSection === section.CITY ? "mb-24" : "mb-16"}>
    <div class="title">Населенный пункт</div>
    <div class="text-value">
      <Select
        on:focus={onFocus}
        on:click={scrollDown}
        bind:ref={citySelect}
        className="w-full"
        size="sm"
        bind:title={address.city}
        items={[
          "Благовещенск",
          "Архангельск",
          "Астрахань",
          "Белгород",
          "Брянск",
          "Владимир",
          "Волгоград",
          "Вологда",
          "Воронеж",
          "Иваново",
          "Иркутск",
          "Калининград",
          "Калуга",
          "Кемерово",
          "Киров",
          "Кострома",
          "Курган",
          "Курск",
          "Санкт-Петербург"
        ]}
      />
    </div>
  </div>
  <div class="mb-18">
    <label for={section.STREET} class="title">Улица</label>
    <div class="text-value">
      <Select
        id={section.STREET}
        on:focus={onFocus}
        on:click={scrollDown}
        bind:ref={streetSelect}
        className="w-full"
        size="sm"
        bind:title={address.street}
        items={[
          "Автогородок 16 улица",
          "Автопарковый проезд",
          "Адмирала флота Лобова улица",
          "Академика Книповича улица",
          "Академика Павлова улица",
          "Александра Невского улица",
          "Александра Торцева улица",
          "Александрова улица",
          "Алексея Генералова улица",
          "Алексея Позднякова улица",
          "Алексея Хлобыстова улица",
          "Анатолия Бредова улица",
          "АНГРЭ улица",
          "Арктический переулок",
          "Архангельский РКС улица",
          "Аскольдовцев улица",
          "Баумана улица",
          "ББГЛ улица",
          "Беломорский Рыбак улица",
          "Береговая улица",
          "Беринга улица",
          "Большая ручьевая улица",
          "Бондарная улица",
          "Боровая улица",
          "Бочкова улица",
          "Брянский проезд",
          "Верхне-Ростинское шоссе",
          "Виктора Миронова улица",
          "Вице-адмирала Николаева улица",
          "Владимира Капустина проезд",
          "Владимирская улица",
          "Водопроводный переулок",
          "Воровского улица",
          "Восточно-Объездная автодорога дорога",
          "Гарнизонная улица",
          "Гвардейская улица",
          "Генерала Журбы улица",
          "Генерала Фролова улица",
          "Генерала Щербакова улица",
          "Георгия Седова улица",
          "Героев Рыбачьего улица",
          "Героев-североморцев проспект",
          "Гоголя улица",
          "Гончарова улица",
          "Дальний переулок"
        ]}
      />
    </div>
  </div>
  <div class={currentEditSection === section.HOUSE ? "mb-24" : "mb-16"}>
    <label for={section.HOUSE} class="title">Дом/строение</label>
    <div class="text-value">
      {#if currentEditSection !== section.HOUSE}
        <span>{address.house}</span>
        <IconButton
          data-section={section.HOUSE}
          iconSize="15"
          size="xs"
          status="only-icon"
          icon={Edit}
          on:click={openEditSection}
          className="pen-icon"
        />
      {/if}
      {#if currentEditSection === section.HOUSE}
        <TextInput
          id={section.HOUSE}
          on:focus={onFocus}
          bind:ref={houseInput}
          bind:value={address.house}
          className="w-full"
        />
      {/if}
    </div>
  </div>
  <div class={currentEditSection === section.APARTMENT ? "mb-24" : "mb-16"}>
    <label for={section.APARTMENT} class="title">Квартира/офис</label>
    <div class="text-value">
      {#if currentEditSection !== section.APARTMENT}
        <span>{address.apartment}</span>
        <IconButton
          data-section={section.APARTMENT}
          iconSize="15"
          size="xs"
          status="only-icon"
          icon={Edit}
          on:click={openEditSection}
          className="pen-icon"
        />
      {/if}
      {#if currentEditSection === section.APARTMENT}
        <TextInput
          id={section.APARTMENT}
          on:focus={onFocus}
          bind:ref={apartmentInput}
          bind:value={address.apartment}
          className="w-full"
        />
      {/if}
    </div>
  </div>
  <div class="mb-24 text-value">
    <CustomCheckbox
      textSize="sm"
      id="is-main-address"
      bind:check={isMainAddress}
      label="Основной адрес"
      className="mr-12"
    />
  </div>
</ScrollableModalSurface>

<style lang="postcss">
  .title {
    @apply text-gray-600 text-xs mb-4;
  }
  .text-value {
    @apply text-main text-one-five leading-mid flex items-end;
  }
  :global(.pen-icon) {
    @apply ml-12 fill-current text-main;
  }
  :global(.pen-icon:hover) {
    @apply text-info;
  }
</style>
