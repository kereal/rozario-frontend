<script context="module">
    export async function preload(page, session) {
        try {
            const res = await this.fetch(
                    `index.json?city=${page.host[0]}&path=${page.path}`
            );
            const json = await res.json();
            return {
                cityMeta: json.cityMeta,

            };
        } catch (e) {
            console.log(e);
        }
    }
</script>

<script>
    import { onMount } from "svelte";
    import MiniButton from '../../mobileComponents/MiniButton.svelte';
    import Nav from "../../mobileComponents/Nav.svelte";
    import Footer from "../../mobileComponents/Footer.svelte";
    import CouponAvailable from "../../mobileComponents/CouponAvailable.svelte";

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
            color:'#FFDCFF',
            promo: 'CVETI400'
        },
    ]

    export let cityMeta;

	console.log('working');

    onMount(() => {
        document.body.style.overflow = 'scroll'
        getCategories()
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
    export let colorsCategories = ['#FFE6EA', '#FEFFD8', '#E3FFD2;', '#DCECFF', '#CAF8EA', '#FFE1BC', '#FFEAFC', '#FAFFBA']
    export let categories = [
           ]


    let check = []
    async function getCategories() {
        let response = await fetch('https://ecocom.ingello.com/catalog/productCategories/default/active?json');
        let commits = await response.json();
        categories = []
        for(let i = 0; i < commits.categories.length; i++) {
            if(commits.categories[i].level == 0) {
                categories.push(commits.categories[i])
            }
        }
        console.log(categories)
    }


</script>

<style>

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
    .headers__buttons {
        position: sticky;
        padding: 0 16px;
        top:0;
        z-index:3;
        height: 62px;
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
    h1 {
        font-weight: 600;
        font-size: 24px;
        line-height: 125%;
        color: var(--color-main);
        padding: 0 16px;
    }

    .padding {
        padding-left: 16px;
        padding-right: 16px;
    }

</style>

<div class="catalog">
    <div class="headers__buttons flex justify-between padding items-center">
        <div>
            <a href="/mobile">
                <MiniButton type="back"/>
            </a>
        </div>
        <div>
            <MiniButton type="menu"/>
        </div>
    </div>
    <h1>Каталог</h1>
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
    <div class="catalog__content padding">
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
                                <source data-srcset="https://ecocom.ingello.com/resources/images/thumbs/150_150_{category.image}.webp, https://ecocom.ingello.com/resources/images/thumbs/150_150_{category.image}-2x.webp 2x"/>
                                <img
                                        class="w-full absolute h-full object-cover"
                                        data-srcset="https://ecocom.ingello.com/resources/images/thumbs/150_150_{category.image}-2x 2x"
                                        data-src={'https://ecocom.ingello.com/resources/images/thumbs/150_150_'+category.image}
                                        alt={category.alias} />
                            </picture>
                            <noscript>
                                <img srcset="https://ecocom.ingello.com/resources/images/thumbs/150_150_{category.image} 2x" src="https://ecocom.ingello.com/resources/images/thumbs/{category.image}" alt="photo category's">
                            </noscript>
                        </div>
                    </a>
                {/each}
            </div>
    </div>
    <footer class="mt-24 padding">
        <Footer cityMeta={cityMeta}/>
    </footer>
</div>