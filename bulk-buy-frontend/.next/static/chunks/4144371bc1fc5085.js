(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,71148,e=>{"use strict";let t=(0,e.i(15115).default)("zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]);e.s(["Zap",()=>t],71148)},26948,e=>{"use strict";let t=(0,e.i(15115).default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["ArrowLeft",()=>t],26948)},15115,e=>{"use strict";var t=e.i(50178);let s=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,s)=>s?s.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},r=(...e)=>e.filter((e,t,s)=>!!e&&""!==e.trim()&&s.indexOf(e)===t).join(" ").trim();var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let a=(0,t.forwardRef)(({color:e="currentColor",size:s=24,strokeWidth:a=2,absoluteStrokeWidth:n,className:l="",children:o,iconNode:c,...u},d)=>(0,t.createElement)("svg",{ref:d,...i,width:s,height:s,stroke:e,strokeWidth:n?24*Number(a)/Number(s):a,className:r("lucide",l),...!o&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0})(u)&&{"aria-hidden":"true"},...u},[...c.map(([e,s])=>(0,t.createElement)(e,s)),...Array.isArray(o)?o:[o]])),n=(e,i)=>{let n=(0,t.forwardRef)(({className:n,...l},o)=>(0,t.createElement)(a,{ref:o,iconNode:i,className:r(`lucide-${s(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,n),...l}));return n.displayName=s(e),n};e.s(["default",()=>n],15115)},19078,(e,t,s)=>{t.exports=e.r(81391)},18420,e=>{"use strict";let t=(0,e.i(15115).default)("shield-check",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);e.s(["ShieldCheck",()=>t],18420)},67824,e=>{"use strict";let t,s;var r,i=e.i(50178);let a={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,o=/\n+/g,c=(e,t)=>{let s="",r="",i="";for(let a in e){let n=e[a];"@"==a[0]?"i"==a[1]?s=a+" "+n+";":r+="f"==a[1]?c(n,a):a+"{"+c(n,"k"==a[1]?"":t)+"}":"object"==typeof n?r+=c(n,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):a):null!=n&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=c.p?c.p(a,n):a+":"+n+";")}return s+(t&&i?t+"{"+i+"}":i)+r},u={},d=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+d(e[s]);return t}return e};function h(e){let t,s,r=this||{},i=e.call?e(r.p):e;return((e,t,s,r,i)=>{var a;let h=d(e),p=u[h]||(u[h]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(h));if(!u[p]){let t=h!==e?e:(e=>{let t,s,r=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?r.shift():t[3]?(s=t[3].replace(o," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(o," ").trim();return r[0]})(e);u[p]=c(i?{["@keyframes "+p]:t}:t,s?"":"."+p)}let m=s&&u.g?u.g:null;return s&&(u.g=u[p]),a=u[p],m?t.data=t.data.replace(m,a):-1===t.data.indexOf(a)&&(t.data=r?a+t.data:t.data+a),p})(i.unshift?i.raw?(t=[].slice.call(arguments,1),s=r.p,i.reduce((e,r,i)=>{let a=t[i];if(a&&a.call){let e=a(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==a?"":a)},"")):i.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):i,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||a})(r.target),r.g,r.o,r.k)}h.bind({g:1});let p,m,f,b=h.bind({k:1});function x(e,t){let s=this||{};return function(){let r=arguments;function i(a,n){let l=Object.assign({},a),o=l.className||i.className;s.p=Object.assign({theme:m&&m()},l),s.o=/ *go\d+/.test(o),l.className=h.apply(s,r)+(o?" "+o:""),t&&(l.ref=n);let c=e;return e[0]&&(c=l.as||e,delete l.as),f&&c[0]&&f(l),p(c,l)}return t?t(i):i}}var g=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v="default",w=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},k=[],j={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},R={},N=(e,t=v)=>{R[t]=w(R[t]||j,e),k.forEach(([e,s])=>{e===t&&s(R[t])})},E=e=>Object.keys(R).forEach(t=>N(e,t)),C=(e=v)=>t=>{N(t,e)},O=e=>(t,s)=>{let r,i=((e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||y()}))(t,e,s);return C(i.toasterId||(r=i.id,Object.keys(R).find(e=>R[e].toasts.some(e=>e.id===r))))({type:2,toast:i}),i.id},S=(e,t)=>O("blank")(e,t);S.error=O("error"),S.success=O("success"),S.loading=O("loading"),S.custom=O("custom"),S.dismiss=(e,t)=>{let s={type:3,toastId:e};t?C(t)(s):E(s)},S.dismissAll=e=>S.dismiss(void 0,e),S.remove=(e,t)=>{let s={type:4,toastId:e};t?C(t)(s):E(s)},S.removeAll=e=>S.remove(void 0,e),S.promise=(e,t,s)=>{let r=S.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?g(t.success,e):void 0;return i?S.success(i,{id:r,...s,...null==s?void 0:s.success}):S.dismiss(r),e}).catch(e=>{let i=t.error?g(t.error,e):void 0;i?S.error(i,{id:r,...s,...null==s?void 0:s.error}):S.dismiss(r)}),e};var I=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Q=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,T=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,M=x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Q} 0.15s ease-out forwards;
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
    animation: ${T} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,P=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,A=x("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${P} 1s linear infinite;
`,U=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,D=b`
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
}`,q=x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${D} 0.2s ease-out forwards;
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
`,F=x("div")`
  position: absolute;
`,z=x("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,L=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,$=x("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${L} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,_=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return void 0!==t?"string"==typeof t?i.createElement($,null,t):t:"blank"===s?null:i.createElement(z,null,i.createElement(A,{...r}),"loading"!==s&&i.createElement(F,null,"error"===s?i.createElement(M,{...r}):i.createElement(q,{...r})))},B=x("div")`
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
`,K=x("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`;i.memo(({toast:e,position:t,style:r,children:a})=>{let n=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[i,a]=(()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s})()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${b(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},l=i.createElement(_,{toast:e}),o=i.createElement(K,{...e.ariaProps},g(e.message,e));return i.createElement(B,{className:e.className,style:{...n,...r,...e.style}},"function"==typeof a?a({icon:l,message:o}):i.createElement(i.Fragment,null,l,o))}),r=i.createElement,c.p=void 0,p=r,m=void 0,f=void 0,h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,e.s(["default",()=>S,"toast",()=>S],67824)},96583,e=>{"use strict";let t;var s=e.i(63065),r=e.i(12537),i=e.i(60078),a=e.i(15286),n=e.i(80132),l=e.i(96495),o=e.i(86460),c=class extends a.Subscribable{constructor(e,t){super(),this.options=t,this.#e=e,this.#t=null,this.#s=(0,n.pendingThenable)(),this.bindMethods(),this.setOptions(t)}#e;#r=void 0;#i=void 0;#a=void 0;#n;#l;#s;#t;#o;#c;#u;#d;#h;#p;#m=new Set;bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){1===this.listeners.size&&(this.#r.addObserver(this),u(this.#r,this.options)?this.#f():this.updateResult(),this.#b())}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return d(this.#r,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return d(this.#r,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,this.#x(),this.#g(),this.#r.removeObserver(this)}setOptions(e){let t=this.options,s=this.#r;if(this.options=this.#e.defaultQueryOptions(e),void 0!==this.options.enabled&&"boolean"!=typeof this.options.enabled&&"function"!=typeof this.options.enabled&&"boolean"!=typeof(0,l.resolveEnabled)(this.options.enabled,this.#r))throw Error("Expected enabled to be a boolean or a callback that returns a boolean");this.#y(),this.#r.setOptions(this.options),t._defaulted&&!(0,l.shallowEqualObjects)(this.options,t)&&this.#e.getQueryCache().notify({type:"observerOptionsUpdated",query:this.#r,observer:this});let r=this.hasListeners();r&&h(this.#r,s,this.options,t)&&this.#f(),this.updateResult(),r&&(this.#r!==s||(0,l.resolveEnabled)(this.options.enabled,this.#r)!==(0,l.resolveEnabled)(t.enabled,this.#r)||(0,l.resolveStaleTime)(this.options.staleTime,this.#r)!==(0,l.resolveStaleTime)(t.staleTime,this.#r))&&this.#v();let i=this.#w();r&&(this.#r!==s||(0,l.resolveEnabled)(this.options.enabled,this.#r)!==(0,l.resolveEnabled)(t.enabled,this.#r)||i!==this.#p)&&this.#k(i)}getOptimisticResult(e){var t,s;let r=this.#e.getQueryCache().build(this.#e,e),i=this.createResult(r,e);return t=this,s=i,(0,l.shallowEqualObjects)(t.getCurrentResult(),s)||(this.#a=i,this.#l=this.options,this.#n=this.#r.state),i}getCurrentResult(){return this.#a}trackResult(e,t){return new Proxy(e,{get:(e,s)=>(this.trackProp(s),t?.(s),"promise"===s&&(this.trackProp("data"),this.options.experimental_prefetchInRender||"pending"!==this.#s.status||this.#s.reject(Error("experimental_prefetchInRender feature flag is not enabled"))),Reflect.get(e,s))})}trackProp(e){this.#m.add(e)}getCurrentQuery(){return this.#r}refetch({...e}={}){return this.fetch({...e})}fetchOptimistic(e){let t=this.#e.defaultQueryOptions(e),s=this.#e.getQueryCache().build(this.#e,t);return s.fetch().then(()=>this.createResult(s,t))}fetch(e){return this.#f({...e,cancelRefetch:e.cancelRefetch??!0}).then(()=>(this.updateResult(),this.#a))}#f(e){this.#y();let t=this.#r.fetch(this.options,e);return e?.throwOnError||(t=t.catch(l.noop)),t}#v(){this.#x();let e=(0,l.resolveStaleTime)(this.options.staleTime,this.#r);if(l.isServer||this.#a.isStale||!(0,l.isValidTimeout)(e))return;let t=(0,l.timeUntilStale)(this.#a.dataUpdatedAt,e);this.#d=o.timeoutManager.setTimeout(()=>{this.#a.isStale||this.updateResult()},t+1)}#w(){return("function"==typeof this.options.refetchInterval?this.options.refetchInterval(this.#r):this.options.refetchInterval)??!1}#k(e){this.#g(),this.#p=e,!l.isServer&&!1!==(0,l.resolveEnabled)(this.options.enabled,this.#r)&&(0,l.isValidTimeout)(this.#p)&&0!==this.#p&&(this.#h=o.timeoutManager.setInterval(()=>{(this.options.refetchIntervalInBackground||s.focusManager.isFocused())&&this.#f()},this.#p))}#b(){this.#v(),this.#k(this.#w())}#x(){this.#d&&(o.timeoutManager.clearTimeout(this.#d),this.#d=void 0)}#g(){this.#h&&(o.timeoutManager.clearInterval(this.#h),this.#h=void 0)}createResult(e,t){let s,r=this.#r,a=this.options,o=this.#a,c=this.#n,d=this.#l,m=e!==r?e.state:this.#i,{state:f}=e,b={...f},x=!1;if(t._optimisticResults){let s=this.hasListeners(),n=!s&&u(e,t),l=s&&h(e,r,t,a);(n||l)&&(b={...b,...(0,i.fetchState)(f.data,e.options)}),"isRestoring"===t._optimisticResults&&(b.fetchStatus="idle")}let{error:g,errorUpdatedAt:y,status:v}=b;s=b.data;let w=!1;if(void 0!==t.placeholderData&&void 0===s&&"pending"===v){let e;o?.isPlaceholderData&&t.placeholderData===d?.placeholderData?(e=o.data,w=!0):e="function"==typeof t.placeholderData?t.placeholderData(this.#u?.state.data,this.#u):t.placeholderData,void 0!==e&&(v="success",s=(0,l.replaceData)(o?.data,e,t),x=!0)}if(t.select&&void 0!==s&&!w)if(o&&s===c?.data&&t.select===this.#o)s=this.#c;else try{this.#o=t.select,s=t.select(s),s=(0,l.replaceData)(o?.data,s,t),this.#c=s,this.#t=null}catch(e){this.#t=e}this.#t&&(g=this.#t,s=this.#c,y=Date.now(),v="error");let k="fetching"===b.fetchStatus,j="pending"===v,R="error"===v,N=j&&k,E=void 0!==s,C={status:v,fetchStatus:b.fetchStatus,isPending:j,isSuccess:"success"===v,isError:R,isInitialLoading:N,isLoading:N,data:s,dataUpdatedAt:b.dataUpdatedAt,error:g,errorUpdatedAt:y,failureCount:b.fetchFailureCount,failureReason:b.fetchFailureReason,errorUpdateCount:b.errorUpdateCount,isFetched:b.dataUpdateCount>0||b.errorUpdateCount>0,isFetchedAfterMount:b.dataUpdateCount>m.dataUpdateCount||b.errorUpdateCount>m.errorUpdateCount,isFetching:k,isRefetching:k&&!j,isLoadingError:R&&!E,isPaused:"paused"===b.fetchStatus,isPlaceholderData:x,isRefetchError:R&&E,isStale:p(e,t),refetch:this.refetch,promise:this.#s,isEnabled:!1!==(0,l.resolveEnabled)(t.enabled,e)};if(this.options.experimental_prefetchInRender){let t=e=>{"error"===C.status?e.reject(C.error):void 0!==C.data&&e.resolve(C.data)},s=()=>{t(this.#s=C.promise=(0,n.pendingThenable)())},i=this.#s;switch(i.status){case"pending":e.queryHash===r.queryHash&&t(i);break;case"fulfilled":("error"===C.status||C.data!==i.value)&&s();break;case"rejected":("error"!==C.status||C.error!==i.reason)&&s()}}return C}updateResult(){let e=this.#a,t=this.createResult(this.#r,this.options);if(this.#n=this.#r.state,this.#l=this.options,void 0!==this.#n.data&&(this.#u=this.#r),(0,l.shallowEqualObjects)(t,e))return;this.#a=t;let s=()=>{if(!e)return!0;let{notifyOnChangeProps:t}=this.options,s="function"==typeof t?t():t;if("all"===s||!s&&!this.#m.size)return!0;let r=new Set(s??this.#m);return this.options.throwOnError&&r.add("error"),Object.keys(this.#a).some(t=>this.#a[t]!==e[t]&&r.has(t))};this.#j({listeners:s()})}#y(){let e=this.#e.getQueryCache().build(this.#e,this.options);if(e===this.#r)return;let t=this.#r;this.#r=e,this.#i=e.state,this.hasListeners()&&(t?.removeObserver(this),e.addObserver(this))}onQueryUpdate(){this.updateResult(),this.hasListeners()&&this.#b()}#j(e){r.notifyManager.batch(()=>{e.listeners&&this.listeners.forEach(e=>{e(this.#a)}),this.#e.getQueryCache().notify({query:this.#r,type:"observerResultsUpdated"})})}};function u(e,t){return!1!==(0,l.resolveEnabled)(t.enabled,e)&&void 0===e.state.data&&("error"!==e.state.status||!1!==t.retryOnMount)||void 0!==e.state.data&&d(e,t,t.refetchOnMount)}function d(e,t,s){if(!1!==(0,l.resolveEnabled)(t.enabled,e)&&"static"!==(0,l.resolveStaleTime)(t.staleTime,e)){let r="function"==typeof s?s(e):s;return"always"===r||!1!==r&&p(e,t)}return!1}function h(e,t,s,r){return(e!==t||!1===(0,l.resolveEnabled)(r.enabled,e))&&(!s.suspense||"error"!==e.state.status)&&p(e,s)}function p(e,t){return!1!==(0,l.resolveEnabled)(t.enabled,e)&&e.isStaleByTime((0,l.resolveStaleTime)(t.staleTime,e))}e.i(50702);var m=e.i(50178),f=e.i(59324);e.i(30483);var b=m.createContext((t=!1,{clearReset:()=>{t=!1},reset:()=>{t=!0},isReset:()=>t})),x=m.createContext(!1);x.Provider;var g=(e,t,s)=>t.fetchOptimistic(e).catch(()=>{s.clearReset()});function y(e,t){return function(e,t,s){let i,a=m.useContext(x),n=m.useContext(b),o=(0,f.useQueryClient)(s),c=o.defaultQueryOptions(e);o.getDefaultOptions().queries?._experimental_beforeQuery?.(c);let u=o.getQueryCache().get(c.queryHash);if(c._optimisticResults=a?"isRestoring":"optimistic",c.suspense){let e=e=>"static"===e?e:Math.max(e??1e3,1e3),t=c.staleTime;c.staleTime="function"==typeof t?(...s)=>e(t(...s)):e(t),"number"==typeof c.gcTime&&(c.gcTime=Math.max(c.gcTime,1e3))}i=u?.state.error&&"function"==typeof c.throwOnError?(0,l.shouldThrowError)(c.throwOnError,[u.state.error,u]):c.throwOnError,(c.suspense||c.experimental_prefetchInRender||i)&&!n.isReset()&&(c.retryOnMount=!1),m.useEffect(()=>{n.clearReset()},[n]);let d=!o.getQueryCache().get(c.queryHash),[h]=m.useState(()=>new t(o,c)),p=h.getOptimisticResult(c),y=!a&&!1!==e.subscribed;if(m.useSyncExternalStore(m.useCallback(e=>{let t=y?h.subscribe(r.notifyManager.batchCalls(e)):l.noop;return h.updateResult(),t},[h,y]),()=>h.getCurrentResult(),()=>h.getCurrentResult()),m.useEffect(()=>{h.setOptions(c)},[c,h]),c?.suspense&&p.isPending)throw g(c,h,n);if((({result:e,errorResetBoundary:t,throwOnError:s,query:r,suspense:i})=>e.isError&&!t.isReset()&&!e.isFetching&&r&&(i&&void 0===e.data||(0,l.shouldThrowError)(s,[e.error,r])))({result:p,errorResetBoundary:n,throwOnError:c.throwOnError,query:u,suspense:c.suspense}))throw p.error;if(o.getDefaultOptions().queries?._experimental_afterQuery?.(c,p),c.experimental_prefetchInRender&&!l.isServer&&p.isLoading&&p.isFetching&&!a){let e=d?g(c,h,n):u?.promise;e?.catch(l.noop).finally(()=>{h.updateResult()})}return c.notifyOnChangeProps?p:h.trackResult(p)}(e,c,t)}e.s(["useQuery",()=>y],96583)},83741,e=>{"use strict";var t=e.i(50178),s=e.i(97429),r=e.i(12537),i=e.i(15286),a=e.i(96495),n=class extends i.Subscribable{#e;#a=void 0;#R;#N;constructor(e,t){super(),this.#e=e,this.setOptions(t),this.bindMethods(),this.#E()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){let t=this.options;this.options=this.#e.defaultMutationOptions(e),(0,a.shallowEqualObjects)(this.options,t)||this.#e.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.#R,observer:this}),t?.mutationKey&&this.options.mutationKey&&(0,a.hashKey)(t.mutationKey)!==(0,a.hashKey)(this.options.mutationKey)?this.reset():this.#R?.state.status==="pending"&&this.#R.setOptions(this.options)}onUnsubscribe(){this.hasListeners()||this.#R?.removeObserver(this)}onMutationUpdate(e){this.#E(),this.#j(e)}getCurrentResult(){return this.#a}reset(){this.#R?.removeObserver(this),this.#R=void 0,this.#E(),this.#j()}mutate(e,t){return this.#N=t,this.#R?.removeObserver(this),this.#R=this.#e.getMutationCache().build(this.#e,this.options),this.#R.addObserver(this),this.#R.execute(e)}#E(){let e=this.#R?.state??(0,s.getDefaultState)();this.#a={...e,isPending:"pending"===e.status,isSuccess:"success"===e.status,isError:"error"===e.status,isIdle:"idle"===e.status,mutate:this.mutate,reset:this.reset}}#j(e){r.notifyManager.batch(()=>{if(this.#N&&this.hasListeners()){let t=this.#a.variables,s=this.#a.context,r={client:this.#e,meta:this.options.meta,mutationKey:this.options.mutationKey};if(e?.type==="success"){try{this.#N.onSuccess?.(e.data,t,s,r)}catch(e){Promise.reject(e)}try{this.#N.onSettled?.(e.data,null,t,s,r)}catch(e){Promise.reject(e)}}else if(e?.type==="error"){try{this.#N.onError?.(e.error,t,s,r)}catch(e){Promise.reject(e)}try{this.#N.onSettled?.(void 0,e.error,t,s,r)}catch(e){Promise.reject(e)}}}this.listeners.forEach(e=>{e(this.#a)})})}},l=e.i(59324);function o(e,s){let i=(0,l.useQueryClient)(s),[o]=t.useState(()=>new n(i,e));t.useEffect(()=>{o.setOptions(e)},[o,e]);let c=t.useSyncExternalStore(t.useCallback(e=>o.subscribe(r.notifyManager.batchCalls(e)),[o]),()=>o.getCurrentResult(),()=>o.getCurrentResult()),u=t.useCallback((e,t)=>{o.mutate(e,t).catch(a.noop)},[o]);if(c.error&&(0,a.shouldThrowError)(o.options.throwOnError,[c.error]))throw c.error;return{...c,mutate:u,mutateAsync:c.mutate}}e.s(["useMutation",()=>o],83741)},7643,e=>{"use strict";let t=(0,e.i(15115).default)("dollar-sign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);e.s(["DollarSign",()=>t],7643)},36235,e=>{"use strict";let t=(0,e.i(15115).default)("message-square",[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]]);e.s(["MessageSquare",()=>t],36235)},14498,e=>{"use strict";let t=(0,e.i(15115).default)("package",[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]]);e.s(["Package",()=>t],14498)},77320,e=>{"use strict";let t=(0,e.i(15115).default)("trending-up",[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]]);e.s(["TrendingUp",()=>t],77320)},98678,e=>{"use strict";let t=(0,e.i(15115).default)("refresh-ccw",[["path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"14sxne"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",key:"1hlbsb"}],["path",{d:"M16 16h5v5",key:"ccwih5"}]]);e.s(["RefreshCcw",()=>t],98678)},44497,e=>{"use strict";var t=e.i(30483),s=e.i(50178),r=e.i(96583),i=e.i(83741),a=e.i(59324),n=e.i(19078),l=e.i(12973),o=e.i(67824),c=e.i(26948),u=e.i(15115);let d=(0,u.default)("circle-check-big",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);var h=e.i(14498);let p=(0,u.default)("user",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);var m=e.i(7643),f=e.i(36235),b=e.i(18420),x=e.i(71148),g=e.i(77320),y=e.i(98678),v=e.i(85127);function w(){let{id:e}=(0,n.useParams)(),u=(0,n.useRouter)(),w=(0,a.useQueryClient)(),[k,j]=(0,s.useState)(!1),[R,N]=(0,s.useState)(""),{data:E,isLoading:C}=(0,r.useQuery)({queryKey:["rfq-detail",e],queryFn:async()=>(await l.api.get(`/rfq/${e}`)).data}),O=(0,i.useMutation)({mutationFn:async({status:t,price:s})=>await l.api.patch(`/rfq/${e}/status`,{status:t,vendorCounterPrice:s}),onSuccess:()=>{w.invalidateQueries({queryKey:["rfq-detail",e]}),o.toast.success("Terminal Updated Successfully"),u.push("/vendor/rfq")},onError:e=>{o.toast.error(e.response?.data?.message||"Transmission Error")}});if(C)return(0,t.jsxs)("div",{className:"min-h-screen bg-[#020617] flex flex-col items-center justify-center",children:[(0,t.jsx)("div",{className:"w-16 h-16 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin mb-4"}),(0,t.jsx)("p",{className:"text-[10px] font-black uppercase tracking-[0.4em] text-blue-500/50",children:"Accessing Secure Lead..."})]});if(!E)return(0,t.jsx)("div",{className:"p-20 text-center text-white font-black",children:"RFQ DATA NOT FOUND."});let S=E.quantity*E.targetUnitPrice,I=E.productId;return(0,t.jsxs)("div",{className:"min-h-screen bg-[#020617] text-slate-100 pb-24",children:[(0,t.jsx)("div",{className:"bg-[#0F172A]/80 border-b border-blue-900/30 px-8 py-6 sticky top-0 z-50 backdrop-blur-xl",children:(0,t.jsxs)("div",{className:"max-w-7xl mx-auto flex justify-between items-center",children:[(0,t.jsxs)(v.default,{href:"/vendor/rfq",className:"flex items-center gap-2 group",children:[(0,t.jsx)("div",{className:"p-2 bg-blue-900/20 rounded-lg group-hover:bg-blue-800/40 border border-blue-800/20 transition-all",children:(0,t.jsx)(c.ArrowLeft,{size:16,className:"text-blue-400"})}),(0,t.jsx)("span",{className:"text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-400",children:"Exit Terminal"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20",children:[(0,t.jsx)(b.ShieldCheck,{size:14,className:"text-emerald-400"}),(0,t.jsx)("span",{className:"text-[9px] font-black uppercase tracking-widest text-emerald-400",children:"Identity Verified"})]})]})}),(0,t.jsxs)("main",{className:"max-w-6xl mx-auto px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12",children:[(0,t.jsxs)("div",{className:"lg:col-span-7 space-y-8",children:[(0,t.jsx)("div",{className:"bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-[3rem] border border-blue-900/30 overflow-hidden shadow-2xl p-8",children:(0,t.jsxs)("div",{className:"flex flex-col md:flex-row gap-8 items-center",children:[(0,t.jsx)("div",{className:"w-full md:w-48 h-48 bg-black/40 rounded-[2rem] border border-white/5 overflow-hidden flex-shrink-0",children:I?.images?.[0]?(0,t.jsx)("img",{src:I.images[0],alt:I.name,className:"w-full h-full object-cover"}):(0,t.jsx)("div",{className:"w-full h-full flex items-center justify-center text-blue-500/20",children:(0,t.jsx)(h.Package,{size:64})})}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-3",children:[(0,t.jsx)("span",{className:"px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[8px] font-black text-blue-400 uppercase tracking-widest",children:"Selected Asset"}),(0,t.jsxs)("span",{className:"text-slate-500 text-[10px] font-bold",children:["Category: ",I?.category||"Industrial"]})]}),(0,t.jsx)("h2",{className:"text-3xl font-[1000] tracking-tighter text-white uppercase italic leading-tight",children:I?.name||"Unknown Product"}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-4 mt-6",children:[(0,t.jsxs)("div",{className:"bg-black/20 p-4 rounded-2xl border border-white/5",children:[(0,t.jsx)("p",{className:"text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1",children:"Market Price"}),(0,t.jsxs)("p",{className:"text-lg font-black text-white",children:["$",I?.pricePerUnit||0]})]}),(0,t.jsxs)("div",{className:"bg-black/20 p-4 rounded-2xl border border-white/5",children:[(0,t.jsx)("p",{className:"text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1",children:"In Stock"}),(0,t.jsxs)("p",{className:"text-lg font-black text-blue-400",children:[I?.stock||0," Units"]})]})]})]})]})}),(0,t.jsxs)("div",{className:"bg-[#0F172A] rounded-[3rem] border border-blue-900/30 overflow-hidden shadow-2xl",children:[(0,t.jsxs)("div",{className:"p-10 border-b border-blue-900/20 flex justify-between items-start",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:"text-4xl font-[1000] tracking-tighter text-white uppercase italic",children:"Deal Analysis"}),(0,t.jsxs)("p",{className:"text-blue-400/60 text-xs font-black tracking-[0.2em] mt-2",children:["UUID: ",E._id.slice(-12)]})]}),(0,t.jsx)("div",{className:`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase border ${"PENDING"===E.status?"bg-amber-500/10 border-amber-500/20 text-amber-500":"bg-blue-500/10 border-blue-500/20 text-blue-500"}`,children:E.status})]}),(0,t.jsxs)("div",{className:"p-10",children:[(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-6 mb-10",children:[(0,t.jsxs)("div",{className:"bg-[#1E293B]/40 p-6 rounded-[2rem] border border-blue-900/10 relative overflow-hidden group",children:[(0,t.jsx)(h.Package,{className:"absolute -right-2 -bottom-2 w-16 h-16 text-white/5 group-hover:text-blue-500/10 transition-colors"}),(0,t.jsx)("p",{className:"text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2",children:"Requested Volume"}),(0,t.jsxs)("p",{className:"text-3xl font-black text-white",children:[E.quantity.toLocaleString()," ",(0,t.jsx)("span",{className:"text-xs text-slate-500",children:"Units"})]})]}),(0,t.jsxs)("div",{className:"bg-[#1E293B]/40 p-6 rounded-[2rem] border border-blue-900/10",children:[(0,t.jsx)("p",{className:"text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2",children:"Proposed Unit Price"}),(0,t.jsxs)("p",{className:"text-3xl font-black text-white",children:["$",E.targetUnitPrice]})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-6 p-6 bg-[#1E293B]/20 rounded-[2rem] border border-blue-900/10 mb-10",children:[(0,t.jsx)("div",{className:"w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20",children:(0,t.jsx)(p,{size:32,className:"text-white"})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1",children:"Procurement Officer"}),(0,t.jsx)("h3",{className:"text-xl font-black text-white",children:E.buyerId?.name||"Corporate Buyer"}),(0,t.jsx)("p",{className:"text-xs text-blue-400 font-bold",children:E.buyerId?.email})]})]}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(f.MessageSquare,{size:14,className:"text-blue-500"}),(0,t.jsx)("span",{className:"text-[10px] font-black text-slate-500 uppercase tracking-widest",children:"Buyer Requirements"})]}),(0,t.jsxs)("div",{className:"bg-[#1E293B]/50 p-6 rounded-2xl border-l-4 border-blue-600 italic text-slate-300 text-sm leading-relaxed",children:['"',E.message||"Implicit commitment. No additional memo provided.",'"']})]})]})]})]}),(0,t.jsxs)("div",{className:"lg:col-span-5 space-y-6",children:[(0,t.jsxs)("div",{className:"bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-600/30 relative overflow-hidden group",children:[(0,t.jsx)(x.Zap,{className:"absolute -right-4 -top-4 w-32 h-32 text-white/10 rotate-12"}),(0,t.jsx)("p",{className:"text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/60 mb-2",children:"Contract Liquidity"}),(0,t.jsxs)("h3",{className:"text-5xl font-[1000] tracking-tighter",children:["$",S.toLocaleString()]}),(0,t.jsxs)("div",{className:"mt-8 flex items-center gap-3 p-3 bg-black/20 rounded-xl border border-white/10 backdrop-blur-md",children:[(0,t.jsx)(g.TrendingUp,{size:16,className:"text-emerald-400"}),(0,t.jsx)("p",{className:"text-[10px] font-bold text-blue-50 tracking-tight uppercase italic",children:"Total Negotiated Value"})]})]}),(0,t.jsxs)("div",{className:"bg-white rounded-[3rem] p-10 text-slate-900 shadow-2xl relative",children:[(0,t.jsx)("h2",{className:"text-2xl font-[1000] tracking-tighter mb-8 uppercase text-center",children:"Execute Decision"}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("button",{onClick:()=>O.mutate({status:"ACCEPTED"}),disabled:O.isPending||k,className:"w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl shadow-emerald-200 transition-all active:scale-95 disabled:opacity-50",children:[(0,t.jsx)(d,{size:18})," Approve Contract"]}),k?(0,t.jsxs)("div",{className:"space-y-4 animate-in slide-in-from-top-2 duration-300",children:[(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(m.DollarSign,{className:"absolute left-5 top-1/2 -translate-y-1/2 text-slate-400",size:18}),(0,t.jsx)("input",{autoFocus:!0,type:"number",placeholder:"Enter Counter Unit Price...",value:R,onChange:e=>N(e.target.value),className:"w-full pl-12 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus:border-blue-500 transition-all outline-none font-black text-lg"})]}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("button",{onClick:()=>O.mutate({status:"NEGOTIATING",price:Number(R)}),disabled:O.isPending,className:"flex-1 py-4 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase",children:O.isPending?"Sending...":"Send Offer"}),(0,t.jsx)("button",{onClick:()=>j(!1),className:"px-6 py-4 bg-slate-100 text-slate-400 rounded-xl font-black text-[10px] uppercase",children:"Cancel"})]})]}):(0,t.jsxs)("button",{onClick:()=>j(!0),className:"w-full py-6 bg-slate-900 text-white hover:bg-blue-600 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all",children:[(0,t.jsx)(y.RefreshCcw,{size:18})," Initiate Counter"]}),(0,t.jsx)("button",{onClick:()=>O.mutate({status:"REJECTED"}),disabled:O.isPending,className:"w-full py-4 text-slate-400 hover:text-red-500 font-black text-[10px] uppercase tracking-[0.3em] transition-colors mt-4",children:"Permanently Decline"})]})]})]})]})]})}e.s(["default",()=>w],44497)}]);