var AjaxDataLoader;(function(n){function t(n,t,i){if(i===void 0&&(i=null),!n)return null;var r="data-"+t;return i===null?n.getAttribute(r):(n.setAttribute(r,i),i)}function r(n){var t=sj_ce("div",null,"spinner"),i=sj_ce("div",null,"inner");t.appendChild(i);n.insertBefore(t,n.childNodes[0])}function u(n,r,u,f,e,o,h,c,l){e===void 0&&(e=function(){});o===void 0&&(o=function(){});h===void 0&&(h=function(){});c===void 0&&(c=function(){});l===void 0&&(l=function(){});var a=function(t,i){n.innerHTML=f;Log.Log("Error",u,"Ajax",!1,"R",t,"S",i.toString(),"U",r);h(n,t,i);e&&e(n)},v=function(f){l();n.innerHTML=f;try{s(n);_w.rms&&_w.rms.start();t(n,i,""+(new Date).getTime());o(n);e&&e(n)}catch(h){Log.Log("Error",u,"ScriptException",!1,"Tx",h.message,"U",r);c(n);e&&e(n)}};AjaxRequestProcessor.SendRequest(r,null,null,a,v,1e4)}function s(n){var i=n.getElementsByTagName("script"),t,r;if(i)for(t=0;t<i.length;t++)r=i[t],h(r)}function h(n){if(n){var t=sj_ce("script","");t.type="text/javascript";n.src?t.src=n.src:t.innerHTML=n.innerHTML;c(t)}}function c(n){_d.head.appendChild(n)}var f="dataurl",i="loadts",e="rinterval",o=function(){function n(n,t,i){this.loggingTag=n;this.ajaxErrorMsg=t;this.enableLoadingIndicator=i}return n.prototype.loadAjaxData=function(n,e,o,s,h,c){var l;if(e===void 0&&(e=function(){}),o===void 0&&(o=function(){}),s===void 0&&(s=function(){}),h===void 0&&(h=function(){}),c===void 0&&(c=function(){}),l=t(n,f),!l){e&&e(n);return}l+=(l.indexOf("?")!=-1?"&":"?")+"IG="+_G.IG;var a=Number(t(n,i)),v=this.autoReloadingInterval(n),y=sb_gt(),p=isNaN(v)||v<=0;if(p){if(a>0){e&&e(n);return}this.enableLoadingIndicator&&r(n);u(n,l,this.loggingTag,this.ajaxErrorMsg,e,o,s,h,c);t(n,i,y.toString());return}a<=0&&this.enableLoadingIndicator&&r(n);y-a>v*1e3&&(u(n,l,this.loggingTag,this.ajaxErrorMsg),t(n,i,y.toString()))},n.prototype.autoReloadingInterval=function(n){return Number(t(n,e))},n}();n.AjaxDataLoader=o})(AjaxDataLoader||(AjaxDataLoader={}))