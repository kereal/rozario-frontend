<script>
    import Slider from './Slider.svelte'
    import Popup from './Popup.svelte'
    import Filters from './Filters.svelte'


    export let menuItems;
    export let filters;
    export let category;
    export let pagefor;
    export let selected;

    let link


    let filtersVisible = false;
    function openFilters() {
        filtersVisible = !filtersVisible
    }
   // function swap(arr, a, b) {
     //   arr[a] = arr.splice(b, 1, arr[a])[0];
       // menuItems = menuItems
       // console.log(menuItems, selected)
  //  }

    if  (pagefor.params.slug[1] != undefined ) {
        selected = menuItems[0].name;
    }
</script>

<style>
    li {
        height: 34px;
        border-radius: 30px;
        font-size: 15px;
        color: var(--gray-600);
        margin-right: 12px;
        background: var(--gray-300);
        padding: 0 12px;
    }
    li:last-child {
        margin-right: 0;
    }
    .selected {
        background: var(--color-info);
        border-radius: 30px;
        color: var(--color-light);

    }
    .nav {
        margin: 0 -16px;
    }

</style>

<nav class="nav">
    <ul class="flex h-full">
        <Slider>
            {#if filters}
                    <li class="filters flex items-center whitespace-nowrap {pagefor.params.slug[1] == 'filtered' ? 'selected' : ''}" on:click={openFilters}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
                            <line x1="8.75" y1="3.25" x2="18.25" y2="3.25" stroke="{pagefor.params.slug[1] == 'filtered' ? '#fff' : '#330033'}" stroke-width="1.5" stroke-linecap="round"/>
                            <line x1="0.75" y1="3.25" x2="2.25" y2="3.25" stroke="{pagefor.params.slug[1] == 'filtered' ? '#fff' : '#330033'}" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M7.95833 3.23806C7.95833 4.62803 6.86068 5.72613 5.54167 5.72613C4.22265 5.72613 3.125 4.62803 3.125 3.23806C3.125 1.84809 4.22265 0.75 5.54167 0.75C6.86068 0.75 7.95833 1.84809 7.95833 3.23806Z" stroke="{pagefor.params.slug[1] == 'filtered' ? '#fff' : '#330033'}" stroke-width="1.5"/>
                            <line x1="10.25" y1="13.75" x2="0.75" y2="13.75" stroke="{pagefor.params.slug[1] == 'filtered' ? '#fff' : '#330033'}" stroke-width="1.5" stroke-linecap="round"/>
                            <line x1="18.25" y1="13.75" x2="16.75" y2="13.75" stroke="{pagefor.params.slug[1] == 'filtered' ? '#fff' : '#330033'}" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M11.0417 13.762C11.0417 15.152 12.1393 16.2501 13.4583 16.2501C14.7773 16.2501 15.875 15.152 15.875 13.762C15.875 12.372 14.7773 11.2739 13.4583 11.2739C12.1393 11.2739 11.0417 12.372 11.0417 13.762Z" stroke="{pagefor.params.slug[1] == 'filtered' ? '#fff' : '#330033'}" stroke-width="1.5"/>
                        </svg>
                    </li>
            {/if}
            <li class="flex items-center whitespace-nowrap {pagefor.params.slug[1] == undefined ? 'selected' : ''}"
            on:click={()=>{
            selected = ''
            }}>
                <a href="mobileCatalog">
                    <button>
                        Все
                    </button>
                </a>
            </li>
            {#each menuItems as item, i}
                <li class="flex items-center whitespace-nowrap {item.id == pagefor.params.slug[1] ? 'selected' : ''}">
                    <a href="mobileCatalog/{item.id}">
                        <button>
                            {item.name}
                        </button>
                    </a>
                </li>
            {/each}
        </Slider>
    </ul>
</nav>

{#if filtersVisible}
    <Filters {filters} {category} bind:visible={filtersVisible}/>
{/if}