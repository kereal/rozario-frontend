<script>
  import { setContext } from "svelte";
  import ContactUsModal from "./ContactUsModal.svelte";
  import GetCallModal from "./GetCallModal.svelte";
  import InfoPopup from "./InfoPopup.svelte";
  import Icon from "./Icon.svelte";
  import ChatStripes from "./icons/ChatStripes.svelte";

  export let navlist = [];
  export let recommendations;

  setContext("contact-us-modal", {
    toggleGetCall
  });

  let contactUsModalVisible = false;
  let infoModalVisible = false;
  let getCallVisible = false;

  function toggleGetCall() {
    getCallVisible = !getCallVisible;
  }
  function toggleContactUs() {
    contactUsModalVisible = !contactUsModalVisible;
  }
  function toggleInfoModal() {
    infoModalVisible = !infoModalVisible;
  }
</script>

<style lang="postcss">
  aside {
    width: 310px;
    height: calc(100vh - 5rem - 20px);
    @apply bg-gray-100;
  }
  .nav-item {
    height: 43px;
  }
  .icon {
    width: 40px;
    height: 40px;
    @apply bg-gray-1000 flex items-center justify-center rounded-full;
  }
  .nav-item:hover :global(span) {
    @apply text-info;
  }
  .nav-item:hover :global(div.icon > svg) {
    @apply text-white;
  }
  .nav-item:hover :global(div.icon) {
    @apply bg-info;
  }
</style>

<aside class="rounded">
  <nav class="rounded bg-gray-100">
    <ul class="rounded-t overflow-auto">
      {#each navlist as nav}
        <li
          class="{nav.active ? 'bg-accent font-semibold' : 'bg-transparent font-normal'}
          px-18 nav-item bg-transparent hover:bg-gray-1000">
          {#if nav.active}
            <h1
              class="text-main leading-tight w-full h-full flex items-center
              block">
              {nav.name}&nbsp;
              <span>{nav.info || ''}</span>
            </h1>
          {:else}
            <a
              class="text-main leading-tight w-full h-full flex items-center
              block"
              href={nav.link}>
              {nav.name}&nbsp;
              <span>{nav.info || ''}</span>
            </a>
          {/if}
        </li>
      {/each}
      <li
        tabindex="0"
        on:click={toggleContactUs}
        class="w-full cursor-pointer bg-transparent flex nav-item items-center
        mt-10 px-18">
        <div style="padding-left:1px;" class="icon">
          <Icon
            iconSize="23"
            name={ChatStripes}
            classNames="fill-current text-main" />
        </div>
        <span class="ml-10 text-main leading-snug">Связаться с нами</span>
      </li>
    </ul>
  </nav>
</aside>

{#if contactUsModalVisible}
  <ContactUsModal on:close={toggleContactUs} />
{/if}

{#if infoModalVisible}
  <InfoPopup
    on:close={toggleInfoModal}
    title="Спасибо за обращение!"
    text="Ожидайте звонка нашего специалиста." />
{/if}

{#if getCallVisible}
  <GetCallModal
    on:thanks={() => {
      toggleGetCall();
      toggleInfoModal();
    }}
    on:close={toggleGetCall} />
{/if}
