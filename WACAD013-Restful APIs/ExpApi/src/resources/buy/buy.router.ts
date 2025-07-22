import { Router } from "express";
import buyController from "./buy.controller";
import isAuth from "../../middlewares/isAuth";

const router = Router();

router.get("/:id/:quantidade", buyController.addProductToCart);
router.get("/", isAuth, buyController.checkout);

export default router;