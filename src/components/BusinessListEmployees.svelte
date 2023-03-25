<script>
    import CustomCheckbox from "./CustomCheckbox.svelte";
    import Button from "./Button.svelte";
    import AddWorker from "./AddWorker.svelte";
    import EditWorker from "./EditWorker.svelte";
    import ConfirmationModal from "./ConfirmationModal.svelte";
    import EditBusinessGroup from "./EditBusinessGroup.svelte";
    import EditSelectedWorkers from "./EditSelectedWorkers.svelte";

    import TableStrip from "./TableStrip.svelte";

    export let listEmployees;
    export let businessAdmin;
    export let businessUser = false;


    let allEmployees = false;
    let addWorker = false;
    let editGroup;

    function selectAll() {
        if (allEmployees == false) {
            listEmployees.forEach((item) => {
                item.listWorkers.forEach((elem) => {
                    elem.selected = true
                })
            })
            allEmployees = true
        } else {
            listEmployees.forEach((item) => {
                item.listWorkers.forEach((elem) => {
                    elem.selected = false
                })
            })
            allEmployees = false
        }
        listEmployees = listEmployees;
    }

    let selectedWorker;
    let selectedWorkers = [];
    let deletingWorker;
    let groupDeleteWorker;
    let editWorkerVisible = false;
    let deleteWorkerVisible = false;
    let editGroupVisible = false;
    let deleteGroupVisible = false;
    let deleteWorkerSelectedVisible = false;
    let editSelectedWorkersVisible = false;

    let admin= false;


    function editWorker(worker) {
        selectedWorker = worker;
        if (worker == businessAdmin) {
            admin = true
        } else {
            admin = false
        }
        editWorkerVisible = true
    }

    function deleteWorker() {
        let indexGroup = listEmployees.findIndex((item) => {
            return item == groupDeleteWorker;
        })
        let indexWorker = listEmployees[indexGroup].listWorkers.findIndex((item) => {
            return item == deletingWorker;
        })
        listEmployees[indexGroup].listWorkers.splice(indexWorker, 1);
        checkEmty()
        listEmployees = listEmployees;
        toggleDeleteWorker()
    }

    function deleteGroup() {
        let index = listEmployees.findIndex((item)=>{
            return item == editGroup;
        })
        listEmployees.splice(index, 1);
        listEmployees = listEmployees;
        deleteGroupVisible = false
    }

    let indexEmty;
    function deleteSelectedWorkers() {

        let Workers = [];
        let indexWorker;
        listEmployees.forEach((item)=>{
           item.listWorkers.forEach((elem)=>{
                if(elem.selected == true) {
                    Workers.push(elem)
                }
            })
        })
        Workers.forEach((item)=>{
            indexWorker = -1;
            listEmployees.forEach((elem) => {
                indexWorker = elem.listWorkers.findIndex((element)=>{
                    return item == element;
                })
                if(indexWorker != -1) {
                    elem.listWorkers.splice(indexWorker, 1);
                }
            })
        })

        checkEmty()
        listEmployees = listEmployees;
        editSelectedWorkersVisible = false;
        toggleDeleteAllSelectedWorker()
    }
    function checkEmty() {
        indexEmty = listEmployees.findIndex((item)=>{
            return item.listWorkers.length == 0
        })
        if(indexEmty != -1) {
            listEmployees.splice(indexEmty, 1)
            listEmployees = listEmployees;
            checkEmty()
        } else {
            return ;
        }

    }
    function toggleAddWorker() {
        addWorker = !addWorker;
    }

    function toggleDeleteWorker() {
        deleteWorkerVisible = !deleteWorkerVisible;
    }

    function toggleDeleteAllSelectedWorker() {
        deleteWorkerSelectedVisible = !deleteWorkerSelectedVisible;
     }

    function toggleEditWorker() {
        editWorkerVisible = !editWorkerVisible;
    }
    function canceling() {
        listEmployees.forEach((item)=>{
            item.listWorkers.forEach((elem)=>{
                elem.selected = false;
            })
        })
        allEmployees = false
        listEmployees = listEmployees
    }
    function toggleEditGroup() {
        editGroupVisible = !editGroupVisible;
    }
    function toggleEditSelectedWorker() {
        editSelectedWorkersVisible = !editSelectedWorkersVisible;
    }
    let counter = 0;
    let listEmpty= false;

    $: if(listEmployees) {
        counter = 0
        selectedWorkers = [];
        listEmployees.forEach((item)=>{
            item.listWorkers.forEach((elem)=>{
                if(elem.selected == true) {
                    selectedWorkers.push(elem)
                    counter++
                }
            })
        })
        if(listEmployees.length == 0) {
            listEmpty = true;
        } else {
            listEmpty= false;
        }
        listEmployees = listEmployees
    }


