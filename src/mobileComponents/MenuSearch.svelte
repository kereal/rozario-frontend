<script>

</script>

<style>
    .search {
        height: 62px;
        border-bottom: 8px solid var(--gray-300);
        border-top: 8px solid var(--gray-300);
        padding: 0 16px;
    }
    input {
        border:none;
        background: transparent;
        font-size: 15px;
        color: var(--color-main);
    }
    input:active, :hover, :focus {
        outline: 0;
        outline-offset: 0;
    }
    input::-webkit-input-placeholder {
        color: var(--gray-600);
    }
    input::-moz-placeholder {
        color: var(--gray-600);
    }
</style>

<div class="search flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class="mr-12">
        <path d="M6.71852 12.5579C9.945 12.5579 12.5606 9.94232 12.5606 6.71584C12.5606 3.48936 9.945 0.873779 6.71852 0.873779C3.49204 0.873779 0.876465 3.48936 0.876465 6.71584C0.876465 9.94232 3.49204 12.5579 6.71852 12.5579Z" stroke="#666666" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10.8701 10.989L15.1235 15.126" stroke="#666666" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <input type="text" placeholder="Поиск">
</div>