<script>
  import { createEventDispatcher, onMount } from "svelte";
  import Portal from "./Portal.svelte";
  import SearchComplete from "./SearchComplete.svelte";
  import { fly } from "svelte/transition";

  export let buttonRef;

  const focus = true;

  const dispatch = createEventDispatcher();

  let searchElement;

  function closeSearch(e) {
    if (buttonRef && buttonRef.contains(e.target)) {
      return;
    }
    if (searchElement && !searchElement.contains(e.target)) {
      dispatch("close");
    }
  }
  onMount(() => {
    searchElement.style.top = 250 + "px";
  });
</script>

<style>
  .search {
    background-color: rgba(230, 230, 230, 0.9);
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 20px 30px 4px rgba(0, 0, 0, 0.5);
  }
</style>

<svelte:body on:click={closeSearch} />

<Portal>
  <div
    bind:this={searchElement}
    transition:fly={{ y: 100, duration: 600 }}
    class="search rounded fixed z-30 w-6/12 xxl:w-6/12 border border-gray-300">
    <SearchComplete
      on:close={closeSearch}
      {focus}
      name="search"
      placeholder="Название, букет или цветы">
      <img
        slot="icon"
        width="18"
        height="18"
        src="search.svg"
        alt="search"
        class="mr-8" />
    </SearchComplete>
  </div>
</Portal>
