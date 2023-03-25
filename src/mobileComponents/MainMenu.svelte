<script>


import ContactUs from './ContactUs.svelte'
import Popup from './Popup.svelte'
import CurrencyAndLanguage from './CurrencyAndLanguage.svelte'
import MenuSearch from './MenuSearch.svelte'
import LogIn from "./LogIn.svelte";

let logInVisible = false;

let connectUsVisible = false;
let aboutShop = false;
let language = false;

export let user = false;
export let visible;


let userInfo = {
    name: 'Цетрион',
    photo: 'https://i.pinimg.com/236x/3b/42/1b/3b421bb57f65f40e3a6d9d6bd47222f2.jpg'
}
let modalElement;

function closeViaOverlay(e) {
    if (modalElement && !modalElement.contains(e.target)) {
        closeMenu()
    }
}


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

export let menuItems = [
    {
        name:'Каталог',
        link:'/mobileCatalog',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">\n' +
                '<path d="M13.0469 13.3569C12.3591 13.6449 11.8694 15.5454 10.9401 15.5424C10.0109 15.5364 9.55712 13.6329 8.91962 13.3711C8.28062 13.1086 6.62087 14.1459 5.95712 13.4964C5.29187 12.8454 6.27887 11.1504 5.99237 10.4626C5.70512 9.77639 3.80387 9.28514 3.80762 8.35664C3.81137 7.42589 5.71487 6.97364 5.97812 6.33689C6.23987 5.69714 5.20262 4.03889 5.85137 3.37364C6.50162 2.70989 8.19962 3.69539 8.88587 3.40889C9.57287 3.12014 10.0611 1.22114 10.9919 1.22339C11.9211 1.22864 12.3741 3.13139 13.0139 3.39539C13.6529 3.65639 15.3096 2.61914 15.9756 3.27014C16.6401 3.91889 15.6531 5.61689 15.9389 6.30464C16.2284 6.99014 18.1281 7.47914 18.1236 8.40839C18.1214 9.33989 16.2156 9.79139 15.9516 10.4304C15.6914 11.0686 16.7294 12.7269 16.0814 13.3914C15.4296 14.0566 13.7324 13.0696 13.0469 13.3569Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M14.6158 17.004C11.84 18.4132 10.9055 22.155 10.9055 22.155C10.9055 22.155 14.4748 23.616 17.2565 22.2082C20.0338 20.8042 20.963 17.058 20.963 17.058C20.963 17.058 17.3938 15.597 14.6158 17.004Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M7.31675 17.004C10.094 18.4132 11.027 22.155 11.027 22.155C11.027 22.155 7.4615 23.616 4.67675 22.2082C1.8995 20.8042 0.96875 17.058 0.96875 17.058C0.96875 17.058 4.53725 15.597 7.31675 17.004Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M10.9655 9.75449C11.7231 9.75449 12.3373 9.14033 12.3373 8.38274C12.3373 7.62514 11.7231 7.01099 10.9655 7.01099C10.2079 7.01099 9.59375 7.62514 9.59375 8.38274C9.59375 9.14033 10.2079 9.75449 10.9655 9.75449Z" fill="#330033"/>\n' +
                '<path d="M10.9663 15.4861V21.8213" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>'
    },
    {
        name:'Доставка',
        link:'/mobile',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                '<path d="M18.3335 18.2198C18.3335 19.4993 15.7811 20.5356 14.5 20.5356H3.31659C2.03776 20.5356 1 19.4993 1 18.2198V3.31735C1 2.03852 2.03776 1 3.31659 1H16.0169C17.2972 1 18.3342 2.03852 18.3342 3.31735V18.2198H18.3335Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M23.0182 18.2418C23.0182 19.5206 21.9805 20.5576 20.7009 20.5576H16.1867C14.9087 20.5576 13.8694 21.1026 13.8694 19.8238V8.22799C13.8694 6.94841 14.9087 5.91064 16.1867 5.91064H20.7009C21.9805 5.91064 23.0182 6.94917 23.0182 8.22799V18.2418Z" fill="white" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M23.0183 13.9504C20.8791 13.9504 21.6023 13.9777 20.3212 13.9777C20.3212 13.9777 18.3093 14.4082 18.3093 11.5178C18.3093 9.66286 18.3093 7.87994 18.3093 5.84155H20.701C21.9805 5.84155 23.0183 6.88083 23.0183 8.15966V13.9504Z" fill="white" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M7.74664 23.0001C9.15165 23.0001 10.2906 21.8611 10.2906 20.4561C10.2906 19.0511 9.15165 17.9121 7.74664 17.9121C6.34163 17.9121 5.20264 19.0511 5.20264 20.4561C5.20264 21.8611 6.34163 23.0001 7.74664 23.0001Z" fill="white" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M16.2867 22.9993C17.6912 22.9993 18.8299 21.8607 18.8299 20.4561C18.8299 19.0515 17.6912 17.9128 16.2867 17.9128C14.8821 17.9128 13.7434 19.0515 13.7434 20.4561C13.7434 21.8607 14.8821 22.9993 16.2867 22.9993Z" fill="white" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>'
    },
    {
        name:'Информация о магазине',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                '<path d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M13.6159 8.59995C14.3655 8.59995 14.9732 7.99224 14.9732 7.2426C14.9732 6.49296 14.3655 5.88525 13.6159 5.88525C12.8663 5.88525 12.2585 6.49296 12.2585 7.2426C12.2585 7.99224 12.8663 8.59995 13.6159 8.59995Z" fill="#330033"/>\n' +
                '<path d="M12.4068 10.5571C12.4068 10.5571 10.9044 14.3925 10.5097 15.4468C10.3306 15.9247 10.7233 16.4253 11.2066 16.83" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>',
        func: function () {
            aboutShop = !aboutShop
        }
    },
    {
        name:'Язык и валюта',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                '<path d="M16.2946 12.0166C16.2946 17.9584 14.371 22.7757 12.0007 22.7757C9.62809 22.7757 7.70752 17.9584 7.70752 12.0166C7.70752 6.07176 9.62885 1.25513 12.0007 1.25513C14.371 1.25513 16.2946 6.07176 16.2946 12.0166Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M2.46558 17.3567C4.87313 15.6124 8.27136 14.5237 12.0312 14.5237C15.7751 14.5237 19.1589 15.6048 21.565 17.3339" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M21.565 6.80957C19.1566 8.55389 15.7577 9.64181 11.9993 9.64181C8.25389 9.64181 4.87085 8.56225 2.46558 6.8316" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>',
        func: function () {
            language = !language
        }
    },
    {
        name:'Поиск',
        link:'/mobile',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="none">\n' +
                '            <path d="M6.71852 12.5579C9.945 12.5579 12.5606 9.94232 12.5606 6.71584C12.5606 3.48936 9.945 0.873779 6.71852 0.873779C3.49204 0.873779 0.876465 3.48936 0.876465 6.71584C0.876465 9.94232 3.49204 12.5579 6.71852 12.5579Z" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '            <path d="M10.8701 10.989L15.1235 15.126" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '            </svg>'
    }
]

