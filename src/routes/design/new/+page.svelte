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
	import Pagination from "$lib/navigation/Pagination.svelte";
	import { fly } from "svelte/transition";
	import OsmMap from "$lib/misc/OsmMap.svelte";
	import SpeciesCard from "$lib/misc/SpeciesCard.svelte";

	function onGeneratorChanged() {
		console.log(generator.locations);

		osmMap.clearSeedlingMarkers();
		for (let [latlon, seedling] of generator.locations) {
			osmMap.addSeedlingMarker(latlon, seedling);
		}

		savePlan();
		publishPlanToRos();
	}

	let generator = new ForestGenerator(onGeneratorChanged);
	let species_options = generator.getSpeciesOptions();
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

	function publishPlanToRos() {
		let plan_obj: PlantingPlan = generator.toRos();
		complete_plan.set(plan_obj);
	}

	function savePlan() {
		let plan_string = generator.toString();
		localStorage.setItem(`plan`, JSON.stringify(plan_string));
		console.log(`Autosaved: ${plan_string.slice(0, 100)}...`);
	}

	function loadPlan() {
		let plan_string = localStorage.getItem(`plan`);
		console.log(plan_string);

		generator.loadFromString(plan_string);
		let plan_obj = JSON.parse(JSON.parse(plan_string));

		osmMap.setGeometry(plan_obj.geojson);
	}

	function loadPlanB() {
		let plan_string = localStorage.getItem(`plan-b`);
		console.log(plan_string);

		generator.loadFromString(plan_string);
		let plan_obj = JSON.parse(JSON.parse(plan_string));

		osmMap.setGeometry(plan_obj.geojson);
	}

	onMount(() => {
		setTimeout(loadPlan, 500);
	});

	enum MapAction {
		DRAW,
		PAN,
		CLEAR,
		ERASE,
	}

	let current_step = 2;
	let osmMap: OsmMap;
	let current_action = MapAction.PAN;

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

	let planting_density_slider_val: number[] = [0.6];
</script>

<svelte:head>
	<title>Steward | Canopy</title>
	<meta name="description" content="Control and observe the robot" />
</svelte:head>

