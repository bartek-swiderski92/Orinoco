const id = document.URL.split("=")[1];
const itemDisplay = document.getElementById('item-display');
let basketContent;

function displayItem(items) {
    itemDisplay.innerHTML = 'Loading...'

    items.forEach(item => {
        if (id === item._id) {
            let dollars = priceToDollars(item.price)

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
                lensesOptions.appendChild(optionElement);
            });
            // Adds listener to Add to Cart Button
            let addToCartBtn = document.querySelector('#add-to-cart');

            function addToCart() {
                //TODO: stringify local storage
                // localStorage.setItem(`item-${noOfItemsInBasket + 1}`, `${item._id}`);
                if (!localStorage.getItem('basket')) {
                    basketContent = [];
                } else {
                    basketContent = JSON.parse(localStorage.getItem('basket'))
                }
                basketContent.push(item._id);
                localStorage.setItem('basket', JSON.stringify(basketContent));

                window.location.href = `/cart.html`;
            };
            addToCartBtn.addEventListener('click', addToCart);
        }
    });
}

async function fetchAndDisplayItem(query) {
    itemDisplay.innerHTML = loadingAnimation;

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