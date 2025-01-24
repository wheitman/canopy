<script lang="ts">
  import type { Species } from "$lib/forest_generator";
  import { base } from "$app/paths";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // import { page } from "$app/stores";
  export let species: Species;
  export let selected: boolean = false;

  function handleClick() {
    selected = !selected;
    dispatch("toggled");
  }
</script>

<button
  class="w-full flex flex-row p-2 my-2 border-2 rounded-lg"
  on:click={handleClick}
  class:bg-lime-200={selected}
  class:border-lime-400={selected}
>
  <img
    src="{base}/res/leaves/{species.icon}.svg"
    alt=""
    class="w-12 h-12 p-2"
  />
  <div class="flex flex-col items-start">
    <p class="text-lg font-medium">
      {species.common}
    </p>
    <p class="text-sm italic">
      {species.scientific}
    </p>
  </div>
</button>

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
