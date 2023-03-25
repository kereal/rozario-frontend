<script>
  import IconButton from "./IconButton.svelte"
  import TelInput from "./TelInput.svelte"
  import Select from "./Select.svelte"
  import AddWorker from "./AddWorker.svelte"
  import { fade } from "svelte/transition"
  import Button from "./Button.svelte"
  import { createEventDispatcher } from "svelte"

  export let listEmployees
  export let group
  export let deleteGroup
  let indexGroupName
  let temporaryName = group.group
  let editBlock

  let modalElement

  let trueDate
  const dispatch = createEventDispatcher()

  function closeModal() {
    dispatch("close")
  }
  function closeViaOverlay(e) {
    if (modalElement && !modalElement.contains(e.target)) dispatch("close")
  }
  function saveChange() {
    group.group = temporaryName
    listEmployees = listEmployees
    dispatch("close")
  }
  function openDeleteGroup() {
    deleteGroup = true
    dispatch("close")
  }

  $: if (temporaryName) {
    indexGroupName = listEmployees.findIndex((item) => {
      return item.group == temporaryName
    })
    if (temporaryName != "" && indexGroupName == -1) {
      trueDate = true
    } else {
      trueDate = false
    }
  }
</script>

<div transition:fade on:click={closeViaOverlay} class="overlay">
  <div bind:this={modalElement} class="modal relative bg-white h-full rounded ">
    <div class="close-button">
      <IconButton on:click={closeModal} status="close" />
    </div>
    <h2>Редактирование группы</h2>
    <div>
      <h3>Название</h3>
      <input type="text" bind:value={temporaryName} />
    </div>
    <div class="saveButton flex">
      <Button
        size="lg"
        status={trueDate == false ? "disabled-main" : "active-main"}
        on:click={saveChange}>Сохранить</Button
      >
      <button
        on:click={openDeleteGroup}
        class="ml-34 text-gray-700 hover:text-info leading-snug"
      >
        Удалить группу
      </button>
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
    height: 265px;
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
  h2 {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 18px;
    color: var(--color-main);
  }
  h3 {
    font-size: 13px;
    line-height: 120%;
    color: var(--gray-600);
    margin-bottom: 8px;
  }
  input {
    background: #ffffff;
    border: 1px solid var(--gray-500);
    box-sizing: border-box;
    border-radius: 4px;
    color: var(--color-main);
    font-size: 15px;
    height: 35px;
    padding: 0 12px;
    width: 100%;
  }
  input:focus {
    background: #ffffff;
    border: 1px solid var(--color-info);
  }
  .saveButton {
    position: absolute;
    left: 24px;
    bottom: 24px;
  }
</style>
