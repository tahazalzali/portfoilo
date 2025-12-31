/**
* Template Name: DevFolio - v4.3.0
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener, { passive: true })
  }

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  const runWhenIdle = (cb, timeout = 1500) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(cb, { timeout })
    } else {
      setTimeout(cb, 200)
    }
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  document.addEventListener('click', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      const dropdownLink = e.target.closest('.navbar .dropdown > a');
      if (dropdownLink) {
        e.preventDefault()
        dropdownLink.nextElementSibling.classList.toggle('dropdown-active')
      }
    }
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Intro type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    if (prefersReducedMotion) {
      typed.textContent = typed_strings[0] || ''
    } else {
      new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 40,
        backSpeed: 20,
        startDelay: 0,
        backDelay: 2000,
        smartBackspace: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true,
        contentType: 'text'
      });
    }
  }

  /**
   * Initiate portfolio lightbox 
   */
  runWhenIdle(() => {
    if (typeof GLightbox === 'undefined') return
    GLightbox({
      selector: '.portfolio-lightbox'
    });
  }, 1200);

  /**
   * Testimonials slider
   */
  runWhenIdle(() => {
    if (typeof Swiper === 'undefined') return
    if (document.querySelector('.testimonials-slider')) {
      new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        grabCursor: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        }
      });
    }

    /**
     * Portfolio details slider
     */
    if (document.querySelector('.portfolio-details-slider')) {
      new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        grabCursor: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        }
      });
    }
  }, 1200);

  /**
   * Preloader - Remove immediately to show content fast
   */
  let preloader = select('#preloader');
  if (preloader) {
    const removePreloader = () => {
      if (preloader) {
        preloader.remove();
        preloader = null;
      }
    };

    // Remove preloader as soon as DOM is ready
    if (document.readyState !== 'loading') {
      removePreloader();
    } else {
      document.addEventListener('DOMContentLoaded', removePreloader);
    }
    
    // Fallback: Remove after 500ms max
    setTimeout(removePreloader, 500); 
  }

  /**
   * Animation on scroll - Disabled for instant content display
   */
  const initAOS = () => {
    // Remove all data-aos attributes to show content immediately
    document.querySelectorAll('[data-aos]').forEach(el => {
      el.removeAttribute('data-aos');
      el.removeAttribute('data-aos-delay');
      el.removeAttribute('data-aos-duration');
    });
  };
  
  // Run immediately
  initAOS();

  /**
   * Mobile scroll-reveal to match desktop motion
   */
  if (isMobile) {
    const revealTargets = document.querySelectorAll(
      '.box-shadow-full, .work-box, .project-card, .service-box, .title-box, .about-info, .about-me, .hero-title, .hero-subtitle, [data-aos]'
    );
    revealTargets.forEach(el => el.classList.add('mobile-reveal'));

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
      );

      revealTargets.forEach(el => observer.observe(el));
    } else {
      revealTargets.forEach(el => el.classList.add('is-visible'));
    }
  }

  /**
   * Lazy Load Background Images
   */
  if ('IntersectionObserver' in window) {
    const lazyBgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const src = el.getAttribute('data-bg');
          if (src) {
            el.style.backgroundImage = `url(${src})`;
            el.classList.add('bg-loaded');
            observer.unobserve(el);
          }
        }
      });
    }, { rootMargin: '200px 0px' }); // Load 200px before viewport

    document.querySelectorAll('.lazy-bg').forEach(el => lazyBgObserver.observe(el));
  } else {
    // Fallback for older browsers
    document.querySelectorAll('.lazy-bg').forEach(el => {
      const src = el.getAttribute('data-bg');
      if (src) {
        el.style.backgroundImage = `url(${src})`;
      }
    });
  }

  /**
   * Enhanced Certificate/Portfolio Image Loading
   * - Fade-in animation on load
   * - Skeleton loading state removal
   * - Eager preloading of nearby images
   */
  const initCertificateImageLoading = () => {
    const workImages = document.querySelectorAll('.work-img img');
    
    // Handle each image
    workImages.forEach(img => {
      // If image is already loaded (cached), show immediately
      if (img.complete && img.naturalHeight !== 0) {
        img.classList.add('loaded');
        img.closest('.work-img')?.classList.add('loaded');
      } else {
        // Add load event for images not yet loaded
        img.addEventListener('load', function() {
          this.classList.add('loaded');
          this.closest('.work-img')?.classList.add('loaded');
        }, { once: true });
        
        // Handle error gracefully
        img.addEventListener('error', function() {
          this.classList.add('loaded'); // Still remove skeleton
          console.warn('Failed to load certificate image:', this.src);
        }, { once: true });
      }
    });

    // Preload images that are about to come into view (aggressive preloading)
    if ('IntersectionObserver' in window) {
      const preloadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const container = img.closest('.work-box');
            const lightboxLink = container?.querySelector('a.portfolio-lightbox');
            
            // Preload the full-size image for lightbox when thumbnail is visible
            if (lightboxLink) {
              const fullSizeUrl = lightboxLink.getAttribute('href');
              if (fullSizeUrl && fullSizeUrl !== img.src) {
                const preloadImg = new Image();
                preloadImg.src = fullSizeUrl;
              }
            }
            observer.unobserve(img);
          }
        });
      }, { 
        rootMargin: '300px 0px', // Start preloading 300px before viewport
        threshold: 0
      });

      workImages.forEach(img => preloadObserver.observe(img));
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCertificateImageLoading);
  } else {
    initCertificateImageLoading();
  }

  /**
   * Bootstrap tooltips (no jQuery)
   */
  if (window.bootstrap) {
    const tooltipTriggers = document.querySelectorAll('[data-toggle="tooltip"], [data-bs-toggle="tooltip"]');
    tooltipTriggers.forEach(el => {
      new bootstrap.Tooltip(el);
    });
  }

  /**
   * Particles.js
   */
  /*
  if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 50,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }
  */

  /**
   * Vanilla Tilt
   */
  if (typeof VanillaTilt !== 'undefined' && hasFinePointer && !prefersReducedMotion) {
    runWhenIdle(() => {
      VanillaTilt.init(document.querySelectorAll(".work-box"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
      });
    })
  }

  /**
   * Custom Cursor - Dev Power Follower & Particle System
   */
  let pauseCursor = () => {};
  let resumeCursor = () => {};
  let pauseBg = () => {};
  let resumeBg = () => {};
  let setBgFps = () => {};

  let isScrolling = false;
  let scrollStopTimer;
  window.addEventListener('scroll', () => {
    isScrolling = true;
    setBgFps(20);
    clearTimeout(scrollStopTimer);
    scrollStopTimer = setTimeout(() => {
      isScrolling = false;
      setBgFps(30);
      resumeCursor();
      // Background animation continues during scroll, so no need to resume
    }, 120);
    pauseCursor();
    // Background animation continues during scroll
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseCursor();
      pauseBg();
    } else {
      resumeCursor();
      resumeBg();
    }
  });

  /**
   * Cursor Follower with Optimized Particle Trail
   * Performance safeguards:
   * - Particle pool to avoid GC
   * - Frame skipping during scroll
   * - Limited particle count
   * - Throttled particle spawning
   * - Auto-pause when tab hidden
   */
  if (!prefersReducedMotion && hasFinePointer && !isMobile) {
    // Add class to hide native cursor
    document.body.classList.add('has-custom-cursor');
    
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    cursorFollower.innerHTML = '<i class="bi bi-code-slash"></i>';
    cursorFollower.setAttribute('aria-hidden', 'true');
    cursorFollower.style.opacity = '0';
    document.body.appendChild(cursorFollower);

    // Canvas for particle trail
    const canvas = document.createElement('canvas');
    canvas.id = 'cursor-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false });

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    // Debounced resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.scale(dpr, dpr);
      }, 150);
    }, { passive: true });

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let hasMouseMoved = false;
    let cursorRafId = null;
    let isHovering = false;
    let lastSpawnTime = 0;
    const spawnInterval = 50; // ms between particle spawns

    // Optimized lerp factor
    const lerpFactor = 0.15;

    // Particle pool for memory efficiency
    const MAX_PARTICLES = 15;
    const particlePool = [];
    const activeParticles = [];

    // Pre-create particle pool
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particlePool.push({
        x: 0, y: 0, size: 0, speedX: 0, speedY: 0, life: 0, decay: 0, active: false
      });
    }

    const getParticle = () => {
      for (let p of particlePool) {
        if (!p.active) return p;
      }
      return null; // Pool exhausted
    };

    const spawnParticle = (x, y) => {
      const p = getParticle();
      if (!p) return;
      
      p.x = x;
      p.y = y;
      p.size = Math.random() * 2 + 1;
      p.speedX = (Math.random() - 0.5) * 0.8;
      p.speedY = (Math.random() - 0.5) * 0.8;
      p.life = 1;
      p.decay = Math.random() * 0.02 + 0.015;
      p.active = true;
      activeParticles.push(p);
    };

    // Cache CSS color to avoid getComputedStyle in animation loop
    let cachedColor = '77, 163, 255';
    const updateCachedColor = () => {
      const style = getComputedStyle(document.body);
      cachedColor = style.getPropertyValue('--cursor-color-rgb').trim() || '77, 163, 255';
    };
    updateCachedColor();
    
    // Update color on theme change
    const observer = new MutationObserver(() => updateCachedColor());
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!hasMouseMoved) {
        hasMouseMoved = true;
        currentX = mouseX;
        currentY = mouseY;
        cursorFollower.style.opacity = '1';
        startCursorAnimation();
      }
      
      // Throttled particle spawning
      const now = performance.now();
      if (!isScrolling && now - lastSpawnTime > spawnInterval) {
        spawnParticle(mouseX, mouseY);
        lastSpawnTime = now;
      }
    }, { passive: true });

    // Click feedback
    document.addEventListener('mousedown', () => {
      cursorFollower.classList.add('is-active');
      // Burst effect on click
      for (let i = 0; i < 3; i++) {
        spawnParticle(mouseX + (Math.random() - 0.5) * 10, mouseY + (Math.random() - 0.5) * 10);
      }
    }, { passive: true });
    
    document.addEventListener('mouseup', () => {
      cursorFollower.classList.remove('is-active');
    }, { passive: true });

    // Cached constants for animation loop
    const TWO_PI = Math.PI * 2;
    let lastFrameTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    function animateCursor(timestamp) {
      if (cursorRafId === null) return;
      
      // Frame rate limiting for consistent animation
      const elapsed = timestamp - lastFrameTime;
      if (elapsed < frameInterval * 0.8) {
        cursorRafId = requestAnimationFrame(animateCursor);
        return;
      }
      lastFrameTime = timestamp;
      
      // Smooth cursor movement
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;
      
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        currentX += dx * lerpFactor;
        currentY += dy * lerpFactor;
        cursorFollower.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      
      // Particle rendering (skip during scroll for performance)
      if (!isScrolling && activeParticles.length > 0) {
        ctx.clearRect(0, 0, width, height);
        
        // Batch similar operations
        ctx.fillStyle = `rgba(${cachedColor}, 0.6)`;
        
        // Update and draw particles
        for (let i = activeParticles.length - 1; i >= 0; i--) {
          const p = activeParticles[i];
          
          // Update
          p.x += p.speedX;
          p.y += p.speedY;
          p.life -= p.decay;
          if (p.size > 0.3) p.size -= 0.03;
          
          // Remove dead particles
          if (p.life <= 0) {
            p.active = false;
            activeParticles.splice(i, 1);
            continue;
          }
          
          // Draw with individual opacity
          ctx.globalAlpha = p.life * 0.6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, TWO_PI);
          ctx.fill();
        }
        
        // Reset alpha
        ctx.globalAlpha = 1;
        
        // Draw connecting lines (constellation effect) - only if few particles
        if (activeParticles.length > 2 && activeParticles.length < 10) {
          ctx.strokeStyle = `rgba(${cachedColor}, 0.08)`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          for (const p of activeParticles) {
            const dist = Math.hypot(p.x - currentX, p.y - currentY);
            if (dist < 80) {
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(currentX, currentY);
            }
          }
          ctx.stroke();
        }
      }
      
      cursorRafId = requestAnimationFrame(animateCursor);
    }

    const startCursorAnimation = () => {
      if (cursorRafId !== null) return;
      cursorRafId = requestAnimationFrame(animateCursor);
    };

    pauseCursor = () => {
      if (cursorRafId === null) return;
      cancelAnimationFrame(cursorRafId);
      cursorRafId = null;
    };

    resumeCursor = () => {
      if (!hasMouseMoved) return;
      startCursorAnimation();
    };

    // Hover effects using event delegation
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, .work-box, .service-box, .card-blog, .project-card, input, textarea, .nav-link, .portfolio-lightbox');
      if (target && !isHovering) {
        isHovering = true;
        cursorFollower.classList.add('is-hovering');
      }
    }, { passive: true });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('a, button, .work-box, .service-box, .card-blog, .project-card, input, textarea, .nav-link, .portfolio-lightbox');
      const relatedTarget = e.relatedTarget?.closest('a, button, .work-box, .service-box, .card-blog, .project-card, input, textarea, .nav-link, .portfolio-lightbox');
      
      if (target && !relatedTarget && isHovering) {
        isHovering = false;
        cursorFollower.classList.remove('is-hovering');
      }
    }, { passive: true });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursorFollower.style.opacity = '0';
      canvas.style.opacity = '0';
    }, { passive: true });

    document.addEventListener('mouseenter', () => {
      if (hasMouseMoved) {
        cursorFollower.style.opacity = '1';
        canvas.style.opacity = '1';
      }
    }, { passive: true });
  }

  /**
   * Service Worker - Unregister any existing SW to fix caching issues
   */
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister();
      });
    });
    // Clear all caches
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
  }

})()
