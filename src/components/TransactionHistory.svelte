<script>
export let history;
function formatDate(date) {
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    let yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;
    return dd + '.' + mm + '.' + yy;
}
let sortDate = false;
function sortByDate() {
    if (!sortDate) {
        history.sort(function (a, b) {
            return a.date - b.date;
        });
        sortDate = !sortDate
    } else {
        history.sort(function (a, b) {
            return b.date - a.date;
        });
        sortDate = !sortDate
    }
    selectedSort = 'date'
    history = history
}
let sumComing = 0;
let sumConsumption = 0;
history.forEach((item)=> {
    if(item.coming != '') {
        sumComing = +sumComing + +item.coming
    }
    if (item.consumption!='') {
        sumConsumption = sumConsumption + +item.consumption
    }
})

let width;
</script>
<svelte:window bind:innerWidth={width}/>
<style>
    .table {
        width: 100%;
        background: var(--color-light);
        border: 1px solid var(--gray-500);
        box-sizing: border-box;
        border-radius: 4px;
    }
    .header {
        height: 53px;
        border-bottom: 1px solid var(--gray-500);
        font-size: 16px;
        color: var(--gray-700);
        padding: 16px 24px;
    }
    .body {
        padding: 0 24px;
    }
    .element:last-child {
        border-bottom: none;
    }
    .element {
        border-bottom: 1px solid var(--gray-500);
        padding: 16px 0;
    }
    .mainText {
        font-size: 16px;
        color: var(--color-main);
    }
    .subText {
        font-size: 14px;
        line-height: 135%;
        color: var(--gray-600);
    }
    .saveItemText {
        font-size: 14px;
        color: var(--color-info-light);
    }
    .footerText {
        font-size: 16px;
        color: var(--gray-600);
    }
    .footerPrice{
        font-weight: 600;
        font-size: 16px;
        line-height: 130%;
        color: var(--color-main);
    }
    .date {
        min-width: 77px;
        max-width:77px;
        margin-right: 24px;
    }
    .transaction {
        min-width: 202px;
        max-width:202px;
        margin-right: 24px;
    }
    .coming {
        min-width: 142px;
        max-width:142px;
        margin-right: 24px;
    }
    .consumption {
        min-width: 136px;
        max-width:136px;
        margin-right: 24px;
    }
    .status {
        min-width: 99px;
        max-width:99px;
    }
    .footer {
        border-top: 1px solid var(--gray-500);
        padding: 16px 24px 16px 24px;
    }
    @media (max-width: 1300px) {
        .date {
            min-width: 77px;
            max-width:77px;
        }
        .transaction {
            min-width: 202px;
            max-width:202px;
        }
        .coming {
            min-width: 201px;
            max-width:201px;
        }
        .status {
            min-width: 99px;
            max-width:99px;
        }
        .footer {
            padding: 16px 24px 16px 24px;
        }
    }
    @media (max-width: 1048px) {
        .header {
            height: 74px;
            padding: 16px 24px;
        }
        .date {
            min-width: 77px;
            max-width:77px;
        }
        .transaction {
            min-width: 202px;
            max-width:202px;
        }
        .coming {
            min-width: 123px;
            max-width:123px;
            margin-right: 0;
        }
       .footer {
           padding: 16px 24px 16px 24px;
       }
    }
