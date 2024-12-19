import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    try {
        res.render("home", { title: "Productos" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

router.get("/carts/:cid", async (req, res) => {
    try {
        res.render("cart", { title: "Tu carrito" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

router.get("/realtimeproducts", async (req, res) => {
    try {
        res.render("realtimeproducts", { title: "Agregar Productos" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

export default router;