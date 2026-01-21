(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,15115,e=>{"use strict";var t=e.i(50178);let r=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},a=(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim();var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,t.forwardRef)(({color:e="currentColor",size:r=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:n="",children:l,iconNode:d,...c},m)=>(0,t.createElement)("svg",{ref:m,...i,width:r,height:r,stroke:e,strokeWidth:o?24*Number(s)/Number(r):s,className:a("lucide",n),...!l&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0})(c)&&{"aria-hidden":"true"},...c},[...d.map(([e,r])=>(0,t.createElement)(e,r)),...Array.isArray(l)?l:[l]])),o=(e,i)=>{let o=(0,t.forwardRef)(({className:o,...n},l)=>(0,t.createElement)(s,{ref:l,iconNode:i,className:a(`lucide-${r(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,o),...n}));return o.displayName=r(e),o};e.s(["default",()=>o],15115)},19078,(e,t,r)=>{t.exports=e.r(81391)},67824,e=>{"use strict";let t,r;var a,i=e.i(50178);let s={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",a="",i="";for(let s in e){let o=e[s];"@"==s[0]?"i"==s[1]?r=s+" "+o+";":a+="f"==s[1]?d(o,s):s+"{"+d(o,"k"==s[1]?"":t)+"}":"object"==typeof o?a+=d(o,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=o&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=d.p?d.p(s,o):s+":"+o+";")}return r+(t&&i?t+"{"+i+"}":i)+a},c={},m=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+m(e[r]);return t}return e};function p(e){let t,r,a=this||{},i=e.call?e(a.p):e;return((e,t,r,a,i)=>{var s;let p=m(e),u=c[p]||(c[p]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(p));if(!c[u]){let t=p!==e?e:(e=>{let t,r,a=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);c[u]=d(i?{["@keyframes "+u]:t}:t,r?"":"."+u)}let f=r&&c.g?c.g:null;return r&&(c.g=c[u]),s=c[u],f?t.data=t.data.replace(f,s):-1===t.data.indexOf(s)&&(t.data=a?s+t.data:t.data+s),u})(i.unshift?i.raw?(t=[].slice.call(arguments,1),r=a.p,i.reduce((e,a,i)=>{let s=t[i];if(s&&s.call){let e=s(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+a+(null==s?"":s)},"")):i.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):i,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||s})(a.target),a.g,a.o,a.k)}p.bind({g:1});let u,f,g,h=p.bind({k:1});function b(e,t){let r=this||{};return function(){let a=arguments;function i(s,o){let n=Object.assign({},s),l=n.className||i.className;r.p=Object.assign({theme:f&&f()},n),r.o=/ *go\d+/.test(l),n.className=p.apply(r,a)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),g&&d[0]&&g(n),u(d,n)}return t?t(i):i}}var x=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},j=[],N={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},$=(e,t=v)=>{k[t]=w(k[t]||N,e),j.forEach(([e,r])=>{e===t&&r(k[t])})},A=e=>Object.keys(k).forEach(t=>$(e,t)),E=(e=v)=>t=>{$(t,e)},C=e=>(t,r)=>{let a,i=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return E(i.toasterId||(a=i.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===a))))({type:2,toast:i}),i.id},O=(e,t)=>C("blank")(e,t);O.error=C("error"),O.success=C("success"),O.loading=C("loading"),O.custom=C("custom"),O.dismiss=(e,t)=>{let r={type:3,toastId:e};t?E(t)(r):A(r)},O.dismissAll=e=>O.dismiss(void 0,e),O.remove=(e,t)=>{let r={type:4,toastId:e};t?E(t)(r):A(r)},O.removeAll=e=>O.remove(void 0,e),O.promise=(e,t,r)=>{let a=O.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?x(t.success,e):void 0;return i?O.success(i,{id:a,...r,...null==r?void 0:r.success}):O.dismiss(a),e}).catch(e=>{let i=t.error?x(t.error,e):void 0;i?O.error(i,{id:a,...r,...null==r?void 0:r.error}):O.dismiss(a)}),e};var U=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,P=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,L=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,z=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${P} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${L} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,S=h`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,F=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${S} 1s linear infinite;
`,Q=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,_=h`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,I=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${_} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,T=b("div")`
  position: absolute;
`,D=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,M=h`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,R=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${M} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,q=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?i.createElement(R,null,t):t:"blank"===r?null:i.createElement(D,null,i.createElement(F,{...a}),"loading"!==r&&i.createElement(T,null,"error"===r?i.createElement(z,{...a}):i.createElement(I,{...a})))},B=b("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,W=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`;i.memo(({toast:e,position:t,style:a,children:s})=>{let o=e.height?((e,t)=>{let a=e.includes("top")?1:-1,[i,s]=(()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r})()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*a}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*a}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${h(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=i.createElement(q,{toast:e}),l=i.createElement(W,{...e.ariaProps},x(e.message,e));return i.createElement(B,{className:e.className,style:{...o,...a,...e.style}},"function"==typeof s?s({icon:n,message:l}):i.createElement(i.Fragment,null,n,l))}),a=i.createElement,d.p=void 0,u=a,f=void 0,g=void 0,p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,e.s(["default",()=>O,"toast",()=>O],67824)},26948,e=>{"use strict";let t=(0,e.i(15115).default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["ArrowLeft",()=>t],26948)},28467,e=>{"use strict";let t=(0,e.i(15115).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);e.s(["Loader2",()=>t],28467)},79587,e=>{"use strict";var t=e.i(30483),r=e.i(50178),a=e.i(19078),i=e.i(12973),s=e.i(67824),o=e.i(26948),n=e.i(28467),l=e.i(85127);function d(){let e=(0,a.useRouter)(),{id:d}=(0,a.useParams)(),[c,m]=(0,r.useState)(!1),[p,u]=(0,r.useState)(!0),[f,g]=(0,r.useState)({name:"",description:"",pricePerUnit:"",minimumOrderQuantity:"",category:"",imageUrl:""});(0,r.useEffect)(()=>{(async()=>{try{let e=(await i.api.get(`/products/${d}`)).data;g({name:e.name,description:e.description||"",pricePerUnit:e.pricePerUnit.toString(),minimumOrderQuantity:e.minimumOrderQuantity.toString(),category:e.category,imageUrl:e.images?.[0]||""})}catch(e){s.toast.error("Could not load product")}finally{u(!1)}})()},[d]);let h=async t=>{t.preventDefault(),m(!0);try{await i.api.put(`/products/${d}`,{...f,pricePerUnit:Number(f.pricePerUnit),minimumOrderQuantity:Number(f.minimumOrderQuantity),images:f.imageUrl?[f.imageUrl]:[]}),s.toast.success("Product updated!"),e.push("/vendor/inventory")}catch(e){s.toast.error("Update failed")}finally{m(!1)}};return p?(0,t.jsx)("div",{className:"p-20 text-center",children:(0,t.jsx)(n.Loader2,{className:"animate-spin mx-auto"})}):(0,t.jsx)("div",{className:"min-h-screen bg-[#F8FAFC] p-6 md:p-12",children:(0,t.jsxs)("div",{className:"max-w-3xl mx-auto",children:[(0,t.jsxs)(l.default,{href:"/vendor/inventory",className:"flex items-center text-slate-500 mb-8 hover:text-blue-600 transition-all font-bold",children:[(0,t.jsx)(o.ArrowLeft,{size:20,className:"mr-2"})," Back to Inventory"]}),(0,t.jsxs)("div",{className:"bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden",children:[(0,t.jsx)("div",{className:"bg-blue-600 p-8 text-white",children:(0,t.jsx)("h1",{className:"text-3xl font-black flex items-center gap-3",children:"Edit Product"})}),(0,t.jsxs)("form",{onSubmit:h,className:"p-8 space-y-6",children:[(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-bold text-slate-700",children:"Product Name"}),(0,t.jsx)("input",{required:!0,value:f.name,className:"w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl",onChange:e=>g({...f,name:e.target.value})})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-6",children:[(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-bold text-slate-700",children:"Unit Price ($)"}),(0,t.jsx)("input",{type:"number",required:!0,value:f.pricePerUnit,className:"w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl",onChange:e=>g({...f,pricePerUnit:e.target.value})})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-bold text-slate-700",children:"Min Order Qty"}),(0,t.jsx)("input",{type:"number",required:!0,value:f.minimumOrderQuantity,className:"w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl",onChange:e=>g({...f,minimumOrderQuantity:e.target.value})})]})]}),(0,t.jsx)("button",{disabled:c,className:"w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2",children:c?(0,t.jsx)(n.Loader2,{className:"animate-spin"}):"Save Changes"})]})]})]})})}e.s(["default",()=>d])}]);