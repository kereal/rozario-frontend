<script>
  import Loader from "./icons/Loader.svelte"
  export let ref
  export let id
  export let value = ""
  export let state = "disabled"
  export let placeholder = ""
  export let className = ""

  let buttonStyle = ""
  let buttonLoader = false
  let buttonText = ""

  let STATE = {
    DISABLED: "disabled",
    ACTIVE: "active",
    LOADING: "loading",
    DONE: "done"
  }

  $: if (state === STATE.DISABLED) {
    buttonStyle = "bg-gray-300 text-gray-700"
    buttonText = "Применить"
    buttonLoader = false
  } else if (state === STATE.ACTIVE) {
    buttonStyle = "bg-accent text-main"
    buttonText = "Применить"
    buttonLoader = false
  } else if (state === STATE.LOADING) {
    buttonStyle = "bg-info text-white"
    buttonText = ""
    buttonLoader = true
  } else if (state === STATE.DONE) {
    buttonStyle = "bg-info text-white"
    buttonText = "Код применён"
    buttonLoader = false
  }
</script>

<div class="rounded flex items-center wrapper {className}">
  {#if state !== STATE.DONE}
    <input
      bind:this={ref}
      on:input
      on:input={({ target }) => {
        value = target.value
      }}
      {id}
      {value}
      {placeholder}
      on:invalid
      on:focus
      on:blur
      on:focusout
      class="input h-full rounded-l border-t border-l border-b border-gray-500"
      type="text"
    />
    <button
      type="button"
      on:click
      class="hover:bg-info hover:border-info hover:text-white {buttonStyle}
      h-full flex items-center text-one-five justify-center rounded-r"
    >
      {#if buttonText}
        {buttonText}
      {:else if buttonLoader}
        <Loader
          width="29"
          height="29"
          classNames="fill-current mx-auto text-white spin"
        />
      {/if}
    </button>
  {:else if state === STATE.DONE}
    <input
      bind:this={ref}
      {id}
      {value}
      {placeholder}
      disabled={true}
      on:invalid
      on:focus
      on:blur
      on:focusout
      class="input h-full rounded-l border-t border-l border-b border-gray-500"
      type="text"
    />
    <button
      type="button"
      class="hover:bg-info hover:border-info hover:text-white text-one-five {buttonStyle}
      h-full flex items-center justify-center rounded-r"
    >
      {buttonText}
    </button>
  {/if}
</div>

<style lang="postcss">
  .wrapper {
    height: 44px;
  }
  input {
    @apply outline-none;
  }
  input::placeholder {
    @apply text-gray-700 text-one-five;
  }
  .input:required {
    @apply border-gray-300;
  }
  .input:invalid {
    @apply border-gray-300 outline-none shadow-none;
  }
  .input {
    @apply px-12 py-8 text-main;
  }
  .input.error {
    @apply border-error;
  }
  .input:focus {
    @apply border-infolight;
  }
  input:disabled {
    @apply h-full rounded-l border-t border-l border-b border-gray-500 bg-white;
  }
  button {
    width: 144px;
  }
  button :global(svg.spin) {
    animation-name: spin;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