export let menuItemsAuth = [
    {
        name:'Каталог',
        link:'/mobileCatalog',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">\n' +
                '<path d="M13.0469 13.3569C12.3591 13.6449 11.8694 15.5454 10.9401 15.5424C10.0109 15.5364 9.55712 13.6329 8.91962 13.3711C8.28062 13.1086 6.62087 14.1459 5.95712 13.4964C5.29187 12.8454 6.27887 11.1504 5.99237 10.4626C5.70512 9.77639 3.80387 9.28514 3.80762 8.35664C3.81137 7.42589 5.71487 6.97364 5.97812 6.33689C6.23987 5.69714 5.20262 4.03889 5.85137 3.37364C6.50162 2.70989 8.19962 3.69539 8.88587 3.40889C9.57287 3.12014 10.0611 1.22114 10.9919 1.22339C11.9211 1.22864 12.3741 3.13139 13.0139 3.39539C13.6529 3.65639 15.3096 2.61914 15.9756 3.27014C16.6401 3.91889 15.6531 5.61689 15.9389 6.30464C16.2284 6.99014 18.1281 7.47914 18.1236 8.40839C18.1214 9.33989 16.2156 9.79139 15.9516 10.4304C15.6914 11.0686 16.7294 12.7269 16.0814 13.3914C15.4296 14.0566 13.7324 13.0696 13.0469 13.3569Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M14.6158 17.004C11.84 18.4132 10.9055 22.155 10.9055 22.155C10.9055 22.155 14.4748 23.616 17.2565 22.2082C20.0338 20.8042 20.963 17.058 20.963 17.058C20.963 17.058 17.3938 15.597 14.6158 17.004Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M7.31675 17.004C10.094 18.4132 11.027 22.155 11.027 22.155C11.027 22.155 7.4615 23.616 4.67675 22.2082C1.8995 20.8042 0.96875 17.058 0.96875 17.058C0.96875 17.058 4.53725 15.597 7.31675 17.004Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M10.9655 9.75449C11.7231 9.75449 12.3373 9.14033 12.3373 8.38274C12.3373 7.62514 11.7231 7.01099 10.9655 7.01099C10.2079 7.01099 9.59375 7.62514 9.59375 8.38274C9.59375 9.14033 10.2079 9.75449 10.9655 9.75449Z" fill="#330033"/>\n' +
                '<path d="M10.9663 15.4861V21.8213" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>'
    },
    {
        name:'Доставка',
        link:'/mobile',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                '<path d="M18.3335 18.2198C18.3335 19.4993 15.7811 20.5356 14.5 20.5356H3.31659C2.03776 20.5356 1 19.4993 1 18.2198V3.31735C1 2.03852 2.03776 1 3.31659 1H16.0169C17.2972 1 18.3342 2.03852 18.3342 3.31735V18.2198H18.3335Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M23.0182 18.2418C23.0182 19.5206 21.9805 20.5576 20.7009 20.5576H16.1867C14.9087 20.5576 13.8694 21.1026 13.8694 19.8238V8.22799C13.8694 6.94841 14.9087 5.91064 16.1867 5.91064H20.7009C21.9805 5.91064 23.0182 6.94917 23.0182 8.22799V18.2418Z" fill="white" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M23.0183 13.9504C20.8791 13.9504 21.6023 13.9777 20.3212 13.9777C20.3212 13.9777 18.3093 14.4082 18.3093 11.5178C18.3093 9.66286 18.3093 7.87994 18.3093 5.84155H20.701C21.9805 5.84155 23.0183 6.88083 23.0183 8.15966V13.9504Z" fill="white" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M7.74664 23.0001C9.15165 23.0001 10.2906 21.8611 10.2906 20.4561C10.2906 19.0511 9.15165 17.9121 7.74664 17.9121C6.34163 17.9121 5.20264 19.0511 5.20264 20.4561C5.20264 21.8611 6.34163 23.0001 7.74664 23.0001Z" fill="white" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M16.2867 22.9993C17.6912 22.9993 18.8299 21.8607 18.8299 20.4561C18.8299 19.0515 17.6912 17.9128 16.2867 17.9128C14.8821 17.9128 13.7434 19.0515 13.7434 20.4561C13.7434 21.8607 14.8821 22.9993 16.2867 22.9993Z" fill="white" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>'
    },
    {
        name:'Информация о магазине',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                '<path d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M13.6159 8.59995C14.3655 8.59995 14.9732 7.99224 14.9732 7.2426C14.9732 6.49296 14.3655 5.88525 13.6159 5.88525C12.8663 5.88525 12.2585 6.49296 12.2585 7.2426C12.2585 7.99224 12.8663 8.59995 13.6159 8.59995Z" fill="#330033"/>\n' +
                '<path d="M12.4068 10.5571C12.4068 10.5571 10.9044 14.3925 10.5097 15.4468C10.3306 15.9247 10.7233 16.4253 11.2066 16.83" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>',
        func: function () {
            aboutShop = !aboutShop
        }
    },
    {
        name:'Язык и валюта',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                '<path d="M16.2946 12.0166C16.2946 17.9584 14.371 22.7757 12.0007 22.7757C9.62809 22.7757 7.70752 17.9584 7.70752 12.0166C7.70752 6.07176 9.62885 1.25513 12.0007 1.25513C14.371 1.25513 16.2946 6.07176 16.2946 12.0166Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M2.46558 17.3567C4.87313 15.6124 8.27136 14.5237 12.0312 14.5237C15.7751 14.5237 19.1589 15.6048 21.565 17.3339" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M21.565 6.80957C19.1566 8.55389 15.7577 9.64181 11.9993 9.64181C8.25389 9.64181 4.87085 8.56225 2.46558 6.8316" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>',
        func: function () {
            language = !language
        }
    },

    {
        name:'Избранное',
        link:'/mobile',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                '<path d="M22.5 8.45948C22.5 16.1072 12.0004 22.5 12.0004 22.5C12.0004 22.5 1.5 15.7685 1.5 8.45948C1.5 3.68474 4.45052 1.52967 7.22496 1.52967C9.77528 1.52967 11.6358 3.42784 12.0389 3.4083C12.4435 3.39093 14.4503 1.5 16.874 1.5C19.6179 1.5 22.5 3.6254 22.5 8.45948Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>'
    },


    {
        name:'Помощь',
        link:'/mobile',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                '<path d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M11.2578 14.2407V13.8188C11.2578 13.2095 11.3516 12.7095 11.5391 12.3188C11.7266 11.923 12.0755 11.5063 12.5859 11.0688C13.2943 10.4699 13.7396 10.0194 13.9219 9.71729C14.1094 9.4152 14.2031 9.05062 14.2031 8.62354C14.2031 8.09229 14.0312 7.68343 13.6875 7.39697C13.349 7.10531 12.8594 6.95947 12.2188 6.95947C11.8073 6.95947 11.4062 7.00895 11.0156 7.10791C10.625 7.20166 10.1771 7.37614 9.67188 7.63135L9.21094 6.57666C10.1953 6.06104 11.224 5.80322 12.2969 5.80322C13.2917 5.80322 14.0651 6.04801 14.6172 6.5376C15.1693 7.02718 15.4453 7.71729 15.4453 8.60791C15.4453 8.98812 15.3932 9.32406 15.2891 9.61572C15.1901 9.90218 15.0417 10.1756 14.8438 10.436C14.6458 10.6912 14.2188 11.1053 13.5625 11.6782C13.0365 12.1261 12.6875 12.4985 12.5156 12.7954C12.349 13.0923 12.2656 13.4881 12.2656 13.9829V14.2407H11.2578ZM10.875 16.561C10.875 15.8527 11.1875 15.4985 11.8125 15.4985C12.1146 15.4985 12.3464 15.5897 12.5078 15.772C12.6745 15.9543 12.7578 16.2173 12.7578 16.561C12.7578 16.8944 12.6745 17.1548 12.5078 17.3423C12.3411 17.5246 12.1094 17.6157 11.8125 17.6157C11.5417 17.6157 11.3177 17.535 11.1406 17.3735C10.9635 17.2069 10.875 16.936 10.875 16.561Z" fill="#330033"/>\n' +
                '<path d="M11.8734 17.8C12.5401 17.8 13.0806 17.2595 13.0806 16.5928C13.0806 15.9261 12.5401 15.3856 11.8734 15.3856C11.2067 15.3856 10.6663 15.9261 10.6663 16.5928C10.6663 17.2595 11.2067 17.8 11.8734 17.8Z" fill="#330033"/>\n' +
                '</svg>'
    },
    {
        name:'Поиск',
        link:'/mobile',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="none">\n' +
                '            <path d="M6.71852 12.5579C9.945 12.5579 12.5606 9.94232 12.5606 6.71584C12.5606 3.48936 9.945 0.873779 6.71852 0.873779C3.49204 0.873779 0.876465 3.48936 0.876465 6.71584C0.876465 9.94232 3.49204 12.5579 6.71852 12.5579Z" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '            <path d="M10.8701 10.989L15.1235 15.126" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '            </svg>'
    }
]

