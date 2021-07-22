<script>
  import { createEventDispatcher } from "svelte";
  const occasionList = [
       "Все",
    "День рождения",
    "Юбилей",
    "Поздравление",
    "Сказать люблю",
    "Извенение",
    "Бизнес-поздравление",
    "Благодарность",
    "На свадьбу",
    "Для новорожденного",
    "Траур"
  ];
  const dispatch = createEventDispatcher();

  function selectOccasion(e) {
    if (e.target.dataset.index) {
      dispatch("occasion", {
        occasion: occasionList[e.target.dataset.index]
      });
    }
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
</style>

<div
  style="max-height: 336px"
  class="custom-scrollbar overflow-y-auto py-4 bg-white z-10">
  <ul class="w-full">
    {#each occasionList as occasion, i}
      <li
        class="hover:bg-gray-200 w-full list-item pl-10 cursor-pointer
        text-black">
        <button
          data-index={i}
          class="w-full text-left hover:border-b-transparent border-b
          border-gray-200 py-3 last:border-none"
          on:click={selectOccasion}>
          {occasion}
        </button>
      </li>
    {/each}
  </ul>
</div>
