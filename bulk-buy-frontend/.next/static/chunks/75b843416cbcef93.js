(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,15115,e=>{"use strict";var t=e.i(50178);let a=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,a)=>a?a.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},r=(...e)=>e.filter((e,t,a)=>!!e&&""!==e.trim()&&a.indexOf(e)===t).join(" ").trim();var s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let i=(0,t.forwardRef)(({color:e="currentColor",size:a=24,strokeWidth:i=2,absoluteStrokeWidth:o,className:l="",children:n,iconNode:c,...d},p)=>(0,t.createElement)("svg",{ref:p,...s,width:a,height:a,stroke:e,strokeWidth:o?24*Number(i)/Number(a):i,className:r("lucide",l),...!n&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0})(d)&&{"aria-hidden":"true"},...d},[...c.map(([e,a])=>(0,t.createElement)(e,a)),...Array.isArray(n)?n:[n]])),o=(e,s)=>{let o=(0,t.forwardRef)(({className:o,...l},n)=>(0,t.createElement)(i,{ref:n,iconNode:s,className:r(`lucide-${a(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,o),...l}));return o.displayName=a(e),o};e.s(["default",()=>o],15115)},19078,(e,t,a)=>{t.exports=e.r(81391)},18420,e=>{"use strict";let t=(0,e.i(15115).default)("shield-check",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);e.s(["ShieldCheck",()=>t],18420)},67824,e=>{"use strict";let t,a;var r,s=e.i(50178);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,c=(e,t)=>{let a="",r="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+o+";":r+="f"==i[1]?c(o,i):i+"{"+c(o,"k"==i[1]?"":t)+"}":"object"==typeof o?r+=c(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=c.p?c.p(i,o):i+":"+o+";")}return a+(t&&s?t+"{"+s+"}":s)+r},d={},p=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+p(e[a]);return t}return e};function u(e){let t,a,r=this||{},s=e.call?e(r.p):e;return((e,t,a,r,s)=>{var i;let u=p(e),m=d[u]||(d[u]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(u));if(!d[m]){let t=u!==e?e:(e=>{let t,a,r=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?r.shift():t[3]?(a=t[3].replace(n," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(n," ").trim();return r[0]})(e);d[m]=c(s?{["@keyframes "+m]:t}:t,a?"":"."+m)}let f=a&&d.g?d.g:null;return a&&(d.g=d[m]),i=d[m],f?t.data=t.data.replace(f,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),m})(s.unshift?s.raw?(t=[].slice.call(arguments,1),a=r.p,s.reduce((e,r,s)=>{let i=t[s];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(r.target),r.g,r.o,r.k)}u.bind({g:1});let m,f,h,x=u.bind({k:1});function b(e,t){let a=this||{};return function(){let r=arguments;function s(i,o){let l=Object.assign({},i),n=l.className||s.className;a.p=Object.assign({theme:f&&f()},l),a.o=/ *go\d+/.test(n),l.className=u.apply(a,r)+(n?" "+n:""),t&&(l.ref=o);let c=e;return e[0]&&(c=l.as||e,delete l.as),h&&c[0]&&h(l),m(c,l)}return t?t(s):s}}var y=(e,t)=>"function"==typeof e?e(t):e,g=(t=0,()=>(++t).toString()),w="default",v=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return v(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},k=[],j={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},N={},z=(e,t=w)=>{N[t]=v(N[t]||j,e),k.forEach(([e,a])=>{e===t&&a(N[t])})},$=e=>Object.keys(N).forEach(t=>z(e,t)),C=(e=w)=>t=>{z(t,e)},A=e=>(t,a)=>{let r,s=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||g()}))(t,e,a);return C(s.toasterId||(r=s.id,Object.keys(N).find(e=>N[e].toasts.some(e=>e.id===r))))({type:2,toast:s}),s.id},E=(e,t)=>A("blank")(e,t);E.error=A("error"),E.success=A("success"),E.loading=A("loading"),E.custom=A("custom"),E.dismiss=(e,t)=>{let a={type:3,toastId:e};t?C(t)(a):$(a)},E.dismissAll=e=>E.dismiss(void 0,e),E.remove=(e,t)=>{let a={type:4,toastId:e};t?C(t)(a):$(a)},E.removeAll=e=>E.remove(void 0,e),E.promise=(e,t,a)=>{let r=E.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?y(t.success,e):void 0;return s?E.success(s,{id:r,...a,...null==a?void 0:a.success}):E.dismiss(r),e}).catch(e=>{let s=t.error?y(t.error,e):void 0;s?E.error(s,{id:r,...a,...null==a?void 0:a.error}):E.dismiss(r)}),e};var S=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,M=x`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,P=x`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,L=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${S} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${M} 0.15s ease-out forwards;
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
    animation: ${P} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,O=x`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,R=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${O} 1s linear infinite;
`,F=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,_=x`
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
}`,T=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,I=b("div")`
  position: absolute;
`,K=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,U=x`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,D=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${U} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,V=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?s.createElement(D,null,t):t:"blank"===a?null:s.createElement(K,null,s.createElement(R,{...r}),"loading"!==a&&s.createElement(I,null,"error"===a?s.createElement(L,{...r}):s.createElement(T,{...r})))},B=b("div")`
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
`;s.memo(({toast:e,position:t,style:r,children:i})=>{let o=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,i]=(()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a})()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${x(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${x(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},l=s.createElement(V,{toast:e}),n=s.createElement(W,{...e.ariaProps},y(e.message,e));return s.createElement(B,{className:e.className,style:{...o,...r,...e.style}},"function"==typeof i?i({icon:l,message:n}):s.createElement(s.Fragment,null,l,n))}),r=s.createElement,c.p=void 0,m=r,f=void 0,h=void 0,u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,e.s(["default",()=>E,"toast",()=>E],67824)},74390,e=>{"use strict";let t=(0,e.i(15115).default)("lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);e.s(["Lock",()=>t],74390)},30617,e=>{"use strict";let t=(0,e.i(15115).default)("refresh-cw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);e.s(["RefreshCw",()=>t],30617)},29237,e=>{"use strict";var t=e.i(30483),a=e.i(8885),r=e.i(19078),s=e.i(50178),i=e.i(71397),o=e.i(35609),l=e.i(67824),n=e.i(88103),c=e.i(74390),d=e.i(15115);let p=(0,d.default)("eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),u=(0,d.default)("eye-off",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);var m=e.i(18420);let f=(0,d.default)("key-round",[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]]);var h=e.i(30617),x=e.i(17472);let b=i.z.object({password:i.z.string().min(6,"Security key must be at least 6 characters"),confirmPassword:i.z.string()}).refine(e=>e.password===e.confirmPassword,{message:"Security keys do not match",path:["confirmPassword"]});function y(){let e=(0,r.useSearchParams)(),i=(0,r.useRouter)(),d=e.get("token"),[y,g]=(0,s.useState)(!1),[w,v]=(0,s.useState)(!1),{register:k,handleSubmit:j,formState:{errors:N}}=(0,a.useForm)({resolver:(0,o.zodResolver)(b)}),z=async e=>{if(!d)return void l.default.error("Security Token Missing");v(!0);try{await (0,n.resetPassword)({token:d,password:e.password}),l.default.success("Security Key Re-established."),i.push("/login")}catch(e){l.default.error(e.response?.data?.message||"Protocol Override Failed")}finally{v(!1)}};return(0,t.jsxs)("div",{className:"min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden px-4",children:[(0,t.jsx)("div",{className:"absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"}),(0,t.jsx)("div",{className:"absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"}),(0,t.jsx)(x.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"max-w-md w-full z-10",children:(0,t.jsxs)("div",{className:"bg-[#0F172A]/80 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative",children:[(0,t.jsxs)("div",{className:"text-center mb-10",children:[(0,t.jsx)("div",{className:"inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl border border-blue-500/20 mb-6 transform -rotate-3",children:(0,t.jsx)(f,{size:32})}),(0,t.jsx)("h1",{className:"text-2xl font-[1000] text-white uppercase italic tracking-tighter",children:"Override Access"}),(0,t.jsx)("p",{className:"text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2",children:"Establish new security credentials"})]}),(0,t.jsxs)("form",{onSubmit:j(z),className:"space-y-6",children:[(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1",children:"New Access Key"}),(0,t.jsxs)("div",{className:"relative group",children:[(0,t.jsx)(c.Lock,{className:"absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors"}),(0,t.jsx)("input",{type:y?"text":"password",...k("password"),className:"w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-12 py-4 text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 transition-all",placeholder:"••••••••"}),(0,t.jsx)("button",{type:"button",onClick:()=>g(!y),className:"absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white",children:y?(0,t.jsx)(u,{size:18}):(0,t.jsx)(p,{size:18})})]}),N.password&&(0,t.jsx)("p",{className:"text-red-400 text-[9px] font-bold uppercase mt-1 ml-1",children:N.password.message})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1",children:"Verify Key"}),(0,t.jsxs)("div",{className:"relative group",children:[(0,t.jsx)(m.ShieldCheck,{className:"absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors"}),(0,t.jsx)("input",{type:"password",...k("confirmPassword"),className:"w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 transition-all",placeholder:"••••••••"})]}),N.confirmPassword&&(0,t.jsx)("p",{className:"text-red-400 text-[9px] font-bold uppercase mt-1 ml-1",children:N.confirmPassword.message})]}),(0,t.jsx)("button",{type:"submit",disabled:w,className:"w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-500/20 flex justify-center items-center gap-2 disabled:opacity-50",children:w?(0,t.jsx)(h.RefreshCw,{className:"animate-spin",size:16}):"Update Credentials"})]})]})})]})}function g(){return(0,t.jsx)(s.Suspense,{fallback:(0,t.jsx)("div",{className:"min-h-screen bg-[#020617]"}),children:(0,t.jsx)(y,{})})}e.s(["default",()=>g],29237)}]);