export const menuUser = [
    {
        name:'Мои заказы',
        link:'/mobile',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                '<path d="M20.5 20.6734C20.5 21.9554 19.507 23 18.2773 23H5.72261C4.49788 23 3.5 21.9607 3.5 20.6734V3.32657C3.5 2.04456 4.49284 1 5.72261 1H18.2773C19.507 1 20.5 2.04456 20.5 3.32657V20.6734Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M9.95605 3.78589H14.0486" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M7.54712 9.48877H16.4529" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M7.54712 13.3716H16.4529" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M7.54712 17.2546H16.4529" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>'
    },
    {
        name:'Мои события',
        link:'/mobile',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">\n' +
                '<path d="M21 20.8595C21 22.0389 19.8318 22.9999 18.385 22.9999H3.61483C2.17398 22.9999 1 22.0438 1 20.8595V4.90034C1 3.72088 2.16805 2.75989 3.61483 2.75989H18.385C19.8318 2.75989 21 3.72088 21 4.90034V20.8595Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M16 1L16 4.52001" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M6 1L6 4.52001" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M1 8.38232H21" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>'
    },
    {
        name:'Мои данные',
        link:'/mobile',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                '                <path d="M1.5 23C1.5 18.4734 6.20127 14.8031 11.9996 14.8031C17.7995 14.8031 22.5 18.4734 22.5 23" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '                <path d="M12.0005 14.134C15.4985 14.134 18.3342 11.1938 18.3342 7.56698C18.3342 3.94014 15.4985 1 12.0005 1C8.50244 1 5.66675 3.94014 5.66675 7.56698C5.66675 11.1938 8.50244 14.134 12.0005 14.134Z" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '                </svg>'
    },
    {
        name:'Мои купоны',
        link:'/mobile',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n' +
                '<path d="M9.34717 1.5H20.2793C21.5066 1.5 22.5 2.49759 22.5 3.72756V20.2739C22.5 21.5024 21.5066 22.4993 20.2793 22.4993H9.34717" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M5.03405 1.5H3.72078C2.49488 1.5 1.5 2.49759 1.5 3.72756V5.93919C2.29056 6.33229 2.83853 7.13948 2.83853 8.08349C2.83853 9.02679 2.29056 9.83542 1.5 10.2278V13.77C2.29056 14.1639 2.83853 14.971 2.83853 15.9143C2.83853 16.8583 2.29056 17.6677 1.5 18.0601V20.2746C1.5 21.5031 2.49488 22.5 3.72078 22.5H5.03405" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>'
    },
    {
        name:'Выйти',
        link:'/mobile',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none">\n' +
                '<path d="M1 3.33386C1 2.04624 2.04472 1 3.33158 1H16.3868C17.6744 1 18.7206 2.04624 18.7206 3.33386V20.6684C18.7206 21.9553 17.6744 23 16.3868 23H3.33234C2.04472 23 1.00076 21.9553 1.00076 20.6684" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M1.15527 11.9993H10.9149" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M6.65991 6.36133L12.2993 12.0014L6.65991 17.6393" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '</svg>',
        func: function(){
            user = !user
        }
    }
]

