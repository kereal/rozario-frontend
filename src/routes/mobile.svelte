<script context="module">
    export async function preload(page, session) {
        try {
            const res = await this.fetch(
                    `index.json?city=${page.host[0]}&path=${page.path}`
            );
            const json = await res.json();

            return {
                cityMeta: json.cityMeta,
                page: page
            };
        } catch (e) {
            console.log(e);
        }
    }
</script>
<script>
    import { onMount } from "svelte";

    import Header from '../mobileComponents/Header.svelte';
    import Button from '../mobileComponents/Button.svelte';
    import ProductCart from '../mobileComponents/ProductCart.svelte';
    import Slider from "../mobileComponents/Slider.svelte";
    import Smile from "../mobileComponents/Smile.svelte";
    import Recall from "../mobileComponents/Recall.svelte";
    import BlogPost from "../mobileComponents/BlogPost.svelte";
    import BigProductCart from "../mobileComponents/BigProductCart.svelte";
    import CouponAvailable from "../mobileComponents/CouponAvailable.svelte";
    import Nav from "../mobileComponents/Nav.svelte";
    import Footer from "../mobileComponents/Footer.svelte";
    import PickUpBouquet from "../mobileComponents/PickUpBouquet.svelte";


    export let cityMeta;
    export let page;
    console.log(page)
    export let user = false;



    export const coupon = {
                            text: '-200 ₽ по промокоду',
                            subText: 'До 31 января на первый заказ от 1500 ₽',
                            color:'#FFDC00',
                            promo: 'CVETI200'
                        }


    export const posts = [
        {
            title: 'Новогодний интерьер: украшаем дом чужими руками',
            date: '20 апреля',
            photo: 'smiles/smile1'
        },
        {
            title: 'Что делать, если хочешь в отпуск',
            date: '20 апреля',
            photo: 'smiles/smile1'
        },
        {
            title: 'Весна пришла',
            date: '20 апреля',
            photo: 'smiles/smile1'
        },
        {
            title: 'Какой-то заголовок',
            date: '20 апреля',
            photo: 'smiles/smile1'
        },
    ];

    export const testimonials = [
        {
            name: "София Великая",
            ordernumber: "1234556",
            date: "10.12.1994",
            testimonial:
                    "“Спасибо огромное что из другой страны можно поздравить близких . Заказал розы (06.03) на День рождения доставка в тот же день."
        },
        {
            name: "София Великая",
            ordernumber: "1234556",
            date: "10.12.1994",
            testimonial:
                    "“Спасибо огромное что из другой страны можно поздравить близких . Заказал розы (06.03) на День рождения доставка в тот же день."
        },
        {
            name: "София Великая",
            ordernumber: "1234556",
            date: "10.12.1994",
            testimonial:
                    "“Спасибо огромное что из другой страны можно поздравить близких . Заказал розы (06.03) на День рождения доставка в тот же день."
        }
    ]
    const smiles = [
        {
            title: "Букет из красных роз и зеленых георгин",
            img: "https://i.ibb.co/23w35qC/photo.png",
            date: "today",
        },
        {
            title: "Букет из красных роз и зеленых георгин",
            img: "https://i.ibb.co/23w35qC/photo.png",
            date: "today",
        },
        {
            title: "Букет из красных роз и зеленых георгин",
            img: "https://i.ibb.co/23w35qC/photo.png",
            date: "today",
        },
        {
            title: "Букет из красных роз и зеленых георгин",
            img: "https://i.ibb.co/23w35qC/photo.png",
            date: "today",
        },
        {
            title: "Букет из красных роз и зеленых георгин",
            img: "https://i.ibb.co/23w35qC/photo.png",
            date: "today",
        },
        {
            title: "Букет из красных роз и зеленых георгин",
            img: "https://i.ibb.co/23w35qC/photo.png",
            date: "today",
        },
        {
            title: "Букет из красных роз и зеленых георгин",
            img: "smile-test",
            date: "today",
        },
        {
            title: "Букет из красных роз и зеленых георгин",
            img: "smile-test2",
            date: "today",
        },
    ];
    export const recomendationProducts = [
        {
            name: 'Шикарный букет разноцветных роз',
            extra:'%',
            share:'Новинка',
            rating: '5',
            price: 3500,
            photo: '/recommendation.png',
                        size: {
                height: 25,
                width:25
            },
        },
        {
            name: 'Шикарный букет разноцветных роз',
            rating: '5',
            price: 3500,
            photo: 'recommendation.png',
                        size: {
                height: 25,
                width:25
            },
        },
        {
            name: 'Шикарный букет разноцветных роз',
            rating: '5',
            price: 3500,
            chip: 3800,
            photo: './recommendation.png',
                        size: {
                height: 25,
                width:25
            },
        },
        {
            name: 'Шикарный букет разноцветных роз',
            rating: '5',
            price: 3500,
            photo: '/recommendation.png',
                        size: {
                height: 25,
                width:25
            },
        },
        {
            name: 'Шикарный букет разноцветных роз',
            rating: '5',
            price: 3500,
            chip: 3800,
            photo: './recommendation.png',
                        size: {
                height: 25,
                width:25
            },
        },
        {
            name: 'Шикарный букет разноцветных роз',
            rating: '5',
            price: 3500,
            photo: '/recommendation.png',
                        size: {
                height: 25,
                width:25
            },
        },
        {
            name: 'Духи GUERLAIN 250 мл ',
            rating: '5',
            price: 3500,
            chip: 3800,
            photo: './recommendation.png',
                        size: {
                height: 25,
                width:25
            },
        },
        {
            name: 'Духи GUERLAIN 250 мл ',
            rating: '5',
            price: 3500,
            photo: '/recommendation.png',
                        size: {
                height: 25,
                width:25
            },
        }
    ]

    export let categories = []
    async function getCategories() {
        let response = await fetch('https://api.rozarioflowers.ru/catalog/productCategories/default/active?json');
        let commits = await response.json();
        categories = []
        for(let i = 0; i < commits.categories.length; i++) {
            if(commits.categories[i].level == 0) {
                categories.push(commits.categories[i])
            }
        }
        console.log(categories)
    }
    export let colorsCategories = ['#FFE6EA', '#FEFFD8', '#E3FFD2;', '#DCECFF', '#CAF8EA', '#FFE1BC', '#FFEAFC', '#FAFFBA']
    export const products = [
        {
            name:'Шикарный букет разноцветных роз',
            id:'1',
            photo:'/recommendation',
            size: {
                height: 25,
                width:25
            },
            price: 5000,
            discont:3444,
            rating: 5,
            share: 'Новинка',
            extra:'1+1'
        },
        {
            name:'Шикарный букет разноцветных роз',
            id:'2',
            photo:'/recommendation',
            size: {
                height: 25,
                width:25
            },
            price: 5000,
            discont:3444,
            rating: 5,
            share: 'Новинка',
        },
        {
            name:'Шикарный букет разноцветных роз',
            id:'3',
            photo:'/recommendation',
            size: {
                height: 25,
                width:25
            },
            price: 5000,
            discont:3444,
            rating: 5,
        },
    ]

    let PickUpBouquetVisible = false;

    function openPickUpBouquet() {
        PickUpBouquetVisible = !PickUpBouquetVisible;
    }
    onMount(() => {
        let navigator = window.navigator.userAgent
        if ( navigator.indexOf("Android") == -1 && navigator.indexOf("webOS") == -1 &&
                navigator.indexOf("iPhone") == -1 && navigator.indexOf("iPad") == -1 &&
                navigator.indexOf("iPod") == -1 && navigator.indexOf("BlackBerry") == -1 &&
                navigator.indexOf("IEMobile") == -1 && navigator.indexOf("Opera Mini") == -1) {
            window.location = '/'
        }
        let myStorage = window.localStorage;
        getCategories()
        localStorage.setItem('path', page.path);
        const images = document.querySelectorAll("img[data-src]");
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2
        };
        function callback(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.dataset.src;
                    observer.unobserve(entry.target);
                }
            });
        }
        const observer = new IntersectionObserver(callback, options);
        Array.from(images).forEach(image => observer.observe(image));

        return () => {
            images.forEach(image => observer.unobserve(image));
            observer.disconnect();
        };
    });

   // cityMeta.locativus = 'в Петропавловске-Камчатском'

