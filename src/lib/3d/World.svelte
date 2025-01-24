<script lang="ts">
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
  import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
  import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "three.meshline";

  import { GUI } from "three/addons/libs/lil-gui.module.min.js";

  import { MapControls } from "three/addons/controls/MapControls.js";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";

  import { node } from "$lib/stores";

  import TWEEN from "@tweenjs/tween.js";

  import { TexturePainter } from "$lib/3d/TexturePainter";
  import type { ThreeMFLoader } from "three/examples/jsm/Addons.js";

  import { occ_grid, cmd_path, trajectory_candidates } from "$lib/stores";
  import { path } from "d3";

  let osmPalette = {
    blue: 0x0092da,
    forest: 0xadd19e,
    grass: 0xcdebb0,
    gray: 0xd9d0c9,
    green_highlight: 0x88e0be,
    tree: 0x95b887,
    water: 0xaad3df,
  };

  function getHeatmapColor(d: number) {
    /**
     * Given a number from 0-100, provide an RGB color on a scale. For visualizing cost etc.
     */
    let pct = d / 100;
    let color1 = [205, 235, 176]; // grass
    let color2 = [44, 48, 113]; // #2c3071
    // find a color d% between a1 and a2
    let rgb_array = color1.map((p, i) =>
      Math.floor(color1[i] + pct * (color2[i] - color1[i])),
    );

    // return new THREE.Color(
    //   `rgb(${rgb_array[0]}, ${rgb_array[1]}, ${rgb_array[2]})`,
    // );

    return rgb_array;
  }

  function getCandidateColor(d: number) {
    /**
     * Given a number from 0-100, provide an RGB color on a scale. For visualizing cost etc.
     */
    let pct = d;
    let color1 = [205, 235, 176]; // grass
    let color2 = [250, 129, 115]; // #FA8173
    // find a color d% between a1 and a2
    let rgb_array = color1.map((p, i) =>
      Math.floor(color1[i] + pct * (color2[i] - color1[i])),
    );

    return new THREE.Color(
      `rgb(${rgb_array[0]}, ${rgb_array[1]}, ${rgb_array[2]})`,
    );
  }

  let forest_plan_msg = undefined;
  let costmap_plane: THREE.Mesh;
  let ground_plane: THREE.Mesh;

  let steering_cost_msg = undefined;
  let tree_meshes: THREE.Mesh[] = [];
  let costmap_texture: THREE.DataTexture | undefined = undefined;
  let plan_centroid_x = 0,
    plan_centroid_y = 0;
  let forestRadius = 0;

  export let mode = "plan";

  // node.subscribe((node) => {
  //   let forest_plan_topic = new ROSLIB.Topic({
  //     ros: node,
  //     name: "/vis/forest_plan",
  //     messageType: "visualization_msgs/Marker",
  //   });

  //   forest_plan_topic.subscribe(function (msg) {
  //     if (msg == undefined) return;

  //     // Simple check to see if a UNIQUE forest plan has been received
  //     // Do the current plan and incoming plan have the same number of trees?
  //     if (
  //       forest_plan_msg != undefined &&
  //       forest_plan_msg.points.length === msg.points.length
  //     )
  //       return;

  //     forest_plan_msg = msg;

  //     const geometry = new THREE.CapsuleGeometry(1, 1, 4, 16);
  //     geometry.translate(0, 0.5, 0);

  //     const material = new THREE.MeshPhongMaterial({
  //       color: osmPalette.tree,
  //       transparent: true,
  //       opacity: 0.3,
  //       flatShading: true,
  //     });

  //     // This tracks the centroid of all forest plan points.

  //     // Clear any existing tree meshes before adding the new ones
  //     for (var mesh of tree_meshes) {
  //       scene.remove(mesh);
  //     }
  //     tree_meshes = [];

  //     // Ignore the first forest plan point, which is the robot's start position
  //     for (var point of msg.points.slice(1)) {
  //       // console.log(point.x);
  //       const mesh = new THREE.Mesh(geometry, material);
  //       mesh.position.x = point.x;
  //       mesh.position.y = 0;
  //       mesh.position.z = -point.y;
  //       mesh.scale.x = 1;
  //       mesh.scale.y = Math.random() + 1;
  //       mesh.scale.z = 1;
  //       mesh.updateMatrix();
  //       mesh.matrixAutoUpdate = false;
  //       tree_meshes.push(mesh);
  //       scene.add(mesh);

  //       plan_centroid_x += point.x;
  //       plan_centroid_y += point.y;
  //     }

  //     plan_centroid_x /= msg.points.length;
  //     plan_centroid_y /= msg.points.length;

  //     if (mode == "plan") {
  //       camera.position.x = plan_centroid_x;
  //       camera.position.z = -plan_centroid_y;
  //       controls.target.x = plan_centroid_x;
  //       controls.target.z = -plan_centroid_y;
  //     }

  //     // if (bounds_plane != undefined) {
  //     //   bounds_plane.position.x = plan_centroid_x;
  //     //   bounds_plane.position.z = -plan_centroid_y;
  //     // }

  //     console.log(`Centroid: (${plan_centroid_x}, ${plan_centroid_y})`);
  //   });

  //   let bounds_grid_topic = new ROSLIB.Topic({
  //     ros: node,
  //     name: "/map/bounds",
  //     messageType: "nav_msgs/OccupancyGrid",
  //   });

  //   let odom_topic = new ROSLIB.Topic({
  //     ros: node,
  //     name: "/odom",
  //     messageType: "nav_msgs/Odometry",
  //   });

  //   odom_topic.subscribe(function (msg) {
  //     // console.log(msg.pose.pose.position);
  //     if (mode == "plant") {
  //       let ego_x = msg.pose.pose.position.x;
  //       let ego_y = msg.pose.pose.position.y;
  //       egoMesh.position.x = ego_x;
  //       egoMesh.position.z = -ego_y;
  //       egoRing.position.x = ego_x;
  //       egoRing.position.z = -ego_y;
  //       camera.position.x = ego_x;
  //       camera.position.z = -plan_centroid_y;
  //       controls.target.x = ego_x;
  //       controls.target.z = -ego_y;
  //     }

  //     // console.log(`Mesh now at ${egoMesh.position.x}, ${egoMesh.position.z}`);
  //   });

  //   let goal_pose_topic = new ROSLIB.Topic({
  //     ros: node,
  //     name: "/goal_pose",
  //     messageType: "geometry_msgs/PoseStamped",
  //   });

  //   goal_pose_topic.subscribe(function (msg) {
  //     if (mode == "plant") {
  //       waypointRing.position.x = msg.pose.position.x;
  //       waypointRing.position.z = -msg.pose.position.y;
  //     }
  //   });

  //   let global_plan_topic = new ROSLIB.Topic({
  //     ros: node,
  //     name: "/received_global_plan",
  //     messageType: "nav_msgs/Path",
  //   });

  //   global_plan_topic.subscribe(function (msg) {
  //     let points = [];
  //     const height_above_ground = 1.0; // meters
  //     const line_width = 1.0; // meters
  //     for (let pose of msg.poses) {
  //       let pos = pose.pose.position;
  //       points.push(pos.x, height_above_ground, -pos.y);
  //     }
  //     const line = new MeshLine();
  //     line.setPoints(points);

  //     const material = new MeshLineMaterial({
  //       color: new THREE.Color(osmPalette.green_highlight),
  //     });

  //     scene.remove(global_plan);
  //     global_plan = new THREE.Mesh(line, material);
  //     scene.add(global_plan);

  //     console.log(`Adding global plan with ${points.length} points`);
  //   });
  // });

  let camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer;

  let controls: OrbitControls;

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let coneHelper: THREE.Mesh;

  let egoMesh: THREE.Mesh;
  let egoRing: THREE.Mesh;
  let waypointRing: THREE.Mesh;
  let global_plan: THREE.Mesh;
  let cmd_path_mesh: THREE.Mesh;
  let cmd_path_meshline: MeshLine;
  let candidate_meshes: Array<THREE.Mesh> = [];
  let candidate_meshlines: Array<MeshLine> = [];
  let previous_candidates_msg_string = "";

  function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // adjust displayBuffer size to match
    if (canvas.width !== width || canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // update any render target sizes here
    }
  }

  occ_grid.subscribe((msg) => {
    if (msg == undefined) return;
    if (scene == undefined) return;

    // console.log(
    //   `Received bounds grid with dims ${msg.info.width}, ${msg.info.height}`,
    // );

    if (costmap_texture == undefined) {
      costmap_texture = new THREE.DataTexture(
        new Uint8Array(91204),
        msg.info.width,
        msg.info.height,
      );
    }

    let gridWidth = msg.info.width,
      gridHeight = msg.info.height,
      res = msg.info.resolution;

    forestRadius = Math.max(gridWidth, gridHeight) * res * 0.75;

    // 4 channels, RGBA
    let data = new Uint8Array(gridWidth * gridHeight * 4);

    let forestColor = new THREE.Color(osmPalette.forest);
    let grassColor = new THREE.Color(osmPalette.grass);
    for (let i = 0; i < gridWidth * gridHeight; i++) {
      let cellColor = getHeatmapColor(msg.data[i]);
      const stride = i * 4; // 4 channels, RGBA

      data[stride] = cellColor[0];
      data[stride + 1] = cellColor[1];
      data[stride + 2] = cellColor[2];
      data[stride + 3] = 255;
    }

    scene.remove(costmap_plane);
    costmap_plane = new THREE.Mesh(
      new THREE.PlaneGeometry(gridWidth * res, gridHeight * res),
      new THREE.MeshBasicMaterial({
        map: costmap_texture,
        side: THREE.DoubleSide,
      }),
    );
    costmap_plane.rotateX(-Math.PI / 2);
    costmap_plane.rotateZ(Math.PI / 2);
    costmap_plane.position.z =
      -1 * msg.info.origin.position.x - (gridWidth * res) / 2;
    costmap_plane.position.x =
      -msg.info.origin.position.y - (gridHeight * res) / 2;

    scene.add(costmap_plane);

    scene.remove(ground_plane);

    ground_plane = new THREE.Mesh(
      new THREE.CircleGeometry(forestRadius),
      new THREE.MeshBasicMaterial({
        color: osmPalette.grass,
      }),
    );
    ground_plane.rotateX(-Math.PI / 2);
    ground_plane.position.x =
      msg.info.origin.position.x + (gridWidth * res) / 2;
    ground_plane.position.z =
      -msg.info.origin.position.y - (gridHeight * res) / 2;

    // This is just to prevent clipping
    ground_plane.position.y = costmap_plane.position.y - 0.01;
    // scene.add(ground_plane);

    costmap_texture.image.data = data;
    costmap_texture.needsUpdate = true;
  });

  cmd_path.subscribe((path_msg) => {
    if (path_msg == undefined) return;
    if (scene == undefined) return;

    const points = [];

    path_msg.poses.forEach((pose) => {
      let point = pose.pose.position;
      points.push(-point.y, 0.5, -point.x);
    });
    cmd_path_meshline.setPoints(points);
  });

  trajectory_candidates.subscribe((candidates_msg) => {
    if (candidates_msg == undefined) return;
    if (scene == undefined) return;

    if (JSON.stringify(candidates_msg) == previous_candidates_msg_string) {
      // console.warn("Got duplicate candidates. Skipping rendering.");
      return;
    } else {
      previous_candidates_msg_string = JSON.stringify(candidates_msg);
    }

    // Clear any meshlines added to the scene
    candidate_meshes.forEach((mesh) => {
      scene.remove(mesh);
    });

    candidate_meshes = [];

    let lowest_cost = 99999999999.9;
    let highest_cost = 0.0;
    candidates_msg.candidates.forEach((candidate) => {
      if (candidate.cost < lowest_cost) {
        lowest_cost = candidate.cost;
      }
      if (candidate.cost > highest_cost) {
        highest_cost = candidate.cost;
      }
    });

    console.log(`Low: ${lowest_cost}, Hi: ${highest_cost}`);

    candidates_msg.candidates.forEach((candidate) => {
      const points = [];
      let relative_cost =
        (candidate.cost - lowest_cost) / (highest_cost - lowest_cost);

      let candidate_color = getCandidateColor(relative_cost);
      // console.log(candidate_color);

      let candidate_meshline = new MeshLine();
      const material = new MeshLineMaterial({
        lineWidth: 0.1,
        color: candidate_color,
        opacity: 1,
        transparent: true,
      });
      let candidate_mesh = new THREE.Mesh(candidate_meshline, material);

      // console.log(candidate);
      candidate.trajectory.poses.forEach((pose) => {
        let point = pose.pose.position;
        points.push(-point.y, 0.5, -point.x);
      });
      candidate_meshline.setPoints(points);
      candidate_meshes.push(candidate_mesh);
      scene.add(candidate_mesh);
      // console.log(`Added candidate mesh with points ${points}!`);
    });
  });

  function onPointerMove(event) {
    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components
    const canvas = renderer.domElement;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    pointer.x = (event.offsetX / width) * 2 - 1;
    pointer.y = -(event.offsetY / height) * 2 + 1;
    // console.log(pointer);

    raycaster.setFromCamera(pointer, camera);

    // See if the ray from the camera into the world hits one of our meshes
    const intersects = raycaster.intersectObject(ground_plane);

    // Toggle rotation bool for meshes that we clicked
    if (intersects.length > 0) {
      coneHelper.position.set(0, 0, 0);
      coneHelper.lookAt(intersects[0].face.normal);
      coneHelper.rotateX(-Math.PI / 2);

      coneHelper.position.copy(intersects[0].point);
      coneHelper.position.y = 0.5;
    }
  }

  function createPulsatingEffect() {
    // This changes the scale of the ring and creates the expanding pulse.
    new TWEEN.Tween(egoRing.scale)
      .to(new THREE.Vector3(2, 2, 2))
      .easing(TWEEN.Easing.Quadratic.Out)
      .repeat(Infinity)
      .start();

    // This changes the opacity which makes it show and fade away.
    new TWEEN.Tween(egoRing.material)
      .to({ opacity: 0 })
      .easing(TWEEN.Easing.Quadratic.Out)
      .repeat(Infinity)
      .start();

    // This changes the scale of the ring and creates the expanding pulse.
    new TWEEN.Tween(waypointRing.scale)
      .to(new THREE.Vector3(2, 2, 2))
      .easing(TWEEN.Easing.Quadratic.Out)
      .repeat(Infinity)
      .start();

    // This changes the opacity which makes it show and fade away.
    new TWEEN.Tween(waypointRing.material)
      .to({ opacity: 0 })
      .easing(TWEEN.Easing.Quadratic.Out)
      .repeat(Infinity)
      .start();
  }

  function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(osmPalette.water);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("three-map")?.appendChild(renderer.domElement);
    // document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000,
    );
    camera.position.set(0, 10, 0);

    // controls

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Helpers
    // const axesHelper = new THREE.AxesHelper(100);
    // scene.add(axesHelper);

    // Warthog
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("models/draco/");
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "models/warthog-transformed.glb",
      function (gltf) {
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      },
    );

    // world
    costmap_plane = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshBasicMaterial({
        map: costmap_texture,
        side: THREE.DoubleSide,
        color: "#7378B2",
      }),
    );
    costmap_plane.rotateX(-Math.PI / 2);
    // costmap_plane.rotateY(Math.PI / 2);
    // costmap_plane.rotateZ(Math.PI / 2);

    scene.add(costmap_plane);

    cmd_path_meshline = new MeshLine();
    const material = new MeshLineMaterial({ lineWidth: 0.5, color: "#18827C" });
    cmd_path_mesh = new THREE.Mesh(cmd_path_meshline, material);
    scene.add(cmd_path_mesh);
    // const geometry = new THREE.PlaneGeometry(254.4, 254.4);
    // const material = new THREE.MeshBasicMaterial({
    //   color: osmPalette.grass,
    //   side: THREE.DoubleSide,
    // });
    // plane = new THREE.Mesh(geometry, material);
    // plane.position.x = 127.2;
    // plane.position.z = 127.2;
    // plane.rotateX(Math.PI / 2);
    // scene.add(plane);

    // const forest_plan_plane = new THREE.Mesh(
    //   new THREE.PlaneGeometry(254.4, 254.4),
    //   new THREE.MeshBasicMaterial({
    //     map: forest_plan_texture,
    //     side: THREE.DoubleSide,
    //   })
    // );
    // forest_plan_plane.rotation.x = -Math.PI / 2;
    // forest_plan_plane.position.x = 10.0;
    // forest_plan_plane.position.y = 0.0;
    // scene.add(forest_plan_plane);

    // lights

    // FROM https://github.com/mrdoob/three.js/blob/master/examples/webgl_lights_hemisphere.html

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 10);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    // const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    // scene.add(hemiLightHelper);

    //

    const dirLight = new THREE.DirectionalLight(0xffffff, 10);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-100, 175, 100);
    // dirLight.position.multiplyScalar(30);
    scene.add(dirLight);

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    const d = 50;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = -0.0001;

    // const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
    // scene.add(dirLightHelper);

    coneHelper = new THREE.Mesh(
      new THREE.CircleGeometry(1, 32),
      new THREE.MeshBasicMaterial({
        color: osmPalette.gray,
        transparent: true,
        opacity: 0.8,
      }),
    );
    coneHelper.rotateX(-Math.PI / 2);
    coneHelper.position.y = 1.2;
    // scene.add(coneHelper);

    if (mode == "plant") {
      console.log("ADDING EGO MESHES");
      scene.remove(egoMesh);
      egoMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 3, 20),
        new THREE.MeshBasicMaterial({
          color: osmPalette.blue,
        }),
      );
      scene.add(egoMesh);

      scene.remove(egoRing);
      egoRing = new THREE.Mesh(
        new THREE.CircleGeometry(1, 32),
        new THREE.MeshBasicMaterial({
          color: osmPalette.blue,
          transparent: true,
        }),
      );
      egoRing.rotateX(-Math.PI / 2);
      egoRing.position.y = 1.2;
      scene.add(egoRing);

      scene.remove(waypointRing);
      waypointRing = new THREE.Mesh(
        new THREE.CircleGeometry(1, 32),
        new THREE.MeshBasicMaterial({
          color: osmPalette.green_highlight,
          transparent: true,
        }),
      );
      waypointRing.rotateX(-Math.PI / 2);
      waypointRing.position.y = 1.2;
      scene.add(waypointRing);
    }

    //

    window.addEventListener("resize", onWindowResize);

    const canvas = renderer.domElement;

    // canvas.addEventListener("pointermove", onPointerMove);

    // const gui = new GUI();
    // gui.add(controls, "zoomToCursor");
    // gui.add(controls, "screenSpacePanning");
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    resizeCanvasToDisplaySize();
    TWEEN.update();

    requestAnimationFrame(animate);

    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

    render();
  }

  function render() {
    // raycaster.setFromCamera(pointer, camera);
    // // calculate objects intersecting the picking ray
    // const intersects = raycaster.intersectObjects(scene.children, false);

    // for (let i = 0; i < intersects.length; i++) {
    //   intersects[i].object.material.color.set(0xff0000);
    // }
    renderer.render(scene, camera);
  }

  // We need to wrap Leaflet in this onMount hook,
  // since it requires access to the window object.
  // No SSR!
  onMount(async () => {
    init();
    if (mode == "plant") createPulsatingEffect();
    animate();
  });
</script>

<div id="three-map"></div>

<style>
  #three-map {
    height: 100vh;
    width: 100%;
  }

  canvas {
    height: 100%;
    width: 100%;
  }
</style>
