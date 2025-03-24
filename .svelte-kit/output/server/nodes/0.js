import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.DjgZn7PH.js","_app/immutable/chunks/3m_CeLIw.js","_app/immutable/chunks/CYSPZ53m.js","_app/immutable/chunks/gHPKqF04.js","_app/immutable/chunks/Sqr5yqkx.js"];
export const stylesheets = ["_app/immutable/assets/0.CtftP_Q4.css"];
export const fonts = ["_app/immutable/assets/atkinson-hyperlegible-latin-ext-400-normal.Dwzd0TKx.woff2","_app/immutable/assets/atkinson-hyperlegible-latin-ext-400-normal.-EtKVqC7.woff","_app/immutable/assets/atkinson-hyperlegible-latin-400-normal.BKTgBNmI.woff2","_app/immutable/assets/atkinson-hyperlegible-latin-400-normal.DDbeQdWO.woff","_app/immutable/assets/jetbrains-mono-cyrillic-400-normal.BEIGL1Tu.woff2","_app/immutable/assets/jetbrains-mono-cyrillic-400-normal.CIEtRijs.woff","_app/immutable/assets/jetbrains-mono-greek-400-normal.C190GLew.woff2","_app/immutable/assets/jetbrains-mono-greek-400-normal.CNojz0t3.woff","_app/immutable/assets/jetbrains-mono-vietnamese-400-normal.BeU3T8wf.woff","_app/immutable/assets/jetbrains-mono-latin-ext-400-normal.Bc8Ftmh3.woff2","_app/immutable/assets/jetbrains-mono-latin-ext-400-normal.DHMOLxAi.woff","_app/immutable/assets/jetbrains-mono-latin-400-normal.V6pRDFza.woff2","_app/immutable/assets/jetbrains-mono-latin-400-normal.B11XCQ5g.woff"];
