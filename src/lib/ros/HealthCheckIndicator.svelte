<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "../misc/Icon.svelte";
  import {
    connection_status,
    ConnectionStatus,
    node as nodeWritable,
    failed_checks,
    heartbeat_toggle,
    systemwide_status_level,
    systemwide_status_message,
  } from "$lib/stores";
  import { Popover, Separator, Toggle } from "bits-ui";
  import { fly } from "svelte/transition";
  import { fail } from "@sveltejs/kit";

  let state_label: string = "?";
  // current_behavior_state.subscribe((value) => {
  //   if (value == BehaviorState.DRIVING) state_label = "D";
  //   else if (value == BehaviorState.PAUSED) state_label = "P";
  //   else if (value == BehaviorState.PLANTING) state_label = "Pl";
  //   else state_label = "?";
  // });
</script>

<Popover.Root>
  <Popover.Trigger
    class="flex flex-col h-32
	items-center justify-center whitespace-nowrap rounded-input bg-dark px-[21px] text-[15px] font-medium text-background shadow-mini transition-all hover:cursor-pointer hover:bg-dark/95 active:scale-98"
  >
    {#each $failed_checks as check}
      {#if check.code == "BRIDGE_FAILURE"}
        <Icon id="link" color="#cc0000" size="2rem" />
      {:else if check.code == "LOCALIZATION_UNAVAILABLE"}
        <Icon id="my_location" color="#fc8913" size="2rem" />
      {:else if check.code == "TRAJECTORY_PLANNING_FAILURE"}
        <Icon id="alt_route" color="#cc0000" size="2rem" />
      {:else if check.code == "BEHAVIOR_FAILURE"}
        <Icon id="cognition" color="#cc0000" size="2rem" />
      {:else if check.trigger_status.level == 3}
        🔴
      {:else if check.trigger_status.level == 2}
        🟠
      {:else}
        ?
      {/if}
    {/each}

    {#if $failed_checks.length == 0}
      <Icon id="check" color="#007c63" size="2rem" />
    {/if}
    <div class="pt-4">
      {#if $heartbeat_toggle}
        <Icon id="circle" color="#404943" size="0.7rem" />
      {:else}
        <Icon id="circle" color="#404943" size="0.7rem" fill="0" />
      {/if}
    </div>
  </Popover.Trigger>
  <Popover.Content
    class="z-30 w-full max-w-[328px] rounded-[12px] border border-dark-10 bg-white shadow-popover"
    transition={fly}
    transitionConfig={{ duration: 100 }}
    sideOffset={8}
    side="right"
  >
    <div class="flex flex-col">
      {#if $failed_checks.length == 0}
        <div class="flex flex-row bg-neutral-200 px-2 gap-4 rounded-t-lg">
          <Icon id="check" color="green" size="1.5rem" fill="0" />
          <p class="text-sm p-2">
            Steward's Health Monitor has detected no issues.
          </p>
        </div>
      {:else}
        <div class="flex flex-row bg-neutral-200 px-2 gap-4 rounded-t-lg">
          <Icon id="warning" color="" size="1.5rem" fill="0" />
          <p class="text-sm p-2">
            Steward's Health Monitor has detected {$failed_checks.length}
            {$failed_checks.length < 2 ? "issue" : "issues"}:
          </p>
        </div>
      {/if}
      {#each $failed_checks as check, i}
        <div class="flex flex-row py-2 px-2">
          {#if check.code == "BRIDGE_FAILURE"}
            <Icon id="link" color="#cc0000" size="2rem" />
          {:else if check.code == "LOCALIZATION_UNAVAILABLE"}
            <Icon id="my_location" color="#fc8913" size="2rem" />
          {:else if check.code == "TRAJECTORY_PLANNING_FAILURE"}
            <Icon id="alt_route" color="#cc0000" size="2rem" />
          {:else if check.code == "BEHAVIOR_FAILURE"}
            <Icon id="cognition" color="#cc0000" size="2rem" />
          {:else if check.trigger_status.level == 3}
            🔴
          {:else if check.trigger_status.level == 2}
            🟠
          {:else}
            ?
          {/if}
          <p class="italic ml-2">{check.message}</p>
        </div>
        {#if i < $failed_checks.length - 1}
          <Separator.Root
            class="shrink-0 bg-neutral-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
          />
        {/if}
      {/each}
    </div>
  </Popover.Content>
</Popover.Root>

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
