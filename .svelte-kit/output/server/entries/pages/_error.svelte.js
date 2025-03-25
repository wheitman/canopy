import { g as getContext, e as escape_html, s as store_get, u as unsubscribe_stores, p as pop, a as push } from "../../chunks/index.js";
import "../../chunks/client.js";
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function _error($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<div class="error svelte-2l8l59"><h1>${escape_html(store_get($$store_subs ??= {}, "$page", page).status)}: ${escape_html(store_get($$store_subs ??= {}, "$page", page).error?.message)}</h1></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _error as default
};
