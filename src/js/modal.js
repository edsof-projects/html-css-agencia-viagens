export function modal() {
    let cidades = [];

    // Carrega o JSON apenas 1 vez
    fetch('./src/assets/dados.json')
        .then(r => r.json())
        .then(data => cidades = data);
    //console.log(data)

    // Seleção dos elementos
    const modal             = document.getElementById('modal');
    const modalImg          = document.getElementById('modal-img');
    const modalDescricao    = document.getElementById('modal-descricao');
    const closeModal        = document.getElementById('close-modal');

    // Abre o modal
    document.querySelectorAll('.img-item').forEach(img => {
        img.addEventListener('click', () => {
            const id = Number(img.dataset.id);

            // 👉 Só abre o modal se o tamanho for xl ou maior
            if (window.innerWidth < 1400) return;

            // Encontra a cidade correspondente
            const cidade = cidades.find(c => c.id === id);

            modalImg.src = img.src;
            modalDescricao.textContent = cidade ? cidade.cidade +" "+ cidade.descricao : "";
            modal.classList.remove('hidden');    
                 
        });       
        //Se passar o mouse no modal ganha o curso de pointer e sobre a imagem o cursor é default    
        modal.style.cursor    = "pointer";
        modalImg.style.cursor = "default";
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