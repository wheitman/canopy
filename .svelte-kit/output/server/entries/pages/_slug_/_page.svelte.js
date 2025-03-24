import { $ as rest_props, a0 as fallback, a1 as ensure_array_like, a2 as spread_attributes, a3 as clsx, a4 as element, a5 as slot, a6 as bind_props, V as pop, a7 as sanitize_props, S as push, a8 as spread_props, _ as head, X as escape_html, a9 as attr } from "../../../chunks/index.js";
function formatDate(date, dateStyle = "medium", locales = "en") {
  const formatter = new Intl.DateTimeFormat(locales, { dateStyle });
  try {
    return formatter.format(new Date(date));
  } catch (e) {
    return date;
  }
}
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
function Move_left($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M6 8L2 12L6 16" }],
    ["path", { "d": "M2 12H22" }]
  ];
  Icon($$payload, spread_props([
    { name: "move-left" },
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
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const each_array = ensure_array_like(data.meta.categories);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(data.meta.title)}</title>`;
    $$payload2.out += `<meta property="og:type" content="article"> <meta property="og:title"${attr("content", data.meta.title)}>`;
  });
  $$payload.out += `<article class="flex flex-col max-w-[36rem] px-2 mx-auto"><a href="/" class="flex flex-row gap-2 py-6 items-center">`;
  Move_left($$payload, { strokeWidth: "1" });
  $$payload.out += `<!----> Back home</a> <hgroup><h1>${escape_html(data.meta.title)}</h1> <p class="text-sm">${escape_html(formatDate(data.meta.date))}</p></hgroup> <div class="tags"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let category = each_array[$$index];
    $$payload.out += `<span class="surface-4">#${escape_html(category)}</span>`;
  }
  $$payload.out += `<!--]--></div> <div class="prose"><!---->`;
  data.content($$payload, {});
  $$payload.out += `<!----></div></article>`;
  pop();
}
export {
  _page as default
};
