<script lang="ts">
    import { DefaultMarker, MapEvents, MapLibre } from "svelte-maplibre";
    import { Marker, Popup } from "svelte-maplibre";
    import MapboxDraw from "@mapbox/mapbox-gl-draw";
    import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
    import "svelte-maplibre/draw-plugin.css";
    import type maplibregl from "maplibre-gl";
    import type { LngLat, MapMouseEvent } from "maplibre-gl";
    import { Play, Bot } from "lucide-svelte";

    import { Button } from "bits-ui";
    import type { SvelteComponentTyped } from "svelte";

    import { RosService } from "$lib/ros";
    import { onMount } from "svelte";

    let map: maplibregl.Map | undefined = $state();

    let planning_status: string = $state("Idle");

    let egoLngLat = $state([-79.94119494375119, 40.439986846804885]);

    let waypoints_latlon: number[][] = [
        [40.44014339030923, -79.94124065145725],
        [40.44006511860286, -79.94122636779917],
        [40.439986846804885, -79.94119494375119],
        [40.43991074913629, -79.9412435081891],
        [40.4398389998274, -79.94115780624013],
    ];

    let waypoints_pub: ROSLIB.Topic | undefined;

    function createMapboxDraw() {
        let draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                line_string: true,
                trash: true,
            },
        });
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

    function publishRosWaypoints() {
        console.log("Publishing waypoints");
        let wp_json = JSON.stringify(waypoints_latlon);
        console.log(wp_json);
        waypoints_pub?.publish({
            data: JSON.stringify(waypoints_latlon),
        });
    }

    let markers: { lngLat: LngLat }[] = $state([]);

    onMount(() => {
        const ros = new RosService("172.26.179.119", 9090);

        waypoints_pub = ros.createPublisher(
            "/waypoints_string",
            "std_msgs/String",
        );

        let status_topic = ros.createSubscriber(
            "/diagnostics",
            "diagnostic_msgs/DiagnosticStatus",
            (msg) => {
                if (msg.name != "trajectory_planner") return;
                console.log(msg);
                planning_status = msg.message;
            },
        );

        let gnss_topic = ros.createSubscriber(
            "/gnss/fix",
            "sensor_msgs/NavSatFix",
            (msg) => {
                console.log(msg);
                egoLngLat = [msg.longitude, msg.latitude];
            },
        );

        waypoints_latlon.forEach((waypoint) => {
            markers = [
                ...markers,
                { lngLat: { lat: waypoint[0], lng: waypoint[1] } },
            ];
        });

        return () => {
            ros.disconnect();
        };
    });

    let draw = createMapboxDraw();
    $effect(() => {
        // @ts-expect-error
        map.addControl(draw);

        map?.on("click", (e) => {
            addMarker(e);
            console.log("[");
            markers.forEach((marker) => {
                console.log(`[${marker.lngLat.lat}, ${marker.lngLat.lng}]`);
            });
            console.log("]");

            console.log(markers);
        });

        map?.on("touchend", (e) => {
            draw.getAll().features.forEach((feature) => {
                console.log(feature);
            });
        });
    });

    function addMarker(e: MapMouseEvent) {
        console.log(e);
        markers = [...markers, { lngLat: e.lngLat }];
    }
</script>

<div class="overflow-hidden h-full w-full">
    <div class="flex flex-col h-full w-full">
        <div class="grow">
            <MapLibre
                bind:map
                center={[-79.94119494375119, 40.439986846804885]}
                zoom={19}
                class="map"
                standardControls
                style="https://api.maptiler.com/maps/outdoor-v2/style.json?key=WYBGJJDhMhxLW8Icu2a0"
            >
                <MapEvents onclick={addMarker} />
                {#each markers as marker}
                    <DefaultMarker lngLat={marker.lngLat} />
                {/each}

                <Marker
                    lngLat={egoLngLat}
                    class="grid h-8 w-8 place-items-center rounded-full border border-gray-200 bg-amber-300 text-black shadow-2xl focus:outline-2 focus:outline-black"
                >
                    <Bot />
                </Marker>
            </MapLibre>
        </div>
        <!-- <Navbar /> -->
    </div>

    <button
        class="rounded-input bg-dark text-background shadow-mini hover:bg-dark/95 inline-flex
    h-12 items-center justify-center px-[21px] text-[15px]
    font-semibold active:scale-[0.98] active:transition-all relative left-[80%] bottom-[100px]"
        onclick={publishRosWaypoints}
    >
        <Play />
    </button>

    <div
        class="absolute mx-auto top-0 left-0 w-[100vw] flex flex-row justify-center pt-2"
    >
        <div
            class="rounded-input bg-background text-dark shadow-mini hover:bg-dark/95 inline-flex
        h-12 items-center justify-center px-[21px] text-sm opacity-70
        font-semibold active:scale-[0.98] active:transition-all w-[75%]"
        >
            {planning_status}
        </div>
    </div>
</div>

<style>
    :global(.map) {
        height: 100%;
    }
</style>
