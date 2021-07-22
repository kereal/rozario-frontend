<script>
  import { createEventDispatcher, getContext } from "svelte";
  import EditAddress from "./EditAddress.svelte";
  import Icon from "./Icon.svelte";
  import TextButton from "./TextButton.svelte";
  import ConfirmationModal from "./ConfirmationModal.svelte";
  import { addressStore } from "../stores/order.js";

  import Avatar from "./icons/Avatar.svelte";
  import House from "./icons/House.svelte";
  import Phone from "./icons/Phone.svelte";

  export let index;
  export let recipient;
  export let id;
  export let isMainAddress;
  export let title = "Название карточки";

  const { removeAddress } = getContext("profile");

  const dispatch = createEventDispatcher();

  let editAddressVisible = false;
  let confirmationModalVisible = false;

  function toggleEditAddress() {
    editAddressVisible = !editAddressVisible;
  }
  function toggleConfirmationModal() {
    confirmationModalVisible = !confirmationModalVisible;
  }

  function handleRemove() {
    toggleConfirmationModal();
    setTimeout(() => removeAddress(id), 600);
  }

  function saveAddress(e) {
    toggleEditAddress();
    const title = e.detail.title;
    const isMain = e.detail.isMainAddress;
    const recipient = {
      name: e.detail.name,
      address: e.detail.address,
      phone: e.detail.phone
    };
    addressStore.setAddress({ id, title, isMain, recipient }, index);
  }
</script>

<style>
  .absolute-text {
    top: 0.75rem;
    right: 1.125rem;
    @apply absolute;
  }
  .absolute-buttons {
    bottom: 1.5rem;
    right: 1.125rem;
    @apply absolute;
  }
</style>

<div class="relative rounded h-full bg-white px-24 pt-34 pb-48 shadow-card">
  {#if isMainAddress}
    <span class="absolute-text text-xs text-info leading-tight">
      Основной адрес
    </span>
  {/if}
  <div class="w-full h-full text-one-five">
    <h3 class="mb-24 text-main text-1xl font-semibold leading-snug">{title}</h3>
    <ul class="text-one-five mb-24">
      <li class="flex mb-12 leading-mid">
        <div class="mr-12 pt-4">
          <Icon
            name={Avatar}
            iconSize="15"
            classNames="fill-current text-infolight" />
        </div>
        <span class="text-main">{recipient.name}</span>
      </li>
      <li class="flex mb-12 leading-mid">
        <div class="mr-12 pt-4">
          <Icon
            name={House}
            iconSize="15"
            classNames="fill-current text-infolight" />
        </div>
        <span class="text-main">
          {Object.values(recipient.address).reduce((acc, val) => {
            if (!val) {
              return acc + '';
            }
            if (acc === '') {
              return acc + val;
            }
            return acc + ', ' + val;
          })}
        </span>
      </li>
      <li class="flex mb-12 leading-mid">
        <div class="mr-12 pt-4">
          <Icon
            name={Phone}
            iconSize="15"
            classNames="fill-current text-infolight" />
        </div>
        <span class="text-main">{recipient.phone}</span>
      </li>
    </ul>
  </div>
  <div class="absolute-buttons text-gray-700">
    <TextButton on:click={toggleEditAddress} className="text-sm leading-snug ">
      редактировать
    </TextButton>
    /
    <TextButton
      on:click={toggleConfirmationModal}
      className="text-sm leading-snug">
      удалить
    </TextButton>
  </div>
</div>

{#if editAddressVisible}
  <EditAddress
    {id}
    on:save={saveAddress}
    on:close={toggleEditAddress}
    {isMainAddress}
    {title}
    {...recipient} />
{/if}

{#if confirmationModalVisible}
  <ConfirmationModal
  cancelText="Нет"
  confirmText="Да"
    text="Вы действительно хотите удалить этот адрес?"
    on:confirm={handleRemove}
    on:close={toggleConfirmationModal} />
{/if}
