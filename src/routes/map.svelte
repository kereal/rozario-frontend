
<script>
export let links = [
    {
        name:'Каталог',
        elements: [
            {
            name:'Цветы поштучно',
            link: "/catalog/flowers"
        },
            {
                name:'Букеты',
                link: '/catalog/compositions'
            },
            {
                name:'Композиции',
                link: "/catalog/flowers"
            },
            {
                name:'Акции',
                link: "/catalog/compositions"
            },
            {
                name:'Хиты продаж и новинки',
                link: "/catalog/compositions"
            },
            {
                name:'Осень',
                link: "/catalog/compositions"
            },
            {
                name:'Розы',
                link: '/catalog/roses'
            },
            {
                name:'Корзины с цветами',
                link: '/catalog/holiday'
            },
            {
                name:'Важные события',
                link: '/catalog/events'
            },
            {
                name:'Букеты из хризантем',
                link: '/catalog/holiday'
            },
            {
                name:'Корзины с фруктами и цветами',
                link: '/catalog/holiday'
            },
            {
                name:'Подарки  для мужчин',
                link: "/catalog/bouqets/baskets-with-fruits"
            },
        ]
    },
    {
        name:'Личный кабинет',
        elements: [
            {
                name:'Мои заказы',
                link: '/profile'
            },
            {
                name:'Избранное',
                link: '/profile/favorites'
            },
            {
                name:'Мои купоны',
                link: '/profile/coupons'
            },
            {
                name:'Мои события',
                link: '/profile/events/'
            },
            {
                name:'Помощь',
                link: '/profile/help'
            },
            {
                name:'Настройки',
                link: '/profile/settings'
            }
        ]
    },

    {
        name:'Информация для покупателей',
        elements: [
            {
                name:'Вопросы и ответы',
                link: '/cataloge'
            },
            {
                name:'Информация о доставке',
                link: '/delivery'
            },
            {
                name:'Букеты для бизнеса',
                link: '/business'
            },
            {
                name:'Обратная связь',
                link: '/help'
            }
        ]
    },
    {
        name:'О компании',
        elements: [
            {
                name:'О Розарио.Цветы',
                link: '/about'
            },
            {
                name:'Блог',
                link: '/blog'
            },
            {
                name:'Отзывы',
                link: '/reviews'
            },
            {
                name:'Улыбки получателей',
                link: '/smiles'
            }
        ]
    },
    {
        name:'Условия использования сервиса',
        elements: [
            {
                name:'Пользовательское соглашение',
                link: '/rules'
            },
            {
                name:'Политика конфиденциальности',
                link: '/rules/privacyPolicy'
            },
            {
                name:'Использование cookies',
                link: '/rules/cookies'
            }
        ]
    }
]

</script>

<style>
.wrapper {
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #F2F2F2;
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    padding: 48px 80px 80px 80px;
    margin-bottom: 10px;
}
.map__block {
    width: 33.3%;
    margin-right: 40px;
}
.map__miniBlock {
    width: 50%;
}
h1 {
    font-weight: bold;
    font-size: 24px;
    line-height: 135%;
    color: var(--color-main);
    margin-bottom: 34px;
}
    h2 {
        font-weight: 600;
        font-size: 18px;
        line-height: 130%;
        color: var(--color-main);
        margin-bottom: 18px;
    }
    a {
        display: block;
        font-size: 15px;
        line-height: 135%;
        color: var(--gray-600);
        margin-bottom: 12px;
        white-space:nowrap;
    }
    a:hover {
        color: var(--color-info);
    }
@media (max-width: 1300px) {
    .wrapper {
        padding: 40px 0px 80px 80px;
    }
}
@media (max-width: 1110px) {
    .wrapper {
        padding: 40px 80px 80px 80px;
    }
}
</style>

<div class="wrapper">
<h1>Карта сайта</h1>
    <div class="flex justify-between">
        {#each links as link, i}
        {#if i === 0}
            <div class="map__block">
                <h2>{link.name}</h2>
                {#each link.elements as element}
                    <a href="{element.link}">{element.name}</a>
                {/each}
            </div>
        {/if}
        {/each}
    <div class="flex justify-between flex-wrap">
        {#each links as link, i}
            {#if i !== 0}
                <div class="map__miniBlock">
                    <h2>{link.name}</h2>
                    {#each link.elements as element}
                        <a href="{element.link}">{element.name}</a>
                    {/each}
                </div>
            {/if}
        {/each}
    </div>
    </div>
</div>
