<script lang="ts">
	import type { Writable } from "svelte/store";
	import { writable } from "svelte/store";
	import {
		rosbridge_ip,
		rosbridge_port,
		addToast,
		complete_plan,
	} from "$lib/stores";
	import {
		Button,
		Checkbox,
		ScrollArea,
		Tabs,
		Popover,
		Slider,
	} from "bits-ui";
	import Cookies from "js-cookie";
	import Icon from "$lib/misc/Icon.svelte";
	import {
		ForestGenerator,
		type PlantingPlan,
		type Species,
		ForestLayer,
	} from "$lib/forest_generator";
	import { onMount } from "svelte";
	import { base } from "$app/paths";
	import { fly, fade } from "svelte/transition";
	import OsmMap from "$lib/misc/OsmMap.svelte";
	import SpeciesCard from "$lib/misc/SpeciesCard.svelte";
	import SpeechBubble from "$lib/misc/SpeechBubble.svelte";

	function onGeneratorChanged() {
		console.log(generator.locations);
		savePlan();
		publishPlanToRos();

		osmMap.clearSeedlingMarkers();
		for (let [latlon, seedling] of generator.locations) {
			osmMap.addSeedlingMarker(latlon, seedling);
		}
	}

	let generator = new ForestGenerator(onGeneratorChanged);
	let species_options = generator.getRecommendedSpecies(false, false);
	let included_species_count: number = generator.getIncludedSpeciesCount();
	let included_overstory_count: number = generator.getIncludedSpeciesCount(
		ForestLayer.OVERSTORY,
	);
	let included_understory_count: number = generator.getIncludedSpeciesCount(
		ForestLayer.UNDERSTORY,
	);
	let included_emergent_count: number = generator.getIncludedSpeciesCount(
		ForestLayer.EMERGENT,
	);
	let plan_name = "Schenley North";
	let send_to_steward_text = "Send to Steward";

	function publishPlanToRos() {
		let plan_obj: PlantingPlan = generator.toRos();
		complete_plan.set(plan_obj);
	}

	function savePlan() {
		let plan_string = generator.toString();
		localStorage.setItem(`plan`, JSON.stringify(plan_string));
		console.log(`Autosaved: ${plan_string.slice(0, 100)}...`);
	}

	function loadPlanToSecondMap() {
		let plan_string = localStorage.getItem(`plan`);
		console.log(plan_string);

		setTimeout(() => {
			generator.loadFromString(plan_string);
			let plan_obj = JSON.parse(JSON.parse(plan_string));
			osmMap.setGeometry(plan_obj.geojson);
			console.log(`Set geometry from ${plan_obj.geojson}`);
			for (let [latlon, seedling] of generator.locations) {
				osmMap.addSeedlingMarker(latlon, seedling);
				console.log("Added seedling marker!");
			}
		}, 500);
	}

	function loadPlanB() {
		let plan_string = localStorage.getItem(`plan-b`);
		console.log(plan_string);

		generator.loadFromString(plan_string);
		let plan_obj = JSON.parse(JSON.parse(plan_string));

		osmMap.setGeometry(plan_obj.geojson);
	}

	onMount(() => {
		// init();
	});

	enum MapAction {
		DRAW,
		PAN,
		CLEAR,
		ERASE,
	}
	let osmMap: OsmMap;
	let current_action = MapAction.PAN;

	// Generation params
	let rivers_or_creeks = false;
	let on_hillside = false;

	let selected_species_ids: Writable<Array<boolean>> = writable<
		Array<boolean>
	>([]);
	let num_species_included: number = 0;
	species_options.forEach((species) => {
		$selected_species_ids.push(species.included);
		if (species.included) num_species_included++;
	});

	function onSpeciesCardClicked(species: Species) {
		generator.markIncluded(species.page, !species.included);
		included_species_count = generator.getIncludedSpeciesCount();
		included_overstory_count = generator.getIncludedSpeciesCount(
			ForestLayer.OVERSTORY,
		);
		included_understory_count = generator.getIncludedSpeciesCount(
			ForestLayer.UNDERSTORY,
		);
		included_emergent_count = generator.getIncludedSpeciesCount(
			ForestLayer.EMERGENT,
		);

		generator.regeneratePoints();
	}

	function onMapGeomChanged() {
		console.log("REGEN");
		console.log(osmMap.getGeoJSON());
		generator.setGeoJSON(osmMap.getGeoJSON());
	}

	function startDraw() {
		osmMap.startDraw();
		current_action = MapAction.DRAW;
	}
	function startErase() {
		osmMap.startErase();
		current_action = MapAction.ERASE;
	}
	function startPan() {
		osmMap.startPan();
		current_action = MapAction.PAN;
	}

	let bubble_number = 0;

	function nextBubble() {
		console.log("Done speaking!!!");
	}

	function touchHandler(event) {
		var touches = event.changedTouches,
			first = touches[0],
			type = "";
		switch (event.type) {
			case "touchstart":
				type = "mousedown";
				break;
			case "touchmove":
				type = "mousemove";
				break;
			case "touchend":
				type = "mouseup";
				break;
			default:
				return;
		}

		// initMouseEvent(type, canBubble, cancelable, view, clickCount,
		//                screenX, screenY, clientX, clientY, ctrlKey,
		//                altKey, shiftKey, metaKey, button, relatedTarget);

		var simulatedEvent = document.createEvent("MouseEvent");
		simulatedEvent.initMouseEvent(
			type,
			true,
			true,
			window,
			1,
			first.screenX,
			first.screenY,
			first.clientX,
			first.clientY,
			false,
			false,
			false,
			false,
			0 /*left*/,
			null,
		);

		first.target.dispatchEvent(simulatedEvent);
		event.preventDefault();
	}

	function showBoundaryMap() {
		showBubble(20);

		setTimeout(() => {
			document
				.getElementById("map")
				.addEventListener("touchstart", touchHandler, true);
			document
				.getElementById("map")
				.addEventListener("touchmove", touchHandler, true);
			document
				.getElementById("map")
				.addEventListener("touchend", touchHandler, true);
			document
				.getElementById("map")
				.addEventListener("touchcancel", touchHandler, true);
			console.log("ADDED EVENTS");
		}, 500);
	}

	let planting_density_slider_val: number[] = [0.6];

	function confirmBounds() {
		showBubble(24);
	}
	function confirmSpecies() {
		showBubble(36);
	}
	function clearBounds() {
		osmMap.clear();
		console.log("Cleared bounds.");
	}

	function getRiversOrCreeks(yes: boolean) {
		rivers_or_creeks = yes;
		showBubble(28);
	}
	function getHillside(yes: boolean) {
		on_hillside = yes;
		showBubble(32);
	}

	function showBubble(new_bubble_number: number) {
		bubble_number = new_bubble_number;

		setTimeout(() => {
			document.getElementById("scroll-anchor")?.scrollIntoView({
				behavior: "smooth",
				block: "end",
				inline: "nearest",
			});
			console.log("Scrolling into view");
		}, 200);
	}

	function sendPlanToSteward() {
		send_to_steward_text = "Sending...";

		setTimeout(() => {
			send_to_steward_text = "Plan sent!";
			var sound = new Howl({
				volume: 0.5,
				rate: 1.0,
				src: [`speech/druid/collections_open.wav`],
				onend: function () {
					showBubble(44);
				},
			});

			sound.play();
		}, 700);
	}
