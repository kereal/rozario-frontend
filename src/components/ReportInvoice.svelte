<script>
    import CustomCheckbox from "./CustomCheckbox.svelte";
    import TableStrip from "./TableStrip.svelte";
    import Button from "./Button.svelte";
    import { fade } from 'svelte/transition';
    export let invoices;

    let width;
    let allReport = false;
    let sortOrder = false;
    let sortName = false;
    let sortDate = false;
    let selectedSort ='';

    function sortByDate() {
        if (!sortDate) {
            invoices.sort(function (a, b) {
                return a.date - b.date;
            });
            sortDate = !sortDate
        } else {
            invoices.sort(function (a, b) {
                return b.date - a.date;
            });
            sortDate = !sortDate
        }
        selectedSort = 'date'
        invoices = invoices
    }

    function formatDate(date) {
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        let yy = date.getFullYear();
        if (yy < 10) yy = '0' + yy;
        return dd + '.' + mm + '.' + yy;
    }

    function selectAll() {
        if(allReport == true) {
            invoices.forEach((item)=>{
                item.selected = false
            })
        } else {
            invoices.forEach((item)=>{
                item.selected = true;
            })
        }
        invoices = invoices;
    }

    function canceling() {
        invoices.forEach((item)=>{
            item.selected = false
        })
        allReport = false;
        invoices = invoices;
    }
    let counter = 0;
    $: if(invoices) {
        counter = 0;
        invoices.forEach((item)=>{
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
        width: 105px;
    }
    .colDate {
        width: 82px;
    }
    .colSum {
        width: 79px;
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
</style>

<div class="reportTable">
    <div class="reportTable__header flex">
        <div class="flex">
            <div>
                <CustomCheckbox value="allReport"  className="text-main"  id="allReport" label="" bind:check={allReport} on:click={selectAll}/>
            </div>
            <div class="flex items-center colOrder">
                <span>№ накладной </span>
            </div>
        </div>
        <div class="flex items-center  colDate  {selectedSort == 'date' ? 'selectedSort':'textHover'} " on:click={sortByDate}>
            <span>Дата</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                <path d="M9 5L4.99643 1L1 5" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 10L4.99643 14L1 10" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="colSum">
            <span>Сумма</span>
        </div>
    </div>
    <div class="reportTable__body">
        {#each invoices as invoice, i}
            {#if i != 0}
                <hr>
            {/if}
            <div class="reportTable__item flex">
                <div  class="flex">
                    <div>
                        <CustomCheckbox value="invoice{i}"  className="text-main"  id="invoice{i}" label="" bind:check={invoice.selected}/>
                    </div>
                    <div class=" colOrder">
                        <p class="reportTable__maintText"><a class="link-decor" href="#">{invoice.number}</a></p>
                    </div>
                </div>
                <div class="colDate">
                    <p class="reportTable__maintText">{formatDate(invoice.date)}</p>
                </div>
                <div class=" colSum">
                    <span class="reportTable__maintText whitespace-nowrap">
                        <p>{invoice.amount} ₽</p>
                    </span>
                </div>
            </div>
        {/each}
    </div>
</div>

{#if counter > 0}
    <TableStrip>
        <div class="flex items-center">
            <div class="mr-30">
                {#if counter < 2}
                    Выбрана {counter} накладная
                {:else}
                    Выбрано {counter} {counter > 4 ? 'накладных' : 'накладные'}
                {/if}
            </div>
            <div>
                <Button size="lg"><span class="whitespace-nowrap">{counter < 2  ? 'Скачать накладную' : 'Скачать накладные'}</span></Button>
            </div>
            <div class="ml-30">
                <Button size="lg" status="active-secondary" on:click={canceling}><span class="whitespace-nowrap">Сбросить выбор</span></Button>
            </div>
        </div>
    </TableStrip>
{/if}