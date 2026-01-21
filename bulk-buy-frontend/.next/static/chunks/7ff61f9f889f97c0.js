(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,15115,e=>{"use strict";var t=e.i(50178);let a=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,a)=>a?a.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},r=(...e)=>e.filter((e,t,a)=>!!e&&""!==e.trim()&&a.indexOf(e)===t).join(" ").trim();var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,t.forwardRef)(({color:e="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:n="",children:l,iconNode:c,...d},p)=>(0,t.createElement)("svg",{ref:p,...i,width:a,height:a,stroke:e,strokeWidth:o?24*Number(s)/Number(a):s,className:r("lucide",n),...!l&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0})(d)&&{"aria-hidden":"true"},...d},[...c.map(([e,a])=>(0,t.createElement)(e,a)),...Array.isArray(l)?l:[l]])),o=(e,i)=>{let o=(0,t.forwardRef)(({className:o,...n},l)=>(0,t.createElement)(s,{ref:l,iconNode:i,className:r(`lucide-${a(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,o),...n}));return o.displayName=a(e),o};e.s(["default",()=>o],15115)},19078,(e,t,a)=>{t.exports=e.r(81391)},18420,e=>{"use strict";let t=(0,e.i(15115).default)("shield-check",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);e.s(["ShieldCheck",()=>t],18420)},67824,e=>{"use strict";let t,a;var r,i=e.i(50178);let s={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let a="",r="",i="";for(let s in e){let o=e[s];"@"==s[0]?"i"==s[1]?a=s+" "+o+";":r+="f"==s[1]?c(o,s):s+"{"+c(o,"k"==s[1]?"":t)+"}":"object"==typeof o?r+=c(o,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=o&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=c.p?c.p(s,o):s+":"+o+";")}return a+(t&&i?t+"{"+i+"}":i)+r},d={},p=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+p(e[a]);return t}return e};function u(e){let t,a,r=this||{},i=e.call?e(r.p):e;return((e,t,a,r,i)=>{var s;let u=p(e),m=d[u]||(d[u]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(u));if(!d[m]){let t=u!==e?e:(e=>{let t,a,r=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?r.shift():t[3]?(a=t[3].replace(l," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(l," ").trim();return r[0]})(e);d[m]=c(i?{["@keyframes "+m]:t}:t,a?"":"."+m)}let f=a&&d.g?d.g:null;return a&&(d.g=d[m]),s=d[m],f?t.data=t.data.replace(f,s):-1===t.data.indexOf(s)&&(t.data=r?s+t.data:t.data+s),m})(i.unshift?i.raw?(t=[].slice.call(arguments,1),a=r.p,i.reduce((e,r,i)=>{let s=t[i];if(s&&s.call){let e=s(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==s?"":s)},"")):i.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):i,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||s})(r.target),r.g,r.o,r.k)}u.bind({g:1});let m,f,h,g=u.bind({k:1});function x(e,t){let a=this||{};return function(){let r=arguments;function i(s,o){let n=Object.assign({},s),l=n.className||i.className;a.p=Object.assign({theme:f&&f()},n),a.o=/ *go\d+/.test(l),n.className=u.apply(a,r)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),h&&c[0]&&h(n),m(c,n)}return t?t(i):i}}var y=(e,t)=>"function"==typeof e?e(t):e,b=(t=0,()=>(++t).toString()),v="default",w=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},k=[],j={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},N={},$=(e,t=v)=>{N[t]=w(N[t]||j,e),k.forEach(([e,a])=>{e===t&&a(N[t])})},E=e=>Object.keys(N).forEach(t=>$(e,t)),z=(e=v)=>t=>{$(t,e)},A=e=>(t,a)=>{let r,i=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||b()}))(t,e,a);return z(i.toasterId||(r=i.id,Object.keys(N).find(e=>N[e].toasts.some(e=>e.id===r))))({type:2,toast:i}),i.id},M=(e,t)=>A("blank")(e,t);M.error=A("error"),M.success=A("success"),M.loading=A("loading"),M.custom=A("custom"),M.dismiss=(e,t)=>{let a={type:3,toastId:e};t?z(t)(a):E(a)},M.dismissAll=e=>M.dismiss(void 0,e),M.remove=(e,t)=>{let a={type:4,toastId:e};t?z(t)(a):E(a)},M.removeAll=e=>M.remove(void 0,e),M.promise=(e,t,a)=>{let r=M.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?y(t.success,e):void 0;return i?M.success(i,{id:r,...a,...null==a?void 0:a.success}):M.dismiss(r),e}).catch(e=>{let i=t.error?y(t.error,e):void 0;i?M.error(i,{id:r,...a,...null==a?void 0:a.error}):M.dismiss(r)}),e};var C=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,S=g`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,_=g`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,O=x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${C} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${S} 0.15s ease-out forwards;
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
    animation: ${_} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,I=g`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,L=x("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${I} 1s linear infinite;
`,T=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,F=g`
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
}`,P=x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${T} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${F} 0.2s ease-out forwards;
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
`,R=x("div")`
  position: absolute;
