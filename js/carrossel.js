// ./js/carousel.js
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carousel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const wrapper = document.getElementById('carousel-wrapper');

  if (!carousel || !prevBtn || !nextBtn || !wrapper) {
    console.error('Carousel: elemento(s) não encontrado(s). Verifique IDs.');
    return;
  }

  // Setup inicial
  const slides = Array.from(carousel.children);
  const totalSlides = slides.length;
  if (totalSlides === 0) return;

  let index = 1; // vamos posicionar no primeiro slide "real"
  const delay = 2000;
  const transitionMs = 800;
  let intervalId = null;

  // Cria clones (lastClone antes, firstClone depois)
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  carousel.insertBefore(lastClone, carousel.firstChild);
  carousel.appendChild(firstClone);

  // Ajusta largura do container interno (opcional se cada slide for width:100%)
  // Inicia posicionado no primeiro slide real (índice 1 no novo conjunto)
  carousel.style.transform = `translateX(-100%)`;

  // Função para mover
  function goTo(i) {
    carousel.style.transition = `transform ${transitionMs}ms ease-in-out`;
    carousel.style.transform = `translateX(-${i * 100}%)`;
  }

  // Ajuste ao terminar a transição (loop suave)
  carousel.addEventListener('transitionend', () => {
    const all = carousel.children;
    // se foi para o clone final (índice totalSlides + 1) -> voltar ao 1
    if (index === totalSlides + 1) {
      carousel.style.transition = 'none';
      index = 1;
      carousel.style.transform = `translateX(-${index * 100}%)`;
      // força repaint para evitar glitch
      void carousel.offsetWidth;
      carousel.style.transition = `transform ${transitionMs}ms ease-in-out`;
    }

    // se foi para o clone do começo (índice 0) -> pular para último real
    if (index === 0) {
      carousel.style.transition = 'none';
      index = totalSlides;
      carousel.style.transform = `translateX(-${index * 100}%)`;
      void carousel.offsetWidth;
      carousel.style.transition = `transform ${transitionMs}ms ease-in-out`;
    }
  });

  // Funções de controle
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

  // proteção simples contra cliques muito rápidos
  let carouselIsMoving = false;
  carousel.addEventListener('transitionstart', () => (carouselIsMoving = true));
  carousel.addEventListener('transitionend', () => (carouselIsMoving = false));

  // Botões
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

  // Autoplay com pausa entre imagens (delay + transition)
  function startAuto() {
    stopAuto();
    intervalId = setInterval(() => {
      next();
    }, delay + transitionMs);
  }

  function stopAuto() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // Pausar ao hover do wrapper (botões e área)
  wrapper.addEventListener('mouseenter', stopAuto);
  wrapper.addEventListener('mouseleave', startAuto);

  // inicia autoplay
  startAuto();
});
