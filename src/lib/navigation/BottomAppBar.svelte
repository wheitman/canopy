<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "../misc/Icon.svelte";
  // import "@material/web/button/filled-button.js";
  import NavigationRailButton from "./NavigationRailButton.svelte";
  import RosListener from "$lib/ros/RosListener.svelte";
  import logo from "$lib/images/logo.svg";
  import { connection_status, ConnectionStatus } from "$lib/stores";
  import BehaviorStateIndicator from "$lib/ros/BehaviorStateIndicator.svelte";
  import ConnectionIndicator from "$lib/ros/ConnectionIndicator.svelte";
  import HealthCheckIndicator from "$lib/ros/HealthCheckIndicator.svelte";
  import { base } from "$app/paths";
</script>

<!-- https://m3.material.io/components/navigation-rail/overview -->

<div
  class="bg-white border-r-2 shadow-xl h-16 fixed bottom-0 w-full flex flex-row justify-around md:hidden"
>
    <NavigationRailButton
      icon="school"
      label="Demo"
      url="{base}/demo"
      enabled={true}
    ></NavigationRailButton>
    <NavigationRailButton
      icon="palette"
      label="Design"
      url="{base}/design/new"
      enabled={true}
    ></NavigationRailButton>
    <NavigationRailButton
      icon="smart_toy"
      label="Control"
      url="{base}/control"
      enabled={true}
    ></NavigationRailButton>

  <!-- <NavigationRailButton icon="settings" label="Settings" url="{base}/settings"
    ></NavigationRailButton> -->
  <!-- 
    <NavigationRailButton
      icon="stethoscope"
      label="Diagnostics"
      url="{base}/diagnostics"
    ></NavigationRailButton> -->

  <!-- <NavigationRailButton
      icon="query_stats"
      label="Statistics"
      url="{base}/statistics"
    ></NavigationRailButton> -->
  <!-- <NavigationRailButton icon="monitoring" label="Stats" url="/" enabled={true}
    ></NavigationRailButton>
    <NavigationRailButton
      icon="settings"
      label="Settings"
      url="/"
      enabled={true}
    ></NavigationRailButton> -->
    {#if $connection_status == ConnectionStatus.CONNECTED}
      <!-- <BehaviorStateIndicator /> -->
      <HealthCheckIndicator />
    {:else}
      <!-- <ConnectionIndicator mini /> -->
    {/if}
</div>

<style>
  #logo {
    font-size: 2rem;
    font-family: "Bitter", serif;
    font-style: italic;
    margin-left: auto;
    margin-right: auto;
    padding-top: 1rem;
  }

  #logo-img {
    image-rendering: optimizeSpeed; /* STOP SMOOTHING, GIVE ME SPEED  */
    image-rendering: -moz-crisp-edges; /* Firefox                        */
    image-rendering: -o-crisp-edges; /* Opera                          */
    image-rendering: -webkit-optimize-contrast; /* Chrome (and eventually Safari) */
    image-rendering: pixelated; /* Universal support since 2021   */
    image-rendering: optimize-contrast; /* CSS3 Proposed                  */
    -ms-interpolation-mode: nearest-neighbor; /* IE8+                           */
    width: 2.5rem;
  }
  #status {
    font-size: 2rem;
    font-family: "Bitter", serif;
    font-style: italic;
    margin-left: auto;
    margin-right: auto;
    padding-top: 1rem;
  }
  .link-container {
    width: 100%;
    height: 5rem;
    max-height: 5rem;
    /* background-color: #f5f5ee; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>