<div class="size-full overflow-hidden">
	<OsmMap
		useCurrentPos={false}
		bind:this={osmMap}
		on:geomchanged={onMapGeomChanged}
	/>

	<div
		class="flex flex-row w-full items-center justify-between relative top-[-100%]"
	>
		<div
			class="flex flex-row items-center rounded-lg shadow-md m-4 bg-white h-12"
		>
			<input
				type="text"
				class="px-4 block w-full font-semibold border-gray-200 rounded-lg text-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
				placeholder="Plan Name"
				value={plan_name}
			/>
		</div>
		<div class="grow flex flex-row justify-center">
			<div class="inline-flex rounded-lg shadow-md m-4">
				<Popover.Root>
					<Popover.Trigger
						class="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-md hover:bg-neutral-200 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
					>
						<Icon id="palette" size="1.25rem" color="" fill="0"
						></Icon>

						<p class="hidden lg:inline">Species Palette</p>
						{#if included_species_count > 3}
							<span
								class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-lime-500 text-white"
								class:bg-lime-400={included_species_count > 3}
								>{included_species_count}</span
							>
						{:else if included_species_count > 1}
							<span
								class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-sand-400 text-white"
								class:bg-lime-400={included_species_count > 3}
								>{included_species_count}</span
							>
						{:else}
							<span
								class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-red-400 text-white"
								class:bg-lime-400={included_species_count > 3}
								>{included_species_count}</span
							>
						{/if}
					</Popover.Trigger>
					<Popover.Content
						class="z-30 w-full max-w-96 rounded-[12px] border border-dark-10 bg-white p-4 shadow-md"
						transition={fly}
						sideOffset={8}
					>
						<div class="flex flex-row w-full items-center gap-2">
							Sparse

							<div class="px-3 py-4 pb-3 w-full">
								<Slider.Root
									bind:value={planting_density_slider_val}
									min={0}
									max={1}
									step={0.2}
									let:thumbs
									class="relative flex w-full touch-none select-none items-center"
								>
									<span
										class="relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-200"
									>
										<Slider.Range
											class="absolute h-full bg-neutral-700"
										/>
									</span>
									{#each thumbs as thumb}
										<Slider.Thumb
											{thumb}
											class="block size-[25px] cursor-pointer rounded-full border border-border-input bg-white shadow  transition-colors hover:border-dark-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 active:scale-98 disabled:pointer-events-none disabled:opacity-50 dark:bg-foreground dark:shadow-card"
										/>
									{/each}
								</Slider.Root>
							</div>
							Dense
						</div>
						<hr class="mt-3 mb-3" />
						<div
							class="flex row items-center gap-3 justify-center mb-4"
						>
							<span class="material-symbols-outlined text-md">
								info
							</span>
							<p class="text-sm italic">
								These are suitable species for <strong
									>Pittsburgh</strong
								>. <br /> A professional forester can help you find
								appropriate species for your area.
							</p>
						</div>
						<Tabs.Root
							value="understory"
							class=" bg-background-alt shadow-card"
						>
							<Tabs.List
								class="grid w-full grid-cols-3 gap-1 rounded-lg bg-neutral-200 p-1 text-sm font-semibold leading-[0.01em] shadow-mini-inset dark:border dark:border-neutral-600/30 dark:bg-background"
							>
								<Tabs.Trigger
									value="understory"
									class="h-8 rounded-[7px] bg-transparent py-2 data-[state=active]:bg-white data-[state=active]:shadow-mini dark:data-[state=active]:bg-neutral-500"
									>Understory
									<span
										class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-neutral-400 text-white"
										>{included_understory_count}</span
									></Tabs.Trigger
								>
								<Tabs.Trigger
									value="overstory"
									class="h-8 rounded-[7px] bg-transparent py-2 data-[state=active]:bg-white data-[state=active]:shadow-mini dark:data-[state=active]:bg-muted"
									>Overstory
									<span
										class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-neutral-400 text-white"
										>{included_overstory_count}</span
									></Tabs.Trigger
								>
								<Tabs.Trigger
									value="emergent"
									class="h-8 rounded-[7px] bg-transparent py-2 data-[state=active]:bg-white data-[state=active]:shadow-mini dark:data-[state=active]:bg-muted"
									>Emergent
									<span
										class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-neutral-400 text-white"
										>{included_emergent_count}</span
									></Tabs.Trigger
								>
							</Tabs.List>
							<Tabs.Content
								value="understory"
								class="mt-3 overflow-y-auto max-h-96"
							>
								{#each species_options as [id, species], i}
									{#if species.layer == ForestLayer.UNDERSTORY}
										<SpeciesCard
											{species}
											selected={species.included}
											on:toggled={() =>
												onSpeciesCardClicked(species)}
										/>
									{/if}
								{/each}
							</Tabs.Content>
							<Tabs.Content
								value="overstory"
								class="mt-3 overflow-y-auto max-h-96"
							>
								{#each species_options as [id, species]}
									{#if species.layer == ForestLayer.OVERSTORY}
										<SpeciesCard
											{species}
											selected={species.included}
											on:toggled={() =>
												onSpeciesCardClicked(species)}
										/>
									{/if}
								{/each}
							</Tabs.Content>
							<Tabs.Content
								value="emergent"
								class="mt-3 overflow-y-auto max-h-96"
							>
								{#each species_options as [id, species]}
									{#if species.layer == ForestLayer.EMERGENT}
										<SpeciesCard
											{species}
											selected={species.included}
											on:toggled={() =>
												onSpeciesCardClicked(species)}
										/>
									{/if}
								{/each}
							</Tabs.Content>
						</Tabs.Root>
					</Popover.Content>
				</Popover.Root>
				<Button.Root
					class="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-md hover:bg-neutral-200 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
					on:click={startDraw}
					disabled={included_species_count < 1}
				>
					<Icon
						id="brush"
						size="1.25rem"
						color=""
						fill={current_action == MapAction.DRAW ? "1" : "0"}
					></Icon>
					<p class="hidden lg:inline">Paint Forest</p>
				</Button.Root>
				<Button.Root
					class="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-md hover:bg-neutral-200 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
					on:click={startErase}
				>
					<Icon
						id="ink_eraser"
						size="1.25rem"
						color=""
						fill={current_action == MapAction.ERASE ? "1" : "0"}
					></Icon>
					<p class="hidden lg:inline">Erase</p>
				</Button.Root>
				<Button.Root
					class="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-md hover:bg-neutral-200 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
					on:click={startPan}
				>
					<Icon
						id="pan_tool"
						size={"1.25rem"}
						color=""
						fill={current_action == MapAction.PAN ? "1" : "0"}
					></Icon>

					<p class="hidden lg:inline">Move</p>
				</Button.Root>
				<Button.Root
					class="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-md hover:bg-red-500 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
					on:click={osmMap.clear}
				>
					<Icon id="delete" size="1.25rem" color="" fill="0"></Icon>
					<p class="hidden lg:inline">Clear</p>
				</Button.Root>
			</div>
		</div>
	</div>
</div>