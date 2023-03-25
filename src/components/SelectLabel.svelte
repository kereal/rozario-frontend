<script>

    export let list = []
    export let className;
    export let select = 'Выберите время'
    export let size = '';
    export let unused = true;
    import {slide} from 'svelte/transition';
    let buttonElement;
    let visible = false;
</script>


<style>

    .selectedTimeButton{
        background: #fff;
        font-weight: 600;
        font-size: 14px;
    }
    .middle {
        align-items:center;
        text-align: center;
        justify-content: center;
        width: 165px;
        height: 34px;
    }
    .full {
        width: 100%;
        height: 34px;
        align-items:center;
        text-align: left;
        padding-left: 12px;
        font-weight: normal;
        font-size: 15px;
    }

    .selectedTimeButton:hover path{
        color:var(--color-main);
    }
    .dropUl{
        max-height: 139px;
        overflow-y: scroll;
        z-index:11111;
        text-align: center;
        position: absolute;
    }
    .dropLi{
        min-height: 34px;
        text-align: center;
        padding-top: 7px;
        font-size: 14px;
        margin-top: -1px;
    }
    .dropLiFull  {
        min-height: 34px;
        text-align: left;
        padding-top: 7px;
        font-size: 14px;
        margin-top: -1px;
    }
    .dropLi span{
        text-align: center;
        margin-left: -9px;
    }
 .arrow {
     position: absolute;
     right: 7px;
 }
    svg {
        transition: transform 0.2s linear;
        margin-top: 2px;
    }
   .rotated {
        transform: rotate(180deg);
        transform-origin: center;
    }
    .unused {
        background: #F6F6F6;
        border: 1px solid var(--gray-300);
        color: var(--gray-700);
        cursor: default;
    }
</style>

<svelte:body
        on:click={e => {
        if (buttonElement.contains(e.target)) {
        return;
        }
        visible = false;
        }} />
<div class="relative ">
    <button class="selectedTimeButton  rounded border  h-full border-gray-300 w-full flex pr-12 {size == 'full'? 'full':'middle'} {className} {unused==true?'':'unused'}"
            bind:this={buttonElement}
            on:click={()=>{
            if(unused==true) {
            visible = !visible
            }
            }}>
        <span class="item-center items-baseline text-main">{select}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class:rotated='{visible}' width="12" height="7" viewBox="0 0 12 7" fill="none" class="stroke-current text-gray-700 arrow">
                <path d="M1 1L6 6L11 1"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
            </svg>
    </button>
    {#if visible}
        <ul class="dropUl border border-gray-300 w-full custom-scrollbar" transition:slide|local>
            {#each list as item}
                <li class=" w-full hover:bg-gray-200 bg-white px-12  text-main {size == 'full'? 'dropLiFull':'dropLi'}"
                    on:click={
                            ()=>{
                        select = item
                        }}>
                    <span class="h-full cursor-pointer w-full items-center inline">
                       {item}
                    </span>
                </li>
            {/each}
        </ul>
    {/if}
</div>