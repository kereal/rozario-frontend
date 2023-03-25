<script>
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";
    import ModalSurface from "./ModalSurface.svelte";
    import BlogPromocodeForm from "./BlogPromocodeForm.svelte";
    import Envelope from "./icons/Envelope.svelte";

    export let onSuccess = () => {};
    export let onError = () => {};
    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch("close");
    }

    const onFormSuccess = () => {
        closeModal();
        onSuccess();
    };
    const onFormError = () => {
        closeModal();
        onError();
    };

    onMount(() => {
        setTimeout(() => {
            document.querySelector('.modal-overlay .input input').focus();
        }, 0);
    });

    // FIXME get from store
    export let deal = 0;
</script>

<style>
    div {
        padding: 24px 10px 0;
    }
</style>

<ModalSurface css="height:335px; width: 800px;" on:close={closeModal}>
    <div>
        <BlogPromocodeForm className="{'main-block'}" onSuccess="{onFormSuccess}" onError="{onFormError}">
            <Envelope />
        </BlogPromocodeForm>
    </div>
</ModalSurface>
