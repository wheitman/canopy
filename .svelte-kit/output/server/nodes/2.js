import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.Bq9alc7g.js","_app/immutable/chunks/J7Q27kaP.js","_app/immutable/chunks/Cn4A9jBL.js","_app/immutable/chunks/CNOEbeXB.js","_app/immutable/chunks/rLcdn5In.js","_app/immutable/chunks/kpXueyij.js","_app/immutable/chunks/C_j4KH1M.js"];
export const stylesheets = [];
export const fonts = [];
