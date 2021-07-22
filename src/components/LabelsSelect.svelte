<script>
  export let labellist = [];
  export let selected = "Другие";
  export let size = "big";

  let buttonElement;

  let visible = false;

  function selectLabel(e) {

  }
</script>

<style>
  li {
    min-height: 35px;
    height: 34px;
  }
  ul {
    top: 35px;
    left: 0;
    @apply absolute;
  }
  .visible {
    display: block;
  }
  .big {
    width: 133px;
    height: 35px;
  }
  .small {
    width: 102px;
    height: 35px;
  }
  input:checked + label {
    @apply bg-gray-600;
  }
  button {
    font-size: 15px;
  }
</style>

<svelte:body
  on:click={e => {
    if (buttonElement.contains(e.target)) {
      return;
    }
    visible = false;
  }} />

<div class="{size} rounded relative inline-block">
  <button
    bind:this={buttonElement}
    class="text-gray-700 rounded border hover:border-info h-full border-gray-300
    w-full flex items-baseline justify-between px-12"
    on:click={() => {
      visible = !visible;
    }}
    type="button">
    <span class="mr-5 mt-4">{selected}</span>
    <svg
      class="stroke-current text-gray-700"
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1L6 6L11 1"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </svg>
  </button>
  <ul class="hidden border border-gray-300 w-full" class:visible>
    {#each labellist as item}
      <li class="w-full hover:bg-gray-200 bg-white text-main ">
        <input
          id={item.label}
          bind:group={item.group}
          class="visuallyhidden"
          type="radio" />
        <label
          on:click={selectLabel}
          class="px-12 h-full cursor-pointer w-full inline-flex items-center"
          for={item.label}>
          {item.label}
        </label>
      </li>
    {/each}
  </ul>
</div>
