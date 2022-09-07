<script>

 import IconButton from "./IconButton.svelte";
 import TelInput from "./TelInput.svelte";
 import Select from "./Select.svelte";
 //import AddWorker from "./AddWorker.svelte";
 import { fade } from "svelte/transition";
 import Button from "./Button.svelte";
 import { createEventDispatcher } from "svelte";


 export let listEmployees;
 export let fixedGroup = false;
let groups = ['Новая группа'];

 if (fixedGroup == false) {
     groups = ['Новая группа'];
 } else {
     groups = [];
 }

 listEmployees.forEach((item)=>{
     groups.push(item.group)
 })
 let editBlock;
 let group ='';
 let modalElement;
 let newWorker={
     group:'',
     name:'',
     phone:''
 };
 let trueDate;

 const dispatch = createEventDispatcher();

 function scrollDown(e) {
     console.log('scroll')
     e.preventDefault();
     const editBlockBCR = editBlock.getBoundingClientRect();
     const selectBCR = e.detail.ref
             .closest(".custom-select")
             .getBoundingClientRect();
     console.log(selectBCR.top, editBlockBCR.bottom)

     if (selectBCR.top + 161 > editBlockBCR.bottom) {

         let i = 0;
         const prevTop = editBlock.scrollTop;
         const intervalId = setInterval(() => {
             editBlock.scrollTop += i;
             i += 3;
             console.log(prevTop, editBlock.scrollTop)

             if (prevTop + 120 <= editBlock.scrollTop) {
                 console.log('clear')
                 clearInterval(intervalId);
             }
         }, 16);
     }
 }
 let focused = false;

 function addWorker(){
     let index = listEmployees.findIndex((item)=>{
         return item.group == newWorker.group;
     })
    if (index == -1) {
        let newGroup = {
            group: newWorker.group,
            listWorkers: [{
                name: newWorker.name,
                phone: newWorker.phone,
                select: false
            }]
        }
        listEmployees.push(newGroup)
    } else {
        let newMan = {
            name: newWorker.name,
            phone: newWorker.phone,
            select: false
        }
        listEmployees[index].listWorkers.push(newMan)
    }

     listEmployees = listEmployees
 dispatch("close");
 }

 function onFocus() {
     console.log("focus", focused);

     focused = true;
 }
 function closeModal() {
     dispatch("close");
 }
 function closeViaOverlay(e) {
     if (modalElement && !modalElement.contains(e.target)) dispatch("close");
 }

    $: if(newWorker) {
     if(newWorker.name != '' && newWorker.phone != '' && newWorker.group != '') {
         trueDate = true;
     } else {
         trueDate = false;
     }
 }
 $: if(group) {
        if(group != 'Новая группа') {
            newWorker.group = group;
        }
 }
</script>

<style>
.overlay {
    z-index: 1000;
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
}
.modal {
    width: 400px;
    height: 465px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @apply rounded;
    background: #FFFFFF;
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    z-index: 999999;
    font-size: 15px;
    line-height: 135%;
    color: var(--color-main);
    overflow: hidden;
    padding: 24px;
}
.close-button {
    top: 14px;
    right: 14px;
    @apply absolute;
    z-index:11;
}
h2 {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 18px;
    color: var(--color-main);
}
h3 {
    font-size: 13px;
    line-height: 120%;
    color: var(--gray-600);
    margin-bottom: 8px;
}
input{
    background: #FFFFFF;
    border: 1px solid var(--gray-500);
    box-sizing: border-box;
    border-radius: 4px;
    color: var(--color-main);
    font-size: 15px;
    height: 35px;
    padding: 0 12px;
    width: 100%;
}
input:focus{
    background: #FFFFFF;
    border: 1px solid var(--color-info);
}
    .saveButton {
        position: absolute;
        left:24px;
        bottom:24px;
    }
</style>

<div transition:fade on:click={closeViaOverlay} class="overlay">
    <div
            bind:this={modalElement}
            class="modal relative bg-white h-full rounded ">
        <div class="close-button">
            <IconButton on:click={closeModal}  status="close" />
        </div>
        <h2>Добавление сотрудника</h2>
        <div>
            <h3>Имя</h3>
            <input type="text" bind:value={newWorker.name}>
        </div>
        <div class="mt-18 mb-18">
            <h3>Номер телефона</h3>
            <TelInput
                    name="phone"
                    id="cart-form-phone"
                    className="w-full"
                    bind:value={newWorker.phone} />
        </div>
        <div class="mb-18">
            <h3>Группа</h3>
            <Select
                    id="workersGroup"
                    placeholder="Выберите группу"
                    required={true}
                    name="workersGroup"
                    on:click={scrollDown}
                    on:focus={onFocus}
                    size="sm"
                    bind:title={group}
                    items={groups}/>
        </div>
        {#if  group =='Новая группа'}
            <div transition:fade>
                <h3>Введите название новой группы</h3>
                <input type="text" bind:value={newWorker.group}>
            </div>
        {/if}
        <div class="saveButton">
            <Button size="lg" status={trueDate == false ? 'disabled-main' : 'active-main'} on:click={addWorker}>Сохранить</Button>
        </div>

    </div>
</div>