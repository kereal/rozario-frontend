<script>
    export let navlist = [];
</script>

<style lang="postcss">
    aside {
        width: 310px;
        height: calc(100vh - 5rem - 20px);
        @apply bg-gray-100;
    }
    .nav-item {
        height: 43px;
    }
    .nav-item:hover :global(span) {
        @apply text-info;
    }
    .nav-item:hover :global(div.icon > svg) {
        @apply text-white;
    }
    .nav-item:hover :global(div.icon) {
        @apply bg-info;
    }
</style>

<aside class="rounded">
    <nav class="rounded bg-gray-100">
        <ul class="rounded-t overflow-auto">
            {#each navlist as nav}
                <li
                        class="{nav.active ? 'bg-accent font-semibold' : 'bg-transparent font-normal'}
          px-18 nav-item bg-transparent hover:bg-gray-1000">
                    {#if nav.active}
                        <h1
                                class="text-main leading-tight w-full h-full flex items-center
              block">
                            {nav.name}&nbsp;
                        </h1>
                    {:else}
                        <a
                                class="text-main leading-tight w-full h-full flex items-center
              block"
                                href={nav.link}>
                            {nav.name}&nbsp;
                        </a>
                    {/if}
                </li>
            {/each}
        </ul>
    </nav>
    <slot />
</aside>

