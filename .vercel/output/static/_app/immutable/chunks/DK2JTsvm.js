import{q as O,z,E as I,p as R,am as V,ax as j,v,d as q,s as k,_ as B,ay as F,az as M}from"./AwFcVDii.js";import{d as P,e as S,f as D,n as G,g as K}from"./DK8CJ6tG.js";function Y(s,r){if(r){const t=document.body;s.autofocus=!0,O(()=>{document.activeElement===t&&s.focus()})}}function x(s,r,...t){var i=s,o=V,c;z(()=>{o!==(o=r())&&(c&&(j(c),c=null),c=R(()=>o(i,...t)))},I),v&&(i=q)}function E(s){var r,t,i="";if(typeof s=="string"||typeof s=="number")i+=s;else if(typeof s=="object")if(Array.isArray(s)){var o=s.length;for(r=0;r<o;r++)s[r]&&(t=E(s[r]))&&(i&&(i+=" "),i+=t)}else for(t in s)s[t]&&(i&&(i+=" "),i+=t);return i}function H(){for(var s,r,t=0,i="",o=arguments.length;t<o;t++)(s=arguments[t])&&(r=E(s))&&(i&&(i+=" "),i+=r);return i}function J(s){return typeof s=="object"?H(s):s??""}function Q(s,r){r?s.hasAttribute("selected")||s.setAttribute("selected",""):s.removeAttribute("selected")}function U(s,r,t,i){var o=s.__attributes??(s.__attributes={});v&&(o[r]=s.getAttribute(r),r==="src"||r==="srcset"||r==="href"&&s.nodeName==="LINK")||o[r]!==(o[r]=t)&&(r==="style"&&"__styles"in s&&(s.__styles={}),r==="loading"&&(s[F]=t),t==null?s.removeAttribute(r):typeof t!="string"&&T(s).includes(r)?s[r]=t:s.setAttribute(r,t))}function m(s,r,t,i,o=!1,c=!1,W=!1){let p=v&&c;p&&k(!1);var n=r||{},y=s.tagName==="OPTION";for(var h in r)h in t||(t[h]=null);t.class&&(t.class=J(t.class));var $=T(s),w=s.__attributes??(s.__attributes={});for(const f in t){let a=t[f];if(y&&f==="value"&&a==null){s.value=s.__value="",n[f]=a;continue}var g=n[f];if(a!==g){n[f]=a;var A=f[0]+f[1];if(A!=="$$"){if(A==="on"){const e={},_="$$"+f;let u=f.slice(2);var d=K(u);if(P(u)&&(u=u.slice(0,-7),e.capture=!0),!d&&g){if(a!=null)continue;s.removeEventListener(u,n[_],e),n[_]=null}if(a!=null)if(d)s[`__${u}`]=a,D([u]);else{let C=function(L){n[f].call(this,L)};n[_]=S(u,s,C,e)}else d&&(s[`__${u}`]=void 0)}else if(f==="style"&&a!=null)s.style.cssText=a+"";else if(f==="autofocus")Y(s,!!a);else if(!c&&(f==="__value"||f==="value"&&a!=null))s.value=s.__value=a;else if(f==="selected"&&y)Q(s,a);else{var l=f;o||(l=G(l));var b=l==="defaultValue"||l==="defaultChecked";if(a==null&&!c&&!b)if(w[f]=null,l==="value"||l==="checked"){let e=s;const _=r===void 0;if(l==="value"){let u=e.defaultValue;e.removeAttribute(l),e.defaultValue=u,e.value=e.__value=_?u:null}else{let u=e.defaultChecked;e.removeAttribute(l),e.defaultChecked=u,e.checked=_?u:!1}}else s.removeAttribute(f);else b||$.includes(l)&&(c||typeof a!="string")?s[l]=a:typeof a!="function"&&U(s,l,a)}f==="style"&&"__styles"in s&&(s.__styles={})}}}return p&&k(!0),n}var N=new Map;function T(s){var r=N.get(s.nodeName);if(r)return r;N.set(s.nodeName,r=[]);for(var t,i=s,o=Element.prototype;o!==i;){t=M(i);for(var c in t)t[c].set&&r.push(c);i=B(i)}return r}export{x as a,U as b,H as c,J as d,m as s};
