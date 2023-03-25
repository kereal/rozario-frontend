<script>
    export let coupon;
    export let func = true
    let copyed = false
    let copyedVisible = false;
    function copy() {
      //  navigator.clipboard.writeText(coupon.promo)
       //         .then(() => {
                    // Получилось!
       //         })
       //         .catch(err => {
      //              console.log('Something went wrong', err);
     //           });
            copyed = true
            copyedVisible = true
            setTimeout(() => {
                copyedVisible = false
            }, 2500)
    }
        let y = 0;

</script>

<style>
.icon {
    min-width: 58px;
    height: 58px;
    background: var(--color-accent);
    border-radius: 100px;
    border:5px solid white;
    margin-right: 16px;
    box-shadow: 0px 4px 15px rgba(51, 0, 51, 0.1);
}
    .text {
        font-size: 15px;
        line-height: 135%;
        color: var(--color-main);
        margin-bottom: 4px;
    }
    .subText {
        font-size: 12px;
        line-height: 135%;
        color: var(--gray-600);
    }
    .promo {
        background-color: #FF3B14;
        border-radius: 23px;
        font-weight: 600;
        color:white;
        padding: 0 4px;
        font-size: 12px;
    }
    .copyed {
        display: flex;
        background: rgba(51, 0, 51, 0.8);
        border-radius: 16px;
        height: 50px;
        font-size: 13px;
        line-height: 140%;
        text-align: center;
        color: var(--color-light);
        position: absolute;
        left:16px;
        width: calc(100% - 32px);
        z-index: 99999;
        animation: copyed 2500ms cubic-bezier(0.8, 0, 0.33, 1);
    }

    @keyframes copyed {
        from {
            background: rgba(51, 0, 51, 0.8);
            opacity: 1;
        }
        to {
            background: rgba(51, 0, 51, 0);
            opacity: 0;
        }
    }
</style>

<svelte:window bind:scrollY={y}/>

