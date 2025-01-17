const productsList = document.getElementById("products-list");
const btnRefreshProductsList = document.getElementById("btn-refresh-products-list");
const btnCarrito = document.getElementById("btn-carrito");

const loadProductsList = async () => {
    const response = await fetch("/api/products", { method: "GET" });
    const data = await response.json();
    const products = data.payload.docs ?? [];

    productsList.innerText = "";

    products.forEach((product) => {
        productsList.innerHTML += `${product.title}<button id="btn-carrito" class="btn_carrito">Agregar al carrito</button><br>`;
    });
};

btnRefreshProductsList.addEventListener("click", () => {
    loadProductsList();
});

// btnCarrito.addEventListener("click", () =>{
// });

loadProductsList();