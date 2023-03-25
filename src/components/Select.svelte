<script>
  import { createEventDispatcher } from "svelte"
  import { fly, fade } from "svelte/transition"

  export let title
  export let items
  export let size = "md"
  export let selected = false
  export let ref
  export let className = ""
  export let placeholder = ""
  export let name
  export let required
  export let id

  const dispatch = createEventDispatcher()

  let valid = true

  let hidden = true
  let active = false

  let itemList
  let selectElement
  let selectedValue = ""
  let hiddenSelectElement

  function toggleSelect() {
    active = !active
    hidden = !hidden
    dispatch("click", {
      ref
    })
    if (!hidden && itemList.firstChild) {
      console.log("itemlist", itemList.firstChild)
      setTimeout(() => itemList.firstChild.focus(), 0)
      itemList.firstChild.tabIndex = 0
      console.log(hidden, active)
    } else if (hidden) {
      const currentFocused = document.querySelector('.custom-select li[tabindex="0"]')
      if (currentFocused) {
        currentFocused.tabIndex = -1
      }
    }
  }

  var selectEvent = new Event("select")

  function handleSelect(e) {
    console.log("sdfasdfasdfsdfdsafdfsadf")
    selected = true
    title = e.target.innerText
    selectedValue = e.target.dataset.value
    hiddenSelectElement.selectedIndex = selectedValue
    console.log("selected index", hiddenSelectElement.selectedIndex)
    hiddenSelectElement.dispatchEvent(selectEvent)
    toggleSelect()
  }
  function handleBodyClick(e) {
    if (selectElement.contains(e.target)) {
      return
    }
    if (active) {
      toggleSelect()
    }
  }

  const list = document.querySelector(".custom-select > ul > li")

  function focusListItem() {}
  // a11y; make focusable on arrowkeydown and keyup
  function handleKeyDown(e) {
    switch (e.key) {
      case "Enter":
        e.target.click()
        break
      case "Escape":
        if (active) {
          active = false
          hidden = true
        }
        break
    }
  }

  function listKeyDown(e) {
    e.preventDefault()
    let currentFocused

    switch (e.key) {
      case "Enter":
        e.target.click()
        setTimeout(() => selectElement.focus(), 0)
        break
      case "Escape":
        if (active) {
          active = false
          hidden = true
        }
        break
      case "Tab":
        if (active) {
          active = false
          hidden = true
        }
        break
      case "ArrowDown":
        currentFocused = document.querySelector('.custom-select li[tabindex="0"]')
        if (currentFocused.nextElementSibling) {
          currentFocused.tabIndex = -1
          currentFocused = currentFocused.nextElementSibling
          setTimeout(() => currentFocused.focus(), 0)
          currentFocused.tabIndex = 0
        } else if (itemList.firstChild) {
          currentFocused.tabIndex = -1
          currentFocused = itemList.firstChild
          setTimeout(() => currentFocused.focus(), 0)
          currentFocused.tabIndex = 0
        }
        break
      case "ArrowUp":
        currentFocused = document.querySelector('.custom-select li[tabindex="0"]')
        if (currentFocused.previousElementSibling) {
          currentFocused.tabIndex = -1
          currentFocused = currentFocused.previousElementSibling
          setTimeout(() => currentFocused.focus(), 0)
          currentFocused.tabIndex = 0
        } else if (itemList.lastChild) {
          currentFocused.tabIndex = -1
          currentFocused = itemList.lastChild
          setTimeout(() => currentFocused.focus(), 0)
          currentFocused.tabIndex = 0
        }
    }
  }

  // $: if (required) {
  //   console.log('required', required)
  //   if (title.length < 1) {
  //     valid = false;
  //     dispatch("valid", {
  //       valid,
  //       ref
  //     });
  //   } else if (title.length > 0) {
  //     valid = true;
  //     dispatch("valid", {
  //       valid,
  //       ref
  //     });
  //   }
  // }
</script>

<svelte:body on:click={handleBodyClick} />

<div
  data-name={name}
  bind:this={ref}
  class="custom-select custom-select--{size}
  {className}"
>
  <select
    {id}
    tabindex="-1"
    bind:this={hiddenSelectElement}
    on:select
    on:invalid
    {name}
    {required}
    class="visuallyhidden"
  >
    <option value="" selected disabled hidden>{title}</option>
    {#each items as item, i}
      <option value={i + 1}>{item}</option>
    {/each}
  </select>
  <div
    on:focus
    aria-haspopup="listbox"
    tabindex="0"
    bind:this={selectElement}
    on:mouseleave
    on:mouseenter
    on:click={toggleSelect}
    on:keydown={handleKeyDown}
    class:active
    class="{valid ? 'border-gray-500' : 'border-error'} bg-white w-full
    selected h-full flex cursor-pointer items-center justify-between {hidden
      ? 'border rounded text-main'
      : 'text-gray-700 border-t border-r border-l rounded-t'}
    leading-tight"
  >
    {#if !title && placeholder}
      <span class="text-gray-500">{placeholder}</span>
    {/if}
    <span>{title}</span>
    <svg
      class="stroke-current text-gray-700"
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L6 6L11 1"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
  {#if !hidden}
    <ul
      bind:this={itemList}
      role="listbox"
      on:mouseenter
      on:mouseleave
      class:hidden
      class="custom-scrollbar items"
      in:fly={{ y: -5, duration: 500 }}
      out:fade={{ duration: 200 }}
    >
      {#each items as item, i}
        <li
          on:keydown={listKeyDown}
          tabindex="-1"
          on:click={handleSelect}
          data-value={i + 1}
          class="flex cursor-pointer items-center item h-full text-main item--{size}"
        >
          {item}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="postcss">
  .custom-select {
    @apply relative;
  }
  .custom-select div.selected:focus {
    @apply border border-gray-1100 outline-none;
  }
  .custom-select--sm {
    height: 35px;
  }
  .custom-select--md {
    height: 44px;
  }
  select.error ~ .selected {
    @apply border-error;
  }
  .selected {
    padding: 0 12px;
  }
  .selected:hover svg {
    @apply text-main;
  }
  .active svg {
    transform-origin: 50%;
    transform: rotate(180deg);
  }
  /* Style items (options): */
  .items {
    top: 100%;
    max-height: 140px;
    @apply bg-white overflow-y-auto rounded-b border border-gray-500 left-0 right-0 z-30 absolute;
  }
  .item {
    padding: 0 18px;
  }
  .item--sm {
    height: 35px;
  }
  .item--md {
    height: 44px;
  }
  li:focus {
    @apply bg-gray-200 outline-none shadow-none;
  }
  .item:hover,
  .same-as-selected {
    @apply bg-gray-200;
  }
</style>
