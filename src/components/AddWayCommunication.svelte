<script>
  import Button from "./Button.svelte"
  import IconButton from "./IconButton.svelte"
  import { fade } from "svelte/transition"
  import { createEventDispatcher } from "svelte"
  import TextInput from "./TextInput.svelte"
  import TelInput from "./TelInput.svelte"
  import debounce from "lodash-es/debounce"
  import cloneDeep from "lodash/cloneDeep"

  export let contacts

  let values = cloneDeep(contacts)

  const dispatch = createEventDispatcher()

  function closeViaOverlay(e) {
    if (modalElement && !modalElement.contains(e.target)) dispatch("close")
  }

  function closeModal() {
    dispatch("close")
  }

  let modalElement

  function handleInvalid(e) {
    e.preventDefault()
    validateFormInput(e)
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
  function saveContacts() {
    contacts = values
    closeModal()
  }
</script>

<div transition:fade on:click={closeViaOverlay} class="overlay">
  <div bind:this={modalElement} class="modal relative bg-white h-full rounded ">
    <div class="close-button">
      <IconButton on:click={closeModal} status="close" />
    </div>
    <h2>Редактировать контакты</h2>
    <div class="content custom-scrollbar">
      <div class="validation inputs">
        {#each values as contact}
          {#if contact.type == "text"}
            <label for="dataShop_email" class="label-text mt-24">
              {contact.name}
            </label>
            <div class="inputs">
              <TextInput
                required={true}
                name={contact.id}
                id={contact.id}
                bind:value={contact.value}
                placeholder={contact.placeholder}
                className="w-full"
              />
            </div>
          {/if}
          {#if contact.type == "phone"}
            <label for="dataShop_phone" class="label-text mt-24">
              {contact.name}
            </label>
            <TelInput
              on:invalid={handleInvalid}
              name={contact.id}
              id={contact.id}
              className="w-full "
              required={true}
              on:input={debounce(validateFormInput, 400)}
              bind:value={contact.value}
            />
          {/if}
        {/each}
      </div>
    </div>
    <div class="saveButton flex items-center">
      <Button size="lg" on:click={saveContacts}>Сохранить</Button>
    </div>
  </div>
</div>

<style lang="postcss">
  .overlay {
    z-index: 1000;
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
  .modal {
    width: 400px;
    height: 555px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @apply rounded;
    background: #ffffff;
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    z-index: 999999;
    font-size: 15px;
    line-height: 135%;
    color: var(--color-main);
    overflow: hidden;
    padding: 24px;
  }
  .close-button {
    top: 14px;
    right: 14px;
    @apply absolute;
    z-index: 11;
  }
  .label-text {
    @apply text-gray-600 inline-block;
    margin-bottom: 8px;
    font-size: 13px;
  }
  h2 {
    font-weight: 600;
    font-size: 18px;
    color: var(--color-main);
  }
  .content {
    height: 530px;
    overflow-y: scroll;
    margin-right: -24px;
    padding-right: 24px;
    padding-bottom: 145px;
  }
  .saveButton {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 130px;
    width: 100%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 18.23%,
      #ffffff 41.15%,
      rgba(255, 255, 255, 0.994792) 99.99%
    );
    border-radius: 3px;
    padding: 53px 0 0 24px;
  }
</style>
