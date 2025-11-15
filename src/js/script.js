import { scrollSmoot } from './scrollSmoot.js';
import { modal }       from './modal.js';

const menu       = document.querySelector('#hamburger')
const nav        = document.querySelector('#nav')
const header     = document.querySelector('#header')
const links      = document.querySelectorAll("nav a");

menu.addEventListener('click', () => {
  nav.classList.toggle('active')
  menu.classList.toggle('fa-bars')
  menu.classList.toggle('fa-close')
})

// Efeito ao clicar em um link do nav
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const alvo = document.querySelector(this.getAttribute('href'));
    if (!alvo) return; // evita erro se o alvo não existir

    const destinoY = alvo.getBoundingClientRect().top + window.pageYOffset - 70; // ajuste do header fixo

    scrollSmoot(destinoY, 2500);

    // Fecha o menu ao clicar em um link
    nav.classList.remove('active');
    menu.classList.toggle('fa-bars')
    menu.classList.toggle('fa-close')

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

// Efeito ao scrollar a pagina
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.remove("bg-[var(--color-primary)]");
    header.classList.add("bg-[var(--color-primary)]/70", "backdrop-blur-md");
  } else {
    header.classList.add("bg-[var(--color-primary)]");
    header.classList.remove("bg-[var(--color-primary)]/70", "backdrop-blur-md");
  }
});

// Marca o link clicado
links.forEach(link => {
  link.addEventListener("click", () => {
    // Remove destaque de todos
    links.forEach(l => {
      l.classList.remove(
        "text-[var(--color-secondary)]",
        "font-bold"
      );
      l.classList.add("lg:text-white"); // garante cor base no desktop
    });

    // Aplica destaque no link clicado
    link.classList.add(
      "text-[var(--color-secondary)]",
      "font-bold"
    );
    link.classList.remove("lg:text-white");
  });
});

modal()