<script>
  import SocialSignInButton from "../components/SocialSignInButton.svelte";
  
</script>

<style>
  .wrapper{
    padding: 50px;
  }
</style>

<div class="wrapper">
  <SocialSignInButton {...$$props} />
</div>
