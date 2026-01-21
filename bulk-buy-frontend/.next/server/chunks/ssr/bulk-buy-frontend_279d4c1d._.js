module.exports=[69105,a=>{"use strict";let b,c;var d,e=a.i(25129);let f={data:""},g=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,h=/\/\*[^]*?\*\/|  +/g,i=/\n+/g,j=(a,b)=>{let c="",d="",e="";for(let f in a){let g=a[f];"@"==f[0]?"i"==f[1]?c=f+" "+g+";":d+="f"==f[1]?j(g,f):f+"{"+j(g,"k"==f[1]?"":b)+"}":"object"==typeof g?d+=j(g,b?b.replace(/([^,])+/g,a=>f.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,b=>/&/.test(b)?b.replace(/&/g,a):a?a+" "+b:b)):f):null!=g&&(f=/^--/.test(f)?f:f.replace(/[A-Z]/g,"-$&").toLowerCase(),e+=j.p?j.p(f,g):f+":"+g+";")}return c+(b&&e?b+"{"+e+"}":e)+d},k={},l=a=>{if("object"==typeof a){let b="";for(let c in a)b+=c+l(a[c]);return b}return a};function m(a){let b,c,d=this||{},e=a.call?a(d.p):a;return((a,b,c,d,e)=>{var f;let m=l(a),n=k[m]||(k[m]=(a=>{let b=0,c=11;for(;b<a.length;)c=101*c+a.charCodeAt(b++)>>>0;return"go"+c})(m));if(!k[n]){let b=m!==a?a:(a=>{let b,c,d=[{}];for(;b=g.exec(a.replace(h,""));)b[4]?d.shift():b[3]?(c=b[3].replace(i," ").trim(),d.unshift(d[0][c]=d[0][c]||{})):d[0][b[1]]=b[2].replace(i," ").trim();return d[0]})(a);k[n]=j(e?{["@keyframes "+n]:b}:b,c?"":"."+n)}let o=c&&k.g?k.g:null;return c&&(k.g=k[n]),f=k[n],o?b.data=b.data.replace(o,f):-1===b.data.indexOf(f)&&(b.data=d?f+b.data:b.data+f),n})(e.unshift?e.raw?(b=[].slice.call(arguments,1),c=d.p,e.reduce((a,d,e)=>{let f=b[e];if(f&&f.call){let a=f(c),b=a&&a.props&&a.props.className||/^go/.test(a)&&a;f=b?"."+b:a&&"object"==typeof a?a.props?"":j(a,""):!1===a?"":a}return a+d+(null==f?"":f)},"")):e.reduce((a,b)=>Object.assign(a,b&&b.call?b(d.p):b),{}):e,d.target||f,d.g,d.o,d.k)}m.bind({g:1});let n,o,p,q=m.bind({k:1});function r(a,b){let c=this||{};return function(){let d=arguments;function e(f,g){let h=Object.assign({},f),i=h.className||e.className;c.p=Object.assign({theme:o&&o()},h),c.o=/ *go\d+/.test(i),h.className=m.apply(c,d)+(i?" "+i:""),b&&(h.ref=g);let j=a;return a[0]&&(j=h.as||a,delete h.as),p&&j[0]&&p(h),n(j,h)}return b?b(e):e}}var s=(a,b)=>"function"==typeof a?a(b):a,t=(b=0,()=>(++b).toString()),u="default",v=(a,b)=>{let{toastLimit:c}=a.settings;switch(b.type){case 0:return{...a,toasts:[b.toast,...a.toasts].slice(0,c)};case 1:return{...a,toasts:a.toasts.map(a=>a.id===b.toast.id?{...a,...b.toast}:a)};case 2:let{toast:d}=b;return v(a,{type:+!!a.toasts.find(a=>a.id===d.id),toast:d});case 3:let{toastId:e}=b;return{...a,toasts:a.toasts.map(a=>a.id===e||void 0===e?{...a,dismissed:!0,visible:!1}:a)};case 4:return void 0===b.toastId?{...a,toasts:[]}:{...a,toasts:a.toasts.filter(a=>a.id!==b.toastId)};case 5:return{...a,pausedAt:b.time};case 6:let f=b.time-(a.pausedAt||0);return{...a,pausedAt:void 0,toasts:a.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+f}))}}},w=[],x={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},y={},z=(a,b=u)=>{y[b]=v(y[b]||x,a),w.forEach(([a,c])=>{a===b&&c(y[b])})},A=a=>Object.keys(y).forEach(b=>z(a,b)),B=(a=u)=>b=>{z(b,a)},C=a=>(b,c)=>{let d,e=((a,b="blank",c)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:b,ariaProps:{role:"status","aria-live":"polite"},message:a,pauseDuration:0,...c,id:(null==c?void 0:c.id)||t()}))(b,a,c);return B(e.toasterId||(d=e.id,Object.keys(y).find(a=>y[a].toasts.some(a=>a.id===d))))({type:2,toast:e}),e.id},D=(a,b)=>C("blank")(a,b);D.error=C("error"),D.success=C("success"),D.loading=C("loading"),D.custom=C("custom"),D.dismiss=(a,b)=>{let c={type:3,toastId:a};b?B(b)(c):A(c)},D.dismissAll=a=>D.dismiss(void 0,a),D.remove=(a,b)=>{let c={type:4,toastId:a};b?B(b)(c):A(c)},D.removeAll=a=>D.remove(void 0,a),D.promise=(a,b,c)=>{let d=D.loading(b.loading,{...c,...null==c?void 0:c.loading});return"function"==typeof a&&(a=a()),a.then(a=>{let e=b.success?s(b.success,a):void 0;return e?D.success(e,{id:d,...c,...null==c?void 0:c.success}):D.dismiss(d),a}).catch(a=>{let e=b.error?s(b.error,a):void 0;e?D.error(e,{id:d,...c,...null==c?void 0:c.error}):D.dismiss(d)}),a};var E=q`
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
`,a.s(["default",()=>D,"toast",()=>D],69105)},37504,a=>{"use strict";let b=(0,a.i(57287).default)("clock",[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);a.s(["Clock",()=>b],37504)},48576,a=>{"use strict";let b=(0,a.i(57287).default)("triangle-alert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);a.s(["AlertTriangle",()=>b],48576)},18645,a=>{"use strict";let b=(0,a.i(57287).default)("truck",[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M15 18H9",key:"1lyqi6"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",key:"lysw3i"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]]);a.s(["Truck",()=>b],18645)},5057,a=>{"use strict";var b=a.i(71633),c=a.i(42573),d=a.i(142),e=a.i(60871),f=a.i(57042),g=a.i(18645),h=a.i(48576),i=a.i(57287);let j=(0,i.default)("ellipsis-vertical",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]]);var k=a.i(37504);let l=(0,i.default)("box",[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]);var m=a.i(69105);function n(){let a=(0,e.useQueryClient)(),{data:i,isLoading:n}=(0,c.useQuery)({queryKey:["vendor-fulfillment"],queryFn:async()=>(await f.api.get("/rfq/vendor")).data.filter(a=>["PAID","SHIPPED","COMPLETED"].includes(a.status))}),o=(0,d.useMutation)({mutationFn:async({id:a,status:b})=>await f.api.patch(`/rfq/${a}/status`,{status:b}),onSuccess:()=>{a.invalidateQueries({queryKey:["vendor-fulfillment"]}),m.toast.success("Shipment Status Updated")}});return n?(0,b.jsx)("div",{className:"p-20 text-center font-black animate-pulse",children:"LOADING FULFILLMENT QUEUE..."}):(0,b.jsx)("div",{className:"min-h-screen bg-[#F8FAFC] p-8",children:(0,b.jsxs)("div",{className:"max-w-7xl mx-auto",children:[(0,b.jsxs)("div",{className:"flex justify-between items-end mb-12",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h1",{className:"text-4xl font-[1000] text-slate-900 tracking-tighter italic uppercase",children:"Fulfillment Command"}),(0,b.jsx)("p",{className:"text-slate-500 font-bold text-xs uppercase tracking-widest mt-1",children:"Manage paid contracts and outbound logistics."})]}),(0,b.jsx)("div",{className:"flex gap-4",children:(0,b.jsxs)("div",{className:"bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm",children:[(0,b.jsx)("p",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Escrow Balance"}),(0,b.jsx)("p",{className:"text-xl font-black text-emerald-600",children:"$42,800.00"})]})})]}),(0,b.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8",children:[(0,b.jsx)("div",{className:"lg:col-span-8 space-y-6",children:i?.map(a=>(0,b.jsxs)("div",{className:"bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all group",children:[(0,b.jsxs)("div",{className:"flex justify-between items-start mb-6",children:[(0,b.jsxs)("div",{className:"flex gap-4",children:[(0,b.jsx)("div",{className:"w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white",children:(0,b.jsx)(l,{size:24})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-black text-slate-900 text-lg leading-tight",children:a.productId?.name}),(0,b.jsxs)("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1",children:["Order #ORD-",a._id.slice(-6).toUpperCase()]})]})]}),(0,b.jsx)("div",{className:`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${"PAID"===a.status?"bg-blue-50 text-blue-600 border border-blue-100":"bg-emerald-50 text-emerald-600 border border-emerald-100"}`,children:"PAID"===a.status?"Ready to Ship":"In Transit"})]}),(0,b.jsxs)("div",{className:"grid grid-cols-3 gap-6 py-6 border-y border-slate-50",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1",children:"Destination"}),(0,b.jsx)("p",{className:"text-sm font-bold text-slate-700 truncate",children:a.buyerId?.name})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1",children:"Quantity"}),(0,b.jsxs)("p",{className:"text-sm font-bold text-slate-700",children:[a.quantity.toLocaleString()," Units"]})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1",children:"Release Value"}),(0,b.jsxs)("p",{className:"text-sm font-black text-emerald-600",children:["$",(a.quantity*(a.vendorCounterPrice||a.targetUnitPrice)).toLocaleString()]})]})]}),(0,b.jsxs)("div",{className:"mt-6 flex justify-between items-center",children:[(0,b.jsxs)("div",{className:"flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg",children:[(0,b.jsx)(k.Clock,{size:14}),(0,b.jsx)("span",{className:"text-[9px] font-black uppercase tracking-widest",children:"Ship within 48h"})]}),(0,b.jsxs)("div",{className:"flex gap-3",children:["PAID"===a.status&&(0,b.jsxs)("button",{onClick:()=>o.mutate({id:a._id,status:"SHIPPED"}),className:"bg-blue-600 hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2",children:[(0,b.jsx)(g.Truck,{size:14})," Generate Waybill & Ship"]}),(0,b.jsx)("button",{className:"p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl border border-slate-100",children:(0,b.jsx)(j,{size:18})})]})]})]},a._id))}),(0,b.jsxs)("div",{className:"lg:col-span-4 space-y-6",children:[(0,b.jsxs)("div",{className:"bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl",children:[(0,b.jsx)("h2",{className:"text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-6",children:"Logistics Health"}),(0,b.jsxs)("div",{className:"space-y-6",children:[(0,b.jsxs)("div",{className:"flex justify-between items-center",children:[(0,b.jsx)("span",{className:"text-sm text-slate-400 font-medium",children:"Avg. Shipping Time"}),(0,b.jsx)("span",{className:"font-black",children:"1.2 Days"})]}),(0,b.jsxs)("div",{className:"flex justify-between items-center",children:[(0,b.jsx)("span",{className:"text-sm text-slate-400 font-medium",children:"Pending Pickups"}),(0,b.jsx)("span",{className:"font-black text-blue-400",children:i?.filter(a=>"PAID"===a.status).length})]}),(0,b.jsx)("div",{className:"pt-6 border-t border-white/10",children:(0,b.jsx)("button",{className:"w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",children:"Carrier Integration Settings"})})]})]}),(0,b.jsxs)("div",{className:"bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm",children:[(0,b.jsxs)("div",{className:"flex items-center gap-3 mb-6",children:[(0,b.jsx)(h.AlertTriangle,{className:"text-amber-500",size:20}),(0,b.jsx)("h2",{className:"text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]",children:"Escrow Reminder"})]}),(0,b.jsxs)("p",{className:"text-xs text-slate-500 leading-relaxed font-medium",children:["Funds are released to your main wallet ",(0,b.jsx)("span",{className:"text-slate-900 font-bold",children:"24 hours after the buyer confirms receipt"}),". Ensure tracking numbers are uploaded promptly."]})]})]})]})]})})}a.s(["default",()=>n],5057)}];

//# sourceMappingURL=bulk-buy-frontend_279d4c1d._.js.map