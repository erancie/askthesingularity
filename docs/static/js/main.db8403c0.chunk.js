(this.webpackJsonpthree=this.webpackJsonpthree||[]).push([[0],{25:function(e,t,n){},26:function(e,t,n){},58:function(e,t,n){"use strict";n.r(t);var c=n(2),o=n.n(c),s=n(18),r=n.n(s),i=(n(25),n(26),n(3)),a=n(8),l=n.n(a),u=n(19),j=n(5),p=n(9),b=n(20),m=n.n(b),d=(n(50),n(0));function O(e){return Object(d.jsxs)("div",{className:"container p-5",children:[Object(d.jsx)("h2",{children:"God Says: "}),Object(d.jsx)("div",{className:"completion",children:e.completion})]})}function h(e){var t=new m.a("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"),n=e.speechString;Object(c.useEffect)((function(){o()}),[n]);var o=function(){b({prompt:n})},s=Object(c.useState)({prompt:"",tokens:12,completion:""}),r=Object(i.a)(s,2),a=r[0],b=r[1];function h(){return(h=Object(u.a)(l.a.mark((function e(){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.complete({engine:"davinci",maxTokens:64,prompt:a.prompt});case 2:n=e.sent,b({completion:n.data.choices[0].text});case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(d.jsxs)("div",{className:"container",children:[Object(d.jsx)("textarea",{className:"in",type:"text",name:"prompt",onChange:function(e){var t=e.target,n=t.name,c=t.value;b((function(e){return Object(p.a)(Object(p.a)({},e),{},Object(j.a)({},n,c))})),console.log(n),console.log(c)},value:a.prompt}),Object(d.jsx)("button",{className:"btn btn-success btn-lg p-5 m-5",type:"button",onClick:function(){return h.apply(this,arguments)},children:"Complete"}),Object(d.jsx)("div",{}),Object(d.jsx)(O,{completion:a.completion})]})}var f=window.SpeechRecognition||window.webkitSpeechRecognition;console.log(f);var x=new f;function v(){var e=Object(c.useState)(!1),t=Object(i.a)(e,2),n=t[0],o=t[1],s=Object(c.useState)(null),r=Object(i.a)(s,2),a=r[0],l=r[1];Object(c.useEffect)((function(){u()}),[n]);var u=function(){n?(x.start(),x.onend=function(){console.log("start - onend -- start"),x.start()}):(x.stop(),x.onend=function(){console.log("stop - onend")}),x.onstart=function(){console.log("onstart")},x.onresult=function(e){var t=Array.from(e.results).map((function(e){return e[0]})).map((function(e){return e.transcript})).join("");console.log(t),l(t),x.onerror=function(e){console.log(e.error)}}};return Object(d.jsxs)("div",{className:"container",children:[Object(d.jsxs)("div",{className:"box",children:[Object(d.jsx)("button",{className:"btn btn-primary btn-lg p-5 m-5",onClick:function(){return o((function(e){return!e}))},children:n?"Stop":"Listen"}),n?Object(d.jsx)("div",{className:"mb-5",children:Object(d.jsx)("i",{children:"Listening"})}):Object(d.jsx)("div",{className:"mb-5",children:Object(d.jsx)("i",{children:"Not Listening"})})]}),Object(d.jsx)(h,{speechString:a})]})}console.log(x),x.continuous=!0,x.interimResults=!0,x.lang="en-US";var g=function(){return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)("h1",{className:"mt-5 title",children:"Ask God to complete your sentence."}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{}),Object(d.jsx)(v,{})]})};r.a.render(Object(d.jsx)(o.a.StrictMode,{children:Object(d.jsx)(g,{})}),document.getElementById("root"))}},[[58,1,2]]]);
//# sourceMappingURL=main.db8403c0.chunk.js.map