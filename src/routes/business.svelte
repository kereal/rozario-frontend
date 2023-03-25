<script context="module" xmlns="http://www.w3.org/1999/html">
    export async function preload(page, session) {
        try {

            const res = await this.fetch(
                    `index.json?city=${page.host.split('.')[0]}&path=${page.path}`
            );
            const json = await res.json();
            return {
                cityMeta: json.cityMeta,
                testimonials: json.testimonials,
            };
        } catch (e) {
            console.log(e);
        }
    }

</script>
<script>
    import Breadcrumbs from "../components/Breadcrumbs.svelte";
    import Tabbar from "../components/Tabbar.svelte";
    import HelpCategory from "../components/HelpCategory.svelte";
    import Button from "../components/Button.svelte";
    import Testimonial from "../components/Testimonial.svelte";
    import ReadySolution from "../components/ReadySolution.svelte";
    import Slider from "../components/Slider.svelte";
    import ScrollSpy from "../utils/scrollSpy.js";
    import SignInModalNew from "../components/SignInModalNew.svelte";

    import { onMount, afterUpdate } from "svelte";
    import { stores } from "@sapper/app";

    let signInModalVisible = false;
    function closeSignInModal() {
        signInModalVisible = !signInModalVisible;
    }

    export let session = {};
    export let cityMeta;
    export let testimonials;
    export let user = false;
    let mapMarkers = []
    export let markers = [[69.043322, 33.052232],[69.023322, 33.082232],[69.023322, 33.062232]]
    const city_name = cityMeta.name;
    const photo_name = 'busunesBunner';
    let headers;
    let timeoutid;
    let currentMenuIndex = 0;
    let comfortableOrders;
    let HowItWorks;
    let ReadySolutions;
    let FAQ;
    let Reviews;
    let BuyersCard;
    let ContactUs;
    const photo = photo_name + '.jpg';
    const photo1_5 = photo_name + '@1.5x.jpg';
    const photo2 = photo_name + '@2x.jpg';
    const photo3 = photo_name + '@3x.jpg';

    const pathlist = [
        {
            'name': 'Доставка цветов',
            'href': '/'
        },
        {
            'name': city_name,
            'href': '#'
        }
    ];
    const advantages = [
        {tittle:'Оплата в 1 клик', text:'Заполните данные для выставления счёта один раз и используйте их для последующих заказов', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">\n' +
                    '<g clip-path="url(#clip0)">\n' +
                    '<path d="M41.7081 34.2931L21.7098 14.2948C21.4219 14.0109 20.9939 13.9229 20.6199 14.0788C20.246 14.2329 20.002 14.5988 20.002 15.0028V42.6924C20.002 43.0744 20.2199 43.4224 20.5639 43.5904C20.9079 43.7584 21.3179 43.7164 21.6158 43.4804L26.6934 39.5107L31.125 47.486C31.309 47.814 31.6489 48 32.0009 48C32.1509 48 32.3049 47.966 32.4489 47.894L38.4484 44.8942C38.6924 44.7723 38.8764 44.5563 38.9564 44.2963C39.0364 44.0343 39.0064 43.7523 38.8765 43.5144L34.7008 36.001H41.0003C41.4042 36.001 41.7682 35.757 41.9242 35.3831C42.0801 35.009 41.9941 34.5791 41.7081 34.2931ZM33.0029 34.0032C32.6489 34.0032 32.3209 34.1911 32.1409 34.4971C31.9609 34.8011 31.9549 35.1791 32.1269 35.489L36.6206 43.5744L32.4109 45.6802L27.8772 37.5168C27.7352 37.2608 27.4873 37.0789 27.2013 37.0208C27.1333 37.0069 27.0673 37.0009 27.0013 37.0009C26.7813 37.0009 26.5614 37.0748 26.3853 37.2128L22.0017 40.6405V17.4165L38.5883 34.0032H33.0029Z" fill="#E71F75"/>\n' +
                    '<path d="M21.0019 0C20.4499 0 20.002 0.447994 20.002 0.999947V6.99944C20.002 7.5514 20.4499 7.99939 21.0019 7.99939C21.5539 7.99939 22.0019 7.5514 22.0019 6.99944V0.999947C22.0018 0.447994 21.5539 0 21.0019 0Z" fill="#E71F75"/>\n' +
                    '<path d="M13.0033 13.9988H7.00385C6.4519 13.9988 6.00391 14.4468 6.00391 14.9987C6.00391 15.5507 6.4519 15.9987 7.00385 15.9987H13.0033C13.5553 15.9987 14.0033 15.5507 14.0033 14.9987C14.0033 14.4468 13.5553 13.9988 13.0033 13.9988Z" fill="#E71F75"/>\n' +
                    '<path d="M35.0014 13.9988H29.0019C28.4499 13.9988 28.002 14.4468 28.002 14.9987C28.002 15.5507 28.4499 15.9987 29.0019 15.9987H35.0014C35.5533 15.9987 36.0013 15.5507 36.0013 14.9987C36.0013 14.4468 35.5533 13.9988 35.0014 13.9988Z" fill="#E71F75"/>\n' +
                    '<path d="M16.0516 8.63525L11.808 4.39361C11.418 4.00364 10.784 4.00364 10.394 4.39361C10.0041 4.78358 10.0041 5.41756 10.394 5.80752L14.6377 10.0492C14.8337 10.2431 15.0896 10.3412 15.3456 10.3412C15.6016 10.3412 15.8575 10.2452 16.0516 10.0492C16.4415 9.6592 16.4415 9.02522 16.0516 8.63525Z" fill="#E71F75"/>\n' +
                    '<path d="M16.0516 19.9503C15.6616 19.5603 15.0276 19.5603 14.6377 19.9503L10.394 24.192C10.0041 24.5819 10.0041 25.2159 10.394 25.6059C10.5901 25.7998 10.846 25.8979 11.102 25.8979C11.358 25.8979 11.6139 25.7999 11.808 25.6059L16.0516 21.3642C16.4415 20.9743 16.4415 20.3403 16.0516 19.9503Z" fill="#E71F75"/>\n' +
                    '<path d="M31.6082 4.39356C31.2183 4.00163 30.5843 4.00163 30.1923 4.39356L25.9487 8.6352C25.5588 9.02517 25.5588 9.65915 25.9487 10.0491C26.1447 10.2431 26.4007 10.3411 26.6567 10.3411C26.9127 10.3411 27.1686 10.2451 27.3646 10.0491L31.6082 5.80747C31.9982 5.41751 31.9982 4.78559 31.6082 4.39356Z" fill="#E71F75"/>\n' +
                    '</g>\n' +
                    '<defs>\n' +
                    '<clipPath id="clip0">\n' +
                    '<rect width="48" height="48" fill="white" transform="translate(0.00195312)"/>\n' +
                    '</clipPath>\n' +
                    '</defs>\n' +
                    '</svg>'},
        {tittle:'Личный кабинет для руководителя',
            text:'Создайте один личный кабинет на всю компанию, добавьте любое число сотрудников, отслеживайте историю заказов и отчётность',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="37" viewBox="0 0 48 37" fill="none">\n' +
                    '<path d="M23.7272 22.4421C23.5529 22.2677 23.311 22.1674 23.0645 22.1674C22.8179 22.1674 22.576 22.2677 22.4016 22.4421C22.2273 22.6165 22.127 22.8584 22.127 23.1049C22.127 23.3515 22.2272 23.5934 22.4016 23.7677C22.5761 23.9421 22.8179 24.0424 23.0645 24.0424C23.311 24.0424 23.5529 23.9421 23.7272 23.7677C23.9015 23.5934 24.002 23.3515 24.002 23.1049C24.002 22.8584 23.9016 22.6165 23.7272 22.4421Z" fill="#E71F75" stroke="#E71F75" stroke-width="0.12"/>\n' +
                    '<path d="M23.7272 26.6123C23.5529 26.4379 23.311 26.3376 23.0645 26.3376C22.8179 26.3376 22.576 26.4379 22.4016 26.6123C22.2273 26.7866 22.127 27.0285 22.127 27.2751C22.127 27.5216 22.2272 27.7635 22.4016 27.9379C22.5761 28.1123 22.8179 28.2126 23.0645 28.2126C23.311 28.2126 23.5529 28.1123 23.7272 27.9379C23.9015 27.7635 24.002 27.5216 24.002 27.2751C24.002 27.0285 23.9016 26.7866 23.7272 26.6123Z" fill="#E71F75" stroke="#E71F75" stroke-width="0.12"/>\n' +
                    '<path d="M23.7272 31.3419C23.5529 31.1675 23.311 31.0672 23.0645 31.0672C22.8179 31.0672 22.576 31.1675 22.4016 31.3419C22.2273 31.5163 22.127 31.7581 22.127 32.0047C22.127 32.2513 22.2272 32.4931 22.4016 32.6675C22.5761 32.8419 22.8179 32.9422 23.0645 32.9422C23.311 32.9422 23.5529 32.8419 23.7272 32.6675C23.9015 32.4931 24.002 32.2513 24.002 32.0047C24.002 31.7581 23.9016 31.5163 23.7272 31.3419Z" fill="#E71F75" stroke="#E71F75" stroke-width="0.12"/>\n' +
                    '<path fill-rule="evenodd" clip-rule="evenodd" d="M14.7171 22.1007C13.3897 26.3847 13.0574 31.4352 13.0087 35.0001H23.002H33.9945C33.9415 31.4389 33.5792 26.3986 32.1346 22.125C31.343 19.7832 30.2496 17.7434 28.7687 16.2989C27.312 14.8781 25.4494 14.0001 23.002 14.0001C18.7153 14.0001 16.19 17.3474 14.7171 22.1007ZM23.002 12.0001C25.9945 12.0001 28.3519 13.0986 30.1652 14.8672C31.9543 16.6122 33.1809 18.9748 34.0293 21.4845C35.7234 26.4962 36.002 32.3808 36.002 36.0001C36.002 36.5523 35.5542 37.0001 35.002 37.0001H23.002H12.002C11.4497 37.0001 11.002 36.5523 11.002 36.0001C11.0019 32.3836 11.2572 26.5095 12.8068 21.5088C14.3405 16.5589 17.3152 12.0001 23.002 12.0001Z" fill="#E71F75"/>\n' +
                    '<path fill-rule="evenodd" clip-rule="evenodd" d="M3.25098 24.7387C2.30581 28.1316 2.05319 32.1238 2.0095 35.0052H9.03766H12.2877V37.0052H9.03766H1.00195C0.449669 37.0052 0.00195313 36.5575 0.00195313 36.0052C0.00194657 33.0651 0.188169 28.2806 1.32434 24.202C1.89185 22.1648 2.7182 20.2209 3.94457 18.7694C5.19671 17.2874 6.87464 16.3159 9.03766 16.3159C11.5842 16.3159 13.4353 17.6571 14.7269 19.5572L13.0728 20.6815C12.0491 19.1754 10.7554 18.3159 9.03766 18.3159C7.55783 18.3159 6.40986 18.9505 5.47228 20.0601C4.50892 21.2003 3.78169 22.8336 3.25098 24.7387Z" fill="#E71F75"/>\n' +
                    '<path fill-rule="evenodd" clip-rule="evenodd" d="M44.5981 24.7159C45.6071 28.1105 45.877 32.1063 45.9236 34.9919H38.3377L33.5634 34.9919V36.9919L38.3377 36.9919H46.9316C47.4839 36.9919 47.9316 36.5442 47.9316 35.9919C47.9316 33.0435 47.7325 28.2413 46.5152 24.1461C45.9066 22.0987 45.0209 20.1479 43.7104 18.6944C42.3737 17.2117 40.6026 16.2603 38.3377 16.2603C35.6723 16.2603 33.7129 17.5741 32.3283 19.483C32.004 19.9301 32.1036 20.5554 32.5507 20.8797C32.9977 21.2039 33.623 21.1044 33.9473 20.6573C35.0389 19.1523 36.4428 18.2603 38.3377 18.2603C39.9688 18.2603 41.2199 18.9187 42.225 20.0336C43.2564 21.1776 44.0322 22.8121 44.5981 24.7159Z" fill="#E71F75"/>\n' +
                    '<circle cx="8.94922" cy="11.4217" r="4" stroke="#E71F75" stroke-width="2"/>\n' +
                    '<circle r="4" transform="matrix(-1 0 0 1 38.3105 11.4217)" stroke="#E71F75" stroke-width="2"/>\n' +
                    '<circle cx="23.0645" cy="6.42166" r="5.12899" stroke="#E71F75" stroke-width="2"/>\n' +
                    '<path d="M18.5645 14.0665L23.0645 18.5665L27.5645 14.0665" stroke="#E71F75" stroke-width="2" stroke-linejoin="round"/>\n' +
                    '</svg>'},
        {tittle:'Онлайн-отчётность',
            text:'Единый договор со всеми магазинами-партнёрами, все необходимые документы создаются сразу после оформления заказа и доступны в любое время',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">\n' +
                    '<g clip-path="url(#clip0)">\n' +
                    '<path d="M37.4186 10H44.002C45.6588 10 47.002 11.3431 47.002 13V37C47.002 38.6569 45.6588 40 44.002 40H4.00195C2.3451 40 1.00195 38.6569 1.00195 37V13C1.00195 11.3431 2.3451 10 4.00195 10H10.5853" stroke="#E71F75" stroke-width="2" stroke-linejoin="round"/>\n' +
                    '<line x1="17.002" y1="47" x2="31.002" y2="47" stroke="#E71F75" stroke-width="2" stroke-linecap="round"/>\n' +
                    '<line x1="21.002" y1="41" x2="21.002" y2="46" stroke="#E71F75" stroke-width="2" stroke-linecap="round"/>\n' +
                    '<line x1="27.002" y1="41" x2="27.002" y2="46" stroke="#E71F75" stroke-width="2" stroke-linecap="round"/>\n' +
                    '<rect x="10.002" y="1" width="28" height="33" rx="1" stroke="#E71F75" stroke-width="2"/>\n' +
                    '<path d="M15.002 25L17.502 28L22.002 23" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '<path d="M31.4898 26H25.5141C25.2313 26 25.002 26.4477 25.002 27C25.002 27.5523 25.2313 28 25.5141 28H31.4898C31.7726 28 32.002 27.5523 32.002 27C32.002 26.4477 31.7726 26 31.4898 26Z" fill="#E71F75" stroke="#E71F75" stroke-width="0.05"/>\n' +
                    '<path d="M32.2196 7.00009L14.7844 7C14.3523 7 14.002 7.44768 14.002 7.99995C14.002 8.55223 14.3523 8.99991 14.7844 8.99991L32.2196 9C32.6516 9 33.002 8.55232 33.002 8.00005C33.002 7.44777 32.6516 7.00009 32.2196 7.00009Z" fill="#E71F75" stroke="#E71F75" stroke-width="0.05"/>\n' +
                    '<path d="M32.2196 13.5H14.7844C14.3523 13.5 14.002 13.9477 14.002 14.5C14.002 15.0523 14.3523 15.5 14.7844 15.5H32.2196C32.6516 15.5 33.002 15.0523 33.002 14.5C33.002 13.9477 32.6516 13.5 32.2196 13.5Z" fill="#E71F75" stroke="#E71F75" stroke-width="0.05"/>\n' +
                    '</g>\n' +
                    '<defs>\n' +
                    '<clipPath id="clip0">\n' +
                    '<rect width="48" height="48" fill="white" transform="translate(0.00195312)"/>\n' +
                    '</clipPath>\n' +
                    '</defs>\n' +
                    '</svg>'},
        {tittle:'Скидки',
            text:'Действует постоянная скидка 10% на все букеты, а также есть возможность накапливать и использовать купоны',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">\n' +
                    '<path d="M16.0352 35.3314L31.969 11.7085" stroke="#E71F75" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '<circle cx="24.002" cy="24" r="23" stroke="#E71F75" stroke-width="2"/>\n' +
                    '<circle cx="29.2829" cy="30.24" r="3.32" stroke="#E71F75" stroke-width="2"/>\n' +
                    '<circle cx="17.7614" cy="16.8" r="3.32" stroke="#E71F75" stroke-width="2"/>\n' +
                    '</svg>'},
        {tittle:'Все плюсы обычных заказов',
            text:'Можно делать заказ на сайте или в приложении, как обычно, отслеживать его выполнение, вносить изменения',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">\n' +
                    '<g clip-path="url(#clip0)">\n' +
                    '<path d="M24.4322 39.0135C24.1602 38.8839 23.8442 38.8839 23.5722 39.0135L6.15865 47.3079C6.15856 41.2218 6.15823 18.8382 6.1582 1.99866C6.1582 1.44725 6.60505 1 7.1582 1H40.8452C41.3975 1 41.8452 1.44771 41.8452 1.99999L41.8457 47.3079L24.4322 39.0135Z" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                    '<path d="M30.4682 11.2221L30.0682 10.0388L28.9118 10.5866C28.1604 10.9425 27.4474 11.2992 26.7694 11.6584C26.186 10.922 25.5464 10.1659 24.8462 9.38854L24.001 8.44879L23.1558 9.38854C22.4565 10.1651 21.816 10.9212 21.2318 11.6567C20.5555 11.2975 19.8425 10.9417 19.0894 10.5858L17.933 10.0372L17.5355 11.2205C15.5407 17.1435 15.2431 21.5675 15.9467 24.7451C16.107 26.2884 16.7791 27.6439 17.7667 28.7296L17.7735 28.7361C19.4127 30.7714 21.7205 31.6161 24.0036 31.5472C26.2841 31.6161 28.5919 30.7722 30.2311 28.7361L30.2379 28.7296C31.2255 27.6439 31.8984 26.2875 32.0596 24.7451C32.7615 21.5683 32.4622 17.1443 30.4682 11.2221ZM24.001 11.1114C24.4129 11.5936 24.8053 12.0659 25.1831 12.5317C24.7771 12.7752 24.3848 13.0171 24.0027 13.2615C23.6189 13.0171 23.2241 12.7752 22.8198 12.5317C23.1959 12.0651 23.5899 11.5936 24.001 11.1114ZM19.2762 13.0852C20.2843 13.5911 21.2054 14.0971 22.0488 14.6022C20.3107 15.8979 18.9965 17.1869 18.0387 18.4465C18.2622 16.8598 18.6622 15.077 19.2762 13.0852ZM28.4589 27.4241C26.7583 29.5365 23.9993 29.8153 21.7606 28.9042C19.5235 27.994 17.8144 25.8948 18.2084 23.2494C18.6451 20.3161 21.5312 16.704 28.7275 13.0852C31.0328 20.5736 30.3462 25.0813 28.4589 27.4241Z" fill="#E71F75"/>\n' +
                    '</g>\n' +
                    '<defs>\n' +
                    '<clipPath id="clip0">\n' +
                    '<rect width="48" height="48" fill="white" transform="translate(0.00195312)"/>\n' +
                    '</clipPath>\n' +
                    '</defs>\n' +
                    '</svg>'},
    ]
    const solutions = [
        {tittle:'Новогодние букеты', photo:'solution1.jpg', breadcrumbs: ['Розы', 'Шикарные']},
        {tittle:'Новогодние композиции', photo:'solution2.jpg', breadcrumbs: ['Цветы','Фрукты']},
        {tittle:'Букеты на 23 февраля', photo:'solution3.jpg', breadcrumbs: ['Продукты','Цветы','Напитки']},
        {tittle:'Букеты на 8 марта', photo:'solution4.jpg', breadcrumbs: ['Розы','Хризантемы']},
        {tittle:'Бизнес-поздравление', photo:'solution5.jpg', breadcrumbs: ['Розы','Шикарные']}
    ]
    const menulist = [
        { name: "Всё для комфортных заказов", index: 0 },
        { name: "Как это работает", index: 1 },
        { name: "Готовые решения", index: 2 },
        { name: "Частые вопросы", index: 3 },
        { name: "Отзывы", index: 4 },
        { name: "Карта покупателей", index: 5 },
        { name: "Свяжитесь с нами", index: 6 },
    ];

    let deliveryQA = [
        {question:'Как с вами подписать договор?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Какие закрывающие документы вы предоставляете и как их получить?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Какими способами можно оплатить заказ?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Можно ли оплатить заказ корпоративной банковской картой?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
        {question:'Можно ли создать один личный кабинет для нескольких сотрудников?', answer:'Да, такая возможность предусмотрена, для этого при оформлении заказа нужно выбрать пункт «Доставка к точному времени» и указать желаемое время доставки. Стоимость доставки в таком случае увеличится на 250 руб.'},
    ];

    let scrollSpy;
    function goToHeader(e) {
        const index = parseInt(e.detail.header);
        if (timeoutid) {
            clearTimeout(timeoutid);
        }
        scrollSpy.unblock();
        scrollSpy.block();
        window.scroll({
            top: scrollSpy._offsets[index] - 33,
            left: 0,
            behavior: "smooth"
        });
        timeoutid = setTimeout(() => {
            scrollSpy.unblock();
        }, 1000);
        console.log(scrollSpy._offsets[0])
    }

    function onQuestionOpenChanged() {
        setTimeout(function() {
            scrollSpy.refresh();
        }, 300);
    }
    let myMap;
    onMount(() => {

        function init(){
            myMap = new ymaps.Map("business__map", {
                center: cityMeta.shop.address.coordinates,
                zoom : 5
            });
            markers.forEach((element) => {
                let placemark = new ymaps.Placemark(element, {
                    hintContent: 'Собственный значок метки',
                    balloonContent: 'Это красивая метка'
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: 'mapMarker.png',
                    // Размеры метки.
                    iconImageSize: [32, 32],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-5, -38]
                })
                mapMarkers.push(placemark)
            });
            mapMarkers.forEach((element) => {
                myMap.geoObjects.add(element);
            })
        }
        ymaps.ready(init);

        headers = [comfortableOrders, HowItWorks, ReadySolutions, FAQ, Reviews, BuyersCard, ContactUs];
        scrollSpy = new ScrollSpy(window, headers);
        const setIndex = e => {
            currentMenuIndex = e.detail.index;
        };
        window.addEventListener("scrollspy-activate", setIndex);

        const images = document.querySelectorAll("img[data-src]");
        const sources = document.querySelectorAll("source[data-srcset]");
        function callback(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.tagName === "IMG") {
                        entry.target.src = entry.target.dataset.src;
                        entry.target.srcset = entry.target.dataset.srcset;
                        entry.target.removeAttribute("data-src");
                        entry.target.removeAttribute("data-srcset");
                    } else if (entry.target.tagName === "SOURCE") {
                        entry.target.srcset = entry.target.dataset.srcset;
                        entry.target.removeAttribute("data-srcset");
                    }
                    observer.unobserve(entry.target);
                }
            });
        }
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2
        };
        const observer = new IntersectionObserver(callback, options);

        Array.from(images).forEach(image => observer.observe(image));
        Array.from(sources).forEach(source => observer.observe(source));

        return () => {
            images.forEach(image => observer.unobserve(image));
            sources.forEach(source => observer.unobserve(source));
            observer.disconnect();
            scrollSpy.destroy();
            window.removeEventListener("scrollspy-activate", setIndex);
            clearTimeout(timeoutid);
        };
    });
    afterUpdate(() => {
        const setIndex = e => {
            currentMenuIndex = e.detail.index;
        };
        scrollSpy.destroy();
        window.removeEventListener("scrollspy-activate", setIndex);
        clearTimeout(timeoutid);

        headers = [comfortableOrders, HowItWorks, ReadySolutions, FAQ, Reviews, BuyersCard, ContactUs];
        scrollSpy = new ScrollSpy(window, headers);
        window.addEventListener("scrollspy-activate", setIndex);
    });
