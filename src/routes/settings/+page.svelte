<script lang="ts">
	import type { Writable } from "svelte/store";
	import { writable } from "svelte/store";
	import { rosbridge_ip, rosbridge_port, addToast } from "$lib/stores";
	import { Button } from "bits-ui";
	import Cookies from "js-cookie";

	function saveParameters() {
		// Rosbridge

		let rosbridge_ip_new = document.getElementById("ros_ip_input").value;
		let rosbridge_port_new =
			document.getElementById("ros_port_input").value;
		rosbridge_ip.set(rosbridge_ip_new);
		rosbridge_port.set(rosbridge_port_new);
		Cookies.set("rosbridge/ip", rosbridge_ip_new, { expires: 365 });
		Cookies.set("rosbridge/port", rosbridge_port_new, { expires: 365 });
		addToast({ message: "Changes saved", type: "success" });
	}
</script>

<svelte:head>
	<title>Steward | Canopy</title>
	<meta name="description" content="Control and observe the robot" />
</svelte:head>

<div class="flex flex-col h-full w-full overflow-hidden max-w-2xl mx-auto p-8">
	<p class="text-5xl font-light my-4">Settings</p>
	<hr />
	<p class="text-3xl font-light my-3">
		<span class="material-symbols-rounded"> hub </span> Rosbridge
	</p>

	<label for="ros_port_input" class="text-lg">IP</label>
	<input
		class="appearance-none border rounded w-full py-2 px-3 leading-normal mb-4"
		id="ros_ip_input"
		type="text"
		placeholder="IP"
		value={$rosbridge_ip}
	/>

	<label for="ros_port_input" class="text-lg">Port</label>
	<input
		class="appearance-none border rounded w-full py-2 px-3 leading-normal mb-4"
		id="ros_port_input"
		type="text"
		placeholder="Port"
		value={$rosbridge_port}
	/>
	<hr />

	<div class="flex flex-row justify-end mt-4">
		<Button.Root
			class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-meadow-500 text-white hover:bg-meadow-600 focus:outline-none focus:ring-2 ring-meadow-600 ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
			on:click={saveParameters}
		>
			Save
		</Button.Root>
	</div>
</div>
