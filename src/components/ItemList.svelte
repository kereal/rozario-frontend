<script>
  import { onMount, createEventDispatcher } from "svelte";
import About from "../routes/about.svelte";
  export let css = "";

  /**
   * list item type
   * @typedef {Object} listItem
   * @property {string} text
   * @property {boolean} checked - current picked item
   */

  /**
   * @prop {Array.<listItem>} listData - should have checked and text property
   */
  export let listData = [];
  export let id;
  export let buttonRef;

  const dispatch = createEventDispatcher();

  let itemList;

  function getFocused(listData) {
    const index = listData.findIndex(item => item.checked);
    if (index === -1) {
      return 0;
    }
    return index;
  }

  let focused = getFocused(listData);

  function listItemClick() {
    focused = parseInt(this.dataset.index);
    listData = setChecked(listData);
    dispatch("click", {
      data: listData
    });
  }

  function setChecked(listData) {
    return listData.map((item, i) => {
      if (i === focused) {
        item.checked = true;
        return item;
      }
      item.checked = false;
      return item;
    });
  }

  function handleKeyDown(e) {
    e.preventDefault();
    let el = document.querySelector(`#${id} ul li[tabindex="0"]`);
    switch (e.key) {
      case "Enter":
        if (el) {
          el.click();
        }
        break;
      case "Escape":
      case "Tab":
        buttonRef.click();
        buttonRef.focus();
        break;
      case "ArrowDown":
        if (el.nextElementSibling) {
          el = el.nextElementSibling;
          setTimeout(() => el.focus(), 0);
          focused = parseInt(el.dataset.index);
        } else if (itemList.firstChild) {
          el = itemList.firstChild;
          setTimeout(() => el.focus(), 0);
          focused = parseInt(el.dataset.index);
        }
        break;
      case "ArrowUp":
        if (el.previousElementSibling) {
          el = el.previousElementSibling;
          setTimeout(() => el.focus(), 0);
          focused = parseInt(el.dataset.index);
        } else if (itemList.lastChild) {
          el = itemList.lastChild;
          setTimeout(() => el.focus(), 0);
          focused = parseInt(el.dataset.index);
        }
        break;
    }
  }

  onMount(() => {
    const el = document.querySelector(`#${id} ul li[tabindex="0"]`);
    setTimeout(() => el.focus(), 0);
  });
</script>

<style>
  .checked {
    @apply font-semibold;
  }
</style>

<div
  {id}
  style={`${css};`}
  class="custom-scrollbar overflow-y-auto rounded py-16 bg-white z-10">
  <ul bind:this={itemList} class="w-full" role="listbox" aria-label="listbox">
    {#each listData as item, i}
      <li
        on:keydown={handleKeyDown}
        role="option"
        data-index={i}
        tabindex={focused === i ? '0' : '-1'}
        on:click={listItemClick}
        class="focus:bg-gray-200 {item.checked ? 'checked' : ''} hover:bg-gray-200 w-full pl-32 cursor-pointer
        text-main">
        <div
          class="w-full text-left border-gray-200 hover:border-b-transparent
          border-b py-12 last:border-none leading-snug">
          {item.text}
        </div>
      </li>
    {/each}
  </ul>
</div>
