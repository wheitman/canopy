<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		goto('/design');
	});
</script>

<svelte:head>
	<title>Canopy</title>
</svelte:head>

<div class="mx-auto max-w-[40rem] pt-4">
	<div class="flex flex-col items-center">Canopy</div>
</div>

<style>
</style>
