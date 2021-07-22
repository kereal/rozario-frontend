<script>
export let className;
</script>

<style>
    .emptyBlock {
        min-width: 16px;
        height: 55px;
        margin-right: 0;
    }
    .conteiner {
        width: auto;
        height: auto;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        padding: 0 16px;
        overflow-y: visible;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    .conteiner div{
        margin-right: 16px;
    }

</style>

<div class="conteiner  flex items-center {className}" >
            <slot></slot>
            <div class="emptyBlock">&#8195;</div>
</div>