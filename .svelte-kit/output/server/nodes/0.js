import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.DsverGSC.js","_app/immutable/chunks/J7Q27kaP.js","_app/immutable/chunks/Cn4A9jBL.js","_app/immutable/chunks/B2P-shek.js","_app/immutable/chunks/CNOEbeXB.js","_app/immutable/chunks/EURyEsC8.js","_app/immutable/chunks/C0nEfooL.js","_app/immutable/chunks/DiZlyAPf.js","_app/immutable/chunks/x2b1Vvqr.js","_app/immutable/chunks/ExfUo834.js"];
export const stylesheets = ["_app/immutable/assets/0.Bn9DLB_D.css"];
export const fonts = ["_app/immutable/assets/atkinson-hyperlegible-latin-ext-400-normal.Dwzd0TKx.woff2","_app/immutable/assets/atkinson-hyperlegible-latin-ext-400-normal.-EtKVqC7.woff","_app/immutable/assets/atkinson-hyperlegible-latin-400-normal.BKTgBNmI.woff2","_app/immutable/assets/atkinson-hyperlegible-latin-400-normal.DDbeQdWO.woff","_app/immutable/assets/jetbrains-mono-cyrillic-400-normal.BEIGL1Tu.woff2","_app/immutable/assets/jetbrains-mono-cyrillic-400-normal.CIEtRijs.woff","_app/immutable/assets/jetbrains-mono-greek-400-normal.C190GLew.woff2","_app/immutable/assets/jetbrains-mono-greek-400-normal.CNojz0t3.woff","_app/immutable/assets/jetbrains-mono-vietnamese-400-normal.BeU3T8wf.woff","_app/immutable/assets/jetbrains-mono-latin-ext-400-normal.Bc8Ftmh3.woff2","_app/immutable/assets/jetbrains-mono-latin-ext-400-normal.DHMOLxAi.woff","_app/immutable/assets/jetbrains-mono-latin-400-normal.V6pRDFza.woff2","_app/immutable/assets/jetbrains-mono-latin-400-normal.B11XCQ5g.woff"];
