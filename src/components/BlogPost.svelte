<script>
    export let blogpost;
    export let group;
</script>

<style>
    .blog-post-card {
        max-width: 300px;
        min-width: 201px;
        margin: 24px 50px 24px 0;
        width: calc(100% / 3 - 50px * 2 / 3);
        border-radius: 4px;
        box-shadow: 0px 4px 15px rgba(51, 0, 51, 0.1);
        cursor: pointer;
        transition: filter .2s;
    }
    .blog-post-card:hover {
        box-shadow: 0 4px 15px rgba(51, 0, 51, 0.4);
    }
    .blog-post-card:nth-child(3n + 3) {
        margin-right: 0;
    }
    .image {
        background-image: url("../../static/loading-bg-image.svg");
        height: 197px;
        object-position: center;
        object-fit: cover;
        border-radius: 4px 4px 0px 0px;
        overflow: hidden;
    }
    h3 {
        font-weight: bold;
        font-size: 18px;
        line-height: 130%;
        color: var(--color-main);
        margin: 0 0 12px;
    }
    .text-short {
        font-size: 14px;
        line-height: 135%;
        color: var(--gray-600);
        margin-bottom: 18px;
    }
    time {
        font-size: 13px;
        line-height: 120%;
        color: var(--gray-700);
    }
    time + p {
        margin-left: auto;
        font-size: 13px;
        line-height: 120%;
        color: var(--gray-700);
    }
    .info {
        padding: 18px 24px;
        background: #fff;
        border-radius: 0px 0px 4px 4px;
    }
    @media screen and (max-width: 1300px) {
        .blog-post-card {
            margin: 24px 30px 6px 0;
            width: calc(100% / 3 - 30px * 2 / 3);
            max-width: calc(100% / 3 - 30px * 2 / 3);
        }
    }
    @media screen and (max-width: 1000px) {
        .blog-post-card {
            margin: 18px 34px 12px 0;
        }
    }
</style>

<a href="{'/blog/' + group + '/' + blogpost.slug}" class="blog-post-card flex flex-col rounded">
    <div class="image relative w-full rounded-t">
        <picture>
            <source data-srcset="{blogpost.img}.webp, {blogpost.img}-2x.webp 2x" />
            <img
                    class="w-full absolute h-full object-cover"
                    data-srcset="{blogpost.img}-2x.png 2x"
                    data-src="{blogpost.img}.png"
                    alt={blogpost.title} />
        </picture>
        <noscript>
            <img srcset="{blogpost.img}-2x.png 2x" src="{blogpost.img}.png" alt="{blogpost.title}">
        </noscript>
    </div>
    <div class="info flex-grow flex flex-col">
        <h3 class="text-main text-lg leading-tight mb-8">{blogpost.title}</h3>
        <div class="text-short flex-grow">{blogpost.short}</div>
        <div class="flex items-center text-xs text-gray-500 mb-4">
            <time datetime={`${blogpost.date_full}`}>
                {blogpost.date_short}
            </time>
            <p>{blogpost.reading_time} чтения</p>
        </div>
    </div>
</a>
