import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.Cm_Bxoon.js","_app/immutable/chunks/DF0WtOI1.js","_app/immutable/chunks/AwFcVDii.js","_app/immutable/chunks/eSxYClhJ.js","_app/immutable/chunks/BDL__wRQ.js","_app/immutable/chunks/CeYNnV-u.js","_app/immutable/chunks/C3zDuVeJ.js"];
export const stylesheets = [];
export const fonts = [];
