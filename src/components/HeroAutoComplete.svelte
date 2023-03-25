<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Portal from "./Portal.svelte";
  import { mainStore } from "../stores/global.js";
  export let data = [];
  export let api = false;
  export let className = "";

  const dispatch = createEventDispatcher();

  //   let resultList = data.slice(0, 5);
</script>

<style>
  .custom-scrollbar {
    --thumb-color: #dddfe7;
    --scroll-track: #f2f2f2;
    scrollbar-color: var(--thumb-color) var(--scroll-track);
    scrollbar-width: thin;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 5px;
    -webkit-appearance: none;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background-color: var(--scroll-track);
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #dddfe7;
  }
</style>

<div class="relative rounded bg-white w-full" />
