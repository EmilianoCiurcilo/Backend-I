import ErrorManager from "./ErrorManager.js";
import { isValidID } from "../config/mongoose.config.js";
import CartModel from "../models/cart.model.js";

export default class CartManager {
    #cartModel;

    constructor() {
        this.#cartModel = CartModel;
    }

    async #findOneById(id) {
        if (!isValidID(id)) {
            throw new ErrorManager("ID no encontrado", 400);
        }
        const cart = await this.#cartModel.findById(id).populate("products.product");

        if(!cart){
            throw new ErrorManager("ID no encontrado", 404);
        }

        return cart;
    }

    async getAll(params) {
        try {
            const paginationOptions = {
                limit: params?.limit || 10,
                page: params?.page || 1,
                populate: "products.product",
                lean: true,
            };
            return await this.#cartModel.paginate({}, paginationOptions);
        }
        catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async getOneById(id) {
        try {
            return await this.#findOneById(id);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async insertOne(data) {
        try {
            const cart = await this.#cartModel.create(data);
            return cart.populate;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async addOneProduct(id, productID) {
        try {
            const cart = await this.#findOneById(id);
            const productIndex = cart.products.findIndex((item) => item.product._id.toString() === productID);

            if (productIndex >= 0) {
                cart.products[productIndex].quantity++;
            } else {
                cart.products.push({ product: productID, quantity: 1 });
            }

            await cart.save();

            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    async updateOneById(id, data) {
        try {
            const cart = await this.#findOneById(id);
            const newValues = {
                ...cart,
                ...data,
                status: data.status ? convertToBoolean(data.status) : cart.status,
            };
            cart.set(newValues);
            cart.save();

            return [data.cart];
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    async deleteOneProduct (id, productID) {
        try {
            const cart = await this.#findOneById(id);
            const productIndex = cart.products.findIndex((item) => item.product._id.toString() === productID);

            if (productIndex >= 0) {
                cart.products.splice(productIndex, 1);
            }

            await cart.save();

            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    async deleteAllProducts(id) {
        try {
            const cart = await this.#findOneById(id);
            cart.products = [];
            await cart.save();

            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
}