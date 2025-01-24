<script lang="ts">
	import Joystick from "$lib/misc/Joystick.svelte";
	import {
		camera_image,
		remaining_plan,
		type TeleopCommand,
	} from "$lib/stores";
	import {
		teleop_value,
		wh_battery_voltage,
		platform_locked,
		connection_status,
		ConnectionStatus,
		systemwide_status_level,
		systemwide_status_level_string,
		systemwide_status_message,
		current_mode,
		complete_plan,
		Mode,
		behavior_message,
		distance_to_seedling,
		do_plant,
		do_plant_stop,
	} from "$lib/stores";
	import type { Writable } from "svelte/store";
	import { writable } from "svelte/store";
	import { Button, ToggleGroup, Slider } from "bits-ui";
	import Icon from "$lib/misc/Icon.svelte";
	import { Canvas } from "@threlte/core";
	import Scene from "./Scene.svelte";
	import World from "$lib/3d/World.svelte";
	import { map } from "d3";
	import OsmMap from "$lib/misc/OsmMap.svelte";
	import { fade, blur, fly } from "svelte/transition";
	import ConnectionIndicator from "$lib/ros/ConnectionIndicator.svelte";
	import { ForestGenerator, type PlantingPlan } from "$lib/forest_generator";
	import { onMount } from "svelte";
	import SpeechBubble from "$lib/misc/SpeechBubble.svelte";

	let show_steward = true;

	function onGeneratorChanged() {
		console.log(generator.locations);

		osmMap.clearSeedlingMarkers();
		for (let [latlon, seedling] of generator.locations) {
			osmMap.addSeedlingMarker(latlon, seedling);
		}

		// savePlan();
		// publishPlanToRos();
	}

	function publishPlanToRos() {
		let plan_obj: PlantingPlan = generator.toRos();
		complete_plan.set(plan_obj);
	}

	let osmMap;
	let generator = new ForestGenerator(onGeneratorChanged);

	let teleop_assistance_level = 2;

	let joystick_value: Writable<TeleopCommand> = writable<TeleopCommand>();

	let cached_teleop = undefined;

	let joystick_released = true;

	function sendPlant() {
		console.log("Sending Plant command");
		do_plant.set({ time: Date.now().toString });
	}

	function sendPlantStop() {
		console.log("Sending Stop command");
		do_plant_stop.set({ time: Date.now().toString });
	}

	joystick_value.subscribe((value: TeleopCommand) => {
		// Scale twist messages here to make the joystick more/less sensitive
		if (!value) return; // initially undefined
		if (Math.abs(value.x) < 0.01 && Math.abs(value.y) < 0.01) {
			if (joystick_released) {
				return;
			} else {
				joystick_released = true;
				// console.log(`Joystick released`);
			}
		} else {
			joystick_released = false;
			// console.log(`Joystick active`);
		}

		let scaled_value = value;
		scaled_value.x *= -2;
		scaled_value.y *= 0.8;
		// console.log(scaled_value);
		teleop_value.set(scaled_value);
		cached_teleop = value;
	});

	setInterval(() => {
		if (cached_teleop != undefined && !joystick_released)
			teleop_value.set(cached_teleop);
	}, 0.1);

	let value: string[] | undefined = ["bold"];

	let camera_data: string = "";

	camera_image.subscribe((new_value) => {
		if (!new_value) return;
		camera_data = `data:image/jpg;base64,${new_value}`;
	});

	function listenForWaypoint() {
		osmMap.listenForWaypoint();
	}

	function requestManualMode() {
		window.onRequestMode(Mode.TELEOP);
	}
	function requestAutoMode() {
		window.onRequestMode(Mode.AUTO);
	}
	function requestPause() {
		window.onRequestMode(Mode.STOPPED);
	}

	function loadPlan() {
		let plan_string = localStorage.getItem(`plan`);
		console.log(plan_string);

		generator.loadFromString(plan_string);
		let plan_obj = JSON.parse(JSON.parse(plan_string));

		osmMap.setGeometry(plan_obj.geojson);
	}

	function loadPlanB() {
		let plan_obj = generator.loadPlanB();
		// let plan_obj = JSON.parse(JSON.parse(plan_string));

		osmMap.setGeometry(plan_obj.geojson);
	}

	onMount(() => {
		setTimeout(loadPlan, 500);
		// setTimeout(loadPlanB, 500);
	});
