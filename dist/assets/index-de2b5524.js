import{r as i,C as y,bc as p,bd as O,be as w,bf as j,c as F,bg as I,bh as v,bi as E,bj as a,bk as M,bl as $,bm as N,bn as _,bo as m,bp as S,bq as W}from"./index-048001ff.js";var A=globalThis&&globalThis.__rest||function(e,o){var s={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(s[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)o.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(s[t[n]]=e[t[n]]);return s};const T=e=>{const{prefixCls:o,className:s,closeIcon:t,closable:n,type:c,title:h,children:u}=e,P=A(e,["prefixCls","className","closeIcon","closable","type","title","children"]),{getPrefixCls:d}=i.useContext(y),g=d(),l=o||d("modal"),[,x]=p(l),f=`${l}-confirm`;let b={};return c?b={closable:n??!1,title:"",footer:"",children:i.createElement(O,Object.assign({},e,{confirmPrefixCls:f,rootPrefixCls:g,content:u}))}:b={closable:n??!0,title:h,footer:e.footer===void 0?i.createElement(w,Object.assign({},e)):e.footer,children:u},i.createElement(j,Object.assign({prefixCls:l,className:F(x,`${l}-pure-panel`,c&&f,c&&`${f}-${c}`,s)},P,{closeIcon:I(l,t),closable:n},b))},k=T;function C(e){return a(W(e))}const r=v;r.useModal=E;r.info=function(o){return a(M(o))};r.success=function(o){return a($(o))};r.error=function(o){return a(N(o))};r.warning=C;r.warn=C;r.confirm=function(o){return a(_(o))};r.destroyAll=function(){for(;m.length;){const o=m.pop();o&&o()}};r.config=S;r._InternalPanelDoNotUseOrYouWillBeFired=k;const z=r;export{z as M};
