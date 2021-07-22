<script>
    import Popup from './Popup.svelte'
    import RadioButton from './RadioButton.svelte'
    import Button from './Button.svelte'
    import PlusMinusButton from './PlusMinusButton.svelte'
    import { fade } from "svelte/transition";
    import IconButton from '../components/IconButton.svelte';

    import { onMount } from "svelte";
    export let visible;
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
    export let pack = 'крафт'



    onMount(() => {

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

        const observer = new IntersectionObserver(callback);
        Array.from(images).forEach(image => observer.observe(image));
        Array.from(sources).forEach(source => observer.observe(source));
        return () => {
            images.forEach(image => observer.unobserve(image));
            sources.forEach(source => observer.unobserve(source));
            observer.disconnect();
        };
    });

export let size = 'Маленький'

    function closeModal() {
        document.body.style.overflow = 'scroll'
        visible = false
    }

   export let flowers = [
        {name: 'роза', id: 'roze'},
        {name: 'лилия', id: 'Lily'},
        {name: 'хризантема', id: 'Chrysanthemum'},
        {name: 'пион', id: 'Peony'},
       {name: 'тюльпан', id: 'Tulip'},
    ]
    export let flower='роза';

   export let sizes = [
        {
            id: 'small',
            text: 'Маленький',
            width: '25',
            height: '25',
            price: 1777,
            available: true,
            composition: [
                {name: 'Роза малиновая', amount: 3},
                {name: 'Роза кустовая розовая', amount: 3},
                {name: 'Хризантема кустовая белая', amount: 3},
                {name: 'Лимониум синий', amount: 2}
            ]
        },
        {
            id: 'midlle',
            text: 'Средний',
            width: '50',
            height: '50',
            price: 2000,
            available: true,
            composition: [
                {name: 'Роза малиновая', amount: 3},
                {name: 'Роза кустовая розовая', amount: 3},
                {name: 'Хризантема кустовая белая', amount: 3},
                {name: 'Лимониум синий', amount: 24}
            ]
        },
        {
            id: 'big',
            text: 'Большой',
            width: '75',
            height: '75',
            price: 3999,
            available: true,
            composition: [
                {name: 'Роза малиновая', amount: 3},
                {name: 'Роза кустовая розовая', amount: 6},
                {name: 'Лимониум синий', amount: 2}
            ]
        },
        {
            id: 'verybig',
            text: 'Огромный',
            width: '100',
            height: '100',
            price: 5999,
            available: false,
            composition: [
                {name: 'Роза малиновая', amount: 23},
                {name: 'Роза кустовая розовая', amount: 23},
                {name: 'Хризантема кустовая белая', amount: 23},
                {name: 'Лимониум синий', amount: 22}
            ]
        }
    ]
    export let  packages = [
        {id: 'membrane', name: 'плёнка', price: 15},
        {id: 'craft', name: 'крафт', price: 25},
        {id: 'felt', name: 'фетр', price: 35},
        {id: 'sezal', name: 'сезаль', price: 15},
        {id: 'without', name: 'без упаковки', price: 0},
    ]
    export let sizesFlower = [
        {name: '30-40', id:'30-40'},
        {name: '40-50', id:'40-50'},
        {name: '50-60', id:'50-60'},
        {name: '60-70', id:'60-70'},
        {name: '70-80', id:'70-80'},
        {name: '80-90', id:'80-90'},
        {name: '90-100', id:'90-100'},
    ]
    export let selectedSizeFlower = '30-40';

    export let colors = [
        {color:'#FFD8D8', name:'розовый', id:'pink'},
        {color:'#FF0000', name:'красный', id:'red'},
        {color:'#FFFFFF', name:'белый', id:'white'},
        {color:'#FFDC00', name:'желтый', id:'yellow'},
        {color:'#43E267', name:'зеленый', id:'green'},
        {color:'#49A0F2', name:'синий', id:'blue'},
        {color:'#E3ADE6', name:'фиолетовый', id:'Violet'},
        {color:'conic-gradient(from 180deg at 50% 50%, #FF0000 0deg, #FAFF00 50.63deg, #00FF0A 101.25deg, #00F0FF 172.5deg, #0029FF 230.62deg, #BD00FF 286.87deg, #FF0000 350.63deg, #FF0000 360deg)', name:'разноцветный', id:'multicolored'},
    ]
    let amount = [{count: 9}, {count: 15}, {count: 21}, {count: 51}, {count: 101}]
    let modalElement;


