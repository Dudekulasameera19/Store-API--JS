const productList = document.getElementById("productList");
const cartCount = document.getElementById("cartCount");

let allProducts = [];
let cart = [];

async function initProducts() {
    const res = await fetch("https://fakestoreapi.com/products");
    allProducts = await res.json();
    handleRoute(); 
}

function handleRoute() {
    const hash = window.location.hash.replace("#", "");

    switch (hash) {
        case "men":
            filterCategory("men's clothing");
            break;
        case "women":
            filterCategory("women's clothing");
            break;
        case "electronics":
            filterCategory("electronics");
            break;
        case "jewellery":
            filterCategory("jewelery");
            break;
        default:
            displayProducts(allProducts); 
    }
}

function filterCategory(category) {
    const filtered = allProducts.filter(
        product => product.category === category
    );
    displayProducts(filtered);
}


function displayProducts(products) {
    productList.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${product.image}">
            <div class="card-content">
                <h3>${product.title}...</h3>
                <hr>
                <div class="price">${product.price}</div>
                <hr>
                <button onclick="Details()">Details</button>
                <button onclick="addToCart()">Add to Cart</button>
            </div>
        `;

        productList.appendChild(card);
    });
}


function addToCart() {
    cart.push(1);
    cartCount.innerText = cart.length;
}


window.addEventListener("hashchange", handleRoute);

initProducts();
