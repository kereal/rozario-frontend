<script>
  import { createEventDispatcher } from "svelte"
  import ScrollableModalSurface from "./ScrollableModalSurface.svelte"
  import CustomCheckbox from "./CustomCheckbox.svelte"
  import TextInput from "./TextInput.svelte"
  import TextArea from "./TextArea.svelte"
  import Select from "./Select.svelte"
  import { eventsStore } from "../stores/events.js"
  import CompactDatePicker from "./CompactDatePicker.svelte"

  const dispatch = createEventDispatcher()

  const today = new Date()

  let editBlock
  let submitEventForm
  let telInput

  const event = {
    date: new Date(),
    occasion: "",
    whom: "",
    description: "",
    checkboxes: {
      1: false,
      3: false,
      7: false
    }
  }

  let checkboxesSelected = false

  function closeModal() {
    dispatch("close")
  }

  let focused = false

  function onFocus() {
    focused = true
  }

  function scrollDown(e) {
    e.preventDefault()
    const editBlockBCR = editBlock.getBoundingClientRect()
    const selectBCR = e.detail.ref.closest(".custom-select").getBoundingClientRect()
    if (selectBCR.top + 161 > editBlockBCR.bottom) {
      let i = 0
      const prevTop = editBlock.scrollTop
      const intervalId = setInterval(() => {
        editBlock.scrollTop += i
        i += 3
        if (prevTop + 120 <= editBlock.scrollTop) {
          clearInterval(intervalId)
        }
      }, 16)
    }
  }

  let validationSet = new Set()

  function validateFormInput(e) {
    const elem = document.querySelector(
      `#add-event-modal-form .block .validation .${e.target.name}`
    )

    if (!e.target.validity.valid) {
      if (e.target.classList.contains("tel-phone-sm")) {
        e.target.closest("div").classList.add("error")
      } else {
        e.target.classList.add("error")
      }
      elem.classList.remove("invisible")
      validationSet.delete(e.target.name)
      validationSet = validationSet
    } else {
      if (e.target.classList.contains("tel-phone-sm")) {
        e.target.closest("div").classList.remove("error")
      } else {
        e.target.classList.remove("error")
      }
      elem.classList.add("invisible")
      validationSet.add(e.target.name)
      validationSet = validationSet
    }
  }

  function checkValidity(validationSet, event) {
    return validationSet.size === 2 && !!event.date
  }

  function handleAddAddress() {
    checkboxesSelected = true
  }

  function handleInvalid(e) {
    e.preventDefault()
    validateFormInput(e)
  }

  function handleSelectDate(e) {
    event.date = e.detail.value.toISOString()
  }

  function onSubmit() {
    if (isValid) {
      dispatch("add", {
        id: $eventsStore.length + 1,
        event
      })
    }
  }

  function handleRemember(day) {
    checkboxesSelected = true
    event.checkboxes = {
      ...event.checkboxes,
      [day]: !event.checkboxes[day]
    }
  }

  $: isValid = checkValidity(validationSet, event)
</script>

<ScrollableModalSurface
  id="add-event-modal"
  title="Добавить событие"
  bind:focused
  bind:editBlock
  on:close-overlay={closeModal}
  on:close={closeModal}
  on:save={handleAddAddress}
  button={{
    id: "add-event-modal-form",
    type: "submit",
    status: isValid ? "active" : "disabled",
    text: "Сохранить"
  }}
>
  <div class="block">
    <div class="validation">
      <label for="calendar" class="label-text">Выберите дату</label>
    </div>
    <CompactDatePicker initDate={new Date(event.date)} on:change={handleSelectDate} />
  </div>
  <form
    id="add-event-modal-form"
    bind:this={submitEventForm}
    on:submit|preventDefault={onSubmit}
  >
    <div class="block">
      <div class="validation">
        <label for="occasion" class="label-text">Повод</label>
        <span class="error-text invisible occasion">Выберите повод</span>
      </div>
      <Select
        id="occasion"
        on:select={validateFormInput}
        placeholder="Выберите повод"
        required={true}
        on:invalid={handleInvalid}
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
      <div class="validation">
        <label for="whom" class="label-text">Кому</label>
        <span class="error-text invisible whom">Выберите получателя</span>
      </div>
      <Select
        id="whom"
        on:select={validateFormInput}
        required={true}
        on:invalid={handleInvalid}
        name="whom"
        on:click={scrollDown}
        on:focus={onFocus}
        size="sm"
        placeholder="Выберите получателя"
        bind:title={event.whom}
        items={["Мужчине", "Женщине", "Любимой", "Детям", "Деду", "Руководителю"]}
      />
    </div>
    <div class="block">
      <label for="description" class="label-text">Описание (необязательно)</label>
      <TextArea
        id="description"
        on:invalid={handleInvalid}
        placeholder="Описание события"
        on:focus={onFocus}
        size="lg"
        bind:value={event.description}
        className="w-full text-one-five"
      />
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
  </form>
</ScrollableModalSurface>

<style lang="postcss">
  .label-text {
    @apply text-gray-600 leading-tight;
    font-size: 13px;
  }

  .block {
    @apply mb-24 text-one-five;
  }

  .validation {
    @apply flex justify-between text-xs leading-tight mb-8;
  }

  .error-text {
    @apply text-error;
    font-size: 13px;
  }

  .custom-checkbox:checked + label::before {
    background-color: rebeccapurple;
  }
</style>
