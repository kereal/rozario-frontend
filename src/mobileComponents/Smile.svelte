<script>
    export let smile;
</script>

<style>
        .smile {
            width: 110px;
            height: 167px;
        }
    .smile img  {
        border-radius: 226px;
        width: 110px;
        height: 110px;
    }
    .photo__name {
        font-size: 13px;
        line-height: 120%;
        text-align: center;
        color: var(--color-main);
        height:28px;
        margin-bottom: 6px;
        margin-top: 8px;
        overflow: hidden;
    }
    .photo__date {
        font-size: 11px;
        line-height: 140%;
        text-align: center;
        color: var(--gray-700);
    }
</style>

<div class="smile">
    <div class="header">
        <picture>
            <source data-srcset="{smile.img}.webp, {smile.img}-2x.webp 2x" />
            <img
                    class="object-cover w-full h-full inset-0"
                    data-srcset="{smile.img}-2x.jpg 2x"
                    data-src="{smile.img}.jpg"
                    alt={smile.title} />
        </picture>
        <noscript>
            <img srcset="{smile.img}-2x.png 2x" src="{smile.img}.png" alt="{smile.title}">
        </noscript>
    </div>
    <div class="footer">
        <p class="photo__name">{smile.title}</p>
        <p class="photo__date">{smile.date}</p>
    </div>
</div>