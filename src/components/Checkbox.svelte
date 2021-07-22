<script>
    export let checked = false;
    export let name;
    export let onchange = () => {};
</script>
<style>
    input {
        opacity: 0;
        position: absolute;
        width: 20px;
        height: 20px;
    }
    input + span {
        width: 20px;
        height: 20px;
        background: var(--color-light);
        border: 1px solid var(--gray-500);
        box-sizing: border-box;
        border-radius: 3px;
        flex-shrink: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 2;
    }
    input + span path {
        stroke: #fff;
    }
    input + span:hover {
        background: var(--gray-200);
        border: 1px solid var(--gray-700);
    }
    input + span:hover path {
        stroke: var(--gray-700);
    }
    input:checked + span path {
        stroke: var(--color-main);
    }
    input:checked + span {
        background: var(--color-accent);
        border: 1px solid var(--gray-300);
    }
</style>
<input type="checkbox" checked="{checked}" {name} on:change="{onchange}"><span>
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 1L4.84615 7L1 3.25" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</span>
