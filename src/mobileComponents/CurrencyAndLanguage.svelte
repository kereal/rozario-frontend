<script>
    import Popup from './Popup.svelte'
    import Button from './Button.svelte'
    export let visible;
    export let disScroll = true;
    export let selectedLanguage='Русский'
    export let selectedCurrency = 'Российский рубль'

    $: if(selectedLanguage) {
        console.log(selectedLanguage)
    }
    function save() {
        visible = !visible
    }
</script>

<style>

    h2 {
        font-weight: 600;
        font-size: 16px;
        color: var(--color-main);
    }
    input {
        display: none;
    }

    [type="radio"]:checked + label {
        color: var(--color-main);

    }
    [type="radio"] + label {
        font-size: 14px;
        color: var(--gray-600);
        margin-top: 20px;
    }


</style>

<div class="wrapper">
    <Popup title="Язык и валюта" bind:visible={visible} size="max-height:90%; width:100%;" {disScroll}>
        <h2>Язык</h2>
        <div class="custom-radio" >
            <input
                    bind:group={selectedLanguage}
                    type="radio"
                    value= 'Русский'
                    id='russianLanguage'
                    name='languege'
                    />
            <label for="russianLanguage" class="flex items-center justify-between">
                <div class=" flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="15" viewBox="0 0 24 15" fill="none" class="mr-12">
                        <path d="M23.5 5.64281V1H0.500977V5.64281" stroke="#E5E5E5"/>
                        <path d="M23.9997 5.64282H0V10.2856H23.9997V5.64282Z" fill="#323E95"/>
                        <path d="M23.9997 10.2759H0V14.9998H23.9997V10.2759Z" fill="#D8001E"/>
                    </svg>
                    Русский
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none" class="{selectedLanguage == 'Русский' ? '' : 'hidden'}">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.68581 16.125C8.02229 16.125 8.28259 15.9873 8.4667 15.718L14.4345 6.55225C14.5679 6.34564 14.625 6.17034 14.625 6.0013C14.625 5.55678 14.3076 5.25 13.8505 5.25C13.5394 5.25 13.3489 5.36269 13.1584 5.65695L7.65406 14.2655L4.82887 10.6906C4.6384 10.4465 4.44159 10.3463 4.16225 10.3463C3.70514 10.3463 3.375 10.6656 3.375 11.1038C3.375 11.2979 3.44484 11.4858 3.6099 11.6798L6.89856 15.7243C7.12077 15.9998 7.35567 16.125 7.68581 16.125Z" fill="#330033"/>
                    </svg>
                </div>
            </label>
        </div>
        <div class="custom-radio mb-20" >
            <input
                    bind:group={selectedLanguage}
                    type="radio"
                    value='English'
                    id='EnglishLanguage'
                    name='languege'
            />
            <label for="EnglishLanguage" class="flex items-center justify-between">
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none" class="mr-12">
                        <path d="M24 3V17H0V3H24Z" fill="#2E4593"/>
                        <path d="M24 15.5263V17H21.4775L14.1261 12.7129L13.4054 12.244L12.4685 11.7751L12.1802 11.5742L11.3153 11.1053L11.027 10.9043L10.7387 10.7033L10.1622 10.4354L10.018 10.3014L9.72973 10.1675L7.13513 8.62679L5.90991 7.95694L0 4.47368V3H0.0720721H2.45045L10.018 7.42105L10.7387 7.82297L10.955 7.95694L12.1081 8.62679L12.1802 8.69378L12.6847 8.96172L13.4054 9.36364L13.4775 9.43062L14.1261 9.76555L14.7027 10.1675L16.3604 11.1053L17.5135 11.7751L24 15.5263Z" fill="#FCF5FF"/>
                        <path d="M24 16.933V17H22.3423L14.1261 12.177L13.4054 11.7751L12.6847 11.3062L12.2523 11.1053L11.4595 10.6364L10.7387 10.2344L10.5946 10.1675L10.1622 9.89952L10.018 9.76555L8 8.62679L6.84685 7.95694L0 3.9378V3H0.0720721L8.5045 7.95694L9.65766 8.62679L10.018 8.82775L10.7387 9.22966L11.027 9.36364L11.4595 9.63158L12.2523 10.1675L13.4054 10.7703L13.4775 10.8373L13.9099 11.1053L14.1261 11.2392L15.0631 11.7751L24 16.933Z" fill="#F42525"/>
                        <path d="M24 3.26794V4.74163L18.5225 7.95694L17.2973 8.62679L14.7027 10.1675L14.1261 10.5024L13.4775 10.8373L13.4054 10.9043L13.1171 11.1053L12.6847 11.3062L12.1802 11.5742L11.8919 11.7751L10.7387 12.445L10.018 12.9139L2.95495 17H0V15.7943L6.91892 11.7751L8.07207 11.1053L9.72973 10.1675L10.018 9.96651L10.1622 9.89952L10.7387 9.56459L11.027 9.36364L12.1802 8.69378L12.3243 8.62679L13.4054 8.02392L13.4775 7.95694L14.1261 7.55502L21.9099 3H23.7838L24 3.26794Z" fill="#FCF5FF"/>
                        <path d="M23.9279 3.33493L16.0721 7.95694L14.9189 8.62679L14.1261 9.09569L13.4775 9.43062L13.4054 9.49761L12.2523 10.1675L11.4595 10.6364L11.027 10.9043L10.7387 11.0383L10.6667 11.1053L10.018 11.5072L9.51351 11.7751L0.504504 17H0V16.3301L7.85585 11.7751L9.00901 11.1053L10.018 10.5024L10.1622 10.4354L10.5946 10.1675L10.7387 10.1005L11.4595 9.63158L12.6847 8.96172L13.2613 8.62679L13.4054 8.55981L14.1261 8.09091L14.4144 7.95694L22.8468 3H23.6396H24V3.33493H23.9279Z" fill="#F42525"/>
                        <path d="M24 7.95703H0V11.7752H24V7.95703Z" fill="white"/>
                        <path d="M24 8.62671H0V11.1052H24V8.62671Z" fill="#F42525"/>
                        <path d="M13.3332 11.7751H14.126V17H9.9458V11.7751H10.7386V7.95694H9.9458V3H14.126V7.95694H13.3332V11.7751Z" fill="white"/>
                        <path d="M13.3332 3H10.6665V17H13.3332V3Z" fill="#F42525"/>
                    </svg>
                    English
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none" class="{selectedLanguage == 'English' ? '' : 'hidden'}">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.68581 16.125C8.02229 16.125 8.28259 15.9873 8.4667 15.718L14.4345 6.55225C14.5679 6.34564 14.625 6.17034 14.625 6.0013C14.625 5.55678 14.3076 5.25 13.8505 5.25C13.5394 5.25 13.3489 5.36269 13.1584 5.65695L7.65406 14.2655L4.82887 10.6906C4.6384 10.4465 4.44159 10.3463 4.16225 10.3463C3.70514 10.3463 3.375 10.6656 3.375 11.1038C3.375 11.2979 3.44484 11.4858 3.6099 11.6798L6.89856 15.7243C7.12077 15.9998 7.35567 16.125 7.68581 16.125Z" fill="#330033"/>
                    </svg>
                </div>
            </label>
        </div>
        <h2>Валюта</h2>
        <div class="custom-radio" >
            <input
                    bind:group={selectedCurrency}
                    type="radio"
                    value= 'Российский рубль'
                    id='russianCurrency'
                    name='Currency'
            />
            <label for="russianCurrency" class="flex items-center justify-between">
                    ₽ — Российский рубль
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none" class="{selectedCurrency == 'Российский рубль' ? '' : 'hidden'}">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.68581 16.125C8.02229 16.125 8.28259 15.9873 8.4667 15.718L14.4345 6.55225C14.5679 6.34564 14.625 6.17034 14.625 6.0013C14.625 5.55678 14.3076 5.25 13.8505 5.25C13.5394 5.25 13.3489 5.36269 13.1584 5.65695L7.65406 14.2655L4.82887 10.6906C4.6384 10.4465 4.44159 10.3463 4.16225 10.3463C3.70514 10.3463 3.375 10.6656 3.375 11.1038C3.375 11.2979 3.44484 11.4858 3.6099 11.6798L6.89856 15.7243C7.12077 15.9998 7.35567 16.125 7.68581 16.125Z" fill="#330033"/>
                    </svg>
            </label>
        </div>
        <div class="custom-radio" >
            <input
                    bind:group={selectedCurrency}
                    type="radio"
                    value='dollars'
                    id='EnglishCurrency'
                    name='Currency'
            />
            <label for="EnglishCurrency" class="flex items-center justify-between">
                    $ — Доллар США
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none" class="{selectedCurrency == 'dollars' ? '' : 'hidden'}">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.68581 16.125C8.02229 16.125 8.28259 15.9873 8.4667 15.718L14.4345 6.55225C14.5679 6.34564 14.625 6.17034 14.625 6.0013C14.625 5.55678 14.3076 5.25 13.8505 5.25C13.5394 5.25 13.3489 5.36269 13.1584 5.65695L7.65406 14.2655L4.82887 10.6906C4.6384 10.4465 4.44159 10.3463 4.16225 10.3463C3.70514 10.3463 3.375 10.6656 3.375 11.1038C3.375 11.2979 3.44484 11.4858 3.6099 11.6798L6.89856 15.7243C7.12077 15.9998 7.35567 16.125 7.68581 16.125Z" fill="#330033"/>
                    </svg>
            </label>
        </div>
        <div class="custom-radio mb-20" >
            <input
                    bind:group={selectedCurrency}
                    type="radio"
                    value='euro'
                    id='euro'
                    name='Currency'
            />
            <label for="euro" class="flex items-center justify-between">
                    € — Евро
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none" class="{selectedCurrency == 'euro' ? '' : 'hidden'}">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.68581 16.125C8.02229 16.125 8.28259 15.9873 8.4667 15.718L14.4345 6.55225C14.5679 6.34564 14.625 6.17034 14.625 6.0013C14.625 5.55678 14.3076 5.25 13.8505 5.25C13.5394 5.25 13.3489 5.36269 13.1584 5.65695L7.65406 14.2655L4.82887 10.6906C4.6384 10.4465 4.44159 10.3463 4.16225 10.3463C3.70514 10.3463 3.375 10.6656 3.375 11.1038C3.375 11.2979 3.44484 11.4858 3.6099 11.6798L6.89856 15.7243C7.12077 15.9998 7.35567 16.125 7.68581 16.125Z" fill="#330033"/>
                    </svg>
            </label>
        </div>
        <Button size="full" on:click={save} className="mb-10">Сохранить</Button>
    </Popup>
</div>