<script>
    import ModalSurface from './ModalSurface.svelte'
    import CustomCheckbox from "./CustomCheckbox.svelte";
    import Button from "./Button.svelte";
    import cloneDeep from "lodash/cloneDeep";
    import SelectLabel from "./SelectLabel.svelte"
    import { createEventDispatcher } from "svelte";

    export let visible;
    export let product;
    export let onePrice = false;
    let oldProduct =  cloneDeep(product);
    export let colors = [
        {color:'красный',
            checked: false,
            style:'#E81717',
            prices: [
                {count: '1–15 шт.',
                    price: 150},
                {count: '16–25 шт.',
                    price: 150},
                {count: '26–51 шт.',
                    price: 150},
                {count: '52–101 шт.',
                    price: 150},
            ]
        },
        {color:'розовый',
            checked: false,
            style:'#FF84A9',
            prices: [
                {count: '1–15 шт.',
                    price: 150},
                {count: '16–25 шт.',
                    price: 150},
                {count: '26–51 шт.',
                    price: 150},
                {count: '52–101 шт.',
                    price: 150},
            ]
        },
        {color:'жёлтый',
            checked: false,
            style:'#FFF969',
            prices: [
                {count: '1–15 шт.',
                    price: 150},
                {count: '16–25 шт.',
                    price: 150},
                {count: '26–51 шт.',
                    price: 150},
                {count: '52–101 шт.',
                    price: 150},
            ]
        },
        {color:'зелёный',
            checked: false,
            style:' #12C97D',
            prices: [
                {count: '1–15 шт.',
                    price: 150},
                {count: '16–25 шт.',
                    price: 150},
                {count: '26–51 шт.',
                    price: 150},
                {count: '52–101 шт.',
                    price: 150},
            ]
        },
        {color:'синий',
            checked: false,
            style:' #6873DD',
            prices: [
                {count: '1–15 шт.',
                    price: 150},
                {count: '16–25 шт.',
                    price: 150},
                {count: '26–51 шт.',
                    price: 150},
                {count: '52–101 шт.',
                    price: 150},
            ]
        },
        {color:'белый',
            checked: false,
            style:' #FFFFFF',
            prices: [
                {count: '1–15 шт.',
                    price: 150},
                {count: '16–25 шт.',
                    price: 150},
                {count: '26–51 шт.',
                    price: 150},
                {count: '52–101 шт.',
                    price: 150},
            ]
        },
    ]
    export let colorsOnePrice = [
        {color:'красный',
            checked: false,
            style:'#E81717',
            prices: 133
        },
        {color:'розовый',
            checked: false,
            style:'#FF84A9',
            prices: 88
        },
        {color:'жёлтый',
            checked: false,
            style:'#FFF969',
            prices: 77
        },
        {color:'зелёный',
            checked: false,
            style:' #12C97D',
            prices: 44
        },
        {color:'синий',
            checked: false,
            style:' #6873DD',
            prices: 33
        },
        {color:'белый',
            checked: false,
            style:' #FFFFFF',
            prices: 123
        },
    ]


    if(!onePrice) {
        oldProduct = Object.assign(colors, oldProduct.colors)
    } else {
        oldProduct = Object.assign(colorsOnePrice, oldProduct.colors)
    }

    let modalElement;
    let samePrice = false;
    let allPrice;
    const dispatch = createEventDispatcher();



    function closeViaOverlay(e) {
        if (modalElement && !modalElement.contains(e.target)) visible = !visible;
    }

    function closeModal() {
        dispatch("close");
        visible = !visible
    }
let errorValid = false;

    function checkEmptyPrice() {
        if(!onePrice) {
            errorValid = false
            oldProduct.forEach((item)=>{
                item.prices.forEach((elem)=>{
                    if(elem.price == '') {
                        errorValid = true
                    }
                })
            })
        } else {
            errorValid = false
            oldProduct.forEach((item)=>{
                    if(item.price == '') {
                        errorValid = true
                    }
            })
        }
    }
    function closeAndSaveWindow() {
        if (errorValid == false){
            product.colors = oldProduct
            visible = !visible
        } else {
            return
        }
    }
    $: if (oldProduct) {
            checkEmptyPrice()
    }
    $: if(allPrice) {
        if(!onePrice) {
            if(samePrice == true) {
                oldProduct.forEach((item)=>{
                    item.prices.forEach((elem)=>{
                        elem.price =  cloneDeep(allPrice)
                    })
                })
                oldProduct = oldProduct
            }
        } else {
            if(samePrice == true) {
                oldProduct.forEach((item)=>{
                    item.price =  cloneDeep(allPrice)
                })
                oldProduct = oldProduct
            }
        }

    }
    $: if(samePrice) {
        oldProduct = oldProduct
        if(samePrice == true) {
            setTimeout(()=>{
                document.getElementById('changePrice').focus();
            }, 100)
        }
    }
</script>


