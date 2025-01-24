<script lang="ts">
	import type { Writable } from "svelte/store";
	import { writable } from "svelte/store";
	import { rosbridge_ip, rosbridge_port, addToast } from "$lib/stores";
	import { Button, Checkbox, ScrollArea, Tooltip } from "bits-ui";
	import Cookies from "js-cookie";
	import Icon from "$lib/misc/Icon.svelte";
	import { ForestGenerator, type Species } from "$lib/forest_generator";
	import { onMount } from "svelte";
	import { base } from "$app/paths";
	import Pagination from "$lib/navigation/Pagination.svelte";
	import { fly } from "svelte/transition";
	import OsmMap from "$lib/misc/OsmMap.svelte";

	let generator = new ForestGenerator();
	let species_options = generator.getSpeciesOptions();

	let current_step = 2;
	let osmMap: OsmMap;

	let selected_species_indices: Array<boolean> = [];
	let num_species_included: number = 0;
	species_options.forEach((species) => {
		selected_species_indices.push(species.included);
		if (species.included) num_species_included++;
	});

	onMount(() => {});

	function confirmSpeciesMix() {
		current_step = 2;
	}

	let plans = [
		{ name: "Flagstaff North", co2: "2300 tonnes/year", species_count: 12 },
		{ name: "CFA Lawn", co2: "700 tonnes/year", species_count: 5 },
		{ name: "Frick Park East", co2: "3100 tonnes/year", species_count: 14 },
		{ name: "Panther Hollow", co2: "300 tonnes/year", species_count: 9 },
	];

	let values: Array<string>;

	function speciesOptionClicked(species, index: number) {
		species.included = !species.included;
		selected_species_indices[index] = !selected_species_indices[index];
		if (species.included) num_species_included++;
		else num_species_included--;
		// console.log(selected_species_indices[index]);
	}
</script>

<svelte:head>
	<title>Steward | Canopy</title>
	<meta name="description" content="Control and observe the robot" />
</svelte:head>

<div class="flex flex-col h-full w-full max-w-2xl mx-auto p-8">
	<p class="text-4xl my-4">Let's plan your forest.</p>

	{#if current_step == 1}
		<div>
			<div class="flex">
				<Icon id="counter_1" size="1.5rem" color="" fill="1"></Icon>
				<p class="text-xl pl-2 font-medium">
					What would you like to plant?
				</p>
			</div>
			<p class="text-md">
				Here are good options for <strong>Pittsburgh, PA</strong>. Check
				the boxes next to the seedlings you'd like to include.
			</p>

			<div class="flex flex-row flex-wrap">
				{#each species_options as species, i}
					<button
						on:click={() => {
							speciesOptionClicked(species, i);
						}}
						class="flex flex-col border rounded-lg m-2 size-32 items-center justify-center transition-all"
						class:bg-lime-200={selected_species_indices[i]}
					>
						<img
							src="{base}/res/leaves/{species.icon}.svg"
							alt=""
							class="w-12 h-12"
						/>
						<p class="text-sm text-center font-medium">
							{species.common_name}
						</p>
						<p class="text-xs text-center italic">
							{species.scientific_name}
						</p>
					</button>
				{/each}
			</div>

			<div class="flex flex-row justify-between mt-4">
				<p>{num_species_included} seedlings selected.</p>
				<Button.Root
					class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-forest-600 text-white hover:bg-forest-700 focus:outline-none focus:ring-2 ring-forest-700 ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
					on:click={confirmSpeciesMix}
				>
					Next
				</Button.Root>
			</div>
		</div>
	{:else}
		<div class="flex">
			<Icon id="counter_1" size="1.5rem" color="" fill="0"></Icon>
			<p class="text-xl pl-2">What would you like to plant?</p>
		</div>
	{/if}
	{#if current_step == 2}
		<div class="overflow-y-auto">
			<div class="flex">
				<Icon id="counter_2" size="1.5rem" color="" fill="1"></Icon>
				<p class="text-xl pl-2 font-medium">
					Where would you like to plant?
				</p>
			</div>
			<div class="inline-flex rounded-lg shadow-sm m-4">
				<Button.Root
					class="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-slate-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
					on:click={osmMap.startDraw}
				>
					<Icon id="brush" size="1.25rem" color="" fill="0"
					></Icon>
					Paint Forest
				</Button.Root>
				<Button.Root
					class="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-slate-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
					on:click={osmMap.startErase}
				>
					<Icon id="ink_eraser" size="1.25rem" color="" fill="0"
					></Icon>
					Erase
				</Button.Root>
				<Button.Root
					class="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-slate-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
					on:click={osmMap.startPan}
				>
					<Icon id="pan_tool" size="1.25rem" color="" fill="0"
					></Icon>

					Move
				</Button.Root>
				<Button.Root
					class="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-slate-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
					on:click={osmMap.clear}
				>
					<Icon id="delete" size="1.25rem" color="" fill="0"
					></Icon>

					Clear
				</Button.Root>
			</div>
			<div class="w-full h-96 relative">

				<OsmMap bind:this={osmMap} />
			</div>
		</div>
	{:else}
		<div class="flex">
			<Icon id="counter_2" size="1.5rem" color="" fill="0"></Icon>
			<p class="text-xl pl-2">Where would you like to plant?</p>
		</div>
	{/if}
	<div class="flex">
		<Icon id="counter_3" size="1.5rem" color="" fill="0"></Icon>
		<p class="text-xl pl-2">Name and save your plan.</p>
	</div>
	<div class="flex">
		<Icon id="counter_4" size="1.5rem" color="" fill="0"></Icon>
		<p class="text-xl pl-2">Send to Steward.</p>
	</div>
</div>
