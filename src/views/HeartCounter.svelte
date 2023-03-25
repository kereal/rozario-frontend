<script>
  import HeartCounter from "../components/HeartCounter.svelte";
  export let count;
  export let like;
</script>

<style>
  .wrapper {
    padding: 50px;
  }
</style>

<div class="wrapper">
  <HeartCounter {...$$props} />
</div>
