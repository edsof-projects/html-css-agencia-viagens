//MENU HAMBURGUER
const hamburguer = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburguer.addEventListener('click', ()=>{
    navLinks.classList.toggle('active');
});


//DARK MODE
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
});

//ALTERAR ICONE
if(document.body.classList.contains('dark')){
    darkModeToggle.textContent = '☀️';
}else{
    darkModeToggle.textContent = '🌙';
}   

