<script>
    import { onMount } from "svelte";
    import maplibregl from "maplibre-gl";
    import osmBright from "$lib/maplibre/osm-bright.json";

    let map;

    let center = new maplibregl.LngLat(-79.941013, 40.439938);

    onMount(() => {
        let map = new maplibregl.Map({
            container: "map", // container id
            style: "https://api.maptiler.com/maps/outdoor-v2/style.json?key=WYBGJJDhMhxLW8Icu2a0", // style URL
            center: center, // starting position [lng, lat]
            zoom: 13, // starting zoom
        });

        return () => {
            map.remove(); // Clean up the map instance on component destroy
        };
    });
</script>

<div id="map"></div>

<style>
    #map {
        width: 100%;
        height: 100%;
    }
</style>
