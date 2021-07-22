<script>
    import CustomDropdown from '../components/CustomDropdown.svelte'
    import ItemList from '../components/ItemList.svelte'

    export let position = 'CENTER'

    let relativeElement;

    let customDropdownVisible = false
    function toggleCustomDropdown() {
        customDropdownVisible = !customDropdownVisible
    }
</script>

<style>
 .relative-element {
     width: 32px;
     height: 32px;
     background-color: crimson;
     position: absolute;
     top: 30%;
     left: 50%;
     transform: translate(-50%, -50%);
 }
 .relative-element:hover {
     background-color: brown;
 }
</style>

<div>
    <div on:click={toggleCustomDropdown} bind:this={relativeElement} class="relative-element">
    </div>
    {#if customDropdownVisible}
    <CustomDropdown
        relativeElement={relativeElement}
        bind:dropdownVisible={customDropdownVisible}
        css="width: 320px;max-height: 400px;"
        buttonRef={relativeElement}
        {position}>
            <ItemList listData={['first', 'second', 'third', 'fourth', 'fifth']} />
        </CustomDropdown>
    {/if}

</div>