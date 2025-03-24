<script>
    import { MapLibre } from "svelte-maplibre";
    import Navbar from "$lib/components/Navbar.svelte";
</script>

<div class="flex flex-col h-full w-full">
    <div class="grow">
        <MapLibre
            center={[-79.941013, 40.439938]}
            zoom={14}
            class="map"
            standardControls
            style="https://api.maptiler.com/maps/outdoor-v2/style.json?key=WYBGJJDhMhxLW8Icu2a0"
        />
    </div>
    <Navbar />
</div>

<style>
    :global(.map) {
        height: 100%;
    }
</style>
