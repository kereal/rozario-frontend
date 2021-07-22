<script context="module">
    export async function preload(page, session) {
        try {
            const res = await this.fetch(
                    `index.json?city=${page.host[0]}&path=${page.path}`
            );
            const json = await res.json();
            return {
                slug: page.slug,
                path: page.path,
                categories: json.catalog,
                cityMeta: json.cityMeta,
                activeOrders: json.activeOrders,
                deliveryAddresses: json.deliveryAddresses,
                orderStories: json.orderStories,
                recommendations: json.recommendations
            };
        } catch (e) {
            console.log(e);
        }
    }
</script>

<script>
    import ScrollSpy from "../../utils/scrollSpy.js";
    import {onMount, setContext} from "svelte";
    import {mainStore} from "../../stores/global.js";
    import Tabbar from "../../components/Tabbar.svelte";
    import AsideNavigation from "../../components/AsideNavigation.svelte";
    import ShowcaseTable from "../../components/ShowcaseTable.svelte";
    import TextInput from "../../components/TextInput.svelte";
    import CustomCheckbox from "../../components/CustomCheckbox.svelte";
    import TelInput from "../../components/TelInput.svelte";
    import Button from "../../components/Button.svelte";
    import SelectLabel from "../../components/SelectLabel.svelte"
    import BusinessRequisitesData from "../../components/BusinessRequisitesData.svelte";
    import BusinessListWorkersData from "../../components/BusinessListWorkersData.svelte";
    import debounce from "lodash-es/debounce";

    export let cityMeta;
    export  let flowers = [
        {
            name: 'Альстромерия',
            selected:true,
            colors: [
                {color:'красный',
                 style:'#E81717',
                    prices: [
                        {count: '1–15 шт.',
                            price: 150},
                        {count: '16–25 шт.',
                            price: 150},
                        {count: '26–51 шт.',
                            price: 150},
                        {count: '52–101 шт.',
                            price: 150},
                    ],
                    checked: true
                },
                {color:'розовый',
                    style:'#FF84A9',
                    prices: [
                        {count: '1–15 шт.',
                            price: 150},
                        {count: '16–25 шт.',
                            price: 150},
                        {count: '26–51 шт.',
                            price: 150},
                        {count: '52–101 шт.',
                            price: 150},
                    ],
                    checked: true
                },
                {color:'жёлтый',
                    style:'#FFF969',
                    prices: [
                        {count: '1–15 шт.',
                            price: 150},
                        {count: '16–25 шт.',
                            price: 150},
                        {count: '26–51 шт.',
                            price: 150},
                        {count: '52–101 шт.',
                            price: 150},
                    ],
                    checked: true
                },
                {color:'зелёный',
                    style:' #12C97D',
                    prices: [
                        {count: '1–15 шт.',
                            price: 150},
                        {count: '16–25 шт.',
                            price: 150},
                        {count: '26–51 шт.',
                            price: 150},
                        {count: '52–101 шт.',
                            price: 150},
                    ],
                    checked: true
                },
            ],

        },
        {
            name:'Гвоздика',
            selected:true,
            colors: [
                {color:'красный',
                 style:'#E81717',
                    prices: [
                        {count: '1–15 шт.',
                            price: 150},
                        {count: '16–25 шт.',
                            price: 150},
                        {count: '26–51 шт.',
                            price: 150},
                        {count: '52–101 шт.',
                            price: 150},
                    ],
                    checked: true
                },
                {color:'розовый',
                    style:'#FF84A9',
                    prices: [
                        {count: '1–15 шт.',
                            price: 150},
                        {count: '16–25 шт.',
                            price: 150},
                        {count: '26–51 шт.',
                            price: 150},
                        {count: '52–101 шт.',
                            price: 150},
                    ],
                    checked: true
                },
                {color:'жёлтый',
                    style:'#FFF969',
                    prices: [
                        {count: '1–15 шт.',
                            price: 150},
                        {count: '16–25 шт.',
                            price: 150},
                        {count: '26–51 шт.',
                            price: 150},
                        {count: '52–101 шт.',
                            price: 150},
                    ],
                    checked: true
                },
            ]
        },
        {
            name:'Гвоздика кустовая',
            selected:true,
            colors: [
                {color:'красный',
                 style:'#E81717',
                    prices: [
                        {count: '1–15 шт.',
                            price: 150},
                        {count: '16–25 шт.',
                            price: 150},
                        {count: '26–51 шт.',
                            price: 150},
                        {count: '52–101 шт.',
                            price: 150},
                    ],
                    checked: true
                },
                {color:'розовый',
                    style:'#FF84A9',
                    prices: [
                        {count: '1–15 шт.',
                            price: 150},
                        {count: '16–25 шт.',
                            price: 150},
                        {count: '26–51 шт.',
                            price: 150},
                        {count: '52–101 шт.',
                            price: 150},
                    ],
                    checked: true
                },
                {color:'жёлтый',
                    style:'#FFF969',
                    prices: [
                        {count: '1–15 шт.',
                            price: 150},
                        {count: '16–25 шт.',
                            price: 150},
                        {count: '26–51 шт.',
                            price: 150},
                        {count: '52–101 шт.',
                            price: 150},
                    ],
                    checked: true
                }
            ]
        },
        {
            name:'Гербера',
            selected:true,
            colors: [
                {color:'красный',
                 style:'#E81717',
                    prices: [
                        {count: '1–15 шт.',
                        price: 150},
                        {count: '16–25 шт.',
                            price: 150},
                        {count: '26–51 шт.',
                            price: 150},
                        {count: '52–101 шт.',
                            price: 150},
                    ],
                    checked: true
                },
                {color:'жёлтый',
                    style:'#FFF969',
                    prices: [
                        {count: '1–15 шт.',
                            price: 150},
                        {count: '16–25 шт.',
                            price: 150},
                        {count: '26–51 шт.',
                            price: 150},
                        {count: '52–101 шт.',
                            price: 150},
                    ],
                    checked: true
                }
            ]
        }
    ]

    let greens = [
        {
            name: 'Беарграсс',
            selected:true,
            colors: [
                {color:'красный',
                    style:'#E81717',
                    price: 120,
                    checked: true
                },
                {color:'розовый',
                    style:'#FF84A9',
                    price: 120,
                    checked: true
                },
                {color:'жёлтый',
                    style:'#FFF969',
                    price: 120,
                    checked: true
                }
            ]
        },
        {
            name: 'Рускус израиль',
            selected:true,
            colors: [
                {color:'красный',
                    style:'#E81717',
                    price: 120,
                    checked: true
                },
                {color:'розовый',
                    style:'#FF84A9',
                    price: 120,
                    checked: true
                },
                {color:'жёлтый',
                    style:'#FFF969',
                    price: 120,
                    checked: true
                }
            ]
        },
    ]

    export  let decors = [
        {
            name: 'Бабочка декоративная',
            selected:true,
            colors: [
                {color:'красный',
                    style:'#E81717',
                    price: 122,
                    checked: true
                },
                {color:'розовый',
                    style:'#FF84A9',
                    price: 322,
                    checked: true
                },
                {color:'жёлтый',
                    style:'#FFF969',
                    price: 15,
                    checked: true
                },
                {color:'зелёный',
                    style:' #12C97D',
                    price: 44,
                    checked: true
                },
            ],

        },
        {
            name:'Топпер',
            selected:true,
            colors: [
                {color:'красный',
                    style:'#E81717',
                    price: 12,
                    checked: true
                },
                {color:'розовый',
                    style:'#FF84A9',
                    price: 31,
                    checked: true
                },
                {color:'жёлтый',
                    style:'#FFF969',
                    price: 21,
                    checked: true
                },
            ]
        }
    ]
    export  let packages = [
        {
            name: 'Корзина',
            selected:true,
            colors: [
                {color:'маленькая',
                    price: 122,
                    checked: true
                },
                {color:'средняя',
                    price: 322,
                    checked: true
                },
                {color:'большая',
                    price: 15,
                    checked: true
                },
            ],
        },
        {
            name:'Бумага',
            selected:true,
            colors: [
                {color:'красный',
                    style:'#E81717',
                    price: 12,
                    checked: true
                },
                {color:'розовый',
                    style:'#FF84A9',
                    price: 31,
                    checked: true
                },
                {color:'жёлтый',
                    style:'#FFF969',
                    price: 21,
                    checked: true
                },
            ]
        }
    ]
    export  let gifts = [
        {
            name: 'Ваза',
            selected:true,
            colors: [
                {color:'маленькая',
                    price: 122,
                    checked: true
                },
                {color:'средняя',
                    price: 322,
                    checked: true
                },
                {color:'большая',
                    price: 15,
                    checked: true
                },
            ],
        },
        {
            name:'Открытка',
            selected:true,
            colors: [
                {color:'красный',
                    style:'#E81717',
                    price: 12,
                    checked: true
                },
                {color:'розовый',
                    style:'#FF84A9',
                    price: 31,
                    checked: true
                },
                {color:'жёлтый',
                    style:'#FFF969',
                    price: 21,
                    checked: true
                },
            ]
        }
    ]
    let headers;
    let scrollSpy;
    let timeoutid;
    let Flowers;
    let Greens;
    let Packaging;
    let Decor;
    let Gifts;


    const navlist = [
        {name: "Заказы", link: "businessProfile", active: false},
        {name: "Данные", link: "businessProfile/data", active: false},
        {name: "Витрина", link: "businessProfile/showcase", active: true},
        {name: "Финансы", link: "businessProfile/finance", active: false},
        {name: "Помощь", link: "businessProfile/help", active: false}
    ];
    let currentMenuIndex = 0;

    const menulist = [
        {name: "Цветы", index: 0},
        {name: "Зелень", index: 1},
        {name: "Упаковка", index: 2},
        {name: "Декор", index: 3},
        {name: "Подарки", index: 4},
    ];



    onMount(() => {
        headers = [Flowers,  Greens, Packaging, Decor, Gifts];
        scrollSpy = new ScrollSpy(window, headers);
        const setIndex = e => {
            console.log("set index");
            currentMenuIndex = e.detail.index;
        };
        window.addEventListener("scrollspy-activate", setIndex);

        $mainStore.address.city = cityMeta;
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2
        };

        const images = document.querySelectorAll("img[data-src]");

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
            scrollSpy.destroy();
            window.removeEventListener("scrollspy-activate", setIndex);
            clearTimeout(timeoutid);
            images.forEach(image => observer.unobserve(image));
            observer.disconnect();
        };
    });

    function goToHeader(e) {
        const index = parseInt(e.detail.header);
        if (timeoutid) {
            clearTimeout(timeoutid);
        }
        scrollSpy.unblock();
        scrollSpy.block();
        scrollSpy.refresh();
        window.scroll({
            top: scrollSpy._offsets[index] - 20,
            left: 0,
            behavior: "smooth"
        });
        timeoutid = setTimeout(() => {
            scrollSpy.unblock();
        }, 1000);
    }

