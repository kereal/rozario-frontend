<script>
    export let label = '';
    export let name = '';
    export let group;
    export let value = '';
    export let text = '';
    export let unused = true;
    export let check = false;
    export let checkBox = false;
    export let ref = null;
    export let blocked = false;
    export let labelClass = '';
    export let id='';
    export let style = '';
    export let className = '';
</script>

<style>
    input:checked + label {
        @apply border-info text-main;
        text-shadow: 0 0 0 var(--color-main), 0 0 0 var(--color-main);
    }
    label {
        color: var(--gray-600);
        height: 33px;
        display:block;
        width: auto;
        background-color: #fff;
        border: 1px solid var(--gray-500);
        border-radius: 30px;
        font-size: 14px;
        padding-top: 4px;
    }
    .unused {
        height: 33px;
        display:block;
        background: #F6F6F6;
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        border-radius: 4px;
        color: var(--gray-700);
        border-radius: 30px;
    }

</style>
{#if unused == true}
        <div class="flex items-center justify-between">
            <input
                    bind:group={group}
                    class="visuallyhidden"
                    type="radio"
                    value={value}
                    id={label}
                    name={name}
            />
            <label
                    class="cursor-pointer flex items-center hover:text-main hover:border-gray-700 pl-12 pr-12 whitespace-no-wrap {labelClass}"
                    style="{style}"
                    for={label}>
                <div style="">
                    {text}
                    <slot></slot>
                </div>
            </label>
        </div>
{:else}
    <button class="unused whitespace-no-wrap">{text}</button>
{/if}