<script>
    import Slider from './Slider.svelte'
    import {createEventDispatcher} from "svelte";
    import { onMount} from "svelte";

    let headers = []

    onMount(() => {
        headers = document.getElementsByClassName('header')
    })
    export let menulist = [{index: 0}];
    export let currentMenuIndex = menulist[0].index;
    export let pos;

    const dispatch = createEventDispatcher();
    let menuRef;

    function handleClick(e) {
        currentMenuIndex = parseInt(e.target.dataset.index);
            menuRef.scrollLeft = e.target.offsetLeft - 16;
        dispatch("change", {
            header: currentMenuIndex
        });
    }

    $: if(currentMenuIndex) {
        if(currentMenuIndex === 1) {
            menuRef.scrollLeft = 0
        } else {
                menuRef.scrollLeft = headers[currentMenuIndex].offsetLeft - 32
        }
    }
</script>

<style>
    li {
        height: 34px;
        border-radius: 30px;
        font-size: 15px;
        color: var(--gray-600);
        margin-right: 12px;
        transition: transform .3s;
    }
    li:last-child {
        margin-right: 0;
    }
    .selected {
        background: var(--gray-300);
        border-radius: 30px;
        color: var(--color-main);
        padding: 0 12px;

    }
    .nav {
        margin: 0 -16px;

    }
    .emptyBlock {
        min-width: 16px;
        height: 55px;
        margin-right: 0;
    }
    .conteiner {
        width: auto;
        height: auto;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        padding: 0 16px;
        padding-right: 0;
        overflow-y: visible;
        transition: transform .3s;
        scroll-behavior: smooth;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    .conteiner div{
        margin-right: 16px;
    }
    .conteiner div:last-child{
        margin-right: 0;
    }
</style>

<nav class="nav">
    <ul class="flex h-full">
        <div class="conteiner  flex items-center" bind:this={menuRef} >
            {#each menulist as menu, i}
                <li class=" flex items-center whitespace-nowrap  {currentMenuIndex === menu.index ? 'selected' : ''}">
                    <button data-index={i} on:click={handleClick} class="header">
                        {menu.name}
                    </button>
                </li>
            {/each}
            <div class="emptyBlock">&#8195;</div>
        </div>
    </ul>
</nav>