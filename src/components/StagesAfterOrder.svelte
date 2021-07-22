<style>

    h2 {
        font-size: 22px;
        color: #330033;
        font-weight: bold;
    }
    .afterOrder__stages {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-top: 25px;
    }
    .afterOrder__stage {
        min-height: 147px;
        flex-basis: calc(100% / 5 - 15px);
        background: #FFFFFF;
        border: 1px solid #E9E9E9;
        box-sizing: border-box;
        border-radius: 4px;
        margin-bottom: 13px;
        margin-right: 18px;
        position: relative;
    }
    .afterOrder__stage:last-child {
        margin-right: 0;
    }

    .afterOrder__stage_icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 88px;
        background: radial-gradient(95.46% 87.62% at 50% 87.62%, #FFCCCC 0%, rgba(239, 210, 210, 0.571429) 42.86%, rgba(218, 218, 218, 0) 100%);
    }

    .afterOrder__stage_arrow {
        fill:#330033;
        width: 40px;
        height: 20px;
        position:absolute;
        right: 3px;
        bottom: 6px;
    }

    .afterOrder__stage_text {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 135%;
        color: #666666;
        padding-left:16px;
        padding-top: 8px;
        padding-bottom: 8px;
        margin-right: 32px;
    }

    @media (max-width: 1250px) {
        .afterOrder__stage {
            flex-basis: calc(100% / 3 - 25px);
        }
        .afterOrder__stage:nth-child(3n){
            margin-right: 0;
        }
    }
