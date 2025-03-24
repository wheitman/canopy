import "clsx";
import { V as pop, S as push } from "../../chunks/index.js";
function Transition($$payload, $$props) {
  let { children, url } = $$props;
  $$payload.out += `<!---->`;
  {
    $$payload.out += `<div class="transition svelte-vcdv4c">`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!---->`;
}
function _layout($$payload, $$props) {
  push();
  let { children, data } = $$props;
  $$payload.out += `<div class="layout svelte-1yognbj"><main class="svelte-1yognbj">`;
  Transition($$payload, {
    url: data.url,
    children: ($$payload2) => {
      children?.($$payload2);
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></main></div>`;
  pop();
}
export {
  _layout as default
};
