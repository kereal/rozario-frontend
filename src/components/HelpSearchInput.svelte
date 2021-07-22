<style>
    div {
        background: var(--color-light);
        width: 190px;
        position: relative;
        margin-left: auto;
    }
    div.searching {
        width: 100%;
        margin-bottom: 17px;
    }
    input {
        width: 100%;
        padding: 8px 20px 9px 33px;
        background: transparent;
        border-radius: 4px;
        height: 36px;
        border: 1px solid var(--gray-1100);
        box-sizing: border-box;
        color: var(--color-main);
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 135%;
    }
    input:hover {
        border-color: var(--color-info-light);
    }
    input:hover::placeholder {
        color: var(--color-main);
    }
    div input:focus {
        border-color: var(--color-info-light);
    }
    input::placeholder {
        color: var(--gray-600);
    }
    i.search {
        position: absolute;
        left: 12px;
        top: 11px;
        bottom: 0;
        pointer-events: none;
    }
    i.close {
        position: absolute;
        right: 12px;
        top: 11px;
        bottom: 0;
        cursor: pointer;
    }
    svg {
        width: 12px;
        height: 12px;
    }
    i.close:hover path {
        stroke: var(--gray-700);
    }
    @media screen and (max-width:1300px) {
        div.searching {
            margin-bottom: 6px;
        }
        input {
            padding-left: 31px;
        }
    }
</style>
<script>
    export let onSearch = function(data) {
        console.log('search = ' + data);
    };
    export let onSearchCanceled = function() {
        console.log('search canceled');
    };
    export let searchTerm = '';
    export let searching = false;
    function onKeyup() {
        if (searchTerm.length >= 3) {
            onSearch(searchTerm);
            searching = true;
        } else {
            onSearchCanceled();
            searching = false;
        }
    }
    function clearSearch(e) {
        e.stopPropagation();
        searchTerm = '';
        searching = false;
        onSearchCanceled();
    }
</script>
<div class:searching="{searching}">
    <label for="questions-search" class="hidden">Поиск по вопросам</label>
    <input id="questions-search" placeholder="Поиск по вопросам" type="text" on:keyup="{onKeyup}" bind:value="{searchTerm}">
    <i class="search"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.45044 10.2515C8.09497 10.2515 10.2388 8.10766 10.2388 5.46314C10.2388 2.81861 8.09497 0.674805 5.45044 0.674805C2.80592 0.674805 0.662109 2.81861 0.662109 5.46314C0.662109 8.10766 2.80592 10.2515 5.45044 10.2515Z" stroke="#666666" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.85352 8.96582L12.3397 12.3567" stroke="#666666" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg></i>
    {#if searching}
    <i class="close" on:click="{clearSearch}"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L13 13M13 1L1 13" stroke="#C4C4C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    </i>
    {/if}
</div>
