<script>
    import ModalSurface from './ModalSurface.svelte'
    import SelectLabel from "./SelectLabel.svelte"
    import Button from "./Button.svelte";
    import { createEventDispatcher } from "svelte";

    export let visible;
    let modalElement;
    let textElement;
    let otherReason;
    const dispatch = createEventDispatcher();

    let selectedReason = 'Выберите причину'
    let reasons = ['Нет нужных цветов',
    'Не устраивает расчёт стоимости',
    'Магазин временно не работает',
    'Магазин закрыт навсегда',
    'Другая причина']

    function closeViaOverlay(e) {
        if (modalElement && !modalElement.contains(e.target)) visible = !visible;
    }

    function closeModal() {
        dispatch("close");
        visible = !visible
    }
    $:if(selectedReason) {
        if(selectedReason == 'Другая причина') {
            setTimeout(()=>{textElement.focus()}, 100)
        }
    }
</script>


<style>
    h2{
        font-weight: 600;
        font-size: 18px;
        color: var(--color-main);
        margin-bottom: 24px;
    }
    
    .buttons {
        display: flex;
        position: absolute;
        bottom: 24px;
        left: 24px;
    }
    h3{
        font-size: 14px;
        color: var(--gray-600);
        margin-bottom: 8px;
        margin-top: 24px;
    }
    .textarea {
        width: 100%;
        height: 83px;
        background: var(--color-light);
        border: 1px solid var(--gray-500);
        box-sizing: border-box;
        border-radius: 4px;
        padding: 12px 16px;
        font-size: 15px;
        line-height: 135%;
        color: var(--color-main);
        resize: none;
        overflow-y: auto;
    }
    .textarea:focus {
        border: 1px solid var(--color-info-light);
    }


</style>

<ModalSurface css="width: 500px;
height: 343px;
background: var(--color-light);
border: 1px solid var(--gray-300);"
on:close={closeModal}>
    <h2>Выберите причину отказа:</h2>
        <SelectLabel list={reasons} bind:select={selectedReason} size="full"/>
    {#if selectedReason == 'Другая причина'}
        <h3>Укажите причину отказа:</h3>
        <p contenteditable="true" bind:innerHTML={otherReason} bind:this={textElement}  class="textarea"></p>
    {/if}
        <div class="buttons">
            <Button size="lg" status="{selectedReason == 'Выберите причину'? 'disabled-main':'active-secondary'}" className="mr-24">Отклонить заказ</Button>
            <Button size="lg" on:click={closeModal}>Не отклонять</Button>
        </div>
</ModalSurface>