</script>

<svelte:head>
	<title>Steward | Canopy</title>
	<meta name="description" content="Control and observe the robot" />
</svelte:head>

<div class="flex flex-row h-full w-full">
	<div class="w-[50%] bg-blue-300">
		<OsmMap bind:this={osmMap} />
	</div>
	<div class="w-[50%]"><World /></div>

	<div class="grow overflow-hidden">
		{#if show_steward}
			<div
				class="hidden absolute bottom-0 left-20 m-2 p-2 rounded-2xl opacity-80 w-[36rem] bg-sand-50"
			>
				<SpeechBubble
					on:doneSpeaking={() => {}}
					file="see_the_green"
					text="See the green checkmark on your screen? That means that Steward has passed all of its health checks and is ready to plant on its own. Press the green 'Auto' button to start planting."
				/>
			</div>
		{/if}
		<div
			id="joystick-div"
			class="absolute bottom-0 right-0 flex flex-col mx-3"
			class:pointer-events-none={$connection_status !=
				ConnectionStatus.CONNECTED}
		>
			{#if $current_mode == Mode.TELEOP && ConnectionStatus.CONNECTED && $systemwide_status_level < 3}
				<div
					id="joystick-container"
					class="m-4 mb-0 mx-auto"
					class:opacity-50={$connection_status !=
						ConnectionStatus.CONNECTED}
					in:fly={{ duration: 100, y: 10 }}
					out:fly={{ duration: 100, y: 10 }}
				>
					<Joystick bind:value={joystick_value} />
				</div>
			{/if}
			<div
				class="w-32 mx-auto h-16 px-4 overflow-hidden flex flex-row justify-center items-center rounded-lg"
			>
				<Button.Root
					class="transition-all py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-slate-200 focus:outline-none focus:bg-slate-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
					on:click={sendPlant}
				>
					<div class="flex flex-col">
						<div class="flex flex-col">
							<Icon
								id="psychiatry"
								size="1.5rem"
								color="#008800"
								fill="0"
							></Icon>
							<p class="text-xs">Plant</p>
						</div>
					</div>
				</Button.Root>
				<Button.Root
					class="transition-all py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-slate-200 focus:outline-none focus:bg-slate-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
					on:click={sendPlantStop}
				>
					<div class="flex flex-col">
						<div class="flex flex-col">
							<Icon
								id="stop"
								size="1.5rem"
								color="#008800"
								fill="0"
							></Icon>
							<p class="text-xs">Stop Plant</p>
						</div>
					</div>
				</Button.Root>
				{#if $current_mode == Mode.TELEOP}{/if}
			</div>
			<!-- <div class="inline-flex mx-6 justify-between">
				<div class="inline-flex" id="battery">
					<span class="material-symbols-outlined">
						battery_horiz_050
					</span>
					{$wh_battery_voltage}V
				</div>
				<div class="inline-flex" id="health">
					<span class="material-symbols-outlined symbol-filled">
						favorite
					</span>
					<span class="material-symbols-outlined symbol-filled">
						favorite
					</span>
					<span class="material-symbols-outlined symbol-filled">
						favorite
					</span>
					<span class="material-symbols-outlined symbol-filled">
						favorite
					</span>
					<span class="material-symbols-outlined"> favorite </span>
				</div>
			</div> -->

			{#if $connection_status != ConnectionStatus.CONNECTED}
				<div class="inline-flex rounded-lg my-4 mx-auto">
					<div
						class="py-3 px-4 flex flex-row pointer-events-none justify-center w-48 gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium border border-gray-200 bg-slate-50 text-gray-800 shadow-sm"
					>
						<Icon id="link_off" size="1.5rem" color=""></Icon>

						<p class="">Disconnected <br />from Steward</p>
					</div>
				</div>
			{:else if $systemwide_status_level == 3}
				<div class="inline-flex rounded-lg my-4 mx-auto opacity-80">
					<div
						class="py-3 px-4 flex flex-row opacity-80 pointer-events-none justify-center w-48 gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium border border-gray-200 bg-slate-50 text-gray-800 shadow-sm"
					>
						<Icon id="do_not_disturb_on" size="1rem" color=""
						></Icon>

						<p class="">Out of Service</p>
					</div>
				</div>
			{:else}
				<div class="inline-flex rounded-lg shadow-sm m-4">
					<Button.Root
						class="transition-all pt-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-slate-200 focus:outline-none focus:bg-slate-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
						disabled={$systemwide_status_level > 2}
						on:click={requestManualMode}
					>
						<div class="flex flex-col">
							<div
								class="flex flex-col"
								class:animate-pulse={$current_mode ==
									Mode.TELEOP}
							>
								<Icon
									id="search_hands_free"
									size="1.5rem"
									color=""
									fill="0"
								></Icon>
								<p class="text-xs">Manual</p>
							</div>
							<div
								class="pb-1"
								class:opacity-0={$current_mode != Mode.TELEOP}
							>
								<Icon
									id="circle"
									color="#404943"
									size="0.5rem"
								/>
							</div>
						</div>
					</Button.Root>
					<Button.Root
						class="pt-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-sky-100 text-sky-600 shadow-sm hover:bg-sky-200 focus:outline-none focus:bg-sky-300 transition-all disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
						disabled={$systemwide_status_level > 1}
						on:click={requestAutoMode}
					>
						<div class="flex flex-col">
							<div
								class="flex flex-col"
								class:animate-pulse={$current_mode == Mode.AUTO}
							>
								<Icon
									id="smart_toy"
									size="1.5rem"
									color=""
									fill="0"
								></Icon>
								<p class="text-xs">Auto</p>
							</div>
							<div
								class="pb-1"
								class:opacity-0={$current_mode != Mode.AUTO}
							>
								<Icon
									id="circle"
									color="#404943"
									size="0.5rem"
								/>
							</div>
						</div>
					</Button.Root>
					<Button.Root
						class="transition-all pt-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-sand-300 text-gray-800 shadow-sm hover:bg-sand-400 focus:outline-none focus:bg-sand-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
						on:click={requestPause}
					>
						<div class="flex flex-col">
							<div
								class="flex flex-col"
								class:animate-pulse={$current_mode ==
									Mode.STOPPED}
							>
								<Icon id="pause" size="1.5rem" color="" fill="0"
								></Icon>
								<p class="text-xs">Pause</p>
							</div>
							<div
								class="pb-1"
								class:opacity-0={$current_mode != Mode.STOPPED}
							>
								<Icon
									id="circle"
									color="#404943"
									size="0.5rem"
								/>
							</div>
						</div>
					</Button.Root>
				</div>
			{/if}
		</div>
	</div>

	{#if camera_data == ""}
		<!-- <div
			class="w-[18rem] h-[12rem] absolute bottom-0 m-4 rounded-lg flex items-center justify-center border-2"
		>
			<span class="material-symbols-outlined text-4xl">
				videocam_off
			</span>
		</div> -->
	{:else}
		<img
			src={camera_data}
			alt="Camera stream"
			class="w-[24rem] h-[16rem] absolute bottom-0 m-4 rounded-lg"
		/>
	{/if}
</div>

<div
	class="relative top-[-100vh] right-0 p-4 flex flex-row w-full justify-between"
>
	{#if $behavior_message}
		<div
			class="flex flex-col items-start justify-center opacity-80 rounded-lg shadow-lg m-4 px-4 bg-white h-16"
		>
			<p class="font-semibold text-lg">{$behavior_message}</p>

			<div class="flex flex-row">
				{#if $distance_to_seedling}
					<Icon id="straighten" size="1rem" color="" fill="0"></Icon>

					<p class="text-md pl-1 pr-2">
						{$distance_to_seedling.toFixed(0)} m
					</p>
				{/if}
				{#if $remaining_plan}
					<Icon id="psychiatry" size="1rem" color="" fill="0"></Icon>

					<p class="text-md">
						{$remaining_plan.seedlings.length} seedlings
					</p>
				{/if}
				<button class="pl-2 opacity-50" on:click={publishPlanToRos}>
					<Icon id="restart_alt" />
				</button>
			</div>
		</div>
	{/if}
	<!-- <Button.Root
		class="py-3 px-4 mx-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-slate-50 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 ring-meadow-600 ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
		on:click={listenForWaypoint}
	>
		<Icon id="flag" size="1rem" color="" fill="0"></Icon>
		Add waypoint
	</Button.Root> -->
</div>

<style>
</style>
