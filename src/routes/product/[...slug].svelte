<script context="module">
  export async function preload(page, session, params) {
    try {
      const res = await this.fetch(
        `index.json?city=${page.host[0]}&path=${page.path}`
      );
      const json = await res.json();
      const res1 = await this.fetch(`http://127.0.0.1:3003/rozmain${page.path}`)
      const solData = await res1.json()
      return {
        flowersList: json.flowersList,
        pagefor: page,
        slug: page.slug,
        path: page.path,
        categories: json.catalog,
        cityMeta: json.cityMeta,
        activeOrders: json.activeOrders,
        deliveryAddresses: json.deliveryAddresses,
        orderStories: json.orderStories,
        smiles: json.smiles,
        testimonials: json.testimonials,
        recommendations: json.recommendations,
        product: json.product,
        orderList: json.orderList,
      };
    } catch (e) {
      console.log(e);
    }
  }
</script>

<script>
    import {onMount, setContext} from "svelte";
    import {mainStore} from "../../stores/global.js";
    import {orderStore} from '../../stores/order.js';
    import ActiveOrder from "../../components/ActiveOrder.svelte";
    import OrderStoryCard from "../../components/OrderStoryCard.svelte";
    import {stores} from "@sapper/app";
    import {createEventDispatcher} from "svelte";
    import {fly, fade} from 'svelte/transition';
    import ImageViewer from '../../components/ImageViewer.svelte'
    import Coupon from '../../components/Coupon.svelte'
    import HeartCounter from '../../components/HeartCounter.svelte'
    import SpecialCard from '../../components/SpecialCard.svelte'
    import InfoButton from '../../components/InfoButton.svelte'
    import Smile from "../../components/Smile.svelte";
    import OrderContainer from "../../components/OrderContainer.svelte";
    import Testimonial from "../../components/Testimonial.svelte";
    import PlusMinusButton from "../../components/PlusMinusButton.svelte";
    import Gift from "../../components/Gift.svelte";
    import PostCardModal from "../../components/PostCardModal.svelte";
    import AnimateNumber from "../../components/AnimateNumber.svelte";
    import Slider from "../../components/Slider.svelte";
    import AutoWidthButtons from "../../components/AutoWidthButtons.svelte";
    import Button from "../../components/Button.svelte";
    import StarRating from '../../components/StarRating.svelte';
    import StagesAfterOrder from '../../components/StagesAfterOrder.svelte';
    import StagesDesignProductCart from '../../components/StagesDesignProductCart.svelte';

    export let flower;
    export let flowersList;
    export let smiles;
    export let orderList;
    export let testimonials;
    export let couponNew = 0;
    export let couponDeal = 0;
    let productAdded = false;
    let postCardModalVisible = false;
    let once = true;

    function togglepostCardModalVisible() {
        postCardModalVisible = !postCardModalVisible;
    }

    let buttonElementFlower;
    let buttonElementSize;
    let buttonElementPackage;
    let buttonElementHoliday;
    let buttonElementDelivery;

    let visibleFlower = false;
    let visibleSize = false;
    let visiblePackage = false;
    let visibleHoliday = false;
    let visibleDelivery = false;

    export let recentlyViewed = [
        {img:'favorite-card', title: 'Настоящая Любовь', time: 'Доставим в течение <span class="text-main">120</span> мин', price: {sale: 3456, full: 3456}, rating: '4,5', size: {text: 'Размеры', width: 50, height: 50}, description: 'Описание состава', like: false},
    ];

    let selectedButtonFlower = false;
    let selectedButtonSize = false;
    let selectedButtonPackage = false;
    let selectedButtonHoliday = false;
    let selectedButtonDelivery = false;

    export let imagelist = [
        {
            src: 'https://i.ibb.co/RgCcQcg/screenshot-russia-rozarioflowers-ru-2020-03-5.jpg',
            alt: 'фото букета'
        },
        {
            src: 'https://i.ibb.co/vwh8Cx2/photo-small-4.jpg',
            alt: 'фото букета'
        },
        {
            src: 'https://i.ibb.co/kHYGFvq/screenshot-russia-rozarioflowers-ru-2020-03-3.jpg',
            alt: 'фото букета'
        },
        {
            src: 'https://i.ibb.co/sCy9DVZ/screenshot-russia-rozarioflowers-ru-2020-03-4.jpg',
            alt: 'фото букета'
        },
        {
            src: 'https://i.ibb.co/mFWtSzn/screenshot-russia-rozarioflowers-ru-2020-03-2.jpg',
            alt: 'фото букета'
        }
    ]

    let deliveryOptions = [
        {text: "доставка к точному времени с 21:00 до 08:00", price: "549"},
        {text: "доставка интервал 2 часа с 21:00 до 08:00", price: "349"},
        {text: "доставка к точному времени с 08:00 до 21:00", price: "249"},
        {text: "доставка интервал 2 часа с 08:00 до 21-00", price: "0"}
    ];
    let svgSize = 24;

    let recommendation = {
        src: 'https://i.ibb.co/TwyZ5Yc/photo-2.jpg',
        title: 'Настоящая Любовь',
        size: {},
        description: 'Роза малиновая — 3 шт., Роза кустовая розовая — 3 шт., Листья эвкалипта, Хризантема кустовая белая — 3 шт., Лимониум синий — 2 шт.',
        time: 'Доставим в течение 120 мин',
        price: {
            sale: '3456',
            full: '3456'
        },
        rating: '5'
    }
    let smilesnumber = [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [2], [3]];
    export let product;
    let width;
    product = {
        composite: true,
        descriptions:'Розовый цвет очень любим многими женщинами и девушками. С этим букетом вы прекрасно сможете продемонстрировать всю красоту данного оттенка.' +
                'Помимо замечательных роз с розовым оттенком, данный букет хорошо дополняют синий лимониум, белые хризантемы и листья эвкалипта с фетром.',
        name: 'Во имя любви',
        rating: 4,
        saled: 44,
        sizes: [
            {
                id: 'small',
                text: 'маленький',
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
                text: 'средний',
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
                text: 'большой',
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
                text: 'огромный',
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
        ],
        chip: 30
    }
    let packages = [
        {id: 'membrane', name: 'плёнка', price: 15},
        {id: 'craft', name: 'крафт', price: 25},
        {id: 'felt', name: 'фетр', price: 35},
        {id: 'sezal', name: 'сезаль', price: 15},
        {id: 'without', name: 'без упаковки', price: 0},
    ]

    export let newBouquet = {
        'Роза': {
            sizes: {
                '30-40': {price: 50, available: true},
                '40-50': {price: 100, available: true},
                '50-60': {price: 200, available: true},
                '60-70': {price: 300, available: true},
                '70-80': {price: 400, available: true},
                '80-90': {price: 500, available: true},
                '90-100': {price: 600, available: true}
            }, id: 'roze'
        },
        'Лилия': {
            sizes: {
                '30-40': {price: 70, available: true},
                '40-50': {price: 111, available: true},
                '50-60': {price: 222, available: true},
                '60-70': {price: 333, available: true},
                '70-80': {price: 433, available: true},
                '80-90': {price: 533, available: true},
                '90-100': {price: 633, available: true}
            }, id: 'Lily'
        },
        'Хризантема': {
            sizes: {
                '30-40': {price: 80, available: true},
                '40-50': {price: 111, available: true},
                '50-60': {price: 222, available: true},
                '60-70': {price: 333, available: true},
                '70-80': {price: 433, available: true},
                '80-90': {price: 533, available: true},
                '90-100': {price: 633, available: true}
            }, id: 'Chrysanthemum'
        },
        'Пион': {
            sizes: {
                '30-40': {price: 500, available: true},
                '40-50': {price: 111, available: true},
                '50-60': {price: 222, available: true},
                '60-70': {price: 333, available: true},
                '70-80': {price: 433, available: true},
                '80-90': {price: 533, available: true},
                '90-100': {price: 633, available: true}
            }, id: 'Peony'
        },
        'Тюльпан': {
            sizes: {
                '30-40': {price: 1000, available: true},
                '40-50': {price: 111, available: true},
                '50-60': {price: 222, available: true},
                '60-70': {price: 333, available: true},
                '70-80': {price: 433, available: true},
                '80-90': {price: 533, available: true},
                '90-100': {price: 633, available: true}
            }, id: 'Tulip'
        },
        colors: [
            {color:'#FFD8D8;', name:'розовый', id:'pink'},
            {color:'#FF0000;', name:'красный', id:'red'},
            {color:'#FFFFFF;', name:'белый', id:'white'},
            {color:'#FFDC00;', name:'желтый', id:'yellow'},
            {color:'#43E267;', name:'зеленый', id:'green'},
            {color:'#49A0F2;', name:'синий', id:'blue'},
            {color:'#E3ADE6;', name:'фиолетовый', id:'Violet'},
            {color:'conic-gradient(from 180deg at 50% 50%, #FF0000 0deg, #FAFF00 50.63deg, #00FF0A 101.25deg, #00F0FF 172.5deg, #0029FF 230.62deg, #BD00FF 286.87deg, #FF0000 350.63deg, #FF0000 360deg);', name:'разноцветный', id:'multicolored'},
        ]
    }

    let amount = [{count: 9}, {count: 15}, {count: 21}, {count: 51}, {count: 101}]
    let sizesFlower = [
        {name: '30-40', id:'30-40'},
        {name: '40-50', id:'40-50'},
        {name: '50-60', id:'50-60'},
        {name: '60-70', id:'60-70'},
        {name: '70-80', id:'70-80'},
        {name: '80-90', id:'80-90'},
        {name: '90-100', id:'90-100'},
    ]

    let flowers = [
        {name: 'Роза', id: 'roze'},
        {name: 'Лилия', id: 'Lily'},
        {name: 'Хризантема', id: 'Chrysanthemum'},
        {name: 'Пион', id: 'Peony'},
        {name: 'Тюльпан', id: 'Tulip'},
    ]
    const holidays = [
        {
            name: 'Без открытки', id: 'withouthol'
        },

        {
            name: 'Юбилей', id: 'anniversary'
        },
        {
            name: 'Поздравление', id: 'Congratulation'
        },
        {
            name: 'День рождения', id: 'bd'
        },
        {
            name: 'Сказать люблю', id: 'lovetosay'
        }
        ,
        {
            name: 'Извинение', id: 'Apology'
        }
    ]
    let congratulations = {
        'Без открытки':{
            text: '',
            UserText: '',
            intermediate: '',
        },
        'Юбилей': {
            text: 'Текст для "Юбилей"',
            UserText: 'Текст для "Юбилей"',
            intermediate: 'Текст для "Юбилей"',
            storage: [],
            count: 0
        },
        'День рождения': {
            text: 'Тебе желаю море счастья, Улыбок, солнца и тепла.' +
                    ' Чтоб жизнь была еще прекрасней, Удача за руку вела! ' +
                    'Тебе желаю море счастья, Улыбок, солнца и тепла. ' +
                    'Чтоб жизнь была еще прекрасней, Удача за руку вела!',
            UserText: 'Тебе желаю море счастья, Улыбок, солнца и тепла.' +
                    ' Чтоб жизнь была еще прекрасней, Удача за руку вела! ' +
                    'Тебе желаю море счастья, Улыбок, солнца и тепла. ' +
                    'Чтоб жизнь была еще прекрасней, Удача за руку вела!',
            intermediate: 'Тебе желаю море счастья, Улыбок, солнца и тепла.' +
                ' Чтоб жизнь была еще прекрасней, Удача за руку вела! ' +
                'Тебе желаю море счастья, Улыбок, солнца и тепла. ' +
                'Чтоб жизнь была еще прекрасней, Удача за руку вела!',
            storage: [],
            count: 0
        },

        'Поздравление': {
            text: 'Текст для "Поздравление"',
            UserText: 'Текст для "Поздравление"',
            intermediate: 'Текст "Поздравление"',
            storage: [],
            count: 0
        },
        'Сказать люблю': {
            text: 'Текст для "Сказать люблю"',
            UserText: 'Текст для "Сказать люблю"',
            intermediate: 'Текст для "Сказать люблю"',
            storage: [],
            count: 0
        },
        'Извинение': {
            text: 'Текст для "Извинение"',
            UserText: 'Текст для "Извинение"',
            intermediate: 'Текст для "Извинение"',
            storage: [],
            count: 0
        },
    }

    let selectedCongratulation = 'Без открытки'
    let selectedFlower = 'Роза';
    let selectedDelivery = 'По городу';
    let sizeFlower = '30-40';
    let amountFlowers = amount[0].count;
    let selectedColor = newBouquet.colors[2].name;
    let numberPackage = 'плёнка';
    let numberSize = product.sizes[2];
    let changedCompos = product.sizes[2];

    const {preloading, page, session} = stores();
    console.log(session, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    let reveal = false;

    function textAnimate() {
        reveal = true
        setTimeout(() => {
            reveal = false
        }, 1000);
        setTimeout(() => {
            changedCompos = numberSize
        }, 200);

    }

    onMount(async () => {
        let navigator = window.navigator.userAgent
        if ( navigator.indexOf("Android") == -1 && navigator.indexOf("webOS") == -1 &&
                navigator.indexOf("iPhone") == -1 && navigator.indexOf("iPad") == -1 &&
                navigator.indexOf("iPod") == -1 && navigator.indexOf("BlackBerry") == -1 &&
                navigator.indexOf("IEMobile") == -1 && navigator.indexOf("Opera Mini") == -1) {
            console.log('done')
        } else {
            window.location = 'product/cardMobile'
        }

        $orderStore.orderList = orderList;
        $orderStore.totalPrice = orderList.reduce((acc, val) => {
            return acc + val.flower.price * val.flower.quantity;
        }, 0);
        if (once) {
            once = false;
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
            sources.forEach(source => observer.unobserve(source));
            observer.disconnect();
        };
    });

    function checkOrder() {
        if (!$orderStore.orderList.length) {
            productAdded = false
        } else {
            productAdded = true
        }
    }

    $: if ($orderStore && !once) {
        checkOrder()
    }

    $: if(selectedCongratulation && !once) {
        if(selectedCongratulation != 'Без открытки')
        togglepostCardModalVisible()
    }
    let packagePrice;
    $: if(numberPackage) {
        if(numberPackage == 'без упаковки'){
            packagePrice = 0
        } else {
            packagePrice = packages.find((item) => {
                if(item.name == numberPackage) {
                    return item.price
                }
            })
            packagePrice = packagePrice.price
        }
    }
export let pagefor;
export let path;

if(pagefor.params.slug[0] % 2 == 0) {
    product.composite = false;
}

</script>

<style>
  .amountFlowerText {
    padding-top: 1px;
  }
  .reveal,
  .reveal::after {
      animation-delay: 0;
      animation-delay: var(--animation-delay, 0.1s);
      animation-iteration-count: 1;
      animation-iteration-count: var(--iterations, 1);
      animation-duration: 800ms;
      animation-duration: var(--duration, 800ms);
      animation-fill-mode: both;
      animation-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);
  }

  .reveal {
      position: relative;
      font-size: 6vw;
      animation-name: text;
      color: #FFF;
  }

  .reveal::after {
      content: "";
      position: absolute;
      z-index: 999;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: transparent;
      transform: scaleX(0);
      transform-origin: 0 50%;
      pointer-events: none;
      animation-name: revealer;
  }



  @keyframes text {
      from {
          clip-path: inset(0 100% 0 0);
      }
      to {
          clip-path: inset(0 0 0 0);
      }
  }

  @keyframes revealer {

      0%, 50% {
          transform-origin: 0 50%;
      }

      60%, 100% {
          transform-origin: 100% 50%;
      }


      60% {
          transform: scaleX(1);
      }

      100% {
          transform: scaleX(0);
      }
  }

  :global(.carousel-item) {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.8s ease;
    flex: 1 0 auto;
    display: inline-block;

  }
  :global(.rev-carousel-item) {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.8s ease;
    flex: 1 0 auto;
    display: inline-block;
      }
  :global(.gift-carousel-item) {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.8s ease;
    flex: 1 0 auto;
    display: inline-block;
  }

  .headline {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    color: #330033;
    line-height: 100%;
    margin-bottom:12px;
  }
  .highlighting {
    color: #330033;
  }
  .OutLineRadio {
    margin-right: 16px;
  }
  .OutLineRadio button {
      align-items: center;
  }
  .OutLineRadio input:checked + label {
         @apply border-info text-main;
         font-weight: 600;
     }
  .OutLineRadio input:checked + label .mini-size{
      font-weight: normal;
  }
  .OutLineRadio label {
    color: var(--gray-600);
    height: 35px;
    display:block;
    padding-left: 12px;
    padding-right: 12px;
    line-height: 30px;
      white-space: nowrap;
  }
  .OutLineRadio label:hover {
    color: var(--color-main);
  }
  .OutLineRadio .unused {
    height: 35px;
    display:block;
    padding-left: 12px;
    padding-right: 12px;
    line-height: 1px;
    background: #F6F6F6;
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    color: var(--gray-700);
  }
  .product__photo {
      width: 40%;
  }

  .product-conteiner {
    display: flex;
    margin-bottom: 10px;
    width:100%;
    }
  .section__name {
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 115%;
    color: #330033;
  }

  .product {
    border: 1px solid var(--gray-300);
    width: calc(99% - 310px);
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #F6F6F6;
    border-radius: 4px;

  }
  .product__fixedButtons {
    width: 100%;
    height: 125px;
    position: sticky;
    top: calc(100vh - 140px);
    background: var(--gray-200);
    z-index: 11;
    border-top: 1px solid var(--gray-300) ;
  }
  .product__fixedButtons-contain {
    width: 100%;
    justify-content: space-between;
    padding-top: 24px;
    padding-left: 80px;
    padding-right: 80px;
  }
  .product__fixedButtons-contain p{
    font-size: 14px;
    line-height: 135%;
    color: var(--gray-600);
    margin-top: 4px;
  }

  .product__fixedButton_right {
    justify-content: space-between;
      padding-left: 18px;
  }
  .product__nav {
    height: 63px;
    border-bottom: 1px solid var(--gray-300);
    margin-bottom: 34px;
    margin-top: -125px;
    padding-left: 80px;
    padding-right: 80px;
      line-height: 150%;
      align-items: center;
      display:flex;
  }
  .section__name_gift {
      margin-bottom: 24px;
  }

  .nav__item {
    display: inline;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 130%;
    }
  .nav__item li + li:before {
    content: "\02022";
    padding: 8px;
    color: var(--gray-700);
  }

  .product-description {
    display: flex;
    padding-left: 80px;
    padding-right: 80px;
  }
  .product__photo {
    width: 37%;
    }
  .product__photo_item {
    position: sticky;
    top: 120px;
  }

  .product__configurations {
    margin-left: 3%;
    width: 60%;
      }
  .product__name {
    font-weight: bold;
    font-size: 24px;
    line-height: 135%;
    color: #330033;
  }
  .product__text {
    margin-top: 12px;
    margin-bottom: 12px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 130%;
    color: var(--gray-700);
  }
  .product__price {
      width: auto;
  }
  .product__price_main {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 135%;
    color: #330033;
    margin-right: 16px;
      width: 109px;
      justify-content: flex-end;
  }
  .product__price_withDiscount {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    text-decoration-line: line-through;
    color: #B0B0B0;
    margin-right: 34px;
      flex-wrap: nowrap;
  }
  .product__rating {
    font-weight: 600;
    font-size: 14px;
    margin-top: 8px;
    color: #330033;
  }
  .sales {
    font-weight: normal;
    font-size: 12px;
    color: #330033;
    margin-left: 14px;
  }
  .product__coupon {
    margin-top: 16px;
  }

  .product__size {
    margin-top:34px;
  }
  .mini-size {
      display: flex;
      font-size: 14px;
      color: var(--color-main);
  }
  .product__size-buttons {
    flex-wrap: wrap;
  }
  .product__package-buttons :last-child {
    margin-right: 0px;
  }

  .product__composition {
    font-size: 14px;
    line-height: 135%;
    color: #666666;
    margin-left: 12px;
    margin-bottom: 30px;
    margin-top: 4px;
  }
  .composition-quantity {
    color: var(--color-main);
  }
  .param__container {
    margin-top:34px;
  }

  .colorBouquet {
    margin-bottom: 16px;
      transition: all 0.2s ease;
  }
  .colorBouquet p{
      display: none;

  }
  .colorBouquet label{
    margin-right: 14px;
    padding: 2px;
   border: 1px solid #fff;
  }
  .colorBouquet:last-child label{
      margin-right: 0;
  }
  .colorBouquet label:hover {
     border: 1px solid var(--gray-700);
     border-radius: 4px;
  }
  .colorBouquet input:checked + label  {
      padding: 4px 12px 4px 4px;
      border: 1px solid var(--color-info);
      box-sizing: border-box;
      border-radius: 4px;
  }
  .colorBouquet input:checked + label p {
      display: block;
      font-weight: 600;
      font-size: 16px;
      line-height: 130%;
      color:var(--color-main);
  }
  .colorBouquet__square {
      border-radius: 4px;
      width: 27px;
      height: 27px;
  }

  .product__conditions p {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 135%;
    color: #666666;
    margin-top: 4px;
  }
  .product__postCartBlock {
      padding: 16px;
      padding-right: 36px;
      margin-top: 12px;
      max-width: 411px;
      transition: all 0.2s ease;
      border-radius: 4px;
  }
  .product__postCartBlock svg{
      display: none;
  }
  .product__postCartBlock:hover {
      cursor:pointer;
      background-color: var(--gray-200);
  }
  .product__postCartBlock:hover svg{
     display:block;
      position: absolute;
      right: 8px;
      bottom:12px;
  }
  .product__buyersGuarantees {
    margin-top: 34px;
  }

  .product__conditions h2 {
    margin-top:14px;
  }
  .product__conditions div {
    margin-bottom:4px;
  }
.guarantee__container {
  padding-left:34px;
  padding-right:34px;
  padding-top:24px;
  padding-bottom:34px;
}

  .guarantee__right {
    margin-left: 30px;
  }

  .guarantee__icon {
    width: 48px;
    height: 48px;
    margin-top: 5px;
  }
  .guarantee__text {
    margin-left:12px;
  }
  .guarantee__item {
    margin-top:24px;

  }
  .guarantee p {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 135%;
    color: #666666;
    margin-top: 2px;
    width: 282px;
  }

  .stagesDesign {
    padding-left: 80px;
    padding-right: 80px;
    margin-top: 68px;
  }

  .gifts {
    margin-top: 68px;
  }
  .gifts .section__name{
    margin-left: 80px;
  }

  .product__rating-numeral {
    margin-right: 12px;
    margin-left: 12px;
  }



  .feedback h2 {
    margin-left:80px;
  }
  .feedback__text {
    margin-left:80px;
  }

  .feedback__text {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 130%;
    color: #999999;
    margin-bottom:24px;
    margin-top:22px;
  }

  .feedback__clients-photos {
    margin-top:55px;
    margin-bottom: 44px;
  }

  .feedback__reviews-photos{
       margin-top:68px;
       margin-bottom: 68px;
     }


  .feedback__product-photo{
   width: 100%;
   margin-top: 34px;
   padding: 0 80px;
  }
  .recommendation{
    margin-left: 80px;
    margin-right: 80px;
    margin-top: 68px;
    margin-bottom: 185px;
  }

  .recommendation__products {
      justify-content: space-between;
      margin-top:24px;
      margin-bottom: 73px;
  }
  .recommendation__product {
      margin-right: 41px;
      flex-basis: calc(100% / 3);
  }
  .recommendation__product:last-child {
      margin-right: 0;
  }

  .order__section{
    font-size: 16px;
    line-height: 130%;
    color: #330033;
    position: sticky;
    height:100%;
    top:85px;
  }
  .MyOrder{
    width: 310px;
    height: calc(100vh - 6.4rem);
      margin-left: 10px;
  }
  .afterOrder {
      margin-top: 55px;
      padding-left: 80px;
      padding-right: 80px;
  }


  @media (max-width: 1300px) {
      .product__fixedButtons-contain {
          padding: 0 44px;
          padding-top: 15px;
          justify-content: space-between;
      }
      .product__price_main {
          justify-content: flex-start;
      }
      .product__fixedButton_right {
          flex-wrap:wrap;
          justify-content: flex-end;
      }
      .product__price {
          width: 300px;
      }
      .product__price_withDiscount {
          margin-right: 0;
      }

      .OutLineRadio  label {
          font-size: 15px;
      }
      .product__photo {
          width: 37%;
      }
      .OutLineRadio {
          font-size: 15px;
      }
      .OutLineRadio  .unused {
          font-size: 15px;
      }
      .product__nav{
          padding-left: 44px;
      }
      .section__name_gift {
          margin-bottom: 24px;
      }
      .product-description{
          padding-left: 44px;
          padding-right: 44px;
      }

      .recommendation{
          margin-left: 44px;
          margin-right:44px;
          margin-top: 28px;
      }
      .recommendation__product {
          margin-right: 24px;
          flex-basis: calc(100% / 3);
      }
      .recommendation__product:last-child {
          margin-right: 0;
      }
      .stagesDesign {
          padding-left:44px;
          padding-right:44px;
      }
      .afterOrder {
          padding-left: 44px;
          padding-right: 44px;
      }
      .feedback h2 {
          margin-left:44px;
      }
      .feedback__text {
          margin-left:44px;
      }
    .stagesDesign__container {
           margin-top:24px;
           margin-bottom: -25px;
           justify-content: start;
         }
    .feedback__product-photo {
        padding: 0 44px;
      margin-top: 24px;
    }
      .gifts .section__name{
          margin-left: 44px;
      }
  }
  @media (max-width: 1000px) {
    .feedback__text {
      margin-top: 16px;
      margin-bottom: 18px;
    }
    .product__size-buttons {
      width: 280px;
      justify-content: flex-start;
    }

    .vis1000 {
      display: none;
    }
    .feedback__product-photo {
      margin-top: 18px;
    }
      .OutLineRadio  label {
          font-size: 15px;
      }
      .OutLineRadio {
          font-size: 15px;
      }
      .OutLineRadio  .unused {
          font-size: 15px;
      }
    .gifts {
      margin-top: 48px;
    }
      .section__name_gift {
          margin-bottom: 18px;
      }
        .stagesDesign__container {
          justify-content: start;
          flex-wrap: wrap;
      }
      .stagesDesign {
          margin-top: 48px;
      }

    .feedback__reviews-photos{
      margin-bottom: 48px;
    }
    .feedback__clients-photos {
      margin-top:10px;
      margin-bottom: 35px;
    }
    .recommendation__products{
      margin-top:18px;
    }
      .recommendation{
          margin-top: 18px;
      }
      .recommendation__products{
          justify-content: flex-start;
      }
      .recommendation__product {
          margin-right: 24px;
          flex-basis: calc(100% / 2);
      }
      .recommendation__product:last-child {
          display: none;
          margin-right: 0;
      }
  }

</style>

<svelte:window bind:innerWidth={width}/>
<svelte:head>
    <title>Надежная доставка цветов в Мурманске — Розарио.Цветы</title>
    <meta
            name="description"
            content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в
    Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или
    банковской картой." />

    <link rel="canonical" href="https://{$page.host + $page.path}" />

    <link
            rel="alternate"
            href="https://{$page.host + $page.path}"
            type="text/html"
            hreflang="ru"
            title="Русский" />
    <link
            rel="alternate"
            href="https://{$page.host + $page.path}"
            type="text/html"
            hreflang="en"
            title="English" />

    <meta
            name="keywords"
            content="Доставка цветов в Мурманске, Цветы с доставкой в Мурманске,
    Заказать цветы с доставкой в Мурманске, " />

    <meta name="geo.region" content="" />
    <meta name="geo.position" content="" />
    <meta name="geo.placename" content="" />
    <meta name="ICBM" content="" />
    <meta name="referrer" content="always" />

    <meta
            property="og:title"
            content="Надежная доставка цветов в Мурманске — Розарио.Цветы" />
    <meta
            property="og:description"
            content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в
    Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или
    банковской картой." />
    <meta property="og:image" content="ruka3.jpg" />
    <meta property="og:url" content="url" />
    <meta property="og:site_name" content="Розарио.Цветы" />
    <meta property="og:type" content="website" />

    <meta
            name="twitter:title"
            content="Надежная доставка цветов в Мурманске — Розарио.Цветы" />
    <meta
            name="twitter:description"
            content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в
    Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или
    банковской картой." />
    <meta name="twitter:image" content="ruka3.jpg" />
    <meta name="twitter:image:alt" content="Розарио.Цветы" />
    <meta name="twitter:card" content="summary" />

</svelte:head>

{#if postCardModalVisible}
  <PostCardModal bind:value={congratulations[selectedCongratulation].intermediate}
                 bind:texts={congratulations[selectedCongratulation]}
                 bind:selectedCongratulation={selectedCongratulation}
                 on:close={togglepostCardModalVisible} focused/>
{/if}
<div class="product-conteiner">
  <div class="product">
     <div class="product__fixedButtons">
      <div class="product__fixedButtons-contain flex">

        <div class="product__fixedButton_left">
          <InfoButton
                on:click
                css="width: 520px; max-height: 330px;"
                position="LEFT"
                iconPos="left"
                icon="icon_delivery_ok"
                styleText="font-weight: 600;
                                      font-size: 14px;
                                      color: #330033;
                                      margin-top:4px;"
                styleMainIcon="color: var(--color-info);
                                              fill: var(--color-info);
                                              width: 24px;
                                              height: 24px;
                                              margin-right: 9px;
                                              "
                iconAfter="arrow_down"
                iconAfterCss="width:12px; margin-top: 5px; margin-left: -8px;"
                styleBlock="margin-bottom:4px"
                text={['Условия доставки']}>
          <section class="leading-tight rounded bg-white px-32 py-24">
            <h2 class="text-main text-lg font-bold mb-8">
              Доставка Розарио.Цветы
            </h2>
            <p class="text-sm text-gray-700 mb-16">
              Доставку выполняют курьеры Розарио.Цветы
            </p>
            <ul>
              {#each deliveryOptions as option}
                <li
                        style="transform: translateX(-0.5rem);"
                        class="pl-8 flex items-center text-main py-12 border-b
                      last:border-b-0 border-gray-900">
                  <div class="image-box">
                    <img
                            width={svgSize}
                            height={svgSize}
                            src="delivery-icon.svg"
                            alt="delivery" />
                  </div>
                  <span class="mx-8">{option.price}Р</span>
                  <p class="text-sm">{option.text}</p>
                </li>
              {/each}
            </ul>
          </section>
        </InfoButton>
          <p class="whitespace-nowrap">Стоимость доставки: <span class="highlighting ">0–549 ₽</span></p>
          <p>Ближайшая дата доставки: <span class="highlighting">22.02.2020, <span class="whitespace-nowrap">в течение 120 мин</span></span></p>
        </div>
        <div class="product__fixedButton_right flex items-center">
          {#if product.composite}
            <div class="flex items-center product__price">
              <span class="product__price_main flex"><AnimateNumber number={Math.round((packagePrice + numberSize.price - couponDeal - couponNew)/100*(100-product.chip))}/> &nbsp;₽</span>
              <span class="product__price_withDiscount whitespace-nowrap">{String(numberSize.price + packagePrice -couponDeal - couponNew).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽</span>
            </div>
          {:else}
            <div class=" flex items-center product__price">
              <span class="product__price_main flex"><AnimateNumber
                      number={Math.round(packagePrice + (amountFlowers*newBouquet[selectedFlower].sizes[sizeFlower].price - couponDeal - couponNew )/100*(100-product.chip))}/>&nbsp;₽</span>
              <span class="product__price_withDiscount whitespace-nowrap">{String(amountFlowers*newBouquet[selectedFlower].sizes[sizeFlower].price + packagePrice -couponDeal - couponNew)
              .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') } ₽</span>
            </div>
          {/if}
          <div class="flex items-center">
            <div class="mr-18">
              <Button size="lg" status={productAdded ? 'active-secondary' : 'active-main' } on:click={()=>{
              orderStore.addToOrderList(flowersList[0])}} >
                  <span class="whitespace-nowrap">Добавить в корзину</span>
              </Button>
            </div>
            <HeartCounter/>
          </div>
          </div>

      </div>
    </div>
    <div class="product__nav">
      <nav>
        <ul>
           <li class="nav__item text-gray-700" ><a href="#">Доставка цветов</a>  •  </li>
          <li class="nav__item text-gray-700"><a href="#">Мурманск</a>  •  </li>
          <li class="nav__item text-gray-700"><a href="#">Букеты</a>  •  </li>
          <li class="nav__item text-gray-700"><a href="#">Букеты из хризантем</a>  •  </li>
          <li class="nav__item text-main"><a href="#">Во имя любви</a> </li>
        </ul>
      </nav>
      </div>
    <section class="product-description">
      <div class="product__photo">
        <div class="product__photo_item">
            <ImageViewer imagelist = {imagelist} />
      </div>
      </div>
      <div class="product__configurations">
          <h1 class="product__name">{product.name}</h1>
        {#if product.descriptions}
            <p class="product__text">{product.descriptions}</p>
        {/if}
        <div class="flex product__rating items-center">
            <div class="stars__img flex">
                <StarRating
                        className=""
                        name="productRaiting"
                        kind="static"
                        val={product.rating} />
            </div>
            <span class="product__rating-numeral">{product.rating}</span>
          <span class="stars">|</span><span class="sales">{product.saled} продано</span>
        </div>
          <div class="product__coupons">
           <div class="product__coupon">
             <Coupon type="deal" text="Купон нового пользователя" price="200" bind:couponPrice={couponNew}/>
           </div>
           <div class="product__coupon">
             <Coupon type="new" text="Купон на товар" price="136" bind:couponPrice={couponDeal}/>
           </div>
          </div>
        {#if product.composite}
          <div class="product__size">
            <h2 class="headline"> Выберите размер букета</h2>
            <div class="product__size-buttons flex  ">
              {#each product.sizes as size, i}
                <div class="OutLineRadio product__size-button">
                  {#if size.available == true}
                    <div>
                      <input
                              bind:group={numberSize}
                              class="visuallyhidden"
                              type="radio"
                              value={size}
                              id={size.id}
                              name={numberSize}
                              />
                      <label   class=" cursor-pointer rounded leading-snug border border-gray-500 hover:text-main hover:border-gray-700 flex  whitespace-nowrap mb-12" for={size.id}
                      on:click={textAnimate}>
                          <div class="flex items-center">
                        <span>{size.text}</span>
                          {#if numberSize == size}
                              <span class="mini-size items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-12 mr-4" width="15" height="9" viewBox="0 0 15 9" fill="none">
                                    <path d="M4.28537 7.99995L1 4.50046L4.28537 1.00098" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M10.7158 1L14.0002 4.49949L10.7158 7.99897" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M1.33984 4.50049H13.6137" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg> {numberSize.width} см
                                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-12 mr-4" width="9" height="15" viewBox="0 0 9 15" fill="none">
                                    <path d="M7.99995 10.7146L4.50046 14L1.00098 10.7146" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M1 4.28418L4.49949 0.999802L7.99897 4.28418" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4.50098 13.6597L4.50098 1.38579" stroke="#330033" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>{numberSize.height} см
                              </span>
                          {/if}
                          </div>
                      </label>
                    </div>
                  {:else}
                    <button class="unused mb-12">{size.text}</button>
                  {/if}
                </div>
              {/each}
            </div>
              <div class:reveal>
                <p class="product__composition">
          {#each changedCompos.composition as { name, amount }, i}
                  {name} — <span class="composition-quantity">{amount} шт.</span>,
          {/each}
                </p>
              </div>
          </div>
        {/if}

        {#if !product.composite}
            <div class="params__container">
        <div class="param__container">
          <div class="flex">
            <h2 class="headline"> Выберите цветок</h2>
          </div>
            {#if flowers}
                <AutoWidthButtons value={selectedFlower} bind:group={selectedFlower} selectedText="Еще" list={flowers} buttonElement=""/>
            {/if}
           </div>
          <div class="param__container">
            <div class="flex">
              <h2 class="headline"> Выберите высоту цветов</h2>
            </div>
              {#if sizesFlower}
                  <AutoWidthButtons value={sizeFlower} bind:group={sizeFlower} selectedText="Еще" list={sizesFlower} buttonElement=""/>
              {/if}
          </div>
          <div class="param__container">
            <div class="flex">
              <h2 class="headline"> Выберите количество цветов</h2>
            </div>
            <div class="flex">
              <div class="OutLineRadio product__size-button">
                <PlusMinusButton bind:number={amountFlowers} min={amount[0].count} />
              </div>
              {#if width>1150}
                {#each amount as item, i}
                  <div class="OutLineRadio">
                    <input
                            bind:group={amountFlowers}
                            class="visuallyhidden"
                            type="radio"
                            value={+item.count}
                            name={amountFlowers}
                            id={i}
                    />
                    <label class="cursor-pointer rounded leading-snug border border-gray-500 hover:text-main hover:border-gray-700 amountFlowerText" for={i}>
                      {item.count}
                    </label>
                  </div>
                {/each}
              {:else}
                {#each amount as item, i}
                {#if item.count != 15}
                  <div class="OutLineRadio">
                    <input
                            bind:group={amountFlowers}
                            class="visuallyhidden"
                            type="radio"
                            value={+item.count}
                            name={amountFlowers}
                            id={i}
                    />
                    <label class="cursor-pointer rounded leading-snug border border-gray-500 hover:text-main hover:border-gray-700 amountFlowerText" for={i}>
                      {item.count}
                    </label>
                  </div>
                {/if}
                {/each}
                {/if}
            </div>
          </div>
                {#if newBouquet.colors}
                    <div class="param__container">
                        <h2 class="headline mb-16"> Выберите цвет букета</h2>
                    <div class="flex flex-wrap items-center">
                        {#each newBouquet.colors as color}
                            <div class="colorBouquet items-center">
                                <input class="visuallyhidden" bind:group='{selectedColor}' name={color.id} value="{color.name}" type="radio" id='{color.id}'/>
                                <label class="flex" for='{color.id}'>
                                    <div class="flex items-center">
                                        <div class="colorBouquet__square " style='background:{color.color} {color.name == 'белый' ? 'border: 1px solid var(--gray-1100); border-radius: 4px;' : ''}'>
                            </div>
                                    <p class="ml-8">{color.name}</p>
                            </div>
                            </label>
                        </div>
                        {/each}
                    </div>
                </div>
                {/if}
            </div>
          {/if}

        <div class="product__package param__container ">
          <h2 class="headline -mt-16">Выберите упаковку</h2>
            {#if packages}
                <AutoWidthButtons value={numberPackage} bind:group={numberPackage} selectedText="Еще" list={packages} buttonElement=""/>
            {/if}
        </div>
        <div class="product__conditions">
          <div class="param__container">
            <h2 class="headline">Добавьте открытку бесплатно</h2>
              {#if holidays}
                  <AutoWidthButtons bind:group={selectedCongratulation} selectedText="Еще" list={holidays} buttonElement=""/>
              {/if}
              {#if selectedCongratulation != 'Без открытки' && congratulations[selectedCongratulation].UserText != ''}
                  {congratulations[selectedCongratulation].UserText == '' ? selectedCongratulation = 'Без открытки': ''}
                  <div class="product__postCartBlock relative" on:click={togglepostCardModalVisible}>
                  <p class="break-words">{congratulations[selectedCongratulation].UserText}</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                          <path d="M14.0301 0.970913C12.7387 -0.323637 10.6387 -0.323637 9.34732 0.970913L0.761729 9.5533C0.694604 9.62043 0.653051 9.70673 0.640265 9.79942L0.00417736 14.5109C-0.0150012 14.6452 0.0329452 14.7794 0.125641 14.8721C0.205552 14.9521 0.317427 15 0.429301 15C0.44848 15 0.467658 15 0.486837 14.9968L3.32526 14.6132C3.56179 14.5813 3.72801 14.3639 3.69604 14.1274C3.66408 13.8908 3.44672 13.7246 3.21019 13.7566L0.934336 14.0634L1.37864 10.7775L4.83717 14.2361C4.91708 14.316 5.02895 14.3639 5.14083 14.3639C5.2527 14.3639 5.36458 14.3192 5.44449 14.2361L14.0301 5.65367C14.6566 5.02717 15.0018 4.1961 15.0018 3.31069C15.0018 2.42528 14.6566 1.59421 14.0301 0.970913ZM9.51353 2.02573L10.9551 3.46732L3.12069 11.3017L1.6791 9.86016L9.51353 2.02573ZM5.14402 13.3219L3.7344 11.9123L11.5688 4.07783L12.9785 5.48745L5.14402 13.3219ZM13.5794 4.87054L10.1304 1.42161C10.5683 1.06041 11.1149 0.862234 11.6903 0.862234C12.3456 0.862234 12.9593 1.11795 13.4228 1.57823C13.8862 2.03852 14.1388 2.65543 14.1388 3.31069C14.1388 3.88924 13.9406 4.43264 13.5794 4.87054Z" fill="#330033"/>
                      </svg>
                  </div>
              {/if}
          </div>
          <div class="product__buyersGuarantees">
            <div class="flex">
              <InfoButton
                      on:click
                      css="width: 800px;"
                      position="CENTER"
                      iconPos="left"
                      icon="icon_warranty"
                      styleText="font-weight: 600;
                                    font-size: 14px;
                                    color: #330033;
                                    "
                      styleMainIcon="color: var(--color-info);
                                            fill: var(--color-info);
                                            width: 24px;
                                            height: 24px;
                                            margin-right: 5px;
                                            "
                      iconAfter="arrow_down"
                      overSize={true}
                      iconAfterCss="width:12px; margin-left: -8px;"
                      text={['Гарантии покупателя ']}>
                <section class="leading-tight rounded bg-white guarantee__container">
                  <h3 class="text-main text-lg font-bold">
                    Гарантии качества
                  </h3>
                  <div class="flex guarantee">
                    <div class="guarantee__left">
                      <div class="guarantee__item flex">
                        <div class="guarantee__icon">
                          <picture >
                            <img src="icon_flowers.svg" alt="icon_delivery" >
                          </picture>
                        </div>
                      <div class="guarantee__text">
                        <h2 class="headline">100 % гарантия свежести</h2>
                        <p class="">Мы собираем букеты только из свежих цветов высшего качества</p>
                      </div>
                      </div>
                      <div class="guarantee__item flex">
                        <div class="guarantee__icon">
                          <picture>
                            <img src="icon_face.svg" alt="icon_delivery">
                          </picture>
                        </div>
                        <div class="guarantee__text">
                          <h2 class="headline">Счастливый получатель</h2>
                          <p class="">Не понравился букет? Сообщите нам об этом в течение 24 часов, и мы заменим его на новый.</p>
                        </div>
                      </div>
                      <div class="guarantee__item flex">
                        <div class="guarantee__icon">
                          <picture >
                            <img src="icon_feedback.svg" alt="icon_delivery" class="w-full h-full">
                          </picture>
                        </div>
                        <div class="guarantee__text">
                          <h2 class="headline">Всегда на связи</h2>
                          <p class="">Мы всегда согласуем с вами любые изменения в заказе, а также сообщим, если не удалось связаться с получателем букета.</p>
                        </div>
                      </div>
                    </div>
                    <div class="guarantee__right">
                      <div class="guarantee__item flex">
                        <div class="guarantee__icon">
                          <picture>
                            <img src="icon_superhero.svg" alt="icon_superhero" >
                          </picture>
                        </div>
                        <div class="guarantee__text">
                          <h2 class="headline">Лучшие флористы</h2>
                          <p class="">Все букеты с любовью собирают опытные флористы, настоящие мастера своего дела.</p>
                        </div>
                      </div>
                      <div class="guarantee__item flex">
                      <div class="guarantee__icon">
                        <picture>
                          <img src="icon_exchange.svg" alt="icon_exchange">
                        </picture>
                      </div>
                      <div class="guarantee__text">
                        <h2 class="headline">Замена букета</h2>
                        <p class="">В последний момент передумали или решили отказаться от покупки? Ничего страшного! Свяжитесь с нами до момента сборки букета, и мы учтём ваши пожелания.</p>
                      </div>
                    </div>
                      <div class="guarantee__item flex">
                      <div class="guarantee__icon">
                        <picture>
                          <img src="icon_delivery.svg" alt="icon_delivery" >
                        </picture>
                      </div>
                      <div class="guarantee__text">
                        <h2 class="headline">Пунктуальная доставка</h2>
                        <p class="">Наши курьеры безупречно вежливы, и всегда доставляют заказы точно в срок.</p>
                      </div>
                    </div>
                    </div>
                  </div>
                </section>
              </InfoButton>
            </div>
              <p>100% гарантия свежести. Счастливый получатель. Замена букета. Пунктуальная доставка.</p>
          </div>
            <div>
                <h3 class="flex items-center mt-34 text-main font-semibold text-sm"><svg xmlns="http://www.w3.org/2000/svg" class="mr-8" width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="#E71F75"/>
                    <path d="M7 7L13 13M13 7L7 13" stroke="#E71F75" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> Правила отмены</h3>
                <p>Вы можете бесплатно отменить заказ до получения фото букета, деньги полностью вам вернутся.
                    При отмене заказа после  получения фото букета деньги не возвращаются</p>
            </div>
        </div>
      </div>
    </section>
    {#if !product.composite}
      <section class="stagesDesign">
          <StagesDesignProductCart/>
        </section>
    {/if}
    <section class="gifts">
      <h2 class="section__name section__name_gift">Добавьте подарок к букету</h2>
        <Slider sliderName="gift" forDesktop="4" middle="3" small="2" middleSpaceBreakpoint="1250" height="326">
        {#each smilesnumber as item}
            <div class="swiper-slide" >
                <Gift/>
            </div>
        {/each}
        </Slider>
    </section>
    {#if product.composite }
    <div class="afterOrder">
        <h2 class="section__name">После оформления заказа</h2>
        <StagesAfterOrder/>
    </div>
    {/if}

    <section class="feedback">
      <div class="feedback__clients-photos">
        <h2 class="section__name">Улыбки наших получателей</h2>
        <p class="feedback__text">Очаровательные улыбки, запечатлённые нашей службой доставки </p>
          <Slider sliderName="smile" forDesktop="4" middle="3" small="2" middleSpaceBreakpoint="1133" height="255">
                {#each smiles as smile}
                    <div class="swiper-slide" >
                        <Smile {smile} version="2"/>
                    </div>
                {/each}
          </Slider>
      </div>
      <div class="feedback__reviews-photos">
        <h2 class="section__name">Отзывы</h2>
        <p class="feedback__text">Вы помогаете сделать лучший выбор другим покупателям </p>
          <Slider sliderName="testimonial" forDesktop="3" middle="2" small="2" height="305">
              {#each testimonials as testimonial}
                  <div class="swiper-slide" >
                      <Testimonial {testimonial} version="2"/>
                  </div>
              {/each}
          </Slider>
      </div>

      <div class="feedback__photos">
        <h2 class="section__name">Фото букета</h2>
        <div class="feedback__product-photos">
          <div class="feedback__product-photo">
              <picture>
                  <source
                          data-srcset="https://i.ibb.co/tpLGpJf/image-1.jpg.img.webp, https://i.ibb.co/tpLGpJf/image-1.jpg.img-2x.webp 2x" />
                  <img    data-srcset="https://i.ibb.co/tpLGpJf/image-1.jpg.img-2x.png 2x"
                          data-src="https://i.ibb.co/tpLGpJf/image-1.jpg.img.png"
                          alt="photo" />
              </picture>
              <noscript>
                  <img srcset="https://i.ibb.co/KK5WzzS/image-2.jpg-2x.png 2x" src="./11.png" alt="photo">
              </noscript>
          </div>
          <div class="feedback__product-photo">
              <picture>
                  <source
                          data-srcset="https://i.ibb.co/KK5WzzS/image-2.jpg.img.webp, https://i.ibb.co/KK5WzzS/image-2.jpg.img-2x.webp 2x" />
                  <img    data-srcset="https://i.ibb.co/KK5WzzS/image-2.jpg.img-2x.png 2x"
                          data-src="https://i.ibb.co/KK5WzzS/image-2.jpg.img.png"
                          alt="photo" />
              </picture>
              <noscript>
                  <img srcset="https://i.ibb.co/KK5WzzS/image-2.jpg-2x.png 2x" src="./11.png" alt="photo">
              </noscript>
          </div>
          <div class="feedback__product-photo">
              <picture>
                  <source
                          data-srcset="https://i.ibb.co/Nmg89bk/image-3.jpg.img.webp, https://i.ibb.co/Nmg89bk/image-3.jpg.img-2x.webp 2x" />
                  <img    data-srcset="https://i.ibb.co/Nmg89bk/image-3.jpg.img-2x.png 2x"
                          data-src="https://i.ibb.co/Nmg89bk/image-3.jpg.img.png"
                          alt="photo" />
              </picture>
              <noscript>
                  <img srcset="https://i.ibb.co/Nmg89bk/image-3.jpg-2x.png 2x" src="./11.png" alt="photo">
              </noscript>
          </div>
        </div>
      </div>
    </section>
    <section class="recommendation">
      <h2 class="section__name">Специально для вас</h2>
      <div class="recommendation__products flex">
          <div class="recommendation__product">
              <SpecialCard recommendation={recentlyViewed[0]}/>
          </div>
          <div class="recommendation__product">
              <SpecialCard recommendation={recentlyViewed[0]}/>
          </div>
          <div class="recommendation__product">
              <SpecialCard recommendation={recentlyViewed[0]}/>
          </div>
      </div>
    </section>
  </div>
  <div class="order__section">
    <div class="MyOrder">
      <OrderContainer/>
    </div>
  </div>
</div>

