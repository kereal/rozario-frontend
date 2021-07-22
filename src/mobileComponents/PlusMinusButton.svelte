<script>
    import { onMount } from "svelte";
    export let number;
    export let min;
    let selectedAmount = true;
    let once = true;
    function checkAmount() {
        if (number < min) {
            number = min
        }
        if (number == 9  || number ==21 || number == 15 || number == 51 || number == 101) {
            selectedAmount = false;
        } else {
            selectedAmount = true;
        }
    }
    onMount(() => {
        if (once) {
            once = false;
        }
    });
    $: if (number && !once) {
        checkAmount();
    }
</script>

<style>
    .wrapper {
        width: auto;
        height: 33px;
        border: 1px solid var(--gray-500);
        box-sizing: border-box;
        border-radius: 30px;
    }
    span {
        padding-top: 6px;
        padding-bottom: 8px;
    }
    button {
        fill:var(--gray-600);
    }
    button:hover {
        fill:var(--color-main);
    }
    .unactive {
        fill:var(--gray-1100);
    }
    .unactive:hover {
        fill:var(--gray-1100);
    }
    .selectedAmount {
        border-color: var(--color-info);
        color: var(--color-main);
        font-weight: 600;
    }
</style>

<div class="wrapper inline-flex border hover:border-gray-700" class:selectedAmount
     on:mouseleave= {checkAmount}>
    <div>
        {#if number == min}
            <button
                    class="block h-full pl-12 unactive">
                <svg width=13px height=13px xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 2">
                    <path d="M0 2V0h12v2H0z"/>
                </svg>
            </button>
        {/if}
        {#if number != min}
            <button
                    class=" block h-full pl-12"
                    on:click={() => {
                    if (number > 1) number -= 1;

                    }}>
                <svg width=13px height=13px xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 2">
                    <path d="M0 2V0h12v2H0z"/>
                </svg>
            </button>
        {/if}

    </div>
    <span class="text-main leading-snug mx-12">{number}</span>
    <div>
        <button class="block h-full pr-12" on:click={() => (number += 1)}>
            <svg  width=13px height=13px xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13">
                <path d="M0 7.5v-2h13v2H0z"/>
                <path d="M5.5 0h2v13h-2V0z"/>
            </svg>
        </button>
    </div>
</div>