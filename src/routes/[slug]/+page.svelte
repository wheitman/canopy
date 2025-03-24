<script lang="ts">
	import { formatDate } from '$lib/utils'

	import { MoveLeft } from 'lucide-svelte'

	let { data } = $props()
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="flex flex-col max-w-[36rem] px-2 mx-auto">
	<a href="/" class="flex flex-row gap-2 py-6 items-center"><MoveLeft strokeWidth="1" /> Back home</a>

	<hgroup>
		<h1>{data.meta.title}</h1>
		<p class="text-sm">{formatDate(data.meta.date)}</p>
	</hgroup>

	<div class="tags">
		{#each data.meta.categories as category}
			<span class="surface-4">&num;{category}</span>
		{/each}
	</div>

	<div class="prose">
		<data.content />
	</div>
</article>

<style>
</style>