</script>

<style>
.listEmployees {
    border: 1px solid var(--gray-500);
    box-sizing: border-box;
    border-radius: 2px;
}
.listEmployees__header {
    padding: 17px 24px 15px 24px;
    background-color: #fff;
    border-bottom: 1px solid var(--gray-500);
    font-size: 16px;
    line-height: 130%;
    color: var(--gray-700);
}
.colName {
    width: 155px;
    margin-right: 24px;
}
.colPhone {
    width: 155px;

}
.listEmployees__body_groupName {
    padding: 18px 24px;
    background-color: #F9F9F9;
    font-weight: 600;
    font-size: 18px;
    color: var(--color-main);
}
.listEmployees__body_groupName svg:hover {
    cursor:pointer;
}
.listEmployees__body_groupName svg:hover path{
    fill: var(--color-info);
}
.listEmployees__body_workers {
    padding: 16px 24px;
    background-color: #fff;
    font-size: 16px;
    line-height: 130%;
    color: var(--color-main);
    border-bottom: 1px solid var(--gray-500);
}
.listEmployees__body_workers:last-child {
    border-bottom: none;
}
    .listEmployees__body_icons {
        display: flex;
        width: 60px;
    }
.listEmployees__body_icons svg:hover{
    cursor:pointer;
}
.listEmployees__body_icons .pencil:hover path {
    fill: var(--gray-600);
}
.listEmployees__body_icons .basket:hover path {
    stroke: var(--gray-600);
}

</style>

