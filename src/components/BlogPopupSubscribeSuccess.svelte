<script>
    import { createEventDispatcher } from "svelte";
    import ModalSurface from "./ModalSurface.svelte";
    import LinkButton from "./LinkButton.svelte";
    import Button from "./Button.svelte";
    import Envelope from "./icons/Envelope.svelte";

    const dispatch = createEventDispatcher();
    export let onChangeEmail = () => {};

    function closeModal() {
        dispatch("close");
    }
    const changeEmail = () => {
        closeModal();
        onChangeEmail();
    };

    // FIXME get from store
    export let deal = 0;
</script>

<style>
    .columns {
        display: flex;
        padding: 24px 10px 0;
    }
    .columns > div:first-child {
        max-width: 465px;
        margin-right: auto;
    }
    h2 {
        margin-bottom: 12px;
        font-weight: bold;
        font-size: 22px;
        line-height: 135%;
        color: var(--color-main);
    }
    p {
        margin-bottom: 8px;
    }
    a {
        color: #1039C9;
    }
    a:hover {
        color: var(--color-info);
    }
    .buttons :global(a),
    .buttons :global(button) {
        padding: 12px 34px;
        margin-right: 24px;
        font-size: 16px;
        line-height: 130%;
        height: auto;
    }
    .buttons {
        margin-top: 22px;
        display: flex;
    }
    .coupon {
        flex-shrink: 0;
        width: 161px;
        height: 211px;
    }
    .coupon > svg:first-child {
        position: absolute;
        z-index: -1;
    }
    .coupon .text div:first-child {
        padding-top: 46px;
        font-weight: normal;
        font-size: 17.9515px;
        line-height: 135%;
        text-align: center;
        color: #FFFFFF;
    }
    .coupon .text div:nth-child(2) {
        font-weight: 600;
        font-size: 30.774px;
        line-height: 115%;
        text-align: center;
        color: #FFFFFF;
        padding-top: 6px;
    }
    .coupon .text div:last-child {
        font-weight: bold;
        font-size: 30.774px;
        line-height: 135%;
        text-align: center;
        color: #FFFFFF;
        padding-top: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .coupon .text div:last-child svg {
        margin-left: 8px;
    }
    .buttons :global(.change-email) {
        font-weight: 400;
    }
    .buttons :global(.change-email:not(:hover)) {
        background: var(--gray-1000);
        color: var(--color-main);
    }
</style>

<ModalSurface css="height:335px; width: 800px;" on:close={closeModal}>
    <div class="columns">
        <div>
            <h2>Спасибо за подписку!</h2>
            <p>Мы будем еженедельно отправлять полезные статьи, а также информацию о скидках и акциях. Никакого спама.</p>
            <p>Чтобы письма от нас не попали в спам, добавьте <a href="mailto:sima@rozarioflowers.ru">sima@rozarioflowers.ru</a> в адресную книгу.</p>
            <p>Будут вопросы — пишите на <a href="mailto:sima@rozarioflowers.ru">sima@rozarioflowers.ru</a>.</p>
            <div class="buttons">
                <LinkButton href="/blog" on:click="{closeModal}">Перейти в блог</LinkButton>
                <Button className="{'change-email'}" on:click="{changeEmail}">Изменить e-mail</Button>
            </div>
        </div>
        <div class="coupon text-white">
            <svg width="162" height="212" viewBox="0 0 162 212" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 157.761C0 149.263 6.889 142.374 15.387 142.374H145.74C154.238 142.374 161.127 149.263 161.127 157.761V196.042C161.127 204.54 154.238 211.429 145.74 211.429H142.363C140.926 208.404 137.844 206.313 134.273 206.313C130.702 206.313 127.619 208.404 126.183 211.429H120.623C119.187 208.404 116.104 206.313 112.533 206.313C108.963 206.313 105.88 208.404 104.443 211.429H98.9452C97.6112 208.404 94.7488 206.313 91.433 206.313C88.1173 206.313 85.2549 208.404 83.9209 211.429H78.4231C76.9864 208.404 73.9039 206.313 70.3331 206.313C66.7622 206.313 63.6797 208.404 62.243 211.429H56.6842C55.2476 208.404 52.1651 206.313 48.5942 206.313C45.0234 206.313 41.9408 208.404 40.5042 211.429H34.9449C33.5082 208.404 30.4257 206.313 26.8548 206.313C23.284 206.313 20.2015 208.404 18.7648 211.429H15.387C6.88898 211.429 0 204.54 0 196.042V157.761Z" fill="#E8287E"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M161.127 126.987C161.127 135.485 154.238 142.374 145.74 142.374L15.3867 142.374C6.88864 142.374 -0.000335093 135.485 -0.000334351 126.987L-0.000324656 15.8156C-0.000323915 7.31757 6.88867 0.42856 15.3867 0.428561L19.0102 0.428561C20.4315 3.30741 23.3904 5.28679 26.8103 5.28679C30.2302 5.28679 33.1891 3.30741 34.6104 0.428563L40.4222 0.428563C41.8434 3.30741 44.8024 5.28679 48.2222 5.28679C51.6421 5.28679 54.6011 3.30741 56.0223 0.428564L61.8346 0.428565C63.2559 3.30741 66.2148 5.2868 69.6347 5.2868C73.0546 5.2868 76.0135 3.30741 77.4348 0.428566L83.2466 0.428567C84.6679 3.30741 87.6268 5.2868 91.0467 5.2868C94.4665 5.2868 97.4255 3.30741 98.8467 0.428568L104.659 0.428569C106.08 3.30741 109.039 5.2868 112.459 5.2868C115.878 5.2868 118.837 3.30742 120.259 0.42857L126.071 0.428571C127.493 3.30722 130.451 5.28645 133.871 5.28645C137.291 5.28645 140.25 3.30722 141.671 0.428572L145.74 0.428572C154.238 0.428573 161.127 7.31758 161.127 15.8156L161.127 126.987Z" fill="#E8287E"/>
                <ellipse cx="19.1508" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="83.3871" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="40.5629" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="104.799" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="61.975" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="126.211" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="29.8559" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="94.0941" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="51.268" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="115.504" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="72.6801" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="136.918" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="24.5023" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="88.7406" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="45.9164" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="110.153" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="67.3266" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="131.565" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="35.2094" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="99.4457" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="56.6215" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="120.858" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="78.0336" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
                <ellipse cx="142.27" cy="143.384" rx="1.93204" ry="1.93676" fill="#CD1467"/>
            </svg>

            <div class="text">
                <div>ваш промокод</div>
                <div class="deal text-center font-semibold leading-snug">
                    «БЛОГ»
                </div>
                <div class="coupon-text leading-none px-4 font-semibold text-sm flex justify-center pt-2">
                    100 <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.4671 17.6832V15.2572H6.13546V13.2261H8.13834C13.1314 13.2261 15.501 10.8283 15.501 7.02005C15.501 3.23997 13.1314 0.729325 8.13834 0.729325H3.08884V10.6027H0.634608V13.2261H3.08884V15.2572H0.634608V17.6832H3.08884V21.6044H6.13546V17.6832H11.4671ZM6.13546 3.52207H8.13834C11.6081 3.52207 12.4544 5.29927 12.4544 6.96363C12.4544 8.62799 11.6081 10.6027 8.13834 10.6027H6.13546V3.52207Z" fill="white"/>
                        </svg>
                </div>
            </div>
        </div>
    </div>
</ModalSurface>

