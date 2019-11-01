(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{25:function(e,n,t){e.exports=t(51)},30:function(e,n,t){},51:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(19),u=t.n(o),c=(t(30),t(22)),l=t(2),i=function(e){var n=e.person,t=e.remove;return r.a.createElement("button",{onClick:function(){t(n.id)}},"remove")},m=function(e){var n=e.person,t=e.remove,a=e.update;return r.a.createElement("div",{key:n.id,style:{margin:"10px",padding:"5px"}},r.a.createElement("span",null,n.name),":",r.a.createElement("span",null,"  -  "),r.a.createElement("span",null,n.number),r.a.createElement(i,{person:n,remove:t,update:a,id:n.id}))},d=function(e){var n=e.searchForPerson,t=e.searchValue,a=e.handleSearchChange,o=e.results;return r.a.createElement("div",null,r.a.createElement("h4",null,"Search for a Contact"),r.a.createElement("form",{onSubmit:n},r.a.createElement("input",{value:t,type:"text",onChange:a}),r.a.createElement("button",{type:"submit"},"Search")),r.a.createElement("div",null,o.map((function(e){return r.a.createElement(m,{key:e.id,name:e.name,number:e.number})}))))},s=function(e){var n=e.addPerson,t=e.newName,a=e.handlePersonChange,o=e.newNumber,u=e.handleNumberChange;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"Name: ",r.a.createElement("span",null," "),r.a.createElement("input",{value:t,type:"text",onChange:a})),r.a.createElement("div",null,"Number: ",r.a.createElement("span",null," "),r.a.createElement("input",{type:"text",value:o,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Add"))))},f=function(e){var n=e.persons,t=e.remove,a=e.update;return r.a.createElement("div",null,r.a.createElement("h2",null,"Address Book"),r.a.createElement("ul",null,n.map((function(e){return r.a.createElement(m,{person:e,key:e.id,remove:t,update:a})}))))},p=t(4),h=t(5);function v(){var e=Object(p.a)(["\n    font-weight: 600;\n    color: white;\n    background-color: #37CC57;\n    border-radius: 3px;\n    padding: 8px;\n    margin: 20px;\n    border: 1px solid green;\n    display: inline-block;\n"]);return v=function(){return e},e}var b=h.a.div(v()),E=function(e){var n=e.message;return null===n||void 0===n||""===n?null:r.a.createElement(b,null,n)};function g(){var e=Object(p.a)(["\n    font-weight: 600;\n    color: white;\n    background-color: #FF7E73;\n    border-radius: 3px;\n    padding: 8px;\n    margin: 20px;\n    border: 1px solid red;\n    display: inline-block;\n"]);return g=function(){return e},e}var w=h.a.div(g()),y=function(e){var n=e.message;return null===n||void 0===n||""===n?null:r.a.createElement(w,null,n)},j=t(3),k=t.n(j),O="/api/people",S=function(){return k.a.get(O).then((function(e){return e.data}))},x=function(e){return k.a.post("".concat(O),e).then((function(e){return e.data}))},C=function(e,n){return k.a.put("".concat(O,"/").concat(e),n).then((function(e){return e.data}))},N=function(e){return k.a.delete("".concat(O,"/").concat(e),e).then((function(e){return e.data}))},P=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),i=Object(l.a)(u,2),m=i[0],p=i[1],h=Object(a.useState)(""),v=Object(l.a)(h,2),b=v[0],g=v[1],w=Object(a.useState)(""),j=Object(l.a)(w,2),k=j[0],O=j[1],P=Object(a.useState)([]),B=Object(l.a)(P,2),F=B[0],T=B[1],W=Object(a.useState)(""),A=Object(l.a)(W,2),D=A[0],J=A[1],V=Object(a.useState)(""),I=Object(l.a)(V,2),M=I[0],$=I[1];Object(a.useEffect)((function(){S().then((function(e){o(e)})).catch((function(e){return"Error: ".concat(e)}))}),[]);var q=function(e,n){C(e,n).then((function(e){o(t.map((function(n){return n.id?n:e}))),g(""),p(""),J("Successfully updated number!"),setTimeout((function(){J("")}),5e3)})).catch((function(e){J(""),$("Error updating number. That contact was recently deleted")}))};return r.a.createElement("div",null,r.a.createElement("h1",null,"Phone Book"),r.a.createElement(d,{searchForPerson:function(e){e.preventDefault();var n=e.target[0].value;if(""!==n&&" "!==n){var a=t.filter((function(e){return e.name.includes(n)}));T(a)}},searchValue:k,handleSearchChange:function(e){O(e.target.value)},results:F}),r.a.createElement(s,{addPerson:function(e){e.preventDefault();var n={name:e.target[0].value,number:e.target[1].value};if(t.map((function(e){return e.name})).includes(n.name)){var a=t.map((function(e){return e})).find((function(e){return e.name===n.name}));console.log(n),window.confirm("".concat(n.name," is already in the Phone Book. Would you like to update their number to the one provided?"))?q(a.id,n):(o(t),p(""),g(""))}else n.id=Math.random(),x(n).then((function(e){o([].concat(Object(c.a)(t),[e])),p(""),g(""),J("Successfully added contact"),setTimeout((function(){J(null)}),5e3)})).catch((function(e){$("Error adding contact"),setTimeout((function(){$(null)}),5e3)}))},newName:m,handlePersonChange:function(e){p(e.target.value)},newNumber:b,handleNumberChange:function(e){g(e.target.value)}}),r.a.createElement(E,{message:D}),r.a.createElement(y,{message:M}),r.a.createElement(f,{persons:t,remove:function(e){N(e).then((function(e){o(t),$(""),J("Successfully removed!")})).catch((function(e){J(""),$("Could not remove contact")}))},update:q}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(r.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[25,1,2]]]);
//# sourceMappingURL=main.a0fa79bf.chunk.js.map