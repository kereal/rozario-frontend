<script>
    export let post;
</script>

<style>
.post {
    width: 247px;
    height: 230px;
}
    .photo {
        border-radius: 16px;
        width: 100%;
        height: 150px;
    }
.title {
    font-weight: 600;
    font-size: 14px;
    color: var(--color-main);
    margin-top: 12px;
}
.date {
    font-size: 12px;
    color: var(--gray-700);
    margin-top: 6px;
}
    img {
        border-radius: 16px;
        width: 100%;
        height: 100%;
    }
</style>

<div class="post">
    <div class="photo relative w-full rounded-t">
        <picture>
            <source data-srcset="{post.photo}.webp, {post.photo}-2x.webp 2x" />
            <img
                    class="w-full absolute h-full object-cover"
                    data-srcset="{post.photo}-2x.png 2x"
                    data-src="{post.photo}.png"
                    alt={post.title} />
        </picture>
        <noscript>
            <img srcset="{post.photo}-2x.png 2x" src="{post.photo}.png" alt="{post.title}">
        </noscript>
    </div>
    <div class="title">
        {post.title}
    </div>
    <div class="date">
        {post.date}
    </div>
</div>