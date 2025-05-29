import { Router } from 'express';
import productController from '../controllers/product';

const router = Router();

router.get("/", (req, res) => {
    res.render("hb1", {
      layout: false,
      mensagem: 'Seja bem-vindo(a) ao Web Academy'
    });
});

// Controlador Product
router.get('/product', productController.index);
router.all('/product/create', productController.create);
router.all('/product/update/:id', productController.update);
router.get('/product/:id', productController.read);
router.post('/product/remove', productController.remove);

export default router;