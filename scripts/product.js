// API URL
const api = 'http://localhost:3000/';
const camerasApi = `${api}api/cameras/`;

const id = document.URL.split("=")[1];
const itemDisplay = document.getElementById('item-display');
async function getContent(query) {
    const response = await fetch(query);
    const data = await response.json();
    return data;
}


function displayItem(items) {
    itemDisplay.innerHTML = 'Loading...'

    items.forEach(item => {
        if (id === item._id) {
            //converts price to dollars
            let dollars = item.price / 100
            dollars = dollars.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });


            itemDisplay.innerHTML = `<div class="row my-5">
                <div class="col-4 my-5 pb-5">
                    <img src="${item.imageUrl}" alt="${item.name}" class="card-img-top my-4">
                </div>
                <div class="col-6">
                    <h1 class="mt-5">${item.name}</h1>
                    <div class="price font-weight-bold mb-2">${dollars}</div>
                    <label for="lenses" class="mb-4">Lenses:</label>
                    <select name="lenses" id="lenses">
                    </select>
                    <p>${item.description}</p>
                </div>
                <div class="col2 mt-5 pt-5">
                    <button id="add-to-cart" class="btn btn-primary">Add to Cart</button>

                </div>`;
            // Generates lenses options
            const lensesOptions = document.querySelector('#lenses');
            item.lenses.forEach(lens => {
                const optionElement = document.createElement('option');
                optionElement.value = lens;
                optionElement.innerHTML = lens;
                lensesOptions.appendChild(optionElement)


            });
            // Adds listener to Add to Cart Button
            let addToCartBtn = document.querySelector('#add-to-cart');

            function addToCart() {
                let noOfItemsInBasket = localStorage.length;

                localStorage.setItem(`item-${noOfItemsInBasket + 1}`, `${item._id}`);
                console.log(noOfItemsInBasket);

                // directs to cart
                window.location.href = "http://127.0.0.1:50457/cart.html";
            };
            addToCartBtn.addEventListener('click', addToCart);
        }
    });
}

async function fetchAndDisplayItem(query) {
    itemDisplay.innerHTML = `<div class="text-center mt-5 p-5">
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>`;
    await getContent(query).then(items => {
        displayItem(items);
    }).catch((error) => {
        console.log(error);
        itemDisplay.innerHTML = `<i class="fas fa-times-circle pr-3" style="font-size:25px"></i>  Unable to load Content! Please try again later or contact website administrator.`;
        itemDisplay.classList.add('bg-danger',
            'text-light', 'text-center', 'mt-5', 'p-3')
    })
}

fetchAndDisplayItem(camerasApi);