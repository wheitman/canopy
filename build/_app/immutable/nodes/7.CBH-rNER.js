import{d as ue}from"../chunks/index.R8ovVqwX.js";import{s as ce,e as _,a as z,u as de,c as h,f as m,g as I,b as j,v as X,l as $,h as i,i as L,o as me,x as pe,n as Z,t as U,d as J,j as $e,A as ge,B as _e,C as le,w as he,q as re}from"../chunks/scheduler.Dej_xGUE.js";import{S as be,i as ve,b as B,d as F,m as N,t as M,c as se,a as S,e as W,g as oe}from"../chunks/index.LdiSmlfv.js";import{e as ae}from"../chunks/each.B2cF57UP.js";import"../chunks/stores.C8XAdwxS.js";import"../chunks/create.BEvfffAz.js";import{B as ee}from"../chunks/button.BT2kAfTT.js";import{I as G}from"../chunks/Icon.ANQqU6E4.js";import{F as xe}from"../chunks/forest_generator.BcUdxKiQ.js";import{b as ke}from"../chunks/paths.i9bIx48T.js";/* empty css                                                         */import{O as we}from"../chunks/OsmMap.B10l6omv.js";const ye=ue,Ce=!0,Qe=Object.freeze(Object.defineProperty({__proto__:null,csr:ye,prerender:Ce},Symbol.toStringTag,{value:"Module"}));function ie(s,e,r){const n=s.slice();return n[12]=e[r],n[14]=r,n}function Ee(s){let e,r,n,t,f="What would you like to plant?",b;return r=new G({props:{id:"counter_1",size:"1.5rem",color:"",fill:"0"}}),{c(){e=_("div"),B(r.$$.fragment),n=z(),t=_("p"),t.textContent=f,this.h()},l(a){e=h(a,"DIV",{class:!0});var l=j(e);F(r.$$.fragment,l),n=I(l),t=h(l,"P",{class:!0,"data-svelte-h":!0}),X(t)!=="svelte-1ltw3ca"&&(t.textContent=f),l.forEach(m),this.h()},h(){$(t,"class","text-xl pl-2"),$(e,"class","flex")},m(a,l){L(a,e,l),N(r,e,null),i(e,n),i(e,t),b=!0},p:Z,i(a){b||(S(r.$$.fragment,a),b=!0)},o(a){M(r.$$.fragment,a),b=!1},d(a){a&&m(e),W(r)}}}function Pe(s){let e,r,n,t,f,b="What would you like to plant?",a,l,v=`Here are good options for <strong>Pittsburgh, PA</strong>. Check
				the boxes next to the seedlings you&#39;d like to include.`,x,d,O,u,k,V,P,C,w,D;n=new G({props:{id:"counter_1",size:"1.5rem",color:"",fill:"1"}});let T=ae(s[4]),c=[];for(let o=0;o<T.length;o+=1)c[o]=fe(ie(s,T,o));return w=new ee({props:{class:"py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-forest-600 text-white hover:bg-forest-700 focus:outline-none focus:ring-2 ring-forest-700 ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",$$slots:{default:[ze]},$$scope:{ctx:s}}}),w.$on("click",s[5]),{c(){e=_("div"),r=_("div"),B(n.$$.fragment),t=z(),f=_("p"),f.textContent=b,a=z(),l=_("p"),l.innerHTML=v,x=z(),d=_("div");for(let o=0;o<c.length;o+=1)c[o].c();O=z(),u=_("div"),k=_("p"),V=U(s[3]),P=U(" seedlings selected."),C=z(),B(w.$$.fragment),this.h()},l(o){e=h(o,"DIV",{});var g=j(e);r=h(g,"DIV",{class:!0});var p=j(r);F(n.$$.fragment,p),t=I(p),f=h(p,"P",{class:!0,"data-svelte-h":!0}),X(f)!=="svelte-1l8ikba"&&(f.textContent=b),p.forEach(m),a=I(g),l=h(g,"P",{class:!0,"data-svelte-h":!0}),X(l)!=="svelte-fy3jxi"&&(l.innerHTML=v),x=I(g),d=h(g,"DIV",{class:!0});var E=j(d);for(let Y=0;Y<c.length;Y+=1)c[Y].l(E);E.forEach(m),O=I(g),u=h(g,"DIV",{class:!0});var q=j(u);k=h(q,"P",{});var K=j(k);V=J(K,s[3]),P=J(K," seedlings selected."),K.forEach(m),C=I(q),F(w.$$.fragment,q),q.forEach(m),g.forEach(m),this.h()},h(){$(f,"class","text-xl pl-2 font-medium"),$(r,"class","flex"),$(l,"class","text-md"),$(d,"class","flex flex-row flex-wrap"),$(u,"class","flex flex-row justify-between mt-4")},m(o,g){L(o,e,g),i(e,r),N(n,r,null),i(r,t),i(r,f),i(e,a),i(e,l),i(e,x),i(e,d);for(let p=0;p<c.length;p+=1)c[p]&&c[p].m(d,null);i(e,O),i(e,u),i(u,k),i(k,V),i(k,P),i(u,C),N(w,u,null),D=!0},p(o,g){if(g&84){T=ae(o[4]);let E;for(E=0;E<T.length;E+=1){const q=ie(o,T,E);c[E]?c[E].p(q,g):(c[E]=fe(q),c[E].c(),c[E].m(d,null))}for(;E<c.length;E+=1)c[E].d(1);c.length=T.length}(!D||g&8)&&$e(V,o[3]);const p={};g&32768&&(p.$$scope={dirty:g,ctx:o}),w.$set(p)},i(o){D||(S(n.$$.fragment,o),S(w.$$.fragment,o),D=!0)},o(o){M(n.$$.fragment,o),M(w.$$.fragment,o),D=!1},d(o){o&&m(e),W(n),ge(c,o),W(w)}}}function fe(s){let e,r,n,t,f,b=s[12].common_name+"",a,l,v,x=s[12].scientific_name+"",d,O,u,k;function V(){return s[7](s[12],s[14])}return{c(){e=_("button"),r=_("img"),t=z(),f=_("p"),a=U(b),l=z(),v=_("p"),d=U(x),O=z(),this.h()},l(P){e=h(P,"BUTTON",{class:!0});var C=j(e);r=h(C,"IMG",{src:!0,alt:!0,class:!0}),t=I(C),f=h(C,"P",{class:!0});var w=j(f);a=J(w,b),w.forEach(m),l=I(C),v=h(C,"P",{class:!0});var D=j(v);d=J(D,x),D.forEach(m),O=I(C),C.forEach(m),this.h()},h(){_e(r.src,n=ke+"/res/leaves/"+s[12].icon+".svg")||$(r,"src",n),$(r,"alt",""),$(r,"class","w-12 h-12"),$(f,"class","text-sm text-center font-medium"),$(v,"class","text-xs text-center italic"),$(e,"class","flex flex-col border rounded-lg m-2 size-32 items-center justify-center transition-all"),le(e,"bg-lime-200",s[2][s[14]])},m(P,C){L(P,e,C),i(e,r),i(e,t),i(e,f),i(f,a),i(e,l),i(e,v),i(v,d),i(e,O),u||(k=he(e,"click",V),u=!0)},p(P,C){s=P,C&4&&le(e,"bg-lime-200",s[2][s[14]])},d(P){P&&m(e),u=!1,k()}}}function ze(s){let e;return{c(){e=U("Next")},l(r){e=J(r,"Next")},m(r,n){L(r,e,n)},d(r){r&&m(e)}}}function Ie(s){let e,r,n,t,f="Where would you like to plant?",b;return r=new G({props:{id:"counter_2",size:"1.5rem",color:"",fill:"0"}}),{c(){e=_("div"),B(r.$$.fragment),n=z(),t=_("p"),t.textContent=f,this.h()},l(a){e=h(a,"DIV",{class:!0});var l=j(e);F(r.$$.fragment,l),n=I(l),t=h(l,"P",{class:!0,"data-svelte-h":!0}),X(t)!=="svelte-gn22bp"&&(t.textContent=f),l.forEach(m),this.h()},h(){$(t,"class","text-xl pl-2"),$(e,"class","flex")},m(a,l){L(a,e,l),N(r,e,null),i(e,n),i(e,t),b=!0},p:Z,i(a){b||(S(r.$$.fragment,a),b=!0)},o(a){M(r.$$.fragment,a),b=!1},d(a){a&&m(e),W(r)}}}function De(s){let e,r,n,t,f,b="Where would you like to plant?",a,l,v,x,d,O,u,k,V,P,C,w,D;n=new G({props:{id:"counter_2",size:"1.5rem",color:"",fill:"1"}}),v=new ee({props:{class:"py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-slate-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",$$slots:{default:[Ve]},$$scope:{ctx:s}}}),v.$on("click",function(){re(s[1].startDraw)&&s[1].startDraw.apply(this,arguments)}),d=new ee({props:{class:"py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-slate-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",$$slots:{default:[Me]},$$scope:{ctx:s}}}),d.$on("click",function(){re(s[1].startErase)&&s[1].startErase.apply(this,arguments)}),u=new ee({props:{class:"py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-slate-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",$$slots:{default:[Se]},$$scope:{ctx:s}}}),u.$on("click",function(){re(s[1].startPan)&&s[1].startPan.apply(this,arguments)}),V=new ee({props:{class:"py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-slate-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",$$slots:{default:[qe]},$$scope:{ctx:s}}}),V.$on("click",function(){re(s[1].clear)&&s[1].clear.apply(this,arguments)});let T={};return w=new we({props:T}),s[8](w),{c(){e=_("div"),r=_("div"),B(n.$$.fragment),t=z(),f=_("p"),f.textContent=b,a=z(),l=_("div"),B(v.$$.fragment),x=z(),B(d.$$.fragment),O=z(),B(u.$$.fragment),k=z(),B(V.$$.fragment),P=z(),C=_("div"),B(w.$$.fragment),this.h()},l(c){e=h(c,"DIV",{class:!0});var o=j(e);r=h(o,"DIV",{class:!0});var g=j(r);F(n.$$.fragment,g),t=I(g),f=h(g,"P",{class:!0,"data-svelte-h":!0}),X(f)!=="svelte-1q7f4n1"&&(f.textContent=b),g.forEach(m),a=I(o),l=h(o,"DIV",{class:!0});var p=j(l);F(v.$$.fragment,p),x=I(p),F(d.$$.fragment,p),O=I(p),F(u.$$.fragment,p),k=I(p),F(V.$$.fragment,p),p.forEach(m),P=I(o),C=h(o,"DIV",{class:!0});var E=j(C);F(w.$$.fragment,E),E.forEach(m),o.forEach(m),this.h()},h(){$(f,"class","text-xl pl-2 font-medium"),$(r,"class","flex"),$(l,"class","inline-flex rounded-lg shadow-sm m-4"),$(C,"class","w-full h-96 relative"),$(e,"class","overflow-y-auto")},m(c,o){L(c,e,o),i(e,r),N(n,r,null),i(r,t),i(r,f),i(e,a),i(e,l),N(v,l,null),i(l,x),N(d,l,null),i(l,O),N(u,l,null),i(l,k),N(V,l,null),i(e,P),i(e,C),N(w,C,null),D=!0},p(c,o){s=c;const g={};o&32768&&(g.$$scope={dirty:o,ctx:s}),v.$set(g);const p={};o&32768&&(p.$$scope={dirty:o,ctx:s}),d.$set(p);const E={};o&32768&&(E.$$scope={dirty:o,ctx:s}),u.$set(E);const q={};o&32768&&(q.$$scope={dirty:o,ctx:s}),V.$set(q);const K={};w.$set(K)},i(c){D||(S(n.$$.fragment,c),S(v.$$.fragment,c),S(d.$$.fragment,c),S(u.$$.fragment,c),S(V.$$.fragment,c),S(w.$$.fragment,c),D=!0)},o(c){M(n.$$.fragment,c),M(v.$$.fragment,c),M(d.$$.fragment,c),M(u.$$.fragment,c),M(V.$$.fragment,c),M(w.$$.fragment,c),D=!1},d(c){c&&m(e),W(n),W(v),W(d),W(u),W(V),s[8](null),W(w)}}}function Ve(s){let e,r,n;return e=new G({props:{id:"brush",size:"1.25rem",color:"",fill:"0"}}),{c(){B(e.$$.fragment),r=U(`
					Paint Forest`)},l(t){F(e.$$.fragment,t),r=J(t,`
					Paint Forest`)},m(t,f){N(e,t,f),L(t,r,f),n=!0},p:Z,i(t){n||(S(e.$$.fragment,t),n=!0)},o(t){M(e.$$.fragment,t),n=!1},d(t){t&&m(r),W(e,t)}}}function Me(s){let e,r,n;return e=new G({props:{id:"ink_eraser",size:"1.25rem",color:"",fill:"0"}}),{c(){B(e.$$.fragment),r=U(`
					Erase`)},l(t){F(e.$$.fragment,t),r=J(t,`
					Erase`)},m(t,f){N(e,t,f),L(t,r,f),n=!0},p:Z,i(t){n||(S(e.$$.fragment,t),n=!0)},o(t){M(e.$$.fragment,t),n=!1},d(t){t&&m(r),W(e,t)}}}function Se(s){let e,r,n;return e=new G({props:{id:"pan_tool",size:"1.25rem",color:"",fill:"0"}}),{c(){B(e.$$.fragment),r=U(`

					Move`)},l(t){F(e.$$.fragment,t),r=J(t,`

					Move`)},m(t,f){N(e,t,f),L(t,r,f),n=!0},p:Z,i(t){n||(S(e.$$.fragment,t),n=!0)},o(t){M(e.$$.fragment,t),n=!1},d(t){t&&m(r),W(e,t)}}}function qe(s){let e,r,n;return e=new G({props:{id:"delete",size:"1.25rem",color:"",fill:"0"}}),{c(){B(e.$$.fragment),r=U(`

					Clear`)},l(t){F(e.$$.fragment,t),r=J(t,`

					Clear`)},m(t,f){N(e,t,f),L(t,r,f),n=!0},p:Z,i(t){n||(S(e.$$.fragment,t),n=!0)},o(t){M(e.$$.fragment,t),n=!1},d(t){t&&m(r),W(e,t)}}}function Oe(s){let e,r,n,t,f="Let's plan your forest.",b,a,l,v,x,d,O,u,k,V,P,C="Name and save your plan.",w,D,T,c,o,g="Send to Steward.",p;const E=[Pe,Ee],q=[];function K(y,H){return y[0]==1?0:1}a=K(s),l=q[a]=E[a](s);const Y=[De,Ie],Q=[];function ne(y,H){return y[0]==2?0:1}return x=ne(s),d=Q[x]=Y[x](s),k=new G({props:{id:"counter_3",size:"1.5rem",color:"",fill:"0"}}),T=new G({props:{id:"counter_4",size:"1.5rem",color:"",fill:"0"}}),{c(){e=_("meta"),r=z(),n=_("div"),t=_("p"),t.textContent=f,b=z(),l.c(),v=z(),d.c(),O=z(),u=_("div"),B(k.$$.fragment),V=z(),P=_("p"),P.textContent=C,w=z(),D=_("div"),B(T.$$.fragment),c=z(),o=_("p"),o.textContent=g,this.h()},l(y){const H=de("svelte-1fo5sqm",document.head);e=h(H,"META",{name:!0,content:!0}),H.forEach(m),r=I(y),n=h(y,"DIV",{class:!0});var A=j(n);t=h(A,"P",{class:!0,"data-svelte-h":!0}),X(t)!=="svelte-q65lqq"&&(t.textContent=f),b=I(A),l.l(A),v=I(A),d.l(A),O=I(A),u=h(A,"DIV",{class:!0});var R=j(u);F(k.$$.fragment,R),V=I(R),P=h(R,"P",{class:!0,"data-svelte-h":!0}),X(P)!=="svelte-uexpm5"&&(P.textContent=C),R.forEach(m),w=I(A),D=h(A,"DIV",{class:!0});var te=j(D);F(T.$$.fragment,te),c=I(te),o=h(te,"P",{class:!0,"data-svelte-h":!0}),X(o)!=="svelte-4a1kl3"&&(o.textContent=g),te.forEach(m),A.forEach(m),this.h()},h(){document.title="Steward | Canopy",$(e,"name","description"),$(e,"content","Control and observe the robot"),$(t,"class","text-4xl my-4"),$(P,"class","text-xl pl-2"),$(u,"class","flex"),$(o,"class","text-xl pl-2"),$(D,"class","flex"),$(n,"class","flex flex-col h-full w-full max-w-2xl mx-auto p-8")},m(y,H){i(document.head,e),L(y,r,H),L(y,n,H),i(n,t),i(n,b),q[a].m(n,null),i(n,v),Q[x].m(n,null),i(n,O),i(n,u),N(k,u,null),i(u,V),i(u,P),i(n,w),i(n,D),N(T,D,null),i(D,c),i(D,o),p=!0},p(y,[H]){let A=a;a=K(y),a===A?q[a].p(y,H):(oe(),M(q[A],1,1,()=>{q[A]=null}),se(),l=q[a],l?l.p(y,H):(l=q[a]=E[a](y),l.c()),S(l,1),l.m(n,v));let R=x;x=ne(y),x===R?Q[x].p(y,H):(oe(),M(Q[R],1,1,()=>{Q[R]=null}),se(),d=Q[x],d?d.p(y,H):(d=Q[x]=Y[x](y),d.c()),S(d,1),d.m(n,O))},i(y){p||(S(l),S(d),S(k.$$.fragment,y),S(T.$$.fragment,y),p=!0)},o(y){M(l),M(d),M(k.$$.fragment,y),M(T.$$.fragment,y),p=!1},d(y){y&&(m(r),m(n)),m(e),q[a].d(),Q[x].d(),W(k),W(T)}}}function je(s,e,r){let t=new xe().getSpeciesOptions(),f=2,b,a=[],l=0;t.forEach(u=>{a.push(u.included),u.included&&r(3,l++,l)}),me(()=>{});function v(){r(0,f=2)}function x(u,k){u.included=!u.included,r(2,a[k]=!a[k],a),u.included?r(3,l++,l):r(3,l--,l)}const d=(u,k)=>{x(u,k)};function O(u){pe[u?"unshift":"push"](()=>{b=u,r(1,b)})}return[f,b,a,l,t,v,x,d,O]}class Re extends be{constructor(e){super(),ve(this,e,je,Oe,ce,{})}}export{Re as component,Qe as universal};