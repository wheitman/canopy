export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["apps/forest-generator/assets/index-1b80958c.css","apps/forest-generator/assets/index-6aa8892e.js","apps/forest-generator/index.html","docs/resume.pdf","drawing.png","favicon-light.png","favicon-old.png","favicon.png","res/2021-06-15-Aligning-the-Lidars-finger.png","res/2021-06-15-Aligning-the-Lidars-plane.png","res/2021-06-15-Aligning-the-Lidars-skewed.png","res/2021-06-15-Aligning-the-Lidars-topdown.png","res/2022-04-12-nudging.png","res/2022-04-12-ursa_presentation.jpg","res/2022-08-02-Chartreuse-watercolor.png","res/2022-08-02-Elephant-fountain.png","res/2022-08-02-Elevation-profile.png","res/2025-02-13-appleseed_concepts.png","res/2025-02-13-ecosim_concepts.png","res/2025-02-13-logos.svg","res/22-03-13-forest-generator.png","res/22-07-02-life.gif","res/22-09-06-IFAC-discussion.jpg","res/22-09-06-IFAC-group.jpg","res/22-09-06-IFAC_stadium_pic.jpg","res/22-10-29-Constrained-hypercube.png","res/22-10-29-Convex-hull.png","res/22-10-29-Conzo.png","res/22-10-29-Hybrid-zono.png","res/22-10-29-Minkowski-sums.png","res/22-10-29-Parallelohedrons.png","res/22-11-01-Zonotope-slam.png","res/22-11-04-RoA-trajectories.png","res/22-11-04-RoAs.png","res/22-11-04-Walker.png","res/23-02-13-height-grid-paths.png","res/23-02-13-height-grid.png","res/23-02-13-iguana.png","res/23-02-13-mp3.png","res/23-02-13-planning-1.png","res/23-02-13-planning-2.png","res/23-02-13-planning-3.png","res/23-02-13-rrt.png","res/23-05-19-Family-graduation.jpg","res/23-08-05-cartpole_500eps.gif","res/23-08-05-cartpole_start.gif","res/23-09-04-aligned.png","res/23-09-04-misaligned.png","res/23-09-14-bag-of-words.png","res/24-06-06-druid-screenshot.png","res/24-06-06-druid.svg","res/24-06-06-wrong-prediction.png","res/24-07-30-spectroscopy-screenshot.png","res/24-08-29-druid-3d.png","res/24-08-29-druid-animation.png","res/24-08-29-druid-figma.png","res/24-08-29-druid-new.svg","res/24-08-29-druid-noloop.gif","res/24-08-29-druid-screenshot.jpg","res/24-08-29-druid-sketches.png","res/24-08-29-example-ais.png","res/24-08-29-ibm-printout.png","res/24-08-29-ibm-printout.pngZone.Identifier","res/24-12-10-steward-software-architecture.svg","res/24-12-26-steward.png","res/25-03-13-kale.jpg","res/25-03-13-wwoof-group.jpeg","res/25-03-18-canopy-control.png","res/25-03-18-canopy-design-tab.png","res/druid-new.svgZone.Identifier","res/druid-noloop.gifZone.Identifier","res/druid-screenshot-new.jpgZone.Identifier","res/ecosim.svg","res/favicon-old.jpg","res/favicon.jpg","res/favicon.png","res/pfp.jpg","res/voltron.png"]),
	mimeTypes: {".css":"text/css",".js":"text/javascript",".html":"text/html",".pdf":"application/pdf",".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml",".gif":"image/gif",".jpeg":"image/jpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.Coo5_SRy.js",app:"_app/immutable/entry/app.g8O4P3q0.js",imports:["_app/immutable/entry/start.Coo5_SRy.js","_app/immutable/chunks/C3zDuVeJ.js","_app/immutable/chunks/AwFcVDii.js","_app/immutable/chunks/CeYNnV-u.js","_app/immutable/entry/app.g8O4P3q0.js","_app/immutable/chunks/CfcQdqZJ.js","_app/immutable/chunks/AwFcVDii.js","_app/immutable/chunks/Bedstq2Q.js","_app/immutable/chunks/DK8CJ6tG.js","_app/immutable/chunks/BDL__wRQ.js","_app/immutable/chunks/DF0WtOI1.js","_app/immutable/chunks/Coivoa4k.js","_app/immutable/chunks/Dg0Jxp-V.js","_app/immutable/chunks/BT-P0YJ4.js","_app/immutable/chunks/CeYNnV-u.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/control",
				pattern: /^\/control\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/design",
				pattern: /^\/design\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
