import { Router } from "express";
import productArrayRouter from "../resources/productArray/productArray.router";
import productRouter from "../resources/product/product.router";

const router = Router();

router.use("/products", productRouter);
router.use("/productsArray", productArrayRouter);

export default router;
