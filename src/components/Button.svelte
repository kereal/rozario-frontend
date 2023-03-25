<script>
  export let status = "active-main"
  export let className = ""
  export let textClass = ""
  export let size = ""
  export let testid = undefined
  export let type = undefined
  export let form = undefined

  if (size) {
    switch (size) {
      case "sm":
        className += " button--sm"
        textClass += " text-one-five"
        break
      case "md":
        className += " button--md"
        textClass += " text-one-five"
        break
      case "lg":
        className += " button--lg"
        textClass += " text-base"
        break
      case "full":
        className += " button--full"
        textClass += " text-base"
        break
      case "custom":
        className += "custom font-normal"
        textClass += "text-one-five font-normal"
        break
      default:
        throw new Error("there is no such size")
    }
  }
</script>

{#if status == "active-main"}
  <button
    {form}
    data-testid={testid}
    data-back="Back"
    data-front="Front"
    on:click
    {type}
    class="hover:bg-info hover:text-white border border-transparent bg-accent
    text-main {className}"
  >
    <span class=" font-semibold {textClass}">
      <slot />
    </span>
  </button>
{:else if status == "active-secondary"}
  <button
    {form}
    on:click
    {type}
    class="hover:bg-info hover:text-white border border-transparent bg-gray-1200
    text-main {className}"
    data-testid={testid}
  >
    <span class="{textClass} ">
      <slot />
    </span>
  </button>
{:else if status == "active-transparent"}
  <button
    {form}
    on:click
    {type}
    class="hover:bg-info hover:text-white hover:border-transparent
    bg-transparent text-gray-700 border border-gray-1000 {className}"
  >
    <span class="{textClass} ">
      <slot />
    </span>
  </button>
{:else if status == "disabled-main"}
  <button
    data-testid={testid}
    class="cursor-default text-gray-700 border-transparent border bg-gray-1000 {className}"
  >
    <span class="{textClass} ">
      <slot />
    </span>
  </button>
{:else if status == "disabled-secondary"}
  <button
    data-testid={testid}
    class="cursor-default text-gray-700 bg-transparent border-gray-1100 border bg-gray-1000 {className}"
  >
    <span class="{textClass} ">
      <slot />
    </span>
  </button>
{/if}

<style lang="postcss">
  button {
    @apply text-center rounded flex justify-center items-center text-lg tracking-wide;
  }
  .custom {
    width: 160px;
  }
  .custom-text {
    font-style: 15px;
    font-weight: normal;
  }
  .gift-button {
    padding: 0 20px !important;
  }
  .mt-without-decr {
    margin-top: -12px;
  }
  .button--sm {
    height: 35px;
    padding: 0 1rem;
  }
  .button--md {
    height: 2.75rem;
    padding: 0 30px;
  }
  .button--lg {
    height: 2.875rem;
    padding: 0 34px;
  }
  .btn-present {
    text-align: center;
  }
  .mt-16-media {
    margin-top: 16px;
  }
  .button--full {
    height: 44px;
    width: 100%;
  }
  @media (max-width: 1229px) {
    .mt-without-decr {
      margin-top: 16px;
    }
  }
</style>
