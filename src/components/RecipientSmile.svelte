<script>
    export let smile;
    export let smile_i;
    export let openSmileModal = (index) => {};
    let openSmile = () => {
        openSmileModal(smile.index);
    };
</script>
<style>
    .recipient-smile-wrapper {
        padding-top: 20px;
        padding-bottom: 48px;
        width: calc((100% / 3) - (80px / 3));
    }
    .recipient-smile-wrapper .title {
        margin-bottom: 6px;
        font-weight: 600;
        font-size: 18px;
        line-height: 130%;
        color: var(--color-main);
    }
    .recipient-smile-wrapper .title div:not(:last-child) {
        margin-bottom: 2px;
    }
    .recipient-smile-wrapper .date {
        font-size: 14px;
        line-height: 135%;
        color: var(--color-info-light);
    }
    .recipient-smile-wrapper .image-wrapper {
        position: relative;
        cursor: pointer;
    }
    .recipient-smile-wrapper .image-wrapper .scale {
        border-radius: 4px;
        margin-bottom: 14px;
        transition: transform .5s;
        position: relative;
        overflow: hidden;
    }
    .recipient-smile-wrapper .image-wrapper .scale img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        object-fit: cover;
        background-image: url(/loading-bg-image.svg);
    }
    .recipient-smile-wrapper .image-wrapper .scale::before {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
    .recipient-smile-wrapper .image-wrapper .scale::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0,0,0, 0.3);
        opacity: 0;
        transition: opacity .4s;
        border-radius: 4px;
    }
    .recipient-smile-wrapper .image-wrapper .magnifier {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity .4s;
    }
    .recipient-smile-wrapper .image-wrapper:hover .scale::after,
    .recipient-smile-wrapper .image-wrapper:hover .magnifier {
        opacity: 1;
    }
    .recipient-smile-wrapper .image-wrapper:hover .scale {
        transform: scale(1.03);
    }
    .recipient-smile-wrapper:nth-child(3n+2) {
        margin: 0 40px;
    }
    @media (max-width: 1000px) {
        .recipient-smile-wrapper:nth-child(3n+2) {
            margin: 0 24px;
        }
        .recipient-smile-wrapper {
            padding-top: 8px;
            padding-bottom: 40px;
            width: calc((100% / 3) - (48px / 3));
        }
    }
    @media (max-width: 1300px) {
        .recipient-smile-wrapper .image-wrapper .scale {
            margin-bottom: 12px;
        }
        .recipient-smile-wrapper .image-wrapper img {
            margin-bottom: 12px;
        }
        .recipient-smile-wrapper .title {
            font-size: 16px;
        }
        .recipient-smile-wrapper .date {
            font-size: 14px;
        }
        .recipient-smile-wrapper .image-wrapper:hover .magnifier svg {
            height: 48px;
            width: 48px;
        }
    }
    @media (max-width: 1000px) {
        .recipient-smile-wrapper {
            padding-top: 14px;
            padding-bottom: 34px;
        }
        .recipient-smile-wrapper .title {
            font-size: 15px;
        }
        .recipient-smile-wrapper .date {
            font-size: 13px;
        }
        .recipient-smile-wrapper .image-wrapper:hover .magnifier svg {
            height: 45px;
            width: 45px;
        }
    }
</style>
<div class="recipient-smile-wrapper">
    <div class="image-wrapper" on:click="{openSmile}">
        <div class="scale">
            <img src="{smile.recipientPhoto}" alt="" onerror="this.src = '/loading-bg-image.svg'">
        </div>
        <div class="magnifier">
            <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M48.5762 46.5011L36.6658 34.5933C39.8607 30.9211 41.7951 26.1297 41.7951 20.8929C41.7951 9.36541 32.4167 0 20.8975 0C9.36749 0 0 9.37628 0 20.8929C0 32.4095 9.37836 41.7858 20.8975 41.7858C26.1355 41.7858 30.9279 39.8519 34.601 36.6576L46.5114 48.5654C46.794 48.8479 47.1743 49 47.5438 49C47.9133 49 48.2936 48.8588 48.5762 48.5654C49.1413 48.0004 49.1413 47.0661 48.5762 46.5011ZM2.92326 20.8929C2.92326 10.9843 10.9867 2.93348 20.8867 2.93348C30.7975 2.93348 38.8501 10.9951 38.8501 20.8929C38.8501 30.7907 30.7975 38.8632 20.8867 38.8632C10.9867 38.8632 2.92326 30.8016 2.92326 20.8929Z" fill="white"/>
                <path d="M20.8581 11.4481C20.3816 11.4481 19.9994 11.8301 19.9994 12.3066L19.9994 20.0022L12.3022 20.0022C11.8256 20.0022 11.4434 20.3842 11.4434 20.8607C11.4434 21.3372 11.8256 21.7193 12.3022 21.7193L19.9994 21.7193L19.9994 29.4148C19.9994 29.8913 20.3816 30.2734 20.8581 30.2734C21.0919 30.2734 21.3122 30.179 21.4651 30.0262C21.618 29.8733 21.7169 29.6576 21.7124 29.4193L21.7124 21.7238L29.4096 21.7238C29.6434 21.7238 29.8637 21.6294 30.0166 21.4765C30.174 21.3192 30.2684 21.1079 30.2639 20.8697C30.2639 20.3932 29.8817 20.0112 29.4051 20.0112L21.7169 20.0022L21.7169 12.3066C21.7169 11.8301 21.3347 11.4481 20.8581 11.4481Z" fill="white" stroke="white"/>
            </svg>
        </div>
    </div>
    <div class="title">
        {#if smile.bouquets.length}
            <div>{smile.bouquets[0].title}</div>
        {/if}
    </div>
    <div class="date">{smile.date}</div>
</div>