<div class="listEmployees">
  <div class="listEmployees__header justify-between flex">
      <div class="flex">
          <div class="{!listEmpty ? 'mr-24' : 'mr-40'}">
              {#if !listEmpty}
                  <CustomCheckbox value="allEmployees"  className="text-main"  id="allEmployees" label="" bind:check={allEmployees} on:click={selectAll}/>
              {/if}
          </div>
          <div class="colName">
              <span>
                  Имя
              </span>
          </div>
      </div>
      <div class="colPhone">
          <span>Телефон</span>
      </div>
      <div class="listEmployees__body_icons"></div>
  </div>
    <div class="listEmployees__body">
        <div class="listEmployees__body_workers justify-between flex">
            <div class="flex">
                <div class="mr-40">
                </div>
                <div class="ml-2 colName">
              <span>
                 {businessAdmin.name} (Вы)
              </span>
                </div>
            </div>
            <div class="colPhone">
                <span>{businessAdmin.phone}</span>
            </div>
            <div class="listEmployees__body_icons">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class="pencil" on:click={()=>{editWorker(businessAdmin)}}>
                    <path d="M14.0301 1.48259C12.7387 0.190372 10.6387 0.190372 9.34732 1.48259L0.761729 10.0495C0.694604 10.1165 0.653051 10.2027 0.640265 10.2952L0.00417736 14.9983C-0.0150012 15.1323 0.0329452 15.2663 0.125641 15.3588C0.205552 15.4386 0.317427 15.4864 0.429301 15.4864C0.44848 15.4864 0.467658 15.4864 0.486837 15.4833L3.32526 15.1004C3.56179 15.0685 3.72801 14.8515 3.69604 14.6154C3.66408 14.3793 3.44672 14.2134 3.21019 14.2453L0.934336 14.5516L1.37864 11.2716L4.83717 14.7239C4.91708 14.8036 5.02895 14.8515 5.14083 14.8515C5.2527 14.8515 5.36458 14.8068 5.44449 14.7239L14.0301 6.15693C14.6566 5.53156 15.0018 4.70198 15.0018 3.81817C15.0018 2.93435 14.6566 2.10477 14.0301 1.48259ZM9.51353 2.53552L10.9551 3.97451L3.12069 11.7948L1.6791 10.3558L9.51353 2.53552ZM5.14402 13.8113L3.7344 12.4043L11.5688 4.58393L12.9785 5.99101L5.14402 13.8113ZM13.5794 5.37521L10.1304 1.93248C10.5683 1.57193 11.1149 1.37411 11.6903 1.37411C12.3456 1.37411 12.9593 1.62936 13.4228 2.08882C13.8862 2.54828 14.1388 3.16408 14.1388 3.81817C14.1388 4.39568 13.9406 4.93809 13.5794 5.37521Z" fill="#999999"/>
                </svg>
            </div>
        </div>
        {#each listEmployees as item}
            <div class="listEmployees__body_groupName flex items-center">
                {item.group}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" class="ml-12" on:click={()=>{
                editGroup = item;
                toggleEditGroup();
                }}>
                    <path d="M14.0301 0.969166C12.7387 -0.323055 10.6387 -0.323055 9.34732 0.969166L0.761729 9.53612C0.694604 9.60312 0.653051 9.68927 0.640265 9.7818L0.00417736 14.4848C-0.0150012 14.6189 0.0329452 14.7529 0.125641 14.8454C0.205552 14.9252 0.317427 14.973 0.429301 14.973C0.44848 14.973 0.467658 14.973 0.486837 14.9698L3.32526 14.5869C3.56179 14.555 3.72801 14.3381 3.69604 14.102C3.66408 13.8659 3.44672 13.6999 3.21019 13.7318L0.934336 14.0382L1.37864 10.7581L4.83717 14.2105C4.91708 14.2902 5.02895 14.3381 5.14083 14.3381C5.2527 14.3381 5.36458 14.2934 5.44449 14.2105L14.0301 5.6435C14.6566 5.01813 15.0018 4.18855 15.0018 3.30474C15.0018 2.42092 14.6566 1.59135 14.0301 0.969166ZM9.51353 2.02209L10.9551 3.46108L3.12069 11.2814L1.6791 9.84242L9.51353 2.02209ZM5.14402 13.2979L3.7344 11.8908L11.5688 4.0705L12.9785 5.47758L5.14402 13.2979ZM13.5794 4.86178L10.1304 1.41905C10.5683 1.05851 11.1149 0.860684 11.6903 0.860684C12.3456 0.860684 12.9593 1.11594 13.4228 1.57539C13.8862 2.03485 14.1388 2.65065 14.1388 3.30474C14.1388 3.88225 13.9406 4.42466 13.5794 4.86178Z" fill="#330033"/>
                </svg>
            </div>
            {#each item.listWorkers as worker, i}
                <div class="listEmployees__body_workers justify-between flex">
                    <div class="flex">
                        <div class="mr-24">
                            <CustomCheckbox value="{worker.name + i}"  className="text-main"  id="{worker.name + i}" label="" bind:check={worker.selected}/>
                        </div>
                        <div class="colName">
              <span>
                 {worker.name}
              </span>
                        </div>
                    </div>
                    <div class="colPhone">
                        <span>{worker.phone}</span>
                    </div>
                    <div class="listEmployees__body_icons">
                        <div class=" mr-24">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class="pencil" on:click={()=>{
                            editWorker(worker)
                            }}>
                                <path d="M14.0301 1.48259C12.7387 0.190372 10.6387 0.190372 9.34732 1.48259L0.761729 10.0495C0.694604 10.1165 0.653051 10.2027 0.640265 10.2952L0.00417736 14.9983C-0.0150012 15.1323 0.0329452 15.2663 0.125641 15.3588C0.205552 15.4386 0.317427 15.4864 0.429301 15.4864C0.44848 15.4864 0.467658 15.4864 0.486837 15.4833L3.32526 15.1004C3.56179 15.0685 3.72801 14.8515 3.69604 14.6154C3.66408 14.3793 3.44672 14.2134 3.21019 14.2453L0.934336 14.5516L1.37864 11.2716L4.83717 14.7239C4.91708 14.8036 5.02895 14.8515 5.14083 14.8515C5.2527 14.8515 5.36458 14.8068 5.44449 14.7239L14.0301 6.15693C14.6566 5.53156 15.0018 4.70198 15.0018 3.81817C15.0018 2.93435 14.6566 2.10477 14.0301 1.48259ZM9.51353 2.53552L10.9551 3.97451L3.12069 11.7948L1.6791 10.3558L9.51353 2.53552ZM5.14402 13.8113L3.7344 12.4043L11.5688 4.58393L12.9785 5.99101L5.14402 13.8113ZM13.5794 5.37521L10.1304 1.93248C10.5683 1.57193 11.1149 1.37411 11.6903 1.37411C12.3456 1.37411 12.9593 1.62936 13.4228 2.08882C13.8862 2.54828 14.1388 3.16408 14.1388 3.81817C14.1388 4.39568 13.9406 4.93809 13.5794 5.37521Z" fill="#999999"/>
                            </svg>
                        </div>
                        <div on:click={
                        ()=>{
                            groupDeleteWorker = item;
                            deletingWorker = worker;
                            toggleDeleteWorker()
                        }
                        }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none" class="basket">
                                <path d="M2.38672 4.1438H15.6158" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14.3237 4.1438V15.0159C14.3237 15.7002 13.7155 16.3084 13.0313 16.3084H4.97218C4.28792 16.3084 3.67969 15.7002 3.67969 15.0159V4.1438" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6.11328 3.99158C6.11328 2.54703 6.87357 1.33057 7.78592 1.33057H10.2188C11.1312 1.33057 11.8915 2.54703 11.8915 3.99158" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7.48047 7.64111V12.2789" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10.5215 7.64111V12.2789" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
            {/each}
        {/each}
    </div>
</div>
<Button size="full" className="mt-24" status="{businessUser == false ? 'disabled-main' : 'active-main'}" on:click={toggleAddWorker}>Добавить сотрудника</Button>

{#if counter > 0}
<TableStrip>
    <div class="flex items-center">
        <div class="mr-30">
            {#if counter < 2}
                Выбран {counter} сотрудник
            {:else}
                Выбрано {counter} {counter > 4 ? 'сотрудников' : 'сотрудника'}
            {/if}
        </div>
        <div>
            <Button size="lg" on:click={toggleEditSelectedWorker}>Редактировать</Button>
        </div>
        <div class="ml-30">
            <Button size="lg" status="active-secondary" on:click={canceling}><span class="whitespace-nowrap">Сбросить выбор</span></Button>
        </div>
    </div>
</TableStrip>
{/if}

{#if addWorker}
    <AddWorker bind:listEmployees={listEmployees} on:close={toggleAddWorker}/>
{/if}
{#if editWorkerVisible}
    <EditWorker bind:listEmployees={listEmployees} worker={selectedWorker} {admin} on:close={toggleEditWorker}/>
{/if}
{#if editSelectedWorkersVisible}
<EditSelectedWorkers bind:listEmployees={listEmployees} workers={selectedWorkers} on:delete={toggleDeleteAllSelectedWorker} on:close={toggleEditSelectedWorker}/>
{/if}
{#if deleteWorkerVisible}
    <ConfirmationModal
            title = 'Удаление сотрудника'
            text="После удаления сотрудник не сможет оплачивать заказы с вашего расчётного счёта.
Вы действительно хотите удалить этого сотрудника из списка?"
            confirmText="Да"
            cancelText="Нет"
            normalButton={true}
            on:confirm={deleteWorker}
            on:close={toggleDeleteWorker} />
{/if}
{#if editGroupVisible}
    <EditBusinessGroup bind:group={editGroup} bind:deleteGroup={deleteGroupVisible} bind:listEmployees={listEmployees} on:close={toggleEditGroup}/>
{/if}
{#if deleteGroupVisible}
    <ConfirmationModal
            title = 'Удаление группы'
            text="Будут удалены все сотрудники группы Продажи. Они больше не смогут оплачивать заказы с вашего расчётного счёта.
Вы действительно хотите удалить эту группу из списка?"
            confirmText="Да"
            cancelText="Нет"
            normalButton={true}
            on:confirm={deleteGroup}
            on:close={toggleEditGroup} />
{/if}
{#if deleteWorkerSelectedVisible}
    <ConfirmationModal
            title = 'Удаление сотрудников'
            text="После удаления сотрудники не смогут оплачивать заказы с вашего расчётного счёта.
Вы действительно хотите удалить этих сотрудников из списка?"
            confirmText="Да"
            cancelText="Нет"
            normalButton={true}
            on:confirm={deleteSelectedWorkers}
            on:close={toggleDeleteAllSelectedWorker} />
{/if}
