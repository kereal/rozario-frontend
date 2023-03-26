<script>
  import { page } from "$app/stores"
  import Error404 from "@/components/Error404.svelte"

  const dev = process.env.NODE_ENV === "development"
  const show404page = $page.status == 404
  const showErrorStack = dev && $page.data
</script>

<svelte:head>
  <title>{$page.status}</title>
</svelte:head>

{#if !show404page}
  <h1>{$page.status}</h1>
  <p>{$page.error.message}</p>
  {#if showErrorStack}
    <pre>{$page.data}</pre>
  {/if}
{/if}

{#if show404page}
  <Error404 />
{/if}

<style>
  h1,
  p {
    margin: 0 auto;
  }
  h1 {
    font-size: 2.8em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }
  p {
    margin: 1em auto;
  }
  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>
