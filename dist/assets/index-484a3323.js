import{r as l,aG as _t,i as ae,_ as le,al as Ve,q as ht,aH as Mt,n as pt,l as $,A as Ue,I as Kt,a4 as ct,p as Vt,g as $t,m as mt,aI as Ot,C as At,aw as Ht,c as ut,ax as Rt,o as Wt,u as Ft,a3 as jt,ay as Bt,aJ as st,aK as zt,aE as Ut}from"./index-d892e1b7.js";import{u as Gt,a as Jt,B as Xt,b as Yt,g as qt,D as Qt,c as Zt,d as er}from"./index-acb04f43.js";import{b as tr,c as rr,d as Xe,g as nr,e as ar,S as lr}from"./Table-bfb1101b.js";var gt=l.createContext(null),Ct=l.createContext(null);function or(e){return Array.isArray(e)?e:e!==void 0?[e]:[]}function ir(e){var t=e||{},n=t.label,r=t.value,a=t.children,c=r||"value";return{_title:n?[n]:["title","label"],value:c,key:c,children:a||"children"}}function Ye(e){return!e||e.disabled||e.disableCheckbox||e.checkable===!1}function cr(e,t){var n=[];function r(a){a.forEach(function(c){var o=c[t.children];o&&(n.push(c[t.value]),r(o))})}return r(e),n}function dt(e){return e==null}var ur={width:0,height:0,display:"flex",overflow:"hidden",opacity:0,border:0,padding:0,margin:0},sr=function(t,n){var r=Gt(),a=r.prefixCls,c=r.multiple,o=r.searchValue,u=r.toggleOpen,i=r.open,s=r.notFoundContent,d=l.useContext(Ct),T=d.virtual,b=d.listHeight,S=d.listItemHeight,k=d.treeData,L=d.fieldNames,R=d.onSelect,W=d.dropdownMatchSelectWidth,G=d.treeExpandAction,m=l.useContext(gt),P=m.checkable,_=m.checkedKeys,oe=m.halfCheckedKeys,O=m.treeExpandedKeys,$e=m.treeDefaultExpandAll,Ce=m.treeDefaultExpandedKeys,Se=m.onTreeExpand,Oe=m.treeIcon,ie=m.showTreeIcon,ce=m.switcherIcon,ye=m.treeLine,J=m.treeNodeFilterProp,q=m.loadData,A=m.treeLoadedKeys,be=m.treeMotion,xe=m.onTreeLoad,we=m.keyEntities,F=l.useRef(),x=_t(function(){return k},[i,k],function(f,w){return w[0]&&f[1]!==w[1]}),ue=l.useMemo(function(){return P?{checked:_,halfChecked:oe}:null},[P,_,oe]);l.useEffect(function(){if(i&&!c&&_.length){var f;(f=F.current)===null||f===void 0||f.scrollTo({key:_[0]})}},[i]);var j=String(o).toLowerCase(),Q=function(w){return j?String(w[J]).toLowerCase().includes(j):!1},se=l.useState(Ce),de=ae(se,2),X=de[0],Ie=de[1],Ee=l.useState(null),Z=ae(Ee,2),ee=Z[0],fe=Z[1],ke=l.useMemo(function(){return O?le(O):o?ee:X},[X,ee,O,o]);l.useEffect(function(){o&&fe(cr(k,L))},[o]);var ve=function(w){Ie(w),fe(w),Se&&Se(w)},Y=function(w){w.preventDefault()},B=function(w,z){var V=z.node;P&&Ye(V)||(R(V.key,{selected:!_.includes(V.key)}),c||u(!1))},Ne=l.useState(null),K=ae(Ne,2),he=K[0],De=K[1],N=we[he];if(l.useImperativeHandle(n,function(){var f;return{scrollTo:(f=F.current)===null||f===void 0?void 0:f.scrollTo,onKeyDown:function(z){var V,Te=z.which;switch(Te){case Ve.UP:case Ve.DOWN:case Ve.LEFT:case Ve.RIGHT:(V=F.current)===null||V===void 0||V.onKeyDown(z);break;case Ve.ENTER:{if(N){var Le=(N==null?void 0:N.node)||{},te=Le.selectable,Pe=Le.value;te!==!1&&B(null,{node:{key:he},selected:!_.includes(Pe)})}break}case Ve.ESC:u(!1)}},onKeyUp:function(){}}}),x.length===0)return l.createElement("div",{role:"listbox",className:"".concat(a,"-empty"),onMouseDown:Y},s);var pe={fieldNames:L};return A&&(pe.loadedKeys=A),ke&&(pe.expandedKeys=ke),l.createElement("div",{onMouseDown:Y},N&&i&&l.createElement("span",{style:ur,"aria-live":"assertive"},N.node.value),l.createElement(tr,ht({ref:F,focusable:!1,prefixCls:"".concat(a,"-tree"),treeData:x,height:b,itemHeight:S,virtual:T!==!1&&W!==!1,multiple:c,icon:Oe,showIcon:ie,switcherIcon:ce,showLine:ye,loadData:o?null:q,motion:be,activeKey:he,checkable:P,checkStrictly:!0,checkedKeys:ue,selectedKeys:P?[]:_,defaultExpandAll:$e},pe,{onActiveChange:De,onSelect:B,onCheck:B,onExpand:ve,onLoad:xe,filterTreeNode:Q,expandAction:G})))},St=l.forwardRef(sr);St.displayName="OptionList";var Qe=function(){return null},yt="SHOW_ALL",Ze="SHOW_PARENT",Ge="SHOW_CHILD";function ft(e,t,n,r){var a=new Set(e);return t===Ge?e.filter(function(c){var o=n[c];return!(o&&o.children&&o.children.some(function(u){var i=u.node;return a.has(i[r.value])})&&o.children.every(function(u){var i=u.node;return Ye(i)||a.has(i[r.value])}))}):t===Ze?e.filter(function(c){var o=n[c],u=o?o.parent:null;return!(u&&!Ye(u.node)&&a.has(u.key))}):e}var dr=["children","value"];function bt(e){return Mt(e).map(function(t){if(!l.isValidElement(t)||!t.type)return null;var n=t,r=n.key,a=n.props,c=a.children,o=a.value,u=pt(a,dr),i=$({key:r,value:o},u),s=bt(c);return s.length&&(i.children=s),i}).filter(function(t){return t})}function qe(e){if(!e)return e;var t=$({},e);return"props"in t||Object.defineProperty(t,"props",{get:function(){return Ue(!1,"New `rc-tree-select` not support return node instance as argument anymore. Please consider to remove `props` access."),t}}),t}function fr(e,t,n,r,a,c){var o=null,u=null;function i(){function s(d){var T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"0",b=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1;return d.map(function(S,k){var L="".concat(T,"-").concat(k),R=S[c.value],W=n.includes(R),G=s(S[c.children]||[],L,W),m=l.createElement(Qe,S,G.map(function(_){return _.node}));if(t===R&&(o=m),W){var P={pos:L,node:m,children:G};return b||u.push(P),P}return null}).filter(function(S){return S})}u||(u=[],s(r),u.sort(function(d,T){var b=d.node.props.value,S=T.node.props.value,k=n.indexOf(b),L=n.indexOf(S);return k-L}))}Object.defineProperty(e,"triggerNode",{get:function(){return Ue(!1,"`triggerNode` is deprecated. Please consider decoupling data with node."),i(),o}}),Object.defineProperty(e,"allCheckedNodes",{get:function(){return Ue(!1,"`allCheckedNodes` is deprecated. Please consider decoupling data with node."),i(),a?u:u.map(function(d){var T=d.node;return T})}})}function vr(e,t){var n=t.id,r=t.pId,a=t.rootPId,c={},o=[],u=e.map(function(i){var s=$({},i),d=s[n];return c[d]=s,s.key=s.key||d,s});return u.forEach(function(i){var s=i[r],d=c[s];d&&(d.children=d.children||[],d.children.push(i)),(s===a||!d&&a===null)&&o.push(i)}),o}function hr(e,t,n){return l.useMemo(function(){return e?n?vr(e,$({id:"id",pId:"pId",rootPId:null},n!==!0?n:{})):e:bt(t)},[t,n,e])}const pr=function(e){var t=l.useRef({valueLabels:new Map});return l.useMemo(function(){var n=t.current.valueLabels,r=new Map,a=e.map(function(c){var o,u=c.value,i=(o=c.label)!==null&&o!==void 0?o:n.get(u);return r.set(u,i),$($({},c),{},{label:i})});return t.current.valueLabels=r,[a]},[e])};function vt(e){var t=l.useRef();t.current=e;var n=l.useCallback(function(){return t.current.apply(t,arguments)},[]);return n}const mr=function(e,t){return l.useMemo(function(){var n=rr(e,{fieldNames:t,initWrapper:function(a){return $($({},a),{},{valueEntities:new Map})},processEntity:function(a,c){var o=a.node[t.value];c.valueEntities.set(o,a)}});return n},[e,t])},gr=function(e,t,n,r){return l.useMemo(function(){var a=e.map(function(i){var s=i.value;return s}),c=t.map(function(i){var s=i.value;return s}),o=a.filter(function(i){return!r[i]});if(n){var u=Xe(a,!0,r);a=u.checkedKeys,c=u.halfCheckedKeys}return[Array.from(new Set([].concat(le(o),le(a)))),c]},[e,t,n,r])},Cr=function(e,t,n){var r=n.treeNodeFilterProp,a=n.filterTreeNode,c=n.fieldNames,o=c.children;return l.useMemo(function(){if(!t||a===!1)return e;var u;if(typeof a=="function")u=a;else{var i=t.toUpperCase();u=function(T,b){var S=b[r];return String(S).toUpperCase().includes(i)}}function s(d){var T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;return d.map(function(b){var S=b[o],k=T||u(t,qe(b)),L=s(S||[],k);return k||L.length?$($({},b),{},Kt({isLeaf:void 0},o,L)):null}).filter(function(b){return b})}return s(e)},[e,t,o,r,a])};var Sr=["id","prefixCls","value","defaultValue","onChange","onSelect","onDeselect","searchValue","inputValue","onSearch","autoClearSearchValue","filterTreeNode","treeNodeFilterProp","showCheckedStrategy","treeNodeLabelProp","multiple","treeCheckable","treeCheckStrictly","labelInValue","fieldNames","treeDataSimpleMode","treeData","children","loadData","treeLoadedKeys","onTreeLoad","treeDefaultExpandAll","treeExpandedKeys","treeDefaultExpandedKeys","onTreeExpand","treeExpandAction","virtual","listHeight","listItemHeight","onDropdownVisibleChange","dropdownMatchSelectWidth","treeLine","treeIcon","showTreeIcon","switcherIcon","treeMotion"];function yr(e){return!e||Vt(e)!=="object"}var br=l.forwardRef(function(e,t){var n=e.id,r=e.prefixCls,a=r===void 0?"rc-tree-select":r,c=e.value,o=e.defaultValue,u=e.onChange,i=e.onSelect,s=e.onDeselect,d=e.searchValue,T=e.inputValue,b=e.onSearch,S=e.autoClearSearchValue,k=S===void 0?!0:S,L=e.filterTreeNode,R=e.treeNodeFilterProp,W=R===void 0?"value":R,G=e.showCheckedStrategy,m=G===void 0?Ge:G,P=e.treeNodeLabelProp,_=e.multiple,oe=e.treeCheckable,O=e.treeCheckStrictly,$e=e.labelInValue,Ce=e.fieldNames,Se=e.treeDataSimpleMode,Oe=e.treeData,ie=e.children,ce=e.loadData,ye=e.treeLoadedKeys,J=e.onTreeLoad,q=e.treeDefaultExpandAll,A=e.treeExpandedKeys,be=e.treeDefaultExpandedKeys,xe=e.onTreeExpand,we=e.treeExpandAction,F=e.virtual,x=e.listHeight,ue=x===void 0?200:x,j=e.listItemHeight,Q=j===void 0?20:j,se=e.onDropdownVisibleChange,de=e.dropdownMatchSelectWidth,X=de===void 0?!0:de,Ie=e.treeLine,Ee=e.treeIcon,Z=e.showTreeIcon,ee=e.switcherIcon,fe=e.treeMotion,ke=pt(e,Sr),ve=Jt(n),Y=oe&&!O,B=oe||O,Ne=O||$e,K=B||_,he=ct(o,{value:c}),De=ae(he,2),N=De[0],pe=De[1],f=l.useMemo(function(){return ir(Ce)},[JSON.stringify(Ce)]),w=ct("",{value:d!==void 0?d:T,postState:function(v){return v||""}}),z=ae(w,2),V=z[0],Te=z[1],Le=function(v){Te(v),b==null||b(v)},te=hr(Oe,ie,Se),Pe=mr(te,f),E=Pe.keyEntities,H=Pe.valueEntities,et=l.useCallback(function(h){var v=[],p=[];return h.forEach(function(g){H.has(g)?p.push(g):v.push(g)}),{missingRawValues:v,existRawValues:p}},[H]),tt=Cr(te,V,{fieldNames:f,treeNodeFilterProp:W,filterTreeNode:L}),rt=l.useCallback(function(h){if(h){if(P)return h[P];for(var v=f._title,p=0;p<v.length;p+=1){var g=h[v[p]];if(g!==void 0)return g}}},[f,P]),Ae=l.useCallback(function(h){var v=or(h);return v.map(function(p){return yr(p)?{value:p}:p})},[]),Fe=l.useCallback(function(h){var v=Ae(h);return v.map(function(p){var g=p.label,M=p.value,I=p.halfChecked,C,y=H.get(M);if(y){var D;g=(D=g)!==null&&D!==void 0?D:rt(y.node),C=y.node.disabled}else if(g===void 0){var re=Ae(N).find(function(He){return He.value===M});g=re.label}return{label:g,value:M,halfChecked:I,disabled:C}})},[H,rt,Ae,N]),nt=l.useMemo(function(){return Ae(N)},[Ae,N]),xt=l.useMemo(function(){var h=[],v=[];return nt.forEach(function(p){p.halfChecked?v.push(p):h.push(p)}),[h,v]},[nt]),at=ae(xt,2),_e=at[0],lt=at[1],ot=l.useMemo(function(){return _e.map(function(h){return h.value})},[_e]),wt=gr(_e,lt,Y,E),it=ae(wt,2),Me=it[0],je=it[1],It=l.useMemo(function(){var h=ft(Me,m,E,f),v=h.map(function(I){var C,y,D;return(C=(y=E[I])===null||y===void 0||(D=y.node)===null||D===void 0?void 0:D[f.value])!==null&&C!==void 0?C:I}),p=v.map(function(I){var C=_e.find(function(y){return y.value===I});return{value:I,label:C==null?void 0:C.label}}),g=Fe(p),M=g[0];return!K&&M&&dt(M.value)&&dt(M.label)?[]:g.map(function(I){var C;return $($({},I),{},{label:(C=I.label)!==null&&C!==void 0?C:I.value})})},[f,K,Me,_e,Fe,m,E]),Et=pr(It),kt=ae(Et,1),Nt=kt[0],Be=vt(function(h,v,p){var g=Fe(h);if(pe(g),k&&Te(""),u){var M=h;if(Y){var I=ft(h,m,E,f);M=I.map(function(U){var ne=H.get(U);return ne?ne.node[f.value]:U})}var C=v||{triggerValue:void 0,selected:void 0},y=C.triggerValue,D=C.selected,re=M;if(O){var He=lt.filter(function(U){return!M.includes(U.value)});re=[].concat(le(re),le(He))}var Re=Fe(re),me={preValue:_e,triggerValue:y},Ke=!0;(O||p==="selection"&&!D)&&(Ke=!1),fr(me,y,h,te,Ke,f),B?me.checked=D:me.selected=D;var ze=Ne?Re:Re.map(function(U){return U.value});u(K?ze:ze[0],Ne?null:Re.map(function(U){return U.label}),me)}}),Je=l.useCallback(function(h,v){var p,g=v.selected,M=v.source,I=E[h],C=I==null?void 0:I.node,y=(p=C==null?void 0:C[f.value])!==null&&p!==void 0?p:h;if(!K)Be([y],{selected:!0,triggerValue:y},"option");else{var D=g?[].concat(le(ot),[y]):Me.filter(function(ne){return ne!==y});if(Y){var re=et(D),He=re.missingRawValues,Re=re.existRawValues,me=Re.map(function(ne){return H.get(ne).key}),Ke;if(g){var ze=Xe(me,!0,E);Ke=ze.checkedKeys}else{var U=Xe(me,{checked:!1,halfCheckedKeys:je},E);Ke=U.checkedKeys}D=[].concat(le(He),le(Ke.map(function(ne){return E[ne].node[f.value]})))}Be(D,{selected:g,triggerValue:y},M||"option")}g||!K?i==null||i(y,qe(C)):s==null||s(y,qe(C))},[et,H,E,f,K,ot,Be,Y,i,s,Me,je]),Dt=l.useCallback(function(h){if(se){var v={};Object.defineProperty(v,"documentClickClose",{get:function(){return Ue(!1,"Second param of `onDropdownVisibleChange` has been removed."),!1}}),se(h,v)}},[se]),Tt=vt(function(h,v){var p=h.map(function(g){return g.value});if(v.type==="clear"){Be(p,{},"selection");return}v.values.length&&Je(v.values[0].value,{selected:!1,source:"selection"})}),Lt=l.useMemo(function(){return{virtual:F,dropdownMatchSelectWidth:X,listHeight:ue,listItemHeight:Q,treeData:tt,fieldNames:f,onSelect:Je,treeExpandAction:we}},[F,X,ue,Q,tt,f,Je,we]),Pt=l.useMemo(function(){return{checkable:B,loadData:ce,treeLoadedKeys:ye,onTreeLoad:J,checkedKeys:Me,halfCheckedKeys:je,treeDefaultExpandAll:q,treeExpandedKeys:A,treeDefaultExpandedKeys:be,onTreeExpand:xe,treeIcon:Ee,treeMotion:fe,showTreeIcon:Z,switcherIcon:ee,treeLine:Ie,treeNodeFilterProp:W,keyEntities:E}},[B,ce,ye,J,Me,je,q,A,be,xe,Ee,fe,Z,ee,Ie,W,E]);return l.createElement(Ct.Provider,{value:Lt},l.createElement(gt.Provider,{value:Pt},l.createElement(Xt,ht({ref:t},ke,{id:ve,prefixCls:a,mode:K?"multiple":void 0,displayValues:Nt,onDisplayValuesChange:Tt,searchValue:V,onSearch:Le,OptionList:St,emptyOptions:!te.length,onDropdownVisibleChange:Dt,dropdownMatchSelectWidth:X}))))}),We=br;We.TreeNode=Qe;We.SHOW_ALL=yt;We.SHOW_PARENT=Ze;We.SHOW_CHILD=Ge;const xr=e=>{const{componentCls:t,treePrefixCls:n,colorBgElevated:r}=e,a=`.${n}`;return[{[`${t}-dropdown`]:[{padding:`${e.paddingXS}px ${e.paddingXS/2}px`},nr(n,mt(e,{colorBgContainer:r})),{[a]:{borderRadius:0,"&-list-holder-inner":{alignItems:"stretch",[`${a}-treenode`]:{[`${a}-node-content-wrapper`]:{flex:"auto"}}}}},ar(`${n}-checkbox`,e),{"&-rtl":{direction:"rtl",[`${a}-switcher${a}-switcher_close`]:{[`${a}-switcher-icon svg`]:{transform:"rotate(90deg)"}}}}]}]};function wr(e,t){return $t("TreeSelect",n=>{const r=mt(n,{treePrefixCls:t});return[xr(r)]})(e)}var Ir=globalThis&&globalThis.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n};const Er=(e,t)=>{var n,{prefixCls:r,size:a,disabled:c,bordered:o=!0,className:u,rootClassName:i,treeCheckable:s,multiple:d,listHeight:T=256,listItemHeight:b=26,placement:S,notFoundContent:k,switcherIcon:L,treeLine:R,getPopupContainer:W,popupClassName:G,dropdownClassName:m,treeIcon:P=!1,transitionName:_,choiceTransitionName:oe="",status:O,showArrow:$e,treeExpandAction:Ce,builtinPlacements:Se,dropdownMatchSelectWidth:Oe,popupMatchSelectWidth:ie}=e,ce=Ir(e,["prefixCls","size","disabled","bordered","className","rootClassName","treeCheckable","multiple","listHeight","listItemHeight","placement","notFoundContent","switcherIcon","treeLine","getPopupContainer","popupClassName","dropdownClassName","treeIcon","transitionName","choiceTransitionName","status","showArrow","treeExpandAction","builtinPlacements","dropdownMatchSelectWidth","popupMatchSelectWidth"]);const{getPopupContainer:ye,getPrefixCls:J,renderEmpty:q,direction:A,virtual:be,popupMatchSelectWidth:xe,popupOverflow:we}=l.useContext(At),F=J(),x=J("select",r),ue=J("select-tree",r),j=J("tree-select",r),{compactSize:Q,compactItemClassnames:se}=Ht(x,A),[de,X]=Yt(x),[Ie]=wr(j,ue),Ee=ut(G||m,`${j}-dropdown`,{[`${j}-dropdown-rtl`]:A==="rtl"},i,X),Z=!!(s||d),ee=er($e),fe=(n=ie??Oe)!==null&&n!==void 0?n:xe,{status:ke,hasFeedback:ve,isFormItemInput:Y,feedbackIcon:B}=l.useContext(Rt),Ne=Ut(ke,O),{suffixIcon:K,removeIcon:he,clearIcon:De}=qt(Object.assign(Object.assign({},ce),{multiple:Z,showArrow:ee,hasFeedback:ve,feedbackIcon:B,prefixCls:x}));let N;k!==void 0?N=k:N=(q==null?void 0:q("Select"))||l.createElement(Qt,{componentName:"Select"});const pe=Wt(ce,["suffixIcon","itemIcon","removeIcon","clearIcon","switcherIcon"]),f=l.useMemo(()=>S!==void 0?S:A==="rtl"?"bottomRight":"bottomLeft",[S,A]),w=Zt(Se,we),z=Ft(E=>{var H;return(H=Q??a)!==null&&H!==void 0?H:E}),V=l.useContext(jt),Te=c??V,Le=ut(!r&&j,{[`${x}-lg`]:z==="large",[`${x}-sm`]:z==="small",[`${x}-rtl`]:A==="rtl",[`${x}-borderless`]:!o,[`${x}-in-form-item`]:Y},Bt(x,Ne,ve),se,u,i,X),te=E=>l.createElement(lr,{prefixCls:ue,switcherIcon:L,treeNodeProps:E,showLine:R}),Pe=l.createElement(We,Object.assign({virtual:be,disabled:Te},pe,{dropdownMatchSelectWidth:fe,builtinPlacements:w,ref:t,prefixCls:x,className:Le,listHeight:T,listItemHeight:b,treeCheckable:s&&l.createElement("span",{className:`${x}-tree-checkbox-inner`}),treeLine:!!R,inputIcon:K,multiple:Z,placement:f,removeIcon:he,clearIcon:De,switcherIcon:te,showTreeIcon:P,notFoundContent:N,getPopupContainer:W||ye,treeMotion:null,dropdownClassName:Ee,choiceTransitionName:st(F,"",oe),transitionName:st(F,zt(S),_),showArrow:ve||ee,treeExpandAction:Ce}));return de(Ie(Pe))},kr=l.forwardRef(Er),ge=kr,Nr=Ot(ge);ge.TreeNode=Qe;ge.SHOW_ALL=yt;ge.SHOW_PARENT=Ze;ge.SHOW_CHILD=Ge;ge._InternalPanelDoNotUseOrYouWillBeFired=Nr;const Pr=ge;export{Pr as T};