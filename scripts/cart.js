// API URL
const api = 'http://localhost:3000/';
const camerasApi = `${api}api/cameras/`;

const cartContent = document.querySelector('#cart-content');

function generateNodes() {
    function generateItemNode(i) {
        const itemEl = document.createElement('div');
        itemEl.classList.add('row');
        itemEl.id = `item-no-${i}`;
        cartContent.appendChild(itemEl);
        // itemEl.innerHTML = localStorage.getItem(`<div>test</div>`)
        document.querySelector(`#item-no-${i}`).innerHTML = `<div>${localStorage.getItem(`item ${i}`)}</div>`
    }
    for (let i = 1; i < localStorage.length + 1; i++) {
        console.log(localStorage.getItem(`item ${i}`));
        generateItemNode(i);
    }
}

function displayCart() {
    if (localStorage.length > 0) {
        console.log('cart is full');
        generateNodes();

    } else {
        console.log('cart is empty');

    }
}

displayCart();