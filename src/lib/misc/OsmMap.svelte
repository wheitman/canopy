<script lang="ts">
  import { onMount } from "svelte";

  import {
    ego_yaw,
    ego_lat,
    ego_lon,
    waypoints,
    complete_plan,
    seedling_reached,
  } from "$lib/stores";

  import {
    getRandomPoint,
    generateSeedlings,
    type Species,
  } from "$lib/forest_generator";

  import { base } from "$app/paths";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // We need to wrap Leaflet in this onMount hook,
  // since it requires access to the window object.
  // No SSR!

  let paintpolygonControl;

  export let useCurrentPos = false;

  let map,
    flagIcon,
    egoIcon,
    egoMarker,
    egoLat,
    egoLon,
    L,
    popup,
    seedlingIcon,
    reachedSeedlingIcon;

  let mounted = false; // tracks whether or not we're running in a browser (no SSR!)

  export let seedlings: object[] = [];

  let listening_for_waypoint = false;

  let egoMarkerRotation = 0;

  let waypoint_markers: any[] = [];
  let seedlings_markers: any[] = [];
  let reached_seedling_markers: any[] = [];

  enum MapAction {
    DRAW,
    PAN,
    CLEAR,
    ERASE,
  }

  export let selected_action = MapAction.PAN;
  export let draw: boolean = false;
  export let hide_seedlings: boolean = false;

  export function listenForWaypoint() {
    listening_for_waypoint = true;
  }

  export function clearSeedlingMarkers() {
    seedlings_markers.forEach((marker) => {
      marker.remove();
      console.log(`Removing ${marker} from map.`);
    });

    seedlings_markers = [];
  }

  export async function addSeedlingMarker(latlon: number[], seedling: Species) {
    if (hide_seedlings) {
      console.log("Seedlings hidden");
      return;
    }
    var pointMarker = L.marker([latlon[0], latlon[1]], {
      icon: new seedlingIcon({
        iconUrl: `${base}/res/leaves/${seedling.icon}.svg`,
      }),
    }).addTo(map);

    if (mounted) {
      pointMarker.bindPopup(
        `<strong>${seedling.common}</strong><br/><i>${seedling.scientific}</i>`,
      );
    }

    seedlings_markers.push(pointMarker);
  }

  seedling_reached.subscribe((reached) => {
    console.log("Seedling reached!");
    if (reached == false) return;

    addReachedSeedlingMarker();
  });

  ego_lat.subscribe((val) => {
    // console.log("Latitude updated!");

    egoLat = val;

    if (L == undefined || !egoLon) return;

    if (!egoMarker)
      egoMarker = L.marker([egoLat, egoLon], { icon: egoIcon }).addTo(map);
    else {
      var newLatLng = new L.LatLng(egoLat, egoLon);
      egoMarker.setLatLng(newLatLng);
    }
  });

  ego_lon.subscribe((val) => {
    // console.log("Longitude updated!");

    egoLon = val;

    if (L == undefined || !egoLat) return;

    if (!egoMarker)
      egoMarker = L.marker([egoLat, egoLon], { icon: egoIcon }).addTo(map);
    else {
      var newLatLng = new L.LatLng(egoLat, egoLon);
      egoMarker.setLatLng(newLatLng);
    }
  });

  ego_yaw.subscribe((val) => {
    if (L == undefined || !ego_yaw) return;

    let icon: HTMLDivElement = document.getElementById("ego-icon");
    if (!icon) return;

    let css_rotation = -val + Math.PI / 2;
    icon.style.transform = `rotate(${css_rotation}rad)`;
  });

  // plan.subscribe((plan) => {
  //   if (plan == undefined) return;

  //   console.log(
  //     `Seedling markers contains ${seedlings_markers.length} seedlings`,
  //   );
  //   seedlings_markers.forEach((marker) => {
  //     marker.remove();
  //     console.log(`Removing ${marker} from map.`);
  //   });

  //   seedlings_markers = [];
  //   console.log(
  //     `Seedling markers now contains ${seedlings_markers.length} seedlings`,
  //   );

  //   plan.seedlings.forEach((seedling, idx) => {
  //     if (seedling == undefined) {
  //       console.log(`Seedling at ${idx} was ${seedling}`);
  //     }
  //     addSeedlingMarker(seedling);
  //   });

  //   if (paintpolygonControl) paintpolygonControl.setData(plan.bounds);
  // });

  export function setGeometry(geom) {
    console.log(`Setting to ${geom}`);
    if (paintpolygonControl) paintpolygonControl.setData(geom);
    else console.log("CONTROL NOT READY");
  }

  function onMapClick(e) {
    // alert("You clicked the map at " + e.latlng);

    if (listening_for_waypoint) {
      var marker = L.marker(e.latlng, { icon: flagIcon }).addTo(map);
      var prev_marker: L.Marker = waypoint_markers.pop();
      if (prev_marker != undefined) prev_marker.removeFrom(map);

      waypoint_markers.push(marker);
      listening_for_waypoint = false;
      console.log(
        `There are now ${waypoint_markers.length} waypoints on the map.`,
      );

      let latlons: Array<Array<number>> = [];

      waypoint_markers.forEach((marker: L.Marker) => {
        let latlon = marker.getLatLng();
        latlons.push([latlon.lat, latlon.lng]);
      });

      console.log(latlons);

      waypoints.set(latlons);
    } else {
    }
  }

  function onMouseup(e) {
    // alert("You clicked the map at " + e.latlng);

    if (
      selected_action == MapAction.DRAW ||
      selected_action == MapAction.ERASE
    ) {
      // console.log("Making forest");
      // generateSeedlings(
      //   getGeoJSON(),
      //   clearSeedlingMarkers,
      //   addSeedlingMarker,
      //   10,
      // ).then((new_seedlings) => {
      //   seedlings = new_seedlings;
      // });

      dispatch("geomchanged");
    } else {
    }
  }

  function loadPlanFromStorage() {
    try {
      let plan_str = localStorage.getItem("plan");

      if (plan_str != null) {
        plan.set(JSON.parse(plan_str));
      }
    } catch (error) {
      console.error(`Could not load plan from browser storage: ${error}`);
    }
  }

  // setInterval(() => {
  //   console.log("Loading plan");
  //   loadPlanFromStorage();
  // }, 1000);

  onMount(async () => {
    L = await import("leaflet");
    await import("leaflet-draw");
    await import("leaflet-paintpolygon");

    mounted = true;

    seedlingIcon = L.Icon.extend({
      options: {
        iconUrl: `${base}/res/leaves/silver_maple.svg`,
        iconSize: [24, 24], // size of the icon
        iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
        shadowSize: [50, 64],
        shadowAnchor: [4, 62],
        popupAnchor: [0, 0],
      },
    });

    if (useCurrentPos)
      map = L.map("map", { zoomControl: false }).locate({
        setView: true,
        maxZoom: 19,
      });
    else
      map = L.map("map", { zoomControl: false }).setView(
        [40.44002092, -79.9409749],
        19,
      );
    popup = L.popup();

    flagIcon = L.divIcon({
      html: `<span class="material-symbols-outlined">
flag
</span>`,
      className: "div-icon",
    });

    egoIcon = L.divIcon({
      html: `<div class="icon-container flex justify-center" id="ego-icon">
  <span
    class="material-symbols-rounded my-auto"
    style="--icon-color: #ff0000; --size: 1rem; --fill: 1"
  >
    navigation
  </span>
</div>`,
      className: "div-icon",
    });

    reachedSeedlingIcon = L.divIcon({
      html: `<div class="icon-container flex justify-center" id="seedling-icon" style="">
  <span
    class="material-symbols-rounded my-auto"
    style="--icon-color: #ff0000; --size: 1rem; --fill: 1"
  >
    check
  </span>
</div>`,
      className: "div-icon",
      iconAnchor: [0, 20],
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 20,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    // Initialise the FeatureGroup to store editable layers
    // var editableLayers = new L.FeatureGroup();
    // map.addLayer(editableLayers);

    paintpolygonControl = L.control.paintPolygon({ menu: false }).addTo(map);

    map.on("click", onMapClick);
    map.on("mouseup", onMouseup);

    if (draw) {
      startDraw();
    }

    // loadPlanFromStorage();
  });

  export function getGeoJSON() {
    return paintpolygonControl.getData();
  }

  export function getPlanSeedlings() {
    return seedlings;
  }

  export function startDraw() {
    selected_action = MapAction.DRAW;
    paintpolygonControl.startDraw();
  }

  export function startErase() {
    selected_action = MapAction.ERASE;
    paintpolygonControl.startErase();
  }

  export function startPan() {
    selected_action = MapAction.PAN;
    paintpolygonControl.stop();
  }

  export function clear() {
    paintpolygonControl.eraseAll();
    clearSeedlingMarkers();
  }

  export function addPoint(point: number[]) {
    let latlng = L.latLng(point[0], point[1]);
    popup
      .setLatLng(latlng)
      .setContent("You clicked the map at " + latlng.toString())
      .openOn(map);
    var pointMarker = L.marker(latlng).addTo(map);
    console.log(`Adding point at ${point[0]}, ${point[1]}`);
  }

  export function addPoints(points: number[][]) {
    points.forEach((point) => {
      let latlng = L.latLng(point[0], point[1]);
      popup
        .setLatLng(latlng)
        .setContent("You clicked the map at " + latlng.toString())
        .openOn(map);
      var pointMarker = L.marker(latlng).addTo(map);
      console.log(`Adding point at ${point[0]}, ${point[1]}`);
    });
  }

  // export
</script>

<div id="map" class="z-0"></div>

<style>
  #map {
    height: 100%;
    width: 100%;
  }

  .material-symbols-rounded {
    font-variation-settings:
      "FILL" var(--fill),
      "wght" 400,
      "GRAD" 0,
      "opsz" 24;
    color: var(--icon-color);
    font-size: var(--size);
  }
  .icon-container {
    user-select: none;
    background-color: var(--icon-color);
    margin: 0;
  }
</style>
