<script>
    import RadioButton from './RadioButton.svelte'
    import Button from './Button.svelte'
    import PlusMinusButton from './PlusMinusButton.svelte'
    import Popup from './Popup.svelte'

    import cloneDeep from "lodash/cloneDeep";
    import { onMount } from "svelte";





    onMount(() => {
        document.body.style.overflow = 'hidden'

        changed = JSON.stringify(newFilters) == JSON.stringify(product)
    })


    export let visible;
    export let category;






    export let pack = 'крафт'

    export let product = {
        size: 'маленький',
        pack: 'крафт',
        size: '30-40',
        amount: 9,
        color: 'красный',
        form:'Одноголовые',
        flower:'роза',
        form: 'одноголовые'
    }

    let newFilters = cloneDeep(product);

    console.log(newFilters, product)
    console.log(newFilters == product)

    export let size = 'Маленький'

    function closeModal() {
        document.body.style.overflow = 'scroll'
        visible = false
    }

    function resetFilter() {
        console.log('reset')
    }
    function toFilter() {
        console.log('filtered')
        closeModal()
    }

    export let flowers = [
        {name: 'роза', id: 'roze'},
        {name: 'лилия', id: 'Lily'},
        {name: 'хризантема', id: 'Chrysanthemum'},
        {name: 'пион', id: 'Peony'},
        {name: 'тюльпан', id: 'Tulip'},
    ]
    export let flower='роза';

    export let sizes = [
        {
            id: 'small',
            text: 'Маленький',
            width: '25',
            height: '25',
            price: 1777,
            available: true,
        },
        {
            id: 'midlle',
            text: 'Средний',
            width: '50',
            height: '50',
            price: 2000,
            available: true,
        },
        {
            id: 'big',
            text: 'Большой',
            width: '75',
            height: '75',
            price: 3999,
            available: true,
        },
        {
            id: 'verybig',
            text: 'Огромный',
            width: '100',
            height: '100',
            price: 5999,
            available: false,
        }
    ]
    export let  packages = [
        {id: 'membrane', name: 'плёнка', price: 15},
        {id: 'craft', name: 'крафт', price: 25},
        {id: 'felt', name: 'фетр', price: 35},
        {id: 'sezal', name: 'сезаль', price: 15},
        {id: 'without', name: 'без упаковки', price: 0},
    ]
    export let sizesFlower = [
        {name: '30-40', id:'30-40'},
        {name: '40-50', id:'40-50'},
        {name: '50-60', id:'50-60'},
        {name: '60-70', id:'60-70'},
        {name: '70-80', id:'70-80'},
        {name: '80-90', id:'80-90'},
        {name: '90-100', id:'90-100'},
    ]
    export let selectedSizeFlower = '30-40';

    export let colors = [
        {color:'#FFD8D8', name:'розовый', id:'pink'},
        {color:'#FF0000', name:'красный', id:'red'},
        {color:'#FFFFFF', name:'белый', id:'white'},
        {color:'#FFDC00', name:'желтый', id:'yellow'},
        {color:'#43E267', name:'зеленый', id:'green'},
        {color:'#49A0F2', name:'синий', id:'blue'},
        {color:'#E3ADE6', name:'фиолетовый', id:'Violet'},
        {color:'conic-gradient(from 180deg at 50% 50%, #FF0000 0deg, #FAFF00 50.63deg, #00FF0A 101.25deg, #00F0FF 172.5deg, #0029FF 230.62deg, #BD00FF 286.87deg, #FF0000 350.63deg, #FF0000 360deg)', name:'разноцветный', id:'multicolored'},
    ]
    export let forms = [
        {name:'одноголовые', id:'Single-headed'},
        {name:'кустовые', id:'Bush'},
        {name:'сантини', id:'Santini'},
    ]

    let amount = [{count: 9}, {count: 15}, {count: 21}, {count: 51}, {count: 101}]
    let modalElement;
let changed = false;
let once = true;

$: if(newFilters) {
    changed = JSON.stringify(newFilters) == JSON.stringify(product)
}

