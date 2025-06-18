import { Router } from "express";
import productRouter from "../resources/product/product.router";
import productRouterArray from "../resources/productArray/product.router";

const router = Router();

router.use("/products", productRouter);
router.use("/productsArray", productRouter);

export default router;
