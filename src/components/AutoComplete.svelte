<script>
  // TODO create autocomplete wrapper, and add type choose option.
  import { onMount, createEventDispatcher } from "svelte";
  import { Autocomplete } from "../utils/autocomplete.js";
  export let data = [];
  export let api = false;
  export let className = "";
  export let inputValue = "";

  const initData = data.slice();

  const dispatch = createEventDispatcher();

  const styles = {
    AUTO_COMPLETE_LIST_ITEM_ACTIVE: "list-item-active",
    AUTO_COMPLETE_LIST_ITEM: "list-item"
  };

  let autocomplete;

  let inputElement;

  //   let resultList = data.slice(0, 5);
  let autoCompleteList;

  function hightlight(value) {
    return `<span class="highlight">${value}</span>`;
  }

  async function handleInput(e) {
    autocomplete.currFocus = -1;
    if (inputValue.length > 1) {
      if (api) {
        const res = await fetch(
          `http://localhost:8000/autocomplete?text=${inputValue}`
        );
        const json = await res.json();
        data = json.resultList;
        return;
      }
      data = data.filter((item, i) => {
        return item.substring(0, inputValue.length) === inputValue;
      });
      console.log("data", data);
    }
  }

  function handleFocus() {
    // resultList = data.slice(0, 5);
    data = data;
  }

  function handleKeydown(e) {
    console.log('e', e.key)
    autocomplete.inputKeydown(e, () => {
      closeAllLists();
      dispatch("close");
    });
  }
  function addActive(ul) {
    autocomplete.addActive(ul);
  }
  function handleMouseover(e) {
    autocomplete.autocompleteMouseOver(e);
  }
  function handleListItemClick(e) {
    inputValue = e.target.textContent;
    autocomplete.inputValue = inputValue;
    closeAllLists();
    dispatch("finish", {
      inputValue
    });
  }
  function closeAllLists() {
    console.log("close all lists");
  }
  onMount(() => {
    autocomplete = new Autocomplete(data, styles, -1);
    console.log("au", autocomplete);
    window.requestAnimationFrame(() => inputElement.focus());
  });
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
  .list {
    top: 2rem;
    left: 0;
    max-height: 320px;
    overflow-y: auto;
  }
  .list-item:hover div {
    border-bottom-color: transparent;
  }
  .city-autocomplete :global(.list-item-active) {
    background: var(--gray-200);
  }
</style>

<div class="relative rounded bg-white w-full">
  <div
    class="bg-white sticky top-0 flex pr-20 rounded border-b border-gray-200">
    <input
      tabindex="0"
      class="placeholder-input {className}"
      bind:this={inputElement}
      on:focus={handleFocus}
      on:keydown={handleKeydown}
      on:input={handleInput}
      bind:value={inputValue}
      autocomplete="off"
      type="text"
      name="autocomplete"
      placeholder="Введите город" />
    <button
      on:click={() => {
        inputValue = '';
        data = initData.slice();
      }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        class="fill-current text-gray-500"
        viewBox="0 0 24 24">
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12
          13.41 17.59 19 19 17.59 13.41 12z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </button>
  </div>
  <ul
    bind:this={autoCompleteList}
    on:mouseover={handleMouseover}
    class="city-autocomplete rounded custom-scrollbar list w-full bg-white">
    {#each data as item, i}
      <li
        data-value={i}
        on:click={handleListItemClick}
        class="w-full list-item pl-20 cursor-pointer text-black">
        <div class="border-b border-gray-200 py-12">{item}</div>
      </li>
    {/each}
  </ul>
</div>
