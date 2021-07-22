<script context="module">
    export async function preload({host, path, params}) {
        const res = await this.fetch(`blog/${params.slug[0]}/${params.slug[1]}.json`);
        const postData = await res.json();
        try {
            const res = await this.fetch(
                    `index.json?city=${host.split('.')[0]}&path=${path}`
            );
            const json = await res.json();
            return {
                post: postData,
                cityMeta: json.cityMeta,
            };
        } catch (e) {
            console.log(e);
        }
    }
</script>

<script>
	import { setContext } from "svelte";
	import debounce from "lodash/debounce";
    import Button from "../../components/Button.svelte";
    import BlogPost from "../../components/BlogPost.svelte";
	import Header from "../../components/Header.svelte";
	import BlogAsideNavigation from "../../components/BlogAsideNavigation.svelte";
    import BlogPromocodeForm from "../../components/BlogPromocodeForm.svelte";
    import BlogPopupPromocodeForm from "../../components/BlogPopupPromocodeForm.svelte";
    import BlogPopupSubscribeSuccess from "../../components/BlogPopupSubscribeSuccess.svelte";
    import BlogPopupEmailSubscribedError from "../../components/BlogPopupEmailSubscribedError.svelte";
    import BlogPopupChangeEmail from "../../components/BlogPopupChangeEmail.svelte";
    import Envelope from "../../components/icons/Envelope.svelte";

    let showBlogPopupPromocodeForm = false;
    let showBlogPopupSubscribeSuccess = false;
    let showBlogPopupEmailSubscribedError = false;
    let showBlogPopupChangeEmail = false;

    const openChangeEmailModal = function() {
        showBlogPopupChangeEmail = true;
    };
    const toggleBlogPopupPromocodeForm = function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        showBlogPopupPromocodeForm = !showBlogPopupPromocodeForm;
    };
    const toggleBlogPopupSubscribeSuccess = function() {
        showBlogPopupSubscribeSuccess = !showBlogPopupSubscribeSuccess;
    };
    const toggleBlogPopupEmailSubscribedError = function() {
        showBlogPopupEmailSubscribedError = !showBlogPopupEmailSubscribedError;
    };
    const toggleBlogPopupChangeEmail = function() {
        showBlogPopupChangeEmail = !showBlogPopupChangeEmail;
    };

    import CustomDropdown from "../../components/CustomDropdown.svelte";
    import HelpThankyouMessage from "../../components/HelpThankyouMessage.svelte";
    import FavoriteCard from "../../components/FavoriteCard.svelte";

	import { onMount } from "svelte";
	import { stores } from "@sapper/app";
	import { mainStore } from "../../stores/global.js";
	const { page } = stores();

	export let post;
	export let cityMeta;

	const city_name = cityMeta.name;
	const pathlist = [
		{
			'name': 'Доставка цветов',
			'href': '/'
		},
		{
			'name': city_name,
			'href': '#'
		},
        {
            'name': 'Блог',
            'href': '/blog'
        },
        {
            'name': 'Поледние записи',
            'href': '#'
        },
        {
            'name': 'Новогодний интерьер: украшаем дом чужими руками',
            'href': '#'
        }
	];
	/*
	* Доставка цветов  •  Мурманск  •  Блог  •  Поледние записи  •   Новогодний интерьер: украшаем дом чужими руками
	* */
	const navlist = [
		{
			active: false,
			name: 'Новости',
			link: '/'
		},
		{
			active: true,
			name: 'Блог',
			link: '/blog'
		},
		{
			active: false,
			name: 'Энциклопедия цветов',
			link: '/'
		},
	];

	const photo="";
	const photo1_5="";
	const photo2="";
	const photo3="";
	const h1=post.title;

	const readMorePosts = [
            {
            img: 'blog/post',
            slug: '1',
            title: 'Новогодний интерьер: украшаем дом чужими руками',
            short: 'Давайте разберёмся - какие цветы являются весенними и можно ли купить по-настоящему весенний букет? ',
            date_full: '',
            date_short: '13 декабря',
            reading_time: '3 мин',
            html1: `<p>Порадовать искушенного именинника в праздничный день не самая простая задача! Вам наверняка хочется преподнести что-то небанальное — тот самый подарок, который надолго останется в сердце. Доверьтесь нашим советам и будьте уверены, яркие впечатления не заставят себя ждать.</p>
                        <h2>Для дамы вашего сердца</h2>
                        <p>Наскучившие всем пионы и тюльпаны — не самый оригинальный выбор (что, конечно, не распространяется на любительниц садовых цветов). Попробуйте удивить её чем-то необычным, а заодно сможете проявить не только свою любовь, но и находчивость.</p>
                        <p>В этом вам помогут:</p>
                        <ul>
                            <li>розы-гиганты с человеческий рост (не забудьте о подходящей вазе!);</li>
                            <li>синие, а для самых смелых — чёрные розы;</li>
                            <li>съедобный букет/композиция из фруктов, ягод или даже овощей.</li>
                        </ul>`,
            flowers: [],
            html2: `<h2>Сладкоежке</h2>
                        <p>Самого настоящего любителя десертов можно порадовать искусно оформленными сладостями — детский восторг и радость будут обеспечены. Клубника в шоколаде? Печенье с пожеланиями, а может сразу микс из цветов и воздушных французских макарун?</p>
                        <h2>Вечному ребенку</h2>
                        <p>Если вам кажется, что плюшевый друг растопит сердце именинника, не сомневайтесь — это отличный подарок. Может быть немного инфантильный, но кто же будет против снова окунуться в беззаботное детство? Стильные мягкие игрушки отлично дополняют интерьер. Особенно, если это милый котик.</p>`,
            views_count: 146,
            author: {
                name: 'Наталья Герасимова',
                photo: '',
                about_text: 'Наталья Герасимова — копирайтер, фотограф, флорист, искатель приключений. Оформила более 100 свадеб, создала своб школу флористов.'
            }
        },
            {
                img: 'blog/post',
                slug: '2',
                title: 'Новогодний интерьер: украшаем дом чужими руками',
                short: 'Давайте разберёмся - какие цветы являются весенними и можно ли купить по-настоящему весенний букет? ',
                date_full: '',
                date_short: '13 декабря',
                reading_time: '3 мин',
                html1: `<p>Порадовать искушенного именинника в праздничный день не самая простая задача! Вам наверняка хочется преподнести что-то небанальное — тот самый подарок, который надолго останется в сердце. Доверьтесь нашим советам и будьте уверены, яркие впечатления не заставят себя ждать.</p>
                        <h2>Для дамы вашего сердца</h2>
                        <p>Наскучившие всем пионы и тюльпаны — не самый оригинальный выбор (что, конечно, не распространяется на любительниц садовых цветов). Попробуйте удивить её чем-то необычным, а заодно сможете проявить не только свою любовь, но и находчивость.</p>
                        <p>В этом вам помогут:</p>
                        <ul>
                            <li>розы-гиганты с человеческий рост (не забудьте о подходящей вазе!);</li>
                            <li>синие, а для самых смелых — чёрные розы;</li>
                            <li>съедобный букет/композиция из фруктов, ягод или даже овощей.</li>
                        </ul>`,
                flowers: [],
                html2: `<h2>Сладкоежке</h2>
                        <p>Самого настоящего любителя десертов можно порадовать искусно оформленными сладостями — детский восторг и радость будут обеспечены. Клубника в шоколаде? Печенье с пожеланиями, а может сразу микс из цветов и воздушных французских макарун?</p>
                        <h2>Вечному ребенку</h2>
                        <p>Если вам кажется, что плюшевый друг растопит сердце именинника, не сомневайтесь — это отличный подарок. Может быть немного инфантильный, но кто же будет против снова окунуться в беззаботное детство? Стильные мягкие игрушки отлично дополняют интерьер. Особенно, если это милый котик.</p>`,
                views_count: 146,
                author: {
                    name: 'Наталья Герасимова',
                    photo: '',
                    about_text: 'Наталья Герасимова — копирайтер, фотограф, флорист, искатель приключений. Оформила более 100 свадеб, создала своб школу флористов.'
                }
            },
            {
                img: 'blog/post',
                slug: '3',
                title: 'Новогодний интерьер: украшаем дом чужими руками',
                short: 'Давайте разберёмся - какие цветы являются весенними и можно ли купить по-настоящему весенний букет? ',
                date_full: '',
                date_short: '13 декабря',
                reading_time: '3 мин',
                html1: `<p>Порадовать искушенного именинника в праздничный день не самая простая задача! Вам наверняка хочется преподнести что-то небанальное — тот самый подарок, который надолго останется в сердце. Доверьтесь нашим советам и будьте уверены, яркие впечатления не заставят себя ждать.</p>
                        <h2>Для дамы вашего сердца</h2>
                        <p>Наскучившие всем пионы и тюльпаны — не самый оригинальный выбор (что, конечно, не распространяется на любительниц садовых цветов). Попробуйте удивить её чем-то необычным, а заодно сможете проявить не только свою любовь, но и находчивость.</p>
                        <p>В этом вам помогут:</p>
                        <ul>
                            <li>розы-гиганты с человеческий рост (не забудьте о подходящей вазе!);</li>
                            <li>синие, а для самых смелых — чёрные розы;</li>
                            <li>съедобный букет/композиция из фруктов, ягод или даже овощей.</li>
                        </ul>`,
                flowers: [],
                html2: `<h2>Сладкоежке</h2>
                        <p>Самого настоящего любителя десертов можно порадовать искусно оформленными сладостями — детский восторг и радость будут обеспечены. Клубника в шоколаде? Печенье с пожеланиями, а может сразу микс из цветов и воздушных французских макарун?</p>
                        <h2>Вечному ребенку</h2>
                        <p>Если вам кажется, что плюшевый друг растопит сердце именинника, не сомневайтесь — это отличный подарок. Может быть немного инфантильный, но кто же будет против снова окунуться в беззаботное детство? Стильные мягкие игрушки отлично дополняют интерьер. Особенно, если это милый котик.</p>`,
                views_count: 146,
                author: {
                    name: 'Наталья Герасимова',
                    photo: '',
                    about_text: 'Наталья Герасимова — копирайтер, фотограф, флорист, искатель приключений. Оформила более 100 свадеб, создала своб школу флористов.'
                }
            }
        ];

	let containerElement;

    let shareOpened = false;
    let shareClosed = false;
    let headerShareOpened = false;
    let headerShareClosed = false;
	const share = (website) => {};
	const openShare = (e) => {
	    e.preventDefault();
        shareOpened = true;
    };
	const closeShare = (e) => {
        e.preventDefault();
        shareClosed = true;
        setTimeout(() => {

            shareOpened = false;
            shareClosed = false;
        }, 900);
    };
    const openHeaderShare = (e) => {
        e.preventDefault();
        headerShareOpened = true;
    };
    const closeHeaderShare = (e) => {
        e.preventDefault();
        headerShareClosed = true;
        setTimeout(() => {

            headerShareOpened = false;
            headerShareClosed = false;
        }, 900);
    };


    let isOpened = false;
    let choseYes = false;
    let choseNo = false;
    let showChoseYes = false;
    let showChoseNo = false;
    let questionYesButton;
    let questionNoButton;
    function toggleNo() {
        choseYes = false;
        choseNo = !choseNo;
        showChoseNo = choseNo;
    }
    function toggleYes() {
        choseNo = false;
        choseYes = !choseYes;
        showChoseYes = choseYes;
    }

    const favorites = [
        {
            img: '',
            title: 'Настоящая Любовь',
            size: {
                text: 'Размеры',
                width: '50',
                height: '50'
            },
            description: '',
            time: 'Доставим в течение <span class="text-main">120</span> мин',
            like: '',
            price: {
                sale: '3 456',
                full: '3 456'
            },
            rating: '4,5'
        },
        {
            img: '',
            title: 'Настоящая Любовь',
            size: {
                text: 'Размеры',
                width: '50',
                height: '50'
            },
            description: '',
            time: 'Доставим в течение <span class="text-main">120</span> мин',
            like: '',
            price: {
                sale: '3 456',
                full: '3 456'
            },
            rating: '4,5'
        },
        {
            img: '',
            title: 'Настоящая Любовь',
            size: {
                text: 'Размеры',
                width: '50',
                height: '50'
            },
            description: '',
            time: 'Доставим в течение <span class="text-main">120</span> мин',
            like: '',
            price: {
                sale: '3 456',
                full: '3 456'
            },
            rating: '4,5'
        }
    ];

	onMount(() => {
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

        $mainStore.address.city = cityMeta;

        return () => {
            images.forEach(image => observer.unobserve(image));
            observer.disconnect();
        };
    });
