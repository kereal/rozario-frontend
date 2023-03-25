<script>
  export let id = '';
  export let ref = null;
  export let value = '';
  export let className = "";
</script>

<style>
  textarea {
    resize: none;
    padding: 7px 12px;
    margin-top: 8px;
  }
  textarea::placeholder{
      color: #cccccc
  }
</style>

<textarea
  on:focus
  {id}
  bind:this={ref}
  {...$$props}
  bind:value
  class="{className}  p-4 bg-white outline-none border rounded focus:border-infolight
  border-gray-500 w-full text-main" />
