<script lang="ts">
	import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'
	import type { Post } from '$lib/types.js'
	import { Tabs } from 'bits-ui'
	import { ExternalLink } from 'lucide-svelte'

	let { data } = $props()
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<div class="mx-auto max-w-[40rem] pt-4">
	<div class="flex flex-col items-center">
		Canopy
	</div>

</div>

<style>
</style>
