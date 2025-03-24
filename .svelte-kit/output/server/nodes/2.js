import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.CYV4h1jy.js","_app/immutable/chunks/3m_CeLIw.js","_app/immutable/chunks/CYSPZ53m.js","_app/immutable/chunks/Sqr5yqkx.js"];
export const stylesheets = [];
export const fonts = [];
