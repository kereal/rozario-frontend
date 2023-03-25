<script>
	import Error404 from '../components/Error404.svelte';
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';

	const show404page = status == 404;
	const showErrorStack = dev && error.stack;
</script>

<style>
	h1, p {
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

<svelte:head>
	<title>{status}</title>
</svelte:head>
{#if !show404page}
	<h1>{status}</h1>

	<p>{error.message}</p>

	{#if showErrorStack}
		<pre>{error.stack}</pre>
	{/if}
{/if}
{#if show404page}

	<Error404 />

{/if}
