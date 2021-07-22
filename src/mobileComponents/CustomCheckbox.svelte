<script>
    export let className = "";
    export let label = "";
    export let labelClass = "";
    export let id = "";
    export let check = false;
    export let value = "";
    export let blocked = false;
    export let ref = null;
    export let style = ''
    export let radio = false;
    export let group;
    export let name = '';
    export let text = '';

    if (blocked) {
        labelClass += " pointer-events-none";
        className += " pointer-events-none";
    }
</script>

<style>
    .wrapper {
        --color-accent: #ffdc00;
        --color-accent-hover: rgba(255, 220, 0, 0.2);
        --color-main: #330033;
        --width: 20px;
        --height: 20px;
        position: relative;
    }
    .styled-checkbox {
        position: absolute;
        opacity: 0;
        height: 0;
        width: 0;
        outline: none;
    }

    .styled-checkbox + label {
        position: relative;
        cursor: pointer;
        padding: 0;
        outline: none;
    }

    .styled-checkbox + label:after {
        content: "";
        margin-left: 10px;
        display: inline-block;
        vertical-align: text-top;
        width: var(--width);
        height: var(--height);
        background: var(--color-light);
        border: 1px solid var(--gray-500);
        border-radius: 3px;
    }

    .styled-checkbox:hover + label:after {
        background: var(--gray-200);
        border: 1px solid var(--gray-700);
    }

    .styled-checkbox:checked + label:after {
        background: var(--color-accent);
        box-shadow: none;
        border: 1px solid transparent;
    }

    .styled-checkbox:disabled + label {
        color: #b8b8b8;
        cursor: auto;
    }

    .styled-checkbox:disabled + label:after {
        box-shadow: none;
        background: var(--gray-200);
    }

    .styled-checkbox:hover + label:before {
        content: "";
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMSAxTDQuODQ2MTUgN0wxIDMuMjUiIHN0cm9rZT0iIzk5OTk5OSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==");
        top: 6px;
        right: 4px;
        width: 12px;
        height: 8px;
        position: absolute;
        display: block;
    }

    .styled-checkbox:checked + label:before {
        content: "";
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMSAxTDQuODQ2MTUgN0wxIDMuMjUiIHN0cm9rZT0iIzMzMDAzMyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==");
        top: 6px;
        right: 4px;
        width: 12px;
        height: 8px;
        position: absolute;
        display: block;
    }

    .text--md {
        @apply text-base;
    }
    .text--sm {
        @apply text-sm;
    }
</style>
{#if !radio}
    <div style={!label ? 'width: 20px;height:20px;' : ''} class="wrapper {className}">
        <input
                bind:this={ref}
                on:click
                bind:checked={check}
                class="styled-checkbox {blocked ? 'hover' : ''}"
                type="checkbox"
                {id}
                {value} />
        <label class={labelClass} style="{style}" for={id}>{label}</label>
    </div>
{:else}
    <div class="wrapper {className}">
        <input
                bind:group={group}
                class="styled-checkbox {blocked ? 'hover' : ''}"
                type="radio"
                value={value}
                id={label}
                name={name}
        />
        <label
                class={labelClass}
                style="{style}"
                for={label}>
            {text}
        </label>
    </div>
{/if}