import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        meadow: {
          '50': '#ebfef7',
          '100': '#d0fbe8',
          '200': '#a5f5d7',
          '300': '#6aebc2',
          '400': '#2fd8a8',
          '500': '#0ab68b',
          '600': '#009b78',
          '700': '#007c63',
          '800': '#03624f',
          '900': '#045042',
          '950': '#012d27',
        },
        sand: {
          '50': '#fff9ed',
          '100': '#fff1d5',
          '200': '#ffe3b3',
          '300': '#ffc872',
          '400': '#fda53a',
          '500': '#fc8913',
          '600': '#ed6d09',
          '700': '#c4520a',
          '800': '#9c4010',
          '900': '#7d3611',
          '950': '#441a06',
        },
        forest: {
          '50': '#eefffb',
          '100': '#c6fff3',
          '200': '#8dffe8',
          '300': '#4cfcdc',
          '400': '#18e9ca',
          '500': '#00cdb1',
          '600': '#00a592',
          '700': '#028174',
          '800': '#07685f',
          '900': '#0c554e',
          '950': '#003432',
        },
        lime: {
          '50': '#f4faf3',
          '100': '#e5f5e3',
          '200': '#cbebc7',
          '300': '#92d38b',
          '400': '#71bf69',
          '500': '#4da344',
          '600': '#3a8633',
          '700': '#306a2b',
          '800': '#2a5526',
          '900': '#234621',
          '950': '#0e260d',
        },
        spring: {
          '50': '#f1f8f3',
          '100': '#deede1',
          '200': '#bfdbc7',
          '300': '#95c0a4',
          '400': '#5b916f',
          '500': '#46835f',
          '600': '#346749',
          '700': '#29533c',
          '800': '#234231',
          '900': '#1d3729',
          '950': '#101e17',
        },



      },
      fontFamily: { 'sans': ['"Noto Sans"', 'ui-sans-serif', 'system-ui',], 'serif': ['Neuton', 'ui-serif'] },
      typography: (theme) => ({}),
    },
  },

  plugins: [
    typography,
    plugin(function ({ addVariant, matchUtilities, theme }) {
      addVariant("hocus", ["&:hover", "&:focus"]);
      // Square utility
      matchUtilities(
        {
          square: (value) => ({
            width: value,
            height: value,
          }),
        },
        { values: theme("spacing") }
      );
    }),
  ],
} satisfies Config;