</script>

<style>
    .label-text {
        @apply text-gray-600 text-xs inline-block;
        margin-bottom: 8px;
    }
    .data {
        height: calc(100% - 10px);
    }
    .content {
        background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #F2F2F2;
        border: 1px solid var(--gray-300);
        border-top: none;
        box-sizing: border-box;
        border-radius: 4px;
        @apply px-80;
        @apply py-48;
        height: auto;
        width: 100%;
    }
    .content:first-child {
        margin-top: 0;
    }
    .aside-nav-container {
        top: calc(5rem + 10px);
        flex: 0 0 310px;
        margin-bottom: 10px;
        bottom: 10px;
        @apply sticky h-full;
    }

    section {
        margin-top: 68px;
    }
    .section__flower {
        margin-top: 0;
    }
    .date__Name {
        margin-top: 0;
    }
    .sectionName {
        font-weight: bold;
        font-size: 24px;
        color: var(--color-main);
        margin-bottom: 16px;
    }
    .sectionBody {
        margin-top: 24px;
    }
    .subSectionName {
        font-weight: 600;
        font-size: 18px;
        color: var(--color-main);
        margin-bottom: 12px;
    }
    .date__subscribeText {
        font-size: 16px;
        color: var(--gray-600);
    }

    @media (max-width: 1300px) {
        .content {
            @apply px-44;
            @apply py-34;
        }
        .section__flower {
            margin-top: 0;
        }
    }
    @media (max-width: 1048px) {
        .content {
            @apply py-24;
        }
        section {
            margin-top: 68px;
        }
        .section__flower {
            margin-top: 0;
        }
    }
