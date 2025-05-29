"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbapi_1 = require("../utils/dbapi");
const index = async (req, res) => {
    const products = await (0, dbapi_1.get)("products");
    res.render("products/index", {
        products
    });
};
const create = async (req, res) => {
    if (req.method === "GET") {
        res.render("product/create");
    }
    else if (req.method === "POST") {
        const newProduct = req.body;
        await (0, dbapi_1.post)("products", newProduct);
        res.redirect("/products");
    }
};
const read = async (req, res) => {
    const id = req.params.id;
    const products = await (0, dbapi_1.get)(`products/${id}`);
    return products.data;
};
const update = async (req, res) => {
    const id = req.params.id;
};
const remove = async (req, res) => {
};
exports.default = { index, read, create, update, remove };
