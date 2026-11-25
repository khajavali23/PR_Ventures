document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach((row) => {
      row.classList.remove('open');
      row.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 500);
});
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.getElementById('enquiryForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = 'Thank you! Your message is ready. Connect this form to your email or backend to receive enquiries.';
  event.target.reset();
});

// Close the mobile navigation after choosing a section.
document.querySelectorAll('#mainNav .nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('mainNav');
    if (nav.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(nav).hide();
  });
});


/* ==========================================
   PR VENTURES - SCROLL ANIMATION ENGINE
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const sections = document.querySelectorAll(
        ".about-section, .strength-section, .communities-section, .vision-section, .developments-section, .faq-section, .contact-section"
    );

    // Assign animation classes without changing HTML
    const addReveal = (selector, animation = "reveal") => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add(animation);
        });
    };

    const addStagger = (selector) => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add("stagger");
        });
    };

    // ABOUT
    addReveal(".about-section .section-intro", "reveal-left");
    addStagger(".business-cards");

    // STRENGTH
    addReveal(".strength-copy", "reveal-left");
    addStagger(".strength-numbers");

    // COMMUNITIES
    addReveal(".communities-section .section-intro", "reveal-left");
    addReveal(".community-video", "reveal-clip");

    // VISION
    addReveal(".vision-copy", "reveal");

    // DEVELOPMENTS
    addReveal(".developments-section .section-intro", "reveal-left");
    addReveal(".project-popover", "reveal-right");

    // FAQ
    addReveal(".faq-copy", "reveal-left");
    addStagger(".faq-list");

    // CONTACT
    addReveal(".contact-copy", "reveal-left");
    addReveal(".contact-form", "reveal-right");

    // Add visibility to the whole section for map animations
    sections.forEach(section => {
        section.classList.add("reveal-section");
    });

    if (reduceMotion) {
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right, .reveal-clip, .stagger, .reveal-section"
        ).forEach(element => element.classList.add("visible"));

        return;
    }

    // Enable animation only after all targets are prepared
    document.documentElement.classList.add("js-ready");

    // Intersection Observer
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

    document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-clip, .stagger, .reveal-section"
    ).forEach(element => {
        observer.observe(element);
    });

    // ======================================
    // ANIMATED NUMBER COUNTERS
    // ======================================

    function animateCounter(element) {

        if (element.dataset.counterDone) return;

        const textNode = Array.from(element.childNodes).find(
            node => node.nodeType === Node.TEXT_NODE &&
                    node.textContent.trim() !== ""
        );

        if (!textNode) return;

        const original = textNode.textContent.trim();
        const target = parseInt(original.replace(/,/g, ""), 10);

        if (isNaN(target)) return;

        element.dataset.counterDone = "true";

        const duration = 1600;
        const startTime = performance.now();

        function updateCounter(now) {

            const progress = Math.min(
                (now - startTime) / duration, 1
            );

            const eased = 1 - Math.pow(1 - progress, 4);

            const current = Math.floor(target * eased);

            textNode.textContent = current.toLocaleString("en-IN");

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                textNode.textContent = original;
            }

        }

        requestAnimationFrame(updateCounter);
    }

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                counterObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.5
    });

    document.querySelectorAll(
        ".hero-stats strong, .strength-numbers strong"
    ).forEach(counter => {
        counterObserver.observe(counter);
    });

});

