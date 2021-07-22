<script>
    export let stage;
    export let last = false;
</script>

<style>
.stage {
    background:var(--color-light);
    border: 1px solid var(--gray-300);
    box-sizing: border-box;
    border-radius: 4px;
    width: 104px;
    height: 151px;
    position: relative;
}
    .header {
        background: radial-gradient(95.46% 87.62% at 50% 87.62%, #FFCCCC 0%, rgba(239, 210, 210, 0.571429) 42.86%, rgba(218, 218, 218, 0) 100%);
        height: 74px;
    }
    .footer {
        font-size: 12px;
        line-height: 120%;
        color: var(--gray-600);
        padding: 8px 12px;
    }
    .footer svg{
        position: absolute;
        bottom: 4px;
        right: 8px;
        fill:#330033;
        width: 40px;
        height: 20px;
    }


</style>

<div class="stage">
    <div class="header flex justify-center items-center">
        {@html stage.icons}
    </div>
    <div class="footer">
        <div class="text">
            {stage.text}
        </div>
        {#if !last }
            <svg class='afterOrder__stage_arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20px" height="10px">
                <path d="M31.7 15.3L21.3 6.7c-.4-.3-.9-.3-1.2.1-.3.4-.3.9.1 1.2l8.5 7.1H.9c-.5 0-.9.4-.9.9s.4.9.9.9h27.9L20.2 24c-.4.3-.4.9-.1 1.2.2.2.4.3.7.3.2 0 .4-.1.6-.2l10.4-8.6c.2-.2.3-.4.3-.7-.1-.3-.2-.5-.4-.7z"/>
            </svg>
        {:else}
            <svg class='afterOrder__stage_arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="15px" height="10px">
                <path d="M12.6 26.3c-.3 0-.6-.1-.8-.3L.3 14.5c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l10.6 10.6L30 6c.4-.4 1.2-.4 1.6 0 .4.4.4 1.2 0 1.6L13.4 26c-.2.2-.5.3-.8.3z"/>
            </svg>
        {/if}
    </div>
</div>