/* ============================================================
   Periodic table → token hover  (Binary Poster)
   Each element cell carries a unique token id. On hover the
   two-letter symbol decodes into its token (progressive
   scramble, left-to-right lock-in); on leave the symbol is
   restored exactly. Pointer-only and decorative — the table
   is aria-hidden, so no focus/tabindex is added.
   ============================================================ */
(function () {
  "use strict";
  var GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function wire(cell) {
    var sym = cell.querySelector(".pt-sym");
    if (!sym) return;
    var original = sym.textContent;
    var token = cell.getAttribute("data-token");
    var timers = [];

    function clear() {
      while (timers.length) clearTimeout(timers.pop());
    }
    function decode() {
      clear();
      cell.classList.add("is-tok");
      if (reduce) { sym.textContent = token; return; }
      var steps = 5, s = 0;
      (function tick() {
        s++;
        var lock = Math.round((token.length * s) / steps);
        var out = token.slice(0, lock);
        for (var i = lock; i < token.length; i++) out += GLYPHS.charAt((Math.random() * GLYPHS.length) | 0);
        sym.textContent = out;
        if (s < steps) timers.push(setTimeout(tick, 36));
      })();
    }
    function restore() {
      clear();
      cell.classList.remove("is-tok");
      sym.textContent = original;   // exact revert, regardless of interrupt timing
    }

    cell.addEventListener("mouseenter", decode);
    cell.addEventListener("mouseleave", restore);
  }

  function init() {
    var cells = document.querySelectorAll(".pt-el[data-token]");
    for (var i = 0; i < cells.length; i++) wire(cells[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
