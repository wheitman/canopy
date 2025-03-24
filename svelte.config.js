import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'


/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter({
			runtime: 'nodejs20.x'
		}),
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		}
	}
}

export default config
