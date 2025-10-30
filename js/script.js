const menu = document.querySelector('#hamburger')
const nav  = document.querySelector('#nav')

menu.addEventListener('click', ()=>{
    nav.classList.toggle('active')
    menu.classList.toggle('fa-bars')
    menu.classList.toggle('fa-close')
})

