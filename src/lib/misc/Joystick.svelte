<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import Icon from "../misc/Icon.svelte";
    import type { TeleopCommand } from "$lib/stores";
    import { writable } from "svelte/store";

    // CREDIT: https://github.com/stemkoski/HTML-Joysticks/blob/master/index.html

    let stick;
    let dragStart, touchId: number | null;
    let active = false;
    export let maxDistance = 64;
    export let deadzone = 8;

    export let value = writable<TeleopCommand>({ x: 0, y: 0 });

    function handleDown(event: TouchEvent | MouseEvent) {
        if (stick == null) return;
        active = true;
        stick.style.transition = "0s";

        // touch event fired before mouse event; prevent redundant mouse event from firing
        event.preventDefault();

        if (event instanceof TouchEvent) {
            dragStart = {
                x: event.changedTouches[0].clientX,
                y: event.changedTouches[0].clientY,
            };
            touchId = event.changedTouches[0].identifier;
        } else dragStart = { x: event.clientX, y: event.clientY };
    }

    function handleMove(event: TouchEvent | MouseEvent) {
        if (!active || stick == null) return;

        let x = 0,
            y = 0;

        // if this is a touch event, make sure it is the right one
        // also handle multiple simultaneous touchmove events
        let touchmoveId = null;
        if (event instanceof TouchEvent) {
            for (let i = 0; i < event.changedTouches.length; i++) {
                if (touchId == event.changedTouches[i].identifier) {
                    touchmoveId = i;
                    x = event.changedTouches[i].clientX;
                    y = event.changedTouches[i].clientY;
                }
            }

            if (touchmoveId == null) return;
        } else {
            x = event.clientX;
            y = event.clientY;
        }

        const xDiff = x - dragStart.x;
        const yDiff = y - dragStart.y;
        const angle = Math.atan2(yDiff, xDiff);
        const distance = Math.min(maxDistance, Math.hypot(xDiff, yDiff));
        const xPosition = distance * Math.cos(angle);
        const yPosition = distance * Math.sin(angle);

        // move stick image to new position
        stick.style.transform = `translate3d(${xPosition}px, ${yPosition}px, 0px)`;

        // deadzone adjustment
        const distance2 =
            distance < deadzone
                ? 0
                : (maxDistance / (maxDistance - deadzone)) *
                  (distance - deadzone);
        const xPosition2 = distance2 * Math.cos(angle);
        const yPosition2 = distance2 * Math.sin(angle);
        const xPercent = parseFloat((xPosition2 / maxDistance).toFixed(4));
        const yPercent = parseFloat((yPosition2 / maxDistance).toFixed(4));

        value.set({ x: xPercent, y: yPercent });
    }

    function handleUp(event: TouchEvent | MouseEvent) {
        if (!active || stick == null) return;

        // if this is a touch event, make sure it is the right one
        if (
            event instanceof TouchEvent &&
            touchId != event.changedTouches[0].identifier
        )
            return;

        // transition the joystick position back to center
        stick.style.transition = ".2s";
        stick.style.transform = `translate3d(0px, 0px, 0px)`;

        // reset everything
        value.set({ x: 0, y: 0 });

        touchId = null;
        active = false;
    }

    onMount(() => {
        stick = document.getElementById("stick");

        stick.addEventListener("mousedown", handleDown);
        stick.addEventListener("touchstart", handleDown);
        document.addEventListener("mousemove", handleMove, { passive: false });
        document.addEventListener("touchmove", handleMove, { passive: false });
        document.addEventListener("mouseup", handleUp);
        document.addEventListener("touchend", handleUp);
    });
</script>

<div class="w-48 h-48 overflow-hidden">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src="res/joystick-base.png" class="mx-auto pt-8" />
    <div id="stick" class="relative overflow-hidden left-[4rem] top-[-6rem]">
        <!-- svelte-ignore a11y-missing-attribute -->
        <div
            class="w-16 h-16 rounded-[2rem] bg-neutral-700 shadow-2xl overflow-hidden"
        ></div>
    </div>
</div>

<style>
</style>
