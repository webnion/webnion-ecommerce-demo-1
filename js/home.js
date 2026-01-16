document.addEventListener("DOMContentLoaded", () => {
  const backdrop = document.getElementById("appBackdrop");
  const drawers = document.querySelectorAll("[data-drawer]");

  if (!backdrop || !drawers.length) return;

  let activeType = null;
  let lastFocusedEl = null;

  function getDrawer(type) {
    return document.querySelector(`[data-drawer="${type}"]`);
  }

  function lockScroll(lock) {
    document.documentElement.style.overflow = lock ? "hidden" : "";
    document.body.style.overflow = lock ? "hidden" : "";
  }

  // ---------------- OPEN / CLOSE DRAWER ----------------
  window.openDrawer = function (type) {
    const drawer = getDrawer(type);
    if (!drawer) return;

    window.closeDrawer();

    activeType = type;
    lastFocusedEl = document.activeElement;

    backdrop.classList.remove("hidden");
    drawer.classList.remove("hidden");
    lockScroll(true);

    const closeBtn = drawer.querySelector("[data-close]");
    if (closeBtn) closeBtn.focus();
  };

  window.closeDrawer = function () {
    if (!activeType) return;

    const drawer = getDrawer(activeType);
    if (drawer) drawer.classList.add("hidden");

    backdrop.classList.add("hidden");
    lockScroll(false);

    if (lastFocusedEl) lastFocusedEl.focus();

    activeType = null;
    lastFocusedEl = null;
  };

  // ---------------- OPEN / CLOSE BUTTONS ----------------
  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open]");
    if (openBtn) {
      const type = openBtn.getAttribute("data-open");
      window.openDrawer(type);
      return;
    }

    const closeBtn = e.target.closest("[data-close]");
    if (closeBtn) {
      window.closeDrawer();
      return;
    }
  });

  backdrop.addEventListener("click", () => window.closeDrawer());

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") window.closeDrawer();
  });

  // ---------------- CATEGORY TOGGLES ----------------
  document.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest("[data-toggle]");
    if (!toggleBtn) return;

    const container = toggleBtn.closest("li");
    if (!container) return;

    const key = toggleBtn.getAttribute("data-toggle");
    const panel = container.querySelector(`[data-panel="${key}"]`);
    if (!panel) return;

    panel.classList.toggle("hidden");

    // aria + icon rotate
    const expanded = !panel.classList.contains("hidden");
    toggleBtn.setAttribute("aria-expanded", expanded);

    const icon = toggleBtn.querySelector(".material-icons");
    if (icon) {
      icon.style.transition = "transform 150ms ease";
      icon.style.transform = expanded ? "rotate(90deg)" : "rotate(0deg)";
    }
  });
});


// filter product category with button 
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const products = document.querySelectorAll("[data-category]");

  function setActiveButton(activeBtn) {
    filterButtons.forEach(btn => {
      btn.classList.remove("bg-primary", "text-white");
      btn.classList.add("text-slate-600", "dark:text-slate-400");
    });

    activeBtn.classList.add("bg-primary", "text-white");
    activeBtn.classList.remove("text-slate-600", "dark:text-slate-400");
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      setActiveButton(btn);

      products.forEach(product => {
        const category = product.getAttribute("data-category");

        if (filter === "All" || category === filter) {
          product.style.display = "";
        } else {
          product.style.display = "none";
        }
      });
    });
  });
});