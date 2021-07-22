<script>
    import ModalSurface from './ModalSurface.svelte'
    import CustomCheckbox from "./CustomCheckbox.svelte";
    import Button from "./Button.svelte";
    export let listOrder;
    export let visible;

    let modalElement;
    function closeViaOverlay(e) {
        if (modalElement && !modalElement.contains(e.target)) visible = !visible;
    }

    function closeModal() {
        visible = !visible
    }
    let summ = 0
    $: if (listOrder) {
        listOrder.forEach((item)=>{
            if(item.check == true) {
                summ = summ + +item.summ
            }
        })
    }
</script>
<style>
    .modal-overlay {
        z-index: 1000;
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
    }
    .modal {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        @apply p-24;
    }
    .close-button {
        top: 14px;
        right: 14px;
        @apply absolute;
        z-index:11;
    }
    h2{
        font-weight: 600;
        font-size: 18px;
        color: var(--color-main);
        margin-bottom: 24px;
    }
    h3 {
        font-weight: 600;
        font-size: 16px;
        color: var(--color-main);
    }
    .subText {
        font-size: 13px;
        color: var(--gray-600);
    }
    .price {
        font-weight: 600;
        font-size: 15px;
        color: var(--color-main);
    }
    .passivPrice {
        font-size: 15px;
        color: var(--gray-600);
    }
    .button {
        position:absolute;
        bottom: 24px;
        left:24px;
    }

</style>
<ModalSurface css="width: 400px;
height: 555px;
background: var(--color-light);
border: 1px solid var(--gray-300);"
              on:close={closeModal}>
    <h2>Вывод денег на расчётный счёт</h2>
    <div class="subText">Сумма вывода</div>
    <div class="price mt-6">{summ} ₽</div>
    <h3 class="mt-30">Заказы</h3>
    {#each listOrder as item}
        <div class="item flex justify-between mt-24 first:mt-18">
            <div class="flex items-center">
                <CustomCheckbox  style="font-size: 15px;"
                                 className="text-main"
                                 id="{item.number}"
                                 label="№ {item.number}"
                                 bind:check = {item.check}/>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="ml-8">
                    <rect width="18" height="18" fill="white"/>
                    <path d="M1.5 1.875C1.5 1.10827 2.10997 0.5 2.84615 0.5H7.54709C7.94895 0.5 8.334 0.661244 8.61594 0.947594L12.0688 4.45445C12.3451 4.73506 12.5 5.11306 12.5 5.50686V13.125C12.5 13.8917 11.89 14.5 11.1538 14.5H2.84615C2.10997 14.5 1.5 13.8917 1.5 13.125V1.875Z" stroke="#CC6699"/>
                    <path d="M12.5 5H8.6C7 5 7 3.8 7 3.4V1" stroke="#CC6699"/>
                    <circle cx="11" cy="12" r="3.5" fill="white" stroke="#CC6699"/>
                    <path d="M15.6437 17.3503C15.8371 17.5474 16.1537 17.5502 16.3507 17.3567C16.5477 17.1632 16.5506 16.8466 16.3571 16.6496L15.6437 17.3503ZM13.404 15.0701L15.6437 17.3503L16.3571 16.6496L14.1175 14.3694L13.404 15.0701Z" fill="#CC6699"/>
                </svg>
            </div>
            <div class="{item.check == true? 'price':'passivPrice'}">{item.summ} ₽</div>
        </div>
    {/each}
    <div class="button">
        <Button size="lg" on:click={closeModal}>Вывести деньги</Button>
    </div>

</ModalSurface>