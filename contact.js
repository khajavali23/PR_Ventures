(() => {
  'use strict';
  document.documentElement.classList.add('js-ready');

  const header = document.querySelector('.site-header');
  const backTop = document.querySelector('.back-top');
  const onScroll = () => {
    const y = window.scrollY || 0;
    header.classList.toggle('scrolled', y > 40);
    backTop.classList.toggle('visible', y > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal content as it enters the viewport. A CSS fallback keeps content visible without JS.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('in-view'));
  }

  // Optional GSAP enhancement; the page remains functional without the CDN libraries.
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero-content > *', { y: 24, opacity: 0, duration: .85, stagger: .12, ease: 'power3.out', delay: .12 });
  }

  const enquiryType = document.getElementById('enquiryType');
  const interest = document.getElementById('interest');
  const interestHelp = document.getElementById('interestHelp');
  const optionsByType = {
    'Real Estate Development': ['Navavana', 'Dyuloka', 'Future Developments'],
    'PR CONMIX – Ready-Mix Concrete': ['Ready-Mix Concrete Supply', 'Construction Material Enquiry'],
    'General Enquiry': ['General Business Enquiry']
  };
  function updateInterest(selected = '') {
    const options = optionsByType[enquiryType.value] || [];
    interest.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = options.length ? 'Select a service or project' : 'Select an enquiry type first';
    interest.appendChild(placeholder);
    options.forEach(label => {
      const option = document.createElement('option');
      option.value = label;
      option.textContent = label;
      interest.appendChild(option);
    });
    interest.disabled = options.length === 0;
    interest.value = options.includes(selected) ? selected : '';
    interestHelp.textContent = options.length ? 'Choose the project or service you are enquiring about.' : 'Options change with the enquiry type.';
  }
  enquiryType.addEventListener('change', () => updateInterest());

  // Business card actions preselect the relevant enquiry and bring the visitor to the form.
  document.querySelectorAll('[data-enquiry]').forEach(link => {
    link.addEventListener('click', () => {
      const type = link.getAttribute('data-enquiry');
      const selected = link.getAttribute('data-interest') || '';
      enquiryType.value = type;
      updateInterest(selected);
    });
  });

  const message = document.getElementById('message');
  const charCount = document.getElementById('charCount');
  message.addEventListener('input', () => { charCount.textContent = String(message.value.length); });

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const phoneDigits = value => value.replace(/\D/g, '');
  form.addEventListener('submit', event => {
    event.preventDefault();
    status.textContent = '';
    status.classList.remove('error');
    const requiredFields = [document.getElementById('fullName'), document.getElementById('phone'), enquiryType];
    let valid = true;
    requiredFields.forEach(field => {
      const okay = field.value.trim() !== '';
      field.classList.toggle('is-invalid', !okay);
      if (!okay) valid = false;
    });
    const phone = document.getElementById('phone');
    const digits = phoneDigits(phone.value);
    const phoneOkay = digits.length >= 10 && digits.length <= 13;
    phone.classList.toggle('is-invalid', !phoneOkay);
    if (!phoneOkay) valid = false;
    const email = document.getElementById('email');
    const emailOkay = !email.value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    email.classList.toggle('is-invalid', !emailOkay);
    if (!emailOkay) valid = false;
    const consent = document.getElementById('consent');
    if (!consent.checked) valid = false;
    if (!valid) {
      status.textContent = 'Please complete the required fields, check your phone number and accept the privacy consent.';
      status.classList.add('error');
      const firstInvalid = form.querySelector('.is-invalid') || consent;
      firstInvalid.focus({ preventScroll: false });
      return;
    }

    const data = new FormData(form);
    const lines = [
      'PR Ventures – Website Enquiry',
      `Name: ${data.get('fullName')}`,
      `Phone: ${data.get('phone')}`,
      `Email: ${data.get('email') || 'Not provided'}`,
      `Enquiry type: ${data.get('enquiryType')}`,
      `Interested in: ${data.get('interest') || 'Not specified'}`,
      `Message: ${data.get('message') || 'Not provided'}`
    ];
    const whatsappUrl = `https://wa.me/919742588833?text=${encodeURIComponent(lines.join('\n'))}`;
    const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (opened) {
      status.textContent = 'WhatsApp opened with your enquiry. Please review the message and press Send in WhatsApp.';
    } else {
      status.textContent = 'Your enquiry text is ready. If WhatsApp did not open, use the Call button to contact PR Ventures.';
      status.classList.add('error');
      window.location.href = whatsappUrl;
    }
  });
  form.querySelectorAll('input,select,textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('is-invalid'));
    field.addEventListener('change', () => field.classList.remove('is-invalid'));
  });

  // Close the mobile navigation after choosing an in-page destination.
  document.querySelectorAll('#mainNav a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('mainNav');
      if (nav.classList.contains('show') && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(nav).hide();
    });
  });
})();


