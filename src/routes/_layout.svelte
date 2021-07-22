<script>
  import "core-js/features/object/assign";
  import "core-js/features/string/repeat";
  import "core-js/features/string/pad-start";
  import "core-js/features/string/pad-end";
  import "core-js/features/global-this";
  import Tailwindcss from "../components/Tailwindcss.svelte";
  import NavContainer from "../components/NavContainer.svelte";
  import Footer from "../components/Footer.svelte";
  import { onMount } from "svelte";
  import smoothscroll from "smoothscroll-polyfill";

  export let desktop;

  onMount(() => {
    smoothscroll.polyfill();
      let navigator = window.navigator.userAgent
      if ( navigator.indexOf("Android") == -1 && navigator.indexOf("webOS") == -1 &&
              navigator.indexOf("iPhone") == -1 && navigator.indexOf("iPad") == -1 &&
              navigator.indexOf("iPod") == -1 && navigator.indexOf("BlackBerry") == -1 &&
              navigator.indexOf("IEMobile") == -1 && navigator.indexOf("Opera Mini") == -1) {
          desktop = true
      } else {
          desktop = false
      }
  });


</script>

<style>
  .main {
    max-width: var(--max-content-width);
    padding-top: 5.5rem;
    @apply w-full mx-auto my-0;
  }
  :global(button:focus) {
    outline: none;
  }
</style>

<Tailwindcss />

      <div style="{desktop == true ? 'min-width: 1024px' : 'max-width:100%'}" class="flex items-stretch flex-col h-full">
       {#if desktop}
           <NavContainer />
       {/if}
        <main class="{desktop == true ? 'main pt-8 px-40' : ''}">
          <slot />
        </main>
        {#if desktop}
            <Footer />
        {/if}
      </div>



