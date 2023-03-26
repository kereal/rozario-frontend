<script>
  import ChatStripes from "./icons/ChatStripes.svelte"

  import CustomDropdown from "./CustomDropdown.svelte"
  import ItemList from "./ItemList.svelte"
  import Close from "./icons/Close.svelte"
  import IconButton from "./IconButton.svelte"

  export let listData
  export let text
  export let type
  export let hover
  export let currentFilter = null

  let dropdownVisible = false
  let dropdownButton
  let dropdownIcon
  let textElement

  function toggleDropdown() {
    dropdownVisible = !dropdownVisible
  }

  function removeFilter() {
    currentFilter = null
  }

  function selectFilter(e) {
    if (e.detail.data.text === "Все") {
      currentFilter = null
    } else {
      currentFilter = e.detail.data.find((filter) => filter.checked)
    }
    toggleDropdown()
  }
</script>

<div class="flex items-end leading-snug">
  <button
    bind:this={dropdownButton}
    on:click={toggleDropdown}
    class:hover
    class="h-full flex items-center leading-snug text-main"
  >
    <span
      bind:this={textElement}
      class="{currentFilter ? 'font-semibold' : ''}  mr-8 whitespace-nowrap leading-snug"
      >{currentFilter ? currentFilter.text : text}</span
    >
    {#if !currentFilter}
      <svg
        class:rotated={dropdownVisible}
        bind:this={dropdownIcon}
        xmlns="http://www.w3.org/2000/svg"
        width="10px"
        height="5px"
        viewBox="0 0 23.179 13.002"
      >
        <polyline
          fill="none"
          stroke="#330033"
          stroke-width="2"
          stroke-miterlimit="10"
          points="22.472,0.707 11.589,11.588 0.707,0.707 "
        />
      </svg>
    {/if}
  </button>
  {#if currentFilter}
    <IconButton
      on:click={removeFilter}
      className="pb-2"
      size="xxs"
      status="only-icon"
      icon={Close}
      iconSize="9"
      iconStyle="stroke-current text-main"
    />
  {/if}
</div>
{#if currentFilter}
  {#if dropdownVisible}
    <CustomDropdown
      bind:dropdownVisible
      relativeElement={textElement}
      buttonRef={dropdownButton}
      css="width:320px; max-height:336px;"
      position="CENTER"
    >
      <ItemList
        id={`catalog-${type}`}
        css="max-height: 310px;"
        on:click={selectFilter}
        {listData}
      />
    </CustomDropdown>
  {/if}
{:else if dropdownVisible}
  <CustomDropdown
    bind:dropdownVisible
    relativeElement={dropdownIcon}
    buttonRef={dropdownButton}
    css="width:320px; max-height:336px;"
    position="CENTER"
  >
    <ItemList
      id={`catalog-${type}`}
      css="max-height: 310px;"
      on:click={selectFilter}
      {listData}
    />
  </CustomDropdown>
{/if}

<style>
  svg {
    transition: transform 0.2s linear;
  }
  .rotated {
    transform: rotate(-180deg);
    transform-origin: center;
  }
  .hover {
  }
  .hover:hover {
    color: var(--color-info) !important;
  }
  .hover:hover polyline {
    stroke: var(--color-info) !important;
  }
</style>
