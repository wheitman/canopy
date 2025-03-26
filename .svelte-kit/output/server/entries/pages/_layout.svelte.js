import "clsx";
import { m as spread_props, j as slot, l as sanitize_props, i as element, k as bind_props, c as spread_attributes } from "../../chunks/index.js";
import { I as Icon, B as Bot } from "../../chunks/bot.js";
function Brush($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"
      }
    ],
    [
      "path",
      {
        "d": "M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "brush" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Button($$payload, $$props) {
  let {
    href,
    type,
    children,
    disabled = false,
    ref = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  element(
    $$payload,
    href ? "a" : "button",
    () => {
      $$payload.out += `${spread_attributes({
        type: href ? void 0 : type,
        href: href && !disabled ? href : void 0,
        disabled: href ? void 0 : disabled,
        "aria-disabled": href ? disabled : void 0,
        role: href && disabled ? "link" : void 0,
        tabindex: href && disabled ? -1 : 0,
        ...restProps
      })}`;
    },
    () => {
      children?.($$payload);
      $$payload.out += `<!---->`;
    }
  );
  bind_props($$props, { ref });
}
function Navbar($$payload) {
  $$payload.out += `<div class="h-14 flex flex-row items-center justify-center">`;
  Button($$payload, {
    class: "rounded-lg text-dark  hover:bg-dark/5 border-none\n    h-10 items-center justify-center px-[21px] text-[15px]\n    font-semibold active:scale-[0.98] active:transition-all flex flex-col",
    href: "/design",
    children: ($$payload2) => {
      Brush($$payload2, {});
      $$payload2.out += `<!----> Design`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Button($$payload, {
    class: "rounded-lg text-dark  hover:bg-dark/5 border-none\n    h-10 items-center justify-center px-[21px] text-[15px]\n    font-semibold active:scale-[0.98] active:transition-all flex flex-col",
    href: "/control",
    children: ($$payload2) => {
      Bot($$payload2, {});
      $$payload2.out += `<!----> Control`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div>`;
}
function _layout($$payload, $$props) {
  let { children, data } = $$props;
  $$payload.out += `<div class="layout flex flex-col overflow-hidden svelte-15yw0yw"><main class="overflow-auto svelte-15yw0yw">`;
  children?.($$payload);
  $$payload.out += `<!----></main> `;
  Navbar($$payload);
  $$payload.out += `<!----></div>`;
}
export {
  _layout as default
};
