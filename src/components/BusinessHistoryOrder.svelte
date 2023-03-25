<script>
    import CustomCheckbox from "./CustomCheckbox.svelte";
    import CustomDropdown from "./CustomDropdown.svelte";
    import TableStrip from "./TableStrip.svelte";
    import Button from "./Button.svelte";
    import BusinessHistoryProduct from "./BusinessHistoryProduct.svelte";

    export let orders;
    let selectedPhotoAfterOrder = 0;
    let width;
    let infoVisible = false;
    let infoElement;
    let counter = 0;


    function formatDate(date) {
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        let yy = date.getFullYear();
        if (yy < 10) yy = '0' + yy;
        return dd + '.' + mm + '.' + yy;
    }

    let allReport;
    let sortDate = false;
    let sortName = false;

    function sortByDate() {
        if (!sortDate) {
            orders.sort(function (a, b) {
                return a.date - b.date;
            });
            sortDate = !sortDate
        } else {
            orders.sort(function (a, b) {
                return b.date - a.date;
            });
            sortDate = !sortDate
        }
        orders = orders
    }

    function sortByName() {
        if (!sortName) {
            orders.sort(function (a, b) {
                return a.completed - b.completed
            });
            sortName = !sortName
        } else {
            orders.sort(function (a, b) {
                return b.completed - a.completed
            });
            sortName = !sortName
        }
        orders = orders
    }

    function selectAll() {
        if (allReport == true) {
            orders.forEach((item) => {
                item.selected = false
            })
        } else {
            orders.forEach((item) => {
                item.selected = true;
            })
        }
        orders = orders;
    }

    function canceling() {
        orders.forEach((item) => {
            item.selected = false
        })
        allReport = false;
        orders = orders;
    }

    $: if (orders) {
        counter = 0;
        orders.forEach((item) => {
            if (item.selected == true) {
                counter++
            }
        })
    }


</script>
<svelte:window bind:innerWidth={width}/>
<style>
    .history {
        background: #FFFFFF;
        border: 1px solid var(--gray-500);
        box-sizing: border-box;
        border-radius: 4px;
    }
    .header {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid var(--gray-500);
        padding: 0 24px 0 24px;
    }
    .header > div {
        padding: 16px 0;
        font-size: 16px;
        color:var(--gray-700);
    }
    .header svg {
        margin-left: 8px;
    }
    .numberOrder {
        max-width: 155px;
        min-width: 155px;
        margin-right: 34px;
    }
    .sumOrder {
        max-width: 74px;
        min-width: 74px;
        margin-right: 34px;
    }
    .arddresOrder {
        max-width: 244px;
        min-width: 244px;
        margin-right: 34px;
    }
    .dateOrder {
        max-width: 137px;
        min-width: 137px;
        margin-right: 34px;
    }
    .buttonsOrder {
        width: 51px;
    }

    .buttonsOrder svg:hover{
        cursor:pointer;
    }
    .buttonsOrder svg:hover path{
        stroke:var(--color-info);
    }
    .buttonsOrder svg:hover circle{
        stroke:var(--color-info);
    }
    .content {
        padding: 0 24px;
    }
    .order {
        border-bottom: 1px solid var(--gray-500);
        padding: 16px 0;
    }
    .order:last-child {
        border-bottom: none;
    }
    .orderWorkers {
        margin-bottom: 40px;
    }
    .orderWorkers h2 {
        font-weight: 600;
        font-size: 16px;
        color: var(--color-main);
        margin: 24px 0 12px 0;
    }
    .orderWorker {
        display: block;
        min-width: 87px;
        margin-right: 16px;
    }
    .pretensionText {
        font-size: 15px;
        line-height: 130%;
        color: var(--color-main);
        font-weight: normal;
    }
    .pretensionSubText {
        font-size: 14px;
        color: var(--gray-600);
    }
    .orderDetails {
        padding: 0 68px 0 37px;
    }

    .photosAfterOrder {
        width: 170px;
        padding-left: 36px;
    }
    .photoAfterOrder {
        min-width: 138px;
        max-width:138px;
        height: 138px;

        box-sizing: border-box;
        border-radius: 4px;
        background-image: url("../../static/loading-bg-image.svg");
        margin-bottom: 18px;
    }

    .order__delivery {
        text-align: right;
        border-bottom: 1px solid var(--gray-300);
        padding-bottom: 18px;
        margin-bottom: 20px;
    }
    .orderTextInfo {
        min-width:163px;
        margin-right: 24px;
    }
    .orderTextInfo:last-child {
        margin-bottom: 0;
    }
    .changePhotoButton {
        width: 100%;
        height: 4px;
        background-color: var(--gray-1000);
        cursor:pointer;

    }
    .activeButton {
        width: 100%;
        background-color: var(--gray-600);
    }

    svg {
        transition: transform 0.2s linear;
    }

    .rotated {
        transform: rotate(-180deg);
        transform-origin: center;
    }
    .sortHover {
        cursor: pointer;
    }
    .sortHover:hover {
        color: var(--color-main);
    }
    .sortHover:hover svg path{
        stroke: var(--color-main);
    }
    @media (max-width: 1450px) {
        .numberOrder {
            max-width: 94px;
            min-width: 94px;
        }
        .arddresOrder {
            max-width: 244px;
            min-width: 244px;
        }
        .dateOrder {
            max-width: 137px;
            min-width: 137px;
        }
        .order__productPhoto {
            min-width: 120px;
            height: 120px;
        }
    }

    @media (max-width: 1024px) {
        .numberOrder {
            max-width: 94px;
            min-width: 94px;
        }
        .arddresOrder {
            max-width:238px;
            min-width:238px;
        }
        .order__productPhoto {
            min-width: 80px;
            height: 80px;
            margin-right: 24px;
        }
    }

