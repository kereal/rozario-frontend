<script>
    export let photo;
    export let tittle;
    export let breadcrumbs;
</script>

<style>

    .item {
        width: 100%;
        background: #FFFFFF;
        box-shadow: 0px 4px 15px rgba(51, 0, 51, 0.1);
        border-radius: 8px;
    }
    .item__photo {
        width: 100%;
        height: 212px;

    }
    .item__footer {
        padding: 20px;
        padding-top: 16px;
    }
    .item__tittle {
        font-weight: bold;
        font-size: 20px;
        line-height: 115%;
        color: var(--color-main);
    }
    .item__icons {
        margin-top: 16px;
    }
    svg {
        margin-right: 19px;
    }
    .item__breadcrumbs {
        margin-top: 12px;
        font-weight: 600;
        font-size: 14px;
        color: var(--gray-700);
    }
</style>

<div class="item">
    <div class="item__photo" style="background-image: url({photo});
                                    background-size:cover;
                                    background-position:center;">

    </div>
    <div class="item__footer">
        <h3 class="item__tittle">{tittle}</h3>
        <div class="item__icons flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3.77148 2.68539C3.77148 1.75563 4.54859 1 5.50475 1H12.1095C13.0669 1 13.844 1.75563 13.844 2.68539V13.5232C13.844 14.4529 13.0669 15.2063 12.1095 15.2063H5.50475C4.54859 15.2063 3.77148 14.4529 3.77148 13.5232V8.60209" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.9995 13.54C16.9995 14.4686 16.2236 15.2242 15.2663 15.2242H13.37C12.415 15.2242 11.6367 14.4686 11.6367 13.54V8.11996C11.6367 7.1902 12.415 6.43457 13.37 6.43457H15.2663C16.2236 6.43457 16.9995 7.1902 16.9995 8.11996V13.54Z" fill="white" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.999 10.4192C15.3989 10.4192 16.2231 10.4381 15.2658 10.4381C15.2658 10.4381 13.7598 10.7529 13.7598 8.65006C13.7598 7.30064 13.7598 7.86652 13.7598 6.38428H15.2658C16.2231 6.38428 16.999 7.13991 16.999 8.06966V10.4192Z" fill="white" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.0594 17C8.11048 17 8.96255 16.1714 8.96255 15.1494C8.96255 14.1274 8.11048 13.2988 7.0594 13.2988C6.00832 13.2988 5.15625 14.1274 5.15625 15.1494C5.15625 16.1714 6.00832 17 7.0594 17Z" fill="white" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.1512 17C14.2023 17 15.0544 16.1714 15.0544 15.1494C15.0544 14.1274 14.2023 13.2988 13.1512 13.2988C12.1001 13.2988 11.248 14.1274 11.248 15.1494C11.248 16.1714 12.1001 17 13.1512 17Z" fill="white" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.09514 4.58728H1" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.67128 6.78613H1" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                <path d="M14.9994 14.7572C14.9994 15.131 14.6809 15.435 14.2868 15.435L8.00586 16.9799V6.20987C8.00586 5.83528 8.33472 5.66621 8.71852 5.52894L14.2859 4.16553C14.68 4.16553 14.9986 4.47109 14.9986 4.84646V14.7572H14.9994Z" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.0723 8.04638L12.9624 7.32202" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.0723 10.283L12.9624 9.56018" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 14.7572C1 15.131 1.32027 15.435 1.71438 15.435L7.99614 17.0001C8.01159 16.9845 8.01159 16.9845 7.99614 17.0001V6.20987C7.99614 5.83528 7.71794 5.66621 7.28347 5.52894L1.71438 4.16553C1.32027 4.16553 1 4.47109 1 4.84646V14.7572Z" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.86483 5.29386C7.86483 5.29386 7.89145 3.98784 7.84938 2.72603C7.80816 1.49058 6.51335 0.596374 5.48385 1.18657C4.47753 1.76125 4.61834 2.91216 5.65471 3.77379C6.64214 4.5951 7.86483 5.29386 7.86483 5.29386Z" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.99434 5.29389C7.99434 5.29389 7.96772 3.98787 8.01151 2.72606C8.05359 1.48983 9.3484 0.595628 10.3779 1.18659C11.3842 1.76128 11.2434 2.91219 10.207 3.77382C9.21961 4.59512 7.99434 5.29389 7.99434 5.29389Z" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M8.99934 12.4611C10.8802 12.4611 12.4049 10.9361 12.4049 9.05488C12.4049 7.17369 10.8802 5.64868 8.99934 5.64868C7.11849 5.64868 5.59375 7.17369 5.59375 9.05488C5.59375 10.9361 7.11849 12.4611 8.99934 12.4611Z" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.656 14.6569L12.4414 12.4404" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.55981 5.55888L3.34375 3.34314" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.6555 3.34314L12.4395 5.55959" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.55857 12.4404L3.3418 14.6569" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.9996 9H13.8652" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.13508 9H1" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 1V4.13493" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 13.865V16.9999" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                <path d="M13 17H1L1.4072 4.55554H12.5919L13 17Z" stroke="#330033" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.00078 7.22088C4.00078 7.22088 4 3.61019 4 3.57119C4 2.15045 5.34196 1 7.00078 1C8.65647 1 10 2.15045 10 3.57119C10 3.61019 9.99373 7.22222 9.99373 7.22222" stroke="#330033" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M8.99941 1L11.4724 6.26728L17 7.11154L12.9991 11.2109L13.9442 17L8.99941 14.2655L4.05577 17L4.99971 11.2109L1 7.11154L6.52642 6.26728L8.99941 1Z" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <p class="item__breadcrumbs">
            {#each breadcrumbs as crumb, i}
                {#if i == 0}
                    <span>{crumb}</span>
                    {:else}
                    <span>&nbsp;• {crumb}</span>
                {/if}
            {/each}
        </p>
    </div>
</div>