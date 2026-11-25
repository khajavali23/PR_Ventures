document.addEventListener("DOMContentLoaded", () => {
  // Reveal sections as they enter the viewport.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Back-to-top control.
  const backTop = document.querySelector(".back-top");
  backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Small visual feedback for the community carousel arrows.
  const arrows = document.querySelectorAll(".slider-arrows button");
  const communityImage = document.querySelector(".community-img");
  const communityImages = ["assets/planned-community.jpg", "assets/real-estate.jpg"];
  let activeImage = 0;
  arrows.forEach((button, index) => button.addEventListener("click", () => {
    activeImage = index === 0
      ? (activeImage - 1 + communityImages.length) % communityImages.length
      : (activeImage + 1) % communityImages.length;
    communityImage?.classList.add("image-changing");
    if (communityImage) communityImage.src = communityImages[activeImage];
    window.setTimeout(() => communityImage?.classList.remove("image-changing"), 220);
  }));
});

/* ==========================================
   PR VENTURES - BUSINESSES PAGE ANIMATION
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const animationGroups = [
        [".business-intro .intro-copy", "biz-left"],
        [".business-intro .real-card", "biz-right"],
        [".conmix-text", "biz-left"],
        [".feature-list", "biz-reveal"],
        [".community-copy", "biz-left"],
        [".community-visual", "biz-right"],
        [".vision-copy", "biz-left"],
        [".vision-points", "biz-right"],
        [".faq-copy", "biz-left"],
        [".faq-contact .contact-card", "biz-right"],
        [".footer-main", "biz-reveal"],
        [".footer-bottom", "biz-reveal"]
    ];

    const animatedElements = [];

    animationGroups.forEach(([selector, className]) => {

        document.querySelectorAll(selector).forEach(element => {

            element.classList.add(className);
            animatedElements.push(element);

        });

    });

    // Add image reveals
    document.querySelectorAll(
        ".real-card, .conmix-image, .community-visual, .vision-image, .contact-card"
    ).forEach(element => {

        if (
            element.classList.contains("real-card") ||
            element.classList.contains("community-visual") ||
            element.classList.contains("contact-card")
        ) {
            // Keep their existing content visible.
            // Reveal the image itself where appropriate.
            const image = element.querySelector("img");

            if (image) {
                image.classList.add("biz-image-reveal");
                animatedElements.push(image);
            }
        } else {
            element.classList.add("biz-image-reveal");
            animatedElements.push(element);
        }

    });

    // Footer entrance
    const footer = document.querySelector(".site-footer");

    if (footer) {
        animatedElements.push(footer);
    }

    // Reduced motion
    if (reducedMotion) {

        animatedElements.forEach(element => {
            element.classList.add("visible");
        });

        return;
    }

    // Activate animation CSS
    document.documentElement.classList.add("js-business-ready");

    // Scroll reveal engine
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

});
