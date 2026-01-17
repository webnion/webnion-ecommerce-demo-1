
  const mainImage = document.getElementById("mainImage");
  const thumbs = document.querySelectorAll("[data-image]");

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      // Change main image
      mainImage.src = thumb.dataset.image;

      // Active border reset
      thumbs.forEach(t => {
        t.classList.remove("ring-2", "ring-primary");
        t.classList.add("border-transparent");
      });

      // Active thumbnail
      thumb.classList.add("ring-2", "ring-primary");
      thumb.classList.remove("border-transparent");
    });
  });



// swiper slider for product 
    document.addEventListener("DOMContentLoaded", () => {
    new Swiper(".thumbSwiper", {
      slidesPerView: 3,
      spaceBetween: 16,
      navigation: {
        nextEl: ".thumb-next",
        prevEl: ".thumb-prev",
      },
      breakpoints: {
        0:   { slidesPerView: 2.2, spaceBetween: 12 },
        480: { slidesPerView: 3,   spaceBetween: 16 },
        768: { slidesPerView: 3,   spaceBetween: 16 },
      },
    });
  });

// details section toggle js
  document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".tab-btn");
    const sections = ["details-text", "specification-text", "vendor-text", "review-text"]
      .map(id => document.getElementById(id))
      .filter(Boolean);

    const activeClasses = ["bg-primary", "text-white"];
    const inactiveClasses = ["text-gray-500", "dark:text-gray-400"];
    const hoverClasses = ["hover:text-gray-700", "dark:hover:text-gray-200"];

    function setActive(tabId) {
      // show/hide sections
      sections.forEach(sec => sec.classList.toggle("hidden", sec.id !== tabId));

      // button active/inactive styles (design same)
      buttons.forEach(btn => {
        const isActive = btn.dataset.tab === tabId;

        if (isActive) {
          btn.classList.add(...activeClasses);
          btn.classList.remove(...inactiveClasses, ...hoverClasses);
        } else {
          btn.classList.remove(...activeClasses);
          btn.classList.add(...inactiveClasses, ...hoverClasses);
        }
      });
    }

    // Default active = details
    setActive("details-text");

    // Click events
    buttons.forEach(btn => {
      btn.addEventListener("click", () => setActive(btn.dataset.tab));
    });
  });

// product slider 
  document.addEventListener("DOMContentLoaded", () => {
    new Swiper(".productSwiper", {
      loop: true,                 
      speed: 600,
      spaceBetween: 32,           
      grabCursor: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      breakpoints: {
        0:    { slidesPerView: 1, spaceBetween: 32 },
        640:  { slidesPerView: 3, spaceBetween: 32 }, // sm
        1024: { slidesPerView: 4, spaceBetween: 32 }, // lg
      },
    });
  });
