<script>
  export let status = "active-main";
  export let className = "";
  export let textClass = "";
  export let size = "lg";
  export let testid; export let href;

  if (size) {
    switch (size) {
      case "md":
        className += " a--md";
        textClass += " text-one-five";
        break;
      case "lg":
        className += " a--lg";
        textClass += " text-base";
        break;
      default:
        throw new Error("there is no such size");
    }
  }
</script>

<style>
  a {
    @apply rounded text-center inline-block text-base tracking-wide;
  }
  .a--md {
    height: 2.75rem;
    line-height: 2.75rem;
    padding: 0 30px;
  }
  .a--lg {
    height: 2.875rem;
    line-height: 2.875rem;
    padding: 0 34px;
  }
</style>

{#if status == 'active-main'}
  <a
    {href}
    data-testid={testid}
    on:click
    class="hover:bg-info hover:text-white cursor-pointer font-semibold border border-transparent bg-accent
    text-main {className}">
      <slot />
  </a>
{:else if status == 'active-secondary'}
  <a
    {href}
    on:click
    class="hover:bg-info hover:text-white cursor-pointer border border-transparent bg-gray-1000
    text-main {className}"
    data-testid={testid}>
    <span class="{textClass} ">
      <slot />
    </span>
  </a>
{:else if status == 'active-transparent'}
  <a
    {href}
    on:click
    class="hover:bg-info hover:text-white hover:border-transparent
    bg-transparent text-gray-700 border cursor-pointer border-gray-1100 {className}">
    <span class="{textClass} ">
      <slot />
    </span>
  </a>
{:else if status == 'disabled-main'}
  <a
    {href}
    data-testid={testid}
    class="cursor-default text-gray-700 border-transparent border bg-gray-1000 {className}">
    <span class="{textClass} ">
      <slot />
    </span>
  </a>
{:else if status == 'disabled-secondary'}
  <a
    {href}
    data-testid={testid}
    class="cursor-default text-gray-700 bg-transparent border-gray-1100 border {className}">
    <span class="{textClass} ">
      <slot />
    </span>
  </a>
{/if}
