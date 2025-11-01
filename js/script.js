import { scrollSmoot } from './scrollSmoot.js';

const menu = document.querySelector('#hamburger')
const nav = document.querySelector('#nav')

menu.addEventListener('click', () => {
  nav.classList.toggle('active')
  menu.classList.toggle('fa-bars')
  menu.classList.toggle('fa-close')
})

document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const alvo = document.querySelector(this.getAttribute('href'));
    if (!alvo) return; // evita erro se o alvo não existir

    const destinoY = alvo.getBoundingClientRect().top + window.pageYOffset - 70; // ajuste do header fixo

    scrollSmoot(destinoY, 2500);

    /* 2500ms = 2.5 segundos (bem lento)
      Valor	Velocidade
      800	rápido
      1200	suave
      2000	lento
      2500	bem lento
      3500	muito lento
      5000	super cinematográfico
    */
  });
});


// MODAL
const modal       = document.getElementById("modal");
const modalImg    = document.getElementById("modal-img");
const closeModal  = document.getElementById("close-modal");

// pega todas as imagens clicáveis
document.querySelectorAll(".foto").forEach(img => {
  img.addEventListener("click", () => {
    modalImg.src = img.src;           // coloca a imagem no modal
    modal.classList.remove("hidden"); // exibe modal
    modal.classList.add("flex");      // ativa layout
  });
});

// fechar ao clicar no X
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

// fechar ao clicar fora da imagem
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
});


