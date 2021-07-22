<div class="ImageCropper">

        <div class="ImageCropper__croppie">
            <CroppieContainer bind:selected={selected} />
        </div>

</div>

<style>
    .ImageCropper {
        font-family: Arial, sans-serif;
    }

    .ImageCropper .ImageCropper__imageViewer {
        margin-top: 16px;
    }
</style>

<script>
    import Croppie from 'Croppie';
    import CroppieContainer from '../components/CroppieContainer.svelte'
    export let selected;

</script>