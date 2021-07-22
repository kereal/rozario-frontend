<script>
  import AsideNavigation from "../components/AsideNavigation.svelte";
  export let navlist;
</script>

<style>
  .wrapper {
  }
</style>

<div class="wrapper">
  <AsideNavigation {navlist} />
</div>
