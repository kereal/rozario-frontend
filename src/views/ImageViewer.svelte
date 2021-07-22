<script>
  import ImageViewer from "../components/ImageViewer.svelte";
  export let imagelist;
</script>

<style>
  .wrapper {
    max-width: 550px;
    padding: 50px;
  }
</style>

<div class="wrapper">
  <ImageViewer {...$$props} />
</div>