</style>


<div class="history">
    <div class="header items-center">
        <div class="flex">
            <div>
                <CustomCheckbox value="allReport" className="text-main mr-18" id="allReport" label="" on:click={selectAll}/>
            </div>
            <div class="numberOrder flex items-center sortHover" on:click={sortByName}>
                {#if width > 1400}
                    №, статус заказа
                {:else}
                    Заказ
                {/if}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                    <path d="M11 1L5.99554 6L1 1" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
        {#if width > 1400}
            <div class="sumOrder">Сумма</div>
        {/if}
        <div class="arddresOrder">
            {#if  width > 1024}
                Адрес доставки
                {:else}
            <div class=" flex items-center sortHover" on:click={sortByDate}>
                Адрес и дата доставки
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                    <path d="M9 5L4.99643 1L1 5" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round"
                          stroke-linejoin="round"/>
                    <path d="M9 10L4.99643 14L1 10" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round"
                          stroke-linejoin="round"/>
                </svg>
            </div>
            {/if}
        </div>
        {#if width > 1024}
            <div class="dateOrder flex sortHover items-center">
                <div on:click={sortByDate}>Дата доставки</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                    <path d="M9 5L4.99643 1L1 5" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round"
                          stroke-linejoin="round"/>
                    <path d="M9 10L4.99643 14L1 10" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round"
                          stroke-linejoin="round"/>
                </svg>
            </div>
        {/if}
        <div class="buttonsOrder"></div>
    </div>
    <div class="content">
        {#each orders as order, i}
            <div class="order">
                <div class="flex justify-between">
                    <div class="flex">
                        <div>
                            <CustomCheckbox value="order{i}"  className="text-main  mr-18"  id="order{i}" label="" bind:check={order.selected}/>
                        </div>
                        <div class="numberOrder">
                            {#if width > 1400}
                                <div class="pretensionText">№{order.number}</div>
                                <div class="pretensionSubText">
                                    {#if order.completed}
                                        Выполнен
                                        {:else}
                                        Не выполнен
                                    {/if}
                                </div>
                            {:else}
                                <div class="pretensionText">№{order.number}</div>
                                <div class="pretensionSubText mb-4">
                                    {#if order.completed}
                                        Выполнен
                                    {:else}
                                        Не выполнен
                                    {/if}
                                </div>
                                <div class="pretensionText">{order.summ} ₽</div>
                            {/if}
                        </div>
                    </div>
                    {#if width > 1400}
                        <div class="sumOrder pretensionText">{order.summ} ₽</div>
                    {/if}
                    <div class="arddresOrder items-center ">
                        {#if  width > 1024}
                            <div class="pretensionText">
                                {order.address.value}, {order.address.street} {order.address.house} {order.address.building}
                            </div>

                        {:else}
                            <div class="pretensionText">
                                {order.address.value}, {order.address.street} {order.address.house} {order.address.building}
                            </div>
                            <div class="pretensionSubText">
                                {formatDate(order.date)}
                            </div>
                        {/if}
                    </div>
                    {#if width > 1024}
                        <div class="dateOrder flex pretensionText">
                            {formatDate(order.date)}
                        </div>
                    {/if}
                    <div class="buttonsOrder flex justify-between">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <rect width="18" height="18" fill="white"/>
                                <path d="M1.5 1.8862C1.5 1.12062 2.12062 0.5 2.8862 0.5H7.71637C8.1142 0.5 8.49573 0.658035 8.77703 0.93934L12.321 4.48327C12.6023 4.76457 12.7603 5.1461 12.7603 5.54393V13.2034C12.7603 13.969 12.1397 14.5896 11.3741 14.5896H2.8862C2.12062 14.5896 1.5 13.969 1.5 13.2034V1.8862Z" stroke="#999999"/>
                                <path d="M12.3171 5.65886H9.48776C7.60156 5.65886 7.60156 4.24421 7.60156 3.77266V0.943359" stroke="#999999"/>
                                <circle cx="11.5" cy="12.71" r="3.5" fill="white" stroke="#999999"/>
                                <path d="M15.9117 17.8288C16.107 18.024 16.4236 18.024 16.6188 17.8288C16.8141 17.6335 16.8141 17.3169 16.6188 17.1217L15.9117 17.8288ZM13.5263 15.4434L15.9117 17.8288L16.6188 17.1217L14.2334 14.7363L13.5263 15.4434Z" fill="#999999"/>
                            </svg>
                        </div>
                        <div on:click={()=>{order.open=!order.open}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none" class="mt-4" class:rotated={order.open}>
                                <path d="M11 1L5.99554 6L1 1" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>

                {#if order.open == true}
                    <div class="orderDetails">
                        {#if !order.completed }
                            <div class="flex mt-34">
                                <div class="pretensionSubText mr-2">Причина невыполнения заказа:</div>
                                <div class="pretensionText">{order.reason}</div>
                            </div>

                        {/if}
                        <div class="orderWorkers">
                            <h2>Сотрудники:</h2>
                            <p class="flex"><span class="orderWorker pretensionSubText">Флорист:</span><span class="pretensionText">{order.florist}</span></p>
                            <p class="flex"><span class="orderWorker pretensionSubText">Курьер:</span><span class="pretensionText">{order.courier}</span></p>
                        </div>

                        {#each order.products as product, i}
                           <BusinessHistoryProduct product={product} postCardPrice={order.postcardPrice}/>
                        {/each}
                        <div class="order__delivery flex justify-between pretensionText">
                            <div>{order.delivery}</div>
                            <div>{order.deliveriPrice} ₽</div>
                        </div>
                        <div class=" flex justify-end  pretensionText">
                            <span class=" mr-8">Итого:</span>
                            <span class=" font-semibold text-lg" >{order.summ} ₽</span>
                        </div>
                    </div>
                    <div class="pr-68 pl-34 mt-30 mb-40">
                        <div class="flex items-center mb-12">
                            <div class="pretensionSubText  orderTextInfo">Отправитель:</div>
                            <div class="pretensionText">{order.sender}</div>
                        </div>
                        <div class="flex items-center mb-12">
                            <div class="pretensionSubText  orderTextInfo">Телефон отправителя:</div>
                            <div class="pretensionText">{order.senderPhone}</div>
                        </div>
                        <div class="flex items-center mb-12">
                            <div class="pretensionSubText  orderTextInfo">Опция доставки:</div>
                            <div class="pretensionText">{order.option}</div>
                        </div>
                        <div class="flex items-center mb-12">
                            <div class="pretensionSubText  orderTextInfo">Доп. услуга:</div>
                            <div class="pretensionText">{order.service}</div>
                        </div>
                        <div class="flex items-center mb-12">
                            <div class="pretensionSubText  orderTextInfo">Комментарий:</div>
                            <div class="pretensionText">{order.comment}</div>
                        </div>
                        <div class="flex items-center">
                            <div class="pretensionSubText  orderTextInfo">Способ оплаты:</div>
                            <div class="pretensionText">{order.way}</div>
                        </div>
                    </div>
                    <div class="photosAfterOrder">
                        <div class="photoAfterOrder">
                            <picture>
                                <source
                                        data-srcset="{order.photoAfterOrder[selectedPhotoAfterOrder]}.webp, {order.photoAfterOrder[selectedPhotoAfterOrder]}-2x.webp 2x" />
                                <img
                                        class=""
                                        data-srcset="{order.photoAfterOrder[selectedPhotoAfterOrder]}-2x.png"
                                        data-src="{order.photoAfterOrder[selectedPhotoAfterOrder]}.png"
                                        alt={order.photoAfterOrder[selectedPhotoAfterOrder]} />
                            </picture>
                            <noscript>
                                <img srcset="{order.photoAfterOrder[selectedPhotoAfterOrder]}-2x.png" src="{order.photoAfterOrder[selectedPhotoAfterOrder]}.png" alt="{order.photoAfterOrder[selectedPhotoAfterOrder]}">
                            </noscript>
                            <noscript>
                                <img srcset="product.photo}-2x.png" src="{order.photoAfterOrder[selectedPhotoAfterOrder]}.png" alt="{order.photoAfterOrder[selectedPhotoAfterOrder]}">
                            </noscript>
                        </div>
                        <div class="mb-12 flex">
                            <div class="changePhotoButton {selectedPhotoAfterOrder == 0 ? 'activeButton' : ''}" on:click={()=>{selectedPhotoAfterOrder = 0}}></div>
                            <div class="changePhotoButton {selectedPhotoAfterOrder == 1 ? 'activeButton' : ''}" on:click={()=>{selectedPhotoAfterOrder = 1}}></div>
                        </div>
                        <div class="text-center pretensionSubText">
                            Фото до доставки
                        </div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>

{#if counter > 0}
    <TableStrip>
        <div class="flex items-center">
            <div class="mr-30 whitespace-nowrap">
                    Выбрано {counter}
            </div>
            <div>
                <Button size="lg"><span class="whitespace-nowrap">{counter < 2  ? 'Скачать отчет' : 'Скачать отчеты'}</span></Button>
            </div>
            <div class="ml-30">
                <Button size="lg" status="active-secondary" on:click={canceling}><span class="whitespace-nowrap">Сбросить выбор</span></Button>
            </div>
        </div>
    </TableStrip>
{/if}