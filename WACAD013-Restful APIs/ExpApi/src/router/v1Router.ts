import { Router } from "express";
import productArrayRouter from "../resources/productArray/productArray.router";
import productRouter from "../resources/product/product.router";
import languageRouter from "../resources/language/language.router";
import userRouter from "../resources/user/user.router";
import authRouter from "../resources/auth/auth.router";
import cartRouter from "../resources/buy/buy.router"

const router = Router();

router.use(
  "/auth",
  // #swagger.tags = ['Auth']
  authRouter
);

router.use(
  "/products",
  // #swagger.tags = ['Products']
  productRouter
);

router.use(
  "/productsArray",
  //swagger/tags = ['ProductsArray']
  productArrayRouter
);

router.use(
  "/languages",
  // #swagger.tags = ['Languages']
  languageRouter
);

router.use(
  "/users",
  //swagger/tags = ['Users']
  userRouter
);

router.use(
  "/cart",
  // #swagger.tags = ['Cart']
  cartRouter
);

export default router;
