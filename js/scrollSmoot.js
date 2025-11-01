export function scrollSmoot (targetY, duracao = 1500) {
    const startY    = window.pageYOffset;
    const distancia = targetY - startY;
    let inicio      = null;
  
    function animar(tempo) {
      if (!inicio) inicio = tempo;
      const progresso     = tempo - inicio;
      const porcentagem   = Math.min(progresso / duracao, 1);
  
      // easing suave (easeInOutQuad)
      const ease = porcentagem < 0.5
        ? 2 * porcentagem * porcentagem
        : -1 + (4 - 2 * porcentagem) * porcentagem;
  
      window.scrollTo(0, startY + distancia * ease);
  
      if (progresso < duracao) {
        requestAnimationFrame(animar);
      }
    }
  
    requestAnimationFrame(animar);
  }
