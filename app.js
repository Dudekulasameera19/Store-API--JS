document.addEventListener("DOMContentLoaded", () => {

    const productList = document.getElementById("productList");
    const cartCount = document.getElementById("cartCount");

    let allProducts = [];

    function loadCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cartCount) {
            cartCount.innerText = cart.length;
        }
    }

    async function initProducts() {
        try {
            const res = await fetch("https://fakestoreapi.com/products");
            allProducts = await res.json();
            handleRoute();
            loadCartCount();
        } catch (error) {
            console.log("Error loading products", error);
        }
    }

    function handleRoute() {
        const hash = window.location.hash.replace("#", "");

        if (hash === "men") {
            filterCategory("men's clothing");
        } else if (hash === "women") {
            filterCategory("women's clothing");
        } else if (hash === "electronics") {
            filterCategory("electronics");
        } else if (hash === "jewellery") {
            filterCategory("jewelery");
        } else {
            displayProducts(allProducts);
        }
    }

    window.addEventListener("hashchange", handleRoute);

    function filterCategory(category) {
        const filteredProducts = allProducts.filter(item => {
            return item.category === category;
        });

        displayProducts(filteredProducts);
    }

    function displayProducts(products) {
        if (!productList) return;

        productList.innerHTML = "";

        products.forEach(product => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <img src="${product.image}" alt="">
                <div class="card-content">
                    <h3>${product.title.slice(0, 40)}...</h3>
                    <hr>
                    <div class="price">$${product.price}</div>
                    <hr>
                    <button class="details-btn">Details</button>
                    <button class="cart-btn">Add to Cart</button>
                </div>
            `;

            const cartBtn = card.querySelector(".cart-btn");
            cartBtn.addEventListener("click", () => {
                addToCart(product.id);
            });

            productList.appendChild(card);
        });
    }

    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const selectedProduct = allProducts.find(p => p.id === productId);
        cart.push(selectedProduct);

        localStorage.setItem("cart", JSON.stringify(cart));
        loadCartCount();
    }

    initProducts();
});
