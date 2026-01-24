module.exports=[56704,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},20635,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},12025,(a,b,c)=>{"use strict";b.exports=a.r(77755).vendored.contexts.HooksClientContext},7546,(a,b,c)=>{"use strict";b.exports=a.r(77755).vendored.contexts.ServerInsertedHtml},12979,a=>{"use strict";let b=(0,a.i(57287).default)("zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]);a.s(["Zap",()=>b],12979)},77276,a=>{"use strict";let b=(0,a.i(57287).default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);a.s(["ArrowLeft",()=>b],77276)},57287,a=>{"use strict";var b=a.i(25129);let c=a=>{let b=a.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,b,c)=>c?c.toUpperCase():b.toLowerCase());return b.charAt(0).toUpperCase()+b.slice(1)},d=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim();var e={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let f=(0,b.forwardRef)(({color:a="currentColor",size:c=24,strokeWidth:f=2,absoluteStrokeWidth:g,className:h="",children:i,iconNode:j,...k},l)=>(0,b.createElement)("svg",{ref:l,...e,width:c,height:c,stroke:a,strokeWidth:g?24*Number(f)/Number(c):f,className:d("lucide",h),...!i&&!(a=>{for(let b in a)if(b.startsWith("aria-")||"role"===b||"title"===b)return!0})(k)&&{"aria-hidden":"true"},...k},[...j.map(([a,c])=>(0,b.createElement)(a,c)),...Array.isArray(i)?i:[i]])),g=(a,e)=>{let g=(0,b.forwardRef)(({className:g,...h},i)=>(0,b.createElement)(f,{ref:i,iconNode:e,className:d(`lucide-${c(a).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${a}`,g),...h}));return g.displayName=c(a),g};a.s(["default",()=>g],57287)},55598,a=>{"use strict";let b=(0,a.i(57287).default)("shield-check",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);a.s(["ShieldCheck",()=>b],55598)},69105,a=>{"use strict";let b,c;var d,e=a.i(25129);let f={data:""},g=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,h=/\/\*[^]*?\*\/|  +/g,i=/\n+/g,j=(a,b)=>{let c="",d="",e="";for(let f in a){let g=a[f];"@"==f[0]?"i"==f[1]?c=f+" "+g+";":d+="f"==f[1]?j(g,f):f+"{"+j(g,"k"==f[1]?"":b)+"}":"object"==typeof g?d+=j(g,b?b.replace(/([^,])+/g,a=>f.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,b=>/&/.test(b)?b.replace(/&/g,a):a?a+" "+b:b)):f):null!=g&&(f=/^--/.test(f)?f:f.replace(/[A-Z]/g,"-$&").toLowerCase(),e+=j.p?j.p(f,g):f+":"+g+";")}return c+(b&&e?b+"{"+e+"}":e)+d},k={},l=a=>{if("object"==typeof a){let b="";for(let c in a)b+=c+l(a[c]);return b}return a};function m(a){let b,c,d=this||{},e=a.call?a(d.p):a;return((a,b,c,d,e)=>{var f;let m=l(a),n=k[m]||(k[m]=(a=>{let b=0,c=11;for(;b<a.length;)c=101*c+a.charCodeAt(b++)>>>0;return"go"+c})(m));if(!k[n]){let b=m!==a?a:(a=>{let b,c,d=[{}];for(;b=g.exec(a.replace(h,""));)b[4]?d.shift():b[3]?(c=b[3].replace(i," ").trim(),d.unshift(d[0][c]=d[0][c]||{})):d[0][b[1]]=b[2].replace(i," ").trim();return d[0]})(a);k[n]=j(e?{["@keyframes "+n]:b}:b,c?"":"."+n)}let o=c&&k.g?k.g:null;return c&&(k.g=k[n]),f=k[n],o?b.data=b.data.replace(o,f):-1===b.data.indexOf(f)&&(b.data=d?f+b.data:b.data+f),n})(e.unshift?e.raw?(b=[].slice.call(arguments,1),c=d.p,e.reduce((a,d,e)=>{let f=b[e];if(f&&f.call){let a=f(c),b=a&&a.props&&a.props.className||/^go/.test(a)&&a;f=b?"."+b:a&&"object"==typeof a?a.props?"":j(a,""):!1===a?"":a}return a+d+(null==f?"":f)},"")):e.reduce((a,b)=>Object.assign(a,b&&b.call?b(d.p):b),{}):e,d.target||f,d.g,d.o,d.k)}m.bind({g:1});let n,o,p,q=m.bind({k:1});function r(a,b){let c=this||{};return function(){let d=arguments;function e(f,g){let h=Object.assign({},f),i=h.className||e.className;c.p=Object.assign({theme:o&&o()},h),c.o=/ *go\d+/.test(i),h.className=m.apply(c,d)+(i?" "+i:""),b&&(h.ref=g);let j=a;return a[0]&&(j=h.as||a,delete h.as),p&&j[0]&&p(h),n(j,h)}return b?b(e):e}}var s=(a,b)=>"function"==typeof a?a(b):a,t=(b=0,()=>(++b).toString()),u="default",v=(a,b)=>{let{toastLimit:c}=a.settings;switch(b.type){case 0:return{...a,toasts:[b.toast,...a.toasts].slice(0,c)};case 1:return{...a,toasts:a.toasts.map(a=>a.id===b.toast.id?{...a,...b.toast}:a)};case 2:let{toast:d}=b;return v(a,{type:+!!a.toasts.find(a=>a.id===d.id),toast:d});case 3:let{toastId:e}=b;return{...a,toasts:a.toasts.map(a=>a.id===e||void 0===e?{...a,dismissed:!0,visible:!1}:a)};case 4:return void 0===b.toastId?{...a,toasts:[]}:{...a,toasts:a.toasts.filter(a=>a.id!==b.toastId)};case 5:return{...a,pausedAt:b.time};case 6:let f=b.time-(a.pausedAt||0);return{...a,pausedAt:void 0,toasts:a.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+f}))}}},w=[],x={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},y={},z=(a,b=u)=>{y[b]=v(y[b]||x,a),w.forEach(([a,c])=>{a===b&&c(y[b])})},A=a=>Object.keys(y).forEach(b=>z(a,b)),B=(a=u)=>b=>{z(b,a)},C=a=>(b,c)=>{let d,e=((a,b="blank",c)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:b,ariaProps:{role:"status","aria-live":"polite"},message:a,pauseDuration:0,...c,id:(null==c?void 0:c.id)||t()}))(b,a,c);return B(e.toasterId||(d=e.id,Object.keys(y).find(a=>y[a].toasts.some(a=>a.id===d))))({type:2,toast:e}),e.id},D=(a,b)=>C("blank")(a,b);D.error=C("error"),D.success=C("success"),D.loading=C("loading"),D.custom=C("custom"),D.dismiss=(a,b)=>{let c={type:3,toastId:a};b?B(b)(c):A(c)},D.dismissAll=a=>D.dismiss(void 0,a),D.remove=(a,b)=>{let c={type:4,toastId:a};b?B(b)(c):A(c)},D.removeAll=a=>D.remove(void 0,a),D.promise=(a,b,c)=>{let d=D.loading(b.loading,{...c,...null==c?void 0:c.loading});return"function"==typeof a&&(a=a()),a.then(a=>{let e=b.success?s(b.success,a):void 0;return e?D.success(e,{id:d,...c,...null==c?void 0:c.success}):D.dismiss(d),a}).catch(a=>{let e=b.error?s(b.error,a):void 0;e?D.error(e,{id:d,...c,...null==c?void 0:c.error}):D.dismiss(d)}),a};var E=q`
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
`,a.s(["default",()=>D,"toast",()=>D],69105)},43740,a=>{"use strict";let b=(0,a.i(57287).default)("dollar-sign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);a.s(["DollarSign",()=>b],43740)},69784,a=>{"use strict";let b=(0,a.i(57287).default)("message-square",[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]]);a.s(["MessageSquare",()=>b],69784)},30248,a=>{"use strict";let b=(0,a.i(57287).default)("package",[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]]);a.s(["Package",()=>b],30248)},36973,a=>{"use strict";let b=(0,a.i(57287).default)("trending-up",[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]]);a.s(["TrendingUp",()=>b],36973)},953,a=>{"use strict";let b=(0,a.i(57287).default)("refresh-ccw",[["path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"14sxne"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",key:"1hlbsb"}],["path",{d:"M16 16h5v5",key:"ccwih5"}]]);a.s(["RefreshCcw",()=>b],953)},83544,a=>{"use strict";var b=a.i(71633),c=a.i(25129),d=a.i(42573),e=a.i(142),f=a.i(60871),g=a.i(95463),h=a.i(57042),i=a.i(69105),j=a.i(77276),k=a.i(57287);let l=(0,k.default)("circle-check-big",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);var m=a.i(30248);let n=(0,k.default)("user",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);var o=a.i(43740),p=a.i(69784),q=a.i(55598),r=a.i(12979),s=a.i(36973),t=a.i(953),u=a.i(7366);function v(){let{id:a}=(0,g.useParams)(),k=(0,g.useRouter)(),v=(0,f.useQueryClient)(),[w,x]=(0,c.useState)(!1),[y,z]=(0,c.useState)(""),{data:A,isLoading:B}=(0,d.useQuery)({queryKey:["rfq-detail",a],queryFn:async()=>(await h.api.get(`/rfq/${a}`)).data}),C=(0,e.useMutation)({mutationFn:async({status:b,price:c})=>await h.api.patch(`/rfq/${a}/status`,{status:b,vendorCounterPrice:c}),onSuccess:()=>{v.invalidateQueries({queryKey:["rfq-detail",a]}),i.toast.success("Terminal Updated Successfully"),k.push("/vendor/rfq")},onError:a=>{i.toast.error(a.response?.data?.message||"Transmission Error")}});if(B)return(0,b.jsxs)("div",{className:"min-h-screen bg-[#020617] flex flex-col items-center justify-center",children:[(0,b.jsx)("div",{className:"w-16 h-16 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin mb-4"}),(0,b.jsx)("p",{className:"text-[10px] font-black uppercase tracking-[0.4em] text-blue-500/50",children:"Accessing Secure Lead..."})]});if(!A)return(0,b.jsx)("div",{className:"p-20 text-center text-white font-black",children:"RFQ DATA NOT FOUND."});let D=A.quantity*A.targetUnitPrice,E=A.productId;return(0,b.jsxs)("div",{className:"min-h-screen bg-[#020617] text-slate-100 pb-24",children:[(0,b.jsx)("div",{className:"bg-[#0F172A]/80 border-b border-blue-900/30 px-8 py-6 sticky top-0 z-50 backdrop-blur-xl",children:(0,b.jsxs)("div",{className:"max-w-7xl mx-auto flex justify-between items-center",children:[(0,b.jsxs)(u.default,{href:"/vendor/rfq",className:"flex items-center gap-2 group",children:[(0,b.jsx)("div",{className:"p-2 bg-blue-900/20 rounded-lg group-hover:bg-blue-800/40 border border-blue-800/20 transition-all",children:(0,b.jsx)(j.ArrowLeft,{size:16,className:"text-blue-400"})}),(0,b.jsx)("span",{className:"text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-400",children:"Exit Terminal"})]}),(0,b.jsxs)("div",{className:"flex items-center gap-3 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20",children:[(0,b.jsx)(q.ShieldCheck,{size:14,className:"text-emerald-400"}),(0,b.jsx)("span",{className:"text-[9px] font-black uppercase tracking-widest text-emerald-400",children:"Identity Verified"})]})]})}),(0,b.jsxs)("main",{className:"max-w-6xl mx-auto px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12",children:[(0,b.jsxs)("div",{className:"lg:col-span-7 space-y-8",children:[(0,b.jsx)("div",{className:"bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-[3rem] border border-blue-900/30 overflow-hidden shadow-2xl p-8",children:(0,b.jsxs)("div",{className:"flex flex-col md:flex-row gap-8 items-center",children:[(0,b.jsx)("div",{className:"w-full md:w-48 h-48 bg-black/40 rounded-[2rem] border border-white/5 overflow-hidden flex-shrink-0",children:E?.images?.[0]?(0,b.jsx)("img",{src:E.images[0],alt:E.name,className:"w-full h-full object-cover"}):(0,b.jsx)("div",{className:"w-full h-full flex items-center justify-center text-blue-500/20",children:(0,b.jsx)(m.Package,{size:64})})}),(0,b.jsxs)("div",{className:"flex-1",children:[(0,b.jsxs)("div",{className:"flex items-center gap-2 mb-3",children:[(0,b.jsx)("span",{className:"px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[8px] font-black text-blue-400 uppercase tracking-widest",children:"Selected Asset"}),(0,b.jsxs)("span",{className:"text-slate-500 text-[10px] font-bold",children:["Category: ",E?.category||"Industrial"]})]}),(0,b.jsx)("h2",{className:"text-3xl font-[1000] tracking-tighter text-white uppercase italic leading-tight",children:E?.name||"Unknown Product"}),(0,b.jsxs)("div",{className:"grid grid-cols-2 gap-4 mt-6",children:[(0,b.jsxs)("div",{className:"bg-black/20 p-4 rounded-2xl border border-white/5",children:[(0,b.jsx)("p",{className:"text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1",children:"Market Price"}),(0,b.jsxs)("p",{className:"text-lg font-black text-white",children:["$",E?.pricePerUnit||0]})]}),(0,b.jsxs)("div",{className:"bg-black/20 p-4 rounded-2xl border border-white/5",children:[(0,b.jsx)("p",{className:"text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1",children:"In Stock"}),(0,b.jsxs)("p",{className:"text-lg font-black text-blue-400",children:[E?.stock||0," Units"]})]})]})]})]})}),(0,b.jsxs)("div",{className:"bg-[#0F172A] rounded-[3rem] border border-blue-900/30 overflow-hidden shadow-2xl",children:[(0,b.jsxs)("div",{className:"p-10 border-b border-blue-900/20 flex justify-between items-start",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h1",{className:"text-4xl font-[1000] tracking-tighter text-white uppercase italic",children:"Deal Analysis"}),(0,b.jsxs)("p",{className:"text-blue-400/60 text-xs font-black tracking-[0.2em] mt-2",children:["UUID: ",A._id.slice(-12)]})]}),(0,b.jsx)("div",{className:`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase border ${"PENDING"===A.status?"bg-amber-500/10 border-amber-500/20 text-amber-500":"bg-blue-500/10 border-blue-500/20 text-blue-500"}`,children:A.status})]}),(0,b.jsxs)("div",{className:"p-10",children:[(0,b.jsxs)("div",{className:"grid grid-cols-2 gap-6 mb-10",children:[(0,b.jsxs)("div",{className:"bg-[#1E293B]/40 p-6 rounded-[2rem] border border-blue-900/10 relative overflow-hidden group",children:[(0,b.jsx)(m.Package,{className:"absolute -right-2 -bottom-2 w-16 h-16 text-white/5 group-hover:text-blue-500/10 transition-colors"}),(0,b.jsx)("p",{className:"text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2",children:"Requested Volume"}),(0,b.jsxs)("p",{className:"text-3xl font-black text-white",children:[A.quantity.toLocaleString()," ",(0,b.jsx)("span",{className:"text-xs text-slate-500",children:"Units"})]})]}),(0,b.jsxs)("div",{className:"bg-[#1E293B]/40 p-6 rounded-[2rem] border border-blue-900/10",children:[(0,b.jsx)("p",{className:"text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2",children:"Proposed Unit Price"}),(0,b.jsxs)("p",{className:"text-3xl font-black text-white",children:["$",A.targetUnitPrice]})]})]}),(0,b.jsxs)("div",{className:"flex items-center gap-6 p-6 bg-[#1E293B]/20 rounded-[2rem] border border-blue-900/10 mb-10",children:[(0,b.jsx)("div",{className:"w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20",children:(0,b.jsx)(n,{size:32,className:"text-white"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1",children:"Procurement Officer"}),(0,b.jsx)("h3",{className:"text-xl font-black text-white",children:A.buyerId?.name||"Corporate Buyer"}),(0,b.jsx)("p",{className:"text-xs text-blue-400 font-bold",children:A.buyerId?.email})]})]}),(0,b.jsxs)("div",{className:"space-y-4",children:[(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)(p.MessageSquare,{size:14,className:"text-blue-500"}),(0,b.jsx)("span",{className:"text-[10px] font-black text-slate-500 uppercase tracking-widest",children:"Buyer Requirements"})]}),(0,b.jsxs)("div",{className:"bg-[#1E293B]/50 p-6 rounded-2xl border-l-4 border-blue-600 italic text-slate-300 text-sm leading-relaxed",children:['"',A.message||"Implicit commitment. No additional memo provided.",'"']})]})]})]})]}),(0,b.jsxs)("div",{className:"lg:col-span-5 space-y-6",children:[(0,b.jsxs)("div",{className:"bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-600/30 relative overflow-hidden group",children:[(0,b.jsx)(r.Zap,{className:"absolute -right-4 -top-4 w-32 h-32 text-white/10 rotate-12"}),(0,b.jsx)("p",{className:"text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/60 mb-2",children:"Contract Liquidity"}),(0,b.jsxs)("h3",{className:"text-5xl font-[1000] tracking-tighter",children:["$",D.toLocaleString()]}),(0,b.jsxs)("div",{className:"mt-8 flex items-center gap-3 p-3 bg-black/20 rounded-xl border border-white/10 backdrop-blur-md",children:[(0,b.jsx)(s.TrendingUp,{size:16,className:"text-emerald-400"}),(0,b.jsx)("p",{className:"text-[10px] font-bold text-blue-50 tracking-tight uppercase italic",children:"Total Negotiated Value"})]})]}),(0,b.jsxs)("div",{className:"bg-white rounded-[3rem] p-10 text-slate-900 shadow-2xl relative",children:[(0,b.jsx)("h2",{className:"text-2xl font-[1000] tracking-tighter mb-8 uppercase text-center",children:"Execute Decision"}),(0,b.jsxs)("div",{className:"space-y-4",children:[(0,b.jsxs)("button",{onClick:()=>C.mutate({status:"ACCEPTED"}),disabled:C.isPending||w,className:"w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl shadow-emerald-200 transition-all active:scale-95 disabled:opacity-50",children:[(0,b.jsx)(l,{size:18})," Approve Contract"]}),w?(0,b.jsxs)("div",{className:"space-y-4 animate-in slide-in-from-top-2 duration-300",children:[(0,b.jsxs)("div",{className:"relative",children:[(0,b.jsx)(o.DollarSign,{className:"absolute left-5 top-1/2 -translate-y-1/2 text-slate-400",size:18}),(0,b.jsx)("input",{autoFocus:!0,type:"number",placeholder:"Enter Counter Unit Price...",value:y,onChange:a=>z(a.target.value),className:"w-full pl-12 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus:border-blue-500 transition-all outline-none font-black text-lg"})]}),(0,b.jsxs)("div",{className:"flex gap-2",children:[(0,b.jsx)("button",{onClick:()=>C.mutate({status:"NEGOTIATING",price:Number(y)}),disabled:C.isPending,className:"flex-1 py-4 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase",children:C.isPending?"Sending...":"Send Offer"}),(0,b.jsx)("button",{onClick:()=>x(!1),className:"px-6 py-4 bg-slate-100 text-slate-400 rounded-xl font-black text-[10px] uppercase",children:"Cancel"})]})]}):(0,b.jsxs)("button",{onClick:()=>x(!0),className:"w-full py-6 bg-slate-900 text-white hover:bg-blue-600 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all",children:[(0,b.jsx)(t.RefreshCcw,{size:18})," Initiate Counter"]}),(0,b.jsx)("button",{onClick:()=>C.mutate({status:"REJECTED"}),disabled:C.isPending,className:"w-full py-4 text-slate-400 hover:text-red-500 font-black text-[10px] uppercase tracking-[0.3em] transition-colors mt-4",children:"Permanently Decline"})]})]})]})]})]})}a.s(["default",()=>v],83544)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__52a377dd._.js.map