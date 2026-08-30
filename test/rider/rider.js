// RiderFlow — shared behaviour for the standalone HTML pages.
(function () {
  "use strict";

  function initSwipe(el) {
    var next = el.dataset.next || "";
    var knob = el.querySelector(".knob");
    var fill = el.querySelector(".fillbar");
    var txt = el.querySelector(".txt");
    var doneLabel = el.dataset.done || "Done";
    var dragging = false;
    var startX = 0;
    var x = 0;

    function max() {
      return el.clientWidth - knob.offsetWidth - 12;
    }
    function setX(v) {
      x = Math.max(0, Math.min(max(), v));
      knob.style.transform = "translateX(" + x + "px)";
      fill.style.width = x + knob.offsetWidth + 12 + "px";
      txt.style.opacity = String(1 - x / max());
    }
    function reset() {
      knob.style.transition = "transform .25s";
      fill.style.transition = "width .25s";
      setX(0);
      setTimeout(function () {
        knob.style.transition = "";
        fill.style.transition = "";
      }, 260);
    }
    function complete() {
      el.classList.add("done");
      txt.style.opacity = "1";
      txt.textContent = doneLabel;
      fill.style.width = "100%";
      if (next) setTimeout(function () { window.location.href = next; }, 420);
    }

    function down(e) {
      if (el.classList.contains("done")) return;
      dragging = true;
      startX = (e.touches ? e.touches[0].clientX : e.clientX) - x;
    }
    function move(e) {
      if (!dragging) return;
      var cx = e.touches ? e.touches[0].clientX : e.clientX;
      setX(cx - startX);
      if (e.cancelable) e.preventDefault();
    }
    function up() {
      if (!dragging) return;
      dragging = false;
      if (x > max() * 0.7) complete();
      else reset();
    }

    knob.addEventListener("mousedown", down);
    knob.addEventListener("touchstart", down, { passive: true });
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);

    // Tap / keyboard fallback so the flow is always completable.
    el.addEventListener("click", function () {
      if (!dragging && x === 0 && !el.classList.contains("done")) {
        knob.style.transition = "transform .3s";
        fill.style.transition = "width .3s";
        setX(max());
        setTimeout(complete, 300);
      }
    });
    el.tabIndex = 0;
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        el.click();
      }
    });
  }

  function initCountdown(el) {
    var n = parseInt(el.dataset.seconds || "18", 10);
    var tick = setInterval(function () {
      n -= 1;
      if (n <= 0) {
        clearInterval(tick);
        el.textContent = "✕ Deny · 0s";
        return;
      }
      el.textContent = "✕ Deny · " + n + "s";
    }, 1000);
  }

  function initClock(el) {
    function paint() {
      var d = new Date();
      el.textContent = d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0");
    }
    paint();
    setInterval(paint, 15000);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".swipe").forEach(initSwipe);
    document.querySelectorAll("[data-countdown]").forEach(initCountdown);
    document.querySelectorAll("[data-clock]").forEach(initClock);

    var toggle = document.querySelector(".toggle");
    if (toggle) {
      toggle.addEventListener("click", function (e) {
        var btn = e.target.closest("button");
        if (!btn) return;
        toggle.querySelectorAll("button").forEach(function (b) { b.classList.remove("on"); });
        btn.classList.add("on");
        var status = document.querySelector("[data-status-text]");
        if (status) {
          status.textContent = btn.dataset.state === "on"
            ? "Waiting for orders"
            : "You're offline";
        }
      });
    }
  });
})();
