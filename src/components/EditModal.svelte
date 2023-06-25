<script>
  // initDate bug: when init date is string initDate sets to new Date
  // but if click on nextDate initDate is still string
  import { onMount, createEventDispatcher } from "svelte"
  import ScrollableModalSurface from "./ScrollableModalSurface.svelte"
  import CompactDatePicker from "./CompactDatePicker.svelte"
  import IconButton from "./IconButton.svelte"
  import TextInput from "./TextInput.svelte"
  import CustomRadioButton from "./CustomRadioButton.svelte"
  import { format as fnsFormat, add } from "date-fns"
  import ru from "date-fns/locale/ru/index"
  import CustomDropdown from "./CustomDropdown.svelte"
  import TextArea from "./TextArea.svelte"
  import TelInputSmall from "./TelInputSmall.svelte"
  import { ADDRESS_GROUP } from "../data/constants"

  import LetterI from "./icons/LetterI.svelte"
  import Edit from "./icons/Edit.svelte"

  export let order

  console.log("order", order)

  const dispatch = createEventDispatcher()

  const section = {
    DATEPICKER: "datepicker",
    RECIPIENT: "recipient",
    RECIPIENT_NAME: "recipientName",
    RECIPIENT_PHONE: "recipientPhone",
    DESTINATION: "destination",
    POSTCARD: "postcard",
    CLIENT_PHONE: "clientPhone",
    COMMENT: "comment"
  }

  let {
    date,
    recipient,
    clientName,
    recipientPhone,
    clientPhone,
    destination,
    postcard,
    comment
  } = order

  let menuInfoButton
  let infoButtonNoTime
  let infoButtonNoAddress

  let exactTimeHelpVisible = false
  let noTimeHelpVisible = false
  let noAddressHelpVisible = false

  let commentTextArea
  let postcardInput
  let recipientInput
  let recipientPhoneInput
  let clientPhoneInput
  let timeInputExact
  let timeInputFrom
  let timeInputTo
  let nameInput
  let anotherPersonInput

  let timeGroup = order.date.status
  let addressGroup = order.destination.status

  let recipientGroup = order.recipient ? "anotherPerson" : "myself"

  let currentEditSection = ""

  let focused = false

  function onFocus() {
    focused = true
  }

  function closeModal() {
    exactTimeHelpVisible = false
    noTimeHelpVisible = false
    window.requestAnimationFrame(() => dispatch("close"))
  }

  function openEditSection(e) {
    currentEditSection = e.target.closest("button").dataset.section
  }
  // Do not import IMask!!!
  const timeMaskOptions = {
    mask: "HH{:}ml",
    blocks: {
      HH: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 23,
        maxLength: 2
      },
      m: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 5,
        maxLength: 1
      },
      l: {
        mask: "{\\0}"
      }
    },
    autofix: true
  }

  // const timeMaskOptions = {
  //   mask: "00:0{\\0}",
  //   autofix: true
  // }

  function handleTimeExactComplete({ detail: mask }) {
    console.log("mask val", mask.value, date.time)
    if (mask.value.length < 5) {
      return new Date()
    }
    date.time.exact = mask.value
    const [dateVal, _] = date.value.split("T")
    date.value = dateVal + "T" + mask.value
  }

  function handleTimeRangeFromComplete({ detail: mask }) {
    if (date.time.exact) {
      date.time.range = { to: "", from: "" }
    }
    if (mask.value.length < 5) {
      return new Date()
    }
    date.time.range.from = mask.value
    const [dateVal, _] = date.value.split("T")
    date.value = dateVal + "T" + mask.value
    date.time.range.to = fnsFormat(add(new Date(date.value), { hours: 2 }), "HH:mm")
  }

  /* function handleRecipientPhoneComplete({ detail: mask }) { */
  /*   order.recipentPhone = mask.value; */
  /* } */
  /* function handleClientPhoneComplete({ detail: mask }) { */
  /*   order.clientPhone = mask.value; */
  /* } */

  function setDate(e) {
    date.value = fnsFormat(e.detail.value, "yyyy-MM-dd'T'HH:mm:ss")
  }

  function save() {
    exactTimeHelpVisible = false
    noTimeHelpVisible = false
    window.requestAnimationFrame(() =>
      dispatch("save", {
        date,
        recipient,
        clientName,
        recipientPhone,
        clientPhone,
        destination,
        postcard,
        comment
      })
    )
  }

  function getDestination(destination, addressGroup) {
    if (addressGroup === ADDRESS_GROUP.NO_ADDRESS) {
      return destination.noAddress
    } else if (addressGroup === ADDRESS_GROUP.SELF_PICKUP) {
      return destination.selfPickup
    } else {
      return destination.value
    }
  }

  function toggleExactTimeHelp() {
    exactTimeHelpVisible = !exactTimeHelpVisible
  }
  function toggleNoTimeHelp() {
    noTimeHelpVisible = !noTimeHelpVisible
  }
  function toggleNoAddressHelp() {
    noAddressHelpVisible = !noAddressHelpVisible
  }

  function formatDate(date) {
    switch (date.status) {
      case "range":
        return (
          fnsFormat(new Date(date.value), "EEEEEE, d MMMM", {
            locale: ru
          }) + `, с ${date.time.range.from} до ${date.time.range.to}`
        )
      case "exact":
        return fnsFormat(new Date(date.value), "EEEEEE, d MMMM, в HH:mm", {
          locale: ru
        })
      case "notime":
        return date.notime
    }
  }

  function focusExactTimeInput() {
    setTimeout(() => timeInputExact.focus(), 16)
  }

  function focusFromTimeInput() {
    setTimeout(() => timeInputFrom.focus(), 16)
  }

  onMount(() => {
    if (recipientGroup === "myself") {
      destination.noAddress = "Уточнить у получателя"
    } else {
      destination.noAddress = "Уточнить у получателя"
    }
  })

  $: destination.status = addressGroup

  $: date.status = timeGroup

  $: if (timeGroup === "notime") {
    if (recipientGroup === "myself") {
      date.notime = "Уточнить по телефону"
    } else {
      date.notime = "Уточнить у получателя"
    }
  }

  $: if (recipientGroup === "myself") {
    destination.noAddress = "Уточнить у получателя"
  } else {
    destination.noAddress = "Уточнить у получателя"
  }

  $: if (recipientPhoneInput) {
    recipientPhoneInput.focus()
  } else if (clientPhoneInput) {
    clientPhoneInput.focus()
  } else if (postcardInput) {
    postcardInput.focus()
  } else if (commentTextArea) {
    commentTextArea.focus()
  } else if (nameInput) {
    nameInput.focus()
  } else if (anotherPersonInput) {
    anotherPersonInput.focus()
  }
