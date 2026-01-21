module.exports=[30370,(a,b,c)=>{"use strict";b.exports=a.r(77755).vendored.contexts.AppRouterContext},52760,(a,b,c)=>{"use strict";b.exports=a.r(77755).vendored["react-ssr"].ReactServerDOMTurbopackClient},56704,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},20635,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},12025,(a,b,c)=>{"use strict";b.exports=a.r(77755).vendored.contexts.HooksClientContext},7546,(a,b,c)=>{"use strict";b.exports=a.r(77755).vendored.contexts.ServerInsertedHtml},77276,a=>{"use strict";let b=(0,a.i(57287).default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);a.s(["ArrowLeft",()=>b],77276)},3056,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},60113,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={DEFAULT_SEGMENT_KEY:function(){return l},NOT_FOUND_SEGMENT_KEY:function(){return m},PAGE_SEGMENT_KEY:function(){return k},addSearchParamsIfPageSegment:function(){return i},computeSelectedLayoutSegment:function(){return j},getSegmentValue:function(){return f},getSelectedLayoutSegmentPath:function(){return function a(b,c,d=!0,e=[]){let g;if(d)g=b[1][c];else{let a=b[1];g=a.children??Object.values(a)[0]}if(!g)return e;let h=f(g[0]);return!h||h.startsWith(k)?e:(e.push(h),a(g,c,!1,e))}},isGroupSegment:function(){return g},isParallelRouteSegment:function(){return h}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});function f(a){return Array.isArray(a)?a[1]:a}function g(a){return"("===a[0]&&a.endsWith(")")}function h(a){return a.startsWith("@")&&"@children"!==a}function i(a,b){if(a.includes(k)){let a=JSON.stringify(b);return"{}"!==a?k+"?"+a:k}return a}function j(a,b){if(!a||0===a.length)return null;let c="children"===b?a[0]:a[a.length-1];return c===l?null:c}let k="__PAGE__",l="__DEFAULT__",m="/_not-found"},57287,a=>{"use strict";var b=a.i(25129);let c=a=>{let b=a.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,b,c)=>c?c.toUpperCase():b.toLowerCase());return b.charAt(0).toUpperCase()+b.slice(1)},d=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim();var e={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let f=(0,b.forwardRef)(({color:a="currentColor",size:c=24,strokeWidth:f=2,absoluteStrokeWidth:g,className:h="",children:i,iconNode:j,...k},l)=>(0,b.createElement)("svg",{ref:l,...e,width:c,height:c,stroke:a,strokeWidth:g?24*Number(f)/Number(c):f,className:d("lucide",h),...!i&&!(a=>{for(let b in a)if(b.startsWith("aria-")||"role"===b||"title"===b)return!0})(k)&&{"aria-hidden":"true"},...k},[...j.map(([a,c])=>(0,b.createElement)(a,c)),...Array.isArray(i)?i:[i]])),g=(a,e)=>{let g=(0,b.forwardRef)(({className:g,...h},i)=>(0,b.createElement)(f,{ref:i,iconNode:e,className:d(`lucide-${c(a).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${a}`,g),...h}));return g.displayName=c(a),g};a.s(["default",()=>g],57287)},55598,a=>{"use strict";let b=(0,a.i(57287).default)("shield-check",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);a.s(["ShieldCheck",()=>b],55598)},69105,a=>{"use strict";let b,c;var d,e=a.i(25129);let f={data:""},g=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,h=/\/\*[^]*?\*\/|  +/g,i=/\n+/g,j=(a,b)=>{let c="",d="",e="";for(let f in a){let g=a[f];"@"==f[0]?"i"==f[1]?c=f+" "+g+";":d+="f"==f[1]?j(g,f):f+"{"+j(g,"k"==f[1]?"":b)+"}":"object"==typeof g?d+=j(g,b?b.replace(/([^,])+/g,a=>f.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,b=>/&/.test(b)?b.replace(/&/g,a):a?a+" "+b:b)):f):null!=g&&(f=/^--/.test(f)?f:f.replace(/[A-Z]/g,"-$&").toLowerCase(),e+=j.p?j.p(f,g):f+":"+g+";")}return c+(b&&e?b+"{"+e+"}":e)+d},k={},l=a=>{if("object"==typeof a){let b="";for(let c in a)b+=c+l(a[c]);return b}return a};function m(a){let b,c,d=this||{},e=a.call?a(d.p):a;return((a,b,c,d,e)=>{var f;let m=l(a),n=k[m]||(k[m]=(a=>{let b=0,c=11;for(;b<a.length;)c=101*c+a.charCodeAt(b++)>>>0;return"go"+c})(m));if(!k[n]){let b=m!==a?a:(a=>{let b,c,d=[{}];for(;b=g.exec(a.replace(h,""));)b[4]?d.shift():b[3]?(c=b[3].replace(i," ").trim(),d.unshift(d[0][c]=d[0][c]||{})):d[0][b[1]]=b[2].replace(i," ").trim();return d[0]})(a);k[n]=j(e?{["@keyframes "+n]:b}:b,c?"":"."+n)}let o=c&&k.g?k.g:null;return c&&(k.g=k[n]),f=k[n],o?b.data=b.data.replace(o,f):-1===b.data.indexOf(f)&&(b.data=d?f+b.data:b.data+f),n})(e.unshift?e.raw?(b=[].slice.call(arguments,1),c=d.p,e.reduce((a,d,e)=>{let f=b[e];if(f&&f.call){let a=f(c),b=a&&a.props&&a.props.className||/^go/.test(a)&&a;f=b?"."+b:a&&"object"==typeof a?a.props?"":j(a,""):!1===a?"":a}return a+d+(null==f?"":f)},"")):e.reduce((a,b)=>Object.assign(a,b&&b.call?b(d.p):b),{}):e,d.target||f,d.g,d.o,d.k)}m.bind({g:1});let n,o,p,q=m.bind({k:1});function r(a,b){let c=this||{};return function(){let d=arguments;function e(f,g){let h=Object.assign({},f),i=h.className||e.className;c.p=Object.assign({theme:o&&o()},h),c.o=/ *go\d+/.test(i),h.className=m.apply(c,d)+(i?" "+i:""),b&&(h.ref=g);let j=a;return a[0]&&(j=h.as||a,delete h.as),p&&j[0]&&p(h),n(j,h)}return b?b(e):e}}var s=(a,b)=>"function"==typeof a?a(b):a,t=(b=0,()=>(++b).toString()),u="default",v=(a,b)=>{let{toastLimit:c}=a.settings;switch(b.type){case 0:return{...a,toasts:[b.toast,...a.toasts].slice(0,c)};case 1:return{...a,toasts:a.toasts.map(a=>a.id===b.toast.id?{...a,...b.toast}:a)};case 2:let{toast:d}=b;return v(a,{type:+!!a.toasts.find(a=>a.id===d.id),toast:d});case 3:let{toastId:e}=b;return{...a,toasts:a.toasts.map(a=>a.id===e||void 0===e?{...a,dismissed:!0,visible:!1}:a)};case 4:return void 0===b.toastId?{...a,toasts:[]}:{...a,toasts:a.toasts.filter(a=>a.id!==b.toastId)};case 5:return{...a,pausedAt:b.time};case 6:let f=b.time-(a.pausedAt||0);return{...a,pausedAt:void 0,toasts:a.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+f}))}}},w=[],x={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},y={},z=(a,b=u)=>{y[b]=v(y[b]||x,a),w.forEach(([a,c])=>{a===b&&c(y[b])})},A=a=>Object.keys(y).forEach(b=>z(a,b)),B=(a=u)=>b=>{z(b,a)},C=a=>(b,c)=>{let d,e=((a,b="blank",c)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:b,ariaProps:{role:"status","aria-live":"polite"},message:a,pauseDuration:0,...c,id:(null==c?void 0:c.id)||t()}))(b,a,c);return B(e.toasterId||(d=e.id,Object.keys(y).find(a=>y[a].toasts.some(a=>a.id===d))))({type:2,toast:e}),e.id},D=(a,b)=>C("blank")(a,b);D.error=C("error"),D.success=C("success"),D.loading=C("loading"),D.custom=C("custom"),D.dismiss=(a,b)=>{let c={type:3,toastId:a};b?B(b)(c):A(c)},D.dismissAll=a=>D.dismiss(void 0,a),D.remove=(a,b)=>{let c={type:4,toastId:a};b?B(b)(c):A(c)},D.removeAll=a=>D.remove(void 0,a),D.promise=(a,b,c)=>{let d=D.loading(b.loading,{...c,...null==c?void 0:c.loading});return"function"==typeof a&&(a=a()),a.then(a=>{let e=b.success?s(b.success,a):void 0;return e?D.success(e,{id:d,...c,...null==c?void 0:c.success}):D.dismiss(d),a}).catch(a=>{let e=b.error?s(b.error,a):void 0;e?D.error(e,{id:d,...c,...null==c?void 0:c.error}):D.dismiss(d)}),a};var E=q`
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
`,a.s(["default",()=>D,"toast",()=>D],69105)},50028,a=>{"use strict";let b=(0,a.i(57287).default)("circle-check",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);a.s(["CheckCircle2",()=>b],50028)},18427,a=>{"use strict";let b=(0,a.i(57287).default)("credit-card",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]);a.s(["CreditCard",()=>b],18427)},37504,a=>{"use strict";let b=(0,a.i(57287).default)("clock",[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);a.s(["Clock",()=>b],37504)},38016,a=>{"use strict";let b=(0,a.i(57287).default)("building-2",[["path",{d:"M10 12h4",key:"a56b0p"}],["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M14 21v-3a2 2 0 0 0-4 0v3",key:"1rgiei"}],["path",{d:"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",key:"secmi2"}],["path",{d:"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",key:"16ra0t"}]]);a.s(["Building2",()=>b],38016)},30248,a=>{"use strict";let b=(0,a.i(57287).default)("package",[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]]);a.s(["Package",()=>b],30248)},36973,a=>{"use strict";let b=(0,a.i(57287).default)("trending-up",[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]]);a.s(["TrendingUp",()=>b],36973)},98932,a=>{"use strict";var b=a.i(71633),c=a.i(95463),d=a.i(42573),e=a.i(142),f=a.i(60871),g=a.i(57042),h=a.i(77276),i=a.i(30248),j=a.i(37504);let k=(0,a.i(57287).default)("message-circle",[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]]);var l=a.i(38016),m=a.i(50028),n=a.i(18427),o=a.i(36973),p=a.i(55598),q=a.i(7366),r=a.i(69105);function s(){let{id:a}=(0,c.useParams)();(0,c.useRouter)();let s=(0,f.useQueryClient)(),{data:t,isLoading:u}=(0,d.useQuery)({queryKey:["rfq",a],queryFn:async()=>(await g.api.get(`/rfq/${a}`)).data,enabled:!!a}),v=(0,e.useMutation)({mutationFn:async()=>await g.api.patch(`/rfq/${a}/status`,{status:"ACCEPTED"}),onSuccess:()=>{s.invalidateQueries({queryKey:["rfq",a]}),r.toast.success("Price Agreement Finalized")}});if(u)return(0,b.jsxs)("div",{className:"min-h-screen bg-[#020617] flex flex-col items-center justify-center",children:[(0,b.jsx)("div",{className:"w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"}),(0,b.jsx)("p",{className:"text-[10px] font-black uppercase tracking-[0.3em] text-slate-500",children:"Syncing Negotiation Ledger..."})]});let w=t?.status==="NEGOTIATING"&&t?.vendorCounterPrice,x=w?t.vendorCounterPrice:t?.targetUnitPrice,y=x*t?.quantity;return(0,b.jsxs)("div",{className:"min-h-screen bg-[#F8FAFC] pb-20",children:[(0,b.jsx)("nav",{className:"bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-50",children:(0,b.jsxs)("div",{className:"max-w-7xl mx-auto flex justify-between items-center",children:[(0,b.jsxs)(q.default,{href:"/buyer/rfq",className:"flex items-center text-slate-500 hover:text-blue-600 font-bold text-xs uppercase tracking-widest transition-all",children:[(0,b.jsx)(h.ArrowLeft,{className:"mr-2 h-4 w-4"})," Back to Procurement Ledger"]}),(0,b.jsxs)("div",{className:"flex items-center gap-3",children:[(0,b.jsx)(p.ShieldCheck,{size:16,className:"text-blue-600"}),(0,b.jsx)("span",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Escrow Protected"})]})]})}),(0,b.jsxs)("div",{className:"max-w-7xl mx-auto py-12 px-8",children:[(0,b.jsx)("div",{className:"mb-10",children:t?.status==="ACCEPTED"?(0,b.jsxs)("div",{className:"bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden",children:[(0,b.jsxs)("div",{className:"relative z-10 flex items-center gap-6",children:[(0,b.jsx)("div",{className:"bg-blue-600 p-5 rounded-3xl shadow-lg shadow-blue-600/20",children:(0,b.jsx)(m.CheckCircle2,{size:32,className:"text-white"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h2",{className:"text-3xl font-[1000] tracking-tighter italic uppercase",children:"Contract Approved"}),(0,b.jsxs)("p",{className:"text-slate-400 font-medium",children:["Agreement reached at ",(0,b.jsxs)("span",{className:"text-white font-black",children:["$",x,"/unit"]}),". Secure payment required."]})]})]}),(0,b.jsxs)(q.default,{href:`/buyer/rfq/${t._id}/pay`,children:[(0,b.jsx)(n.CreditCard,{size:18})," Initiate Escrow Payment"]})]}):w?(0,b.jsxs)("div",{className:"bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-700",children:[(0,b.jsxs)("div",{className:"flex items-center gap-6",children:[(0,b.jsx)("div",{className:"bg-white/20 p-5 rounded-3xl backdrop-blur-md",children:(0,b.jsx)(o.TrendingUp,{size:32,className:"text-white"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h2",{className:"text-3xl font-[1000] tracking-tighter italic uppercase",children:"Vendor Counter-Offer"}),(0,b.jsxs)("p",{className:"text-blue-100 font-medium",children:["The vendor proposed a new rate of ",(0,b.jsxs)("span",{className:"text-white font-black",children:["$",t.vendorCounterPrice,"/unit"]}),"."]})]})]}),(0,b.jsx)("button",{onClick:()=>v.mutate(),className:"w-full md:w-auto px-10 py-5 bg-white text-blue-600 font-black rounded-2xl hover:bg-blue-50 transition-all flex items-center justify-center gap-3 shadow-xl uppercase text-xs tracking-[0.2em]",children:"Accept New Price"})]}):null}),(0,b.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-12",children:[(0,b.jsxs)("div",{className:"lg:col-span-8 space-y-8",children:[(0,b.jsxs)("div",{className:"bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm overflow-hidden relative",children:[(0,b.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 border-b border-slate-100 pb-10",children:[(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsx)("p",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Requested Volume"}),(0,b.jsxs)("p",{className:"text-3xl font-[1000] text-slate-900 tracking-tighter",children:[t?.quantity.toLocaleString()," ",(0,b.jsx)("span",{className:"text-sm font-bold text-slate-400",children:"PCS"})]})]}),(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsx)("p",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Negotiated Unit"}),(0,b.jsxs)("p",{className:"text-3xl font-[1000] text-blue-600 tracking-tighter",children:["$",x]})]}),(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsx)("p",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Total Contract"}),(0,b.jsxs)("p",{className:"text-3xl font-[1000] text-emerald-600 tracking-tighter",children:["$",y.toLocaleString()]})]})]}),(0,b.jsxs)("div",{className:"space-y-4",children:[(0,b.jsxs)("h3",{className:"flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest",children:[(0,b.jsx)(k,{size:14,className:"text-blue-500"})," Procurement Memo"]}),(0,b.jsxs)("div",{className:"bg-slate-50 rounded-2xl p-6 border border-slate-100 italic text-slate-600 leading-relaxed",children:['"',t?.message||"Standard bulk purchase agreement.",'"']})]})]}),(0,b.jsxs)("div",{className:"bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm",children:[(0,b.jsx)("h2",{className:"text-xl font-[1000] text-slate-900 mb-8 uppercase tracking-tighter italic",children:"Audit Trail"}),(0,b.jsxs)("div",{className:"space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100",children:[(0,b.jsxs)("div",{className:"relative pl-10",children:[(0,b.jsx)("div",{className:"absolute left-0 top-1 w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center border-4 border-white shadow-md",children:(0,b.jsx)(m.CheckCircle2,{size:12,className:"text-white"})}),(0,b.jsx)("p",{className:"font-black text-slate-900 text-sm",children:"RFQ Initialized"}),(0,b.jsx)("p",{className:"text-[10px] text-slate-400 font-bold uppercase",children:new Date(t?.createdAt).toLocaleString()})]}),(0,b.jsxs)("div",{className:"relative pl-10",children:[(0,b.jsx)("div",{className:`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center border-4 border-white shadow-md ${t?.status!=="PENDING"?"bg-blue-600":"bg-slate-200"}`,children:t?.status!=="PENDING"?(0,b.jsx)(m.CheckCircle2,{size:12,className:"text-white"}):(0,b.jsx)(j.Clock,{size:12,className:"text-slate-500"})}),(0,b.jsx)("p",{className:"font-black text-slate-900 text-sm",children:"Vendor Review"}),(0,b.jsx)("p",{className:"text-[10px] text-slate-400 font-bold uppercase",children:t?.status==="PENDING"?"Awaiting Dispatch...":`Actioned on ${new Date(t?.updatedAt).toLocaleDateString()}`})]})]})]})]}),(0,b.jsxs)("div",{className:"lg:col-span-4 space-y-6",children:[(0,b.jsxs)("div",{className:"bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden",children:[(0,b.jsx)("h2",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6",children:"Asset Specification"}),(0,b.jsxs)("div",{className:"flex flex-col items-center text-center",children:[(0,b.jsx)("div",{className:"w-full aspect-square bg-slate-50 rounded-3xl flex items-center justify-center overflow-hidden mb-6 border border-slate-100",children:t?.productId?.images?.[0]?(0,b.jsx)("img",{src:t.productId.images[0],className:"w-full h-full object-cover"}):(0,b.jsx)(i.Package,{size:48,className:"text-slate-200"})}),(0,b.jsx)("h3",{className:"font-black text-slate-900 text-lg mb-1",children:t?.productId?.name}),(0,b.jsxs)("p",{className:"text-xs font-bold text-blue-600 uppercase tracking-tighter mb-6",children:["SKU: ",t?.productId?._id.slice(-8)]}),(0,b.jsx)(q.default,{href:`/marketplace/${t?.productId?._id}`,className:"w-full py-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-slate-600 border border-slate-200",children:"View Original Listing"})]})]}),(0,b.jsxs)("div",{className:"bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm",children:[(0,b.jsx)("h2",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6",children:"Counterparty"}),(0,b.jsxs)("div",{className:"flex items-center gap-4 mb-6",children:[(0,b.jsx)("div",{className:"w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center",children:(0,b.jsx)(l.Building2,{size:24,className:"text-blue-600"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"text-sm font-black text-slate-900",children:t?.vendorId?.name||"Premium Vendor"}),(0,b.jsxs)("div",{className:"flex items-center gap-1 text-emerald-500",children:[(0,b.jsx)(m.CheckCircle2,{size:12}),(0,b.jsx)("span",{className:"text-[10px] font-black uppercase tracking-tighter",children:"Verified Provider"})]})]})]}),(0,b.jsx)("div",{className:"p-4 bg-amber-50 rounded-2xl border border-amber-100",children:(0,b.jsx)("p",{className:"text-[10px] text-amber-700 font-bold leading-relaxed",children:"Always keep payments within the platform to maintain Escrow Protection and dispute rights."})})]})]})]})]})]})}a.s(["default",()=>s],98932)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__f1c823cd._.js.map