<script>
    import Icon from "./Icon.svelte";
    import Close from "./icons/Close.svelte";

    export let className = "";
    export let icon = null;
    export let iconSize;
    export let size = "md";
    export let status = "";
    export let testid = "";
    export let element = null;
    export let iconStyle = "";
</script>

<style>
    .button--xxs {
        width: 16px;
        height: 16px;
    }
    .button--xs {
        width: 20px;
        height: 20px;
    }
    .button--sm {
        width: 35px;
        height: 35px;
    }
    .button--md {
        width: 40px;
        height: 40px;
    }
    .button--lg {
        width: 44px;
        height: 44px;
    }
    .bubble {
        background: url("bubble-left.svg") no-repeat;
        width: 67px;
        height: 45px;
        padding: 6px;
        @apply hidden absolute text-xs leading-tight text-info;
    }
    .action-bubble {
        background-color: rgba(255, 255, 255, 0.75);
    }
    .action-bubble:hover + .bubble {
        top: 40px;
        left: -44px;
        @apply block;
    }

    :global(button.action-button:hover > svg) {
        @apply text-white;
    }

    :global(button.enabled-button > svg) {
        color: var(--color-info-light);
    }
    button.enabled-button:hover {
        border-color: var(--color-info);
    }
    :global(button.enabled-button:hover > svg) {
        color: var(--color-info);
    }
</style>

{#if status == 'enabled'}
    <button
            type="button"
            data-testid={testid}
            on:click
            class="{className} button--{size} enabled-button rounded-full flex
    items-center justify-center border border-infolight bg-transparent">
        {#if typeof icon === 'function'}
            <svelte:component this={icon} classNames="fill-current" {iconSize} />
        {:else}
            <Icon
                    name={icon}
                    style="width: 8px; height:13px;"
                    className="text-gray-1100" />
        {/if}
    </button>
{:else if status == 'disabled'}
    <button
            type="button"
            data-testid={testid}
            class="{className} button--{size} rounded-full flex items-center
    justify-center border border-gray-1100 bg-transparent">
        {#if typeof icon === 'function'}
            <svelte:component
                    this={icon}
                    classNames="fill-current text-gray-1100"
                    {iconSize} />
        {:else}
            <Icon
                    name={icon}
                    style="width: 8px; height:13px;"
                    className="text-gray-1100" />
        {/if}
    </button>
{:else if status == 'action'}
    <button
            type="button"
            data-testid={testid}
            on:click
            class="{className} button--{size} action-button rounded-full hover:bg-info
    flex items-center justify-center bg-gray-300">
        {#if typeof icon === 'function'}
            <svelte:component
                    this={icon}
                    iconSize="24"
                    classNames="fill-current text-main" />
        {:else}
            <Icon
                    name={icon}
                    style="width: 8px; height:13px;"
                    className="text-gray-300" />
        {/if}
    </button>
{:else if status == 'action-bubble'}
    <div class="relative">
        <button
                type="button"
                data-testid={testid}
                on:click
                class="{className} button--{size} action-bubble rounded-full flex
      items-center justify-center">
            {#if typeof icon === 'function'}
                <svelte:component
                        this={icon}
                        iconSize="24"
                        classNames="fill-current text-main" />
            {:else}
                <Icon
                        name={icon}
                        style="width: 8px; height:13px;"
                        className="text-gray-300" />
            {/if}
        </button>
        <div class="bubble">Все отлично</div>
    </div>
{:else if status == 'only-icon'}
    <button
            type="button"
            data-testid={testid}
            bind:this={element}
            {...$$props}
            on:mouseleave
            on:mouseenter
            on:click
            class="{className} button--{size} rounded-full flex items-center
    justify-center bg-transparent">
        <svelte:component this={icon} {iconSize} classNames={iconStyle} />
    </button>
{:else if status == 'close'}
    <button type="button" data-testid={testid} on:click>
        <Close
                iconSize={16}
                classNames="stroke-current text-gray-1100 hover:text-gray-700" />
    </button>
{/if}