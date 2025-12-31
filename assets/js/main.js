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
   * Simple Cursor Follower - Safe version without particle canvas
   */
  if (!prefersReducedMotion && hasFinePointer && !isMobile) {
    // Add class to hide native cursor
    document.body.classList.add('has-custom-cursor');
    
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    cursorFollower.innerHTML = '<i class="fas fa-code"></i>';
    cursorFollower.setAttribute('aria-hidden', 'true');
    cursorFollower.style.opacity = '0';
    document.body.appendChild(cursorFollower);

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let hasMouseMoved = false;
    let cursorRafId = null;
    let isHovering = false;

    // Optimized lerp factor - slightly faster response
    const lerpFactor = 0.18;

    // Use passive event listener for better scroll performance
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
    }, { passive: true });

    // Click feedback
    document.addEventListener('mousedown', () => {
      cursorFollower.classList.add('is-active');
    }, { passive: true });
    
    document.addEventListener('mouseup', () => {
      cursorFollower.classList.remove('is-active');
    }, { passive: true });

    function animateCursor() {
      if (cursorRafId === null) return;
      
      // Smooth interpolation with threshold to stop unnecessary updates
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;
      
      // Only update if movement is significant (> 0.1px)
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        currentX += dx * lerpFactor;
        currentY += dy * lerpFactor;
        
        // Use transform for GPU-accelerated positioning
        cursorFollower.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
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

    // Hover effects using event delegation for better performance
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
    }, { passive: true });

    document.addEventListener('mouseenter', () => {
      if (hasMouseMoved) {
        cursorFollower.style.opacity = '1';
      }
    }, { passive: true });
  }

  // Old cursor code disabled below
  if (false) { // Disabled - particle system was causing rendering issues
    document.body.classList.add('has-custom-cursor');
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    cursorFollower.innerHTML = '<i class="fas fa-code"></i>';
    cursorFollower.setAttribute('aria-hidden', 'true');
    cursorFollower.style.opacity = '0';
    document.body.appendChild(cursorFollower);

    // Canvas for particle trail
    const canvas = document.createElement('canvas');
    canvas.id = 'cursor-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let scale = 1;
    let hasMouseMoved = false;
    let cursorRafId = null;
    let lastCursorFrame = 0;

    // Particle System
    const particles = [];
    const maxParticles = 20; // Limit for performance

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        // Adjusted speed and decay for 60fps
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.life = 1; // Opacity/Life
        this.decay = Math.random() * 0.015 + 0.01;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        if (this.size > 0.2) this.size -= 0.05; // Slower size decay for 60fps
      }
      
      draw() {
        // Get color from CSS variable for theme support
        const style = getComputedStyle(document.body);
        const color = style.getPropertyValue('--cursor-color-rgb').trim() || '77, 163, 255';
        
        ctx.fillStyle = `rgba(${color}, ${this.life})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMouseMoved) {
        hasMouseMoved = true;
        cursorFollower.style.opacity = '1';
        startCursorAnimation();
      }
      
      // Spawn particles on move
      if (Math.random() > 0.5 && particles.length < maxParticles) {
        particles.push(new Particle(mouseX, mouseY));
      }
    }, { passive: true });

    function animateCursor(timestamp) {
      if (cursorRafId === null) return;
      // Removed 30fps cap for smoother cursor movement (60fps+)
      
      // Smooth lerp movement for the main cursor
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      
      cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%) scale(${scale})`;
      
      if (!isScrolling) {
        // Canvas Render Loop
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
          
          // Remove dead particles
          if (particles[i].life <= 0) {
            particles.splice(i, 1);
            i--;
          }
        }
        
        // Draw connecting lines (Constellation effect)
        // Only connect if close to cursor
        const style = getComputedStyle(document.body);
        const color = style.getPropertyValue('--cursor-color-rgb').trim() || '77, 163, 255';
        ctx.strokeStyle = `rgba(${color}, 0.1)`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
          const dx = particles[i].x - followerX;
          const dy = particles[i].y - followerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(followerX, followerY);
          }
        }
        ctx.stroke();
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

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .work-box, .service-box, .card-blog, input, textarea');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        scale = 1.5;
        const style = getComputedStyle(document.body);
        const color = style.getPropertyValue('--cursor-color-rgb').trim() || '77, 163, 255';
        cursorFollower.style.backgroundColor = `rgba(${color}, 0.1)`;
        cursorFollower.style.borderColor = 'transparent';
      });
      el.addEventListener('mouseleave', () => {
        scale = 1;
        const style = getComputedStyle(document.body);
        const color = style.getPropertyValue('--cursor-color-rgb').trim() || '77, 163, 255';
        cursorFollower.style.backgroundColor = `rgba(${color}, 0.15)`;
        cursorFollower.style.borderColor = `rgba(${color}, 0.5)`;
      });
    });
  }

  /**
   * Global Background Animation - Digital Rain
   */
  const bgCanvas = document.getElementById('global-canvas');
  if (false && bgCanvas && !prefersReducedMotion && !isMobile) { // Disabled for performance
    let bgWorker = null;

    const updateWorkerConfig = () => {
      if (!bgWorker) return;
      const style = getComputedStyle(document.body);
      const color = style.getPropertyValue('--cursor-color-rgb').trim() || '77, 163, 255';
      const isLight = document.body.classList.contains('theme-light');
      bgWorker.postMessage({
        type: 'config',
        payload: {
          isLight,
          color
        }
      });
    };

    if ('OffscreenCanvas' in window) {
      try {
        const offscreen = bgCanvas.transferControlToOffscreen();
        bgWorker = new Worker('assets/js/canvas-worker.js');
        
        bgWorker.postMessage({
          type: 'init',
          payload: {
            canvas: offscreen,
            width: window.innerWidth,
            height: window.innerHeight
          }
        }, [offscreen]);

        // Handle resizing
        window.addEventListener('resize', () => {
          bgWorker.postMessage({
            type: 'resize',
            payload: {
              width: window.innerWidth,
              height: window.innerHeight
            }
          });
        });

        // Handle theme changes
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
              updateWorkerConfig();
            }
          });
        });
        observer.observe(document.body, { attributes: true });
        
        // Initial config
        updateWorkerConfig();

        // Implement controls
        pauseBg = () => bgWorker.postMessage({ type: 'pause' });
        resumeBg = () => bgWorker.postMessage({ type: 'resume' });
        setBgFps = (fps) => bgWorker.postMessage({ type: 'config', payload: { fps } });
      } catch (e) {
        console.warn('OffscreenCanvas failed, falling back to main thread', e);
        // Fallback logic will be triggered if bgWorker is null? 
        // No, the else block is for !('OffscreenCanvas' in window).
        // We need to handle the fallback here too.
        // For simplicity, if it fails, we just won't have the background animation or we can reload the page?
        // Better to just let it fail gracefully and maybe try the fallback.
        // But the fallback code is in the `else` block.
        // I should restructure this to use a flag or function.
      }

    } else {
      // Fallback for browsers without OffscreenCanvas support
      const bgCtx = bgCanvas.getContext('2d');
      let bgWidth = window.innerWidth;
      let bgHeight = window.innerHeight;
      let bgRafId = null;
      let lastBgFrame = 0;
      let fps = 30;
      
      bgCanvas.width = bgWidth;
      bgCanvas.height = bgHeight;

      const chars = '01<>/{}';
      const fontSize = 14;
      const columns = bgWidth / fontSize;
      const drops = [];

      for (let x = 0; x < columns; x++) {
        drops[x] = 1;
      }

      function drawBg(timestamp) {
        if (bgRafId === null) return;
        
        if (timestamp - lastBgFrame < 1000 / fps) {
          bgRafId = requestAnimationFrame(drawBg);
          return;
        }
        lastBgFrame = timestamp;
        
        const style = getComputedStyle(document.body);
        const isLight = document.body.classList.contains('theme-light');
        
        if (isLight) {
           bgCtx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        } else {
           bgCtx.fillStyle = 'rgba(17, 17, 17, 0.1)';
        }
        
        bgCtx.fillRect(0, 0, bgWidth, bgHeight);

        const color = style.getPropertyValue('--cursor-color-rgb').trim() || '77, 163, 255';
        const opacity = isLight ? '0.8' : '0.4';
        bgCtx.fillStyle = `rgba(${color}, ${opacity})`; 
        bgCtx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
          const text = chars.charAt(Math.floor(Math.random() * chars.length));
          bgCtx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > bgHeight && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
        bgRafId = requestAnimationFrame(drawBg);
      }

      const startBgAnimation = () => {
        if (bgRafId !== null) return;
        bgRafId = requestAnimationFrame(drawBg);
      };
      
      pauseBg = () => {
        if (bgRafId === null) return;
        cancelAnimationFrame(bgRafId);
        bgRafId = null;
      };
      resumeBg = () => {
        startBgAnimation();
      };
      setBgFps = (newFps) => { fps = newFps; };
      
      runWhenIdle(startBgAnimation, 2000);

      window.addEventListener('resize', () => {
        bgWidth = window.innerWidth;
        bgHeight = window.innerHeight;
        bgCanvas.width = bgWidth;
        bgCanvas.height = bgHeight;
        const newColumns = bgWidth / fontSize;
        drops.length = 0;
        for (let x = 0; x < newColumns; x++) {
          drops[x] = 1;
        }
      });
    }
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
