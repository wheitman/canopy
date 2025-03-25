<script lang="ts">
    import { MapLibre } from "svelte-maplibre";
    import type p5 from "p5";
    import { Slider, Label } from "bits-ui";
    import { cn } from "$lib/utils/styles.js";
    import { onMount } from "svelte";

    let periodSliderValue = $state(4.91);
    let cyclesSliderValue = $state(3.0);
    let lineThicknessSliderValue = $state(3.0);

    onMount(async () => {
        const P5 = await import("p5");

        // Creating the sketch itself
        const sketch = (p5: p5) => {
            // let periodSlider: p5.Element
            let cyclesSlider: p5.Element;
            let circleX = 200;
            let circleY = 200;

            // The sketch setup method
            p5.setup = () => {
                // Creating and positioning the canvas
                const canvas = p5.createCanvas(p5.windowWidth, 400);
                canvas.parent("rose-app");

                p5.angleMode(p5.DEGREES);
            };

            // The sketch draw method
            p5.draw = () => {
                p5.background(255);
                p5.noStroke();
                p5.textSize(20);
                p5.textAlign(p5.LEFT, p5.CENTER);
                p5.fill(0);
                p5.text(`b = ${periodSliderValue}`, 10, 20);
                p5.text(`c = ${cyclesSliderValue}`, 10, 40);

                p5.noFill();
                p5.stroke(128);
                p5.strokeWeight(lineThicknessSliderValue);

                p5.fill(255);

                p5.noStroke();

                p5.fill("white");
                // circle(pointX, pointY, 10);

                p5.fill("orange");
                // circle(pointX, circleY, 10);

                p5.fill("red");

                p5.noFill();
                p5.stroke("orange");
                p5.beginShape();

                let a = 150.0;
                let b = periodSliderValue;
                // let b = 5.10;
                let r = 0;
                let cycles = cyclesSliderValue;
                console.log(periodSliderValue);
                // let r = a * sin(b*angle);
                for (let t = 0; t <= 360 * cycles; t++) {
                    r = a * p5.sin(b * t);
                    let x = r * p5.cos(t) + circleX;
                    let y = r * p5.sin(t) + circleY;
                    // let x = map(t, 0, 360, circleX, circleX + graphPeriod);
                    // let y = circleY - graphAmplitude * cos(t);
                    p5.vertex(x, y);
                }
                p5.endShape();
            };

            p5.mouseDragged = () => {
                // Set the color based on the mouse position, and draw a line
                // from the previous position to the current position
                let lineHue = p5.mouseX - p5.mouseY;
                p5.stroke(lineHue, 90, 90);
                p5.line(p5.pmouseX, p5.pmouseY, p5.mouseX, p5.mouseY);
            };
        };

        new P5.default(sketch);
    });
</script>

<!-- <div class="w-[90%] h-[90%] bg-spring-400"></div> -->

<div class="container">
    <div id="rose-app" class="overflow-hidden"></div>
</div>

<div>
    <div class="flex items-center space-x-3 w-full md:max-w-[400px] py-2">
        <Label.Root
            id="terms-label"
            for="terms"
            class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-32"
        >
            Period
        </Label.Root>

        <Slider.Root
            type="single"
            bind:value={periodSliderValue}
            min={0.0}
            max={20.0}
            step={0.01}
            class="relative flex w-full touch-none select-none items-center"
        >
            {#snippet children()}
                <span
                    class="relative h-2 w-full grow cursor-pointer overflow-hidden rounded-full bg-dark-10"
                >
                    <Slider.Range class="absolute h-full bg-foreground" />
                </span>
                <Slider.Thumb
                    index={0}
                    class={cn(
                        "block size-[25px] cursor-pointer rounded-full border border-border-input bg-background shadow transition-colors hover:border-dark-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 active:scale-98 disabled:pointer-events-none disabled:opacity-50 dark:bg-foreground dark:shadow-card",
                    )}
                />
            {/snippet}
        </Slider.Root>
    </div>
    <div class="flex items-center space-x-3 w-full md:max-w-[400px] py-2">
        <Label.Root
            class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-32"
        >
            Cycles
        </Label.Root>

        <Slider.Root
            type="single"
            bind:value={cyclesSliderValue}
            min={0.0}
            max={4.0}
            step={1.0}
            class="relative flex w-full touch-none select-none items-center"
        >
            {#snippet children()}
                <span
                    class="relative h-2 w-full grow cursor-pointer overflow-hidden rounded-full bg-dark-10"
                >
                    <Slider.Range class="absolute h-full bg-foreground" />
                </span>
                <Slider.Thumb
                    index={0}
                    class={cn(
                        "block size-[25px] cursor-pointer rounded-full border border-border-input bg-background shadow transition-colors hover:border-dark-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 active:scale-98 disabled:pointer-events-none disabled:opacity-50 dark:bg-foreground dark:shadow-card",
                    )}
                />
            {/snippet}
        </Slider.Root>
    </div>
    <div class="flex items-center space-x-3 w-full md:max-w-[400px] py-2">
        <Label.Root
            class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-32"
        >
            Stroke Weight
        </Label.Root>

        <Slider.Root
            type="single"
            bind:value={lineThicknessSliderValue}
            min={1.0}
            max={10.0}
            step={0.01}
            class="relative flex w-full touch-none select-none items-center"
        >
            {#snippet children()}
                <span
                    class="relative h-2 w-full grow cursor-pointer overflow-hidden rounded-full bg-dark-10"
                >
                    <Slider.Range class="absolute h-full bg-foreground" />
                </span>
                <Slider.Thumb
                    index={0}
                    class={cn(
                        "block size-[25px] cursor-pointer rounded-full border border-border-input bg-background shadow transition-colors hover:border-dark-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 active:scale-98 disabled:pointer-events-none disabled:opacity-50 dark:bg-foreground dark:shadow-card",
                    )}
                />
            {/snippet}
        </Slider.Root>
    </div>
</div>

<style>
    /* :global(.map) {
        height: 100%;
    } */
</style>
