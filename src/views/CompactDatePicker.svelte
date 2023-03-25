<script>
  import CompactDatePicker from "../components/CompactDatePicker.svelte";
  export let initDate;
</script>

<style>
  .wrapper {
  }
</style>

<div class="wrapper">
  <CompactDatePicker {initDate} />
</div>