</style>

<div class="data">
    <div class="flex w-full justify-between">
        <div class="w-full mr-10 mb-10">
            <Tabbar
                    pos="top: 5rem;"
                    className="sticky"
                    on:change={goToHeader}
                    {currentMenuIndex}
                    {menulist} />
            <div class="content">
                <section class="section__flower"                          data-scrollspy
                         bind:this={Flowers}>
                    <h2 class="sectionName">Цветы</h2>
                    <p class="date__subscribeText">Выберите позиции, которые всегда есть в наличии, и укажите цены в зависимости от количества цветов в букете.</p>
                    <div class="sectionBody">
                        <ShowcaseTable products={flowers}/>
                    </div>
                </section>
                <section                          data-scrollspy
                         bind:this={Greens}>
                    <h2 class="sectionName">Зелень</h2>
                    <p class="date__subscribeText">Выберите составляющие, которые всегда есть в наличии, и укажите цены</p>
                    <div class="sectionBody">
                        <ShowcaseTable products={greens} onePrice={true} />
                    </div>
                </section>
                <section                          data-scrollspy
                         bind:this={Packaging}>
                    <h2 class="sectionName">Упаковка</h2>
                    <p class="date__subscribeText">Выберите составляющие, которые всегда есть в наличии, и укажите цены</p>
                    <div class="sectionBody">
                        <ShowcaseTable products={packages} onePrice={true}/>
                    </div>
                </section>
                <section                          data-scrollspy
                         bind:this={Decor}>
                    <h2 class="sectionName">Декор</h2>
                    <p class="date__subscribeText">Выберите составляющие, которые всегда есть в наличии, и укажите цены</p>
                    <div class="sectionBody">
                        <ShowcaseTable products={decors} onePrice={true} />
                    </div>
                </section>
                <section                          data-scrollspy
                         bind:this={Gifts}>
                    <h2 class="sectionName">Подарки</h2>
                    <p class="date__subscribeText">Выберите составляющие, которые всегда есть в наличии, и укажите цены</p>
                    <div class="sectionBody">
                        <ShowcaseTable products={gifts} onePrice={true}/>
                    </div>
                </section>
            </div>
        </div>
        <div class="aside-nav-container">
            <AsideNavigation {navlist} />
        </div>
    </div>
</div>