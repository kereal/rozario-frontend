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
    import TelInput from "../components/TelInput.svelte";
    import ActionEmail from "../components/ActionEmail.svelte";
    import Button from "../components/Button.svelte";
    import {slide} from 'svelte/transition';
    import Roulette from "../components/Roulette.svelte";
    import TextInput from "../components/TextInput.svelte";
    import BigCoupon from '../components/BigCoupon.svelte';
    import ModalSurface from '../components/ModalSurface.svelte';
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
    export let startDate = '20.10.2020';
    export let endDate = '31.01.2021';
    export let user = false;
    export let userInfo = {
        phone: '',
        email: ''
    }
    export let inputCode = ''
     let prize = ''

    let error = false;
    let incorrectCode = false
    let letter = true;
    let status = "active-main";
    let telInputStatus = "disabled";
    let errorCode = false;
    let seconds = 5;
    let incorrectEmail = false;
    let sendPromoVisible = false;

    function checkPhone() {
        if(userInfo.phone.length < 10) {
            error = true
        } else {
            error = false
            startTimer()
        }
    }
    function checkEmail() {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(reg.test(userInfo.email) == false) {
            incorrectEmail = true
        } else {
            incorrectEmail = false
            togglesendPromoVisible()
        }
    }
    function togglesendPromoVisible() {
        sendPromoVisible = !sendPromoVisible
    }
    function startTimer() {
                letter = false;
                seconds = 60
                setTimeout(()=>{status = 'disabled-main'
                    document.getElementById('inputCodeSMS').focus()}, 50)
                let inetvalId = setInterval(()=>{
                    if(seconds != 0 ) {
                        seconds = seconds -1
                    } else {
                        clearInterval(inetvalId)
                        status = 'active-secondary'
                    }
                }, 1000)
    }
export let trueCode = '1234'

    $: if (inputCode) {
        inputCode = inputCode.replace(/[^\d]/g,'');
        if(inputCode == trueCode) {
            user = true
        } else if(inputCode.length == 4 && inputCode != trueCode) {
            errorCode = true
        }
    }
    let showPrize = false;

    $: if(prize !== '') {
        showPrize = true;
    }

</script>

<style>
.wrapper {
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #F2F2F2;
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    position:relative;
    margin-bottom: 10px;
}
.content {
    background-image:url(/iconsback.png);
    padding: 68px 80px;
    height: 100%;
    min-height: 90vh;
}
.wrapperWithButton {
    min-height: calc(90vh - 60px);
}
.InfoBlock {
    width: 440px;
    height: 550px;
}

h1{
    font-weight: bold;
    font-size: 48px;
    line-height: 135%;
    color: var(--color-main);
    margin-bottom: 30px;
}
h2{
    font-weight: 600;
    font-size: 22px;
    color: var(--color-main);
    margin-bottom: 24px;
}

h3{
    font-weight: 600;
    font-size: 18px;
    color: var(--color-main);
}

.infoText {
    font-size: 16px;
    color: var(--color-main);
}
.infoSubText {
    font-size: 14px;
    line-height: 135%;
    text-align: center;
    color: var(--gray-600);
}
.errorBlock {
    background: #FFFFFF;
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 0px 0px 4px 4px;
    font-size: 13px;
    color: var(--color-main);
    height: 48px;
    padding: 0 12px;
    margin-top: -4px;
}

.errorCode {
    display: block;
    color: red;
}

.roulette {
    position: absolute;
    right: 200px;
    top: calc(50% - 275px);
    transition: all 0.6s ease-out;
}

.activeRoulette {
    right: calc(50% - 255px);
    top: calc(50% - 275px);
    display: block;
}
.coupon {
    margin-left: 200px;
    margin-top: 50px;
}
.prize {
    margin-left: 200px;
    margin-top: 50px;
    width: 358px;
    height: 421px;
}
.rules {
    font-size: 14px;
    line-height: 135%;
    color: var(--gray-700);
}

.rulesWhaneCoupon {
    position: absolute;
    bottom: 68px;
    left: 80px;
}
@media (max-width: 1300px) {

    .content {
        background-image:url(/iconsback.png);
        padding: 48px 80px;
        min-height: 750px;
    }
    .rulesWhaneCoupon {
        bottom: 48px;
        left: 80px;
    }
    .roulette {
        position: absolute;
        right: 90px;
    }
    .prize {
        margin-left: 120px;
        margin-top: 50px;
    }
    .coupon {
        margin-left: 120px;
        margin-top: 50px;
    }
    .wrapperWithButton {
        min-height: calc(90vh - 100px);
    }
}