</script>

<style>

    .padding {
        padding-left: 16px;
        padding-right: 16px;
    }
    .content {
        padding-bottom: 26px;
    }
    header {
        position: sticky;
        top:0;
        z-index: 2;
    }
    h2 {
        font-weight: 600;
        font-size: 20px;
        color: var(--color-main);
        margin-bottom: 18px;
    }
    .banner {
             height: 226px;
             margin: 0 -16px;
         }
    .banner h2{
        position: absolute;
        left:16px;
        top: 0;
    }
    .banner img{
        right: 0;
        height: 281px;
    }
    .pickupButton {
        position: absolute;
        left: calc(50% - 102px);
        bottom: 27px;
    }
    .banner__name {
        padding: 30px 0 0 0;
        font-weight: 600;
        font-size: 24px;
        color: var(--color-main);
        background: transparent;
        max-width:75%;
    }
    .nav {
        border-top: 1px solid var(--gray-200);
        margin: 0 -16px;
        padding: 0 16px;
        padding-top: 15px;
        position: relative;
    }
    .coupon {
        margin: 0 -16px 0 -16px;
        border-bottom: 8px solid var(--gray-200);
        padding: 30px 16px 18px 16px;
    }
    .recomendationProduct {
        flex-basis: calc(100% / 2 - 4px);
        max-width: calc(100% / 2 - 4px);
        margin-top: 8px;
    }
    .recomendationProduct:nth-child(3n){
        display: none;
    }
    .recomendationProduct:nth-child(4n){
        display: none;
    }
    @media (min-width: 500px) {
        .recomendationProduct {
            flex-basis: calc(100% / 3 - 4px);
            max-width: calc(100% / 3 - 4px);
        }
        .recomendationProduct:nth-child(3n){
            display: block;
        }
    }
    @media (min-width: 700px) {
        .recomendationProduct {
            flex-basis: calc(100% / 4 - 4px);
            max-width: calc(100% / 4 - 4px);
        }
        .recomendationProduct:nth-child(4n){
            display: block;
        }
    }
    .slider {
        margin: 0 -16px;
        overflow-y: visible;
    }
    .slider__button {
        min-width: 120px;
        height: 40px;
        background: var(--gray-200);
        border-radius: 16px;
        font-weight: 600;
        font-size: 15px;
        color: var(--color-main);
    }
    .catalog__button {
        width: 100%;
        height: 46px;
        border: 1px solid var(--gray-1000);
        box-sizing: border-box;
        border-radius: 16px;
        margin-bottom: 26px;
        font-size: 15px;
        color: var(--color-main);
        padding: 0 12px 0 16px;
    }
    .catalog__category {
        flex-basis: calc(100% / 2 - 8px);
        border-radius: 8px;
        height: 136px;
        margin-bottom: 16px;
        overflow:hidden;
    }
    .category__text {
        font-weight: 600;
        font-size: 15px;
    }
    .category__photo img{
        position: absolute;
        width: 65%;
        max-height: 100%;
        bottom:0;
        right:0;
    }
    .catalog__button_arrow {
        width: 27px;
        height: 27px;
        background: var(--gray-300);
        border-radius: 50%;
    }
    .lastSlide {
        min-width: 237px;
        height: 392px;
        border-radius: 20px;
        overflow:hidden;
        margin-top: -10px;
    }
    .lastSlide img{
        min-width: 237px;
        height: 392px;
        border-radius: 20px;
    }
    .infoBlock {
        padding-bottom: 40px;
    }
    .infoBlock:last-child {
        padding-bottom: 0;
    }
    .infoBlock:first-child {
        padding-top: 24px;
    }
