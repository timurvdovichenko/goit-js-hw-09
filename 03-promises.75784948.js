!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,o){n[e]=o},e.parcelRequired7c6=t);var r=t("6JpON");function i(e,o){return new Promise((function(n,t){var r=Math.random()>.3;setTimeout((function(){r?n({position:e,delay:o}):t({position:e,delay:o})}),o)}))}var a={form:document.querySelector("form")};a.form.addEventListener("submit",(function(e){e.preventDefault(),a.form.lastElementChild.disabled=!0;var o=e.target.elements,n=o.delay,t=o.step,l=o.amount,u=n.valueAsNumber-t.valueAsNumber;if(n.valueAsNumber<0||t.valueAsNumber<0||l.valueAsNumber<=0)return void r.Notify.info("Please enter number greater or equal zero");for(var s=1;s<=l.valueAsNumber;s+=1)u+=t.valueAsNumber,i(s,u).then((function(e){var o=e.position,n=e.delay;console.log("✅ Fulfilled promise ".concat(o," in ").concat(n,"ms")),r.Notify.success("✅ Fulfilled promise ".concat(o," in ").concat(n,"ms"))})).catch((function(e){var o=e.position,n=e.delay;console.log("❌ Rejected promise ".concat(o," in ").concat(n,"ms")),r.Notify.failure("❌ Rejected promise ".concat(o," in ").concat(n,"ms"))}));setTimeout((function(){a.form.lastElementChild.disabled=!1}),u)}))}();
//# sourceMappingURL=03-promises.75784948.js.map