`,V=x("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,D=g`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,G=x("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${D} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,U=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?i.createElement(G,null,t):t:"blank"===a?null:i.createElement(V,null,i.createElement(L,{...r}),"loading"!==a&&i.createElement(R,null,"error"===a?i.createElement(O,{...r}):i.createElement(P,{...r})))},q=x("div")`
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
`,B=x("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`;i.memo(({toast:e,position:t,style:r,children:s})=>{let o=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[i,s]=(()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a})()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${g(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=i.createElement(U,{toast:e}),l=i.createElement(B,{...e.ariaProps},y(e.message,e));return i.createElement(q,{className:e.className,style:{...o,...r,...e.style}},"function"==typeof s?s({icon:n,message:l}):i.createElement(i.Fragment,null,n,l))}),r=i.createElement,c.p=void 0,m=r,f=void 0,h=void 0,u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,e.s(["default",()=>M,"toast",()=>M],67824)},39554,e=>{"use strict";let t=(0,e.i(15115).default)("globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);e.s(["Globe",()=>t],39554)},20385,e=>{"use strict";var t=e.i(30483),a=e.i(50178),r=e.i(88103),i=e.i(19078),s=e.i(67824),o=e.i(17472),n=e.i(18420);let l=(0,e.i(15115).default)("cpu",[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]]);var c=e.i(39554);function d(){let e=(0,i.useSearchParams)(),d=(0,i.useRouter)();return(0,a.useEffect)(()=>{let t=e.get("token");if(!t)return void s.default.error("No authentication token found");let a=setTimeout(()=>{(0,r.verifyEmail)(t).then(()=>{s.default.success("Identity Verified. Access Granted."),d.push("/login")}).catch(e=>{s.default.error(e.response?.data?.message||"Verification Sequence Failed")})},2e3);return()=>clearTimeout(a)},[e,d]),(0,t.jsxs)("div",{className:"min-h-screen bg-[#020617] flex items-center justify-center relative overflow-hidden",children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"}),(0,t.jsx)(o.motion.div,{initial:{top:"-10%"},animate:{top:"110%"},transition:{duration:4,repeat:1/0,ease:"linear"},className:"absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20 z-0"}),(0,t.jsxs)("div",{className:"z-10 text-center",children:[(0,t.jsxs)(o.motion.div,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},className:"relative inline-block mb-10",children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse"}),(0,t.jsx)("div",{className:"relative w-24 h-24 bg-[#0F172A] border border-white/10 rounded-[2rem] flex items-center justify-center text-blue-500 shadow-2xl",children:(0,t.jsx)(l,{size:48,className:"animate-pulse"})})]}),(0,t.jsxs)("h2",{className:"text-3xl font-[1000] text-white uppercase italic tracking-tighter mb-4",children:["Verifying ",(0,t.jsx)("span",{className:"text-blue-500",children:"Node"})," Identity"]}),(0,t.jsxs)("div",{className:"flex flex-col items-center gap-6",children:[(0,t.jsx)("div",{className:"flex gap-2",children:[0,1,2].map(e=>(0,t.jsx)(o.motion.div,{animate:{opacity:[.3,1,.3]},transition:{duration:1,repeat:1/0,delay:.2*e},className:"w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"},e))}),(0,t.jsx)("div",{className:"px-6 py-2 bg-white/5 border border-white/5 rounded-full",children:(0,t.jsx)("p",{className:"text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]",children:"Establishing Secure Handshake..."})})]}),(0,t.jsxs)("div",{className:"fixed bottom-10 left-0 right-0 flex justify-center gap-8 text-slate-700",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(n.ShieldCheck,{size:14}),(0,t.jsx)("span",{className:"text-[8px] font-black uppercase tracking-widest",children:"Protocol Verified"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(c.Globe,{size:14}),(0,t.jsx)("span",{className:"text-[8px] font-black uppercase tracking-widest",children:"Global Sync"})]})]})]})]})}function p(){return(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)("div",{className:"min-h-screen bg-[#020617] flex flex-col items-center justify-center",children:(0,t.jsx)("div",{className:"w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"})}),children:(0,t.jsx)(d,{})})}e.s(["default",()=>p],20385)}]);