</script>
<style>
    h2 {
        font-size: 16px;
        line-height: 130%;
        color: var(--color-main);
        margin-bottom: 16px;
    }
    .overlay {
        z-index: 999;
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        opacity:1;
    }

    .modal {
        background: var(--color-light);
        border-radius: 16px 16px 0px 0px;
        position: absolute;
        bottom:0;
        left: 0px;
        height: 100%;
        width: 100%;
        overflow: scroll;
        z-index:1000;
        overscroll-behavior: contain;
        -webkit-transform: translateZ(0px);
        -webkit-transform: translate3d(0,0,0);
        -webkit-perspective: 1000;
        overflow: hidden;
    }
    .close-button {
        width: 30px;
        height: 30px;
        background: #FFFFFF;
        border: 1px solid var(--gray-300);
        box-sizing: border-box;
        box-shadow: 0px 4px 15px rgba(51, 0, 51, 0.1);
        border-radius: 50%;

    }
    .header {
        margin: -24px -16px 0 -16px;
        border-radius: 16px 16px 0px 0px;
        background-image: url("../../static/loading-bg-image.svg");
    }

    .content {
        padding: 24px 16px;
        padding-bottom: 0;
        overflow: scroll;
        height: calc(100% - 145px);
        margin-top: -8px;
    }

    .middle {
        margin: 0 -16px;
        background: white;
        padding: 0 16px;
    }
    .footer {
        height: 145px;
        background: #FFFFFF;
        border-top: 1px solid var(--gray-300);
        width: 100%;
        padding: 12px 16px;
        box-shadow: 4px 0 4px 4px rgba(0, 0, 0, .05);
        position: sticky;
    }
    .footer__name {
        font-size: 16px;
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
    .blockInfo {
        border-bottom: 1px solid var(--gray-300);
        padding: 24px 0;
    }
    .blockInfo {
        border-bottom: none ;
    }
    .product__description {
        font-size: 14px;
        color: var(--gray-600);
    }
    .colorButton {
        margin: -2px -12px -11px -12px;
    }
    .color {
        width: 24px;
        height: 23px;
        border-radius: 30px;
    }
    img {
        border-radius: 16px 16px 0px 0px;
    }
    .topBlock {
        background: transparent;
        width: 100%;
        height: 50px;
        margin-bottom: -50px;
    }
</style>

<div transition:fade class="overlay" id="changeProduct">
    <div
            bind:this={modalElement}
            class="modal"
            style="{size}"
            on:touchstart={() =>{
            document.body.style.overflow = 'hidden'
            }}>
        <div class="topBlock">
            <div class="close-button flex items-center justify-center" on:click={closeModal} style="        position: absolute;
                top: 13px;
                right: 16px;
                z-index:9999;">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L13 13M13 1L1 13" stroke="#330033" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
        <div class="content">
        <div class="header">
            <picture>
                <source
                        data-srcset="{product.bigPhotos[0].src}.img.webp, {product.bigPhotos[0].src}.img-2x.webp 2x" />
                <img    data-srcset="{product.bigPhotos[0].src}.img-2x.png 2x"
                        data-src="{product.bigPhotos[0].src}.img.png"
                        alt="{product.bigPhotos[0].alt}"
                        class="w-full h-full"/>
            </picture>
            <noscript>
                <img srcset="{product.bigPhotos[0].src}-2x.png 2x" src="{product.bigPhotos[0].src}" alt="{product.bigPhotos[0].alt}">
            </noscript>

        </div>

            <div class="middle">
                {#if product.size !== undefined}
                    <div class="blockInfo">
                        <h2>Выберите размер букета</h2>
                        {#each sizes as productSize}
                            <div class="mb-12">
                                <RadioButton bind:group={size} label={productSize.id} id={productSize.id}  value={productSize.text} style="width: 250px;">
                                    <div class="flex">
                                        {productSize.text}
                                        <span class="mini-size flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-12 mr-4" width="15" height="9" viewBox="0 0 15 9" fill="none">
                                    <path d="M4.28537 7.99995L1 4.50046L4.28537 1.00098" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M10.7158 1L14.0002 4.49949L10.7158 7.99897" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M1.33984 4.50049H13.6137" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg> {productSize.width} см
                                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-12 mr-4" width="9" height="15" viewBox="0 0 9 15" fill="none">
                                    <path d="M7.99995 10.7146L4.50046 14L1.00098 10.7146" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M1 4.28418L4.49949 0.999802L7.99897 4.28418" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4.50098 13.6597L4.50098 1.38579" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>{productSize.height} см
                              </span>
                                    </div>
                                </RadioButton>
                            </div>
                            {#if size === productSize.text}
                                <p class="product__description mb-12">
                                    {#each productSize.composition as item}
                                        <span>{item.name}</span> —
                                        <span class="text-main">{item.amount}. шт, </span>
                                    {/each}
                                </p>
                            {/if}
                        {/each}
                    </div>
                {/if}
                {#if product.pack !== undefined}
                    <div class="blockInfo">
                        <h2>Выберите упаковку</h2>
                        <div class="buttons flex flex-wrap -mr-12">
                            {#each packages as item}
                                <div class="button mr-12 mb-12">
                                    <RadioButton bind:group={pack} label={item.id} id={item.id}  value={item.name} text={item.name}/>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
                {#if product.flower !== undefined}
                    <div class="blockInfo">
                        <h2>Выберите цветок</h2>
                        <div class="buttons flex flex-wrap -mr-12">
                            {#each flowers as item}
                                <div class="button mr-12 mb-12">
                                    <RadioButton bind:group={flower} label={item.id} id={item.id}  value={item.name} text={item.name}/>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
                {#if product.height !== undefined}
                    <div class="blockInfo">
                        <h2>Выберите высоту цветов</h2>
                        <div class="buttons flex flex-wrap -mr-12">
                            {#each sizesFlower as item}
                                <div class="button mr-12 mb-12">
                                    <RadioButton bind:group={selectedSizeFlower} label={item.id} id={item.id}  value={item.name} text={item.name} style="padding-top:5px;"/>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
                {#if product.amount !== undefined}
                    <div class="blockInfo">
                        <h2>Выберите количество цветов</h2>
                        <div class="buttons flex flex-wrap -mr-12">
                            <div class="mr-12">
                                <PlusMinusButton bind:number={product.amount} min={amount[0].count} />
                            </div>
                            {#each amount as item}
                                <div class="button mr-12 mb-12">
                                    <RadioButton bind:group={product.amount} label={item.count} id={item.count}  value={item.count} text={item.count} style="padding-top:5px;"/>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
                {#if product.color !== undefined}
                    <div class="blockInfo">
                        <h2>Выберите цвет букета</h2>
                        <div class="buttons flex flex-wrap -mr-12">
                            {#each colors as item}
                                <div class="button mr-12 mb-12" >
                                    <RadioButton bind:group={product.color} label={item.id} id={item.id}  value={item.name}
                                                 labelClass={product.color === item.name ? '' : 'p-0'}
                                                 style="{product.color === item.name ? '' : 'width: 25px; height: 25px; '}">
                                        <div class="flex items-center justify-center {product.color === item.name ? '' : 'colorButton'}">
                                            <div class="color" style="background:{item.color}; {product.color === item.name ? 'border: 1px solid var(--gray-300);' : 'margin-top:-2px;'} ">
                                            </div>
                                            {#if product.color === item.name}
                                                <div class="ml-8 -mt-2">
                                                    {item.name}
                                                </div>
                                            {/if}
                                        </div>
                                    </RadioButton>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
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
                <div class="footer__buttons mt-12" >
                    <Button size="full" status="active-main" on:click={closeModal}>
                        Сохранить
                    </Button>
                </div>
            </div>
        </div>
</div>
