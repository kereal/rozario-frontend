<script>
  import { createEventDispatcher } from "svelte";
  export let rating;
  export let name;
  export let kind;
  export let val;
  export let className;

  const dispatch = createEventDispatcher();

  const ratingList = [
    { score: 5, text: "Отлично" },
    { score: 4, text: "Хорошо" },
    { score: 3, text: "Удовлетворительно" },
    { score: 2, text: "Плохо" },
    { score: 1, text: "Ужасно" }
  ];

  let checked;
  let value;

  function handleClick(e) {
    if (e.target.tagName === "INPUT") {
      if (checked && value && value === e.target.value) {
        e.target.checked = false;
        value = undefined;
        checked = undefined;
        dispatch("checked", {
          checked: false
        });
        return;
      }
      checked = e.target.checked;
      value = e.target.value;
      dispatch("checked", {
        checked: true
      });
    }
  }
</script>

<style>
  label:not(:first-of-type) {
    @apply mr-8;
  }
  .rating svg {
    color: var(--gray-1100);
  }
  .rating-non-changable svg {
    color: var(--gray-1100);
  }
  .rating > input:checked ~ label svg, /* show gold star when clicked */
    .rating:not(:checked) > label:hover svg, /* hover current star */
    .rating:not(:checked) > label:hover ~ label svg {
    cursor: pointer;
    color: var(--color-accent);
  } /* hover previous stars in list */

  .rating-non-changable > input:checked ~ label svg /* show gold star when clicked */
 {
    color: var(--color-accent);
  } /* hover previous stars in list */

  .rating > input:checked + label:hover svg, /* hover current star when changing rating */
    .rating > input:checked ~ label:hover svg,
    .rating > label:hover ~ input:checked ~ label svg, /* lighten current selection */
    .rating > input:checked ~ label:hover svg ~ label svg {
    cursor: pointer;
    color: var(--color-accent);
  }
</style>

{#if kind === 'static'}
  <div class="{className} rating-non-changable inline-flex flex-row-reverse">
    {#each ratingList as ratingItem, i}
      <input
        class="hidden"
        type="radio"
        id="{name}-second-star{ratingItem.score}"
        bind:group={val}
        {name}
        value={ratingItem.score} />
      <label
        on:click|preventDefault={() => ''}
        class=""
        for="{name}-second-star{ratingItem.score}"
        title={ratingItem.text}>
        <svg
          class="fill-current"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.99941 0L10.4724 5.26728L16 6.11154L11.9991 10.2109L12.9442
            16L7.99941 13.2655L3.05577 16L3.99971 10.2109L0 6.11154L5.52642
            5.26728L7.99941 0Z" />
        </svg>
      </label>
    {/each}
  </div>
{:else}
  <div
    on:click={handleClick}
    class="{className} rating inline-flex flex-row-reverse">
    {#each ratingList as ratingItem, i}
      <input
        bind:group={rating}
        class="hidden"
        type="radio"
        id="{name}-second-star{ratingItem.score}"
        {name}
        value={ratingItem.score} />
      <label
        class=""
        for="{name}-second-star{ratingItem.score}"
        title={ratingItem.text}>
        <svg
          class="fill-current"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.99941 0L10.4724 5.26728L16 6.11154L11.9991 10.2109L12.9442
            16L7.99941 13.2655L3.05577 16L3.99971 10.2109L0 6.11154L5.52642
            5.26728L7.99941 0Z" />
        </svg>
      </label>
    {/each}
  </div>
{/if}
