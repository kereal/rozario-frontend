<script>
    import CustomCheckbox from "./CustomCheckbox.svelte";
    import TableStrip from "./TableStrip.svelte";
    import Button from "./Button.svelte";
    import { fade } from 'svelte/transition';
    export let accounts;

    let width;
    let allReport = false;
    let details = false;
    let sortOrder = false;
    let sortName = false;
    let sortDate = false;
    let selectedSort ='';



    function formatDate(date) {
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        let yy = date.getFullYear();
        if (yy < 10) yy = '0' + yy;
        return dd + '.' + mm + '.' + yy;
    }
    function sortByDateOrder() {
        if (!sortDate) {
            accounts.sort(function (a, b) {
                return a.issued - b.issued;
            });
            sortDate = !sortDate
        } else {
            accounts.sort(function (a, b) {
                return b.issued - a.issued;
            });
            sortDate = !sortDate
        }
        accounts = accounts
        selectedSort = 'sortByDateOrder'
    }
    function sortByDate() {
        if (!sortOrder) {
            accounts.sort(function (a, b) {
                return a.paymentDate - b.paymentDate;
            });
            sortOrder = !sortOrder
        } else {
            accounts.sort(function (a, b) {
                return b.paymentDate - a.paymentDate;
            });
            sortOrder = !sortOrder
        }
        accounts = accounts
        selectedSort = 'sortByDate'
    }
    function selectAll() {
        if(allReport == true) {
            accounts.forEach((item)=>{
                item.selected = false
            })
        } else {
            accounts.forEach((item)=>{
                item.selected = true;
            })
        }
        accounts = accounts;
    }

    function canceling() {
        accounts.forEach((item)=>{
            item.selected = false
        })
        allReport = false;
        accounts = accounts;
    }
    let counter = 0;
    $: if(accounts) {
        counter = 0;
        accounts.forEach((item)=>{
            if(item.selected == true) {
                counter++
            }
        })
    }
</script>

<svelte:window bind:innerWidth={width}/>

<style>
    .reportTable {
        width: 100%;
        background: #FFFFFF;
        border: 1px solid var(--gray-500);
        box-sizing: border-box;
        border-radius: 4px;
        margin-top: 24px;
    }
    .reportTable__header {
        border-bottom: 1px solid var(--gray-500);
        padding: 17px 24px 15px 24px;
        font-size: 15px;
        color: var(--gray-700);
    }
    .colOrder {
        width: 121px;
    }
    .colSum {
        width: 79px;
    }
    .colExposed {
        width: 100px;
    }
    .colDate {
        width: 131px;
    }
    .colMethod {
        width: 139px;
    }
    .colWaybills {
        width: 94px;
    }
    .selectedSort {
        color: var(--gray-600);
        stroke: var(--gray-600);
    }
    .selectedSort path{
        stroke: var(--gray-600);
    }
    .selectedSort:hover {
        cursor: pointer;
        color: var(--color-main);
        stroke: var(--color-main);
    }
    .selectedSort:hover path{
        stroke: var(--color-main);
    }
    .reportTable__header div{
        margin-right: 24px;
    }
    .reportTable__header div:last-child{
        margin-right: 0;
    }
    .reportTable__header svg{
        margin-left: 8px;
    }
    .reportTable__body {
        padding: 0 24px;
    }
    .reportTable__item {
        padding: 16px 0 16px 0;
    }
    .reportTable__item div{
        margin-right: 24px;
    }
    .reportTable__item div:last-child{
        margin-right: 0;
    }
    .reportTable__maintText {
        font-size: 15px;
        color: var(--color-main);
    }
    .reportTable__subText {
        font-size: 14px;
        color: var(--gray-600);
    }

    .textHover:hover {
        color:var(--gray-600);
        cursor: pointer;
    }
    .textHover:hover path{
        stroke:var(--gray-600);
    }
    .textHover:hover circle{
        stroke:var(--gray-600);
    }
    .text-red {
        color: #E81717;
    }
    @keyframes animate {
        from {
            max-height: 0;
        }
        to {
            max-height: 500px;
            overflow:auto
        }
    }
    .link-decor {
        position: relative;
        cursor: pointer;
        line-height: 1;
        text-decoration: none;

    }
    .link-decor:after {
        display: block;
        position: absolute;
        left: 0;
        width: 0;
        height: 1px;
        background-color: var(--color-main);
        content: "";
        transition: width 0.3s ease-out;
    }

    .link-decor:hover:after,
    .link-decor:focus:after {
        width: 100%;
    }
    .sublink-decor {
        position: relative;
        cursor: pointer;
        line-height: 1;
        text-decoration: none;

    }
    .sublink-decor:after {
        display: block;
        position: absolute;
        left: 0;
        width: 0;
        height: 1px;
        background-color: var(--gray-600);
        content: "";
        transition: width 0.3s ease-out;
    }

    .sublink-decor:hover:after,
    .sublink-decor:focus:after {
        width: 100%;
    }

    .rotated {
        transition: transform 0.2s linear;
        transform: rotate(180deg);
        transform-origin: center;
    }

    @media (max-width: 1300px) {
        .colDate {
            width: 179px;
        }
    }
    @media (max-width: 1048px) {
        .colOrder {
            width: 115px;
        }
    }
