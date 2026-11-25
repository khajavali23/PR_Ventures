document.addEventListener('DOMContentLoaded',()=>{
  const featureData={
    entry:{title:'Entry & security',desc:'Gated access is part of the community plan. Navavana’s project information includes gated entry with security; Dyuloka includes a gated entrance plaza.',image:'assets/community-gate-reference.jpg'},
    roads:{title:'Internal roads',desc:'Internal roads are part of the planned layout. Dyuloka’s project information includes well-laid roads; Navavana’s detailed road specifications should be confirmed against the approved master plan.',image:'assets/aerial-community.jpg'},
    green:{title:'Green spaces',desc:'Natural surroundings and landscaped spaces shape the setting. Dyuloka includes parks and green surroundings; Navavana is described as a forest-themed community beside a lake and hills.',image:'assets/navavana-lake.jpg'},
    utilities:{title:'Utilities',desc:'Essential utilities form part of the community infrastructure. Dyuloka project information specifically includes underground cables. Confirm the full utility schedule for each project.',image:'assets/concrete-infrastructure.jpg'},
    community:{title:'Community spaces',desc:'Shared spaces support community life. Dyuloka includes an entrance plaza and parks; Navavana includes a clubhouse for residents.',image:'assets/villa-community.jpg'}
  };
  const tabs=[...document.querySelectorAll('.feature-tab')];
  tabs.forEach(tab=>tab.addEventListener('click',()=>{
    const data=featureData[tab.dataset.feature]; if(!data)return;
    tabs.forEach(t=>{t.classList.toggle('active',t===tab);t.setAttribute('aria-selected',t===tab?'true':'false')});
    const img=document.getElementById('featureImage');
    img.style.opacity='0';
    setTimeout(()=>{img.src=data.image;img.alt=data.title;document.getElementById('featureTitle').textContent=data.title;document.getElementById('featureDescription').textContent=data.desc;document.getElementById('featureIndex').textContent=String(tabs.indexOf(tab)+1).padStart(2,'0')+' / 05';img.style.opacity='1'},180);
  }));
  const form=document.getElementById('developmentForm');
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const d=new FormData(form);
    const subject=encodeURIComponent('PR Ventures development enquiry — '+d.get('interest'));
    const body=encodeURIComponent('Name: '+d.get('name')+'\nEmail: '+d.get('email')+'\nInterest: '+d.get('interest')+'\nMessage: '+d.get('message'));
    window.location.href='mailto:info@prventures.in?subject='+subject+'&body='+body;
  });
  if(window.gsap && window.ScrollTrigger && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero .reveal',{y:35,opacity:0,duration:1,stagger:.12,ease:'power3.out',delay:.15});
    gsap.utils.toArray('section:not(.hero) .reveal').forEach(el=>{
      gsap.from(el,{y:28,opacity:0,duration:.75,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}});
    });
    gsap.to('.hero-bg',{yPercent:9,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
    gsap.utils.toArray('.portfolio-photo img').forEach(img=>{
      gsap.from(img,{scale:1.12,duration:1.2,ease:'power2.out',scrollTrigger:{trigger:img,start:'top 90%',once:true}});
    });
  }else{
    document.querySelectorAll('.reveal').forEach(el=>el.style.opacity='1');
  }
});


