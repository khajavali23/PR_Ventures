// Accessible single-open FAQ accordion.
document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const current = button.closest('.faq-item');
    const shouldOpen = !current.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach((item) => {
      item.classList.remove('open');
      item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (shouldOpen) {
      current.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 450);
});
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.querySelectorAll('#mainNav .nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('mainNav');
    if (nav.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(nav).hide();
  });
});


/* ============================================
   PR VENTURES ABOUT PAGE - ANIMATION ENGINE
============================================ */

document.addEventListener("DOMContentLoaded", function () {

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Select elements for entrance animations
    const animationGroups = [
        [".who-copy", "about-left"],
        [".who-visual", "about-right"],
        [".approach-copy", "about-left"],
        [".steps", "about-reveal"],
        [".approach-homes", "about-image-reveal"],
        [".concrete-visual", "about-image-reveal"],
        [".business-copy", "about-right"],
        [".legacy-copy", "about-left"],
        [".legacy-image", "about-image-reveal"],
        [".legacy-stats", "about-reveal"],
        [".presence-copy", "about-left"],
        [".map-art", "about-reveal"],
        [".location-card", "about-right"],
        [".faq-image", "about-image-reveal"],
        [".faq-intro", "about-left"],
        [".faq-list", "about-right"],
        [".footer-main", "about-reveal"],
        [".footer-bottom", "about-reveal"]
    ];

    const animatedElements = [];

    animationGroups.forEach(([selector, className]) => {

        document.querySelectorAll(selector).forEach(element => {

            element.classList.add(className);
            animatedElements.push(element);

        });

    });

    // Add section-level reveal for footer stagger
    const footer = document.querySelector(".site-footer");

    if (footer) {
        animatedElements.push(footer);
    }

    // Accessibility: show everything without motion
    if (reducedMotion) {
        animatedElements.forEach(element => {
            element.classList.add("visible");
        });

        return;
    }

    // Activate CSS reveal states after preparation
    document.documentElement.classList.add("js-about-ready");

    // Scroll reveal observer
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

    // ========================================
    // NUMBER COUNTERS
    // ========================================

    function startCounter(element) {

        if (element.dataset.animated === "true") return;

        const textNode = Array.from(element.childNodes).find(
            node => node.nodeType === Node.TEXT_NODE &&
                    node.textContent.trim() !== ""
        );

        if (!textNode) return;

        const originalText = textNode.textContent.trim();
        const target = parseInt(originalText.replace(/,/g, ""), 10);

        if (isNaN(target)) return;

        element.dataset.animated = "true";

        const duration = 1800;
        const start = performance.now();

        function update(now) {

            const progress = Math.min(
                (now - start) / duration, 1
            );

            const eased = 1 - Math.pow(1 - progress, 4);

            const current = Math.floor(target * eased);

            textNode.textContent = current.toLocaleString("en-IN");

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                textNode.textContent = originalText;
            }

        }

        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                startCounter(entry.target);

                counterObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.5
    });

    document.querySelectorAll(".legacy-stats strong").forEach(element => {
        counterObserver.observe(element);
    });

});