function openContactsUs() {
    connectUsVisible = !connectUsVisible
}
let closed = false;
     function closeMenu() {
         document.body.style.overflow  = 'scroll'
            closed = !closed
             setTimeout(()=>{visible = !visible}, 700)
    }

function stopScrolling() {
    document.body.style.overflow  = 'hidden'
}
export let infoItems = [
        {
            name:'О сервисе',
            link:'/about'
        },
        {
            name:'Помощь',
            link:'/help'
        },
        {
            name:'Улыбки получателей',
            link:'/smiles'
        },
        {
            name:'Отзывы',
            link:'/reviews'
        },
        {
            name:'Букеты для бизнеса',
            link:'/business'
        },
        {
            name:'Пользовательское соглашение',
            link:'/rules'
        }
    ]


    let yScrollMainMenu;

</script>

<style>
    .overlay {
        z-index: 998;
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        animation: overlay 700ms cubic-bezier(0.8, 0, 0.33, 1);
    }
    @keyframes overlay {
        from {
            background: rgba(0, 0, 0, 0);
        }
        to {
            background: rgba(0, 0, 0, 0.3);
        }
    }
    .forclosed {
        animation: forclosed 700ms cubic-bezier(0.8, 0, 0.33, 1);
        background: rgba(0, 0, 0, 0);
    }
    @keyframes forclosed {
        from {
            background: rgba(0, 0, 0, 0.3);
        }
        to {
            background: rgba(0, 0, 0, 0);
        }
    }
    .wrapper {
            left: 0px;
            background: var(--color-light);
            position: absolute;
            bottom:0;
            overflow: scroll;
            height: 100%;
            z-index: 9999;
            animation: wrapper 700ms cubic-bezier(0.8, 0, 0.33, 1);
            width: 297px;
            overflow: hidden;
    }
    .connect {
        border-top: 1px solid var(--gray-300);
    }
  .menu__content {
      height: calc(100% - 136px);
      overflow: auto;
      -webkit-overflow-scrolling: touch;
  }
    @keyframes wrapper {
        from {
            width: 0;
            transform: skewX(-12deg);
            left: -85px;
        }
        to {
            width: 297px;
            transform: skewX(0);
            left: 0;
        }
    }
    .closed {
        animation: closed 700ms cubic-bezier(0.8, 0, 0.33, 1);
        width: 0;
    }
    @keyframes closed {
        from {
            width: 297px;
            transform: skewX(0);
            left: 0;
        }
        to {
            width: 0;
            transform: skewX(-12deg);
            left: -85px;
        }
    }

    .header {
        width: 100%;
        height: 62px;
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .05);
    }
    .search {
        height: 62px;

    }
    .info {
        border-top: 1px solid var(--gray-300);

    }
    .menu__item {
        font-size: 16px;
        color: #000000;

    }
    .info__items {
        font-size: 16px;
        color: #000000;
        margin-top: 24px;
    }
    .subText {
        font-size: 12px;
        color: var(--gray-700);
    }
    .padding {
        padding-left: 16px;
        padding-right: 16px;
    }
    .user__photo {
        border-radius:50%;
        min-height: 50px;
        min-width: 50px;
        max-height: 50px;
        max-width: 50px;
        overflow:hidden;
        margin-right: 20px;
    }
    .menu__enter {
        border-top: 8px solid var(--gray-300);
        height: 62px;
        margin: 0 -16px;
        padding: 0 16px;
    }
    .user__menu {
        border-bottom: 8px solid var(--gray-300);
        margin: 0 -16px;
        padding: 0 16px;
    }
