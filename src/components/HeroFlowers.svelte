<script>
  import { createEventDispatcher } from "svelte";
  const flowerList = [
    "все",
    "монобукеты",
    "микс",
    "с розами",
    "с герберами",
    "с лилиями",
    "с хризантемами",
    "с орхидеями",
    "с альстромериями",
    "с гортензиями",
    "с ирисами",
    "с гвоздиками",
    "с каллами",
    "с лизиантусами",
    "с пионами",
    "с ромашками",
    "с экзотическими цветами",
    "с подсолнухами",
    "с тюльпанами"
  ];

  const dispatch = createEventDispatcher();

  function selectFlower(e) {
    dispatch("flower", {
      flower: flowerList[e.target.dataset.index]
    });
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

<div style="max-height: 336px" class="custom-scrollbar overflow-y-auto py-4 bg-white z-10">
  <ul class="w-full">
    {#each flowerList as flower, i}
      <li
        class="hover:bg-gray-200 w-full list-item pl-10 cursor-pointer
        text-black">
        <button
          on:click={selectFlower}
          data-index={i}
          class="text-left w-full border-b border-gray-200 py-3">
          {flower}
        </button>
      </li>
    {/each}
  </ul>
</div>
