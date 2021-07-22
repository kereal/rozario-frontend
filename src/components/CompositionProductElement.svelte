<script>
    import SelectLabel from "./SelectLabel.svelte";

    export let composition;
    export let flowers = [
        'Хризантема кустовая розовая',
         'Роза красная',
         'Лента декоративная'
    ]
    export let price = {
        'Хризантема кустовая розовая': 250,
        'Роза красная': 550,
        'Лента декоративная': 50
    }
    let textElement;
    function  getFocus() {
        setTimeout(()=>{textElement.focus()}, 100)
    }

    let openChange = false;
    let summ = composition.price * composition.count;

    $: if(composition.price) {
        summ = composition.price * composition.count;
    }
    $: if(price[composition.name]) {
        composition.price = price[composition.name]
    }
</script>

<style>
    .composition__name {
        min-width: 256px;
    }
    .compositionElement {
        font-weight: normal;
        font-size: 14px;
        color: var(--gray-600);
    }
     svg{
        margin-left: 8px;
        cursor: pointer;
        margin-bottom: 12px;
    }
    svg:hover path{
        fill: var(--color-info);
    }
    .changePrice {
        width: 49px;
        height: 34px;
        background: var(--color-light);
        border: 1px solid var(--color-info-light);
        box-sizing: border-box;
        border-radius: 4px;
        padding: 11px 8px;
        padding-right: 0;
        font-size: 14px;
        color: var(--color-main);
        margin-right: 6px;
    }
    .compositionElementChange {
        font-size: 14px;
        color: var(--color-main);
    }
    .compositionElementChange:first-child {
        min-width: 200px;
    }
    p {
        font-size: 13px;
        color: var(--color-main);
        padding-bottom: 24px;
    }
</style>
    <div class="flex items-center {openChange==true?'compositionElementChange':'compositionElement'}">
        {#if !openChange}
            <div class="mr-44 mb-12 composition__name">
                {composition.name}
            </div>
            {:else}
            <div class="mr-44 composition__name">
                <SelectLabel list={flowers} bind:select={composition.name} size="full"/>
            </div>
        {/if}
        <div class="mr-8 mb-12 {openChange==true?'pt-12':''}">{composition.count} *</div>
        {#if !openChange}
            <div class="mr-8 mb-12 {openChange==true?'pt-12':''}">    {composition.price}  ₽ = </div>
        {:else}
            <div>
                <input class="changePrice" bind:value={price[composition.name]} type="text" id="changePrice" bind:this={textElement}/> ₽ =
            </div>
        {/if}
        <div class="ml-8 mb-12 {openChange==true?'pt-12':''}">{summ}  ₽</div>
            <div on:click={()=>{
            openChange=true
            getFocus()
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" class="{openChange==true?'hidden':''}">
                    <path d="M14.0284 0.970913C12.7372 -0.323637 10.6374 -0.323637 9.3462 0.970913L0.761638 9.5533C0.694522 9.62043 0.652973 9.70673 0.640189 9.79942L0.00417687 14.5109C-0.0149994 14.6452 0.0329412 14.7794 0.125626 14.8721C0.205527 14.9521 0.317389 15 0.42925 15C0.448426 15 0.467603 15 0.486779 14.9968L3.32486 14.6132C3.56137 14.5813 3.72756 14.3639 3.6956 14.1274C3.66364 13.8908 3.44631 13.7246 3.20981 13.7566L0.934225 14.0634L1.37847 10.7775L4.83659 14.2361C4.91649 14.316 5.02835 14.3639 5.14021 14.3639C5.25208 14.3639 5.36394 14.3192 5.44384 14.2361L14.0284 5.65367C14.6548 5.02717 15 4.1961 15 3.31069C15 2.42528 14.6548 1.59421 14.0284 0.970913ZM9.5124 2.02573L10.9538 3.46732L3.12032 11.3017L1.6789 9.86016L9.5124 2.02573ZM5.14341 13.3219L3.73396 11.9123L11.5675 4.07783L12.9769 5.48745L5.14341 13.3219ZM13.5778 4.87054L10.1292 1.42161C10.5671 1.06041 11.1136 0.862234 11.6889 0.862234C12.3441 0.862234 12.9577 1.11795 13.4212 1.57823C13.8846 2.03852 14.1371 2.65543 14.1371 3.31069C14.1371 3.88924 13.9389 4.43264 13.5778 4.87054Z" fill="#666666"/>
                </svg>
            </div>
    </div>
{#if openChange}
    <p>Вы можете предложить цветы для замены</p>
{/if}


