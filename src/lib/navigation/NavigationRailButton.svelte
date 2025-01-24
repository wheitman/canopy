<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "../misc/Icon.svelte";
  export let icon: string;
  export let label: string;
  export let url: string;
  export let enabled: boolean = true;
</script>

<!-- https://m3.material.io/components/navigation-rail/overview -->

<a
  class:disabled-button={!enabled}
  class="rail-button no-underline transition-all"
  href={url}
>
  <div
    class="active-indicator no-underline"
    style="--active-color: {$page.url.pathname == url
      ? 'var(--md-sys-color-secondary-container)'
      : 'none'}"
  >
    <Icon
      id={icon}
      size="1.75rem"
      color={$page.url.pathname == url
        ? "var(--md-sys-color-on-secondary-container)"
        : "var(--md-sys-color-on-surface-variant)"}
      fill="0"
    ></Icon>
  </div>
  <div id="label" class="no-underline">{label}</div>
</a>

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
    margin-bottom: 1.5rem;
    text-decoration: none;
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
