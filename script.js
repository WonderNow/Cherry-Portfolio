//********
// Apparition des éléments au défilement
//********
document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('.appear');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(function(element) {
      element.classList.add('appear-active');
    });
    return;
  }

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear-active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -100px 0px'
  });

  elements.forEach(function(element) {
    observer.observe(element);
  });
});


//********
// Désactive le scrolling pendant 3 secondes au load
//********
window.addEventListener('load', function() {
  // Ajoute la classe 'no-scroll' au body
  document.body.classList.add('no-scroll');
  
  // Retire la classe 'no-scroll' après 3 secondes
  setTimeout(function() {
      document.body.classList.remove('no-scroll');
  }, 3000); // 3000 ms = 3 secondes
});


//********
// Force le positionnement en haut de la page à chaque reload
//********
window.addEventListener('pagehide', function(event) {
    window.scrollTo(0, 0); // Fait défiler la page en haut
});


//********
// Fonction d'initialisation de Lenis Smooth Scroll
//********
function initLenisSmoothScroll() {
  let lenis;
  if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
          lerp: 0.1,
          wheelMultiplier: 1,
          gestureOrientation: 'vertical',
          normalizeWheel: false,
          smoothTouch: false
      });

      function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      $("[data-lenis-start]").on("click", function () {
          lenis.start();
      });

      $("[data-lenis-stop]").on("click", function () {
          lenis.stop();
      });

      $("[data-lenis-toggle]").on("click", function () {
          $(this).toggleClass("stop-scroll");
          if ($(this).hasClass("stop-scroll")) {
              lenis.stop();
          } else {
              lenis.start();
          }
      });
  }
}

// Attendre 3 secondes après le chargement de la page avant d'exécuter la fonction
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(initLenisSmoothScroll, 3000);  // Exécuter après 3 secondes
});
