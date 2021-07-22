<script>
    export let status = "active-main";
    export let className = "";
    export let textClass = "";
    export let size = "";
    export let testid = undefined;
    export let type = undefined;
    export let form = undefined;

    if (size) {
        switch (size) {
            case "sm":
                className += " button--sm";
                textClass += " text-one-five";
                break;
            case "md":
                className += " button--md";
                textClass += " text-one-five";
                break;
            case "lg":
                className += " button--lg";
                textClass += " text-base";
                break;
            case "full":
                className += " button--full";
                textClass += " text-base";
                break;
            case "custom":
                className += "custom font-normal";
                textClass += "text-one-five font-normal";
                break;
            default:
                throw new Error("there is no such size");
        }
    }


</script>

<style>
    .button {
        @apply text-center flex justify-center items-center text-lg tracking-wide;
        border-radius: 16px;
    }
    .custom {
        width: 160px;
    }
    .custom-text {
        font-style: 15px;
        font-weight: normal;
    }
    .gift-button {
        padding: 0 20px !important;
    }
    .mt-without-decr {
        margin-top: -12px;
    }
    .button--sm {
        height: 39px;
        padding: 0 1rem;
        border-radius: 23px;
    }
    .button--md {
        height: 44px;
        width: 100%;
    }
    .button--lg {
        height: 2.875rem;
        padding: 0 34px;
    }
    .btn-present{
        text-align: center;
    }
    .mt-16-media {
        margin-top: 16px;
    }
    .button--full {
        height: 50px;
        width: 100%;
    }


</style>

{#if status == 'active-main'}
    <div
            {form}
            data-testid={testid}
            data-back="Back" data-front="Front"
            on:click
            {type}
            class="button border border-transparent bg-info text-white
    text-main {className}">
    <span class=" font-semibold {textClass}">
      <slot />
    </span>
    </div>
{:else if status == 'active-secondary'}
    <div
            {form}
            on:click
            {type}
            class="button border border-transparent bg-gray-1200
    text-main {className}"
            data-testid={testid}>
    <span class="{textClass} ">
      <slot />
    </span>
    </div>
{:else if status == 'active-transparent'}
    <div
            {form}
            on:click
            {type}
            class="button bg-transparent text-main border border-gray-1000 {className}">
    <span class="{textClass} ">
      <slot />
    </span>
    </div>
{:else if status == 'disabled-main'}
    <div
            data-testid={testid}
            class="button cursor-default text-gray-700 border-transparent border bg-gray-1000 {className}" >
    <span class="{textClass}" style="font-size:15px !important;">
      <slot />
    </span>
    </div>
{:else if status == 'disabled-secondary'}
    <div
            data-testid={testid}
            class="button cursor-default text-gray-700 bg-transparent bg-gray-1000 {className}">
    <span class="{textClass} ">
      <slot />
    </span>
    </div>
{/if}
