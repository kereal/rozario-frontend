<script>
    import CustomCheckbox from "./CustomCheckbox.svelte";
    import TableStrip from "./TableStrip.svelte";
    import Button from "./Button.svelte";

    import { fade } from 'svelte/transition';
    export let orders;
    let width;
    let details = false;
    let sortOrder = false;
    let sortName = false;
    let sortDate = false;
    let selectedSort ='';

    function sortByOrder() {
        if (!sortOrder) {
            orders.report.sort(function (a, b) {
                if (a.status > b.status) {
                    return 1;
                }
                if (a.status < b.status) {
                    return -1;
                }
                return 0;
            });
            sortOrder = !sortOrder
        } else {
            orders.report.sort(function (a, b) {
                if (b.status > a.status) {
                    return 1;
                }
                if (b.status < a.status) {
                    return -1;
                }
                return 0;
            });
            sortOrder = !sortOrder
        }
        selectedSort = 'order'
        orders.report = orders.report
    }

    function sortByName() {
        if (!sortName) {
            orders.report.sort(function (a, b) {
                if (a.employee > b.employee) {
                    return 1;
                }
                if (a.employee < b.employee) {
                    return -1;
                }
                return 0;
            });
            sortName = !sortName
        } else {
            orders.report.sort(function (a, b) {
                if (b.employee > a.employee) {
                    return 1;
                }
                if (b.employee < a.employee) {
                    return -1;
                }
                return 0;
            });
            sortName = !sortName
        }
        selectedSort = 'name'
        orders.report = orders.report
    }

    function sortByDate() {
        if (!sortDate) {
            orders.report.sort(function (a, b) {
                return a.date - b.date;
            });
            sortDate = !sortDate
        } else {
            orders.report.sort(function (a, b) {
                return b.date - a.date;
            });
            sortDate = !sortDate
        }
        selectedSort = 'date'
        orders.report = orders.report
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
        if(orders.allReport == true) {
            orders.report.forEach((item)=>{
                item.selected = false
            })
        } else {
            orders.report.forEach((item)=>{
                item.selected = true;
            })
        }
    }
    function canceling() {
        orders.report.forEach((item)=>{
            item.selected = false
        })
        orders.allReport = false;
        orders = orders;
    }
    let counter = 0;
    $: if(orders) {
        counter = 0;
        orders.report.forEach((item)=>{
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
        width: 155px;
    }
    .colDate {
        width: 82px;
    }
    .colSum {
        width: 79px;
    }
    .colWorker {
        width: 150px;
    }
    .colphone {
        width: 129px;
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
    .reportTable__document:hover path {
        cursor: pointer;
        stroke: var( --color-info-light);
    }
    .reportTable__document:hover circle {
        cursor: pointer;
        stroke: var( --color-info-light);
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

    @keyframes animate {
        from {
            max-height: 0;
        }
        to {
            max-height: 500px;
            overflow:auto
        }
    }
    .details {
        animation-name: animate;
        padding: 2px 95px 16px 43px;
        overflow: hidden;
        animation-duration: 1s;
        animation-timing-function: ease-out;
    }

    .details__Maintext {
        font-size: 15px;
        color: var(--color-main);
    }
    .details__subMain {
        font-size: 14px;
        color: var(--gray-600);
    }
    .details__total {
        font-weight: 600;
        font-size: 18px;
        color: var(--color-main);
    }
    .details__left {
        width: 100%;
        margin-right: 50px;
    }
    .details__right {
        width: 145px;
    }
    .rotated {
        transition: transform 0.2s linear;
        transform: rotate(180deg);
        transform-origin: center;
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
                <CustomCheckbox value="allReport"  className="text-main"  id="allReport" label="" bind:check={orders.allReport} on:click={selectAll}/>
            </div>
            <div class="flex items-center colOrder {selectedSort == 'order' ? 'selectedSort':'textHover'}" on:click={sortByOrder}>
                <span>{width > 1048 ? '№ и статус заказа':'Заказ'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                    <path d="M11 1L5.99554 6L1 1" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>

        <div class="flex items-center  colDate  {selectedSort == 'date' ? 'selectedSort':'textHover'}" on:click={sortByDate}>
            <span>Дата</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                <path d="M9 5L4.99643 1L1 5" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 10L4.99643 14L1 10" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        {#if width > 1048}
            <div class=" colSum">
                <span>Сумма</span>
            </div>
        {/if}
        <div class="flex items-center  colWorker {selectedSort == 'name' ? 'selectedSort':'textHover'}" on:click={sortByName} >
            <span>Сотрудник</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                <path d="M11 1L5.99554 6L1 1" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        {#if width >1299}
            <div class="flex items-center colphone">
                <span>Телефон</span>
            </div>
        {/if}
        <div class="w-56"></div>
    </div>
    <div class="reportTable__body">
        {#each orders.report as order, i}
        {#if i != 0}
            <hr>
        {/if}
            <div class="reportTable__item flex justify-between">
                <div  class="flex">
                    <div>
                        <CustomCheckbox value="order{i}"  className="text-main"  id="order{i}" label="" bind:check={order.selected}/>
                    </div>
                    <div class=" colOrder">
                        <p class="reportTable__maintText">№ {order.number}</p>
                        {#if width < 1048}
                            <p class="reportTable__maintText">{order.amount}  ₽</p>
                        {/if}
                        <p class="reportTable__subText mt-4">{order.status}</p>
                    </div>
                </div>
                <div class=" colDate">
                    <span class="reportTable__maintText">
                        {formatDate(order.date)}
                    </span>
                </div>
                {#if width > 1048}
                    <div class=" colSum">
                    <span class="reportTable__maintText whitespace-no-wrap">
                        {order.amount} ₽
                    </span>
                    </div>
                {/if}

                <div class=" colWorker">
                    <p class="reportTable__maintText">{order.employee}</p>
                    {#if width < 1300}
                        <p class="reportTable__subText">{order.phone}</p>
                    {/if}
                </div>
                {#if width >1299}
                    <div class="colphone">
                        <p class="reportTable__maintText text-right">{order.phone}</p>
                    </div>
                {/if}
                <div class="flex">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="reportTable__document mt-4">
                            <rect width="18" height="18" fill="white"/>
                            <path d="M1.5 1.8862C1.5 1.12062 2.12062 0.5 2.8862 0.5H7.71637C8.1142 0.5 8.49573 0.658035 8.77703 0.93934L12.321 4.48327C12.6023 4.76457 12.7603 5.1461 12.7603 5.54393V13.2034C12.7603 13.969 12.1397 14.5896 11.3741 14.5896H2.8862C2.12062 14.5896 1.5 13.969 1.5 13.2034V1.8862Z" stroke="#999999"/>
                            <path d="M12.3171 5.65862H9.48776C7.60156 5.65862 7.60156 4.24397 7.60156 3.77242V0.943115" stroke="#999999"/>
                            <circle cx="11.5" cy="12.71" r="3.5" fill="white" stroke="#999999"/>
                            <path d="M15.9117 17.8285C16.107 18.0238 16.4236 18.0238 16.6188 17.8285C16.8141 17.6333 16.8141 17.3167 16.6188 17.1214L15.9117 17.8285ZM13.5263 15.4432L15.9117 17.8285L16.6188 17.1214L14.2334 14.736L13.5263 15.4432Z" fill="#999999"/>
                        </svg>
                    </div>
                    <div on:click={()=>{order.details = !order.details}} class="textHover">
                        <svg xmlns="http://www.w3.org/2000/svg" class:rotated='{order.details}' width="14" height="8" viewBox="0 0 14 8" fill="none" class="mt-8">
                            <path d="M13 1L6.99465 7L1 1" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
            {#if order.details}
                <div class:details={order.details}>
                    {#each order.products as product}
                        <div class="product flex justify-between mb-8">
                            <div class="details__left">
                                <span class="details__Maintext">{product.name}</span>
                                <span class="details__subMain">({product.size}, открытка {product.post})</span>
                            </div>
                            <div class="details__right flex justify-between details__Maintext">
                                <div>{product.amount}</div>
                                <div class="whitespace-no-wrap">{product.price * product.amount}  ₽</div>
                            </div>
                        </div>
                    {/each}
                    <div class="details__adress flex">
                        <div class="details__Maintext details__left">
                            <span class="details__Maintext"> Доставка по адресу</span>
                            <span class="details__Maintext font-semibold">{order.adress}</span>
                        </div>
                        <div class="details__Maintext details__right text-right">{order.deliveryPrice}  ₽</div>
                    </div>
                            <div class="flex justify-end items-center mt-18">
                                <span class="details__Maintext">Итого:</span>
                                <span class="details__total ml-12">{order.amount}   ₽</span>
                            </div>
                </div>
            {/if}

        {/each}
    </div>
</div>

{#if counter > 0}
    <TableStrip>
        <div class="flex items-center">
            <div class="mr-30">
                {#if counter < 2}
                    Выбран {counter} заказ
                    {:else}
                    Выбрано {counter} {counter > 4 ? 'заказов' : 'заказа'}
                {/if}
            </div>
            <div>
                <Button size="lg"><span class="whitespace-no-wrap">{counter < 2 ? 'Скачать документ' : 'Скачать документы'}</span></Button>
            </div>
            <div class="ml-30">
                <Button size="lg" status="active-secondary" on:click={canceling}><span class="whitespace-no-wrap">Сбросить выбор</span></Button>
            </div>
        </div>
    </TableStrip>
{/if}
