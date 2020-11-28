// API URL
const api = 'http://localhost:3000/';
const camerasApi = `${api}api/cameras/`;
const camerasApiOrder = `${camerasApi}order`

const cartSpan = document.querySelector('#cart');

async function getContent(query) {
    const response = await fetch(query);
    const data = await response.json();
    return data;
}

const priceToDollars = (price) => {
    price /= 100
    price = price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
    return price
};

const loadingAnimation = `<div class="text-center">
<div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
</div>`;

function displayCartSpan() {
    if (localStorage.getItem('basket')) {
        let cartNoOfItems = JSON.parse(localStorage.getItem('basket')).length
        cartSpan.textContent = `Cart (${cartNoOfItems})`

    } else {
        cartSpan.textContent = 'Cart (0)'
    }
};

displayCartSpan();