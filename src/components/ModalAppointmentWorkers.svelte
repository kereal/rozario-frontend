<script>
    import ModalSurface from './ModalSurface.svelte'
    import SelectLabel from "./SelectLabel.svelte"
    import Button from "./Button.svelte";
    import { createEventDispatcher } from "svelte";

    export let visible;
    export let florists;
    export let couriers;
    export let selectedFlorists;
    export let selectedCouriers;
    export let once;
    let newSelectedFlorists  = 'Выберите сотрудника'
    let newSelectedCouriers = 'Выберите сотрудника'
    let modalElement;
    const dispatch = createEventDispatcher();


    function closeViaOverlay(e) {
        if (modalElement && !modalElement.contains(e.target)) visible = !visible;
    }

    function closeModal() {
        dispatch("close");
        visible = !visible
    }
    function assignEmployees() {
        selectedFlorists = newSelectedFlorists;
        selectedCouriers = newSelectedCouriers;
        visible = false;
    }

</script>


<style>
    h2{
        font-weight: 600;
        font-size: 18px;
        color: var(--color-main);
        margin-bottom: 20px;
    }

    .buttons {
        display: flex;
        position: absolute;
        bottom: 24px;
        left: 24px;
    }
    .cancel {
        font-size: 15px;
        color: var(--gray-700);
        cursor: pointer;
    }
    .cancel:hover {
        color: var(--color-info);
    }
    h3{
        font-size: 13px;
        color: var(--gray-600);
        margin-bottom: 8px;
        margin-top: 18px;
    }
    p {
        font-weight: normal;
        font-size: 15px;
        color: var(--color-main);
    }


</style>

<ModalSurface css="width: 393px;
height: 424px;
background: var(--color-light);
border: 1px solid var(--gray-300);"
              on:close={closeModal}>
    {#if once}
        <h2 class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" class="mr-8">
                <rect x="1" y="1" width="26" height="26" rx="13" fill="#FFDC00"/>
                <path d="M19 11L12.8462 17L9 13.25" stroke="#330033" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="1" y="1" width="26" height="26" rx="13" stroke="#FFDC00" stroke-width="2"/>
            </svg>
            <div>
                Готово!
            </div>
        </h2>
        {:else}
        <h2 class="flex items-center">
            Назначить сотрудников
        </h2>
    {/if}
    {#if once}
        <p>
            Заказ принят.
            Вы можете назначить флориста и курьера для выполения заказа из списка сотрудников. Вы всегда сможете изменить их позднее
        </p>
    {/if}

    <h3>Флорист</h3>
    <SelectLabel list={florists} bind:select={newSelectedFlorists} size="full"/>
    <h3>Курьер</h3>
    <SelectLabel list={couriers} bind:select={newSelectedCouriers} size="full"/>

    <div class="buttons items-center justify-between">
        <Button size="md" className="mr-12"><span class="whitespace-nowrap" on:click={assignEmployees}>Назначить сотрудников</span></Button>
        <div class="cancel whitespace-nowrap" on:click={closeModal}>Не сейчас</div>
    </div>
</ModalSurface>