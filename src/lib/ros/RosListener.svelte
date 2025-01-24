<script lang="ts">
  // import  from "../roslib";
  import Icon from "$lib/misc/Icon.svelte";
  import Map from "$lib/misc/OsmMap.svelte";
  import { onMount } from "svelte";
  import {
    connection_status,
    ConnectionStatus,
    node as nodeWritable,
    BehaviorState,
    current_behavior_state,
    plan_progress,
    planting_eta,
    num_planted_seedlings,
    num_seedlings_in_plan,
    teleop_value,
    type TeleopCommand,
    rosbridge_ip,
    rosbridge_port,
    camera_image,
    diagnostic_agg,
    wh_battery_voltage,
    platform_locked,
    failed_checks,
    occ_grid,
    heartbeat_toggle,
    ego_lat,
    ego_lon,
    ego_alt,
    ego_yaw,
    SystemwideStatusLevel,
    waypoints,
    systemwide_status_level,
    systemwide_status_message,
    systemwide_status_level_string,
    complete_plan,
    cmd_path,
    current_mode,
    trajectory_candidates,
    seedling_reached,
    behavior_message,
    distance_to_seedling,
    remaining_plan,
    do_plant,
    do_plant_stop,
  } from "$lib/stores";
  import type { PlantingPlan } from "$lib/forest_generator";

  let node = undefined;

  type TwistMsg = {
    linear: {
      x?: number;
      y?: number;
      z?: number;
    };
    angular: {
      x?: number;
      y?: number;
      z?: number;
    };
  };

  let ConnectionStatusToColor: any = {};
  ConnectionStatusToColor[ConnectionStatus.CONNECTED] = "#16a34a";
  ConnectionStatusToColor[ConnectionStatus.DISCONNECTED] = "#404040";
  ConnectionStatusToColor[ConnectionStatus.ERROR] = "#b91c1c";
  let connectionStatusColor =
    ConnectionStatusToColor[ConnectionStatus.DISCONNECTED];

  // Refresh the Rosbridge connection if the IP changes
  rosbridge_ip.subscribe((value) => {
    // Wait until the page has finished loading and onMount has been called
    if (!node) return;
    if (value == undefined) {
      console.log(`Rosbridge port was ${value}, skipping.`);
      return;
    }

    setupRosBridge();
  });

  // Refresh the Rosbridge connection if the port changes
  rosbridge_port.subscribe((value) => {
    // Wait until the page has finished loading and onMount has been called
    if (!node) return;
    if (value == undefined) {
      console.log(`Rosbridge port was ${value}, skipping.`);
      return;
    }

    setupRosBridge();
  });

  async function setupRosBridge() {
    let url = `ws://${$rosbridge_ip}:${$rosbridge_port}`;
    console.log(`Trying to connect to Steward at ${url}`);
    const module = await import("./roslib");

    node = new ROSLIB.Ros({
      url: url,
    });

    nodeWritable.set(node);
    // CONNECTION EVENTS
    node.on("connection", function () {
      console.log("Connected to Steward.");
      connection_status.set(ConnectionStatus.CONNECTED);
    });
    node.on("error", function (error) {
      console.log("Error connecting to websocket server: ", error);
      // location.reload(); // Reload the page

      connection_status.set(ConnectionStatus.ERROR);
    });
    node.on("close", function () {
      console.log("Connection to websocket server closed.");
      connection_status.set(ConnectionStatus.DISCONNECTED);

      // setTimeout(node.connect("ws://localhost:9090"));
    });

    let current_behavior_state_topic = new ROSLIB.Topic({
      ros: node,
      name: "/behavior/current_state",
      messageType: "steward_msgs/State",
    });

    current_behavior_state_topic.subscribe(function (msg) {
      current_behavior_state.set(msg.value);
    });

    let plan_progress_topic = new ROSLIB.Topic({
      ros: node,
      name: "/planning/progress",
      messageType: "std_msgs/Float32",
    });

    plan_progress_topic.subscribe(function (msg) {
      plan_progress.set(msg.data);
    });

    let current_mode_topic = new ROSLIB.Topic({
      ros: node,
      name: "/planning/current_mode",
      messageType: "steward_msgs/Mode",
    });

    current_mode_topic.subscribe(function (msg) {
      // console.log(`Current mode: ${msg.level}`);
      current_mode.set(msg.level);
    });

    let distance_to_seedling_topic = new ROSLIB.Topic({
      ros: node,
      name: "/planning/distance_to_seedling",
      messageType: "std_msgs/Float32",
    });

    distance_to_seedling_topic.subscribe(function (msg) {
      // console.log(`${msg.data} m away`);
      distance_to_seedling.set(msg.data);
    });

    let requested_mode_topic = new ROSLIB.Topic({
      ros: node,
      name: "/planning/requested_mode",
      messageType: "steward_msgs/Mode",
    });

    window.onRequestMode = (level: number) => {
      requested_mode_topic.publish({ level: level });
      console.log(level);
    };

    let systemwide_status_level_topic = new ROSLIB.Topic({
      ros: node,
      name: "/health/system_wide_status",
      messageType: "steward_msgs/SystemwideStatus",
    });

    systemwide_status_level_topic.subscribe(function (msg) {
      let level: number = msg.level;
      let status_string: string = "";

      systemwide_status_level.set(level);

      switch (level) {
        case SystemwideStatusLevel.HEALTHY:
          status_string = "Healthy";
          break;
        case SystemwideStatusLevel.WARN:
          status_string = "Warn";
          break;
        case SystemwideStatusLevel.TELEOP_ONLY:
          status_string = "Teleop Only";
          break;
        case SystemwideStatusLevel.OUT_OF_SERVICE:
          status_string = "Out of Service";
          break;
        default:
          console.warn(`Received unknown status level ${level}`);
          status_string = "Unknown";
      }

      systemwide_status_level_string.set(status_string);
    });

    let complete_plan_topic = new ROSLIB.Topic({
      ros: node,
      name: "/planning/complete_plan",
      messageType: "steward_msgs/PlantingPlan",
    });

    complete_plan.subscribe((plan) => {
      if (!plan) return; // undefined.

      console.log("PUBLISHED PLAN");
      console.log(plan);
      complete_plan_topic.publish(plan);
    });

    let planting_eta_topic = new ROSLIB.Topic({
      ros: node,
      name: "/planning/eta",
      messageType: "std_msgs/Float32",
    });

    planting_eta_topic.subscribe(function (msg) {
      planting_eta.set(msg.data);
    });

    let do_plant_topic = new ROSLIB.Topic({
      ros: node,
      name: "/behavior/do_plant",
      messageType: "std_msgs/Empty",
    });

    do_plant.subscribe((value) => {
      if (value != undefined) {
        do_plant_topic.publish({});
        console.log("Sent do_plant!");
      } else {
        console.warn(`Value was ${value}`);
      }
    });

    let do_plant_stop_topic = new ROSLIB.Topic({
      ros: node,
      name: "/behavior/do_pause_plant",
      messageType: "std_msgs/Empty",
    });

    do_plant_stop.subscribe((value) => {
      if (value != undefined) {
        do_plant_stop_topic.publish({});
        console.log("Sent stop_plant!");
      } else {
        console.warn(`Value was ${value}`);
      }
    });

    let num_planted_seedlings_topic = new ROSLIB.Topic({
      ros: node,
      name: "/planning/num_planted_seedlings",
      messageType: "std_msgs/Float32",
    });

    num_planted_seedlings_topic.subscribe(function (msg) {
      console.log(`Planted ${msg.data} seedlings`);

      num_planted_seedlings.set(msg.data);
    });

    let forest_plan_topic = new ROSLIB.Topic({
      ros: node,
      name: "/vis/forest_plan",
      messageType: "visualization_msgs/Marker",
    });

    forest_plan_topic.subscribe(function (msg) {
      if (msg == undefined) return;

      num_seedlings_in_plan.set(msg.points.length);
    });

    // let bounds_geojson_topic = new ROSLIB.Topic({
    //   ros: node,
    //   name: "/cost/bounds",
    //   messageType: "std_msgs/String",
    // });

    // bounds_geojson.subscribe((geojson) => {
    //   // console.log(`PUBLISHING ${geojson}`);
    //   var json_msg = {
    //     data: geojson,
    //   };

    //   bounds_geojson_topic.publish(json_msg);
    // });

    let waypoint_topic = new ROSLIB.Topic({
      ros: node,
      name: "/planning/goal_pose_geo",
      messageType: "geographic_msgs/GeoPoint",
    });

    waypoints.subscribe((waypoints) => {
      if (waypoints.length < 1) return;
      let top_wp = waypoints[0];
      console.log(`PUBLISHING ${top_wp}`);
      var geopoint_msg = {
        latitude: top_wp[0],
        longitude: top_wp[1],
      };

      waypoint_topic.publish(geopoint_msg);
    });

    let global_heartbeat_topic = new ROSLIB.Topic({
      ros: node,
      name: "/hb/global",
      messageType: "std_msgs/Empty",
    });

    global_heartbeat_topic.subscribe((msg) => {
      heartbeat_toggle.set(!$heartbeat_toggle);
    });

    let ego_yaw_topic = new ROSLIB.Topic({
      ros: node,
      name: "/gnss/yaw",
      messageType: "std_msgs/Float32",
    });

    ego_yaw_topic.subscribe((msg) => {
      ego_yaw.set(msg.data);
    });

    let gnss_fix_topic = new ROSLIB.Topic({
      ros: node,
      name: "/gnss/gpsfix",
      messageType: "gps_msgs/GPSFix",
    });

    gnss_fix_topic.subscribe((msg) => {
      // console.log(msg);
      ego_alt.set(msg.altitude);
      ego_lon.set(msg.longitude);
      ego_lat.set(msg.latitude);
    });

    // let camera_image_topic = new ROSLIB.Topic({
    //   ros: node,
    //   name: "/zed/left/image_rect_color/compressed",
    //   messageType: "sensor_msgs/CompressedImage",
    //   queue_size: 1,
    //   throttle_rate: 100,
    // });

    // camera_image_topic.subscribe(function (msg) {
    //   if (msg == undefined) return;

    //   camera_image.set(msg.data);
    // });

    let trajectory_candidates_topic = new ROSLIB.Topic({
      ros: node,
      name: "/planning/candidates",
      messageType: "steward_msgs/TrajectoryCandidates",
      queue_size: 1,
      throttle_rate: 1000,
    });

    trajectory_candidates_topic.subscribe(function (msg) {
      if (msg == undefined) return;

      // console.log(msg);
      trajectory_candidates.set(msg);
    });

    let remaining_plan_topic = new ROSLIB.Topic({
      ros: node,
      name: "/planning/remaining_plan",
      messageType: "steward_msgs/PlantingPlan",
      queue_size: 1,
    });

    remaining_plan_topic.subscribe(function (msg) {
      if (msg == undefined) return;

      // console.log(msg);
      remaining_plan.set(msg);
    });

    let on_seedling_reached_topic = new ROSLIB.Topic({
      ros: node,
      name: "/behavior/seedling_reached",
      messageType: "std_msgs/Empty",
      queue_size: 1,
      throttle_rate: 100,
    });

    on_seedling_reached_topic.subscribe(function (msg) {
      if (msg == undefined) return;

      // console.log(msg);
      seedling_reached.set(true);
    });

    let health_check_topic = new ROSLIB.Topic({
      ros: node,
      name: "/health/failed_checks",
      messageType: "steward_msgs/FailedChecks",
    });

    health_check_topic.subscribe(function (msg) {
      if (msg == undefined) return;

      // console.log(msg);
      failed_checks.set(msg["checks"]);
    });

    let occ_grid_topic = new ROSLIB.Topic({
      ros: node,
      name: "/cost/total",
      messageType: "nav_msgs/OccupancyGrid",
    });

    occ_grid_topic.subscribe(function (msg) {
      if (msg == undefined) return;

      occ_grid.set(msg);
    });

    let diagnostics_topic = new ROSLIB.Topic({
      ros: node,
      name: "/diagnostics",
      messageType: "diagnostic_msgs/DiagnosticStatus",
    });

    diagnostics_topic.subscribe(function (msg) {
      if (msg == undefined) return;

      if (msg.name == "trajectory_planner") {
        behavior_message.set(msg.message);
      }
    });

    let cmd_path_topic = new ROSLIB.Topic({
      ros: node,
      name: "/cmd_vel/path",
      messageType: "nav_msgs/Path",
    });

    cmd_path_topic.subscribe((msg) => {
      cmd_path.set(msg);
    });

    let teleop_topic = new ROSLIB.Topic({
      ros: node,
      name: "/cmd_vel/teleop",
      messageType: "geometry_msgs/Twist",
    });

    teleop_topic.advertise();

    teleop_value.subscribe((value: TeleopCommand) => {
      if (!value) return;
      let msg: TwistMsg = {
        linear: {
          x: -value.y,
        },
        angular: {
          z: value.x,
        },
      };
      teleop_topic.publish(msg);
      console.log(`Publishing Teleop command`);
    });
  }

  onMount(async () => {
    await setupRosBridge();
  });
</script>

<!-- 
<Icon id="link" color={connectionStatusColor} size="1.5rem"></Icon> -->
