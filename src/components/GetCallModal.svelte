<script>
  import { createEventDispatcher } from "svelte";
  import ModalSurface from "./ModalSurface.svelte";
  import IconButton from "./IconButton.svelte";
  import TelInput from "./TelInput.svelte";
  import Button from "./Button.svelte";

  import Edit from "./icons/Edit.svelte";

  export let phone;

  const dispatch = createEventDispatcher();

  let recipientPhoneInput;
  let phoneEditVisible = false;


  function closeModal() {
    dispatch("close");
  }
  function getCall() {
    dispatch("thanks");
  }
</script>

<style>

</style>

<ModalSurface on:close={closeModal} css="width: 400px;height: 177px;">
  <span class="text-gray-600 mb-8 text-ssm leading-tight">Номер телефона</span>
  <TelInput
    bind:value={phone}
    className="block w-full text-one-five"
    type="tel" />
  <Button on:click={getCall} className="mt-24" status="active-main" size="lg">
    Заказать звонок
  </Button>
</ModalSurface>