@media (max-width: 1180px) {
    .content {
        min-height: 900px;
    }
    .roulette {
        display: none;
    }
    .activeRoulette {
        right: calc(50% - 255px);
        top: calc(50% - 200px);
        display: block;
    }
    .wrapperWithButton {
        min-height: calc(90vh - 100px);
    }
}

@media (max-width: 1048px) {
    .content {
        padding: 48px 80px;
    }

    h1{
        margin-bottom: 24px;
    }
    .prize {
        margin-left: 52px;
        margin-top: 100px;
        width: 276px;
        height: 325px;
    }
    .coupon {
        margin-left: 50px;
        margin-top: 50px;
    }
    .wrapperWithButton {
        min-height: calc(90vh - 100px);
    }
}
</style>


<div class="wrapper" >
    <div class="content" class:wrapperWithButton={showPrize}>
        <div class="flex">
            <div class="{prize.type == 'coupon' ? '': 'InfoBlock'}">
                <h1>Розарио.Игра</h1>
                {#if  showPrize === false}
                    <p class="infoText mb-40 leading-8">
                        Крутите колесо Фортуны и получайте призы!
                        Каждый день вы можете испытать удачу.
                        Акция действует с {startDate} по {endDate}.
                    </p>
                    {#if !user}
                        <p class="infoText mb-18" >
                            Чтобы начать игру, пожалуйста, укажите свой телефон
                        </p>
                        <TelInput
                                name="rouletPhone"
                                id="rouletPhone"
                                className="w-full "
                                required={true}
                                bind:value={userInfo.phone}
                                height = 44
                                classNameInput = '{error ? 'error' : ''}'
                />
            {#if !letter}
                        <div class="w-full mt-18 mb-34" transition:slide|local>
                            <TextInput
                                    type="text" class="mt-18" placeholder="Код из смс"
                                    bind:value={inputCode} id="inputCodeSMS" maxlength="4" className="w-full {errorCode? 'error':''}" size="full" />
                            <div class="forError">
                                <span class="hidden mt-4 text-sm" class:errorCode transition:slide|local>Неверный код подтверждения</span>
                            </div>
                        </div>
                    {/if}
                        {#if letter}
                            <p class="infoSubText mt-40 mb-18" transition:slide|local>
                                Нажимая кнопку «Начать игру», вы соглашаетесь с <a href="rules/gamePromotion" class="cursor-pointer hover:text-info">Правилами проведения акции</a>
                            </p>
                        {/if}
                        <Button size="full" on:click={checkPhone} status={status}>
                            {#if letter}
                                Начать игру
                            {/if}
                            {#if !letter}
                                {#if seconds == 0 }
                                    Получить код ещё раз
                                {:else}
                                    <div class="a">
                                        Получить код ещё раз через 0:{seconds < 10 ? '0':''}{seconds}
                                    </div>
                                {/if}
                            {/if}
                        </Button>
                        {#if error}
                            <div class="errorBlock flex items-center" transition:slide|local>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none" class="mr-12">
                                    <path d="M19.8091 15.7348L11.2193 0.856939C10.9648 0.416118 10.509 0.152954 10 0.152954C9.49098 0.152954 9.03516 0.416118 8.78066 0.856939L0.190898 15.7348C-0.0636328 16.1757 -0.0636328 16.702 0.190898 17.1428C0.445391 17.5836 0.901211 17.8468 1.41023 17.8468H18.5898C19.0988 17.8468 19.5546 17.5836 19.8091 17.1428C20.0636 16.702 20.0636 16.1757 19.8091 15.7348Z" fill="#E81717"/>
                                    <path d="M10.5864 5.16711H9.41309V11.4248H10.5864V5.16711Z" fill="white" stroke="white" stroke-width="0.3"/>
                                    <path d="M10 15.1197C10.432 15.1197 10.7822 14.7695 10.7822 14.3375C10.7822 13.9055 10.432 13.5552 10 13.5552C9.56799 13.5552 9.21777 13.9055 9.21777 14.3375C9.21777 14.7695 9.56799 15.1197 10 15.1197Z" fill="white" stroke="white" stroke-width="0.5"/>
                                </svg>
                                Пожалуйста, введите номер телефона
                            </div>
                        {/if}
                    {/if}
                {:else}
                    <h3>
                        Поздравляем!
                    </h3>
                    <h3>
                        Ваш приз — {prize.text}
                    </h3>
                    {#if prize.type == 'coupon'}
                        <p class="infoText mb-4">
                            Вы можете использовать его при оформлении заказа.
                        </p>
                        <p class="infoText">
                            Посмотреть все доступные купоны вы можете <br> в <a href="/profile" class="text-info underline">личном кабинете.</a>
                        </p>
                    {:else}
                        <p class="infoText">
                            {prize.size}
                        </p>
                        <p class="infoText mt-18">
                            Мы отправили СМС с промокодом на номер <span class="font-semibold whitespace-nowrap">{userInfo.phone}</span>
                        </p>
                        <p class="infoText mt-8">
                            Введите его при оформлении заказа, чтобы получить приз. Обратите внимание, заказать доставку подарка необходимо в течение<span class="font-semibold"> 7 дней.</span>
                        </p>
                        <p class="infoText mt-24">
                            Также мы можем отправить промокод вам на e-mail, пожалуйста, укажите его в поле ниже:
                        </p>
                        <div class="mt-16 mb-24">
                            <TextInput
                                    bind:value={userInfo.email}
                                    className="w-full {incorrectEmail? 'error':''}"
                                    name="email"
                                    placeholder="Введите e-mail"
                                    size="full"

                            />
                            <Button size="full" on:click={checkEmail} status='active-secondary' className="mt-18">
                                <span class="whitespace-nowrap">Получить промокод</span>
                            </Button>
                            {#if incorrectEmail}
                                <div class="errorBlock flex items-center" transition:slide|local>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none" class="mr-12">
                                        <path d="M19.8091 15.7348L11.2193 0.856939C10.9648 0.416118 10.509 0.152954 10 0.152954C9.49098 0.152954 9.03516 0.416118 8.78066 0.856939L0.190898 15.7348C-0.0636328 16.1757 -0.0636328 16.702 0.190898 17.1428C0.445391 17.5836 0.901211 17.8468 1.41023 17.8468H18.5898C19.0988 17.8468 19.5546 17.5836 19.8091 17.1428C20.0636 16.702 20.0636 16.1757 19.8091 15.7348Z" fill="#E81717"/>
                                        <path d="M10.5864 5.16711H9.41309V11.4248H10.5864V5.16711Z" fill="white" stroke="white" stroke-width="0.3"/>
                                        <path d="M10 15.1197C10.432 15.1197 10.7822 14.7695 10.7822 14.3375C10.7822 13.9055 10.432 13.5552 10 13.5552C9.56799 13.5552 9.21777 13.9055 9.21777 14.3375C9.21777 14.7695 9.56799 15.1197 10 15.1197Z" fill="white" stroke="white" stroke-width="0.5"/>
                                    </svg>
                                    Введите корректный адрес электронной почты
                                </div>
                            {/if}
                        </div>
                        <p class="rules mt-24">
                            <a href="rules/gamePromotion" class="cursor-pointer hover:text-info">Правила проведения акции</a>
                        </p>
                    {/if}
                {/if}
            </div>
            {#if showPrize === false}
                <div class="roulette" class:activeRoulette={user}>
                    <Roulette {user}  bind:prize={prize}/>
                </div>
            {:else}
                <div>
                    <div class="{prize.type == 'coupon' ? 'coupon' : 'prize'}" >
                        {#if prize.type == 'coupon'}
                            <BigCoupon coupon = {prize.coupon}/>
                            <p class="rulesWhaneCoupon rules">
                                <a href="rules/gamePromotion" class="cursor-pointer hover:text-info">Правила проведения акции</a>
                            </p>
                        {:else}
                            <img src="/{prize.photo}" alt="prize.photo" class="w-full h-full">
                        {/if}
                    </div>
                </div>
            {/if}
        </div>
    </div>
    </div>

{#if prize.type === 'coupon'}
    <a href="/catalog">
        <Button size="full" className="mt-6 mb-10">Перейти в каталог</Button>
    </a>
{/if}
{#if prize.type === 'prize'}
    <a href="/catalog">
        <Button size="full" className="mt-6 mb-10">Получить приз прямо сейчас</Button>
    </a>
{/if}

{#if sendPromoVisible}
    <ModalSurface
    css="width: 400px;
        height: 243px;"
    on:close={togglesendPromoVisible}>
        <h2>
            Промокод отправлен
        </h2>
        <div class="text-main">
            Промокод отправлен на {userInfo.email}
        </div>
    </ModalSurface>
{/if}

