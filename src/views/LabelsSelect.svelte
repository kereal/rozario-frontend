<script>
  import LabelsSelect from "../components/LabelsSelect.svelte";
  export let labellist;
</script>

<style>
  .wrapper {
    padding: 50px;
  }
</style>

<div class="wrapper">
  <LabelsSelect {...$$props} />
</div>
