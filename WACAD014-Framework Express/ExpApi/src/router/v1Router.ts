import { Router } from "express";
import productArrayRouter from "../resources/productArray/productArray.router";
import productRouter from "../resources/product/product.router";
import languageRouter from "../resources/language/language.router";

const router = Router();

router.use("/products", productRouter);
router.use("/productsArray", productArrayRouter);
router.use("/languages", languageRouter);

export default router;