</style>


    <div class="afterOrder__stages flex">
        <div class="afterOrder__stage">
            <div class="afterOrder__stage_icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <path d="M43.75 43.8983C43.75 46.6865 41.5596 48.9583 38.8469 48.9583H11.1528C8.45121 48.9583 6.25 46.698 6.25 43.8983V6.17066C6.25 3.38241 8.44009 1.1106 11.1528 1.1106H38.8469C41.5596 1.1106 43.75 3.38241 43.75 6.17066V43.8983Z" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.47266 33.8237H42.983" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M43.7279 13.5948C43.7279 16.6011 41.371 19.0451 38.447 19.0451C35.5342 19.0451 33.1661 16.6011 33.1661 13.5948H29.9863C29.9863 16.6011 27.6294 19.0451 24.7054 19.0451C21.7926 19.0451 19.4245 16.6011 19.4245 13.5948H16.8343C16.8343 16.6011 14.4662 19.0451 11.5534 19.0451C8.64053 19.0451 6.27246 16.6011 6.27246 13.5948C6.27246 13.5948 6.27246 7.26086 6.27246 5.67741C6.27246 4.09396 7.70646 1.04175 11.3642 1.04175C15.0219 1.04175 37.6242 1.04175 39.1696 1.04175C41.5376 1.04175 43.6946 3.41701 43.6946 5.71187C43.6946 8.00672 43.7168 12.6654 43.7168 12.6654L43.7279 13.5948Z" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="flex ">
                <h3 class="afterOrder__stage_text">Флорист примет ваш заказ</h3>
                <svg class='afterOrder__stage_arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20px" height="10px">
                    <path d="M31.7 15.3L21.3 6.7c-.4-.3-.9-.3-1.2.1-.3.4-.3.9.1 1.2l8.5 7.1H.9c-.5 0-.9.4-.9.9s.4.9.9.9h27.9L20.2 24c-.4.3-.4.9-.1 1.2.2.2.4.3.7.3.2 0 .4-.1.6-.2l10.4-8.6c.2-.2.3-.4.3-.7-.1-.3-.2-.5-.4-.7z"/>
                </svg>
            </div>
        </div>
        <div class="afterOrder__stage">
            <div class="afterOrder__stage_icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <path d="M43.75 20.9274C43.75 23.7271 41.5599 26.0082 38.8472 26.0082H11.1528C8.45121 26.0082 6.25 23.7386 6.25 20.9274V6.12251C6.25 3.32285 8.44009 1.04175 11.1528 1.04175H38.8472C41.5599 1.04175 43.75 3.32285 43.75 6.12251V20.9274Z" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15.1881 8.43848H11.9307" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.32812 48.8779L24.5722 27.8401" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M43.2498 48.8776L25.0166 27.8398" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M25.0166 48.9584V27.8398" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M29.6419 14.3722C29.6419 16.976 27.6073 19.0842 25.1058 19.0842C22.5932 19.0842 20.5586 16.976 20.5586 14.3722C20.5586 11.7799 22.5932 9.67143 25.1058 9.67143C27.6073 9.65991 29.6419 11.7684 29.6419 14.3722Z" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="flex ">
                <h3 class="afterOrder__stage_text">Соберём заказ и вышлем фото</h3>
                <svg class='afterOrder__stage_arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20px" height="10px">
                    <path d="M31.7 15.3L21.3 6.7c-.4-.3-.9-.3-1.2.1-.3.4-.3.9.1 1.2l8.5 7.1H.9c-.5 0-.9.4-.9.9s.4.9.9.9h27.9L20.2 24c-.4.3-.4.9-.1 1.2.2.2.4.3.7.3.2 0 .4-.1.6-.2l10.4-8.6c.2-.2.3-.4.3-.7-.1-.3-.2-.5-.4-.7z"/>
                </svg>
            </div>
        </div>
        <div class="afterOrder__stage">
            <div class="afterOrder__stage_icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <path d="M48.5313 29.2284C43.7744 29.2284 46.226 29.2922 43.3835 29.2922C43.3835 29.2922 38.9111 30.2361 38.9111 23.9184C38.9111 19.8714 38.9111 21.5705 38.9111 17.1167H43.3835C46.2233 17.1167 48.5313 19.3848 48.5313 22.1767V29.2284Z" stroke="#311833" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.9967 48.9898C22.1188 48.9898 24.6497 46.5017 24.6497 43.4325C24.6497 40.3633 22.1188 37.8752 18.9967 37.8752C15.8747 37.8752 13.3438 40.3633 13.3438 43.4325C13.3438 46.5017 15.8747 48.9898 18.9967 48.9898Z" stroke="#311833" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M37.1003 48.9898C40.2223 48.9898 42.7533 46.5017 42.7533 43.4325C42.7533 40.3633 40.2223 37.8752 37.1003 37.8752C33.9782 37.8752 31.4473 40.3633 31.4473 43.4325C31.4473 46.5017 33.9782 48.9898 37.1003 48.9898Z" stroke="#311833" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M32.7674 39.8696L31.8005 40.1248C31.8956 40.4848 32.1828 40.7623 32.546 40.8447C32.9091 40.9272 33.288 40.8011 33.5292 40.5174L32.7674 39.8696ZM42.7498 43.6508L41.7506 43.6116C41.7399 43.8834 41.8405 44.1478 42.029 44.3439C42.2175 44.54 42.4778 44.6508 42.7498 44.6508V43.6508ZM47.5308 38.6014C47.5308 40.8201 45.6916 42.6508 43.383 42.6508V44.6508C46.7593 44.6508 49.5308 41.9612 49.5308 38.6014H47.5308ZM47.5308 22.3257V38.6014H49.5308V22.3257H47.5308ZM43.383 18.2737C45.6883 18.2737 47.5308 20.109 47.5308 22.3257H49.5308C49.5308 18.9693 46.7574 16.2737 43.383 16.2737V18.2737ZM37.746 18.2737H43.383V16.2737H37.746V18.2737ZM33.6035 22.3257C33.6035 20.1076 35.4421 18.2737 37.746 18.2737V16.2737C34.3703 16.2737 31.6035 18.9706 31.6035 22.3257H33.6035ZM33.6035 38.6014V22.3257H31.6035V38.6014H33.6035ZM33.7343 39.6143C33.6491 39.2915 33.6035 38.9523 33.6035 38.6014H31.6035C31.6035 39.1263 31.6718 39.6371 31.8005 40.1248L33.7343 39.6143ZM37.1038 36.8753C35.0594 36.8753 33.2262 37.7864 32.0056 39.2218L33.5292 40.5174C34.3817 39.5149 35.6641 38.8753 37.1038 38.8753V36.8753ZM43.7541 43.4326C43.7541 39.7955 40.7609 36.8753 37.1038 36.8753V38.8753C39.6878 38.8753 41.7541 40.9313 41.7541 43.4326H43.7541ZM43.7491 43.69C43.7524 43.6046 43.7541 43.5188 43.7541 43.4326H41.7541C41.7541 43.4926 41.7529 43.5522 41.7506 43.6116L43.7491 43.69ZM43.383 42.6508H42.7498V44.6508H43.383V42.6508Z" fill="#311833"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M32.4473 43.4325C32.4473 40.9316 34.5143 38.8752 37.1003 38.8752C39.6862 38.8752 41.7533 40.9316 41.7533 43.4325C41.7533 45.9334 39.6862 47.9898 37.1003 47.9898C34.5143 47.9898 32.4473 45.9334 32.4473 43.4325ZM37.1003 36.8752C33.4421 36.8752 30.4473 39.795 30.4473 43.4325C30.4473 47.07 33.4421 49.9898 37.1003 49.9898C40.7584 49.9898 43.7533 47.07 43.7533 43.4325C43.7533 39.795 40.7584 36.8752 37.1003 36.8752Z" fill="#311833"/>
                    <path d="M19.105 11.7295H1" stroke="#311833" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5.96432 18.3291H1" stroke="#311833" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M31.6436 22.3256C31.6436 18.9929 34.392 16.313 37.7466 16.313H43.3837C46.7369 16.313 49.492 18.9916 49.492 22.3256V38.6013C49.492 41.9386 46.7389 44.6113 43.3837 44.6113H42.7505C42.4892 44.6113 42.2391 44.5048 42.058 44.3165C41.8769 44.1281 41.7804 43.8741 41.7906 43.613C41.793 43.5532 41.7942 43.493 41.7942 43.4325C41.7942 40.9088 39.7096 38.8358 37.1044 38.8358C35.6529 38.8358 34.3595 39.4807 33.4998 40.4917C33.2681 40.7643 32.9042 40.8854 32.5553 40.8062C32.2065 40.727 31.9306 40.4605 31.8393 40.1146C31.7114 39.6302 31.6436 39.1228 31.6436 38.6013V22.3256ZM37.7466 18.2342C35.4216 18.2342 33.5647 20.0851 33.5647 22.3256V37.9269C34.5888 37.2857 35.8036 36.9147 37.1044 36.9147C40.4845 36.9147 43.2933 39.4235 43.6719 42.6806C45.8647 42.5356 47.5709 40.7492 47.5709 38.6013V22.3256C47.5709 20.0864 45.71 18.2342 43.3837 18.2342H37.7466Z" fill="#311833"/>
                    <path d="M10.0628 6.01797C10.0628 3.77245 11.922 1.92117 14.25 1.92117H33.8679C36.1969 1.92117 38.0605 3.77607 38.0605 6.01797V16.313H39.9816V6.01797C39.9816 2.68132 37.2239 0 33.8679 0H14.25C10.893 0 8.1416 2.67962 8.1416 6.01797C8.1416 6.54848 8.57167 6.97855 9.10219 6.97855C9.6327 6.97855 10.0628 6.54848 10.0628 6.01797Z" fill="#311833"/>
                    <path d="M31.0932 43.5075C31.0932 43.2398 31.0106 42.9011 31.0423 42.6421H25.4314C25.4631 42.9011 25.4794 43.1648 25.4794 43.4325C25.4794 43.8184 25.4455 44.1962 25.3804 44.5633H31.0932C31.0282 44.1962 31.0932 43.8934 31.0932 43.5075Z" fill="#311833"/>
                    <path d="M8.1416 38.5533C8.1416 41.2102 10.0624 43.5068 12.4738 44.3056C12.4398 44.0377 12.4738 43.7741 12.4738 43.4968C12.4738 43.0776 12.4931 42.6379 12.5696 42.2412C11.1969 41.5646 10.0628 40.1383 10.0628 38.5533V23.7826C10.0628 23.2521 9.6327 22.822 9.10219 22.822C8.57167 22.822 8.1416 23.2521 8.1416 23.7826V38.5533Z" fill="#311833"/>
                </svg>
            </div>
            <div class="flex ">
                <h3 class="afterOrder__stage_text">Отследите заказ на карте</h3>
                <svg class='afterOrder__stage_arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20px" height="10px">
                    <path d="M31.7 15.3L21.3 6.7c-.4-.3-.9-.3-1.2.1-.3.4-.3.9.1 1.2l8.5 7.1H.9c-.5 0-.9.4-.9.9s.4.9.9.9h27.9L20.2 24c-.4.3-.4.9-.1 1.2.2.2.4.3.7.3.2 0 .4-.1.6-.2l10.4-8.6c.2-.2.3-.4.3-.7-.1-.3-.2-.5-.4-.7z"/>
                </svg>
            </div>
        </div>
        <div class="afterOrder__stage">
            <div class="afterOrder__stage_icon">
                <picture >
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                        <path d="M13 42L39 42" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M23 5.51929L29 5.51928" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13 9L39 9" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <rect x="13" y="2" width="26" height="46" rx="3" stroke="#330033" stroke-width="2"/>
                        <path d="M24.3757 30H28.5C29.4293 30 29.894 30 30.2804 29.9231C31.8671 29.6075 33.1075 28.3671 33.4231 26.7804C33.5 26.394 33.5 25.9293 33.5 25C33.5 24.0707 33.5 23.606 33.4231 23.2196C33.1075 21.6329 31.8671 20.3925 30.2804 20.0769C29.894 20 29.4293 20 28.5 20H23.5C22.5707 20 22.106 20 21.7196 20.0769C20.1329 20.3925 18.8925 21.6329 18.5769 23.2196C18.5 23.606 18.5 24.0707 18.5 25C18.5 25.9293 18.5 26.394 18.5769 26.7804C18.8429 28.118 19.7661 29.2094 21 29.7083" stroke="#330033" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M24.2578 30.2765C22.967 32.4233 19.9613 32.5655 19.9613 32.5655C20.9063 31.308 20.9895 29.8504 20.9895 29.8504" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </picture>
            </div>
            <div class="flex ">
                <h3 class="afterOrder__stage_text">Получите СМС: Заказ выполнен</h3>
                <svg class='afterOrder__stage_arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20px" height="10px">
                    <path d="M31.7 15.3L21.3 6.7c-.4-.3-.9-.3-1.2.1-.3.4-.3.9.1 1.2l8.5 7.1H.9c-.5 0-.9.4-.9.9s.4.9.9.9h27.9L20.2 24c-.4.3-.4.9-.1 1.2.2.2.4.3.7.3.2 0 .4-.1.6-.2l10.4-8.6c.2-.2.3-.4.3-.7-.1-.3-.2-.5-.4-.7z"/>
                </svg>
            </div>
        </div>
        <div class="afterOrder__stage">
            <div class="afterOrder__stage_icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <path d="M14.1238 45.7823C17.3917 47.5184 21.0682 48.4375 24.9489 48.4375C37.9187 48.4375 48.4375 37.9187 48.4375 24.9489C48.4375 11.9792 37.9187 1.5625 24.9489 1.5625C11.9792 1.5625 1.5625 12.0813 1.5625 24.9489C1.5625 30.6679 3.60498 35.9784 7.07721 40.0633C7.07721 40.0633 5.34109 45.8844 1.76675 48.029C1.76675 48.029 8.81332 49.7651 14.1238 45.7823Z" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.0625 18.75H35.9375" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.0625 25H35.9375" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.0625 32.8125H35.9375" stroke="#330033" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="flex ">
                <h2 class="afterOrder__stage_text">Оставите отзыв о нашей работе</h2>
                <svg class='afterOrder__stage_arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="15px" height="10px">
                    <path d="M12.6 26.3c-.3 0-.6-.1-.8-.3L.3 14.5c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l10.6 10.6L30 6c.4-.4 1.2-.4 1.6 0 .4.4.4 1.2 0 1.6L13.4 26c-.2.2-.5.3-.8.3z"/>
                </svg>
            </div>
        </div>
    </div>
