<script>
  //   import { createEventDispatcher } from "svelte";
  export let src;
  export let alt;
  export let text = "";
  export let borderL = false;
  export let borderR = false;
  export let id = "";

  function handleKeydown(e) {
    if (e.key === "Enter") {
      e.target.click();
    }
  }
</script>

<style>
  .image-box {
    width: 24px;
    height: 24px;
  }
</style>

<div
  on:keydown={handleKeydown}
  on:click
  data-heroinputbutton={true}
  {id}
  tabindex="0"
  class="focus:bg-gray-100 cursor-pointer flex items-center justify-between
  h-full px-16 {borderL ? 'border-l border-gray-500' : ''}
  {borderR ? 'border-r border-gray-500' : ''}">
  <div data-heroinputbutton={true} class="image-box">
    <img data-heroinputbutton={true} class="w-full h-full" {src} {alt} />
  </div>
  {#if text}
    <span
      data-heroinputbutton={true}
      class="hidden xl:inline lg:max-w-8 xl:max-w-10 overflow-hidden
      text-black truncate ml-8">
      {text}
    </span>
  {/if}
</div>