<style>
    h2{
        font-weight: 600;
        font-size: 18px;
        color:var(--color-main);
    }
    h3{
        font-size: 14px;
        color: var(--gray-600);
        margin-top: 14px;
    }
    .textarea {
        width: 100%;
        height: 83px;
        background: var(--color-light);
        border: 1px solid var(--gray-500);
        box-sizing: border-box;
        border-radius: 4px;
        padding: 12px 16px;
        font-size: 15px;
        line-height: 135%;
        color: var(--color-main);
        resize: none;
        overflow-y: auto;
    }
    .textarea:focus {
        border: 1px solid var(--color-info-light);
    }
    .main-text {
        font-size: 15px;
        color: var(--color-main);
    }

    .changePrice {
        width: 49px;
        height: 34px;
        background: var(--color-light);
        border: 1px solid var(--gray-500);
        box-sizing: border-box;
        border-radius: 4px;
        padding: 11px 8px;
        padding-right: 0;
        font-size: 14px;
        color: var(--color-main);
        margin-right: 6px;
    }
    .changePrice:focus {
        border: 1px solid var(--color-info-light);
    }
    .error {
        border: 1px solid red;
    }
    .subText {
        font-size: 13px;
        line-height: 120%;
        color:var(--gray-600);
    }
    .switchBlock {
        height: 35px;
        margin-top: 24px;
    }
    .switch {
        position: relative;
        display: inline-block;
        width: 33px;
        height: 20px;
    }

    .switch input {display:none;}

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 2px;
        bottom: 1px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color:var(--color-accent);
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(11px);
        -ms-transform: translateX(11px);
        transform: translateX(11px);
    }
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }

    .element_price {
        margin-right: 40px;
        min-width:70px;
        margin-top: 0;
    }
    .element_price:last-child {
        margin-right: 0;
    }
    .colorsBlock {
        overflow-y:scroll;
        margin-right: -24px;
        height: 300px;
        padding-bottom: 65px;
        margin-top: 34px;
    }
    .colorBlock {
        margin-top: 24px;
    }
    .colorBlock:first-child {
        margin-top: 0;
    }

    .element__name-color {
        margin-right: 80px;
        min-width: 108px;
    }
    .footer {
        width: 799px;
        height: 100px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 18.23%, #FFFFFF 41.15%, rgba(255, 255, 255, 0.994792) 99.99%);
        position: absolute;
        bottom:0;
        left:0;
        padding: 24px;

    }
    .errorText {
        font-size: 14px;
        line-height: 135%;
        color: #E81717;
    }
</style>

<ModalSurface css="
width: 800px;
height: 533px;
background: var(--color-light);
border: 1px solid var(--gray-300);"
              on:close={closeModal}>
    <div>
        <h2>
            Изменение цен — {product.name}
        </h2>
        <h3>Отметьте цвета, которые всегда есть в наличии, и укажите цены в зависимости от количества штук в букете.</h3>
        <div class="flex items-center switchBlock">
            <div class="flex items center main-text mr-24 cursor-pointer">
                <label class="switch mr-12" >
                    <input type="checkbox"  bind:checked={samePrice}>
                    <span class="slider round"></span>
                </label>
                Одинаковая цена
            </div>
            {#if samePrice}
                <div class="main-text {samePrice==true?'':'hidden'}">
                    <input class="changePrice" id="changePrice"  bind:value={allPrice} type="text"/> ₽/шт.
                </div>
            {/if}
        </div>
        <div class="colorsBlock custom-scrollbar">
            {#each oldProduct as color}
            <div class="flex colorBlock">
                <div class="element__name-color">
                    <CustomCheckbox  id={color.color}
                                     label={color.color}
                                     bind:check={color.checked}
                    style="font-size: 15px;
        color: var(--color-main);"/>
                </div>
                <div class="flex justify-between">
                    {#if color.checked}
                        {#if onePrice == true}
                            <div class="element_price">
                                <input class="changePrice {color.price == '' ? 'error' : ''}" bind:value={color.price} type="text"/> ₽/шт.
                            </div>
                        {/if}
                    {#if onePrice == false}
                        {#each color.prices as price}
                            <div class="element_price main-text">
                                <input class="changePrice {price.price == '' ? 'error' : ''}" bind:value={price.price} type="text"/> ₽/шт.
                                <div class="subText mt-8">{price.count}</div>
                            </div>
                        {/each}
                    {/if}
                    {/if}
                </div>
            </div>
            {/each}
        </div>
        <div class="footer flex items-center">
            <div class="buttons flex">
                <Button size="lg" className="mr-24"
                        on:click={()=>{
                        closeAndSaveWindow()
                        }}>Сохранить</Button>
                <Button size="lg" status="active-secondary" on:click={()=>{ visible = false}}>Отменить</Button>
                    {#if errorValid == true}
                        <div class="flex items-center ml-48 errorText">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none" class="mr-12">
                                <path d="M23.7709 19.0819L13.4632 1.22845C13.1578 0.699464 12.6108 0.383667 12 0.383667C11.3892 0.383667 10.8422 0.699464 10.5368 1.22845L0.229078 19.0819C-0.0763594 19.6109 -0.0763594 20.2425 0.229078 20.7715C0.534469 21.3005 1.08145 21.6163 1.69228 21.6163H22.3077C22.9185 21.6163 23.4655 21.3005 23.7709 20.7715C24.0764 20.2425 24.0764 19.6109 23.7709 19.0819ZM22.5516 20.0675C22.5213 20.1201 22.4491 20.2083 22.3078 20.2083H1.69228C1.55081 20.2083 1.47872 20.1202 1.44844 20.0675C1.41811 20.015 1.3777 19.9084 1.44844 19.7859L11.7561 1.93242C11.8268 1.80993 11.9392 1.7916 12 1.7916C12.0607 1.7916 12.1731 1.80989 12.2438 1.93242L22.5516 19.7859C22.6223 19.9084 22.5819 20.015 22.5516 20.0675Z" fill="#E81717"/>
                                <path d="M12.7044 6.78564H11.2964V14.2949H12.7044V6.78564Z" fill="#E81717"/>
                                <path d="M12.0002 17.5802C12.5186 17.5802 12.9389 17.16 12.9389 16.6415C12.9389 16.1231 12.5186 15.7029 12.0002 15.7029C11.4818 15.7029 11.0615 16.1231 11.0615 16.6415C11.0615 17.16 11.4818 17.5802 12.0002 17.5802Z" fill="#E81717"/>
                            </svg>
                            Пожалуйста, отметьте цвета в наличии
                        </div>
                    {/if}
            </div>

        </div>
    </div>

</ModalSurface>