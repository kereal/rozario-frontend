<script>
  import CustomDropdown from "./CustomDropdown.svelte"

  export let text = []
  export let icon
  export let iconAfter
  export let iconAfterCss
  export let css = "width: 320px; max-height: 330px;"
  export let iconPos = "left"
  export let position = "LEFT"
  export let styleText = ""
  export let styleBlock = ""
  export let overSize = false
  export let styleForSecond
  export let styleMainIcon

  let button
  let iconElement
  let dropdownVisible = false

  function handleClick() {
    dropdownVisible = !dropdownVisible
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  bind:this={button}
  on:click={handleClick}
  class="cursor-pointer rounded transparent-card text-sm flex
  items-center"
  style={styleBlock}
>
  {#if iconPos === "left"}
    <div bind:this={iconElement} class="mr-6" style={styleMainIcon}>
      <img class="w-full h-full" src="/{icon}.svg" alt={icon} />
    </div>
  {/if}
  <div class="text-left">
    {#each text as line, i}
      <div class="text-left text-white leading-mid text-sm" style={styleText}>
        <span class="whitespace-nowrap" style={i == 1 ? styleForSecond : ""}>{line}</span>
      </div>
    {/each}
  </div>
  {#if iconPos === "right"}
    <div bind:this={iconElement} class=" ml-14" style={styleMainIcon}>
      <img class="w-full h-full" src="/{icon}.svg" alt={icon} />
    </div>
  {/if}
  {#if iconAfter}
    <div class="w-10 ml-14">
      <img
        class="w-full h-full"
        width="24px"
        height="24px"
        src="{iconAfter}.svg"
        alt={iconAfter}
        style={iconAfterCss}
      />
    </div>
  {/if}
</div>
{#if dropdownVisible}
  <CustomDropdown
    bind:dropdownVisible
    {css}
    buttonRef={button}
    relativeElement={iconElement}
    {overSize}
    {position}
  >
    <slot />
  </CustomDropdown>
{/if}

<style>
  .transparent-card:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
</style>
