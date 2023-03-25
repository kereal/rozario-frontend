<script>
  import ShowcaseTableElement from "./ShowcaseTableElement.svelte"

  export let products
  export let onePrice = false
</script>

<div class="table">
  <div class="table__header flex items-center">
    <div class="ml-48 mr-96">Наименование</div>
    <div>{onePrice ? "Цена" : "Цена за шт."}</div>
  </div>
  <div class="table__body">
    {#each products as product}
      <ShowcaseTableElement bind:product bind:onePrice />
    {/each}
  </div>
</div>

<style lang="postcss">
  .table {
    width: 100%;
    background: var(--color-light);
    border-radius: 4px;
    border: 1px solid var(--gray-500);
    @apply px-24;
  }
  .table__header {
    border-bottom: 1px solid var(--gray-500);
    box-sizing: border-box;
    border-radius: 4px 4px 0 0;
    font-size: 16px;
    line-height: 130%;
    color: var(--gray-700);
    height: 53px;
    margin: 0 -24px 0 -24px;
  }
</style>
