<script>
  import CustomDropdown from "./CustomDropdown.svelte"
  import LetterI from "./icons/LetterI.svelte"

  export let text
  export let className
  export let css
  export let position = "RIGHT"

  let infoButton
  let helpVisible = false
  function toggleHelp() {
    helpVisible = !helpVisible
  }
</script>

<button
  bind:this={infoButton}
  on:mouseenter={toggleHelp}
  on:mouseleave={toggleHelp}
  class="info-button {className}"
>
  <LetterI iconSize="8" classNames="text-infolight fill-current" />
</button>
{#if helpVisible}
  <CustomDropdown
    relativeElement={infoButton}
    buttonRef={infoButton}
    {css}
    bind:dropdownVisible={helpVisible}
    {position}
  >
    <div class="bg-white p-18 text-gray-600 text-sm leading-mid">
      {@html text}
    </div>
  </CustomDropdown>
{/if}

<style lang="postcss">
  .info-button {
    @apply w-16 h-16 border rounded-full bg-transparent border-infolight flex items-center justify-center;
  }
  .info-button:hover {
    @apply bg-infolight border-infolight;
  }
  .info-button:hover :global(svg) {
    @apply text-white;
  }
</style>
