<script>

</script>

<style>
    @keyframes animate {
        from {
            bottom: -92px;
            max-height: 0;
        }
        50% {
            max-height: 0;
        }
        to {
            bottom: 10px;
            max-height: 92px;
        }
    }
    .tableStrip {
        width: calc(100%+160px);
        height: 92px;
        position: sticky;
        z-index: 11;
        background: var(--gray-200 );
        bottom: 10px;
        margin-left: -80px;
        margin-right: -80px;
        padding: 0 80px;
        justify-content: flex-end;
        animation-name: animate;
        animation-duration: .3s;
        animation-timing-function: ease-out;
        overflow: hidden;
    }
    .tableStrip__body {
        display: flex;
    }

    @media (max-width: 1300px) {
        .tableStrip {
            width: calc(100%  + 88px);
            margin-left: -44px;
            margin-right: -44px;
            padding: 0 44px;
        }
    }
</style>


<div class="tableStrip flex items-center">
    <div class="tableStrip__body">
        <slot>
        </slot>
    </div>
</div>