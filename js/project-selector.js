/* Project selector — updates the Paper Current project detail panel. */
(function () {
  "use strict";

  function initProjectSelector() {
    var rows = Array.prototype.slice.call(document.querySelectorAll("[data-project-row]"));
    var image = document.getElementById("project-image");
    var name = document.getElementById("project-name");
    var date = document.getElementById("project-date");
    var description = document.getElementById("project-description");
    var role = document.getElementById("project-role");

    if (!rows.length || !image || !name || !date || !description || !role) return;

    function select(row) {
      rows.forEach(function (r) {
        var active = r === row;
        r.classList.toggle("is-active", active);
        r.setAttribute("aria-selected", String(active));
      });

      name.textContent = row.dataset.name || "";
      date.textContent = row.dataset.date || "";
      description.textContent = row.dataset.description || "";
      role.textContent = row.dataset.role || "";

      if (row.dataset.image) {
        image.src = row.dataset.image;
        image.alt = (row.dataset.name || "Selected project") + " project screenshot";
      }
    }

    rows.forEach(function (row) {
      row.addEventListener("click", function () { select(row); });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProjectSelector);
  } else {
    initProjectSelector();
  }
})();
