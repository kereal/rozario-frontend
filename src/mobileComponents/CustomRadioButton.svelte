<script>
    export let group = "";
    export let value = "";
    export let label;
    export let name;
    export let labelClass = "weight";
    export let modal = false;
    export let className = "";
    export let weight = 'weight'
    let input;

</script>

<style>
    .text-custom {
        font-size: 15px;
    }

    input {
        display: none;
    }

    .customCircle {
        background: #FFFFFF;
        border: 1px solid var(--gray-500);
        box-sizing: border-box;
        min-width: 18px;
        min-height: 18px;
        border-radius: 50%;
        transition: all 0.5s ease;
    }
    input[type="radio"]:checked + label .customCircle{
        background: white;
        border: 6px solid var(--color-info);
        min-width: 18px;
        min-height: 18px;
        transition: all 0.2s ease-in-out;
    }

</style>

<div class="custom-radio {className}">
    <input
            bind:this={input}
            bind:group
            type="radio"
            {value}
            id={label}
            {name} />
    <label
            on:click
            class='{labelClass} {weight} flex justify-between items-center'
            style={modal ? 'color: var(--gray-700);' : ''}
            for={label}>
        <slot>

        </slot>
        <div class="customCircle"></div>
    </label>
</div>