</script>

<svelte:head>
	<title>Steward | Canopy</title>
	<meta name="description" content="Control and observe the robot" />
</svelte:head>

<div class="size-full">
	<div class="size-full overflow-y-auto max-w-[40rem] mx-auto px-4 py-4">
		{#if bubble_number == 0}
			<div class="flex flex-row justify-center gap-4">
				<button
					class="text-lg border-4 rounded-3xl border-spring-400 bg-spring-400 transition-all p-2 font-medium flex flex-row items-center justify-center text-white"
					on:click={() => {
						showBubble(36);
					}}
				>
					Start</button
				>
			</div>
		{/if}
		<!-- 
		{#if bubble_number >= 4}
			<SpeechBubble
				on:doneSpeaking={() => {
					// console.log(`BUBBLE NUMBER WAS ${bubbleNumber}`);
					showBubble(8);
					// console.log(`BUBBLE NUMBER IS NOW ${bubbleNumber}`);
				}}
				file="I'm_Druid_a"
				text="I'm Druid, a forest planning wizard that runs in your browser. That big yellow robot is Steward. Steward and I are partners in robotic reforestation."
			/>
		{/if}
		{#if bubble_number >= 8}
			<SpeechBubble
				on:doneSpeaking={() => {
					showBubble(12);
				}}
				file="I_can_guide_you"
				text="I can guide you through the forest planning process, and then I can send the final plan to Steward, who does the planting. I'm the brain, Steward is the muscle."
			/>
		{/if}
		{#if bubble_number >= 12}
			<SpeechBubble
				on:doneSpeaking={() => {
					showBubble(14);
				}}
				file="say_hello"
				text="Say hello, Steward."
			/>
		{/if}
		{#if bubble_number >= 14}
			<SpeechBubble
				character="Steward"
				on:doneSpeaking={() => {
					showBubble(16);
					console.log(bubble_number);
				}}
				file="hello_world"
				text="Hello, world!"
			/>
		{/if}
		{#if bubble_number >= 16}
			<hr class="bg-neutral-500 opacity-20 h-1" />
			<p class="text-4xl my-4 mx-auto text-center font-serif">
				Plan a forest
			</p>

			<SpeechBubble
				on:doneSpeaking={() => {
					setTimeout(showBoundaryMap, 500);
				}}
				file="let's_plan_a_forest_together"
				text="Let's plan a forest together. It's easy. First, use your finger to paint where you'd like your trees to go on the map."
			/>
		{/if}
		{#if bubble_number == 20}
			<div class="rounded-2xl h-[36rem]">
				<OsmMap
					bind:this={osmMap}
					draw
					hide_seedlings
					on:geomchanged={onMapGeomChanged}
				/>
			</div>
		{/if}
		{#if bubble_number == 20}
			<div class="flex flex-row justify-end gap-4">
				<button
					class="text-lg border-4 rounded-3xl hover:border-spring-400 transition-all p-2 border-dashed font-medium flex flex-row items-center justify-center text-spring-400"
					on:click={clearBounds}
					><Icon id="delete" size="1.5rem" />
					Clear</button
				>
				<button
					class="text-lg border-4 rounded-3xl hover:border-spring-400 transition-all p-2 border-dashed font-medium flex flex-row items-center justify-center text-spring-400"
					on:click={confirmBounds}
					><Icon id="check_circle" color="#5b916f" size="1.5rem" />
					Done</button
				>
			</div>
		{/if}
		{#if bubble_number >= 24}
			<SpeechBubble
				on:doneSpeaking={() => {
					showBubble(26);
				}}
				file="you're_a_real_picasso"
				text="You're a real Picasso. Now, are there any rivers or creeks near the planting area?"
			/>
		{/if}
		{#if bubble_number == 26}
			<div class="flex flex-row justify-end gap-4">
				<button
					class="text-lg border-4 rounded-3xl hover:border-spring-400 transition-all p-2 border-dashed font-medium flex flex-row items-center justify-center text-spring-400"
					on:click={() => {
						getRiversOrCreeks(true);
					}}
					><Icon id="check" color="#5b916f" size="1.5rem" />
					Yes</button
				>
				<button
					class="text-lg border-4 rounded-3xl hover:border-red-700 transition-all p-2 border-dashed font-medium flex flex-row items-center justify-center text-red-700"
					on:click={() => {
						getRiversOrCreeks(false);
					}}
					><Icon id="close" color="rgb(185 28 28)" size="1.5rem" />
					No</button
				>
			</div>
		{/if}
		{#if bubble_number >= 28}
			<SpeechBubble
				on:doneSpeaking={() => {
					showBubble(30);
				}}
				text="Are we planting on a hillside or other slope?"
				file="are_we_planting"
			/>
		{/if}
		{#if bubble_number == 30}
			<div class="flex flex-row justify-end gap-4">
				<button
					class="text-lg border-4 rounded-3xl hover:border-spring-400 transition-all p-2 border-dashed font-medium flex flex-row items-center justify-center text-spring-400"
					on:click={() => {
						getHillside(true);
					}}
					><Icon id="check" color="#5b916f" size="1.5rem" />
					Yes</button
				>
				<button
					class="text-lg border-4 rounded-3xl hover:border-red-700 transition-all p-2 border-dashed font-medium flex flex-row items-center justify-center text-red-700"
					on:click={() => {
						getHillside(false);
					}}
					><Icon id="close" color="rgb(185 28 28)" size="1.5rem" />
					No</button
				>
			</div>
		{/if}
		{#if bubble_number == 32}
			<SpeechBubble
				on:doneSpeaking={() => {
					showBubble(32);
				}}
				file="very_good_based"
				text="Very good. Based on your responses, I believe the following tree species will work well. Tap the ones that you'd like to include in the plan."
			/>
			<div class="grid grid-cols-2">
				{#each species_options as [id, species]}
					{#if species.layer == ForestLayer.OVERSTORY}
						<div class="px-2">
							<SpeciesCard
								{species}
								selected={species.included}
								on:toggled={() => onSpeciesCardClicked(species)}
							/>
						</div>
					{/if}
				{/each}
			</div>
			<div class="flex flex-row justify-end gap-4">
				<button
					class="text-lg border-4 rounded-3xl hover:border-spring-400 transition-all p-2 border-dashed font-medium flex flex-row items-center justify-center text-spring-400"
					on:click={confirmSpecies}
					><Icon id="check_circle" color="#5b916f" size="1.5rem" />
					Done</button
				>
			</div>
		{/if}
		 -->
		{#if bubble_number >= 36}
			<SpeechBubble
				on:doneSpeaking={() => {
					showBubble(37);
				}}
				text="Now let me calculate the best placement of each seedling..."
				file="now_let_me"
			/>
		{/if}
		{#if bubble_number == 37}
			<SpeechBubble
				on:doneSpeaking={() => {
					showBubble(38);
					loadPlanToSecondMap();
				}}
				character="loading"
				text="Generating plan"
				file="loading"
			/>
		{/if}

		{#if bubble_number >= 38}
			<div class="rounded-2xl h-[36rem]">
				<OsmMap bind:this={osmMap} />
			</div>
			<SpeechBubble
				on:doneSpeaking={() => {
					showBubble(40);
					console.log(generator.getIncludedSpecies());
				}}
				text="All done. Here is the planting plan that I've designed. Shall I send this to Steward?"
				file="all_done_here"
			/>
		{/if}
		{#if bubble_number >= 40}
			<div class="flex flex-row justify-end gap-4">
				<button
					class="text-lg border-4 rounded-3xl hover:border-spring-400 transition-all p-2 border-dashed font-medium flex flex-row items-center justify-center text-spring-400"
					disabled={send_to_steward_text == "Plan sent!"}
					on:click={sendPlanToSteward}
					><Icon id="send" color="#5b916f" size="1.5rem" />
					{send_to_steward_text}</button
				>
			</div>
		{/if}
		{#if bubble_number >= 44}
			<SpeechBubble
				on:doneSpeaking={() => {
					// showBubble(40);
				}}
				text="Steward has received the plan. Now it's time to plant our seedlings. Tap the 'Control' tab on the left to continue."
				file="steward_has_received"
			/>
		{/if}

		<div id="scroll-anchor"></div>
	</div>
</div>
