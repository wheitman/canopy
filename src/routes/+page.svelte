<script>
  import Counter from "./Counter.svelte";
  import welcome from "$lib/images/svelte-welcome.webp";
  import welcome_fallback from "$lib/images/svelte-welcome.png";
  import Map from "$lib/misc/OsmMap.svelte";

  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { onMount } from "svelte";

  onMount(() => {
    goto(`${base}/design/new`);
  });
</script>

<svelte:head>
  <title>Home</title>
  <meta
    name="description"
    content="Canopy: Plan forests and control your robot"
  />
</svelte:head>

<section>
  <Map></Map>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
    height: 100%;
  }

  h1 {
    width: 100%;
  }

  .welcome {
    display: block;
    position: relative;
    width: 100%;
    height: 0;
    padding: 0 0 calc(100% * 495 / 2048) 0;
  }

  .welcome img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: block;
  }
</style>
