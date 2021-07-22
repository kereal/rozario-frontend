<script>


export let pretensions;


let width;
let sortDate = false;
let sortName = false;
function sortByReason() {
    if (!sortName) {
        pretensions.sort(function (a, b) {
            if (a.reason > b.reason) {
                return 1;
            }
            if (a.reason < b.reason) {
                return -1;
            }
            return 0;
        });
        sortName = !sortName
    } else {
        pretensions.sort(function (a, b) {
            if (b.reason > a.reason) {
                return 1;
            }
            if (b.reason < a.reason) {
                return -1;
            }
            return 0;
        });
        sortName = !sortName
    }
    pretensions = pretensions
}
let sortresolution = false;
function sortByResolution() {
    if (!sortresolution) {
        pretensions.sort(function (a, b) {
            if (a.resolution > b.resolution) {
                return 1;
            }
            if (a.resolution < b.resolution) {
                return -1;
            }
            return 0;
        });
        sortresolution = !sortresolution
    } else {
        pretensions.sort(function (a, b) {
            if (b.resolution > a.resolution) {
                return 1;
            }
            if (b.resolution < a.resolution) {
                return -1;
            }
            return 0;
        });
        sortresolution = !sortresolution
    }
    pretensions = pretensions
}
let sortresponsible = false;
function sortByResponsible() {
    if (!sortresponsible) {
        pretensions.sort(function (a, b) {
            if (a.responsible > b.responsible) {
                return 1;
            }
            if (a.responsible < b.responsible) {
                return -1;
            }
            return 0;
        });
        sortresponsible = !sortresponsible
    } else {
        pretensions.sort(function (a, b) {
            if (b.responsible > a.responsible) {
                return 1;
            }
            if (b.responsible < a.responsible) {
                return -1;
            }
            return 0;
        });
        sortresponsible = !sortresponsible
    }
    pretensions = pretensions
}
function sortByDate() {
    if (!sortDate) {
        pretensions.sort(function (a, b) {
            return a.date - b.date;
        });
        sortDate = !sortDate
    } else {
        pretensions.sort(function (a, b) {
            return b.date - a.date;
        });
        sortDate = !sortDate
    }
    pretensions = pretensions
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
</script>

<svelte:window bind:innerWidth={width}/>

<style>
    .pretensions {
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
    .header div {
        padding: 16px 0;
        font-size: 16px;
        color:var(--gray-700);
    }
    .header div:hover {
        cursor: pointer;
        color:var(--color-main);
    }
    .header div:hover svg path{
        stroke:var(--color-main);
    }
    .header svg {
        margin-left: 8px;
    }
    .content {
        padding: 0 24px;
    }
    .pretension {
        border-bottom: 1px solid var(--gray-500);
        padding: 16px 0;
    }
    .pretension svg:hover{
        cursor: pointer;
    }
    .pretension svg:hover path{
        stroke:var(--color-info);
    }
    .pretension svg:hover circle{
        stroke:var(--color-info);
    }
    .pretension:last-child {
        border-bottom: none;
    }
.pretensionDate {
    min-width: 133px;
    max-width: 133px;
}
    .pretensionDate svg {
        min-width:10px;
    }
    .pretensionReason {
    min-width: 187px;
    max-width: 187px;
}
.pretensionResolution {
    min-width: 183px;
    max-width: 183px;
}
.pretensionResponsible {
    min-width: 140px;
    max-width: 140px;
}
.pretensionText {
    font-size: 16px;
    line-height: 130%;
    color: var(--color-main);
}
.pretensionSubText {
    font-size: 14px;
    color: var(--gray-600);
}
@media (max-width: 1300px) {
    .pretensionDate {
        min-width: 130px;
        max-width: 130px;
    }
    .pretensionReason {
        min-width: 177px;
        max-width: 177px;
    }
    .pretensionResolution {
        min-width: 234px;
        max-width: 234px;
    }
}
@media (max-width: 1024px) {

    .pretensionDate {
        min-width: 183px;
        max-width: 183px;
    }
    .pretensionReason {
        min-width: 234px;
        max-width: 234px;
    }

}
</style>

<div class="pretensions">
    <div class="header">
        {#if width > 1024}
            <div class="pretensionDate flex items-center mr-12" on:click={sortByDate}>№, дата заказа
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                    <path d="M9 5L4.99643 1L1 5" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round"
                          stroke-linejoin="round"/>
                    <path d="M9 10L4.99643 14L1 10" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round"
                          stroke-linejoin="round"/>
                </svg>
            </div>
            {:else}
            <div class="pretensionDate flex items-center  mr-12" on:click={sortByDate}>
                №, дата заказа, причина претензии
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                    <path d="M9 5L4.99643 1L1 5" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round"
                          stroke-linejoin="round"/>
                    <path d="M9 10L4.99643 14L1 10" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round"
                          stroke-linejoin="round"/>
                </svg>
            </div>
        {/if}
        {#if width > 1024}
            <div class="pretensionReason flex items-center  mr-12" on:click={sortByReason}>
                Причина претензии
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                    <path d="M11 1L5.99554 6L1 1" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        {/if}
            <div class="pretensionResolution flex items-center mr-12" on:click={sortByResolution}>
        {#if width > 1300}
                Решение
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                    <path d="M11 1L5.99554 6L1 1" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            {:else}
            Решение, ответственный
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                <path d="M11 1L5.99554 6L1 1" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
         {/if}
            </div>
        {#if width > 1300}
            <div class="pretensionResponsible flex items-center mr-12"  on:click={sortByResponsible}>
                Ответственный
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                    <path d="M11 1L5.99554 6L1 1" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        {/if}
        <div class="w-22"></div>
    </div>
    <div class="content">
        {#each pretensions as pretension}
        <div class="pretension flex justify-between">
            {#if width > 1024}
                <div class="pretensionDate  mr-12">
                    <div class="pretensionText">
                        № {pretension.number}
                    </div>
                    <div class="pretensionSubText">
                        {formatDate(pretension.date)}
                    </div>
                </div>
            {:else}
                <div class="pretensionDate  mr-12">
                    <div class="pretensionText">
                        № {pretension.number}
                    </div>
                    <div class="pretensionSubText mb-8">
                        {formatDate(pretension.date)}
                    </div>
                    <div class="pretensionText">
                        {pretension.reason}
                    </div>
                </div>
            {/if}
            {#if width > 1024}
                <div class="pretensionReason flex pretensionText mr-12">
                    {pretension.reason}
                </div>
            {/if}
            <div class="pretensionResolution ">
                {#if width > 1300}
                    <div class="pretensionText mr-12">
                        {pretension.resolution}
                    </div>
                {:else}
                    <div class="pretensionText mr-12">
                        {pretension.resolution}
                    </div>
                    {#if pretension.responsible}
                        <div class="pretensionSubText">
                            {pretension.responsible}
                        </div>
                    {/if}
                {/if}
            </div>
            {#if width > 1300}
                <div class="pretensionResponsible flex">
                    <div class="pretensionText">
                        {pretension.responsible}
                    </div>
                </div>
            {/if}
            <div class="mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                    <path d="M0.5 1.88718C0.5 1.1216 1.12062 0.500977 1.8862 0.500977H6.71637C7.1142 0.500977 7.49573 0.659012 7.77703 0.940316L11.321 4.48424C11.6023 4.76555 11.7603 5.14708 11.7603 5.5449V13.2044C11.7603 13.97 11.1397 14.5906 10.3741 14.5906H1.8862C1.12062 14.5906 0.5 13.97 0.5 13.2044V1.88718Z" stroke="#999999"/>
                    <path d="M11.3171 5.65984H8.48776C6.60156 5.65984 6.60156 4.24519 6.60156 3.77364V0.944336" stroke="#999999"/>
                    <circle cx="10.5" cy="12.7109" r="3.5" fill="white" stroke="#999999"/>
                    <path d="M14.9117 17.8298C15.107 18.025 15.4236 18.025 15.6188 17.8298C15.8141 17.6345 15.8141 17.3179 15.6188 17.1227L14.9117 17.8298ZM12.5263 15.4444L14.9117 17.8298L15.6188 17.1227L13.2334 14.7373L12.5263 15.4444Z" fill="#999999"/>
                </svg>
            </div>
        </div>
        {/each}
    </div>
</div>