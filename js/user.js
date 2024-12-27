const apiUrl = "http://localhost:3000/products";

async function loadProducts() {
    const res = await fetch(apiUrl);
    const products = await res.json();
    const productContainer = document.getElementById("product-container");

    productContainer.innerHTML = "";

    products.forEach((product) => {
        const div = document.createElement("div");
        div.innerHTML = `
      <div>
        <img src="${product.image}" alt="${product.name}" style="width:50px; height:50px;">
        <h3>${product.name}</h3>
        <p>${product.price} VND</p>
        <button onclick="addToCart(${product.id})">Thêm vào giỏ hàng</button>
      </div>
    `;
        productContainer.appendChild(div);
    });
}

async function addToCart(productId) {
    const cartResponse = await fetch(`http://localhost:3000/cart`);
    const cart = await cartResponse.json();
    const product = await fetch(
        `http://localhost:3000/products/${productId}`
    ).then((res) => res.json());

    const itemIndex = cart.findIndex((cartItem) => cartItem.id === product.id);
    if (itemIndex >= 0) {
        alert("Sản phẩm đã có trong giỏ hàng!");
    } else {
        await fetch("http://localhost:3000/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        alert("Thêm vào giỏ hàng thành công!");
    }
}

loadProducts();