</script>
<style>
    h2 {
        font-size: 16px;
        line-height: 130%;
        color: var(--color-main);
        margin-bottom: 16px;
    }
    .overlay {
        z-index: 9999;
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        height: 100%;
        opacity:1;
    }

    .content {
        padding: 16px;
        overflow: scroll;
        overflow-x:hidden;
        height: calc(85vh - 280px);
        background: white;
        margin: -16px;
    }

    .footer {
        background: #FFFFFF;
        border-top: 1px solid var(--gray-300);
        padding: 24px 16px;
        margin: 0 -16px;
        margin-bottom: -16px;
        position: sticky;
        box-shadow: 4px 0 4px 4px rgba(0, 0, 0, .05);
    }

    .blockInfo {
        border-bottom: 1px solid var(--gray-300);
        padding: 24px 0;
    }
    .blockInfo:last-child {
        border-bottom: none;
    }

    .colorButton {
        margin: -2px -12px -11px -12px;
    }
    .color {
        width: 24px;
        height: 23px;
        border-radius: 30px;
    }
    img {
        border-radius: 16px 16px 0px 0px;
    }
.newButton {
    width: 100%;
    animation: newButton 400ms cubic-bezier(0.8, 0, 0.33, 1);
    overflow:hidden;
}


    @keyframes newButton {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }
</style>
<Popup title="Фильтры" bind:visible={visible} size="max-height:84vh; overflow:hidden; width:100%; padding: 0;">
    <div class="content">
        {#if newFilters.size !== undefined}
            <div class="blockInfo">
                <h2>Размер</h2>
                <div class="buttons flex flex-wrap -mr-12">
                    {#each sizes as productSize}
                        <div class="button mr-12 mb-12">
                            <RadioButton bind:group={newFilters.size} label={productSize.id} id={productSize.id}  value={productSize.text} text={productSize.text}/>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}

        {#if newFilters.flower !== undefined}
            <div class="blockInfo">
                <h2>Состав</h2>
                <div class="buttons flex flex-wrap -mr-12">
                    {#each flowers as item}
                        <div class="button mr-12 mb-12">
                            <RadioButton bind:group={newFilters.flower} label={item.id} id={item.id}  value={item.name} text={item.name}/>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
        {#if newFilters.height !== undefined}
            <div class="blockInfo">
                <h2>Высота</h2>
                <div class="buttons flex flex-wrap -mr-12">
                    {#each sizesFlower as item}
                        <div class="button mr-12 mb-12">
                            <RadioButton bind:group={newFilters.size} label={item.id} id={item.id}  value={item.name} text={item.name} style="padding-top:5px;"/>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
        {#if newFilters.amount !== undefined}
            <div class="blockInfo">
                <h2>Выберите количество цветов</h2>
                <div class="buttons flex flex-wrap -mr-12">
                    {#each amount as item}
                        <div class="button mr-12 mb-12">
                            <RadioButton bind:group={newFilters.amount} label={item.count} id={item.count}  value={item.count} text={item.count} style="padding-top:5px;"/>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
        {#if newFilters.color !== undefined}
            <div class="blockInfo">
                <h2>Цвет</h2>
                <div class="buttons flex flex-wrap -mr-12">
                    {#each colors as item}
                        <div class="button mr-12 mb-12" >
                            <RadioButton bind:group={newFilters.color} label={item.id} id={item.id}  value={item.name}
                                         labelClass={newFilters.color === item.name ? '' : 'p-0'}
                                         style="{newFilters.color === item.name ? '' : 'width: 25px; height: 25px; '}">
                                <div class="flex items-center justify-center {newFilters.color === item.name ? '' : 'colorButton'}">
                                    <div class="color" style="background:{item.color}; {newFilters.color === item.name ? '' : 'margin-top:-2px;'}">
                                    </div>
                                    {#if newFilters.color === item.name}
                                        <div class="ml-8 -mt-2">
                                            {item.name}
                                        </div>
                                    {/if}
                                </div>
                            </RadioButton>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
        {#if newFilters.form !== undefined}
            <div class="blockInfo">
                <h2>Вид</h2>
                <div class="buttons flex flex-wrap -mr-12">
                    {#each forms as item}
                        <div class="button mr-12 mb-12">
                            <RadioButton bind:group={newFilters.form} label={item.id} id={item.id}  value={item.name} text={item.name} style="padding-top:5px;"/>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
        <div class="footer">

            <div class="footer__buttons" >
                {#if changed}
                    <Button size="full" status="active-main" on:click={closeModal}>
                        Готово
                    </Button>
                {:else}
                <div class="flex">
                    <div class="newButton">
                        <Button size="full" status="active-transparent" on:click={()=>{
                        newFilters = cloneDeep(product)
                        }} >
                            Сбросить
                        </Button>
                    </div>
                    <a href="mobileCatalog/{category}/filtered" class="ml-14 w-full">
                        <Button size="full" status="active-main" on:click={closeModal}>
                            Показать
                        </Button>
                    </a>
                </div>

                {/if}

            </div>
        </div>
</Popup>

