export function modal() {
    const modal         = document.getElementById("modal");
    const modalImg      = document.getElementById("modal-img");
    const closeModal    = document.getElementById("close-modal");
    const fotos         = document.querySelectorAll('.foto')

    // pega todas as imagens clicáveis
    fotos.forEach(img => {
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
}