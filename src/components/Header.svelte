<script>
    import Breadcrumbs from "./Breadcrumbs.svelte";
    export let pathlist;
    export let photo;
    export let photo1_5;
    export let photo2;
    export let photo3;
    export let h1;
    export let text;
    if (typeof (text) === 'undefined') {
        text = '';
    }

</script>
<style>
    .header {
        min-height: 398px;
        padding: 0 80px 0;
        display: flex;
        flex-direction: column;
    }
    .header .breadcrumbs {
        margin-top: auto;
    }
    h1 {
        font-size: 50px;
        line-height: 135%;
        margin-top: 8px;
    }
    .header img {
        z-index: -2;
    }
    .header::before {
        content: '';
        background: linear-gradient(180deg, #E7E6E6 0%, #9B9999 100%);
        border-radius: 4px 4px 0px 0px;
        opacity: 0.7;
        position: absolute;
        z-index: -1;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .header,
    .header :global(a),
    .header :global(li+li::before) {
        color: var(--color-light);
    }
    .header p {
        font-size: 14px;
        margin-top: 18px;
        padding-top: 10px;
        border-top: 1px solid rgba(255,255,255, .2);
    }
    .breadcrumbs :global(li) {
        font-size: 16px;
    }
    .breadcrumbs :global(li a) {
        opacity: .8;
    }
    .breadcrumbs :global(li a:hover) {
        opacity: 1;
    }
    @media (max-width: 1300px) {
        .header {
            font-size: 15px;
        }
        .header {
            padding: 0 44px 0;
        }
    }
</style>
<div class="header image-box relative">
    {#if photo}
        <img
            class="w-full h-full rounded absolute object-cover inset-0"
            data-src="{photo}"
            data-srcset="{photo},
                {photo1_5} 1.5x,
                {photo2} 2x,
                {photo3} 3x"
            itemprop="image"
            alt="photo" />
    {/if}
    <div class="breadcrumbs">
        <Breadcrumbs {pathlist} />
    </div>
    <h1 class="font-bold">{h1}</h1>
    <p>{text}</p>
    <slot />
</div>
