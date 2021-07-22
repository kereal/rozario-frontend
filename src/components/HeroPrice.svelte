<script>
  import { createEventDispatcher } from "svelte";
  const priceRangeList = [
    { from: "", to: "2000" },
    { from: "2000", to: "4000" },
    { from: "4000", to: "5000" },
    { from: "5000", to: "9000" },
    { from: "9000", to: "14000" },
    { from: "14000", to: "" }
  ];

  const dispatch = createEventDispatcher();

  function selectPrice(e) {
    let priceText = "";
    const range = priceRangeList[e.target.dataset.index];
    if (!range.from && range.to) {
      priceText = `До ${range.to}`;
    } else if (!range.to && range.from) {
      priceText = `От ${range.from}`;
    } else {
      priceText = `${range.to}-${range.from}`;
    }
    dispatch("price", {
      priceRange: {
        from: range.from,
        to: range.to,
        text: priceText
      }
    });
  }
</script>

<style>

</style>

<div style="max-height: 336px" class="overflow-y-auto py-4 bg-white z-10">
  <ul class="w-full">
    {#each priceRangeList as range, i}
      <li
        class="hover:bg-gray-200 w-full list-item pl-10 cursor-pointer
        text-black">
        <button
          on:click={selectPrice}
          data-index={i}
          class="text-left w-full hover:border-b-transparent border-b border-gray-200 py-3
          last:border-none">
          {#if range.from.length === 0}
            До {range.to}
          {:else if range.to.length === 0}
            От {range.from}
          {:else}{range.from}-{range.to}{/if}
        </button>
      </li>
    {/each}
  </ul>
</div>
