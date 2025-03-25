<script lang="ts">
    import { MapLibre } from "svelte-maplibre";
    import MapboxDraw from "@mapbox/mapbox-gl-draw";
    import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
    import "svelte-maplibre/draw-plugin.css";
    import type maplibregl from 'maplibre-gl';
	import type p5 from 'p5'


    let map: maplibregl.Map | undefined = $state();

    function createMapboxDraw() {
        let draw = new MapboxDraw();
        const origOnAdd = draw.onAdd.bind(draw);

        // MapboxDraw assumes that the `mapboxgl-ctrl-group` and `mapboxgl-ctrl` CSS classes exist,
        // but Maplibre uses different names, so add them to the control element here.
        //
        // @ts-expect-error draw's onadd expects a mapboxgl.Map but we have a maplibregl.Map, which has close enough to the
        // same API.
        draw.onAdd = (map: maplibregl.Map) => {
            // @ts-expect-error Same as above
            let el = origOnAdd(map);
            el.classList.add("maplibregl-ctrl-group");
            el.classList.add("maplibregl-ctrl");
            return el;
        };

        return draw;
    }

    let draw = createMapboxDraw();
    $effect(() => {
        // @ts-expect-error
        map.addControl(draw);
    });
</script>

<div class="flex flex-col h-full w-full">
    <div class="grow">
        <MapLibre
            bind:map
            center={[-79.941013, 40.439938]}
            zoom={14}
            class="map"
            standardControls
            style="https://api.maptiler.com/maps/outdoor-v2/style.json?key=WYBGJJDhMhxLW8Icu2a0"
        />
    </div>
    <!-- <Navbar /> -->
</div>

<style>
    :global(.map) {
        height: 100%;
    }
</style>
