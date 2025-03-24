<script>
    import { Brush, Shovel, Settings } from "lucide-svelte";
    import { Button } from "bits-ui";
</script>

<div class="h-10 flex flex-row items-center justify-center">
    <Button.Root
        class=" text-dark  hover:bg-dark/5 border-none
    h-full items-center justify-center px-[21px] text-[15px]
    font-semibold active:scale-[0.98] active:transition-all flex flex-col"
    >
        <Brush />
        Unlimited
    </Button.Root>
    <Button.Root
        class=" text-dark  hover:bg-dark/5
    h-full items-center justify-center px-[21px] text-[15px]
    font-semibold active:scale-[0.98] active:transition-all flex flex-col"
    >
        <Shovel />
        Unlimited
    </Button.Root>
    <Button.Root
        class=" text-dark  hover:bg-dark/5
    h-full items-center justify-center px-[21px] text-[15px]
    font-semibold active:scale-[0.98] active:transition-all flex flex-col"
    >
        <Settings />
        Unlimited
    </Button.Root>
</div>

<style>
</style>
