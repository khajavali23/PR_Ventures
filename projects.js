document.addEventListener('DOMContentLoaded', () => {
  // Project status filters
  const filterButtons = [...document.querySelectorAll('.filter-btn')];
  const cards = [...document.querySelectorAll('.project-card-wrap')];
  const emptyState = document.querySelector('.no-projects');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      let visibleCount = 0;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('d-none', !show);
        if (show) visibleCount++;
      });
      emptyState.hidden = visibleCount !== 0;
    });
  });

  // Project selection tabs in the enquiry form.
  const projectTabs = [...document.querySelectorAll('.form-tab')];
  const selectedProject = document.getElementById('selectedProject');
  function selectProject(project) {
    selectedProject.value = project;
    projectTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.selectProject === project));
  }
  projectTabs.forEach(tab => tab.addEventListener('click', () => selectProject(tab.dataset.selectProject)));

  // Contextual CTAs select the relevant project before moving to the form.
  document.querySelectorAll('[data-project]').forEach(link => {
    link.addEventListener('click', () => selectProject(link.dataset.project));
  });

  // Front-end form feedback only. Connect to the live CRM / API before publishing.
  const form = document.getElementById('projectEnquiry');
  const feedback = document.getElementById('formFeedback');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    feedback.textContent = `Thank you. Your ${selectedProject.value} enquiry is ready to be connected to the PR Ventures team.`;
    form.reset();
    selectProject('Navavana');
  });
});



/* ==========================================
   PR VENTURES – PROJECTS PAGE ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  // Scroll reveal observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -45px 0px"
  });

  // Sections to reveal
  const revealSelectors = [
    ".intro-copy",
    ".presence-visual",
    ".filter-row",
    ".project-card-wrap",
    ".detail-copy",
    ".navavana-gallery",
    ".dyuloka-visual",
    ".community-section .eyebrow",
    ".community-section h2",
    ".community-table-wrap",
    ".table-note",
    ".contact-copy",
    ".enquiry-form"
  ];

  document.querySelectorAll(revealSelectors.join(",")).forEach((element, index) => {
    element.classList.add("project-reveal");

    if (element.matches(".presence-visual, .navavana-gallery, .dyuloka-visual, .enquiry-form")) {
      element.classList.remove("project-reveal");
      element.classList.add("project-reveal-right");
    }

    if (element.matches(".intro-copy, .detail-copy, .contact-copy")) {
      element.classList.remove("project-reveal");
      element.classList.add("project-reveal-left");
    }

    if (element.matches(".project-card-wrap")) {
      element.style.transitionDelay = `${(index % 2) * 0.15}s`;
    }

    revealObserver.observe(element);
  });

  // Reveal section-specific animations
  const animatedSections = document.querySelectorAll(
    ".intro-section, .upcoming-banner, .community-section, .contact-section"
  );

  animatedSections.forEach((section) => {
    revealObserver.observe(section);
  });

  // Footer entrance
  const footer = document.querySelector(".site-footer");

  if (footer) {
    footer.classList.add("project-footer-hidden");

    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footer.classList.remove("project-footer-hidden");
          footer.classList.add("project-footer-visible");
          footerObserver.disconnect();
        }
      });
    }, { threshold: 0.1 });

    footerObserver.observe(footer);
  }

  // Project filter animation
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card-wrap");
  const noProjects = document.querySelector(".no-projects");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      let visibleCount = 0;

      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      projectCards.forEach((card) => {
        const matches =
          filter === "all" || card.dataset.category === filter;

        if (matches) {
          card.hidden = false;
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";

          requestAnimationFrame(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          });

          visibleCount++;
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(15px)";

          setTimeout(() => {
            card.hidden = true;
          }, 300);
        }
      });

      if (noProjects) {
        noProjects.hidden = visibleCount > 0;
      }
    });
  });

  // Project enquiry tabs
  const projectTabs = document.querySelectorAll(".form-tab");
  const selectedProject = document.querySelector("#selectedProject");

  projectTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      projectTabs.forEach((item) => {
        item.classList.toggle("active", item === tab);
      });

      if (selectedProject) {
        selectedProject.value = tab.dataset.selectProject;
      }
    });
  });

  // Preselect project when clicking an enquiry link
  document.querySelectorAll("[data-project]").forEach((link) => {
    link.addEventListener("click", () => {
      const projectName = link.dataset.project;
      const matchingTab = document.querySelector(
        `.form-tab[data-select-project="${projectName}"]`
      );

      if (matchingTab) {
        matchingTab.click();
      }
    });
  });

  // Gallery image click preview
  const galleryImages = document.querySelectorAll(
    ".gallery-thumbs img, .dyuloka-gallery img"
  );

  galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
      const gallery = image.closest(".navavana-gallery, .dyuloka-visual");
      if (!gallery) return;

      const mainImage = gallery.querySelector(
        ".gallery-main, .dyuloka-main"
      );

      if (!mainImage || image === mainImage) return;

      const previousSource = mainImage.src;
      const previousAlt = mainImage.alt;

      mainImage.style.opacity = "0";

      setTimeout(() => {
        mainImage.src = image.src;
        mainImage.alt = image.alt;
        mainImage.style.opacity = "1";
        image.src = previousSource;
        image.alt = previousAlt;
      }, 220);
    });
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

});