let width;
</script>

<svelte:window bind:innerWidth={width}/>

<style>
    .page {
        min-height: calc(100vh - 5.5rem);
    }
    .header {
        min-height: 332px;
        padding: 118px 80px 0;
    }
    .header__text {
        margin-top: 18px;
        padding-top: 18px;
        border-top: 1px solid rgba(255,255,255, 0.2);
        font-size: 14px;
        color: #FFFFFF;
    }
    h1 {
        font-size: 48px;
        line-height: 135%;
        margin-top: 8px;
    }
    .header img {
        z-index: -2;
    }
    .header::before {
        content: '';
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 14.82%, var(--color-dark) 100%);
        opacity: 0.7;
        position: absolute;
        z-index: -1;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .header,
    .header :global(a),
    .header :global(li+li::before) {
        color: var(--color-light);
    }
    .breadcrumbs :global(li) {
        font-size: 16px;
    }
    .breadcrumbs :global(li a) {
        opacity: .8;
    }
    .breadcrumbs :global(li a:hover) {
        opacity: 1;
    }
    .business__body {
        background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #F2F2F2;
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        border-radius: 4px;
        padding: 48px 80px;
        padding-bottom: 79px;
        border-top: none;
    }
    .business__advantages {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        width: 100%;
    }
    .business__advantage {
        flex-basis: calc(100% / 3 - 62px);
        margin-top: 40px;
        margin-right: 82px;
    }
    .business__advantage:nth-child(3n) {
        margin-right: 0;
    }

    .business__advantage_text {
        margin-left: 24px;
        max-width:300px;
    }
    .business__advantage_text h3{
        font-weight: 600;
        font-size: 15px;
        color: var(--color-main);
        margin-bottom: 8px;
    }
    .business__advantage_text p{
        font-size: 14px;
        line-height: 135%;
        color: var(--gray-600);
    }
    .business__howitworkItem {
        width: auto;
        display: flex;
        margin-right: 10px;
        margin-top: 30px;
    }
    .business__howitworkItem:last-child {
        margin-right: 0;
    }
    .business__howitworkAccount {
        min-width: 44px;
        min-height: 44px;
        border: 1px solid var(--gray-500);
        border-radius: 50%;
        box-sizing: border-box;
        font-size: 24px;
        color: var( --gray-600);
        margin-right: 10px;
        display: flex;
        justify-content: center;
    }
    .business__howitworkAccount_ok {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        box-sizing: border-box;
        margin-right: 10px;
        border: 1px solid var(--color-info);
        display: flex;
        justify-content: center;
    }
    .business__howitworkText {
        font-size: 16px;
        line-height: 130%;
        color: #000000;
        margin-top: 10px;
    }
    .business__solutionsText {
        margin-top: 12px;
        font-size: 16px;
        color: #000000;
    }
    .business__solutions {
        flex-wrap:wrap;
    }
    .business__solution {
        margin-right: 45px;
        margin-top: 34px;
        flex-basis: calc(100% / 3 - 30px);
    }
    .business__solution:nth-child(3n) {
        margin-right: 0;
    }
    .business__testimonials {
        margin-left: -75px;
        margin-right: -75px;
    }
    .business__map {
        height: 607px;
        width: 100%;
        margin-top: 34px;
    }
    h2{
        font-weight: bold;
        font-size: 24px;
        color: var(--color-main);
    }
    section {
        margin-bottom: 96px;
    }
    section:last-child {
        margin-bottom: 0;
    }
    .business__footerText {
        font-size: 16px;
        color: var(--gray-600);
        margin-bottom: 12px;
    }
    .business__footerDescript {
        font-size: 16px;
        color: var(--color-main);
    }
    .business__footerTextMini {
        font-size: 14px;
        color: var(--gray-600);
    }
    .business__footerAirplane {
        margin-left: 96px;
        margin-top: -56px;
    }
    @media (max-width: 1300px) {
        section {
            margin-bottom: 80px;
        }

        .business__advantage {
            flex-basis: calc(100% / 3 - 35px);
            margin-top: 40px;
            margin-right: 52px;
        }
        .business__advantage:nth-child(3n) {
            margin-right: 0;
        }
    }
    @media (max-width: 1280px) {
        .business__solution {
            margin-right: 35px;
            flex-basis: calc(100% / 2 - 80px);
        }
        .business__solution:nth-child(3n) {
            margin-right: 35px;
        }
        .business__solution:nth-child(2n) {
            margin-right: 0;
        }
    }
    @media (max-width: 1000px) {
        .business__body {
            padding: 40px 80px;
            padding-bottom: 63px;
        }
        .business__howitworkAccount {
            margin-right: 12px;
        }
        .business__advantage {
            flex-basis: calc(100% / 2 - 35px);
            margin-right: 69px;
        }
        .business__advantage:nth-child(3n) {
            margin-right: 69px;
        }
        .business__advantage:nth-child(2n) {
            margin-right: 0;
        }
        .business__solution {
            flex-basis: calc(100% / 2 - 80px);
        }
        .business__map {
            margin-top: 30px;
        }
        section {
            margin-bottom: 68px;
        }
        h2{
            font-size: 24px;
        }
    }
