<script>
  import BurgerMenu from "../components/BurgerMenu.svelte";
  let menuVisible = false;
  let button;
  function toggleMenu() {
    menuVisible = !menuVisible;
  }
</script>

<style>
  .wrapper {
    width: 80%;
    margin: 0 auto;
  }
  .button {
    width: 200px;
    height: 100px;
    background-color: coral;
  }
  .button:hover {
    background-color: burlywood;
  }
</style>

<div class="wrapper">
  <button bind:this={button} class="button" on:click={toggleMenu}>menu</button>
  {#if menuVisible}
    <BurgerMenu buttonRef={button} />
  {/if}
</div>
