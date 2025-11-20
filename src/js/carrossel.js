document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carousel');
  const prevBtn  = document.getElementById('prevBtn');
  const nextBtn  = document.getElementById('nextBtn');
  const wrapper  = document.getElementById('carousel-wrapper');

  if (!carousel || !prevBtn || !nextBtn || !wrapper) {
    console.error('Carousel: elemento(s) não encontrado(s). Verifique IDs.');
    return;
  }

  // Setup inicial
  const slides      = Array.from(carousel.children);
  const totalSlides = slides.length;
  if (totalSlides === 0) return;

  let index          = 1;
  const delay        = 3000;
  const transitionMs = 1200;
  let timerId        = null;
  let carouselIsMoving = false;

  // ---- CLONES (Loop infinito suave) ----
  const firstClone = slides[0].cloneNode(true);
  const lastClone  = slides[slides.length - 1].cloneNode(true);

  carousel.insertBefore(lastClone, carousel.firstChild);
  carousel.appendChild(firstClone);

  // Posição inicial
  carousel.style.transform = `translateX(-100%)`;

  // ---- MOVIMENTO ----
  function goTo(i) {
    carousel.style.transition = `transform ${transitionMs}ms ease-in-out`;
    carousel.style.transform  = `translateX(-${i * 100}%)`;
  }

  // Loop suave (corrige ao chegar nos clones)
  carousel.addEventListener('transitionend', () => {
    carouselIsMoving = false;

    if (index === totalSlides + 1) {
      carousel.style.transition = 'none';
      index = 1;
      carousel.style.transform = `translateX(-100%)`;
      void carousel.offsetWidth; // repintar
      carousel.style.transition = `transform ${transitionMs}ms ease-in-out`;
    }

    if (index === 0) {
      carousel.style.transition = 'none';
      index = totalSlides;
      carousel.style.transform = `translateX(-${index * 100}%)`;
      void carousel.offsetWidth;
      carousel.style.transition = `transform ${transitionMs}ms ease-in-out`;
    }
  });

  // Detecta início da transição
  carousel.addEventListener('transitionstart', () => {
    carouselIsMoving = true;
  });


  // ---- BOTÕES ----
  function next() {
    if (carouselIsMoving) return;
    index++;
    goTo(index);
  }

  function prev() {
    if (carouselIsMoving) return;
    index--;
    goTo(index);
  }

  nextBtn.addEventListener('click', () => {
    stopAuto();
    next();
    startAuto();
  });

  prevBtn.addEventListener('click', () => {
    stopAuto();
    prev();
    startAuto();
  });


  // ---- AUTOPLAY ESTÁVEL (SEM PULOS) ----
  function startAuto() {
    stopAuto();
    timerId = setTimeout(function autoLoop() {
      next();
      timerId = setTimeout(autoLoop, delay + transitionMs);
    }, delay + transitionMs);
  }

  function stopAuto() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  }


  // ---- CORREÇÃO CRUCIAL: PERDEU O FOCO DA ABA → RESET SEGURO ----
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      // Voltou para a aba → corrigir estado
      stopAuto();
      carousel.style.transition = 'none';
      index = 1;
      carousel.style.transform = `translateX(-100%)`;
      void carousel.offsetWidth;
      carousel.style.transition = `transform ${transitionMs}ms ease-in-out`;
      startAuto();
    } else {
      // Saindo da aba → pausa autoplay
      stopAuto();
    }
  });


  // ---- PAUSA NO HOVER ----
  wrapper.addEventListener('mouseenter', stopAuto);
  wrapper.addEventListener('mouseleave', startAuto);

  // Iniciar autoplay
  startAuto();
});
