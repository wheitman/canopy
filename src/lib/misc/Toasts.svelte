<script lang="ts">
    import Toast from "./Toast.svelte";

    import { dismissToast, toasts } from "$lib/stores";
</script>

{#if $toasts}
    <section>
        {#each $toasts as toast (toast.id)}
            <Toast type={toast.type} on:dismiss={() => dismissToast(toast.id)}
                >{toast.message}</Toast
            >
        {/each}
    </section>
{/if}

<style lang="postcss">
    section {
        position: fixed;
        bottom: 0;
        left: 40vw;
        /* width: 100%; */
        display: flex;
        margin-top: 1rem;
        justify-content: center;
        flex-direction: column;
        z-index: 1000;
    }
</style>
