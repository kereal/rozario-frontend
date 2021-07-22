<script>
  import { createEventDispatcher } from 'svelte'
  export let tab;
  export let firstText;
  export let secondText;

  const dispatch = createEventDispatcher()

  function firstClick() {
    dispatch('first')
  }

  function secondClick() {
    dispatch('second')
  }

</script>

<style lang="postcss">
  button {
    height: 46px;
  }
  .active {
    @apply px-34 font-semibold bg-accent text-main border-accent;
  }
  .border-left {
    @apply border-l border-t border-b rounded-l;
  }
  .border-right {
    @apply border-r border-t border-b rounded-r;
  }
  button:hover {
    @apply bg-info text-white border-info;
  }
  .disabled {
    @apply px-34 font-semibold text-gray-600 border-gray-1100;
  }
</style>

<button
  type="button"
  class={tab === 'first' ? 'active border-left' : 'disabled border-left'}
  on:click={firstClick}>
  {firstText}
</button>
<button
  type="button"
  class={tab === 'second' ? 'active border-right' : 'disabled border-right'}
  on:click={secondClick}>
  {secondText}
</button>
