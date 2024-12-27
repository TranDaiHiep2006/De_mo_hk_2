const apiUrl = "http://localhost:3000/products";

// Thêm sản phẩm mới
async function addProduct() {
    const name = document.getElementById("product-name").value;
    const price = parseInt(document.getElementById("product-price").value);
    const image = document.getElementById("product-image").value;

    if (!name || !price || !image) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, image }),
    });

    loadProductList();
}

// Hiển thị danh sách sản phẩm
async function loadProductList() {
    const res = await fetch(apiUrl);
    const products = await res.json();

    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `
      ${product.name} - ${product.price} VND
      <button onclick="deleteProduct(${product.id})">Xóa</button>
    `;
        productList.appendChild(li);
    });
}

// Xóa sản phẩm
async function deleteProduct(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    loadProductList();
}

loadProductList();
