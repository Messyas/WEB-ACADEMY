import { Router } from "express";

const router = Router();

router.get("/:id/:quantidade", buyController.adicionarProdutoCarrinho);
router.get("/", isAuth, compraController.finalizarCompra);

export default router;