import { Router } from "express";
import productArrayRouter from "../resources/productArray/productArray.router";
import productRouter from "../resources/product/product.router";
import languageRouter from "../resources/language/language.router";
import userRouter from "../resources/user/user.router";
import authRouter from "../resources/auth/auth.router";

const router = Router();

router.use("/", authRouter);
router.use("/products", productRouter);
router.use("/productsArray", productArrayRouter);
router.use("/languages", languageRouter);
router.use("/users", userRouter);

export default router;