{#if func}
    <div class="flex items-center" on:click={copy}>
        <div class="icon flex justify-center items-center" style="background:{coupon.color};" >
            {#if coupon.icon}
                {@html coupon.icon}
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14" fill="none">
                    <path d="M0.539722 0.951172L0.0397224 0.951172C0.0397224 0.675029 0.26358 0.451172 0.539722 0.451172V0.951172ZM19.4318 0.951172V0.451172C19.7079 0.451172 19.9318 0.675029 19.9318 0.951172L19.4318 0.951172ZM0.539722 4.7464V5.2464C0.26358 5.2464 0.0397224 5.02254 0.0397224 4.7464H0.539722ZM0.539722 9.26985H0.0397224C0.0397224 8.9937 0.26358 8.76985 0.539722 8.76985V9.26985ZM0.539722 12.9316V13.4316C0.26358 13.4316 0.0397224 13.2077 0.0397224 12.9316H0.539722ZM19.4318 12.9316H19.9318C19.9318 13.2077 19.7079 13.4316 19.4318 13.4316V12.9316ZM19.4318 9.26985L19.4319 8.76985C19.708 8.7699 19.9318 8.99374 19.9318 9.26985H19.4318ZM19.4318 4.7464H19.9318C19.9318 5.0225 19.708 5.24634 19.4319 5.2464L19.4318 4.7464ZM0.539722 0.451172L19.4318 0.451172V1.45117L0.539722 1.45117V0.451172ZM0.0397224 4.7464V0.951172L1.03972 0.951172V4.7464H0.0397224ZM0.540373 5.2464H0.539722V4.2464H0.540373V5.2464ZM2.3021 7.00812C2.3021 6.03515 1.51335 5.2464 0.540373 5.2464V4.2464C2.06563 4.2464 3.3021 5.48286 3.3021 7.00812H2.3021ZM0.540373 8.76985C1.51335 8.76985 2.3021 7.9811 2.3021 7.00812H3.3021C3.3021 8.53338 2.06563 9.76985 0.540373 9.76985V8.76985ZM0.539722 8.76985H0.540373V9.76985H0.539722V8.76985ZM0.0397224 12.9316L0.0397224 9.26985H1.03972L1.03972 12.9316H0.0397224ZM19.4318 13.4316L0.539722 13.4316V12.4316L19.4318 12.4316V13.4316ZM19.9318 9.26985L19.9318 12.9316H18.9318L18.9318 9.26985H19.9318ZM17.6705 7.00812C17.6705 7.98097 18.4591 8.76964 19.4319 8.76985L19.4317 9.76985C17.9067 9.76952 16.6705 8.53318 16.6705 7.00812L17.6705 7.00812ZM19.4319 5.2464C18.4591 5.2466 17.6705 6.03528 17.6705 7.00812L16.6705 7.00812C16.6705 5.48306 17.9067 4.24672 19.4317 4.2464L19.4319 5.2464ZM19.9318 0.951172V4.7464H18.9318V0.951172L19.9318 0.951172Z" fill="#330033"/>
                    <line x1="0.5" y1="-0.5" x2="11.4989" y2="-0.5" transform="matrix(0.00474561 0.999989 0.999989 -0.00474561 14.4859 1.00122)" stroke="#330033" stroke-linecap="round" stroke-dasharray="4 4"/>
                </svg>
            {/if}
        </div>
        <div>
            <div class="text whitespace-nowrap">{coupon.text} {#if coupon.promo != ''}<span class="promo">{coupon.promo}</span>{/if}</div>
            <div class="subText">{coupon.subText}</div>
        </div>
    </div>
{:else}
    <div class="flex items-center">
        <div class="icon flex justify-center items-center" style="background:{coupon.color};" >
            {#if coupon.icon}
                {@html coupon.icon}
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14" fill="none">
                    <path d="M0.539722 0.951172L0.0397224 0.951172C0.0397224 0.675029 0.26358 0.451172 0.539722 0.451172V0.951172ZM19.4318 0.951172V0.451172C19.7079 0.451172 19.9318 0.675029 19.9318 0.951172L19.4318 0.951172ZM0.539722 4.7464V5.2464C0.26358 5.2464 0.0397224 5.02254 0.0397224 4.7464H0.539722ZM0.539722 9.26985H0.0397224C0.0397224 8.9937 0.26358 8.76985 0.539722 8.76985V9.26985ZM0.539722 12.9316V13.4316C0.26358 13.4316 0.0397224 13.2077 0.0397224 12.9316H0.539722ZM19.4318 12.9316H19.9318C19.9318 13.2077 19.7079 13.4316 19.4318 13.4316V12.9316ZM19.4318 9.26985L19.4319 8.76985C19.708 8.7699 19.9318 8.99374 19.9318 9.26985H19.4318ZM19.4318 4.7464H19.9318C19.9318 5.0225 19.708 5.24634 19.4319 5.2464L19.4318 4.7464ZM0.539722 0.451172L19.4318 0.451172V1.45117L0.539722 1.45117V0.451172ZM0.0397224 4.7464V0.951172L1.03972 0.951172V4.7464H0.0397224ZM0.540373 5.2464H0.539722V4.2464H0.540373V5.2464ZM2.3021 7.00812C2.3021 6.03515 1.51335 5.2464 0.540373 5.2464V4.2464C2.06563 4.2464 3.3021 5.48286 3.3021 7.00812H2.3021ZM0.540373 8.76985C1.51335 8.76985 2.3021 7.9811 2.3021 7.00812H3.3021C3.3021 8.53338 2.06563 9.76985 0.540373 9.76985V8.76985ZM0.539722 8.76985H0.540373V9.76985H0.539722V8.76985ZM0.0397224 12.9316L0.0397224 9.26985H1.03972L1.03972 12.9316H0.0397224ZM19.4318 13.4316L0.539722 13.4316V12.4316L19.4318 12.4316V13.4316ZM19.9318 9.26985L19.9318 12.9316H18.9318L18.9318 9.26985H19.9318ZM17.6705 7.00812C17.6705 7.98097 18.4591 8.76964 19.4319 8.76985L19.4317 9.76985C17.9067 9.76952 16.6705 8.53318 16.6705 7.00812L17.6705 7.00812ZM19.4319 5.2464C18.4591 5.2466 17.6705 6.03528 17.6705 7.00812L16.6705 7.00812C16.6705 5.48306 17.9067 4.24672 19.4317 4.2464L19.4319 5.2464ZM19.9318 0.951172V4.7464H18.9318V0.951172L19.9318 0.951172Z" fill="#330033"/>
                    <line x1="0.5" y1="-0.5" x2="11.4989" y2="-0.5" transform="matrix(0.00474561 0.999989 0.999989 -0.00474561 14.4859 1.00122)" stroke="#330033" stroke-linecap="round" stroke-dasharray="4 4"/>
                </svg>
            {/if}
        </div>
        <div>
            <div class="text whitespace-nowrap">{coupon.text} {#if coupon.promo != ''}<span class="promo">{coupon.promo}</span>{/if}</div>
            <div class="subText">{coupon.subText}</div>
        </div>
    </div>
{/if}



    <div class="hidden flex justify-center items-center whitespace-nowrap"
    style="top: calc(50vh + {y - 25}px);" class:copyed={copyedVisible}>Промокод успешно скопирован</div>

