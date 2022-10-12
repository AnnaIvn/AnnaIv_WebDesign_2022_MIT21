/* for video start */
let video = document.querySelector('video');
window.addEventListener('scroll' , function(){
let value = 1 + window.scrollY/-600;
video.style.opacity = value;
})


function changeMenuBg(){
    var navbar = document.getElementById('navbar');
    var scrollValue = window.scrollY;
    if(scrollValue < 420){
        navbar.classList.remove('menuBg');
    } else{
        navbar.classList.add('menuBg');
    }
}

window.addEventListener('scroll' ,changeMenuBg);
/* for video end */




/* for inner-section observer start */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
/* for inner-section observer end */





/* request js starts */
if (document.readyState == 'loading') {                             /* перевірка на завантаження сторінки */
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {                                                  /* виконуємо ready, page is already loaded */
    var removeCartItemButtons = document.getElementsByClassName('btn2-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')     
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)         /* generates an event, when clicked on shop-item-button*/
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your request. We`ll rewiew it as soon as possible')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {                             /* винесли трохи коду у функцію  */
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {                           /* засікає, коли к-сть змінилася */
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {           /* isNaN - checks? if it`s not a number; or value <= 0*/
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement                                                /* ! look at structure */
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src           /* src - for an img */
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn2 btn2-danger" type="button">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                ВИЛУЧИТИ</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn2-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]             /* [0] - 1st element in the cart row */
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {             /* проходимося по списку танків, що в нас є */
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]                /* маса */
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]    /* к-сть */
        var price = parseFloat(priceElement.innerText.replace('т', ''))          /* replace all т signs -> to '' (nothing); parseFloat - will turn string into float(number) */
        var quantity = quantityElement.value       /*get value from cart-quantity-input class */
        total = total + (price * quantity)          /* total weight */
    }
    total = Math.round(total * 100) / 100             /* для округлення числа */
    document.getElementsByClassName('cart-total-price')[0].innerText = total + 'т'
}
/* request js ends */



/* comments js starts */
/* var comment = [
    {"name": "Марко Жмайло", "date": "3.10.2022", "body": "Все сподобалося. Якість техніки на висоті. Повезло, що все було в наявності"}, 
    {"name": "Олексій Колос", "date": "30.09.2022", "body": "Нормальний такий сайт. Пойде"}, 
    {"name": "Сергій Коваль", "date": "15.09.2022", "body": "Швидко зв`язалися. Все як треба. Оператори ввічливі. Буду звертатися й надалі"}, 
    {"name": "Василь Білоус", "date": "02.09.2022", "body": "Все доставили як треба"}, 
    {"name": "Степан Піддубний", "date": "10.08.2022", "body": "Товар якісний"}, 
    {"name": "Тарас Стадницький", "date": "26.06.2022", "body": "Гарний сайт. Оперативно відреагували на запит"}
]

for (var i=0; i < comment.length; i++){
    var html = '<div class="comment-box"><h4>'+comment[i].name+'</h4><div class="date">'+comment[i].date+'</div><p>'+comment[i].body+'</p><br></div>'
    $('#comment-section').append(html);
} */
/* comments js ends */


