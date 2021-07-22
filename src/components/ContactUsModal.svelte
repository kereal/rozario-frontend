<script>
  import { createEventDispatcher, getContext } from "svelte";
  import ModalSurface from "./ModalSurface.svelte";
  import CircleButton from "./CircleButton.svelte"; // label are html tagged

  import Phone from "./icons/PhoneCall.svelte";
  import Chat from "./icons/Chat.svelte";
  import Email from "./icons/Email.svelte";
  import Whatsapp from "./icons/Whatsapp.svelte";
  import Vk from "./icons/Vk.svelte";
  import Facebook from "./icons/Facebook.svelte";

  const dispatch = createEventDispatcher();

  const { toggleGetCall } = getContext("contact-us-modal");

  function closeModal() {
    dispatch("close");
  }
  function showGetCall() {
    dispatch("close");
    toggleGetCall();
  }
</script>

<style>
  .contact-us-icons {
    @apply grid grid-cols-2 grid-rows-3 row-gap-16 col-gap-48;
  }
  .contact-us-icons :global(.icon) {
    flex: 0 1 47%;
  }
</style>

<ModalSurface css="width:400px;height:353px;" on:close={closeModal}>
  <h3 class="mb-14 text-lg text-main font-semibold leading-snug">
    Связаться с нами
  </h3>
  <div class="contact-us-icons">
    <CircleButton icon={Email} label="По электронной почте" />
    <CircleButton icon={Chat} label="Написать<br/> в чат" />
    <CircleButton
      on:click={showGetCall}
      icon={Phone}
      label="Заказать<br/> звонок" />
    <CircleButton icon={Whatsapp} label="Написать<br/> в Whatsapp" />
    <CircleButton icon={Vk} label="Написать<br /> Вконтакте" />
    <CircleButton icon={Facebook} label="Написать<br/> в Facebook" />
  </div>
  <div class="mt-24 text-sm mb-8 text-gray-600 font-one-five leading-mid">
    Также вы можете связаться с нами по телефонам:
  </div>
  <div class="text-one-five leading-mid mb-4">
    <span class="text-main font-semibold">8 800 250-64-70</span>
    <span class="text-gray-600">(бесплатно по России)</span>
  </div>
  <div class="text-one-five leading-mid">
    <span class="text-main font-semibold">8 911 300-64-70</span>
    <span class="text-gray-600">(по миру)</span>
  </div>
</ModalSurface>
