import { _ as head, V as pop, X as escape_html, S as push } from "../../chunks/index.js";
const title = "Will Heitman";
function _page($$payload, $$props) {
  push();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(title)}</title>`;
  });
  $$payload.out += `<div class="mx-auto max-w-[40rem] pt-4"><div class="flex flex-col items-center">Canopy</div></div>`;
  pop();
}
export {
  _page as default
};
