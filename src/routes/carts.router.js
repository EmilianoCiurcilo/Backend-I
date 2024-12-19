import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const cartManager = new CartManager();

router.get("/", async (req, res) => {
    try {
        const cart = await cartManager.getAll(req.query);
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

router.get("/:cid", async (req, res) => {
    try {
        const cart = await cartManager.getOneById(req.params.cid);
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const cart = await cartManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

router.put("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const cart = await cartManager.getOneById(cid);
        const productIndex = cart.products.findIndex((item) => item.product._id.toString() === pid);

        if (productIndex === -1) {
            return res.status(404).json({ status: "error", message: error.message });
        }
        cart.products[productIndex].quantity = quantity;
        await cart.save();

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

router.put("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const newProducts = req.body;

        const cart = await cartManager.getOneById(cid);

        cart.products = newProducts;
        await cart.save();

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

router.delete("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartManager.getOneById(cid);
        const updatedCart = await cartManager.deleteOneProduct(cart, pid);
        res.status(200).json({ status: "success", payload: updatedCart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

router.delete("/:cid/products", async (req, res) => {
    try {
        const cart = await cartManager.getOneById(req.params.cid);
        const deleteProducts = await cartManager.deleteAllProducts(cart);
        res.status(200).json({ status: "success", payload: deleteProducts });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

export default router;