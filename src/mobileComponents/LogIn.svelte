<script>
    import Button from './Button.svelte'
    import Popup from './Popup.svelte'
    import { imask } from 'svelte-imask';
    import { countryCodes } from "../data/countryCodes.js";

    let selectedCountry = countryCodes.find(country => country.code === "RU");

    console.log(countryCodes)

    export let user;
    export const trueCode = '1234'
    export let visible;
    export let autorized;

    let tel = true ;
    export let phone = ''
    export let email = ''
    let errorValue = false;
    let openChooseCode = false;

    let placeholder = ''

    const phoneNumberOptions = {
        mask: "000 000 00 00 00"
    }

    function changeMethod() {
        tel = !tel
        placeholder = ''
        phone = ''
        email = ''
    }
    function closeLogIn() {
        visible = !visible;
    }
    function validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    let time = 15
    function startTimer() {
        setTimeout(()=> {
            if (time != 0) {
                time--
                startTimer()
            }
        }, 1000)
    }
    function sentAgain(){
        time = 15
        startTimer()
    }
    function checkEmail() {
        if(email == '') {
            placeholder = 'Укажите e-mail'
            errorValue = true
        } else if (validateEmail(email)) {
            sentCode = true
            startTimer()
        } else {
            errorValue = true
            placeholder = email + ' — Некорректный e-mail '
            email = ''
        }
    }
    function checkPhone() {
        if(phone == '') {
            placeholder = 'Введите телефон'
            errorValue = true
        } else if (phone.length == 13) {
            sentCode = true
            startTimer()
        } else {
            errorValue = true
            placeholder = phone + ' — Некорректный телефон '
            phone = ''
        }
    }
    function chooseCountry() {
        openChooseCode = !openChooseCode
    }

    let errorCode = false;
    let sentCode = false
    let code;
    let placeholderCode = 'Введите код из смс'

    $: if(email) {
        errorValue = true;
    }
    $: if(code) {
        if(code.length == 4 && code != trueCode) {
            placeholderCode = code + ' — неверный код подтверждения'
            code = ''
            errorCode = true
            document.getElementById('mobileCodeInput').blur()
        } else if (code.length == 4 && code == trueCode) {
            document.body.style.overflow = 'scroll'
            errorCode = false
            user = true
            visible = false;
            autorized = false;
        }
    }
</script>

<style>
    .logIn {
        width: 100%;
        height: 100vh;
        position: absolute;
        z-index: 999;
        background-color: #fff;
        left:0;
        top: 0;
        padding: 16px;
    }
    .header {
        height: 62px;
        border-bottom: 1px solid var(--gray-300);
        margin: -16px -16px 0 -16px;
        padding-left: 16px;
    }
    h2 {
        font-weight: 600;
        font-size: 15px;
        text-align: center;
        color: var(--color-main);
        margin-top: 24px;
    }
    .verificationText {
        font-size: 14px;
        text-align: center;
        color: var(--color-main);
        margin-top: 12px;
        line-height: 135%;
    }
    .rules {
        margin-top: 12px;
        font-size: 11px;
        text-align: center;
        color: var(--gray-700);
    }
    .rules a{
        text-decoration: underline;
    }
    .method {
        width: 100%;
        text-align: center;
        font-size: 15px;
        color: #1039C9;
        margin-top: 24px;
    }
    .dataInput {
        margin-top: 18px;
        margin-bottom: 36px;
    }
    .chooseCode {
        min-width: 94px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--gray-1000);
        border-radius:0;
        -webkit-border-radius:0;
        -moz-border-radius:0;
    }

   .dataInput input {
        border:none;
        background: transparent;
        font-size: 15px;
        color: var(--color-main);
        width: 100%;
        padding-bottom: 12px;
       border-bottom: 2px solid var(--color-info);
       border-radius:0;
       -webkit-border-radius:0;
       -moz-border-radius:0;
    }

   .dataInput input:active, :focus {
        outline: 0;
        outline-offset: 0;
    }

   .dataInput input::-webkit-input-placeholder {
        color: var(--gray-600);
       text-align: center;
    }
   .dataInput input::-moz-placeholder {
        color: var(--gray-600);
       text-align: center;
    }
    .errorValue {
        margin-top: 18px;
        margin-bottom: 36px;
    }
    .errorValue input {
        border:none;
        background: transparent;
        font-size: 15px;
        color: var(--color-main);
        width: 100%;
        padding-bottom: 12px;
        border-bottom: 2px solid red;
        border-radius:0;
        -webkit-border-radius:0;
        -moz-border-radius:0;
    }

    .errorValue input:active, :focus {
        outline: 0;
        outline-offset: 0;

    }

    .errorValue input::-webkit-input-placeholder {
        color: red;
    }
    .errorValue input::-moz-placeholder {
        color: red;
    }
    button:focus{
        outline: none;
    }

    .custom-radio input {
        display: none;
    }

    [type="radio"]:checked + label {
        color: var(--color-main);

    }
    [type="radio"] + label {
        font-size: 14px;
        color: var(--color-main);
        margin-top: 20px;
    }
