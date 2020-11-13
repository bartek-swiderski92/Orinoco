// API URL
const api = 'http://localhost:3000/';
const camerasApi = `${api}api/cameras/`;

const id = document.URL.split("=")[1];
const itemDisplay = document.getElementById('item-display')


async function getContent(query) {
    const response = await fetch(query);
    const data = await response.json();
    return data;
}


function displayItem(items) {
    itemDisplay.innerHTML = 'Loading...'

    items.forEach(item => {
        if (id === item._id) {
            //converting price to dollars
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
                    <a href="cart.html" class="btn btn-primary">Add to Cart</a>
                </div>`;
            const lensesOptions = document.querySelector('#lenses');
            item.lenses.forEach(lens => {
                const optionElement = document.createElement('option');
                optionElement.value = lens;
                optionElement.innerHTML = lens;
                console.log(optionElement);
                lensesOptions.appendChild(optionElement)
            });

        }
    });
}

async function fetchAndDisplayItem(query) {
    await getContent(query).then(items => {
        displayItem(items);
    })

}

fetchAndDisplayItem(camerasApi);


// rest