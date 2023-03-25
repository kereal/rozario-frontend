<script>

    import MainMenu from '../mobileComponents/MainMenu.svelte';
    let menuVisible = false;
    function openMenu() {
        menuVisible = !menuVisible
    }

    export let user;
    export let content;
    export let type;


</script>

<style>
    .miniButton {
        background: #FFFFFF;
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        box-shadow: 0px 4px 15px rgba(51, 0, 51, 0.1);
        width: 36px;
        height: 36px;
        border-radius: 50%;
    }
</style>

<div class="miniButton flex items-center justify-center">
    {#if type == 'back'}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
            <path d="M1 8H17" stroke="#330033" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.65685 2.2627L1 7.91955L6.65685 13.5764" stroke="#330033" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    {/if}
    {#if type == 'menu'}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="4" viewBox="0 0 20 4" fill="none" on:click={openMenu}>
            <circle cx="2" cy="2" r="2" fill="#330033"/>
            <circle cx="10" cy="2" r="2" fill="#330033"/>
            <circle cx="18" cy="2" r="2" fill="#330033"/>
        </svg>
    {/if}
    {#if type == 'basket'}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M2.75 4.875H17.25" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15.8337 4.875V16.7917C15.8337 17.5417 15.167 18.2083 14.417 18.2083H5.58366C4.83366 18.2083 4.16699 17.5417 4.16699 16.7917V4.875" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.83301 4.70829C6.83301 3.12496 7.66634 1.79163 8.66634 1.79163H11.333C12.333 1.79163 13.1663 3.12496 13.1663 4.70829" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.33301 8.70837V13.7917" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.667 8.70837V13.7917" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    {/if}
</div>

{#if menuVisible}
    <MainMenu bind:user={user} bind:visible={menuVisible}/>
{/if}