<script>
  import Button from "../components/Button.svelte";
  export let status;
  export let text;
  export let size;
</script>

<style>
  .wrapper {
    width: 70%;
    padding: 2rem;
  }
</style>

<div class="wrapper">
  <Button {size} {status}>{text}</Button>
</div>
