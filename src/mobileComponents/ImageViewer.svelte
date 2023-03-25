    <script>
        import { onMount } from "svelte";
        import Swiper, { Navigation, Pagination } from "swiper";
        import "swiper/swiper-bundle.css";
        export let items;
        export let sliderName;
        export let forDesktop;
        export let middle;
        export let small;
        export let height;
        export let smallSpaceBetween = 10;
        export let middleSpaceBetween = 47;
        export let bigSpaceBetween = 35;
        export let smallSpaceBreakpoint = 100;
        export let middleSpaceBreakpoint = 1000;
        export let bigSpaceBreakpoint = 1400;


        let widthForSlider;
        const breakpoints = {};
        breakpoints[smallSpaceBreakpoint] = {
            slidesPerView: small,
            slidesPerGroup: small,
            spaceBetween: smallSpaceBetween
        };
        breakpoints[middleSpaceBreakpoint] = {
            slidesPerView: middle,
            slidesPerGroup: middle,
            spaceBetween: middleSpaceBetween
        };
        breakpoints[bigSpaceBreakpoint] = {
            slidesPerView: forDesktop,
            slidesPerGroup: forDesktop,
            spaceBetween: bigSpaceBetween
        };
        onMount(async () => {
            Swiper.use([Navigation, Pagination]);
            const newSwiper = new Swiper(".swiper-container", {
                loopFillGroupWithBlank: true,
                speed: 440,
                breakpoints: breakpoints,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'fraction',
                },
            });
        })
    </script>

    <style>
        .conteiner{
            background: none;
        }
        @keyframes animatesliderButton {
            from {
                opacity:0;
            }
            to {
                opacity:1;
            }
        }
        .sliderButton {
            display: none;
        }
        @keyframes animate {
            from {
                opacity:1;
            }
            to {
                opacity:0;
            }
        }

        .swiper-pagination-bullet {
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            font-size: 12px;
            color: #000;
            opacity: 1;
            background: rgba(0, 0, 0, 0.2);
            position: absolute;
            left: 200px;
            z-index:22;
        }

        .swiper-pagination-bullet-active {
            color: #fff;
            background: #007aff;
        }
        .swiper-pagination {
            width: 41px;
            height: 26px;
            background: var(--color-dark);
            opacity: 0.6;
            border-radius: 100px;
            color:white;
            font-size: 14px;
            right: 15px;
            position: absolute;
        }
        .swiper-pagination-fraction {
            left:auto;
        }

    </style>

    <svelte:window bind:innerWidth={widthForSlider}/>
    <div class="conteiner  ">
        <div class="{sliderName} swiper-container" style="height:{height}px;">
            <div class="swiper-wrapper">
                <slot></slot>
            </div>
            <div class="swiper-pagination flex items-center justify-center"></div>
        </div>
    </div>
