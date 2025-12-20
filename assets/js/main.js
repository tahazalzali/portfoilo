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
      behavior: 'smooth'
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
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

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

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Testimonials slider
   */
  if (typeof Swiper !== 'undefined' && document.querySelector('.testimonials-slider')) {
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
  if (typeof Swiper !== 'undefined' && document.querySelector('.portfolio-details-slider')) {
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

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 50
    })
  });

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
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".work-box"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
    });
  }

  /**
   * Custom Cursor - Dev Power Follower & Particle System
   */
  let isScrolling = false;
  let scrollStopTimer;
  window.addEventListener('scroll', () => {
    isScrolling = true;
    clearTimeout(scrollStopTimer);
    scrollStopTimer = setTimeout(() => {
      isScrolling = false;
    }, 120);
  }, { passive: true });

  const cursorFollower = document.createElement('div');
  cursorFollower.classList.add('cursor-follower');
  cursorFollower.innerHTML = '<i class="fas fa-code"></i>';
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
  
  // Particle System
  const particles = [];
  const maxParticles = 20; // Limit for performance

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
      this.life = 1; // Opacity/Life
      this.decay = Math.random() * 0.03 + 0.02;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= this.decay;
      if (this.size > 0.2) this.size -= 0.1;
    }
    
    draw() {
      ctx.fillStyle = `rgba(77, 163, 255, ${this.life})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Spawn particles on move
    if (Math.random() > 0.5 && particles.length < maxParticles) {
      particles.push(new Particle(mouseX, mouseY));
    }
  });

  function animateCursor() {
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
      ctx.strokeStyle = 'rgba(77, 163, 255, 0.1)';
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

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .work-box, .service-box, .card-blog, input, textarea');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      scale = 1.5;
      cursorFollower.style.backgroundColor = 'rgba(77, 163, 255, 0.1)';
      cursorFollower.style.borderColor = 'transparent';
    });
    el.addEventListener('mouseleave', () => {
      scale = 1;
      cursorFollower.style.backgroundColor = 'rgba(77, 163, 255, 0.15)';
      cursorFollower.style.borderColor = 'rgba(77, 163, 255, 0.5)';
    });
  });

  /**
   * Global Background Animation - Digital Rain
   */
  const bgCanvas = document.getElementById('global-canvas');
  if (bgCanvas) {
    const bgCtx = bgCanvas.getContext('2d');
    let bgWidth = window.innerWidth;
    let bgHeight = window.innerHeight;
    
    bgCanvas.width = bgWidth;
    bgCanvas.height = bgHeight;

    const chars = '01<>/{}';
    const fontSize = 14;
    const columns = bgWidth / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    function drawBg() {
      if (isScrolling) {
        requestAnimationFrame(drawBg);
        return;
      }
      // Translucent black background to create trail effect
      bgCtx.fillStyle = 'rgba(17, 17, 17, 0.05)';
      bgCtx.fillRect(0, 0, bgWidth, bgHeight);

      bgCtx.fillStyle = 'rgba(77, 163, 255, 0.25)'; // Theme blue with low opacity
      bgCtx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        bgCtx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > bgHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      requestAnimationFrame(drawBg);
    }

    // Start animation loop
    requestAnimationFrame(drawBg);

    window.addEventListener('resize', () => {
      bgWidth = window.innerWidth;
      bgHeight = window.innerHeight;
      bgCanvas.width = bgWidth;
      bgCanvas.height = bgHeight;
      // Re-init drops
      const newColumns = bgWidth / fontSize;
      drops.length = 0;
      for (let x = 0; x < newColumns; x++) {
        drops[x] = 1;
      }
    });
  }

})()
