<script>
    import { createEventDispatcher } from "svelte";
    import { fade, fly } from "svelte/transition";
    import Icon from "./Icon.svelte";
    // import SuccessIcon from "./SuccessIcon.svelte";
    // import ErrorIcon from "./ErrorIcon.svelte";
    // import InfoIcon from "./InfoIcon.svelte";
    // import CloseIcon from "./CloseIcon.svelte";

    const dispatch = createEventDispatcher();

    export let type = "error";
    export let delay = 5;

    setTimeout(() => {
        dispatch("dismiss");
    }, delay * 1000);
</script>

<!-- {#if type === "success"}
        <SuccessIcon width="1.1em" />
    {:else if type === "error"}
        <ErrorIcon width="1.1em" />
    {:else}
        <InfoIcon width="1.1em" />
    {/if} -->
<div
    class="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700 mb-2"
    role="alert"
    tabindex="-1"
    aria-labelledby="hs-toast-solid-color-dark-label"
    in:fly
    out:fly
>
    <div
        id="hs-toast-solid-color-dark-label"
        class="flex flex-row p-4 items-center"
    >
        {#if type == "success"}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 mr-2 text-meadow-500"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                />
            </svg>
        {:else if type == "error"}
            <div class="pr-4">
                <Icon id="error" size="2rem" color="#ff0000" fill="0" />
            </div>
        {:else if type == "info"}
            <div class="pr-4">
                <Icon id="lightbulb" size="2rem" fill="0" />
            </div>
        {/if}
        <slot />
    </div>
</div>

<style lang="postcss">
</style>