/* ==========================================
   PR VENTURES - DEVELOPMENT PAGE ANIMATIONS
   GSAP + SCROLLTRIGGER
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP or ScrollTrigger could not be loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Respect reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(
      ".about-hero .hero-inner > *, .about-hero .scroll-note, .gsap-reveal, .gsap-left, .gsap-right",
      { opacity: 1, y: 0, x: 0, clearProps: "transform" }
    );
    return;
  }

  // ------------------------------------------
  // HERO ANIMATION
  // ------------------------------------------

  const heroTimeline = gsap.timeline({
    defaults: { ease: "power3.out" }
  });

  heroTimeline
    .to(".about-hero .hero-image", {
      scale: 1,
      duration: 2,
      ease: "power2.out"
    })
    .to(".about-hero .hero-overlay", {
      opacity: 1,
      duration: 1.1
    }, "-=1.5")
    .to(".about-hero .hero-inner > *", {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.16
    }, "-=1.2")
    .to(".about-hero .scroll-note", {
      opacity: 1,
      y: 0,
      duration: 0.7
    }, "-=0.45");


  // ------------------------------------------
  // SCROLL REVEAL HELPER
  // ------------------------------------------

  function revealElements(selector, options = {}) {
    gsap.utils.toArray(selector).forEach((element) => {

      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: options.y ?? 45,
          x: options.x ?? 0
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: options.duration ?? 0.9,
          ease: "power3.out",
          delay: options.delay ?? 0,
          scrollTrigger: {
            trigger: element,
            start: options.start ?? "top 88%",
            once: true
          }
        }
      );

    });
  }


  // ------------------------------------------
  // DEVELOPMENT APPROACH
  // ------------------------------------------

  revealElements(
    ".intro-section .eyebrow, .intro-section .section-title, .intro-section .body-copy",
    { y: 35, duration: 0.85 }
  );

  revealElements(".plan-feature", {
    x: 55,
    y: 0,
    duration: 1.1
  });

  revealElements(".approach-step", {
    x: -35,
    y: 0,
    duration: 0.8
  });


  // ------------------------------------------
  // PHILOSOPHY SECTION
  // ------------------------------------------

  revealElements(
    ".philosophy-section .eyebrow, .philosophy-section .section-title, .philosophy-section .body-copy",
    { y: 35 }
  );

  revealElements(".philosophy-item", {
    x: 45,
    y: 0,
    duration: 0.85
  });


  // ------------------------------------------
  // FEATURES SECTION
  // ------------------------------------------

  revealElements(
    ".features-section .eyebrow, .features-section .section-title, .features-section .body-copy",
    { y: 35 }
  );

  revealElements(".feature-explorer", {
    y: 55,
    duration: 1
  });

  revealElements(".feature-facts > div", {
    y: 35,
    duration: 0.75
  });


  // ------------------------------------------
  // FEATURE TABS - IMAGE TRANSITION
  // ------------------------------------------

  const featureTabs = document.querySelectorAll(".feature-tab");
  const featureImage = document.querySelector("#featureImage");
  const featureIndex = document.querySelector("#featureIndex");
  const featureTitle = document.querySelector("#featureTitle");
  const featureDescription = document.querySelector("#featureDescription");

  const featureContent = {
    entry: {
      image: "assets/community-gate-reference.jpg",
      title: "Entry & security",
      description: "Gated access is part of the community plan. Navavana’s project information includes gated entry with security; Dyuloka includes a gated entrance plaza."
    },
    roads: {
      image: "assets/navavana-road.jpg",
      title: "Internal roads",
      description: "Internal roads are considered as part of the overall layout, connecting plots and shared spaces."
    },
    green: {
      image: "assets/navavana-lake.jpg",
      title: "Green spaces",
      description: "Natural surroundings, parks and landscape planning contribute to the character of each community."
    },
    utilities: {
      image: "assets/dyuloka-project-detail.jpg",
      title: "Utilities",
      description: "Essential provisions are considered within the layout. Dyuloka's project information includes underground cables."
    },
    community: {
      image: "assets/villa-community.jpg",
      title: "Community spaces",
      description: "Shared spaces include a clubhouse at Navavana and an entrance plaza and parks at Dyuloka."
    }
  };

  featureTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {

      const feature = featureContent[tab.dataset.feature];
      if (!feature) return;

      featureTabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", String(active));
      });

      if (featureImage) {
        gsap.to(featureImage, {
          opacity: 0,
          scale: 1.025,
          duration: 0.22,
          onComplete: () => {
            featureImage.src = feature.image;
            featureImage.alt = feature.title;

            gsap.fromTo(
              featureImage,
              { opacity: 0, scale: 1.04 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.65,
                ease: "power2.out"
              }
            );
          }
        });
      }

      if (featureIndex) {
        featureIndex.textContent = `${String(index + 1).padStart(2, "0")} / 05`;
      }

      if (featureTitle) {
        gsap.fromTo(featureTitle,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            onStart: () => {
              featureTitle.textContent = feature.title;
            }
          }
        );
      }

      if (featureDescription) {
        gsap.fromTo(featureDescription,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            onStart: () => {
              featureDescription.textContent = feature.description;
            }
          }
        );
      }

    });
  });


  // ------------------------------------------
  // NATURAL SETTING
  // ------------------------------------------

  revealElements(".setting-copy > *", {
    x: -35,
    y: 0,
    duration: 0.85
  });

  revealElements(".setting-image", {
    x: 45,
    y: 0,
    duration: 1.1
  });

  gsap.to(".setting-image img", {
    scale: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".setting-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    }
  });


  // ------------------------------------------
  // PORTFOLIO ROWS
  // ------------------------------------------

  gsap.utils.toArray(".portfolio-row").forEach((row, index) => {

    const direction = row.classList.contains("reverse") ? -45 : 45;

    gsap.fromTo(row,
      {
        opacity: 0,
        y: 35,
        x: direction
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
          once: true
        }
      }
    );

    const image = row.querySelector(".portfolio-photo img");

    if (image) {
      gsap.fromTo(image,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            once: true
          }
        }
      );
    }

  });


  // ------------------------------------------
  // PLANS SECTION
  // ------------------------------------------

  revealElements(".plans-heading > *", {
    y: 35,
    duration: 0.85
  });

  revealElements(".plan-card", {
    y: 55,
    duration: 1
  });


  // ------------------------------------------
  // PROCESS TIMELINE
  // ------------------------------------------

  revealElements(".process-section .eyebrow, .process-section .section-title, .confirm-note", {
    y: 30
  });

  gsap.utils.toArray(".process-step").forEach((step, index) => {
    gsap.fromTo(step,
      {
        opacity: 0,
        y: 45
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        delay: index * 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: step,
          start: "top 88%",
          once: true
        }
      }
    );
  });


  // ------------------------------------------
  // CONTACT SECTION
  // ------------------------------------------

  gsap.fromTo(".contact-copy > *",
    {
      opacity: 0,
      x: -35
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.85,
      stagger: 0.13,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 75%",
        once: true
      }
    }
  );

  gsap.fromTo(".contact-form-wrap",
    {
      opacity: 0,
      y: 45
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 75%",
        once: true
      }
    }
  );

  gsap.to(".contact-backdrop", {
    scale: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    }
  });


  // ------------------------------------------
  // FOOTER
  // ------------------------------------------

  gsap.fromTo(".footer-main > *",
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".site-footer",
        start: "top 90%",
        once: true
      }
    }
  );

  gsap.fromTo(".footer-bottom",
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".footer-bottom",
        start: "top 95%",
        once: true
      }
    }
  );


  // Refresh ScrollTrigger after images load
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });

});