</script>

<ScrollableModalSurface
  bind:focused
  button={{ status: "active", text: "Сохранить изменения", type: "submit" }}
  on:close-overlay={closeModal}
  on:close={closeModal}
  on:save={save}
  title="Редактировать данные"
>
  <div
    class="{currentEditSection === section.DATEPICKER ? 'mb-24' : 'mb-16'}
    text-one-five"
  >
    <div class="title">Дата и время доставки</div>
    <div class="text-value flex">
      <span>{formatDate(date)}</span>
      {#if currentEditSection !== section.DATEPICKER}
        <IconButton
          data-section={section.DATEPICKER}
          iconSize="15"
          size="xs"
          status="only-icon"
          icon={Edit}
          on:click={openEditSection}
          className="pen-icon"
        />
      {/if}
    </div>
    {#if currentEditSection === section.DATEPICKER}
      <div class="mt-24 datepicker-grid">
        <div class="flex justify-between">
          <CompactDatePicker initDate={new Date(date.value)} on:change={setDate} />
        </div>
        <div class="flex justify-between mt-24">
          <fieldset class="info w-full flex flex-col">
            <div class="mb-8 flex items-center">
              <div class="mr-12">
                <CustomRadioButton
                  on:click={focusExactTimeInput}
                  className="leading-mid"
                  id="editmodal-exact-time"
                  label="Точное время"
                  labelClass="text-sm"
                  bind:group={timeGroup}
                  value="exact"
                />
              </div>
              <button
                bind:this={menuInfoButton}
                on:mouseenter={toggleExactTimeHelp}
                on:mouseleave={toggleExactTimeHelp}
                class="info-button"
              >
                <LetterI iconSize="8" classNames="text-infolight fill-current" />
              </button>
              {#if exactTimeHelpVisible}
                <CustomDropdown
                  relativeElement={menuInfoButton}
                  buttonRef={menuInfoButton}
                  css="width:324px;z-index:10001"
                  bind:dropdownVisible={exactTimeHelpVisible}
                  position="RIGHT"
                >
                  <div
                    class="w-full bg-white p-18 text-gray-600 text-sm
                    leading-mid"
                  >
                    Стоимость доставки к точному времени составит
                    <span class="font-semibold text-info text-sm leading-mid">
                      250 ₽
                    </span>
                  </div>
                </CustomDropdown>
              {/if}
              {#if timeGroup === "exact"}
                <TextInput
                  label="exact-time"
                  id="exact-time"
                  bind:ref={timeInputExact}
                  on:focus={onFocus}
                  testid="editmodal-time-exact"
                  kind="tiny-masked"
                  complete={handleTimeExactComplete}
                  value={date.time.exact || ""}
                  options={timeMaskOptions}
                  className="ml-16 text-one-five leading-mid"
                />
              {/if}
            </div>
            <div class="mb-8 flex items-center">
              <CustomRadioButton
                on:click={focusFromTimeInput}
                className="inline-block leading-mid"
                label="Интервал"
                labelClass="text-sm"
                id="editmodal-interval-time"
                bind:group={timeGroup}
                value="range"
              />
              {#if timeGroup === "range"}
                <div class="ml-14 flex items-center">
                  <label class="text-sm text-gray-600 mr-6" for="editmodal-time-from">
                    с
                  </label>
                  <TextInput
                    bind:ref={timeInputFrom}
                    on:focus={onFocus}
                    testid="editmodal-time-range-from"
                    kind="tiny-masked"
                    complete={handleTimeRangeFromComplete}
                    options={timeMaskOptions}
                    value={date.time.range ? date.time.range.from : ""}
                    id="editmodal-time-from"
                    className="mr-12 text-one-five leading-mid"
                  />
                  <label class="text-sm text-gray-600 mr-6" for="editmodal-time-to">
                    до
                  </label>
                  <TextInput
                    on:focus={onFocus}
                    testid="editmodal-time-range-to"
                    kind="tiny"
                    disabled={true}
                    value={date.time.range ? date.time.range.to : "00:00"}
                    id="editmodal-time-to"
                    className="text-one-five leading-mid"
                  />
                </div>
              {/if}
            </div>
            <div class="flex items-center">
              <div class="mr-12">
                <CustomRadioButton
                  className="leading-mid"
                  labelClass="text-sm"
                  id="editmodal-no-time"
                  label={recipientGroup === "myself"
                    ? "Уточнить по телефону"
                    : "Уточнить у получателя"}
                  bind:group={timeGroup}
                  value="notime"
                />
              </div>
              <button
                bind:this={infoButtonNoTime}
                on:mouseenter={toggleNoTimeHelp}
                on:mouseleave={toggleNoTimeHelp}
                class="info-button"
              >
                <LetterI iconSize="8" classNames="text-infolight fill-current" />
              </button>
              {#if noTimeHelpVisible}
                <CustomDropdown
                  relativeElement={infoButtonNoTime}
                  buttonRef={infoButtonNoTime}
                  css="width:271px;z-index:10001"
                  bind:dropdownVisible={noTimeHelpVisible}
                  position="RIGHT"
                >
                  <div class="bg-white p-18 text-gray-600 text-sm leading-mid">
                    {#if recipientGroup === "myself"}
                      Мы заранее позвоним вам и уточним, где и в какое время вам будет
                      удобно получить заказ
                    {:else}
                      Мы сами заранее позвоним получателю и уточним, где и в какое время
                      ему будет удобно получить подарок
                    {/if}
                  </div>
                </CustomDropdown>
              {/if}
            </div>
          </fieldset>
        </div>
      </div>
    {/if}
  </div>
  <div class={currentEditSection === section.RECIPIENT ? "mb-24" : "mb-16"}>
    <div class="title">Получатель</div>
    <div class="text-value">
      {#if currentEditSection !== section.RECIPIENT}
        <span>{recipient ? recipient : "Получу Сам(а)"}</span>
        <IconButton
          data-section={section.RECIPIENT}
          iconSize="15"
          size="xs"
          status="only-icon"
          icon={Edit}
          on:click={openEditSection}
          className="pen-icon"
        />
      {/if}
      {#if currentEditSection === section.RECIPIENT}
        <fieldset class="w-full">
          <div class="mb-8">
            <CustomRadioButton
              name="recipient"
              value="myself"
              label="Получу сам(а)"
              labelClass="text-sm"
              bind:group={recipientGroup}
              id="editmodal-recipient-myself"
            />
          </div>
          <div>
            <CustomRadioButton
              name="recipient"
              label="Другой человек"
              labelClass="text-sm"
              bind:group={recipientGroup}
              value="anotherPerson"
              id="editmodal-recipient-another-person"
            />
            {#if recipientGroup === "anotherPerson"}
              <div class="pl-16">
                <TextInput
                  id="another-recipient"
                  label="another-recipient"
                  on:focus={onFocus}
                  bind:ref={anotherPersonInput}
                  testid="editmodal-recipient"
                  bind:value={recipient}
                  className="mt-8 w-full text-one-five"
                  name="recipient"
                />
              </div>
            {/if}
          </div>
        </fieldset>
      {/if}
    </div>
  </div>
  {#if recipientGroup === "myself"}
    <div class={currentEditSection === section.RECIPIENT_NAME ? "mb-24" : "mb-16"}>
      <div class="title">Ваше имя</div>
      <div class="text-value">
        {#if currentEditSection !== section.RECIPIENT_NAME && currentEditSection !== section.RECIPIENT}
          <label for="recipient-name">{clientName}</label>
          <IconButton
            data-section={section.RECIPIENT_NAME}
            iconSize="15"
            size="xs"
            status="only-icon"
            icon={Edit}
            on:click={openEditSection}
            className="pen-icon"
          />
        {/if}
        {#if currentEditSection === section.RECIPIENT_NAME || currentEditSection === section.RECIPIENT}
          <TextInput
            id="recipient-name"
            on:focus={onFocus}
            bind:ref={nameInput}
            testid="editmodal-recipient-name"
            kind="classic"
            value={clientName}
            className="block w-full text-one-five"
            type="text"
          />
        {/if}
      </div>
    </div>
  {/if}
  {#if recipientGroup === "anotherPerson"}
    <div class={currentEditSection === section.RECIPIENT_PHONE ? "mb-24" : "mb-16"}>
      <div class="title">Номер телефона получателя</div>
      <div class="text-value">
        {#if currentEditSection !== section.RECIPIENT_PHONE}
          <label for="recipent-phone">{recipientPhone}</label>
          <IconButton
            data-section={section.RECIPIENT_PHONE}
            iconSize="15"
            size="xs"
            status="only-icon"
            icon={Edit}
            on:click={openEditSection}
            className="pen-icon"
          />
        {/if}
        {#if currentEditSection === section.RECIPIENT_PHONE}
          <TelInputSmall
            id="recipient-phone"
            on:focus={onFocus}
            bind:ref={recipientPhoneInput}
            testid="editmodal-recipient-phone"
            kind="mask"
            name="recipientPhone"
            bind:value={recipientPhone}
            className="block w-full text-one-five"
          />
        {/if}
      </div>
    </div>
  {/if}
  <div class={currentEditSection === section.DESTINATION ? "mb-24" : "mb-16"}>
    <div class="title">Адрес доставки</div>
    <div class="text-value">
      {#if currentEditSection !== section.DESTINATION}
        <span>{getDestination(destination, addressGroup)}</span>
        <IconButton
          data-section={section.DESTINATION}
          iconSize="15"
          size="xs"
          status="only-icon"
          icon={Edit}
          on:click={openEditSection}
          className="pen-icon"
        />
      {/if}
    </div>
    {#if currentEditSection === section.DESTINATION}
      <div class="mb-8">
        <CustomRadioButton
          id="editmodal-address-self-pickup"
          label="Самовывоз"
          labelClass="text-sm"
          value={ADDRESS_GROUP.SELF_PICKUP}
          type="radio"
          bind:group={addressGroup}
        />
        {#if addressGroup === ADDRESS_GROUP.SELF_PICKUP}
          <div class="text-main text-one-five ml-30 mb-2">
            {destination.selfPickup}
          </div>
          <div class="text-gray-600 text-sm leading-mid ml-30">
            ежедневно с 09:00 до 21:00
          </div>
        {/if}
      </div>
      <div class="mb-8">
        <CustomRadioButton
          id="editmodal-address"
          label="По адресу"
          labelClass="text-sm"
          type="radio"
          bind:group={addressGroup}
          value={ADDRESS_GROUP.ADDRESS}
        />
        {#if addressGroup === ADDRESS_GROUP.ADDRESS}
          <TextInput
            id="address"
            label="address"
            on:focus={onFocus}
            testid="editmodal-address"
            className="block w-full mt-8 text-one-five"
            bind:value={destination.value}
            class="ml-16"
          />
        {/if}
      </div>
      <div class="flex info items-center">
        <CustomRadioButton
          id="editmodal-no-address"
          labelClass="text-sm"
          label={destination.noAddress}
          type="radio"
          bind:group={addressGroup}
          value={ADDRESS_GROUP.NO_ADDRESS}
        />
        <button
          bind:this={infoButtonNoAddress}
          on:mouseenter={toggleNoAddressHelp}
          on:mouseleave={toggleNoAddressHelp}
          class="info-button ml-12"
        >
          <LetterI iconSize="8" classNames="text-infolight fill-current" />
        </button>
        {#if noAddressHelpVisible}
          <CustomDropdown
            relativeElement={infoButtonNoAddress}
            buttonRef={infoButtonNoAddress}
            css="width:324px;z-index:10001"
            bind:dropdownVisible={noAddressHelpVisible}
            position="RIGHT"
          >
            <div class="w-full bg-white p-18 text-gray-600 text-sm leading-mid">
              {#if recipientGroup === "myself"}
                Мы заранее позвоним вам и уточним, где и в какое время вам будет удобно
                получить заказ
              {:else}
                Мы сами заранее позвоним получателю и уточним, где и в какое время ему
                будет удобно получить подарок
              {/if}
            </div>
          </CustomDropdown>
        {/if}
      </div>
    {/if}
  </div>
  <div class={currentEditSection === section.CLIENT_PHONE ? "mb-24" : "mb-16"}>
    <label for="client-phone" class="title">Ваш номер телефона</label>
    <div class="text-value">
      {#if currentEditSection !== section.CLIENT_PHONE}
        <span>{clientPhone}</span>
        <IconButton
          data-section={section.CLIENT_PHONE}
          iconSize="15"
          size="xs"
          status="only-icon"
          icon={Edit}
          on:click={openEditSection}
          className="pen-icon"
        />
      {/if}
      {#if currentEditSection === section.CLIENT_PHONE}
        <TelInputSmall
          id="client-phone"
          on:focus={onFocus}
          testid="editmodal-clients-phone"
          bind:value={clientPhone}
          className="block w-full text-one-five"
          bind:ref={clientPhoneInput}
        />
      {/if}
    </div>
  </div>
  <div class={currentEditSection === section.POSTCARD ? "mb-24" : "mb-16"}>
    <label for="postcard" class="title">Открытка</label>
    <div class="text-value flex">
      {#if currentEditSection !== section.POSTCARD}
        <span>{postcard}</span>
        <IconButton
          data-section={section.POSTCARD}
          iconSize="15"
          size="xs"
          status="only-icon"
          icon={Edit}
          on:click={openEditSection}
          className="pen-icon"
        />
      {/if}
      {#if currentEditSection === section.POSTCARD}
        <TextInput
          id="postcard"
          on:focus={onFocus}
          bind:ref={postcardInput}
          testid="editmodal-postcard"
          className="block w-full text-one-five"
          bind:value={postcard}
        />
      {/if}
    </div>
  </div>

  <div class="mb-24">
    <label for="comment" class="title">Комментарий к заказу</label>
    <div class="text-value">
      {#if currentEditSection !== section.COMMENT}
        <span>{comment}</span>
        <IconButton
          data-section={section.COMMENT}
          iconSize="15"
          size="xs"
          status="only-icon"
          icon={Edit}
          on:click={openEditSection}
          className="pen-icon"
        />
      {/if}
      {#if currentEditSection === section.COMMENT}
        <TextArea
          id="comment"
          on:focus={onFocus}
          bind:ref={commentTextArea}
          data-testid="editmodal-comment"
          bind:value={comment}
          rows="2"
          class="p-4 outline-none border rounded focus:border-infolight
          border-gray-300 w-full text-main"
        />
      {/if}
    </div>
  </div>
</ScrollableModalSurface>

<style lang="postcss">
  .title {
    @apply text-gray-600 text-xs mb-6 leading-tight;
  }
  .text-value {
    @apply text-main text-one-five leading-mid flex items-end;
  }
  .info :global(.info-button) {
    @apply w-16 h-16 border rounded-full bg-transparent border-infolight flex items-center justify-center;
  }
  .info :global(.info-button:hover) {
    @apply bg-infolight border-infolight;
  }
  .info :global(.info-button:hover svg) {
    @apply text-white;
  }
</style>
