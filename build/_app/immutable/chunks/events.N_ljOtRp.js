import{w as p}from"./create.COEjqSst.js";import{m as l}from"./scheduler.BVUDL6Zt.js";const v=(o,t)=>{const e=p(o),n=(r,s)=>{e.update(u=>{const i=r(u);let a=i;return t&&(a=t({curr:u,next:i})),s==null||s(a),a})};return{...e,update:n,set:r=>{n(()=>r)}}};function d(){const o=l();return t=>{const{originalEvent:e}=t.detail,{cancelable:n}=t,c=e.type;o(c,{originalEvent:e,currentTarget:e.currentTarget},{cancelable:n})||t.preventDefault()}}export{d as c,v as o};