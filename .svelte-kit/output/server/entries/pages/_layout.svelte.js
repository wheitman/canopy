import "clsx";
import { r as rest_props, f as fallback, b as ensure_array_like, c as spread_attributes, d as clsx, i as element, j as slot, k as bind_props, p as pop, l as sanitize_props, a as push, m as spread_props } from "../../chunks/index.js";
/**
 * @license lucide-svelte v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function Icon($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "name",
    "color",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "iconNode"
  ]);
  push();
  let name = fallback($$props["name"], void 0);
  let color = fallback($$props["color"], "currentColor");
  let size = fallback($$props["size"], 24);
  let strokeWidth = fallback($$props["strokeWidth"], 2);
  let absoluteStrokeWidth = fallback($$props["absoluteStrokeWidth"], false);
  let iconNode = fallback($$props["iconNode"], () => [], true);
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");
  const each_array = ensure_array_like(iconNode);
  $$payload.out += `<svg${spread_attributes(
    {
      ...defaultAttributes,
      ...$$restProps,
      width: size,
      height: size,
      stroke: color,
      "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      class: clsx(mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$sanitized_props.class))
    },
    void 0,
    void 0,
    3
  )}><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let [tag, attrs] = each_array[$$index];
    element($$payload, tag, () => {
      $$payload.out += `${spread_attributes({ ...attrs }, void 0, void 0, 3)}`;
    });
  }
  $$payload.out += `<!--]--><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></svg>`;
  bind_props($$props, {
    name,
    color,
    size,
    strokeWidth,
    absoluteStrokeWidth,
    iconNode
  });
  pop();
}
function Bot($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M12 8V4H8" }],
    [
      "rect",
      {
        "width": "16",
        "height": "12",
        "x": "4",
        "y": "8",
        "rx": "2"
      }
    ],
    ["path", { "d": "M2 14h2" }],
    ["path", { "d": "M20 14h2" }],
    ["path", { "d": "M15 13v2" }],
    ["path", { "d": "M9 13v2" }]
  ];
  Icon($$payload, spread_props([
    { name: "bot" },
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
  $$payload.out += `<div class="layout flex flex-col overflow-hidden svelte-q0zhp8"><main class="overflow-auto svelte-q0zhp8">`;
  children?.($$payload);
  $$payload.out += `<!----></main> `;
  Navbar($$payload);
  $$payload.out += `<!----></div>`;
}
export {
  _layout as default
};
