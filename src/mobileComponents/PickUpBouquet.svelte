<script>
    import Popup from './Popup.svelte'
    import RadioButton from './RadioButton.svelte'
    import Button from './Button.svelte'

    export let  visible;
    export let selectionParameters = [
        {
            name:'Выберите кому',
            parametres:['маме', 'жене', 'отцу', 'сыну'],
            group: 'маме'
        },
        {
            name:'Выберите повод',
            parametres:['все', 'день рождения', ' отпуск'],
            group: 'все'
        },
        {
            name:'Выберите тип цветов',
            parametres:['монобукеты' , 'с герберами'],
            group: 'монобукеты'
        }
    ]
</script>

<style>
.infoBlock {
    padding: 16px 0 24px 0;
    border-bottom: 1px solid var(--gray-300);
}
h3 {
    margin-bottom: 16px;
    font-size: 16px;
    color: var(--color-main);
}
.footer {
    height: 115px;
    background: #FFFFFF;
    border-top: 1px solid var(--gray-300);
    padding: 12px 16px;
    box-shadow: 4px 0 4px 4px rgba(0, 0, 0, .05);
    position: sticky;
    margin: 0 -16px;
    bottom:0;
}
    .body__pickUp {
        overflow: scroll;
        height: calc(100% - 145px);

    }


</style>

<Popup title="Подобрать букет" bind:visible={visible} size="max-height:90%; width:100%; overflow:hidden;">
    <div class="body__pickUp">
        {#each selectionParameters as item}
            <div class="infoBlock">
                <h3>
                    {item.name}
                </h3>
                <div class="flex">
                    {#each item.parametres as elem}
                        <div class=" flex-wrap mr-12 mb-12">
                            <RadioButton bind:group={item.group} label={elem} id={elem}  value={elem} text={elem}/>
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
    <div class="footer flex items-center">
    <Button status="active-main" size="full" className="mb-10 w-full">Подобрать букет</Button>
    </div>
</Popup>