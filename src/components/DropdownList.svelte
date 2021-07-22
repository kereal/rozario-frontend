<script>
  import {createEventDispatcher} from 'svelte'
  export let css;
  export let listData;

  const dispatch = createEventDispatcher();
  
  function listItemClick(e){
    dispatch('itemClick', {
      data: listData[e.target.dataset.index]
    })
  }
</script>

<style>
  .custom-scrollbar {
    --thumb-color: #dddfe7;
    --scroll-track: #f2f2f2;
    scrollbar-color: var(--thumb-color) var(--scroll-track);
    scrollbar-width: thin;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 5px;
    -webkit-appearance: none;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background-color: var(--scroll-track);
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #dddfe7;
  }
  li:last-of-type > button {
    border:none;
  }
</style>

<div
  style={`${css};`}
  class="custom-scrollbar overflow-y-auto py-4 bg-white z-10">
  <ul class="w-full">
    {#each listData as item, i}
      <li
        class="hover:bg-gray-200 w-full pl-10 cursor-pointer
        text-black">
        <button
          data-index={i}
          class="w-full text-left border-gray-200 hover:border-b-transparent border-b
           py-3"
          on:click={listItemClick}>
          {#if typeof item === 'string'}
            {item}
          {:else}
            {item.text}
          {/if}
        </button>
      </li>
    {/each}
  </ul>
</div>
