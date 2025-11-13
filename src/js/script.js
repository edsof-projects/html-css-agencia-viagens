import { scrollSmoot }  from './scrollSmoot.js';
import { modal }        from './modal.js';

const menu = document.querySelector('#hamburger')
const nav  = document.querySelector('#nav')

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

  modal()
