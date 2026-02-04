document.addEventListener("DOMContentLoaded", () => {

    const productList = document.getElementById("productList");
    const cartCount = document.getElementById("cartCount");

    let allProducts = [];

    function loadCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let totalQty = 0;

        cart.forEach(item => {
            totalQty += item.qty;
        });

        if (cartCount) {
            cartCount.innerText = totalQty;
        }
    }

    async function initProducts() {
        try {
            const res = await fetch("https://fakestoreapi.com/products");
            allProducts = await res.json();
            handleRoute();
            loadCartCount();
        } catch (error) {
            console.error("Error loading products:", error);
        }
    }

    /* ================= ROUTING (FILTERS) ================= */
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
        const filteredProducts = allProducts.filter(
            product => product.category === category
        );
        displayProducts(filteredProducts);
    }

    /* ================= DISPLAY PRODUCTS ================= */
    function displayProducts(products) {
        if (!productList) return;

        productList.innerHTML = "";

        products.forEach(product => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="card-content">
                    <h3>${product.title.slice(0, 40)}...</h3>
                    <hr>
                    <div class="price">$${product.price}</div>
                    <hr>
                    <button class="details-btn">Details</button>
                    <button class="cart-btn">Add to Cart</button>
                </div>
            `;

            card.querySelector(".cart-btn").addEventListener("click", () => {
                addToCart(product);
            });

            productList.appendChild(card);
        });
    }

    /* ================= ADD TO CART ================= */
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.qty += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                qty: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        loadCartCount();

        // ✅ redirect to cart page
        window.location.href = "cart.html";
    }

    /* ================= INIT ================= */
    initProducts();
});
