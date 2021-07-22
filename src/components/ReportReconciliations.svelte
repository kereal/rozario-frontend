<script>
    import CustomCheckbox from "./CustomCheckbox.svelte";
    import { fade } from 'svelte/transition';
    import Button from "./Button.svelte";
    import DateInput from "./DateInput.svelte";

    export let reconciliations ;

    let width;
    let allReport = false;
    let sortOrder = false;
    let sortDateOrder = false;
    let sortDate = false;
    let selectedSort ='';
    let sumDebit = 0;
    let visibleTable = false;
    let notFound = false;
    let sumCredit = 0;
    let  FromDate;
     let BeforeDate;
    reconciliations.forEach((item)=>{
        sumDebit = sumDebit + item.debit
        sumCredit = sumCredit + item.credit
    })


    function sortByDate() {
        if (!sortDate) {
            reconciliations.sort(function (a, b) {
                return a.date - b.date;
            });
            sortDate = !sortDate
        } else {
            reconciliations.sort(function (a, b) {
                return b.date - a.date;
            });
            sortDate = !sortDate
        }
        selectedSort = 'date'
        reconciliations = reconciliations
    }
    function sortByDateOrder() {
        if (!sortDateOrder) {
            reconciliations.sort(function (a, b) {
                return a.dateOrder - b.dateOrder;
            });
            sortDateOrder = !sortDateOrder
        } else {
            reconciliations.sort(function (a, b) {
                return b.dateOrder - a.dateOrder;
            });
            sortDateOrder = !sortDateOrder
        }
        reconciliations = reconciliations
        selectedSort = 'sortByDateOrder'
    }
    function visibleElements() {
        if (!visibleTable) {
            if(notFound) {
                visibleTable = true
                notFound = false
            } else {
                notFound = true
            }
        }
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

    function handleInvalid(e) {
        e.preventDefault();
        validateFormInput(e);
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
    .dateOrder {
        width: 105px;
    }
    .ActsAndPayment {
        width: 101px;
    }
    .date {
        width: 82px;
    }
    .debit {
        width: 88px;
    }
    .credit {
        width: 88px;
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
    .reportTable__footer {
        border-top: 1px solid var(--gray-500);
        height: 55px;
        padding: 0 24px;
    }
    .selectPeriod {
        width: 160px;
    }
    .selectPeriod__text {
        display: block;
        font-size: 13px;
        margin-bottom: 8px;
        color: var(--gray-600);
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
    h2 {
        font-weight: 600;
        font-size: 16px;
        color: var(--color-main);
        margin-top: 24px;
        margin-bottom: 14px;
    }
    .buttonCalc {
        margin-top: 40px;
        margin-bottom: 40px;
    }
    @media (max-width: 1300px) {
        .colOrder {
            width: 142px;
        }
        .buttonCalc {
            margin-top: 34px;
            margin-top: 34px;
        }
    }
    @media (max-width: 1048px) {
        .ActsAndPayment {
            width: 156px;
        }
    }
</style>

<h2>Выберите период</h2>

<div class="flex">
    <div class="selectPeriod mr-24">
        <span class="selectPeriod__text">От</span>
        <div>
              <DateInput
              required={true}
              name="date"
              on:invalid={handleInvalid}
              className="w-full text-main placeholder-input"
              bind:value={FromDate}
              min = {new Date(2011, 0, 1)}
              max = {new Date()}
              id="cart-date-input" />
        </div>
    </div>
    <div class="selectPeriod">
        <span class="selectPeriod__text">До</span>
        <div>
                       <DateInput
              required={true}
              name="date"
              on:invalid={handleInvalid}
              className="w-full text-main placeholder-input"
              bind:value={BeforeDate}
              id="cart-date-input" />
        </div>
    </div>
</div>

<div class="buttonCalc">
    <Button size="lg" on:click={visibleElements}>
        Вывести
    </Button>
</div>

{#if notFound}
   <p class="reportTable__maintText text-lg mt-40">Не найдено документов за выбранный период. Попробуйте выбрать другие даты.</p>
{/if}
{#if visibleTable}
    <div class="reportTable">
        <div class="reportTable__header flex justify-between">
            <div class="flex items-center colOrder">
                <span> {width > 1300 ? '№ накладной' : '№ и дата счёта'}</span>
                {#if width < 1301}
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                        <path d="M9 5L4.99643 1L1 5" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 10L4.99643 14L1 10" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                {/if}
            </div>
            {#if width > 1300}
                <div class="flex items-center dateOrder {selectedSort == 'sortByDateOrder' ? 'selectedSort':'textHover'}" on:click={sortByDateOrder}>
                    <span>Дата счёта</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                        <path d="M9 5L4.99643 1L1 5" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 10L4.99643 14L1 10" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            {/if}
            <div class="flex items-center ActsAndPayment">
                <span>{width > 1048 ? 'Акты/Оплата' : 'Акты/Оплата, дата'}</span>
                {#if width < 1048}
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                        <path d="M9 5L4.99643 1L1 5" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 10L4.99643 14L1 10" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                {/if}
            </div>
            {#if width > 1048}
                <div class="flex items-center date {selectedSort == 'date' ? 'selectedSort':'textHover'}" on:click={sortByDate}>
                    <span>Дата  </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                        <path d="M9 5L4.99643 1L1 5" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 10L4.99643 14L1 10" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            {/if}
            <div class="flex items-center debit justify-end">
                <span class=" text-right">Дебет</span>
            </div>
            <div class="flex items-center credit  justify-end">
                <span class=" text-right">Кредит</span>
            </div>
        </div>
        <div class="reportTable__body">
            {#each reconciliations as reconciliation, i}
                {#if i != 0}
                    <hr>
                {/if}
                <div class="reportTable__item flex justify-between">
                    <div class=" colOrder">
                        <p class="reportTable__maintText"><a class="link-decor" href="#">{reconciliation.number}</a></p>
                        {#if width < 1301}
                            <p class="reportTable__subText">{formatDate(reconciliation.dateOrder)}</p>
                        {/if}
                    </div>
                    {#if width > 1300}
                        <div class="dateOrder">
                            <p class="reportTable__maintText">{formatDate(reconciliation.dateOrder)}</p>
                        </div>
                    {/if}

                    <div class="ActsAndPayment">
                        <p class="reportTable__maintText">{reconciliation.ActsAndPayment}</p>
                        {#if width < 1048}
                            <p class="reportTable__subText">{formatDate(reconciliation.date)}</p>
                        {/if}
                    </div>
                    {#if width > 1048}
                        <div class="date">
                            <p class="reportTable__maintText">{formatDate(reconciliation.date)}</p>
                        </div>
                    {/if}

                    <div class="debit">
                        <p class="reportTable__maintText text-right">{reconciliation.debit}</p>
                    </div>
                    <div class="credit">
                        <p class="reportTable__maintText text-right">{reconciliation.credit}</p>
                    </div>
                </div>
            {/each}
        </div>
        <div class="reportTable__footer text-right items-center">
            <div class="flex items-center justify-end mt-16">
                <div class="date reportTable__subText mr-24">Итого:</div>
                <div class="debit reportTable__maintText mr-24">{sumDebit.toFixed(2)}</div>
                <div class="credit reportTable__maintText">{sumCredit.toFixed(2)}</div>
            </div>
        </div>
    </div>
    <Button size="full" className="mt-24">Скачать акт</Button>
{/if}
