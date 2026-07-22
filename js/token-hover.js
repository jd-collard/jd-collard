/* ============================================================
   Keyword → token hover  (Binary Poster)
   Default state shows the real editorial keyword.
   On hover/focus: a brief decoding scramble settles on the token id.
   On leave/blur: the exact original keyword is restored.
   No token IDs are ever shown by default.
   ============================================================ */
(function () {
  "use strict";
  var GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_·";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function scramble(len) {
    var s = "";
    for (var i = 0; i < len; i++) s += GLYPHS.charAt((Math.random() * GLYPHS.length) | 0);
    return s;
  }

  function wire(el) {
    var original = el.textContent.trim();
    var token = (el.getAttribute("data-token") || original).trim();
    var timers = [];

    function clear() {
      while (timers.length) clearTimeout(timers.pop());
    }
    function decode() {
      clear();
      el.classList.add("is-decoding");
      if (reduce) { el.textContent = token; return; }
      var frames = 3, f = 0;
      (function tick() {
        if (f < frames) {
          el.textContent = scramble(token.length);
          f++;
          timers.push(setTimeout(tick, 45));
        } else {
          el.textContent = token;
        }
      })();
    }
    function restore() {
      clear();
      el.classList.remove("is-decoding");
      el.textContent = original;   // exact revert, regardless of interrupt timing
    }

    el.addEventListener("mouseenter", decode);
    el.addEventListener("mouseleave", restore);
    el.addEventListener("focus", decode);
    el.addEventListener("blur", restore);
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
    el.setAttribute("role", "text");
    el.setAttribute("aria-label", original);
  }

  function init() {
    var nodes = document.querySelectorAll(".token-word");
    for (var i = 0; i < nodes.length; i++) wire(nodes[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
