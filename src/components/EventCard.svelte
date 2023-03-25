<script>
  import { createEventDispatcher, getContext, onMount } from "svelte"
  import EditEvent from "./EditEvent.svelte"
  import TextButton from "./TextButton.svelte"
  // import Popup from "./Popup.svelte";
  import ConfirmationModal from "./ConfirmationModal.svelte"
  import Button from "./Button.svelte"

  import { eventsStore } from "../stores/events.js"

  export let index
  export let event
  export let id
  export let isComing
  let removeEventButton

  const today = new Date()

  const { removeEvent } = getContext("events")

  const dispatch = createEventDispatcher()

  let editEventVisible = false
  let confirmationModalVisible = false
  let isLessThenWeek = false

  function toggleEditEvent() {
    editEventVisible = !editEventVisible
  }

  function toggleConfirmationModal() {
    confirmationModalVisible = !confirmationModalVisible
  }

  function handleRemove() {
    toggleConfirmationModal()
    setTimeout(() => removeEvent(id), 600)
  }

  function saveEvent(e) {
    toggleEditEvent()
    eventsStore.setEvent({ id, ...e.detail.event }, index)
  }

  function formatDate(date) {
    const d = new Date(date)
    const year = new Intl.DateTimeFormat("ru", { year: "numeric" }).format(d)
    const month = new Intl.DateTimeFormat("ru", { month: "2-digit" }).format(d)
    const day = new Intl.DateTimeFormat("ru", { day: "2-digit" }).format(d)

    return `${day}.${month}.${year}`
  }

  function formatReminderText(days) {
    switch (days) {
      case 0: {
        return "сегодня"
      }
      case 1: {
        return "1 день"
      }
      case 2:
      case 3:
      case 4: {
        return `${days} дня`
      }
      case 5:
      case 6:
      case 7: {
        return `${days} дней`
      }
    }
    return ""
  }

  function sendGift() {}

  $: daysTillToday = Math.round((new Date(event.date) - today) / 86400000)
</script>

<div
  class="relative h-full wrapper {isComing &&
    index !== 0 &&
    'border-top-clr border-t'} {isComing
    ? 'pb-18'
    : `rounded border border-gray-300 px-24 py-14 ${
        daysTillToday <= 7 ? 'bg-white' : 'bg-gray-200'
      }`} "
>
  <div class="text-one-five flex flex-row {isComing ? 'pt-18' : ''}">
    <div class="flex flex-col date-col ">
      <span class="text-gray-600">
        {formatDate(event.date)}
      </span>
      {#if daysTillToday <= 7}
        <span class="text-info font-semibold pt-4">
          • {formatReminderText(daysTillToday)}
        </span>
      {/if}
    </div>
    <div class="flex flex-col flex-1 {isComing ? '' : 'text-card'}">
      <span class="text-main font-{isComing ? 'semibold' : 'bold'} mr-12">
        {event.occasion}
      </span>
      <span class="text-gray-700 mr-12 pt-4 {isComing ? '' : 'p-card-event'}">
        {event.description}
      </span>
    </div>
  </div>
  {#if isComing}
    <div class="margin-left">
      <Button
        className="{!!event.description
          ? 'mt-16-media'
          : 'mt-without-decr'} gift-button block button--md "
        withMarginLeft={true}
        on:click={sendGift}
        size="md"
        status="active-main"
      >
        Подобрать подарок
      </Button>
    </div>
  {/if}
  {#if !isComing}
    <div class="flex absolute-buttons text-gray-700 px-0 py-0 mt-10">
      <TextButton on:click={toggleEditEvent} className="text-sm leading-snug ">
        редактировать
      </TextButton>
      &nbsp;/&nbsp;
      <TextButton on:click={toggleConfirmationModal} className="text-sm leading-snug">
        удалить
      </TextButton>
    </div>
  {/if}
</div>

{#if editEventVisible}
  <EditEvent {id} on:save={saveEvent} on:close={toggleEditEvent} {event} />
{/if}

{#if confirmationModalVisible}
  <ConfirmationModal
    cancelText="Нет"
    confirmText="Да"
    text="Вы действительно хотите удалить это событие?"
    on:confirm={handleRemove}
    on:close={toggleConfirmationModal}
  />
{/if}

<style lang="postcss">
  .absolute-buttons {
    bottom: 14px;
    right: 24px;
    @apply absolute;
  }

  .p-card-event {
    font-size: 14px;
    margin-bottom: 25px;
  }

  .text-card {
    margin: 0 0 0 7%;
  }

  .btn-present {
    border: 1px solid black;
    width: 100%;
  }

  @media (max-width: 1500px) {
    .text-card {
      margin: 0 0 0 7%;
    }
  }

  @media (min-width: 1150px) {
    .wrapper button {
      margin-left: 120px !important;
    }
  }

  @media (min-width: 1230px) {
    .margin-left {
      margin-left: 110px !important;
    }
  }

  .date-col {
    width: 95px;
    margin-right: 15px;
  }
</style>
