<script lang="ts">
	import projects from '$lib/projects.json'
	import LinkButton from '$lib/components/LinkButton.svelte'
	let count = $state(0)

	const increment = () => count++

	function getYoutubeVideoId(url: string): string {
		if (url.includes('youtu.be')) {
			return url.split('youtu.be/')[1]
		} else {
			console.log('url: ', url)
			return url.split('?v=')[1]
		}
	}
</script>

{#each projects as project}
	<div>
		<h2>{project.title}</h2>
		<div class="flex flex-row mb-2 items-center gap-2">
			<p class="italic">{project.date}</p>
			{#if project.links}
				{#each project.links as link}
					<LinkButton href={link.url} small>{link.title}</LinkButton>
				{/each}
			{/if}
		</div>
		{#if project.media.includes('youtu.be') || project.media.includes('youtube')}
			<iframe
				width="560"
				height="315"
				src="https://www.youtube.com/embed/{getYoutubeVideoId(project.media)}?si=jbVCJPbwUzCGLQG8"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		{:else if project.media.endsWith('.jpg') || project.media.endsWith('.png')}
			<img src={project.media} alt={project.title} class="max-h-96 mx-auto" />
		{/if}
		<p>{project.description}</p>

		<hr />
	</div>
{/each}
