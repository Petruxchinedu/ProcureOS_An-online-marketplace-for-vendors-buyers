module.exports=[30370,(a,b,c)=>{"use strict";b.exports=a.r(77755).vendored.contexts.AppRouterContext},52760,(a,b,c)=>{"use strict";b.exports=a.r(77755).vendored["react-ssr"].ReactServerDOMTurbopackClient},56704,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},20635,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},12025,(a,b,c)=>{"use strict";b.exports=a.r(77755).vendored.contexts.HooksClientContext},7546,(a,b,c)=>{"use strict";b.exports=a.r(77755).vendored.contexts.ServerInsertedHtml},12979,a=>{"use strict";let b=(0,a.i(57287).default)("zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]);a.s(["Zap",()=>b],12979)},3056,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},60113,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={DEFAULT_SEGMENT_KEY:function(){return l},NOT_FOUND_SEGMENT_KEY:function(){return m},PAGE_SEGMENT_KEY:function(){return k},addSearchParamsIfPageSegment:function(){return i},computeSelectedLayoutSegment:function(){return j},getSegmentValue:function(){return f},getSelectedLayoutSegmentPath:function(){return function a(b,c,d=!0,e=[]){let g;if(d)g=b[1][c];else{let a=b[1];g=a.children??Object.values(a)[0]}if(!g)return e;let h=f(g[0]);return!h||h.startsWith(k)?e:(e.push(h),a(g,c,!1,e))}},isGroupSegment:function(){return g},isParallelRouteSegment:function(){return h}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});function f(a){return Array.isArray(a)?a[1]:a}function g(a){return"("===a[0]&&a.endsWith(")")}function h(a){return a.startsWith("@")&&"@children"!==a}function i(a,b){if(a.includes(k)){let a=JSON.stringify(b);return"{}"!==a?k+"?"+a:k}return a}function j(a,b){if(!a||0===a.length)return null;let c="children"===b?a[0]:a[a.length-1];return c===l?null:c}let k="__PAGE__",l="__DEFAULT__",m="/_not-found"},57287,a=>{"use strict";var b=a.i(25129);let c=a=>{let b=a.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,b,c)=>c?c.toUpperCase():b.toLowerCase());return b.charAt(0).toUpperCase()+b.slice(1)},d=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim();var e={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let f=(0,b.forwardRef)(({color:a="currentColor",size:c=24,strokeWidth:f=2,absoluteStrokeWidth:g,className:h="",children:i,iconNode:j,...k},l)=>(0,b.createElement)("svg",{ref:l,...e,width:c,height:c,stroke:a,strokeWidth:g?24*Number(f)/Number(c):f,className:d("lucide",h),...!i&&!(a=>{for(let b in a)if(b.startsWith("aria-")||"role"===b||"title"===b)return!0})(k)&&{"aria-hidden":"true"},...k},[...j.map(([a,c])=>(0,b.createElement)(a,c)),...Array.isArray(i)?i:[i]])),g=(a,e)=>{let g=(0,b.forwardRef)(({className:g,...h},i)=>(0,b.createElement)(f,{ref:i,iconNode:e,className:d(`lucide-${c(a).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${a}`,g),...h}));return g.displayName=c(a),g};a.s(["default",()=>g],57287)},55598,a=>{"use strict";let b=(0,a.i(57287).default)("shield-check",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);a.s(["ShieldCheck",()=>b],55598)},69105,a=>{"use strict";let b,c;var d,e=a.i(25129);let f={data:""},g=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,h=/\/\*[^]*?\*\/|  +/g,i=/\n+/g,j=(a,b)=>{let c="",d="",e="";for(let f in a){let g=a[f];"@"==f[0]?"i"==f[1]?c=f+" "+g+";":d+="f"==f[1]?j(g,f):f+"{"+j(g,"k"==f[1]?"":b)+"}":"object"==typeof g?d+=j(g,b?b.replace(/([^,])+/g,a=>f.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,b=>/&/.test(b)?b.replace(/&/g,a):a?a+" "+b:b)):f):null!=g&&(f=/^--/.test(f)?f:f.replace(/[A-Z]/g,"-$&").toLowerCase(),e+=j.p?j.p(f,g):f+":"+g+";")}return c+(b&&e?b+"{"+e+"}":e)+d},k={},l=a=>{if("object"==typeof a){let b="";for(let c in a)b+=c+l(a[c]);return b}return a};function m(a){let b,c,d=this||{},e=a.call?a(d.p):a;return((a,b,c,d,e)=>{var f;let m=l(a),n=k[m]||(k[m]=(a=>{let b=0,c=11;for(;b<a.length;)c=101*c+a.charCodeAt(b++)>>>0;return"go"+c})(m));if(!k[n]){let b=m!==a?a:(a=>{let b,c,d=[{}];for(;b=g.exec(a.replace(h,""));)b[4]?d.shift():b[3]?(c=b[3].replace(i," ").trim(),d.unshift(d[0][c]=d[0][c]||{})):d[0][b[1]]=b[2].replace(i," ").trim();return d[0]})(a);k[n]=j(e?{["@keyframes "+n]:b}:b,c?"":"."+n)}let o=c&&k.g?k.g:null;return c&&(k.g=k[n]),f=k[n],o?b.data=b.data.replace(o,f):-1===b.data.indexOf(f)&&(b.data=d?f+b.data:b.data+f),n})(e.unshift?e.raw?(b=[].slice.call(arguments,1),c=d.p,e.reduce((a,d,e)=>{let f=b[e];if(f&&f.call){let a=f(c),b=a&&a.props&&a.props.className||/^go/.test(a)&&a;f=b?"."+b:a&&"object"==typeof a?a.props?"":j(a,""):!1===a?"":a}return a+d+(null==f?"":f)},"")):e.reduce((a,b)=>Object.assign(a,b&&b.call?b(d.p):b),{}):e,d.target||f,d.g,d.o,d.k)}m.bind({g:1});let n,o,p,q=m.bind({k:1});function r(a,b){let c=this||{};return function(){let d=arguments;function e(f,g){let h=Object.assign({},f),i=h.className||e.className;c.p=Object.assign({theme:o&&o()},h),c.o=/ *go\d+/.test(i),h.className=m.apply(c,d)+(i?" "+i:""),b&&(h.ref=g);let j=a;return a[0]&&(j=h.as||a,delete h.as),p&&j[0]&&p(h),n(j,h)}return b?b(e):e}}var s=(a,b)=>"function"==typeof a?a(b):a,t=(b=0,()=>(++b).toString()),u="default",v=(a,b)=>{let{toastLimit:c}=a.settings;switch(b.type){case 0:return{...a,toasts:[b.toast,...a.toasts].slice(0,c)};case 1:return{...a,toasts:a.toasts.map(a=>a.id===b.toast.id?{...a,...b.toast}:a)};case 2:let{toast:d}=b;return v(a,{type:+!!a.toasts.find(a=>a.id===d.id),toast:d});case 3:let{toastId:e}=b;return{...a,toasts:a.toasts.map(a=>a.id===e||void 0===e?{...a,dismissed:!0,visible:!1}:a)};case 4:return void 0===b.toastId?{...a,toasts:[]}:{...a,toasts:a.toasts.filter(a=>a.id!==b.toastId)};case 5:return{...a,pausedAt:b.time};case 6:let f=b.time-(a.pausedAt||0);return{...a,pausedAt:void 0,toasts:a.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+f}))}}},w=[],x={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},y={},z=(a,b=u)=>{y[b]=v(y[b]||x,a),w.forEach(([a,c])=>{a===b&&c(y[b])})},A=a=>Object.keys(y).forEach(b=>z(a,b)),B=(a=u)=>b=>{z(b,a)},C=a=>(b,c)=>{let d,e=((a,b="blank",c)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:b,ariaProps:{role:"status","aria-live":"polite"},message:a,pauseDuration:0,...c,id:(null==c?void 0:c.id)||t()}))(b,a,c);return B(e.toasterId||(d=e.id,Object.keys(y).find(a=>y[a].toasts.some(a=>a.id===d))))({type:2,toast:e}),e.id},D=(a,b)=>C("blank")(a,b);D.error=C("error"),D.success=C("success"),D.loading=C("loading"),D.custom=C("custom"),D.dismiss=(a,b)=>{let c={type:3,toastId:a};b?B(b)(c):A(c)},D.dismissAll=a=>D.dismiss(void 0,a),D.remove=(a,b)=>{let c={type:4,toastId:a};b?B(b)(c):A(c)},D.removeAll=a=>D.remove(void 0,a),D.promise=(a,b,c)=>{let d=D.loading(b.loading,{...c,...null==c?void 0:c.loading});return"function"==typeof a&&(a=a()),a.then(a=>{let e=b.success?s(b.success,a):void 0;return e?D.success(e,{id:d,...c,...null==c?void 0:c.success}):D.dismiss(d),a}).catch(a=>{let e=b.error?s(b.error,a):void 0;e?D.error(e,{id:d,...c,...null==c?void 0:c.error}):D.dismiss(d)}),a};var E=q`
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
`,a.s(["default",()=>D,"toast",()=>D],69105)},25113,a=>{"use strict";let b=(0,a.i(57287).default)("lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);a.s(["Lock",()=>b],25113)},70552,a=>{"use strict";let b=(0,a.i(57287).default)("globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);a.s(["Globe",()=>b],70552)},45603,a=>{"use strict";let b=(0,a.i(57287).default)("mail",[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]]);a.s(["Mail",()=>b],45603)},38016,a=>{"use strict";let b=(0,a.i(57287).default)("building-2",[["path",{d:"M10 12h4",key:"a56b0p"}],["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M14 21v-3a2 2 0 0 0-4 0v3",key:"1rgiei"}],["path",{d:"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",key:"secmi2"}],["path",{d:"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",key:"16ra0t"}]]);a.s(["Building2",()=>b],38016)},23774,a=>{"use strict";let b=(0,a.i(57287).default)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);a.s(["ChevronRight",()=>b],23774)},56779,a=>{"use strict";var b=a.i(71633),c=a.i(78452),d=a.i(61383),e=a.i(70543),f=a.i(3777),g=a.i(69105),h=a.i(95463),i=a.i(7366),j=a.i(25129),k=a.i(14717),l=a.i(38016),m=a.i(45603),n=a.i(25113),o=a.i(57287);let p=(0,o.default)("user-plus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);var q=a.i(12979),r=a.i(55598),s=a.i(70552);let t=(0,o.default)("briefcase",[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);var u=a.i(23774);let v=d.z.object({email:d.z.string().email("Please enter a valid corporate email"),password:d.z.string().min(6,"Security key must be at least 6 characters"),organizationName:d.z.string().min(2,"Legal entity name is required"),role:d.z.enum(["BUYER","VENDOR"])});function w(){let a=(0,h.useRouter)(),[d,o]=(0,j.useState)(!1),{register:w,handleSubmit:x,watch:y,setValue:z,formState:{errors:A}}=(0,c.useForm)({resolver:(0,e.zodResolver)(v),defaultValues:{role:"BUYER"}}),B=y("role"),C=async b=>{o(!0);try{await (0,f.registerUser)(b),g.default.success("Identity Created. Please verify your email."),a.push("/login")}catch(a){g.default.error(a.response?.data?.message||"Registration sequence failed")}finally{o(!1)}};return(0,b.jsxs)("div",{className:"min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden px-4 py-20",children:[(0,b.jsx)("div",{className:"absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"}),(0,b.jsx)("div",{className:"absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"}),(0,b.jsx)("div",{className:"absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"}),(0,b.jsxs)(k.motion.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},className:"max-w-2xl w-full z-10",children:[(0,b.jsxs)("div",{className:"flex flex-col items-center mb-10 text-center",children:[(0,b.jsx)("div",{className:"w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/20 mb-6 transform -rotate-6",children:(0,b.jsx)(p,{size:28})}),(0,b.jsxs)("h1",{className:"text-4xl font-[1000] tracking-tighter text-white uppercase italic leading-none",children:["Onboard ",(0,b.jsx)("span",{className:"text-blue-500",children:"Protocol"})]}),(0,b.jsx)("p",{className:"text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-3",children:"Register your enterprise on ProcureOS"})]}),(0,b.jsxs)("div",{className:"bg-[#0F172A]/80 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white/5 shadow-2xl",children:[(0,b.jsxs)("form",{onSubmit:x(C),className:"space-y-8",children:[(0,b.jsxs)("div",{className:"grid grid-cols-2 gap-4 p-1.5 bg-black/40 rounded-3xl border border-white/5",children:[(0,b.jsxs)("button",{type:"button",onClick:()=>z("role","BUYER"),className:`flex items-center justify-center gap-2 py-4 rounded-[1.4rem] text-[10px] font-black uppercase tracking-widest transition-all ${"BUYER"===B?"bg-blue-600 text-white shadow-lg shadow-blue-600/20":"text-slate-500 hover:text-white"}`,children:[(0,b.jsx)(t,{size:14})," Global Buyer"]}),(0,b.jsxs)("button",{type:"button",onClick:()=>z("role","VENDOR"),className:`flex items-center justify-center gap-2 py-4 rounded-[1.4rem] text-[10px] font-black uppercase tracking-widest transition-all ${"VENDOR"===B?"bg-indigo-600 text-white shadow-lg shadow-indigo-600/20":"text-slate-500 hover:text-white"}`,children:[(0,b.jsx)(q.Zap,{size:14})," Enterprise Vendor"]})]}),(0,b.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsx)("label",{className:"text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1",children:"Legal Organization"}),(0,b.jsxs)("div",{className:"relative",children:[(0,b.jsx)(l.Building2,{className:"absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"}),(0,b.jsx)("input",{...w("organizationName"),className:"w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all",placeholder:"Acme Global Inc."})]}),A.organizationName&&(0,b.jsx)("p",{className:"text-red-400 text-[9px] font-bold uppercase mt-1 ml-1",children:A.organizationName.message})]}),(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsx)("label",{className:"text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1",children:"Corporate Email"}),(0,b.jsxs)("div",{className:"relative",children:[(0,b.jsx)(m.Mail,{className:"absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"}),(0,b.jsx)("input",{...w("email"),type:"email",className:"w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all",placeholder:"hq@acme.com"})]}),A.email&&(0,b.jsx)("p",{className:"text-red-400 text-[9px] font-bold uppercase mt-1 ml-1",children:A.email.message})]}),(0,b.jsxs)("div",{className:"md:col-span-2 space-y-2",children:[(0,b.jsx)("label",{className:"text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1",children:"Secret Access Key"}),(0,b.jsxs)("div",{className:"relative",children:[(0,b.jsx)(n.Lock,{className:"absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"}),(0,b.jsx)("input",{...w("password"),type:"password",className:"w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all",placeholder:"••••••••••••"})]}),A.password&&(0,b.jsx)("p",{className:"text-red-400 text-[9px] font-bold uppercase mt-1 ml-1",children:A.password.message})]})]}),(0,b.jsxs)("button",{type:"submit",disabled:d,className:"w-full group bg-white text-black py-5 rounded-[1.8rem] font-[1000] text-xs uppercase tracking-[0.3em] hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-3 disabled:opacity-50",children:[d?"Processing Data...":"Initialize Onboarding",(0,b.jsx)(u.ChevronRight,{size:18,className:"group-hover:translate-x-1 transition-transform"})]})]}),(0,b.jsx)("div",{className:"mt-10 pt-8 border-t border-white/5 text-center",children:(0,b.jsxs)("p",{className:"text-slate-500 text-[10px] font-black uppercase tracking-widest",children:["Already Authorized? ",(0,b.jsx)(i.default,{href:"/login",className:"text-blue-500 hover:text-white transition-colors ml-2",children:"Authenticate Here"})]})})]}),(0,b.jsxs)("div",{className:"mt-10 flex flex-wrap justify-center gap-8 text-slate-600",children:[(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)(r.ShieldCheck,{size:14,className:"text-blue-500/50"}),(0,b.jsx)("span",{className:"text-[8px] font-black uppercase tracking-widest",children:"Enterprise Verified"})]}),(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)(s.Globe,{size:14,className:"text-blue-500/50"}),(0,b.jsx)("span",{className:"text-[8px] font-black uppercase tracking-widest",children:"25+ Trade Corridors"})]})]})]})]})}a.s(["default",()=>w],56779)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__5d548aed._.js.map