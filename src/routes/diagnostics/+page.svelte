<script lang="ts">
	import Joystick from "$lib/misc/Joystick.svelte";
	import { camera_image, type TeleopCommand } from "$lib/stores";
	import { diagnostic_agg } from "$lib/stores";
	import type { Writable } from "svelte/store";
	import { writable } from "svelte/store";
	import { ScrollArea } from "bits-ui";
	import Icon from "$lib/misc/Icon.svelte";

	let statuses: any[] = [];
	diagnostic_agg.subscribe((msg) => {
		if (!msg) return;
		// console.log(msg);

		statuses = msg.status;
		// console.log(statuses[0]);
	});
</script>

<svelte:head>
	<title>Diagnostics | Canopy</title>
	<meta name="description" content="View Steward's health" />
</svelte:head>

<div class="flex flex-col h-full w-full overflow-y-auto max-w-2xl mx-auto p-8">
	<p class="text-5xl font-light my-4">Diagnostics</p>
	<hr />

	{#each statuses as status, i}
		<!-- Name and status level -->
		<div class="flex flex-row align-bottom items-center">
			{#if status.level == 0}
				<Icon id="check" size="1.5rem" color="green"></Icon>
			{:else if status.level == 1}
				<Icon id="change_history" size="1.5rem" color="#fbbf24"></Icon>
			{:else if status.level == 2}
				<Icon id="error" size="1.5rem" color="#b91c1c"></Icon>
			{:else if status.level == 3}
				<span class="material-symbols-rounded"> schedule </span>
			{/if}
			<p class="text-xl font-regular my-4">{status.name}</p>
		</div>
		<!-- Message -->
		<div class="flex flex-row">
			<Icon id="message" size="1rem" color=""></Icon>
			<p class="ml-2">"{status.message}"</p>
		</div>

		{#if status.values.length > 0}
			<p class="mt-2">Keys</p>

			<div class="flex flex-col">
				<div class="-m-1.5 overflow-x-auto">
					<div class="p-1.5 min-w-full inline-block align-middle">
						<div
							class="border rounded-lg shadow overflow-hidden dark:border-neutral-700 dark:shadow-gray-900"
						>
							<table
								class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700"
							>
								<thead>
									<tr>
										<th
											scope="col"
											class="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
											>Key</th
										>
										<th
											scope="col"
											class="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
											>Value</th
										>
									</tr>
								</thead>
								<tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
									{#each status.values as kv, i}
										<tr>
											<td>
												<p class="px-2">{kv.key}</p>
											</td>
											<td>
												<p class="px-2">{kv.value}</p>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		{/if}
		<hr class="mt-4" />
	{/each}
</div>
