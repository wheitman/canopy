<script lang="ts">
  import { T, extend, useThrelte, useParent, useTask } from "@threlte/core";
  import { Canvas } from "@threlte/core";
  import Steward from "$lib/3d/steward/warthog.svelte";
  import { Grid } from "@threlte/extras";
  // import Controller from "./ThirdPersonControls.svelte";
  import { AxesHelper, PlaneGeometry, Color, DataTexture } from "three";
  import { DEG2RAD } from "three/src/math/MathUtils.js";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
  import Controller from "./ThirdPersonControls.svelte";
  import { onMount } from "svelte";
  import { occ_grid } from "$lib/stores";

  extend({
    OrbitControls,
  });

  const { renderer, invalidate } = useThrelte();

  let stewardModel: any;
  let stewardModelRef: any;

  let orbit;
  let camera;
  let bounds_texture: THREE.DataTexture | undefined = undefined;

  const geometry = new PlaneGeometry(10, 10, 100, 100);
  $: if (stewardModel) {
    stewardModelRef = stewardModel;
  }

  occ_grid.subscribe((msg) => {
    if (!msg) return;

    console.log(msg);

    // 4 channels, RGBA
    let gridWidth = msg.info.width;
    let gridHeight = msg.info.height;
    let data = new Uint8Array(gridWidth * gridHeight * 4);

    if (bounds_texture == undefined) {
      bounds_texture = new DataTexture(
        new Uint8Array(91204),
        gridWidth,
        gridHeight,
      );
    }

    let forestColor = new Color("#00ff00");
    // let grassColor = new THREE.Color(osmPalette.grass);
    for (let i = 0; i < gridWidth * gridHeight; i++) {
      let cellColor = forestColor;
      const stride = i * 4; // 4 channels, RGBA

      data[stride] = cellColor.r * msg.data[i];
      data[stride + 1] = cellColor.g * 255;
      data[stride + 2] = cellColor.b * 255;
      data[stride + 3] = 255;
    }

    bounds_texture.image.data = data;
    bounds_texture.needsUpdate = true;

    console.log("Updating bounds_texture");

    invalidate();
  });

  // import { extend, T } from "threlte";

  useTask((delta) => {
    // the object's position is bound to the prop
    // console.log(delta);
    // if (camera) camera.update();
  });

  onMount(() => {
    // const noise = createNoise2D();
    const vertices = geometry.getAttribute("position").array;
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      // @ts-ignore
      // vertices[i + 2] = noise(x / 4, y / 4);
      vertices[i + 2] = 0;
    }
  });
</script>

<T.PerspectiveCamera
  let:ref
  bind:ref={camera}
  makeDefault
  position={[0, 6, -3]}
>
  <T.OrbitControls
    args={[ref, renderer.domElement]}
    bind:ref={orbit}
    on:create={({ ref, cleanup }) => {
      // Look at the center
      ref.screenSpacePanning = false;
      ref.listenToKeyEvents(window); // optional

      // ref.addEventListener("change", render); // call this only in static scenes (i.e., if there is no animation loop)

      // ref.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      ref.dampingFactor = 0.05;

      ref.screenSpacePanning = false;

      ref.minDistance = 3;
      ref.maxDistance = 10;

      ref.maxPolarAngle = Math.PI / 2;

      cleanup(() => {
        // Do something when the camera is disposed
      });
    }}
  />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 20, 10]} intensity={1} />
<T.HemisphereLight intensity={1} />

<Steward bind:ref={stewardModel} />

<T.Mesh {geometry} rotation.x={DEG2RAD * -90}>
  <T.MeshToonMaterial map={bounds_texture} />
</T.Mesh>
<!-- <T.PlaneGeometry></T.PlaneGeometry> -->

<T.AxesHelper />
