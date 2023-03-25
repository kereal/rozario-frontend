<script>
    import Slider from './Slider.svelte'
    import DeliveryTerms from "./DeliveryTerms.svelte";
    import Popup from './Popup.svelte'

    export let dataShop = {
        address:'Мурманск, ул. Ростинская, д. 9А',
        delivery:'Доставка круглосуточно',
        time: 'ежедневно, 09:00–21:00',
        tel:'8 800 250-64-70',
        director: 'ИП Блинова Светлана Анатольевна',
        office:'183053, Россия, Мурманская область, г. Мурманск, ул. Героев Рыбачьего, д. 41, кв. 40',
        INN:519054442210,
        OGRNIP:318519000018711
    }


    let DeliveryTermsVisible = false;
    let freePostCart = false;
    let aboutShop = false;
    let address = false;

    function openDeliveryTerms() {
        DeliveryTermsVisible = !DeliveryTermsVisible
    }
    function openfreePostCart() {
        freePostCart = !freePostCart
    }
    function openaboutShop() {
        aboutShop = !aboutShop
    }
    function openAddress() {
        address = !address
    }
</script>

<style>
    .nav {
        background: transparent;
        margin: 0 -16px;
    }
    .nav_element {
        height: 46px;
        background: var(--gray-200);
        border-radius: 8px;
        font-size: 15px;
        color: var(--color-main);
        width: 100%;
        padding: 10px 12px;
    }

    .icon {
        min-width: 48px;
        height: 48px;
        border-radius: 100px;
        border:5px solid white;
        margin-right: 16px;
        box-shadow: 0px 4px 15px rgba(51, 0, 51, 0.1);
    }
    .subText {
        font-size: 12px;
        color: var(--gray-700);

    }
</style>

<div class="nav flex">
    <Slider>
        <div class="nav_element whitespace-nowrap flex items-center  mr-8" on:click={openaboutShop}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clip-path="url(#clip0)">
                    <path d="M9.44724 8.38184H10.3794L8.73438 14.7819H10.1252" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.7656 5.56061C11.7656 6.03678 11.3917 6.41566 10.9331 6.41566C10.4745 6.41566 10.1006 6.03166 10.1006 5.56061C10.1006 5.08957 10.4745 4.70557 10.9331 4.70557C11.3967 4.70557 11.7656 5.08957 11.7656 5.56061Z" fill="#330033"/>
                </g>
                <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#330033"/>
                <defs>
                    <clipPath id="clip0">
                        <rect width="5" height="11.6667" fill="white" transform="translate(7.5 4.1665)"/>
                    </clipPath>
                </defs>
            </svg>
        </div>
        <div class="nav_element whitespace-nowrap mr-8 flex items-center" on:click={openDeliveryTerms}>
            Доставка 0–250 ₽
        </div>
        <div class="nav_element whitespace-nowrap mr-8 flex items-center" on:click={openfreePostCart}>
            Открытка в подарок
        </div>
        <div class="nav_element whitespace-nowrap flex items-center" on:click={openAddress}>
            Узнаем адрес сами
        </div>

    </Slider>
</div>

