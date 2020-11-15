// API URL
const api = 'http://localhost:3000/';
const camerasApi = `${api}api/cameras/`;

// DOM ELEMENTS
const itemsGrid = document.querySelector('#items-grid');

// function makeRequest(verb, url, data) {
//     return new Promise((resolve, reject) => {
//         let request = new XMLHttpRequest();
//         request.open(verb, url);
//         request.onreadystatechange = () => {
//             if (request.readyState === 4) {
//                 if (request.status === 200 || request.status === 201) {
//                     resolve(JSON.parse(request.response));
//                     console.log(JSON.parse(request.response)[0].name);
//                 } else {
//                     reject(JSON.parse(request.response));
//                     reject(console.log('rejecting'));
//                 }
//             }
//         };
//         if (verb === 'POST') {
//             console.log('posting');
//         } else {
//             request.send();
//         }
//     });
// }

// async function createContent() {
//     const cameraItemPromise = makeRequest('GET', camerasApi);
//     // const cameraItemResponse = await Promise(cameraItemPromise);
//     await console.log(cameraItemPromise);
// };

// async function getContent(query) {
//     const response = await fetch(query)
//     const data = await response.json();
//     return data;
// };

// async function displayContent(items) {
//     itemsGrid.innerHTML = 'Loading...';
//     console.log('Creating HTML...');
//     const htmlContent = await items.map(item => {
//         /*html*/
//         `${item.name}`
//     });
//     console.log(htmlContent);
// };

// async function fetchAndDisplay(query) {
//     const items = await getContent(query)
//         .then((items) => {
//             console.log(items);
//             displayContent(items);
//         });
// };
// fetchAndDisplay(camerasApi);


async function getContent(query) {
    const response = await fetch(query);
    const data = await response.json();
    return data;
}

function displayContent(items) {
    console.log("Creating HTML...");
    const htmlContent = items.map(item =>
        /*html*/`
        <div class="col-12 col-lg-4 my-3">
            <div class="card mb-4mb-lg-0 shadow border-muted">
                <img src="${item.imageUrl}" alt="${item.name}" class="card-img-top my-4">
                <h5 class="card-title m-4">${item.name}</h5>
                <p class="card-text mx-4">${item.description}</p>
                <a href="product.html?id=${item._id}" class="btn btn-primary stretched-link mx-3 mt-2 mb-4">View Product</a>
            </div>
        </div>`).join('');
    console.log(htmlContent[2]);
    itemsGrid.innerHTML = htmlContent;
} {

}
async function fetchAndDisplay(query) {
    itemsGrid.innerHTML = `<div class="text-center">
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>`;

    await getContent(query).then(items => {
            console.log(items);
            displayContent(items);
        })
        .catch((error) => {
            console.log(error);
            itemsGrid.innerHTML = `<i class="fas fa-times-circle pr-3" style="font-size:25px"></i>  Unable to load Content! Please try again later or contact website administrator.`;
            itemsGrid.classList.add('bg-danger',
                'text-light')
        })
}
fetchAndDisplay(camerasApi);

//TODO: file structure