async function loadUserCart() {
    const res = await fetch("http://localhost:3000/cart");
    const cartItems = await res.json();
    const cartContainer = document.getElementById("cart-container");

    cartContainer.innerHTML = "";
    cartItems.forEach((item) => {
        cartContainer.innerHTML += `
      <div style="display:flex; align-items:center; gap:10px;">
        <img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;">
        <p>${item.name} - ${item.price} VND</p>
        <button onclick="removeFromCart(${item.id})">Xóa khỏi giỏ hàng</button>
      </div>
    `;
    });
}

// Xóa sản phẩm khỏi giỏ hàng
async function removeFromCart(productId) {
    await fetch(`http://localhost:3000/cart/${productId}`, {
        method: "DELETE",
    });
    alert("Đã xóa sản phẩm khỏi giỏ hàng!");
    loadUserCart();
}

loadUserCart();