{#if DeliveryTermsVisible}
    <DeliveryTerms bind:visible={DeliveryTermsVisible}/>
{/if}
{#if freePostCart}
    <Popup title="Открытка в  подарок" bind:visible={freePostCart} size="max-height:95vh; width:100%;">
        <div class="flex items-center">
            <div class="icon flex justify-center items-center" style="background: #1DC556;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M19.452 4.84409C19.452 4.08629 18.7887 3.51794 17.9044 3.51794H17.7938L12.4874 4.74937C12.7085 4.55992 13.0402 4.37047 13.2613 4.18102C14.1457 3.51794 14.5879 2.57069 14.5879 1.81289C14.4773 1.14981 14.1457 0.581464 13.4824 0.297289C12.8191 -0.0816114 11.9347 -0.0816114 11.1608 0.202564C10.7186 0.392014 10.387 0.676189 10.0553 1.05509C9.83422 0.676189 9.39202 0.392014 8.94983 0.202564C8.17598 -0.0816114 7.29158 -0.0816114 6.62828 0.297289C5.96498 0.676189 5.52279 1.24454 5.52279 1.81289C5.41224 2.66541 5.85443 3.51794 6.73883 4.27574C6.95993 4.46519 7.18103 4.65464 7.51268 4.84409L2.09575 3.61267H1.9852C1.1008 3.51794 0.4375 4.18102 0.4375 4.84409V16.7794C0.4375 17.4425 1.1008 18.1056 1.87465 18.1056L9.83422 20.0001H9.94477C10.0553 20.0001 10.1659 20.0001 10.2764 19.9054L18.1255 18.1056C18.8993 18.1056 19.5626 17.4425 19.5626 16.7794L19.452 4.84409ZM10.6081 2.66541C10.6081 2.00234 11.0503 1.43399 11.603 1.24454C11.7136 1.14981 11.9347 1.14981 12.1558 1.14981C12.3769 1.14981 12.4874 1.14981 12.7085 1.33926C13.0402 1.43399 13.2613 1.62344 13.2613 2.00234C13.2613 2.47596 12.9296 3.04431 12.3769 3.51794C11.8241 3.99157 11.0503 4.46519 10.4975 4.74937C10.4975 4.18102 10.4975 3.42321 10.6081 2.66541ZM6.62828 2.00234C6.62828 1.71816 6.84938 1.43399 7.18103 1.24454C7.40213 1.14981 7.51268 1.05509 7.73378 1.05509C7.95488 1.05509 8.17598 1.14981 8.28653 1.14981C8.83928 1.43399 9.28147 2.00234 9.28147 2.57069C9.28147 3.32849 9.28147 4.08629 9.28147 4.65464C8.83928 4.46519 8.17598 3.99157 7.51268 3.51794C6.95993 3.04431 6.62828 2.47596 6.62828 2.00234ZM9.39202 18.8634L2.09575 17.1583H1.9852C1.7641 17.1583 1.65355 17.0636 1.65355 16.8742V4.84409C1.65355 4.65464 1.7641 4.55992 1.87465 4.55992L8.83928 6.17024C9.39202 6.35969 9.39202 6.45442 9.39202 6.54914V18.8634ZM17.9044 17.1583H17.7938L10.4975 18.8634V6.54914C10.4975 6.45442 10.4975 6.35969 10.9397 6.26497L17.9044 4.65464C18.0149 4.65464 18.1255 4.84409 18.1255 4.93882V16.8742C18.236 17.0636 18.1255 17.1583 17.9044 17.1583Z" fill="white"/>
                    <path d="M16.1362 8.34898L12.488 9.20151C12.1564 9.29623 11.9353 9.58041 12.0458 9.86458C12.1564 10.054 12.3775 10.2435 12.5986 10.2435H12.7091L16.3573 9.39096C16.6889 9.29623 16.91 9.01206 16.7995 8.72788C16.7995 8.44371 16.4678 8.25426 16.1362 8.34898Z" fill="white"/>
                    <path d="M16.138 11.0013L12.3793 11.9486C12.0476 12.0433 11.8265 12.3275 11.9371 12.6117C12.0476 12.8011 12.2687 12.9906 12.4898 12.9906H12.6004L16.2485 12.138C16.5802 12.0433 16.8013 11.7591 16.6907 11.475C16.8013 11.0961 16.4696 11.0013 16.138 11.0013Z" fill="white"/>
                </svg>
            </div>
            <div>
                <div class="subText">При заказе букета открытка с вашим текстом в подарок</div>
            </div>
        </div>
    </Popup>
{/if}
{#if aboutShop}
    <Popup title="Розарио.Цветы" bind:visible={aboutShop} size="max-height:95vh; width:100%;">
        <div class="subText mb-18">
            <p>
                {dataShop.address}
            </p>
            <p>
                {dataShop.delivery}
            </p>
            <p>
                Режим работы: {dataShop.time}
            </p>
            <p>
                т.{dataShop.tel}
            </p>
        </div>
        <div class="subText">
            <p>
                Исполнитель (продавец): {dataShop.director}
            </p>
            <p>
                {dataShop.office}
            </p>
            <p>
                ИНН {dataShop.INN}
            </p>
            <p>
                ОГРНИП {dataShop.OGRNIP}
            </p>
        </div>
    </Popup>
{/if}
{#if address}
    <Popup title="Узнаем адрес сами" bind:visible={address} size="max-height:95vh; width:100%;">
        <div class="flex items-center">
            <div class="icon flex justify-center items-center" style="background:var(--color-accent);">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="18" viewBox="0 0 23 18" fill="none">
                    <path d="M21.9998 6.34751C21.9998 7.17778 20.824 7.93769 18.9236 8.48652C17.0233 9.03534 14.3983 9.37308 11.4999 9.37308C8.60149 9.37308 5.97651 9.03534 4.07614 8.48652C2.17577 7.93769 1 7.18482 1 6.34751C1 5.5102 2.17577 4.75733 4.07614 4.20851C5.97651 3.65968 8.60149 1 11.4999 1C14.3983 1 17.0233 3.65968 18.9236 4.20851C20.824 4.75733 21.9998 5.5102 21.9998 6.34751Z" stroke="#330033" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.27636 6.37568C6.0371 6.33346 5.79785 6.29828 5.56543 6.24902" stroke="#330033" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.9033 6.86768C11.6572 6.87451 11.4111 6.87451 11.165 6.88135" stroke="#330033" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17.2012 6.24902C16.9687 6.29124 16.7295 6.33346 16.4902 6.37568" stroke="#330033" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.1171 12.9404C13.5087 13.2711 12.6611 13.4822 11.7177 13.4963C10.7812 13.5104 9.92675 13.3274 9.30469 13.0108" stroke="#330033" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.9345 16.1772C15.6493 16.7964 13.8652 17.1975 11.8828 17.2256C9.9072 17.2538 8.10936 16.916 6.80371 16.3391" stroke="#330033" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div>
                <div class="subText">Мы сами заранее позвоним получателю и уточним, где и в какое время ему будет удобно получить подарок. </div>
            </div>
        </div>
    </Popup>
{/if}