/* =========================================
   PR VENTURES — CONTACT PAGE ANIMATIONS
   GSAP + ScrollTrigger
========================================= */

document.addEventListener("DOMContentLoaded", function () {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Respect reduced-motion accessibility settings
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  document.documentElement.classList.add("gsap-ready");

  /* -----------------------------------------
     1. HERO ANIMATION
  ----------------------------------------- */

  const heroTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out"
    }
  });

  heroTimeline
    .to(".about-hero .hero-image", {
      scale: 1,
      duration: 1.8,
      ease: "power2.out"
    })
    .to(".about-hero .hero-inner > *", {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.16
    }, "-=1.1")
    .to(".about-hero .scroll-note", {
      opacity: 1,
      y: 0,
      duration: 0.7
    }, "-=0.35");


  /* -----------------------------------------
     2. GENERAL SCROLL REVEALS
  ----------------------------------------- */

  gsap.utils.toArray(".reveal").forEach((element) => {
    gsap.fromTo(
      element,
      {
        autoAlpha: 0,
        y: 38
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true
        }
      }
    );
  });


  /* -----------------------------------------
     3. CONTACT DETAILS STAGGER
  ----------------------------------------- */

  gsap.fromTo(
    ".contact-details-grid .detail-tile",
    {
      autoAlpha: 0,
      y: 35
    },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.13,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-details-grid",
        start: "top 85%",
        once: true
      }
    }
  );


  /* -----------------------------------------
     4. ENQUIRY SECTION
  ----------------------------------------- */

  gsap.fromTo(
    ".enquiry-points li",
    {
      autoAlpha: 0,
      x: -25
    },
    {
      autoAlpha: 1,
      x: 0,
      duration: 0.7,
      stagger: 0.14,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".enquiry-points",
        start: "top 85%",
        once: true
      }
    }
  );

  gsap.fromTo(
    ".enquiry-note",
    {
      autoAlpha: 0,
      y: 25
    },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".enquiry-note",
        start: "top 90%",
        once: true
      }
    }
  );


  /* -----------------------------------------
     5. FORM FIELD ANIMATIONS
  ----------------------------------------- */

  gsap.fromTo(
    ".enquiry-form .field-wrap, .enquiry-form .consent-wrap, .enquiry-form .form-bottom",
    {
      autoAlpha: 0,
      y: 20
    },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.09,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".enquiry-form",
        start: "top 82%",
        once: true
      }
    }
  );


  /* -----------------------------------------
     6. BUSINESS CARDS
  ----------------------------------------- */

  gsap.fromTo(
    ".business-grid .business-card",
    {
      autoAlpha: 0,
      y: 55
    },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".business-grid",
        start: "top 82%",
        once: true
      }
    }
  );


  /* -----------------------------------------
     7. OFFICE MAP
  ----------------------------------------- */

  gsap.fromTo(
    ".office-panel",
    {
      autoAlpha: 0,
      y: 45
    },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".office-panel",
        start: "top 85%",
        once: true
      }
    }
  );


  /* -----------------------------------------
     8. FINAL CTA
  ----------------------------------------- */

  gsap.fromTo(
    ".final-cta .cta-link",
    {
      autoAlpha: 0,
      x: 35
    },
    {
      autoAlpha: 1,
      x: 0,
      duration: 0.75,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".final-cta",
        start: "top 78%",
        once: true
      }
    }
  );


  /* -----------------------------------------
     9. FOOTER REVEAL
  ----------------------------------------- */

  gsap.fromTo(
    ".site-footer .row > div",
    {
      autoAlpha: 0,
      y: 25
    },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".site-footer",
        start: "top 90%",
        once: true
      }
    }
  );


  /* -----------------------------------------
     10. REFRESH SCROLL TRIGGER
  ----------------------------------------- */

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });

});
