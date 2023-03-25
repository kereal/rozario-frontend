<script>
  import PlusFat from "./icons/PlusFat.svelte";
  import Minus from "./icons/Minus.svelte";
 import { onMount } from "svelte";
  export let number;
  export let min;
  let selectedAmount = true;
  let once = true;
  function checkAmount() {
      if (number < min) {
          number = min
      }
    if (number == 9  || number ==21 || number == 15 || number == 51 || number == 101) {
      selectedAmount = false;
    } else {
      selectedAmount = true;
    }
  }
      onMount(() => {
        if (once) {
            once = false;
        }
    });
  $: if (number && !once) {
    checkAmount();
  }
</script>

<style>
  span {
    padding-top: 6px;
    padding-bottom: 8px;
  }
  button {
    fill:var(--gray-600);
  }
  button:hover {
    fill:var(--color-main);
  }
  .unactive {
    fill:var(--gray-1100);
  }
  .unactive:hover {
    fill:var(--gray-1100);
  }
  .selectedAmount {
    border-color: var(--color-info);
    color: var(--color-main);
    font-weight: 600;
  }
</style>

<div class="padding inline-flex border border-gray-300 rounded hover:border-gray-700" class:selectedAmount
     on:mouseleave= {checkAmount}>
  <div>
    {#if number == min}
      <button
              class="block h-full pl-12 unactive">
        <Minus iconSize="13" />
      </button>
    {/if}
    {#if number != min}
      <button
              class=" block h-full pl-12"
              on:click={() => {
              if (number > 1) number -= 1;

              }}>
        <Minus iconSize="13" />
      </button>
    {/if}

  </div>
  <span class="text-main leading-snug mx-12">{number}</span>
  <div>
    <button class="block h-full pr-12" on:click={() => (number += 1)}>
      <PlusFat iconSize="13" />
    </button>
  </div>
</div>
