<script>
  export let icon
  export let label
  export let className
</script>

<div
  role="button"
  on:click
  class="{className} circle-button cursor-pointer flex items-center"
>
  <div
    class="action-button rounded-full flex items-center justify-center
    bg-gray-300"
  >
    <svelte:component this={icon} iconSize="24" classNames="fill-current text-main" />
  </div>
  {#if label}
    <span class="ml-8 text-xs text-gray-600 leading-tight">
      {@html label}
    </span>
  {/if}
</div>

<style lang="postcss">
  .circle-button div {
    min-width: 44px;
    min-height: 44px;
  }
  .circle-button:hover > div {
    @apply bg-info;
  }
  .circle-button:hover > :global(div > svg) {
    @apply text-white;
  }
  .circle-button:hover > span {
    @apply text-main;
  }
</style>
