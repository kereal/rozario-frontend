<script>
  export let blogpost;
</script>

<style>
  .blog-post-card {
    max-width: 24.5rem;
  }
  .image {
    background-image: url("../../static/loading-bg-image.svg");
    height: 384px;
    max-height: 384px;
  }
</style>

<div class="blog-post-card flex flex-col rounded">
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
  <div class="bg-gray-200 px-16 pt-12 pb-12 rounded-b">
    <h2 class="text-main text-lg leading-tight mb-8">{blogpost.title}</h2>
    <div class="flex items-center text-xs text-gray-500 mb-4">
      <time datetime={`${blogpost.date}`}>
        {blogpost.date}
      </time>
      <span class="mx-8">&#8226;</span>
      <p>{blogpost.commentsCount} комментариев</p>
    </div>
  </div>
</div>
