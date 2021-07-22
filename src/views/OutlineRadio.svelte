<script>
  import OutlineRadio from "../components/OutlineRadio.svelte";
  export let radioList;
</script>

<style>
  .wrapper {
    padding: 50px;
    display: flex;
  }
</style>

<form class="wrapper">
  <div class="mr-4">
    <OutlineRadio
    name="same-name"
      bind:group={radioList[0].group}
      label={radioList[0].label}
      value={radioList[0].value} />
  </div>
  <div class="mr-4">
    <OutlineRadio
    name="same-name"
      bind:group={radioList[1].group}
      label={radioList[1].label}
      value={radioList[1].value} />
  </div>
  <div class="mr-4">
    <OutlineRadio
    name="same-name"
      bind:group={radioList[2].group}
      label={radioList[2].label}
      value={radioList[2].value} />
  </div>
</form>