</style>


<div class="logIn">
    <div class="header flex items-center ">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class="mr-30" on:click={closeLogIn}>
            <path d="M1 1L15 15M15 1L1 15" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="195" height="26" viewBox="0 0 195 26" fill="none">
            <path d="M96.6755 14.162C96.6755 16.2051 96.1407 17.7989 95.0719 18.945C94.0032 20.0912 92.5145 20.6634 90.6078 20.6634C89.4157 20.6634 88.362 20.3994 87.4468 19.8725C86.5315 19.3446 85.8282 18.587 85.3357 17.5995C84.8432 16.6121 84.5975 15.4659 84.5975 14.162C84.5975 12.1345 85.1285 10.5518 86.1897 9.41301C87.2509 8.27423 88.7471 7.70483 90.6774 7.70483C92.523 7.70483 93.9844 8.28715 95.0606 9.4527C96.1378 10.6173 96.6755 12.1871 96.6755 14.162ZM87.3893 14.162C87.3893 17.0495 88.4778 18.4919 90.6539 18.4919C92.8074 18.4919 93.8846 17.0495 93.8846 14.162C93.8846 11.3048 92.7998 9.8772 90.6313 9.8772C89.4929 9.8772 88.6681 10.2454 88.1568 10.9837C87.6445 11.7229 87.3893 12.7832 87.3893 14.162Z" fill="#330033"/>
            <path d="M71.9652 7.93208V14.3421C71.9652 15.0887 71.904 16.185 71.7807 17.6321L78.1827 7.93115H81.4943V20.4357H78.887V14.1391C78.887 13.7921 78.9077 13.231 78.9501 12.4549C78.9925 11.6779 79.0283 11.1131 79.0593 10.7587L72.6799 20.4366H69.3683V7.93208H71.9652Z" fill="#330033"/>
            <path d="M61.121 20.6634C59.5061 20.6634 58.2519 20.0949 57.3602 18.9561H57.1992C57.3065 20.0119 57.3602 20.6514 57.3602 20.8775V26.0002H54.6493V7.93278H56.8414C56.9026 8.16533 57.0297 8.72365 57.2218 9.60496H57.3602C58.2058 8.33883 59.475 7.70483 61.1671 7.70483C62.7594 7.70483 63.9995 8.27054 64.8874 9.40102C65.7753 10.5324 66.2198 12.1188 66.2198 14.161C66.2198 16.2042 65.7678 17.798 64.8648 18.9441C63.9609 20.0903 62.7132 20.6634 61.121 20.6634ZM60.4637 9.8772C59.3865 9.8772 58.6003 10.1854 58.1041 10.8037C57.6078 11.422 57.3602 12.4095 57.3602 13.7661V14.162C57.3602 15.6846 57.6059 16.7874 58.0984 17.4694C58.5899 18.1514 59.3941 18.4919 60.5099 18.4919C61.4487 18.4919 62.1709 18.1154 62.6784 17.3614C63.1859 16.6075 63.4402 15.5333 63.4402 14.1389C63.4402 12.7371 63.1878 11.6758 62.685 10.9569C62.1803 10.2371 61.4402 9.8772 60.4637 9.8772Z" fill="#330033"/>
            <path d="M48.9261 20.4366L48.3837 18.6952H48.2915C47.6757 19.4565 47.057 19.9752 46.4337 20.2502C45.8103 20.5252 45.0109 20.6627 44.0345 20.6627C42.7802 20.6627 41.8019 20.3314 41.0985 19.6679C40.3951 19.0044 40.043 18.0667 40.043 16.8523C40.043 15.564 40.5317 14.5913 41.5081 13.9352C42.4846 13.28 43.9732 12.921 45.9723 12.8619L48.1756 12.7936V12.1264C48.1756 11.3282 47.9854 10.7292 47.605 10.3352C47.2246 9.93836 46.6342 9.73994 45.8339 9.73994C45.1804 9.73994 44.5533 9.83592 43.9535 10.0233C43.3537 10.2124 42.7765 10.4339 42.2237 10.6905L41.3471 8.79126C42.0392 8.43689 42.7962 8.16742 43.6201 7.98285C44.4431 7.79828 45.2199 7.70508 45.9506 7.70508C47.573 7.70508 48.7981 8.05299 49.6248 8.74512C50.4515 9.4391 50.8649 10.529 50.8649 12.0129V20.4366H48.9261ZM44.8885 18.6278C45.8725 18.6278 46.6625 18.3584 47.2595 17.8194C47.8555 17.2805 48.154 16.5247 48.154 15.552V14.4667L46.5156 14.5341C45.2388 14.5793 44.3103 14.7879 43.7294 15.1616C43.1484 15.5354 42.8584 16.1057 42.8584 16.8744C42.8584 17.4318 43.0269 17.8637 43.3659 18.1692C43.7039 18.4746 44.2115 18.6278 44.8885 18.6278Z" fill="#330033"/>
            <path d="M30.5529 12.929C31.7911 12.929 32.7026 12.7952 33.2864 12.5276C33.8702 12.26 34.1631 11.8475 34.1631 11.2901C34.1631 10.2713 33.2403 9.76369 31.3947 9.76369C30.164 9.76369 28.907 10.035 27.6226 10.5776L26.746 8.59907C28.23 8.00291 29.8684 7.70483 31.6603 7.70483C33.2441 7.70483 34.4747 7.98999 35.3514 8.55939C36.228 9.12878 36.6659 9.94365 36.6659 11.0068C36.6659 12.4095 35.8467 13.3286 34.2092 13.7651V13.8565C35.2318 14.1269 35.9644 14.5154 36.4069 15.0211C36.8485 15.5259 37.0698 16.1516 37.0698 16.8973C37.0698 18.0434 36.5566 18.957 35.5303 19.6399C34.5039 20.3228 33.0708 20.6625 31.2328 20.6625C29.2253 20.6625 27.6914 20.4022 26.6302 19.8817V17.5866C28.0379 18.2354 29.4946 18.5593 31.0021 18.5593C32.0868 18.5593 32.923 18.4107 33.5115 18.1136C34.1 17.8164 34.3938 17.3624 34.3938 16.7505C34.3938 16.1248 34.0981 15.6653 33.5058 15.3709C32.9135 15.0774 31.9983 14.9298 30.7601 14.9298H29.2027V12.9281H30.5529V12.929Z" fill="#330033"/>
            <path d="M24.6226 14.1615C24.6226 16.2046 24.0877 17.7984 23.019 18.9446C21.9503 20.0907 20.4616 20.6629 18.5548 20.6629C17.3628 20.6629 16.3091 20.399 15.3939 19.872C14.4786 19.3441 13.7752 18.5865 13.2828 17.5991C12.7903 16.6116 12.5446 15.4654 12.5446 14.1615C12.5446 12.134 13.0756 10.5513 14.1368 9.41253C15.198 8.27374 16.6942 7.70435 18.6245 7.70435C20.4701 7.70435 21.9315 8.28666 23.0077 9.45221C24.084 10.6168 24.6226 12.1866 24.6226 14.1615ZM15.3355 14.1615C15.3355 17.049 16.424 18.4914 18.6 18.4914C20.7535 18.4914 21.8307 17.049 21.8307 14.1615C21.8307 11.3044 20.746 9.87671 18.5774 9.87671C17.439 9.87671 16.6142 10.2449 16.1029 10.9832C15.5916 11.7224 15.3355 12.7827 15.3355 14.1615Z" fill="#330033"/>
            <path d="M11.1665 8.90368C11.1665 10.6303 10.5903 11.9537 9.43681 12.8728C8.2824 13.792 6.64117 14.2515 4.51031 14.2515H2.75703V20.4364H0V3.90649H4.85682C6.96414 3.90649 8.54322 4.32916 9.59218 5.17263C10.6421 6.01703 11.1665 7.26102 11.1665 8.90368ZM2.75703 11.9795H4.22218C5.63742 11.9795 6.67507 11.7377 7.33702 11.256C7.99803 10.7734 8.32948 10.0194 8.32948 8.99412C8.32948 8.04544 8.03381 7.3367 7.44154 6.86882C6.84927 6.40186 5.92649 6.16746 4.67321 6.16746H2.75703V11.9795Z" fill="#330033"/>
            <path d="M182.783 13.1664H186.232C187.839 13.1664 189.029 13.4581 189.802 14.0422C190.574 14.6273 190.961 15.4994 190.961 16.6603C190.961 17.9043 190.551 18.8438 189.732 19.4815C188.913 20.1182 187.708 20.4366 186.115 20.4366H180.866V8.04468H182.782V13.1664H182.783ZM182.783 14.7833V18.865H186.024C188.054 18.865 189.069 18.1682 189.069 16.7729C189.069 16.0799 188.834 15.5741 188.365 15.2576C187.896 14.9411 187.096 14.7823 185.965 14.7823H182.783V14.7833ZM195 20.4366H193.085V8.04468H195V20.4366Z" fill="#330033"/>
            <path d="M178.363 9.6495H174.257V20.4357H172.342V9.6495H168.281V8.04468H178.364V9.6495H178.363Z" fill="#330033"/>
            <path d="M161.924 20.663C160.055 20.663 158.579 20.1056 157.499 18.9899C156.419 17.8742 155.879 16.3257 155.879 14.3434C155.879 12.3454 156.381 10.7591 157.384 9.58337C158.388 8.40767 159.736 7.81982 161.428 7.81982C163.012 7.81982 164.267 8.33016 165.188 9.35174C166.111 10.3733 166.574 11.7198 166.574 13.3938V14.5806H157.864C157.901 16.0359 158.276 17.1396 158.988 17.8936C159.699 18.6475 160.701 19.025 161.993 19.025C163.353 19.025 164.7 18.7453 166.03 18.1879V19.8611C165.353 20.1481 164.714 20.3529 164.109 20.4775C163.505 20.6021 162.777 20.663 161.924 20.663ZM161.404 9.3905C160.389 9.3905 159.579 9.71534 158.976 10.3623C158.372 11.011 158.016 11.9089 157.909 13.0533H164.52C164.52 11.8711 164.251 10.9639 163.712 10.3355C163.173 9.70519 162.403 9.3905 161.404 9.3905Z" fill="#330033"/>
            <path d="M153.398 11.1537C153.398 11.9603 153.162 12.5731 152.689 12.9911C152.215 13.4092 151.553 13.6906 150.699 13.8327V13.9343C151.776 14.0773 152.563 14.3864 153.058 14.8617C153.554 15.337 153.802 15.9931 153.802 16.8292C153.802 17.9828 153.37 18.8724 152.505 19.4981C151.639 20.1237 150.376 20.4366 148.716 20.4366H143.143V8.04468H148.693C151.829 8.04468 153.398 9.08103 153.398 11.1537ZM151.53 11.3355C151.53 10.732 151.294 10.3047 150.82 10.0519C150.347 9.79992 149.63 9.67349 148.668 9.67349H145.058V13.1664H148.299C149.484 13.1664 150.319 13.0243 150.802 12.7373C151.287 12.4512 151.53 11.9834 151.53 11.3355ZM151.887 16.7055C151.887 16.0346 151.627 15.5465 151.108 15.241C150.588 14.9355 149.73 14.7833 148.53 14.7833H145.057V18.865H148.575C150.783 18.865 151.887 18.1452 151.887 16.7055Z" fill="#330033"/>
            <path d="M138.608 18.695H140.592V24.7443H138.734V20.4364H126.021V3.90649H127.982V18.695H136.646V3.90649H138.607V18.695H138.608Z" fill="#330033"/>
            <path d="M118.487 3.12105L118.045 1.78939L116.769 2.40585C115.939 2.80636 115.152 3.2078 114.403 3.612C113.759 2.78329 113.053 1.93243 112.28 1.05758L111.347 0L110.414 1.05758C109.642 1.93151 108.934 2.78237 108.289 3.61016C107.543 3.20595 106.756 2.80544 105.924 2.40492L104.647 1.78754L104.208 3.1192C102.006 9.78489 101.677 14.7636 102.454 18.3396C102.631 20.0764 103.373 21.6019 104.464 22.8237L104.471 22.8311C106.281 25.1216 108.829 26.0721 111.35 25.9946C113.868 26.0721 116.416 25.1225 118.225 22.8311L118.233 22.8237C119.323 21.6019 120.066 20.0755 120.244 18.3396C121.019 14.7645 120.689 9.78581 118.487 3.12105ZM111.347 2.99647C111.802 3.5391 112.235 4.07065 112.652 4.59483C112.204 4.86891 111.771 5.14115 111.349 5.41616C110.925 5.14115 110.489 4.86891 110.043 4.59483C110.458 4.06973 110.893 3.5391 111.347 2.99647ZM106.13 5.21774C107.243 5.78714 108.26 6.35653 109.191 6.925C107.272 8.38309 105.821 9.8338 104.764 11.2513C105.011 9.46558 105.452 7.45933 106.13 5.21774ZM116.269 21.3545C114.391 23.7318 111.345 24.0456 108.873 23.0203C106.403 21.9959 104.516 19.6334 104.951 16.6564C105.434 13.3554 108.62 9.29024 116.565 5.21774C119.11 13.6451 118.352 18.718 116.269 21.3545Z" fill="#330033"/>
        </svg>
    </div>
    {#if sentCode}
        <h2>Подтверждение</h2>
        <div class="verificationText">
            Код подтверждения был отправлен на <span class="whitespace-nowrap">{tel ? 'номер ' + selectedCountry.dial + ' ' + phone : 'адрес ' + email}</span>
        </div>
        <div class="{errorCode ? 'errorValue' : 'dataInput'}">
                <input  bind:value={code}  maxlength="4" type="tel"  placeholder="{placeholderCode}" id="mobileCodeInput" on:click={()=>{
        placeholderCode = ''
        errorCode = false
        }}>
        </div>
    {#if time != 0 }
        <Button size="full" status="disabled-secondary" on:click={sentAgain}>Отправить код ещё раз через 0:{time < 10 ? '0' + time : time}</Button>
    {:else}
        <Button size="full" status="active-transparent" on:click={sentAgain}>Отправить код ещё раз </Button>
    {/if}

    {:else}
        {#if tel}
            <h2>Введите номер телефона</h2>
        {:else}
            <h2>Введите адрес эл. почты</h2>
        {/if}
        <div class="{errorValue ? 'errorValue' : 'dataInput'}">
            {#if tel}
                    <div class="flex">
                        <button type="button"
                                class="flex justify-between bg-white rounded h-full mr-12 cursor-pointer items-center chooseCode" on:click={chooseCountry}>
                <span class="mr-6">
                  <i class="align-baseline mr-4 fflag ff-md fflag-{selectedCountry.code}" />
                  <span class="align-baseline text-one-five leading-mid">{selectedCountry.dial}</span>
                </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                                <path d="M13 1L6.99465 7L1 1" stroke="#999999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <input type="tel" bind:value={phone} maxlength="13"  placeholder="{placeholder}"
                               use:imask={phoneNumberOptions}>
                    </div>

            {:else}
                <input type="email" bind:value={email}  placeholder="{placeholder}" on:click={()=> {
                placeholder = ''
                errorValue = false
                }}>
            {/if}
        </div>
        <Button size="full" on:click={tel ? checkPhone : checkEmail}>Далее</Button>
        <div class="rules">
            Нажимая кнопку «Далее», вы принимаете условия <a href="/rules">Пользовательского соглашения</a>
        </div>
        {#if tel}
            <div class="method" on:click={changeMethod}>
                Войти с помощью эл. почты
            </div>
        {:else}
            <div class="method" on:click={changeMethod}>
                Войти с помощью телефона
            </div>
        {/if}
    {/if}
</div>

{#if openChooseCode}
    <Popup title="Выбрать страну" bind:visible={openChooseCode} size="height:295px; width:100%; z-index:9999;">
        {#each countryCodes as item}
            <div class="custom-radio" >
                <input
                        bind:group={selectedCountry}
                        type="radio"
                        value= {item}
                        id={item.code + item.deal}
                        name='country'
                />
                <label for="{item.code + item.deal}" class="flex items-center justify-between" on:click={()=>{
                openChooseCode = false
                }}>
                    <div>
                        <i class="align-baseline mr-4 fflag ff-md fflag-{item.code}" />
                        <span class="align-baseline text-one-five leading-mid">{item.dial}</span>
                        <span class="align-baseline text-one-five leading-mid">{item.nameRus}</span>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none" class="{selectedCountry == item ? '' : 'hidden'}">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.68581 16.125C8.02229 16.125 8.28259 15.9873 8.4667 15.718L14.4345 6.55225C14.5679 6.34564 14.625 6.17034 14.625 6.0013C14.625 5.55678 14.3076 5.25 13.8505 5.25C13.5394 5.25 13.3489 5.36269 13.1584 5.65695L7.65406 14.2655L4.82887 10.6906C4.6384 10.4465 4.44159 10.3463 4.16225 10.3463C3.70514 10.3463 3.375 10.6656 3.375 11.1038C3.375 11.2979 3.44484 11.4858 3.6099 11.6798L6.89856 15.7243C7.12077 15.9998 7.35567 16.125 7.68581 16.125Z" fill="#330033"/>
                        </svg>
                    </div>
                </label>
            </div>
        {/each}
    </Popup>
{/if}