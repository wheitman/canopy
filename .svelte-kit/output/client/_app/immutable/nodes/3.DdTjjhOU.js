import{H as Se}from"../chunks/CYgJF_JY.js";import{b as De,a as O,n as Oe,c as ue,t as U}from"../chunks/3m_CeLIw.js";import{aa as ce,i as de,j as ve,aC as _e,k,q as H,T as z,g as P,am as Re,an as re,p as M,v as I,ao as Y,R as $,V as he,aD as W,ah as pe,M as F,aE as J,aF as se,aG as K,aH as He,ag as Le,aI as Pe,ay as ge,w as me,a5 as ye,P as ze,ad as Be,aJ as Ve,m as We,J as ne,aK as qe,o as Fe,Q as Ge,aL as be,O as Ue,aM as Ye,aN as $e,B as we,C as L,D as Ee,E as T,av as D,F as x,at as j,$ as Je,x as Ke}from"../chunks/CYSPZ53m.js";import{i as je,b as ie,c as Qe,d as Xe,e as Ze,n as et,f as tt,s as q}from"../chunks/gHPKqF04.js";import{l as G,p as S,s as at,c as rt}from"../chunks/DNJi9Vtm.js";import{h as st}from"../chunks/Sqr5yqkx.js";import"../chunks/BMq0MMVl.js";import{i as nt}from"../chunks/DslBe-Fq.js";function it(t,e){if(e){const a=document.body;t.autofocus=!0,ce(()=>{document.activeElement===a&&t.focus()})}}function ke(t,e){return e}function ot(t,e,a,r){for(var o=[],l=e.length,f=0;f<l;f++)He(e[f].e,o,!0);var h=l>0&&o.length===0&&a!==null;if(h){var m=a.parentNode;Le(m),m.append(a),r.clear(),C(t,e[0].prev,e[l-1].next)}Pe(o,()=>{for(var p=0;p<l;p++){var g=e[p];h||(r.delete(g.k),C(t,g.prev,g.next)),ge(g.e,!h)}})}function Ae(t,e,a,r,o,l=null){var f=t,h={flags:e,items:new Map,first:null},m=(e&_e)!==0;if(m){var p=t;f=k?H(me(p)):p.appendChild(de())}k&&z();var g=null,b=!1,i=ye(()=>{var u=a();return ze(u)?u:u==null?[]:pe(u)});ve(()=>{var u=P(i),s=u.length;if(b&&s===0)return;b=s===0;let y=!1;if(k){var c=f.data===Re;c!==(s===0)&&(f=re(),H(f),M(!1),y=!0)}if(k){for(var w=null,_,d=0;d<s;d++){if(I.nodeType===8&&I.data===Be){f=I,y=!0,M(!1);break}var n=u[d],v=r(n,d);_=Ne(I,h,w,null,n,v,d,o,e,a),h.items.set(v,_),w=_}s>0&&H(re())}k||lt(u,h,f,o,e,r,a),l!==null&&(s===0?g?Y(g):g=$(()=>l(f)):g!==null&&he(g,()=>{g=null})),y&&M(!0),P(i)}),k&&(f=I)}function lt(t,e,a,r,o,l,f){var X,Z,ee,te;var h=(o&Ve)!==0,m=(o&(J|K))!==0,p=t.length,g=e.items,b=e.first,i=b,u,s=null,y,c=[],w=[],_,d,n,v;if(h)for(v=0;v<p;v+=1)_=t[v],d=l(_,v),n=g.get(d),n!==void 0&&((X=n.a)==null||X.measure(),(y??(y=new Set)).add(n));for(v=0;v<p;v+=1){if(_=t[v],d=l(_,v),n=g.get(d),n===void 0){var E=i?i.e.nodes_start:a;s=Ne(E,e,s,s===null?e.first:s.next,_,d,v,r,o,f),g.set(d,s),c=[],w=[],i=s.next;continue}if(m&&ft(n,_,v,o),n.e.f&W&&(Y(n.e),h&&((Z=n.a)==null||Z.unfix(),(y??(y=new Set)).delete(n))),n!==i){if(u!==void 0&&u.has(n)){if(c.length<w.length){var N=w[0],A;s=N.prev;var Q=c[0],B=c[c.length-1];for(A=0;A<c.length;A+=1)oe(c[A],N,a);for(A=0;A<w.length;A+=1)u.delete(w[A]);C(e,Q.prev,B.next),C(e,s,Q),C(e,B,N),i=N,s=B,v-=1,c=[],w=[]}else u.delete(n),oe(n,i,a),C(e,n.prev,n.next),C(e,n,s===null?e.first:s.next),C(e,s,n),s=n;continue}for(c=[],w=[];i!==null&&i.k!==d;)i.e.f&W||(u??(u=new Set)).add(i),w.push(i),i=i.next;if(i===null)continue;n=i}c.push(n),s=n,i=n.next}if(i!==null||u!==void 0){for(var R=u===void 0?[]:pe(u);i!==null;)i.e.f&W||R.push(i),i=i.next;var V=R.length;if(V>0){var Me=o&_e&&p===0?a:null;if(h){for(v=0;v<V;v+=1)(ee=R[v].a)==null||ee.measure();for(v=0;v<V;v+=1)(te=R[v].a)==null||te.fix()}ot(e,R,Me,g)}}h&&ce(()=>{var ae;if(y!==void 0)for(n of y)(ae=n.a)==null||ae.apply()}),F.first=e.first&&e.first.e,F.last=s&&s.e}function ft(t,e,a,r){r&J&&se(t.v,e),r&K?se(t.i,a):t.i=a}function Ne(t,e,a,r,o,l,f,h,m,p){var g=(m&J)!==0,b=(m&qe)===0,i=g?b?We(o):ne(o):o,u=m&K?ne(f):f,s={i:u,v:i,k:l,a:null,e:null,prev:a,next:r};try{return s.e=$(()=>h(t,i,u,p),k),s.e.prev=a&&a.e,s.e.next=r&&r.e,a===null?e.first=s:(a.next=s,a.e.next=s.e),r!==null&&(r.prev=s,r.e.prev=s.e),s}finally{}}function oe(t,e,a){for(var r=t.next?t.next.e.nodes_start:a,o=e?e.e.nodes_start:a,l=t.e.nodes_start;l!==r;){var f=Fe(l);o.before(l),l=f}}function C(t,e,a){e===null?t.first=a:(e.next=a,e.e.next=a&&a.e),a!==null&&(a.prev=e,a.e.prev=e&&e.e)}function xe(t,e,a,r,o){var h;k&&z();var l=(h=e.$$slots)==null?void 0:h[a],f=!1;l===!0&&(l=e.children,f=!0),l===void 0||l(t,f?()=>r:r)}function ut(t,e,a,r,o,l){let f=k;k&&z();var h,m,p=null;k&&I.nodeType===1&&(p=I,z());var g=k?I:t,b;ve(()=>{const i=e()||null;var u=be;i!==h&&(b&&(i===null?he(b,()=>{b=null,m=null}):i===m?Y(b):(ge(b),ie(!1))),i&&i!==m&&(b=$(()=>{if(p=k?p:document.createElementNS(u,i),De(p,p),r){k&&je(i)&&p.append(document.createComment(""));var s=k?me(p):p.appendChild(de());k&&(s===null?M(!1):H(s)),r(p,s)}F.nodes_end=p,g.before(p)})),h=i,h&&(m=h),ie(!0))},Ge),f&&(M(!0),H(g))}function Te(t){var e,a,r="";if(typeof t=="string"||typeof t=="number")r+=t;else if(typeof t=="object")if(Array.isArray(t)){var o=t.length;for(e=0;e<o;e++)t[e]&&(a=Te(t[e]))&&(r&&(r+=" "),r+=a)}else for(a in t)t[a]&&(r&&(r+=" "),r+=a);return r}function ct(){for(var t,e,a=0,r="",o=arguments.length;a<o;a++)(t=arguments[a])&&(e=Te(t))&&(r&&(r+=" "),r+=e);return r}function dt(t){return typeof t=="object"?ct(t):t??""}function vt(t,e){e?t.hasAttribute("selected")||t.setAttribute("selected",""):t.removeAttribute("selected")}function Ce(t,e,a,r){var o=t.__attributes??(t.__attributes={});k&&(o[e]=t.getAttribute(e),e==="src"||e==="srcset"||e==="href"&&t.nodeName==="LINK")||o[e]!==(o[e]=a)&&(e==="style"&&"__styles"in t&&(t.__styles={}),e==="loading"&&(t[Ye]=a),a==null?t.removeAttribute(e):typeof a!="string"&&Ie(t).includes(e)?t[e]=a:t.setAttribute(e,a))}function le(t,e,a,r,o=!1,l=!1,f=!1){let h=k&&l;h&&M(!1);var m=e||{},p=t.tagName==="OPTION";for(var g in e)g in a||(a[g]=null);a.class&&(a.class=dt(a.class));var b=Ie(t),i=t.__attributes??(t.__attributes={});for(const _ in a){let d=a[_];if(p&&_==="value"&&d==null){t.value=t.__value="",m[_]=d;continue}var u=m[_];if(d!==u){m[_]=d;var s=_[0]+_[1];if(s!=="$$"){if(s==="on"){const n={},v="$$"+_;let E=_.slice(2);var y=tt(E);if(Qe(E)&&(E=E.slice(0,-7),n.capture=!0),!y&&u){if(d!=null)continue;t.removeEventListener(E,m[v],n),m[v]=null}if(d!=null)if(y)t[`__${E}`]=d,Ze([E]);else{let N=function(A){m[_].call(this,A)};m[v]=Xe(E,t,N,n)}else y&&(t[`__${E}`]=void 0)}else if(_==="style"&&d!=null)t.style.cssText=d+"";else if(_==="autofocus")it(t,!!d);else if(!l&&(_==="__value"||_==="value"&&d!=null))t.value=t.__value=d;else if(_==="selected"&&p)vt(t,d);else{var c=_;o||(c=et(c));var w=c==="defaultValue"||c==="defaultChecked";if(d==null&&!l&&!w)if(i[_]=null,c==="value"||c==="checked"){let n=t;const v=e===void 0;if(c==="value"){let E=n.defaultValue;n.removeAttribute(c),n.defaultValue=E,n.value=n.__value=v?E:null}else{let E=n.defaultChecked;n.removeAttribute(c),n.defaultChecked=E,n.checked=v?E:!1}}else t.removeAttribute(_);else w||b.includes(c)&&(l||typeof d!="string")?t[c]=d:typeof d!="function"&&Ce(t,c,d)}_==="style"&&"__styles"in t&&(t.__styles={})}}}return h&&M(!0),m}var fe=new Map;function Ie(t){var e=fe.get(t.nodeName);if(e)return e;fe.set(t.nodeName,e=[]);for(var a,r=t,o=Element.prototype;o!==r;){a=$e(r);for(var l in a)a[l].set&&e.push(l);r=Ue(r)}return e}function _t(t,e="medium",a="en"){const r=new Intl.DateTimeFormat(a,{dateStyle:e});try{return r.format(new Date(t))}catch{return t}}/**
 * @license lucide-svelte v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ht={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var pt=Oe("<svg><!><!></svg>");function gt(t,e){const a=G(e,["children","$$slots","$$events","$$legacy"]),r=G(a,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);we(e,!1);let o=S(e,"name",8,void 0),l=S(e,"color",8,"currentColor"),f=S(e,"size",8,24),h=S(e,"strokeWidth",8,2),m=S(e,"absoluteStrokeWidth",8,!1),p=S(e,"iconNode",24,()=>[]);const g=(...y)=>y.filter((c,w,_)=>!!c&&_.indexOf(c)===w).join(" ");nt();var b=pt();let i;var u=T(b);Ae(u,1,p,ke,(y,c)=>{let w=()=>P(c)[0],_=()=>P(c)[1];var d=ue(),n=j(d);ut(n,w,!0,(v,E)=>{let N;L(()=>N=le(v,N,{..._()},void 0,v.namespaceURI===be,v.nodeName.includes("-")))}),O(y,d)});var s=D(u);xe(s,e,"default",{}),x(b),L((y,c)=>i=le(b,i,{...ht,...r,width:f(),height:f(),stroke:l(),"stroke-width":y,class:c},void 0,!0),[()=>m()?Number(h())*24/Number(f()):h(),()=>g("lucide-icon","lucide",o()?`lucide-${o()}`:"",a.class)],ye),O(t,b),Ee()}function mt(t,e){const a=G(e,["children","$$slots","$$events","$$legacy"]);gt(t,at({name:"move-left"},()=>a,{iconNode:[["path",{d:"M6 8L2 12L6 16"}],["path",{d:"M2 12H22"}]],children:(o,l)=>{var f=ue(),h=j(f);xe(h,e,"default",{}),O(o,f)},$$slots:{default:!0}}))}const yt=(t,e,a)=>{const r=t[e];return r?typeof r=="function"?r():Promise.resolve(r):new Promise((o,l)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(l.bind(null,new Error("Unknown variable dynamic import: "+e+(e.split("/").length!==a?". Note that variables only represent file names one level deep.":""))))})};function bt(t,e){throw new Se(t,e)}new TextEncoder;async function wt({params:t}){try{const e=await yt(Object.assign({}),`../../posts/${t.slug}.md`,4);return{content:e.default,meta:e.metadata}}catch{bt(404,`Could not find ${t.slug}`)}}const Ot=Object.freeze(Object.defineProperty({__proto__:null,load:wt},Symbol.toStringTag,{value:"Module"}));var Et=U('<meta property="og:type" content="article"> <meta property="og:title">',1),kt=U('<span class="surface-4"> </span>'),At=U('<article class="flex flex-col max-w-[36rem] px-2 mx-auto"><a href="/" class="flex flex-row gap-2 py-6 items-center"><!> Back home</a> <hgroup><h1> </h1> <p class="text-sm"> </p></hgroup> <div class="tags"></div> <div class="prose"><!></div></article>');function Rt(t,e){we(e,!0);var a=At();st(u=>{var s=Et(),y=D(j(s),2);L(()=>{Je.title=e.data.meta.title,Ce(y,"content",e.data.meta.title)}),O(u,s)});var r=T(a),o=T(r);mt(o,{strokeWidth:"1"}),Ke(),x(r);var l=D(r,2),f=T(l),h=T(f,!0);x(f);var m=D(f,2),p=T(m,!0);x(m),x(l);var g=D(l,2);Ae(g,21,()=>e.data.meta.categories,ke,(u,s)=>{var y=kt(),c=T(y);x(y),L(()=>q(c,`#${P(s)??""}`)),O(u,y)}),x(g);var b=D(g,2),i=T(b);rt(i,()=>e.data.content,(u,s)=>{s(u,{})}),x(b),x(a),L(u=>{q(h,e.data.meta.title),q(p,u)},[()=>_t(e.data.meta.date)]),O(t,a),Ee()}export{Rt as component,Ot as universal};
