<script xmlns="http://www.w3.org/1999/html">

        import ProductCart from '../../mobileComponents/ProductCart.svelte';
        import StarRating from '../../components/StarRating.svelte';
        import Coupon from '../../mobileComponents/CouponCart.svelte';
        import Heart from '../../mobileComponents/Heart.svelte';


        import Button from '../../mobileComponents/Button.svelte'
        import {onMount, afterUpdate} from "svelte";
        import Guarantees from "../../mobileComponents/Guarantees.svelte";
        import DeliveryTerms from "../../mobileComponents/DeliveryTerms.svelte";
        import AddPostCart from "../../mobileComponents/AddPostCart.svelte";
        import ChangeProduct from "../../mobileComponents/ChangeProduct.svelte";
        import StagesAfterOrder from "../../mobileComponents/StagesAfterOrder.svelte";
        import Slider from "../../mobileComponents/Slider.svelte";
        import Smile from "../../mobileComponents/Smile.svelte";
        import Recall from "../../mobileComponents/Recall.svelte";
        import ImageViewer from "../../mobileComponents/ImageViewer.svelte";
        import MiniButton from '../../mobileComponents/MiniButton.svelte';



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


        export let product = {
                name: 'Букет из 15 зелёных кустовых хризантем',
                flower: 'роза',
                description: 'Букет, в переводе с французского, - это «пучок цветов, перевязанный лентой». ' +
                        'Флористы Гармония – Флора вкладывают душу в создание композиции или букета.' +
                        ' Цвет играет важную роль в создании гармоничного букета. ',
                rating: 4,
                saled: 44,
                price: 3500,
                chip: 4000,
                bigPhotos: [
                        {
                                src: 'https://i.ibb.co/tpLGpJf/image-1.jpg',
                                alt: 'bigPhoto'
                        },
                        {
                                src: 'https://i.ibb.co/KK5WzzS/image-2.jpg',
                                alt: 'bigPhoto'
                        },
                        {
                                src: 'https://i.ibb.co/Nmg89bk/image-3.jpg',
                                alt: 'bigPhoto'
                        }
                ],
                couponNew: 136,
                couponDeal: 156,
                postCard: 'Тебе желаю море счастья, Улыбок, солнца и тепла. Чтоб жизнь была еще прекраснее',
                size: 'маленький (50×50 см)',
                pack: 'крафт',
                equipment: [
                        {
                                name: 'Роза малиновая',
                                count: 3
                        },
                        {
                                name: 'Листья эвкалипта',
                        },
                        {
                                name: 'Хризантема кустовая белая',
                                count: 5
                        },
                ],
                height: '30-40',
                amount: 9,
                color: 'красный'
        }
        export let recomendationProducts = [
                {
                        name: 'Духи GUERLAIN 250 мл ',
                        rating: '5',
                        price: 3500,
                        photo: '/recommendation.png',
                        size: {
                height: 25,
                width:25
            }
                },
                {
                        name: 'Духи GUERLAIN 250 мл ',
                        rating: '5',
                        price: 3500,
                        photo: 'recommendation.png',
                        size: {
                height: 25,
                width:25
            }
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
            }
                },
                {
                        name: 'Духи GUERLAIN 250 мл ',
                        rating: '5',
                        price: 3500,
                        photo: '/recommendation.png',
                        size: {
                height: 25,
                width:25
            }
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
            }
                },
                {
                        name: 'Духи GUERLAIN 250 мл ',
                        rating: '5',
                        price: 3500,
                        photo: '/recommendation.png',
                        size: {
                height: 25,
                width:25
            }
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
            }
                },
                {
                        name: 'Духи GUERLAIN 250 мл ',
                        rating: '5',
                        price: 3500,
                        photo: '/recommendation.png',
                        size: {
                height: 25,
                width:25
            }
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
                {
                        title: "Букет из красных роз и зеленых георгин",
                        img: "smile-test3",
                        date: "today",
                },
                {
                        title: "Букет из красных роз и зеленых георгин",
                        img: "smile-test4",
                        date: "today",
                },
                {
                        title: "Букет из красных роз и зеленых георгин",
                        img: "smile-test5",
                        date: "today",
                },
                {
                        title: "Букет из красных роз и зеленых георгин",
                        img: "smile-test6",
                        date: "today",
                },
        ];

        let garantVisible = false
        let deliveryTerms = false
        let postCartVisible = false
        let changeProduct = false
        let openPopup = false;

        function openGarant() {
                garantVisible = true

        }
        function openDelivery() {
                deliveryTerms = true

        }
        function openChangeProduct() {
                changeProduct = true

        }
        function openPostCart() {
                postCartVisible = true
                }

        let myStorage;
        onMount(() => {
             myStorage = window.localStorage.path;
                let navigator = window.navigator.userAgent
                if ( navigator.indexOf("Android") == -1 && navigator.indexOf("webOS") == -1 &&
                        navigator.indexOf("iPhone") == -1 && navigator.indexOf("iPad") == -1 &&
                        navigator.indexOf("iPod") == -1 && navigator.indexOf("BlackBerry") == -1 &&
                        navigator.indexOf("IEMobile") == -1 && navigator.indexOf("Opera Mini") == -1) {
                        window.location =  'product/card'
                } else {
                        console.log('done')
                }
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


</script>

<style>
         .card {
                 background: rgb(0%, 0%, 0%, 0.4);
         }
         h2 {
                 font-weight: 600;
                 font-size: 16px;
                 line-height: 135%;
                 color: var(--color-main);
                 margin-bottom: 6px;
         }

         .content {
                 background: var(--color-light);
                 opacity: 1;
         }
         .infoBlock {
                 padding: 24px 16px;
                 border-bottom: 11px solid var(--gray-200);
         }

         .infoBlock:last-child {
                 border-bottom: none;
         }

         .subInfoBlock {
                 border-bottom: 1px solid var(--gray-300);
                 padding: 18px 0 24px 0;
         }
         .infoBlock > .subInfoBlock:last-child {
                 border-bottom: none;
                 padding: 18px 0 0 0;
         }
         .infoBlock > .subInfoBlock:first-child {
                 border-bottom: none;
                 padding-top: 0;
         }
        .subInfoBlockButton {
                width: 22px;
                height: 22px;
                background: var(--gray-300);
                border-radius:50%;
        }
         .header {
          padding: 0 16px 21px 16px;
          border-bottom: 11px solid var(--gray-200);
             z-index: 19;

        }
        .header__slider {
          min-height: 317px;
          margin: -62px -16px 18px -16px;
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
        .product__description {
                font-size: 14px;
                color: var(--gray-600);
        }
        .rating__val {
                font-weight: 600;
                font-size: 14px;
                color: var(--color-main);
                margin-left: 12px;
                margin-right: 14px;
        }
        .rating__saled {
                font-size: 12px;
                line-height: 20px;
                color: var(--color-main);
                margin-left: 12px;
        }
        .product__coupon {
                width: 100%;
        }

        .bigPhoto {
                margin-bottom: 18px;
                border-radius: 4px;
        }
         .bigPhoto img{
                 border-radius: 4px;
         }
         .bigPhoto:last-child {
                 margin-bottom: 0;
         }
        .recomendationProduct {
                flex-basis: calc(100% / 2 - 8px);
                margin-top: 18px;
        }
         .recomendationProduct:nth-child(3n){
                 display: none;
         }
         .recomendationProduct:nth-child(4n){
                 display: none;
         }
         @media (min-width: 500px) {
                 .recomendationProduct {
                         flex-basis: calc(100% / 3 - 16px);
                 }
                 .recomendationProduct:nth-child(3n){
                         display: block;
                 }
         }
         @media (min-width: 700px) {
                 .recomendationProduct {
                         flex-basis: calc(100% / 4 - 16px);
                 }
                 .recomendationProduct:nth-child(4n){
                         display: block;
                 }
         }
    .footer {
            position: sticky;
            bottom:0;
            height: 145px;
            background: #FFFFFF;
            border-top: 1px solid var(--gray-300);
            padding: 16px 12px 28px 12px;
            box-shadow: 4px 0 4px 4px rgba(0, 0, 0, .05);
    }
         .headers__buttons {
             position: sticky;
             padding: 0 16px;
             top:0;
             z-index:3;
             height: 62px;
         }
    .footer__name {
            font-size: 15px;
            line-height: 135%;
            color: var(--color-main);
            min-width: 211px;
            max-width: 211px;
    }
 .product__price {
         font-weight: 600;
         font-size: 16px;
         line-height: 130%;
         color: var(--color-main);
 }
.product__priceChip {
        font-size: 13px;
        line-height: 120%;
        color: var(--gray-700);
        text-decoration: line-through;
}
.slider {
        margin: 16px -16px 0 -16px;
}

</style>

<div class="card ">
        <div class="content">
                <div class="headers__buttons flex justify-between items-center">
                        <div>
                                <a href="{myStorage}">
                                        <MiniButton type="back"/>
                                </a>
                        </div>
                        <div>
                                <MiniButton type="menu"/>
                        </div>
                </div>

                <div class="header">
                        <div class="header__slider mb-18">
                                <ImageViewer sliderName="ImageViewer" small="1" smallSpaceBetween="0">
                                        {#each product.bigPhotos as item}
                                                <div class="swiper-slide h-full flex items-center justify-center">
                                                                <img srcset="{item.src}-2x.png 2x" src="{item.src}" alt="{item.alt}" class="w-full h-full">
                                                </div>
                                        {/each}
                                </ImageViewer>
                        </div>
                        {#if product.description}
                                <div class="product__description mb-12">
                                        {product.description}
                                </div>
                        {/if}
                        <div class="rating flex items-center">
                                <StarRating
                                        className=""
                                        name="productRaiting"
                                        kind="static"
                                        val={product.rating} />
                                <div class="rating__val">{product.rating}</div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="2" height="13" viewBox="0 0 2 13" fill="none">
                                        <path d="M1 0.5V12.5" stroke="#C4C4C4"/>
                                </svg>
                                <div class="rating__saled">{product.saled} продано</div>
                        </div>
                </div>

                <div class="body">
                        {#if  product.couponNew !== undefined && product.couponDeal !== undefined}
                                <div class="coupons infoBlock">
                                        <h2>Купоны</h2>
                                        {#if product.couponNew !== undefined}
                                                <div class="product__coupon mt-14">
                                                        <Coupon type="deal" text="Купон нового пользователя" price="200" bind:couponPrice={product.couponNew}/>
                                                </div>
                                        {/if}
                                        {#if product.couponDeal !== undefined}
                                                <div class="product__coupon mt-20">
                                                        <Coupon type="new" text="Купон на товар" price="136" bind:couponPrice={product.couponDeal}/>
                                                </div>
                                        {/if}
                                </div>
                        {/if}

                        <div class="equipment infoBlock">
                                <div class="subInfoBlock"  on:click={openChangeProduct}>
                                        <div class="flex justify-between items-center">
                                                <h2>Размер, состав, упаковка букета</h2>
                                                <div class="subInfoBlockButton flex justify-center items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                                                <path d="M1 9L5 5L1 1" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                </div>
                                        </div>
                                    <div class='product__description'>
                                            {#if product.size !== undefined}
                                                    <p>
                                                            <span>Размер:</span> <span class="text-main">{product.size}</span>
                                                    </p>
                                            {/if}
                                            <p class="product__description">
                                                    {#each product.equipment as item}
                                                            <span>{item.name}</span> —
                                                            {#if  item.count !== undefined}
                                                                    <span class="text-main">{item.count} шт. , </span>
                                                            {/if}
                                                    {/each}
                                            </p>
                                            <p class="product__description">
                                                    {#if product.pack !== undefined}
                                                            <span>Упаковка:</span> — <span class="text-main">{product.pack}</span>
                                                    {/if}
                                            </p>
                                    </div>
                                   </div>
                                <div class="subInfoBlock" on:click={openPostCart}>
                                        <div class="flex justify-between items-center" >
                                                <h2>Добавьте открытку бесплатно</h2>
                                                <div class="subInfoBlockButton flex justify-center items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                                                <path d="M1 9L5 5L1 1" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                </div>
                                        </div>
                                        <p class="product__description">{product.postCard}</p>
                                </div>
                        </div>

                        <div class="info infoBlock">
                                <div class="subInfoBlock" on:click={openDelivery}>
                                        <div class="flex justify-between items-center" >
                                                <h2>Условия доставки</h2>
                                                <div class="subInfoBlockButton flex justify-center items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                                                <path d="M1 9L5 5L1 1" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                </div>
                                        </div>
                                        <p class="product__description">
                                                Стоимость доставки: 0–549 ₽
                                                Ближайшая дата доставки: 22.02.2020, в течение 120 мин
                                        </p>
                                </div>
                                <div class="subInfoBlock" on:click={openGarant}>
                                        <div class="flex justify-between items-center" >
                                                <h2>Гарантии покупателя</h2>
                                                <div class="subInfoBlockButton flex justify-center items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                                                <path d="M1 9L5 5L1 1" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                </div>
                                        </div>

                                        <p class="product__description">
                                                100% гарантия свежести. Счастливый получатель. Всегда на связи. Лучшие флористы. Замена букета. Пунктуальная доставка.
                                        </p>
                                </div>
                                <div class="subInfoBlock">
                                        <h2>Правила отмены</h2>
                                        <p class="product__description">
                                                Вы можете бесплатно отменить заказ до получения фото букета, деньги полностью вам вернутся.
                                                При отмене заказа после  получения фото букета деньги не возвращаются
                                        </p>
                                </div>
                        </div>
                        {#if product.description}
                                <div class="infoBlock ">
                                        <h2>После оформления заказа</h2>
                                        <div class="mt-16 -mr-16 -ml-16">
                                                <StagesAfterOrder/>
                                        </div>
                                </div>
                        {:else}
                                <div class="infoBlock">
                                        <h2>Этапы оформления заказа</h2>
                                </div>
                        {/if}
                        <div class="infoBlock">
                                <div class="subInfoBlock">
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
                                <div class="subInfoBlock">
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
                        </div>
                        <div class="infoBlock">
                                {#each product.bigPhotos as photo}
                                        <div class="bigPhoto">
                                                <picture>
                                                        <source
                                                                data-srcset="{photo.src}.img.webp, {photo.src}.img-2x.webp 2x" />
                                                        <img    data-srcset="{photo.src}.img-2x.png 2x"
                                                                data-src="{photo.src}.img.png"
                                                                alt="{photo.alt}"  class="w-full"/>
                                                </picture>
                                                <noscript>
                                                        <img srcset="{photo.src}-2x.png 2x" src="{photo.src}" alt="{photo.alt}" class="w-full">
                                                </noscript>
                                        </div>
                                {/each}
                        </div>
                        <div class="infoBlock">
                                <h2>Специально для вас</h2>
                                <div class="flex flex-wrap justify-between">
                                        {#each recomendationProducts as product}
                                        <div class="recomendationProduct">
                                                <ProductCart product={product}/>
                                        </div>
                                        {/each}
                                </div>
                        </div>
                </div>

                <div class="footer">
                        <div class="flex justify-between mb-12">
                                <div class="footer__name">{product.name}</div>
                                <div>
                                        <div class="product__price whitespace-no-wrap">{product.price} ₽</div>
                                        {#if product.chip !== undefined}
                                                <div class="product__priceChip whitespace-no-wrap mt-2">
                                                        {product.chip } ₽
                                                </div>
                                        {/if}
                                </div>
                        </div>
                        <div class="footer__buttons flex">

                                <Button size="full" status="active-main" className="mr-16">
                                    <a href="/mCart">
                                        Добавить в корзину
                                    </a>
                                </Button>

                                <Heart/>
                        </div>
                </div>
        </div>
</div>


{#if garantVisible}
     <Guarantees bind:visible={garantVisible}/>
{/if}
{#if deliveryTerms}
     <DeliveryTerms bind:visible={deliveryTerms}/>
{/if}
{#if postCartVisible}
    <AddPostCart bind:text={product.postCard} bind:visible={postCartVisible}/>
{/if}
{#if changeProduct}
  <ChangeProduct bind:product={product} bind:visible={changeProduct}/>
{/if}

