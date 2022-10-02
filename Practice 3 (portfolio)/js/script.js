let menu = document.querySelector('#menu-bars');
let header = document.querySelector('header');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');         /* when clicking on menu-bar -> changes to close-symbol */
    header.classList.toggle('active');         /* menu (header) appears */
}

window.onscroll = () =>{
    menu.classList.remove('fa-times');         /* щось робе, може, щоб правильно зжималося */
    header.classList.remove('active');         /* сховати меню? */
}

let cursor1 = document.querySelector('.cursor-1');
let cursor2 = document.querySelector('.cursor-2');

window.onmousemove = (e) =>{                   /* щоб курсор рухався за мишкою */
    cursor1.style.top = e.pageY + 'px';       /* щоб курсор 1 слідував за мишкою по осі Y */
    cursor1.style.left = e.pageX + 'px';       /* щоб курсор 1 слідував за мишкою по осі X */
    cursor2.style.top = e.pageY + 'px';       /* щоб курсор 2 слідував за мишкою по осі Y */
    cursor2.style.left = e.pageX + 'px';       /* щоб курсор 2 слідував за мишкою по осі X */
}

document.querySelectorAll('a').forEach(links =>{

    links.onmouseenter = () =>{
        cursor1.classList.add('active');
        cursor2.classList.add('active');
    }

    links.onmouseleave = () =>{
        cursor1.classList.remove('active');
        cursor2.classList.remove('active');
    }

});