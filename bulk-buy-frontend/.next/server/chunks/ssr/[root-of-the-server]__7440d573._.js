module.exports=[30370,(a,b,c)=>{"use strict";b.exports=a.r(77755).vendored.contexts.AppRouterContext},52760,(a,b,c)=>{"use strict";b.exports=a.r(77755).vendored["react-ssr"].ReactServerDOMTurbopackClient},56704,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},20635,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},12025,(a,b,c)=>{"use strict";b.exports=a.r(77755).vendored.contexts.HooksClientContext},7546,(a,b,c)=>{"use strict";b.exports=a.r(77755).vendored.contexts.ServerInsertedHtml},12979,a=>{"use strict";let b=(0,a.i(57287).default)("zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]);a.s(["Zap",()=>b],12979)},77276,a=>{"use strict";let b=(0,a.i(57287).default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);a.s(["ArrowLeft",()=>b],77276)},3056,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},60113,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={DEFAULT_SEGMENT_KEY:function(){return l},NOT_FOUND_SEGMENT_KEY:function(){return m},PAGE_SEGMENT_KEY:function(){return k},addSearchParamsIfPageSegment:function(){return i},computeSelectedLayoutSegment:function(){return j},getSegmentValue:function(){return f},getSelectedLayoutSegmentPath:function(){return function a(b,c,d=!0,e=[]){let g;if(d)g=b[1][c];else{let a=b[1];g=a.children??Object.values(a)[0]}if(!g)return e;let h=f(g[0]);return!h||h.startsWith(k)?e:(e.push(h),a(g,c,!1,e))}},isGroupSegment:function(){return g},isParallelRouteSegment:function(){return h}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});function f(a){return Array.isArray(a)?a[1]:a}function g(a){return"("===a[0]&&a.endsWith(")")}function h(a){return a.startsWith("@")&&"@children"!==a}function i(a,b){if(a.includes(k)){let a=JSON.stringify(b);return"{}"!==a?k+"?"+a:k}return a}function j(a,b){if(!a||0===a.length)return null;let c="children"===b?a[0]:a[a.length-1];return c===l?null:c}let k="__PAGE__",l="__DEFAULT__",m="/_not-found"},57287,a=>{"use strict";var b=a.i(25129);let c=a=>{let b=a.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,b,c)=>c?c.toUpperCase():b.toLowerCase());return b.charAt(0).toUpperCase()+b.slice(1)},d=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim();var e={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let f=(0,b.forwardRef)(({color:a="currentColor",size:c=24,strokeWidth:f=2,absoluteStrokeWidth:g,className:h="",children:i,iconNode:j,...k},l)=>(0,b.createElement)("svg",{ref:l,...e,width:c,height:c,stroke:a,strokeWidth:g?24*Number(f)/Number(c):f,className:d("lucide",h),...!i&&!(a=>{for(let b in a)if(b.startsWith("aria-")||"role"===b||"title"===b)return!0})(k)&&{"aria-hidden":"true"},...k},[...j.map(([a,c])=>(0,b.createElement)(a,c)),...Array.isArray(i)?i:[i]])),g=(a,e)=>{let g=(0,b.forwardRef)(({className:g,...h},i)=>(0,b.createElement)(f,{ref:i,iconNode:e,className:d(`lucide-${c(a).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${a}`,g),...h}));return g.displayName=c(a),g};a.s(["default",()=>g],57287)},55598,a=>{"use strict";let b=(0,a.i(57287).default)("shield-check",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);a.s(["ShieldCheck",()=>b],55598)},69105,a=>{"use strict";let b,c;var d,e=a.i(25129);let f={data:""},g=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,h=/\/\*[^]*?\*\/|  +/g,i=/\n+/g,j=(a,b)=>{let c="",d="",e="";for(let f in a){let g=a[f];"@"==f[0]?"i"==f[1]?c=f+" "+g+";":d+="f"==f[1]?j(g,f):f+"{"+j(g,"k"==f[1]?"":b)+"}":"object"==typeof g?d+=j(g,b?b.replace(/([^,])+/g,a=>f.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,b=>/&/.test(b)?b.replace(/&/g,a):a?a+" "+b:b)):f):null!=g&&(f=/^--/.test(f)?f:f.replace(/[A-Z]/g,"-$&").toLowerCase(),e+=j.p?j.p(f,g):f+":"+g+";")}return c+(b&&e?b+"{"+e+"}":e)+d},k={},l=a=>{if("object"==typeof a){let b="";for(let c in a)b+=c+l(a[c]);return b}return a};function m(a){let b,c,d=this||{},e=a.call?a(d.p):a;return((a,b,c,d,e)=>{var f;let m=l(a),n=k[m]||(k[m]=(a=>{let b=0,c=11;for(;b<a.length;)c=101*c+a.charCodeAt(b++)>>>0;return"go"+c})(m));if(!k[n]){let b=m!==a?a:(a=>{let b,c,d=[{}];for(;b=g.exec(a.replace(h,""));)b[4]?d.shift():b[3]?(c=b[3].replace(i," ").trim(),d.unshift(d[0][c]=d[0][c]||{})):d[0][b[1]]=b[2].replace(i," ").trim();return d[0]})(a);k[n]=j(e?{["@keyframes "+n]:b}:b,c?"":"."+n)}let o=c&&k.g?k.g:null;return c&&(k.g=k[n]),f=k[n],o?b.data=b.data.replace(o,f):-1===b.data.indexOf(f)&&(b.data=d?f+b.data:b.data+f),n})(e.unshift?e.raw?(b=[].slice.call(arguments,1),c=d.p,e.reduce((a,d,e)=>{let f=b[e];if(f&&f.call){let a=f(c),b=a&&a.props&&a.props.className||/^go/.test(a)&&a;f=b?"."+b:a&&"object"==typeof a?a.props?"":j(a,""):!1===a?"":a}return a+d+(null==f?"":f)},"")):e.reduce((a,b)=>Object.assign(a,b&&b.call?b(d.p):b),{}):e,d.target||f,d.g,d.o,d.k)}m.bind({g:1});let n,o,p,q=m.bind({k:1});function r(a,b){let c=this||{};return function(){let d=arguments;function e(f,g){let h=Object.assign({},f),i=h.className||e.className;c.p=Object.assign({theme:o&&o()},h),c.o=/ *go\d+/.test(i),h.className=m.apply(c,d)+(i?" "+i:""),b&&(h.ref=g);let j=a;return a[0]&&(j=h.as||a,delete h.as),p&&j[0]&&p(h),n(j,h)}return b?b(e):e}}var s=(a,b)=>"function"==typeof a?a(b):a,t=(b=0,()=>(++b).toString()),u="default",v=(a,b)=>{let{toastLimit:c}=a.settings;switch(b.type){case 0:return{...a,toasts:[b.toast,...a.toasts].slice(0,c)};case 1:return{...a,toasts:a.toasts.map(a=>a.id===b.toast.id?{...a,...b.toast}:a)};case 2:let{toast:d}=b;return v(a,{type:+!!a.toasts.find(a=>a.id===d.id),toast:d});case 3:let{toastId:e}=b;return{...a,toasts:a.toasts.map(a=>a.id===e||void 0===e?{...a,dismissed:!0,visible:!1}:a)};case 4:return void 0===b.toastId?{...a,toasts:[]}:{...a,toasts:a.toasts.filter(a=>a.id!==b.toastId)};case 5:return{...a,pausedAt:b.time};case 6:let f=b.time-(a.pausedAt||0);return{...a,pausedAt:void 0,toasts:a.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+f}))}}},w=[],x={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},y={},z=(a,b=u)=>{y[b]=v(y[b]||x,a),w.forEach(([a,c])=>{a===b&&c(y[b])})},A=a=>Object.keys(y).forEach(b=>z(a,b)),B=(a=u)=>b=>{z(b,a)},C=a=>(b,c)=>{let d,e=((a,b="blank",c)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:b,ariaProps:{role:"status","aria-live":"polite"},message:a,pauseDuration:0,...c,id:(null==c?void 0:c.id)||t()}))(b,a,c);return B(e.toasterId||(d=e.id,Object.keys(y).find(a=>y[a].toasts.some(a=>a.id===d))))({type:2,toast:e}),e.id},D=(a,b)=>C("blank")(a,b);D.error=C("error"),D.success=C("success"),D.loading=C("loading"),D.custom=C("custom"),D.dismiss=(a,b)=>{let c={type:3,toastId:a};b?B(b)(c):A(c)},D.dismissAll=a=>D.dismiss(void 0,a),D.remove=(a,b)=>{let c={type:4,toastId:a};b?B(b)(c):A(c)},D.removeAll=a=>D.remove(void 0,a),D.promise=(a,b,c)=>{let d=D.loading(b.loading,{...c,...null==c?void 0:c.loading});return"function"==typeof a&&(a=a()),a.then(a=>{let e=b.success?s(b.success,a):void 0;return e?D.success(e,{id:d,...c,...null==c?void 0:c.success}):D.dismiss(d),a}).catch(a=>{let e=b.error?s(b.error,a):void 0;e?D.error(e,{id:d,...c,...null==c?void 0:c.error}):D.dismiss(d)}),a};var E=q`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,F=q`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,G=q`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,H=r("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${E} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${a=>a.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${G} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,I=q`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,J=r("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${a=>a.secondary||"#e0e0e0"};
  border-right-color: ${a=>a.primary||"#616161"};
  animation: ${I} 1s linear infinite;
`,K=q`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,L=q`
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
}`,M=r("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${K} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${L} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${a=>a.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,N=r("div")`
  position: absolute;
`,O=r("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,P=q`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Q=r("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${P} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,R=({toast:a})=>{let{icon:b,type:c,iconTheme:d}=a;return void 0!==b?"string"==typeof b?e.createElement(Q,null,b):b:"blank"===c?null:e.createElement(O,null,e.createElement(J,{...d}),"loading"!==c&&e.createElement(N,null,"error"===c?e.createElement(H,{...d}):e.createElement(M,{...d})))},S=r("div")`
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
`,T=r("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`;e.memo(({toast:a,position:b,style:d,children:f})=>{let g=a.height?((a,b)=>{let d=a.includes("top")?1:-1,[e,f]=c?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*d}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*d}%,-1px) scale(.6); opacity:0;}
`];return{animation:b?`${q(e)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${q(f)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(a.position||b||"top-center",a.visible):{opacity:0},h=e.createElement(R,{toast:a}),i=e.createElement(T,{...a.ariaProps},s(a.message,a));return e.createElement(S,{className:a.className,style:{...g,...d,...a.style}},"function"==typeof f?f({icon:h,message:i}):e.createElement(e.Fragment,null,h,i))}),d=e.createElement,j.p=void 0,n=d,o=void 0,p=void 0,m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,a.s(["default",()=>D,"toast",()=>D],69105)},2382,a=>{"use strict";let b=(0,a.i(57287).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);a.s(["Loader2",()=>b],2382)},43740,a=>{"use strict";let b=(0,a.i(57287).default)("dollar-sign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);a.s(["DollarSign",()=>b],43740)},18358,a=>{"use strict";let b=(0,a.i(57287).default)("shopping-bag",[["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}],["path",{d:"M3.103 6.034h17.794",key:"awc11p"}],["path",{d:"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",key:"o988cm"}]]);a.s(["ShoppingBag",()=>b],18358)},69784,a=>{"use strict";let b=(0,a.i(57287).default)("message-square",[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]]);a.s(["MessageSquare",()=>b],69784)},23774,a=>{"use strict";let b=(0,a.i(57287).default)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);a.s(["ChevronRight",()=>b],23774)},25222,a=>{"use strict";var b=a.i(71633),c=a.i(25129),d=a.i(95463),e=a.i(69105),f=a.i(57042);let g=(0,a.i(57287).default)("hash",[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]]);var h=a.i(43740),i=a.i(77276),j=a.i(18358),k=a.i(55598),l=a.i(2382),m=a.i(23774),n=a.i(12979),o=a.i(69784),p=a.i(7366);function q(){let a=(0,d.useRouter)(),q=(0,d.useSearchParams)().get("productId"),[r,s]=(0,c.useState)(null),[t,u]=(0,c.useState)(""),[v,w]=(0,c.useState)(""),[x,y]=(0,c.useState)(""),[z,A]=(0,c.useState)(!1),[B,C]=(0,c.useState)(!0);(0,c.useEffect)(()=>{if(!q){e.toast.error("Protocol Error: No asset selected."),a.push("/dashboard");return}f.api.get(`/products/${q}`).then(a=>{s(a.data),u(a.data.minimumOrderQuantity?.toString()||""),w(a.data.pricePerUnit?.toString()||"")}).catch(()=>{e.toast.error("Could not synchronize asset details"),a.push("/dashboard")}).finally(()=>C(!1))},[q,a]);let D=async b=>{if(b.preventDefault(),console.log("-> Submission Triggered"),!z){if(!x||x.trim().length<5)return void e.toast.error("Please enter a negotiation memo (min 5 chars)");A(!0),console.log("-> Data Validation Passed. Attempting API Call...");try{let b={productId:q,quantity:Number(t),targetUnitPrice:Number(v),message:x.trim()},c=await f.api.post("/rfq",b);console.log("-> API Response:",c.data),e.toast.success("PROPOSAL PUSHED TO VENDOR"),a.push("/buyer/rfq/list"),a.refresh()}catch(b){console.error("-> API ERROR:",b);let a=b.response?.data?.message||"Transmission Failure";e.toast.error(a),A(!1)}}},E=(Number(t)||0)*(Number(v)||0);return(r&&r.pricePerUnit,B)?(0,b.jsxs)("div",{className:"flex flex-col items-center justify-center min-h-screen bg-[#020617]",children:[(0,b.jsx)(l.Loader2,{className:"w-12 h-12 text-blue-500 animate-spin mb-4"}),(0,b.jsx)("p",{className:"text-[10px] font-black uppercase tracking-[0.3em] text-blue-400/50",children:"Establishing Secure Channel"})]}):(0,b.jsxs)("div",{className:"min-h-screen bg-[#020617] text-slate-100 pb-20",children:[(0,b.jsx)("div",{className:"bg-[#0F172A]/80 border-b border-blue-900/30 px-8 py-6 sticky top-0 z-50 backdrop-blur-xl",children:(0,b.jsxs)("div",{className:"max-w-7xl mx-auto flex items-center justify-between",children:[(0,b.jsxs)(p.default,{href:"/dashboard",className:"flex items-center gap-2 group",children:[(0,b.jsx)("div",{className:"p-2 bg-blue-900/20 rounded-lg group-hover:bg-blue-800/40 transition-all border border-blue-800/20",children:(0,b.jsx)(i.ArrowLeft,{size:16,className:"text-blue-400"})}),(0,b.jsx)("span",{className:"text-[10px] font-black uppercase tracking-widest text-slate-400",children:"Cancel Protocol"})]}),(0,b.jsxs)("div",{className:"flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20",children:[(0,b.jsx)(k.ShieldCheck,{size:14,className:"animate-pulse"}),(0,b.jsx)("span",{className:"text-[9px] font-black uppercase tracking-widest",children:"Secure Handshake"})]})]})}),(0,b.jsx)("main",{className:"max-w-7xl mx-auto px-8 mt-12",children:(0,b.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-12",children:[(0,b.jsxs)("div",{className:"lg:col-span-4 space-y-6 lg:sticky lg:top-32 self-start",children:[(0,b.jsxs)("div",{className:"bg-[#0F172A] rounded-[2.5rem] border border-blue-900/30 overflow-hidden shadow-2xl",children:[(0,b.jsx)("div",{className:"aspect-square bg-slate-900 relative",children:r?.images?.[0]?(0,b.jsx)("img",{src:r.images[0],className:"w-full h-full object-cover opacity-80",alt:""}):(0,b.jsx)("div",{className:"w-full h-full flex items-center justify-center text-blue-900",children:(0,b.jsx)(j.ShoppingBag,{size:48})})}),(0,b.jsxs)("div",{className:"p-8",children:[(0,b.jsx)("h1",{className:"text-xl font-black tracking-tight text-white mb-2 uppercase italic",children:r?.name}),(0,b.jsxs)("div",{className:"flex items-center justify-between p-4 bg-[#1E293B]/50 rounded-xl border border-blue-900/20",children:[(0,b.jsx)("span",{className:"text-[10px] font-black text-blue-400",children:"Benchmark"}),(0,b.jsxs)("span",{className:"text-sm font-black text-white",children:["$",r?.pricePerUnit]})]})]})]}),(0,b.jsxs)("div",{className:"bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden",children:[(0,b.jsx)(n.Zap,{className:"absolute -right-4 -top-4 w-32 h-32 text-white/10 rotate-12"}),(0,b.jsx)("p",{className:"text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/60 mb-2",children:"Total Bid Value"}),(0,b.jsxs)("h3",{className:"text-5xl font-[1000] tracking-tighter italic",children:["$",E.toLocaleString()]})]})]}),(0,b.jsx)("div",{className:"lg:col-span-8",children:(0,b.jsx)("div",{className:"bg-[#0F172A] rounded-[3rem] border border-blue-900/30 p-10 md:p-16 shadow-2xl",children:(0,b.jsxs)("form",{onSubmit:D,className:"space-y-10",children:[(0,b.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[(0,b.jsxs)("div",{className:"space-y-4",children:[(0,b.jsx)("label",{className:"text-[11px] font-black uppercase text-blue-400/80",children:"Asset Quantity"}),(0,b.jsxs)("div",{className:"group relative",children:[(0,b.jsx)(g,{className:"absolute left-6 top-1/2 -translate-y-1/2 text-slate-500",size:20}),(0,b.jsx)("input",{type:"number",required:!0,value:t,onChange:a=>u(a.target.value),className:"w-full pl-14 pr-6 py-6 bg-[#1E293B]/40 border-2 border-transparent rounded-[1.5rem] focus:border-blue-500 transition-all outline-none font-black text-2xl text-white"})]})]}),(0,b.jsxs)("div",{className:"space-y-4",children:[(0,b.jsx)("label",{className:"text-[11px] font-black uppercase text-blue-400/80",children:"Proposed Unit Price"}),(0,b.jsxs)("div",{className:"group relative",children:[(0,b.jsx)(h.DollarSign,{className:"absolute left-6 top-1/2 -translate-y-1/2 text-slate-500",size:20}),(0,b.jsx)("input",{type:"number",step:"0.01",required:!0,value:v,onChange:a=>w(a.target.value),className:"w-full pl-14 pr-6 py-6 bg-[#1E293B]/40 border-2 border-transparent rounded-[1.5rem] focus:border-blue-500 transition-all outline-none font-black text-2xl text-white"})]})]})]}),(0,b.jsxs)("div",{className:"space-y-4",children:[(0,b.jsxs)("label",{className:"text-[11px] font-black uppercase text-blue-400/80 flex items-center gap-2",children:[(0,b.jsx)(o.MessageSquare,{size:14})," Negotiation Memo"]}),(0,b.jsx)("textarea",{rows:4,required:!0,value:x,onChange:a=>y(a.target.value),className:"w-full px-8 py-6 bg-[#1E293B]/40 border-2 border-transparent rounded-[1.5rem] focus:border-blue-500 transition-all outline-none resize-none text-slate-300",placeholder:"Describe shipping/terms requirements..."})]}),(0,b.jsx)("button",{type:"submit",disabled:z,className:"w-full py-6 bg-white text-[#020617] hover:bg-blue-500 hover:text-white transition-all font-[1000] rounded-[2rem] shadow-2xl disabled:opacity-50 flex justify-center items-center gap-3 text-lg uppercase tracking-widest italic",children:z?(0,b.jsx)(l.Loader2,{className:"animate-spin"}):(0,b.jsxs)(b.Fragment,{children:["Push Proposal to Vendor ",(0,b.jsx)(m.ChevronRight,{size:20})]})})]})})})]})})]})}function r(){return(0,b.jsx)(c.Suspense,{fallback:(0,b.jsx)("div",{className:"min-h-screen bg-[#020617] flex items-center justify-center font-black text-blue-900 uppercase",children:"Syncing..."}),children:(0,b.jsx)(q,{})})}a.s(["default",()=>r],25222)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__7440d573._.js.map