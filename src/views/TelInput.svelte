<script>
  import TelInput from "../components/TelInput.svelte";

  export let flag = false;
  export let codeButton = false;
  export let game = false;
  export let isValid = false;
  export let telInput = "";
</script>

<style>
  .wrapper {
    width: 600px;
    padding: 50px;
  }
</style>

<div class="wrapper">
  <TelInput {...$$props} />
</div>
