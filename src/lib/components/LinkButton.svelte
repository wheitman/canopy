<script lang="ts">
	import { Button } from 'bits-ui'

	export let href = ''
	export let small: boolean = false
</script>

<Button.Root
	class="rounded-input border-spring-300 text-spring-400 border-2 shadow-mini hover:bg-spring-100 inline-flex
      {small ? 'h-6' : 'h-8'} items-center justify-center px-2 text-[15px]
      font-semibold active:scale-[0.98] transition-all"
	onclick={() => (window.location.href = href)}
>
	<slot />
</Button.Root>
