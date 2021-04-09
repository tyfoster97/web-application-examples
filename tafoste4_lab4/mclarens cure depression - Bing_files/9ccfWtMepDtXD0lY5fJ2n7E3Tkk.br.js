var __assign=this&&this.__assign||function(){return __assign=Object.assign||function(n){for(var t,r,i=1,u=arguments.length;i<u;i++){t=arguments[i];for(r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},__assign.apply(this,arguments)},__rest=this&&this.__rest||function(n,t){var u={},r;for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&t.indexOf(i)<0&&(u[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(r=0,i=Object.getOwnPropertySymbols(n);r<i.length;r++)t.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(n,i[r])&&(u[i[r]]=n[i[r]]);return u},__spreadArrays=this&&this.__spreadArrays||function(){for(var i=0,n=0,r=arguments.length;n<r;n++)i+=arguments[n].length;for(var u=Array(i),f=0,n=0;n<r;n++)for(var e=arguments[n],t=0,o=e.length;t<o;t++,f++)u[f]=e[t];return u},__awaiter=this&&this.__awaiter||function(n,t,i,r){function u(n){return n instanceof i?n:new i(function(t){t(n)})}return new(i||(i=Promise))(function(i,f){function o(n){try{e(r.next(n))}catch(t){f(t)}}function s(n){try{e(r["throw"](n))}catch(t){f(t)}}function e(n){n.done?i(n.value):u(n.value).then(o,s)}e((r=r.apply(n,t||[])).next())})},__generator=this&&this.__generator||function(n,t){function o(n){return function(t){return s([n,t])}}function s(e){if(f)throw new TypeError("Generator is already executing.");while(r)try{if(f=1,u&&(i=e[0]&2?u["return"]:e[0]?u["throw"]||((i=u["return"])&&i.call(u),0):u.next)&&!(i=i.call(u,e[1])).done)return i;(u=0,i)&&(e=[e[0]&2,i.value]);switch(e[0]){case 0:case 1:i=e;break;case 4:return r.label++,{value:e[1],done:!1};case 5:r.label++;u=e[1];e=[0];continue;case 7:e=r.ops.pop();r.trys.pop();continue;default:if(!(i=r.trys,i=i.length>0&&i[i.length-1])&&(e[0]===6||e[0]===2)){r=0;continue}if(e[0]===3&&(!i||e[1]>i[0]&&e[1]<i[3])){r.label=e[1];break}if(e[0]===6&&r.label<i[1]){r.label=i[1];i=e;break}if(i&&r.label<i[2]){r.label=i[2];r.ops.push(e);break}i[2]&&r.ops.pop();r.trys.pop();continue}e=t.call(n,r)}catch(o){e=[6,o];u=0}finally{f=i=0}if(e[0]&5)throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}var r={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},f,u,i,e;return e={next:o(0),"throw":o(1),"return":o(2)},typeof Symbol=="function"&&(e[Symbol.iterator]=function(){return this}),e};define("InstrumentPreact",["require","exports"],function(n,t){"use strict";var i;Object.defineProperty(t,"__esModule",{value:!0});t.InstForm=t.Region=t.InstLinkClient=t.InstLink=t.logTime=t.logHide=t.logShow=t.logClick=t.logHiddenLink=t.logDataEvent=t.resetInstrumentation=void 0;i={};t.resetInstrumentation=function(){i={}};var u="HpApp",e=function(n){return Array.prototype.slice.apply(n).reduce(function(n,t,i){return n+(i+1)*t.charCodeAt(0)},0)},o=function(n,t){return n+t},f=function(n,t,r){var f=o(n,t),s="",h=!1;return f in i?r&&r.current&&(i[f]=r.current.getAttribute("data-h"),s=i[f].slice(3)):(s=e((t||"root")+"."+n)+".1",i[f]="ID="+u+","+s,h=!0),{key:f,h:i[f],id:s,isNew:h}},r=function(n,t){for(var i=[],r=2;r<arguments.length;r++)i[r-2]=arguments[r];setTimeout(function(){window&&window.performance&&window.performance.now&&i.push("time",Math.round(performance.now()));Log&&Log.Log&&Log.Log.apply(Log,__spreadArrays([n,"HP",t,!0],i||[]))},0)};t.logDataEvent=function(n){for(var i=[],t=1;t<arguments.length;t++)i[t-1]=arguments[t];r.apply(void 0,__spreadArrays(["Data",n],i||[]))};t.logHiddenLink=function(n){var t=document.getElementById(n);t&&si_T(t.getAttribute("h"))};t.logClick=function(n){for(var i=[],t=1;t<arguments.length;t++)i[t-1]=arguments[t];r.apply(void 0,__spreadArrays(["DHTMLClick",n],i||[]))};t.logShow=function(n){for(var i=[],t=1;t<arguments.length;t++)i[t-1]=arguments[t];r.apply(void 0,__spreadArrays(["Show",n],i||[]))};t.logHide=function(n){for(var i=[],t=1;t<arguments.length;t++)i[t-1]=arguments[t];r.apply(void 0,__spreadArrays(["Hide",n],i||[]))};t.logTime=function(n){window&&window.performance&&window.performance.now&&r("Latency",n,"Time",Math.round(performance.now()))};t.InstLink=function(n){var s=n.children,t=n.nodeName,i=n.parentNodeName,r=n.href,h=n.loggingData,c=__rest(n,["children","nodeName","parentNodeName","href","loggingData"]),o=preactHooks.useRef(null),e=f(t,i,o),l=e.h,a=e.id,v=e.isNew;return typeof ServerSideLayoutInstrumentation!="undefined"&&v&&(ServerSideLayoutInstrumentation.startLink(u,a,t,i,r),ServerSideLayoutInstrumentation.closeLink()),preact.h("a",__assign({href:r,"data-h":l,ref:o,onClick:function(){Log&&Log.Log&&Log.Log.apply(Log,__spreadArrays(["Click","HP",t,!0,"nodeName",t,"parentNodeName",i,"url",r],h||[]))}},c),s)};t.InstLinkClient=function(n){var u=n.children,i=n.href,t=n.nodeName,r=n.parentNodeName,e=n.loggingData,o=__rest(n,["children","href","nodeName","parentNodeName","loggingData"]),s=f(t,r).h;return preact.h("a",__assign({href:i,"data-h":s,onClick:function(){Log&&Log.Log&&Log.Log.apply(Log,__spreadArrays(["Click","HP",t,!0,"nodeName",t,"parentNodeName",r,"url",i],e||[]))}},o),u)};t.Region=function(n){var e=n.children,t=n.nodeName,i=n.parentNodeName,o=n.insertId,s=f(t,i).isNew,r;return typeof ServerSideLayoutInstrumentation!="undefined"&&s&&(r={appNS:u,type:"L.Box",insertId:o,displayRegion:t},ServerSideLayoutInstrumentation.startRegion(r,t,i),ServerSideLayoutInstrumentation.closeRegion()),preact.h(preact.Fragment,null,e)};t.InstForm=function(n){var h=n.children,t=n.nodeName,r=n.parentNodeName,s=n.loggingData,c=__rest(n,["children","nodeName","parentNodeName","loggingData"]),i=preactHooks.useRef(null),e=f(t,r,i),o=e.h,l=e.id,a=e.isNew;return typeof ServerSideLayoutInstrumentation!="undefined"&&a&&(ServerSideLayoutInstrumentation.startLink(u,l,t,r),ServerSideLayoutInstrumentation.closeLink()),preactHooks.useEffect(function(){i&&i.current&&(i.current.onsubmit=function(){Log.Log.apply(Log,__spreadArrays(["Click","HP",t,!0,"nodeName",t,"parentNodeName",r,"click_type","form"],s||[]));si_T&&si_T(o)})},[i.current]),preact.h("form",__assign({ref:i,"data-h":o,onSubmit:function(){Log.Log.apply(Log,__spreadArrays(["Click","HP",t,!0,"nodeName",t,"parentNodeName",r,"click_type","form"],s||[]));si_T&&si_T(o)}},c||[]),h)}});define("Components/Core/HooksPreact",["require","exports","InstrumentPreact"],function(n,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.useGraphQl=t.useAudio=t.useForceUpdate=t.useClientRect=t.useFetch=t.useClientSideRender=t.useClientSettings=t.useScrollPosition=t.useSpeechRecognizer=void 0;t.useSpeechRecognizer=function(n,t,i){t===void 0&&(t=null);i===void 0&&(i="");var r=preactHooks.useState(null),u=r[0],f=r[1];return preactHooks.useEffect(function(){var u=location.protocol=="https:"?"wss:":"ws:",e=t?"?"+Object.keys(t).map(function(n){return n+"="+t[n]}).join("&"):"",o=""+u+n+e,r=SpeechSDK.SpeechConfig.fromEndpoint(new URL(o),"key"),s=SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();i&&(r.speechRecognitionLanguage=i);f(new SpeechSDK.SpeechRecognizer(r,s))},[]),[u]};t.useScrollPosition=function(n,t){var i=preactHooks.useState({top:0,left:0}),u=i[0],r=i[1];return preactHooks.useEffect(function(){if(n){var t=function(){r({left:n.scrollLeft,top:n.scrollTop})};return n.addEventListener("scroll",t),function(){n&&n.removeEventListener&&n.removeEventListener("scroll",t)}}},[n]),preactHooks.useEffect(function(){n&&r({left:n.scrollLeft,top:n.scrollTop})},[t]),u};t.useClientSettings=function(n){var i=preactHooks.useState(n.ClientSettings),t=i[0],r=i[1];return n.ClientSettings=__assign({},t),preactHooks.useEffect(function(){var i=btoa(JSON.stringify(t)),n;sj_cook.set("_HPVN","CS",i,!0,"/");n=document.createEvent("CustomEvent");n.initCustomEvent("ClientSettingsUpdated",!0,!0,t);dispatchEvent(n)},[t]),preactHooks.useEffect(function(){addEventListener("ClientSettingsUpdated",function(n){n.detail&&(r(n.detail),window._model.ClientSettings=n.detail)})},[]),{clientSettings:t,updateClientSettings:r}};t.useClientSideRender=function(){var n=preactHooks.useState(!1),t=n[0],i=n[1];return preactHooks.useEffect(function(){i(!0)},[]),t};t.useFetch=function(n,t,r,u,f){t===void 0&&(t="json");r===void 0&&(r=null);f===void 0&&(f="GET");var o=preactHooks.useState(r),s=o[0],e=o[1];return preactHooks.useEffect(function(){return __awaiter(void 0,void 0,void 0,function(){var r,o;return __generator(this,function(){return(r=n,!r)?[2,null]:(r+=r.indexOf("?")>0?"&"+location.search.slice(1):location.search,typeof i.logDataEvent!="undefined"&&i.logDataEvent("requested","func","useFetch","url",r,"format",t),o={method:f,mode:"cors",credentials:"include",body:u,headers:{"Content-type":"application/json"}},fetch(r,o).then(function(n){return typeof i.logDataEvent!="undefined"&&i.logDataEvent("fetched","func","useFetch","url",r,"format",t,"status",n.status),t=="html"||t=="dom"?n.text():n.json()}).then(function(n){if(typeof i.logDataEvent!="undefined"&&i.logDataEvent("parsed","func","useFetch","url",r,"format",t),t=="dom"||t=="html"){var f=new DOMParser,u=f.parseFromString(n,"text/html");t=="html"?e(u.body.innerHTML):e(u)}else e(n)}).catch(function(n){typeof i.logDataEvent!="undefined"&&i.logDataEvent("error","func","useFetch","url",r,"format",t,"message",n);e(null)}),[2])})})},[n]),s};t.useClientRect=function(n){var t=preactHooks.useState(null),i=t[0],r=t[1];return preactHooks.useEffect(function(){n&&r(n.getBoundingClientRect())},[n]),i};t.useForceUpdate=function(){var n=preactHooks.useState(0),i=n[0],t=n[1];return function(){return t(function(n){return++n})}};t.useAudio=function(n){var o=preactHooks.useState(n),u=o[0],c=o[1],s=preactHooks.useState(!1),f=s[0],i=s[1],h=preactHooks.useState(null),t=h[0],r=h[1],e=function(){r(null);i(!1)};return preactHooks.useEffect(function(){u?r(new Audio(u)):i(!1)},[u]),preactHooks.useEffect(function(){t&&(t.onpause=e,t.onended=e,t.onerror=e,i(!0))},[t]),preactHooks.useEffect(function(){t&&(f?t.play().catch(function(){r(null);i(!1)}):t&&(t.pause(),r(null)))},[f]),[f,c]};t.useGraphQl=function(n,i,r){var u={query:i,variables:r};return t.useFetch(n,"json",null,JSON.stringify(u))}});define("Components/Core/SpeechPreact",["require","exports","Components/Core/HooksPreact","InstrumentPreact"],function(n,t,i,r){"use strict";var u,f;Object.defineProperty(t,"__esModule",{value:!0});t.Speech=void 0,function(n){n.Waiting="Waiting...";n.Listening="Listening...";n.Blocked="Microphone permissions denied, check browser settings.";n.NoMic="No microphone device was found"}(u||(u={})),function(n){n.None="";n.Error="There was a problem accessing your microphone.";n.NoText="No speech was detected."}(f||(f={}));var e=preact.createContext(null),o=typeof _model!="undefined"&&_model.IsMobile||typeof _vs!="undefined"&&_vs.mobile||!1,h=typeof _vs!="undefined"&&_vs.reopenmic||!1,y=typeof _model!="undefined"&&_model.IsChromeNewTab,p=typeof _model!="undefined"&&_model.FormCode?_model.FormCode:"QBLH",c=typeof _vs!="undefined"&&_vs.usegif||!1,w=typeof _vs!="undefined"&&_vs.ttsFromSsmlEnabled||!1,b=typeof _vs!="undefined"&&_vs.permRequestOverlayEnabled||!1,k=typeof _vs!="undefined"&&_vs.allowForceQuery||!1,l=typeof _vs!="undefined"&&_vs.testOverlay||"";t.Speech=function(n){var t=n.props,v=preactHooks.useState(!1),h=v[0],p=v[1],w=preactHooks.useState(null),at=w[0],vt=w[1],b=preactHooks.useState(null),yt=b[0],pt=b[1],k=preactHooks.useState(null),wt=k[0],bt=k[1],d=preactHooks.useState(!1),kt=d[0],dt=d[1],g=preactHooks.useState(!1),c=g[0],gt=g[1],nt=preactHooks.useState(u.Waiting),ni=nt[0],rt=nt[1],ut=preactHooks.useState(f.None),ti=ut[0],ii=ut[1],ft=preactHooks.useState(!1),ri=ft[0],ui=ft[1],et=preactHooks.useState(!1),fi=et[0],ot=et[1],st=i.useAudio(null),ei=st[0],oi=st[1],ht=preactHooks.useState(!1),si=ht[0],hi=ht[1],s=t.loggingName,ct=t.textareaId,ci=t.handleText,li=t.iconInit,ai=t.isPartner,vi=t.langLocQuery,yi=t.langLocProp,pi=o?"Mobile":y?"ChromeNewTab":"Desktop",wi=t.clientbuild+pi,bi=t.allowReadout,lt,a;return typeof Promise=="undefined"?(r.logDataEvent(s,"PromiseUndefined",!0),null):(lt=function(){return{recording:h,updateRecordingState:p,hypothesisText:yt,updateHypothesisText:pt,detectedText:at,updateDetectedText:vt,earcons:wt,readoutPlayed:kt,updateReadoutPlayed:dt,readoutEnabled:c,microphoneState:ni,updateMicrophoneState:rt,isPartner:ai,errorState:ti,updateErrorState:ii,shouldReopenMic:ri,updateReopenMic:ui,loggingName:s,textareaId:ct,handleText:ci,iconInit:li,clientbuild:wi,langLocQuery:vi,langLocProp:yi,showPromptOverlay:fi,updateShowOverlay:ot,allowReadout:bi,audioPlaying:ei,updateAudioSource:oi,showUpsell:si,updateShowUpsell:hi}},l=="micAsk"?ot(!0):l=="micBlocked"&&(p(!1),rt(u.Blocked)),a=function(n){r.logDataEvent(s,"sbox","typing");n.target.removeEventListener("input",a)},preactHooks.useEffect(function(){var n=sj_cook.get("SRCHHPGUSR","VSRO");gt(!n||n=="1")},[]),preactHooks.useEffect(function(){c&&(typeof Audio!="undefined"?bt({start:new Audio("/vs/ec/start.mp3"),stop:new Audio("/vs/ec/stop.mp3")}):r.logDataEvent(s,"AudioUndefined",!0))},[c]),preactHooks.useEffect(function(){var n=document.querySelector(ct);n&&n.addEventListener("input",a);r.logDataEvent(s,"comp","loaded")},[]),preactHooks.useEffect(function(){var n=document.querySelector(".mic_cont"),t=document.querySelector(".dimmer");h?(n&&n.classList.remove("icon"),t&&t.classList.add("dim")):(n&&!n.classList.contains("icon")&&n.classList.add("icon"),t&&t.classList.remove("dim"))},[h]),preact.h(e.Provider,{value:lt()},h?preact.h(tt,null):preact.h(it,null)))};var d=function(){var n=preactHooks.useContext(e).recording;return preact.h("div",null,n?preact.h("input",{type:"hidden",name:"uquinputtype",value:"speech"}):null,preact.h("input",{type:"hidden",name:"uquresponseformat",value:n?1:0}),preact.h("input",{type:"hidden",name:"uqubfprlg",value:n?1:0}),preact.h("input",{type:"hidden",name:"clientid",value:sj_cook.get("MUID","MUID")}),preact.h("input",{type:"hidden",name:"input",value:2}))},g=function(){var n=preactHooks.useContext(e),i=n.hypothesisText,r=n.detectedText,o=n.microphoneState,s=n.errorState,t=i||r,h=t?escape(r):et(o),c=s!=f.None?ot(s):h,l=typeof _vs!="undefined"&&_vs&&_vs.locstr&&_vs.locstr.nomicLinkText?_vs.locstr.nomicLinkText:"Setting up a microphone",a="/search?q="+(typeof _vs!="undefined"&&_vs&&_vs.locstr&&_vs.locstr.nomicQuery?_vs.locstr.nomicQuery:"set up microphone");return preact.h("div",{className:"b_rec_text "+(t?"":"b_placeholder"),tabIndex:0},preact.h("span",null,c),preact.h("span",{className:"b_hyp"},t?i:""),o==u.NoMic?preact.h("a",{id:"b_noMic",href:a},l):null)},nt=function(){var n=preactHooks.useContext(e),i=n.updateMicrophoneState,f=n.loggingName,t=function(){var n=_ge("b_blocked_background");n.parentElement.removeChild(n);i(u.Waiting);r.logHiddenLink("link_noop");r.logClick(f,"click","blockedUXClose")},o=typeof _vs!="undefined"&&_vs&&_vs.locstr&&_vs.locstr.blockedtitle?_vs.locstr.blockedtitle:"Microphone blocked",s=typeof _vs!="undefined"&&_vs&&_vs.locstr&&_vs.locstr.blockeddesc?_vs.locstr.blockeddesc:"This page has been blocked from accessing your microphone.",h=typeof _vs!="undefined"&&_vs&&_vs.locstr&&_vs.locstr.blockedfix?_vs.locstr.blockedfix:"To allow Bing to access your microphone, click on the blocked microphone icon.",l=typeof _vs!="undefined"&&_vs&&_vs.locstr&&_vs.locstr.blockeddismiss?_vs.locstr.blockeddismiss:"Dismiss";return preact.h("div",{id:"b_blocked_background",onClick:function(){t()}},preact.h("div",{id:"b_blocked_overlay",onClick:sj_sp,tabIndex:-1},preact.h("div",{id:"b_blocked_title"},o),preact.h("div",{id:"b_blocked_desc"},s),preact.h("div",{id:"b_blocked_fix_cont"},preact.h("div",{id:"b_blocked_mic",className:c?"b_blocked_gif":""},c?null:preact.h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 2048 2048",width:"24",height:"24"},preact.h("path",{d:"M704 1536q-40 0-75-15t-61-41-41-61-15-75V192q0-40 15-75t41-61 61-41 75-15h512q40 0 75 15t61 41 41 61 15 75v834q-34 11-66 25t-62 34V192q0-26-19-45t-45-19H704q-26 0-45 19t-19 45v1152q0 26 19 45t45 19h320v128H704zm896-384q93 0 174 35t143 96 96 142 35 175q0 93-35 174t-96 143-142 96-175 35q-93 0-174-35t-143-96-96-142-35-175q0-93 35-174t96-143 142-96 175-35zm0 768q66 0 124-25t101-68 69-102 26-125q0-66-25-124t-69-101-102-69-124-26q-66 0-124 25t-102 69-69 102-25 124q0 66 25 124t68 102 102 69 125 25zm-515 0q45 71 107 128H640v-128h256v-128H662q-84 0-158-32t-129-87-87-129-32-158v-362h128v362q0 57 22 108t59 88 89 60 108 22h362v256h61zm699-424l-105 104 105 104-80 80-104-105-104 105-80-80 105-104-105-104 80-80 104 105 104-105 80 80z"}))),preact.h("div",{id:"b_blocked_fix"},h)),preact.h("button",{id:"b_blocked_close",onClick:function(){t()},tabIndex:0},l)))},tt=function(){var n=preactHooks.useContext(e),c=n.earcons,y=n.detectedText,it=n.updateDetectedText,w=n.hypothesisText,b=n.updateHypothesisText,at=n.recording,rt=n.updateRecordingState,nt=n.microphoneState,l=n.updateMicrophoneState,vt=n.isPartner,ut=n.updateErrorState,h=n.loggingName,yt=n.clientbuild,ot=n.langLocQuery,tt=n.langLocProp,st="xx-yy",a,ht,v,ct,ft;ot&&tt&&(a=_d.querySelector(ot),a&&a[tt]&&a[tt]!==""&&(st=a[tt]));ht=typeof _vs!="undefined"&&_vs&&_vs.anon;v={clientbuild:yt,referer:encodeURIComponent(document.location.href).substring(0,1e3),form:vt?"QBRE":p};ht&&(v.preferanonymous="1");URLSearchParams&&(ct=new URLSearchParams(window.location.search),ft=ct.get("location"),ft&&(v.location=ft));(_G===null||_G===void 0?void 0:_G.IG)&&(v.uqurequestid=_G.IG);var t=i.useSpeechRecognizer("//www.bing.com/opaluqu/speech/recognition/interactive/cognitiveservices/v1",v,st)[0],et=function(){t.close();rt(!1);c&&c.stop&&c.stop.play();it("");b("");l(u.Waiting);ut(f.None);r.logHiddenLink("link_noop");r.logClick(h,"click","micx")},lt=function(n){var t=_d.querySelector(".b_speech_overlay");at&&t&&!t.contains(n.target)&&et()};return preactHooks.useEffect(function(){if(t)return it(""),b(""),_d.addEventListener("click",lt),t.sessionStarted=function(){c&&c.start&&c.start.play();l(u.Listening)},t.recognized=function(n,t){var i=t.result.text;b("");it(i)},t.recognizing=function(n,t){var i=t.result.text;b(i)},t.speechEndDetected=function(){},t.sessionStopped=function(){var n=preactHooks.useContext(e).detectedText;typeof n=="undefined"?(ut(f.NoText),l(u.Waiting),r.logDataEvent(h,"empty",!0)):rt(!1)},t.recognizeOnceAsync(function(){},function(n){n.endsWith("NotAllowedError: Permission denied")?(l(u.Blocked),r.logDataEvent(h,"blocked",!0),o||rt(!1)):n.endsWith("NotFoundError: Requested device not found")?(r.logDataEvent(h,"nomic",!0),l(u.NoMic)):(ut(f.Error),r.logDataEvent(h,"error",n))}),function(){var n=preactHooks.useContext(e).detectedText;_d.removeEventListener("click",lt);s(n)}},[t]),preact.h("div",{className:"b_speech_overlay"},o?preact.h("div",{className:"b_speech_bg",onClick:function(){et()}}):null,preact.h("div",{className:"b_speech_cont"},preact.h(g,null),preact.h("div",{className:"b_close",onClick:function(){if(y+w!=""&&y+w!="undefined")r.logClick(h,"click","forcequery"),s(y+w);else if(k&&(y+w=="undefined"||nt==u.Listening)){r.logClick(h,"click","forcequeryHello");var n=typeof _vs!="undefined"&&_vs&&_vs.locstr&&_vs.locstr.helloQuery?_vs.locstr.helloQuery:"hello";s(n)}else et()}},preact.h("svg",{width:"102",height:"102",viewBox:"0 0 102 102",fill:"none"},preact.h("circle",{className:nt==u.Listening?"b_pulse":"",cx:"51",cy:"51",r:"40",fill:"#007698","fill-opacity":"0.2"}),preact.h("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M51 91C73.0914 91 91 73.0914 91 51C91 28.9086 73.0914 11 51 11C28.9086 11 11 28.9086 11 51C11 73.0914 28.9086 91 51 91Z",fill:"#267596"}),preact.h("mask",{id:"mask0","mask-type":"alpha",maskUnits:"userSpaceOnUse",x:"11",y:"11",width:"80",height:"80"},preact.h("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M51 91C73.0914 91 91 73.0914 91 51C91 28.9086 73.0914 11 51 11C28.9086 11 11 28.9086 11 51C11 73.0914 28.9086 91 51 91Z",fill:"white"})),preact.h("g",{mask:"url(#mask0)"},preact.h("path",{className:nt==u.Listening?"b_wave":"",opacity:"0.689286","fill-rule":"evenodd","clip-rule":"evenodd",d:"M-25 63.7205C65.4167 64.6725 43.2719 38.6305 126.786 26V108.802H-25V63.7205Z",fill:"#4290B8"}),preact.h("path",{className:nt==u.Listening?"b_wave":"",opacity:"0.689286","fill-rule":"evenodd","clip-rule":"evenodd",d:"M-28 53.2162C-28 53.2162 14.3477 25.984 45.2093 36.3562C76.0709 46.7284 113.462 88.2649 112.362 88.6179V107.078H-28V53.2162Z",fill:"#42A5B8"})),preact.h("svg",{viewBox:"-15 -15 50 50"},preact.h("path",{d:"m0 0h20v20h-20z",fill:"none"}),preact.h("path",{className:"icon_path",d:"m16.379 11.694c-.458-.194-.983-.019-1.241.406-.252.416-.553.8-.895 1.142-.544.543-1.191.983-1.908 1.286-.717.304-1.504.472-2.335.472s-1.618-.168-2.335-.471-1.364-.743-1.908-1.286c-.342-.343-.644-.726-.895-1.142-.257-.425-.783-.6-1.24-.407-.552.233-.793.906-.484 1.42.338.563.744 1.081 1.205 1.543.723.722 1.584 1.308 2.542 1.714.664.28 1.375.467 2.115.56v2.069c0 .552.448 1 1 1s1-.448 1-1v-2.069c.74-.093 1.451-.279 2.114-.559h.001c.958-.406 1.819-.991 2.542-1.713l.001-.001c.461-.462.866-.979 1.205-1.542.308-.516.068-1.188-.484-1.422zm-6.379 1.306c2.209 0 4-1.791 4-4v-5c0-2.209-1.791-4-4-4s-4 1.791-4 4v5c0 2.209 1.791 4 4 4zm-2-9c0-1.103.897-2 2-2s2 .897 2 2v5c0 1.103-.897 2-2 2s-2-.897-2-2z",fill:"white"})))),preact.h(d,null)))},it=function(){var n=preactHooks.useContext(e),ot=n.updateRecordingState,v=n.readoutPlayed,st=n.updateReadoutPlayed,y=n.microphoneState,i=n.updateMicrophoneState,p=n.recording,w=n.readoutEnabled,ht=n.shouldReopenMic,k=n.updateReopenMic,ct=n.updateErrorState,t=n.loggingName,d=n.iconInit,at=n.showPromptOverlay,g=n.updateShowOverlay,lt=n.allowReadout,s=n.audioPlaying,tt=n.updateAudioSource,it=function(){var n=_ge("b_vsblock");n&&n.parentElement.removeChild(n)},vt=function(){var n=_ge("b_vsov");n&&n.parentElement.removeChild(n)},l,a,c,et;return o&&(sj_evt.bind("autosuggestHide",function(){var n=_d.querySelector(".mic_cont");n&&Lib.CssClass.remove(n,"b_hide")}),sj_evt.bind("AS.RequestSent",function(){var n=_d.querySelector(".mic_cont");n&&Lib.CssClass.add(n,"b_hide")})),preactHooks.useEffect(function(){var t,n;return o||p||y!=u.Blocked?it():(t=sj_ce("div","b_vsblock"),sj_b.appendChild(t),preact.render(nt(),t),n=_d.querySelector("#b_blocked_overlay"),n&&n.focus&&n.focus()),it},[p,y]),l=function(){return __awaiter(void 0,void 0,void 0,function(){var o,n,e;return __generator(this,function(s){switch(s.label){case 0:return(b&&((n=navigator===null||navigator===void 0?void 0:navigator.permissions)===null||n===void 0?void 0:n.query))?[4,navigator.permissions.query({name:"microphone"})]:[3,2];case 1:o=s.sent();o.state=="prompt"&&g(!0);s.label=2;case 2:return((e=navigator===null||navigator===void 0?void 0:navigator.mediaDevices)===null||e===void 0?void 0:e.getUserMedia)?[4,navigator.mediaDevices.getUserMedia({audio:!0}).then(function(){i(u.Listening)}).catch(function(n){n.name=="NotAllowedError"?(i(u.Blocked),r.logDataEvent(t,"blocked",!0)):n.name=="NotFoundError"?(i(u.NoMic),r.logDataEvent(t,"nomic",!0)):(ct(f.Error),r.logDataEvent(t,"getUserMediaError",n))})]:[3,4];case 3:return s.sent(),[3,5];case 4:i(u.Waiting);s.label=5;case 5:return g(!1),ot(!0),[2]}})})},a=function(){return __awaiter(void 0,void 0,void 0,function(){return __generator(this,function(){return r.logHiddenLink("link_noop"),s?(tt(null),r.logClick(t,"spokenResponse","userStopped")):(l(),r.logClick(t,"click","mic")),[2]})})},preactHooks.useEffect(function(){d&&d()},[]),preactHooks.useEffect(function(){!v&&w&&lt&&(st(!0),ft(k,t).then(function(n){n!=""&&(tt(n),r.logDataEvent(t,"spokenResponse","startPlaying"))}))},[w]),preactHooks.useEffect(function(){h&&ht&&v&&!s&&(k(!1),l(),r.logDataEvent(t,"reopenedMic",!0))},[s]),c=typeof _vs!="undefined"&&_vs&&_vs.locstr&&_vs.locstr.mictt?_vs.locstr.mictt:"Search using voice",et=0,preact.h("div",{className:"b_icon tooltip",role:"button",tabIndex:et,"aria-label":c,"data-sbtipx":c,"data-tooltip":c,onClick:function(){a()},onKeyUp:function(n){(n.key=="Enter"||n.which==13)&&a()}},s?preact.h(rt,null):preact.h(ut,null))},rt=function(){return preact.h("svg",{className:"read_icon",width:"40",height:"40",viewBox:"0 0 40 40",fill:"none"},preact.h("g",{filter:"url(#filter0_d)"},preact.h("path",{className:"icon_path","fill-rule":"evenodd","clip-rule":"evenodd",d:"M20 36C28.8366 36 36 28.8366 36 20C36 11.1634 28.8366 4 20 4C11.1634 4 4 11.1634 4 20C4 28.8366 11.1634 36 20 36Z"})),preact.h("line",{className:"b_sl",x1:"12",y1:"19",x2:"12",y2:"21",stroke:"white","stroke-width":"1.5"}),preact.h("line",{className:"b_ml",x1:"16",y1:"16",x2:"16",y2:"24",stroke:"white","stroke-width":"1.5"}),preact.h("line",{className:"b_ll",x1:"20",y1:"13",x2:"20",y2:"27",stroke:"white","stroke-width":"1.5"}),preact.h("line",{className:"b_ml",x1:"24",y1:"16",x2:"24",y2:"24",stroke:"white","stroke-width":"1.5"}),preact.h("line",{className:"b_sl",x1:"28",y1:"19",x2:"28",y2:"21",stroke:"white","stroke-width":"1.5"}),preact.h("defs",null,preact.h("filter",{id:"filter0_d",x:"0",y:"0",width:"40",height:"40",filterUnits:"userSpaceOnUse","color-interpolation-filters":"sRGB"},preact.h("feFlood",{"flood-opacity":"0",result:"BackgroundImageFix"}),preact.h("feColorMatrix",{"in":"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"}),preact.h("feOffset",null),preact.h("feGaussianBlur",{stdDeviation:"2"}),preact.h("feColorMatrix",{type:"matrix",values:"0 0 0 0 0.4 0 0 0 0 0.4 0 0 0 0 0.4 0 0 0 0.2 0"}),preact.h("feBlend",{mode:"normal",in2:"BackgroundImageFix",result:"effect1_dropShadow"}),preact.h("feBlend",{mode:"normal","in":"SourceGraphic",in2:"effect1_dropShadow",result:"shape"}))))},ut=function(){return preact.h("svg",{viewBox:"0 0 20 20"},preact.h("path",{d:"m0 0h20v20h-20z",fill:"none"}),preact.h("path",{className:"icon_path",d:"m16.379 11.694c-.458-.194-.983-.019-1.241.406-.252.416-.553.8-.895 1.142-.544.543-1.191.983-1.908 1.286-.717.304-1.504.472-2.335.472s-1.618-.168-2.335-.471-1.364-.743-1.908-1.286c-.342-.343-.644-.726-.895-1.142-.257-.425-.783-.6-1.24-.407-.552.233-.793.906-.484 1.42.338.563.744 1.081 1.205 1.543.723.722 1.584 1.308 2.542 1.714.664.28 1.375.467 2.115.56v2.069c0 .552.448 1 1 1s1-.448 1-1v-2.069c.74-.093 1.451-.279 2.114-.559h.001c.958-.406 1.819-.991 2.542-1.713l.001-.001c.461-.462.866-.979 1.205-1.542.308-.516.068-1.188-.484-1.422zm-6.379 1.306c2.209 0 4-1.791 4-4v-5c0-2.209-1.791-4-4-4s-4 1.791-4 4v5c0 2.209 1.791 4 4 4zm-2-9c0-1.103.897-2 2-2s2 .897 2 2v5c0 1.103-.897 2-2 2s-2-.897-2-2z"}))},s=function(n){var t=preactHooks.useContext(e).handleText;n&&typeof document!="undefined"&&t(n,_vs)},ft=function(n,t){return __awaiter(void 0,void 0,void 0,function(){var f,o,s,u,e,i;return __generator(this,function(c){switch(c.label){case 0:return(typeof document!="undefined")?(f="",o=location.search.indexOf("?"),s=location.search.slice(o+1).split("&").indexOf("uqubfprlg=1")>=0,!s)?[3,6]:(h&&typeof uquSpokenResponse!="undefined"&&uquSpokenResponse.reopenMic&&n(uquSpokenResponse.reopenMic),!(typeof uquSpokenResponse!="undefined"&&uquSpokenResponse.url))?[3,1]:(f=uquSpokenResponse.url,v(uquSpokenResponse,t),[3,6]):[3,7];case 1:return(typeof uquSpokenResponse!="undefined"&&uquSpokenResponse.messageType=="spokenResponse"&&uquSpokenResponse.encodedData)?(f="data:audio/wav;base64,"+uquSpokenResponse.encodedData,v(uquSpokenResponse,t),[3,6]):[3,2];case 2:return w?(u=document.querySelector(".b_cat3a [data-ssml]"),u||(u=document.querySelector(".b_poleContent [data-ssml]")),u||(u=document.querySelector("[data-ssml]")),!u)?[3,4]:(r.logTime("TTSApiStart"),e=u.getAttribute("data-ssml"),[4,a(e)]):[3,6];case 3:return i=c.sent(),i&&i.audio&&(f="data:audio/wav;base64,"+i.audio),r.logTime("TTSApiEnd"),[3,6];case 4:return r.logTime("TTSApiStart"),e="",[4,a(e)];case 5:i=c.sent();i&&i.audio&&(f="data:audio/wav;base64,"+i.audio);r.logTime("TTSApiEnd");c.label=6;case 6:return[2,f];case 7:return[2]}})})},a=function(n){var t={headers:{Accept:"application/json","Content-Type":"application/xml","X-UQU-TTSOption":"DefaultSSML"},method:"POST",body:n};return fetch("/opaluqu/tts/v1",t).then(function(n){if(n.ok)return n.json()}).catch(function(){return null})},v=function(n,t){n.fallbackSpokenText&&r.logDataEvent(t,"spokenText",n.fallbackSpokenText);n.isDefaultResponse&&r.logDataEvent(t,"isDefaultResponse",n.isDefaultResponse)},et=function(n){switch(n){case u.Waiting:return typeof _vs!="undefined"&&_vs&&_vs.locstr&&_vs.locstr.wait?_vs.locstr.wait:u.Waiting;case u.Listening:return typeof _vs!="undefined"&&_vs&&_vs.locstr&&_vs.locstr.listen?_vs.locstr.listen:u.Listening;case u.Blocked:return typeof _vs!="undefined"&&_vs&&_vs.locstr&&_vs.locstr.block?_vs.locstr.block:u.Blocked;case u.NoMic:return typeof _vs!="undefined"&&_vs&&_vs.locstr&&_vs.locstr.nomic?_vs.locstr.nomic:u.NoMic}},ot=function(n){switch(n){case f.Error:return typeof _vs!="undefined"&&_vs&&_vs.locstr&&_vs.locstr.error?_vs.locstr.error:f.Error;case f.NoText:return typeof _vs!="undefined"&&_vs&&_vs.locstr&&_vs.locstr.notext?_vs.locstr.notext:f.NoText}}});define("App/speech/AppSpeech",["require","exports","Components/Core/SpeechPreact"],function(n,t,i){"use strict";var e,u,r,f;if(Object.defineProperty(t,"__esModule",{value:!0}),typeof document!="undefined")for(e=document.querySelectorAll(".mic_cont"),u=0;u<e.length;u++)(r=e[u],r.LoggingName!=null&&r.TextareaId!=null&&r.handleText!=null&&r.clientbuild!=null)&&(f={isPartner:r.classList.contains("partner"),loggingName:r.LoggingName,textareaId:r.TextareaId,handleText:r.handleText,iconInit:r.iconInit,clientbuild:r.clientbuild,allowReadout:r.shouldReadoutPage?r.shouldReadoutPage:!1},r.langLocQuery!==null&&typeof r.langLocQuery=="string"&&r.langLocProp!==null&&typeof r.langLocProp=="string"&&(f.langLocQuery=r.langLocQuery,f.langLocProp=r.langLocProp),preact.render(preact.h(i.Speech,{props:f}),r))})