<script>
  import SocialIcon from "../components/SocialIcon.svelte";
  export let iconlist;
</script>

<style>
  .wrapper {
    padding: 50px;
  }
</style>

<div class="wrapper flex">
  {#each iconlist as icon}
    <div class="mr-4 last:mr-0">
      <SocialIcon {icon} />
    </div>
  {/each}
</div>
