<script>
  import Breadcrumbs from "../components/Breadcrumbs.svelte";
  export let pathlist;
</script>

<style>
  .wrapper {
    padding: 50px;
  }
</style>

<div class="wrapper">
  <Breadcrumbs {pathlist} />
</div>