</style>

<div class="reportTable">
    <div class="reportTable__header flex justify-between">
        <div class="flex">
            <div>
                <CustomCheckbox value="allReport"  className="text-main"  id="allReport" label="" bind:check={allReport} on:click={selectAll}/>
            </div>
            <div class="flex items-center colOrder">
                <span>{width > 1048 ? '№ счёта':'№ счёта, накладные'}</span>
            </div>
        </div>
            <div class="colSum">
                <span>{width > 1048 ? 'Сумма':'Сумма, выставлен'}</span>
            </div>
        {#if width > 1048}
            <div class="flex items-center  colExposed  {selectedSort == 'date' ? 'selectedSort':'textHover'}" on:click={sortByDateOrder}>
                <span>Выставлен</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                    <path d="M9 5L4.99643 1L1 5" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 10L4.99643 14L1 10" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        {/if}
        <div class="flex items-center  colDate  {selectedSort == 'date' ? 'selectedSort':'textHover'}" on:click={sortByDate}>
            <span>{width > 1300 ? 'Дата оплаты':'Дата и способ оплаты'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                <path d="M9 5L4.99643 1L1 5" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 10L4.99643 14L1 10" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        {#if width > 1300}
            <div class="flex items-center colMethod">
                <span>Способ оплаты</span>
            </div>
        {/if}
        {#if width > 1048}
            <div class="flex items-center colWaybills">
                <span>Накладные</span>
            </div>
        {/if}
    </div>
    <div class="reportTable__body">
        {#each accounts as account, i}
            {#if i != 0}
                <hr>
            {/if}
            <div class="reportTable__item flex justify-between">
                <div  class="flex">
                    <div>
                        <CustomCheckbox value="account{i}"  className="text-main"  id="account{i}" label="" bind:check={account.selected}/>
                    </div>
                    <div class=" colOrder">
                        <p class="reportTable__maintText"><a class="link-decor" href="#">{account.number}</a></p>
                        {#if width < 1048}
                            <p class="reportTable__subText"><a class="sublink-decor" href="#">{account.overhead}</a></p>
                        {/if}
                       </div>
                </div>
                <div class=" colSum">
                    <span class="reportTable__maintText whitespace-nowrap">
                        <p>{account.summa} ₽</p>
                        {#if width < 1048}
                            <p class="reportTable__subText">{formatDate(account.issued)}</p>
                        {/if}
                    </span>
                </div>
                {#if width > 1048}
                    <div class=" colExposed">
                    <span class="reportTable__maintText">
                        {formatDate(account.issued)}
                    </span>
                    </div>
                {/if}
                <div class="colDate">
                    {#if account.paymentDate != ''}
                        <p class="reportTable__maintText">{formatDate(account.paymentDate)}</p>
                        {:else}
                        <p class="text-red">Ожидает оплаты</p>
                    {/if}
                    {#if  width < 1301}
                        <p class="reportTable__subText">{account.method}</p>
                    {/if}
                </div>
                {#if width > 1300}
                    <div class="colMethod">
                        <p class="reportTable__maintText">{account.method}</p>
                    </div>
                {/if}
                {#if width > 1048}
                    <div class="colWaybills">
                        <p class="reportTable__maintText"><a class="link-decor" href="#">{account.overhead}</a></p>
                    </div>
                {/if}
                </div>
        {/each}
    </div>
    </div>

{#if counter > 0}
    <TableStrip>
        <div class="flex items-center">
            <div class="mr-30">
                {#if counter < 2}
                    Выбран {counter} счет
                {:else}
                    Выбрано {counter} {counter > 4 ? 'счётов' : 'счёта'}
                {/if}
            </div>
            <div>
                <Button size="lg"><span class="whitespace-nowrap">Скачать счета</span></Button>
            </div>
            <div class="ml-30">
                <Button size="lg" status="active-secondary" on:click={canceling}><span class="whitespace-nowrap">Сбросить выбор</span></Button>
            </div>
        </div>
    </TableStrip>
{/if}