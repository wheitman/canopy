<script lang="ts">
  // import { page } from "$app/stores";
  export let id: string;
  export let color: string = "var(--md-sys-color-on-secondary-container)";
  export let size: string = "1rem";
  export let fill: string = "1";
  export let pulse: boolean = false;
  export let spin: boolean = false;
</script>

<div class="icon-container flex justify-center">
  <span
    class="material-symbols-rounded my-auto"
    class:animate-pulse={pulse}
    class:animate-spin={spin}
    style="--icon-color: {color}; --size: {size}; --fill: {fill}"
  >
    {id}
  </span>
</div>

<style>
  .material-symbols-rounded {
    font-variation-settings:
      "FILL" var(--fill),
      "wght" 400,
      "GRAD" 0,
      "opsz" 24;
    color: var(--icon-color);
    font-size: var(--size);
  }
  .icon-container {
    user-select: none;
    background-color: var(--icon-color);
    margin: 0;
  }
</style>
