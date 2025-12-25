/**
 * Theme Switcher Script
 * Detects the active section and switches the body theme class.
 */

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section, #hero');
  const body = document.body;

  const observerOptions = {
    root: null,
    rootMargin: '-45% 0px -45% 0px', // Trigger when the section is near the middle of the viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const theme = entry.target.getAttribute('data-theme');
        if (theme) {
          // Remove existing theme classes
          body.classList.remove('theme-dark', 'theme-light');
          // Add the new theme class
          body.classList.add(`theme-${theme}`);
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
});
