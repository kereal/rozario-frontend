<script context="module">
    export async function preload(page, session, params) {
        try {
            const res = await this.fetch(
                    `index.json?city=${page.host[0]}&path=${page.path}`
            );
            const json = await res.json();
            return {
                pagefor: page,
                cityMeta: json.cityMeta,
                params: params
            };
        } catch (e) {
            console.log(e);
        }
    }
</script>

<script>
    import { onMount, afterUpdate, beforeUpdate } from "svelte";
    import MiniButton from '../../mobileComponents/MiniButton.svelte';
    import Nav from "../../mobileComponents/Nav.svelte";
    import Footer from "../../mobileComponents/Footer.svelte";
    import CouponAvailable from "../../mobileComponents/CouponAvailable.svelte";
    import ProductCart from '../../mobileComponents/ProductCart.svelte';
    import NavOnPage from '../../mobileComponents/NavOnPage.svelte';
    import NavOnCategory from '../../mobileComponents/NavOnCategory.svelte';


    export let cityMeta;
    export let params;
    console.log(params)
    export let user = false;

    let forShadow = 0;

    let check = []
    let categories = []
    let categoryName = 'Имя Категории'
    let category = {}
    let products = []

    async function getCategories() {
        let response = await fetch('https://api.rozarioflowers.ru/catalog/productCategories/default/active?json');
        let commits = await response.json();
        categories = []
        for(let i = 0; i < commits.categories.length; i++) {
            if(commits.categories[i].parent_id == pagefor.params.slug[0]) {
                categories.push(commits.categories[i])
            }
            if(commits.categories[i].id == pagefor.params.slug[0]) {
                categoryName = commits.categories[i].name
                category = commits.categories[i]
            }
        }
            response = await fetch('https://api.rozarioflowers.ru/catalog/productCategories/site/view?id='+category.id+'&json=');
            commits = await response.json();
            products = Object.values(commits.categoryList)
         console.log(products , 'products')
        console.log(commits , 'commits')
    }

    onMount(() => {
        let myStorage = window.localStorage;
        localStorage.setItem('path', pagefor.path);
        getCategories()
        document.body.style.overflow = 'scroll'
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

    afterUpdate(() => {
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

    export let pagefor;

     let selectedSubCategory = '';


    export const coupons = [
        {
            text: '-200 ₽ по промокоду',
            subText: 'До 31 января на первый заказ от 1500 ₽',
            color:'#FFDC00',
            promo: 'CVETI200'
        },
        {
            text: '-400 ₽ по промокоду',
            subText: 'До 31 января на первый заказ от 1500 ₽',
            color:'#FFDCCC',
            promo: 'CVETI400'
        },
    ]
   // export let freePostCart = {
//        text: 'Открытка в подарок',
  //      subText: 'При заказе букета открытка с вашим текстом в подарок',
    //    color:'#1DC556',
    //    promo: '',
    //    icon:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">\n' +
  //              '<path d="M19.452 4.84409C19.452 4.08629 18.7887 3.51794 17.9044 3.51794H17.7938L12.4874 4.74937C12.7085 4.55992 13.0402 4.37047 13.2613 4.18102C14.1457 3.51794 14.5879 2.57069 14.5879 1.81289C14.4773 1.14981 14.1457 0.581464 13.4824 0.297289C12.8191 -0.0816114 11.9347 -0.0816114 11.1608 0.202564C10.7186 0.392014 10.387 0.676189 10.0553 1.05509C9.83422 0.676189 9.39202 0.392014 8.94983 0.202564C8.17598 -0.0816114 7.29158 -0.0816114 6.62828 0.297289C5.96498 0.676189 5.52279 1.24454 5.52279 1.81289C5.41224 2.66541 5.85443 3.51794 6.73883 4.27574C6.95993 4.46519 7.18103 4.65464 7.51268 4.84409L2.09575 3.61267H1.9852C1.1008 3.51794 0.4375 4.18102 0.4375 4.84409V16.7794C0.4375 17.4425 1.1008 18.1056 1.87465 18.1056L9.83422 20.0001H9.94477C10.0553 20.0001 10.1659 20.0001 10.2764 19.9054L18.1255 18.1056C18.8993 18.1056 19.5626 17.4425 19.5626 16.7794L19.452 4.84409ZM10.6081 2.66541C10.6081 2.00234 11.0503 1.43399 11.603 1.24454C11.7136 1.14981 11.9347 1.14981 12.1558 1.14981C12.3769 1.14981 12.4874 1.14981 12.7085 1.33926C13.0402 1.43399 13.2613 1.62344 13.2613 2.00234C13.2613 2.47596 12.9296 3.04431 12.3769 3.51794C11.8241 3.99157 11.0503 4.46519 10.4975 4.74937C10.4975 4.18102 10.4975 3.42321 10.6081 2.66541ZM6.62828 2.00234C6.62828 1.71816 6.84938 1.43399 7.18103 1.24454C7.40213 1.14981 7.51268 1.05509 7.73378 1.05509C7.95488 1.05509 8.17598 1.14981 8.28653 1.14981C8.83928 1.43399 9.28147 2.00234 9.28147 2.57069C9.28147 3.32849 9.28147 4.08629 9.28147 4.65464C8.83928 4.46519 8.17598 3.99157 7.51268 3.51794C6.95993 3.04431 6.62828 2.47596 6.62828 2.00234ZM9.39202 18.8634L2.09575 17.1583H1.9852C1.7641 17.1583 1.65355 17.0636 1.65355 16.8742V4.84409C1.65355 4.65464 1.7641 4.55992 1.87465 4.55992L8.83928 6.17024C9.39202 6.35969 9.39202 6.45442 9.39202 6.54914V18.8634ZM17.9044 17.1583H17.7938L10.4975 18.8634V6.54914C10.4975 6.45442 10.4975 6.35969 10.9397 6.26497L17.9044 4.65464C18.0149 4.65464 18.1255 4.84409 18.1255 4.93882V16.8742C18.236 17.0636 18.1255 17.1583 17.9044 17.1583Z" fill="white"/>\n' +
   //             '<path d="M16.1367 8.34886L12.4885 9.20138C12.1569 9.29611 11.9358 9.58028 12.0463 9.86446C12.1569 10.0539 12.378 10.2434 12.5991 10.2434H12.7096L16.3578 9.39083C16.6894 9.29611 16.9105 9.01193 16.8 8.72776C16.8 8.44359 16.4683 8.25413 16.1367 8.34886Z" fill="white"/>\n' +
    //            '<path d="M16.1378 11.0015L12.3792 11.9487C12.0475 12.0434 11.8264 12.3276 11.937 12.6118C12.0475 12.8012 12.2686 12.9907 12.4897 12.9907H12.6003L16.2484 12.1382C16.58 12.0434 16.8011 11.7593 16.6906 11.4751C16.8011 11.0962 16.4695 11.0015 16.1378 11.0015Z" fill="white"/>\n' +
    //            '</svg>'
    //}

    const menulist =[]

    function createMenuList() {
        let i = 0;
        categories.forEach((item)=>{
            menulist.push({name: item.name, index: i})
            i++
        })
    }
    createMenuList()

    let menuItems = []
    let filters;

    let y;
    let once = true

    $:if(pagefor) {
        if(once == false) {
            getCategories()
        }
        once = false
    }
</script>

<style>
    .padding {
        padding-left: 16px;
        padding-right: 16px;
    }
    .headers__buttons {
        position: sticky;
        padding: 0 16px;
        top:0;
        z-index:3;
        height: 62px;
    }
    .headers__buttons_scrolled {
             background: #fff;
         }
    .category__products {
        background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #F2F2F2;
        padding-bottom: 24px;
    }
    .page__name {
        font-size: 15px;
        text-align: center;
        color: var(--color-main);
        font-weight: 600;
    }
    .category__baner {
        margin-top: -62px;
        margin-bottom: -16px;
        position: relative;
    }
    .category__content {
        border-radius: 16px 16px 0px 0px;
        background: #fff;

        position: relative;
    }
    .coupons {
        border-bottom: 8px solid var(--gray-200);
        padding-bottom: 15px;
    }
    .coupon {
        border-bottom: 1px solid var(--gray-300);
        margin-bottom: 12px;
        padding-bottom: 12px;
    }
    .coupon:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }
    .tabbar {
        position: sticky;
        top: 61px;
        z-index: 2;
        background: #fff;
        margin-left: -16px;
        margin-right: -16px;
        padding-left: 16px;
        padding-right: 16px;
    }
    h1 {
        font-weight: 600;
        font-size: 24px;
        color: var(--color-main);
    }
    h2 {
        font-weight: 600;
        font-size: 16px;
        line-height: 130%;
        color: var(--color-main);

    }
    .emptyBlockforCoupons {
        height: 12px;
        border-bottom: 1px solid var(--gray-300);
        margin-bottom: 12px;
    }
    .recomendationProduct {
        flex-basis: calc(100% / 2 - 4px);
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
        }
        .recomendationProduct:nth-child(3n){
            display: block;
        }
    }
    @media (min-width: 700px) {
        .recomendationProduct {
            flex-basis: calc(100% / 4 - 4px);
        }
        .recomendationProduct:nth-child(4n){
            display: block;
        }
    }
</style>

<svelte:window bind:scrollY={y}/>
<div class="category">
    <div class="headers__buttons flex justify-between padding items-center {y > 150 ? 'headers__buttons_scrolled' : ''}">
        <div>
            <a href="{pagefor.params.slug[1] ? `/mobileCatalog/${category}` : '/mobileCatalog'}">
                <MiniButton type="back"/>
            </a>
        </div>
        {#if y > 150}
            {#if pagefor.params.slug[1] != 'filtered' && pagefor.params.slug[1]}
            <div class="page__name whitespace-nowrap">
                {categoryName}
            </div>
        {:else}
            <div class="page__name whitespace-nowrap">
                {categoryName}
            </div>
        {/if}
        {/if}
        <div>
            <MiniButton bind:user={user} type="menu"/>
        </div>
    </div>
    <div class="category__baner">
            <img src="" alt="photo category" class="w-full block">
    </div>
    <div class="category__content">
        {#if pagefor.params.slug[1] != 'filtered' && pagefor.params.slug[1]}
            <h1 class="padding pt-12">{categoryName}</h1>
        {:else}
            <h1 class="padding pt-12">{categoryName}</h1>
        {/if}

        <div class="nav padding mt-16 mb-18">
            <Nav/>
        </div>
        <div class="coupons padding">
            {#if coupons}
            {#each coupons as item}
            <div class="coupon">
                <CouponAvailable coupon={item}/>
            </div>
            {/each}
            {/if}
        </div>
        <div class="category__products padding pt-8 "  >
        {#if categories.length != 0}
            <div class="tabbar padding">
                <NavOnCategory bind:menuItems={categories}
                               filters={filters}
                               bind:selected={selectedSubCategory}
                               {category}
                               {pagefor}/>
            </div>
        {/if}
        <div class="flex flex-wrap justify-between">
            {#each products as product}
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