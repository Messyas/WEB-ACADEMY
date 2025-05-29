"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = __importDefault(require("../controllers/product"));
const router = (0, express_1.Router)();
// Controlador Product
router.get('/product', product_1.default.index);
router.all('/product/create', product_1.default.create);
router.all('/product/update/:id', product_1.default.update);
router.get('/product/:id', product_1.default.read);
router.post('/product/remove', product_1.default.remove);
exports.default = router;