</style>

<div class="overlay" on:click={closeViaOverlay} class:forclosed={closed}>
<div class="wrapper"  bind:this={modalElement} class:closed={closed}          on:touchstart={stopScrolling()}>
    <div class="header flex items-center padding">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class="mr-24" on:click={closeMenu}>
            <path d="M1 1L15 15M15 1L1 15" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="195" height="26" viewBox="0 0 195 26" fill="none">
            <path d="M96.6755 14.162C96.6755 16.2051 96.1407 17.7989 95.0719 18.945C94.0032 20.0912 92.5145 20.6634 90.6078 20.6634C89.4157 20.6634 88.362 20.3994 87.4468 19.8725C86.5315 19.3446 85.8282 18.587 85.3357 17.5995C84.8432 16.6121 84.5975 15.4659 84.5975 14.162C84.5975 12.1345 85.1285 10.5518 86.1897 9.41301C87.2509 8.27423 88.7471 7.70483 90.6774 7.70483C92.523 7.70483 93.9844 8.28715 95.0606 9.4527C96.1378 10.6173 96.6755 12.1871 96.6755 14.162ZM87.3893 14.162C87.3893 17.0495 88.4778 18.4919 90.6539 18.4919C92.8074 18.4919 93.8846 17.0495 93.8846 14.162C93.8846 11.3048 92.7998 9.8772 90.6313 9.8772C89.4929 9.8772 88.6681 10.2454 88.1568 10.9837C87.6445 11.7229 87.3893 12.7832 87.3893 14.162Z" fill="#330033"/>
            <path d="M71.9652 7.93208V14.3421C71.9652 15.0887 71.904 16.185 71.7807 17.6321L78.1827 7.93115H81.4943V20.4357H78.887V14.1391C78.887 13.7921 78.9077 13.231 78.9501 12.4549C78.9925 11.6779 79.0283 11.1131 79.0593 10.7587L72.6799 20.4366H69.3683V7.93208H71.9652Z" fill="#330033"/>
            <path d="M61.121 20.6634C59.5061 20.6634 58.2519 20.0949 57.3602 18.9561H57.1992C57.3065 20.0119 57.3602 20.6514 57.3602 20.8775V26.0002H54.6493V7.93278H56.8414C56.9026 8.16533 57.0297 8.72365 57.2218 9.60496H57.3602C58.2058 8.33883 59.475 7.70483 61.1671 7.70483C62.7594 7.70483 63.9995 8.27054 64.8874 9.40102C65.7753 10.5324 66.2198 12.1188 66.2198 14.161C66.2198 16.2042 65.7678 17.798 64.8648 18.9441C63.9609 20.0903 62.7132 20.6634 61.121 20.6634ZM60.4637 9.8772C59.3865 9.8772 58.6003 10.1854 58.1041 10.8037C57.6078 11.422 57.3602 12.4095 57.3602 13.7661V14.162C57.3602 15.6846 57.6059 16.7874 58.0984 17.4694C58.5899 18.1514 59.3941 18.4919 60.5099 18.4919C61.4487 18.4919 62.1709 18.1154 62.6784 17.3614C63.1859 16.6075 63.4402 15.5333 63.4402 14.1389C63.4402 12.7371 63.1878 11.6758 62.685 10.9569C62.1803 10.2371 61.4402 9.8772 60.4637 9.8772Z" fill="#330033"/>
            <path d="M48.9261 20.4366L48.3837 18.6952H48.2915C47.6757 19.4565 47.057 19.9752 46.4337 20.2502C45.8103 20.5252 45.0109 20.6627 44.0345 20.6627C42.7802 20.6627 41.8019 20.3314 41.0985 19.6679C40.3951 19.0044 40.043 18.0667 40.043 16.8523C40.043 15.564 40.5317 14.5913 41.5081 13.9352C42.4846 13.28 43.9732 12.921 45.9723 12.8619L48.1756 12.7936V12.1264C48.1756 11.3282 47.9854 10.7292 47.605 10.3352C47.2246 9.93836 46.6342 9.73994 45.8339 9.73994C45.1804 9.73994 44.5533 9.83592 43.9535 10.0233C43.3537 10.2124 42.7765 10.4339 42.2237 10.6905L41.3471 8.79126C42.0392 8.43689 42.7962 8.16742 43.6201 7.98285C44.4431 7.79828 45.2199 7.70508 45.9506 7.70508C47.573 7.70508 48.7981 8.05299 49.6248 8.74512C50.4515 9.4391 50.8649 10.529 50.8649 12.0129V20.4366H48.9261ZM44.8885 18.6278C45.8725 18.6278 46.6625 18.3584 47.2595 17.8194C47.8555 17.2805 48.154 16.5247 48.154 15.552V14.4667L46.5156 14.5341C45.2388 14.5793 44.3103 14.7879 43.7294 15.1616C43.1484 15.5354 42.8584 16.1057 42.8584 16.8744C42.8584 17.4318 43.0269 17.8637 43.3659 18.1692C43.7039 18.4746 44.2115 18.6278 44.8885 18.6278Z" fill="#330033"/>
            <path d="M30.5529 12.929C31.7911 12.929 32.7026 12.7952 33.2864 12.5276C33.8702 12.26 34.1631 11.8475 34.1631 11.2901C34.1631 10.2713 33.2403 9.76369 31.3947 9.76369C30.164 9.76369 28.907 10.035 27.6226 10.5776L26.746 8.59907C28.23 8.00291 29.8684 7.70483 31.6603 7.70483C33.2441 7.70483 34.4747 7.98999 35.3514 8.55939C36.228 9.12878 36.6659 9.94365 36.6659 11.0068C36.6659 12.4095 35.8467 13.3286 34.2092 13.7651V13.8565C35.2318 14.1269 35.9644 14.5154 36.4069 15.0211C36.8485 15.5259 37.0698 16.1516 37.0698 16.8973C37.0698 18.0434 36.5566 18.957 35.5303 19.6399C34.5039 20.3228 33.0708 20.6625 31.2328 20.6625C29.2253 20.6625 27.6914 20.4022 26.6302 19.8817V17.5866C28.0379 18.2354 29.4946 18.5593 31.0021 18.5593C32.0868 18.5593 32.923 18.4107 33.5115 18.1136C34.1 17.8164 34.3938 17.3624 34.3938 16.7505C34.3938 16.1248 34.0981 15.6653 33.5058 15.3709C32.9135 15.0774 31.9983 14.9298 30.7601 14.9298H29.2027V12.9281H30.5529V12.929Z" fill="#330033"/>
            <path d="M24.6226 14.1615C24.6226 16.2046 24.0877 17.7984 23.019 18.9446C21.9503 20.0907 20.4616 20.6629 18.5548 20.6629C17.3628 20.6629 16.3091 20.399 15.3939 19.872C14.4786 19.3441 13.7752 18.5865 13.2828 17.5991C12.7903 16.6116 12.5446 15.4654 12.5446 14.1615C12.5446 12.134 13.0756 10.5513 14.1368 9.41253C15.198 8.27374 16.6942 7.70435 18.6245 7.70435C20.4701 7.70435 21.9315 8.28666 23.0077 9.45221C24.084 10.6168 24.6226 12.1866 24.6226 14.1615ZM15.3355 14.1615C15.3355 17.049 16.424 18.4914 18.6 18.4914C20.7535 18.4914 21.8307 17.049 21.8307 14.1615C21.8307 11.3044 20.746 9.87671 18.5774 9.87671C17.439 9.87671 16.6142 10.2449 16.1029 10.9832C15.5916 11.7224 15.3355 12.7827 15.3355 14.1615Z" fill="#330033"/>
            <path d="M11.1665 8.90368C11.1665 10.6303 10.5903 11.9537 9.43681 12.8728C8.2824 13.792 6.64117 14.2515 4.51031 14.2515H2.75703V20.4364H0V3.90649H4.85682C6.96414 3.90649 8.54322 4.32916 9.59218 5.17263C10.6421 6.01703 11.1665 7.26102 11.1665 8.90368ZM2.75703 11.9795H4.22218C5.63742 11.9795 6.67507 11.7377 7.33702 11.256C7.99803 10.7734 8.32948 10.0194 8.32948 8.99412C8.32948 8.04544 8.03381 7.3367 7.44154 6.86882C6.84927 6.40186 5.92649 6.16746 4.67321 6.16746H2.75703V11.9795Z" fill="#330033"/>
            <path d="M182.783 13.1664H186.232C187.839 13.1664 189.029 13.4581 189.802 14.0422C190.574 14.6273 190.961 15.4994 190.961 16.6603C190.961 17.9043 190.551 18.8438 189.732 19.4815C188.913 20.1182 187.708 20.4366 186.115 20.4366H180.866V8.04468H182.782V13.1664H182.783ZM182.783 14.7833V18.865H186.024C188.054 18.865 189.069 18.1682 189.069 16.7729C189.069 16.0799 188.834 15.5741 188.365 15.2576C187.896 14.9411 187.096 14.7823 185.965 14.7823H182.783V14.7833ZM195 20.4366H193.085V8.04468H195V20.4366Z" fill="#330033"/>
            <path d="M178.363 9.6495H174.257V20.4357H172.342V9.6495H168.281V8.04468H178.364V9.6495H178.363Z" fill="#330033"/>
            <path d="M161.924 20.663C160.055 20.663 158.579 20.1056 157.499 18.9899C156.419 17.8742 155.879 16.3257 155.879 14.3434C155.879 12.3454 156.381 10.7591 157.384 9.58337C158.388 8.40767 159.736 7.81982 161.428 7.81982C163.012 7.81982 164.267 8.33016 165.188 9.35174C166.111 10.3733 166.574 11.7198 166.574 13.3938V14.5806H157.864C157.901 16.0359 158.276 17.1396 158.988 17.8936C159.699 18.6475 160.701 19.025 161.993 19.025C163.353 19.025 164.7 18.7453 166.03 18.1879V19.8611C165.353 20.1481 164.714 20.3529 164.109 20.4775C163.505 20.6021 162.777 20.663 161.924 20.663ZM161.404 9.3905C160.389 9.3905 159.579 9.71534 158.976 10.3623C158.372 11.011 158.016 11.9089 157.909 13.0533H164.52C164.52 11.8711 164.251 10.9639 163.712 10.3355C163.173 9.70519 162.403 9.3905 161.404 9.3905Z" fill="#330033"/>
            <path d="M153.398 11.1537C153.398 11.9603 153.162 12.5731 152.689 12.9911C152.215 13.4092 151.553 13.6906 150.699 13.8327V13.9343C151.776 14.0773 152.563 14.3864 153.058 14.8617C153.554 15.337 153.802 15.9931 153.802 16.8292C153.802 17.9828 153.37 18.8724 152.505 19.4981C151.639 20.1237 150.376 20.4366 148.716 20.4366H143.143V8.04468H148.693C151.829 8.04468 153.398 9.08103 153.398 11.1537ZM151.53 11.3355C151.53 10.732 151.294 10.3047 150.82 10.0519C150.347 9.79992 149.63 9.67349 148.668 9.67349H145.058V13.1664H148.299C149.484 13.1664 150.319 13.0243 150.802 12.7373C151.287 12.4512 151.53 11.9834 151.53 11.3355ZM151.887 16.7055C151.887 16.0346 151.627 15.5465 151.108 15.241C150.588 14.9355 149.73 14.7833 148.53 14.7833H145.057V18.865H148.575C150.783 18.865 151.887 18.1452 151.887 16.7055Z" fill="#330033"/>
            <path d="M138.608 18.695H140.592V24.7443H138.734V20.4364H126.021V3.90649H127.982V18.695H136.646V3.90649H138.607V18.695H138.608Z" fill="#330033"/>
            <path d="M118.487 3.12105L118.045 1.78939L116.769 2.40585C115.939 2.80636 115.152 3.2078 114.403 3.612C113.759 2.78329 113.053 1.93243 112.28 1.05758L111.347 0L110.414 1.05758C109.642 1.93151 108.934 2.78237 108.289 3.61016C107.543 3.20595 106.756 2.80544 105.924 2.40492L104.647 1.78754L104.208 3.1192C102.006 9.78489 101.677 14.7636 102.454 18.3396C102.631 20.0764 103.373 21.6019 104.464 22.8237L104.471 22.8311C106.281 25.1216 108.829 26.0721 111.35 25.9946C113.868 26.0721 116.416 25.1225 118.225 22.8311L118.233 22.8237C119.323 21.6019 120.066 20.0755 120.244 18.3396C121.019 14.7645 120.689 9.78581 118.487 3.12105ZM111.347 2.99647C111.802 3.5391 112.235 4.07065 112.652 4.59483C112.204 4.86891 111.771 5.14115 111.349 5.41616C110.925 5.14115 110.489 4.86891 110.043 4.59483C110.458 4.06973 110.893 3.5391 111.347 2.99647ZM106.13 5.21774C107.243 5.78714 108.26 6.35653 109.191 6.925C107.272 8.38309 105.821 9.8338 104.764 11.2513C105.011 9.46558 105.452 7.45933 106.13 5.21774ZM116.269 21.3545C114.391 23.7318 111.345 24.0456 108.873 23.0203C106.403 21.9959 104.516 19.6334 104.951 16.6564C105.434 13.3554 108.62 9.29024 116.565 5.21774C119.11 13.6451 118.352 18.718 116.269 21.3545Z" fill="#330033"/>
        </svg>
    </div>
    <div class="menu__content" id="menu__content"  on:scroll={(e) => {
    yScrollMainMenu = e.target.scrollTop
    }}>
    <div class="menu padding">
        {#if !user}
        <div class="user__menu" on:click={()=>{
        logInVisible = !logInVisible
        }}>
            <div class="menu__enter flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none">\n' +
                    '<path d="M1 3.33386C1 2.04624 2.04472 1 3.33158 1H16.3868C17.6744 1 18.7206 2.04624 18.7206 3.33386V20.6684C18.7206 21.9553 17.6744 23 16.3868 23H3.33234C2.04472 23 1.00076 21.9553 1.00076 20.6684" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '<path d="M1.15527 11.9993H10.9149" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '<path d="M6.65991 6.36133L12.2993 12.0014L6.65991 17.6393" stroke="#330033" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '</svg>
                <div class="ml-20">
                    Войти
                </div>
            </div>
        </div>
            {#each menuItems as item, i}
                {#if item.func == undefined}
                    <div class="menu__item flex items-center mt-30 first:mt-24 last:mb-24 whitespace-nowrap">
                        {@html item.icon}
                        <div class="ml-20">
                            <a href="{item.link}">{item.name}</a>
                        </div>
                    </div>
                {:else}
                    <div class="menu__item flex items-center mt-30 first:mt-24 last:mb-24 whitespace-nowrap" on:click={item.func}>
                        {@html item.icon}
                        <div class="ml-20">
                            <a href="{item.link}">{item.name}</a>
                        </div>
                    </div>
                {/if}
            {/each}
        {:else}
            <div class="user flex items-center menu__item mt-24">
                <div class="user__photo">
                    <img src="{userInfo.photo}" alt="avatar">
                </div>
                <div class="user__name">
                    {userInfo.name}
                </div>
            </div>
        <div class="user__menu">
            {#each menuUser as item}
                {#if item.func == undefined}
                    <div class="menu__item flex items-center mt-30 first:mt-24 last:mb-24 whitespace-nowrap">
                        {@html item.icon}
                        <div class="ml-20">
                            <a href="{item.link}">{item.name}</a>
                        </div>
                    </div>
                {:else}
                    <div class="menu__item flex items-center mt-30 first:mt-24 last:mb-24 whitespace-nowrap" on:click={item.func}>
                        {@html item.icon}
                        <div class="ml-20">
                            <a href="{item.link}">{item.name}</a>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
            {#each menuItemsAuth as item, i}
                    {#if item.func == undefined}
                            <div class="menu__item flex items-center mt-30 first:mt-24 last:mb-24 whitespace-nowrap">
                                {@html item.icon}
                                <div class="ml-20">
                                    <a href="{item.link}">{item.name}</a>
                                </div>
                            </div>
                    {:else}
                            <div class="menu__item flex items-center mt-30 first:mt-24 last:mb-24 whitespace-nowrap" on:click={item.func}>
                                {@html item.icon}
                                <div class="ml-20">
                                    <a href="{item.link}">{item.name}</a>
                                </div>
                            </div>
                    {/if}
                {/each}
        {/if}
    </div>
    <div class="info padding">
        {#each infoItems as item}
            <div class="info__items items-center last:mb-30 whitespace-nowrap">
                <a href="{item.link}">{item.name}</a>
            </div>
        {/each}
    </div>
    </div>
    <div class="connect flex items-center padding pt-16 mb-16 pb-16" style="{yScrollMainMenu > 0 ? 'box-shadow: 4px 0 4px 4px rgba(0, 0, 0, .05);' : ''}">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" class="mr-24">
            <path d="M20.0001 40C31.0459 40 40.0003 31.0456 40.0003 19.9998C40.0003 8.95402 31.0459 0 20.0001 0C8.95437 0 0 8.95402 0 19.9998C0 31.0456 8.95437 40 20.0001 40Z" fill="#E71F75"/>
            <path d="M28.6532 11.3501C26.4937 9.19168 23.6255 8 20.5707 8C17.5158 8 14.6476 9.19168 12.4881 11.3501C8.3224 15.5138 8.02074 22.1662 11.7316 26.6745C11.2193 27.7226 10.616 28.4213 9.93124 28.7563C9.51466 28.9621 9.28004 29.412 9.34707 29.8714C9.4189 30.3357 9.77323 30.6946 10.2377 30.7664C10.4915 30.8047 10.7644 30.8286 11.0469 30.8286C12.4498 30.8286 13.9246 30.3452 15.1552 29.4981C16.8119 30.3883 18.6745 30.8573 20.5707 30.8573C23.6255 30.8573 26.4937 29.6704 28.6532 27.512C30.8127 25.3536 32.0001 22.482 32.0001 19.4334C32.0001 16.3848 30.8127 13.5085 28.6532 11.3501ZM27.7386 26.5931C25.8233 28.5075 23.276 29.5603 20.5707 29.5603C18.7607 29.5603 16.9843 29.077 15.4377 28.1677C15.3371 28.1102 15.2222 28.0767 15.1121 28.0767C14.9732 28.0767 14.8296 28.1246 14.7147 28.2107C13.2495 29.345 11.7747 29.5125 11.1283 29.5268C11.8992 28.9525 12.5456 28.0624 13.0867 26.8228C13.1872 26.5931 13.1441 26.3251 12.9765 26.1337C9.43326 22.1327 9.62 16.0355 13.4027 12.2546C15.318 10.3403 17.8653 9.2874 20.5707 9.2874C23.276 9.2874 25.8233 10.3403 27.7386 12.2546C31.6937 16.2126 31.6937 22.6448 27.7386 26.5931Z" fill="white"/>
            <path d="M25.3591 15.6575H15.7826C15.4235 15.6575 15.1362 15.9446 15.1362 16.3036C15.1362 16.6625 15.4235 16.9497 15.7826 16.9497H25.3591C25.7182 16.9497 26.0055 16.6625 26.0055 16.3036C26.0055 15.9446 25.7134 15.6575 25.3591 15.6575Z" fill="white"/>
            <path d="M25.3591 18.7828H15.7826C15.4235 18.7828 15.1362 19.07 15.1362 19.4289C15.1362 19.7879 15.4235 20.075 15.7826 20.075H25.3591C25.7182 20.075 26.0055 19.7879 26.0055 19.4289C26.0055 19.07 25.7134 18.7828 25.3591 18.7828Z" fill="white"/>
            <path d="M25.3591 21.9078H15.7826C15.4235 21.9078 15.1362 22.195 15.1362 22.5539C15.1362 22.9129 15.4235 23.2 15.7826 23.2H25.3591C25.7182 23.2 26.0055 22.9129 26.0055 22.5539C26.0055 22.195 25.7134 21.9078 25.3591 21.9078Z" fill="white"/>
        </svg>
        <div class="text-main" on:click={openContactsUs}>Связаться с нами</div>
    </div>
</div>
</div>

{#if connectUsVisible}
    <ContactUs bind:visible={connectUsVisible} disScroll={false}/>
{/if}
{#if aboutShop}
    <Popup title="Розарио.Цветы" bind:visible={aboutShop} size="max-height:95vh; width:100%;" disScroll=false>
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
{#if language}
    <CurrencyAndLanguage bind:visible={language} />
{/if}
{#if logInVisible}
    <LogIn bind:user bind:visible={logInVisible} bind:autorized={visible}/>
{/if}