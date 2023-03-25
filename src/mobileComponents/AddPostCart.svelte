<script>
    import Popup from './Popup.svelte'
    import RadioButton from './RadioButton.svelte'
    import Button from './Button.svelte'

    import { onMount } from "svelte";
    export let visible;
    export let text;

    let once = true;
    let element;
    let modalElement;
    let maximum = false;
    let changeMoove = false;
    let changeBack = false;

    onMount(() => {
        if (once) {
            checkChange()
            once = false;
        }
    });

    function checkChange() {
        if (value == ''){
            changeMoove=true
            if (texts.storage.length > 1) {
                changeBack = true
            }
        }
        if(value == texts.text){
            if(texts.storage.length > 1) {
                changeBack = true
            }
        }
        console.log(texts.storage)
        if( value != texts.text) {
            changeMoove = true
        } else {
            changeMoove = false
        }

        if(value.length > 250) {
            maximum = true

        } else {
            maximum = false
        }
    }

    function saveText() {
        if (!maximum) {
            texts.storage[0] = texts.text;
            texts.UserText = value;
            if (value != '' && value != texts.text && texts.storage.indexOf(value) == -1) {
                texts.storage.push(value);
            }
            texts.count = texts.storage.length - 1;
            closeModal()
        }
    }
    function clearText() {
        texts.storage[0] = texts.text;
        if (value != '' && value != texts.text && texts.storage.indexOf(value) == -1) {
            texts.storage.push(value)
            changeBack = true;
        }
        changeMoove=true;
        value='';
    }
    function goToUserText() {
        if (changeBack) {
            if (value != '' && value != texts.text && texts.storage.indexOf(value) == -1) {
                texts.storage.push(value);
            }
            if(texts.count != texts.storage.length - 1) {
                texts.count = texts.count + 1;
                value = texts.storage[texts.count]
                if (texts.count == texts.storage.length - 1){
                    changeBack = false;
                }
            } else {
                changeBack = false;
                value = texts.storage[texts.count];
            }
        }
    }
    function goToText() {
        if (changeMoove) {
            texts.storage[0] = texts.text;
            if (value != '' && value != texts.text && texts.storage.indexOf(value) == -1) {
                texts.storage.push(value);
                changeBack = true;
            }
            if (texts.storage.length > 1 && texts.count == 0) {
                changeBack = true;
            }
            value = texts.text;
            texts.count = 0;
        }
    }



    const holidays = [
        {
            name: 'Без открытки', id: 'withouthol'
        },

        {
            name: 'Юбилей', id: 'anniversary'
        },
        {
            name: 'Поздравление', id: 'Congratulation'
        },
        {
            name: 'День рождения', id: 'bd'
        },
        {
            name: 'Сказать люблю', id: 'lovetosay'
        }
        ,
        {
            name: 'Извинение', id: 'Apology'
        }
    ]
    let congratulations = {
        'Без открытки':{
            text: '',
            UserText: '',
            intermediate: '',
        },
        'Юбилей': {
            text: 'Текст для "Юбилей"',
            UserText: 'Текст для "Юбилей"',
            intermediate: 'Текст для "Юбилей"',
            storage: [],
            count: 0
        },
        'День рождения': {
            text: 'Тебе желаю море счастья, Улыбок, солнца и тепла.' +
                    ' Чтоб жизнь была еще прекрасней, Удача за руку вела! ' +
                    'Тебе желаю море счастья, Улыбок, солнца и тепла. ' +
                    'Чтоб жизнь была еще прекрасней, Удача за руку вела!',
            UserText: 'Тебе желаю море счастья, Улыбок, солнца и тепла.' +
                    ' Чтоб жизнь была еще прекрасней, Удача за руку вела! ' +
                    'Тебе желаю море счастья, Улыбок, солнца и тепла. ' +
                    'Чтоб жизнь была еще прекрасней, Удача за руку вела!',
            intermediate: 'Тебе желаю море счастья, Улыбок, солнца и тепла.' +
                    ' Чтоб жизнь была еще прекрасней, Удача за руку вела! ' +
                    'Тебе желаю море счастья, Улыбок, солнца и тепла. ' +
                    'Чтоб жизнь была еще прекрасней, Удача за руку вела!',
            storage: [],
            count: 0
        },

        'Поздравление': {
            text: 'Текст для "Поздравление"',
            UserText: 'Текст для "Поздравление"',
            intermediate: 'Текст "Поздравление"',
            storage: [],
            count: 0
        },
        'Сказать люблю': {
            text: 'Текст для "Сказать люблю"',
            UserText: 'Текст для "Сказать люблю"',
            intermediate: 'Текст для "Сказать люблю"',
            storage: [],
            count: 0
        },
        'Извинение': {
            text: 'Текст для "Извинение"',
            UserText: 'Текст для "Извинение"',
            intermediate: 'Текст для "Извинение"',
            storage: [],
            count: 0
        },
    }