</script>

<style>
    .aside-nav-container {
        top: calc(5rem + 10px);
        flex: 0 0 310px;
        margin-left: 10px;
        margin-bottom: 10px;
        bottom: 10px;
        min-height: 692px;
        @apply sticky h-full;
    }
    .aside-nav-container :global(aside) {
        min-height: 692px;
    }

    .blog-main {
        display: flex;
        flex-direction: column;
        min-width: 0;
    }
    .blog-body {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .page-content {
        height: 100%;
        margin-bottom: 10px;
        background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%), #f2f2f2;
        border: 1px solid #E9E9E9;
        border-top: none;
        padding: 48px 80px 34px;
        border-radius: 0 0 4px 4px;
    }
    .date-n-author {
        font-weight: normal;
        font-size: 14px;
        line-height: 135%;
        color: var(--gray-700);
        margin-bottom: 24px;
    }
    .page-content .html :global(h2) {
        margin: 24px 0 12px;
        font-weight: 600;
        font-size: 18px;
        line-height: 130%;
        color: var(--color-main);
    }
    .page-content .html :global(p) {
        font-weight: normal;
        font-size: 16px;
        line-height: 130%;
        color: var(--color-main);
        margin-bottom: 12px;
    }
    .page-content .html :global(ul) {
        padding-left: 0;
    }
    .page-content .html :global(li::before) {
        content: "\02022";
        padding: 8px;
    }
    .page-content .html :global(a) {
        color: #1039C9;
    }
    .page-content .html :global(a:hover) {
        color: var(--color-info);
    }
    .page-content :global(.promocode-svg) {
        flex-shrink: 0;
        margin-left: 28px;
    }
    hr {
        margin: 68px 0 30px;
        border-top-color: var(--gray-1000);
    }
    hr.under-form {
        margin: 44px 0 68px;
    }
    .posts {
        display: flex;
    }
    .author-about {
        margin-top: 44px;
        display: flex;
    }
    .author-about img {
        margin-right: 34px;
        width: 130px;
        height: 130px;
        flex-shrink: 0;
        border-radius: 50%;
    }
    .author-about h2 {
        margin-top: 0;
        margin-bottom: 18px;
        font-weight: 600;
        font-size: 18px;
        line-height: 130%;
        color: var(--color-main);
    }
    .author-about p {
        font-size: 16px;
        line-height: 150%;
        color: var(--color-main);
    }
    .read-more h2 {
        font-weight: bold;
        font-size: 24px;
        line-height: 135%;
        color: var(--color-main);
    }
    .go-back :global(button) {
        margin-top: 24px;
        width: 100%;
        padding: 12px;
        background: var(--gray-1000);
        border-radius: 4px;
        font-size: 16px;
        line-height: 130%;
        color: var(--color-main);
    }
    .go-back :global(button span) {
        font-weight: normal;
    }
    .header-buttons {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        font-weight: normal;
        font-size: 14px;
        line-height: 135%;
        color: var(--color-light);
        padding-bottom: 53px;
    }
    .header-buttons span {
        margin-left: 12px;
    }
    .header-buttons div span {
        margin-right: 36px;
    }
    .header-buttons a,
    .header-buttons div {
        display: flex;
        align-items: center;
    }
    .header-buttons a {
        padding: 12px 14px;
        margin-right: 20px;
        cursor: pointer;
        border-radius: 4px;
        transition: background .3s;
    }
    .header-buttons a:hover {
        background: rgba(256,256,256,.2);
    }
    .header-buttons .share {
        padding-right: 48px;
        padding-left: 14px;
    }
    .header-buttons .share > svg {
        margin-right: 3px;
        cursor: pointer;
    }
    .header-buttons .share button {
        width: 35px;
        height: 35px;
        border: 1px solid var(--color-light);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 14px;
        transition: border-color .3s;
    }
    .header-buttons .share button svg > path {
        fill: var(--color-light);
        transition: fill .3s, stroke .3s;
    }
    .header-buttons .share button.facebook path,
    .header-buttons .share button.vk svg > path {
        stroke: var(--color-light);
    }
    .header-buttons .share button:hover {
        border-color: var(--color-info);
    }
    .header-buttons .share button:hover svg > path {
        fill: var(--color-info);
    }
    .header-buttons .share button.facebook:hover path,
    .header-buttons .share button.vk:hover svg > path {
        stroke: var(--color-info);
    }

    @keyframes fadeInLeft {
        0% {
            opacity: 0;
            transform: translate3d(-100%,0,0);
        }
        100% {
            opacity: 1;
            transform: translateZ(0);
        }
    }
    @keyframes fadeOutRight {
        0% {
            opacity: 1;
            transform: translateZ(0);
        }
        100% {
            opacity: 0;
            transform: translate3d(-100%,0,0);
        }
    }
    .header-buttons .share button {
        opacity: 0;
        transform: translate3d(-100%,0,0);
        animation: fadeInLeft .5s forwards;
    }
    .header-buttons .share.close button {
        opacity: 1;
        transform: translateZ(0);
        animation: fadeOutRight .5s forwards;
    }

    .flowers {
        display: flex;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .flowers :global(.fav-card__heart-wrap) {
        display: none;
    }
    .flowers :global(.fav-card) {
        margin-bottom: 0;
    }
    .flowers :global(.fav-card__image-placeholder) {
        background-image: url(../../static/loading-bg-image.svg);
        flex-grow: 1;
        max-height: unset;
    }

    .post-buttons {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding-top: 40px;
        font-weight: normal;
        font-size: 14px;
        line-height: 135%;
        min-height: 82px;
        color: var(--gray-600);
    }
    .post-buttons span {
        margin-left: 12px;
    }
    .post-buttons .views-count span {
        margin-right: 36px;
    }
    .post-buttons a,
    .post-buttons div {
        display: flex;
        align-items: center;
    }
    .post-buttons a {
        padding: 12px 14px;
        margin-right: 34px;
        cursor: pointer;
        border-radius: 4px;
        transition: background .3s;
    }
    .post-buttons a:hover {
        background: rgba(256,256,256,.2);
    }
    .post-buttons .share {
        padding-right: 4px;
    }
    .post-buttons .share > svg {
        margin: 12px 3px 12px 14px;
        cursor: pointer;
    }
    .post-buttons .share button {
        width: 35px;
        height: 35px;
        border: 1px solid #1039C9;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 14px;
        transition: border-color .3s;
    }
    .post-buttons .share button:hover {
        border-color: var(--color-info);
    }
    .post-buttons .open-share {
        color: #1039C9;
    }

    .post-buttons .views-count path {
        stroke: var(--gray-600);
    }

    .post-buttons .open-share path:not(.no-fill),
    .post-buttons .share path:not(.no-fill) {
        fill: #1039C9;
    }
    .post-buttons .open-share path,
    .post-buttons .share > svg path {
        stroke: #1039C9;
    }
    .post-buttons .share button.facebook path,
    .post-buttons .share button.vk svg > path {
        stroke: #1039C9;
    }

    .post-buttons .share button svg > path {
        fill: #1039C9;
        transition: fill .3s, stroke .3s;
    }

    .post-buttons .open-share:hover {
        color: var(--color-info);
    }

    .post-buttons .open-share:hover path:not(.no-fill),
    .post-buttons .share > svg:hover path:not(.no-fill),
    .post-buttons .share button:hover svg path:not(.no-fill) {
        fill: var(--color-info);
    }
    .post-buttons .open-share:hover path,
    .post-buttons .share > svg:hover path,
    .post-buttons .share button.facebook:hover path,
    .post-buttons .share button.vk:hover svg > path {
        stroke: var(--color-info);
    }

    .post-buttons .share button {
        opacity: 0;
        transform: translate3d(-100%,0,0);
        animation: fadeInLeft .5s forwards;
    }
    .post-buttons .share.close button {
        opacity: 1;
        transform: translateZ(0);
        animation: fadeOutRight .5s forwards;
    }

    .yes-no {
        margin-left: auto;
    }

    .yes-no span {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 120%;
        color: var(--color-main);
        margin-right: 16px;
    }

    .yes-no button {
        border: 1px solid var(--gray-1100);
        box-sizing: border-box;
        border-radius: 4px;
        padding: 5px 8px 4px 8px;
        color: var(--color-main);
        font-size: 14px;
        font-weight: 600;
    }
    .yes-no button.no {
        margin-left: 12px;
        padding-right: 6px;
    }
    .yes-no.chose-yes button.yes {
        border: 1px solid var(--color-info);
        color: var(--color-info);
    }
    .yes-no button.yes:hover {
        border: 1px solid var(--color-info);
        color: var(--color-info);
    }
    .yes-no.chose-yes button.yes path,
    .yes-no button.yes:hover path {
        fill: var(--color-info);
    }
    .yes-no button.no:hover {
        border: 1px solid var(--color-main);
        color: var(--color-main);
    }
    .yes-no button.no:hover path {
        fill: var(--color-main);
    }
    .yes-no.chose-no button.yes,
    .yes-no.chose-yes button.no {
        border: 1px solid var(--gray-1100);
        color: var(--gray-600);
    }
    .yes-no.chose-no button.yes path,
    .yes-no.chose-yes button.no path {
        fill: var(--gray-600);
    }
    .yes-no.chose-no button.no {
        border: 1px solid var(--color-main);
    }
    .yes-no button.yes:active,
    .yes-no button.no:active {
        border: 1px solid var(--gray-1100);
        color: var(--color-main);
    }
    .yes-no button.yes:active path,
    .yes-no button.no:active path {
        fill: var(--color-main);
    }
    .yes-no button svg {
        display: inline-block;
        vertical-align: top;
        margin-top: 1px;
        margin-right: 2px;
    }
    .yes-no button.no svg {
        margin-top: 2px;
    }
    @media screen and (max-width: 1336px) and (min-width: 1301px) {
        .yes-no span,
        .yes-no {
            margin-left: 0;
        }
        .yes-no {
            margin-top: 18px;
            width: 100%;
        }
    }
    @media screen and (max-width: 1300px) {
        .page-content :global(.promocode-svg) {
            flex-shrink: unset;
        }
        .date-n-author {
            margin-bottom: 18px;
        }
        .yes-no button,
        .yes-no span {
            font-size: 14px;
        }
        .yes-no button {
            padding: 5px 8px 7px 8px;
        }
        .page-content {
            padding: 34px 44px;
        }
        .flowers {
            margin-top: 30px;
            margin-bottom: 30px;
        }
        .flowers :global(.fav-card) {
            margin-right: 0;
            flex-grow: 1;
            width: calc(100% / 3 - 24px * 2 / 3);
            height: 381px;
        }
        .flowers :global(.fav-card:not(:last-child)) {
            margin-right: 24px;
        }
        .posts {
            padding-bottom: 18px;
        }
    }
    @media screen and (max-width: 1265px) {
        .yes-no span,
        .yes-no {
            margin-left: 0;
        }
        .yes-no {
            margin-top: 18px;
            width: 100%;
        }
    }
    @media screen and (max-width: 1200px) and (min-width: 1171px) {
        .posts :global(a .info) {
            padding: 18px 12px;
        }
        .posts :global(a) {
            margin-right: 24px;
            width: calc(100% / 3 - 24px * 2 / 3);
            max-width: calc(100% / 3 - 24px * 2 / 3);
        }
        .posts :global(a:nth-child(3n + 3)) {
            margin-right: 0;
        }
    }
    @media screen and (max-width: 1170px) {
        .read-more .posts :global(a:nth-child(3)) {
            display: none;
        }
        .posts :global(a) {
            margin-right: 0;
            flex-grow: 1;
            width: calc(100% / 2 - 34px * 1 / 2);
            max-width: calc(100% / 2 - 34px * 1 / 2);
        }
        .posts :global(a:nth-child(2n + 1)) {
            margin-right: 34px;
        }
    }
    @media screen and (max-width: 1140px) {
        .blog-main :global(h1) {
            font-size: 40px;
        }
        .header-buttons .share {
            margin-right: 13px;
        }
        .header-buttons .open-share {
            margin-right: 33px;
        }
        .header-buttons .subscribe {
            margin-left: -13px;
        }
    }
    @media screen and (max-width: 1000px) {
        .page-content {
            padding: 24px 44px 30px;
        }
        .date-n-author {
            margin-bottom: 16px;
        }
        .author-about {
            margin-top: 34px;
        }
        .author-about img {
            margin-right: 24px;
        }
        .post-buttons {
            padding-top: 34px;
        }
        .page-content :global(.promocode-svg) {
            max-width: 150px;
        }
        .flowers :global(.fav-card:nth-child(3)),
        .read-more .posts :global(a:nth-child(3)) {
            display: none;
        }
        .page-content .flowers :global(.fav-card) {
            margin-right: 0;
            flex-grow: 1;
            width: calc(100% / 2 - 20px * 1 / 2);
            max-width: calc(100% / 2 - 20px * 1 / 2);
        }
        .page-content .flowers :global(.fav-card:first-child) {
            margin-right: 20px;
        }
        .read-more .posts :global(a) {
            margin-right: 0;
            flex-grow: 1;
            width: calc(100% / 2 - 34px * 1 / 2);
            max-width: calc(100% / 2 - 34px * 1 / 2);
        }
        .read-more .posts :global(a:first-child) {
            margin-right: 34px;
        }
        .posts {
            padding-bottom: 0;
        }
        hr {
            margin: 48px 0 14px;
        }
        hr.under-form {
            margin: 30px 0 48px;
        }
    }
</style>


<svelte:head>
	<title>Блог Пост</title>
	<meta
			name="description"
			content="CONTACTS_DESCRIPTION" />

	<link rel="canonical" href="{$page.host + $page.path}" />

	<link rel="alternate" href="{$page.host + $page.path}" type="text/html" hreflang="ru" title="Русский">
	<link rel="alternate" href="{$page.host + $page.path}" type="text/html" hreflang="en" title="English">

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



<div id="blog-page"
	 class="page flex justify-between">
	<div class="blog-main w-full">
		<Header {pathlist} {h1} {photo} {photo1_5} {photo2} {photo3}>
            <div class="header-buttons">
                <div>
                    <svg width="26" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                            <path d="M9.5 8.00017C9.5 9.93509 11.0667 11.5001 13 11.5001C14.932 11.5001 16.5 9.93499 16.5 8.00017C16.5 6.06525 14.932 4.50012 13 4.50012C11.0667 4.50012 9.5 6.06515 9.5 8.00017Z" stroke="white"/>
                            <path d="M1.5 8.00009C5 3.00009 14.5 -3.99991 24.5 8.00009C21 13.1667 11.5 20.4 1.5 8.00009Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="26" height="16" fill="white" transform="matrix(1 0 0 -1 0 16.0001)"/>
                            </clipPath>
                        </defs>
                    </svg>
                    <span>{post.views_count} просмотров</span>
                </div>
                {#if !headerShareOpened}
                <a class="open-share" href="#" on:click="{openHeaderShare}">
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5 3.00015C11.5 4.10586 12.3952 5.00012 13.5 5.00012C14.6041 5.00012 15.5 4.10576 15.5 3.00015C15.5 1.89448 14.6041 1.00012 13.5 1.00012C12.3952 1.00012 11.5 1.89438 11.5 3.00015Z" fill="white" stroke="white"/>
                        <path d="M11.5 14.0002C11.5 15.1059 12.3952 16.0001 13.5 16.0001C14.6041 16.0001 15.5 15.1058 15.5 14.0002C15.5 12.8945 14.6041 12.0001 13.5 12.0001C12.3952 12.0001 11.5 12.8944 11.5 14.0002Z" fill="white" stroke="white"/>
                        <path d="M0.5 8.00015C0.5 9.10586 1.39519 10.0001 2.50003 10.0001C3.60407 10.0001 4.5 9.10576 4.5 8.00015C4.5 6.89448 3.60406 6.00012 2.50003 6.00012C1.3952 6.00012 0.5 6.89438 0.5 8.00015Z" fill="white" stroke="white"/>
                        <path d="M2.5 8.00012C2.88261 7.68012 11.4928 4.36679 15 2.50012" stroke="white"/>
                        <path d="M2.5 8.00012C2.88261 8.32012 11.4928 12.6335 15 14.5001" stroke="white"/>
                    </svg>
                    <span>Поделиться</span>
                </a>
                {/if}
                {#if headerShareOpened}
                <div class="share" class:close="{headerShareClosed}">
                    <svg on:click="{closeHeaderShare}" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5 3.00015C11.5 4.10586 12.3952 5.00012 13.5 5.00012C14.6041 5.00012 15.5 4.10576 15.5 3.00015C15.5 1.89448 14.6041 1.00012 13.5 1.00012C12.3952 1.00012 11.5 1.89438 11.5 3.00015Z" fill="white" stroke="white"/>
                        <path d="M11.5 14.0002C11.5 15.1059 12.3952 16.0001 13.5 16.0001C14.6041 16.0001 15.5 15.1058 15.5 14.0002C15.5 12.8945 14.6041 12.0001 13.5 12.0001C12.3952 12.0001 11.5 12.8944 11.5 14.0002Z" fill="white" stroke="white"/>
                        <path d="M0.5 8.00015C0.5 9.10586 1.39519 10.0001 2.50003 10.0001C3.60407 10.0001 4.5 9.10576 4.5 8.00015C4.5 6.89448 3.60406 6.00012 2.50003 6.00012C1.3952 6.00012 0.5 6.89438 0.5 8.00015Z" fill="white" stroke="white"/>
                        <path d="M2.5 8.00012C2.88261 7.68012 11.4928 4.36679 15 2.50012" stroke="white"/>
                        <path d="M2.5 8.00012C2.88261 8.32012 11.4928 12.6335 15 14.5001" stroke="white"/>
                    </svg>
                    <button class="facebook" on:click="{share('facebook')}">
                        <svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.63756 7.67225H9.46666L9.31301 9.61807H6.63756H6.13756V10.1181V19.8438H3.16602V10.1181V9.61807H2.66602H1.07812V7.67225H2.66602H3.16602V7.17225V5.19925C3.16602 4.75769 3.16689 4.2402 3.24523 3.73458C3.32408 3.2257 3.47415 2.78306 3.73358 2.46652L3.73986 2.45886L3.74583 2.45095C4.06805 2.02436 4.49882 1.68154 4.99921 1.45632C5.49967 1.23106 6.05229 1.13138 6.60503 1.16741L6.63181 1.16916L6.65863 1.16803C7.72881 1.12291 8.79994 1.20757 9.84682 1.41953L9.49263 3.44101C9.06876 3.35894 8.63815 3.31182 8.20545 3.3003L8.20545 3.30012H8.19214C7.73676 3.30012 7.24425 3.37656 6.84836 3.61503C6.41998 3.87306 6.13756 4.30472 6.13756 4.89319V7.17225V7.67225H6.63756Z" fill="white" stroke="white"/>
                        </svg>
                    </button>
                    <button class="telegram" on:click="{share('telegram')}">
                        <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.50849 7.78195C6.91074 5.43578 10.5131 3.88904 12.3155 3.14174C17.4619 1.00802 18.5312 0.63737 19.2282 0.62513C19.3815 0.622439 19.7243 0.660309 19.9463 0.839895C20.1338 0.991533 20.1854 1.19638 20.2101 1.34015C20.2348 1.48392 20.2655 1.81143 20.2411 2.06734C19.9622 4.98823 18.7555 12.0765 18.1415 15.3479C17.8818 16.7322 17.3703 17.1963 16.8751 17.2418C15.799 17.3405 14.9818 16.5328 13.9395 15.8518C12.3085 14.786 11.3871 14.1226 9.80391 13.0827C7.97428 11.8808 9.16035 11.2203 10.203 10.1407C10.4759 9.85821 15.2175 5.55917 15.3092 5.16918C15.3207 5.12041 15.3314 4.9386 15.223 4.84259C15.1146 4.74659 14.9547 4.77942 14.8393 4.80553C14.6757 4.84254 12.0702 6.55921 7.02271 9.95555C6.28313 10.4618 5.61325 10.7084 5.01306 10.6955C4.3514 10.6813 3.07862 10.3226 2.13244 10.016C0.97192 9.63996 0.0495584 9.44114 0.129875 8.80252C0.17171 8.46988 0.631247 8.12969 1.50849 7.78195Z" fill="white"/>
                        </svg>
                    </button>
                    <button class="vk" on:click="{share('vk')}">
                        <svg width="24" height="13" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="path-1-inside-1" fill="white">
                                <path class="no-fill no-stroke" d="M23.3157 10.8968C23.2879 10.8418 23.2619 10.7961 23.2379 10.7595C22.8394 10.1006 22.0778 9.29182 20.9537 8.33293L20.93 8.31098L20.9181 8.30021L20.906 8.28917H20.894C20.3838 7.84267 20.0607 7.54245 19.9254 7.38874C19.6779 7.09594 19.6224 6.79957 19.7577 6.49927C19.8533 6.27238 20.2124 5.79323 20.834 5.06115C21.1611 4.67318 21.42 4.36223 21.6113 4.12796C22.9906 2.44438 23.5887 1.36856 23.4052 0.900057L23.334 0.790575C23.2861 0.724662 23.1625 0.664364 22.9634 0.609373C22.7639 0.554497 22.5088 0.545422 22.1978 0.581993L18.7538 0.603835C18.698 0.585684 18.6183 0.587376 18.5145 0.609373C18.4108 0.631369 18.359 0.642406 18.359 0.642406L18.299 0.669902L18.2515 0.702935C18.2116 0.724777 18.1677 0.763195 18.1199 0.818109C18.0722 0.872831 18.0324 0.937051 18.0006 1.01023C17.6256 1.8959 17.1993 2.71934 16.7208 3.48053C16.4258 3.93441 16.1549 4.32777 15.9075 4.66083C15.6604 4.99378 15.4531 5.23909 15.2858 5.39633C15.1182 5.55373 14.967 5.67982 14.8312 5.77508C14.6956 5.87037 14.5921 5.91063 14.5205 5.8959C14.4486 5.88118 14.381 5.86656 14.317 5.85195C14.2054 5.78604 14.1157 5.6964 14.048 5.58295C13.9801 5.46951 13.9344 5.32673 13.9104 5.15472C13.8867 4.98259 13.8726 4.83454 13.8686 4.71006C13.8648 4.58573 13.8666 4.40988 13.8746 4.18299C13.8829 3.95599 13.8867 3.8024 13.8867 3.72187C13.8867 3.44369 13.8926 3.14177 13.9044 2.81606C13.9165 2.49034 13.9262 2.23226 13.9344 2.04214C13.9425 1.85183 13.9463 1.65047 13.9463 1.4382C13.9463 1.22593 13.9322 1.05945 13.9044 0.938627C13.8769 0.817954 13.8348 0.70082 13.7792 0.587261C13.7233 0.473818 13.6414 0.386063 13.534 0.323765C13.4264 0.261545 13.2926 0.212168 13.1334 0.175481C12.7108 0.0876879 12.1727 0.0401956 11.5188 0.0328122C10.036 0.0181992 9.08322 0.106108 8.66067 0.296423C8.49325 0.376833 8.34175 0.4867 8.20628 0.625678C8.06274 0.786767 8.04272 0.874677 8.14635 0.889136C8.62477 0.954933 8.96346 1.11233 9.1628 1.36117L9.23464 1.49304C9.29051 1.58818 9.3463 1.75661 9.40214 1.99811C9.45789 2.23961 9.49387 2.50676 9.5097 2.7994C9.5495 3.33382 9.5495 3.79128 9.5097 4.17184C9.46979 4.55254 9.43209 4.84892 9.39611 5.06119C9.36013 5.27347 9.30634 5.44548 9.23464 5.57719C9.1628 5.70893 9.11501 5.78946 9.09105 5.81869C9.06713 5.84791 9.04719 5.86633 9.03136 5.87356C8.92773 5.91002 8.81996 5.92859 8.70842 5.92859C8.59671 5.92859 8.46125 5.87729 8.30183 5.77477C8.14245 5.67225 7.97704 5.53142 7.8056 5.35207C7.63416 5.17268 7.44081 4.92199 7.22547 4.59996C7.0103 4.27794 6.78705 3.89734 6.55584 3.45818L6.36454 3.1397C6.24496 2.93481 6.0816 2.63647 5.87431 2.24496C5.66688 1.85329 5.48355 1.47443 5.32417 1.10845C5.26046 0.95474 5.16475 0.837721 5.03721 0.757196L4.97735 0.724162C4.93756 0.694936 4.87368 0.663902 4.78606 0.630831C4.69831 0.597798 4.60674 0.574109 4.51099 0.559535L1.23426 0.581378C0.899425 0.581378 0.672234 0.65102 0.552606 0.790113L0.50473 0.85591C0.480813 0.892558 0.46875 0.951087 0.46875 1.03165C0.46875 1.11218 0.492667 1.21101 0.540543 1.32803C1.01888 2.36017 1.53907 3.35558 2.1011 4.31443C2.66313 5.27327 3.15153 6.04565 3.56599 6.63086C3.98054 7.2165 4.40309 7.76922 4.83364 8.28875C5.26419 8.80847 5.54918 9.14153 5.68862 9.28786C5.82823 9.43445 5.93789 9.54405 6.0176 9.61723L6.31663 9.88068C6.50796 10.0564 6.78894 10.2668 7.15967 10.512C7.53049 10.7573 7.94102 10.9988 8.39146 11.2368C8.84199 11.4745 9.36612 11.6685 9.96413 11.8185C10.5621 11.9687 11.144 12.029 11.7101 11.9999H13.0854C13.3643 11.9778 13.5757 11.8972 13.7193 11.7583L13.7669 11.7032C13.7989 11.6596 13.8288 11.5917 13.8565 11.5003C13.8844 11.4089 13.8983 11.3081 13.8983 11.1984C13.8902 10.8838 13.9163 10.6001 13.9759 10.3476C14.0355 10.0952 14.1035 9.90491 14.1794 9.77674C14.2554 9.64868 14.3411 9.54062 14.4365 9.45302C14.532 9.36523 14.6001 9.31205 14.6401 9.29374C14.6798 9.27532 14.7115 9.26282 14.7354 9.25532C14.9268 9.1968 15.152 9.25348 15.4113 9.42564C15.6705 9.59765 15.9135 9.81004 16.1409 10.0625C16.3681 10.3151 16.6411 10.5986 16.96 10.9132C17.279 11.228 17.558 11.462 17.7971 11.616L18.0362 11.7477C18.1958 11.8356 18.4031 11.9162 18.6583 11.9893C18.913 12.0625 19.1362 12.0808 19.3278 12.0442L22.3892 12.0004C22.692 12.0004 22.9276 11.9544 23.0947 11.863C23.2622 11.7715 23.3616 11.6707 23.3937 11.5611C23.4257 11.4514 23.4274 11.3268 23.3998 11.1876C23.3714 11.0488 23.3435 10.9517 23.3157 10.8968Z"/>
                            </mask>
                            <path d="M23.3157 10.8968C23.2879 10.8418 23.2619 10.7961 23.2379 10.7595C22.8394 10.1006 22.0778 9.29182 20.9537 8.33293L20.93 8.31098L20.9181 8.30021L20.906 8.28917H20.894C20.3838 7.84267 20.0607 7.54245 19.9254 7.38874C19.6779 7.09594 19.6224 6.79957 19.7577 6.49927C19.8533 6.27238 20.2124 5.79323 20.834 5.06115C21.1611 4.67318 21.42 4.36223 21.6113 4.12796C22.9906 2.44438 23.5887 1.36856 23.4052 0.900057L23.334 0.790575C23.2861 0.724662 23.1625 0.664364 22.9634 0.609373C22.7639 0.554497 22.5088 0.545422 22.1978 0.581993L18.7538 0.603835C18.698 0.585684 18.6183 0.587376 18.5145 0.609373C18.4108 0.631369 18.359 0.642406 18.359 0.642406L18.299 0.669902L18.2515 0.702935C18.2116 0.724777 18.1677 0.763195 18.1199 0.818109C18.0722 0.872831 18.0324 0.937051 18.0006 1.01023C17.6256 1.8959 17.1993 2.71934 16.7208 3.48053C16.4258 3.93441 16.1549 4.32777 15.9075 4.66083C15.6604 4.99378 15.4531 5.23909 15.2858 5.39633C15.1182 5.55373 14.967 5.67982 14.8312 5.77508C14.6956 5.87037 14.5921 5.91063 14.5205 5.8959C14.4486 5.88118 14.381 5.86656 14.317 5.85195C14.2054 5.78604 14.1157 5.6964 14.048 5.58295C13.9801 5.46951 13.9344 5.32673 13.9104 5.15472C13.8867 4.98259 13.8726 4.83454 13.8686 4.71006C13.8648 4.58573 13.8666 4.40988 13.8746 4.18299C13.8829 3.95599 13.8867 3.8024 13.8867 3.72187C13.8867 3.44369 13.8926 3.14177 13.9044 2.81606C13.9165 2.49034 13.9262 2.23226 13.9344 2.04214C13.9425 1.85183 13.9463 1.65047 13.9463 1.4382C13.9463 1.22593 13.9322 1.05945 13.9044 0.938627C13.8769 0.817954 13.8348 0.70082 13.7792 0.587261C13.7233 0.473818 13.6414 0.386063 13.534 0.323765C13.4264 0.261545 13.2926 0.212168 13.1334 0.175481C12.7108 0.0876879 12.1727 0.0401956 11.5188 0.0328122C10.036 0.0181992 9.08322 0.106108 8.66067 0.296423C8.49325 0.376833 8.34175 0.4867 8.20628 0.625678C8.06274 0.786767 8.04272 0.874677 8.14635 0.889136C8.62477 0.954933 8.96346 1.11233 9.1628 1.36117L9.23464 1.49304C9.29051 1.58818 9.3463 1.75661 9.40214 1.99811C9.45789 2.23961 9.49387 2.50676 9.5097 2.7994C9.5495 3.33382 9.5495 3.79128 9.5097 4.17184C9.46979 4.55254 9.43209 4.84892 9.39611 5.06119C9.36013 5.27347 9.30634 5.44548 9.23464 5.57719C9.1628 5.70893 9.11501 5.78946 9.09105 5.81869C9.06713 5.84791 9.04719 5.86633 9.03136 5.87356C8.92773 5.91002 8.81996 5.92859 8.70842 5.92859C8.59671 5.92859 8.46125 5.87729 8.30183 5.77477C8.14245 5.67225 7.97704 5.53142 7.8056 5.35207C7.63416 5.17268 7.44081 4.92199 7.22547 4.59996C7.0103 4.27794 6.78705 3.89734 6.55584 3.45818L6.36454 3.1397C6.24496 2.93481 6.0816 2.63647 5.87431 2.24496C5.66688 1.85329 5.48355 1.47443 5.32417 1.10845C5.26046 0.95474 5.16475 0.837721 5.03721 0.757196L4.97735 0.724162C4.93756 0.694936 4.87368 0.663902 4.78606 0.630831C4.69831 0.597798 4.60674 0.574109 4.51099 0.559535L1.23426 0.581378C0.899425 0.581378 0.672234 0.65102 0.552606 0.790113L0.50473 0.85591C0.480813 0.892558 0.46875 0.951087 0.46875 1.03165C0.46875 1.11218 0.492667 1.21101 0.540543 1.32803C1.01888 2.36017 1.53907 3.35558 2.1011 4.31443C2.66313 5.27327 3.15153 6.04565 3.56599 6.63086C3.98054 7.2165 4.40309 7.76922 4.83364 8.28875C5.26419 8.80847 5.54918 9.14153 5.68862 9.28786C5.82823 9.43445 5.93789 9.54405 6.0176 9.61723L6.31663 9.88068C6.50796 10.0564 6.78894 10.2668 7.15967 10.512C7.53049 10.7573 7.94102 10.9988 8.39146 11.2368C8.84199 11.4745 9.36612 11.6685 9.96413 11.8185C10.5621 11.9687 11.144 12.029 11.7101 11.9999H13.0854C13.3643 11.9778 13.5757 11.8972 13.7193 11.7583L13.7669 11.7032C13.7989 11.6596 13.8288 11.5917 13.8565 11.5003C13.8844 11.4089 13.8983 11.3081 13.8983 11.1984C13.8902 10.8838 13.9163 10.6001 13.9759 10.3476C14.0355 10.0952 14.1035 9.90491 14.1794 9.77674C14.2554 9.64868 14.3411 9.54062 14.4365 9.45302C14.532 9.36523 14.6001 9.31205 14.6401 9.29374C14.6798 9.27532 14.7115 9.26282 14.7354 9.25532C14.9268 9.1968 15.152 9.25348 15.4113 9.42564C15.6705 9.59765 15.9135 9.81004 16.1409 10.0625C16.3681 10.3151 16.6411 10.5986 16.96 10.9132C17.279 11.228 17.558 11.462 17.7971 11.616L18.0362 11.7477C18.1958 11.8356 18.4031 11.9162 18.6583 11.9893C18.913 12.0625 19.1362 12.0808 19.3278 12.0442L22.3892 12.0004C22.692 12.0004 22.9276 11.9544 23.0947 11.863C23.2622 11.7715 23.3616 11.6707 23.3937 11.5611C23.4257 11.4514 23.4274 11.3268 23.3998 11.1876C23.3714 11.0488 23.3435 10.9517 23.3157 10.8968Z" fill="#E71F75" stroke="#E71F75" stroke-width="2" mask="url(#path-1-inside-1)"/>
                        </svg>
                    </button>
                    <button class="twitter" on:click="{share('twitter')}">
                        <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.04439 3.42284C8.04439 3.79671 8.10915 4.1561 8.22512 4.49374C8.21609 4.4923 8.20706 4.4923 8.19651 4.49085C2.93098 4.14306 0.792238 0.892663 0.792238 0.892663C0.792238 0.892663 -0.501552 3.46776 1.60255 5.49509C1.60255 5.49509 1.04678 5.5603 0.39612 5.19947C0.39612 5.19947 -0.043677 7.39635 2.83158 8.57594C2.83158 8.57594 2.0303 8.78316 1.57544 8.70926C1.57544 8.70926 2.2502 10.7525 4.82723 11.0467C4.82723 11.0467 3.75335 12.3553 0 12.6089C0 12.6089 6.20989 16.5143 12.2451 11.238C12.2451 11.238 14.8763 9.09472 15.2062 4.78212L17 2.02153L15.2062 2.41714C15.2062 2.41714 16.2108 1.68823 16.5406 0.676742C16.5406 0.676742 15.1926 1.28538 14.3838 1.29262C13.7316 0.505746 12.7285 0 11.6004 0C9.63941 0 8.04439 1.53173 8.04439 3.42284Z" fill="white"/>
                        </svg>
                    </button>
                </div>
                {/if}
                <a class="subscribe" href="#" on:click="{toggleBlogPopupPromocodeForm}">
                    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.1875 0.00012207H1.8125C0.8125 0.00012207 0 0.781238 0 1.74261V12.2576C0 13.219 0.8125 14.0001 1.8125 14.0001H18.1875C19.1875 14.0001 20 13.219 20 12.2576V1.74261C20 0.781238 19.1875 0.00012207 18.1875 0.00012207ZM17.9375 1.08167L10 6.90999L2.0625 1.08167H17.9375ZM18.1875 12.8585H1.8125C1.4375 12.8585 1.125 12.5581 1.125 12.1975V1.74261L9.6875 7.99154C9.8125 8.05162 9.9375 8.11171 10 8.11171C10.0625 8.11171 10.25 8.05162 10.3125 7.99154L18.875 1.74261V12.1975C18.875 12.5581 18.5625 12.8585 18.1875 12.8585Z" fill="white"/>
                    </svg>
                    <span>Подписаться</span>
                </a>
            </div>
		</Header>
		<div class="blog-body">
            <div class="page-content">
                <div class="date-n-author"><time>{post.date_short}</time><span>, {post.author.name}</span></div>
                <div class="html">
                    {@html post.html1}
                </div>
                <div class="flowers">
                    {#each favorites as flower}
                        <FavoriteCard recommendation="{flower}" />
                    {/each}
                </div>
                <div class="html">
                    {@html post.html2}
                </div>
                <div class="author-about">
                    <img src="{post.author.photo}.png" alt="{post.author.name}">
                    <div>
                        <h2>Об авторе</h2>
                        <p>{post.author.about_text}</p>
                    </div>
                </div>
                <div class="post-buttons">
                    <div class="views-count">
                        <svg width="26" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                                <path d="M9.5 8.00017C9.5 9.93509 11.0667 11.5001 13 11.5001C14.932 11.5001 16.5 9.93499 16.5 8.00017C16.5 6.06525 14.932 4.50012 13 4.50012C11.0667 4.50012 9.5 6.06515 9.5 8.00017Z" stroke="white"/>
                                <path d="M1.5 8.00009C5 3.00009 14.5 -3.99991 24.5 8.00009C21 13.1667 11.5 20.4 1.5 8.00009Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="26" height="16" fill="white" transform="matrix(1 0 0 -1 0 16.0001)"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <span>{post.views_count} просмотров</span>
                    </div>
                    {#if !shareOpened}
                        <a class="open-share" href="#" on:click="{openShare}">
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.5 3.00003C11.5 4.10574 12.3952 5 13.5 5C14.6041 5 15.5 4.10564 15.5 3.00003C15.5 1.89436 14.6041 1 13.5 1C12.3952 1 11.5 1.89426 11.5 3.00003Z" fill="#1039C9" stroke="#1039C9"/>
                                <path d="M11.5 14C11.5 15.1057 12.3952 16 13.5 16C14.6041 16 15.5 15.1056 15.5 14C15.5 12.8944 14.6041 12 13.5 12C12.3952 12 11.5 12.8943 11.5 14Z" fill="#1039C9" stroke="#1039C9"/>
                                <path d="M0.5 8.00003C0.5 9.10574 1.39519 10 2.50003 10C3.60407 10 4.5 9.10564 4.5 8.00003C4.5 6.89436 3.60406 6 2.50003 6C1.3952 6 0.5 6.89426 0.5 8.00003Z" fill="#1039C9" stroke="#1039C9"/>
                                <path class="no-fill" d="M2.5 8C2.88261 7.68 11.4928 4.36667 15 2.5" stroke="#1039C9"/>
                                <path class="no-fill" d="M2.5 8C2.88261 8.32 11.4928 12.6333 15 14.5" stroke="#1039C9"/>
                            </svg>
                            <span>Поделиться</span>
                        </a>
                    {/if}
                    {#if shareOpened}
                        <div class="share" class:close="{shareClosed}">
                            <svg on:click="{closeShare}" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.5 3.00015C11.5 4.10586 12.3952 5.00012 13.5 5.00012C14.6041 5.00012 15.5 4.10576 15.5 3.00015C15.5 1.89448 14.6041 1.00012 13.5 1.00012C12.3952 1.00012 11.5 1.89438 11.5 3.00015Z" fill="white" stroke="white"/>
                                <path d="M11.5 14.0002C11.5 15.1059 12.3952 16.0001 13.5 16.0001C14.6041 16.0001 15.5 15.1058 15.5 14.0002C15.5 12.8945 14.6041 12.0001 13.5 12.0001C12.3952 12.0001 11.5 12.8944 11.5 14.0002Z" fill="white" stroke="white"/>
                                <path d="M0.5 8.00015C0.5 9.10586 1.39519 10.0001 2.50003 10.0001C3.60407 10.0001 4.5 9.10576 4.5 8.00015C4.5 6.89448 3.60406 6.00012 2.50003 6.00012C1.3952 6.00012 0.5 6.89438 0.5 8.00015Z" fill="white" stroke="white"/>
                                <path d="M2.5 8.00012C2.88261 7.68012 11.4928 4.36679 15 2.50012" stroke="white"/>
                                <path d="M2.5 8.00012C2.88261 8.32012 11.4928 12.6335 15 14.5001" stroke="white"/>
                            </svg>
                            <button class="facebook" on:click="{share('facebook')}">
                                <svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.63756 7.67225H9.46666L9.31301 9.61807H6.63756H6.13756V10.1181V19.8438H3.16602V10.1181V9.61807H2.66602H1.07812V7.67225H2.66602H3.16602V7.17225V5.19925C3.16602 4.75769 3.16689 4.2402 3.24523 3.73458C3.32408 3.2257 3.47415 2.78306 3.73358 2.46652L3.73986 2.45886L3.74583 2.45095C4.06805 2.02436 4.49882 1.68154 4.99921 1.45632C5.49967 1.23106 6.05229 1.13138 6.60503 1.16741L6.63181 1.16916L6.65863 1.16803C7.72881 1.12291 8.79994 1.20757 9.84682 1.41953L9.49263 3.44101C9.06876 3.35894 8.63815 3.31182 8.20545 3.3003L8.20545 3.30012H8.19214C7.73676 3.30012 7.24425 3.37656 6.84836 3.61503C6.41998 3.87306 6.13756 4.30472 6.13756 4.89319V7.17225V7.67225H6.63756Z" fill="white" stroke="white"/>
                                </svg>
                            </button>
                            <button class="telegram" on:click="{share('telegram')}">
                                <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.50849 7.78195C6.91074 5.43578 10.5131 3.88904 12.3155 3.14174C17.4619 1.00802 18.5312 0.63737 19.2282 0.62513C19.3815 0.622439 19.7243 0.660309 19.9463 0.839895C20.1338 0.991533 20.1854 1.19638 20.2101 1.34015C20.2348 1.48392 20.2655 1.81143 20.2411 2.06734C19.9622 4.98823 18.7555 12.0765 18.1415 15.3479C17.8818 16.7322 17.3703 17.1963 16.8751 17.2418C15.799 17.3405 14.9818 16.5328 13.9395 15.8518C12.3085 14.786 11.3871 14.1226 9.80391 13.0827C7.97428 11.8808 9.16035 11.2203 10.203 10.1407C10.4759 9.85821 15.2175 5.55917 15.3092 5.16918C15.3207 5.12041 15.3314 4.9386 15.223 4.84259C15.1146 4.74659 14.9547 4.77942 14.8393 4.80553C14.6757 4.84254 12.0702 6.55921 7.02271 9.95555C6.28313 10.4618 5.61325 10.7084 5.01306 10.6955C4.3514 10.6813 3.07862 10.3226 2.13244 10.016C0.97192 9.63996 0.0495584 9.44114 0.129875 8.80252C0.17171 8.46988 0.631247 8.12969 1.50849 7.78195Z" fill="white"/>
                                </svg>
                            </button>
                            <button class="vk" on:click="{share('vk')}">
                                <svg width="24" height="13" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="path-1-inside-1" fill="white">
                                        <path class="no-fill no-stroke" d="M23.3157 10.8968C23.2879 10.8418 23.2619 10.7961 23.2379 10.7595C22.8394 10.1006 22.0778 9.29182 20.9537 8.33293L20.93 8.31098L20.9181 8.30021L20.906 8.28917H20.894C20.3838 7.84267 20.0607 7.54245 19.9254 7.38874C19.6779 7.09594 19.6224 6.79957 19.7577 6.49927C19.8533 6.27238 20.2124 5.79323 20.834 5.06115C21.1611 4.67318 21.42 4.36223 21.6113 4.12796C22.9906 2.44438 23.5887 1.36856 23.4052 0.900057L23.334 0.790575C23.2861 0.724662 23.1625 0.664364 22.9634 0.609373C22.7639 0.554497 22.5088 0.545422 22.1978 0.581993L18.7538 0.603835C18.698 0.585684 18.6183 0.587376 18.5145 0.609373C18.4108 0.631369 18.359 0.642406 18.359 0.642406L18.299 0.669902L18.2515 0.702935C18.2116 0.724777 18.1677 0.763195 18.1199 0.818109C18.0722 0.872831 18.0324 0.937051 18.0006 1.01023C17.6256 1.8959 17.1993 2.71934 16.7208 3.48053C16.4258 3.93441 16.1549 4.32777 15.9075 4.66083C15.6604 4.99378 15.4531 5.23909 15.2858 5.39633C15.1182 5.55373 14.967 5.67982 14.8312 5.77508C14.6956 5.87037 14.5921 5.91063 14.5205 5.8959C14.4486 5.88118 14.381 5.86656 14.317 5.85195C14.2054 5.78604 14.1157 5.6964 14.048 5.58295C13.9801 5.46951 13.9344 5.32673 13.9104 5.15472C13.8867 4.98259 13.8726 4.83454 13.8686 4.71006C13.8648 4.58573 13.8666 4.40988 13.8746 4.18299C13.8829 3.95599 13.8867 3.8024 13.8867 3.72187C13.8867 3.44369 13.8926 3.14177 13.9044 2.81606C13.9165 2.49034 13.9262 2.23226 13.9344 2.04214C13.9425 1.85183 13.9463 1.65047 13.9463 1.4382C13.9463 1.22593 13.9322 1.05945 13.9044 0.938627C13.8769 0.817954 13.8348 0.70082 13.7792 0.587261C13.7233 0.473818 13.6414 0.386063 13.534 0.323765C13.4264 0.261545 13.2926 0.212168 13.1334 0.175481C12.7108 0.0876879 12.1727 0.0401956 11.5188 0.0328122C10.036 0.0181992 9.08322 0.106108 8.66067 0.296423C8.49325 0.376833 8.34175 0.4867 8.20628 0.625678C8.06274 0.786767 8.04272 0.874677 8.14635 0.889136C8.62477 0.954933 8.96346 1.11233 9.1628 1.36117L9.23464 1.49304C9.29051 1.58818 9.3463 1.75661 9.40214 1.99811C9.45789 2.23961 9.49387 2.50676 9.5097 2.7994C9.5495 3.33382 9.5495 3.79128 9.5097 4.17184C9.46979 4.55254 9.43209 4.84892 9.39611 5.06119C9.36013 5.27347 9.30634 5.44548 9.23464 5.57719C9.1628 5.70893 9.11501 5.78946 9.09105 5.81869C9.06713 5.84791 9.04719 5.86633 9.03136 5.87356C8.92773 5.91002 8.81996 5.92859 8.70842 5.92859C8.59671 5.92859 8.46125 5.87729 8.30183 5.77477C8.14245 5.67225 7.97704 5.53142 7.8056 5.35207C7.63416 5.17268 7.44081 4.92199 7.22547 4.59996C7.0103 4.27794 6.78705 3.89734 6.55584 3.45818L6.36454 3.1397C6.24496 2.93481 6.0816 2.63647 5.87431 2.24496C5.66688 1.85329 5.48355 1.47443 5.32417 1.10845C5.26046 0.95474 5.16475 0.837721 5.03721 0.757196L4.97735 0.724162C4.93756 0.694936 4.87368 0.663902 4.78606 0.630831C4.69831 0.597798 4.60674 0.574109 4.51099 0.559535L1.23426 0.581378C0.899425 0.581378 0.672234 0.65102 0.552606 0.790113L0.50473 0.85591C0.480813 0.892558 0.46875 0.951087 0.46875 1.03165C0.46875 1.11218 0.492667 1.21101 0.540543 1.32803C1.01888 2.36017 1.53907 3.35558 2.1011 4.31443C2.66313 5.27327 3.15153 6.04565 3.56599 6.63086C3.98054 7.2165 4.40309 7.76922 4.83364 8.28875C5.26419 8.80847 5.54918 9.14153 5.68862 9.28786C5.82823 9.43445 5.93789 9.54405 6.0176 9.61723L6.31663 9.88068C6.50796 10.0564 6.78894 10.2668 7.15967 10.512C7.53049 10.7573 7.94102 10.9988 8.39146 11.2368C8.84199 11.4745 9.36612 11.6685 9.96413 11.8185C10.5621 11.9687 11.144 12.029 11.7101 11.9999H13.0854C13.3643 11.9778 13.5757 11.8972 13.7193 11.7583L13.7669 11.7032C13.7989 11.6596 13.8288 11.5917 13.8565 11.5003C13.8844 11.4089 13.8983 11.3081 13.8983 11.1984C13.8902 10.8838 13.9163 10.6001 13.9759 10.3476C14.0355 10.0952 14.1035 9.90491 14.1794 9.77674C14.2554 9.64868 14.3411 9.54062 14.4365 9.45302C14.532 9.36523 14.6001 9.31205 14.6401 9.29374C14.6798 9.27532 14.7115 9.26282 14.7354 9.25532C14.9268 9.1968 15.152 9.25348 15.4113 9.42564C15.6705 9.59765 15.9135 9.81004 16.1409 10.0625C16.3681 10.3151 16.6411 10.5986 16.96 10.9132C17.279 11.228 17.558 11.462 17.7971 11.616L18.0362 11.7477C18.1958 11.8356 18.4031 11.9162 18.6583 11.9893C18.913 12.0625 19.1362 12.0808 19.3278 12.0442L22.3892 12.0004C22.692 12.0004 22.9276 11.9544 23.0947 11.863C23.2622 11.7715 23.3616 11.6707 23.3937 11.5611C23.4257 11.4514 23.4274 11.3268 23.3998 11.1876C23.3714 11.0488 23.3435 10.9517 23.3157 10.8968Z"/>
                                    </mask>
                                    <path d="M23.3157 10.8968C23.2879 10.8418 23.2619 10.7961 23.2379 10.7595C22.8394 10.1006 22.0778 9.29182 20.9537 8.33293L20.93 8.31098L20.9181 8.30021L20.906 8.28917H20.894C20.3838 7.84267 20.0607 7.54245 19.9254 7.38874C19.6779 7.09594 19.6224 6.79957 19.7577 6.49927C19.8533 6.27238 20.2124 5.79323 20.834 5.06115C21.1611 4.67318 21.42 4.36223 21.6113 4.12796C22.9906 2.44438 23.5887 1.36856 23.4052 0.900057L23.334 0.790575C23.2861 0.724662 23.1625 0.664364 22.9634 0.609373C22.7639 0.554497 22.5088 0.545422 22.1978 0.581993L18.7538 0.603835C18.698 0.585684 18.6183 0.587376 18.5145 0.609373C18.4108 0.631369 18.359 0.642406 18.359 0.642406L18.299 0.669902L18.2515 0.702935C18.2116 0.724777 18.1677 0.763195 18.1199 0.818109C18.0722 0.872831 18.0324 0.937051 18.0006 1.01023C17.6256 1.8959 17.1993 2.71934 16.7208 3.48053C16.4258 3.93441 16.1549 4.32777 15.9075 4.66083C15.6604 4.99378 15.4531 5.23909 15.2858 5.39633C15.1182 5.55373 14.967 5.67982 14.8312 5.77508C14.6956 5.87037 14.5921 5.91063 14.5205 5.8959C14.4486 5.88118 14.381 5.86656 14.317 5.85195C14.2054 5.78604 14.1157 5.6964 14.048 5.58295C13.9801 5.46951 13.9344 5.32673 13.9104 5.15472C13.8867 4.98259 13.8726 4.83454 13.8686 4.71006C13.8648 4.58573 13.8666 4.40988 13.8746 4.18299C13.8829 3.95599 13.8867 3.8024 13.8867 3.72187C13.8867 3.44369 13.8926 3.14177 13.9044 2.81606C13.9165 2.49034 13.9262 2.23226 13.9344 2.04214C13.9425 1.85183 13.9463 1.65047 13.9463 1.4382C13.9463 1.22593 13.9322 1.05945 13.9044 0.938627C13.8769 0.817954 13.8348 0.70082 13.7792 0.587261C13.7233 0.473818 13.6414 0.386063 13.534 0.323765C13.4264 0.261545 13.2926 0.212168 13.1334 0.175481C12.7108 0.0876879 12.1727 0.0401956 11.5188 0.0328122C10.036 0.0181992 9.08322 0.106108 8.66067 0.296423C8.49325 0.376833 8.34175 0.4867 8.20628 0.625678C8.06274 0.786767 8.04272 0.874677 8.14635 0.889136C8.62477 0.954933 8.96346 1.11233 9.1628 1.36117L9.23464 1.49304C9.29051 1.58818 9.3463 1.75661 9.40214 1.99811C9.45789 2.23961 9.49387 2.50676 9.5097 2.7994C9.5495 3.33382 9.5495 3.79128 9.5097 4.17184C9.46979 4.55254 9.43209 4.84892 9.39611 5.06119C9.36013 5.27347 9.30634 5.44548 9.23464 5.57719C9.1628 5.70893 9.11501 5.78946 9.09105 5.81869C9.06713 5.84791 9.04719 5.86633 9.03136 5.87356C8.92773 5.91002 8.81996 5.92859 8.70842 5.92859C8.59671 5.92859 8.46125 5.87729 8.30183 5.77477C8.14245 5.67225 7.97704 5.53142 7.8056 5.35207C7.63416 5.17268 7.44081 4.92199 7.22547 4.59996C7.0103 4.27794 6.78705 3.89734 6.55584 3.45818L6.36454 3.1397C6.24496 2.93481 6.0816 2.63647 5.87431 2.24496C5.66688 1.85329 5.48355 1.47443 5.32417 1.10845C5.26046 0.95474 5.16475 0.837721 5.03721 0.757196L4.97735 0.724162C4.93756 0.694936 4.87368 0.663902 4.78606 0.630831C4.69831 0.597798 4.60674 0.574109 4.51099 0.559535L1.23426 0.581378C0.899425 0.581378 0.672234 0.65102 0.552606 0.790113L0.50473 0.85591C0.480813 0.892558 0.46875 0.951087 0.46875 1.03165C0.46875 1.11218 0.492667 1.21101 0.540543 1.32803C1.01888 2.36017 1.53907 3.35558 2.1011 4.31443C2.66313 5.27327 3.15153 6.04565 3.56599 6.63086C3.98054 7.2165 4.40309 7.76922 4.83364 8.28875C5.26419 8.80847 5.54918 9.14153 5.68862 9.28786C5.82823 9.43445 5.93789 9.54405 6.0176 9.61723L6.31663 9.88068C6.50796 10.0564 6.78894 10.2668 7.15967 10.512C7.53049 10.7573 7.94102 10.9988 8.39146 11.2368C8.84199 11.4745 9.36612 11.6685 9.96413 11.8185C10.5621 11.9687 11.144 12.029 11.7101 11.9999H13.0854C13.3643 11.9778 13.5757 11.8972 13.7193 11.7583L13.7669 11.7032C13.7989 11.6596 13.8288 11.5917 13.8565 11.5003C13.8844 11.4089 13.8983 11.3081 13.8983 11.1984C13.8902 10.8838 13.9163 10.6001 13.9759 10.3476C14.0355 10.0952 14.1035 9.90491 14.1794 9.77674C14.2554 9.64868 14.3411 9.54062 14.4365 9.45302C14.532 9.36523 14.6001 9.31205 14.6401 9.29374C14.6798 9.27532 14.7115 9.26282 14.7354 9.25532C14.9268 9.1968 15.152 9.25348 15.4113 9.42564C15.6705 9.59765 15.9135 9.81004 16.1409 10.0625C16.3681 10.3151 16.6411 10.5986 16.96 10.9132C17.279 11.228 17.558 11.462 17.7971 11.616L18.0362 11.7477C18.1958 11.8356 18.4031 11.9162 18.6583 11.9893C18.913 12.0625 19.1362 12.0808 19.3278 12.0442L22.3892 12.0004C22.692 12.0004 22.9276 11.9544 23.0947 11.863C23.2622 11.7715 23.3616 11.6707 23.3937 11.5611C23.4257 11.4514 23.4274 11.3268 23.3998 11.1876C23.3714 11.0488 23.3435 10.9517 23.3157 10.8968Z" fill="#E71F75" stroke="#E71F75" stroke-width="2" mask="url(#path-1-inside-1)"/>
                                </svg>
                            </button>
                            <button class="twitter" on:click="{share('twitter')}">
                                <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.04439 3.42284C8.04439 3.79671 8.10915 4.1561 8.22512 4.49374C8.21609 4.4923 8.20706 4.4923 8.19651 4.49085C2.93098 4.14306 0.792238 0.892663 0.792238 0.892663C0.792238 0.892663 -0.501552 3.46776 1.60255 5.49509C1.60255 5.49509 1.04678 5.5603 0.39612 5.19947C0.39612 5.19947 -0.043677 7.39635 2.83158 8.57594C2.83158 8.57594 2.0303 8.78316 1.57544 8.70926C1.57544 8.70926 2.2502 10.7525 4.82723 11.0467C4.82723 11.0467 3.75335 12.3553 0 12.6089C0 12.6089 6.20989 16.5143 12.2451 11.238C12.2451 11.238 14.8763 9.09472 15.2062 4.78212L17 2.02153L15.2062 2.41714C15.2062 2.41714 16.2108 1.68823 16.5406 0.676742C16.5406 0.676742 15.1926 1.28538 14.3838 1.29262C13.7316 0.505746 12.7285 0 11.6004 0C9.63941 0 8.04439 1.53173 8.04439 3.42284Z" fill="white"/>
                                </svg>
                            </button>
                        </div>
                    {/if}
                    <div class="yes-no" class:chose-no="{choseNo}" class:chose-yes="{choseYes}">
                        <span>Была ли статья полезна?</span>

                        <button
                                bind:this={questionYesButton} class="yes" on:click="{toggleYes}">
                            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.4898 12.2371C16.8482 11.7666 17.0201 11.2622 16.9981 10.7428C16.9762 10.1706 16.7275 9.72271 16.5227 9.44793C16.7604 8.83814 16.8519 7.87829 16.0583 7.133C15.4768 6.5872 14.4894 6.34253 13.1216 6.41029C12.1598 6.45546 11.3553 6.6399 11.3223 6.64743H11.3187C11.1358 6.6813 10.942 6.72271 10.7445 6.76788C10.7299 6.52698 10.7701 5.92848 11.2017 4.58093C11.7136 2.97742 11.6844 1.75031 11.1066 0.929736C10.4995 0.0677541 9.53037 0 9.24511 0C8.97083 0 8.71849 0.116688 8.5393 0.331242C8.13336 0.816813 8.1809 1.71267 8.2321 2.12673C7.74936 3.45922 6.39624 6.72647 5.25157 7.63363C5.22963 7.64868 5.21135 7.6675 5.19306 7.68632C4.85661 8.05144 4.62987 8.44668 4.47627 8.79297C4.2605 8.67252 4.01548 8.60477 3.75217 8.60477H1.52135C0.680218 8.60477 0 9.30866 0 10.1706V16.2873C0 17.1531 0.683875 17.8532 1.52135 17.8532H3.75217C4.07765 17.8532 4.38119 17.7478 4.62987 17.5671L5.48929 17.6725C5.62094 17.6913 7.96148 17.9962 10.3642 17.9473C10.7994 17.9812 11.209 18 11.5893 18C12.2439 18 12.8144 17.9473 13.2899 17.8419C14.4089 17.5972 15.1732 17.1079 15.5609 16.389C15.8571 15.8394 15.8571 15.2936 15.8096 14.9473C16.5373 14.2698 16.6653 13.5207 16.6397 12.9937C16.6251 12.6888 16.5593 12.4291 16.4898 12.2371ZM1.52135 16.8369C1.22512 16.8369 0.987413 16.5885 0.987413 16.2873V10.1669C0.987413 9.86198 1.22878 9.61731 1.52135 9.61731H3.75217C4.04839 9.61731 4.2861 9.86575 4.2861 10.1669V16.2836C4.2861 16.5885 4.04474 16.8331 3.75217 16.8331H1.52135V16.8369ZM15.5536 11.7967C15.4 11.9624 15.3707 12.2146 15.4878 12.4103C15.4878 12.4141 15.6377 12.6775 15.656 13.0389C15.6816 13.532 15.4512 13.9686 14.9685 14.3413C14.7966 14.4768 14.7271 14.7102 14.8002 14.921C14.8002 14.9247 14.9575 15.4216 14.7015 15.8921C14.4565 16.3438 13.9116 16.6675 13.0851 16.8482C12.4231 16.995 11.5235 17.0213 10.419 16.931C10.4044 16.931 10.3861 16.931 10.3678 16.931C8.01633 16.9837 5.63923 16.6675 5.61363 16.6637H5.60997L5.2406 16.6186C5.26255 16.5132 5.27352 16.4003 5.27352 16.2873V10.1669C5.27352 10.005 5.24792 9.84693 5.20403 9.70013C5.26986 9.44793 5.45271 8.88708 5.88425 8.40903C7.52628 7.06901 9.13174 2.54831 9.20123 2.35257C9.23048 2.27353 9.2378 2.18695 9.22317 2.10038C9.161 1.6788 9.18294 1.16311 9.27071 1.00878C9.46454 1.01255 9.9875 1.06901 10.302 1.51694C10.675 2.04768 10.6604 2.99624 10.2581 4.25345C9.64373 6.16938 9.59254 7.17817 10.0789 7.62233C10.3203 7.84442 10.6421 7.85571 10.8762 7.76913C11.0993 7.71644 11.3114 7.67127 11.5125 7.63739C11.5271 7.63363 11.5454 7.62986 11.56 7.6261C12.6828 7.3739 14.6942 7.21957 15.3927 7.87453C15.9851 8.43162 15.5646 9.16938 15.517 9.24843C15.3817 9.45922 15.4219 9.734 15.6048 9.90339C15.6084 9.90715 15.9924 10.2798 16.0107 10.7804C16.0254 11.1154 15.8718 11.458 15.5536 11.7967Z" fill="#330033"/>
                            </svg>
                            Да</button>
                        <button
                                bind:this={questionNoButton} class="no" on:click="{toggleNo}">
                            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.4898 5.76286C16.8482 6.23338 17.0201 6.73777 16.9981 7.25722C16.9762 7.82936 16.7275 8.27729 16.5227 8.55207C16.7604 9.16186 16.8519 10.1217 16.0583 10.867C15.4768 11.4128 14.4894 11.6575 13.1216 11.5897C12.1598 11.5445 11.3553 11.3601 11.3223 11.3526H11.3187C11.1358 11.3187 10.942 11.2773 10.7445 11.2321C10.7299 11.473 10.7701 12.0715 11.2017 13.4191C11.7136 15.0226 11.6844 16.2497 11.1066 17.0703C10.4995 17.9322 9.53037 18 9.24511 18C8.97083 18 8.71849 17.8833 8.5393 17.6688C8.13336 17.1832 8.1809 16.2873 8.2321 15.8733C7.74936 14.5408 6.39624 11.2735 5.25157 10.3664C5.22963 10.3513 5.21135 10.3325 5.19306 10.3137C4.85661 9.94856 4.62987 9.55332 4.47627 9.20703C4.2605 9.32748 4.01548 9.39523 3.75217 9.39523H1.52135C0.680218 9.39523 0 8.69134 0 7.82936V1.71267C0 0.846926 0.683875 0.146801 1.52135 0.146801H3.75217C4.07765 0.146801 4.38119 0.252195 4.62987 0.432873L5.48929 0.327478C5.62094 0.308659 7.96148 0.00376511 10.3642 0.0526981C10.7994 0.0188217 11.209 0 11.5893 0C12.2439 0 12.8144 0.0526981 13.2899 0.158094C14.4089 0.402761 15.1732 0.892096 15.5609 1.61104C15.8571 2.1606 15.8571 2.7064 15.8096 3.0527C16.5373 3.73024 16.6653 4.4793 16.6397 5.00627C16.6251 5.31117 16.5593 5.57089 16.4898 5.76286ZM1.52135 1.16311C1.22512 1.16311 0.987413 1.41154 0.987413 1.71267V7.83312C0.987413 8.13802 1.22878 8.38269 1.52135 8.38269H3.75217C4.04839 8.38269 4.2861 8.13425 4.2861 7.83312V1.71644C4.2861 1.41154 4.04474 1.16688 3.75217 1.16688H1.52135V1.16311ZM15.5536 6.20326C15.4 6.03764 15.3707 5.78545 15.4878 5.58971C15.4878 5.58595 15.6377 5.32246 15.656 4.96111C15.6816 4.46801 15.4512 4.03137 14.9685 3.65872C14.7966 3.52321 14.7271 3.28984 14.8002 3.07905C14.8002 3.07528 14.9575 2.57842 14.7015 2.1079C14.4565 1.65621 13.9116 1.3325 13.0851 1.15182C12.4231 1.00502 11.5235 0.978672 10.419 1.06901C10.4044 1.06901 10.3861 1.06901 10.3678 1.06901C8.01633 1.01631 5.63923 1.3325 5.61363 1.33626H5.60997L5.2406 1.38143C5.26255 1.48683 5.27352 1.59975 5.27352 1.71267V7.83312C5.27352 7.99498 5.24792 8.15307 5.20403 8.29987C5.26986 8.55207 5.45271 9.11292 5.88425 9.59097C7.52628 10.931 9.13174 15.4517 9.20123 15.6474C9.23048 15.7265 9.2378 15.813 9.22317 15.8996C9.161 16.3212 9.18294 16.8369 9.27071 16.9912C9.46454 16.9875 9.9875 16.931 10.302 16.4831C10.675 15.9523 10.6604 15.0038 10.2581 13.7465C9.64373 11.8306 9.59254 10.8218 10.0789 10.3777C10.3203 10.1556 10.6421 10.1443 10.8762 10.2309C11.0993 10.2836 11.3114 10.3287 11.5125 10.3626C11.5271 10.3664 11.5454 10.3701 11.56 10.3739C12.6828 10.6261 14.6942 10.7804 15.3927 10.1255C15.9851 9.56838 15.5646 8.83062 15.517 8.75157C15.3817 8.54078 15.4219 8.266 15.6048 8.09661C15.6084 8.09285 15.9924 7.7202 16.0107 7.21957C16.0254 6.88457 15.8718 6.54203 15.5536 6.20326Z" fill="#330033"/>
                            </svg>
                            Нет</button>
                            {#if showChoseYes}
                                <CustomDropdown
                                        relativeElement={questionYesButton}
                                        buttonRef={questionYesButton}
                                        bind:dropdownVisible={showChoseYes}
                                        css="width: 424px;"
                                        position="LEFT">
                                    <HelpThankyouMessage></HelpThankyouMessage>
                                </CustomDropdown>
                            {/if}
                            {#if showChoseNo}
                                <CustomDropdown
                                        relativeElement={questionNoButton}
                                        buttonRef={questionNoButton}
                                        bind:dropdownVisible={showChoseNo}
                                        css="width: 424px;"
                                        position="LEFT">
                                    <HelpThankyouMessage></HelpThankyouMessage>
                                </CustomDropdown>
                            {/if}
                    </div>
                </div>

                <hr>
                <BlogPromocodeForm onSuccess={toggleBlogPopupSubscribeSuccess} onError="{toggleBlogPopupEmailSubscribedError}" className="{'main-block'}">
                    <Envelope />
                </BlogPromocodeForm>
                <hr class="under-form">
                <div class="read-more">
                    <h2>Читайте также</h2>
                    <div class="posts">
                        {#each readMorePosts as blogpost}
                            <BlogPost group="{'date'}" {blogpost} />
                        {/each}
                    </div>
                </div>
                <a href="/blog" class="go-back">

                    <Button>Вернуться назад</Button>
                </a>
            </div>
		</div>
	</div>
	<div class="aside-nav-container">
		<BlogAsideNavigation {navlist}>
			<BlogPromocodeForm onSuccess={toggleBlogPopupSubscribeSuccess} onError="{toggleBlogPopupEmailSubscribedError}" className="{'in-aside'}" />
		</BlogAsideNavigation>
	</div>
</div>


{#if showBlogPopupPromocodeForm}
    <BlogPopupPromocodeForm on:close={toggleBlogPopupPromocodeForm} onSuccess={toggleBlogPopupSubscribeSuccess} onError="{toggleBlogPopupEmailSubscribedError}" />
{/if}
{#if showBlogPopupSubscribeSuccess}
    <BlogPopupSubscribeSuccess on:close={toggleBlogPopupSubscribeSuccess} onChangeEmail="{openChangeEmailModal}" />
{/if}
{#if showBlogPopupEmailSubscribedError}
    <BlogPopupEmailSubscribedError on:close={toggleBlogPopupEmailSubscribedError} onChangeEmail="{openChangeEmailModal}" />
{/if}
{#if showBlogPopupChangeEmail}
    <BlogPopupChangeEmail on:close={toggleBlogPopupChangeEmail} />
{/if}