</style>
<div class="table">
    <div class="header flex justify-between items-baseline">
        <div class="date flex items-center cursor-pointer" on:click={sortByDate}>
            Дата
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none" class="ml-8">
                <path d="M9 5L4.99643 1L1 5" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 10L4.99643 14L1 10" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="transaction flex items-center">
            {#if width > 1048}
                Тип транзакции
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none" class="ml-8">
                <path d="M11 1L5.99554 6L1 1" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
                {:else}
                Тип транзакции, статус
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none" class="ml-8">
                    <path d="M11 1L5.99554 6L1 1" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            {/if}
        </div>
        {#if width > 1300}
            <div class="coming">Приход, комиссия</div>
            {:else}
            <div class="coming">Приход/расход, комиссия</div>
        {/if}

        {#if width > 1300}
            <div class="consumption">Расход, комиссия</div>
        {/if}
        {#if width>1048}
            <div class="status">Статус</div>
        {/if}
    </div>
    <div class="body">
        {#each history as item}
            <div class="element flex justify-between">
                <div class="date">
                    <div class="mainText">{formatDate(item.date)}</div>
                    <div class="subText mt-4">{formatDate(item.date)}</div>
                </div>
                <div class="transaction">
                    {#if width > 1048}
                        <div class="mainText">
                            {#if item.transactionNumber == true}
                                <div class="flex mainText items-center">
                                    Заказ № {item.transaction}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="cursor-pointer ml-8">
                                        <g clip-path="url(#clip0)">
                                            <rect width="18" height="18" fill="white"/>
                                            <path d="M1.5 1.88611C1.5 1.12053 2.12062 0.499908 2.8862 0.499908H7.71637C8.1142 0.499908 8.49573 0.657944 8.77703 0.939248L12.321 4.48317C12.6023 4.76448 12.7603 5.14601 12.7603 5.54384V13.2033C12.7603 13.9689 12.1397 14.5895 11.3741 14.5895H2.8862C2.12062 14.5895 1.5 13.9689 1.5 13.2033V1.88611Z" stroke="#CC6699"/>
                                            <path d="M12.3171 5.65851H9.48776C7.60156 5.65851 7.60156 4.24386 7.60156 3.77231V0.943008" stroke="#CC6699"/>
                                            <circle cx="11.5" cy="12.7098" r="3.5" fill="white" stroke="#CC6699"/>
                                            <path d="M15.9117 17.8285C16.107 18.0237 16.4236 18.0237 16.6188 17.8285C16.8141 17.6332 16.8141 17.3166 16.6188 17.1214L15.9117 17.8285ZM13.5263 15.4431L15.9117 17.8285L16.6188 17.1214L14.2334 14.736L13.5263 15.4431Z" fill="#CC6699"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="18" height="18" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            {:else}
                                Вывод на расчётный счёт
                            {/if}
                        </div>
                        {:else}
                        <div class="mainText">
                            {#if item.transactionNumber == true}
                                <div class="flex mainText items-center">
                                    Заказ № {item.transaction}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="cursor-pointer ml-8">
                                        <g clip-path="url(#clip0)">
                                            <rect width="18" height="18" fill="white"/>
                                            <path d="M1.5 1.88611C1.5 1.12053 2.12062 0.499908 2.8862 0.499908H7.71637C8.1142 0.499908 8.49573 0.657944 8.77703 0.939248L12.321 4.48317C12.6023 4.76448 12.7603 5.14601 12.7603 5.54384V13.2033C12.7603 13.9689 12.1397 14.5895 11.3741 14.5895H2.8862C2.12062 14.5895 1.5 13.9689 1.5 13.2033V1.88611Z" stroke="#CC6699"/>
                                            <path d="M12.3171 5.65851H9.48776C7.60156 5.65851 7.60156 4.24386 7.60156 3.77231V0.943008" stroke="#CC6699"/>
                                            <circle cx="11.5" cy="12.7098" r="3.5" fill="white" stroke="#CC6699"/>
                                            <path d="M15.9117 17.8285C16.107 18.0237 16.4236 18.0237 16.6188 17.8285C16.8141 17.6332 16.8141 17.3166 16.6188 17.1214L15.9117 17.8285ZM13.5263 15.4431L15.9117 17.8285L16.6188 17.1214L14.2334 14.736L13.5263 15.4431Z" fill="#CC6699"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="18" height="18" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            {:else}
                                Вывод на расчётный счёт
                            {/if}
                        </div>
                        {#if item.status != ''}
                            <div class="subText">
                                Отправлено
                            </div>
                            <div class="saveItemText mt-4 cursor-pointer">
                                Скачать акт
                            </div>
                        {/if}
                    {/if}
                </div>
                <div class="coming">
                    {#if width > 1300}
                        {#if item.coming != ''}
                            <div class="mainText">{item.coming} ₽</div>
                            <div class="subText mt-2">{item.commission} ₽</div>
                        {/if}
                        {:else}
                                   <div class="mainText">{item.consumption + item.coming} ₽</div>
                                <div class="subText mt-2">{item.commission} ₽</div>
                    {/if}
                </div>
                {#if width > 1300}
                    <div class="consumption">
                        {#if item.consumption != ''}
                            <div class="mainText">{item.consumption} ₽</div>
                            <div class="subText mt-2">{item.commission} ₽</div>
                        {/if}
                    </div>
                {/if}
                {#if width > 1048}
                    <div class="status">
                        {#if item.status != ''}
                            <div class="mainText">
                                Отправлено
                            </div>
                            <div class="saveItemText mt-8 cursor-pointer">
                                Скачать акт
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
    <div class="footer flex items-center justify-between">
        <div class="date">
            {#if width < 1049}
                Итого:
            {/if}
        </div>
        <div class="footerText transaction">
            {#if width > 1048}
                Итого:
            {:else}
                <span class="footerPrice">{sumComing} ₽</span>
            {/if}
        </div>
    <div class="footerPrice coming">
        {#if width > 1300}
            {sumComing} ₽
            {:else}
            {sumConsumption} ₽
        {/if}
    </div>
        {#if width > 1300}
            <div class="footerPrice consumption">{sumConsumption} ₽</div>
        {/if}
        {#if width > 1048}
            <div class="status">
                {#if width < 1300}
                    <div class="footerPrice consumption">{sumConsumption} ₽</div>
                {/if}
            </div>
        {/if}
    </div>
</div>