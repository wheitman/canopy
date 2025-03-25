import { h as head, p as pop, a as push } from "../../chunks/index.js";
import "../../chunks/client.js";
function _page($$payload, $$props) {
  push();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Canopy</title>`;
  });
  $$payload.out += `<div class="mx-auto max-w-[40rem] pt-4"><div class="flex flex-col items-center">Canopy</div></div>`;
  pop();
}
export {
  _page as default
};
