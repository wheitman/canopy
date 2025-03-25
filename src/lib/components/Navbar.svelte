<script>
    import { Brush, Bot } from "lucide-svelte";
    import { Button } from "bits-ui";
</script>

<div class="h-14 flex flex-row items-center justify-center">
    <Button.Root
        class="rounded-lg text-dark  hover:bg-dark/5 border-none
    h-10 items-center justify-center px-[21px] text-[15px]
    font-semibold active:scale-[0.98] active:transition-all flex flex-col"
        href="/design"
    >
        <Brush />
        Design
    </Button.Root>
    <Button.Root
        class="rounded-lg text-dark  hover:bg-dark/5 border-none
    h-10 items-center justify-center px-[21px] text-[15px]
    font-semibold active:scale-[0.98] active:transition-all flex flex-col"
        href="/control"
    >
        <Bot />
        Control
    </Button.Root>
</div>

<style>
</style>
