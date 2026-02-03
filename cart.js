const cartItemsDiv = document.getElementById("cartItems");
const productsTotalEl = document.getElementById("productsTotal");
const grandTotalEl = document.getElementById("grandTotal");
const itemCountEl = document.getElementById("itemCount");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const SHIPPING = 30;

function getGroupedCart() {
    const grouped = {};

    cart.forEach(item => {
        if (grouped[item.id]) {
            grouped[item.id].qty++;
        } else {
            grouped[item.id] = { ...item, qty: 1 };
        }
    });

    return Object.values(grouped);
}

function renderCart() {
    cartItemsDiv.innerHTML = "";
    let productsTotal = 0;

    const groupedCart = getGroupedCart();
    itemCountEl.innerText = cart.length;

    groupedCart.forEach(item => {
        const itemTotal = item.price * item.qty;
        productsTotal += itemTotal;

        cartItemsDiv.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}">
            <div class="item-info">
                <h4>${item.title}</h4>
                <div class="item-price">1 x $${item.price}</div>
            </div>
            <div class="qty">
                <button onclick="changeQty(${item.id}, -1)">−</button>
                <span>${item.qty}</span>
                <button onclick="changeQty(${item.id}, 1)">+</button>
            </div>
        </div>
        `;
    });

    productsTotalEl.innerText = "$" + productsTotal.toFixed(2);
    grandTotalEl.innerText = "$" + (productsTotal + SHIPPING).toFixed(2);
}

function changeQty(id, change) {
    if (change === 1) {
        const product = cart.find(p => p.id === id);
        cart.push(product);
    } else {
        const index = cart.findIndex(p => p.id === id);
        if (index !== -1) cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

renderCart();
