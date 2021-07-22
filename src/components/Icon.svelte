<script>
  export let classNames = '';
  export let iconSize = '';
  export let height = '';
  export let width = '';
  export let name = '';
  export let style = '';
</script>

{#if typeof name === 'string' && name.length > 0}
  <svg xmlns="http://www.w3.org/2000/svg" width={iconSize ? iconSize : width} height={iconSize ? iconSize : height} {style} class={classNames}>
    <use xlink:href="#{name}" />
  </svg>
{:else if name && typeof name === 'function' || typeof name === 'object'}
  <svelte:component this={name} {iconSize} {width} {height} {classNames} />
{:else}
  <div />
{/if}
