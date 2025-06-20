import { Router } from 'express';
import productController from '../controllers/product';
import mainController from '../controllers/main'
import loremController from '../controllers/lorem';

const router = Router();

// Main Controller
router.get('/', mainController.index);
router.get('/lorem', loremController.lorem);

router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);

// Controller de Product

router.get('/products', productController.index);
router.all('/products/create', productController.create);
router.get('/products/:id', productController.read);
router.all('/products/update/:id', productController.update);
router.get('/products/remove/:id', productController.remove);

export default router;
