var redDotControl="redDotControl",bepns=bepns||function(n,t){function st(){if(u=n("id_rh"),r=n("bepfo"),!r){var i=n("id_rwl");i&&(r=t("div"),r.id="bepfo",r.className=o,i.parentNode&&i.parentNode.insertBefore(r,i.nextSibling))}ct();sj_be(u,h,k,!1);sj_evt.bind(b,d,!1);sj_evt.bind(w,yt);sj_evt.bind("onP1",ht,1);sj_evt.bind("id:refreshed",lt,1)}function ht(){var n=0,t=setInterval(function(){u&&u.offsetWidth>0&&u.offsetHeight>0?(clearInterval(t),sj_evt.fire("bepready",g)):n==80&&clearInterval(t);n++},400)}function ct(){vt(u,ot)}function lt(){at(_ge("idd_rwds"),_ge("idd_rwdstrial"))}function at(n,t){n&&t&&(t.href=n.href,n.h?t.h=n.h:n.getAttribute&&n.getAttribute("h")&&t.setAttribute("h",n.getAttribute("h")))}function vt(n,t){n&&(n.href=t)}function yt(n){n[1]!==p&&f()}function s(n,t){if(n&&n.className){var i=" "+n.className+" ";return i.indexOf(" "+t+" ")!==-1}return!1}function l(n,t){n&&!s(n,t)&&(n.className+=" "+t)}function y(n,t){if(s(n,t)){var i=new RegExp("(\\s|^)"+t+"(\\s|$)","g");n.className=n.className.replace(i," ")}}function k(n){r&&(s(r,o)?tt(n):f(n))}function d(n){r&&(!r||s(r,o)?tt(n):f(n),sj_evt.unbind(b,d))}function pt(){u&&sj_ue(u,h,k,!1)}function g(n){typeof _H!="undefined"&&(n&&n>0?wt():nt())}function wt(){l(u,"rigleamon")}function nt(){y(u,"rigleamon")}function tt(n){if(sj_evt.fire("focusChange","bep"),r){if(r.firstChild)ft(!0);else{i=t("iframe");i.id="bepfm";i.frameBorder="no";i.scrolling="no";i.height=0;sj_be(i,et,bt,!1);r.appendChild(i);rt(i);e=t("div");e.id="bepfl";e.innerText=e.textContent="Loading...";r.appendChild(e);ut(e);var s=it();i.src=s.src;s.isDarkMode&&l(r,"darkMode")}y(r,o);u.setAttribute("aria-expanded","true")}l(u,"openfo");sj_sp(n);sj_evt.fire(w,p);sj_be(_d,h,f,!0);sj_be(_d,c,a,!0)}function it(){var t=_w.location.search.substr(1),l=/(^|&)rewardstesthooks=1(&|$)/i.exec(t),f=/(?:^|&)rewardsbag=([^&]*)(?:&|$)/i.exec(t),r=undefined,e,i,o,n,s;try{e=/(^|&)uncrunched=1(&|$)/i;r=e.exec(t)}catch(y){r=undefined}i=undefined;try{o=/(^|&)isDarkMode=1(&|$)/i;i=o.exec(t)}catch(p){i=undefined}n=undefined;try{s=/(?:^|&)partnerId=([^&]*)(?:&|$)/i;n=s.exec(t)}catch(w){n=undefined}var u=new Date,h=u.getDate(),c=u.getMonth()+1,a=(c<10?"0":"")+c+"/"+(h<10?"0":"")+h+"/"+u.getFullYear(),v="/rewardsapp/flyout?channel=0"+(n&&n[1]?"&partnerId="+n[1]:"")+"&date="+a+(l&&f?"&atlahostname=localhost&bag="+f[1]:"")+(r?"&uncrunched=1":"")+(i?"&isDarkMode=1":"");return{src:v,isDarkMode:i}}function f(n){s(r,o)||l(r,o);y(u,"openfo");typeof _H!="undefined"&&nt();u.setAttribute("aria-expanded","false");sj_ue(_d,h,f,!0);sj_ue(_d,c,a,!0);i&&i.contentWindow&&sj_ue(i.contentWindow.document,c,a,!0);n&&sj_sp(n);ft(!1)}function rt(n){n&&(n.style.display="none")}function ut(n){n&&(n.style.display="block")}function bt(){rt(e);ut(i);i.height=Math.min(i.contentWindow.document.body.scrollHeight,v);i&&i.contentWindow&&sj_be(i.contentWindow.document,c,a,!0);sj_be(_w,"message",kt,!1)}function ft(n){i&&i.contentWindow.postMessage({action:"visibility",isVisible:n},"*")}function kt(n){var t,r,u;if(n.source==i.contentWindow&&n.data)switch(n.data.action){case"resize":t=n.data.bodyHeight&&parseFloat(n.data.bodyHeight);i.height=t&&!isNaN(t)?Math.min(t,v):Math.min(i.contentWindow.document.body.scrollHeight,v);break;case"updatePoints":RewardsCreditRefresh&&(r=RewardsCreditRefresh.GetRewardsHeaderBalance(),r!=n.data.newBal&&(RewardsCreditRefresh.SetRewardsHeaderBalance(n.data.newBal),RewardsCreditRefresh.RewardsHeaderAnim(r,n.data.newBal,n.data.goal,n.data.incr)));break;case"redDotControl":sj_evt.fire(redDotControl,!0);break;case"refresh":i&&(u=it(),i.src=u.src);break;case"close":i&&f()}}var p="bepfo",v=700,w="onPopTR",b="openbep",u,r,e,i,h="click",c="keyup",et="load",o="b_hide",ot="javascript:void(0)",a=function(n){var e=n.which||n.keyCode,r=sj_et(n),t;if(e==27){f(n);u.focus();return}if(e==9&&r&&i){if(t=r.nodeName,t=="BODY"||t=="HTML"||t=="#document")return;i.contentWindow.document.body.contains(r)||f(n)}};return st(),{sg:g,ubc:pt}}(_ge,sj_ce)