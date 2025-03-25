<script lang="ts">
	import PageTransition from "./transition.svelte";
	import Navbar from "$lib/components/Navbar.svelte";

	import "../app.css";

	let { children, data } = $props();
</script>

<div class="layout flex flex-col overflow-hidden">
	<!-- <div class="w-full h-full bg-spring-400"></div> -->
	<main class="overflow-auto">
		<!-- <PageTransition url={data.url}> -->
		{@render children?.()}
		<!-- </PageTransition> -->
	</main>

	<Navbar />
</div>

<style>
	.layout {
		height: 100vh;
		width: 100vw;
		/* max-inline-size: 1440px; */
		/* display: grid; */
		/* grid-template-rows: auto 1fr auto; */
		/* margin-inline: auto; */
		/* padding-inline: var(--size-7); */

		/* @media (min-width: 1440px) {
			padding-inline: 0;
		} */
	}
	main {
		padding-block: var(--size-9);
		height: calc(100vh - 70px);
		width: 100vw;
	}
</style>
