<script>
  import { createEventDispatcher} from 'svelte'
  export let css;
  export let listData;

  const dispatch = createEventDispatcher()
  
  function handleClick() {
    dispatch('close')
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
  li:last-of-type > a {
    border:none;
  }
</style>

<div
  style={`${css};`}
  class="custom-scrollbar overflow-y-auto rounded py-16 bg-white z-10">
  <ul class="w-full">
    {#each listData as item, i}
      <li
        class="hover:bg-gray-200 w-full pl-40 cursor-pointer
        text-black">
        <a
          href={item.path}
          on:click={handleClick}
          class="w-full block text-left border-gray-200 hover:border-b-transparent border-b
           py-12">
            {item.name}
        </a>
      </li>
    {/each}
  </ul>
</div>