export let selectedCongratulation = 'День рождения'
    function close() {
        document.body.style.overflow = 'scroll';
        visible = !visible

    }
let value = congratulations[selectedCongratulation].intermediate;
let texts = congratulations[selectedCongratulation]

    $: if (value && !once) {
        checkChange();
    }
    $: if(selectedCongratulation) {
        value = congratulations[selectedCongratulation].intermediate;
    }
</script>
<style>
h2 {
    font-size: 16px;
    line-height: 130%;
    color: var(--color-main);
    margin-bottom: 16px;
}
.button {
    margin: 0 12px 12px 0;
}
.textarea {
    width: 100%;
    height: 155px;
    background: var(--color-light);
    border: 1px solid var(--gray-500);
    box-sizing: border-box;
    border-radius: 4px;
    padding: 12px;
    font-size: 15px;
    line-height: 135%;
    color: var(--color-main);
}
.textarea:focus {
    border: 1px solid var(--color-info-light);
}
.errorBorder {
    border: 1px solid #E81717;
}

.postcard__buttons {
    position: absolute;
    right: 4px;
    bottom: 4px;
}
.textArea__button_moove:hover .changeMoove {
    stroke:var(--color-info);
}

.textArea__button_back:hover .changeBack {
    stroke:var(--color-info);
}

.textArea__button{
    stroke:var(--gray-1000);
    fill:none;
}
.changeMoove {
    stroke:var(--gray-600);
}
.changeBack {
    stroke:var(--gray-600);
}

</style>

    <Popup title="Добавить открытку" bind:visible={visible} size="max-height:95vh;  width:100%;">
        <h2>Выберите повод</h2>
        <div class="flex flex-wrap">
            {#each holidays as item}
            <div class="button">
                <RadioButton bind:group={selectedCongratulation} label={item.id} id={item.id}  text="{item.name}" value={item.name} name={item.id}/>
            </div>
            {/each}
        </div>
            {#if selectedCongratulation !='Без открытки'}
                <div class="relative">
                    <p contenteditable="true" bind:innerHTML={value} bind:this={element}  class='{maximum ? "errorBorder" : ""} textarea mb-18'>
                    </p>
                    <div class="postcard__buttons flex">
                        <button class="textArea__button_moove mr-4" on:click={goToText}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                <path d="M5.22168 7.85693L1.00084 4.42535L5.22168 0.999885" class="textArea__button" class:changeMoove stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <line x1="0.5" y1="-0.5" x2="8.71487" y2="-0.5" transform="matrix(-1 0 0 1 10.2148 4.76953)" class="textArea__button" class:changeMoove stroke-linecap="round" stroke-linejoin="round"/>
                                <line x1="0.5" y1="-0.5" x2="8.71487" y2="-0.5" transform="matrix(-1 0 0 1 10.2148 13)" class="textArea__button" class:changeMoove stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9.7793 12.5385C12.1104 12.5385 14.0001 10.6965 14.0001 8.42429C14.0001 6.15206 12.1104 4.31006 9.7793 4.31006" class="textArea__button" class:changeMoove/>
                            </svg>
                        </button>
                        <button class="textArea__button_back mr-4"  on:click={goToUserText}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" class="textArea__button" class:changeBack>
                                <path d="M9.77832 7.85693L13.9992 4.42535L9.77832 0.999885"   stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <line x1="5.28516" y1="4.26953" x2="13.5" y2="4.26953"   stroke-linecap="round" stroke-linejoin="round"/>
                                <line x1="5.28516" y1="12.5" x2="13.5" y2="12.5"   stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5.2207 12.5385C2.8896 12.5385 0.999863 10.6965 0.999863 8.42429C0.999863 6.15206 2.8896 4.31006 5.2207 4.31006" class="textArea__button" class:changeBack/>
                            </svg>
                        </button>
                        <button class="textArea__button_exit" on:click={clearText}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 18 18" fill="none" class="deleeteText">
                                <circle cx="9" cy="9" r="9" fill="none"/>
                                <path d="M12.6006 5.3999L5.40059 12.5999M5.40059 5.3999L12.6006 12.5999" stroke="#999999" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            {/if}
        <Button size="full" on:click={close} className="mb-12">Сохранить</Button>
    </Popup>
