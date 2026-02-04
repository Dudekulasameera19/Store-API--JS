const cartItemsDiv = document.getElementById("cartItems");
const productsTotalEl = document.getElementById("productsTotal");
const grandTotalEl = document.getElementById("grandTotal");
const itemCountEl = document.getElementById("itemCount");
const emptyCart = document.getElementById("emptyCart");
const cartWrapper = document.getElementById("cartWrapper");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const SHIPPING = 0;

function renderCart() {
    if (cart.length === 0) {
        emptyCart.style.display = "block";
        cartWrapper.style.display = "none";
        return;
    }

    emptyCart.style.display = "none";
    cartWrapper.style.display = "flex";

    cartItemsDiv.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}">
                <div>
                    <h4>${item.title.slice(0, 40)}</h4>
                    <p>$${item.price}</p>
                </div>
                <div class="qty">
                    <button onclick="updateQty(${index}, -1)">−</button>
                    <span>${item.qty}</span>
                    <button onclick="updateQty(${index}, 1)">+</button>
                </div>
            </div>
        `;
    });

    itemCountEl.innerText = cart.length;
    productsTotalEl.innerText = "$" + total.toFixed(2);
    grandTotalEl.innerText = "$" + (total + SHIPPING).toFixed(2);
}

function updateQty(index, change) {
    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

renderCart();
