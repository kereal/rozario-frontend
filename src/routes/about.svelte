<script context="module">
  export async function preload(page, session) {
    const blogRes = await this.fetch(`blog.json`)
    const blogJson = await blogRes.json()

    try {
      const res = await this.fetch(
        `index.json?city=${page.host.split(".")[0]}&path=${page.path}`
      )
      const json = await res.json()
      return {
        posts: blogJson[0],
        cityMeta: json.cityMeta
      }
    } catch (e) {
      console.log(e)
    }
  }
</script>

<script>
  import { setContext } from "svelte"
  import debounce from "lodash/debounce"
  import BlogPost from "../components/BlogPost.svelte"
  import LinkButton from "../components/LinkButton.svelte"
  import Tabbar from "../components/Tabbar.svelte"
  import Header from "../components/Header.svelte"
  import Slider from "../components/Slider.svelte"

  import { onMount } from "svelte"
  import ScrollSpy from "../utils/scrollSpy.js"
  import { mainStore } from "../stores/global.js"
  import { page } from "$app/stores"

  import Swiper, { Navigation } from "swiper"
  import "swiper/swiper-bundle.css"

  export let posts
  export let cityMeta

  const city_lat_lng = cityMeta.shop.address.coordinates
  const city_name = cityMeta.name
  let scrollSpy
  const menulist = [
    { name: "О нас", index: 0 },
    { name: "7 причин купить у нас", index: 1 },
    { name: "Карта покупателей", index: 2 },
    { name: "Наш блог", index: 3 }
  ]
  let timeoutid
  let currentMenuIndex = 0

  let AboutUsHeader
  let SevenReasonsHeader
  let MapHeader
  let BlogHeader

  let headers
  const pathlist = [
    {
      name: "Доставка цветов",
      href: "/"
    },
    {
      name: city_name,
      href: "#"
    }
  ]

  const photo_name = cityMeta.shop.about_image

  const photo = photo_name + ".png"
  const photo1_5 = photo_name + "@1.5x.png"
  const photo2 = photo_name + "@2x.png"
  const photo3 = photo_name + "@3x.png"
  const h1 = "О нас"
  const text = ""

  const leftColumnReasons = [
    {
      svg: `<svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M46.5905 28.0417C42.0238 28.0417 44.3774 28.1029 41.6486 28.1029C41.6486 28.1029 37.3551 29.0085 37.3551 22.9473C37.3551 19.0647 37.3551 20.6948 37.3551 16.4218H41.6486C44.3748 16.4218 46.5905 18.5978 46.5905 21.2764V28.0417Z" stroke="#E71F75" stroke-width="2.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18.2373 47.0005C21.2345 47.0005 23.6642 44.6134 23.6642 41.6688C23.6642 38.7243 21.2345 36.3372 18.2373 36.3372C15.2401 36.3372 12.8104 38.7243 12.8104 41.6688C12.8104 44.6134 15.2401 47.0005 18.2373 47.0005Z" stroke="#E71F75" stroke-width="2.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M35.6162 47.0005C38.6134 47.0005 41.0431 44.6134 41.0431 41.6688C41.0431 38.7243 38.6134 36.3372 35.6162 36.3372C32.619 36.3372 30.1893 38.7243 30.1893 41.6688C30.1893 44.6134 32.619 47.0005 35.6162 47.0005Z" stroke="#E71F75" stroke-width="2.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M31.4568 38.2507L30.3449 38.5443C30.4542 38.9583 30.7845 39.2773 31.202 39.3721C31.6196 39.467 32.0552 39.322 32.3327 38.9959L31.4568 38.2507ZM41.04 41.8784L39.8909 41.8332C39.8786 42.1458 39.9942 42.45 40.211 42.6755C40.4278 42.901 40.7271 43.0284 41.04 43.0284V41.8784ZM45.4397 37.034C45.4397 39.0533 43.7633 40.7284 41.6478 40.7284V43.0284C44.9898 43.0284 47.7397 40.3669 47.7397 37.034H45.4397ZM45.4397 21.4193V37.034H47.7397V21.4193H45.4397ZM41.6478 17.7223C43.7599 17.7223 45.4397 19.4018 45.4397 21.4193H47.7397C47.7397 18.0898 44.988 15.4223 41.6478 15.4223V17.7223ZM36.2362 17.7223H41.6478V15.4223H36.2362V17.7223ZM32.4494 21.4193C32.4494 19.4003 34.1256 17.7223 36.2362 17.7223V15.4223C32.8944 15.4223 30.1494 18.0913 30.1494 21.4193H32.4494ZM32.4494 37.034V21.4193H30.1494V37.034H32.4494ZM32.5687 37.957C32.491 37.663 32.4494 37.354 32.4494 37.034H30.1494C30.1494 37.5543 30.2172 38.0607 30.3449 38.5443L32.5687 37.957ZM35.6198 35.1873C33.6 35.1873 31.7877 36.0871 30.5809 37.5055L32.3327 38.9959C33.1159 38.0753 34.2949 37.4873 35.6198 37.4873V35.1873ZM42.1941 41.6689C42.1941 38.0706 39.2319 35.1873 35.6198 35.1873V37.4873C37.9992 37.4873 39.8941 39.3781 39.8941 41.6689H42.1941ZM42.1891 41.9236C42.1924 41.8391 42.1941 41.7542 42.1941 41.6689H39.8941C39.8941 41.724 39.893 41.7788 39.8909 41.8332L42.1891 41.9236ZM41.6478 40.7284H41.04V43.0284H41.6478V40.7284Z" fill="#E71F75"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M31.1893 41.6698C31.1893 39.2941 33.1545 37.3381 35.6162 37.3381C38.0779 37.3381 40.0431 39.2941 40.0431 41.6698C40.0431 44.0454 38.0779 46.0014 35.6162 46.0014C33.1545 46.0014 31.1893 44.0454 31.1893 41.6698ZM35.6162 35.3381C32.0835 35.3381 29.1893 38.1563 29.1893 41.6698C29.1893 45.1832 32.0835 48.0014 35.6162 48.0014C39.1489 48.0014 42.0431 45.1832 42.0431 41.6698C42.0431 38.1563 39.1489 35.3381 35.6162 35.3381Z" fill="#E71F75"/>
              <path d="M18.3409 11.2532H0.960083" stroke="#E71F75" stroke-width="2.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.72583 17.5849H0.960083" stroke="#E71F75" stroke-width="2.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M30.3776 21.4191C30.3776 18.2217 33.0161 15.6506 36.2365 15.6506H41.6481C44.8672 15.6506 47.5121 18.2205 47.5121 21.4191V37.0339C47.5121 40.2357 44.8691 42.7998 41.6481 42.7998H41.0402C40.7894 42.7998 40.5493 42.6977 40.3755 42.517C40.2016 42.3363 40.1089 42.0926 40.1187 41.8421C40.121 41.7847 40.1221 41.727 40.1221 41.6689C40.1221 39.2477 38.121 37.2589 35.62 37.2589C34.2265 37.2589 32.9849 37.8776 32.1596 38.8476C31.9371 39.109 31.5878 39.2253 31.2529 39.1493C30.918 39.0733 30.6531 38.8176 30.5655 38.4858C30.4427 38.021 30.3776 37.5342 30.3776 37.0339V21.4191ZM36.2365 17.4937C34.0045 17.4937 32.2219 19.2696 32.2219 21.4191V36.3868C33.205 35.7717 34.3712 35.4157 35.62 35.4157C38.8649 35.4157 41.5613 37.8227 41.9248 40.9476C44.0298 40.8085 45.6678 39.0946 45.6678 37.0339V21.4191C45.6678 19.2708 43.8813 17.4937 41.6481 17.4937H36.2365Z" fill="#E71F75"/>
              <path d="M9.66012 5.77362C9.66012 3.61928 11.445 1.84316 13.6798 1.84316H32.5131C34.7489 1.84316 36.5379 3.62275 36.5379 5.77362V15.6506H38.3822V5.77362C38.3822 2.57245 35.7348 0 32.5131 0H13.6798C10.4572 0 7.8158 2.57082 7.8158 5.77362C7.8158 6.28259 8.22866 6.6952 8.73796 6.6952C9.24725 6.6952 9.66012 6.28259 9.66012 5.77362Z" fill="#E71F75"/>
              <path d="M29.8494 41.7409C29.8494 41.4841 29.77 41.1591 29.8005 40.9107H24.414C24.4444 41.1591 24.4601 41.4122 24.4601 41.669C24.4601 42.0392 24.4275 42.4017 24.3651 42.7538H29.8494C29.7869 42.4017 29.8494 42.1112 29.8494 41.7409Z" fill="#E71F75"/>
              <path d="M7.8158 36.9879C7.8158 39.5369 9.65981 41.7403 11.9747 42.5066C11.9421 42.2496 11.9747 41.9967 11.9747 41.7307C11.9747 41.3285 11.9932 40.9066 12.0666 40.526C10.7489 39.877 9.66012 38.5085 9.66012 36.9879V22.817C9.66012 22.308 9.24725 21.8954 8.73796 21.8954C8.22866 21.8954 7.8158 22.308 7.8158 22.817V36.9879Z" fill="#E71F75"/>
            </svg>`,
      header: "Бесплатная доставка в течение 2х часов в любую точку города и области",
      text: "Мы доставим букет в течение двух часов с момента заказа или закажите доставку на любое удобное время. Мы доставляем круглосуточно. Услуга бесплатной доставки не распространяется на некоторые населенные пункты, удаленные от крупных городов."
    },
    {
      svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38.8981 27.68H21.4197" stroke="#E71F75" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M38.8981 32.0407H21.4197" stroke="#E71F75" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M38.8981 36.4014H21.4197" stroke="#E71F75" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5117 31.8856C14.5117 24.2786 21.4133 17.9339 30.1585 17.9339C38.9037 17.9339 45.8052 24.2786 45.8052 31.8856C45.8052 35.1025 44.5838 38.0744 42.511 40.4479C42.3328 40.652 42.2523 40.908 42.2656 41.1588C42.2678 41.2362 42.2791 41.3147 42.3003 41.3927L42.3057 41.3913C42.3058 41.3914 42.3058 41.3915 42.3058 41.3916C42.3004 41.3931 42.3004 41.3932 42.3004 41.3932L42.3006 41.3937L42.301 41.3951L42.302 41.399L42.3054 41.4114L42.3174 41.4537C42.3276 41.4895 42.3425 41.5404 42.3619 41.6044C42.4006 41.7325 42.4578 41.914 42.5335 42.135C42.6844 42.5758 42.9113 43.1803 43.2154 43.8346C43.4981 44.443 43.8684 45.1409 44.3346 45.7982C44.19 45.7925 44.0409 45.7845 43.8879 45.7738C42.3174 45.6639 40.4369 45.2732 38.9074 44.1739C38.8293 44.1177 38.7458 44.0744 38.6595 44.0436C38.395 43.9249 38.0812 43.9215 37.8017 44.0614C35.5453 45.1906 32.9395 45.8373 30.1585 45.8373C21.4133 45.8373 14.5117 39.4926 14.5117 31.8856ZM38.1835 46.0969C35.7726 47.2111 33.0438 47.8373 30.1585 47.8373C20.5162 47.8373 12.5117 40.7938 12.5117 31.8856C12.5117 22.9774 20.5162 15.9339 30.1585 15.9339C39.8008 15.9339 47.8052 22.9774 47.8052 31.8856C47.8052 35.4332 46.5244 38.7019 44.3757 41.3388C44.3911 41.3854 44.4078 41.4349 44.4256 41.487C44.5602 41.8799 44.7617 42.4164 45.0291 42.9917C45.5768 44.1703 46.3152 45.3209 47.175 45.8778C47.3106 45.9533 47.696 46.2182 47.696 46.7581C47.696 47.1208 47.4995 47.4551 47.1826 47.6317C46.993 47.7373 46.778 47.7765 46.5698 47.7501L46.5345 47.7519C46.4977 47.754 46.4494 47.7569 46.3926 47.7604L46.3925 47.7604C46.2679 47.768 46.1023 47.7781 45.9264 47.7866C45.391 47.8124 44.6294 47.8306 43.7482 47.7689C42.1347 47.656 40.0397 47.2699 38.1835 46.0969Z" fill="#E71F75"/>
            <path d="M9.9895 30.8046C6.29175 33.4623 1.11524 32.5674 1.11524 32.683C3.54189 31.1808 4.75144 26.7186 4.75144 26.7186" stroke="#E71F75" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.0687 30.7725C11.0598 31.2685 12.1096 31.6812 13.2064 32M4.75303 26.6917C2.40168 23.9992 0.999672 20.606 0.999672 16.9187C0.999672 8.16591 8.89961 1.07037 18.6447 1.07037C28.3897 1.07037 36.2897 8.16591 36.2897 16.9187C36.2897 17.1133 36.2858 17.3071 36.278 17.5" stroke="#E71F75" stroke-width="2" stroke-linecap="round"/>
            </svg>`,
      header: "Круглосуточная служба поддержки клиентов",
      text: "Помощь в выборе букета и написании текста открытки; время оформления заказа до его оплаты не более 7 минут; информирование на всех этапах выполнения заказ; поступление отчета о вручении букета через СМС и электронную почту."
    },
    {
      svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#quality-clip0)">
              <path d="M11 35.1601C14.5 34.4934 22.4 35.5601 26 45.1601C21.6667 45.1601 12.6 43.1601 11 35.1601Z" stroke="#E71F75" stroke-width="2" stroke-linejoin="round"/>
              <path d="M46.9892 23.7911C42.7181 23.3251 33.3239 25.3642 29.9163 37.249C35.1252 36.8338 45.8324 33.561 46.9892 23.7911Z" stroke="#E71F75" stroke-width="2" stroke-linejoin="round"/>
              <path d="M26.0975 47.4307C26.3354 47.9292 26.9323 48.1404 27.4307 47.9025C27.9292 47.6646 28.1404 47.0677 27.9025 46.5693L26.0975 47.4307ZM15.5975 25.4307L26.0975 47.4307L27.9025 46.5693L17.4025 24.5693L15.5975 25.4307Z" fill="#E71F75"/>
              <path d="M26.0115 47.1513C26.0951 47.6972 26.6053 48.072 27.1513 47.9885C27.6972 47.9049 28.072 47.3946 27.9885 46.8487L26.0115 47.1513ZM22.1595 21.9799L26.0115 47.1513L27.9885 46.8487L24.1364 21.6774L22.1595 21.9799Z" fill="#E71F75"/>
              <path d="M27.976 47.2165C27.8565 47.7557 27.3225 48.0959 26.7833 47.9763C26.2441 47.8567 25.9039 47.3227 26.0235 46.7835L27.976 47.2165ZM33.4511 22.5247L27.976 47.2165L26.0235 46.7835L31.4986 22.0917L33.4511 22.5247Z" fill="#E71F75"/>
              <path d="M4.53007 10.9601L0.871756 11.2732C0.871756 11.2732 2.17559 17.6126 4.21698 21.148C4.72085 22.0207 5.29956 22.8406 5.94756 23.5646M4.53007 10.9601L5.41005 6.87187L9.33386 8.18665M4.53007 10.9601L7.77421 10.9667M9.33386 8.18665L11.5684 5.09746C11.5684 5.09746 16.6113 9.54828 18.6079 13.3272C20.8336 17.5398 21.1141 22.348 16.0374 25.279C11.8759 27.6817 8.41104 26.3169 5.94756 23.5646M9.33386 8.18665C8.85863 8.94178 8.31357 9.89611 7.77421 10.9667M5.94756 23.5646C3.79919 20.6608 5.74635 14.992 7.77421 10.9667" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16.6998 4.71443L13.0956 4.01386C13.0956 4.01386 13.0262 4.94257 12.9945 6.31151M16.6998 4.71443L18.6655 1.02334L22.0794 3.36222M16.6998 4.71443L19.8182 5.60902M22.0794 3.36222L25.0743 1.00288C25.0743 1.00288 28.7059 6.66437 29.5915 10.8455C30.5788 15.5066 29.5321 20.2078 23.8469 21.6369C22.3272 22.0189 20.9884 22.0358 19.8182 21.77M22.0794 3.36222C21.4156 3.95837 20.63 4.727 19.8182 5.60902M19.8182 5.60902C18.6481 6.88015 17.4233 8.38679 16.4293 9.95205" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M34.6809 3.35525L31.8371 1.03275C31.8371 1.03275 30.0614 3.81935 28.6841 6.85459M34.6809 3.35525L38.1591 1.03351L40.0601 4.70927M34.6809 3.35525L37.0049 5.6188M40.0601 4.70927L43.8149 4.04776C43.8149 4.04776 44.3356 10.7537 43.1375 14.8563C41.802 19.4297 38.6554 23.0762 32.9708 21.6453C30.945 21.1354 29.5095 20.2061 28.546 19.0152M40.0601 4.70927C39.1932 4.92039 38.1375 5.22588 37.0049 5.6188M37.0049 5.6188C34.5254 6.47899 31.6776 7.75819 29.6363 9.38359" stroke="#E71F75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <clipPath id="quality-clip0">
              <rect width="48" height="48" fill="white"/>
              </clipPath>
              </defs>
            </svg>`,
      header: "Высокое качество цветов",
      text: "Мы делаем все возможное для создания наиболее комфортных условий для наших заказчиков и получателей. Наши флористы всегда делают букеты только из свежих цветов, это подтверждается фотографиями в момент вручения букетов и перед доставкой. Мы даем 100% гарантию качества цветов. Для нас всегда важно оставить довольным каждого покупателя."
    }
  ]
  const rightColumnReasons = [
    {
      svg: `<svg width="48" height="50" viewBox="0 0 48 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.85 19.9124C43.85 22.0012 41.9945 23.85 39.5089 23.85H8.49115C6.01449 23.85 4.15 22.0095 4.15 19.9124V5.0876C4.15 2.99875 6.00555 1.15 8.49115 1.15H39.5089C41.9945 1.15 43.85 2.99876 43.85 5.0876V19.9124Z" stroke="#E71F75" stroke-width="2.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 6H9" stroke="#E71F75" stroke-width="2.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 47.9086L23.2758 24.0003" stroke="#E71F75" stroke-width="2.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M41.9866 47.9083L23.7217 24" stroke="#E71F75" stroke-width="2.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M23.7217 48V24" stroke="#E71F75" stroke-width="2.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M28.4218 13.4946C28.4218 15.9843 26.4059 18 23.9273 18C21.4378 18 19.4218 15.9843 19.4218 13.4946C19.4218 11.0161 21.4378 9.00004 23.9273 9.00004C26.4059 8.98903 28.4218 11.005 28.4218 13.4946Z" stroke="#E71F75" stroke-width="2.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
      header: "Фото момента вручения букета",
      text: "Мы бесплатно сделаем фото получателя с букетом в момент вручения и пришлем вам на электронную почту.\n"
    },
    {
      svg: `<svg width="46" height="49" viewBox="0 0 46 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9L23 14.1351V47L1 41.8649V9Z" stroke="#E71F75" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M44 9L23 14.1351V47L44 41.8649V9Z" stroke="#E71F75" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M38 20L29 23" stroke="#E71F75" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M38 28L29 30" stroke="#E71F75" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.1914 5.93746C15.228 9.97316 23 13 23 13L22.9999 3.41513C22.9999 3.41513 19.8909 -0.172182 16.264 1.39726C13.5031 2.59194 13.9322 4.92853 14.1914 5.93746Z" stroke="#E71F75" stroke-width="2.3"/>
            <path d="M31.8086 5.93746C30.772 9.97316 23 13 23 13L23.0001 3.41513C23.0001 3.41513 26.1091 -0.172182 29.736 1.39726C32.4969 2.59194 32.0678 4.92853 31.8086 5.93746Z" stroke="#E71F75" stroke-width="2.3"/>
            </svg>`,
      header: "Открытка в подарок",
      text: "Мы бесплатно дополним букет красивой открыткой, в которой вы можете написать любое ваше поздравление или послание.\n"
    },
    {
      svg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.3414 47C14.0181 47 13.0001 45.8542 13.0001 44.3646V27.6354C13.0001 26.1458 14.0181 25 15.3414 25H44.6588C45.9822 25 47.0001 26.1458 47.0001 27.6354V44.3646C47.0001 45.8542 45.9822 47 44.6588 47H15.3414V47Z" stroke="#E71F75" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.3536 34.145C11.1729 34.7427 9.74716 34.1802 9.07438 32.8512L1.51855 17.9255C0.84577 16.5966 1.23647 15.1145 2.41715 14.5168L28.5739 1.2754C29.7546 0.677704 31.1803 1.24024 31.8531 2.56923L39.4089 17.4949C40.0817 18.8239 39.691 20.3059 38.5103 20.9036L32.6261 23.8824L31.155 24.6271L30.4195 24.9995" stroke="#E71F75" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M41.7101 42.9999H37.4781" stroke="#E71F75" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M28.9036 7.77129L24.0333 10.0977" stroke="#E71F75" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="13.1442" y="30.7031" width="33.856" height="1.058" stroke="#E71F75" stroke-width="2"/>
            </svg>`,
      header: "Удобные способы оплаты",
      text: "Мы принимаем заказы от клиентов со всего мир. Оплатить заказ можно любым удобным для вас способом. Все способы оплаты здесь (активная ссылка на страницу Оплаты)\n"
    },
    {
      svg: `<svg width="36" height="49" viewBox="0 0 36 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.0026 47C18.0026 47 1.38892 42.457 1.38892 31.41C1.38892 20.3631 1.38892 7.87427 1.38892 7.87427C1.38892 7.37062 1.59305 6.91555 1.9202 6.58575C2.24473 6.25596 14.9667 1.15305 18.0026 1.15305C21.0307 1.15305 33.7475 6.25596 34.0799 6.58575C34.4096 6.91555 34.6111 7.37062 34.6111 7.87427C34.6111 7.87427 34.6111 21.4727 34.6111 31.41C34.6111 43.0859 18.0026 47 18.0026 47Z" stroke="#E71F75" stroke-width="2.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.447 23.1857L16.3121 29.4779L26.2494 19.1687" stroke="#E71F75" stroke-width="2.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
      header: "Покупка без риска",
      text: "В момент оформления заказа вы заключаете с нами договор публичной оферты, который мы гарантированно исполняем. Это одна из причин доверять нам, как доверили уже более 1 000 000 покупателей"
    }
  ]

  let containerElement

  function goToHeader(e) {
    setTimeout(() => {
      const index = parseInt(e.detail.header)
      if (timeoutid) {
        clearTimeout(timeoutid)
      }
      scrollSpy.unblock()
      scrollSpy.block()
      window.scroll({
        top: scrollSpy._offsets[index] + 10,
        left: 0,
        behavior: "smooth"
      })
      timeoutid = setTimeout(() => {
        scrollSpy.unblock()
      }, 1000)
    })
  }

  onMount(() => {
    headers = [AboutUsHeader, SevenReasonsHeader, MapHeader, BlogHeader]
    scrollSpy = new ScrollSpy(window, headers)
    const setIndex = (e) => {
      currentMenuIndex = e.detail.index
    }
    window.addEventListener("scrollspy-activate", setIndex)

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2
    }

    const images = document.querySelectorAll("img[data-src]")

    function callback(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(callback, options)

    Array.from(images).forEach((image) => observer.observe(image))

    $mainStore.address.city = cityMeta
    if (ymaps) {
      function loadMap(coords) {
        console.log(coords)
        ymaps.ready(init)
        function init() {
          var map = new ymaps.Map("map", {
            center: coords,
            zoom: 5
          })

          // fake markers
          var markers = [
            coords,
            [coords[0] + 0.005, coords[1] + 0.005],
            [coords[0] - 0.005, coords[1] - 0.005],
            [coords[0] - 0.005, coords[1] + 0.005],
            [coords[0] + 0.005, coords[1] - 0.005]
          ]
          markers.forEach((markerCoords) => {
            var marker = new ymaps.Placemark(
              markerCoords,
              {},
              {
                iconLayout: "default#image",
                iconImageHref: "mapMarker.png",
                iconImageSize: [32, 32],
                iconImageOffset: [-5, -38]
              }
            )
            map.geoObjects.add(marker)
          })
        }
      }

      loadMap(city_lat_lng)

      var resizeTimer
      window.addEventListener("resize", function () {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(function () {
          console.log("resized")
          document.getElementById("map").innerHTML = ""
          loadMap(city_lat_lng)
        }, 250)
      })
    }

    return () => {
      scrollSpy.destroy()
      window.removeEventListener("scrollspy-activate", setIndex)
      clearTimeout(timeoutid)
      images.forEach((image) => observer.unobserve(image))
      observer.disconnect()
    }
  })
</script>

<svelte:window
  on:resize={debounce(() => {
    scrollSpy.refresh()
  }, 100)}
/>

<svelte:head>
  <title>О нас</title>
  <meta name="description" content="CONTACTS_DESCRIPTION" />

  <link rel="canonical" href={$page.host + $page.path} />

  <link
    rel="alternate"
    href={$page.host + $page.path}
    type="text/html"
    hreflang="ru"
    title="Русский"
  />
  <link
    rel="alternate"
    href={$page.host + $page.path}
    type="text/html"
    hreflang="en"
    title="English"
  />

  <meta
    name="keywords"
    content="Доставка цветов в Мурманске, Цветы с доставкой в Мурманске,
    Заказать цветы с доставкой в Мурманске, "
  />

  <meta name="geo.region" content="" />
  <meta name="geo.position" content="" />
  <meta name="geo.placename" content="" />
  <meta name="ICBM" content="" />
  <meta name="referrer" content="always" />

  <meta
    property="og:title"
    content="Надежная доставка цветов в Мурманске — Розарио.Цветы"
  />
  <meta
    property="og:description"
    content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в
    Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или
    банковской картой."
  />
  <meta property="og:image" content="ruka3.jpg" />
  <meta property="og:url" content="url" />
  <meta property="og:site_name" content="Розарио.Цветы" />
  <meta property="og:type" content="website" />

  <meta
    name="twitter:title"
    content="Надежная доставка цветов в Мурманске — Розарио.Цветы"
  />
  <meta
    name="twitter:description"
    content="Мы предлагаем надежный сервис доставки цветов к любому торжеству в
    Мурманске. Оформить доставку цветов можно на сайте. Оплатить — наличными или
    банковской картой."
  />
  <meta name="twitter:image" content="ruka3.jpg" />
  <meta name="twitter:image:alt" content="Розарио.Цветы" />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<div id="about-us-page">
  <div class="header">
    <Header {pathlist} {h1} {text} {photo} {photo1_5} {photo2} {photo3} />
  </div>
  <div class="blog-body">
    <Tabbar
      pos="top: 5rem;"
      className="sticky"
      on:change={goToHeader}
      {currentMenuIndex}
      {menulist}
    />
    <div class="page-content" bind:this={containerElement}>
      <h2 data-scrollspy bind:this={AboutUsHeader}>О нас</h2>

      <div class="about-wrapper">
        <div class="about-info">
          <p>
            «Розарио» – это команда профессионалов с большим опытом работы во флористике.
            Мы предлагаем услуги по доставке цветов с 2011 года. Ежегодно наши флористы с
            любовью и заботой разрабатывают новые коллекции букетов, которые представлены
            к вашему вниманию. Все букеты тщательно подобраны по цветовой гамме.
          </p>
          <div class="time-n-experience">
            <div>
              <div>работаем с</div>
              <div><strong>2011</strong> <span> года</span></div>
            </div>
            <div>
              <div>доставили более</div>
              <div><strong>1 000 000</strong> <span> букетов</span></div>
            </div>
          </div>
          <p>
            Наши профессиональные консультанты индивидуально подходят к каждому заказу,
            помогают подобрать самый лучший вариант букета и подарка. Ими написаны
            километры поздравлений, отправлено уже более 1 000 000 фотографий счастливых
            улыбок получателей. Заказать букет цветов – проще простого! Время оформления
            заказа до его оплаты не более 7 минут.
          </p>
          <p>
            Расстояние не должно стать преградой для любви и уважения, поэтому мы готовы
            доставить букет в течении двух часов в любую точку города и области! Доставка
            по городу бесплатно и открытка в подарок. Мы всегда найдем способ вручить
            букет цветов, где бы ни были ваши близкие. Доставим цветы в любое удобное
            место – на дом, в отель или офис.
          </p>
        </div>
        <img data-src="/about/content.png" alt="" />
      </div>

      <h2 data-scrollspy bind:this={SevenReasonsHeader}>7 причин купить у нас</h2>
      <div class="seven-reasons">
        <ul>
          {#each leftColumnReasons as reason}
            <li>
              <div class="svg">
                {@html reason.svg}
              </div>
              <div>
                <h3>{reason.header}</h3>
                <p>{reason.text}</p>
              </div>
            </li>
          {/each}
        </ul>
        <ul>
          {#each rightColumnReasons as reason}
            <li>
              <div class="svg">
                {@html reason.svg}
              </div>
              <div>
                <h3>{reason.header}</h3>
                <p>{reason.text}</p>
              </div>
            </li>
          {/each}
        </ul>
      </div>
      <h2 data-scrollspy bind:this={MapHeader}>Карта покупателей</h2>
      <p>Более 1 000 000 счастливых покупателей по всей России. Станьте одним из них!</p>
      <div id="map" class="w-full h-full" />

      <h2 data-scrollspy bind:this={BlogHeader}>Наш блог</h2>
      <p>Статьи о цветах и подарках, а также новости и акции в Розарио.Цветы</p>
      <Slider
        small="3"
        middle="4"
        forDesktop="4"
        smallSpaceBetween="0"
        middleSpaceBetween="0"
        bigSpaceBetween="6"
        middleSpaceBreakpoint="1200"
        bigSpaceBreakpoint="1300"
      >
        {#each posts["last-posts"] as blogpost, i}
          <div class="swiper-slide">
            <BlogPost group={"last-posts"} {blogpost} />
          </div>
        {/each}
      </Slider>
      <LinkButton href="/#mainCollection" className="map-button"
        >Перейти в каталог</LinkButton
      >
    </div>
  </div>
</div>

<style>
  #about-us-page {
    min-height: calc(100vh - 5.5rem - 10px);
    display: flex;
    flex-direction: column;
  }
  .blog-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .swiper-slide {
    padding: 14px 20px 20px;
  }
  .swiper-slide :global(.blog-post-card) {
    margin: 0;
    width: auto;
  }

  .header.header :global(.header p) {
    border-style: none;
    padding: 0;
    margin-top: 119px;
  }
  .header.header :global(.header) {
    min-height: 332px;
  }
  .header.header :global(.header::before) {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.42) 47.27%,
      #000000 100%
    );
  }
  .page-content {
    flex-grow: 1;
    padding: 0 80px 34px;
    margin-bottom: 10px;
    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%), #f2f2f2;
    border: 1px solid #e9e9e9;
    border-top: none;
    border-radius: 0 0 4px 4px;
  }
  h2 {
    padding-top: 48px;
    margin-bottom: 18px;

    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 135%;

    color: var(--color-main);
  }
  p {
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 130%;

    color: var(--color-main);
  }
  .about-info {
    margin-right: 80px;
    min-width: 494px;
  }
  .time-n-experience,
  .about-wrapper {
    display: flex;
  }
  .about-wrapper {
    padding-bottom: 32px;
  }
  .about-wrapper img {
    width: 545px;
    object-fit: cover;
    flex-shrink: 0;
  }
  .time-n-experience {
    margin: 30px 0 24px;
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 130%;
    color: var(--color-main);
  }
  .time-n-experience > div:first-child {
    margin-right: 120px;
  }
  .time-n-experience > div > div:last-child {
    display: flex;
    align-items: baseline;
  }
  .time-n-experience strong {
    font-weight: normal;
    font-size: 48px;
    line-height: 135%;
  }
  .time-n-experience span {
    font-size: 14px;
    line-height: 135%;
    color: var(--gray-600);
    margin-left: 6px;
  }
  .time-n-experience + p {
    margin-bottom: 18px;
  }
  .seven-reasons {
    display: flex;
    margin-top: 30px;
    margin-bottom: 35px;
  }
  .seven-reasons ul {
    flex-grow: 1;
    flex-basis: 50%;
  }
  .seven-reasons ul:first-child {
    margin-right: 148px;
  }
  .seven-reasons ul li:not(:last-child) {
    margin-bottom: 48px;
  }
  .seven-reasons ul li {
    display: flex;
  }
  .seven-reasons ul li .svg {
    flex-shrink: 0;
    width: 66px;
  }
  .seven-reasons ul li h3 {
    font-weight: normal;
    font-size: 16px;
    line-height: 130%;
    color: var(--color-main);
    margin-bottom: 12px;
  }
  .seven-reasons ul li p {
    font-size: 14px;
    line-height: 135%;
    color: var(--gray-600);
  }
  #map {
    height: 607px;
    margin-bottom: 32px;
    margin-top: 34px;
  }
  .page-content :global(.map-button) {
    font-size: 16px;
    padding: 12px 12px 11px;
    width: 100%;
    line-height: 135%;
  }
  .page-content :global(.conteiner) {
    margin: 20px -20px 60px -20px;
  }
  .page-content :global(.swiper-button-next) {
    right: -46px;
  }
  .page-content :global(.swiper-button-prev) {
    left: -46px;
  }
  .prev {
    margin-right: 4px;
  }
  .next {
    margin-left: 4px;
  }

  .prev :global(button),
  .next :global(button) {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-accent);
    flex-shrink: 0;
    transition: opacity 0.5s;
    position: relative;
    z-index: 3;
  }
  .blog-body :global(nav) {
    padding-left: 5rem;
    padding-right: 5rem;
  }
  @media screen and (max-width: 1430px) {
    .time-n-experience > div:first-child {
      margin-right: 70px;
    }
  }
  @media screen and (max-width: 1380px) {
    .about-wrapper img {
      width: auto;
      flex-shrink: 1;
      min-width: 0;
    }
    .about-info {
      width: 494px;
      flex-shrink: 0;
    }
  }
  @media screen and (max-width: 1300px) {
    .seven-reasons ul:first-child {
      margin-right: 80px;
    }
    .swiper-slide :global(.blog-post-card) {
      width: auto;
      max-width: initial;
    }
  }
  @media (min-width: 1280px) {
    .blog-body :global(nav) {
      padding-left: 5rem;
      padding-right: 5rem;
    }
  }
  @media (max-width: 1200px) {
    .swiper-slide {
      padding: 14px 15px 20px;
    }
    .page-content :global(.conteiner) {
      margin: 20px -15px 60px;
    }
  }
  @media screen and (max-width: 1150px) {
    .about-info {
      width: 100%;
    }
    .about-wrapper {
      flex-direction: column;
      padding-bottom: 28px;
    }
    .about-wrapper img {
      width: 545px;
      height: 472px;
      margin-top: 30px;
    }
    .about-info {
      margin-right: 0;
    }
  }
  @media screen and (max-width: 1000px) {
    h2 {
      padding-top: 40px;
      margin-bottom: 16px;
    }
    .seven-reasons ul:first-child {
      margin-right: 70px;
    }
    .time-n-experience {
      margin: 24px 0 18px;
    }
    .time-n-experience + p {
      margin-bottom: 16px;
    }
    .time-n-experience > div:first-child {
      margin-right: 68px;
    }
    .seven-reasons ul:first-child {
      margin-right: 67px;
    }
    .seven-reasons {
      margin-bottom: 28px;
    }
    .page-content {
      flex-grow: 1;
      padding: 0 80px 30px;
    }
    #map {
      margin-bottom: 28px;
      margin-top: 30px;
    }
    .page-content :global(.conteiner) {
      margin-top: 16px;
      margin-bottom: 46px;
    }
    .swiper-slide {
      padding: 14px 14px 20px;
    }
    .page-content :global(.conteiner) {
      margin: 16px -15px 46px;
    }
    .swiper-slide :global(.blog-post-card) {
      width: auto;
      max-width: initial;
    }
  }
</style>
