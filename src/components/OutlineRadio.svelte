<script>
  export let label = '';
  export let name = '';
  export let group;
  export let value = '';
  export let text = '';
  export let unused = true;
  export let check = false;
  export let checkBox = false;
  export let ref = null;
  export let blocked = false;
  export let labelClass = '';
  export let id='';
  export let style = '';
  export let className = '';
</script>

<style>
  input:checked + label {
    @apply border-info text-main;
    text-shadow: 0 0 0 var(--color-main), 0 0 0 var(--color-main);
  }
  label {
    color: var(--gray-600);
    height: 35px;
    display:block;
    padding-left: 12px;
    padding-right: 12px;
    line-height: 30px;
    width: auto;
    background-color: #fff;
  }
  .unused {
    height: 35px;
    display:block;
    padding-left: 12px;
    padding-right: 12px;
    line-height: 1px;
    background: #F6F6F6;
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    color: var(--gray-700);
  }
  @media (max-width: 1300px) {
    label {
      font-size: 15px;
    }
    .unused {
      font-size: 15px;
    }
  }
  @media (max-width: 1000px) {
    label {
      font-size: 15px;
    }
    .unused {
      font-size: 15px;
    }
  }
</style>
{#if unused == true}
{#if !checkBox}
    <div class="">
      <input
              bind:group={group}
              class="visuallyhidden"
              type="radio"
              value={value}
              id={label}
              name={name}
      />
      <label
              class="cursor-pointer rounded leading-snug border
    border-gray-500 hover:text-main hover:border-gray-700"
              for={label}>
        {text}
      </label>
    </div>

{:else}
  <div class="">
    <input
            bind:this={ref}
            on:click
            bind:checked={check}
            class="visuallyhidden"
            type="checkbox"
            value={value}
            id={label}
    />
    <label
            class="cursor-pointer rounded leading-snug border
    border-gray-500 hover:text-main hover:border-gray-700"
            for={label}>
      {text}
    </label>
  </div>
{/if}
{:else}
  <button class="unused">{text}</button>
{/if}