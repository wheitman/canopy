<script>
  import "../app.css";
  import "./styles.css";
  import "./style.scss";
  import "$lib/css/material/light.css";
  import "leaflet/dist/leaflet.css";
  import "leaflet-draw/dist/leaflet.draw.css";
  import NavigationRail from "../lib/navigation/NavigationRail.svelte";
  import Toasts from "../lib/misc/Toasts.svelte";
  import ConnectionIndicator from "$lib/ros/ConnectionIndicator.svelte";
  import { connection_status, ConnectionStatus } from "$lib/stores";
  import RosListener from "$lib/ros/RosListener.svelte";
  import { onNavigate } from "$app/navigation";
  import BottomAppBar from "$lib/navigation/BottomAppBar.svelte";

  let innerWidth = 0;
  let innerHeight = 0;

  $: condition = innerWidth * 1.33 >= innerHeight;

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div
  class="app overflow-hidden"
  class:mobile-app={!condition}
  class:app={condition}
>
  <RosListener />

  <Toasts />

  <NavigationRail />
  <main class="p-0 overflow-hidden">
    <slot />
  </main>
  <BottomAppBar />
</div>

<style lang="scss">
  .mobile-app {
    display: flex;
    flex-direction: column-reverse;
    width: 100vw;
    height: 100vh;
  }
  .app {
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* max-width: 64rem; */
    margin: 0 auto;
    box-sizing: border-box;
    background-color: #fffcf5;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }

  /* PAGE VIEW TRANSITIONS */

  /* END PAGE VIEW TRANSITIONS */
</style>
