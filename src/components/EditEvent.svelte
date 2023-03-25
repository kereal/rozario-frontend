<script>
  import { createEventDispatcher } from "svelte"

  import ScrollableModalSurface from "./ScrollableModalSurface.svelte"
  import IconButton from "./IconButton.svelte"
  import TextInput from "./TextInput.svelte"
  import TextArea from "./TextArea.svelte"
  import CustomCheckbox from "./CustomCheckbox.svelte"
  import Select from "./Select.svelte"
  import Imask from "imask"
  import TelInputSmall from "./TelInputSmall.svelte"
  import CompactDatePicker from "../components/CompactDatePicker.svelte"

  import Edit from "./icons/Edit.svelte"
  import CalendarEvents from "./CalendarEvents.svelte"

  export let id
  export let event

  const section = {
    CALENDAR: "calendar",
    DESCRIPTION: "description"
  }

  let editBlock

  const dispatch = createEventDispatcher()

  let modalElement
  let currentEditSection = ""

  let checkboxesSelected = false

  function openEditSection(e) {
    currentEditSection = e.target.closest("button").dataset.section
  }

  function closeModal() {
    dispatch("close")
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
      event
    })
  }

  function handleSelectDate(e) {
    event.date = e.detail.value.toISOString()
  }

  function handleRemember(day) {
    checkboxesSelected = true
    event.checkboxes = {
      ...event.checkboxes,
      [day]: !event.checkboxes[day]
    }
  }

  function formatDate(date) {
    const d = new Date(date)
    const year = new Intl.DateTimeFormat("ru", { year: "numeric" }).format(d)
    const month = new Intl.DateTimeFormat("ru", { month: "2-digit" }).format(d)
    const day = new Intl.DateTimeFormat("ru", { day: "2-digit" }).format(d)

    return `${day}.${month}.${year}`
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
  title="Редактировать событие"
>
  <div class="block">
    <div class="text-value">
      {#if currentEditSection !== section.CALENDAR}
        <span class="inline">{formatDate(event.date)}</span>
        <IconButton
          data-section={section.CALENDAR}
          iconSize="15"
          size="xs"
          status="only-icon"
          icon={Edit}
          on:click={openEditSection}
          className="pen-icon ml-12"
        />
      {/if}
    </div>
    {#if currentEditSection === section.CALENDAR}
      <div class="validation">
        <label for="calendar" class="label-text">Дата</label>
      </div>
      <CompactDatePicker initDate={new Date(event.date)} on:change={handleSelectDate} />
    {/if}
  </div>
  <div class="block">
    <div class="validation margin-bottom-8">
      <label for="occasion" class="label-text font-size-13">Повод</label>
      <span class="error-text invisible occasion">Выберите повод</span>
    </div>
    <Select
      id="occasion"
      placeholder="Выберите повод"
      required={true}
      name="occasion"
      on:click={scrollDown}
      on:focus={onFocus}
      size="sm"
      bind:title={event.occasion}
      items={[
        "День Рождения",
        "Извинения",
        "Поздравления",
        'Сказать "Люблю"',
        "Годовщина",
        "Корпоратив"
      ]}
    />
  </div>
  <div class="block">
    <div class="validation margin-bottom-8">
      <label for="whom" class="label-text font-size-13">Кому</label>
      <span class="error-text invisible whom">Выберите получателя</span>
    </div>
    <Select
      id="whom"
      placeholder="Выберите получателя"
      required={true}
      name="state"
      on:click={scrollDown}
      on:focus={onFocus}
      size="sm"
      bind:title={event.whom}
      items={["Мужчине", "Женщине", "Любимой", "Детям", "Деду", "Руководителю"]}
    />
  </div>
  <div class="block">
    {#if currentEditSection !== section.DESCRIPTION}
      <label for="description" class="label-text font-size-13">Описание</label>
      <div class="text-value">
        <span class="inline">{event.description}</span>
        <IconButton
          data-section={section.DESCRIPTION}
          iconSize="15"
          size="xs"
          status="only-icon"
          icon={Edit}
          on:click={openEditSection}
          className="pen-icon ml-12 "
        />
      </div>
    {/if}
    {#if currentEditSection === section.DESCRIPTION}
      <label for="description" class="label-text margin-bottom-8"
        >Описание (необязательно)</label
      >
      <TextArea
        id="description"
        placeholder="Описание события"
        on:focus={onFocus}
        size="lg"
        bind:value={event.description}
        className="w-full text-one-five"
      />
    {/if}
  </div>
  <div class="block">
    <label for="apartment" class="label-text">Напомнить о событии за:</label>
    <div class="flex flex-row justify-between mt-12">
      <CustomCheckbox
        id="1-day"
        label="1 день"
        check={event.checkboxes[1]}
        on:click={() => handleRemember(1)}
      />
      <CustomCheckbox
        id="3-day"
        label="3 дня"
        check={event.checkboxes[3]}
        on:click={() => handleRemember(3)}
      />
      <CustomCheckbox
        id="7-day"
        label="7 дней"
        check={event.checkboxes[7]}
        on:click={() => handleRemember(7)}
      />
    </div>
  </div>
</ScrollableModalSurface>

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

  .text-value {
    @apply text-main text-one-five leading-mid flex items-end;
  }

  .custom-checkbox:checked + label::before {
    background-color: rebeccapurple;
  }
  .margin-bottom-8 {
    margin-bottom: 8px;
  }
  :global(.pen-icon) {
    @apply ml-12 fill-current text-main;
  }
  :global(.pen-icon:hover) {
    @apply text-info;
  }
  .font-size-13 {
    font-size: 13px;
  }
</style>
