<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "../misc/Icon.svelte";
  import {
    connection_status,
    ConnectionStatus,
    node as nodeWritable,
    BehaviorState,
    current_behavior_state,
  } from "$lib/stores";

  let state_label: string = "?";
  current_behavior_state.subscribe((value) => {
    if (value == BehaviorState.DRIVING) state_label = "D";
    else if (value == BehaviorState.PAUSED) state_label = "P";
    else if (value == BehaviorState.PLANTING) state_label = "Pl";
    else state_label = "?";
  });
</script>

<!-- https://m3.material.io/components/navigation-rail/overview -->

<div class="active-indicator" style="'var(--md-sys-color-secondary-container)'">
  <!-- <Icon
    id={icon}
    color={$page.url.pathname == url
      ? "var(--md-sys-color-on-secondary-container)"
      : "var(--md-sys-color-on-surface-variant)"}
  ></Icon> -->
</div>
<div id="label" class="text-center">{state_label}</div>

<style>
  .disabled-button {
    opacity: 0.38;
    pointer-events: none;
  }
  #label {
    font-size: 2rem;
    font-weight: 500;
    padding-top: 0.25rem;
    color: var(--color-theme-1);
    pointer-events: none;
  }
  .rail-button {
    width: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    margin-bottom: 1.5rem;
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
