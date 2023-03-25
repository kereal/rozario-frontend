<script>
  // TODO make mask kind to handle accept and complete events
  import { imask } from "svelte-imask"
  export let kind = "classic"
  export let type = "text"
  export let className = ""
  export let name = ""
  export let ref = null
  export let id = ""
  export let style = ""
  export let value = ""
  export let options = null
  export let testid = ""
  export let placeholder = ""
  export let label = ""
  export let disabled = null
  export let size = "md"

  export let pattern = undefined
  export let required = undefined
  export let min = undefined
  export let max = undefined
  export let minlength = undefined
  export let maxlength = undefined
  export let novalidate = undefined

  export let accept = null
  export let complete = null
</script>

{#if kind === "classic" || kind === "tiny"}
  {#if label}
    <label for={id} class="visuallyhidden" />
  {/if}
  <input
    bind:this={ref}
    on:input
    on:input={({ target }) => {
      value = target.value
    }}
    on:invalid
    on:focus
    on:blur
    on:focusout
    on:click
    {disabled}
    {novalidate}
    {minlength}
    {maxlength}
    {pattern}
    {required}
    {placeholder}
    {value}
    {id}
    {name}
    {style}
    {min}
    {max}
    data-testid={testid}
    class="{kind === 'classic' ? `input input-height-${size}` : 'input-tiny'} {className}"
    {type}
  />
{:else if kind === "mask" || kind === "tiny-masked"}
  {#if label}
    <label for={id} class="visuallyhidden" />
  {/if}
  <input
    use:imask={options}
    on:accept={accept}
    on:complete={complete}
    bind:this={ref}
    on:input
    {placeholder}
    on:invalid
    on:click
    on:focus
    on:blur
    on:focusout
    {minlength}
    {maxlength}
    {min}
    {max}
    {required}
    {pattern}
    {value}
    {id}
    {name}
    {style}
    data-testid={testid}
    class="{kind === 'mask' ? `input input-height-${size}` : 'input-tiny'} {className}"
    {type}
  />
{/if}

<style lang="postcss">
  input {
    @apply outline-none;
  }
  input::placeholder {
    @apply text-gray-700 text-one-five;
  }
  .input:required {
    @apply border-gray-500;
  }
  .input:invalid {
    @apply border-gray-500 outline-none shadow-none;
  }
  .input:disabled {
    @apply border-none bg-transparent;
  }
  .input {
    @apply bg-white border border-gray-500 rounded px-12 py-8 text-main;
  }
  .input-height-md {
    height: 35px;
  }
  .input-height-lg {
    height: 44px;
  }
  .input.error {
    @apply border-error;
  }
  .input:focus {
    @apply border-infolight;
  }
  .input-tiny {
    width: 53px;
    height: 27px;
    padding-top: 3px;
    @apply border border-gray-500 rounded px-6 pb-4 text-main;
  }
  .input-tiny:focus {
    @apply border-infolight;
  }
  .input-tiny:disabled {
    @apply border-none bg-transparent;
  }
</style>
