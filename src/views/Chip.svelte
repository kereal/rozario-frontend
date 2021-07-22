<script>
  import Chip from "../components/Chip.svelte";
  export let name;
</script>

<style>
  .wrapper {
    padding: 50px;
  }
</style>

<div class="wrapper">
  <Chip {...$$props} />
</div>
