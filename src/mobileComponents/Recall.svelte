<script>
    export let recall;
</script>

<style>
    .recall {
        width: 247px;
        height: 275px;
        max-height: 204px;
        color: var(--color-main);
    }
    .testimonial {
        font-size: 13px;
        line-height: 140%;
        width: 247px;
        height: 144px;
        background: var(--gray-200);
        border-radius: 16px 16px 16px 0px;
        overflow: hidden;
        padding: 14px 16px;
    }
    .name {
        font-weight: 600;
        font-size: 13px;
        margin: 6px 0 0 0;
    }
    .info {
        font-size: 11px;
        line-height: 140%;
        color: var(--color-info-light);
    }

</style>

<div class="recall">
    <div class="testimonial">
        {recall.testimonial}
    </div>
    <div class="name">
        {recall.name}
    </div>
    <div class="info">
        {recall.date} | {recall.ordernumber}
    </div>
</div>