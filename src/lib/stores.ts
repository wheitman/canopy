import { writable, type Writable } from "svelte/store";
import Cookies from "js-cookie";
import type { PlantingPlan } from "./forest_generator";

export enum SystemwideStatusLevel {
  HEALTHY = 0,
  WARN = 1,
  TELEOP_ONLY = 2,
  OUT_OF_SERVICE = 3
}

export enum Mode {
  TELEOP = 0,
  ASSISTED = 1,
  AUTO = 2,
  STOPPED = 3
}

export enum ConnectionStatus {
  DISCONNECTED,
  CONNECTED,
  ERROR,
}

export enum BehaviorState {
  PAUSED = 0,
  DRIVING = 1,
  PLANTING = 2,
}

export type TeleopCommand = {
  x: number,
  y: number
}

export const node: Writable<any> = writable(undefined);
export const connection_status = writable(ConnectionStatus.DISCONNECTED);
export const current_behavior_state = writable(BehaviorState.PAUSED);
export const warning_count = writable(undefined);
export const error_count = writable(undefined);
export const current_mode = writable(Mode.STOPPED);
export const systemwide_status_level = writable(SystemwideStatusLevel.OUT_OF_SERVICE);
export const systemwide_status_level_string = writable("Out of Service");
export const systemwide_status_message = writable("");
export const plan_progress = writable(0);
export const planting_eta = writable(0);
export const num_planted_seedlings = writable(0);
export const num_seedlings_in_plan = writable(0);

export const teleop_value = writable<TeleopCommand>();
export const camera_image = writable(undefined);
export const diagnostic_agg = writable(undefined);
export const wh_battery_voltage = writable(-1);
export const platform_locked = writable(true);
export const failed_checks = writable([]);
export const occ_grid = writable(undefined);
export const trajectory_candidates = writable(undefined);

export const heartbeat_toggle = writable<boolean>(false);

export const ego_lat = writable<number>(-1);
export const ego_lon = writable<number>(-1);
export const ego_alt = writable<number>(-1);
export const ego_yaw = writable<number>(-1);
export const waypoints = writable<Array<Array<number>>>([]);
export const seedling_reached = writable<boolean>(false);
export const do_plant = writable<object>();
export const do_plant_stop = writable<object>();

export const cmd_path = writable<object>();

export const complete_plan = writable<PlantingPlan>();
export const behavior_message = writable<string>();
export const distance_to_seedling = writable<number>();
export const planting_density = writable<number>(2.0);
export const remaining_plan = writable<object>();

let cookie_port = Cookies.get("rosbridge/port")
let cookie_ip = Cookies.get("rosbridge/ip")
console.log(`Cookie port is ${cookie_port}`)


if (cookie_ip == undefined)
  cookie_ip = "localhost"

if (cookie_port == undefined)
  cookie_port = "9090"
export const rosbridge_ip = writable<string>(Cookies.get("rosbridge/ip"));
export const rosbridge_port = writable<string>(Cookies.get("rosbridge/port"));

export const toasts = writable([]);

export const addToast = (toast) => {
  // Create a unique ID so we can easily find/remove it
  // if it is dismissible/has a timeout.
  const id = Math.floor(Math.random() * 10000);

  // Setup some sensible defaults for a toast.
  const defaults = {
    id,
    type: "info",
    dismissible: true,
    timeout: 3000,
  };

  // Push the toast to the top of the list of toasts
  toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

  // If toast is dismissible, dismiss it after "timeout" amount of time.
  if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout);
};

export const dismissToast = (id) => {
  toasts.update((all) => all.filter((t) => t.id !== id));
};
