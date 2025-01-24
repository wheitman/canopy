<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "../misc/Icon.svelte";
  export let icon: string;
  export let label: string;
  export let enabled: boolean = true;
  export let selected: boolean = false;
</script>

<!-- https://m3.material.io/components/navigation-rail/overview -->

<button
  on:click
  class={enabled ? "rail-button" : "rail-button disabled-button"}
>
  <div
    class="active-indicator"
    style="--active-color: {selected
      ? 'var(--md-sys-color-secondary-container)'
      : 'none'}"
  >
    <Icon
      id={icon}
      color={selected
        ? "var(--md-sys-color-on-secondary-container)"
        : "var(--md-sys-color-on-surface-variant)"}
    ></Icon>
  </div>
  <div id="label">{label}</div>
</button>

<style>
  .disabled-button {
    opacity: 0.38;
    pointer-events: none;
  }
  #label {
    font-size: 0.75rem;
    font-weight: 500;
    padding-top: 0.25rem;
  }
  .rail-button {
    width: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  .active-indicator {
    height: 2rem;
    width: 3.5rem;
    background-color: var(--active-color);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
</style>
