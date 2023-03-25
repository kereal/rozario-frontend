<script>
  import Select from "../components/Select.svelte";
  export let title;
  export let items;
</script>

<style>
  .wrapper {
    width: 70%;
    padding: 2rem;
    margin: 0 auto;
  }
</style>

<div class="wrapper">
  <Select {items} {title} />
</div>
