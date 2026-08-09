(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");
  root.classList.add("signal-js");

  var menuButton = document.querySelector("[data-signal-menu]");
  var navigation = document.querySelector("[data-signal-nav]");
  var siteHeader = document.querySelector("[data-signal-header]");

  function updateHeaderSurface() {
    if (!siteHeader) return;
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  if (siteHeader) {
    window.addEventListener("scroll", updateHeaderSurface, { passive: true });
    updateHeaderSurface();
  }

  function closeMenu() {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("signal-nav-open");
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      var isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      document.body.classList.toggle("signal-nav-open", !isOpen);
    });

    navigation.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  var fields = Array.prototype.slice.call(document.querySelectorAll("[data-signal-field]"));
  fields.forEach(function (field) {
    field.addEventListener("pointermove", function (event) {
      var bounds = field.getBoundingClientRect();
      field.style.setProperty("--signal-x", event.clientX - bounds.left + "px");
      field.style.setProperty("--signal-y", event.clientY - bounds.top + "px");
    });
  });

  var signalNodes = Array.prototype.slice.call(document.querySelectorAll("[data-signal-node]"));
  var signalRoutes = Array.prototype.slice.call(document.querySelectorAll("[data-signal-route]"));
  var signalLegends = Array.prototype.slice.call(document.querySelectorAll("[data-signal-legend]"));
  var signalMap = document.querySelector(".signal-research__map");

  function renderSignal(key) {
    var filtered = Boolean(key);
    if (signalMap) {
      signalMap.classList.toggle("is-filtered", filtered);
      if (filtered) signalMap.setAttribute("data-signal-active", key);
      else signalMap.removeAttribute("data-signal-active");
    }

    signalNodes.forEach(function (node) {
      var active = node.getAttribute("data-signal-node") === key;
      node.classList.toggle("is-active", active);
      node.classList.toggle("is-muted", filtered && !active);
      node.setAttribute("aria-pressed", String(active));
    });

    signalRoutes.forEach(function (route) {
      var active = route.getAttribute("data-signal-route") === key;
      route.classList.toggle("is-active", active);
      route.classList.toggle("is-muted", filtered && !active);
    });

    signalLegends.forEach(function (legend) {
      var active = legend.getAttribute("data-signal-legend") === key;
      legend.classList.toggle("is-active", active);
      legend.classList.toggle("is-muted", filtered && !active);
      legend.setAttribute("aria-pressed", String(active));
    });
  }

  function bindSignalControl(control, attribute) {
    var key = control.getAttribute(attribute);
    var preview = function () {
      renderSignal(key);
    };
    var restore = function () {
      renderSignal(null);
    };

    control.addEventListener("mouseenter", preview);
    control.addEventListener("mouseleave", restore);
    control.addEventListener("focus", preview);
    control.addEventListener("blur", restore);
    control.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "mouse") event.preventDefault();
    });
  }

  signalNodes.forEach(function (node) { bindSignalControl(node, "data-signal-node"); });
  signalLegends.forEach(function (legend) { bindSignalControl(legend, "data-signal-legend"); });

  if (signalMap) {
    signalMap.addEventListener("pointermove", function (event) {
      var hoveredNode = event.target.closest("[data-signal-node]");
      renderSignal(hoveredNode ? hoveredNode.getAttribute("data-signal-node") : null);
    });
    signalMap.addEventListener("pointerleave", function () {
      renderSignal(null);
    });
  }

  renderSignal(null);

  var filterGroups = Array.prototype.slice.call(document.querySelectorAll("[data-signal-filter-group]"));
  filterGroups.forEach(function (group) {
    var selector = group.getAttribute("data-signal-filter-target");
    var scope = group.parentElement || document;
    var controls = Array.prototype.slice.call(group.querySelectorAll("[data-signal-filter]"));
    var items = selector ? Array.prototype.slice.call(scope.querySelectorAll(selector)) : [];
    var sections = Array.prototype.slice.call(scope.querySelectorAll("[data-signal-filter-section]"));

    function applyFilter(value) {
      controls.forEach(function (control) {
        control.setAttribute("aria-pressed", String(control.getAttribute("data-signal-filter") === value));
      });

      items.forEach(function (item) {
        var category = item.getAttribute("data-signal-category");
        item.hidden = value !== "all" && category !== value;
      });

      sections.forEach(function (section) {
        var sectionItems = selector ? Array.prototype.slice.call(section.querySelectorAll(selector)) : [];
        section.hidden = sectionItems.length > 0 && sectionItems.every(function (item) { return item.hidden; });
      });
    }

    controls.forEach(function (control) {
      control.addEventListener("click", function () {
        applyFilter(control.getAttribute("data-signal-filter"));
      });
    });

    applyFilter("all");
  });

  var gpaHover = document.querySelector(".signal-gpa-toggle");
  if (gpaHover) {
    gpaHover.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "mouse") event.preventDefault();
    });
  }

  var timeline = document.querySelector(".signal-timeline");
  if (timeline) {
    var timelineStops = [
      { at: 0, color: [118, 87, 255] },
      { at: .48, color: [53, 120, 246] },
      { at: 1, color: [37, 201, 195] }
    ];
    var timelineFrame = null;

    function mixTimelineColor(start, end, amount) {
      return start.map(function (channel, index) {
        return Math.round(channel + ((end[index] - channel) * amount));
      });
    }

    function timelineColorAt(position) {
      var lower = timelineStops[0];
      var upper = timelineStops[timelineStops.length - 1];
      for (var index = 1; index < timelineStops.length; index += 1) {
        if (position <= timelineStops[index].at) {
          lower = timelineStops[index - 1];
          upper = timelineStops[index];
          break;
        }
      }
      var span = upper.at - lower.at;
      var amount = span > 0 ? (position - lower.at) / span : 0;
      return mixTimelineColor(lower.color, upper.color, Math.max(0, Math.min(1, amount)));
    }

    function updateTimelineColors() {
      var lineStyle = window.getComputedStyle(timeline, "::before");
      var lineStart = parseFloat(lineStyle.top) || 0;
      var lineEnd = timeline.clientHeight - (parseFloat(lineStyle.bottom) || 0);
      var lineLength = Math.max(1, lineEnd - lineStart);
      var sections = Array.prototype.slice.call(timeline.querySelectorAll(".signal-timeline__section"));

      sections.forEach(function (section) {
        var label = section.querySelector(".signal-timeline__label");
        if (!label) return;
        var markerStyle = window.getComputedStyle(label, "::after");
        var markerCenter = section.offsetTop + label.offsetTop + (parseFloat(markerStyle.top) || 0) + ((parseFloat(markerStyle.height) || 0) / 2);
        var position = Math.max(0, Math.min(1, (markerCenter - lineStart) / lineLength));
        var color = timelineColorAt(position);
        var channels = color.join(", ");
        section.style.setProperty("--signal-timeline-color", "rgb(" + channels + ")");
        section.style.setProperty("--signal-timeline-halo", "rgba(" + channels + ", .12)");
        section.style.setProperty("--signal-timeline-glow", "rgba(" + channels + ", .42)");
      });
    }

    function scheduleTimelineColors() {
      if (timelineFrame !== null) window.cancelAnimationFrame(timelineFrame);
      timelineFrame = window.requestAnimationFrame(function () {
        timelineFrame = null;
        updateTimelineColors();
      });
    }

    scheduleTimelineColors();
    window.addEventListener("resize", scheduleTimelineColors);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleTimelineColors);
    if ("ResizeObserver" in window) {
      var timelineResizeObserver = new ResizeObserver(scheduleTimelineColors);
      timelineResizeObserver.observe(timeline);
    }
  }

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".signal-reveal"));
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (element) { element.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
    reveals.forEach(function (element) { observer.observe(element); });
  }
})();
