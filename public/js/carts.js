const cartsList = document.getElementById("carts-list");

const loadCartsList = async () => {
    const response = await fetch("/api/carts", { method: "GET" });
    const data = await response.json();
    const carts = data.payload.docs ?? [];

    cartsList.innerText = "";

    carts.forEach((cart) => {
        cartsList.innerHTML += `${cart.products.map((item) => `
            <li>
                ${item.product.title} - Cantidad: ${item.quantity}
            </li>`)}`;
    });
};
loadCartsList();