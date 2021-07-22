<script>
    import Popup from './Popup.svelte';
    import Button from './Button.svelte';


 function close() {
     visible = !visible
 }
    export let city = '';
    export let visible;
</script>

<style>
    .wrapper {
        height: 100%;
    }
    .search {
        width: 100%;
    }
    .button {
        position: absolute;
        bottom: 24px;
        left: 16px;
        width: calc(100% - 32px);
    }
    input {
        border:none;
        background: transparent;
        font-size: 15px;
        color: var(--color-main);
        width: 100%;
        padding-bottom: 12px;
        border-radius:0;
        -webkit-border-radius:0;
        -moz-border-radius:0;
        border-bottom: 2px solid var(--color-info);
    }

    input:active, :focus {
        outline: 0;
        outline-offset: 0;

    }

    input::-webkit-input-placeholder {
        color: var(--gray-600);
    }
    input::-moz-placeholder {
        color: var(--gray-600);
    }
</style>

<div>
    <Popup title="Изменить город доставки" bind:visible={visible} size="height:90%; width:100%;">
        <div class="wrapper">
            <div class="search flex items-center">
                <input type="text" placeholder="Укажите город доставки">
            </div>
            <div class="body">

            </div>
            <div class="button">
                <Button size="full"  className="mb-10 w-full" on:click={close}>Сохранить</Button>
            </div>
        </div>
    </Popup>
</div>