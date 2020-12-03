// DOM ELEMENTS
const itemsGrid = document.querySelector('#items-grid');

function displayContent(items) {
    const htmlContent = items.map(item =>
        /*html*/
        `
        <div class="col-12 col-lg-4 my-3">
            <div class="card mb-4mb-lg-0 shadow border-muted">
                <img src="${item.imageUrl}" alt="${item.name}" class="card-img-top my-4">
                <h5 class="card-title m-4">${item.name}</h5>
                <p class="card-text mx-4">${item.description}</p>
                <a href="product.html?id=${item._id}" class="btn btn-primary stretched-link mx-3 mt-2 mb-4">View Product</a>
            </div>
        </div>`).join('');
    itemsGrid.innerHTML = htmlContent;
};

async function fetchAndDisplay(query) {
    // Displaying loading animation
    itemsGrid.innerHTML = loadingAnimation;

    await getContent(query)
        .then(items => {
            displayContent(items);
        })
        .catch((error) => {
            console.log(error);
            // displaying error in DOM
            itemsGrid.innerHTML = `<i class="fas fa-times-circle pr-3" style="font-size:25px"></i>  Unable to load Content! Please try again later or contact website administrator.`;
            itemsGrid.classList.add('bg-danger',
                'text-light')
        })
}

fetchAndDisplay(camerasApi);

//TODO: file structure