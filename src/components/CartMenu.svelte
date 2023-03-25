<script>
  import { createEventDispatcher } from "svelte";
  import SwitchButton from "./SwitchButton.svelte";

  export let tab;

  let tabText = tab === 'other' ? 'second' : 'first';

  function switchTab() {
    if (tab === "other") {
      tab = "me";
    } else {
      tab = "other";
    }
  }

  $: tabText = tab === 'other' ? 'second' : 'first';
</script>

<style>

</style>

<div class="bg-cardbg">
  <div class="rounded-sm flex items-center text-lg">
    <SwitchButton on:first={switchTab} on:second={switchTab} firstText="Получу сам(а)" secondText="Другой человек" bind:tab={tabText} />
  </div>
</div>
