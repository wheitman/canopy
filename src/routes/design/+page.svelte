<script lang="ts">
	// import type { Writable } from "svelte/store";
	// import { writable } from "svelte/store";
	// import { rosbridge_ip, rosbridge_port, addToast } from "$lib/stores";
	// import { Button, ScrollArea } from "bits-ui";
	// import Cookies from "js-cookie";
	// import { base } from "$app/paths";
	// import Icon from "$lib/misc/Icon.svelte";
	// import { ForestGenerator } from "$lib/forest_generator";
	// import { onMount } from "svelte";

	// function saveParameters() {
	// 	// Rosbridge

	// 	let rosbridge_ip_new = document.getElementById("ros_ip_input").value;
	// 	let rosbridge_port_new =
	// 		document.getElementById("ros_port_input").value;
	// 	rosbridge_ip.set(rosbridge_ip_new);
	// 	rosbridge_port.set(rosbridge_port_new);
	// 	Cookies.set("rosbridge/ip", rosbridge_ip_new, { expires: 365 });
	// 	Cookies.set("rosbridge/port", rosbridge_port_new, { expires: 365 });
	// 	addToast({ message: "Changes saved", type: "success" });
	// }

	// let plans = [
	// 	{ name: "Flagstaff North", co2: "2300 tonnes/year", species_count: 12 },
	// 	{ name: "CFA Lawn", co2: "700 tonnes/year", species_count: 5 },
	// 	{ name: "Frick Park East", co2: "3100 tonnes/year", species_count: 14 },
	// 	{ name: "Panther Hollow", co2: "300 tonnes/year", species_count: 9 },
	// ];
</script>

<svelte:head>
	<title>Steward | Canopy</title>
	<meta name="description" content="Control and observe the robot" />
</svelte:head>

<!-- <div class="flex flex-col h-full w-full overflow-hidden max-w-xl mx-auto p-8">
	<div class="flex flex-row justify-center mt-4">
		<a
			href="{base}/design/new"
			class="py-3 no-underline px-4 inline-flex items-center text-lg gap-x-2 font-medium rounded-lg border border-transparent bg-forest-600 text-white hover:bg-forest-700 focus:outline-none focus:ring-2 ring-forest-600 ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
			style="text-decoration: none;"
			on:click={saveParameters}
		>
			<Icon id="add" size="1.5rem" color="" fill="0"></Icon>
			Create a new plan
		</a>
	</div>
	
	or load your earlier plan:

	<div
		class="w-full rounded-[10px] border border-gray-300 bg-background-alt px-2 py-4 shadow-card"
	>
		<ScrollArea.Root class="relative h-[205px] px-4">
			<ScrollArea.Viewport class="h-full w-full">
				<ScrollArea.Content>
					{#each plans as plan}
						<p class="text-xl font-semibold">{plan.name}</p>
						<div class="flex flex-row space-x-2">
							<div class="flex flex-row space-x-1">
								<Icon id="co2" size="1.5rem" color="" fill="0"
								></Icon>
								<p>{plan.co2}</p>
							</div>

							<div class="flex flex-row space-x-1">
								<Icon
									id="nature"
									size="1.5rem"
									color=""
									fill="0"
								></Icon>
								<p>{plan.species_count} species</p>
							</div>
						</div>
						<hr class="my-3" />
					{/each}
				</ScrollArea.Content>
			</ScrollArea.Viewport>
			<ScrollArea.Scrollbar
				orientation="vertical"
				class="flex h-full w-2.5 touch-none select-none rounded-full border-l border-l-transparent p-px transition-all hover:w-3 hover:bg-dark-10"
			>
				<ScrollArea.Thumb
					class="relative flex-1 rounded-full bg-muted-foreground opacity-40 transition-opacity hover:opacity-100"
				/>
			</ScrollArea.Scrollbar>
			<ScrollArea.Corner />
		</ScrollArea.Root>
	</div>
</div> -->
