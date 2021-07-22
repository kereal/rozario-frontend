<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { Autocomplete } from "../utils/autocomplete.js";

  export let placeholder;
  export let css;
  export let name;
  export let focus;

  const dispatch = createEventDispatcher();

  const styles = {
    AUTO_COMPLETE_LIST_ITEM_ACTIVE: "autocomplete-list-item-active",
    AUTO_COMPLETE_LIST_ITEM: "autocomplete-list-item"
  };

  let inputElement;
  let autocompleteElement;
  let autocomplete;
  const initData = [
    "hello",
    "asdf",
    "asdfasdf",
    "asdfsdf",
    "asdfeefef",
    "fdsfefefef",
    "asdfefef",
    "asdfascvvd",
    " asdfasdf"
  ];
  let data = [""];
  let inputValue = "";
  let currentFocus = -1;

  let completeValuesVisible = false;

  function inputFocus() {
    if (inputValue.length > 0) {
      openAutoComplete();
    }
  }

  function inputBlur() {}

  function inputKeydown(e) {
    autocomplete.inputKeydown(e, () => {
      closeAllLists();
      dispatch("close");
    });
  }
  function addActive(ul) {
    autocomplete.addActive(ul);
  }
  function closeAllLists() {
    completeValuesVisible = false;
  }

  function openAutoComplete() {
    const frameID = window.requestAnimationFrame(() =>
      document.addEventListener("click", hideAutoComplete)
    );
    completeValuesVisible = true;
    function hideAutoComplete(e) {
      if (
        inputElement &&
        completeValuesVisible &&
        !inputElement.contains(e.target) &&
        !inputElement.contains(e.target)
      ) {
        completeValuesVisible = false;
        window.cancelAnimationFrame(frameID);
        document.removeEventListener("click", hideAutoComplete);
      }
    }
  }

  async function inputOnInput(e) {
    currentFocus = -1;
    if (inputValue.length > 1) {
      data = initData;
      data = data.filter((item, i) => {
        return (
          item.toLocaleLowerCase().substring(0, inputValue.length) ===
          inputValue.toLocaleLowerCase()
        );
      });
      if (data.length > 0) openAutoComplete();
    }
  }
  function autocompleteMouseOver(e) {
    autocomplete.autocompleteMouseOver(e);
  }
  function autocompleteItemClick(e) {
    e.preventDefault();
    const closest = e.target.closest(`.${styles.AUTO_COMPLETE_LIST_ITEM}`);
    inputValue = closest.innerText;
    data = data.filter((item, i) => {
      return (
        item.title.toLocaleLowerCase().substring(0, inputValue.length) ===
        inputValue.toLocaleLowerCase()
      );
    });
  }

  onMount(() => {
    autocomplete = new Autocomplete(data, styles, -1);
    if (focus) {
      window.requestAnimationFrame(() => inputElement.focus());
    }
  });
</script>

<style>
  .autocomplete {
    top: 3.5rem;
    left: 0;
  }
  .autocomplete :global(.autocomplete-list-item-active) {
    background: rgba(0, 0, 0, 0.25);
  }
</style>

<div
  style="background-color: rgba(246,246,246,0.8);"
  class="flex items-center h-56 px-32 rounded w-full">
  <slot name="icon">icon</slot>
  <slot name="text" />
  <input
    on:focus={inputFocus}
    on:keydown={inputKeydown}
    on:blur={inputBlur}
    on:input={inputOnInput}
    bind:value={inputValue}
    bind:this={inputElement}
    autocomplete="off"
    {placeholder}
    style={css}
    class="px-16 outline-none text-lg bg-transparent placeholder-input py-4
    w-full h-full rounded"
    type="text"
    {name} />
  {#if completeValuesVisible}
    <ul
      style="width: calc(100%);background-color: rgba(246,246,246,0.8);"
      on:mouseover={autocompleteMouseOver}
      bind:this={autocompleteElement}
      class="autocomplete border-t-2 border-gray-300 absolute rounded-b
      shadow-card overflow-y-auto custom-scrollbar">
      {#each data as item, i}
        <li
          on:click={autocompleteItemClick}
          data-value={i}
          data-street={item.street}
          data-number={item.number}
          class="hover:bg-faded py-4 text-lg w-full autocomplete-list-item pl-40
          cursor-pointer text-black">
          <div class="py-4 last:border-none">
            <span>{item}</span>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>
