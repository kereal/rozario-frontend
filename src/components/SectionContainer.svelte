<script>
    export let last = false;
</script>

<div class="bg-white {!last ? 'mb-8' : ''} w-full border-r border-l border-gray-300">
    <div class="px-80 pt-48 pb-48">
        <slot>
        </slot>
    </div>
</div>