</style>

<div class="main">
    <header class="padding">
        <Header bind:user={user}/>
    </header>
    <div class="content padding">
        {#if !user}
            <div class="banner relative">
                    <img src="Glavnaya_Foto.png" alt="lastSlide" class="absolute">
                <h2 class="banner__name">
                    Доставка цветов <br />в Петропавловске-Камчатском
                    <!--{cityMeta.locativus}-->
                </h2>
                <div class="pickupButton flex justify-center mt-30 m-auto">
                    <Button size="sm">
                        <div class="flex">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M11.841 16.635C10.737 16.635 10.113 15.727 9.98102 13.93C9.17302 14.627 8.46602 14.979 7.87002 14.979C7.43802 14.979 7.04102 14.819 6.75002 14.524C6.45702 14.231 6.29602 13.836 6.29602 13.415C6.29602 12.815 6.65102 12.105 7.35302 11.299C5.55502 11.168 4.64502 10.544 4.64502 9.441C4.64502 8.338 5.55502 7.716 7.35302 7.585C6.65202 6.78 6.29602 6.069 6.29602 5.47C6.29602 5.051 6.45702 4.657 6.74702 4.358C7.04702 4.061 7.44302 3.902 7.86902 3.902C8.46102 3.902 9.16902 4.255 9.98002 4.953C10.112 3.158 10.736 2.25 11.84 2.25C12.944 2.25 13.569 3.158 13.699 4.954C14.506 4.253 15.215 3.9 15.812 3.9C16.236 3.9 16.631 4.061 16.927 4.353C17.222 4.649 17.383 5.044 17.383 5.469C17.383 6.065 17.029 6.775 16.327 7.584C18.123 7.715 19.032 8.338 19.032 9.44C19.032 10.544 18.125 11.167 16.327 11.298C17.028 12.107 17.383 12.817 17.383 13.414C17.383 13.84 17.22 14.238 16.922 14.531C16.636 14.818 16.24 14.978 15.812 14.978C15.113 14.978 14.342 14.482 13.7 13.927C13.569 15.725 12.945 16.635 11.841 16.635ZM10.663 11.609C10.747 11.609 10.833 11.626 10.914 11.657C11.185 11.767 11.353 12.041 11.329 12.333C11.303 12.645 11.29 12.9 11.29 13.162C11.29 14.639 11.567 15.299 11.841 15.299C12.114 15.299 12.39 14.639 12.39 13.162C12.39 12.892 12.377 12.621 12.353 12.337C12.328 12.045 12.494 11.771 12.764 11.659C13.034 11.549 13.346 11.625 13.532 11.851C13.728 12.087 13.898 12.275 14.086 12.459C14.893 13.275 15.547 13.644 15.814 13.644C15.886 13.644 15.942 13.623 15.982 13.583C16.04 13.526 16.05 13.46 16.05 13.413C16.05 13.141 15.683 12.501 14.862 11.684C14.672 11.493 14.455 11.294 14.254 11.126C14.03 10.938 13.955 10.625 14.068 10.355C14.182 10.085 14.458 9.924 14.752 9.951C14.996 9.975 15.261 9.987 15.564 9.987C17.031 9.987 17.699 9.702 17.699 9.438C17.699 9.166 17.039 8.891 15.564 8.891C15.267 8.891 15.001 8.903 14.752 8.929C14.459 8.957 14.183 8.795 14.068 8.525C13.955 8.254 14.03 7.942 14.254 7.754C14.503 7.544 14.725 7.334 14.864 7.194C15.682 6.377 16.05 5.737 16.05 5.466C16.05 5.399 16.028 5.338 15.987 5.298C15.945 5.256 15.886 5.234 15.814 5.234C15.543 5.234 14.904 5.6 14.088 6.416C13.894 6.611 13.716 6.804 13.53 7.026C13.343 7.251 13.03 7.327 12.762 7.214C12.491 7.102 12.325 6.827 12.353 6.536C12.377 6.257 12.39 5.989 12.39 5.716C12.39 4.241 12.115 3.581 11.841 3.581C11.567 3.581 11.29 4.241 11.29 5.716C11.29 6.051 11.311 6.336 11.329 6.547C11.354 6.839 11.185 7.112 10.914 7.222C10.644 7.331 10.331 7.252 10.146 7.025C9.97402 6.813 9.79302 6.612 9.59502 6.411C8.77902 5.599 8.13902 5.233 7.87002 5.233C7.79902 5.233 7.73602 5.255 7.69602 5.294C7.65802 5.333 7.63302 5.398 7.63302 5.466C7.63302 5.739 8.00002 6.38 8.82102 7.193C8.93402 7.308 9.15402 7.524 9.42802 7.751C9.65402 7.938 9.73102 8.251 9.61702 8.523C9.50402 8.794 9.22102 8.959 8.93402 8.929C8.68102 8.904 8.41402 8.891 8.11902 8.891C6.64202 8.891 5.98102 9.166 5.98102 9.438C5.98102 9.702 6.65102 9.987 8.11902 9.987C8.42002 9.987 8.68702 9.975 8.93402 9.951C9.22202 9.923 9.50402 10.086 9.61702 10.357C9.73102 10.629 9.65402 10.942 9.42802 11.129C9.21602 11.305 8.99802 11.504 8.83002 11.677C8.00002 12.5 7.63302 13.14 7.63302 13.414C7.63302 13.48 7.65702 13.541 7.70002 13.586C7.73702 13.623 7.79802 13.645 7.87002 13.645C8.14202 13.645 8.78302 13.278 9.59802 12.462C9.79102 12.268 9.97102 12.069 10.146 11.854C10.275 11.696 10.467 11.609 10.663 11.609Z"
                                          fill="white"/>
                                    <path d="M14.58 21.752C13.047 21.752 11.756 21.229 11.701 21.209C11.394 21.082 11.226 20.75 11.307 20.428C11.339 20.303 12.1 17.34 14.406 16.172C15.097 15.822 15.9 15.647 16.797 15.647C18.329 15.647 19.622 16.167 19.675 16.19C19.982 16.315 20.151 16.647 20.07 16.969C20.04 17.094 19.278 20.059 16.97 21.227C16.28 21.574 15.476 21.752 14.58 21.752ZM12.8 20.162C13.241 20.283 13.886 20.418 14.58 20.418C15.264 20.418 15.865 20.287 16.368 20.033C17.597 19.412 18.276 18.029 18.579 17.234C18.139 17.113 17.492 16.98 16.797 16.98C16.112 16.98 15.512 17.109 15.012 17.363C13.788 17.982 13.105 19.369 12.8 20.162Z"
                                          fill="white"/>
                                    <path d="M9.42001 21.752C8.52401 21.752 7.71901 21.574 7.02901 21.227C4.72201 20.059 3.96101 17.094 3.92901 16.969C3.84901 16.647 4.01701 16.315 4.32501 16.19C4.37901 16.167 5.67101 15.647 7.20301 15.647C8.09901 15.647 8.90201 15.823 9.59301 16.172C11.9 17.34 12.661 20.303 12.692 20.428C12.773 20.75 12.605 21.082 12.298 21.209C12.244 21.229 10.953 21.752 9.42001 21.752ZM5.42201 17.234C5.72701 18.027 6.41001 19.416 7.63201 20.033C8.13401 20.287 8.73601 20.418 9.42001 20.418C10.113 20.418 10.758 20.283 11.2 20.162C10.895 19.369 10.212 17.982 8.98901 17.363C8.48901 17.109 7.88801 16.98 7.20301 16.98C6.50501 16.98 5.86201 17.113 5.42201 17.234Z"
                                          fill="white"/>
                                </svg>
                            </div>
                            <div class="ml-10" on:click={openPickUpBouquet}>
                                Подобрать букет
                            </div>
                        </div>
                    </Button>
                </div>
            </div>
        {/if}
        <div class="nav">
            <Nav/>
        </div>
        <div class="coupon">
                <CouponAvailable coupon={coupon}/>
        </div>
        <div class="infoBlock pt-24">
            <h2>Акции и хиты продаж</h2>
            <div class="slider">
                <Slider>
                    {#each products as item}
                        <div class="mr-30 overflow-y-visible">
                            <BigProductCart product={item} />
                        </div>
                    {/each}
                    <div class="lastSlide relative flex justify-center items-center">
                        <picture>
                            <source data-srcset="lastSlide.webp, lastSlide-2x.webp 2x" />
                            <img
                                    class="w-full h-full"
                                    data-srcset="lastSlide-2x.png 2x"
                                    data-src="lastSlide.png"
                                    alt='photo product' />
                        </picture>
                        <noscript>
                            <img srcset="lastSlide-2x.png 2x" src="lastSlide.png" alt="lastSlide">
                        </noscript>
                        <div class="slider__button absolute flex justify-center items-center">
                            Больше
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none" class="ml-8">
                                <path d="M18 9.5H2" stroke="#330033" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12.3431 3.76318L18 9.42004L12.3431 15.0769" stroke="#330033" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
        <div class="infoBlock">
            <h2>Каталог</h2>
            <a href="mobileCatalog/allProducts" class="catalog__button flex justify-between items-center mt-24">
                <div>Все товары</div>
                <div class="catalog__button_arrow flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                        <path d="M1 9L5 5L1 1" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </a>
            <div class="catalog__categories flex justify-between flex-wrap text-main">
                {#each categories as category, i}
                    <a href="mobileCatalog/{category.id}" class="catalog__category relative" style="background:{colorsCategories[i]}">
                        <div class="category__text mt-8 ml-16">
                            {category.name}
                        </div>
                        <div class="category__photo">
                            <picture>
                                <source data-srcset="{category.photo}.webp, {category.photo}-2x.webp 2x" />
                                <img
                                        class="w-full absolute h-full object-cover"
                                        data-srcset="{category.photo}-2x.png 2x"
                                        data-src="{category.photo}.png"
                                        alt={category.title} />
                            </picture>
                            <noscript>
                                <img srcset="{category.photo}-2x.png 2x" src="{category.photo}.png" alt="photo category's">
                            </noscript>
                        </div>
                    </a>
                {/each}
            </div>
        </div>
        <div class="infoBlock">
            <h2>Улыбки наших получателей</h2>
            <div class="slider">
                <Slider>
                    {#each smiles as item}
                        <div class="mr-30">
                            <Smile smile={item} />
                        </div>
                    {/each}
                    <div class="slider__button flex justify-center items-center">
                        Больше
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none" class="ml-8">
                            <path d="M18 9.5H2" stroke="#330033" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.3431 3.76318L18 9.42004L12.3431 15.0769" stroke="#330033" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </Slider>
            </div>
        </div>
        <div class="infoBlock">
            <h2>Отзывы</h2>
            <div class="slider">
                <Slider>
                    {#each testimonials as item}
                        <div class="mr-16 last:mr-0">
                            <Recall recall={item} />
                        </div>
                    {/each}
                    <div class="slider__button flex justify-center items-center">
                        Больше
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none" class="ml-8">
                            <path d="M18 9.5H2" stroke="#330033" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.3431 3.76318L18 9.42004L12.3431 15.0769" stroke="#330033" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </Slider>
            </div>
        </div>
        <div class="infoBlock">
            <h2>Наш блог</h2>
            <div class="slider">
                <Slider>

                        {#each posts as item}
                            <div class="mr-16 last:mr-0">
                                <BlogPost post={item} />
                            </div>
                        {/each}
                        <div class="slider__button flex justify-center items-center">
                            Больше
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none" class="ml-8">
                                <path d="M18 9.5H2" stroke="#330033" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12.3431 3.76318L18 9.42004L12.3431 15.0769" stroke="#330033" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                </Slider>
            </div>
        </div>
        <div class="infoBlock">
            <h2>Специально для вас</h2>
            <div class="flex flex-wrap justify-between -mt-8">
                {#each recomendationProducts as product}
                    <div class="recomendationProduct">
                        <ProductCart product={product}/>
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <footer class="padding">
        <Footer cityMeta={cityMeta}/>
    </footer>
</div>

{#if PickUpBouquetVisible}
    <PickUpBouquet bind:visible={PickUpBouquetVisible}/>
{/if}