</style>

<div class="page">
    <div class="header image-box relative">
        <img
                class="w-full h-full rounded absolute object-cover inset-0"
                data-src="{photo}"
                data-srcset="{photo},
                {photo1_5} 1.5x,
                {photo2} 2x,
                {photo3} 3x"
                itemprop="image"
                alt="photo" />
        <div class="breadcrumbs">
            <Breadcrumbs {pathlist} />
        </div>
        <h1 class="font-bold">Букеты для бизнеса </h1>
        <p class="header__text">Поздравить коллег и партнёров, поблагодарить  клиентов, оформить мероприятие теперь ещё проще с Розарио.Цветы</p>
    </div>
    <div class="h-full">
        <Tabbar
                pos="top: 5rem;"
                className="sticky"
                bigPadding = true;
                on:change={goToHeader}
                {currentMenuIndex}
                {menulist} />
        <div class="business__body">
            <section bind:this={comfortableOrders}>
                <h2>Всё необходимое для комфортных заказов</h2>
                <div class="business__advantages">
                    {#each advantages as advantage}
                        <div class="business__advantage flex">
                            <div class="business__advantage_icon">
                                {@html advantage.icon}
                            </div>
                            <div class="business__advantage_text">
                                <h3>{advantage.tittle}</h3>
                                <p>{advantage.text}</p>
                            </div>
                        </div>
                    {/each}
                </div>
                <div class="mt-40">
                    {#if !user}
                        <a href="/profile/business">
                            <Button size="lg">Создать личный кабинет</Button>
                        </a>
                    {/if}
                </div>
            </section>
            <section bind:this={HowItWorks}>
                <h2>Как это работает</h2>
                <div class="flex">
                    <div class="business__howitworkItem">
                        <div class="flex">
                            <div>
                                <div class="business__howitworkAccount">
                                    <span class="mt-2">1</span>
                                </div>
                            </div>
                        <div class="business__howitworkText"><span class="whitespace-nowrap">Создайте личный</span> кабинет</div>
                        </div>
                        <div>
                            {#if width > 1200}
                                <svg xmlns="http://www.w3.org/2000/svg" width="86" height="12" viewBox="0 0 86 12" fill="none" class="ml-10 mt-14">
                                    <path d="M80 10.7378L85 6.23378L80 1.73779" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <line x1="0.75" y1="6.25012" x2="78.25" y2="6.25012" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="4 8"/>
                                    <line x1="76.75" y1="6.25012" x2="84.25" y2="6.25012" stroke="#999999" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" width="65" height="12" viewBox="0 0 65 12" fill="none" class="ml-10 mt-14">
                                    <path d="M59.7656 10.7378L64.001 6.23378L59.7656 1.73779" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <line x1="0.75" y1="6.25" x2="58.25" y2="6.24999" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="4 8"/>
                                    <line x1="57.127" y1="6.25012" x2="63.2506" y2="6.25012" stroke="#999999" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                            {/if}
                        </div>
                    </div>
                    <div class="business__howitworkItem">
                        <div class="flex">
                            <div>
                                <div class="business__howitworkAccount">
                                    <span class="mt-2">2</span>
                                </div>
                            </div>
                        <div class="business__howitworkText">Добавьте сотрудников, если необходимо</div>
                        </div>
                        <div>
                            {#if width > 1200}
                                <svg xmlns="http://www.w3.org/2000/svg" width="86" height="12" viewBox="0 0 86 12" fill="none" class="ml-10 mt-14">
                                    <path d="M80 10.7378L85 6.23378L80 1.73779" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <line x1="0.75" y1="6.25012" x2="78.25" y2="6.25012" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="4 8"/>
                                    <line x1="76.75" y1="6.25012" x2="84.25" y2="6.25012" stroke="#999999" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                                {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" width="65" height="12" viewBox="0 0 65 12" fill="none" class="ml-10 mt-14">
                                    <path d="M59.7656 10.7378L64.001 6.23378L59.7656 1.73779" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <line x1="0.75" y1="6.25" x2="58.25" y2="6.24999" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="4 8"/>
                                    <line x1="57.127" y1="6.25012" x2="63.2506" y2="6.25012" stroke="#999999" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                            {/if}

                        </div>

                    </div>
                    <div class="business__howitworkItem">
                        <div class="flex">
                            <div>
                                <div class="business__howitworkAccount_ok">
                                    <svg class="mt-14" xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14" fill="none">
                                        <path d="M19 1L7.92308 13L1 5.5" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        <div class="business__howitworkText">Используйте все преимущества сервиса</div>
                        </div>
                    </div>
                </div>
            </section>
            <section bind:this={ReadySolutions}>
                <h2>Готовые решения</h2>
                <p class="business__solutionsText">Мы подобрали букеты и композиции для разных случаев и на любой бюджет</p>
                <div class="business__solutions flex">
                    {#each solutions as solution}
                        <div class="business__solution">
                            <ReadySolution photo={solution.photo} tittle={solution.tittle} breadcrumbs={solution.breadcrumbs}/>
                        </div>
                    {/each}
                </div>
            </section>
            <section bind:this={FAQ}>
                <h2>Частые вопросы</h2>
                <div class="deliveri_FAQ_qs">
                    <HelpCategory className="questions-category_withoutMargin" qaList={deliveryQA} {onQuestionOpenChanged}></HelpCategory>
                </div>
            </section>
            <section  bind:this={Reviews}>
                <h2 class="mb-24">Отзывы наших клиентов</h2>
                <div class="business__testimonials">
                <Slider sliderName="testimonial" forDesktop="4" middle="3" small="3" height="305">
                    {#each testimonials as testimonial}
                        <div class="swiper-slide" >
                            <Testimonial {testimonial} version="2" />
                        </div>
                    {/each}
                </Slider>
                </div>
            </section>
            <section bind:this={BuyersCard}>
                <h2>Карта покупателей</h2>
                <p class="business__solutionsText">Более 1000 компаний в России отправляют цветы и подарки с помощью Розарио.Цветы</p>
                <div class="business__map" id="business__map">

                </div>
                
            </section>
            <section class="business__footer" bind:this={ContactUs}>
                <h2>Свяжитесь с нами</h2>
                <div class="flex">
                <div>
                <p class="business__footerText">Если у вас остались вопросы, позвоните нам:</p>
                <p class="mb-30 flex items-center">
                    <a class="business__footerDescript" href="tel:88002506470">8 (800) 250-64-70</a>
                    <span class="business__footerTextMini ml-6">(бесплатно по России)</span></p>
                <p class="business__footerText">Напишите нам:</p>
                <div class="flex items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="17" viewBox="0 0 24 17" fill="none">
                        <path d="M21.0063 0.5H2.99375C1.89375 0.5 1 1.3927 1 2.49142V14.5086C1 15.6073 1.89375 16.5 2.99375 16.5H21.0063C22.1063 16.5 23 15.6073 23 14.5086V2.49142C23 1.3927 22.1063 0.5 21.0063 0.5ZM20.7313 1.73605L12 8.397L3.26875 1.73605H20.7313ZM21.0063 15.1953H2.99375C2.58125 15.1953 2.2375 14.8519 2.2375 14.4399V2.49142L11.6562 9.63305C11.7937 9.70172 11.9312 9.77039 12 9.77039C12.0688 9.77039 12.275 9.70172 12.3438 9.63305L21.7625 2.49142V14.4399C21.7625 14.8519 21.4188 15.1953 21.0063 15.1953Z" fill="#CC6699" stroke="#CC6699" stroke-width="0.2"/>
                        </svg>
                    </span>
                    <a class="business__footerDescript ml-12" href="mailto:info@rozariofl.ru">info@rozariofl.ru</a>
                </div>
                </div>
                <div class="business__footerAirplane">
                    <svg xmlns="http://www.w3.org/2000/svg" width="173" height="211" viewBox="0 0 173 211" fill="none">
                        <path d="M73.9107 34.0583L168.553 13.3328L125.414 67.0111L114.236 61.8838L109.778 55.9637L97.8378 64.5921L92.7739 41.4394L79.9929 41.1082L73.9107 34.0583Z" fill="white"/>
                        <path d="M97.6222 64.5448L92.5898 41.5848L168.389 13.5925L106.114 51.3349L97.6222 64.5448Z" fill="#E9E9E9"/>
                        <path d="M109.573 56.0529L106.428 51.6497C103.702 55.7384 98.25 63.9788 98.25 64.2305C98.25 64.4821 105.798 58.8836 109.573 56.0529Z" fill="#C4C4C4"/>
                        <path d="M168.553 13.3328L73.9107 34.0583L79.9929 41.1082L92.7739 41.4394M168.553 13.3328L125.414 67.0111L114.236 61.8838L109.778 55.9637M168.553 13.3328L92.7739 41.4394M168.553 13.3328L106.116 51.1008M106.116 51.1008L97.8378 64.5921M106.116 51.1008L109.778 55.9637M97.8378 64.5921L92.7739 41.4394M97.8378 64.5921L109.778 55.9637" stroke="#330033" stroke-width="3" stroke-linejoin="round"/>
                        <path d="M90.0134 66.4317C90.0134 66.4317 68.0302 64.8481 52.8852 81.3191C47.4605 87.2188 27.5739 123.724 52.8632 143.106C57.3871 146.573 69.8818 150.483 74.9902 142.595C78.2957 137.491 74.1949 129.285 67.7616 124.307C65.6197 122.65 29.0933 100.809 8.69442 143.154C-7.39804 176.56 23.9218 198.923 23.9218 198.923" stroke="#330033" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 8"/>
                    </svg>
                </div>
                </div>
            </section>
        </div>
        <a href="profile/business#RequisitesBlock">
            {#if user}
                <Button size="full" className="mt-6 mb-10">Стать корпоративным клиентом</Button>
            {:else}
                <Button size="full" className="mt-6 mb-10" on:click={closeSignInModal}>Стать корпоративным клиентом</Button>
            {/if}
        </a>
    </div>
</div>

{#if signInModalVisible}
    <SignInModalNew {session} on:close={closeSignInModal} />
{/if}