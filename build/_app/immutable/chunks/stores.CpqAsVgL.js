import{w as o}from"./index.BRf4yT8s.js";/*! js-cookie v3.0.5 | MIT */function d(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var a in t)e[a]=t[a]}return e}var O={read:function(e){return e[0]==='"'&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function f(e,r){function t(s,p,n){if(!(typeof document>"u")){n=d({},r,n),typeof n.expires=="number"&&(n.expires=new Date(Date.now()+n.expires*864e5)),n.expires&&(n.expires=n.expires.toUTCString()),s=encodeURIComponent(s).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var i in n)n[i]&&(c+="; "+i,n[i]!==!0&&(c+="="+n[i].split(";")[0]));return document.cookie=s+"="+e.write(p,s)+c}}function a(s){if(!(typeof document>"u"||arguments.length&&!s)){for(var p=document.cookie?document.cookie.split("; "):[],n={},c=0;c<p.length;c++){var i=p[c].split("="),u=i.slice(1).join("=");try{var _=decodeURIComponent(i[0]);if(n[_]=e.read(u,_),s===_)break}catch{}}return s?n[s]:n}}return Object.create({set:t,get:a,remove:function(s,p){t(s,"",d({},p,{expires:-1}))},withAttributes:function(s){return f(this.converter,d({},this.attributes,s))},withConverter:function(s){return f(d({},this.converter,s),this.attributes)}},{attributes:{value:Object.freeze(r)},converter:{value:Object.freeze(e)}})}var g=f(O,{path:"/"}),T=(e=>(e[e.HEALTHY=0]="HEALTHY",e[e.WARN=1]="WARN",e[e.TELEOP_ONLY=2]="TELEOP_ONLY",e[e.OUT_OF_SERVICE=3]="OUT_OF_SERVICE",e))(T||{}),v=(e=>(e[e.TELEOP=0]="TELEOP",e[e.ASSISTED=1]="ASSISTED",e[e.AUTO=2]="AUTO",e[e.STOPPED=3]="STOPPED",e))(v||{}),m=(e=>(e[e.DISCONNECTED=0]="DISCONNECTED",e[e.CONNECTED=1]="CONNECTED",e[e.ERROR=2]="ERROR",e))(m||{}),C=(e=>(e[e.PAUSED=0]="PAUSED",e[e.DRIVING=1]="DRIVING",e[e.PLANTING=2]="PLANTING",e))(C||{});const A=o(void 0),h=o(0),N=o(0),U=o(3),P=o(3),k=o("Out of Service"),x=o(0),b=o(0),j=o(0),w=o(0),F=o(),G=o(void 0),H=o(void 0),y=o(-1),V=o(!0),Y=o([]),z=o(void 0),L=o(void 0),W=o(!1),q=o(-1),$=o(-1),B=o(-1),J=o(-1),K=o([]),Q=o(!1),X=o(),Z=o();let l=g.get("rosbridge/port");g.get("rosbridge/ip");console.log(`Cookie port is ${l}`);l==null&&(l="9090");const M=o(g.get("rosbridge/ip")),S=o(g.get("rosbridge/port")),E=o([]),ee=e=>{const r=Math.floor(Math.random()*1e4),t={id:r,type:"info",dismissible:!0,timeout:3e3};E.update(a=>[{...t,...e},...a]),e.timeout&&setTimeout(()=>D(r),e.timeout)},D=e=>{E.update(r=>r.filter(t=>t.id!==e))};export{k as A,C as B,m as C,B as D,Y as E,y as F,V as G,E as H,D as I,v as M,T as S,$ as a,J as b,S as c,g as d,q as e,ee as f,H as g,X as h,N as i,w as j,x as k,b as l,F as m,j as n,z as o,Z as p,G as q,M as r,Q as s,L as t,h as u,U as v,K as w,P as x,W as y,A as z};